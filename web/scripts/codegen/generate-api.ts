import { existsSync } from 'node:fs';
import { mkdtemp, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

import { z } from 'zod';

import { runCommand } from './run-command.ts';

const root = resolve(import.meta.dirname, '../..');
const sourcesRoot = join(root, 'src/sources');
const generator = join(root, 'node_modules/.bin/swagger-typescript-api');

const jsonValueSchema = z.json();
const jsonObjectSchema = z.record(z.string(), jsonValueSchema);
const operationSchema = z
  .object({
    operationId: z.string().optional(),
    tags: z.array(z.string()).optional(),
  })
  .catchall(jsonValueSchema);
const pathItemSchema = z
  .object({
    delete: operationSchema.optional(),
    get: operationSchema.optional(),
    head: operationSchema.optional(),
    options: operationSchema.optional(),
    patch: operationSchema.optional(),
    post: operationSchema.optional(),
    put: operationSchema.optional(),
    trace: operationSchema.optional(),
  })
  .catchall(jsonValueSchema);
const documentSchema = z
  .object({
    openapi: z.string().optional(),
    swagger: z.string().optional(),
    info: jsonObjectSchema,
    paths: z.record(z.string(), pathItemSchema),
    components: jsonObjectSchema.optional(),
    definitions: jsonObjectSchema.optional(),
  })
  .catchall(jsonValueSchema);

type JsonValue = z.infer<typeof jsonValueSchema>;
type OpenApiDocument = z.infer<typeof documentSchema>;

interface ContractTarget {
  name: string;
  url: string;
  paths: readonly string[];
  prepare: (document: OpenApiDocument) => void;
}

const targets: ContractTarget[] = [
  {
    name: 'scoresaber',
    url: process.env.SCORESABER_OPENAPI_URL ?? 'https://scoresaber.com/api/openapi.json',
    paths: [
      '/api/v2/leaderboards/{id}',
      '/api/v2/leaderboards/hash/{hash}',
      '/api/v2/players/{id}',
      '/api/v2/players/{id}/scores',
      '/api/v2/scores/{id}',
      '/api/v2/scores/{id}/replay',
    ],
    prepare(document) {
      for (const path of Object.values(document.paths)) {
        for (const operation of [
          path.delete,
          path.get,
          path.head,
          path.options,
          path.patch,
          path.post,
          path.put,
          path.trace,
        ]) {
          if (operation?.operationId === undefined) continue;
          operation.operationId = operation.operationId.replace(/_v2$/, '');
        }
      }
    },
  },
  {
    name: 'beatsaver',
    url: process.env.BEATSAVER_OPENAPI_URL ?? 'https://api.beatsaver.com/docs/swagger.json',
    paths: ['/maps/id/{id}', '/maps/hash/{hash}'],
    prepare(document) {
      if (document.definitions !== undefined) {
        document.definitions.Float = { type: 'number' };
        document.definitions.Short = { type: 'integer' };
      }
      const operations: [string, string][] = [
        ['/maps/id/{id}', 'getMapById'],
        ['/maps/hash/{hash}', 'getMapByHash'],
      ];
      for (const [path, operationId] of operations) {
        const operation = document.paths[path]?.get;
        if (operation === undefined) throw new Error(`OpenAPI document is missing GET ${path}`);
        operation.operationId = operationId;
        operation.tags = ['Maps'];
      }
    },
  },
];

function collectReferences(value: JsonValue, references: Set<string>) {
  if (Array.isArray(value)) {
    for (const item of value) collectReferences(item, references);
    return;
  }
  const object = jsonObjectSchema.safeParse(value);
  if (!object.success) return;
  const reference = z.string().safeParse(object.data.$ref);
  if (reference.success && reference.data.startsWith('#/')) references.add(reference.data);
  for (const child of Object.values(object.data)) collectReferences(child, references);
}

function pointerSegments(reference: string) {
  return reference
    .slice(2)
    .split('/')
    .map((segment) => segment.replaceAll('~1', '/').replaceAll('~0', '~'));
}

function valueAt(document: OpenApiDocument, reference: string) {
  let value: JsonValue = document;
  for (const segment of pointerSegments(reference)) {
    const object = jsonObjectSchema.safeParse(value);
    if (!object.success) throw new Error(`OpenAPI document has an invalid reference ${reference}`);
    const next = object.data[segment];
    if (next === undefined) throw new Error(`OpenAPI document has an invalid reference ${reference}`);
    value = next;
  }
  return value;
}

function assignAt(document: Record<string, JsonValue>, reference: string, value: JsonValue) {
  const segments = pointerSegments(reference);
  let target = document;
  for (const segment of segments.slice(0, -1)) {
    const child = jsonObjectSchema.safeParse(target[segment]);
    if (child.success) target = child.data;
    else {
      const next: Record<string, JsonValue> = {};
      target[segment] = next;
      target = next;
    }
  }
  const key = segments.at(-1);
  if (key !== undefined) target[key] = value;
}

function pruneDocument(source: OpenApiDocument, target: ContractTarget) {
  const document = structuredClone(source);
  const paths = Object.fromEntries(
    target.paths.map((path) => {
      const pathItem = document.paths[path];
      if (pathItem === undefined) throw new Error(`${target.name} OpenAPI document is missing ${path}`);
      return [path, pathItem];
    }),
  );
  document.paths = paths;
  target.prepare(document);

  const references = new Set<string>();
  collectReferences(paths, references);
  for (const reference of references) collectReferences(valueAt(document, reference), references);

  const pruned: OpenApiDocument = { ...document, paths };
  if (document.components !== undefined) pruned.components = {};
  if (document.definitions !== undefined) pruned.definitions = {};
  for (const reference of references) assignAt(pruned, reference, valueAt(document, reference));
  return pruned;
}

async function refreshDocument(target: ContractTarget, path: string) {
  const response = await fetch(target.url);
  if (!response.ok) throw new Error(`${target.name} OpenAPI request failed (${String(response.status)})`);
  const source = documentSchema.parse(await response.json());
  const document = pruneDocument(source, target);
  await writeAtomic(path, `${JSON.stringify(document, null, 2)}\n`);
  return document;
}

async function writeAtomic(path: string, contents: string) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.${String(process.pid)}.tmp`;
  await writeFile(temporary, contents);
  await rename(temporary, path);
}

async function generateContract(target: ContractTarget, specPath: string, outputDirectory: string) {
  await mkdir(outputDirectory, { recursive: true });
  runCommand(
    generator,
    [
      'generate',
      '--path',
      specPath,
      '--output',
      outputDirectory,
      '--name',
      'api-contracts.ts',
      '--no-client',
      '--extract-response-body',
      '--generate-union-enums',
      '--sort-types',
      '--silent',
    ],
    root,
    `${target.name} contract generation failed`,
  );
}

async function generatedContract(target: ContractTarget, refresh: boolean, outputDirectory: string) {
  const specPath = join(sourcesRoot, target.name, 'openapi.json');
  if (refresh) await refreshDocument(target, specPath);
  else documentSchema.parse(JSON.parse(await readFile(specPath, 'utf8')));
  await generateContract(target, specPath, outputDirectory);
  const output = join(outputDirectory, 'api-contracts.ts');
  const source = await readFile(output, 'utf8');
  await writeFile(output, source.replace('/* eslint-disable */\n', ''));
  return output;
}

async function main() {
  const refresh = process.argv.includes('--refresh');
  const check = process.argv.includes('--check');
  const temporaryRoot = await mkdtemp(join(tmpdir(), 'chroviewer-api-'));
  try {
    const drift: string[] = [];
    for (const target of targets) {
      const temporaryDirectory = join(temporaryRoot, target.name);
      const generated = await generatedContract(target, refresh, temporaryDirectory);
      const destination = join(sourcesRoot, target.name, 'generated/api-contracts.ts');
      const next = await readFile(generated, 'utf8');
      if (check) {
        const current = existsSync(destination) ? await readFile(destination, 'utf8') : '';
        if (current !== next) drift.push(destination);
      } else {
        await writeAtomic(destination, next);
      }
    }
    if (drift.length > 0) {
      throw new Error(
        `generated API contracts are stale:\n${drift.map((path) => `- ${path}`).join('\n')}\nrun vp run api:generate`,
      );
    }
  } finally {
    await rm(temporaryRoot, { force: true, recursive: true });
  }
}

await main();
