import { sleepForever } from '@familyjs/utils-process';
import { columnar } from '@familyjs/utils-terminal';

import { runAndroid } from '../android/run';
import c from '../colors';
import {
  isValidPlatform,
  resolvePlatform,
  runPlatformHook,
  selectPlatforms,
  promptForPlatform,
  getPlatformTargetName,
} from '../common';
import type { AppConfig, Config } from '../definitions';
import { fatal, isFatal } from '../errors';
import { runIOS } from '../ios/run';
import { logger, output } from '../log';
import { getPlatformTargets } from '../util/fml-native-run';
import { JigLiveReloadHelper } from '../util/livereload';

import { sync } from './sync';

export interface RunCommandOptions {
  scheme?: string;
  flavor?: string;
  list?: boolean;
  target?: string;
  sync?: boolean;
  forwardPorts?: string;
  liveReload?: boolean;
  host?: string;
  port?: string;
  configuration?: string;
}

export async function runCommand(
  config: Config,
  selectedPlatformName: string,
  options: RunCommandOptions
): Promise<void> {
  options.host = options.host ?? JigLiveReloadHelper.getIpAddress() ?? 'localhost';
  options.port = options.port ?? '3000';
  if (selectedPlatformName && !(await isValidPlatform(selectedPlatformName))) {
    const platformDir = resolvePlatform(config, selectedPlatformName);
    if (platformDir) {
      await runPlatformHook(config, selectedPlatformName, platformDir, 'jigra:run');
    } else {
      logger.error(`Platform ${c.input(selectedPlatformName)} not found.`);
    }
  } else {
    const platforms = await selectPlatforms(config, selectedPlatformName);
    let platformName: string;
    if (platforms.length === 1) {
      platformName = platforms[0];
    } else {
      platformName = await promptForPlatform(
        platforms.filter(createRunnablePlatformFilter(config)),
        `Please choose a platform to run:`
      );
    }

    if (options.list) {
      const targets = await getPlatformTargets(platformName);
      const outputTargets = targets.map((t) => ({
        name: getPlatformTargetName(t),
        api: `${t.platform === 'ios' ? 'iOS' : 'API'} ${t.sdkVersion}`,
        id: t.id ?? '?',
      }));

      // TODO: make hidden commander option (https://github.com/tj/commander.js/issues/1106)
      if (process.argv.includes('--json')) {
        process.stdout.write(`${JSON.stringify(outputTargets)}\n`);
      } else {
        const rows = outputTargets.map((t) => [t.name, t.api, t.id]);

        output.write(
          `${columnar(rows, {
            headers: ['Name', 'API', 'Target ID'],
            vsep: ' ',
          })}\n`
        );
      }

      return;
    }

    try {
      if (options.sync) {
        if (options.liveReload) {
          const newExtConfig = await JigLiveReloadHelper.editExtConfigForLiveReload(config, platformName, options);
          const cfg: {
            -readonly [K in keyof Config]: Config[K];
          } = config;
          const cfgapp: {
            -readonly [K in keyof AppConfig]: AppConfig[K];
          } = config.app;
          cfgapp.extConfig = newExtConfig;
          cfg.app = cfgapp;
          await sync(cfg, platformName, false, true);
        } else {
          await sync(config, platformName, false, true);
        }
      } else {
        if (options.liveReload) {
          await JigLiveReloadHelper.editJigConfigForLiveReload(config, platformName, options);
        }
      }
      await run(config, platformName, options);
      if (options.liveReload) {
        process.on('SIGINT', async () => {
          if (options.liveReload) {
            await JigLiveReloadHelper.revertJigConfigForLiveReload();
          }
          process.exit();
        });
        console.log(
          `\nApp running with live reload listing for: http://${options.host}:${options.port}. Press Ctrl+C to quit.`
        );
        await sleepForever();
      }
    } catch (e: any) {
      if (!isFatal(e)) {
        fatal(e.stack ?? e);
      }

      throw e;
    }
  }
}

export async function run(config: Config, platformName: string, options: RunCommandOptions): Promise<void> {
  if (platformName == config.ios.name) {
    await runIOS(config, options);
  } else if (platformName === config.android.name) {
    await runAndroid(config, options);
  } else if (platformName === config.web.name) {
    return;
  } else {
    throw `Platform ${platformName} is not valid.`;
  }
}

function createRunnablePlatformFilter(config: Config): (platform: string) => boolean {
  return (platform) => platform === config.ios.name || platform === config.android.name;
}
