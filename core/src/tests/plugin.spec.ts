/**
 * @jest-environment jsdom
 */

import { initBridge } from '../../native-bridge';
import type { JigraGlobal, Plugin } from '../definitions';
import type { WindowJigra, JigraInstance } from '../definitions-internal';
import { initJigraGlobal } from '../runtime';
import { ExceptionCode } from '../util';
import { WebPlugin } from '../web-plugin';

describe('plugin', () => {
  let win: WindowJigra;
  let jig: JigraGlobal;

  beforeEach(() => {
    win = {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.setImmediate = global.setTimeout;
  });

  it('error from missing method from native implementation', async (done) => {
    // mock the global with the android bridge
    mockAndroidBridge();
    initBridge(win);

    // simulate native adding the plugin header with a garbage method before
    // the core runtime
    mockAndroidPlugin('Awesome', 'whatever');

    // core runtime creates the actual Jigra instance
    jig = initJigraGlobal(win);

    try {
      const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome');
      await Awesome.mph();
      done('did not throw');
    } catch (e) {
      expect(e.message).toBe(`"Awesome.mph()" is not implemented on android`);
      expect(e.code).toBe(ExceptionCode.Unimplemented);
    }

    try {
      await jig.Plugins.Awesome.mph();
      done('did not throw');
    } catch (e) {
      expect(e.message).toBe(`"Awesome.mph()" is not implemented on android`);
      expect(e.code).toBe(ExceptionCode.Unimplemented);
      done();
    }
  });

  it('native implementation', async () => {
    // mock the global with the android bridge
    mockAndroidBridge();
    initBridge(win);

    // simulate native adding the plugin header before the core runtime
    mockAndroidPlugin('Awesome', 'mph');

    // core runtime creates the actual Jigra instance
    jig = initJigraGlobal(win);
    (jig as JigraInstance).nativePromise = async () => 88 as any;

    // user runtime registers the plugin
    const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome');

    const results1 = await Awesome.mph();
    expect(results1).toBe(88);

    const results2 = await jig.Plugins.Awesome.mph();
    expect(results2).toBe(88);
  });

  it('error from missing native implementation', async (done) => {
    // mock the global with the android bridge
    mockAndroidBridge();
    initBridge(win);

    // do not simulate native adding the bridge before the core runtime

    // core runtime creates the actual Jigra instance
    jig = initJigraGlobal(win);

    try {
      const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome');
      await Awesome.mph();
      done('did not throw');
    } catch (e) {
      expect(e.message).toBe(`"Awesome" plugin is not implemented on android`);
      expect(e.code).toBe(ExceptionCode.Unimplemented);
    }

    try {
      await jig.Plugins.Awesome.mph();
      done('did not throw');
    } catch (e) {
      expect(e.message).toBe(`"Awesome" plugin is not implemented on android`);
      expect(e.code).toBe(ExceptionCode.Unimplemented);
      done();
    }
  });

  it('error lazy loading implementation', async (done) => {
    mockAndroidBridge();
    initBridge(win);

    jig = initJigraGlobal(win);

    const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome', {
      android: async () => {
        throw 'unable to load module';
      },
    });

    try {
      await Awesome.mph();
      done('did not throw');
    } catch (e) {
      expect(e).toBe('unable to load module');
    }

    try {
      await jig.Plugins.Awesome.mph();
      done('did not throw');
    } catch (e) {
      expect(e).toBe('unable to load module');
      done();
    }
  });

  it('call method on lazy loaded implementation', async () => {
    mockAndroidBridge();
    initBridge(win);

    jig = initJigraGlobal(win);

    const AwesomePlugin = class {
      val = 88;
      mph() {
        return this.val;
      }
    };

    const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome', {
      android: async () => new AwesomePlugin(),
    });

    const p1 = Awesome.mph();
    const p2 = jig.Plugins.Awesome.mph();
    expect(await p1).toBe(88);
    expect(await p2).toBe(88);

    const rtn2 = await Awesome.mph();
    expect(rtn2).toBe(88);
  });

  it('call method on already loaded implementation', async () => {
    mockAndroidBridge();
    initBridge(win);

    jig = initJigraGlobal(win);

    const AwesomePlugin = class {
      val = 88;
      mph() {
        return this.val;
      }
    };

    const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome', {
      android: new AwesomePlugin(),
    });

    const rtn1 = await Awesome.mph();
    expect(rtn1).toBe(88);

    const rtn2 = await Awesome.mph();
    expect(rtn2).toBe(88);

    const rtn3 = await jig.Plugins.Awesome.mph();
    expect(rtn3).toBe(88);
  });

  it('call method that had an error', async () => {
    mockAndroidBridge();
    initBridge(win);

    jig = initJigraGlobal(win);

    const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome', {
      android: {
        mph: async () => {
          throw new Error('nope!');
        },
      },
    });

    expect(async () => Awesome.mph()).rejects.toThrowError('nope!');
    expect(async () => jig.Plugins.Awesome.mph()).rejects.toThrowError('nope!');
  });

  it('missing method on lazy loaded implementation', async (done) => {
    jig = initJigraGlobal(win);

    const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome', {
      web: async () => ({}),
    });

    try {
      await Awesome.mph();
      done('did not throw error');
    } catch (e) {
      expect(e.message).toBe(`"Awesome.mph()" is not implemented on web`);
      expect(e.code).toBe(ExceptionCode.Unimplemented);
    }

    try {
      await jig.Plugins.Awesome.mph();
      done('did not throw error');
    } catch (e) {
      expect(e.message).toBe(`"Awesome.mph()" is not implemented on web`);
      expect(e.code).toBe(ExceptionCode.Unimplemented);
      done();
    }
  });

  it('missing method on already loaded implementation', async (done) => {
    mockAndroidBridge();
    initBridge(win);

    jig = initJigraGlobal(win);

    const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome', {
      android: {},
    });

    try {
      await Awesome.mph();
      done('should throw error');
    } catch (e) {
      expect(e.message).toBe(`"Awesome.mph()" is not implemented on android`);
      expect(e.code).toBe(ExceptionCode.Unimplemented);
    }

    try {
      await jig.Plugins.Awesome.mph();
      done('should throw error');
    } catch (e) {
      expect(e.message).toBe(`"Awesome.mph()" is not implemented on android`);
      expect(e.code).toBe(ExceptionCode.Unimplemented);
      done();
    }
  });

  it('no web platform implementation', async (done) => {
    jig = initJigraGlobal(win);
    expect(jig.getPlatform()).toBe('web');

    const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome');

    try {
      await Awesome.mph();
      done('should throw error');
    } catch (e) {
      expect(e.message).toBe(`"Awesome" plugin is not implemented on web`);
      expect(e.code).toBe(ExceptionCode.Unimplemented);
    }

    try {
      await jig.Plugins.Awesome.mph();
      done('should throw error');
    } catch (e) {
      expect(e.message).toBe(`"Awesome" plugin is not implemented on web`);
      expect(e.code).toBe(ExceptionCode.Unimplemented);
      done();
    }
  });

  it('no native platform implementation', async (done) => {
    mockAndroidBridge();
    initBridge(win);

    jig = initJigraGlobal(win);
    expect(jig.getPlatform()).toBe('android');

    const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome', {
      web: { mph: async () => 88 },
    });

    try {
      await Awesome.mph();
      done('should throw error');
    } catch (e) {
      expect(e.message).toBe(`"Awesome" plugin is not implemented on android`);
      expect(e.code).toBe(ExceptionCode.Unimplemented);
    }

    try {
      await jig.Plugins.Awesome.mph();
      done('should throw error');
    } catch (e) {
      expect(e.message).toBe(`"Awesome" plugin is not implemented on android`);
      expect(e.code).toBe(ExceptionCode.Unimplemented);
      done();
    }
  });

  it('do not double register a plugin', () => {
    mockAndroidBridge();
    initBridge(win);
    mockAndroidPlugin('Awesome', 'mph');

    jig = initJigraGlobal(win);
    expect(jig.getPlatform()).toBe('android');

    const Awesome1 = jig.registerPlugin<AwesomePlugin>('Awesome');
    const Awesome2 = jig.registerPlugin<AwesomePlugin>('Awesome');

    expect(Awesome1).toBe(Awesome2);
  });

  it('addListener, w/out addListener on implementation', async (done) => {
    const LazyWeb = class {
      val = 88;
      async addListener(_eventName: string, fn: any) {
        fn(this.val);
      }
    };

    jig = initJigraGlobal(win);
    const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome', {
      web: async () => new LazyWeb(),
    });

    Awesome.addListener('eventName', (data) => {
      try {
        expect(data).toEqual(88);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it('sync addListener on android', async () => {
    mockAndroidBridge();
    initBridge(win);
    mockAndroidPlugin('Awesome', 'mph');

    jig = initJigraGlobal(win);

    const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome');

    const rtn = Awesome.addListener('eventName', () => {
      // ignore
    });

    expect(rtn).toBeDefined();
    expect(typeof (rtn as any).remove === 'function').toBe(true);
  });

  it('async addListener on android', async () => {
    mockAndroidBridge();
    initBridge(win);
    mockAndroidPlugin('Awesome', 'mph');

    jig = initJigraGlobal(win);

    const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome');

    const rtn = await Awesome.addListener('eventName', () => {
      // ignore
    });

    expect(rtn).toBeDefined();
    expect(typeof (rtn as any).remove === 'function').toBe(true);
  });

  it('async removeAllListeners on web, lazy load and call implementation', async (done) => {
    const AwesomeWeb = class extends WebPlugin {
      async removeAllListeners() {
        setImmediate(() => done());
      }
    };
    jig = initJigraGlobal(win);
    const Awesome = jig.registerPlugin<AwesomePlugin>('Awesome', {
      web: async () => new AwesomeWeb(),
    });

    const rtn = await Awesome.removeAllListeners();
    expect(rtn).toBeUndefined();
  });

  const mockAndroidBridge = () => {
    win.androidBridge = {
      postMessage: () => {
        // ignore
      },
    };
  };

  const mockAndroidPlugin = (pluginClassName: string, methodName: string) => {
    const w: any = win;
    w.Jigra = w.Jigra ?? {};
    w.Jigra.PluginHeaders = w.Jigra.PluginHeaders ?? [];
    w.Jigra.PluginHeaders.push({
      name: pluginClassName,
      methods: [
        { name: methodName, rtype: 'promise' },
        { name: 'addListener' },
        { name: 'removeListener' },
        { name: 'removeAllListeners' },
      ],
    });
  };
});

interface AwesomePlugin extends Plugin {
  mph(): Promise<number>;
}