#import <Foundation/Foundation.h>

@class JIGPluginCall;
@class JIGPluginCallResult;
@class JIGPluginCallError;

typedef void(^JIGPluginCallSuccessHandler)(JIGPluginCallResult *result, JIGPluginCall* call);
typedef void(^JIGPluginCallErrorHandler)(JIGPluginCallError *error);

@interface JIGPluginCall : NSObject

@property (nonatomic, assign) BOOL isSaved DEPRECATED_MSG_ATTRIBUTE("Use 'keepAlive' instead.");
@property (nonatomic, assign) BOOL keepAlive;
@property (nonatomic, strong) NSString *callbackId;
@property (nonatomic, strong) NSDictionary *options;
@property (nonatomic, copy) JIGPluginCallSuccessHandler successHandler;
@property (nonatomic, copy) JIGPluginCallErrorHandler errorHandler;

- (instancetype)initWithCallbackId:(NSString *)callbackId options:(NSDictionary *)options success:(JIGPluginCallSuccessHandler)success error:(JIGPluginCallErrorHandler)error;

- (void)save DEPRECATED_MSG_ATTRIBUTE("Use the 'keepAlive' property instead.");
@end
