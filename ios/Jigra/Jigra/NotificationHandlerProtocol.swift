import Foundation

@objc(JIGNotificationHandlerProtocol) public protocol NotificationHandlerProtocol {
    func willPresent(notification: UNNotification) -> UNNotificationPresentationOptions
    func didReceive(response: UNNotificationResponse)
}
