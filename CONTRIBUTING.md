# Contributing to Jigra

This guide provides instructions for contributing to Jigra through [issues & discussions](#issues--discussions) and [code](#developing-jigra).

## Issues & Discussions

The Jigra repo uses GitHub [issues](https://github.com/familyjs/jigra/issues) and [discussions](https://github.com/familyjs/jigra/discussions) to track bugs and feature requests, as well as to provide a place for community questions, ideas, and discussions.

* **When to use [issues](https://github.com/familyjs/jigra/issues)**:
    * To report specific, reproducible bugs (see [Creating a Code Reproduction](#creating-a-code-reproduction)).
    * To propose detailed feature requests.
* **When to use [discussions](https://github.com/familyjs/jigra/discussions)**:
    * To ask for help.
    * To ask general questions.
    * To show off cool stuff.
    * To propose ideas for improvement.
    * If you think you found a bug, but may need help to further uncover it.
    * Anything else! :rainbow:

### Creating a Code Reproduction

When reporting bugs, we ask you to provide a minimal sample application that demonstrates the issue. Without a reliable code reproduction, it is unlikely we will be able to resolve the issue, leading to it being closed.

To create a code reproduction:

* Create a new application using `npm init @jigra/app` (or `family start --jigra`).
* Add the minimum amount of code necessary to recreate the issue you're experiencing.
* Push the code reproduction to a public GitHub repository and include a link when you create a bug report.
* Be sure to include steps to reproduce the issue.

## Developing Jigra

### Repositories

* [Jigra](https://github.com/familyjs/jigra) (this repo): Core Jigra platforms, CLI, and APIs
* [Jigra Plugins](https://github.com/familyjs/jigra-plugins): Official Jigra plugins
* [Jigra Community](https://github.com/jigra-community/): GitHub org for Jigra Community plugins and platforms
* [Jigra Site](https://github.com/familyjs/jigra-site): Jigra website and online documentation
* [Jigra TestApp](https://github.com/familyjs/jigra-testapp): Test app used by the core team for developing Jigra

### Consult with the team

For any large changes, make sure you've consulted with the team first. You can [open a discussion](https://github.com/familyjs/jigra/discussions) to bring up your idea.

### About Third Party Libraries

To achieve Jigra's goal of being stable and easy to upgrade, we would like to avoid unnecessary third party libraries as much as possible. Before embarking on Jigra contributions, make sure you aren't planning on introducing third party libraries without consulting with the team first.

On native, that means avoid adding any new Cocoapod or Gradle dependencies without explicit approval. If you just need a small bit of functionality from that library, consider adding an implementation to the codebase directly.

On web, this means do not add any third party libraries such as Firebase or Lodash. Strive for implementations that use pure Web APIs even if it means more work.

### Local Setup

1. Fork and clone the repo.
1. Install the dependencies.

    ```shell
    npm install
    ```

1. Install SwiftLint if you're on macOS. Contributions to iOS code will be linted in CI if you don't have macOS.

    ```shell
    brew install swiftlint
    ```

### Branches

* [`main`](https://github.com/familyjs/jigra/tree/main): Latest Jigra development branch
* [`5.x`](https://github.com/familyjs/jigra/tree/5.x): Jigra 5
* [`4.x`](https://github.com/familyjs/jigra/tree/4.x): Jigra 4 (security fixes only)
* [`3.x`](https://github.com/familyjs/jigra/tree/3.x): Jigra 3 (not maintained)
* [`2.x`](https://github.com/familyjs/jigra/tree/2.x): Jigra 2 (not maintained)
* [`1.x`](https://github.com/familyjs/jigra/tree/1.x): Jigra 1 (not maintained)

### Directory Structure

This monorepo contains core Jigra components. The current directory structure looks like this:

* `cli`: Jigra CLI/Build scripts
* `core`: Jigra Core JS library
* `ios`: Jigra iOS Runtime
* `ios-template`: Default iOS App installed by the CLI
* `android`: Jigra Android Runtime
* `android-template`: Default Android App installed by the CLI
