import Foundation
import WebKit
import UIKit

open class JIGWebView: UIView {
    lazy var webView: WKWebView = createWebView(
        with: configuration,
        assetHandler: assetHandler,
        delegationHandler: delegationHandler
    )

    private lazy var jigraBridge = JigraBridge(
        with: configuration,
        delegate: self,
        cordovaConfiguration: configDescriptor.cordovaConfiguration,
        assetHandler: assetHandler,
        delegationHandler: delegationHandler,
        autoRegisterPlugins: autoRegisterPlugins
    )

    public final var bridge: JIGBridgeProtocol {
        return jigraBridge
    }

    private lazy var configDescriptor = instanceDescriptor()
    private lazy var configuration = InstanceConfiguration(with: configDescriptor, isDebug: JigraBridge.isDevEnvironment)

    private lazy var assetHandler: WebViewAssetHandler = {
        let handler = WebViewAssetHandler(router: router)
        handler.setAssetPath(configuration.appLocation.path)
        return handler
    }()

    private lazy var delegationHandler = WebViewDelegationHandler()
    private let autoRegisterPlugins: Bool

    open var router: Router { _Router() }

    public required init?(coder: NSCoder) {
        autoRegisterPlugins = true
        super.init(coder: coder)
        setup()
    }

    public init(autoRegisterPlugins: Bool = true) {
        self.autoRegisterPlugins = autoRegisterPlugins
        super.init(frame: .zero)
        setup()
    }

    private func setup() {
        JIGLog.enableLogging = configuration.loggingEnabled
        logWarnings(for: configDescriptor)

        if configDescriptor.instanceType == .fixed { updateBinaryVersion() }

        addSubview(webView)
        webView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            webView.topAnchor.constraint(equalTo: topAnchor),
            webView.bottomAnchor.constraint(equalTo: bottomAnchor),
            webView.leadingAnchor.constraint(equalTo: leadingAnchor),
            webView.trailingAnchor.constraint(equalTo: trailingAnchor)
        ])

        guard FileManager.default.fileExists(atPath: bridge.config.appStartFileURL.path) else { fatalLoadError() }
        jigraDidLoad()

        let url = bridge.config.appStartServerURL
        JIGLog.print("⚡️  Loading app at \(url.absoluteString)")
        jigraBridge.webViewDelegationHandler.willLoadWebview(webView)
        _ = webView.load(URLRequest(url: url))
    }

    public lazy final var isNewBinary: Bool = {
        if let curVersionCode = Bundle.main.infoDictionary?["CFBundleVersion"] as? String,
           let curVersionName = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String {
            if let lastVersionCode = UserDefaults.standard.string(forKey: "lastBinaryVersionCode"),
               let lastVersionName = UserDefaults.standard.string(forKey: "lastBinaryVersionName") {
                return (curVersionCode.isEqual(lastVersionCode) == false || curVersionName.isEqual(lastVersionName) == false)
            }
        }
        return false
    }()

    open func instanceDescriptor() -> InstanceDescriptor {
        let descriptor = InstanceDescriptor.init()
        if !isNewBinary && !descriptor.cordovaDeployDisabled {
            if let persistedPath = UserDefaults.standard.string(forKey: "serverBasePath"), !persistedPath.isEmpty {
                if let libPath = NSSearchPathForDirectoriesInDomains(.libraryDirectory, .userDomainMask, true).first {
                    descriptor.appLocation = URL(fileURLWithPath: libPath, isDirectory: true)
                        .appendingPathComponent("NoCloud")
                        .appendingPathComponent("family_built_snapshots")
                        .appendingPathComponent(URL(fileURLWithPath: persistedPath, isDirectory: true).lastPathComponent)
                }
            }
        }
        return descriptor
    }

    /**
     Allows any additional configuration to be performed. The `webView` and `bridge` properties will be set by this point.

     - Note: This is called before the webview has been added to the view hierarchy. Not all operations may be possible at
     this time.
     */
    open func jigraDidLoad() {
    }

    open func loadInitialContext(_ userContentController: WKUserContentController) {
        JIGLog.print("in loadInitialContext base")
    }

    public func setServerBasePath(path: String) {
        let url = URL(fileURLWithPath: path, isDirectory: true)
        guard FileManager.default.fileExists(atPath: url.path) else { return }

        jigraBridge.config = jigraBridge.config.updatingAppLocation(url)
        jigraBridge.webViewAssetHandler.setAssetPath(url.path)

        DispatchQueue.main.async { [weak self] in
            guard let self = self else { return }
            _ = self.webView.load(URLRequest(url: self.jigraBridge.config.serverURL))
        }
    }
}

extension JIGWebView {

