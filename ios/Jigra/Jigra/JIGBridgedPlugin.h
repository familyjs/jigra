#import "JIGPluginMethod.h"

#if defined(__cplusplus)
#define JIG_EXTERN extern "C" __attribute__((visibility("default")))
#else
#define JIG_EXTERN extern __attribute__((visibility("default")))
#endif

#define JIGPluginReturnNone @"none"
#define JIGPluginReturnCallback @"callback"
#define JIGPluginReturnPromise @"promise"
#define JIGPluginReturnWatch @"watch"
#define JIGPluginReturnSync @"sync" // not used

@class JIGPluginCall;
@class JIGPlugin;

@protocol JIGBridgedPlugin <NSObject>
@property (nonnull, readonly) NSString *identifier;
@property (nonnull, readonly) NSString *jsName;
@property (nonnull, readonly) NSArray<JIGPluginMethod *> *pluginMethods;
@end

#define JIG_PLUGIN_CONFIG(plugin_id, js_name) \
- (NSString *)identifier { return @#plugin_id; } \
- (NSString *)jsName { return @js_name; }
#define JIG_PLUGIN_METHOD(method_name, method_return_type) \
[methods addObject:[[JIGPluginMethod alloc] initWithName:@#method_name returnType:method_return_type]]

#define JIG_PLUGIN(objc_name, js_name, methods_body) \
@interface objc_name : NSObject \
@end \
@interface objc_name (JIGPluginCategory) <JIGBridgedPlugin> \
@end \
@implementation objc_name (JIGPluginCategory) \
- (NSArray *)pluginMethods { \
  NSMutableArray *methods = [NSMutableArray new]; \
  methods_body \
  return methods; \
} \
JIG_PLUGIN_CONFIG(objc_name, js_name) \
@end

