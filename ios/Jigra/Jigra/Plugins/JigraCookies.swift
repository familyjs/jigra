import Foundation

@objc(JIGCookiesPlugin)
public class JIGCookiesPlugin: JIGPlugin {
    var cookieManager: JigraCookieManager?

    @objc override public func load() {
        cookieManager = JigraCookieManager(bridge?.config)
    }

    @objc func getCookies(_ call: JIGPluginCall) {
        guard let url = cookieManager!.getServerUrl(call.getString("url")) else { return call.reject("Invalid URL / Server URL")}
        call.resolve(cookieManager!.getCookiesAsMap(url))
    }

    @objc func setCookie(_ call: JIGPluginCall) {
        guard let key = call.getString("key") else { return call.reject("Must provide key") }
        guard let value = call.getString("value") else { return call.reject("Must provide value") }

        guard let url = cookieManager!.getServerUrl(call.getString("url")) else { return call.reject("Invalid domain") }

        let expires = call.getString("expires", "")
        let path = call.getString("path", "")
        cookieManager!.setCookie(url, key, cookieManager!.encode(value), expires, path)
        call.resolve()
    }

    @objc func deleteCookie(_ call: JIGPluginCall) {
        guard let key = call.getString("key") else { return call.reject("Must provide key") }
        guard let url = cookieManager!.getServerUrl(call.getString("url")) else { return call.reject("Invalid URL / Server URL")}
        cookieManager!.deleteCookie(url, key)
        call.resolve()
    }

    @objc func clearCookies(_ call: JIGPluginCall) {
        let url = cookieManager!.getServerUrl(call.getString("url"))
        if url != nil {
            cookieManager!.clearCookies(url!)
            call.resolve()
        }
    }

    @objc func clearAllCookies(_ call: JIGPluginCall) {
        cookieManager!.clearAllCookies()
        call.resolve()
    }
}
