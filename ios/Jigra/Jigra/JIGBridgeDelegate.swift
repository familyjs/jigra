import Foundation

public protocol JIGBridgeDelegate: AnyObject {
    var bridgedWebView: WKWebView? { get }
    var bridgedViewController: UIViewController? { get }
}
