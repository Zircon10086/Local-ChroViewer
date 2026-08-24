import { existsSync } from 'node:fs';
import { cp, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, relative, resolve } from 'node:path';

import { runCommand } from './run-command.ts';

const root = resolve(import.meta.dirname, '../..');
const protoRoot = join(root, 'src/modules/live/proto');
const generatedRoot = join(root, 'src/modules/live/generated/proto');
const buf = join(root, 'node_modules/.bin/buf');
const protocGenEs = join(root, 'node_modules/.bin/protoc-gen-es');
const vitePlus = join(root, 'node_modules/.bin/vp');
const check = process.argv.includes('--check');
const temporaryRoot = await mkdtemp(join(tmpdir(), 'chroviewer-live-proto-'));

try {
  const template = {
    version: 'v2',
    plugins: [{ local: protocGenEs, out: temporaryRoot, opt: ['target=ts'] }],
  };
  runCommand(
    buf,
    ['generate', protoRoot, '--template', JSON.stringify(template), '--clean'],
    root,
    'live protocol generation failed',
  );
  runCommand(vitePlus, ['fmt', '--write', temporaryRoot], root, 'generated live protocol formatting failed');

  const generatedProtocolRoot = join(temporaryRoot, 'scoresaber/live/v1');
  const files = (await readdir(generatedProtocolRoot)).filter((file) => file.endsWith('_pb.ts')).sort();
  for (const file of files) {
    const path = join(generatedProtocolRoot, file);
    const source = await readFile(path, 'utf8');
    await writeFile(path, source.replace('/* eslint-disable */\n', ''));
  }
  if (check) {
    const destinationRoot = join(generatedRoot, 'scoresaber/live/v1');
    const currentFiles = (await readdir(destinationRoot)).filter((file) => file.endsWith('_pb.ts')).sort();
    const drift = new Set(files.length === currentFiles.length ? [] : [relative(root, destinationRoot)]);
    for (const file of files) {
      const generated = await readFile(join(generatedProtocolRoot, file), 'utf8');
      const destination = join(destinationRoot, file);
      const current = existsSync(destination) ? await readFile(destination, 'utf8') : '';
      if (current !== generated) drift.add(relative(root, destination));
    }
    if (drift.size > 0) {
      throw new Error(
        `generated live protocol is stale:\n${[...drift].map((file) => `- ${file}`).join('\n')}\nrun vp run proto:generate`,
      );
    }
  } else {
    await rm(generatedRoot, { force: true, recursive: true });
    await cp(temporaryRoot, generatedRoot, { recursive: true });
  }
} finally {
  await rm(temporaryRoot, { force: true, recursive: true });
}
