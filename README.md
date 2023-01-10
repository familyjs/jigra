<div align="center">
  <h1>Jigra</h1>
</div>
<div align="center">
  ⚡️ Cross-platform apps with JavaScript and the Web ⚡️
</div>

---

Jigra lets you run web apps natively on iOS, Android, Web, and more with a single codebase and cross-platform APIs.

Jigra provides a cross-platform API and code execution layer that makes it easy to call Native SDKs from web code and to write custom native plugins that your app may need. Additionally, Jigra provides first-class Progressive Web App support so you can write one app and deploy it to the app stores _and_ the mobile web.

Jigra comes with a Plugin API for building native plugins. Plugins can be written inside Jigra apps or packaged into an npm dependency for community use. Plugin authors are encouraged to use Swift to develop plugins in iOS and Kotlin (or Java) in Android.

## Getting Started

Jigra was designed to drop-in to any existing modern web app. Run the following commands to initialize Jigra in your app:

```
npm install @jigra/core @jigra/cli
npx jig init
```

Next, install any of the desired native platforms:

```
npm install @jigra/android
npx jig add android
npm install @jigra/ios
npx jig add ios
```

### New App?

For new apps, we recommend trying the [Navify Framework](https://navifyframework.web.app/) with Jigra.

To begin, install the [Navify CLI](https://navifyframework.web.app/docs/cli/) (`npm install -g @navify/cli`) and start a new app:

```
navify start --jigra
```

## FAQ

#### What are the differences between Jigra and Cordova?

In spirit, Jigra and Cordova are very similar. Jigra offers backward compatibility with a vast majority of Cordova plugins.

Jigra and Cordova differ in that Jigra:

- takes a more modern approach to tooling and plugin development
- treats native projects as source artifacts as opposed to build artifacts
- is maintained by the Navify Team 💙😊

See [the docs](https://jigrajs.web.app/docs/cordova#differences-between-jigra-and-cordova) for more details.

#### Do I need to use Navify Framework with Jigra?

No, you do not need to use Navify Framework with Jigra. Without the Navify Framework, you may need to implement Native UI yourself. Without the Navify CLI, you may need to configure tooling yourself to enable features such as [livereload](https://navifyframework.web.app/docs/cli/livereload). See [the docs](https://jigrajs.web.app/docs/getting-started/with-navify) for more details.
