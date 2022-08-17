import Foundation

public protocol JigraExtension {
    associatedtype JigraType
    var jigra: JigraType { get }
    static var jigra: JigraType.Type { get }
}

public extension JigraExtension {
    var jigra: JigraExtensionTypeWrapper<Self> {
        return JigraExtensionTypeWrapper(self)
    }

    static var jigra: JigraExtensionTypeWrapper<Self>.Type {
        return JigraExtensionTypeWrapper.self
    }
}

public struct JigraExtensionTypeWrapper<T> {
    var baseType: T
    init(_ baseType: T) {
        self.baseType = baseType
    }
}
