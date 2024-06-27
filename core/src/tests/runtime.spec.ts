import { initBridge } from '../../native-bridge';
import type {
  JigraInstance,
  WindowJigra,
} from '../definitions-internal';
import { createJigra } from '../runtime';

describe('runtime', () => {
  let win: WindowJigra;
  let jig: JigraInstance;

  beforeEach(() => {
    win = {};
    initBridge(win);
    createJigra(win);
  });

  it('default methods/props', () => {
    jig = createJigra(win);
    expect(jig.getPlatform()).toBe('web');
    expect(jig.isNativePlatform()).toBe(false);
    expect(jig.isPluginAvailable('Nope')).toBe(false);
  });

  it('used existing window.Jigra.Plugins', () => {
    win.Jigra = {
      Plugins: { Awesome: {} },
      PluginHeaders: [{ name: 'Awesome', methods: [] }],
    } as any;
    jig = createJigra(win);
    expect(jig.isPluginAvailable('Awesome')).toBe(true);
    expect(jig.isPluginAvailable('Nope')).toBe(false);
  });

  it('DEBUG false default', () => {
    jig = createJigra(win);
    expect(jig.DEBUG).toBe(false);
  });

  it('DEBUG set from window.Jigra.DEBUG', () => {
    (win as any).Jigra = {
      DEBUG: true,
    };
    jig = createJigra(win);
    expect(jig.DEBUG).toBe(true);
  });

  it('isLoggingEnabled false default', () => {
    jig = createJigra(win);
    expect(jig.isLoggingEnabled).toBe(false);
  });

  it('isLoggingEnabled set from window.Jigra.isLoggingEnabled', () => {
    (win as any).Jigra = {
      isLoggingEnabled: true,
    };
    jig = createJigra(win);
    expect(jig.isLoggingEnabled).toBe(true);
  });

  it('cannot reset server url after initializing jigra', () => {
    win.WEBVIEW_SERVER_URL = 'whatever://home';
    initBridge(win);
    jig = createJigra(win);
    win.WEBVIEW_SERVER_URL = 'CHANGED!!!';
    expect(jig.getServerUrl()).toBe('whatever://home');
  });

  it('server url set from window.WEBVIEW_SERVER_URL', () => {
    win.WEBVIEW_SERVER_URL = 'whatever://home';
    initBridge(win);
    jig = createJigra(win);
    expect(jig.getServerUrl()).toBe('whatever://home');
  });

  it('server url default w/out window.WEBVIEW_SERVER_URL set', () => {
    jig = createJigra(win);
    expect(jig.getServerUrl()).toBe('');
  });
});
