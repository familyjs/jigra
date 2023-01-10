import { pathExists } from '@navify/utils-fs';
import { prettyPath } from '@navify/utils-terminal';

import { addAndroid, createLocalProperties } from '../android/add';
import {
  editProjectSettingsAndroid,
  checkAndroidPackage,
} from '../android/common';
import c from '../colors';
import {
  getKnownPlatforms,
  check,
  checkAppConfig,
  checkPackage,
  resolvePlatform,
  runPlatformHook,
  runTask,
  isValidPlatform,
  isValidCommunityPlatform,
  promptForPlatform,
  getProjectPlatformDirectory,
} from '../common';
import type { CheckFunction } from '../common';
import type { Config } from '../definitions';
import { fatal, isFatal } from '../errors';
import { addIOS } from '../ios/add';
import {
  editProjectSettingsIOS,
  checkIOSPackage,
  checkCocoaPods,
} from '../ios/common';
import { logger, logSuccess, output } from '../log';

import { sync } from './sync';

export async function addCommand(
  config: Config,
  selectedPlatformName: string,
): Promise<void> {
  if (selectedPlatformName && !(await isValidPlatform(selectedPlatformName))) {
    const platformDir = resolvePlatform(config, selectedPlatformName);
    if (platformDir) {
      await runPlatformHook(
        config,
        selectedPlatformName,
        platformDir,
        'jigra:add',
      );
    } else {
      let msg = `Platform ${c.input(selectedPlatformName)} not found.`;

      if (await isValidCommunityPlatform(selectedPlatformName)) {
        msg += `\nTry installing ${c.strong(
          `@jigra-community/${selectedPlatformName}`,
        )} and adding the platform again.`;
      }

      logger.error(msg);
    }
  } else {
    const knownPlatforms = await getKnownPlatforms();
    const platformName = await promptForPlatform(
      knownPlatforms,
      `Please choose a platform to add:`,
      selectedPlatformName,
    );

    if (platformName === config.web.name) {
      webWarning();
      return;
    }

    const existingPlatformDir = await getProjectPlatformDirectory(
      config,
      platformName,
    );

    if (existingPlatformDir) {
      fatal(
        `${c.input(platformName)} platform already exists.\n` +
          `To re-add this platform, first remove ${c.strong(
            prettyPath(existingPlatformDir),
          )}, then run this command again.\n` +
          `${c.strong(
            'WARNING',
          )}: Your native project will be completely removed.`,
      );
    }

    try {
      await check([
        () => checkPackage(),
        () => checkAppConfig(config),
        ...addChecks(config, platformName),
      ]);
      await doAdd(config, platformName);
      await editPlatforms(config, platformName);

      if (await pathExists(config.app.webDirAbs)) {
        await sync(config, platformName, false);
        if (platformName === config.android.name) {
          await runTask('Syncing Gradle', async () => {
            return createLocalProperties(config.android.platformDirAbs);
          });
        }
      } else {
        logger.warn(
          `${c.success(c.strong('sync'))} could not run--missing ${c.strong(
            config.app.webDir,
          )} directory.`,
        );
      }

      printNextSteps(platformName);
    } catch (e) {
      if (!isFatal(e)) {
        fatal(e.stack ?? e);
      }

      throw e;
    }
  }
}

function printNextSteps(platformName: string) {
  logSuccess(`${c.strong(platformName)} platform added!`);
  output.write(
    `Follow the Developer Workflow guide to get building:\n${c.strong(
      `https://jigrajs.web.app/docs/basics/workflow`,
    )}\n`,
  );
}

function addChecks(config: Config, platformName: string): CheckFunction[] {
  if (platformName === config.ios.name) {
    return [() => checkIOSPackage(config), () => checkCocoaPods(config)];
  } else if (platformName === config.android.name) {
    return [() => checkAndroidPackage(config)];
  } else if (platformName === config.web.name) {
    return [];
  } else {
    throw `Platform ${platformName} is not valid.`;
  }
}

async function doAdd(config: Config, platformName: string): Promise<void> {
  await runTask(c.success(c.strong('add')), async () => {
    if (platformName === config.ios.name) {
      await addIOS(config);
    } else if (platformName === config.android.name) {
      await addAndroid(config);
    }
  });
}

async function editPlatforms(config: Config, platformName: string) {
  if (platformName === config.ios.name) {
    await editProjectSettingsIOS(config);
  } else if (platformName === config.android.name) {
    await editProjectSettingsAndroid(config);
  }
}

function webWarning() {
  logger.error(
    `Not adding platform ${c.strong('web')}.\n` +
      `In Jigra, the web platform is just your web app! For example, if you have a React or Kdu project, the web platform is that project.\n` +
      `To add Jigra functionality to your web app, follow the Web Getting Started Guide: ${c.strong(
        'https://jigrajs.web.app/docs/web',
      )}`,
  );
}
