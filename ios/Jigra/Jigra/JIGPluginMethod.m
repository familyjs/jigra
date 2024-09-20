#import <Jigra/Jigra-Swift.h>
#import "JIGPluginMethod.h"

typedef void(^JIGCallback)(id _arg, NSInteger index);

@implementation JIGPluginMethodArgument

- (instancetype)initWithName:(NSString *)name nullability:(JIGPluginMethodArgumentNullability)nullability type:(NSString *)type {
  self.name = name;
  self.nullability = nullability;
  return self;
}

@end

@implementation JIGPluginMethod {
  // NSInvocation's retainArguments doesn't work with our arguments
  // so we have to retain args manually
  NSMutableArray *_manualRetainArgs;
  // Retain invocation instance
  NSInvocation *_invocation;
  NSMutableArray *_methodArgumentCallbacks;
  JIGPluginCall *_call;
  SEL _selector;
}

-(instancetype)initWithName:(NSString *)name returnType:(JIGPluginReturnType *)returnType {
  self.name = name;
  self.selector = NSSelectorFromString([name stringByAppendingString:@":"]);
  self.returnType = returnType;
  return self;
}

-(instancetype)initWithSelector:(SEL) selector returnType:(JIGPluginReturnType *)returnType {
    // need to drop the : from the selector string
    NSString* rawSelString = NSStringFromSelector(selector);
    self.name = [rawSelString substringToIndex:[rawSelString length] - 1];
    self.selector = selector;
    self.returnType = returnType;
    return self;
}

@end

