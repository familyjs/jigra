import Debug from 'debug';
import { resolve } from 'path';

import c from '../colors';
import { promptForPlatformTarget, runTask } from '../common';
import type { Config } from '../definitions';
import type { RunCommandOptions } from '../tasks/run';
import { runFmlNativeRun, getPlatformTargets } from '../util/fml-native-run';
import { runCommand } from '../util/subprocess';

const debug = Debug('jigra:android:run');

export async function runAndroid(
  config: Config,
  { target: selectedTarget, flavor: selectedFlavor, forwardPorts: selectedPorts }: RunCommandOptions
): Promise<void> {
  const target = await promptForPlatformTarget(await getPlatformTargets('android'), selectedTarget);

  const runFlavor = selectedFlavor || config.android?.flavor || '';

  const arg = `assemble${runFlavor}Debug`;
  const gradleArgs = [arg];

  debug('Invoking ./gradlew with args: %O', gradleArgs);

  try {
    await runTask('Running Gradle build', async () =>
      runCommand('./gradlew', gradleArgs, {
        cwd: config.android.platformDirAbs,
      })
    );
  } catch (e: any) {
    if (e.includes('EACCES')) {
      throw `gradlew file does not have executable permissions. This can happen if the Android platform was added on a Windows machine. Please run ${c.strong(
        `chmod +x ./${config.android.platformDir}/gradlew`
      )} and try again.`;
    } else {
      throw e;
    }
  }

  const pathToApk = `${config.android.platformDirAbs}/${config.android.appDir}/build/outputs/apk${
    runFlavor !== '' ? '/' + runFlavor : ''
  }/debug`;

  const apkName = `app${runFlavor !== '' ? '-' + runFlavor : ''}-debug.apk`;

  const apkPath = resolve(pathToApk, apkName);

  const fmlNativeRunArgs = ['android', '--app', apkPath, '--target', target.id];

  if (selectedPorts) {
    fmlNativeRunArgs.push('--forward', `${selectedPorts}`);
  }

  debug('Invoking fml-native-run with args: %O', fmlNativeRunArgs);

  await runTask(`Deploying ${c.strong(apkName)} to ${c.input(target.id)}`, async () =>
    runFmlNativeRun(fmlNativeRunArgs)
  );
}
