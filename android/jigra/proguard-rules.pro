# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Rules for Jigra v3 plugins and annotations
 -keep @com.getjigra.annotation.JigraPlugin public class * {
     @com.getjigra.annotation.PermissionCallback <methods>;
     @com.getjigra.annotation.ActivityCallback <methods>;
     @com.getjigra.annotation.Permission <methods>;
     @com.getjigra.PluginMethod public <methods>;
 }

# Rules for Jigra v2 plugins and annotations
# These are deprecated but can still be used with Jigra for now
-keep @com.getjigra.NativePlugin public class * {
  @com.getjigra.PluginMethod public <methods>;
}

# Rules for Cordova plugins
-keep public class * extends org.apache.cordova.* {
  public <methods>;
  public <fields>;
}