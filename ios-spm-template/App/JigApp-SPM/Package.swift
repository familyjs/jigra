// swift-tools-version: 5.9
import PackageDescription

// DO NOT MODIFY THIS FILE - managed by Jigra CLI commands
let package = Package(
    name: "JigApp-SPM",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "JigApp-SPM",
            targets: ["JigApp-SPM"])
    ],
    dependencies: [
        .package(url: "https://github.com/familyjs/jigra-swift-pm.git", branch: "main")
    ],
    targets: [
        .target(
            name: "JigApp-SPM",
            dependencies: [
                .product(name: "Jigra", package: "jigra-swift-pm"),
                .product(name: "Cordova", package: "jigra-swift-pm")
            ]
        )
    ]
)
