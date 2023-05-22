require 'json'
package = JSON.parse(File.read(File.join(__dir__, 'package.json')))
prefix = if ENV['NATIVE_PUBLISH'] == 'true'
           'ios/'
         else
           ''
         end

Pod::Spec.new do |s|
  s.name = 'Jigra'
  s.version = package['version']
  s.summary = 'Jigra for iOS'
  s.social_media_url = 'https://github.com/familyjs'
  s.license = 'MIT'
  s.homepage = 'https://jigrajs.web.app/'
  s.ios.deployment_target = '13.0'
  s.authors = { 'Family Team' => 'nkduy.dev@gmail.com' }
  s.source = { git: 'https://github.com/familyjs/jigra.git', tag: package['version'] }
  s.source_files = "#{prefix}Jigra/Jigra/*.{swift,h,m}", "#{prefix}Jigra/Jigra/Plugins/*.{swift,h,m}",
                   "#{prefix}Jigra/Jigra/Plugins/**/*.{swift,h,m}"
  s.module_map = "#{prefix}Jigra/Jigra/Jigra.modulemap"
  s.resources = ["#{prefix}Jigra/Jigra/assets/native-bridge.js"]
  s.dependency 'JigraCordova'
  s.swift_version = '5.1'
end
