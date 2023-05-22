//
//  JIGBridgedPlugin+getMethod.swift
//  Jigra
//

extension JIGBridgedPlugin {
    func getMethod(named name: String) -> JIGPluginMethod? {
        pluginMethods.first { $0.name == name }
    }
}
