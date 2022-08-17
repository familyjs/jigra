import type { JigraGlobal, PluginImplementations } from './definitions';
import type {
  JigraCustomPlatformInstance,
  JigraInstance,
  PluginHeader,
  WindowJigra,
} from './definitions-internal';
import type { JigraPlatformsInstance } from './platforms';
import { JigraException, getPlatformId, ExceptionCode } from './util';

export interface RegisteredPlugin {
  readonly name: string;
  readonly proxy: any;
  readonly platforms: ReadonlySet<string>;
}

export const createJigra = (win: WindowJigra): JigraInstance => {
  const jigCustomPlatform: JigraCustomPlatformInstance =
    win.JigraCustomPlatform || null;
  const jig: JigraInstance = win.Jigra || ({} as any);
  const Plugins = (jig.Plugins = jig.Plugins || ({} as any));
  /**
   * @deprecated Use `jigCustomPlatform` instead, default functions like registerPlugin will function with the new object.
   */
  const jigPlatforms: JigraPlatformsInstance = win.JigraPlatforms;

  const defaultGetPlatform = () => {
    return jigCustomPlatform !== null
      ? jigCustomPlatform.name
      : getPlatformId(win);
  };
  const getPlatform =
    jigPlatforms?.currentPlatform?.getPlatform || defaultGetPlatform;

  const defaultIsNativePlatform = () => getPlatform() !== 'web';
  const isNativePlatform =
    jigPlatforms?.currentPlatform?.isNativePlatform || defaultIsNativePlatform;

  const defaultIsPluginAvailable = (pluginName: string): boolean => {
    const plugin = registeredPlugins.get(pluginName);

    if (plugin?.platforms.has(getPlatform())) {
      // JS implementation available for the current platform.
      return true;
    }

    if (getPluginHeader(pluginName)) {
      // Native implementation available.
      return true;
    }

    return false;
  };
  const isPluginAvailable =
    jigPlatforms?.currentPlatform?.isPluginAvailable ||
    defaultIsPluginAvailable;

  const defaultGetPluginHeader = (
    pluginName: string,
  ): PluginHeader | undefined =>
    jig.PluginHeaders?.find(h => h.name === pluginName);
  const getPluginHeader =
    jigPlatforms?.currentPlatform?.getPluginHeader || defaultGetPluginHeader;

  const handleError = (err: Error) => win.console.error(err);

  const pluginMethodNoop = (
    _target: any,
    prop: PropertyKey,
    pluginName: string,
  ) => {
    return Promise.reject(
      `${pluginName} does not have an implementation of "${prop as any}".`,
    );
  };

  const registeredPlugins = new Map<string, RegisteredPlugin>();

  const defaultRegisterPlugin = (
    pluginName: string,
    jsImplementations: PluginImplementations = {},
  ): any => {
    const registeredPlugin = registeredPlugins.get(pluginName);
    if (registeredPlugin) {
      console.warn(
        `Jigra plugin "${pluginName}" already registered. Cannot register plugins twice.`,
      );

      return registeredPlugin.proxy;
    }

    const platform = getPlatform();
    const pluginHeader = getPluginHeader(pluginName);
    let jsImplementation: any;

    const loadPluginImplementation = async (): Promise<any> => {
      if (!jsImplementation && platform in jsImplementations) {
        jsImplementation =
          typeof jsImplementations[platform] === 'function'
            ? (jsImplementation = await jsImplementations[platform]())
            : (jsImplementation = jsImplementations[platform]);
      } else if (
        jigCustomPlatform !== null &&
        !jsImplementation &&
        'web' in jsImplementations
      ) {
        jsImplementation =
          typeof jsImplementations['web'] === 'function'
            ? (jsImplementation = await jsImplementations['web']())
            : (jsImplementation = jsImplementations['web']);
      }

      return jsImplementation;
    };

    const createPluginMethod = (
      impl: any,
      prop: PropertyKey,
    ): ((...args: any[]) => any) => {
      if (pluginHeader) {
        const methodHeader = pluginHeader?.methods.find(m => prop === m.name);
        if (methodHeader) {
          if (methodHeader.rtype === 'promise') {
            return (options: any) =>
              jig.nativePromise(pluginName, prop.toString(), options);
          } else {
            return (options: any, callback: any) =>
              jig.nativeCallback(
                pluginName,
                prop.toString(),
                options,
                callback,
              );
          }
        } else if (impl) {
          return impl[prop]?.bind(impl);
        }
      } else if (impl) {
        return impl[prop]?.bind(impl);
      } else {
        throw new JigraException(
          `"${pluginName}" plugin is not implemented on ${platform}`,
          ExceptionCode.Unimplemented,
        );
      }
    };

    const createPluginMethodWrapper = (prop: PropertyKey) => {
      let remove: (() => void) | undefined;
      const wrapper = (...args: any[]) => {
        const p = loadPluginImplementation().then(impl => {
          const fn = createPluginMethod(impl, prop);

          if (fn) {
            const p = fn(...args);
            remove = p?.remove;
            return p;
          } else {
            throw new JigraException(
              `"${pluginName}.${
                prop as any
              }()" is not implemented on ${platform}`,
              ExceptionCode.Unimplemented,
            );
          }
        });

        if (prop === 'addListener') {
          (p as any).remove = async () => remove();
        }

        return p;
      };

      // Some flair ✨
      wrapper.toString = () => `${prop.toString()}() { [jigra code] }`;
      Object.defineProperty(wrapper, 'name', {
        value: prop,
        writable: false,
        configurable: false,
      });

      return wrapper;
    };

    const addListener = createPluginMethodWrapper('addListener');
    const removeListener = createPluginMethodWrapper('removeListener');
    const addListenerNative = (eventName: string, callback: any) => {
      const call = addListener({ eventName }, callback);
      const remove = async () => {
        const callbackId = await call;

        removeListener(
          {
            eventName,
            callbackId,
          },
          callback,
        );
      };

      const p = new Promise(resolve => call.then(() => resolve({ remove })));

      (p as any).remove = async () => {
        console.warn(`Using addListener() without 'await' is deprecated.`);
        await remove();
      };

      return p;
    };

    const proxy = new Proxy(
      {},
      {
        get(_, prop) {
          switch (prop) {
            // https://github.com/facebook/react/issues/20030
            case '$$typeof':
              return undefined;
            case 'toJSON':
              return () => ({});
            case 'addListener':
              return pluginHeader ? addListenerNative : addListener;
            case 'removeListener':
              return removeListener;
            default:
              return createPluginMethodWrapper(prop);
          }
        },
      },
    );

    Plugins[pluginName] = proxy;

    registeredPlugins.set(pluginName, {
      name: pluginName,
      proxy,
      platforms: new Set([
        ...Object.keys(jsImplementations),
        ...(pluginHeader ? [platform] : []),
      ]),
    });

    return proxy;
  };
  const registerPlugin =
    jigPlatforms?.currentPlatform?.registerPlugin || defaultRegisterPlugin;

  // Add in convertFileSrc for web, it will already be available in native context
  if (!jig.convertFileSrc) {
    jig.convertFileSrc = filePath => filePath;
  }

  jig.getPlatform = getPlatform;
  jig.handleError = handleError;
  jig.isNativePlatform = isNativePlatform;
  jig.isPluginAvailable = isPluginAvailable;
  jig.pluginMethodNoop = pluginMethodNoop;
  jig.registerPlugin = registerPlugin;
  jig.Exception = JigraException;
  jig.DEBUG = !!jig.DEBUG;
  jig.isLoggingEnabled = !!jig.isLoggingEnabled;

  // Deprecated props
  jig.platform = jig.getPlatform();
  jig.isNative = jig.isNativePlatform();

  return jig;
};

export const initJigraGlobal = (win: any): JigraGlobal =>
  (win.Jigra = createJigra(win));
