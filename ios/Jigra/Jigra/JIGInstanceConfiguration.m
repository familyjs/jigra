#import "JIGInstanceConfiguration.h"
#import <Jigra/Jigra-Swift.h>

@interface JIGInstanceConfiguration (Internal)
- (instancetype)initWithConfiguration:(JIGInstanceConfiguration*)configuration andLocation:(NSURL*)location;
@end


@implementation JIGInstanceConfiguration

- (instancetype)initWithDescriptor:(JIGInstanceDescriptor *)descriptor isDebug:(BOOL)debug {
    if (self = [super init]) {
        // first, give the descriptor a chance to make itself internally consistent
        [descriptor normalize];
        // now copy the simple properties
        _appendedUserAgentString = descriptor.appendedUserAgentString;
        _overridenUserAgentString = descriptor.overridenUserAgentString;
        _backgroundColor = descriptor.backgroundColor;
        _allowedNavigationHostnames = descriptor.allowedNavigationHostnames;
        switch (descriptor.loggingBehavior) {
            case JIGInstanceLoggingBehaviorProduction:
                _loggingEnabled = true;
                break;
            case JIGInstanceLoggingBehaviorDebug:
                _loggingEnabled = debug;
                break;
            default:
                _loggingEnabled = false;
                break;
        }
        _scrollingEnabled = descriptor.scrollingEnabled;
        _allowLinkPreviews = descriptor.allowLinkPreviews;
        _handleApplicationNotifications = descriptor.handleApplicationNotifications;
        _contentInsetAdjustmentBehavior = descriptor.contentInsetAdjustmentBehavior;
        _appLocation = descriptor.appLocation;
        _appStartPath = descriptor.appStartPath;
        _limitsNavigationsToAppBoundDomains = descriptor.limitsNavigationsToAppBoundDomains;
        _pluginConfigurations = descriptor.pluginConfigurations;
        _legacyConfig = descriptor.legacyConfig;
        // construct the necessary URLs
        _localURL = [[NSURL alloc] initWithString:[NSString stringWithFormat:@"%@://%@", descriptor.urlScheme, descriptor.urlHostname]];
        if (descriptor.serverURL != nil) {
            _serverURL = [[NSURL alloc] initWithString:(descriptor.serverURL)];
        }
        else {
            _serverURL = _localURL;
        }
        // extract the one value we care about from the cordova configuration
        _cordovaDeployDisabled = [descriptor cordovaDeployDisabled];
    }
    return self;
}

- (instancetype)initWithConfiguration:(JIGInstanceConfiguration*)configuration andLocation:(NSURL*)location {
    if (self = [super init]) {
        _appendedUserAgentString = [[configuration appendedUserAgentString] copy];
        _overridenUserAgentString = [[configuration overridenUserAgentString] copy];
        _backgroundColor = configuration.backgroundColor;
        _allowedNavigationHostnames = [[configuration allowedNavigationHostnames] copy];
        _localURL = [[configuration localURL] copy];
        _serverURL = [[configuration serverURL] copy];
        _pluginConfigurations = [[configuration pluginConfigurations] copy];
        _loggingEnabled = configuration.loggingEnabled;
        _scrollingEnabled = configuration.scrollingEnabled;
        _allowLinkPreviews = configuration.allowLinkPreviews;
        _handleApplicationNotifications = configuration.handleApplicationNotifications;
        _cordovaDeployDisabled = configuration.cordovaDeployDisabled;
        _contentInsetAdjustmentBehavior = configuration.contentInsetAdjustmentBehavior;
        // we don't care about internal usage of deprecated APIs and the framework should build cleanly
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Wdeprecated-declarations"
        _legacyConfig = [[configuration legacyConfig] copy];
#pragma clang diagnostic pop
        _appStartPath = configuration.appStartPath;
        _appLocation = [location copy];
    }
    return self;
}

- (instancetype)updatingAppLocation:(NSURL*)location {
    return [[JIGInstanceConfiguration alloc] initWithConfiguration:self andLocation:location];
}

@end
