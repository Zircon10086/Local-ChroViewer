import { spawnSync } from 'node:child_process';

export function runCommand(command: string, arguments_: readonly string[], cwd: string, failureMessage: string) {
  const result = spawnSync(command, arguments_, { cwd, encoding: 'utf8' });
  if (result.error !== undefined) throw new Error(failureMessage, { cause: result.error });
  if (result.status !== 0) throw new Error(`${failureMessage}\n${result.stderr || result.stdout}`);
}
