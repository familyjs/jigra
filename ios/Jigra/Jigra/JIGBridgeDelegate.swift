import Foundation

internal protocol JIGBridgeDelegate: AnyObject {
    var bridgedWebView: WKWebView? { get }
    var bridgedViewController: UIViewController? { get }
}
