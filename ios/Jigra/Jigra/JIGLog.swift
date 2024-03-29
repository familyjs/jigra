public class JIGLog {
    public static var enableLogging: Bool = true

    public static func print(_ items: Any..., separator: String = " ", terminator: String = "\n") {
        if enableLogging {
            for (itemIndex, item) in items.enumerated() {
                Swift.print("\(item)".prefix(4068), terminator: itemIndex == items.count - 1 ? terminator : separator)
            }
        }
    }
}
