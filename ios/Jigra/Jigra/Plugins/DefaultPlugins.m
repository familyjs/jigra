#import <Foundation/Foundation.h>

#import "JIGBridgedPlugin.h"

JIG_PLUGIN(JIGConsolePlugin, "Console",
  JIG_PLUGIN_METHOD(log, JIGPluginReturnNone);
)

JIG_PLUGIN(JIGWebViewPlugin, "WebView",
  JIG_PLUGIN_METHOD(setServerBasePath, JIGPluginReturnPromise);
  JIG_PLUGIN_METHOD(getServerBasePath, JIGPluginReturnPromise);
  JIG_PLUGIN_METHOD(persistServerBasePath, JIGPluginReturnPromise);
)
