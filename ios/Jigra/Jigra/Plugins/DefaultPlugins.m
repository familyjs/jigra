#import <Foundation/Foundation.h>

#import "JIGBridgedPlugin.h"

JIG_PLUGIN(JIGCookiesPlugin, "JigraCookies",
  JIG_PLUGIN_METHOD(getCookies, JIGPluginReturnPromise);
  JIG_PLUGIN_METHOD(setCookie, JIGPluginReturnPromise);
  JIG_PLUGIN_METHOD(deleteCookie, JIGPluginReturnPromise);
  JIG_PLUGIN_METHOD(clearCookies, JIGPluginReturnPromise);
  JIG_PLUGIN_METHOD(clearAllCookies, JIGPluginReturnPromise);
)

JIG_PLUGIN(JIGHttpPlugin, "JigraHttp",
  JIG_PLUGIN_METHOD(request, JIGPluginReturnPromise);
  JIG_PLUGIN_METHOD(get, JIGPluginReturnPromise);
  JIG_PLUGIN_METHOD(post, JIGPluginReturnPromise);
  JIG_PLUGIN_METHOD(put, JIGPluginReturnPromise);
  JIG_PLUGIN_METHOD(patch, JIGPluginReturnPromise);
  JIG_PLUGIN_METHOD(delete, JIGPluginReturnPromise);
)

JIG_PLUGIN(JIGConsolePlugin, "Console",
  JIG_PLUGIN_METHOD(log, JIGPluginReturnNone);
)

JIG_PLUGIN(JIGWebViewPlugin, "WebView",
  JIG_PLUGIN_METHOD(setServerAssetPath, JIGPluginReturnPromise);
  JIG_PLUGIN_METHOD(setServerBasePath, JIGPluginReturnPromise);
  JIG_PLUGIN_METHOD(getServerBasePath, JIGPluginReturnPromise);
  JIG_PLUGIN_METHOD(persistServerBasePath, JIGPluginReturnPromise);
)
