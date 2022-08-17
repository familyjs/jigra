#import <Foundation/Foundation.h>
#import "JIGPluginCall.h"

@implementation JIGPluginCall

- (instancetype)initWithCallbackId:(NSString *)callbackId options:(NSDictionary *)options success:(JIGPluginCallSuccessHandler) success error:(JIGPluginCallErrorHandler) error {
  self.callbackId = callbackId;
  self.options = options;
  self.successHandler = success;
  self.errorHandler = error;
  return self;
}

- (BOOL)isSaved {
    return self.keepAlive;
}

- (void)setIsSaved:(BOOL)saved {
    self.keepAlive = saved;
}

- (void)save {
  self.keepAlive = true;
}

@end
