require "json"
package = JSON.parse(File.read(File.join(__dir__, "package.json")))
Pod::Spec.new do |s|
  s.name = 'Jigra'
  s.version = package['version']
  s.summary = 'Jigra for iOS'
  s.social_media_url = 'https://github.com/navify'
  s.license = 'MIT'
  s.homepage = 'https://jigrajs.web.app/'
  s.ios.deployment_target  = '12.0'
  s.authors = { 'Navify Team' }
  s.source = { :git => 'https://github.com/navify/jigra.git', :branch => "portals-dev" }
  s.source_files = 'Jigra/Jigra/*.{swift,h,m}', 'Jigra/Jigra/Plugins/*.{swift,h,m}', 'Jigra/Jigra/Plugins/**/*.{swift,h,m}'
  s.module_map = 'Jigra/Jigra/Jigra.modulemap'
  s.resources = ['Jigra/Jigra/assets/native-bridge.js']
  s.dependency 'JigraCordova'
  s.swift_version = '5.1'
end
