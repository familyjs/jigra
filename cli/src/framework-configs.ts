import type { Config, FrameworkConfig } from './definitions';

const FRAMEWORK_CONFIGS: FrameworkConfig[] = [
  {
    name: 'Create React App',
    isMatch: config => hasDependency(config, 'react-scripts'),
    webDir: 'build',
    priority: 3,
  },
  {
    name: 'Ember',
    isMatch: config => hasDependency(config, 'ember-cli'),
    webDir: 'dist',
    priority: 3,
  },
  {
    name: 'Gatsby',
    isMatch: config => hasDependency(config, 'gatsby'),
    webDir: 'public',
    priority: 2,
  },
  {
    name: 'Navify React',
    isMatch: config => hasDependency(config, '@navify/react'),
    webDir: 'build',
    priority: 1,
  },
  {
    name: 'Navify Kdu',
    isMatch: config => hasDependency(config, '@navify/kdu'),
    webDir: 'public',
    priority: 1,
  },
  {
    name: 'Next',
    isMatch: config => hasDependency(config, 'next'),
    webDir: 'public',
    priority: 2,
  },
  {
    name: 'Preact',
    isMatch: config => hasDependency(config, 'preact-cli'),
    webDir: 'build',
    priority: 3,
  },
  {
    name: 'Rindo',
    isMatch: config => hasDependency(config, '@rindo/core'),
    webDir: 'www',
    priority: 3,
  },
  {
    name: 'Svelte',
    isMatch: config =>
      hasDependency(config, 'svelte') && hasDependency(config, 'sirv-cli'),
    webDir: 'public',
    priority: 3,
  },
  {
    name: 'Kdu',
    isMatch: config => hasDependency(config, '@kdujs/cli-service'),
    webDir: 'dist',
    priority: 3,
  },
];

export function detectFramework(config: Config): FrameworkConfig | undefined {
  const frameworks = FRAMEWORK_CONFIGS.filter(f => f.isMatch(config)).sort(
    (a, b) => {
      if (a.priority < b.priority) return -1;
      if (a.priority > b.priority) return 1;
      return 0;
    },
  );
  return frameworks[0];
}

function hasDependency(config: Config, depName: string): boolean {
  const deps = getDependencies(config);
  return deps.includes(depName);
}

function getDependencies(config: Config): string[] {
  const deps: string[] = [];
  if (config?.app?.package?.dependencies) {
    deps.push(...Object.keys(config.app.package.dependencies));
  }
  if (config?.app?.package?.devDependencies) {
    deps.push(...Object.keys(config.app.package.devDependencies));
  }
  return deps;
}
