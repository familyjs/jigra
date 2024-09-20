import { copy as fsCopy, pathExists, remove, writeJSON } from '@familyjs/utils-fs';
import { basename, join, relative, resolve } from 'path';

import c from '../colors';
import {
  checkWebDir,
  resolvePlatform,
  runHooks,
  runPlatformHook,
  runTask,
  isValidPlatform,
  selectPlatforms,
} from '../common';
import { getCordovaPlugins, handleCordovaPluginsJS, writeCordovaAndroidManifest } from '../cordova';
import type { Config } from '../definitions';
import { isFatal } from '../errors';
import { getIOSPlugins } from '../ios/common';
import { logger } from '../log';
import { getPlugins } from '../plugin';
import { generateIOSPackageJSON } from '../util/iosplugin';
import { allSerial } from '../util/promise';
import { copyWeb } from '../web/copy';

import { inlineSourceMaps } from './sourcemaps';

export async function copyCommand(config: Config, selectedPlatformName: string, inline = false): Promise<void> {
  if (selectedPlatformName && !(await isValidPlatform(selectedPlatformName))) {
    const platformDir = resolvePlatform(config, selectedPlatformName);
    if (platformDir) {
      await runPlatformHook(config, selectedPlatformName, platformDir, 'jigra:copy');
    } else {
      logger.error(`Platform ${c.input(selectedPlatformName)} not found.`);
    }
  } else {
    const platforms = await selectPlatforms(config, selectedPlatformName);
    try {
      await allSerial(platforms.map((platformName) => () => copy(config, platformName, inline)));
    } catch (e: any) {
      if (isFatal(e)) {
        throw e;
      }

      logger.error(e.stack ?? e);
    }
  }
}

export async function copy(config: Config, platformName: string, inline = false): Promise<void> {
  await runTask(c.success(c.strong(`copy ${platformName}`)), async () => {
    const result = await checkWebDir(config);
    if (result) {
      throw result;
    }

    await runHooks(config, platformName, config.app.rootDir, 'jigra:copy:before');

    const allPlugins = await getPlugins(config, platformName);
    let usesLiveUpdates = false;
    if (allPlugins.filter((plugin) => plugin.id === '@jigra/live-updates').length > 0) {
      usesLiveUpdates = true;
    }

    if (platformName === config.ios.name) {
      await copyWebDir(config, await config.ios.webDirAbs, config.app.webDirAbs);
      if (usesLiveUpdates && config.app.extConfig?.plugins?.LiveUpdates?.key) {
        await copySecureLiveUpdatesKey(
          config.app.extConfig.plugins.LiveUpdates.key,
          config.app.rootDir,
          config.ios.nativeTargetDirAbs
        );
      }
      await copyJigraConfig(config, config.ios.nativeTargetDirAbs);
      const cordovaPlugins = await getCordovaPlugins(config, platformName);
      await handleCordovaPluginsJS(cordovaPlugins, config, platformName);
      const iosPlugins = await getIOSPlugins(allPlugins);
      await generateIOSPackageJSON(config, iosPlugins);
    } else if (platformName === config.android.name) {
      await copyWebDir(config, config.android.webDirAbs, config.app.webDirAbs);
      if (usesLiveUpdates && config.app.extConfig?.plugins?.LiveUpdates?.key) {
        await copySecureLiveUpdatesKey(
          config.app.extConfig.plugins.LiveUpdates.key,
          config.app.rootDir,
          config.android.assetsDirAbs
        );
      }
      await copyJigraConfig(config, config.android.assetsDirAbs);
      const cordovaPlugins = await getCordovaPlugins(config, platformName);
      await handleCordovaPluginsJS(cordovaPlugins, config, platformName);
      await writeCordovaAndroidManifest(cordovaPlugins, config, platformName);
    } else if (platformName === config.web.name) {
      await copyWeb(config);
    } else {
      throw `Platform ${platformName} is not valid.`;
    }
    if (inline) {
      await inlineSourceMaps(config, platformName);
    }
  });

  await runHooks(config, platformName, config.app.rootDir, 'jigra:copy:after');
}

async function copyJigraConfig(config: Config, nativeAbsDir: string) {
  const nativeRelDir = relative(config.app.rootDir, nativeAbsDir);
  const nativeConfigFile = 'jigra.config.json';
  const nativeConfigFilePath = join(nativeAbsDir, nativeConfigFile);

  await runTask(`Creating ${c.strong(nativeConfigFile)} in ${nativeRelDir}`, async () => {
    delete (config.app.extConfig.android as any)?.buildOptions;
    await writeJSON(nativeConfigFilePath, config.app.extConfig, {
      spaces: '\t',
    });
  });
}

async function copyWebDir(config: Config, nativeAbsDir: string, webAbsDir: string) {
  const webRelDir = basename(webAbsDir);
  const nativeRelDir = relative(config.app.rootDir, nativeAbsDir);

  if (config.app.extConfig.server?.url && !(await pathExists(webAbsDir))) {
    logger.warn(
      `Cannot copy web assets from ${c.strong(webRelDir)} to ${nativeRelDir}\n` +
        `Web asset directory specified by ${c.input('webDir')} does not exist. This is not an error because ${c.input(
          'server.url'
        )} is set in config.`
    );

    return;
  }

  await runTask(`Copying web assets from ${c.strong(webRelDir)} to ${nativeRelDir}`, async () => {
    await remove(nativeAbsDir);
    return fsCopy(webAbsDir, nativeAbsDir);
  });
}

async function copySecureLiveUpdatesKey(secureLiveUpdatesKeyFile: string, rootDir: string, nativeAbsDir: string) {
  const keyAbsFromPath = join(rootDir, secureLiveUpdatesKeyFile);
  const keyAbsToPath = join(nativeAbsDir, basename(keyAbsFromPath));
  const keyRelToDir = relative(rootDir, nativeAbsDir);

  if (!(await pathExists(keyAbsFromPath))) {
    logger.warn(
      `Cannot copy Secure Live Updates signature file from ${c.strong(keyAbsFromPath)} to ${keyRelToDir}\n` +
        `Signature file does not exist at specified key path.`
    );

    return;
  }

  await runTask(
    `Copying Secure Live Updates key from ${c.strong(secureLiveUpdatesKeyFile)} to ${keyRelToDir}`,
    async () => {
      return fsCopy(keyAbsFromPath, keyAbsToPath);
    }
  );
}

interface LiveUpdateConfig {
  key?: string;
}

declare module '../declarations' {
  interface PluginsConfig {
    LiveUpdates?: LiveUpdateConfig;
  }
}
