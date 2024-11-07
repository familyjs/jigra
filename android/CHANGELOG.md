# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.1.2](https://github.com/familyjs/jigra/compare/6.1.1...6.1.2) (2024-11-07)

### Bug Fixes

- **android:** better cleaning of `allowedOrigin` url ([22129bc](https://github.com/familyjs/jigra/commit/22129bc2598bc0fd4d2405dccd5949189b084304))
- **http:** pass original url as query param on the proxy url ([cf28344](https://github.com/familyjs/jigra/commit/cf283442ea260189ad38a2eda62f86c221538618))

## [6.1.1](https://github.com/familyjs/jigra/compare/6.1.0...6.1.1) (2024-11-07)

### Bug Fixes

- **android:** Allow WebView to load blob urls ([5ed5b31](https://github.com/familyjs/jigra/commit/5ed5b3121f404099fb82c7c4b1904306bc6f2c5c))
- **android:** javascript injection not working on urls with query ([08cf71a](https://github.com/familyjs/jigra/commit/08cf71af6c86b003d3d53a3cb5a23a0f01ad19e6))
- **android:** send FormData on older devices ([16f16e3](https://github.com/familyjs/jigra/commit/16f16e3e4580cea0e428ed95c495e6caffe5777c))
- **android:** UTF-8 encode form data value ([bcca076](https://github.com/familyjs/jigra/commit/bcca076c214ed4ed9adc924408c7227684ce8b0c))
- **http:** handle UInt8Array on body and run fmt ([d3d9daa](https://github.com/familyjs/jigra/commit/d3d9daa1598d9e4c78c65044d4e247ca4bed221d))

# [6.1.0](https://github.com/familyjs/jigra/compare/6.0.0...6.1.0) (2024-09-20)

### Bug Fixes

- **android:** avoid crash if server url ends in / ([6f7e9fd](https://github.com/familyjs/jigra/commit/6f7e9fda2a2d825802ca2a8bcd31ac8ab759af98))
- **http:** don't override `readyState` for non POST requests ([c6ccf8f](https://github.com/familyjs/jigra/commit/c6ccf8f744b76d5ee971433ce0308ee0a9a6345a))

# [6.0.0](https://github.com/familyjs/jigra/compare/6.0.0-alpha.2...6.0.0) (2024-06-28)

**Note:** Version bump only for package @jigra/android

# [6.0.0-alpha.2](https://github.com/familyjs/jigra/compare/6.0.0-alpha.1...6.0.0-alpha.2) (2024-06-28)

**Note:** Version bump only for package @jigra/android

# [6.0.0-alpha.1](https://github.com/familyjs/jigra/compare/5.6.0...6.0.0-alpha.1) (2024-06-28)

### Bug Fixes

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **http:** Add `URLSearchParams` support ([abf7fd2](https://github.com/familyjs/jigra/commit/abf7fd2252703885db31a5999e35f6435ae193f0))
- **http:** change proxy url generation ([683cf14](https://github.com/familyjs/jigra/commit/683cf1437e322212387f74a738916ad8da274519))
- **http:** don't override readyState for non POST requests ([1e90edf](https://github.com/familyjs/jigra/commit/1e90edfc74dab49acaa6a200050ec4f7a520f1bd))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** prevent POST request from being proxied ([bcbea41](https://github.com/familyjs/jigra/commit/bcbea41045479acb5d1e3b235c4e21eb74697ab8))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))
- kdu 3 log warning causes error on iOS ([f67799d](https://github.com/familyjs/jigra/commit/f67799de0a078e3c479cd9ae5685fd83c95a7732))

## [5.7.8](https://github.com/familyjs/jigra/compare/5.6.0...5.7.8) (2024-06-26)

### Bug Fixes

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **http:** Add `URLSearchParams` support ([abf7fd2](https://github.com/familyjs/jigra/commit/abf7fd2252703885db31a5999e35f6435ae193f0))
- **http:** change proxy url generation ([683cf14](https://github.com/familyjs/jigra/commit/683cf1437e322212387f74a738916ad8da274519))
- **http:** don't override readyState for non POST requests ([1e90edf](https://github.com/familyjs/jigra/commit/1e90edfc74dab49acaa6a200050ec4f7a520f1bd))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** prevent POST request from being proxied ([bcbea41](https://github.com/familyjs/jigra/commit/bcbea41045479acb5d1e3b235c4e21eb74697ab8))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))
- kdu 3 log warning causes error on iOS ([f67799d](https://github.com/familyjs/jigra/commit/f67799de0a078e3c479cd9ae5685fd83c95a7732))

## [5.7.7](https://github.com/familyjs/jigra/compare/5.6.0...5.7.7) (2024-06-25)

### Bug Fixes

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **http:** Add `URLSearchParams` support ([abf7fd2](https://github.com/familyjs/jigra/commit/abf7fd2252703885db31a5999e35f6435ae193f0))
- **http:** change proxy url generation ([683cf14](https://github.com/familyjs/jigra/commit/683cf1437e322212387f74a738916ad8da274519))
- **http:** don't override readyState for non POST requests ([1e90edf](https://github.com/familyjs/jigra/commit/1e90edfc74dab49acaa6a200050ec4f7a520f1bd))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** prevent POST request from being proxied ([bcbea41](https://github.com/familyjs/jigra/commit/bcbea41045479acb5d1e3b235c4e21eb74697ab8))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))
- kdu 3 log warning causes error on iOS ([f67799d](https://github.com/familyjs/jigra/commit/f67799de0a078e3c479cd9ae5685fd83c95a7732))

## [5.7.6](https://github.com/familyjs/jigra/compare/5.6.0...5.7.6) (2024-06-23)

### Bug Fixes

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **http:** Add `URLSearchParams` support ([abf7fd2](https://github.com/familyjs/jigra/commit/abf7fd2252703885db31a5999e35f6435ae193f0))
- **http:** change proxy url generation ([683cf14](https://github.com/familyjs/jigra/commit/683cf1437e322212387f74a738916ad8da274519))
- **http:** don't override readyState for non POST requests ([1e90edf](https://github.com/familyjs/jigra/commit/1e90edfc74dab49acaa6a200050ec4f7a520f1bd))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** prevent POST request from being proxied ([bcbea41](https://github.com/familyjs/jigra/commit/bcbea41045479acb5d1e3b235c4e21eb74697ab8))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))
- kdu 3 log warning causes error on iOS ([f67799d](https://github.com/familyjs/jigra/commit/f67799de0a078e3c479cd9ae5685fd83c95a7732))

## [5.7.5](https://github.com/familyjs/jigra/compare/5.6.0...5.7.5) (2024-06-23)

### Bug Fixes

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **http:** Add `URLSearchParams` support ([abf7fd2](https://github.com/familyjs/jigra/commit/abf7fd2252703885db31a5999e35f6435ae193f0))
- **http:** change proxy url generation ([683cf14](https://github.com/familyjs/jigra/commit/683cf1437e322212387f74a738916ad8da274519))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** prevent POST request from being proxied ([bcbea41](https://github.com/familyjs/jigra/commit/bcbea41045479acb5d1e3b235c4e21eb74697ab8))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))
- kdu 3 log warning causes error on iOS ([f67799d](https://github.com/familyjs/jigra/commit/f67799de0a078e3c479cd9ae5685fd83c95a7732))

## [5.7.4](https://github.com/familyjs/jigra/compare/5.6.0...5.7.4) (2024-06-22)

### Bug Fixes

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **http:** change proxy url generation ([683cf14](https://github.com/familyjs/jigra/commit/683cf1437e322212387f74a738916ad8da274519))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))

## [5.7.3](https://github.com/familyjs/jigra/compare/5.6.0...5.7.3) (2024-06-22)

### Bug Fixes

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))

## [5.7.2](https://github.com/familyjs/jigra/compare/5.6.0...5.7.2) (2024-06-22)

### Bug Fixes

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))

## [5.7.1](https://github.com/familyjs/jigra/compare/5.6.0...5.7.1) (2024-06-21)

### Bug Fixes

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))

# [5.7.0](https://github.com/familyjs/jigra/compare/5.6.0...5.7.0) (2024-06-21)

**Note:** Version bump only for package @jigra/android

# [5.7.0-alpha.1](https://github.com/familyjs/jigra/compare/5.6.0...5.7.0-alpha.1) (2024-06-21)

**Note:** Version bump only for package @jigra/android

## [5.0.5](https://github.com/familyjs/jigra/compare/5.0.4...5.0.5) (2024-04-22)

### Bug Fixes

- **http:** don't throw errors when content-type is null on response ([1300a25](https://github.com/familyjs/jigra/commit/1300a2500acbc0e2439cdb820cdd220c3a0e9aa5))

## [5.0.4](https://github.com/familyjs/jigra/compare/5.0.3...5.0.4) (2023-06-03)

**Note:** Version bump only for package @jigra/android

## [5.0.3](https://github.com/familyjs/jigra/compare/5.0.2...5.0.3) (2023-06-03)

**Note:** Version bump only for package @jigra/android

## [5.0.2](https://github.com/familyjs/jigra/compare/5.0.1...5.0.2) (2023-06-03)

**Note:** Version bump only for package @jigra/android

## [5.0.1](https://github.com/familyjs/jigra/compare/5.0.0...5.0.1) (2023-06-03)

**Note:** Version bump only for package @jigra/android

# [5.0.0](https://github.com/familyjs/jigra/compare/4.0.0...5.0.0) (2023-05-22)

**Note:** Version bump only for package @jigra/android

# [4.0.0](https://github.com/navify/jigra/compare/3.8.0...4.0.0) (2023-01-16)

### Bug Fixes

- **android:** added ServerPath object and building options for setting initial load from portals ([5049599](https://github.com/navify/jigra/commit/5049599b17ecc8a8cc0a87bb4fa49330e2363987))

# [3.9.0](https://github.com/navify/jigra/compare/3.8.0...3.9.0) (2023-01-10)

### Bug Fixes

- **android:** added ServerPath object and building options for setting initial load from portals ([5049599](https://github.com/navify/jigra/commit/5049599b17ecc8a8cc0a87bb4fa49330e2363987))

# [3.8.0](https://github.com/navify/jigra/compare/3.7.1...3.8.0) (2023-01-10)

**Note:** Version bump only for package @jigra/android

## [3.7.1](https://github.com/navify/jigra/compare/3.7.0-rc.1...3.7.1) (2023-01-10)

**Note:** Version bump only for package @jigra/android

# 3.7.0-rc.1 (2022-08-17)

**Note:** Version bump only for package @jigra/android
