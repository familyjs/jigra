import Foundation

@objc(JIGHttpPlugin)
public class JIGHttpPlugin: JIGPlugin {
    @objc func http(_ call: JIGPluginCall, _ httpMethod: String?) {
        do {
            if let clazz = NSClassFromString("SSLPinningHttpRequestHandlerClass") {
                // swiftlint:disable force_cast
                (clazz as! NSObject.Type).perform(#selector(self.request(_:)), with: [
                    "call": call,
                    "httpMethod": httpMethod as Any,
                    "config": self.bridge?.config as Any
                ])
                // swiftlint:enable force_cast
            } else {
                try HttpRequestHandler.request(call, httpMethod, self.bridge?.config)
            }
        } catch let error {
            call.reject(error.localizedDescription)
        }
    }

    @objc func request(_ call: JIGPluginCall) {
        http(call, nil)
    }

    @objc func get(_ call: JIGPluginCall) {
        http(call, "GET")
    }

    @objc func post(_ call: JIGPluginCall) {
        http(call, "POST")
    }

    @objc func put(_ call: JIGPluginCall) {
        http(call, "PUT")
    }

    @objc func patch(_ call: JIGPluginCall) {
        http(call, "PATCH")
    }

    @objc func delete(_ call: JIGPluginCall) {
        http(call, "DELETE")
    }
}
