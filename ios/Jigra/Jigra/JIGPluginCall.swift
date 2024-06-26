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

// MARK: Codable Support
public extension JIGPluginCall {
    /// Encodes the given value to a ``JSObject`` and resolves the call. If an error is thrown during encoding, ``reject(_:_:_:_:)`` is called.
    /// - Parameters:
    ///   - data: The value to encode
    ///   - encoder: The encoder to use. Defaults to `JSValueEncoder()`
    ///   - messageForRejectionFromError: A closure that takes the error thrown from ``JSValueEncoder/encodeJSObject(_:)``
    ///   and returns a string to be provided to ``reject(_:_:_:_:)``. Defaults to a function that returns "Failed encoding response".
    func resolve<T: Encodable>(
        with data: T,
        encoder: JSValueEncoder = JSValueEncoder(),
        messageForRejectionFromError: (Error) -> String = { _ in "Failed encoding response" }
    ) {
        do {
            let encoded = try encoder.encodeJSObject(data)
            resolve(encoded)
        } catch {
            let message = messageForRejectionFromError(error)
            reject(message, nil, error)
        }
    }

    /// Decodes the options to the given type.
    /// - Parameters:
    ///   - type: The type to decode to.
    ///   - decoder: The decoder to use. Defaults to `JSValueDecoder()`.
    /// - Throws: If the options cannot be decoded.
    /// - Returns: The decoded value.
    func decode<T: Decodable>(_ type: T.Type, decoder: JSValueDecoder = JSValueDecoder()) throws -> T {
        try decoder.decode(type, from: options as? JSObject ?? [:])
    }
}
