#import <Foundation/Foundation.h>
#import <WebKit/WebKit.h>

@protocol JIGBridgeProtocol;
@class JIGPluginCall;

@class PluginConfig;

@interface JIGPlugin : NSObject

@property (nonatomic, weak, nullable) WKWebView *webView;
@property (nonatomic, weak, nullable) id<JIGBridgeProtocol> bridge;
@property (nonatomic, strong, nonnull) NSString *pluginId;
@property (nonatomic, strong, nonnull) NSString *pluginName;
@property (nonatomic, strong, nullable) NSMutableDictionary<NSString *, NSMutableArray<JIGPluginCall *>*> *eventListeners;
@property (nonatomic, strong, nullable) NSMutableDictionary<NSString *, id> *retainedEventArguments;
@property (nonatomic, assign) BOOL shouldStringifyDatesInCalls;

- (instancetype _Nonnull) initWithBridge:(id<JIGBridgeProtocol> _Nonnull) bridge pluginId:(NSString* _Nonnull) pluginId pluginName:(NSString* _Nonnull) pluginName;
- (void)addEventListener:(NSString* _Nonnull)eventName listener:(JIGPluginCall* _Nonnull)listener;
- (void)removeEventListener:(NSString* _Nonnull)eventName listener:(JIGPluginCall* _Nonnull)listener;
- (void)notifyListeners:(NSString* _Nonnull)eventName data:(NSDictionary<NSString *, id>* _Nullable)data;
- (void)notifyListeners:(NSString* _Nonnull)eventName data:(NSDictionary<NSString *, id>* _Nullable)data retainUntilConsumed:(BOOL)retain;
- (NSArray<JIGPluginCall *>* _Nullable)getListeners:(NSString* _Nonnull)eventName;
- (BOOL)hasListeners:(NSString* _Nonnull)eventName;
- (void)addListener:(JIGPluginCall* _Nonnull)call;
- (void)removeListener:(JIGPluginCall* _Nonnull)call;
- (void)removeAllListeners:(JIGPluginCall* _Nonnull)call;
/**
 * Default implementation of the jigra 3.0 permission pattern
 */
- (void)checkPermissions:(JIGPluginCall* _Nonnull)call;
- (void)requestPermissions:(JIGPluginCall* _Nonnull)call;
/**
 * Give the plugins a chance to take control when a URL is about to be loaded in the WebView.
 * Returning true causes the WebView to abort loading the URL.
 * Returning false causes the WebView to continue loading the URL.
 * Returning nil will defer to the default Jigra policy
 */
- (NSNumber* _Nullable)shouldOverrideLoad:(WKNavigationAction* _Nonnull)navigationAction;

// Called after init if the plugin wants to do
// some loading so the plugin author doesn't
// need to override init()
-(void)load;
-(NSString* _Nonnull)getId;
-(BOOL)getBool:(JIGPluginCall* _Nonnull) call field:(NSString* _Nonnull)field defaultValue:(BOOL)defaultValue DEPRECATED_MSG_ATTRIBUTE("Use accessors on JIGPluginCall instead. See JIGBridgedJSTypes.h for Obj-C implementations.");
-(NSString* _Nullable)getString:(JIGPluginCall* _Nonnull)call field:(NSString* _Nonnull)field defaultValue:(NSString* _Nonnull)defaultValue DEPRECATED_MSG_ATTRIBUTE("Use accessors on JIGPluginCall instead. See JIGBridgedJSTypes.h for Obj-C implementations.");
-(id _Nullable)getConfigValue:(NSString* _Nonnull)key __deprecated_msg("use getConfig() and access config values using the methods available depending on the type.");
-(PluginConfig* _Nonnull)getConfig;
-(void)setCenteredPopover:(UIViewController* _Nonnull) vc;
-(void)setCenteredPopover:(UIViewController* _Nonnull) vc size:(CGSize) size;
-(BOOL)supportsPopover DEPRECATED_MSG_ATTRIBUTE("All iOS 13+ devices support popover");

@end
