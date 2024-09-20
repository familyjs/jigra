//
//  JIGPluginMethod.swift
//  Jigra
//

extension JIGPluginMethod {
    public enum ReturnType: String {
        case promise, callback, none
    }

    public convenience init(_ selector: Selector, returnType: ReturnType = .promise) {
        self.init(selector: selector, returnType: returnType.rawValue)
    }
}
