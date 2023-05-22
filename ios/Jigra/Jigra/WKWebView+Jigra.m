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

// TODO: Remove this after Xcode 14.3 is required
@implementation WKWebView (JigraInspectablity)

- (void)setInspectableIfRequired: (BOOL)shouldInspect {
    #if __IPHONE_OS_VERSION_MAX_ALLOWED >= 160400
    if (@available(iOS 16.4, *)) {
        self.inspectable = shouldInspect;
    }
    #endif
}

@end
