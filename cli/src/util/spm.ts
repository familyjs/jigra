import { existsSync, readFileSync, writeFileSync } from '@familyjs/utils-fs';
import { join, relative, resolve } from 'path';

import type { Config } from '../definitions';
import { logger } from '../log';
import type { Plugin } from '../plugin';

export interface SwiftPlugin {
  name: string;
  path: string;
}

export async function checkPackageManager(config: Config): Promise<'Cocoapods' | 'SPM'> {
  const iosDirectory = config.ios.nativeProjectDirAbs;
  if (existsSync(resolve(iosDirectory, 'JigApp-SPM'))) {
    return 'SPM';
  }

  return 'Cocoapods';
}

export async function findPackageSwiftFile(config: Config): Promise<string> {
  const packageDirectory = resolve(config.ios.nativeProjectDirAbs, 'JigApp-SPM');
  return resolve(packageDirectory, 'Package.swift');
}

export async function generatePackageFile(config: Config, plugins: Plugin[]): Promise<void> {
  const packageSwiftFile = await findPackageSwiftFile(config);
  try {
    logger.warn('SPM Support is still experimental');
    const textToWrite = generatePackageText(config, plugins);
    writeFileSync(packageSwiftFile, textToWrite);
  } catch (err) {
    logger.error(`Unable to write to ${packageSwiftFile}. Verify it is not already open. \n Error: ${err}`);
  }
}

function generatePackageText(config: Config, plugins: Plugin[]): string {
  const pbx = readFileSync(join(config.ios.nativeXcodeProjDirAbs, 'project.pbxproj'), 'utf-8');
  const searchString = 'IPHONEOS_DEPLOYMENT_TARGET = ';
  const iosVersion = pbx.substring(
    pbx.indexOf(searchString) + searchString.length,
    pbx.indexOf(searchString) + searchString.length + 2
  );

  let packageSwiftText = `// swift-tools-version: 5.9
import PackageDescription

// DO NOT MODIFY THIS FILE - managed by Jigra CLI commands
let package = Package(
    name: "JigApp-SPM",
    platforms: [.iOS(.v${iosVersion})],
    products: [
        .library(
            name: "JigApp-SPM",
            targets: ["JigApp-SPM"])
    ],
    dependencies: [
        .package(url: "https://github.com/familyjs/jigra-swift-pm.git", branch: "main")`;

  for (const plugin of plugins) {
    const relPath = relative(config.ios.nativeXcodeProjDirAbs, plugin.rootPath);
    packageSwiftText += `,\n        .package(name: "${plugin.ios?.name}", path: "${relPath}")`;
  }

  packageSwiftText += `
    ],
    targets: [
        .target(
            name: "JigApp-SPM",
            dependencies: [
                .product(name: "Jigra", package: "jigra-swift-pm"),
                .product(name: "Cordova", package: "jigra-swift-pm")`;

  for (const plugin of plugins) {
    packageSwiftText += `,\n                .product(name: "${plugin.ios?.name}", package: "${plugin.ios?.name}")`;
  }

  packageSwiftText += `
            ]
        )
    ]
)
`;

  return packageSwiftText;
}
