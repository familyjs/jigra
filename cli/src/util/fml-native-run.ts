import { dirname } from 'path';

import c from '../colors';
import type { PlatformTarget } from '../common';
import { fatal } from '../errors';

import { resolveNode } from './node';
import { runCommand } from './subprocess';
import type { RunCommandOptions } from './subprocess';

export async function runFmlNativeRun(
  args: readonly string[],
  options: RunCommandOptions = {},
): Promise<string> {
  const p = resolveNode(
    __dirname,
    dirname('fml-native-run/package'),
    'bin/fml-native-run',
  );

  if (!p) {
    fatal(`${c.input('fml-native-run')} not found.`);
  }

  return await runCommand(p, args, options);
}

export async function getPlatformTargets(
  platformName: string,
): Promise<PlatformTarget[]> {
  const errors = [];
  try {
    const output = await runFmlNativeRun([platformName, '--list', '--json']);
    const parsedOutput = JSON.parse(output);
    if (parsedOutput.devices.length || parsedOutput.virtualDevices.length) {
      return [
        ...parsedOutput.devices.map((t: any) => ({ ...t, virtual: false })),
        ...parsedOutput.virtualDevices.map((t: any) => ({
          ...t,
          virtual: true,
        })),
      ];
    } else {
      parsedOutput.errors.map((e: any) => {
        errors.push(e);
      });
    }
  } catch (e: any) {
    const err = JSON.parse(e);
    errors.push(err);
  }
  const plural = errors.length > 1 ? 's' : '';
  const errMsg = `${c.strong('fml-native-run')} failed with error${plural}\n
  ${errors
    .map((e: any) => {
      return `\t${c.strong(e.code)}: ${e.error}`;
    })
    .join('\n')}
  \n\tMore details for this error${plural} may be available online: ${c.strong(
    'https://github.com/familyjs/fml-native-run/wiki/Android-Errors',
  )}
  `;
  throw errMsg;
}
