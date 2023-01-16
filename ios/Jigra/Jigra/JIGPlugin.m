#import "JIGPlugin.h"
#import "JIGBridgedJSTypes.h"
#import <Jigra/Jigra-Swift.h>
#import <Foundation/Foundation.h>

@implementation JIGPlugin

-(instancetype) initWithBridge:(id<JIGBridgeProtocol>)bridge pluginId:(NSString *)pluginId pluginName:(NSString *)pluginName {
  self.bridge = bridge;
  self.webView = bridge.webView;
  self.pluginId = pluginId;
  self.pluginName = pluginName;
  self.eventListeners = [[NSMutableDictionary alloc] init];
  self.retainedEventArguments = [[NSMutableDictionary alloc] init];
  self.shouldStringifyDatesInCalls = true;
  return self;
}

-(NSString *) getId {
  return self.pluginName;
}

- (BOOL)getBool:(JIGPluginCall *)call field:(NSString *)field defaultValue:(BOOL)defaultValue {
  NSNumber* value = [call getNumber:field defaultValue:[NSNumber numberWithBool:defaultValue]];
  return [value boolValue];
}

- (NSString *) getString:(JIGPluginCall *)call field:(NSString *)field defaultValue:(NSString *)defaultValue {
  return [call getString:field defaultValue:defaultValue];
}

-(id)getConfigValue:(NSString *)key __deprecated {
  return [self.bridge.config getPluginConfigValue:self.pluginName :key];
}

-(PluginConfig*)getConfig {
    return [self.bridge.config getPluginConfig:self.pluginName];
}

-(void)load {}

- (void)addEventListener:(NSString *)eventName listener:(JIGPluginCall *)listener {
  NSMutableArray *listenersForEvent = [self.eventListeners objectForKey:eventName];
  if(listenersForEvent == nil || [listenersForEvent count] == 0) {
    listenersForEvent = [[NSMutableArray alloc] initWithObjects:listener, nil];
    [self.eventListeners setValue:listenersForEvent forKey:eventName];

    [self sendRetainedArgumentsForEvent:eventName];
  } else {
    [listenersForEvent addObject:listener];
  }
}

- (void)sendRetainedArgumentsForEvent:(NSString *)eventName {
  id retained = [self.retainedEventArguments objectForKey:eventName];
  if (retained == nil) {
    return;
  }

  [self notifyListeners:eventName data:retained];
  [self.retainedEventArguments removeObjectForKey:eventName];
}

- (void)removeEventListener:(NSString *)eventName listener:(JIGPluginCall *)listener {
  NSMutableArray *listenersForEvent = [self.eventListeners objectForKey:eventName];
  if(!listenersForEvent) { return; }
  NSUInteger listenerIndex = [listenersForEvent indexOfObject:listener];
  if(listenerIndex == NSNotFound) {
    return;
  }
  [listenersForEvent removeObjectAtIndex:listenerIndex];
}

- (void)notifyListeners:(NSString *)eventName data:(NSDictionary<NSString *,id> *)data {
  [self notifyListeners:eventName data:data retainUntilConsumed:NO];
}

- (void)notifyListeners:(NSString *)eventName data:(NSDictionary<NSString *,id> *)data retainUntilConsumed:(BOOL)retain {
  NSArray<JIGPluginCall *> *listenersForEvent = [self.eventListeners objectForKey:eventName];
  if(listenersForEvent == nil || [listenersForEvent count] == 0) {
    if (retain == YES) {
      [self.retainedEventArguments setObject:data forKey:eventName];
    }
    return;
  }

  for (int i=0; i < listenersForEvent.count; i++) {
    JIGPluginCall *call = listenersForEvent[i];
    if (call != nil) {
      JIGPluginCallResult *result = [[JIGPluginCallResult alloc] init:data];
      call.successHandler(result, call);
    }
  }
}

- (void)addListener:(JIGPluginCall *)call {
  NSString *eventName = [call.options objectForKey:@"eventName"];
  [call setKeepAlive:TRUE];
  [self addEventListener:eventName listener:call];
}

- (void)removeListener:(JIGPluginCall *)call {
  NSString *eventName = [call.options objectForKey:@"eventName"];
  NSString *callbackId = [call.options objectForKey:@"callbackId"];
  JIGPluginCall *storedCall = [self.bridge savedCallWithID:callbackId];
  [self removeEventListener:eventName listener:storedCall];
  [self.bridge releaseCallWithID:callbackId];
}

- (void)removeAllListeners:(JIGPluginCall *)call {
  [self.eventListeners removeAllObjects];
  [call resolve];
}

- (NSArray<JIGPluginCall *>*)getListeners:(NSString *)eventName {
  NSArray<JIGPluginCall *>* listeners = [self.eventListeners objectForKey:eventName];
  return listeners;
}

- (BOOL)hasListeners:(NSString *)eventName {
  NSArray<JIGPluginCall *>* listeners = [self.eventListeners objectForKey:eventName];

  if (listeners == nil) {
    return false;
  }
  return [listeners count] > 0;
}

- (void)checkPermissions:(JIGPluginCall *)call {
  [call resolve];
}

- (void)requestPermissions:(JIGPluginCall *)call {
  [call resolve];
}

/**
 * Configure popover sourceRect, sourceView and permittedArrowDirections to show it centered
 */
-(void)setCenteredPopover:(UIViewController *) vc {
  if (self.bridge.viewController != nil) {
    vc.popoverPresentationController.sourceRect = CGRectMake(self.bridge.viewController.view.center.x, self.bridge.viewController.view.center.y, 0, 0);
    vc.popoverPresentationController.sourceView = self.bridge.viewController.view;
    vc.popoverPresentationController.permittedArrowDirections = 0;
  }
}

-(void)setCenteredPopover:(UIViewController* _Nonnull) vc size:(CGSize) size {
    if (self.bridge.viewController != nil) {
      vc.popoverPresentationController.sourceRect = CGRectMake(self.bridge.viewController.view.center.x, self.bridge.viewController.view.center.y, 0, 0);
      vc.preferredContentSize = size;
      vc.popoverPresentationController.sourceView = self.bridge.viewController.view;
      vc.popoverPresentationController.permittedArrowDirections = 0;
    }
}

-(BOOL)supportsPopover {
    return YES;
}

- (NSNumber*)shouldOverrideLoad:(WKNavigationAction*)navigationAction {
    return nil;
}

@end

