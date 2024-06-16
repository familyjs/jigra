import Debug from 'debug';
import { basename, resolve } from 'path';

import c from '../colors';
import { promptForPlatformTarget, runTask } from '../common';
import type { Config } from '../definitions';
import type { RunCommandOptions } from '../tasks/run';
import { runFmlNativeRun, getPlatformTargets } from '../util/fml-native-run';
import { runCommand } from '../util/subprocess';

const debug = Debug('jigra:ios:run');

export async function runIOS(
  config: Config,
  { target: selectedTarget, scheme: selectedScheme }: RunCommandOptions
): Promise<void> {
  const target = await promptForPlatformTarget(await getPlatformTargets('ios'), selectedTarget);

  const runScheme = selectedScheme || config.ios.scheme;

  const derivedDataPath = resolve(config.ios.platformDirAbs, 'DerivedData', target.id);

  const xcodebuildArgs = [
    '-workspace',
    basename(await config.ios.nativeXcodeWorkspaceDirAbs),
    '-scheme',
    runScheme,
    '-configuration',
    'Debug',
    '-destination',
    `id=${target.id}`,
    '-derivedDataPath',
    derivedDataPath,
  ];

  debug('Invoking xcodebuild with args: %O', xcodebuildArgs);

  await runTask('Running xcodebuild', async () =>
    runCommand('xcrun', ['xcodebuild', ...xcodebuildArgs], {
      cwd: config.ios.nativeProjectDirAbs,
    })
  );

  const appName = `${runScheme}.app`;
  const appPath = resolve(
    derivedDataPath,
    'Build/Products',
    target.virtual ? 'Debug-iphonesimulator' : 'Debug-iphoneos',
    appName
  );

  const fmlNativeRunArgs = ['ios', '--app', appPath, '--target', target.id];

  debug('Invoking fml-native-run with args: %O', fmlNativeRunArgs);

  await runTask(`Deploying ${c.strong(appName)} to ${c.input(target.id)}`, async () =>
    runFmlNativeRun(fmlNativeRunArgs)
  );
}
