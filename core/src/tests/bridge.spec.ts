/**
 * @jest-environment jsdom
 */

import { initBridge } from '../../native-bridge';
import type {
  JigraInstance,
  PluginResult,
  WindowJigra,
} from '../definitions-internal';
import { createJigra } from '../runtime';

describe('bridge', () => {
  let win: WindowJigra;
  let jig: JigraInstance;

  beforeEach(() => {
    win = {};
    initBridge(win);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.prompt = () => {};
  });

  it('android nativePromise error', done => {
    mockAndroidPluginResult({
      success: false,
      data: null,
      error: { message: 'darn it' },
    });
    initBridge(win);

    jig = createJigra(win);
    expect(jig.getPlatform()).toBe('android');
    expect(jig.isNativePlatform()).toBe(true);

    jig
      .nativePromise('id', 'method')
      .then(() => {
        done('should throw error');
      })
      .catch(err => {
        try {
          expect(err.message).toBe('darn it');
          done();
        } catch (e) {
          done(e);
        }
      });
  });

  it('android nativePromise success', done => {
    mockAndroidPluginResult({
      success: true,
      data: { mph: 88 },
    });
    initBridge(win);

    jig = createJigra(win);
    expect(jig.getPlatform()).toBe('android');
    expect(jig.isNativePlatform()).toBe(true);

    jig
      .nativePromise('id', 'method')
      .then(data => {
        try {
          expect(data).toEqual({ mph: 88 });
          done();
        } catch (e) {
          done(e);
        }
      })
      .catch(done);
  });

  it('ios nativeCallback w/ callback error', done => {
    mockIosPluginResult({
      data: null,
      success: false,
      error: { message: 'darn it' },
    });
    initBridge(win);

    jig = createJigra(win);
    expect(jig.getPlatform()).toBe('ios');
    expect(jig.isNativePlatform()).toBe(true);

    jig.nativeCallback('pluginName', 'methodName', {}, (data, err) => {
      try {
        expect(data).toEqual(null);
        expect(err.message).toBe('darn it');
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  it('ios nativeCallback w/ options and callback, success', done => {
    mockIosPluginResult({
      data: { mph: 88 },
      success: true,
    });
    initBridge(win);

    jig = createJigra(win);
    expect(jig.getPlatform()).toBe('ios');
    expect(jig.isNativePlatform()).toBe(true);

    jig.nativeCallback('pluginName', 'methodName', {}, (data, err) => {
      try {
        expect(data).toEqual({ mph: 88 });
        expect(err).toBe(undefined);
        done();
      } catch (e) {
        done(e);
      }
    });
  });

  const mockAndroidPluginResult = (pluginResult: PluginResult) => {
    win.androidBridge = {
      postMessage: m => {
        const d = JSON.parse(m);
        Promise.resolve().then(() => {
          pluginResult.callbackId = d.callbackId;
          pluginResult.methodName = d.methodName;
          jig.fromNative(pluginResult);
        });
      },
    };
  };

  const mockIosPluginResult = (pluginResult: PluginResult) => {
    win.webkit = {
      messageHandlers: {
        bridge: {
          postMessage: m => {
            Promise.resolve().then(() => {
              pluginResult.callbackId = m.callbackId;
              pluginResult.methodName = m.methodName;
              jig.fromNative(pluginResult);
            });
          },
        },
      },
    };
  };
});
