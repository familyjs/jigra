
/*! Jigra: https://jigrajs.web.app/ - MIT License */
/* Generated File. Do not edit. */

var nativeBridge = (function (exports) {
    'use strict';

    var ExceptionCode;
    (function (ExceptionCode) {
        /**
         * API is not implemented.
         *
         * This usually means the API can't be used because it is not implemented for
         * the current platform.
         */
        ExceptionCode["Unimplemented"] = "UNIMPLEMENTED";
        /**
         * API is not available.
         *
         * This means the API can't be used right now because:
         *   - it is currently missing a prerequisite, such as network connectivity
         *   - it requires a particular platform or browser version
         */
        ExceptionCode["Unavailable"] = "UNAVAILABLE";
    })(ExceptionCode || (ExceptionCode = {}));
    class JigraException extends Error {
        constructor(message, code, data) {
            super(message);
            this.message = message;
            this.code = code;
            this.data = data;
        }
    }

    // For removing exports for iOS/Android, keep let for reassignment
    // eslint-disable-next-line
    let dummy = {};
    const readFileAsBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const data = reader.result;
            resolve(btoa(data));
        };
        reader.onerror = reject;
        reader.readAsBinaryString(file);
    });
    const convertFormData = async (formData) => {
        const newFormData = [];
        for (const pair of formData.entries()) {
            const [key, value] = pair;
            if (value instanceof File) {
                const base64File = await readFileAsBase64(value);
                newFormData.push({
                    key,
                    value: base64File,
                    type: 'base64File',
                    contentType: value.type,
                    fileName: value.name,
                });
            }
            else {
                newFormData.push({ key, value, type: 'string' });
            }
        }
        return newFormData;
    };
    const convertBody = async (body, contentType) => {
        if (body instanceof ReadableStream) {
            const reader = body.getReader();
            const chunks = [];
            while (true) {
                const { done, value } = await reader.read();
                if (done)
                    break;
                chunks.push(value);
            }
            const concatenated = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
            let position = 0;
            for (const chunk of chunks) {
                concatenated.set(chunk, position);
                position += chunk.length;
            }
            let data = new TextDecoder().decode(concatenated);
            let type;
            if (contentType === 'application/json') {
                try {
                    data = JSON.parse(data);
                }
                catch (ignored) {
                    // ignore
                }
                type = 'json';
            }
            else if (contentType === 'multipart/form-data') {
                type = 'formData';
            }
            else if (contentType === null || contentType === void 0 ? void 0 : contentType.startsWith('image')) {
                type = 'image';
            }
            else if (contentType === 'application/octet-stream') {
                type = 'binary';
            }
            else {
                type = 'text';
            }
            return {
                data,
                type,
                headers: { 'Content-Type': contentType || 'application/octet-stream' },
            };
        }
        else if (body instanceof FormData) {
            const formData = await convertFormData(body);
            const boundary = `${Date.now()}`;
            return {
                data: formData,
                type: 'formData',
                headers: {
                    'Content-Type': `multipart/form-data; boundary=--${boundary}`,
                },
            };
        }
        else if (body instanceof File) {
            const fileData = await readFileAsBase64(body);
            return {
                data: fileData,
                type: 'file',
                headers: { 'Content-Type': body.type },
            };
        }
        return { data: body, type: 'json' };
    };
    const JIGRA_HTTP_INTERCEPTOR = '/_jigra_http_interceptor_';
    const JIGRA_HTTPS_INTERCEPTOR = '/_jigra_https_interceptor_';
    // TODO: export as Jig function
    const isRelativeOrProxyUrl = (url) => !url ||
        !(url.startsWith('http:') || url.startsWith('https:')) ||
        url.indexOf(JIGRA_HTTP_INTERCEPTOR) > -1 ||
        url.indexOf(JIGRA_HTTPS_INTERCEPTOR) > -1;
    // TODO: export as Jig function
    const createProxyUrl = (url, win) => {
        var _a, _b;
        if (isRelativeOrProxyUrl(url))
            return url;
        const proxyUrl = new URL(url);
        const bridgeUrl = new URL((_b = (_a = win.Jigra) === null || _a === void 0 ? void 0 : _a.getServerUrl()) !== null && _b !== void 0 ? _b : '');
        const isHttps = proxyUrl.protocol === 'https:';
        bridgeUrl.search = proxyUrl.search;
        bridgeUrl.hash = proxyUrl.hash;
        bridgeUrl.pathname = `${isHttps ? JIGRA_HTTPS_INTERCEPTOR : JIGRA_HTTP_INTERCEPTOR}/${encodeURIComponent(proxyUrl.host)}${proxyUrl.pathname}`;
        return bridgeUrl.toString();
    };
    const initBridge = (w) => {
        const getPlatformId = (win) => {
            var _a, _b;
            if (win === null || win === void 0 ? void 0 : win.androidBridge) {
                return 'android';
            }
            else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
                return 'ios';
            }
            else {
                return 'web';
            }
        };
        const convertFileSrcServerUrl = (webviewServerUrl, filePath) => {
            if (typeof filePath === 'string') {
                if (filePath.startsWith('/')) {
                    return webviewServerUrl + '/_jigra_file_' + filePath;
                }
                else if (filePath.startsWith('file://')) {
                    return webviewServerUrl + filePath.replace('file://', '/_jigra_file_');
                }
                else if (filePath.startsWith('content://')) {
                    return webviewServerUrl + filePath.replace('content:/', '/_jigra_content_');
                }
            }
            return filePath;
        };
        const initEvents = (win, jig) => {
            jig.addListener = (pluginName, eventName, callback) => {
                const callbackId = jig.nativeCallback(pluginName, 'addListener', {
                    eventName: eventName,
                }, callback);
                return {
                    remove: async () => {
                        var _a;
                        (_a = win === null || win === void 0 ? void 0 : win.console) === null || _a === void 0 ? void 0 : _a.debug('Removing listener', pluginName, eventName);
                        jig.removeListener(pluginName, callbackId, eventName, callback);
                    },
                };
            };
            jig.removeListener = (pluginName, callbackId, eventName, callback) => {
                jig.nativeCallback(pluginName, 'removeListener', {
                    callbackId: callbackId,
                    eventName: eventName,
                }, callback);
            };
            jig.createEvent = (eventName, eventData) => {
                const doc = win.document;
                if (doc) {
                    const ev = doc.createEvent('Events');
                    ev.initEvent(eventName, false, false);
                    if (eventData && typeof eventData === 'object') {
                        for (const i in eventData) {
                            // eslint-disable-next-line no-prototype-builtins
                            if (eventData.hasOwnProperty(i)) {
                                ev[i] = eventData[i];
                            }
                        }
                    }
                    return ev;
                }
                return null;
            };
            jig.triggerEvent = (eventName, target, eventData) => {
                const doc = win.document;
                const cordova = win.cordova;
                eventData = eventData || {};
                const ev = jig.createEvent(eventName, eventData);
                if (ev) {
                    if (target === 'document') {
                        if (cordova === null || cordova === void 0 ? void 0 : cordova.fireDocumentEvent) {
                            cordova.fireDocumentEvent(eventName, eventData);
                            return true;
                        }
                        else if (doc === null || doc === void 0 ? void 0 : doc.dispatchEvent) {
                            return doc.dispatchEvent(ev);
                        }
                    }
                    else if (target === 'window' && win.dispatchEvent) {
                        return win.dispatchEvent(ev);
                    }
                    else if (doc === null || doc === void 0 ? void 0 : doc.querySelector) {
                        const targetEl = doc.querySelector(target);
                        if (targetEl) {
                            return targetEl.dispatchEvent(ev);
                        }
                    }
                }
                return false;
            };
            win.Jigra = jig;
        };
        const initLegacyHandlers = (win, jig) => {
            // define cordova if it's not there already
            win.cordova = win.cordova || {};
            const doc = win.document;
            const nav = win.navigator;
            if (nav) {
                nav.app = nav.app || {};
                nav.app.exitApp = () => {
                    var _a;
                    if (!((_a = jig.Plugins) === null || _a === void 0 ? void 0 : _a.App)) {
                        win.console.warn('App plugin not installed');
                    }
                    else {
                        jig.nativeCallback('App', 'exitApp', {});
                    }
                };
            }
            if (doc) {
                const docAddEventListener = doc.addEventListener;
                doc.addEventListener = (...args) => {
                    var _a;
                    const eventName = args[0];
                    const handler = args[1];
                    if (eventName === 'deviceready' && handler) {
                        Promise.resolve().then(handler);
                    }
                    else if (eventName === 'backbutton' && jig.Plugins.App) {
                        // Add a dummy listener so Jigra doesn't do the default
                        // back button action
                        if (!((_a = jig.Plugins) === null || _a === void 0 ? void 0 : _a.App)) {
                            win.console.warn('App plugin not installed');
                        }
                        else {
                            jig.Plugins.App.addListener('backButton', () => {
                                // ignore
                            });
                        }
                    }
                    return docAddEventListener.apply(doc, args);
                };
            }
            // deprecated in v3, remove from v4
            jig.platform = jig.getPlatform();
            jig.isNative = jig.isNativePlatform();
            win.Jigra = jig;
        };
        const initVendor = (win, jig) => {
            const Family = (win.Family = win.Family || {});
            const FamilyWebView = (Family.WebView = Family.WebView || {});
            const Plugins = jig.Plugins;
            FamilyWebView.getServerBasePath = (callback) => {
                var _a;
                (_a = Plugins === null || Plugins === void 0 ? void 0 : Plugins.WebView) === null || _a === void 0 ? void 0 : _a.getServerBasePath().then((result) => {
                    callback(result.path);
                });
            };
            FamilyWebView.setServerAssetPath = (path) => {
                var _a;
                (_a = Plugins === null || Plugins === void 0 ? void 0 : Plugins.WebView) === null || _a === void 0 ? void 0 : _a.setServerAssetPath({ path });
            };
            FamilyWebView.setServerBasePath = (path) => {
                var _a;
                (_a = Plugins === null || Plugins === void 0 ? void 0 : Plugins.WebView) === null || _a === void 0 ? void 0 : _a.setServerBasePath({ path });
            };
            FamilyWebView.persistServerBasePath = () => {
                var _a;
                (_a = Plugins === null || Plugins === void 0 ? void 0 : Plugins.WebView) === null || _a === void 0 ? void 0 : _a.persistServerBasePath();
            };
            FamilyWebView.convertFileSrc = (url) => jig.convertFileSrc(url);
            win.Jigra = jig;
            win.Family.WebView = FamilyWebView;
        };
        const initLogger = (win, jig) => {
            const BRIDGED_CONSOLE_METHODS = ['debug', 'error', 'info', 'log', 'trace', 'warn'];
            const createLogFromNative = (c) => (result) => {
                if (isFullConsole(c)) {
                    const success = result.success === true;
                    const tagStyles = success
                        ? 'font-style: italic; font-weight: lighter; color: gray'
                        : 'font-style: italic; font-weight: lighter; color: red';
                    c.groupCollapsed('%cresult %c' + result.pluginId + '.' + result.methodName + ' (#' + result.callbackId + ')', tagStyles, 'font-style: italic; font-weight: bold; color: #444');
                    if (result.success === false) {
                        c.error(result.error);
                    }
                    else {
                        c.dir(result.data);
                    }
                    c.groupEnd();
                }
                else {
                    if (result.success === false) {
                        c.error('LOG FROM NATIVE', result.error);
                    }
                    else {
                        c.log('LOG FROM NATIVE', result.data);
                    }
                }
            };
            const createLogToNative = (c) => (call) => {
                if (isFullConsole(c)) {
                    c.groupCollapsed('%cnative %c' + call.pluginId + '.' + call.methodName + ' (#' + call.callbackId + ')', 'font-weight: lighter; color: gray', 'font-weight: bold; color: #000');
                    c.dir(call);
                    c.groupEnd();
                }
                else {
                    c.log('LOG TO NATIVE: ', call);
                }
            };
            const isFullConsole = (c) => {
                if (!c) {
                    return false;
                }
                return typeof c.groupCollapsed === 'function' || typeof c.groupEnd === 'function' || typeof c.dir === 'function';
            };
            const serializeConsoleMessage = (msg) => {
                if (typeof msg === 'object') {
                    try {
                        msg = JSON.stringify(msg);
                    }
                    catch (e) {
                        // ignore
                    }
                }
                return String(msg);
            };
            const platform = getPlatformId(win);
            if (platform == 'android' || platform == 'ios') {
                // patch document.cookie on Android/iOS
                win.JigraCookiesDescriptor =
                    Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
                        Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');
                let doPatchCookies = false;
                // check if jigra cookies is disabled before patching
                if (platform === 'ios') {
                    // Use prompt to synchronously get jigra cookies config.
                    // https://stackoverflow.com/questions/29249132/wkwebview-complex-communication-between-javascript-native-code/49474323#49474323
                    const payload = {
                        type: 'JigraCookies.isEnabled',
                    };
                    const isCookiesEnabled = prompt(JSON.stringify(payload));
                    if (isCookiesEnabled === 'true') {
                        doPatchCookies = true;
                    }
                }
                else if (typeof win.JigraCookiesAndroidInterface !== 'undefined') {
                    const isCookiesEnabled = win.JigraCookiesAndroidInterface.isEnabled();
                    if (isCookiesEnabled === true) {
                        doPatchCookies = true;
                    }
                }
                if (doPatchCookies) {
                    Object.defineProperty(document, 'cookie', {
                        get: function () {
                            var _a, _b, _c;
                            if (platform === 'ios') {
                                // Use prompt to synchronously get cookies.
                                // https://stackoverflow.com/questions/29249132/wkwebview-complex-communication-between-javascript-native-code/49474323#49474323
                                const payload = {
                                    type: 'JigraCookies.get',
                                };
                                const res = prompt(JSON.stringify(payload));
                                return res;
                            }
                            else if (typeof win.JigraCookiesAndroidInterface !== 'undefined') {
                                // return original document.cookie since Android does not support filtering of `httpOnly` cookies
                                return (_c = (_b = (_a = win.JigraCookiesDescriptor) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.call(document)) !== null && _c !== void 0 ? _c : '';
                            }
                        },
                        set: function (val) {
                            const cookiePairs = val.split(';');
                            const domainSection = val.toLowerCase().split('domain=')[1];
                            const domain = cookiePairs.length > 1 && domainSection != null && domainSection.length > 0
                                ? domainSection.split(';')[0].trim()
                                : '';
                            if (platform === 'ios') {
                                // Use prompt to synchronously set cookies.
                                // https://stackoverflow.com/questions/29249132/wkwebview-complex-communication-between-javascript-native-code/49474323#49474323
                                const payload = {
                                    type: 'JigraCookies.set',
                                    action: val,
                                    domain,
                                };
                                prompt(JSON.stringify(payload));
                            }
                            else if (typeof win.JigraCookiesAndroidInterface !== 'undefined') {
                                win.JigraCookiesAndroidInterface.setCookie(domain, val);
                            }
                        },
                    });
                }
                // patch fetch / XHR on Android/iOS
                // store original fetch & XHR functions
                win.JigraWebFetch = window.fetch;
                win.JigraWebXMLHttpRequest = {
                    abort: window.XMLHttpRequest.prototype.abort,
                    constructor: window.XMLHttpRequest.prototype.constructor,
                    fullObject: window.XMLHttpRequest,
                    getAllResponseHeaders: window.XMLHttpRequest.prototype.getAllResponseHeaders,
                    getResponseHeader: window.XMLHttpRequest.prototype.getResponseHeader,
                    open: window.XMLHttpRequest.prototype.open,
                    prototype: window.XMLHttpRequest.prototype,
                    send: window.XMLHttpRequest.prototype.send,
                    setRequestHeader: window.XMLHttpRequest.prototype.setRequestHeader,
                };
                let doPatchHttp = false;
                // check if jigra http is disabled before patching
                if (platform === 'ios') {
                    // Use prompt to synchronously get jigra http config.
                    // https://stackoverflow.com/questions/29249132/wkwebview-complex-communication-between-javascript-native-code/49474323#49474323
                    const payload = {
                        type: 'JigraHttp',
                    };
                    const isHttpEnabled = prompt(JSON.stringify(payload));
                    if (isHttpEnabled === 'true') {
                        doPatchHttp = true;
                    }
                }
                else if (typeof win.JigraHttpAndroidInterface !== 'undefined') {
                    const isHttpEnabled = win.JigraHttpAndroidInterface.isEnabled();
                    if (isHttpEnabled === true) {
                        doPatchHttp = true;
                    }
                }
                if (doPatchHttp) {
                    // fetch patch
                    window.fetch = async (resource, options) => {
                        const request = new Request(resource, options);
                        if (request.url.startsWith(`${jig.getServerUrl()}/`)) {
                            return win.JigraWebFetch(resource, options);
                        }
                        if (!(options === null || options === void 0 ? void 0 : options.method) ||
                            options.method.toLocaleUpperCase() === 'GET' ||
                            options.method.toLocaleUpperCase() === 'HEAD' ||
                            options.method.toLocaleUpperCase() === 'OPTIONS' ||
                            options.method.toLocaleUpperCase() === 'TRACE') {
                            if (typeof resource === 'string') {
                                return await win.JigraWebFetch(createProxyUrl(resource, win), options);
                            }
                            else if (resource instanceof Request) {
                                const modifiedRequest = new Request(createProxyUrl(resource.url, win), resource);
                                return await win.JigraWebFetch(modifiedRequest, options);
                            }
                        }
                        const tag = `JigraHttp fetch ${Date.now()} ${resource}`;
                        console.time(tag);
                        try {
                            // intercept request & pass to the bridge
                            const { body, method } = request;
                            const optionHeaders = Object.fromEntries(request.headers.entries());
                            const { data: requestData, type, headers, } = await convertBody((options === null || options === void 0 ? void 0 : options.body) || body || undefined, optionHeaders['Content-Type'] || optionHeaders['content-type']);
                            const nativeResponse = await jig.nativePromise('JigraHttp', 'request', {
                                url: request.url,
                                method: method,
                                data: requestData,
                                dataType: type,
                                headers: Object.assign(Object.assign({}, headers), optionHeaders),
                            });
                            const contentType = nativeResponse.headers['Content-Type'] || nativeResponse.headers['content-type'];
                            let data = (contentType === null || contentType === void 0 ? void 0 : contentType.startsWith('application/json'))
                                ? JSON.stringify(nativeResponse.data)
                                : nativeResponse.data;
                            // use null data for 204 No Content HTTP response
                            if (nativeResponse.status === 204) {
                                data = null;
                            }
                            // intercept & parse response before returning
                            const response = new Response(data, {
                                headers: nativeResponse.headers,
                                status: nativeResponse.status,
                            });
                            /*
                             * copy url to response, `cordova-plugin-family` uses this url from the response
                             * we need `Object.defineProperty` because url is an inherited getter on the Response
                             * see: https://stackoverflow.com/a/57382543
                             * */
                            Object.defineProperty(response, 'url', {
                                value: nativeResponse.url,
                            });
                            console.timeEnd(tag);
                            return response;
                        }
                        catch (error) {
                            console.timeEnd(tag);
                            return Promise.reject(error);
                        }
                    };
                    window.XMLHttpRequest = function () {
                        const xhr = new win.JigraWebXMLHttpRequest.constructor();
                        Object.defineProperties(xhr, {
                            _headers: {
                                value: {},
                                writable: true,
                            },
                            _method: {
                                value: xhr.method,
                                writable: true,
                            },
                            readyState: {
                                get: function () {
                                    var _a;
                                    return (_a = this._readyState) !== null && _a !== void 0 ? _a : 0;
                                },
                                set: function (val) {
                                    this._readyState = val;
                                    setTimeout(() => {
                                        this.dispatchEvent(new Event('readystatechange'));
                                    });
                                },
                            },
                        });
                        xhr.readyState = 0;
                        const prototype = win.JigraWebXMLHttpRequest.prototype;
                        const isProgressEventAvailable = () => typeof ProgressEvent !== 'undefined' && ProgressEvent.prototype instanceof Event;
                        // XHR patch abort
                        prototype.abort = function () {
                            if (isRelativeOrProxyUrl(this._url)) {
                                return win.JigraWebXMLHttpRequest.abort.call(this);
                            }
                            this.readyState = 0;
                            setTimeout(() => {
                                this.dispatchEvent(new Event('abort'));
                                this.dispatchEvent(new Event('loadend'));
                            });
                        };
                        // XHR patch open
                        prototype.open = function (method, url) {
                            this._method = method.toLocaleUpperCase();
                            this._url = url;
                            if (!this._method ||
                                this._method === 'GET' ||
                                this._method === 'HEAD' ||
                                this._method === 'OPTIONS' ||
                                this._method === 'TRACE') {
                                if (isRelativeOrProxyUrl(url)) {
                                    return win.JigraWebXMLHttpRequest.open.call(this, method, url);
                                }
                                this._url = createProxyUrl(this._url, win);
                                return win.JigraWebXMLHttpRequest.open.call(this, method, this._url);
                            }
                            setTimeout(() => {
                                this.dispatchEvent(new Event('loadstart'));
                            });
                            this.readyState = 1;
                        };
                        // XHR patch set request header
                        prototype.setRequestHeader = function (header, value) {
                            if (isRelativeOrProxyUrl(this._url)) {
                                return win.JigraWebXMLHttpRequest.setRequestHeader.call(this, header, value);
                            }
                            this._headers[header] = value;
                        };
                        // XHR patch send
                        prototype.send = function (body) {
                            if (isRelativeOrProxyUrl(this._url)) {
                                return win.JigraWebXMLHttpRequest.send.call(this, body);
                            }
                            const tag = `JigraHttp XMLHttpRequest ${Date.now()} ${this._url}`;
                            console.time(tag);
                            try {
                                this.readyState = 2;
                                Object.defineProperties(this, {
                                    response: {
                                        value: '',
                                        writable: true,
                                    },
                                    responseText: {
                                        value: '',
                                        writable: true,
                                    },
                                    responseURL: {
                                        value: '',
                                        writable: true,
                                    },
                                    status: {
                                        value: 0,
                                        writable: true,
                                    },
                                });
                                convertBody(body).then(({ data, type, headers }) => {
                                    const otherHeaders = this._headers != null && Object.keys(this._headers).length > 0 ? this._headers : undefined;
                                    // intercept request & pass to the bridge
                                    jig
                                        .nativePromise('JigraHttp', 'request', {
                                        url: this._url,
                                        method: this._method,
                                        data: data !== null ? data : undefined,
                                        headers: Object.assign(Object.assign({}, headers), otherHeaders),
                                        dataType: type,
                                    })
                                        .then((nativeResponse) => {
                                        var _a;
                                        // intercept & parse response before returning
                                        if (this.readyState == 2) {
                                            //TODO: Add progress event emission on native side
                                            if (isProgressEventAvailable()) {
                                                this.dispatchEvent(new ProgressEvent('progress', {
                                                    lengthComputable: true,
                                                    loaded: nativeResponse.data.length,
                                                    total: nativeResponse.data.length,
                                                }));
                                            }
                                            this._headers = nativeResponse.headers;
                                            this.status = nativeResponse.status;
                                            const responseString = typeof nativeResponse.data !== 'string'
                                                ? JSON.stringify(nativeResponse.data)
                                                : nativeResponse.data;
                                            if (this.responseType === '' || this.responseType === 'text') {
                                                this.response = responseString;
                                            }
                                            else if (this.responseType === 'blob') {
                                                this.response = new Blob([responseString], {
                                                    type: 'application/json',
                                                });
                                            }
                                            else if (this.responseType === 'arraybuffer') {
                                                const encoder = new TextEncoder();
                                                const uint8Array = encoder.encode(responseString);
                                                this.response = uint8Array.buffer;
                                            }
                                            else {
                                                this.response = nativeResponse.data;
                                            }
                                            this.responseText = ((_a = nativeResponse.headers['Content-Type']) === null || _a === void 0 ? void 0 : _a.startsWith('application/json'))
                                                ? JSON.stringify(nativeResponse.data)
                                                : nativeResponse.data;
                                            this.responseURL = nativeResponse.url;
                                            this.readyState = 4;
                                            setTimeout(() => {
                                                this.dispatchEvent(new Event('load'));
                                                this.dispatchEvent(new Event('loadend'));
                                            });
                                        }
                                        console.timeEnd(tag);
                                    })
                                        .catch((error) => {
                                        this.status = error.status;
                                        this._headers = error.headers;
                                        this.response = error.data;
                                        this.responseText = JSON.stringify(error.data);
                                        this.responseURL = error.url;
                                        this.readyState = 4;
                                        if (isProgressEventAvailable()) {
                                            this.dispatchEvent(new ProgressEvent('progress', {
                                                lengthComputable: false,
                                                loaded: 0,
                                                total: 0,
                                            }));
                                        }
                                        setTimeout(() => {
                                            this.dispatchEvent(new Event('error'));
                                            this.dispatchEvent(new Event('loadend'));
                                        });
                                        console.timeEnd(tag);
                                    });
                                });
                            }
                            catch (error) {
                                this.status = 500;
                                this._headers = {};
                                this.response = error;
                                this.responseText = error.toString();
                                this.responseURL = this._url;
                                this.readyState = 4;
                                if (isProgressEventAvailable()) {
                                    this.dispatchEvent(new ProgressEvent('progress', {
                                        lengthComputable: false,
                                        loaded: 0,
                                        total: 0,
                                    }));
                                }
                                setTimeout(() => {
                                    this.dispatchEvent(new Event('error'));
                                    this.dispatchEvent(new Event('loadend'));
                                });
                                console.timeEnd(tag);
                            }
                        };
                        // XHR patch getAllResponseHeaders
                        prototype.getAllResponseHeaders = function () {
                            if (isRelativeOrProxyUrl(this._url)) {
                                return win.JigraWebXMLHttpRequest.getAllResponseHeaders.call(this);
                            }
                            let returnString = '';
                            for (const key in this._headers) {
                                if (key.toLowerCase() !== 'set-cookie') {
                                    returnString += key + ': ' + this._headers[key] + '\r\n';
                                }
                            }
                            return returnString;
                        };
                        // XHR patch getResponseHeader
                        prototype.getResponseHeader = function (name) {
                            if (isRelativeOrProxyUrl(this._url)) {
                                return win.JigraWebXMLHttpRequest.getResponseHeader.call(this, name);
                            }
                            for (const key in this._headers) {
                                if (key.toLowerCase() === name.toLowerCase()) {
                                    return this._headers[key];
                                }
                            }
                            return null;
                        };
                        Object.setPrototypeOf(xhr, prototype);
                        return xhr;
                    };
                    Object.assign(window.XMLHttpRequest, win.JigraWebXMLHttpRequest.fullObject);
                }
            }
            // patch window.console on iOS and store original console fns
            const isIos = getPlatformId(win) === 'ios';
            if (win.console && isIos) {
                Object.defineProperties(win.console, BRIDGED_CONSOLE_METHODS.reduce((props, method) => {
                    const consoleMethod = win.console[method].bind(win.console);
                    props[method] = {
                        value: (...args) => {
                            const msgs = [...args];
                            jig.toNative('Console', 'log', {
                                level: method,
                                message: msgs.map(serializeConsoleMessage).join(' '),
                            });
                            return consoleMethod(...args);
                        },
                    };
                    return props;
                }, {}));
            }
            jig.logJs = (msg, level) => {
                switch (level) {
                    case 'error':
                        win.console.error(msg);
                        break;
                    case 'warn':
                        win.console.warn(msg);
                        break;
                    case 'info':
                        win.console.info(msg);
                        break;
                    default:
                        win.console.log(msg);
                }
            };
            jig.logToNative = createLogToNative(win.console);
            jig.logFromNative = createLogFromNative(win.console);
            jig.handleError = (err) => win.console.error(err);
            win.Jigra = jig;
        };
        function initNativeBridge(win) {
            const jig = win.Jigra || {};
            // keep a collection of callbacks for native response data
            const callbacks = new Map();
            const webviewServerUrl = typeof win.WEBVIEW_SERVER_URL === 'string' ? win.WEBVIEW_SERVER_URL : '';
            jig.getServerUrl = () => webviewServerUrl;
            jig.convertFileSrc = (filePath) => convertFileSrcServerUrl(webviewServerUrl, filePath);
            // Counter of callback ids, randomized to avoid
            // any issues during reloads if a call comes back with
            // an existing callback id from an old session
            let callbackIdCount = Math.floor(Math.random() * 134217728);
            let postToNative = null;
            const isNativePlatform = () => true;
            const getPlatform = () => getPlatformId(win);
            jig.getPlatform = getPlatform;
            jig.isPluginAvailable = (name) => Object.prototype.hasOwnProperty.call(jig.Plugins, name);
            jig.isNativePlatform = isNativePlatform;
            // create the postToNative() fn if needed
            if (getPlatformId(win) === 'android') {
                // android platform
                postToNative = (data) => {
                    var _a;
                    try {
                        win.androidBridge.postMessage(JSON.stringify(data));
                    }
                    catch (e) {
                        (_a = win === null || win === void 0 ? void 0 : win.console) === null || _a === void 0 ? void 0 : _a.error(e);
                    }
                };
            }
            else if (getPlatformId(win) === 'ios') {
                // ios platform
                postToNative = (data) => {
                    var _a;
                    try {
                        data.type = data.type ? data.type : 'message';
                        win.webkit.messageHandlers.bridge.postMessage(data);
                    }
                    catch (e) {
                        (_a = win === null || win === void 0 ? void 0 : win.console) === null || _a === void 0 ? void 0 : _a.error(e);
                    }
                };
            }
            jig.handleWindowError = (msg, url, lineNo, columnNo, err) => {
                const str = msg.toLowerCase();
                if (str.indexOf('script error') > -1) ;
                else {
                    const errObj = {
                        type: 'js.error',
                        error: {
                            message: msg,
                            url: url,
                            line: lineNo,
                            col: columnNo,
                            errorObject: JSON.stringify(err),
                        },
                    };
                    if (err !== null) {
                        jig.handleError(err);
                    }
                    postToNative(errObj);
                }
                return false;
            };
            if (jig.DEBUG) {
                window.onerror = jig.handleWindowError;
            }
            initLogger(win, jig);
            /**
             * Send a plugin method call to the native layer
             */
            jig.toNative = (pluginName, methodName, options, storedCallback) => {
                var _a, _b;
                try {
                    if (typeof postToNative === 'function') {
                        let callbackId = '-1';
                        if (storedCallback &&
                            (typeof storedCallback.callback === 'function' || typeof storedCallback.resolve === 'function')) {
                            // store the call for later lookup
                            callbackId = String(++callbackIdCount);
                            callbacks.set(callbackId, storedCallback);
                        }
                        const callData = {
                            callbackId: callbackId,
                            pluginId: pluginName,
                            methodName: methodName,
                            options: options || {},
                        };
                        if (jig.isLoggingEnabled && pluginName !== 'Console') {
                            jig.logToNative(callData);
                        }
                        // post the call data to native
                        postToNative(callData);
                        return callbackId;
                    }
                    else {
                        (_a = win === null || win === void 0 ? void 0 : win.console) === null || _a === void 0 ? void 0 : _a.warn(`implementation unavailable for: ${pluginName}`);
                    }
                }
                catch (e) {
                    (_b = win === null || win === void 0 ? void 0 : win.console) === null || _b === void 0 ? void 0 : _b.error(e);
                }
                return null;
            };
            if (win === null || win === void 0 ? void 0 : win.androidBridge) {
                win.androidBridge.onmessage = function (event) {
                    returnResult(JSON.parse(event.data));
                };
            }
            /**
             * Process a response from the native layer.
             */
            jig.fromNative = (result) => {
                returnResult(result);
            };
            const returnResult = (result) => {
                var _a, _b;
                if (jig.isLoggingEnabled && result.pluginId !== 'Console') {
                    jig.logFromNative(result);
                }
                // get the stored call, if it exists
                try {
                    const storedCall = callbacks.get(result.callbackId);
                    if (storedCall) {
                        // looks like we've got a stored call
                        if (result.error) {
                            // ensure stacktraces by copying error properties to an Error
                            result.error = Object.keys(result.error).reduce((err, key) => {
                                // use any type to avoid importing util and compiling most of .ts files
                                err[key] = result.error[key];
                                return err;
                            }, new jig.Exception(''));
                        }
                        if (typeof storedCall.callback === 'function') {
                            // callback
                            if (result.success) {
                                storedCall.callback(result.data);
                            }
                            else {
                                storedCall.callback(null, result.error);
                            }
                        }
                        else if (typeof storedCall.resolve === 'function') {
                            // promise
                            if (result.success) {
                                storedCall.resolve(result.data);
                            }
                            else {
                                storedCall.reject(result.error);
                            }
                            // no need to keep this stored callback
                            // around for a one time resolve promise
                            callbacks.delete(result.callbackId);
                        }
                    }
                    else if (!result.success && result.error) {
                        // no stored callback, but if there was an error let's log it
                        (_a = win === null || win === void 0 ? void 0 : win.console) === null || _a === void 0 ? void 0 : _a.warn(result.error);
                    }
                    if (result.save === false) {
                        callbacks.delete(result.callbackId);
                    }
                }
                catch (e) {
                    (_b = win === null || win === void 0 ? void 0 : win.console) === null || _b === void 0 ? void 0 : _b.error(e);
                }
                // always delete to prevent memory leaks
                // overkill but we're not sure what apps will do with this data
                delete result.data;
                delete result.error;
            };
            jig.nativeCallback = (pluginName, methodName, options, callback) => {
                if (typeof options === 'function') {
                    console.warn(`Using a callback as the 'options' parameter of 'nativeCallback()' is deprecated.`);
                    callback = options;
                    options = null;
                }
                return jig.toNative(pluginName, methodName, options, { callback });
            };
            jig.nativePromise = (pluginName, methodName, options) => {
                return new Promise((resolve, reject) => {
                    jig.toNative(pluginName, methodName, options, {
                        resolve: resolve,
                        reject: reject,
                    });
                });
            };
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            jig.withPlugin = (_pluginId, _fn) => dummy;
            jig.Exception = JigraException;
            initEvents(win, jig);
            initLegacyHandlers(win, jig);
            initVendor(win, jig);
            win.Jigra = jig;
        }
        initNativeBridge(w);
    };
    initBridge(typeof globalThis !== 'undefined'
        ? globalThis
        : typeof self !== 'undefined'
            ? self
            : typeof window !== 'undefined'
                ? window
                : typeof global !== 'undefined'
                    ? global
                    : {});

    dummy = initBridge;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
