import { copy } from '@familyjs/utils-fs';
import { join } from 'path';

import c from '../colors';
import { runTask } from '../common';
import type { Config } from '../definitions';
import { fatal } from '../errors';
import { resolveNode } from '../util/node';

export async function copyWeb(config: Config): Promise<void> {
  if (config.app.bundledWebRuntime) {
    const runtimePath = resolveNode(
      config.app.rootDir,
      '@jigra/core',
      'dist',
      'jigra.js',
    );
    if (!runtimePath) {
      fatal(
        `Unable to find ${c.strong(
          'node_modules/@jigra/core/dist/jigra.js',
        )}.\n` + `Are you sure ${c.strong('@jigra/core')} is installed?`,
      );
    }

    return runTask(`Copying ${c.strong('jigra.js')} to web dir`, () => {
      return copy(runtimePath, join(config.app.webDirAbs, 'jigra.js'));
    });
  }
}
