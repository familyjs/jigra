# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.1.2](https://github.com/familyjs/jigra/compare/6.1.1...6.1.2) (2024-11-07)

### Bug Fixes

- **http:** pass original url as query param on the proxy url ([cf28344](https://github.com/familyjs/jigra/commit/cf283442ea260189ad38a2eda62f86c221538618))

## [6.1.1](https://github.com/familyjs/jigra/compare/6.1.0...6.1.1) (2024-11-07)

### Bug Fixes

- **http:** handle UInt8Array on body and run fmt ([d3d9daa](https://github.com/familyjs/jigra/commit/d3d9daa1598d9e4c78c65044d4e247ca4bed221d))
- **ios:** make `removeAllListeners` accessible from javascript ([f3a7f44](https://github.com/familyjs/jigra/commit/f3a7f449d9e6a6e0165c4cba94a7698eb515df5d))

# [6.1.0](https://github.com/familyjs/jigra/compare/6.0.0...6.1.0) (2024-09-20)

### Bug Fixes

- **http:** don't override `readyState` for non POST requests ([c6ccf8f](https://github.com/familyjs/jigra/commit/c6ccf8f744b76d5ee971433ce0308ee0a9a6345a))
- **ios:** check if `urlSchemeTask` is stopped before calling its methods ([07c0cb0](https://github.com/familyjs/jigra/commit/07c0cb03cc5ce7f92c551d8800d2f85d91be7d55))

### Features

- **ios:** `JIGPluginMethod` selector-based initializer ([fcfbd87](https://github.com/familyjs/jigra/commit/fcfbd87de76cdfeccd3372cdf62586b5598d980b))

# [6.0.0](https://github.com/familyjs/jigra/compare/6.0.0-alpha.2...6.0.0) (2024-06-28)

**Note:** Version bump only for package @jigra/ios

# [6.0.0-alpha.2](https://github.com/familyjs/jigra/compare/6.0.0-alpha.1...6.0.0-alpha.2) (2024-06-28)

**Note:** Version bump only for package @jigra/ios

# [6.0.0-alpha.1](https://github.com/familyjs/jigra/compare/5.6.0...6.0.0-alpha.1) (2024-06-28)

### Bug Fixes

- **http:** Add `URLSearchParams` support ([abf7fd2](https://github.com/familyjs/jigra/commit/abf7fd2252703885db31a5999e35f6435ae193f0))
- **http:** change proxy url generation ([683cf14](https://github.com/familyjs/jigra/commit/683cf1437e322212387f74a738916ad8da274519))
- **http:** don't override readyState for non POST requests ([1e90edf](https://github.com/familyjs/jigra/commit/1e90edfc74dab49acaa6a200050ec4f7a520f1bd))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** prevent POST request from being proxied ([bcbea41](https://github.com/familyjs/jigra/commit/bcbea41045479acb5d1e3b235c4e21eb74697ab8))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))
- **ios:** check if `urlSchemeTask` is stopped before calling its methods ([2d1c6db](https://github.com/familyjs/jigra/commit/2d1c6dbd02022996b9453dc55441c1630bfecd50))
- **ios:** overwrite CORS headers on livereload ([c7d464a](https://github.com/familyjs/jigra/commit/c7d464a9bf2ac4fedcfa84cb73baab89f02a90d9))
- kdu 3 log warning causes error on iOS ([f67799d](https://github.com/familyjs/jigra/commit/f67799de0a078e3c479cd9ae5685fd83c95a7732))

## [5.7.8](https://github.com/familyjs/jigra/compare/5.6.0...5.7.8) (2024-06-26)

### Bug Fixes

- **http:** Add `URLSearchParams` support ([abf7fd2](https://github.com/familyjs/jigra/commit/abf7fd2252703885db31a5999e35f6435ae193f0))
- **http:** change proxy url generation ([683cf14](https://github.com/familyjs/jigra/commit/683cf1437e322212387f74a738916ad8da274519))
- **http:** don't override readyState for non POST requests ([1e90edf](https://github.com/familyjs/jigra/commit/1e90edfc74dab49acaa6a200050ec4f7a520f1bd))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** prevent POST request from being proxied ([bcbea41](https://github.com/familyjs/jigra/commit/bcbea41045479acb5d1e3b235c4e21eb74697ab8))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))
- **ios:** check if `urlSchemeTask` is stopped before calling its methods ([2d1c6db](https://github.com/familyjs/jigra/commit/2d1c6dbd02022996b9453dc55441c1630bfecd50))
- **ios:** overwrite CORS headers on livereload ([c7d464a](https://github.com/familyjs/jigra/commit/c7d464a9bf2ac4fedcfa84cb73baab89f02a90d9))
- kdu 3 log warning causes error on iOS ([f67799d](https://github.com/familyjs/jigra/commit/f67799de0a078e3c479cd9ae5685fd83c95a7732))

## [5.7.7](https://github.com/familyjs/jigra/compare/5.6.0...5.7.7) (2024-06-25)

### Bug Fixes

- **http:** Add `URLSearchParams` support ([abf7fd2](https://github.com/familyjs/jigra/commit/abf7fd2252703885db31a5999e35f6435ae193f0))
- **http:** change proxy url generation ([683cf14](https://github.com/familyjs/jigra/commit/683cf1437e322212387f74a738916ad8da274519))
- **http:** don't override readyState for non POST requests ([1e90edf](https://github.com/familyjs/jigra/commit/1e90edfc74dab49acaa6a200050ec4f7a520f1bd))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** prevent POST request from being proxied ([bcbea41](https://github.com/familyjs/jigra/commit/bcbea41045479acb5d1e3b235c4e21eb74697ab8))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))
- **ios:** check if `urlSchemeTask` is stopped before calling its methods ([2d1c6db](https://github.com/familyjs/jigra/commit/2d1c6dbd02022996b9453dc55441c1630bfecd50))
- **ios:** overwrite CORS headers on livereload ([c7d464a](https://github.com/familyjs/jigra/commit/c7d464a9bf2ac4fedcfa84cb73baab89f02a90d9))
- kdu 3 log warning causes error on iOS ([f67799d](https://github.com/familyjs/jigra/commit/f67799de0a078e3c479cd9ae5685fd83c95a7732))

## [5.7.6](https://github.com/familyjs/jigra/compare/5.6.0...5.7.6) (2024-06-23)

### Bug Fixes

- **http:** Add `URLSearchParams` support ([abf7fd2](https://github.com/familyjs/jigra/commit/abf7fd2252703885db31a5999e35f6435ae193f0))
- **http:** change proxy url generation ([683cf14](https://github.com/familyjs/jigra/commit/683cf1437e322212387f74a738916ad8da274519))
- **http:** don't override readyState for non POST requests ([1e90edf](https://github.com/familyjs/jigra/commit/1e90edfc74dab49acaa6a200050ec4f7a520f1bd))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** prevent POST request from being proxied ([bcbea41](https://github.com/familyjs/jigra/commit/bcbea41045479acb5d1e3b235c4e21eb74697ab8))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))
- **ios:** check if `urlSchemeTask` is stopped before calling its methods ([2d1c6db](https://github.com/familyjs/jigra/commit/2d1c6dbd02022996b9453dc55441c1630bfecd50))
- **ios:** overwrite CORS headers on livereload ([c7d464a](https://github.com/familyjs/jigra/commit/c7d464a9bf2ac4fedcfa84cb73baab89f02a90d9))
- kdu 3 log warning causes error on iOS ([f67799d](https://github.com/familyjs/jigra/commit/f67799de0a078e3c479cd9ae5685fd83c95a7732))

## [5.7.5](https://github.com/familyjs/jigra/compare/5.6.0...5.7.5) (2024-06-23)

### Bug Fixes

- **http:** Add `URLSearchParams` support ([abf7fd2](https://github.com/familyjs/jigra/commit/abf7fd2252703885db31a5999e35f6435ae193f0))
- **http:** change proxy url generation ([683cf14](https://github.com/familyjs/jigra/commit/683cf1437e322212387f74a738916ad8da274519))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** prevent POST request from being proxied ([bcbea41](https://github.com/familyjs/jigra/commit/bcbea41045479acb5d1e3b235c4e21eb74697ab8))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))
- **ios:** overwrite CORS headers on livereload ([c7d464a](https://github.com/familyjs/jigra/commit/c7d464a9bf2ac4fedcfa84cb73baab89f02a90d9))
- kdu 3 log warning causes error on iOS ([f67799d](https://github.com/familyjs/jigra/commit/f67799de0a078e3c479cd9ae5685fd83c95a7732))

## [5.7.4](https://github.com/familyjs/jigra/compare/5.6.0...5.7.4) (2024-06-22)

### Bug Fixes

- **http:** change proxy url generation ([683cf14](https://github.com/familyjs/jigra/commit/683cf1437e322212387f74a738916ad8da274519))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))
- **ios:** overwrite CORS headers on livereload ([c7d464a](https://github.com/familyjs/jigra/commit/c7d464a9bf2ac4fedcfa84cb73baab89f02a90d9))

## [5.7.3](https://github.com/familyjs/jigra/compare/5.6.0...5.7.3) (2024-06-22)

### Bug Fixes

- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))
- **ios:** overwrite CORS headers on livereload ([c7d464a](https://github.com/familyjs/jigra/commit/c7d464a9bf2ac4fedcfa84cb73baab89f02a90d9))

## [5.7.2](https://github.com/familyjs/jigra/compare/5.6.0...5.7.2) (2024-06-22)

### Bug Fixes

- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))

## [5.7.1](https://github.com/familyjs/jigra/compare/5.6.0...5.7.1) (2024-06-21)

### Bug Fixes

- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))

# [5.7.0](https://github.com/familyjs/jigra/compare/5.6.0...5.7.0) (2024-06-21)

**Note:** Version bump only for package @jigra/ios

# [5.7.0-alpha.1](https://github.com/familyjs/jigra/compare/5.6.0...5.7.0-alpha.1) (2024-06-21)

**Note:** Version bump only for package @jigra/ios

## [5.0.5](https://github.com/familyjs/jigra/compare/5.0.4...5.0.5) (2024-04-22)

### Bug Fixes

- **http:** don't throw errors when content-type is null on response ([1300a25](https://github.com/familyjs/jigra/commit/1300a2500acbc0e2439cdb820cdd220c3a0e9aa5))

## [5.0.4](https://github.com/familyjs/jigra/compare/5.0.3...5.0.4) (2023-06-03)

**Note:** Version bump only for package @jigra/ios

## [5.0.3](https://github.com/familyjs/jigra/compare/5.0.2...5.0.3) (2023-06-03)

**Note:** Version bump only for package @jigra/ios

## [5.0.2](https://github.com/familyjs/jigra/compare/5.0.1...5.0.2) (2023-06-03)

**Note:** Version bump only for package @jigra/ios

## [5.0.1](https://github.com/familyjs/jigra/compare/5.0.0...5.0.1) (2023-06-03)

**Note:** Version bump only for package @jigra/ios

# [5.0.0](https://github.com/familyjs/jigra/compare/4.0.0...5.0.0) (2023-05-22)

**Note:** Version bump only for package @jigra/ios

# [4.0.0](https://github.com/navify/jigra/compare/3.8.0...4.0.0) (2023-01-16)

**Note:** Version bump only for package @jigra/ios

# [3.9.0](https://github.com/navify/jigra/compare/3.8.0...3.9.0) (2023-01-10)

**Note:** Version bump only for package @jigra/ios

# [3.8.0](https://github.com/navify/jigra/compare/3.7.1...3.8.0) (2023-01-10)

### Features

- **ios:** Add `setServerBasePath(_:)` to JIGBridgeProtocol ([73d9bff](https://github.com/navify/jigra/commit/73d9bff3f2a7c0b2aafa25a1f5dba6a115ea6a23))

## [3.7.1](https://github.com/navify/jigra/compare/3.7.0-rc.1...3.7.1) (2023-01-10)

**Note:** Version bump only for package @jigra/ios

# 3.7.0-rc.1 (2022-08-17)

**Note:** Version bump only for package @jigra/ios
