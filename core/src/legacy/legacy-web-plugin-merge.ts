import type { JigraGlobal } from '../definitions';
import type { WebPlugin } from '../web-plugin';

export const legacyRegisterWebPlugin = (jig: JigraGlobal, webPlugin: WebPlugin): void => {
  const config = webPlugin.config;
  const Plugins = jig.Plugins;

  if (!config?.name) {
    // TODO: add link to upgrade guide
    throw new Error(
      `Jigra WebPlugin is using the deprecated "registerWebPlugin()" function, but without the config. Please use "registerPlugin()" instead to register this web plugin."`
    );
  }

  // TODO: add link to upgrade guide
  console.warn(`Jigra plugin "${config.name}" is using the deprecated "registerWebPlugin()" function`);

  if (!Plugins[config.name] || config?.platforms?.includes(jig.getPlatform())) {
    // Add the web plugin into the plugins registry if there already isn't
    // an existing one. If it doesn't already exist, that means
    // there's no existing native implementation for it.
    // - OR -
    // If we already have a plugin registered (meaning it was defined in the native layer),
    // then we should only overwrite it if the corresponding web plugin activates on
    // a certain platform. For example: Geolocation uses the WebPlugin on Android but not iOS
    Plugins[config.name] = webPlugin;
  }
};
