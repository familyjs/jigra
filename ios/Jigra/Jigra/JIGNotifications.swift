/**
 Notificaton types for NotificationCenter and NSNotificationCenter

 We want to include `jigra` in the name(s) to uniquely identify these even though it can make the names long
 and the deprecated notifications are only here for backwards compatibility.
 */
// swiftlint:disable identifier_name
extension Notification.Name {
    public static let jigraOpenURL = Notification.Name(rawValue: "JigraOpenURLNotification")
    public static let jigraOpenUniversalLink = Notification.Name(rawValue: "JigraOpenUniversalLinkNotification")
    public static let jigraContinueActivity = Notification.Name(rawValue: "JigraContinueActivityNotification")
    public static let jigraDidRegisterForRemoteNotifications =
        Notification.Name(rawValue: "JigraDidRegisterForRemoteNotificationsNotification")
    public static let jigraDidFailToRegisterForRemoteNotifications =
        Notification.Name(rawValue: "JigraDidFailToRegisterForRemoteNotificationsNotification")
    public static let jigraDecidePolicyForNavigationAction =
        Notification.Name(rawValue: "JigraDecidePolicyForNavigationActionNotification")
    public static let jigraStatusBarTapped = Notification.Name(rawValue: "JigraStatusBarTappedNotification")
}

@objc extension NSNotification {
    public static let jigraOpenURL = Notification.Name.jigraOpenURL
    public static let jigraOpenUniversalLink = Notification.Name.jigraOpenUniversalLink
    public static let jigraContinueActivity = Notification.Name.jigraContinueActivity
    public static let jigraDidRegisterForRemoteNotifications = Notification.Name.jigraDidRegisterForRemoteNotifications
    public static let jigraDidFailToRegisterForRemoteNotifications = Notification.Name.jigraDidFailToRegisterForRemoteNotifications
    public static let jigraDecidePolicyForNavigationAction = Notification.Name.jigraDecidePolicyForNavigationAction
    public static let jigraStatusBarTapped = Notification.Name.jigraStatusBarTapped
}

/**
 Deprecated, will be removed
 */
@objc public enum JIGNotifications: Int {
    @available(*, deprecated, message: "renamed to 'Notification.Name.jigraOpenURL'")
    case URLOpen
    @available(*, deprecated, message: "renamed to 'Notification.Name.jigraOpenUniversalLink'")
    case UniversalLinkOpen
    @available(*, deprecated, message: "Notification.Name.jigraContinueActivity'")
    case ContinueActivity
    @available(*, deprecated, message: "renamed to 'Notification.Name.jigraDidRegisterForRemoteNotifications'")
    case DidRegisterForRemoteNotificationsWithDeviceToken
    @available(*, deprecated, message: "renamed to 'Notification.Name.jigraDidFailToRegisterForRemoteNotifications'")
    case DidFailToRegisterForRemoteNotificationsWithError
    @available(*, deprecated, message: "renamed to 'Notification.Name.jigraDecidePolicyForNavigationAction'")
    case DecidePolicyForNavigationAction

    public func name() -> String {
        switch self {
        case .URLOpen:
            return Notification.Name.jigraOpenURL.rawValue
        case .UniversalLinkOpen:
            return Notification.Name.jigraOpenUniversalLink.rawValue
        case .ContinueActivity:
            return Notification.Name.jigraContinueActivity.rawValue
        case .DidRegisterForRemoteNotificationsWithDeviceToken:
            return Notification.Name.jigraDidRegisterForRemoteNotifications.rawValue
        case .DidFailToRegisterForRemoteNotificationsWithError:
            return Notification.Name.jigraDidFailToRegisterForRemoteNotifications.rawValue
        case .DecidePolicyForNavigationAction:
            return Notification.Name.jigraDecidePolicyForNavigationAction.rawValue
        }
    }
}
// swiftlint:enable identifier_name
