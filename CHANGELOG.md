# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [6.1.2](https://github.com/familyjs/jigra/compare/6.1.1...6.1.2) (2024-11-07)

### Bug Fixes

- **android:** better cleaning of `allowedOrigin` url ([22129bc](https://github.com/familyjs/jigra/commit/22129bc2598bc0fd4d2405dccd5949189b084304))
- **http:** pass original url as query param on the proxy url ([cf28344](https://github.com/familyjs/jigra/commit/cf283442ea260189ad38a2eda62f86c221538618))
- support dependencies with `.swift` at the end of name ([cc089a8](https://github.com/familyjs/jigra/commit/cc089a8570ac495ed54790b576b0a7f9178282e1))

## [6.1.1](https://github.com/familyjs/jigra/compare/6.1.0...6.1.1) (2024-11-07)

### Bug Fixes

- **android:** Allow WebView to load blob urls ([5ed5b31](https://github.com/familyjs/jigra/commit/5ed5b3121f404099fb82c7c4b1904306bc6f2c5c))
- **android:** javascript injection not working on urls with query ([08cf71a](https://github.com/familyjs/jigra/commit/08cf71af6c86b003d3d53a3cb5a23a0f01ad19e6))
- **android:** send FormData on older devices ([16f16e3](https://github.com/familyjs/jigra/commit/16f16e3e4580cea0e428ed95c495e6caffe5777c))
- **android:** UTF-8 encode form data value ([bcca076](https://github.com/familyjs/jigra/commit/bcca076c214ed4ed9adc924408c7227684ce8b0c))
- **cli:** enable cleartext for live reload ([41f9a00](https://github.com/familyjs/jigra/commit/41f9a00a0d04d532e084d69ae63fabadaa795e4e))
- **http:** handle UInt8Array on body and run fmt ([d3d9daa](https://github.com/familyjs/jigra/commit/d3d9daa1598d9e4c78c65044d4e247ca4bed221d))
- **ios:** make `removeAllListeners` accessible from javascript ([f3a7f44](https://github.com/familyjs/jigra/commit/f3a7f449d9e6a6e0165c4cba94a7698eb515df5d))
- **ios:** Match JigApp-SPM iOS version with project version ([95ee987](https://github.com/familyjs/jigra/commit/95ee987d2beae8562d22b3f478dedee8e8b24326))

# [6.1.0](https://github.com/familyjs/jigra/compare/6.0.0...6.1.0) (2024-09-20)

### Bug Fixes

- **android:** avoid crash if server url ends in / ([6f7e9fd](https://github.com/familyjs/jigra/commit/6f7e9fda2a2d825802ca2a8bcd31ac8ab759af98))
- **cli:** Avoid duplicate entries in `packageClassList` ([70c3ac7](https://github.com/familyjs/jigra/commit/70c3ac74788b52dfa69e873397692ff275f91774))
- **cli:** Don't downgrade variables on migrate ([7e39411](https://github.com/familyjs/jigra/commit/7e39411bf3129ceb75832f38a13ac55e400d289a))
- **cli:** Run sync before updating gradle ([f85a928](https://github.com/familyjs/jigra/commit/f85a928ec4749b20a7fb3ec715cb2521536dae69))
- **http:** don't override `readyState` for non POST requests ([c6ccf8f](https://github.com/familyjs/jigra/commit/c6ccf8f744b76d5ee971433ce0308ee0a9a6345a))
- **ios:** check if `urlSchemeTask` is stopped before calling its methods ([07c0cb0](https://github.com/familyjs/jigra/commit/07c0cb03cc5ce7f92c551d8800d2f85d91be7d55))

### Features

- **cli:** run plugin hooks ([1cc8879](https://github.com/familyjs/jigra/commit/1cc8879d3d44502b956bfda3c578b78abeb84afe))
- **ios:** `JIGPluginMethod` selector-based initializer ([fcfbd87](https://github.com/familyjs/jigra/commit/fcfbd87de76cdfeccd3372cdf62586b5598d980b))

# [6.0.0](https://github.com/familyjs/jigra/compare/6.0.0-alpha.2...6.0.0) (2024-06-28)

**Note:** Version bump only for package jigra

# [6.0.0-alpha.2](https://github.com/familyjs/jigra/compare/6.0.0-alpha.1...6.0.0-alpha.2) (2024-06-28)

**Note:** Version bump only for package jigra

# [6.0.0-alpha.1](https://github.com/familyjs/jigra/compare/5.6.0...6.0.0-alpha.1) (2024-06-28)

### Bug Fixes

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **cli:** apkName for multi-dimensional flavors ([3d374df](https://github.com/familyjs/jigra/commit/3d374df4b1e8b34923f861a56885219c40df7afd))
- **cli:** Attempt to verify non-cjs modules exist if cjs resolution fails ([bab2ef5](https://github.com/familyjs/jigra/commit/bab2ef56624c1e2b1947584a8398d71bae1784a0))
- **cli:** correct build path for non flavor builds ([5291ab0](https://github.com/familyjs/jigra/commit/5291ab074341d9eb73db5d40945c57d021bed25e))
- **cli:** Removing extra dash in android apk name flavor parsing ([1246a58](https://github.com/familyjs/jigra/commit/1246a581235cceebc383f653b461e2f9edd7c068))
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

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **cli:** apkName for multi-dimensional flavors ([3d374df](https://github.com/familyjs/jigra/commit/3d374df4b1e8b34923f861a56885219c40df7afd))
- **cli:** Attempt to verify non-cjs modules exist if cjs resolution fails ([bab2ef5](https://github.com/familyjs/jigra/commit/bab2ef56624c1e2b1947584a8398d71bae1784a0))
- **cli:** correct build path for non flavor builds ([5291ab0](https://github.com/familyjs/jigra/commit/5291ab074341d9eb73db5d40945c57d021bed25e))
- **cli:** Removing extra dash in android apk name flavor parsing ([1246a58](https://github.com/familyjs/jigra/commit/1246a581235cceebc383f653b461e2f9edd7c068))
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

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **cli:** apkName for multi-dimensional flavors ([3d374df](https://github.com/familyjs/jigra/commit/3d374df4b1e8b34923f861a56885219c40df7afd))
- **cli:** Attempt to verify non-cjs modules exist if cjs resolution fails ([bab2ef5](https://github.com/familyjs/jigra/commit/bab2ef56624c1e2b1947584a8398d71bae1784a0))
- **cli:** correct build path for non flavor builds ([5291ab0](https://github.com/familyjs/jigra/commit/5291ab074341d9eb73db5d40945c57d021bed25e))
- **cli:** Removing extra dash in android apk name flavor parsing ([1246a58](https://github.com/familyjs/jigra/commit/1246a581235cceebc383f653b461e2f9edd7c068))
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

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **cli:** apkName for multi-dimensional flavors ([3d374df](https://github.com/familyjs/jigra/commit/3d374df4b1e8b34923f861a56885219c40df7afd))
- **cli:** Attempt to verify non-cjs modules exist if cjs resolution fails ([bab2ef5](https://github.com/familyjs/jigra/commit/bab2ef56624c1e2b1947584a8398d71bae1784a0))
- **cli:** correct build path for non flavor builds ([5291ab0](https://github.com/familyjs/jigra/commit/5291ab074341d9eb73db5d40945c57d021bed25e))
- **cli:** Removing extra dash in android apk name flavor parsing ([1246a58](https://github.com/familyjs/jigra/commit/1246a581235cceebc383f653b461e2f9edd7c068))
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

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **cli:** apkName for multi-dimensional flavors ([3d374df](https://github.com/familyjs/jigra/commit/3d374df4b1e8b34923f861a56885219c40df7afd))
- **cli:** Attempt to verify non-cjs modules exist if cjs resolution fails ([bab2ef5](https://github.com/familyjs/jigra/commit/bab2ef56624c1e2b1947584a8398d71bae1784a0))
- **cli:** correct build path for non flavor builds ([5291ab0](https://github.com/familyjs/jigra/commit/5291ab074341d9eb73db5d40945c57d021bed25e))
- **cli:** Removing extra dash in android apk name flavor parsing ([1246a58](https://github.com/familyjs/jigra/commit/1246a581235cceebc383f653b461e2f9edd7c068))
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

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **cli:** apkName for multi-dimensional flavors ([3d374df](https://github.com/familyjs/jigra/commit/3d374df4b1e8b34923f861a56885219c40df7afd))
- **cli:** Attempt to verify non-cjs modules exist if cjs resolution fails ([bab2ef5](https://github.com/familyjs/jigra/commit/bab2ef56624c1e2b1947584a8398d71bae1784a0))
- **cli:** correct build path for non flavor builds ([5291ab0](https://github.com/familyjs/jigra/commit/5291ab074341d9eb73db5d40945c57d021bed25e))
- **http:** change proxy url generation ([683cf14](https://github.com/familyjs/jigra/commit/683cf1437e322212387f74a738916ad8da274519))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))
- **ios:** overwrite CORS headers on livereload ([c7d464a](https://github.com/familyjs/jigra/commit/c7d464a9bf2ac4fedcfa84cb73baab89f02a90d9))

## [5.7.3](https://github.com/familyjs/jigra/compare/5.6.0...5.7.3) (2024-06-22)

### Bug Fixes

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **cli:** apkName for multi-dimensional flavors ([3d374df](https://github.com/familyjs/jigra/commit/3d374df4b1e8b34923f861a56885219c40df7afd))
- **cli:** Attempt to verify non-cjs modules exist if cjs resolution fails ([bab2ef5](https://github.com/familyjs/jigra/commit/bab2ef56624c1e2b1947584a8398d71bae1784a0))
- **cli:** correct build path for non flavor builds ([5291ab0](https://github.com/familyjs/jigra/commit/5291ab074341d9eb73db5d40945c57d021bed25e))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** keep original URL properties on proxy ([a4df88d](https://github.com/familyjs/jigra/commit/a4df88decbc0d41c495b609515b39a2be01d5db6))
- **http:** Make proxy work with Request objects ([16c2d4e](https://github.com/familyjs/jigra/commit/16c2d4e8b48083142f403b076f4fc2b3df72408e))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))
- **http:** set port for proxy url ([a5d3693](https://github.com/familyjs/jigra/commit/a5d369396109b3afda48dc6c722a532520ea0c64))
- **ios:** overwrite CORS headers on livereload ([c7d464a](https://github.com/familyjs/jigra/commit/c7d464a9bf2ac4fedcfa84cb73baab89f02a90d9))

## [5.7.2](https://github.com/familyjs/jigra/compare/5.6.0...5.7.2) (2024-06-22)

### Bug Fixes

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **android:** prevent crash on script injection if the script is too long ([30e0f71](https://github.com/familyjs/jigra/commit/30e0f718425caa26d17f8455ece47ef6e8e329e0))
- **cli:** Attempt to verify non-cjs modules exist if cjs resolution fails ([bab2ef5](https://github.com/familyjs/jigra/commit/bab2ef56624c1e2b1947584a8398d71bae1784a0))
- **cli:** correct build path for non flavor builds ([5291ab0](https://github.com/familyjs/jigra/commit/5291ab074341d9eb73db5d40945c57d021bed25e))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))

## [5.7.1](https://github.com/familyjs/jigra/compare/5.6.0...5.7.1) (2024-06-21)

### Bug Fixes

- **android:** handle http errors on the proxy ([dd39a96](https://github.com/familyjs/jigra/commit/dd39a96aee0afd6c4483d8d8c673aef0493878b1))
- **android:** incorrect http url params encoding ([62f4281](https://github.com/familyjs/jigra/commit/62f42814b1a63a00980e104c6d99bf5726be1f76))
- **android:** let WebView handle errors ([790d5d0](https://github.com/familyjs/jigra/commit/790d5d0bcbc55ea0c55c7f0f703759d2cb7f15a9))
- **android:** make `JSInjector` replace first `<head>` only ([e5cce4d](https://github.com/familyjs/jigra/commit/e5cce4d74977fd24afd2de445e976f2fdccbda32))
- **cli:** correct build path for non flavor builds ([5291ab0](https://github.com/familyjs/jigra/commit/5291ab074341d9eb73db5d40945c57d021bed25e))
- **http:** handle proxy urls with port ([f496849](https://github.com/familyjs/jigra/commit/f4968490e22629ffa85ff8f008df20ed6c81b4a0))
- **http:** route get requests through custom handler ([7599e02](https://github.com/familyjs/jigra/commit/7599e02fb4e876cef534b372f3620564d8f5a53c))

# [5.7.0](https://github.com/familyjs/jigra/compare/5.6.0...5.7.0) (2024-06-21)

**Note:** Version bump only for package jigra

# [5.7.0-alpha.1](https://github.com/familyjs/jigra/compare/5.6.0...5.7.0-alpha.1) (2024-06-21)

**Note:** Version bump only for package jigra

## [5.0.5](https://github.com/familyjs/jigra/compare/5.0.4...5.0.5) (2024-04-22)

### Bug Fixes

- **http:** don't throw errors when content-type is null on response ([1300a25](https://github.com/familyjs/jigra/commit/1300a2500acbc0e2439cdb820cdd220c3a0e9aa5))

## [5.0.4](https://github.com/familyjs/jigra/compare/5.0.3...5.0.4) (2023-06-03)

### Bug Fixes

- **cicd:** removed to allow job to continue ([d064e2f](https://github.com/familyjs/jigra/commit/d064e2f994a1dcf2f420d6bf9821a026f5dbf05e))
- **cli:** correct migration of package from AndroidManifest.xml to build.gradle ([0e29d42](https://github.com/familyjs/jigra/commit/0e29d422a6550a8fef61dbb76743562aeb3e726b))
- **cli:** Don't succeed migration if npm install failed ([3efa3b9](https://github.com/familyjs/jigra/commit/3efa3b9afb071514ac238229e3416fc0ea9f5c8e))
- **cli:** proper plugin module patch in monorepos ([cd51abd](https://github.com/familyjs/jigra/commit/cd51abde21f76fe5d9966d097aa3cfdde1aae598))

## [5.0.3](https://github.com/familyjs/jigra/compare/5.0.2...5.0.3) (2023-06-03)

**Note:** Version bump only for package jigra

## [5.0.2](https://github.com/familyjs/jigra/compare/5.0.1...5.0.2) (2023-06-03)

### Bug Fixes

- **cli:** handle unrecognized java --version ([82d68a1](https://github.com/familyjs/jigra/commit/82d68a1dd2faf52786d1d663aa917c057fd2e076))
- **cli:** Move package to build.gradle in Jigra plugins ([daf4d9d](https://github.com/familyjs/jigra/commit/daf4d9ddbb23dcbe8455207e7f8aa607d4358e55))
- fallback to plain if does not contain CocoaPods ([a0677c0](https://github.com/familyjs/jigra/commit/a0677c007923d0c6e94bc267fc9457a775ecb084))

## [5.0.1](https://github.com/familyjs/jigra/compare/5.0.0...5.0.1) (2023-06-03)

### Bug Fixes

- **cli:** install minor Jigra 5 version ([1c166c5](https://github.com/familyjs/jigra/commit/1c166c57eec98c2bfd67042dc0bd0d56f71cd3db))
- **cli:** Update migration link ([98d019d](https://github.com/familyjs/jigra/commit/98d019dda745efa271234e53f480f5cf8ca89593))

# [5.0.0](https://github.com/familyjs/jigra/compare/4.0.0...5.0.0) (2023-05-22)

**Note:** Version bump only for package jigra

# [4.0.0](https://github.com/navify/jigra/compare/3.8.0...4.0.0) (2023-01-16)

### Bug Fixes

- **android:** added ServerPath object and building options for setting initial load from portals ([5049599](https://github.com/navify/jigra/commit/5049599b17ecc8a8cc0a87bb4fa49330e2363987))

### Features

- **cli:** backports secure live updates support with portals for jigra to 3.x ([25d2a5a](https://github.com/navify/jigra/commit/25d2a5a6b229a43031d6a3548a75144015f78c7a))

# [3.9.0](https://github.com/navify/jigra/compare/3.8.0...3.9.0) (2023-01-10)

### Bug Fixes

- **android:** added ServerPath object and building options for setting initial load from portals ([5049599](https://github.com/navify/jigra/commit/5049599b17ecc8a8cc0a87bb4fa49330e2363987))

### Features

- **cli:** backports secure live updates support with portals for jigra to 3.x ([25d2a5a](https://github.com/navify/jigra/commit/25d2a5a6b229a43031d6a3548a75144015f78c7a))

# [3.8.0](https://github.com/navify/jigra/compare/3.7.1...3.8.0) (2023-01-10)

### Features

- **ios:** Add `setServerBasePath(_:)` to JIGBridgeProtocol ([73d9bff](https://github.com/navify/jigra/commit/73d9bff3f2a7c0b2aafa25a1f5dba6a115ea6a23))

## [3.7.1](https://github.com/navify/jigra/compare/3.7.0-rc.1...3.7.1) (2023-01-10)

**Note:** Version bump only for package jigra

# 3.7.0-rc.1 (2022-08-17)

**Note:** Version bump only for package jigra
