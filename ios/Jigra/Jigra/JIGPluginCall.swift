import Foundation

@available(*, deprecated, renamed: "PluginCallResultData")
public typealias PluginCallErrorData = [String: Any]
@available(*, deprecated, renamed: "PluginCallResultData")
public typealias PluginResultData = [String: Any]

/**
 * Swift niceties for JIGPluginCall
 */

extension JIGPluginCall: JSValueContainer {
    public var jsObjectRepresentation: JSObject {
        return options as? JSObject ?? [:]
    }
}

@objc extension JIGPluginCall: BridgedJSValueContainer {
    public var dictionaryRepresentation: NSDictionary {
        return options as NSDictionary
    }

    public static var jsDateFormatter: ISO8601DateFormatter = {
        return ISO8601DateFormatter()
    }()
}

@objc public extension JIGPluginCall {
    @available(*, deprecated, message: "Presence of a key should not be considered significant. Use typed accessors to check the value instead.")
    func hasOption(_ key: String) -> Bool {
        guard let value = options[key] else {
            return false
        }
        return !(value is NSNull)
    }

    @available(*, deprecated, renamed: "resolve()")
    func success() {
        successHandler(JIGPluginCallResult([:]), self)
    }

    @available(*, deprecated, renamed: "resolve")
    func success(_ data: PluginCallResultData = [:]) {
        successHandler(JIGPluginCallResult(data), self)
    }

    func resolve() {
        successHandler(JIGPluginCallResult(nil), self)
    }

    func resolve(_ data: PluginCallResultData = [:]) {
        successHandler(JIGPluginCallResult(data), self)
    }

    @available(*, deprecated, renamed: "reject")
    func error(_ message: String, _ error: Error? = nil, _ data: PluginCallResultData = [:]) {
        errorHandler(JIGPluginCallError(message: message, code: nil, error: error, data: data))
    }

    func reject(_ message: String, _ code: String? = nil, _ error: Error? = nil, _ data: PluginCallResultData? = nil) {
        errorHandler(JIGPluginCallError(message: message, code: code, error: error, data: data))
    }

    func unimplemented() {
        unimplemented("not implemented")
    }

    func unimplemented(_ message: String) {
        errorHandler(JIGPluginCallError(message: message, code: "UNIMPLEMENTED", error: nil, data: [:]))
    }

    func unavailable() {
        unavailable("not available")
    }

    func unavailable(_ message: String) {
        errorHandler(JIGPluginCallError(message: message, code: "UNAVAILABLE", error: nil, data: [:]))
    }
}
