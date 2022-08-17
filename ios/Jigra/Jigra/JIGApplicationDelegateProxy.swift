import Foundation

@objc(JIGApplicationDelegateProxy)
public class ApplicationDelegateProxy: NSObject, UIApplicationDelegate {
    public static let shared = ApplicationDelegateProxy()

    public private(set) var lastURL: URL?

    public func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        NotificationCenter.default.post(name: .jigraOpenURL, object: [
            "url": url,
            "options": options
        ])
        NotificationCenter.default.post(name: NSNotification.Name.CDVPluginHandleOpenURL, object: url)
        lastURL = url
        return true
    }

    public func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // TODO: Support other types, emit to rest of plugins
        if userActivity.activityType != NSUserActivityTypeBrowsingWeb || userActivity.webpageURL == nil {
            return false
        }

        let url = userActivity.webpageURL
        lastURL = url
        NotificationCenter.default.post(name: .jigraOpenUniversalLink, object: [
            "url": url
        ])
        return true
    }
}
