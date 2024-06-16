import { resolve } from 'path';

import { detectFramework } from '../../cli/src/framework-configs';
import type { Config } from '../src/definitions';

describe('framework detection', () => {
  let config: Config;

  beforeEach(() => {
    config = {
      cli: null as any,
      app: {
        rootDir: resolve('/'),
        appId: 'appId',
        appName: 'appName',
        webDir: '',
        webDirAbs: '',
        package: {
          name: 'package-name',
          version: '0.0.0',
        },
        extConfigType: 'json',
        extConfigName: '',
        extConfigFilePath: '',
        extConfig: null as any,
      },
      android: null as any,
      ios: null as any,
      web: null as any,
    };
  });

  it('Create React App', () => {
    addDep(config, 'react-scripts');
    const f = detectFramework(config);
    expect(f?.name).toBe('Create React App');
    expect(f?.webDir).toBe('build');
  });

  it('Ember', () => {
    addDep(config, 'ember-cli');
    const f = detectFramework(config);
    expect(f?.name).toBe('Ember');
    expect(f?.webDir).toBe('dist');
  });

  it('Gatsby', () => {
    addDep(config, 'react-scripts');
    addDep(config, 'gatsby');
    const f = detectFramework(config);
    expect(f?.name).toBe('Gatsby');
    expect(f?.webDir).toBe('public');
  });

  it('Family React', () => {
    addDep(config, '@familyjs/react');
    addDep(config, 'react-scripts');
    const f = detectFramework(config);
    expect(f?.name).toBe('Family React');
    expect(f?.webDir).toBe('build');
  });

  it('Family React over Create React App', () => {
    addDep(config, '@familyjs/react');
    addDep(config, 'react-scripts');
    addDep(config, 'react-dev-utils');
    const f = detectFramework(config);
    expect(f?.name).toBe('Family React');
    expect(f?.webDir).toBe('build');
  });

  it('Family Kdu', () => {
    addDep(config, '@familyjs/kdu');
    const f = detectFramework(config);
    expect(f?.name).toBe('Family Kdu');
    expect(f?.webDir).toBe('public');
  });

  it('Family Kdu and not just Kdu', () => {
    addDep(config, '@familyjs/kdu');
    addDep(config, '@kdujs/cli-service');
    const f = detectFramework(config);
    expect(f?.name).toBe('Family Kdu');
    expect(f?.webDir).toBe('public');
  });

  it('Next', () => {
    addDep(config, 'next');
    addDep(config, 'react-scripts');
    const f = detectFramework(config);
    expect(f?.name).toBe('Next');
    expect(f?.webDir).toBe('public');
  });

  it('Preact', () => {
    addDep(config, 'preact-cli');
    const f = detectFramework(config);
    expect(f?.name).toBe('Preact');
    expect(f?.webDir).toBe('build');
  });

  it('Rindo', () => {
    addDep(config, '@rindo/core');
    const f = detectFramework(config);
    expect(f?.name).toBe('Rindo');
    expect(f?.webDir).toBe('www');
  });

  it('Svelte', () => {
    addDep(config, 'svelte');
    addDep(config, 'sirv-cli');
    const f = detectFramework(config);
    expect(f?.name).toBe('Svelte');
    expect(f?.webDir).toBe('public');
  });

  it('not Svelte w/out sirv-cli', () => {
    addDep(config, 'svelte');
    const f = detectFramework(config);
    expect(f).toBeUndefined();
  });

  it('Kdu', () => {
    addDep(config, '@kdujs/cli-service');
    const f = detectFramework(config);
    expect(f?.name).toBe('Kdu');
    expect(f?.webDir).toBe('dist');
  });

  it('nothing detected', () => {
    const f = detectFramework(config);
    expect(f).toBeUndefined();
  });
});

function addDep(config: Config, depName: string) {
  (config.app.package as any).dependencies = config.app.package.dependencies || {};
  (config.app.package.dependencies as any)[depName] = '0.0.0';
}
