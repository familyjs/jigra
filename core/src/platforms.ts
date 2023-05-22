import type { PluginImplementations } from './definitions';
import type { PluginHeader } from './definitions-internal';

export interface JigraPlatform {
  name: string;
  getPlatform?(): string;
  isPluginAvailable?(pluginName: string): boolean;
  getPluginHeader?(pluginName: string): PluginHeader | undefined;
  registerPlugin?(pluginName: string, jsImplementations: PluginImplementations): any;
  isNativePlatform?(): boolean;
}

export interface JigraPlatformsInstance {
  currentPlatform: JigraPlatform;
  platforms: Map<string, JigraPlatform>;
  addPlatform(name: string, platform: JigraPlatform): void;
  setPlatform(name: string): void;
}

const createJigraPlatforms = (win: any): JigraPlatformsInstance => {
  const defaultPlatformMap = new Map<string, JigraPlatform>();
  defaultPlatformMap.set('web', { name: 'web' });

  const jigPlatforms: JigraPlatformsInstance = win.JigraPlatforms || {
    currentPlatform: { name: 'web' },
    platforms: defaultPlatformMap,
  };

  const addPlatform = (name: string, platform: JigraPlatform) => {
    jigPlatforms.platforms.set(name, platform);
  };

  const setPlatform = (name: string) => {
    if (jigPlatforms.platforms.has(name)) {
      jigPlatforms.currentPlatform = jigPlatforms.platforms.get(name);
    }
  };

  jigPlatforms.addPlatform = addPlatform;
  jigPlatforms.setPlatform = setPlatform;

  return jigPlatforms;
};

const initPlatforms = (win: any) => (win.JigraPlatforms = createJigraPlatforms(win));

/**
 * @deprecated Set `JigraCustomPlatform` on the window object prior to runtime executing in the web app instead
 */
export const JigraPlatforms = /*#__PURE__*/ initPlatforms(
  (typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
    ? self
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : {}) as any
);
/**
 * @deprecated Set `JigraCustomPlatform` on the window object prior to runtime executing in the web app instead
 */
export const addPlatform = JigraPlatforms.addPlatform;
/**
 * @deprecated Set `JigraCustomPlatform` on the window object prior to runtime executing in the web app instead
 */
export const setPlatform = JigraPlatforms.setPlatform;
