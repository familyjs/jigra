require 'json'
package = JSON.parse(File.read(File.join(__dir__, 'package.json')))
prefix = if ENV['NATIVE_PUBLISH'] == 'true'
           'ios/'
         else
           ''
         end

Pod::Spec.new do |s|
  s.name         = 'JigraCordova'
  s.module_name  = 'Cordova'
  s.version      = package['version']
  s.summary      = 'Jigra Cordova Compatibility Layer'
  s.homepage     = 'https://jigrajs.web.app'
  s.license      = 'MIT'
  s.authors      = { 'Family Team' => 'nkduy.dev@gmail.com' }
  s.source       = { git: 'https://github.com/familyjs/jigra', tag: s.version.to_s }
  s.platform     = :ios, 13.0
  s.source_files = "#{prefix}JigraCordova/JigraCordova/**/*.{h,m}"
  s.public_header_files = "#{prefix}JigraCordova/JigraCordova/Classes/Public/*.h",
                          "#{prefix}JigraCordova/JigraCordova/JigraCordova.h"
  s.module_map = "#{prefix}JigraCordova/JigraCordova/JigraCordova.modulemap"
  s.resources = ["#{prefix}JigraCordova/JigraCordova/PrivacyInfo.xcprivacy"]
  s.requires_arc = true
  s.framework    = 'WebKit'
end
