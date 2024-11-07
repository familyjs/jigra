import type { ReaddirPOptions } from '@familyjs/utils-fs';
import { readFileSync, readdirp, readJSONSync, writeJSONSync } from '@familyjs/utils-fs';
import { resolve } from 'path';

import { getCordovaPlugins } from '../cordova';
import type { Config } from '../definitions';
import type { Plugin } from '../plugin';
import { getPluginType, PluginType } from '../plugin';

export async function getPluginFiles(plugins: Plugin[]): Promise<string[]> {
  let filenameList: string[] = [];

  const options: ReaddirPOptions = {
    filter: (item) => {
      if (item.stats.isFile() && (item.path.endsWith('.swift') || item.path.endsWith('.m'))) {
        return true;
      } else {
        return false;
      }
    },
  };

  for (const plugin of plugins) {
    if (plugin.ios && getPluginType(plugin, 'ios') === PluginType.Core) {
      const pluginPath = resolve(plugin.rootPath, plugin.ios?.path);
      const filenames = await readdirp(pluginPath, options);
      filenameList = filenameList.concat(filenames);
    }
  }

  return filenameList;
}

export async function findPluginClasses(files: string[]): Promise<string[]> {
  const classList: string[] = [];

  for (const file of files) {
    const fileData = readFileSync(file, 'utf-8');
    const swiftPluginRegex = RegExp(/@objc\(([A-Za-z0-9_-]+)\)/);
    const objcPluginRegex = RegExp(/JIG_PLUGIN\(([A-Za-z0-9_-]+)/);

    const swiftMatches = swiftPluginRegex.exec(fileData);
    if (swiftMatches?.[1] && !classList.includes(swiftMatches[1])) {
      classList.push(swiftMatches[1]);
    }

    const objcMatches = objcPluginRegex.exec(fileData);
    if (objcMatches?.[1] && !classList.includes(objcMatches[1])) {
      classList.push(objcMatches[1]);
    }
  }

  return classList;
}

export async function writePluginJSON(config: Config, classList: string[]): Promise<void> {
  const jigJSONFile = resolve(config.ios.nativeTargetDirAbs, 'jigra.config.json');
  const jigJSON = readJSONSync(jigJSONFile);
  jigJSON['packageClassList'] = classList;
  writeJSONSync(jigJSONFile, jigJSON, { spaces: '\t' });
}

export async function generateIOSPackageJSON(config: Config, plugins: Plugin[]): Promise<void> {
  const fileList = await getPluginFiles(plugins);
  const classList = await findPluginClasses(fileList);
  const cordovaPlugins = await getCordovaPlugins(config, 'ios');
  if (cordovaPlugins.length > 0) {
    classList.push('CDVPlugin');
  }
  writePluginJSON(config, classList);
}
