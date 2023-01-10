Pod::Spec.new do |s|
  s.name = 'CordovaPluginsResources'
  s.version = '0.0.105'
  s.summary = 'Resources for Cordova plugins'
  s.social_media_url = 'https://github.com/navify'
  s.license = 'MIT'
  s.homepage = 'https://jigrajs.web.app/'
  s.authors = 'Navify Team'
  s.source = { :git => 'https://github.com/navify/jigra.git', :tag => s.version.to_s }
  s.resources = ['resources/*']
end
