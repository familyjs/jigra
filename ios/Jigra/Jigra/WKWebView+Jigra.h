@import UIKit;
@import WebKit;

#ifndef WKWebView_Jigra_h
#define WKWebView_Jigra_h

@interface WKWebView (JigraInspectablity)
- (void)setInspectableIfRequired: (BOOL)shouldInspect;
@end

#endif /* WKWebView_Jigra_h */
