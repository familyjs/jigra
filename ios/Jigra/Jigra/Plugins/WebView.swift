import Foundation

@objc(JIGWebViewPlugin)
public class JIGWebViewPlugin: JIGPlugin {

    @objc func setServerAssetPath(_ call: JIGPluginCall) {
        if let path = call.getString("path"), let viewController = bridge?.viewController as? JIGBridgeViewController {
            viewController.setServerBasePath(path: Bundle.main.url(forResource: path, withExtension: nil)?.path ?? path)
            call.resolve()
        }
    }

    @objc func setServerBasePath(_ call: JIGPluginCall) {
        if let path = call.getString("path"), let viewController = bridge?.viewController as? JIGBridgeViewController {
            viewController.setServerBasePath(path: path)
            call.resolve()
        }
    }

    @objc func getServerBasePath(_ call: JIGPluginCall) {
        if let viewController = bridge?.viewController as? JIGBridgeViewController {
            let path = viewController.getServerBasePath()
            call.resolve([
                "path": path
            ])
        }
    }

    @objc func persistServerBasePath(_ call: JIGPluginCall) {
        if let viewController = bridge?.viewController as? JIGBridgeViewController {
            let path = viewController.getServerBasePath()
            let defaults = UserDefaults.standard
            defaults.set(path, forKey: "serverBasePath")
            call.resolve()
        }
    }
}
