import { initBridge } from '../../native-bridge';
import type { JigraInstance, WindowJigra } from '../definitions-internal';
import { createJigra } from '../runtime';

describe('convertFileSrc', () => {
  let win: WindowJigra;
  let jig: JigraInstance;

  beforeEach(() => {
    win = {
      WEBVIEW_SERVER_URL: 'webviewSeverUrl',
    };
    initBridge(win);
    jig = createJigra(win);
  });

  it('starts with content://', () => {
    expect(jig.convertFileSrc('content://myfile')).toBe('webviewSeverUrl/_jigra_content_/myfile');
  });

  it('starts with file://', () => {
    expect(jig.convertFileSrc('file://myfile')).toBe('webviewSeverUrl/_jigra_file_myfile');
  });

  it('starts with /', () => {
    expect(jig.convertFileSrc('/myfile')).toBe('webviewSeverUrl/_jigra_file_/myfile');
  });

  it('non string', () => {
    expect(jig.convertFileSrc(null)).toBe(null);
    expect(jig.convertFileSrc(undefined)).toBe(undefined);
    expect(jig.convertFileSrc(88 as any)).toBe(88);
    expect(jig.convertFileSrc('')).toBe('');
  });
});
