#import "JIGInstanceDescriptor.h"
#import <Jigra/Jigra-Swift.h>

// Swift extensions marked as @objc and internal are available to the Obj-C runtime but are not available at compile time.
// so we need this declaration to avoid compiler complaints
@interface JIGInstanceDescriptor (InternalSwiftExtension)
- (void)_parseConfigurationAt:(NSURL *)configURL cordovaConfiguration:(NSURL *)cordovaURL;
@end

NSString* const JIGInstanceDescriptorDefaultScheme = @"jigra";
NSString* const JIGInstanceDescriptorDefaultHostname = @"localhost";

@implementation JIGInstanceDescriptor
- (instancetype)initAsDefault {
    if (self = [super init]) {
        _instanceType = JIGInstanceTypeFixed;
        [self _setDefaultsWithAppLocation:[[NSBundle mainBundle] URLForResource:@"public" withExtension:nil]];
        [self _parseConfigurationAt:[[NSBundle mainBundle] URLForResource:@"jigra.config" withExtension:@"json"] cordovaConfiguration:[[NSBundle mainBundle] URLForResource:@"config" withExtension:@"xml"]];
    }
    return self;
}

- (instancetype)initAtLocation:(NSURL*)appURL configuration:(NSURL*)configURL cordovaConfiguration:(NSURL*)cordovaURL {
    if (self = [super init]) {
        _instanceType = JIGInstanceTypeVariable;
        [self _setDefaultsWithAppLocation:appURL];
        [self _parseConfigurationAt:configURL cordovaConfiguration:cordovaURL];
    }
    return self;
}

- (void)_setDefaultsWithAppLocation:(NSURL*)location {
    _allowedNavigationHostnames = @[];
    _urlScheme = JIGInstanceDescriptorDefaultScheme;
    _urlHostname = JIGInstanceDescriptorDefaultHostname;
    _pluginConfigurations = @{};
    _legacyConfig = @{};
    _loggingBehavior = JIGInstanceLoggingBehaviorDebug;
    _scrollingEnabled = YES;
    _allowLinkPreviews = YES;
    _handleApplicationNotifications = YES;
    _contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
    _appLocation = location;
    _limitsNavigationsToAppBoundDomains = FALSE;
    _cordovaConfiguration = [[CDVConfigParser alloc] init];
    _warnings = 0;
    if (location == nil) {
        _warnings |= JIGInstanceWarningMissingAppDir;
        // location is nil so assume it was supposed to be the default
        _appLocation = [[[NSBundle mainBundle] resourceURL] URLByAppendingPathComponent:@"public"];
    }
}
@end
