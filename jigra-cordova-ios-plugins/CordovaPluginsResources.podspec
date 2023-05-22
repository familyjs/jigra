Pod::Spec.new do |s|
  s.name = 'CordovaPluginsResources'
  s.version = '0.0.105'
  s.summary = 'Resources for Cordova plugins'
  s.social_media_url = 'https://github.com/familyjs'
  s.license = 'MIT'
  s.homepage = 'https://jigrajs.web.app/'
  s.authors = { 'Family Team' => 'nkduy.dev@gmail.com' }
  s.source = { :git => 'https://github.com/familyjs/jigra.git', :tag => s.version.to_s }
  s.resources = ['resources/*']
end
