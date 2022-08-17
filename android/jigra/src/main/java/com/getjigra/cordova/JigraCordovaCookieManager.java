package com.getjigra.cordova;

import android.webkit.CookieManager;
import android.webkit.WebView;
import org.apache.cordova.ICordovaCookieManager;

class JigraCordovaCookieManager implements ICordovaCookieManager {

    protected final WebView webView;
    private final CookieManager cookieManager;

    public JigraCordovaCookieManager(WebView webview) {
        webView = webview;
        cookieManager = CookieManager.getInstance();
        CookieManager.setAcceptFileSchemeCookies(true);
        cookieManager.setAcceptThirdPartyCookies(webView, true);
    }

    @Override
    public void setCookiesEnabled(boolean accept) {
        cookieManager.setAcceptCookie(accept);
    }

    @Override
    public void setCookie(final String url, final String value) {
        cookieManager.setCookie(url, value);
    }

    @Override
    public String getCookie(final String url) {
        return cookieManager.getCookie(url);
    }

    @Override
    public void clearCookies() {
        cookieManager.removeAllCookie();
    }

    @Override
    public void flush() {
        cookieManager.flush();
    }
}
