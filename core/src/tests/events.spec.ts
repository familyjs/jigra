import { initBridge } from '../../native-bridge';
import type {
  JigraInstance,
  WindowJigra,
} from '../definitions-internal';
import { createJigra } from '../runtime';

describe('plugin', () => {
  let win: WindowJigra;
  let jig: JigraInstance;

  beforeEach(() => {
    win = {
      document: {
        createEvent() {
          return {
            initEvent() {
              return true;
            },
          };
        },
        dispatchEvent() {
          return true;
        },
      },
    };
    initBridge(win);
  });

  it('createEvent from document api', () => {
    jig = createJigra(win);
    const ev = jig.createEvent('eventName', { mph: 88 });
    expect(typeof ev.initEvent).toBe('function');
    expect((ev as any).mph).toBe(88);
  });

  it('createEvent, null when no document', () => {
    win = {};
    initBridge(win);
    jig = createJigra(win);
    const ev = jig.createEvent('eventName', { mph: 88 });
    expect(ev).toBe(null);
  });

  it('triggerEvent, window true', () => {
    let windowTrigger = false;
    win.dispatchEvent = () => {
      windowTrigger = true;
      return true;
    };
    jig = createJigra(win);
    const ev = jig.triggerEvent('eventName', 'window');
    expect(ev).toBe(true);
    expect(windowTrigger).toBe(true);
  });

  it('triggerEvent, window false', () => {
    jig = createJigra(win);
    const ev = jig.triggerEvent('eventName', 'window');
    expect(ev).toBe(false);
  });

  it('triggerEvent, document, cordova fireDocumentEvent', () => {
    let cordovaTrigger = false;
    win.cordova = {
      fireDocumentEvent() {
        cordovaTrigger = true;
      },
    };
    initBridge(win);

    jig = createJigra(win);
    const ev = jig.triggerEvent('eventName', 'document');
    expect(ev).toBe(true);
    expect(ev).toBe(cordovaTrigger);
  });

  it('triggerEvent, document true', () => {
    jig = createJigra(win);
    const ev = jig.triggerEvent('eventName', 'document');
    expect(ev).toBe(true);
  });

  it('triggerEvent, document false', () => {
    delete win.document;
    initBridge(win);

    jig = createJigra(win);
    const ev = jig.triggerEvent('eventName', 'document');
    expect(ev).toBe(false);
  });

  it('triggerEvent, querySelector true', () => {
    let querySelectorTriggered = false;
    win.document.querySelector = () => {
      return {
        dispatchEvent() {
          querySelectorTriggered = true;
          return true;
        },
      };
    };
    jig = createJigra(win);
    const ev = jig.triggerEvent('eventName', 'some-id');
    expect(ev).toBe(true);
    expect(querySelectorTriggered).toBe(true);
  });

  it('triggerEvent, querySelector false', () => {
    jig = createJigra(win);
    const ev = jig.triggerEvent('eventName', 'some-id');
    expect(ev).toBe(false);
  });

  it('triggerEvent, document querySelector false', () => {
    delete win.document;
    jig = createJigra(win);
    const ev = jig.triggerEvent('eventName', 'some-id');
    expect(ev).toBe(false);
  });
});
