package com.getjigra.plugin;

import android.app.Activity;
import android.content.SharedPreferences;
import com.getjigra.JSObject;
import com.getjigra.Plugin;
import com.getjigra.PluginCall;
import com.getjigra.PluginMethod;
import com.getjigra.annotation.JigraPlugin;

@JigraPlugin
public class WebView extends Plugin {

    public static final String WEBVIEW_PREFS_NAME = "JigWebViewSettings";
    public static final String JIG_SERVER_PATH = "serverBasePath";

    @PluginMethod
    public void setServerBasePath(PluginCall call) {
        String path = call.getString("path");
        bridge.setServerBasePath(path);
        call.resolve();
    }

    @PluginMethod
    public void getServerBasePath(PluginCall call) {
        String path = bridge.getServerBasePath();
        JSObject ret = new JSObject();
        ret.put("path", path);
        call.resolve(ret);
    }

    @PluginMethod
    public void persistServerBasePath(PluginCall call) {
        String path = bridge.getServerBasePath();
        SharedPreferences prefs = getContext().getSharedPreferences(WEBVIEW_PREFS_NAME, Activity.MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();
        editor.putString(JIG_SERVER_PATH, path);
        editor.apply();
        call.resolve();
    }
}
