/**
 * @jest-environment jsdom
 */

import { initBridge } from '../../native-bridge';
import type { JigraGlobal } from '../definitions';
import type { WindowJigra } from '../definitions-internal';
import { legacyRegisterWebPlugin } from '../legacy/legacy-web-plugin-merge';
import { createJigra } from '../runtime';
import { WebPlugin } from '../web-plugin';

describe('legacy', () => {
  let win: WindowJigra;
  let jig: JigraGlobal;
  const LegacyWebPlugin = class extends WebPlugin {};
  const orgConsoleWarn = console.warn;
  const noop = () => {
    // do nothing
  };

  beforeAll(() => {
    console.warn = noop;
    win = {};
    initBridge(win);
  });

  afterAll(() => {
    console.warn = orgConsoleWarn;
  });

  it('registerWebPlugin() when native implementation already provided, and same platform config provided', () => {
    win = {
      androidBridge: { postMessage: noop },
    };
    jig = createJigra(win) as any;

    const MockNativePlugin = {} as any;
    jig.Plugins['Legacy'] = MockNativePlugin;

    const Legacy = new LegacyWebPlugin({
      name: 'Legacy',
      platforms: ['android'],
    });
    legacyRegisterWebPlugin(jig, Legacy);

    expect(Legacy.config.name).toBe('Legacy');
    expect(jig.Plugins['Legacy']).toBe(Legacy);
  });

  it('do not registerWebPlugin() when native implementation already provided', () => {
    win = {
      androidBridge: { postMessage: noop },
    };
    jig = createJigra(win) as any;

    const MockNativePlugin = {} as any;
    jig.Plugins['Legacy'] = MockNativePlugin;

    const Legacy = new LegacyWebPlugin({ name: 'Legacy' });
    legacyRegisterWebPlugin(jig, Legacy);

    expect(Legacy.config.name).toBe('Legacy');
    expect(jig.Plugins['Legacy']).toBe(MockNativePlugin);
  });

  it('registerWebPlugin() when platforms provided and no native implementation', () => {
    win = {};
    jig = createJigra(win) as any;

    const Legacy = new LegacyWebPlugin({ name: 'Legacy', platforms: ['web'] });
    legacyRegisterWebPlugin(jig, Legacy);

    expect(Legacy.config.name).toBe('Legacy');
    expect(jig.Plugins['Legacy']).toBe(Legacy);
  });

  it('registerWebPlugin() when platforms not provided and no native implementation', () => {
    win = {};
    jig = createJigra(win) as any;

    const Legacy = new LegacyWebPlugin({ name: 'Legacy' });
    legacyRegisterWebPlugin(jig, Legacy);

    expect(Legacy.config.name).toBe('Legacy');
    expect(jig.Plugins['Legacy']).toBe(Legacy);
  });

  it('error registerWebPlugin() w/out config.name', async () => {
    win = {};
    jig = createJigra(win) as any;

    expect(() => {
      legacyRegisterWebPlugin(jig, new LegacyWebPlugin({} as any));
    }).toThrowError(
      'Jigra WebPlugin is using the deprecated "registerWebPlugin()" function, but without the config. Please use "registerPlugin()" instead to register this web plugin."'
    );
  });

  it('error registerWebPlugin() w/out config', async () => {
    win = {};
    jig = createJigra(win) as any;

    expect(() => {
      legacyRegisterWebPlugin(jig, new LegacyWebPlugin());
    }).toThrowError(
      'Jigra WebPlugin is using the deprecated "registerWebPlugin()" function, but without the config. Please use "registerPlugin()" instead to register this web plugin."'
    );
  });

  it('doc.addEventListener backbutton', (done) => {
    const AppWeb = class {
      async addListener(eventName: string) {
        expect(eventName).toBe('backButton');
        done();
      }
    };
    const bbCallback = () => {
      // ignore
    };
    win = {
      document: {
        addEventListener(eventName: string) {
          expect(eventName).toBe('backbutton');
        },
      },
      androidBridge: { postMessage: noop },
    };
    initBridge(win);
    jig = createJigra(win);
    jig.registerPlugin<any>('App', {
      web: new AppWeb(),
      android: new AppWeb(),
    });

    win.document.addEventListener('backbutton', bbCallback);
  });

  it('doc.addEventListener deviceready', (done) => {
    win = {
      document: {
        addEventListener() {
          // ignore
        },
      },
      androidBridge: { postMessage: noop },
    };
    initBridge(win);
    createJigra(win);
    win.document.addEventListener('deviceready', done);
  });

  it('add navigator.app.exitApp', () => {
    win = {
      navigator: {},
      androidBridge: { postMessage: noop },
    };
    initBridge(win);
    createJigra(win);
    expect(win.navigator.app.exitApp).toBeDefined();
  });

  it('cordova global', () => {
    win = {
      androidBridge: { postMessage: noop },
    };
    initBridge(win);
    createJigra(win);
    expect(win.cordova).toBeDefined();
  });

  it('use existing cordova global', () => {
    const existingCordova: any = {};
    win = {
      cordova: existingCordova,
    };
    initBridge(win);
    createJigra(win);
    expect(win.cordova).toBe(existingCordova);
  });

  it('deprecated props', () => {
    jig = createJigra(win) as any;
    expect((jig as any).platform).toBe('web');
    expect((jig as any).isNative).toBe(false);
  });
});
