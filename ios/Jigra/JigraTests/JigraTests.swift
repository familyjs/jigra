import XCTest
@testable import Jigra

class MockBridgeViewController: JIGBridgeViewController {
}

class MockAssetHandler: WebViewAssetHandler {
}

class MockDelegationHandler: WebViewDelegationHandler {
}

class MockBridge: JigraBridge {
    override public func registerPlugins() {
        Swift.print("REGISTER PLUGINS")
    }
}

class JigraTests: XCTestCase {
    var bridge: MockBridge?

    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
        let descriptor = InstanceDescriptor.init()
        bridge = MockBridge(with: InstanceConfiguration(with: descriptor, isDebug: true), delegate: MockBridgeViewController(), cordovaConfiguration: descriptor.cordovaConfiguration, assetHandler: MockAssetHandler(router: _Router()), delegationHandler: MockDelegationHandler())
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
}