    public func webViewConfiguration(for instanceConfiguration: InstanceConfiguration) -> WKWebViewConfiguration {
        let webViewConfiguration = WKWebViewConfiguration()
        webViewConfiguration.websiteDataStore.httpCookieStore.add(JigraWKCookieObserver())
        webViewConfiguration.allowsInlineMediaPlayback = true
        webViewConfiguration.suppressesIncrementalRendering = false
        webViewConfiguration.allowsAirPlayForMediaPlayback = true
        webViewConfiguration.mediaTypesRequiringUserActionForPlayback = []
        if let appendUserAgent = instanceConfiguration.appendedUserAgentString {
            if let appName = webViewConfiguration.applicationNameForUserAgent {
                webViewConfiguration.applicationNameForUserAgent = "\(appName)  \(appendUserAgent)"
            } else {
                webViewConfiguration.applicationNameForUserAgent = appendUserAgent
            }
        }
        return webViewConfiguration
    }

    private func createWebView(with configuration: InstanceConfiguration, assetHandler: WebViewAssetHandler, delegationHandler: WebViewDelegationHandler) -> WKWebView {
        // set the cookie policy
        HTTPCookieStorage.shared.cookieAcceptPolicy = HTTPCookie.AcceptPolicy.always
        // setup the web view configuration
        let webViewConfig = webViewConfiguration(for: configuration)
        webViewConfig.setURLSchemeHandler(assetHandler, forURLScheme: configuration.localURL.scheme ?? InstanceDescriptorDefaults.scheme)
        webViewConfig.userContentController = delegationHandler.contentController
        // create the web view and set its properties
        loadInitialContext(webViewConfig.userContentController)
        let webView = WKWebView(frame: .zero, configuration: webViewConfig)
        webView.scrollView.bounces = false
        webView.scrollView.contentInsetAdjustmentBehavior = configuration.contentInsetAdjustmentBehavior
        webView.allowsLinkPreview = configuration.allowLinkPreviews
        webView.scrollView.isScrollEnabled = configuration.scrollingEnabled

        if let overrideUserAgent = configuration.overridenUserAgentString {
            webView.customUserAgent = overrideUserAgent
        }

        if let backgroundColor = configuration.backgroundColor {
            self.backgroundColor = backgroundColor
            webView.backgroundColor = backgroundColor
            webView.scrollView.backgroundColor = backgroundColor
        } else {
            // Use the system background colors if background is not set by user
            self.backgroundColor = UIColor.systemBackground
            webView.backgroundColor = UIColor.systemBackground
            webView.scrollView.backgroundColor = UIColor.systemBackground
        }

        // set our delegates
        webView.uiDelegate = delegationHandler
        webView.navigationDelegate = delegationHandler
        return webView
    }

    private func logWarnings(for descriptor: InstanceDescriptor) {
        if descriptor.warnings.contains(.missingAppDir) {
            JIGLog.print("⚡️  ERROR: Unable to find application directory at: \"\(descriptor.appLocation.absoluteString)\"!")
        }
        if descriptor.instanceType == .fixed {
            if descriptor.warnings.contains(.missingFile) {
                JIGLog.print("Unable to find jigra.config.json, make sure it exists and run npx jig copy.")
            }
            if descriptor.warnings.contains(.invalidFile) {
                JIGLog.print("Unable to parse jigra.config.json. Make sure it's valid JSON.")
            }
            if descriptor.warnings.contains(.missingCordovaFile) {
                JIGLog.print("Unable to find config.xml, make sure it exists and run npx jig copy.")
            }
            if descriptor.warnings.contains(.invalidCordovaFile) {
                JIGLog.print("Unable to parse config.xml. Make sure it's valid XML.")
            }
        }
    }

    private func updateBinaryVersion() {
        guard isNewBinary else {
            return
        }
        guard let versionCode = Bundle.main.infoDictionary?["CFBundleVersion"] as? String,
              let versionName = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String else {
            return
        }
        let prefs = UserDefaults.standard
        prefs.set(versionCode, forKey: "lastBinaryVersionCode")
        prefs.set(versionName, forKey: "lastBinaryVersionName")
        prefs.set("", forKey: "serverBasePath")
        prefs.synchronize()
    }

    private func fatalLoadError() -> Never {
        printLoadError()
        exit(1)
    }

    private func printLoadError() {
        let fullStartPath = jigraBridge.config.appStartFileURL.path

        JIGLog.print("⚡️  ERROR: Unable to load \(fullStartPath)")
        JIGLog.print("⚡️  This file is the root of your web app and must exist before")
        JIGLog.print("⚡️  Jigra can run. Ensure you've run jigra copy at least")
        JIGLog.print("⚡️  or, if embedding, that this directory exists as a resource directory.")
    }
}

extension JIGWebView: JIGBridgeDelegate {
    internal var bridgedWebView: WKWebView? {
        return webView
    }

    internal var bridgedViewController: UIViewController? {
        // search for the parent view controller
        var object = self.next
        while !(object is UIViewController) && object != nil {
            object = object?.next
        }
        return object as? UIViewController
    }
}
