require "json"
package = JSON.parse(File.read(File.join(__dir__, "package.json")))
Pod::Spec.new do |s|
  s.name         = "JigraCordova"
  s.module_name  = 'Cordova'
  s.version      = package['version']
  s.summary      = "Jigra Cordova Compatibility Layer"
  s.homepage     = "https://jigrajs.web.app"
  s.license      = 'MIT'
  s.authors      = 'Navify Team'
  s.source       = { :git => 'https://github.com/navify/jigra', :tag => s.version.to_s }
  s.platform     = :ios, 13.0
  s.source_files = 'JigraCordova/JigraCordova/**/*.{h,m}'
  s.public_header_files = 'JigraCordova/JigraCordova/Classes/Public/*.h', 'JigraCordova/JigraCordova/JigraCordova.h'
  s.module_map = 'JigraCordova/JigraCordova/JigraCordova.modulemap'
  s.requires_arc = true
  s.framework    = "WebKit"
end
