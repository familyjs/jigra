//
//  JIGPlugin+LoadInstance.swift
//  Jigra
//

extension JIGBridgedPlugin where Self: JIGPlugin {
    func load(on bridge: JIGBridgeProtocol) {
        self.bridge = bridge
        webView = bridge.webView
        shouldStringifyDatesInCalls = true
        retainedEventArguments = [:]
        eventListeners = [:]
        pluginId = identifier
        pluginName = jsName
        load()
    }
}
