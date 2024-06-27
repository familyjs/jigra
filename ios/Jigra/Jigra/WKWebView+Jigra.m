#import <objc/runtime.h>
#import <Jigra/Jigra-Swift.h>

// Swift extensions marked as @objc and internal are available to the runtime but won't be found at compile time
// so we need this declaration to avoid compiler complaints.
@interface WKWebView (InternalSwiftExtension)
+ (void)_swizzleKeyboardMethods;
@end

// +load is the safest place to swizzle methods but that won't work from a swift extension so we need this wrapper.
@implementation WKWebView (JigraAutoFocus)
+ (void)load {
    [self _swizzleKeyboardMethods];
}
@end
