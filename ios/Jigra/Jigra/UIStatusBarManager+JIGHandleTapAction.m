#import <Jigra/Jigra-Swift.h>
#import <objc/message.h>
#import <objc/runtime.h>

@implementation UIStatusBarManager (JIGHandleTapAction)

+ (void)load {
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    Class class = [self class];
    SEL originalSelector = NSSelectorFromString(@"handleTapAction:");
    SEL swizzledSelector = @selector(nofity_handleTapAction:);

    Method originalMethod = class_getInstanceMethod(class, originalSelector);
    Method swizzledMethod = class_getInstanceMethod(class, swizzledSelector);

    BOOL didAddMethod = class_addMethod(class,
                                        originalSelector,
                                        method_getImplementation(swizzledMethod),
                                        method_getTypeEncoding(swizzledMethod));
    if (didAddMethod) {
      class_replaceMethod(class,
                          swizzledSelector,
                          method_getImplementation(originalMethod),
                          method_getTypeEncoding(originalMethod));
    } else {
      method_exchangeImplementations(originalMethod, swizzledMethod);
    }
  });
}

-(void)nofity_handleTapAction:(id)arg1 {
  [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:NSNotification.jigraStatusBarTapped object:nil]];
  [self nofity_handleTapAction:arg1];
}

@end
