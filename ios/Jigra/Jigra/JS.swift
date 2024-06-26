import Foundation

public class JSDate {
    @available(*, deprecated, message: "No longer needed. Dates will be mapped to strings during serialization.")
    static func toString(_ date: Date) -> String {
        let formatter = ISO8601DateFormatter()
        return formatter.string(from: date)
    }
}

@available(*, deprecated, renamed: "PluginCallResultData")
public typealias JSResultBody = [String: Any]

/**
 * A call originating from JavaScript land
 */
internal struct JSCall {
    let options: [String: Any]
    let pluginId: String
    let method: String
    let callbackId: String
}

internal protocol JSResultProtocol {
    var call: JSCall { get }
    var callbackID: String { get }
    var pluginID: String { get }
    var methodName: String { get }
    func jsonPayload() -> String
}

internal extension JSResultProtocol {
    var callbackID: String {
        return call.callbackId
    }

    var pluginID: String {
        return call.pluginId
    }

    var methodName: String {
        return call.method
    }
}

private enum SerializationResult: String {
    case undefined = "undefined"
    case empty = "{}"
}

/**
 * A result of processing a JSCall, contains
 * a reference to the original call and the new result.
 */

internal struct JSResult: JSResultProtocol {
    let call: JSCall
    let result: PluginCallResult?

    func jsonPayload() -> String {
        guard let result = result else {
            return SerializationResult.undefined.rawValue
        }
        do {
            if let payload = try result.jsonRepresentation() {
                return payload
            }
        } catch PluginCallResult.SerializationError.invalidObject {
            JIGLog.print("[Jigra Plugin Error] - \(call.pluginId) - \(call.method) - Unable to serialize plugin response as JSON." +
                            "Ensure that all data passed to success callback from module method is JSON serializable!")
        } catch {
            JIGLog.print("Unable to serialize plugin response as JSON: \(error.localizedDescription)")
        }
        return SerializationResult.empty.rawValue
    }
}

internal extension JSResult {
    init(call: JSCall, callResult: JIGPluginCallResult) {
        self.call = call
        self.result = callResult.resultData
    }
}

internal struct JSResultError: JSResultProtocol {
    let call: JSCall
    let errorMessage: String
    let errorDescription: String
    let errorCode: String?
    let result: PluginCallResult

    func jsonPayload() -> String {
        var errorDictionary: [String: Any] = [
            "message": self.errorMessage,
            "errorMessage": self.errorMessage
        ]
        errorDictionary["code"] = self.errorCode

        do {
            if let payload = try result.jsonRepresentation(includingFields: errorDictionary) {
                JIGLog.print("ERROR MESSAGE: ", payload.prefix(512))
                return payload
            }
        } catch PluginCallResult.SerializationError.invalidObject {
            JIGLog.print("[Jigra Plugin Error] - \(call.pluginId) - \(call.method) - Unable to serialize plugin response as JSON." +
                            "Ensure that all data passed to success callback from module method is JSON serializable!")
        } catch {
            JIGLog.print("Unable to serialize plugin response as JSON: \(error.localizedDescription)")
        }
        return SerializationResult.empty.rawValue
    }
}

internal extension JSResultError {
    init(call: JSCall, callError: JIGPluginCallError) {
        self.call = call
        errorMessage = callError.message
        errorDescription = callError.error?.localizedDescription ?? ""
        errorCode = callError.code
        result = callError.resultData ?? .dictionary([:])
    }
}
