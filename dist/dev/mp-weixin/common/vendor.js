"use strict";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function makeMap$1(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return (val) => set2.has(val);
}
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap$1(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap$1(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s2 = str ? `on${capitalize(str)}` : ``;
  return s2;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v, i = "") => {
  var _a;
  return isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
};
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_EXIT = "onExit";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_SHARE_CHAT = "onShareChat";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};
function once(fn, ctx2 = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx2, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SHARE_CHAT,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  if (isFunction(app._component.onError)) {
    return createErrorHandler2(app);
  }
});
const E = function() {
};
E.prototype = {
  _id: 1,
  on: function(name, callback, ctx2) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx: ctx2,
      _id: this._id
    });
    return this._id++;
  },
  once: function(name, callback, ctx2) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx2, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx2);
  },
  emit: function(name) {
    var data2 = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data2);
    }
    return this;
  },
  off: function(name, event) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && event) {
      for (var i = evts.length - 1; i >= 0; i--) {
        if (evts[i].fn === event || evts[i].fn._ === event || evts[i]._id === event) {
          evts.splice(i, 1);
          break;
        }
      }
      liveEvents = evts;
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  const lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data2, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data2[key], protocol[key], !hasOwn(data2, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data2 = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data2[opts.name] = args[i];
    }
    validateProtocol(name, data2, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType$1(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap$1("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match2 = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match2 ? match2[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data2) {
    return hook(data2, params) || data2;
  };
}
function queue$2(hooks, data2, params) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data2, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data2);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$2(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue$2(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  args[0];
  {
    return;
  }
}
function invokeSuccess(id, name, res) {
  const result = {
    errMsg: name + ":ok"
  };
  return invokeCallback(id, extend(res || {}, result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
  const errMsgPrefix = name + ":fail";
  let apiErrMsg = "";
  if (!errMsg) {
    apiErrMsg = errMsgPrefix;
  } else if (errMsg.indexOf(errMsgPrefix) === 0) {
    apiErrMsg = errMsg;
  } else {
    apiErrMsg = errMsgPrefix + " " + errMsg;
  }
  {
    delete errRes.errCode;
  }
  let res = extend({ errMsg: apiErrMsg }, errRes);
  return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  const errMsg = formatApiArgs(args);
  if (errMsg) {
    return errMsg;
  }
}
function parseErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    if (typeof globalThis === "undefined" || !globalThis.harmonyChannel) {
      console.error(errMsg.message + "\n" + errMsg.stack);
    }
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, parseErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth: windowWidth2 } = getBaseSystemInfo();
  deviceWidth = windowWidth2;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: [Function, Number]
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
class EventBus {
  constructor() {
    this.$emitter = new E$1();
  }
  on(name, callback) {
    return this.$emitter.on(name, callback);
  }
  once(name, callback) {
    return this.$emitter.once(name, callback);
  }
  off(name, callback) {
    if (!name) {
      this.$emitter.e = {};
      return;
    }
    this.$emitter.off(name, callback);
  }
  emit(name, ...args) {
    this.$emitter.emit(name, ...args);
  }
}
const eventBus = new EventBus();
const $on = defineSyncApi(API_ON, (name, callback) => {
  eventBus.on(name, callback);
  return () => eventBus.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  eventBus.once(name, callback);
  return () => eventBus.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!isArray(name))
    name = name ? [name] : [];
  name.forEach((n2) => eventBus.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  eventBus.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i = 0; i < onPushMessageCallbacks.length; i++) {
      const callback = onPushMessageCallbacks[i];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale) => {
  const app = isFunction(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function getOSInfo(system2, platform) {
  let osName = "";
  let osVersion = "";
  if (platform && false) {
    osName = platform;
    osVersion = system2;
  } else {
    osName = system2.split(" ")[0] || "";
    osVersion = system2.split(" ")[1] || "";
  }
  return {
    osName: osName.toLocaleLowerCase(),
    osVersion
  };
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system: system2 = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  const { osName, osVersion } = getOSInfo(system2, platform);
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__MASTERGO",
    appName: "mastergo-project",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "4.36",
    uniCompilerVersion: "4.36",
    uniRuntimeVersion: "4.36",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName,
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0,
    isUniAppX: false
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model, system: system2 = "", platform = "" } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    const { osName, osVersion } = getOSInfo(system2, platform);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model,
      osName,
      osVersion
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__MASTERGO",
      appName: "mastergo-project",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      isUniAppX: false,
      uniPlatform: "mp-weixin",
      uniCompileVersion: "4.36",
      uniCompilerVersion: "4.36",
      uniRuntimeVersion: "4.36"
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn(target, key)) {
        return target[key];
      }
      if (hasOwn(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet",
  "__webpack_require_UNI_MP_PLUGIN__"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  const newWx = {};
  for (const key in wx) {
    if (isWxKey(key)) {
      newWx[key] = wx[key];
    }
  }
  if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index$2 = initUni(shims, protocols, wx$1);
new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function toRaw$1(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw$1(raw) : observed;
}
function isRef$1(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack$1 = [];
function pushWarningContext$1(vnode) {
  stack$1.push(vnode);
}
function popWarningContext$1() {
  stack$1.pop();
}
function warn$1$1(msg, ...args) {
  const instance = stack$1.length ? stack$1[stack$1.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace$1();
  if (appWarnHandler) {
    callWithErrorHandling$1(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName$1(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace$1(trace));
    }
    console.warn(...warnArgs);
  }
}
function getComponentTrace$1() {
  let currentVNode = stack$1[stack$1.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace$1(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry$1(entry));
  });
  return logs;
}
function formatTraceEntry$1({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName$1(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps$1(vnode.props), close] : [open + close];
}
function formatProps$1(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp$1(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp$1(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef$1(value)) {
    value = formatProp$1(key, toRaw$1(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw$1(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings$1 = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling$1(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError$1(err, instance, type);
  }
}
function handleError$1(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings$1[type];
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling$1(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError$1(err, type, contextVNode, throwInDev);
}
function logError$1(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings$1[type];
    if (contextVNode) {
      pushWarningContext$1(contextVNode);
    }
    warn$1$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext$1();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  }
}
let isFlushing$1 = false;
let isFlushPending$1 = false;
const queue$1 = [];
let flushIndex$1 = 0;
const pendingPostFlushCbs$1 = [];
let activePostFlushCbs$1 = null;
let postFlushIndex$1 = 0;
const resolvedPromise$1 = /* @__PURE__ */ Promise.resolve();
const RECURSION_LIMIT$1 = 100;
function findInsertionIndex$1(id) {
  let start = flushIndex$1 + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue$1[middle];
    const middleJobId = getId$1(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob$1(job) {
  if (!queue$1.length || !queue$1.includes(
    job,
    isFlushing$1 && job.allowRecurse ? flushIndex$1 + 1 : flushIndex$1
  )) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex$1(job.id), 0, job);
    }
    queueFlush$1();
  }
}
function queueFlush$1() {
  if (!isFlushing$1 && !isFlushPending$1) {
    isFlushPending$1 = true;
    resolvedPromise$1.then(flushJobs$1);
  }
}
function queuePostFlushCb$1(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs$1 || !activePostFlushCbs$1.includes(
      cb,
      cb.allowRecurse ? postFlushIndex$1 + 1 : postFlushIndex$1
    )) {
      pendingPostFlushCbs$1.push(cb);
    }
  } else {
    pendingPostFlushCbs$1.push(...cb);
  }
  queueFlush$1();
}
function flushPostFlushCbs$1(seen) {
  if (pendingPostFlushCbs$1.length) {
    const deduped = [...new Set(pendingPostFlushCbs$1)].sort(
      (a, b) => getId$1(a) - getId$1(b)
    );
    pendingPostFlushCbs$1.length = 0;
    if (activePostFlushCbs$1) {
      activePostFlushCbs$1.push(...deduped);
      return;
    }
    activePostFlushCbs$1 = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex$1 = 0; postFlushIndex$1 < activePostFlushCbs$1.length; postFlushIndex$1++) {
      if (checkRecursiveUpdates$1(seen, activePostFlushCbs$1[postFlushIndex$1])) {
        continue;
      }
      activePostFlushCbs$1[postFlushIndex$1]();
    }
    activePostFlushCbs$1 = null;
    postFlushIndex$1 = 0;
  }
}
const getId$1 = (job) => job.id == null ? Infinity : job.id;
const comparator$1 = (a, b) => {
  const diff2 = getId$1(a) - getId$1(b);
  if (diff2 === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff2;
};
function flushJobs$1(seen) {
  isFlushPending$1 = false;
  isFlushing$1 = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue$1.sort(comparator$1);
  const check = (job) => checkRecursiveUpdates$1(seen, job);
  try {
    for (flushIndex$1 = 0; flushIndex$1 < queue$1.length; flushIndex$1++) {
      const job = queue$1[flushIndex$1];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling$1(job, null, 14);
      }
    }
  } finally {
    flushIndex$1 = 0;
    queue$1.length = 0;
    flushPostFlushCbs$1(seen);
    isFlushing$1 = false;
    if (queue$1.length || pendingPostFlushCbs$1.length) {
      flushJobs$1(seen);
    }
  }
}
function checkRecursiveUpdates$1(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT$1) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName$1(instance.type);
      handleError$1(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
const hmrDirtyComponents = /* @__PURE__ */ new Set();
{
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent$1(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    instance.effect.dirty = true;
    instance.update();
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      instance.parent.effect.dirty = true;
      queueJob$1(instance.parent.update);
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn(
        "[HMR] Root or manually mounted instance modified. Full reload required."
      );
    }
  }
  queuePostFlushCb$1(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(
        normalizeClassComponent(instance.type)
      );
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e2) {
      console.error(e2);
      console.warn(
        `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
      );
    }
  };
}
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key]))
      setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1)
        setters.forEach((set2) => set2(v));
      else
        setters[0](v);
    };
  };
  registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => v
  );
  registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => v
  );
}
const classifyRE$1 = /(?:^|[-_])(\w)/g;
const classify$1 = (str) => str.replace(classifyRE$1, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName$1(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName$1(instance, Component2, isRoot = false) {
  let name = getComponentName$1(Component2);
  if (!name && Component2.__file) {
    const match2 = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match2) {
      name = match2[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify$1(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent$1(value) {
  return isFunction(value) && "__vccOpts" in value;
}
/**
* @dcloudio/uni-mp-vue v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
let activeEffect;
class ReactiveEffect2 {
  constructor(fn, trigger2, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 4;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i = 0; i < this._depsLength; i++) {
        const dep = this.deps[i];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v) {
    this._dirtyLevel = v ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a = this.onStop) == null ? void 0 : _a.call(this);
      this.active = false;
    }
  }
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i = effect2._depsLength; i < effect2.deps.length; i++) {
      cleanupDepEffect(effect2.deps[i], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  var _a;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    {
      (_a = effect2.onTrack) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      {
        (_a = effect2.onTrigger) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
      }
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}
const createDep = (cleanup, computed2) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep(() => depsMap.delete(key)));
    }
    trackEffect(
      activeEffect,
      dep,
      {
        target,
        type,
        key
      }
    );
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !isSymbol(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4,
        {
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        }
      );
    }
  }
  resetScheduling();
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap$1(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler2 {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler2 extends BaseReactiveHandler2 {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler2 extends BaseReactiveHandler2 {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    {
      warn$2(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    {
      warn$2(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler2();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler2();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler2(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler2(true);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (hasChanged(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn$2(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    warn$2(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    {
      warn$2(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject(value) ? reactive(value) : value;
const toReadonly = (value) => isObject(value) ? readonly(value) : value;
const COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this.getter = getter;
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect2(
      () => getter(this._value),
      () => triggerRefValue(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
      triggerRefValue(self2, 4);
    }
    trackRefValue(self2);
    if (self2.effect._dirtyLevel >= 2) {
      if (this._warnRecursive) {
        warn$2(COMPUTED_SIDE_EFFECT_WARN, `

getter: `, this.getter);
      }
      triggerRefValue(self2, 2);
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v) {
    this.effect.dirty = v;
  }
  // #endregion
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      warn$2("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function trackRefValue(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      ),
      {
        target: ref2,
        type: "get",
        key: "value"
      }
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel,
      {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      }
    );
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, 4, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? void 0 : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff2 = getId(a) - getId(b);
  if (diff2 === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      handleError(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params
  );
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
          event
        )}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    {
      const selfName = getComponentName(
        Component2,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component2[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.`;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(
      `resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`
    );
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once: once2,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once2) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (deep !== void 0 && typeof deep === "number") {
    warn$1(
      `watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`
    );
  }
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once2 !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(
      `Invalid watch source: `,
      s2,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return reactiveGetter(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect2.onStop = void 0;
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect2(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope) {
      remove(scope.effects, effect2);
    }
  };
  {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(
      effect2.run.bind(effect2),
      instance && instance.suspense
    );
  } else {
    effect2.run();
  }
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx2, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx2;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, depth, currentDepth = 0, seen) {
  if (!isObject(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, depth, currentDepth, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, currentDepth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, currentDepth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, currentDepth, seen);
    }
  }
  return value;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context2 = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const app = context2.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context2,
      _instance: null,
      version,
      get config() {
        return context2.config;
      },
      set config(v) {
        {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context2.mixins.includes(mixin)) {
            context2.mixins.push(mixin);
          } else {
            warn$1(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context2.config);
        }
        if (!component) {
          return context2.components[name];
        }
        if (context2.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context2.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context2.directives[name];
        }
        if (context2.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context2.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context2.provides) {
          warn$1(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context2.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(
      (ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, "")
    );
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`
    );
  }
}
const createHook$1 = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook$1("bm");
const onMounted = createHook$1("m");
const onBeforeUpdate = createHook$1("bu");
const onUpdated = createHook$1("u");
const onBeforeUnmount = createHook$1("bum");
const onUnmounted = createHook$1("um");
const onServerPrefetch = createHook$1("sp");
const onRenderTriggered = createHook$1(
  "rtg"
);
const onRenderTracked = createHook$1(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i) => i.__$el || (i.__$el = {}),
    $data: (i) => i.data,
    $props: (i) => shallowReadonly(i.props),
    $attrs: (i) => shallowReadonly(i.attrs),
    $slots: (i) => shallowReadonly(i.slots),
    $refs: (i) => shallowReadonly(i.refs),
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      i.effect.dirty = true;
      queueJob(i.update);
    }),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i) => instanceWatch.bind(i)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx: ctx2, setupState, data: data2, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data2[key];
          case 4:
            return ctx2[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data2 !== EMPTY_OBJ && hasOwn(data2, key)) {
        accessCache[key] = 2;
        return data2[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx2 !== EMPTY_OBJ && hasOwn(ctx2, key)) {
        accessCache[key] = 4;
        return ctx2[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      } else if (key === "$slots") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx2 !== EMPTY_OBJ && hasOwn(ctx2, key)) {
      accessCache[key] = 4;
      return ctx2[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data2 !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data2, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data: data2, setupState, ctx: ctx2 } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data2 !== EMPTY_OBJ && hasOwn(data2, key)) {
      data2[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx2, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx2[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data: data2, setupState, accessCache, ctx: ctx2, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data2 !== EMPTY_OBJ && hasOwn(data2, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx2, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx: ctx2,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx2, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx: ctx2, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx2, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx2 = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  function initInjections() {
    if (injectOptions) {
      resolveInjections(injectOptions, ctx2, checkDuplicateProperties);
    }
  }
  {
    initInjections();
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx2, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data2 = dataOptions.call(publicThis, publicThis);
    if (isPromise(data2)) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject(data2)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data2);
      {
        for (const key in data2) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx2, key, {
              configurable: true,
              enumerable: true,
              get: () => data2[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      };
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx2, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v) => c2.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx2, publicThis, key);
    }
  }
  function initProvides() {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    initProvides();
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx2, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx2, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx2[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx2, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx2[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx2, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx2[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m2) => mergeOptions(resolved, m2, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m2) => mergeOptions(to, m2, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext() && patchFlag > 0 && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue$1(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue$1(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue$1(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue$1(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn$1(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(
      key,
      resolvedValues[key],
      opt,
      shallowReadonly(resolvedValues),
      !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key))
    );
  }
}
function validateProp(name, value, prop, props, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap$1(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance, instance.type)}> ${type}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null,
    // fixed by xxxxxx 用于存储uni-app的元素缓存
    $uniElements: /* @__PURE__ */ new Map(),
    $templateUniElementRefs: [],
    $templateUniElementStyles: {},
    $eS: {}
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  internalSetCurrentInstance = (i) => {
    currentInstance = i;
  };
  setInSSRSetupState = (v) => {
    isInSSRComponentSetup = v;
  };
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap$1("slot,component");
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        shallowReadonly(instance.props),
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(
          `setup() returned a Promise, but the version of Vue you are using does not support it yet.`
        );
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
const isRuntimeOnly = () => true;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions$1(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  ));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      track(instance, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match2 = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match2) {
      name = match2[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  const c2 = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  {
    const i = getCurrentInstance();
    if (i && i.appContext.config.warnRecursiveComputed) {
      c2._warnRecursive = true;
    }
  }
  return c2;
};
const version = "3.4.21";
const warn = warn$1;
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            if (currentValue.length < preValue.length) {
              setResult(
                result,
                (path == "" ? "" : path + ".") + key,
                currentValue
              );
            } else {
              currentValue.forEach((item, index2) => {
                _diff(
                  item,
                  preValue[index2],
                  (path == "" ? "" : path + ".") + key + "[" + index2 + "]",
                  result
                );
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key,
              currentValue
            );
          } else {
            for (let subKey in currentValue) {
              _diff(
                currentValue[subKey],
                preValue[subKey],
                (path == "" ? "" : path + ".") + key + "." + subKey,
                result
              );
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v) {
  result[k] = v;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx2 = instance.ctx;
  const callbacks = ctx2.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx2 = instance.ctx;
  if (!ctx2.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx2.__next_tick_callbacks) {
    ctx2.__next_tick_callbacks = [];
  }
  ctx2.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i = 0; i < len; i++) {
        copy[i] = clone(src[i], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data2 = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data2[key];
  });
  return ret;
}
function patch(instance, data2, oldData) {
  if (!data2) {
    return;
  }
  data2 = deepCopy(data2);
  data2.$eS = instance.$eS || {};
  const ctx2 = instance.ctx;
  const mpType = ctx2.mpType;
  if (mpType === "page" || mpType === "component") {
    data2.r0 = 1;
    const mpInstance = ctx2.$scope;
    const keys = Object.keys(data2);
    const diffData = diff(data2, getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx2.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx2.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(
    options,
    instance,
    publicThis
  );
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx2 = instance.ctx;
      if (!ctx2.$computedKeys) {
        ctx2.$computedKeys = [];
      }
      ctx2.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const {
    setupState,
    $templateRefs,
    $templateUniElementRefs,
    ctx: { $scope, $mpPlatform }
  } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$scope || !$templateRefs && !$templateUniElementRefs) {
    return;
  }
  if (isUnmount) {
    $templateRefs && $templateRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
    $templateUniElementRefs && $templateUniElementRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
    return;
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    if (refs.length === 0) {
      return [];
    }
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat(
        $scope.selectAllComponents(".r-i-f") || []
      )
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    if ($templateRefs) {
      const refs = doSetByRefs($templateRefs);
      if (refs.length && instance.proxy && instance.proxy.$scope) {
        instance.proxy.$scope.setData({ r1: 1 }, () => {
          doSetByRefs(refs);
        });
      }
    }
  };
  if ($templateUniElementRefs && $templateUniElementRefs.length) {
    nextTick(instance, () => {
      $templateUniElementRefs.forEach((templateRef) => {
        if (isArray(templateRef.v)) {
          templateRef.v.forEach((v) => {
            setTemplateRef(templateRef, v, setupState);
          });
        } else {
          setTemplateRef(templateRef, templateRef.v, setupState);
        }
      });
    });
  }
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find(
    (com) => com && (com.properties || com.props).uI === id
  );
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r: r2, f: f2 }, refValue, setupState) {
  if (isFunction(r2)) {
    r2(refValue, {});
  } else {
    const _isString = isString(r2);
    const _isRef = isRef(r2);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r2.value)) {
          r2.value = [];
        }
        const existing = r2.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          if (refValue.$) {
            onBeforeUnmount(() => remove(existing, refValue), refValue.$);
          }
        }
      } else if (_isString) {
        if (hasOwn(setupState, r2)) {
          setupState[r2] = refValue;
        }
      } else if (isRef(r2)) {
        r2.value = refValue;
      } else {
        warnRef(r2);
      }
    } else {
      warnRef(r2);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const {
    type: Component2,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data: data2,
    setupState,
    ctx: ctx2,
    uid: uid2,
    appContext: {
      app: {
        config: {
          globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 }
        }
      }
    },
    inheritAttrs
  } = instance;
  instance.$uniElementIds = /* @__PURE__ */ new Map();
  instance.$templateRefs = [];
  instance.$templateUniElementRefs = [];
  instance.$templateUniElementStyles = {};
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(
        proxyToUse,
        proxyToUse,
        renderCache,
        props,
        setupState,
        data2,
        ctx2
      );
    } else {
      fallthroughAttrs(
        inheritAttrs,
        props,
        propsOptions,
        Component2.props ? attrs : getFunctionalFallthrough(attrs)
      );
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter(
      (key) => key !== "class" && key !== "style"
    );
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data: data2 }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data2;
    } else {
      const diffScopedSlotData = diff(
        data2,
        oldScopedSlotData[index2]
      );
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(
    instance
  );
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u) {
        queuePostRenderEffect(u);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect2 = instance.effect = new ReactiveEffect2(
    componentUpdateFn,
    NOOP,
    () => queueJob(update),
    instance.scope
    // track it in component's effect scope
  );
  const update = instance.update = () => {
    if (effect2.dirty) {
      effect2.run();
    }
  };
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect2.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect2.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  {
    update();
  }
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  {
    const parentInstance = instance.parent;
    if (parentInstance) {
      const $children = parentInstance.ctx.$children;
      const target = getExposeProxy(instance) || instance.proxy;
      const index2 = $children.indexOf(target);
      if (index2 > -1) {
        $children.splice(index2, 1);
      }
    }
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode2 = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent22(initialVNode, options) {
    return mountComponent(createVNode2(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(
      createVNode2({ type: rootComponent }),
      {
        mpType: "app",
        mpInstance: null,
        parentComponent: null,
        slots: [],
        props: null
      }
    );
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set(target, key, val) {
  return target[key] = val;
}
function $callMethod(method, ...args) {
  const fn = this[method];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method} not found`);
  return null;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c2) {
    return "%" + ("00" + c2.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index$2.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions$2;
    globalProperties.$callMethod = $callMethod;
  }
  {
    index$2.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined" && typeof global[method] !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx2 = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx2.$mpPlatform === "mp-weixin" || ctx2.$mpPlatform === "mp-qq" || ctx2.$mpPlatform === "mp-xhs") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx2.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (instance && instance.ctx.$getTriggerEventDetail) {
      if (typeof e2.detail === "number") {
        e2.detail = instance.ctx.$getTriggerEventDetail(e2.detail);
      }
    }
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn(event.detail, "checked") && !hasOwn(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, i);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, i);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, i));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
const o = (value, key) => vOn(value, key);
const f = (source, renderItem) => vFor(source, renderItem);
const s = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend(target, ...sources);
const n = (value) => normalizeClass(value);
const t$1 = (val) => toDisplayString(val);
const p = (props) => renderProps(props);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx2) {
  return function emit2(event, ...args) {
    const scope = ctx2.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx2 = instance.ctx;
  ctx2.mpType = options.mpType;
  ctx2.$mpType = options.mpType;
  ctx2.$mpPlatform = "mp-weixin";
  ctx2.$scope = options.mpInstance;
  ctx2.$mp = {};
  {
    ctx2._self = {};
  }
  instance.slots = {};
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx2.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx2.$hasHook = hasHook;
  ctx2.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx2);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx2 = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx2[method] = function(...args) {
      const mpInstance = ctx2.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx2 = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn(mpInstance, mock)) {
      instance[mock] = ctx2[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    // mp-alipay 组件 data 初始化比 onLaunch 早，提前挂载
    onLaunch(options) {
      this.$vm = instance;
      const ctx2 = internalInstance.ctx;
      if (this.$vm && ctx2.$scope && ctx2.$callHook) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx2.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  const { onError } = internalInstance;
  if (onError) {
    internalInstance.appContext.config.errorHandler = (err) => {
      instance.$callHook(ON_ERROR, err);
    };
  }
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm);
    const app = isFunction(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v) {
      locale.value = v;
    }
  });
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    let observerSlots = function(newVal) {
      const $slots = /* @__PURE__ */ Object.create(null);
      newVal && newVal.forEach((slotName) => {
        $slots[slotName] = true;
      });
      this.setData({
        $slots
      });
    };
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: []
    };
    {
      properties.uS.observer = observerSlots;
    }
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      if (!options.properties || !options.properties.name) {
        properties.name = {
          type: null,
          value: ""
        };
      }
      if (!options.properties || !options.properties.value) {
        properties.value = {
          type: null,
          value: ""
        };
      }
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties.virtualHostStyle = {
        type: null,
        value: ""
      };
      properties.virtualHostClass = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(resolvePropValue(properties.uP))) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = resolvePropValue(properties[name]);
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function resolvePropValue(prop) {
  return prop;
}
function initData(_) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(resolvePropValue(up), this.$vm.$);
    } else if (resolvePropValue(this.properties.uT) === "m") {
      updateMiniProgramComponentProperties(resolvePropValue(up), this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse) {
    parse(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse && parse(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [
      customizeEvent(event),
      ...args
    ]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        // vueSlots
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onShow = /* @__PURE__ */ createHook(ON_SHOW);
const onHide = /* @__PURE__ */ createHook(ON_HIDE);
const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
const onUnload = /* @__PURE__ */ createHook(ON_UNLOAD);
const onPageScroll = /* @__PURE__ */ createHook(ON_PAGE_SCROLL);
const onReachBottom = /* @__PURE__ */ createHook(ON_REACH_BOTTOM);
const onShareTimeline = /* @__PURE__ */ createHook(ON_SHARE_TIMELINE);
const onShareAppMessage = /* @__PURE__ */ createHook(ON_SHARE_APP_MESSAGE);
const config$1 = {
  // 信任的标签（保持标签名不变）
  trustTags: makeMap("card,a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,ruby,rt,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video"),
  // 块级标签（转为 div，其他的非信任标签转为 span）
  blockTags: makeMap("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section"),
  // 行内标签
  inlineTags: makeMap("abbr,b,big,code,del,em,i,ins,label,q,small,span,strong,sub,sup"),
  // 要移除的标签
  ignoreTags: makeMap("area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr"),
  // 自闭合的标签
  voidTags: makeMap("card,area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr"),
  // html 实体
  entities: {
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    ensp: " ",
    emsp: " ",
    nbsp: " ",
    semi: ";",
    ndash: "–",
    mdash: "—",
    middot: "·",
    lsquo: "‘",
    rsquo: "’",
    ldquo: "“",
    rdquo: "”",
    bull: "•",
    hellip: "…",
    larr: "←",
    uarr: "↑",
    rarr: "→",
    darr: "↓"
  },
  // 默认的标签样式
  tagStyle: {
    address: "font-style:italic",
    big: "display:inline;font-size:1.2em",
    caption: "display:table-caption;text-align:center",
    center: "text-align:center",
    cite: "font-style:italic",
    dd: "margin-left:40px",
    mark: "background-color:yellow",
    pre: "font-family:monospace;white-space:pre",
    s: "text-decoration:line-through",
    small: "display:inline;font-size:0.8em",
    strike: "text-decoration:line-through",
    u: "text-decoration:underline"
  },
  // svg 大小写对照表
  svgDict: {
    animatetransform: "animateTransform",
    lineargradient: "linearGradient",
    viewbox: "viewBox",
    attributename: "attributeName",
    repeatcount: "repeatCount",
    repeatdur: "repeatDur",
    foreignobject: "foreignObject"
  }
};
const tagSelector = {};
const {
  windowWidth,
  system
} = index$2.getSystemInfoSync();
const blankChar = makeMap(" ,\r,\n,	,\f");
let idIndex = 0;
function makeMap(str) {
  const map2 = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = list.length; i--; ) {
    map2[list[i]] = true;
  }
  return map2;
}
function decodeEntity(str, amp) {
  let i = str.indexOf("&");
  while (i !== -1) {
    const j = str.indexOf(";", i + 3);
    let code;
    if (j === -1)
      break;
    if (str[i + 1] === "#") {
      code = parseInt((str[i + 2] === "x" ? "0" : "") + str.substring(i + 2, j));
      if (!isNaN(code)) {
        str = str.substr(0, i) + String.fromCharCode(code) + str.substr(j + 1);
      }
    } else {
      code = str.substring(i + 1, j);
      if (config$1.entities[code] || code === "amp" && amp) {
        str = str.substr(0, i) + (config$1.entities[code] || "&") + str.substr(j + 1);
      }
    }
    i = str.indexOf("&", i + 1);
  }
  return str;
}
function mergeNodes(nodes) {
  let i = nodes.length - 1;
  for (let j = i; j >= -1; j--) {
    if (j === -1 || nodes[j].c || !nodes[j].name || nodes[j].name !== "div" && nodes[j].name !== "p" && nodes[j].name[0] !== "h" || (nodes[j].attrs.style || "").includes("inline")) {
      if (i - j >= 5) {
        nodes.splice(j + 1, i - j, {
          name: "div",
          attrs: {},
          children: nodes.slice(j + 1, i + 1)
        });
      }
      i = j - 1;
    }
  }
}
function Parser$1(vm) {
  this.options = vm || {};
  this.tagStyle = Object.assign({}, config$1.tagStyle, this.options.tagStyle);
  this.imgList = vm.imgList || [];
  this.imgList._unloadimgs = 0;
  this.plugins = vm.plugins || [];
  this.attrs = /* @__PURE__ */ Object.create(null);
  this.stack = [];
  this.nodes = [];
  this.pre = (this.options.containerStyle || "").includes("white-space") && this.options.containerStyle.includes("pre") ? 2 : 0;
}
Parser$1.prototype.parse = function(content) {
  for (let i = this.plugins.length; i--; ) {
    if (this.plugins[i].onUpdate) {
      content = this.plugins[i].onUpdate(content, config$1) || content;
    }
  }
  new Lexer$1(this).parse(content);
  while (this.stack.length) {
    this.popNode();
  }
  if (this.nodes.length > 50) {
    mergeNodes(this.nodes);
  }
  return this.nodes;
};
Parser$1.prototype.expose = function() {
  for (let i = this.stack.length; i--; ) {
    const item = this.stack[i];
    if (item.c || item.name === "a" || item.name === "video" || item.name === "audio")
      return;
    item.c = 1;
  }
};
Parser$1.prototype.hook = function(node) {
  for (let i = this.plugins.length; i--; ) {
    if (this.plugins[i].onParse && this.plugins[i].onParse(node, this) === false) {
      return false;
    }
  }
  return true;
};
Parser$1.prototype.getUrl = function(url) {
  const domain = this.options.domain;
  if (url[0] === "/") {
    if (url[1] === "/") {
      url = (domain ? domain.split("://")[0] : "http") + ":" + url;
    } else if (domain) {
      url = domain + url;
    }
  } else if (!url.includes("data:") && !url.includes("://")) {
    if (domain) {
      url = domain + "/" + url;
    }
  }
  return url;
};
Parser$1.prototype.parseStyle = function(node) {
  const attrs = node.attrs;
  const list = (this.tagStyle[node.name] || "").split(";").concat((attrs.style || "").split(";"));
  const styleObj = {};
  let tmp = "";
  if (attrs.id && !this.xml) {
    if (this.options.useAnchor) {
      this.expose();
    } else if (node.name !== "img" && node.name !== "a" && node.name !== "video" && node.name !== "audio") {
      attrs.id = void 0;
    }
  }
  if (attrs.width) {
    styleObj.width = parseFloat(attrs.width) + (attrs.width.includes("%") ? "%" : "px");
    attrs.width = void 0;
  }
  if (attrs.height) {
    styleObj.height = parseFloat(attrs.height) + (attrs.height.includes("%") ? "%" : "px");
    attrs.height = void 0;
  }
  for (let i = 0, len = list.length; i < len; i++) {
    const info = list[i].split(":");
    if (info.length < 2)
      continue;
    const key = info.shift().trim().toLowerCase();
    let value = info.join(":").trim();
    if (value[0] === "-" && value.lastIndexOf("-") > 0 || value.includes("safe")) {
      tmp += `;${key}:${value}`;
    } else if (!styleObj[key] || value.includes("import") || !styleObj[key].includes("import")) {
      if (value.includes("url")) {
        let j = value.indexOf("(") + 1;
        if (j) {
          while (value[j] === '"' || value[j] === "'" || blankChar[value[j]]) {
            j++;
          }
          value = value.substr(0, j) + this.getUrl(value.substr(j));
        }
      } else if (value.includes("rpx")) {
        value = value.replace(/[0-9.]+\s*rpx/g, ($) => parseFloat($) * windowWidth / 750 + "px");
      }
      styleObj[key] = value;
    }
  }
  node.attrs.style = tmp;
  return styleObj;
};
Parser$1.prototype.onTagName = function(name) {
  this.tagName = this.xml ? name : name.toLowerCase();
  if (this.tagName === "svg") {
    this.xml = (this.xml || 0) + 1;
    config$1.ignoreTags.style = void 0;
  }
};
Parser$1.prototype.onAttrName = function(name) {
  name = this.xml ? name : name.toLowerCase();
  if (name.substr(0, 5) === "data-") {
    if (name === "data-src" && !this.attrs.src) {
      this.attrName = "src";
    } else if (this.tagName === "img" || this.tagName === "a") {
      this.attrName = name;
    } else {
      this.attrName = void 0;
    }
  } else {
    this.attrName = name;
    this.attrs[name] = "T";
  }
};
Parser$1.prototype.onAttrVal = function(val) {
  const name = this.attrName || "";
  if (name === "style" || name === "href") {
    this.attrs[name] = decodeEntity(val, true);
  } else if (name.includes("src")) {
    this.attrs[name] = this.getUrl(decodeEntity(val, true));
  } else if (name) {
    this.attrs[name] = val;
  }
};
Parser$1.prototype.onOpenTag = function(selfClose) {
  const node = /* @__PURE__ */ Object.create(null);
  node.name = this.tagName;
  node.attrs = this.attrs;
  if (this.options.nodes.length) {
    node.type = "node";
  }
  this.attrs = /* @__PURE__ */ Object.create(null);
  const attrs = node.attrs;
  const parent = this.stack[this.stack.length - 1];
  const siblings = parent ? parent.children : this.nodes;
  const close = this.xml ? selfClose : config$1.voidTags[node.name];
  if (tagSelector[node.name]) {
    attrs.class = tagSelector[node.name] + (attrs.class ? " " + attrs.class : "");
  }
  if (node.name === "embed") {
    const src = attrs.src || "";
    if (src.includes(".mp4") || src.includes(".3gp") || src.includes(".m3u8") || (attrs.type || "").includes("video")) {
      node.name = "video";
    } else if (src.includes(".mp3") || src.includes(".wav") || src.includes(".aac") || src.includes(".m4a") || (attrs.type || "").includes("audio")) {
      node.name = "audio";
    }
    if (attrs.autostart) {
      attrs.autoplay = "T";
    }
    attrs.controls = "T";
  }
  if (node.name === "video" || node.name === "audio") {
    if (node.name === "video" && !attrs.id) {
      attrs.id = "v" + idIndex++;
    }
    if (!attrs.controls && !attrs.autoplay) {
      attrs.controls = "T";
    }
    node.src = [];
    if (attrs.src) {
      node.src.push(attrs.src);
      attrs.src = void 0;
    }
    this.expose();
  }
  if (close) {
    if (!this.hook(node) || config$1.ignoreTags[node.name]) {
      if (node.name === "base" && !this.options.domain) {
        this.options.domain = attrs.href;
      } else if (node.name === "source" && parent && (parent.name === "video" || parent.name === "audio") && attrs.src) {
        parent.src.push(attrs.src);
      }
      return;
    }
    const styleObj = this.parseStyle(node);
    if (node.name === "img") {
      if (attrs.src) {
        if (attrs.src.includes("webp")) {
          node.webp = "T";
        }
        if (attrs.src.includes("data:") && this.options.previewImg !== "all" && !attrs["original-src"]) {
          attrs.ignore = "T";
        }
        if (!attrs.ignore || node.webp || attrs.src.includes("cloud://")) {
          for (let i = this.stack.length; i--; ) {
            const item = this.stack[i];
            if (item.name === "a") {
              node.a = item.attrs;
            }
            if (item.name === "table" && !node.webp && !attrs.src.includes("cloud://")) {
              if (!styleObj.display || styleObj.display.includes("inline")) {
                node.t = "inline-block";
              } else {
                node.t = styleObj.display;
              }
              styleObj.display = void 0;
            }
            const style = item.attrs.style || "";
            if (style.includes("flex:") && !style.includes("flex:0") && !style.includes("flex: 0") && (!styleObj.width || parseInt(styleObj.width) > 100)) {
              styleObj.width = "100% !important";
              styleObj.height = "";
              for (let j = i + 1; j < this.stack.length; j++) {
                this.stack[j].attrs.style = (this.stack[j].attrs.style || "").replace("inline-", "");
              }
            } else if (style.includes("flex") && styleObj.width === "100%") {
              for (let j = i + 1; j < this.stack.length; j++) {
                const style2 = this.stack[j].attrs.style || "";
                if (!style2.includes(";width") && !style2.includes(" width") && style2.indexOf("width") !== 0) {
                  styleObj.width = "";
                  break;
                }
              }
            } else if (style.includes("inline-block")) {
              if (styleObj.width && styleObj.width[styleObj.width.length - 1] === "%") {
                item.attrs.style += ";max-width:" + styleObj.width;
                styleObj.width = "";
              } else {
                item.attrs.style += ";max-width:100%";
              }
            }
            item.c = 1;
          }
          attrs.i = this.imgList.length.toString();
          let src = attrs["original-src"] || attrs.src;
          if (this.imgList.includes(src)) {
            let i = src.indexOf("://");
            if (i !== -1) {
              i += 3;
              let newSrc = src.substr(0, i);
              for (; i < src.length; i++) {
                if (src[i] === "/")
                  break;
                newSrc += Math.random() > 0.5 ? src[i].toUpperCase() : src[i];
              }
              newSrc += src.substr(i);
              src = newSrc;
            }
          }
          this.imgList.push(src);
          if (!node.t) {
            this.imgList._unloadimgs += 1;
          }
        }
      }
      if (styleObj.display === "inline") {
        styleObj.display = "";
      }
      if (attrs.ignore) {
        styleObj["max-width"] = styleObj["max-width"] || "100%";
        attrs.style += ";-webkit-touch-callout:none";
      }
      if (parseInt(styleObj.width) > windowWidth) {
        styleObj.height = void 0;
      }
      if (!isNaN(parseInt(styleObj.width))) {
        node.w = "T";
      }
      if (!isNaN(parseInt(styleObj.height)) && (!styleObj.height.includes("%") || parent && (parent.attrs.style || "").includes("height"))) {
        node.h = "T";
      }
      if (node.w && node.h && styleObj["object-fit"]) {
        if (styleObj["object-fit"] === "contain") {
          node.m = "aspectFit";
        } else if (styleObj["object-fit"] === "cover") {
          node.m = "aspectFill";
        }
      }
    } else if (node.name === "svg") {
      siblings.push(node);
      this.stack.push(node);
      this.popNode();
      return;
    }
    for (const key in styleObj) {
      if (styleObj[key]) {
        attrs.style += `;${key}:${styleObj[key].replace(" !important", "")}`;
      }
    }
    attrs.style = attrs.style.substr(1) || void 0;
    if (!attrs.style) {
      delete attrs.style;
    }
  } else {
    if ((node.name === "pre" || (attrs.style || "").includes("white-space") && attrs.style.includes("pre")) && this.pre !== 2) {
      this.pre = node.pre = 1;
    }
    node.children = [];
    this.stack.push(node);
  }
  siblings.push(node);
};
Parser$1.prototype.onCloseTag = function(name) {
  name = this.xml ? name : name.toLowerCase();
  let i;
  for (i = this.stack.length; i--; ) {
    if (this.stack[i].name === name)
      break;
  }
  if (i !== -1) {
    while (this.stack.length > i) {
      this.popNode();
    }
  } else if (name === "p" || name === "br") {
    const siblings = this.stack.length ? this.stack[this.stack.length - 1].children : this.nodes;
    siblings.push({
      name,
      attrs: {
        class: tagSelector[name] || "",
        style: this.tagStyle[name] || ""
      }
    });
  }
};
Parser$1.prototype.popNode = function() {
  const editable = this.options.editable;
  const node = this.stack.pop();
  let attrs = node.attrs;
  const children = node.children;
  const parent = this.stack[this.stack.length - 1];
  const siblings = parent ? parent.children : this.nodes;
  if (!this.hook(node) || config$1.ignoreTags[node.name]) {
    if (node.name === "title" && children.length && children[0].type === "text" && this.options.setTitle) {
      index$2.setNavigationBarTitle({
        title: children[0].text
      });
    }
    siblings.pop();
    return;
  }
  if (node.pre && this.pre !== 2) {
    this.pre = node.pre = void 0;
    for (let i = this.stack.length; i--; ) {
      if (this.stack[i].pre) {
        this.pre = 1;
      }
    }
  }
  const styleObj = {};
  if (node.name === "svg") {
    if (this.xml > 1) {
      this.xml--;
      return;
    }
    let src = "";
    const style = attrs.style;
    attrs.style = "";
    attrs.xmlns = "http://www.w3.org/2000/svg";
    (function traversal(node2) {
      if (node2.type === "text") {
        src += node2.text;
        return;
      }
      const name = config$1.svgDict[node2.name] || node2.name;
      if (name === "foreignObject") {
        for (const child of node2.children || []) {
          if (child.attrs && !child.attrs.xmlns) {
            child.attrs.xmlns = "http://www.w3.org/1999/xhtml";
            break;
          }
        }
      }
      src += "<" + name;
      for (const item in node2.attrs) {
        const val = node2.attrs[item];
        if (val) {
          src += ` ${config$1.svgDict[item] || item}="${val.replace(/"/g, "")}"`;
        }
      }
      if (!node2.children) {
        src += "/>";
      } else {
        src += ">";
        for (let i = 0; i < node2.children.length; i++) {
          traversal(node2.children[i]);
        }
        src += "</" + name + ">";
      }
    })(node);
    node.name = "img";
    node.attrs = {
      src: "data:image/svg+xml;utf8," + src.replace(/#/g, "%23"),
      style,
      ignore: "T"
    };
    node.children = void 0;
    this.xml = false;
    config$1.ignoreTags.style = true;
    return;
  }
  if (attrs.align) {
    if (node.name === "table") {
      if (attrs.align === "center") {
        styleObj["margin-inline-start"] = styleObj["margin-inline-end"] = "auto";
      } else {
        styleObj.float = attrs.align;
      }
    } else {
      styleObj["text-align"] = attrs.align;
    }
    attrs.align = void 0;
  }
  if (attrs.dir) {
    styleObj.direction = attrs.dir;
    attrs.dir = void 0;
  }
  if (node.name === "font") {
    if (attrs.color) {
      styleObj.color = attrs.color;
      attrs.color = void 0;
    }
    if (attrs.face) {
      styleObj["font-family"] = attrs.face;
      attrs.face = void 0;
    }
    if (attrs.size) {
      let size2 = parseInt(attrs.size);
      if (!isNaN(size2)) {
        if (size2 < 1) {
          size2 = 1;
        } else if (size2 > 7) {
          size2 = 7;
        }
        styleObj["font-size"] = ["x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"][size2 - 1];
      }
      attrs.size = void 0;
    }
  }
  if ((attrs.class || "").includes("align-center")) {
    styleObj["text-align"] = "center";
  }
  Object.assign(styleObj, this.parseStyle(node));
  if (node.name !== "table" && parseInt(styleObj.width) > windowWidth) {
    styleObj["max-width"] = "100%";
    styleObj["box-sizing"] = "border-box";
  }
  if (config$1.blockTags[node.name]) {
    if (!editable) {
      node.name = "div";
    }
  } else if (!config$1.trustTags[node.name] && !this.xml) {
    node.name = "span";
  }
  if (node.name === "a" || node.name === "ad") {
    this.expose();
  } else if (node.name === "video") {
    if ((styleObj.height || "").includes("auto")) {
      styleObj.height = void 0;
    }
  } else if ((node.name === "ul" || node.name === "ol") && (node.c || editable)) {
    const types = {
      a: "lower-alpha",
      A: "upper-alpha",
      i: "lower-roman",
      I: "upper-roman"
    };
    if (types[attrs.type]) {
      attrs.style += ";list-style-type:" + types[attrs.type];
      attrs.type = void 0;
    }
    for (let i = children.length; i--; ) {
      if (children[i].name === "li") {
        children[i].c = 1;
      }
    }
  } else if (node.name === "table") {
    let padding = parseFloat(attrs.cellpadding);
    let spacing = parseFloat(attrs.cellspacing);
    const border = parseFloat(attrs.border);
    const bordercolor = styleObj["border-color"];
    const borderstyle = styleObj["border-style"];
    if (node.c || editable) {
      if (isNaN(padding)) {
        padding = 2;
      }
      if (isNaN(spacing)) {
        spacing = 2;
      }
    }
    if (border) {
      attrs.style += `;border:${border}px ${borderstyle || "solid"} ${bordercolor || "gray"}`;
    }
    if (node.flag && (node.c || editable)) {
      styleObj.display = "grid";
      if (styleObj["border-collapse"] === "collapse") {
        styleObj["border-collapse"] = void 0;
        spacing = 0;
      }
      if (spacing) {
        styleObj["grid-gap"] = spacing + "px";
        styleObj.padding = spacing + "px";
      } else if (border) {
        attrs.style += ";border-left:0;border-top:0";
      }
      const width = [];
      const trList = [];
      const cells = [];
      const map2 = {};
      (function traversal(nodes) {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].name === "tr") {
            trList.push(nodes[i]);
          } else if (nodes[i].name === "colgroup") {
            let colI = 1;
            for (const col of nodes[i].children || []) {
              if (col.name === "col") {
                const style = col.attrs.style || "";
                const start = style.indexOf("width") ? style.indexOf(";width") : 0;
                if (start !== -1) {
                  let end = style.indexOf(";", start + 6);
                  if (end === -1) {
                    end = style.length;
                  }
                  width[colI] = style.substring(start ? start + 7 : 6, end);
                }
                colI += 1;
              }
            }
          } else {
            traversal(nodes[i].children || []);
          }
        }
      })(children);
      for (let row = 1; row <= trList.length; row++) {
        let col = 1;
        for (let j = 0; j < trList[row - 1].children.length; j++) {
          const td = trList[row - 1].children[j];
          if (td.name === "td" || td.name === "th") {
            while (map2[row + "." + col]) {
              col++;
            }
            if (editable) {
              td.r = row;
            }
            let style = td.attrs.style || "";
            let start = style.indexOf("width") ? style.indexOf(";width") : 0;
            if (start !== -1) {
              let end = style.indexOf(";", start + 6);
              if (end === -1) {
                end = style.length;
              }
              if (!td.attrs.colspan) {
                width[col] = style.substring(start ? start + 7 : 6, end);
              }
              style = style.substr(0, start) + style.substr(end);
            }
            style += ";display:flex";
            start = style.indexOf("vertical-align");
            if (start !== -1) {
              const val = style.substr(start + 15, 10);
              if (val.includes("middle")) {
                style += ";align-items:center";
              } else if (val.includes("bottom")) {
                style += ";align-items:flex-end";
              }
            } else {
              style += ";align-items:center";
            }
            start = style.indexOf("text-align");
            if (start !== -1) {
              const val = style.substr(start + 11, 10);
              if (val.includes("center")) {
                style += ";justify-content: center";
              } else if (val.includes("right")) {
                style += ";justify-content: right";
              }
            }
            style = (border ? `;border:${border}px ${borderstyle || "solid"} ${bordercolor || "gray"}` + (spacing ? "" : ";border-right:0;border-bottom:0") : "") + (padding ? `;padding:${padding}px` : "") + ";" + style;
            if (td.attrs.colspan) {
              style += `;grid-column-start:${col};grid-column-end:${col + parseInt(td.attrs.colspan)}`;
              if (!td.attrs.rowspan) {
                style += `;grid-row-start:${row};grid-row-end:${row + 1}`;
              }
              col += parseInt(td.attrs.colspan) - 1;
            }
            if (td.attrs.rowspan) {
              style += `;grid-row-start:${row};grid-row-end:${row + parseInt(td.attrs.rowspan)}`;
              if (!td.attrs.colspan) {
                style += `;grid-column-start:${col};grid-column-end:${col + 1}`;
              }
              for (let rowspan = 1; rowspan < td.attrs.rowspan; rowspan++) {
                for (let colspan = 0; colspan < (td.attrs.colspan || 1); colspan++) {
                  map2[row + rowspan + "." + (col - colspan)] = 1;
                }
              }
            }
            if (style) {
              td.attrs.style = style;
            }
            cells.push(td);
            col++;
          }
        }
        if (row === 1) {
          let temp = "";
          for (let i = 1; i < col; i++) {
            temp += (width[i] ? width[i] : "auto") + " ";
          }
          styleObj["grid-template-columns"] = temp;
        }
      }
      node.children = cells;
    } else {
      if (node.c || editable) {
        styleObj.display = "table";
      }
      if (!isNaN(spacing)) {
        styleObj["border-spacing"] = spacing + "px";
      }
      if (border || padding) {
        (function traversal(nodes) {
          for (let i = 0; i < nodes.length; i++) {
            const td = nodes[i];
            if (td.name === "th" || td.name === "td") {
              if (border) {
                td.attrs.style = `border:${border}px ${borderstyle || "solid"} ${bordercolor || "gray"};${td.attrs.style || ""}`;
              }
              if (padding) {
                td.attrs.style = `padding:${padding}px;${td.attrs.style || ""}`;
              }
            } else if (td.children) {
              traversal(td.children);
            }
          }
        })(children);
      }
    }
    if (this.options.scrollTable && !(attrs.style || "").includes("inline")) {
      const table = Object.assign({}, node);
      node.name = "div";
      node.attrs = {
        style: "overflow:auto"
      };
      node.children = [table];
      attrs = table.attrs;
    }
  } else if ((node.name === "tbody" || node.name === "tr") && node.flag && (node.c || editable)) {
    node.flag = void 0;
    (function traversal(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].name === "td") {
          for (const style of ["color", "background", "background-color"]) {
            if (styleObj[style]) {
              nodes[i].attrs.style = style + ":" + styleObj[style] + ";" + (nodes[i].attrs.style || "");
            }
          }
        } else {
          traversal(nodes[i].children || []);
        }
      }
    })(children);
  } else if ((node.name === "td" || node.name === "th") && (attrs.colspan || attrs.rowspan)) {
    for (let i = this.stack.length; i--; ) {
      if (this.stack[i].name === "table" || this.stack[i].name === "tbody" || this.stack[i].name === "tr") {
        this.stack[i].flag = 1;
      }
    }
  } else if (node.name === "ruby") {
    node.name = "span";
    for (let i = 0; i < children.length - 1; i++) {
      if (children[i].type === "text" && children[i + 1].name === "rt") {
        children[i] = {
          name: "div",
          attrs: {
            style: "display:inline-block;text-align:center"
          },
          children: [{
            name: "div",
            attrs: {
              style: "font-size:50%;" + (children[i + 1].attrs.style || "")
            },
            children: children[i + 1].children
          }, children[i]]
        };
        children.splice(i + 1, 1);
      }
    }
  } else if (!editable && node.c) {
    (function traversal(node2) {
      node2.c = 2;
      for (let i = node2.children.length; i--; ) {
        const child = node2.children[i];
        if (child.name && (config$1.inlineTags[child.name] || (child.attrs.style || "").includes("inline") && child.children) && !child.c) {
          traversal(child);
        }
        if (!child.c || child.name === "table") {
          node2.c = 1;
        }
      }
    })(node);
  }
  if ((styleObj.display || "").includes("flex") && !(node.c || editable)) {
    for (let i = children.length; i--; ) {
      const item = children[i];
      if (item.f) {
        item.attrs.style = (item.attrs.style || "") + item.f;
        item.f = void 0;
      }
    }
  }
  const flex = parent && ((parent.attrs.style || "").includes("flex") || (parent.attrs.style || "").includes("grid")) && !((node.c || editable) && wx$1.getNFCAdapter);
  if (flex) {
    node.f = ";max-width:100%";
  }
  if (children.length >= 50 && (node.c || editable) && !(styleObj.display || "").includes("flex")) {
    mergeNodes(children);
  }
  for (const key in styleObj) {
    if (styleObj[key]) {
      const val = `;${key}:${styleObj[key].replace(" !important", "")}`;
      if (flex && (key.includes("flex") && key !== "flex-direction" || key === "align-self" || key.includes("grid") || styleObj[key][0] === "-" || key.includes("width") && val.includes("%"))) {
        node.f += val;
        if (key === "width") {
          attrs.style += ";width:100%";
        }
      } else {
        attrs.style += val;
      }
    }
  }
  attrs.style = attrs.style.substr(1) || void 0;
  for (const key in attrs) {
    if (!attrs[key]) {
      delete attrs[key];
    }
  }
};
Parser$1.prototype.onText = function(text) {
  if (!this.pre) {
    let trim = "";
    let flag;
    for (let i = 0, len = text.length; i < len; i++) {
      if (!blankChar[text[i]]) {
        trim += text[i];
      } else {
        if (trim[trim.length - 1] !== " ") {
          trim += " ";
        }
        if (text[i] === "\n" && !flag) {
          flag = true;
        }
      }
    }
    if (trim === " ") {
      if (flag)
        return;
      else {
        const parent = this.stack[this.stack.length - 1];
        if (parent && parent.name[0] === "t")
          return;
      }
    }
    text = trim;
  }
  const node = /* @__PURE__ */ Object.create(null);
  node.type = "text";
  node.text = decodeEntity(text);
  if (this.hook(node)) {
    if (this.options.selectable === "force" && system.includes("iOS") && !index$2.canIUse("rich-text.user-select")) {
      this.expose();
    }
    const siblings = this.stack.length ? this.stack[this.stack.length - 1].children : this.nodes;
    siblings.push(node);
  }
};
function Lexer$1(handler) {
  this.handler = handler;
}
Lexer$1.prototype.parse = function(content) {
  this.content = content || "";
  this.i = 0;
  this.start = 0;
  this.state = this.text;
  for (let len = this.content.length; this.i !== -1 && this.i < len; ) {
    this.state();
  }
};
Lexer$1.prototype.checkClose = function(method) {
  const selfClose = this.content[this.i] === "/";
  if (this.content[this.i] === ">" || selfClose && this.content[this.i + 1] === ">") {
    if (method) {
      this.handler[method](this.content.substring(this.start, this.i));
    }
    this.i += selfClose ? 2 : 1;
    this.start = this.i;
    this.handler.onOpenTag(selfClose);
    if (this.handler.tagName === "script") {
      this.i = this.content.indexOf("</", this.i);
      if (this.i !== -1) {
        this.i += 2;
        this.start = this.i;
      }
      this.state = this.endTag;
    } else {
      this.state = this.text;
    }
    return true;
  }
  return false;
};
Lexer$1.prototype.text = function() {
  this.i = this.content.indexOf("<", this.i);
  if (this.i === -1) {
    if (this.start < this.content.length) {
      this.handler.onText(this.content.substring(this.start, this.content.length));
    }
    return;
  }
  const c = this.content[this.i + 1];
  if (c >= "a" && c <= "z" || c >= "A" && c <= "Z") {
    if (this.start !== this.i) {
      this.handler.onText(this.content.substring(this.start, this.i));
    }
    this.start = ++this.i;
    this.state = this.tagName;
  } else if (c === "/" || c === "!" || c === "?") {
    if (this.start !== this.i) {
      this.handler.onText(this.content.substring(this.start, this.i));
    }
    const next = this.content[this.i + 2];
    if (c === "/" && (next >= "a" && next <= "z" || next >= "A" && next <= "Z")) {
      this.i += 2;
      this.start = this.i;
      this.state = this.endTag;
      return;
    }
    let end = "-->";
    if (c !== "!" || this.content[this.i + 2] !== "-" || this.content[this.i + 3] !== "-") {
      end = ">";
    }
    this.i = this.content.indexOf(end, this.i);
    if (this.i !== -1) {
      this.i += end.length;
      this.start = this.i;
    }
  } else {
    this.i++;
  }
};
Lexer$1.prototype.tagName = function() {
  if (blankChar[this.content[this.i]]) {
    this.handler.onTagName(this.content.substring(this.start, this.i));
    while (blankChar[this.content[++this.i]])
      ;
    if (this.i < this.content.length && !this.checkClose()) {
      this.start = this.i;
      this.state = this.attrName;
    }
  } else if (!this.checkClose("onTagName")) {
    this.i++;
  }
};
Lexer$1.prototype.attrName = function() {
  let c = this.content[this.i];
  if (blankChar[c] || c === "=") {
    this.handler.onAttrName(this.content.substring(this.start, this.i));
    let needVal = c === "=";
    const len = this.content.length;
    while (++this.i < len) {
      c = this.content[this.i];
      if (!blankChar[c]) {
        if (this.checkClose())
          return;
        if (needVal) {
          this.start = this.i;
          this.state = this.attrVal;
          return;
        }
        if (this.content[this.i] === "=") {
          needVal = true;
        } else {
          this.start = this.i;
          this.state = this.attrName;
          return;
        }
      }
    }
  } else if (!this.checkClose("onAttrName")) {
    this.i++;
  }
};
Lexer$1.prototype.attrVal = function() {
  const c = this.content[this.i];
  const len = this.content.length;
  if (c === '"' || c === "'") {
    this.start = ++this.i;
    this.i = this.content.indexOf(c, this.i);
    if (this.i === -1)
      return;
    this.handler.onAttrVal(this.content.substring(this.start, this.i));
  } else {
    for (; this.i < len; this.i++) {
      if (blankChar[this.content[this.i]]) {
        this.handler.onAttrVal(this.content.substring(this.start, this.i));
        break;
      } else if (this.checkClose("onAttrVal"))
        return;
    }
  }
  while (blankChar[this.content[++this.i]])
    ;
  if (this.i < len && !this.checkClose()) {
    this.start = this.i;
    this.state = this.attrName;
  }
};
Lexer$1.prototype.endTag = function() {
  const c = this.content[this.i];
  if (blankChar[c] || c === ">" || c === "/") {
    this.handler.onCloseTag(this.content.substring(this.start, this.i));
    if (c !== ">") {
      this.i = this.content.indexOf(">", this.i);
      if (this.i === -1)
        return;
    }
    this.start = ++this.i;
    this.state = this.text;
  } else {
    this.i++;
  }
};
/*!
 * marked - a markdown parser
 * Copyright (c) 2011-2020, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */
function t() {
  function i(e3, t3) {
    for (var n3 = 0; n3 < t3.length; n3++) {
      var r2 = t3[n3];
      r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e3, r2.key, r2);
    }
  }
  function s2(e3, t3) {
    (null == t3 || t3 > e3.length) && (t3 = e3.length);
    for (var n3 = 0, r2 = new Array(t3); n3 < t3; n3++)
      r2[n3] = e3[n3];
    return r2;
  }
  function p2(e3, t3) {
    var n3;
    if ("undefined" != typeof Symbol && null != e3[Symbol.iterator])
      return (n3 = e3[Symbol.iterator]()).next.bind(n3);
    if (Array.isArray(e3) || (n3 = function(e4, t4) {
      if (e4) {
        if ("string" == typeof e4)
          return s2(e4, t4);
        var n4 = Object.prototype.toString.call(e4).slice(8, -1);
        return "Object" === n4 && e4.constructor && (n4 = e4.constructor.name), "Map" === n4 || "Set" === n4 ? Array.from(e4) : "Arguments" === n4 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n4) ? s2(e4, t4) : void 0;
      }
    }(e3)) || t3) {
      n3 && (e3 = n3);
      var r2 = 0;
      return function() {
        return r2 >= e3.length ? { done: true } : { done: false, value: e3[r2++] };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function n2(e3) {
    return c[e3];
  }
  var e2, t2 = (function(t3) {
    function e3() {
      return { baseUrl: null, breaks: false, gfm: true, headerIds: true, headerPrefix: "", highlight: null, langPrefix: "language-", mangle: true, pedantic: false, renderer: null, sanitize: false, sanitizer: null, silent: false, smartLists: false, smartypants: false, tokenizer: null, walkTokens: null, xhtml: false };
    }
    t3.exports = { defaults: e3(), getDefaults: e3, changeDefaults: function(e4) {
      t3.exports.defaults = e4;
    } };
  }(e2 = { exports: {} }), e2.exports), r = (t2.defaults, t2.getDefaults, t2.changeDefaults, /[&<>"']/), l = /[&<>"']/g, a = /[<>"']|&(?!#?\w+;)/, o2 = /[<>"']|&(?!#?\w+;)/g, c = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  var u = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
  function h(e3) {
    return e3.replace(u, function(e4, t3) {
      return "colon" === (t3 = t3.toLowerCase()) ? ":" : "#" === t3.charAt(0) ? "x" === t3.charAt(1) ? String.fromCharCode(parseInt(t3.substring(2), 16)) : String.fromCharCode(+t3.substring(1)) : "";
    });
  }
  var g = /(^|[^\[])\^/g;
  var f2 = /[^\w:]/g, d = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
  var k = {}, b = /^[^:]+:\/*[^/]*$/, m = /^([^:]+:)[\s\S]*$/, x = /^([^:]+:\/*[^/]*)[\s\S]*$/;
  function w(e3, t3) {
    k[" " + e3] || (b.test(e3) ? k[" " + e3] = e3 + "/" : k[" " + e3] = v(e3, "/", true));
    var n3 = -1 === (e3 = k[" " + e3]).indexOf(":");
    return "//" === t3.substring(0, 2) ? n3 ? t3 : e3.replace(m, "$1") + t3 : "/" === t3.charAt(0) ? n3 ? t3 : e3.replace(x, "$1") + t3 : e3 + t3;
  }
  function v(e3, t3, n3) {
    var r2 = e3.length;
    if (0 === r2)
      return "";
    for (var i2 = 0; i2 < r2; ) {
      var s3 = e3.charAt(r2 - i2 - 1);
      if (s3 !== t3 || n3) {
        if (s3 === t3 || !n3)
          break;
        i2++;
      } else
        i2++;
    }
    return e3.substr(0, r2 - i2);
  }
  var _ = function(e3, t3) {
    if (t3) {
      if (r.test(e3))
        return e3.replace(l, n2);
    } else if (a.test(e3))
      return e3.replace(o2, n2);
    return e3;
  }, y = h, z = function(n3, e3) {
    n3 = n3.source || n3, e3 = e3 || "";
    var r2 = { replace: function(e4, t3) {
      return t3 = (t3 = t3.source || t3).replace(g, "$1"), n3 = n3.replace(e4, t3), r2;
    }, getRegex: function() {
      return new RegExp(n3, e3);
    } };
    return r2;
  }, S = function(e3, t3, n3) {
    if (e3) {
      var r2;
      try {
        r2 = decodeURIComponent(h(n3)).replace(f2, "").toLowerCase();
      } catch (e4) {
        return null;
      }
      if (0 === r2.indexOf("javascript:") || 0 === r2.indexOf("vbscript:") || 0 === r2.indexOf("data:"))
        return null;
    }
    t3 && !d.test(n3) && (n3 = w(t3, n3));
    try {
      n3 = encodeURI(n3).replace(/%25/g, "%");
    } catch (e4) {
      return null;
    }
    return n3;
  }, $ = { exec: function() {
  } }, A = function(e3) {
    for (var t3, n3, r2 = 1; r2 < arguments.length; r2++)
      for (n3 in t3 = arguments[r2])
        Object.prototype.hasOwnProperty.call(t3, n3) && (e3[n3] = t3[n3]);
    return e3;
  }, R = function(e3, t3) {
    var n3 = e3.replace(/\|/g, function(e4, t4, n4) {
      for (var r3 = false, i2 = t4; 0 <= --i2 && "\\" === n4[i2]; )
        r3 = !r3;
      return r3 ? "|" : " |";
    }).split(/ \|/), r2 = 0;
    if (n3.length > t3)
      n3.splice(t3);
    else
      for (; n3.length < t3; )
        n3.push("");
    for (; r2 < n3.length; r2++)
      n3[r2] = n3[r2].trim().replace(/\\\|/g, "|");
    return n3;
  }, T = function(e3, t3) {
    if (-1 === e3.indexOf(t3[1]))
      return -1;
    for (var n3 = e3.length, r2 = 0, i2 = 0; i2 < n3; i2++)
      if ("\\" === e3[i2])
        i2++;
      else if (e3[i2] === t3[0])
        r2++;
      else if (e3[i2] === t3[1] && --r2 < 0)
        return i2;
    return -1;
  }, I = function(e3) {
    e3 && e3.sanitize && !e3.silent && console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
  }, Z = function(e3, t3) {
    if (t3 < 1)
      return "";
    for (var n3 = ""; 1 < t3; )
      1 & t3 && (n3 += e3), t3 >>= 1, e3 += e3;
    return n3 + e3;
  }, q = t2.defaults, O = v, C = R, U = _, j = T;
  function E2(e3, t3, n3) {
    var r2 = t3.href, i2 = t3.title ? U(t3.title) : null, t3 = e3[1].replace(/\\([\[\]])/g, "$1");
    return "!" !== e3[0].charAt(0) ? { type: "link", raw: n3, href: r2, title: i2, text: t3 } : { type: "image", raw: n3, href: r2, title: i2, text: U(t3) };
  }
  var D = function() {
    function e3(e4) {
      this.options = e4 || q;
    }
    var t3 = e3.prototype;
    return t3.space = function(e4) {
      e4 = this.rules.block.newline.exec(e4);
      if (e4)
        return 1 < e4[0].length ? { type: "space", raw: e4[0] } : { raw: "\n" };
    }, t3.code = function(e4, t4) {
      e4 = this.rules.block.code.exec(e4);
      if (e4) {
        t4 = t4[t4.length - 1];
        if (t4 && "paragraph" === t4.type)
          return { raw: e4[0], text: e4[0].trimRight() };
        t4 = e4[0].replace(/^ {4}/gm, "");
        return { type: "code", raw: e4[0], codeBlockStyle: "indented", text: this.options.pedantic ? t4 : O(t4, "\n") };
      }
    }, t3.fences = function(e4) {
      var t4 = this.rules.block.fences.exec(e4);
      if (t4) {
        var n3 = t4[0], e4 = function(e5, t5) {
          if (null === (e5 = e5.match(/^(\s+)(?:```)/)))
            return t5;
          var n4 = e5[1];
          return t5.split("\n").map(function(e6) {
            var t6 = e6.match(/^\s+/);
            return null !== t6 && t6[0].length >= n4.length ? e6.slice(n4.length) : e6;
          }).join("\n");
        }(n3, t4[3] || "");
        return { type: "code", raw: n3, lang: t4[2] && t4[2].trim(), text: e4 };
      }
    }, t3.heading = function(e4) {
      e4 = this.rules.block.heading.exec(e4);
      if (e4)
        return { type: "heading", raw: e4[0], depth: e4[1].length, text: e4[2] };
    }, t3.nptable = function(e4) {
      e4 = this.rules.block.nptable.exec(e4);
      if (e4) {
        var t4 = { type: "table", header: C(e4[1].replace(/^ *| *\| *$/g, "")), align: e4[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: e4[3] ? e4[3].replace(/\n$/, "").split("\n") : [], raw: e4[0] };
        if (t4.header.length === t4.align.length) {
          for (var n3 = t4.align.length, r2 = 0; r2 < n3; r2++)
            /^ *-+: *$/.test(t4.align[r2]) ? t4.align[r2] = "right" : /^ *:-+: *$/.test(t4.align[r2]) ? t4.align[r2] = "center" : /^ *:-+ *$/.test(t4.align[r2]) ? t4.align[r2] = "left" : t4.align[r2] = null;
          for (n3 = t4.cells.length, r2 = 0; r2 < n3; r2++)
            t4.cells[r2] = C(t4.cells[r2], t4.header.length);
          return t4;
        }
      }
    }, t3.hr = function(e4) {
      e4 = this.rules.block.hr.exec(e4);
      if (e4)
        return { type: "hr", raw: e4[0] };
    }, t3.blockquote = function(e4) {
      var t4 = this.rules.block.blockquote.exec(e4);
      if (t4) {
        e4 = t4[0].replace(/^ *> ?/gm, "");
        return { type: "blockquote", raw: t4[0], text: e4 };
      }
    }, t3.list = function(e4) {
      e4 = this.rules.block.list.exec(e4);
      if (e4) {
        for (var t4, n3, r2, i2, s3, l2 = e4[0], a2 = e4[2], o3 = 1 < a2.length, c2 = { type: "list", raw: l2, ordered: o3, start: o3 ? +a2.slice(0, -1) : "", loose: false, items: [] }, u2 = e4[0].match(this.rules.block.item), p3 = false, h2 = u2.length, g2 = this.rules.block.listItemStart.exec(u2[0]), f3 = 0; f3 < h2; f3++) {
          if (l2 = t4 = u2[f3], f3 !== h2 - 1) {
            if ((r2 = this.rules.block.listItemStart.exec(u2[f3 + 1]))[1].length > g2[0].length || 3 < r2[1].length) {
              u2.splice(f3, 2, u2[f3] + "\n" + u2[f3 + 1]), f3--, h2--;
              continue;
            }
            (!this.options.pedantic || this.options.smartLists ? r2[2][r2[2].length - 1] !== a2[a2.length - 1] : o3 == (1 === r2[2].length)) && (n3 = u2.slice(f3 + 1).join("\n"), c2.raw = c2.raw.substring(0, c2.raw.length - n3.length), f3 = h2 - 1), g2 = r2;
          }
          r2 = t4.length, ~(t4 = t4.replace(/^ *([*+-]|\d+[.)]) ?/, "")).indexOf("\n ") && (r2 -= t4.length, t4 = this.options.pedantic ? t4.replace(/^ {1,4}/gm, "") : t4.replace(new RegExp("^ {1," + r2 + "}", "gm"), "")), r2 = p3 || /\n\n(?!\s*$)/.test(t4), f3 !== h2 - 1 && (p3 = "\n" === t4.charAt(t4.length - 1), r2 = r2 || p3), r2 && (c2.loose = true), this.options.gfm && (s3 = void 0, (i2 = /^\[[ xX]\] /.test(t4)) && (s3 = " " !== t4[1], t4 = t4.replace(/^\[[ xX]\] +/, ""))), c2.items.push({ type: "list_item", raw: l2, task: i2, checked: s3, loose: r2, text: t4 });
        }
        return c2;
      }
    }, t3.html = function(e4) {
      e4 = this.rules.block.html.exec(e4);
      if (e4)
        return { type: this.options.sanitize ? "paragraph" : "html", raw: e4[0], pre: !this.options.sanitizer && ("pre" === e4[1] || "script" === e4[1] || "style" === e4[1]), text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e4[0]) : U(e4[0]) : e4[0] };
    }, t3.def = function(e4) {
      e4 = this.rules.block.def.exec(e4);
      if (e4)
        return e4[3] && (e4[3] = e4[3].substring(1, e4[3].length - 1)), { tag: e4[1].toLowerCase().replace(/\s+/g, " "), raw: e4[0], href: e4[2], title: e4[3] };
    }, t3.table = function(e4) {
      e4 = this.rules.block.table.exec(e4);
      if (e4) {
        var t4 = { type: "table", header: C(e4[1].replace(/^ *| *\| *$/g, "")), align: e4[2].replace(/^ *|\| *$/g, "").split(/ *\| */), cells: e4[3] ? e4[3].replace(/\n$/, "").split("\n") : [] };
        if (t4.header.length === t4.align.length) {
          t4.raw = e4[0];
          for (var n3 = t4.align.length, r2 = 0; r2 < n3; r2++)
            /^ *-+: *$/.test(t4.align[r2]) ? t4.align[r2] = "right" : /^ *:-+: *$/.test(t4.align[r2]) ? t4.align[r2] = "center" : /^ *:-+ *$/.test(t4.align[r2]) ? t4.align[r2] = "left" : t4.align[r2] = null;
          for (n3 = t4.cells.length, r2 = 0; r2 < n3; r2++)
            t4.cells[r2] = C(t4.cells[r2].replace(/^ *\| *| *\| *$/g, ""), t4.header.length);
          return t4;
        }
      }
    }, t3.lheading = function(e4) {
      e4 = this.rules.block.lheading.exec(e4);
      if (e4)
        return { type: "heading", raw: e4[0], depth: "=" === e4[2].charAt(0) ? 1 : 2, text: e4[1] };
    }, t3.paragraph = function(e4) {
      e4 = this.rules.block.paragraph.exec(e4);
      if (e4)
        return { type: "paragraph", raw: e4[0], text: "\n" === e4[1].charAt(e4[1].length - 1) ? e4[1].slice(0, -1) : e4[1] };
    }, t3.text = function(e4, t4) {
      e4 = this.rules.block.text.exec(e4);
      if (e4) {
        t4 = t4[t4.length - 1];
        return t4 && "text" === t4.type ? { raw: e4[0], text: e4[0] } : { type: "text", raw: e4[0], text: e4[0] };
      }
    }, t3.escape = function(e4) {
      e4 = this.rules.inline.escape.exec(e4);
      if (e4)
        return { type: "escape", raw: e4[0], text: U(e4[1]) };
    }, t3.tag = function(e4, t4, n3) {
      e4 = this.rules.inline.tag.exec(e4);
      if (e4)
        return !t4 && /^<a /i.test(e4[0]) ? t4 = true : t4 && /^<\/a>/i.test(e4[0]) && (t4 = false), !n3 && /^<(pre|code|kbd|script)(\s|>)/i.test(e4[0]) ? n3 = true : n3 && /^<\/(pre|code|kbd|script)(\s|>)/i.test(e4[0]) && (n3 = false), { type: this.options.sanitize ? "text" : "html", raw: e4[0], inLink: t4, inRawBlock: n3, text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e4[0]) : U(e4[0]) : e4[0] };
    }, t3.link = function(e4) {
      var t4 = this.rules.inline.link.exec(e4);
      if (t4) {
        e4 = j(t4[2], "()");
        -1 < e4 && (r2 = (0 === t4[0].indexOf("!") ? 5 : 4) + t4[1].length + e4, t4[2] = t4[2].substring(0, e4), t4[0] = t4[0].substring(0, r2).trim(), t4[3] = "");
        var n3, e4 = t4[2], r2 = "";
        return r2 = this.options.pedantic ? (n3 = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(e4), n3 ? (e4 = n3[1], n3[3]) : "") : t4[3] ? t4[3].slice(1, -1) : "", E2(t4, { href: (e4 = e4.trim().replace(/^<([\s\S]*)>$/, "$1")) && e4.replace(this.rules.inline._escapes, "$1"), title: r2 && r2.replace(this.rules.inline._escapes, "$1") }, t4[0]);
      }
    }, t3.reflink = function(e4, t4) {
      if ((n3 = this.rules.inline.reflink.exec(e4)) || (n3 = this.rules.inline.nolink.exec(e4))) {
        e4 = (n3[2] || n3[1]).replace(/\s+/g, " ");
        if ((e4 = t4[e4.toLowerCase()]) && e4.href)
          return E2(n3, e4, n3[0]);
        var n3 = n3[0].charAt(0);
        return { type: "text", raw: n3, text: n3 };
      }
    }, t3.strong = function(e4, t4, n3) {
      void 0 === n3 && (n3 = "");
      var r2 = this.rules.inline.strong.start.exec(e4);
      if (r2 && (!r2[1] || r2[1] && ("" === n3 || this.rules.inline.punctuation.exec(n3)))) {
        t4 = t4.slice(-1 * e4.length);
        var i2, s3 = "**" === r2[0] ? this.rules.inline.strong.endAst : this.rules.inline.strong.endUnd;
        for (s3.lastIndex = 0; null != (r2 = s3.exec(t4)); )
          if (i2 = this.rules.inline.strong.middle.exec(t4.slice(0, r2.index + 3)))
            return { type: "strong", raw: e4.slice(0, i2[0].length), text: e4.slice(2, i2[0].length - 2) };
      }
    }, t3.em = function(e4, t4, n3) {
      void 0 === n3 && (n3 = "");
      var r2 = this.rules.inline.em.start.exec(e4);
      if (r2 && (!r2[1] || r2[1] && ("" === n3 || this.rules.inline.punctuation.exec(n3)))) {
        t4 = t4.slice(-1 * e4.length);
        var i2, s3 = "*" === r2[0] ? this.rules.inline.em.endAst : this.rules.inline.em.endUnd;
        for (s3.lastIndex = 0; null != (r2 = s3.exec(t4)); )
          if (i2 = this.rules.inline.em.middle.exec(t4.slice(0, r2.index + 2)))
            return { type: "em", raw: e4.slice(0, i2[0].length), text: e4.slice(1, i2[0].length - 1) };
      }
    }, t3.codespan = function(e4) {
      var t4 = this.rules.inline.code.exec(e4);
      if (t4) {
        var n3 = t4[2].replace(/\n/g, " "), r2 = /[^ ]/.test(n3), e4 = n3.startsWith(" ") && n3.endsWith(" ");
        return r2 && e4 && (n3 = n3.substring(1, n3.length - 1)), n3 = U(n3, true), { type: "codespan", raw: t4[0], text: n3 };
      }
    }, t3.br = function(e4) {
      e4 = this.rules.inline.br.exec(e4);
      if (e4)
        return { type: "br", raw: e4[0] };
    }, t3.del = function(e4) {
      e4 = this.rules.inline.del.exec(e4);
      if (e4)
        return { type: "del", raw: e4[0], text: e4[2] };
    }, t3.autolink = function(e4, t4) {
      e4 = this.rules.inline.autolink.exec(e4);
      if (e4) {
        var n3, t4 = "@" === e4[2] ? "mailto:" + (n3 = U(this.options.mangle ? t4(e4[1]) : e4[1])) : n3 = U(e4[1]);
        return { type: "link", raw: e4[0], text: n3, href: t4, tokens: [{ type: "text", raw: n3, text: n3 }] };
      }
    }, t3.url = function(e4, t4) {
      var n3, r2, i2, s3;
      if (n3 = this.rules.inline.url.exec(e4)) {
        if ("@" === n3[2])
          i2 = "mailto:" + (r2 = U(this.options.mangle ? t4(n3[0]) : n3[0]));
        else {
          for (; s3 = n3[0], n3[0] = this.rules.inline._backpedal.exec(n3[0])[0], s3 !== n3[0]; )
            ;
          r2 = U(n3[0]), i2 = "www." === n3[1] ? "http://" + r2 : r2;
        }
        return { type: "link", raw: n3[0], text: r2, href: i2, tokens: [{ type: "text", raw: r2, text: r2 }] };
      }
    }, t3.inlineText = function(e4, t4, n3) {
      e4 = this.rules.inline.text.exec(e4);
      if (e4) {
        n3 = t4 ? this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(e4[0]) : U(e4[0]) : e4[0] : U(this.options.smartypants ? n3(e4[0]) : e4[0]);
        return { type: "text", raw: e4[0], text: n3 };
      }
    }, e3;
  }(), R = $, T = z, $ = A, z = { newline: /^\n+/, code: /^( {4}[^\n]+\n*)+/, fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/, hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/, heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/, blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/, list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/, html: "^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))", def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/, nptable: R, table: R, lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/, _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/, text: /^[^\n]+/, _label: /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/, _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/ };
  z.def = T(z.def).replace("label", z._label).replace("title", z._title).getRegex(), z.bullet = /(?:[*+-]|\d{1,9}[.)])/, z.item = /^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/, z.item = T(z.item, "gm").replace(/bull/g, z.bullet).getRegex(), z.listItemStart = T(/^( *)(bull)/).replace("bull", z.bullet).getRegex(), z.list = T(z.list).replace(/bull/g, z.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + z.def.source + ")").getRegex(), z._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", z._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/, z.html = T(z.html, "i").replace("comment", z._comment).replace("tag", z._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), z.paragraph = T(z._paragraph).replace("hr", z.hr).replace("heading", " {0,3}#{1,6} ").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", z._tag).getRegex(), z.blockquote = T(z.blockquote).replace("paragraph", z.paragraph).getRegex(), z.normal = $({}, z), z.gfm = $({}, z.normal, { nptable: "^ *([^|\\n ].*\\|.*)\\n {0,3}([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)", table: "^ *\\|(.+)\\n {0,3}\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)" }), z.gfm.nptable = T(z.gfm.nptable).replace("hr", z.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", z._tag).getRegex(), z.gfm.table = T(z.gfm.table).replace("hr", z.hr).replace("heading", " {0,3}#{1,6} ").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", z._tag).getRegex(), z.pedantic = $({}, z.normal, { html: T(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", z._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/, fences: R, paragraph: T(z.normal._paragraph).replace("hr", z.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", z.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex() });
  R = { escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/, url: R, tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/, reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/, nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/, reflinkSearch: "reflink|nolink(?!\\()", strong: { start: /^(?:(\*\*(?=[*punctuation]))|\*\*)(?![\s])|__/, middle: /^\*\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*\*$|^__(?![\s])((?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?)__$/, endAst: /[^punctuation\s]\*\*(?!\*)|[punctuation]\*\*(?!\*)(?:(?=[punctuation_\s]|$))/, endUnd: /[^\s]__(?!_)(?:(?=[punctuation*\s])|$)/ }, em: { start: /^(?:(\*(?=[punctuation]))|\*)(?![*\s])|_/, middle: /^\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*$|^_(?![_\s])(?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?_$/, endAst: /[^punctuation\s]\*(?!\*)|[punctuation]\*(?!\*)(?:(?=[punctuation_\s]|$))/, endUnd: /[^\s]_(?!_)(?:(?=[punctuation*\s])|$)/ }, code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, br: /^( {2,}|\\)\n(?!\s*$)/, del: R, text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n)))/, punctuation: /^([\s*punctuation])/, _punctuation: "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~" };
  R.punctuation = T(R.punctuation).replace(/punctuation/g, R._punctuation).getRegex(), R._blockSkip = "\\[[^\\]]*?\\]\\([^\\)]*?\\)|`[^`]*?`|<[^>]*?>", R._overlapSkip = "__[^_]*?__|\\*\\*\\[^\\*\\]*?\\*\\*", R._comment = T(z._comment).replace("(?:-->|$)", "-->").getRegex(), R.em.start = T(R.em.start).replace(/punctuation/g, R._punctuation).getRegex(), R.em.middle = T(R.em.middle).replace(/punctuation/g, R._punctuation).replace(/overlapSkip/g, R._overlapSkip).getRegex(), R.em.endAst = T(R.em.endAst, "g").replace(/punctuation/g, R._punctuation).getRegex(), R.em.endUnd = T(R.em.endUnd, "g").replace(/punctuation/g, R._punctuation).getRegex(), R.strong.start = T(R.strong.start).replace(/punctuation/g, R._punctuation).getRegex(), R.strong.middle = T(R.strong.middle).replace(/punctuation/g, R._punctuation).replace(/overlapSkip/g, R._overlapSkip).getRegex(), R.strong.endAst = T(R.strong.endAst, "g").replace(/punctuation/g, R._punctuation).getRegex(), R.strong.endUnd = T(R.strong.endUnd, "g").replace(/punctuation/g, R._punctuation).getRegex(), R.blockSkip = T(R._blockSkip, "g").getRegex(), R.overlapSkip = T(R._overlapSkip, "g").getRegex(), R._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g, R._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/, R._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/, R.autolink = T(R.autolink).replace("scheme", R._scheme).replace("email", R._email).getRegex(), R._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/, R.tag = T(R.tag).replace("comment", R._comment).replace("attribute", R._attribute).getRegex(), R._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/, R._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/, R._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/, R.link = T(R.link).replace("label", R._label).replace("href", R._href).replace("title", R._title).getRegex(), R.reflink = T(R.reflink).replace("label", R._label).getRegex(), R.reflinkSearch = T(R.reflinkSearch, "g").replace("reflink", R.reflink).replace("nolink", R.nolink).getRegex(), R.normal = $({}, R), R.pedantic = $({}, R.normal, { strong: { start: /^__|\*\*/, middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/, endAst: /\*\*(?!\*)/g, endUnd: /__(?!_)/g }, em: { start: /^_|\*/, middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/, endAst: /\*(?!\*)/g, endUnd: /_(?!_)/g }, link: T(/^!?\[(label)\]\((.*?)\)/).replace("label", R._label).getRegex(), reflink: T(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", R._label).getRegex() }), R.gfm = $({}, R.normal, { escape: T(R.escape).replace("])", "~|])").getRegex(), _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/, url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/ }), R.gfm.url = T(R.gfm.url, "i").replace("email", R.gfm._extended_email).getRegex(), R.breaks = $({}, R.gfm, { br: T(R.br).replace("{2,}", "*").getRegex(), text: T(R.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() });
  var R = { block: z, inline: R }, P = t2.defaults, L = R.block, N = R.inline, B = Z;
  function F(e3) {
    return e3.replace(/---/g, "—").replace(/--/g, "–").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘").replace(/'/g, "’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“").replace(/"/g, "”").replace(/\.{3}/g, "…");
  }
  function M(e3) {
    for (var t3, n3 = "", r2 = e3.length, i2 = 0; i2 < r2; i2++)
      t3 = e3.charCodeAt(i2), 0.5 < Math.random() && (t3 = "x" + t3.toString(16)), n3 += "&#" + t3 + ";";
    return n3;
  }
  var W = function() {
    function n3(e4) {
      this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e4 || P, this.options.tokenizer = this.options.tokenizer || new D(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options;
      e4 = { block: L.normal, inline: N.normal };
      this.options.pedantic ? (e4.block = L.pedantic, e4.inline = N.pedantic) : this.options.gfm && (e4.block = L.gfm, this.options.breaks ? e4.inline = N.breaks : e4.inline = N.gfm), this.tokenizer.rules = e4;
    }
    n3.lex = function(e4, t4) {
      return new n3(t4).lex(e4);
    }, n3.lexInline = function(e4, t4) {
      return new n3(t4).inlineTokens(e4);
    };
    var e3, t3, r2 = n3.prototype;
    return r2.lex = function(e4) {
      return e4 = e4.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    "), this.blockTokens(e4, this.tokens, true), this.inline(this.tokens), this.tokens;
    }, r2.blockTokens = function(e4, t4, n4) {
      var r3, i2, s3, l2;
      for (void 0 === t4 && (t4 = []), void 0 === n4 && (n4 = true), e4 = e4.replace(/^ +$/gm, ""); e4; )
        if (r3 = this.tokenizer.space(e4))
          e4 = e4.substring(r3.raw.length), r3.type && t4.push(r3);
        else if (r3 = this.tokenizer.code(e4, t4))
          e4 = e4.substring(r3.raw.length), r3.type ? t4.push(r3) : ((l2 = t4[t4.length - 1]).raw += "\n" + r3.raw, l2.text += "\n" + r3.text);
        else if (r3 = this.tokenizer.fences(e4))
          e4 = e4.substring(r3.raw.length), t4.push(r3);
        else if (r3 = this.tokenizer.heading(e4))
          e4 = e4.substring(r3.raw.length), t4.push(r3);
        else if (r3 = this.tokenizer.nptable(e4))
          e4 = e4.substring(r3.raw.length), t4.push(r3);
        else if (r3 = this.tokenizer.hr(e4))
          e4 = e4.substring(r3.raw.length), t4.push(r3);
        else if (r3 = this.tokenizer.blockquote(e4))
          e4 = e4.substring(r3.raw.length), r3.tokens = this.blockTokens(r3.text, [], n4), t4.push(r3);
        else if (r3 = this.tokenizer.list(e4)) {
          for (e4 = e4.substring(r3.raw.length), s3 = r3.items.length, i2 = 0; i2 < s3; i2++)
            r3.items[i2].tokens = this.blockTokens(r3.items[i2].text, [], false);
          t4.push(r3);
        } else if (r3 = this.tokenizer.html(e4))
          e4 = e4.substring(r3.raw.length), t4.push(r3);
        else if (n4 && (r3 = this.tokenizer.def(e4)))
          e4 = e4.substring(r3.raw.length), this.tokens.links[r3.tag] || (this.tokens.links[r3.tag] = { href: r3.href, title: r3.title });
        else if (r3 = this.tokenizer.table(e4))
          e4 = e4.substring(r3.raw.length), t4.push(r3);
        else if (r3 = this.tokenizer.lheading(e4))
          e4 = e4.substring(r3.raw.length), t4.push(r3);
        else if (n4 && (r3 = this.tokenizer.paragraph(e4)))
          e4 = e4.substring(r3.raw.length), t4.push(r3);
        else if (r3 = this.tokenizer.text(e4, t4))
          e4 = e4.substring(r3.raw.length), r3.type ? t4.push(r3) : ((l2 = t4[t4.length - 1]).raw += "\n" + r3.raw, l2.text += "\n" + r3.text);
        else if (e4) {
          var a2 = "Infinite loop on byte: " + e4.charCodeAt(0);
          if (this.options.silent) {
            console.error(a2);
            break;
          }
          throw new Error(a2);
        }
      return t4;
    }, r2.inline = function(e4) {
      for (var t4, n4, r3, i2, s3, l2 = e4.length, a2 = 0; a2 < l2; a2++)
        switch ((s3 = e4[a2]).type) {
          case "paragraph":
          case "text":
          case "heading":
            s3.tokens = [], this.inlineTokens(s3.text, s3.tokens);
            break;
          case "table":
            for (s3.tokens = { header: [], cells: [] }, r3 = s3.header.length, t4 = 0; t4 < r3; t4++)
              s3.tokens.header[t4] = [], this.inlineTokens(s3.header[t4], s3.tokens.header[t4]);
            for (r3 = s3.cells.length, t4 = 0; t4 < r3; t4++)
              for (i2 = s3.cells[t4], s3.tokens.cells[t4] = [], n4 = 0; n4 < i2.length; n4++)
                s3.tokens.cells[t4][n4] = [], this.inlineTokens(i2[n4], s3.tokens.cells[t4][n4]);
            break;
          case "blockquote":
            this.inline(s3.tokens);
            break;
          case "list":
            for (r3 = s3.items.length, t4 = 0; t4 < r3; t4++)
              this.inline(s3.items[t4].tokens);
        }
      return e4;
    }, r2.inlineTokens = function(e4, t4, n4, r3) {
      var i2;
      void 0 === t4 && (t4 = []), void 0 === n4 && (n4 = false), void 0 === r3 && (r3 = false);
      var s3, l2, a2, o3 = e4;
      if (this.tokens.links) {
        var c2 = Object.keys(this.tokens.links);
        if (0 < c2.length)
          for (; null != (s3 = this.tokenizer.rules.inline.reflinkSearch.exec(o3)); )
            c2.includes(s3[0].slice(s3[0].lastIndexOf("[") + 1, -1)) && (o3 = o3.slice(0, s3.index) + "[" + B("a", s3[0].length - 2) + "]" + o3.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
      }
      for (; null != (s3 = this.tokenizer.rules.inline.blockSkip.exec(o3)); )
        o3 = o3.slice(0, s3.index) + "[" + B("a", s3[0].length - 2) + "]" + o3.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      for (; e4; )
        if (l2 || (a2 = ""), l2 = false, i2 = this.tokenizer.escape(e4))
          e4 = e4.substring(i2.raw.length), t4.push(i2);
        else if (i2 = this.tokenizer.tag(e4, n4, r3))
          e4 = e4.substring(i2.raw.length), n4 = i2.inLink, r3 = i2.inRawBlock, t4.push(i2);
        else if (i2 = this.tokenizer.link(e4))
          e4 = e4.substring(i2.raw.length), "link" === i2.type && (i2.tokens = this.inlineTokens(i2.text, [], true, r3)), t4.push(i2);
        else if (i2 = this.tokenizer.reflink(e4, this.tokens.links))
          e4 = e4.substring(i2.raw.length), "link" === i2.type && (i2.tokens = this.inlineTokens(i2.text, [], true, r3)), t4.push(i2);
        else if (i2 = this.tokenizer.strong(e4, o3, a2))
          e4 = e4.substring(i2.raw.length), i2.tokens = this.inlineTokens(i2.text, [], n4, r3), t4.push(i2);
        else if (i2 = this.tokenizer.em(e4, o3, a2))
          e4 = e4.substring(i2.raw.length), i2.tokens = this.inlineTokens(i2.text, [], n4, r3), t4.push(i2);
        else if (i2 = this.tokenizer.codespan(e4))
          e4 = e4.substring(i2.raw.length), t4.push(i2);
        else if (i2 = this.tokenizer.br(e4))
          e4 = e4.substring(i2.raw.length), t4.push(i2);
        else if (i2 = this.tokenizer.del(e4))
          e4 = e4.substring(i2.raw.length), i2.tokens = this.inlineTokens(i2.text, [], n4, r3), t4.push(i2);
        else if (i2 = this.tokenizer.autolink(e4, M))
          e4 = e4.substring(i2.raw.length), t4.push(i2);
        else if (n4 || !(i2 = this.tokenizer.url(e4, M))) {
          if (i2 = this.tokenizer.inlineText(e4, r3, F))
            e4 = e4.substring(i2.raw.length), a2 = i2.raw.slice(-1), l2 = true, t4.push(i2);
          else if (e4) {
            var u2 = "Infinite loop on byte: " + e4.charCodeAt(0);
            if (this.options.silent) {
              console.error(u2);
              break;
            }
            throw new Error(u2);
          }
        } else
          e4 = e4.substring(i2.raw.length), t4.push(i2);
      return t4;
    }, e3 = n3, t3 = [{ key: "rules", get: function() {
      return { block: L, inline: N };
    } }], (r2 = null) && i(e3.prototype, r2), t3 && i(e3, t3), n3;
  }(), X = t2.defaults, G = S, V = _, H = function() {
    function e3(e4) {
      this.options = e4 || X;
    }
    var t3 = e3.prototype;
    return t3.code = function(e4, t4, n3) {
      var r2 = (t4 || "").match(/\S*/)[0];
      return !this.options.highlight || null != (t4 = this.options.highlight(e4, r2)) && t4 !== e4 && (n3 = true, e4 = t4), r2 ? '<pre><code class="' + this.options.langPrefix + V(r2, true) + '">' + (n3 ? e4 : V(e4, true)) + "</code></pre>\n" : "<pre><code>" + (n3 ? e4 : V(e4, true)) + "</code></pre>\n";
    }, t3.blockquote = function(e4) {
      return "<blockquote>\n" + e4 + "</blockquote>\n";
    }, t3.html = function(e4) {
      return e4;
    }, t3.heading = function(e4, t4, n3, r2) {
      return this.options.headerIds ? "<h" + t4 + ' id="' + this.options.headerPrefix + r2.slug(n3) + '">' + e4 + "</h" + t4 + ">\n" : "<h" + t4 + ">" + e4 + "</h" + t4 + ">\n";
    }, t3.hr = function() {
      return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
    }, t3.list = function(e4, t4, n3) {
      var r2 = t4 ? "ol" : "ul";
      return "<" + r2 + (t4 && 1 !== n3 ? ' start="' + n3 + '"' : "") + ">\n" + e4 + "</" + r2 + ">\n";
    }, t3.listitem = function(e4) {
      return "<li>" + e4 + "</li>\n";
    }, t3.checkbox = function(e4) {
      return "<input " + (e4 ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
    }, t3.paragraph = function(e4) {
      return "<p>" + e4 + "</p>\n";
    }, t3.table = function(e4, t4) {
      return "<table>\n<thead>\n" + e4 + "</thead>\n" + (t4 = t4 && "<tbody>" + t4 + "</tbody>") + "</table>\n";
    }, t3.tablerow = function(e4) {
      return "<tr>\n" + e4 + "</tr>\n";
    }, t3.tablecell = function(e4, t4) {
      var n3 = t4.header ? "th" : "td";
      return (t4.align ? "<" + n3 + ' align="' + t4.align + '">' : "<" + n3 + ">") + e4 + "</" + n3 + ">\n";
    }, t3.strong = function(e4) {
      return "<strong>" + e4 + "</strong>";
    }, t3.em = function(e4) {
      return "<em>" + e4 + "</em>";
    }, t3.codespan = function(e4) {
      return "<code>" + e4 + "</code>";
    }, t3.br = function() {
      return this.options.xhtml ? "<br/>" : "<br>";
    }, t3.del = function(e4) {
      return "<del>" + e4 + "</del>";
    }, t3.link = function(e4, t4, n3) {
      if (null === (e4 = G(this.options.sanitize, this.options.baseUrl, e4)))
        return n3;
      e4 = '<a href="' + V(e4) + '"';
      return t4 && (e4 += ' title="' + t4 + '"'), e4 += ">" + n3 + "</a>";
    }, t3.image = function(e4, t4, n3) {
      if (null === (e4 = G(this.options.sanitize, this.options.baseUrl, e4)))
        return n3;
      n3 = '<img src="' + e4 + '" alt="' + n3 + '"';
      return t4 && (n3 += ' title="' + t4 + '"'), n3 += this.options.xhtml ? "/>" : ">";
    }, t3.text = function(e4) {
      return e4;
    }, e3;
  }(), J = function() {
    function e3() {
    }
    var t3 = e3.prototype;
    return t3.strong = function(e4) {
      return e4;
    }, t3.em = function(e4) {
      return e4;
    }, t3.codespan = function(e4) {
      return e4;
    }, t3.del = function(e4) {
      return e4;
    }, t3.html = function(e4) {
      return e4;
    }, t3.text = function(e4) {
      return e4;
    }, t3.link = function(e4, t4, n3) {
      return "" + n3;
    }, t3.image = function(e4, t4, n3) {
      return "" + n3;
    }, t3.br = function() {
      return "";
    }, e3;
  }(), K = function() {
    function e3() {
      this.seen = {};
    }
    var t3 = e3.prototype;
    return t3.serialize = function(e4) {
      return e4.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi, "").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
    }, t3.getNextSafeSlug = function(e4, t4) {
      var n3 = e4, r2 = 0;
      if (this.seen.hasOwnProperty(n3))
        for (r2 = this.seen[e4]; n3 = e4 + "-" + ++r2, this.seen.hasOwnProperty(n3); )
          ;
      return t4 || (this.seen[e4] = r2, this.seen[n3] = 0), n3;
    }, t3.slug = function(e4, t4) {
      void 0 === t4 && (t4 = {});
      var n3 = this.serialize(e4);
      return this.getNextSafeSlug(n3, t4.dryrun);
    }, e3;
  }(), Q = t2.defaults, Y = y, ee = function() {
    function n3(e4) {
      this.options = e4 || Q, this.options.renderer = this.options.renderer || new H(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new J(), this.slugger = new K();
    }
    n3.parse = function(e4, t3) {
      return new n3(t3).parse(e4);
    }, n3.parseInline = function(e4, t3) {
      return new n3(t3).parseInline(e4);
    };
    var e3 = n3.prototype;
    return e3.parse = function(e4, t3) {
      void 0 === t3 && (t3 = true);
      for (var n4, r2, i2, s3, l2, a2, o3, c2, u2, p3, h2, g2, f3, d2, k2, b2 = "", m2 = e4.length, x2 = 0; x2 < m2; x2++)
        switch ((c2 = e4[x2]).type) {
          case "space":
            continue;
          case "hr":
            b2 += this.renderer.hr();
            continue;
          case "heading":
            b2 += this.renderer.heading(this.parseInline(c2.tokens), c2.depth, Y(this.parseInline(c2.tokens, this.textRenderer)), this.slugger);
            continue;
          case "code":
            b2 += this.renderer.code(c2.text, c2.lang, c2.escaped);
            continue;
          case "table":
            for (a2 = u2 = "", i2 = c2.header.length, n4 = 0; n4 < i2; n4++)
              a2 += this.renderer.tablecell(this.parseInline(c2.tokens.header[n4]), { header: true, align: c2.align[n4] });
            for (u2 += this.renderer.tablerow(a2), o3 = "", i2 = c2.cells.length, n4 = 0; n4 < i2; n4++) {
              for (a2 = "", s3 = (l2 = c2.tokens.cells[n4]).length, r2 = 0; r2 < s3; r2++)
                a2 += this.renderer.tablecell(this.parseInline(l2[r2]), { header: false, align: c2.align[r2] });
              o3 += this.renderer.tablerow(a2);
            }
            b2 += this.renderer.table(u2, o3);
            continue;
          case "blockquote":
            o3 = this.parse(c2.tokens), b2 += this.renderer.blockquote(o3);
            continue;
          case "list":
            for (u2 = c2.ordered, w2 = c2.start, p3 = c2.loose, i2 = c2.items.length, o3 = "", n4 = 0; n4 < i2; n4++)
              f3 = (g2 = c2.items[n4]).checked, d2 = g2.task, h2 = "", g2.task && (k2 = this.renderer.checkbox(f3), p3 ? 0 < g2.tokens.length && "text" === g2.tokens[0].type ? (g2.tokens[0].text = k2 + " " + g2.tokens[0].text, g2.tokens[0].tokens && 0 < g2.tokens[0].tokens.length && "text" === g2.tokens[0].tokens[0].type && (g2.tokens[0].tokens[0].text = k2 + " " + g2.tokens[0].tokens[0].text)) : g2.tokens.unshift({ type: "text", text: k2 }) : h2 += k2), h2 += this.parse(g2.tokens, p3), o3 += this.renderer.listitem(h2, d2, f3);
            b2 += this.renderer.list(o3, u2, w2);
            continue;
          case "html":
            b2 += this.renderer.html(c2.text);
            continue;
          case "paragraph":
            b2 += this.renderer.paragraph(this.parseInline(c2.tokens));
            continue;
          case "text":
            for (o3 = c2.tokens ? this.parseInline(c2.tokens) : c2.text; x2 + 1 < m2 && "text" === e4[x2 + 1].type; )
              o3 += "\n" + ((c2 = e4[++x2]).tokens ? this.parseInline(c2.tokens) : c2.text);
            b2 += t3 ? this.renderer.paragraph(o3) : o3;
            continue;
          default:
            var w2 = 'Token with "' + c2.type + '" type was not found.';
            if (this.options.silent)
              return void console.error(w2);
            throw new Error(w2);
        }
      return b2;
    }, e3.parseInline = function(e4, t3) {
      t3 = t3 || this.renderer;
      for (var n4, r2 = "", i2 = e4.length, s3 = 0; s3 < i2; s3++)
        switch ((n4 = e4[s3]).type) {
          case "escape":
            r2 += t3.text(n4.text);
            break;
          case "html":
            r2 += t3.html(n4.text);
            break;
          case "link":
            r2 += t3.link(n4.href, n4.title, this.parseInline(n4.tokens, t3));
            break;
          case "image":
            r2 += t3.image(n4.href, n4.title, n4.text);
            break;
          case "strong":
            r2 += t3.strong(this.parseInline(n4.tokens, t3));
            break;
          case "em":
            r2 += t3.em(this.parseInline(n4.tokens, t3));
            break;
          case "codespan":
            r2 += t3.codespan(n4.text);
            break;
          case "br":
            r2 += t3.br();
            break;
          case "del":
            r2 += t3.del(this.parseInline(n4.tokens, t3));
            break;
          case "text":
            r2 += t3.text(n4.text);
            break;
          default:
            var l2 = 'Token with "' + n4.type + '" type was not found.';
            if (this.options.silent)
              return void console.error(l2);
            throw new Error(l2);
        }
      return r2;
    }, n3;
  }(), te = A, ne = I, re = _, _ = t2.getDefaults, ie = t2.changeDefaults, t2 = t2.defaults;
  function se(e3, n3, r2) {
    if (null == e3)
      throw new Error("marked(): input parameter is undefined or null");
    if ("string" != typeof e3)
      throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e3) + ", string expected");
    if ("function" == typeof n3 && (r2 = n3, n3 = null), n3 = te({}, se.defaults, n3 || {}), ne(n3), r2) {
      var i2, s3 = n3.highlight;
      try {
        i2 = W.lex(e3, n3);
      } catch (e4) {
        return r2(e4);
      }
      var l2 = function(t4) {
        var e4;
        if (!t4)
          try {
            e4 = ee.parse(i2, n3);
          } catch (e5) {
            t4 = e5;
          }
        return n3.highlight = s3, t4 ? r2(t4) : r2(null, e4);
      };
      if (!s3 || s3.length < 3)
        return l2();
      if (delete n3.highlight, !i2.length)
        return l2();
      var a2 = 0;
      return se.walkTokens(i2, function(n4) {
        "code" === n4.type && (a2++, setTimeout(function() {
          s3(n4.text, n4.lang, function(e4, t4) {
            return e4 ? l2(e4) : (null != t4 && t4 !== n4.text && (n4.text = t4, n4.escaped = true), void (0 === --a2 && l2()));
          });
        }, 0));
      }), void (0 === a2 && l2());
    }
    try {
      var t3 = W.lex(e3, n3);
      return n3.walkTokens && se.walkTokens(t3, n3.walkTokens), ee.parse(t3, n3);
    } catch (e4) {
      if (e4.message += "\nPlease report this to https://github.com/markedjs/marked.", n3.silent)
        return "<p>An error occurred:</p><pre>" + re(e4.message + "", true) + "</pre>";
      throw e4;
    }
  }
  return se.options = se.setOptions = function(e3) {
    return te(se.defaults, e3), ie(se.defaults), se;
  }, se.getDefaults = _, se.defaults = t2, se.use = function(a2) {
    var t3, n3 = te({}, a2);
    a2.renderer && function() {
      var e3, l2 = se.defaults.renderer || new H();
      for (e3 in a2.renderer)
        !function(i2) {
          var s3 = l2[i2];
          l2[i2] = function() {
            for (var e4 = arguments.length, t4 = new Array(e4), n4 = 0; n4 < e4; n4++)
              t4[n4] = arguments[n4];
            var r2 = a2.renderer[i2].apply(l2, t4);
            return false === r2 && (r2 = s3.apply(l2, t4)), r2;
          };
        }(e3);
      n3.renderer = l2;
    }(), a2.tokenizer && function() {
      var e3, l2 = se.defaults.tokenizer || new D();
      for (e3 in a2.tokenizer)
        !function(i2) {
          var s3 = l2[i2];
          l2[i2] = function() {
            for (var e4 = arguments.length, t4 = new Array(e4), n4 = 0; n4 < e4; n4++)
              t4[n4] = arguments[n4];
            var r2 = a2.tokenizer[i2].apply(l2, t4);
            return false === r2 && (r2 = s3.apply(l2, t4)), r2;
          };
        }(e3);
      n3.tokenizer = l2;
    }(), a2.walkTokens && (t3 = se.defaults.walkTokens, n3.walkTokens = function(e3) {
      a2.walkTokens(e3), t3 && t3(e3);
    }), se.setOptions(n3);
  }, se.walkTokens = function(e3, t3) {
    for (var n3, r2 = p2(e3); !(n3 = r2()).done; ) {
      var i2 = n3.value;
      switch (t3(i2), i2.type) {
        case "table":
          for (var s3 = p2(i2.tokens.header); !(l2 = s3()).done; ) {
            var l2 = l2.value;
            se.walkTokens(l2, t3);
          }
          for (var a2, o3 = p2(i2.tokens.cells); !(a2 = o3()).done; )
            for (var c2 = p2(a2.value); !(u2 = c2()).done; ) {
              var u2 = u2.value;
              se.walkTokens(u2, t3);
            }
          break;
        case "list":
          se.walkTokens(i2.items, t3);
          break;
        default:
          i2.tokens && se.walkTokens(i2.tokens, t3);
      }
    }
  }, se.parseInline = function(e3, t3) {
    if (null == e3)
      throw new Error("marked.parseInline(): input parameter is undefined or null");
    if ("string" != typeof e3)
      throw new Error("marked.parseInline(): input parameter is of type " + Object.prototype.toString.call(e3) + ", string expected");
    t3 = te({}, se.defaults, t3 || {}), ne(t3);
    try {
      var n3 = W.lexInline(e3, t3);
      return t3.walkTokens && se.walkTokens(n3, t3.walkTokens), ee.parseInline(n3, t3);
    } catch (e4) {
      if (e4.message += "\nPlease report this to https://github.com/markedjs/marked.", t3.silent)
        return "<p>An error occurred:</p><pre>" + re(e4.message + "", true) + "</pre>";
      throw e4;
    }
  }, se.Parser = ee, se.parser = ee.parse, se.Renderer = H, se.TextRenderer = J, se.Lexer = W, se.lexer = W.lex, se.Tokenizer = D, se.Slugger = K, se.parse = se;
}
const marked = t();
let index$1 = 0;
function Markdown(vm) {
  this.vm = vm;
  vm._ids = {};
}
Markdown.prototype.onUpdate = function(content) {
  if (this.vm.markdown) {
    return marked(content);
  }
};
Markdown.prototype.onParse = function(node, vm) {
  if (vm.options.markdown) {
    if (vm.options.useAnchor && node.attrs && /[\u4e00-\u9fa5]/.test(node.attrs.id)) {
      const id = "t" + index$1++;
      this.vm._ids[node.attrs.id] = id;
      node.attrs.id = id;
    }
    if (node.name === "p" || node.name === "table" || node.name === "tr" || node.name === "th" || node.name === "td" || node.name === "blockquote" || node.name === "pre" || node.name === "code") {
      node.attrs.class = `md-${node.name} ${node.attrs.class || ""}`;
    }
  }
};
const ctx = {};
const context = {
  get: (id) => ctx[id],
  set: (id, vm) => {
    ctx[id] = vm;
  },
  remove: (id) => {
    ctx[id] = void 0;
  }
};
let index = 0;
function Audio(vm) {
  this.vm = vm;
}
Audio.prototype.onUpdate = function() {
  this.audios = [];
};
Audio.prototype.onParse = function(node) {
  if (node.name === "audio") {
    if (!node.attrs.id) {
      node.attrs.id = "a" + index++;
    }
    this.audios.push(node.attrs.id);
  }
};
Audio.prototype.onLoad = function() {
  setTimeout(() => {
    for (let i = 0; i < this.audios.length; i++) {
      const ctx2 = context.get(this.audios[i]);
      ctx2.id = this.audios[i];
      this.vm._videos.push(ctx2);
    }
  }, 500);
};
const reg = /\[(\S+?)\]/g;
const data = {
  笑脸: "😄",
  生病: "😷",
  破涕为笑: "😂",
  吐舌: "😝",
  脸红: "😳",
  恐惧: "😱",
  失望: "😔",
  无语: "😒",
  眨眼: "😉",
  酷: "😎",
  哭: "😭",
  痴迷: "😍",
  吻: "😘",
  思考: "🤔",
  困惑: "😕",
  颠倒: "🙃",
  钱: "🤑",
  惊讶: "😲",
  白眼: "🙄",
  叹气: "😤",
  睡觉: "😴",
  书呆子: "🤓",
  愤怒: "😡",
  面无表情: "😑",
  张嘴: "😮",
  量体温: "🤒",
  呕吐: "🤮",
  光环: "😇",
  幽灵: "👻",
  外星人: "👽",
  机器人: "🤖",
  捂眼镜: "🙈",
  捂耳朵: "🙉",
  捂嘴: "🙊",
  婴儿: "👶",
  男孩: "👦",
  女孩: "👧",
  男人: "👨",
  女人: "👩",
  老人: "👴",
  老妇人: "👵",
  警察: "👮",
  王子: "🤴",
  公主: "🤴",
  举手: "🙋",
  跑步: "🏃",
  家庭: "👪",
  眼睛: "👀",
  鼻子: "👃",
  耳朵: "👂",
  舌头: "👅",
  嘴: "👄",
  心: "❤️",
  心碎: "💔",
  雪人: "☃️",
  情书: "💌",
  大便: "💩",
  闹钟: "⏰",
  眼镜: "👓",
  雨伞: "☂️",
  音乐: "🎵",
  话筒: "🎤",
  游戏机: "🎮",
  喇叭: "📢",
  耳机: "🎧",
  礼物: "🎁",
  电话: "📞",
  电脑: "💻",
  打印机: "🖨️",
  手电筒: "🔦",
  灯泡: "💡",
  书本: "📖",
  信封: "✉️",
  药丸: "💊",
  口红: "💄",
  手机: "📱",
  相机: "📷",
  电视: "📺",
  中: "🀄",
  垃圾桶: "🚮",
  厕所: "🚾",
  感叹号: "❗",
  禁: "🈲",
  可: "🉑",
  彩虹: "🌈",
  旋风: "🌀",
  雷电: "⚡",
  雪花: "❄️",
  星星: "⭐",
  水滴: "💧",
  玫瑰: "🌹",
  加油: "💪",
  左: "👈",
  右: "👉",
  上: "👆",
  下: "👇",
  手掌: "🖐️",
  好的: "👌",
  好: "👍",
  差: "👎",
  胜利: "✌",
  拳头: "👊",
  挥手: "👋",
  鼓掌: "👏",
  猴子: "🐒",
  狗: "🐶",
  狼: "🐺",
  猫: "🐱",
  老虎: "🐯",
  马: "🐎",
  独角兽: "🦄",
  斑马: "🦓",
  鹿: "🦌",
  牛: "🐮",
  猪: "🐷",
  羊: "🐏",
  长颈鹿: "🦒",
  大象: "🐘",
  老鼠: "🐭",
  蝙蝠: "🦇",
  刺猬: "🦔",
  熊猫: "🐼",
  鸽子: "🕊️",
  鸭子: "🦆",
  兔子: "🐇",
  老鹰: "🦅",
  青蛙: "🐸",
  蛇: "🐍",
  龙: "🐉",
  鲸鱼: "🐳",
  海豚: "🐬",
  足球: "⚽",
  棒球: "⚾",
  篮球: "🏀",
  排球: "🏐",
  橄榄球: "🏉",
  网球: "🎾",
  骰子: "🎲",
  鸡腿: "🍗",
  蛋糕: "🎂",
  啤酒: "🍺",
  饺子: "🥟",
  汉堡: "🍔",
  薯条: "🍟",
  意大利面: "🍝",
  干杯: "🥂",
  筷子: "🥢",
  糖果: "🍬",
  奶瓶: "🍼",
  爆米花: "🍿",
  邮局: "🏤",
  医院: "🏥",
  银行: "🏦",
  酒店: "🏨",
  学校: "🏫",
  城堡: "🏰",
  火车: "🚂",
  高铁: "🚄",
  地铁: "🚇",
  公交: "🚌",
  救护车: "🚑",
  消防车: "🚒",
  警车: "🚓",
  出租车: "🚕",
  汽车: "🚗",
  货车: "🚛",
  自行车: "🚲",
  摩托: "🛵",
  红绿灯: "🚥",
  帆船: "⛵",
  游轮: "🛳️",
  轮船: "⛴️",
  飞机: "✈️",
  直升机: "🚁",
  缆车: "🚠",
  警告: "⚠️",
  禁止: "⛔"
};
function Emoji() {
}
Emoji.prototype.onUpdate = function(content) {
  return content.replace(reg, ($, $1) => {
    if (data[$1])
      return data[$1];
    return $;
  });
};
Emoji.prototype.onGetContent = function(content) {
  for (const item in data) {
    content = content.replace(new RegExp(data[item], "g"), "[" + item + "]");
  }
  return content;
};
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {}, Prism = function(e2) {
  var n2 = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, t2 = 0, r = {}, a = { manual: e2.Prism && e2.Prism.manual, disableWorkerMessageHandler: e2.Prism && e2.Prism.disableWorkerMessageHandler, util: { encode: function e3(n3) {
    return n3 instanceof i ? new i(n3.type, e3(n3.content), n3.alias) : Array.isArray(n3) ? n3.map(e3) : n3.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
  }, type: function(e3) {
    return Object.prototype.toString.call(e3).slice(8, -1);
  }, objId: function(e3) {
    return e3.__id || Object.defineProperty(e3, "__id", { value: ++t2 }), e3.__id;
  }, clone: function e3(n3, t3) {
    var r2, i2;
    switch (t3 = t3 || {}, a.util.type(n3)) {
      case "Object":
        if (i2 = a.util.objId(n3), t3[i2])
          return t3[i2];
        for (var l2 in r2 = {}, t3[i2] = r2, n3)
          n3.hasOwnProperty(l2) && (r2[l2] = e3(n3[l2], t3));
        return r2;
      case "Array":
        return i2 = a.util.objId(n3), t3[i2] ? t3[i2] : (r2 = [], t3[i2] = r2, n3.forEach(function(n4, a2) {
          r2[a2] = e3(n4, t3);
        }), r2);
      default:
        return n3;
    }
  }, getLanguage: function(e3) {
    for (; e3; ) {
      var t3 = n2.exec(e3.className);
      if (t3)
        return t3[1].toLowerCase();
      e3 = e3.parentElement;
    }
    return "none";
  }, setLanguage: function(e3, t3) {
    e3.className = e3.className.replace(RegExp(n2, "gi"), ""), e3.classList.add("language-" + t3);
  }, currentScript: function() {
    if ("undefined" == typeof document)
      return null;
    if ("currentScript" in document)
      return document.currentScript;
    try {
      throw new Error();
    } catch (r2) {
      var e3 = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r2.stack) || [])[1];
      if (e3) {
        var n3 = document.getElementsByTagName("script");
        for (var t3 in n3)
          if (n3[t3].src == e3)
            return n3[t3];
      }
      return null;
    }
  }, isActive: function(e3, n3, t3) {
    for (var r2 = "no-" + n3; e3; ) {
      var a2 = e3.classList;
      if (a2.contains(n3))
        return true;
      if (a2.contains(r2))
        return false;
      e3 = e3.parentElement;
    }
    return !!t3;
  } }, languages: { plain: r, plaintext: r, text: r, txt: r, extend: function(e3, n3) {
    var t3 = a.util.clone(a.languages[e3]);
    for (var r2 in n3)
      t3[r2] = n3[r2];
    return t3;
  }, insertBefore: function(e3, n3, t3, r2) {
    var i2 = (r2 = r2 || a.languages)[e3], l2 = {};
    for (var o3 in i2)
      if (i2.hasOwnProperty(o3)) {
        if (o3 == n3)
          for (var s3 in t3)
            t3.hasOwnProperty(s3) && (l2[s3] = t3[s3]);
        t3.hasOwnProperty(o3) || (l2[o3] = i2[o3]);
      }
    var u2 = r2[e3];
    return r2[e3] = l2, a.languages.DFS(a.languages, function(n4, t4) {
      t4 === u2 && n4 != e3 && (this[n4] = l2);
    }), l2;
  }, DFS: function e3(n3, t3, r2, i2) {
    i2 = i2 || {};
    var l2 = a.util.objId;
    for (var o3 in n3)
      if (n3.hasOwnProperty(o3)) {
        t3.call(n3, o3, n3[o3], r2 || o3);
        var s3 = n3[o3], u2 = a.util.type(s3);
        "Object" !== u2 || i2[l2(s3)] ? "Array" !== u2 || i2[l2(s3)] || (i2[l2(s3)] = true, e3(s3, t3, o3, i2)) : (i2[l2(s3)] = true, e3(s3, t3, null, i2));
      }
  } }, plugins: {}, highlightAll: function(e3, n3) {
    a.highlightAllUnder(document, e3, n3);
  }, highlightAllUnder: function(e3, n3, t3) {
    var r2 = { callback: t3, container: e3, selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code' };
    a.hooks.run("before-highlightall", r2), r2.elements = Array.prototype.slice.apply(r2.container.querySelectorAll(r2.selector)), a.hooks.run("before-all-elements-highlight", r2);
    for (var i2, l2 = 0; i2 = r2.elements[l2++]; )
      a.highlightElement(i2, true === n3, r2.callback);
  }, highlightElement: function(n3, t3, r2) {
    var i2 = a.util.getLanguage(n3), l2 = a.languages[i2];
    a.util.setLanguage(n3, i2);
    var o3 = n3.parentElement;
    o3 && "pre" === o3.nodeName.toLowerCase() && a.util.setLanguage(o3, i2);
    var s3 = { element: n3, language: i2, grammar: l2, code: n3.textContent };
    function u2(e3) {
      s3.highlightedCode = e3, a.hooks.run("before-insert", s3), s3.element.innerHTML = s3.highlightedCode, a.hooks.run("after-highlight", s3), a.hooks.run("complete", s3), r2 && r2.call(s3.element);
    }
    if (a.hooks.run("before-sanity-check", s3), (o3 = s3.element.parentElement) && "pre" === o3.nodeName.toLowerCase() && !o3.hasAttribute("tabindex") && o3.setAttribute("tabindex", "0"), !s3.code)
      return a.hooks.run("complete", s3), void (r2 && r2.call(s3.element));
    if (a.hooks.run("before-highlight", s3), s3.grammar)
      if (t3 && e2.Worker) {
        var c2 = new Worker(a.filename);
        c2.onmessage = function(e3) {
          u2(e3.data);
        }, c2.postMessage(JSON.stringify({ language: s3.language, code: s3.code, immediateClose: true }));
      } else
        u2(a.highlight(s3.code, s3.grammar, s3.language));
    else
      u2(a.util.encode(s3.code));
  }, highlight: function(e3, n3, t3) {
    var r2 = { code: e3, grammar: n3, language: t3 };
    if (a.hooks.run("before-tokenize", r2), !r2.grammar)
      throw new Error('The language "' + r2.language + '" has no grammar.');
    return r2.tokens = a.tokenize(r2.code, r2.grammar), a.hooks.run("after-tokenize", r2), i.stringify(a.util.encode(r2.tokens), r2.language);
  }, tokenize: function(e3, n3) {
    var t3 = n3.rest;
    if (t3) {
      for (var r2 in t3)
        n3[r2] = t3[r2];
      delete n3.rest;
    }
    var a2 = new s2();
    return u(a2, a2.head, e3), o2(e3, a2, n3, a2.head, 0), function(e4) {
      for (var n4 = [], t4 = e4.head.next; t4 !== e4.tail; )
        n4.push(t4.value), t4 = t4.next;
      return n4;
    }(a2);
  }, hooks: { all: {}, add: function(e3, n3) {
    var t3 = a.hooks.all;
    t3[e3] = t3[e3] || [], t3[e3].push(n3);
  }, run: function(e3, n3) {
    var t3 = a.hooks.all[e3];
    if (t3 && t3.length)
      for (var r2, i2 = 0; r2 = t3[i2++]; )
        r2(n3);
  } }, Token: i };
  function i(e3, n3, t3, r2) {
    this.type = e3, this.content = n3, this.alias = t3, this.length = 0 | (r2 || "").length;
  }
  function l(e3, n3, t3, r2) {
    e3.lastIndex = n3;
    var a2 = e3.exec(t3);
    if (a2 && r2 && a2[1]) {
      var i2 = a2[1].length;
      a2.index += i2, a2[0] = a2[0].slice(i2);
    }
    return a2;
  }
  function o2(e3, n3, t3, r2, s3, g2) {
    for (var f3 in t3)
      if (t3.hasOwnProperty(f3) && t3[f3]) {
        var h2 = t3[f3];
        h2 = Array.isArray(h2) ? h2 : [h2];
        for (var d = 0; d < h2.length; ++d) {
          if (g2 && g2.cause == f3 + "," + d)
            return;
          var v = h2[d], p2 = v.inside, m = !!v.lookbehind, y = !!v.greedy, k = v.alias;
          if (y && !v.pattern.global) {
            var x = v.pattern.toString().match(/[imsuy]*$/)[0];
            v.pattern = RegExp(v.pattern.source, x + "g");
          }
          for (var b = v.pattern || v, w = r2.next, A = s3; w !== n3.tail && !(g2 && A >= g2.reach); A += w.value.length, w = w.next) {
            var E2 = w.value;
            if (n3.length > e3.length)
              return;
            if (!(E2 instanceof i)) {
              var P, L = 1;
              if (y) {
                if (!(P = l(b, A, e3, m)) || P.index >= e3.length)
                  break;
                var S = P.index, O = P.index + P[0].length, j = A;
                for (j += w.value.length; S >= j; )
                  j += (w = w.next).value.length;
                if (A = j -= w.value.length, w.value instanceof i)
                  continue;
                for (var C = w; C !== n3.tail && (j < O || "string" == typeof C.value); C = C.next)
                  L++, j += C.value.length;
                L--, E2 = e3.slice(A, j), P.index -= A;
              } else if (!(P = l(b, 0, E2, m)))
                continue;
              S = P.index;
              var N = P[0], _ = E2.slice(0, S), M = E2.slice(S + N.length), W = A + E2.length;
              g2 && W > g2.reach && (g2.reach = W);
              var z = w.prev;
              if (_ && (z = u(n3, z, _), A += _.length), c(n3, z, L), w = u(n3, z, new i(f3, p2 ? a.tokenize(N, p2) : N, k, N)), M && u(n3, w, M), L > 1) {
                var I = { cause: f3 + "," + d, reach: W };
                o2(e3, n3, t3, w.prev, A, I), g2 && I.reach > g2.reach && (g2.reach = I.reach);
              }
            }
          }
        }
      }
  }
  function s2() {
    var e3 = { value: null, prev: null, next: null }, n3 = { value: null, prev: e3, next: null };
    e3.next = n3, this.head = e3, this.tail = n3, this.length = 0;
  }
  function u(e3, n3, t3) {
    var r2 = n3.next, a2 = { value: t3, prev: n3, next: r2 };
    return n3.next = a2, r2.prev = a2, e3.length++, a2;
  }
  function c(e3, n3, t3) {
    for (var r2 = n3.next, a2 = 0; a2 < t3 && r2 !== e3.tail; a2++)
      r2 = r2.next;
    n3.next = r2, r2.prev = n3, e3.length -= a2;
  }
  if (e2.Prism = a, i.stringify = function e3(n3, t3) {
    if ("string" == typeof n3)
      return n3;
    if (Array.isArray(n3)) {
      var r2 = "";
      return n3.forEach(function(n4) {
        r2 += e3(n4, t3);
      }), r2;
    }
    var i2 = { type: n3.type, content: e3(n3.content, t3), tag: "span", classes: ["token", n3.type], attributes: {}, language: t3 }, l2 = n3.alias;
    l2 && (Array.isArray(l2) ? Array.prototype.push.apply(i2.classes, l2) : i2.classes.push(l2)), a.hooks.run("wrap", i2);
    var o3 = "";
    for (var s3 in i2.attributes)
      o3 += " " + s3 + '="' + (i2.attributes[s3] || "").replace(/"/g, "&quot;") + '"';
    return "<" + i2.tag + ' class="' + i2.classes.join(" ") + '"' + o3 + ">" + i2.content + "</" + i2.tag + ">";
  }, !e2.document)
    return e2.addEventListener ? (a.disableWorkerMessageHandler || e2.addEventListener("message", function(n3) {
      var t3 = JSON.parse(n3.data), r2 = t3.language, i2 = t3.code, l2 = t3.immediateClose;
      e2.postMessage(a.highlight(i2, a.languages[r2], r2)), l2 && e2.close();
    }, false), a) : a;
  var g = a.util.currentScript();
  function f2() {
    a.manual || a.highlightAll();
  }
  if (g && (a.filename = g.src, g.hasAttribute("data-manual") && (a.manual = true)), !a.manual) {
    var h = document.readyState;
    "loading" === h || "interactive" === h && g && g.defer ? document.addEventListener("DOMContentLoaded", f2) : window.requestAnimationFrame ? window.requestAnimationFrame(f2) : window.setTimeout(f2, 16);
  }
  return a;
}(_self);
"undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = { comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: true }, prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: true }, doctype: { pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i, greedy: true, inside: { "internal-subset": { pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/, lookbehind: true, greedy: true, inside: null }, string: { pattern: /"[^"]*"|'[^']*'/, greedy: true }, punctuation: /^<!|>$|[[\]]/, "doctype-tag": /^DOCTYPE/i, name: /[^\s<>'"]+/ } }, cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: true }, tag: { pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/, greedy: true, inside: { tag: { pattern: /^<\/?[^\s>\/]+/, inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ } }, "special-attr": [], "attr-value": { pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/, inside: { punctuation: [{ pattern: /^=/, alias: "attr-equals" }, { pattern: /^(\s*)["']|["']$/, lookbehind: true }] } }, punctuation: /\/?>/, "attr-name": { pattern: /[^\s>\/]+/, inside: { namespace: /^[^\s>\/:]+:/ } } } }, entity: [{ pattern: /&[\da-z]{1,8};/i, alias: "named-entity" }, /&#x?[\da-f]{1,8};/i] }, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", function(a) {
  "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"));
}), Object.defineProperty(Prism.languages.markup.tag, "addInlined", { value: function(a, e2) {
  var s2 = {};
  s2["language-" + e2] = { pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i, lookbehind: true, inside: Prism.languages[e2] }, s2.cdata = /^<!\[CDATA\[|\]\]>$/i;
  var t2 = { "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s2 } };
  t2["language-" + e2] = { pattern: /[\s\S]+/, inside: Prism.languages[e2] };
  var n2 = {};
  n2[a] = { pattern: RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function() {
    return a;
  }), "i"), lookbehind: true, greedy: true, inside: t2 }, Prism.languages.insertBefore("markup", "cdata", n2);
} }), Object.defineProperty(Prism.languages.markup.tag, "addAttribute", { value: function(a, e2) {
  Prism.languages.markup.tag.inside["special-attr"].push({ pattern: RegExp(`(^|["'\\s])(?:` + a + `)\\s*=\\s*(?:"[^"]*"|'[^']*'|[^\\s'">=]+(?=[\\s>]))`, "i"), lookbehind: true, inside: { "attr-name": /^[^\s=]+/, "attr-value": { pattern: /=[\s\S]+/, inside: { value: { pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/, lookbehind: true, alias: [e2, "language-" + e2], inside: Prism.languages[e2] }, punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/] } } } });
} }), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml;
!function(s2) {
  var e2 = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  s2.languages.css = { comment: /\/\*[\s\S]*?\*\//, atrule: { pattern: RegExp(`@[\\w-](?:[^;{\\s"']|\\s+(?!\\s)|` + e2.source + ")*?(?:;|(?=\\s*\\{))"), inside: { rule: /^@[\w-]+/, "selector-function-argument": { pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/, lookbehind: true, alias: "selector" }, keyword: { pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/, lookbehind: true } } }, url: { pattern: RegExp("\\burl\\((?:" + e2.source + `|(?:[^\\\\\r
()"']|\\\\[^])*)\\)`, "i"), greedy: true, inside: { function: /^url/i, punctuation: /^\(|\)$/, string: { pattern: RegExp("^" + e2.source + "$"), alias: "url" } } }, selector: { pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + e2.source + ")*(?=\\s*\\{)"), lookbehind: true }, string: { pattern: e2, greedy: true }, property: { pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i, lookbehind: true }, important: /!important\b/i, function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: true }, punctuation: /[(){};:,]/ }, s2.languages.css.atrule.inside.rest = s2.languages.css;
  var t2 = s2.languages.markup;
  t2 && (t2.tag.addInlined("style", "css"), t2.tag.addAttribute("style", "css"));
}(Prism);
Prism.languages.clike = { comment: [{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: true, greedy: true }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: true, greedy: true }], string: { pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/, greedy: true }, "class-name": { pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i, lookbehind: true, inside: { punctuation: /[.\\]/ } }, keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/, boolean: /\b(?:false|true)\b/, function: /\b\w+(?=\()/, number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i, operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/, punctuation: /[{}[\];(),.:]/ };
Prism.languages.javascript = Prism.languages.extend("clike", { "class-name": [Prism.languages.clike["class-name"], { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/, lookbehind: true }], keyword: [{ pattern: /((?:^|\})\s*)catch\b/, lookbehind: true }, { pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/, lookbehind: true }], function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/, number: { pattern: RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"), lookbehind: true }, operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/ }), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", { regex: { pattern: RegExp(`((?:^|[^$\\w\\xA0-\\uFFFF."'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r
]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r
])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r
]|\\\\.|\\[(?:[^[\\]\\\\\r
]|\\\\.|\\[(?:[^[\\]\\\\\r
]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r
])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r
,.;:})\\]]|//))`), lookbehind: true, greedy: true, inside: { "regex-source": { pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/, lookbehind: true, alias: "language-regex", inside: Prism.languages.regex }, "regex-delimiter": /^\/|\/$/, "regex-flags": /^[a-z]+$/ } }, "function-variable": { pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/, alias: "function" }, parameter: [{ pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/, lookbehind: true, inside: Prism.languages.javascript }, { pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i, lookbehind: true, inside: Prism.languages.javascript }, { pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/, lookbehind: true, inside: Prism.languages.javascript }, { pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/, lookbehind: true, inside: Prism.languages.javascript }], constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/ }), Prism.languages.insertBefore("javascript", "string", { hashbang: { pattern: /^#!.*/, greedy: true, alias: "comment" }, "template-string": { pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/, greedy: true, inside: { "template-punctuation": { pattern: /^`|`$/, alias: "string" }, interpolation: { pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/, lookbehind: true, inside: { "interpolation-punctuation": { pattern: /^\$\{|\}$/, alias: "punctuation" }, rest: Prism.languages.javascript } }, string: /[\s\S]+/ } }, "string-property": { pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m, lookbehind: true, greedy: true, alias: "property" } }), Prism.languages.insertBefore("javascript", "operator", { "literal-property": { pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m, lookbehind: true, alias: "property" } }), Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)", "javascript")), Prism.languages.js = Prism.languages.javascript;
!function(e2) {
  var t2 = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b", a = { pattern: /(^(["']?)\w+\2)[ \t]+\S.*/, lookbehind: true, alias: "punctuation", inside: null }, n2 = { bash: a, environment: { pattern: RegExp("\\$" + t2), alias: "constant" }, variable: [{ pattern: /\$?\(\([\s\S]+?\)\)/, greedy: true, inside: { variable: [{ pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: true }, /^\$\(\(/], number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/, operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/, punctuation: /\(\(?|\)\)?|,|;/ } }, { pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/, greedy: true, inside: { variable: /^\$\(|^`|\)$|`$/ } }, { pattern: /\$\{[^}]+\}/, greedy: true, inside: { operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/, punctuation: /[\[\]]/, environment: { pattern: RegExp("(\\{)" + t2), lookbehind: true, alias: "constant" } } }, /\$(?:\w+|[#?*!@$])/], entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/ };
  e2.languages.bash = { shebang: { pattern: /^#!\s*\/.*/, alias: "important" }, comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: true }, "function-name": [{ pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/, lookbehind: true, alias: "function" }, { pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/, alias: "function" }], "for-or-select": { pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/, alias: "variable", lookbehind: true }, "assign-left": { pattern: /(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/, inside: { environment: { pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + t2), lookbehind: true, alias: "constant" } }, alias: "variable", lookbehind: true }, parameter: { pattern: /(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/, alias: "variable", lookbehind: true }, string: [{ pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/, lookbehind: true, greedy: true, inside: n2 }, { pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/, lookbehind: true, greedy: true, inside: { bash: a } }, { pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/, lookbehind: true, greedy: true, inside: n2 }, { pattern: /(^|[^$\\])'[^']*'/, lookbehind: true, greedy: true }, { pattern: /\$'(?:[^'\\]|\\[\s\S])*'/, greedy: true, inside: { entity: n2.entity } }], environment: { pattern: RegExp("\\$?" + t2), alias: "constant" }, variable: n2.variable, function: { pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/, lookbehind: true }, keyword: { pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/, lookbehind: true }, builtin: { pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/, lookbehind: true, alias: "class-name" }, boolean: { pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/, lookbehind: true }, "file-descriptor": { pattern: /\B&\d\b/, alias: "important" }, operator: { pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/, inside: { "file-descriptor": { pattern: /^\d/, alias: "important" } } }, punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/, number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: true } }, a.inside = e2.languages.bash;
  for (var s2 = ["comment", "function-name", "for-or-select", "assign-left", "parameter", "string", "environment", "function", "keyword", "builtin", "boolean", "file-descriptor", "operator", "punctuation", "number"], o2 = n2.variable[1].inside, i = 0; i < s2.length; i++)
    o2[s2[i]] = e2.languages.bash[s2[i]];
  e2.languages.sh = e2.languages.bash, e2.languages.shell = e2.languages.bash;
}(Prism);
!function(e2) {
  var a, n2 = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  e2.languages.css.selector = { pattern: e2.languages.css.selector.pattern, lookbehind: true, inside: a = { "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/, "pseudo-class": /:[-\w]+/, class: /\.[-\w]+/, id: /#[-\w]+/, attribute: { pattern: RegExp(`\\[(?:[^[\\]"']|` + n2.source + ")*\\]"), greedy: true, inside: { punctuation: /^\[|\]$/, "case-sensitivity": { pattern: /(\s)[si]$/i, lookbehind: true, alias: "keyword" }, namespace: { pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/, lookbehind: true, inside: { punctuation: /\|$/ } }, "attr-name": { pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/, lookbehind: true }, "attr-value": [n2, { pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/, lookbehind: true }], operator: /[|~*^$]?=/ } }, "n-th": [{ pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/, lookbehind: true, inside: { number: /[\dn]+/, operator: /[+-]/ } }, { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: true }], combinator: />|\+|~|\|\|/, punctuation: /[(),]/ } }, e2.languages.css.atrule.inside["selector-function-argument"].inside = a, e2.languages.insertBefore("css", "property", { variable: { pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i, lookbehind: true } });
  var r = { pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/, lookbehind: true }, i = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: true };
  e2.languages.insertBefore("css", "function", { operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: true }, hexcode: { pattern: /\B#[\da-f]{3,8}\b/i, alias: "color" }, color: [{ pattern: /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i, lookbehind: true }, { pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i, inside: { unit: r, number: i, function: /[\w-]+(?=\()/, punctuation: /[(),]/ } }], entity: /\\[\da-f]{1,8}/i, unit: r, number: i });
}(Prism);
!function(e2) {
  e2.languages.diff = { coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d.*$/m] };
  var n2 = { "deleted-sign": "-", "deleted-arrow": "<", "inserted-sign": "+", "inserted-arrow": ">", unchanged: " ", diff: "!" };
  Object.keys(n2).forEach(function(a) {
    var i = n2[a], r = [];
    /^\w+$/.test(a) || r.push(/\w+/.exec(a)[0]), "diff" === a && r.push("bold"), e2.languages.diff[a] = { pattern: RegExp("^(?:[" + i + "].*(?:\r\n?|\n|(?![\\s\\S])))+", "m"), alias: r, inside: { line: { pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/, lookbehind: true }, prefix: { pattern: /[\s\S]/, alias: /\w+/.exec(a)[0] } } };
  }), Object.defineProperty(e2.languages.diff, "PREFIXES", { value: n2 });
}(Prism);
!function(e2) {
  var n2 = "(?:[ 	]+(?![ 	])(?:<SP_BS>)?|<SP_BS>)".replace(/<SP_BS>/g, function() {
    return "\\\\[\r\n](?:\\s|\\\\[\r\n]|#.*(?!.))*(?![\\s#]|\\\\[\r\n])";
  }), r = `"(?:[^"\\\\\r
]|\\\\(?:\r
|[^]))*"|'(?:[^'\\\\\r
]|\\\\(?:\r
|[^]))*'`, t2 = `--[\\w-]+=(?:<STR>|(?!["'])(?:[^\\s\\\\]|\\\\.)+)`.replace(/<STR>/g, function() {
    return r;
  }), o2 = { pattern: RegExp(r), greedy: true }, i = { pattern: /(^[ \t]*)#.*/m, lookbehind: true, greedy: true };
  function a(e3, r2) {
    return e3 = e3.replace(/<OPT>/g, function() {
      return t2;
    }).replace(/<SP>/g, function() {
      return n2;
    }), RegExp(e3, r2);
  }
  e2.languages.docker = { instruction: { pattern: /(^[ \t]*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)(?:\\.|[^\r\n\\])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\r\n\\])*)*/im, lookbehind: true, greedy: true, inside: { options: { pattern: a("(^(?:ONBUILD<SP>)?\\w+<SP>)<OPT>(?:<SP><OPT>)*", "i"), lookbehind: true, greedy: true, inside: { property: { pattern: /(^|\s)--[\w-]+/, lookbehind: true }, string: [o2, { pattern: /(=)(?!["'])(?:[^\s\\]|\\.)+/, lookbehind: true }], operator: /\\$/m, punctuation: /=/ } }, keyword: [{ pattern: a("(^(?:ONBUILD<SP>)?HEALTHCHECK<SP>(?:<OPT><SP>)*)(?:CMD|NONE)\\b", "i"), lookbehind: true, greedy: true }, { pattern: a("(^(?:ONBUILD<SP>)?FROM<SP>(?:<OPT><SP>)*(?!--)[^ 	\\\\]+<SP>)AS", "i"), lookbehind: true, greedy: true }, { pattern: a("(^ONBUILD<SP>)\\w+", "i"), lookbehind: true, greedy: true }, { pattern: /^\w+/, greedy: true }], comment: i, string: o2, variable: /\$(?:\w+|\{[^{}"'\\]*\})/, operator: /\\$/m } }, comment: i }, e2.languages.dockerfile = e2.languages.docker;
}(Prism);
Prism.languages.graphql = { comment: /#.*/, description: { pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i, greedy: true, alias: "string", inside: { "language-markdown": { pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/, lookbehind: true, inside: Prism.languages.markdown } } }, string: { pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/, greedy: true }, number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i, boolean: /\b(?:false|true)\b/, variable: /\$[a-z_]\w*/i, directive: { pattern: /@[a-z_]\w*/i, alias: "function" }, "attr-name": { pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i, greedy: true }, "atom-input": { pattern: /\b[A-Z]\w*Input\b/, alias: "class-name" }, scalar: /\b(?:Boolean|Float|ID|Int|String)\b/, constant: /\b[A-Z][A-Z_\d]*\b/, "class-name": { pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/, lookbehind: true }, fragment: { pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/, lookbehind: true, alias: "function" }, "definition-mutation": { pattern: /(\bmutation\s+)[a-zA-Z_]\w*/, lookbehind: true, alias: "function" }, "definition-query": { pattern: /(\bquery\s+)[a-zA-Z_]\w*/, lookbehind: true, alias: "function" }, keyword: /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/, operator: /[!=|&]|\.{3}/, "property-query": /\w+(?=\s*\()/, object: /\w+(?=\s*\{)/, punctuation: /[!(){}\[\]:=,]/, property: /\w+/ }, Prism.hooks.add("after-tokenize", function(n2) {
  if ("graphql" === n2.language)
    for (var t2 = n2.tokens.filter(function(n3) {
      return "string" != typeof n3 && "comment" !== n3.type && "scalar" !== n3.type;
    }), e2 = 0; e2 < t2.length; ) {
      var a = t2[e2++];
      if ("keyword" === a.type && "mutation" === a.content) {
        var r = [];
        if (c(["definition-mutation", "punctuation"]) && "(" === l(1).content) {
          e2 += 2;
          var i = f2(/^\($/, /^\)$/);
          if (-1 === i)
            continue;
          for (; e2 < i; e2++) {
            var o2 = l(0);
            "variable" === o2.type && (b(o2, "variable-input"), r.push(o2.content));
          }
          e2 = i + 1;
        }
        if (c(["punctuation", "property-query"]) && "{" === l(0).content && (e2++, b(l(0), "property-mutation"), r.length > 0)) {
          var s2 = f2(/^\{$/, /^\}$/);
          if (-1 === s2)
            continue;
          for (var u = e2; u < s2; u++) {
            var p2 = t2[u];
            "variable" === p2.type && r.indexOf(p2.content) >= 0 && b(p2, "variable-input");
          }
        }
      }
    }
  function l(n3) {
    return t2[e2 + n3];
  }
  function c(n3, t3) {
    t3 = t3 || 0;
    for (var e3 = 0; e3 < n3.length; e3++) {
      var a2 = l(e3 + t3);
      if (!a2 || a2.type !== n3[e3])
        return false;
    }
    return true;
  }
  function f2(n3, a2) {
    for (var r2 = 1, i2 = e2; i2 < t2.length; i2++) {
      var o3 = t2[i2], s3 = o3.content;
      if ("punctuation" === o3.type && "string" == typeof s3) {
        if (n3.test(s3))
          r2++;
        else if (a2.test(s3) && 0 == --r2)
          return i2;
      }
    }
    return -1;
  }
  function b(n3, t3) {
    var e3 = n3.alias;
    e3 ? Array.isArray(e3) || (n3.alias = e3 = [e3]) : n3.alias = e3 = [], e3.push(t3);
  }
});
Prism.languages.ini = { comment: { pattern: /(^[ \f\t\v]*)[#;][^\n\r]*/m, lookbehind: true }, section: { pattern: /(^[ \f\t\v]*)\[[^\n\r\]]*\]?/m, lookbehind: true, inside: { "section-name": { pattern: /(^\[[ \f\t\v]*)[^ \f\t\v\]]+(?:[ \f\t\v]+[^ \f\t\v\]]+)*/, lookbehind: true, alias: "selector" }, punctuation: /\[|\]/ } }, key: { pattern: /(^[ \f\t\v]*)[^ \f\n\r\t\v=]+(?:[ \f\t\v]+[^ \f\n\r\t\v=]+)*(?=[ \f\t\v]*=)/m, lookbehind: true, alias: "attr-name" }, value: { pattern: /(=[ \f\t\v]*)[^ \f\n\r\t\v]+(?:[ \f\t\v]+[^ \f\n\r\t\v]+)*/, lookbehind: true, alias: "attr-value", inside: { "inner-value": { pattern: /^("|').+(?=\1$)/, lookbehind: true } } }, punctuation: /=/ };
!function(a) {
  var e2 = a.languages.javadoclike = { parameter: { pattern: /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*@(?:arg|arguments|param)\s+)\w+/m, lookbehind: true }, keyword: { pattern: /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m, lookbehind: true }, punctuation: /[{}]/ };
  Object.defineProperty(e2, "addSupport", { value: function(e3, n2) {
    "string" == typeof e3 && (e3 = [e3]), e3.forEach(function(e4) {
      !function(e5, n3) {
        var t2 = "doc-comment", r = a.languages[e5];
        if (r) {
          var o2 = r[t2];
          if (o2 || (o2 = (r = a.languages.insertBefore(e5, "comment", { "doc-comment": { pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/, lookbehind: true, alias: "comment" } }))[t2]), o2 instanceof RegExp && (o2 = r[t2] = { pattern: o2 }), Array.isArray(o2))
            for (var i = 0, s2 = o2.length; i < s2; i++)
              o2[i] instanceof RegExp && (o2[i] = { pattern: o2[i] }), n3(o2[i]);
          else
            n3(o2);
        }
      }(e4, function(a2) {
        a2.inside || (a2.inside = {}), a2.inside.rest = n2;
      });
    });
  } }), e2.addSupport(["java", "javascript", "php"], e2);
}(Prism);
!function(e2) {
  e2.languages.typescript = e2.languages.extend("javascript", { "class-name": { pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/, lookbehind: true, greedy: true, inside: null }, builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/ }), e2.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/, /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/, /\btype\b(?=\s*(?:[\{*]|$))/), delete e2.languages.typescript.parameter, delete e2.languages.typescript["literal-property"];
  var s2 = e2.languages.extend("typescript", {});
  delete s2["class-name"], e2.languages.typescript["class-name"].inside = s2, e2.languages.insertBefore("typescript", "function", { decorator: { pattern: /@[$\w\xA0-\uFFFF]+/, inside: { at: { pattern: /^@/, alias: "operator" }, function: /^[\s\S]+/ } }, "generic-function": { pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/, greedy: true, inside: { function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/, generic: { pattern: /<[\s\S]+/, alias: "class-name", inside: s2 } } } }), e2.languages.ts = e2.languages.typescript;
}(Prism);
!function(e2) {
  var a = e2.languages.javascript, n2 = "\\{(?:[^{}]|\\{(?:[^{}]|\\{[^{}]*\\})*\\})+\\}", t2 = "(@(?:arg|argument|param|property)\\s+(?:" + n2 + "\\s+)?)";
  e2.languages.jsdoc = e2.languages.extend("javadoclike", { parameter: { pattern: RegExp(t2 + "(?:(?!\\s)[$\\w\\xA0-\\uFFFF.])+(?=\\s|$)"), lookbehind: true, inside: { punctuation: /\./ } } }), e2.languages.insertBefore("jsdoc", "keyword", { "optional-parameter": { pattern: RegExp(t2 + "\\[(?:(?!\\s)[$\\w\\xA0-\\uFFFF.])+(?:=[^[\\]]+)?\\](?=\\s|$)"), lookbehind: true, inside: { parameter: { pattern: /(^\[)[$\w\xA0-\uFFFF\.]+/, lookbehind: true, inside: { punctuation: /\./ } }, code: { pattern: /(=)[\s\S]*(?=\]$)/, lookbehind: true, inside: a, alias: "language-javascript" }, punctuation: /[=[\]]/ } }, "class-name": [{ pattern: RegExp("(@(?:augments|class|extends|interface|memberof!?|template|this|typedef)\\s+(?:<TYPE>\\s+)?)[A-Z]\\w*(?:\\.[A-Z]\\w*)*".replace(/<TYPE>/g, function() {
    return n2;
  })), lookbehind: true, inside: { punctuation: /\./ } }, { pattern: RegExp("(@[a-z]+\\s+)" + n2), lookbehind: true, inside: { string: a.string, number: a.number, boolean: a.boolean, keyword: e2.languages.typescript.keyword, operator: /=>|\.\.\.|[&|?:*]/, punctuation: /[.,;=<>{}()[\]]/ } }], example: { pattern: /(@example\s+(?!\s))(?:[^@\s]|\s+(?!\s))+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/, lookbehind: true, inside: { code: { pattern: /^([\t ]*(?:\*\s*)?)\S.*$/m, lookbehind: true, inside: a, alias: "language-javascript" } } } }), e2.languages.javadoclike.addSupport("javascript", e2.languages.jsdoc);
}(Prism);
Prism.languages.json = { property: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, lookbehind: true, greedy: true }, string: { pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, lookbehind: true, greedy: true }, comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: true }, number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i, punctuation: /[{}[\],]/, operator: /:/, boolean: /\b(?:false|true)\b/, null: { pattern: /\bnull\b/, alias: "keyword" } }, Prism.languages.webmanifest = Prism.languages.json;
Prism.languages.less = Prism.languages.extend("css", { comment: [/\/\*[\s\S]*?\*\//, { pattern: /(^|[^\\])\/\/.*/, lookbehind: true }], atrule: { pattern: /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/, inside: { punctuation: /[:()]/ } }, selector: { pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/, inside: { variable: /@+[\w-]+/ } }, property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/, operator: /[+\-*\/]/ }), Prism.languages.insertBefore("less", "property", { variable: [{ pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } }, /@@?[\w-]+/], "mixin-usage": { pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/, lookbehind: true, alias: "function" } });
!function(n2) {
  function e2(n3) {
    return n3 = n3.replace(/<inner>/g, function() {
      return "(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?![\r\n]))";
    }), RegExp("((?:^|[^\\\\])(?:\\\\{2})*)(?:" + n3 + ")");
  }
  var t2 = "(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+", a = "\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|(?![^]))".replace(/__/g, function() {
    return t2;
  }), i = "\\|?[ 	]*:?-{3,}:?[ 	]*(?:\\|[ 	]*:?-{3,}:?[ 	]*)+\\|?(?:\n|\r\n?)";
  n2.languages.markdown = n2.languages.extend("markup", {}), n2.languages.insertBefore("markdown", "prolog", { "front-matter-block": { pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/, lookbehind: true, greedy: true, inside: { punctuation: /^---|---$/, "front-matter": { pattern: /\S+(?:\s+\S+)*/, alias: ["yaml", "language-yaml"], inside: n2.languages.yaml } } }, blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation" }, table: { pattern: RegExp("^" + a + i + "(?:" + a + ")*", "m"), inside: { "table-data-rows": { pattern: RegExp("^(" + a + i + ")(?:" + a + ")*$"), lookbehind: true, inside: { "table-data": { pattern: RegExp(t2), inside: n2.languages.markdown }, punctuation: /\|/ } }, "table-line": { pattern: RegExp("^(" + a + ")" + i + "$"), lookbehind: true, inside: { punctuation: /\||:?-{3,}:?/ } }, "table-header-row": { pattern: RegExp("^" + a + "$"), inside: { "table-header": { pattern: RegExp(t2), alias: "important", inside: n2.languages.markdown }, punctuation: /\|/ } } } }, code: [{ pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/, lookbehind: true, alias: "keyword" }, { pattern: /^```[\s\S]*?^```$/m, greedy: true, inside: { "code-block": { pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m, lookbehind: true }, "code-language": { pattern: /^(```).+/, lookbehind: true }, punctuation: /```/ } }], title: [{ pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m, alias: "important", inside: { punctuation: /==+$|--+$/ } }, { pattern: /(^\s*)#.+/m, lookbehind: true, alias: "important", inside: { punctuation: /^#+|#+$/ } }], hr: { pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m, lookbehind: true, alias: "punctuation" }, list: { pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m, lookbehind: true, alias: "punctuation" }, "url-reference": { pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/, inside: { variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: true }, string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/, punctuation: /^[\[\]!:]|[<>]/ }, alias: "url" }, bold: { pattern: e2("\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*"), lookbehind: true, greedy: true, inside: { content: { pattern: /(^..)[\s\S]+(?=..$)/, lookbehind: true, inside: {} }, punctuation: /\*\*|__/ } }, italic: { pattern: e2("\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*"), lookbehind: true, greedy: true, inside: { content: { pattern: /(^.)[\s\S]+(?=.$)/, lookbehind: true, inside: {} }, punctuation: /[*_]/ } }, strike: { pattern: e2("(~~?)(?:(?!~)<inner>)+\\2"), lookbehind: true, greedy: true, inside: { content: { pattern: /(^~~?)[\s\S]+(?=\1$)/, lookbehind: true, inside: {} }, punctuation: /~~?/ } }, "code-snippet": { pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/, lookbehind: true, greedy: true, alias: ["code", "keyword"] }, url: { pattern: e2('!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[	 ]+"(?:\\\\.|[^"\\\\])*")?\\)|[ 	]?\\[(?:(?!\\])<inner>)+\\])'), lookbehind: true, greedy: true, inside: { operator: /^!/, content: { pattern: /(^\[)[^\]]+(?=\])/, lookbehind: true, inside: {} }, variable: { pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/, lookbehind: true }, url: { pattern: /(^\]\()[^\s)]+/, lookbehind: true }, string: { pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/, lookbehind: true } } } }), ["url", "bold", "italic", "strike"].forEach(function(e3) {
    ["url", "bold", "italic", "strike", "code-snippet"].forEach(function(t3) {
      e3 !== t3 && (n2.languages.markdown[e3].inside.content.inside[t3] = n2.languages.markdown[t3]);
    });
  }), n2.hooks.add("after-tokenize", function(n3) {
    "markdown" !== n3.language && "md" !== n3.language || function n4(e3) {
      if (e3 && "string" != typeof e3)
        for (var t3 = 0, a2 = e3.length; t3 < a2; t3++) {
          var i2 = e3[t3];
          if ("code" === i2.type) {
            var r2 = i2.content[1], o3 = i2.content[3];
            if (r2 && o3 && "code-language" === r2.type && "code-block" === o3.type && "string" == typeof r2.content) {
              var l2 = r2.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp"), s2 = "language-" + (l2 = (/[a-z][\w-]*/i.exec(l2) || [""])[0].toLowerCase());
              o3.alias ? "string" == typeof o3.alias ? o3.alias = [o3.alias, s2] : o3.alias.push(s2) : o3.alias = [s2];
            }
          } else
            n4(i2.content);
        }
    }(n3.tokens);
  }), n2.hooks.add("wrap", function(e3) {
    if ("code-block" === e3.type) {
      for (var t3 = "", a2 = 0, i2 = e3.classes.length; a2 < i2; a2++) {
        var s2 = e3.classes[a2], d = /language-(.+)/.exec(s2);
        if (d) {
          t3 = d[1];
          break;
        }
      }
      var p2 = n2.languages[t3];
      if (p2)
        e3.content = n2.highlight(e3.content.replace(r, "").replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function(n3, e4) {
          var t4;
          return "#" === (e4 = e4.toLowerCase())[0] ? (t4 = "x" === e4[1] ? parseInt(e4.slice(2), 16) : Number(e4.slice(1)), l(t4)) : o2[e4] || n3;
        }), p2, t3);
      else if (t3 && "none" !== t3 && n2.plugins.autoloader) {
        var u = "md-" + (/* @__PURE__ */ new Date()).valueOf() + "-" + Math.floor(1e16 * Math.random());
        e3.attributes.id = u, n2.plugins.autoloader.loadLanguages(t3, function() {
          var e4 = document.getElementById(u);
          e4 && (e4.innerHTML = n2.highlight(e4.textContent, n2.languages[t3], t3));
        });
      }
    }
  });
  var r = RegExp(n2.languages.markup.tag.pattern.source, "gi"), o2 = { amp: "&", lt: "<", gt: ">", quot: '"' }, l = String.fromCodePoint || String.fromCharCode;
  n2.languages.md = n2.languages.markdown;
}(Prism);
!function(e2) {
  var n2 = /\$(?:\w[a-z\d]*(?:_[^\x00-\x1F\s"'\\()$]*)?|\{[^}\s"'\\]+\})/i;
  e2.languages.nginx = { comment: { pattern: /(^|[\s{};])#.*/, lookbehind: true, greedy: true }, directive: { pattern: /(^|\s)\w(?:[^;{}"'\\\s]|\\.|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\s+(?:#.*(?!.)|(?![#\s])))*?(?=\s*[;{])/, lookbehind: true, greedy: true, inside: { string: { pattern: /((?:^|[^\\])(?:\\\\)*)(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/, lookbehind: true, greedy: true, inside: { escape: { pattern: /\\["'\\nrt]/, alias: "entity" }, variable: n2 } }, comment: { pattern: /(\s)#.*/, lookbehind: true, greedy: true }, keyword: { pattern: /^\S+/, greedy: true }, boolean: { pattern: /(\s)(?:off|on)(?!\S)/, lookbehind: true }, number: { pattern: /(\s)\d+[a-z]*(?!\S)/i, lookbehind: true }, variable: n2 } }, punctuation: /[{};]/ };
}(Prism);
!function(t2) {
  var n2 = t2.util.clone(t2.languages.javascript), e2 = "(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})";
  function a(t3, n3) {
    return t3 = t3.replace(/<S>/g, function() {
      return "(?:\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))\\*/)";
    }).replace(/<BRACES>/g, function() {
      return "(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})";
    }).replace(/<SPREAD>/g, function() {
      return e2;
    }), RegExp(t3, n3);
  }
  e2 = a(e2).source, t2.languages.jsx = t2.languages.extend("markup", n2), t2.languages.jsx.tag.pattern = a(`</?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:"(?:\\\\[^]|[^\\\\"])*"|'(?:\\\\[^]|[^\\\\'])*'|[^\\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*/?)?>`), t2.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/, t2.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/, t2.languages.jsx.tag.inside.tag.inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/, t2.languages.jsx.tag.inside.comment = n2.comment, t2.languages.insertBefore("inside", "attr-name", { spread: { pattern: a("<SPREAD>"), inside: t2.languages.jsx } }, t2.languages.jsx.tag), t2.languages.insertBefore("inside", "special-attr", { script: { pattern: a("=<BRACES>"), alias: "language-javascript", inside: { "script-punctuation": { pattern: /^=(?=\{)/, alias: "punctuation" }, rest: t2.languages.jsx } } }, t2.languages.jsx.tag);
  var s2 = function(t3) {
    return t3 ? "string" == typeof t3 ? t3 : "string" == typeof t3.content ? t3.content : t3.content.map(s2).join("") : "";
  }, g = function(n3) {
    for (var e3 = [], a2 = 0; a2 < n3.length; a2++) {
      var o2 = n3[a2], i = false;
      if ("string" != typeof o2 && ("tag" === o2.type && o2.content[0] && "tag" === o2.content[0].type ? "</" === o2.content[0].content[0].content ? e3.length > 0 && e3[e3.length - 1].tagName === s2(o2.content[0].content[1]) && e3.pop() : "/>" === o2.content[o2.content.length - 1].content || e3.push({ tagName: s2(o2.content[0].content[1]), openedBraces: 0 }) : e3.length > 0 && "punctuation" === o2.type && "{" === o2.content ? e3[e3.length - 1].openedBraces++ : e3.length > 0 && e3[e3.length - 1].openedBraces > 0 && "punctuation" === o2.type && "}" === o2.content ? e3[e3.length - 1].openedBraces-- : i = true), (i || "string" == typeof o2) && e3.length > 0 && 0 === e3[e3.length - 1].openedBraces) {
        var r = s2(o2);
        a2 < n3.length - 1 && ("string" == typeof n3[a2 + 1] || "plain-text" === n3[a2 + 1].type) && (r += s2(n3[a2 + 1]), n3.splice(a2 + 1, 1)), a2 > 0 && ("string" == typeof n3[a2 - 1] || "plain-text" === n3[a2 - 1].type) && (r = s2(n3[a2 - 1]) + r, n3.splice(a2 - 1, 1), a2--), n3[a2] = new t2.Token("plain-text", r, null, r);
      }
      o2.content && "string" != typeof o2.content && g(o2.content);
    }
  };
  t2.hooks.add("after-tokenize", function(t3) {
    "jsx" !== t3.language && "tsx" !== t3.language || g(t3.tokens);
  });
}(Prism);
!function(e2) {
  var a = e2.util.clone(e2.languages.typescript);
  e2.languages.tsx = e2.languages.extend("jsx", a), delete e2.languages.tsx.parameter, delete e2.languages.tsx["literal-property"];
  var t2 = e2.languages.tsx.tag;
  t2.pattern = RegExp("(^|[^\\w$]|(?=</))(?:" + t2.pattern.source + ")", t2.pattern.flags), t2.lookbehind = true;
}(Prism);
!function(e2) {
  for (var a = "/\\*(?:[^*/]|\\*(?!/)|/(?!\\*)|<self>)*\\*/", t2 = 0; t2 < 2; t2++)
    a = a.replace(/<self>/g, function() {
      return a;
    });
  a = a.replace(/<self>/g, function() {
    return "[^\\s\\S]";
  }), e2.languages.rust = { comment: [{ pattern: RegExp("(^|[^\\\\])" + a), lookbehind: true, greedy: true }, { pattern: /(^|[^\\:])\/\/.*/, lookbehind: true, greedy: true }], string: { pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/, greedy: true }, char: { pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/, greedy: true }, attribute: { pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/, greedy: true, alias: "attr-name", inside: { string: null } }, "closure-params": { pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/, lookbehind: true, greedy: true, inside: { "closure-punctuation": { pattern: /^\||\|$/, alias: "punctuation" }, rest: null } }, "lifetime-annotation": { pattern: /'\w+/, alias: "symbol" }, "fragment-specifier": { pattern: /(\$\w+:)[a-z]+/, lookbehind: true, alias: "punctuation" }, variable: /\$\w+/, "function-definition": { pattern: /(\bfn\s+)\w+/, lookbehind: true, alias: "function" }, "type-definition": { pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/, lookbehind: true, alias: "class-name" }, "module-declaration": [{ pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/, lookbehind: true, alias: "namespace" }, { pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/, lookbehind: true, alias: "namespace", inside: { punctuation: /::/ } }], keyword: [/\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/, /\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/], function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/, macro: { pattern: /\b\w+!/, alias: "property" }, constant: /\b[A-Z_][A-Z_\d]+\b/, "class-name": /\b[A-Z]\w*\b/, namespace: { pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/, inside: { punctuation: /::/ } }, number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/, boolean: /\b(?:false|true)\b/, punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/, operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/ }, e2.languages.rust["closure-params"].inside.rest = e2.languages.rust, e2.languages.rust.attribute.inside.string = e2.languages.rust.string;
}(Prism);
Prism.languages.scss = Prism.languages.extend("css", { comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: true }, atrule: { pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/, inside: { rule: /@[\w-]+/ } }, url: /(?:[-a-z]+-)?url(?=\()/i, selector: { pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/, inside: { parent: { pattern: /&/, alias: "important" }, placeholder: /%[-\w]+/, variable: /\$[-\w]+|#\{\$[-\w]+\}/ } }, property: { pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/, inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ } } }), Prism.languages.insertBefore("scss", "atrule", { keyword: [/@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i, { pattern: /( )(?:from|through)(?= )/, lookbehind: true }] }), Prism.languages.insertBefore("scss", "important", { variable: /\$[-\w]+|#\{\$[-\w]+\}/ }), Prism.languages.insertBefore("scss", "function", { "module-modifier": { pattern: /\b(?:as|hide|show|with)\b/i, alias: "keyword" }, placeholder: { pattern: /%[-\w]+/, alias: "selector" }, statement: { pattern: /\B!(?:default|optional)\b/i, alias: "keyword" }, boolean: /\b(?:false|true)\b/, null: { pattern: /\bnull\b/, alias: "keyword" }, operator: { pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/, lookbehind: true } }), Prism.languages.scss.atrule.inside.rest = Prism.languages.scss;
Prism.languages.sql = { comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/, lookbehind: true }, variable: [{ pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: true }, /@[\w.$]+/], string: { pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/, greedy: true, lookbehind: true }, identifier: { pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/, greedy: true, lookbehind: true, inside: { punctuation: /^`|`$/ } }, function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i, keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i, boolean: /\b(?:FALSE|NULL|TRUE)\b/i, number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i, operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i, punctuation: /[;[\]()`,.]/ };
!function(e2) {
  function n2(e3) {
    return e3.replace(/__/g, function() {
      return `(?:[\\w-]+|'[^'
\r]*'|"(?:\\\\.|[^\\\\"\r
])*")`;
    });
  }
  e2.languages.toml = { comment: { pattern: /#.*/, greedy: true }, table: { pattern: RegExp(n2("(^[	 ]*\\[\\s*(?:\\[\\s*)?)__(?:\\s*\\.\\s*__)*(?=\\s*\\])"), "m"), lookbehind: true, greedy: true, alias: "class-name" }, key: { pattern: RegExp(n2("(^[	 ]*|[{,]\\s*)__(?:\\s*\\.\\s*__)*(?=\\s*=)"), "m"), lookbehind: true, greedy: true, alias: "property" }, string: { pattern: /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/, greedy: true }, date: [{ pattern: /\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i, alias: "number" }, { pattern: /\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/, alias: "number" }], number: /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/, boolean: /\b(?:false|true)\b/, punctuation: /[.,=[\]{}]/ };
}(Prism);
!function(e2) {
  var n2 = /[*&][^\s[\]{},]+/, r = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/, t2 = "(?:" + r.source + "(?:[ 	]+" + n2.source + ")?|" + n2.source + "(?:[ 	]+" + r.source + ")?)", a = "(?:[^\\s\\x00-\\x08\\x0e-\\x1f!\"#%&'*,\\-:>?@[\\]`{|}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]|[?:-]<PLAIN>)(?:[ 	]*(?:(?![#:])<PLAIN>|:<PLAIN>))*".replace(/<PLAIN>/g, function() {
    return "[^\\s\\x00-\\x08\\x0e-\\x1f,[\\]{}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]";
  }), d = `"(?:[^"\\\\\r
]|\\\\.)*"|'(?:[^'\\\\\r
]|\\\\.)*'`;
  function o2(e3, n3) {
    n3 = (n3 || "").replace(/m/g, "") + "m";
    var r2 = "([:\\-,[{]\\s*(?:\\s<<prop>>[ 	]+)?)(?:<<value>>)(?=[ 	]*(?:$|,|\\]|\\}|(?:[\r\n]\\s*)?#))".replace(/<<prop>>/g, function() {
      return t2;
    }).replace(/<<value>>/g, function() {
      return e3;
    });
    return RegExp(r2, n3);
  }
  e2.languages.yaml = { scalar: { pattern: RegExp("([\\-:]\\s*(?:\\s<<prop>>[ 	]+)?[|>])[ 	]*(?:((?:\r?\n|\r)[ 	]+)\\S[^\r\n]*(?:\\2[^\r\n]+)*)".replace(/<<prop>>/g, function() {
    return t2;
  })), lookbehind: true, alias: "string" }, comment: /#.*/, key: { pattern: RegExp("((?:^|[:\\-,[{\r\n?])[ 	]*(?:<<prop>>[ 	]+)?)<<key>>(?=\\s*:\\s)".replace(/<<prop>>/g, function() {
    return t2;
  }).replace(/<<key>>/g, function() {
    return "(?:" + a + "|" + d + ")";
  })), lookbehind: true, greedy: true, alias: "atrule" }, directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: true, alias: "important" }, datetime: { pattern: o2("\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ 	]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?(?:[ 	]*(?:Z|[-+]\\d\\d?(?::\\d{2})?))?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?"), lookbehind: true, alias: "number" }, boolean: { pattern: o2("false|true", "i"), lookbehind: true, alias: "important" }, null: { pattern: o2("null|~", "i"), lookbehind: true, alias: "important" }, string: { pattern: o2(d), lookbehind: true, greedy: true }, number: { pattern: o2("[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)", "i"), lookbehind: true }, tag: r, important: n2, punctuation: /---|[:[\]{}\-,|>?]|\.\.\./ }, e2.languages.yml = e2.languages.yaml;
}(Prism);
!function() {
  if ("undefined" != typeof Prism && "undefined" != typeof document && document.querySelector) {
    var e2, t2 = "line-numbers", i = "linkable-line-numbers", n2 = /\n(?!$)/g, r = true;
    Prism.plugins.lineHighlight = { highlightLines: function(o3, u2, c2) {
      var h = (u2 = "string" == typeof u2 ? u2 : o3.getAttribute("data-line") || "").replace(/\s+/g, "").split(",").filter(Boolean), d = +o3.getAttribute("data-line-offset") || 0, f2 = (function() {
        if (void 0 === e2) {
          var t3 = document.createElement("div");
          t3.style.fontSize = "13px", t3.style.lineHeight = "1.5", t3.style.padding = "0", t3.style.border = "0", t3.innerHTML = "&nbsp;<br />&nbsp;", document.body.appendChild(t3), e2 = 38 === t3.offsetHeight, document.body.removeChild(t3);
        }
        return e2;
      }() ? parseInt : parseFloat)(getComputedStyle(o3).lineHeight), p2 = Prism.util.isActive(o3, t2), g = o3.querySelector("code"), m = p2 ? o3 : g || o3, v = [], y = g.textContent.match(n2), b = y ? y.length + 1 : 1, A = g && m != g ? function(e3, t3) {
        var i2 = getComputedStyle(e3), n3 = getComputedStyle(t3);
        function r2(e4) {
          return +e4.substr(0, e4.length - 2);
        }
        return t3.offsetTop + r2(n3.borderTopWidth) + r2(n3.paddingTop) - r2(i2.paddingTop);
      }(o3, g) : 0;
      h.forEach(function(e3) {
        var t3 = e3.split("-"), i2 = +t3[0], n3 = +t3[1] || i2;
        if (!((n3 = Math.min(b + d, n3)) < i2)) {
          var r2 = o3.querySelector('.line-highlight[data-range="' + e3 + '"]') || document.createElement("div");
          if (v.push(function() {
            r2.setAttribute("aria-hidden", "true"), r2.setAttribute("data-range", e3), r2.className = (c2 || "") + " line-highlight";
          }), p2 && Prism.plugins.lineNumbers) {
            var s3 = Prism.plugins.lineNumbers.getLine(o3, i2), l2 = Prism.plugins.lineNumbers.getLine(o3, n3);
            if (s3) {
              var a2 = s3.offsetTop + A + "px";
              v.push(function() {
                r2.style.top = a2;
              });
            }
            if (l2) {
              var u3 = l2.offsetTop - s3.offsetTop + l2.offsetHeight + "px";
              v.push(function() {
                r2.style.height = u3;
              });
            }
          } else
            v.push(function() {
              r2.setAttribute("data-start", String(i2)), n3 > i2 && r2.setAttribute("data-end", String(n3)), r2.style.top = (i2 - d - 1) * f2 + A + "px", r2.textContent = new Array(n3 - i2 + 2).join(" \n");
            });
          v.push(function() {
            r2.style.width = o3.scrollWidth + "px";
          }), v.push(function() {
            m.appendChild(r2);
          });
        }
      });
      var P = o3.id;
      if (p2 && Prism.util.isActive(o3, i) && P) {
        l(o3, i) || v.push(function() {
          o3.classList.add(i);
        });
        var E2 = parseInt(o3.getAttribute("data-start") || "1");
        s2(".line-numbers-rows > span", o3).forEach(function(e3, t3) {
          var i2 = t3 + E2;
          e3.onclick = function() {
            var e4 = P + "." + i2;
            r = false, location.hash = e4, setTimeout(function() {
              r = true;
            }, 1);
          };
        });
      }
      return function() {
        v.forEach(a);
      };
    } };
    var o2 = 0;
    Prism.hooks.add("before-sanity-check", function(e3) {
      var t3 = e3.element.parentElement;
      if (u(t3)) {
        var i2 = 0;
        s2(".line-highlight", t3).forEach(function(e4) {
          i2 += e4.textContent.length, e4.parentNode.removeChild(e4);
        }), i2 && /^(?: \n)+$/.test(e3.code.slice(-i2)) && (e3.code = e3.code.slice(0, -i2));
      }
    }), Prism.hooks.add("complete", function e3(i2) {
      var n3 = i2.element.parentElement;
      if (u(n3)) {
        clearTimeout(o2);
        var r2 = Prism.plugins.lineNumbers, s3 = i2.plugins && i2.plugins.lineNumbers;
        l(n3, t2) && r2 && !s3 ? Prism.hooks.add("line-numbers", e3) : (Prism.plugins.lineHighlight.highlightLines(n3)(), o2 = setTimeout(c, 1));
      }
    }), window.addEventListener("hashchange", c), window.addEventListener("resize", function() {
      s2("pre").filter(u).map(function(e3) {
        return Prism.plugins.lineHighlight.highlightLines(e3);
      }).forEach(a);
    });
  }
  function s2(e3, t3) {
    return Array.prototype.slice.call((t3 || document).querySelectorAll(e3));
  }
  function l(e3, t3) {
    return e3.classList.contains(t3);
  }
  function a(e3) {
    e3();
  }
  function u(e3) {
    return !!(e3 && /pre/i.test(e3.nodeName) && (e3.hasAttribute("data-line") || e3.id && Prism.util.isActive(e3, i)));
  }
  function c() {
    var e3 = location.hash.slice(1);
    s2(".temporary.line-highlight").forEach(function(e4) {
      e4.parentNode.removeChild(e4);
    });
    var t3 = (e3.match(/\.([\d,-]+)$/) || [, ""])[1];
    if (t3 && !document.getElementById(e3)) {
      var i2 = e3.slice(0, e3.lastIndexOf(".")), n3 = document.getElementById(i2);
      n3 && (n3.hasAttribute("data-line") || n3.setAttribute("data-line", ""), Prism.plugins.lineHighlight.highlightLines(n3, t3, "temporary ")(), r && document.querySelector(".temporary.line-highlight").scrollIntoView());
    }
  }
}();
!function() {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var e2 = "line-numbers", n2 = /\n(?!$)/g, t2 = Prism.plugins.lineNumbers = { getLine: function(n3, t3) {
      if ("PRE" === n3.tagName && n3.classList.contains(e2)) {
        var i2 = n3.querySelector(".line-numbers-rows");
        if (i2) {
          var r2 = parseInt(n3.getAttribute("data-start"), 10) || 1, s2 = r2 + (i2.children.length - 1);
          t3 < r2 && (t3 = r2), t3 > s2 && (t3 = s2);
          var l = t3 - r2;
          return i2.children[l];
        }
      }
    }, resize: function(e3) {
      r([e3]);
    }, assumeViewportIndependence: true }, i = void 0;
    window.addEventListener("resize", function() {
      t2.assumeViewportIndependence && i === window.innerWidth || (i = window.innerWidth, r(Array.prototype.slice.call(document.querySelectorAll("pre.line-numbers"))));
    }), Prism.hooks.add("complete", function(t3) {
      if (t3.code) {
        var i2 = t3.element, s2 = i2.parentNode;
        if (s2 && /pre/i.test(s2.nodeName) && !i2.querySelector(".line-numbers-rows") && Prism.util.isActive(i2, e2)) {
          i2.classList.remove(e2), s2.classList.add(e2);
          var l, o2 = t3.code.match(n2), a = o2 ? o2.length + 1 : 1, u = new Array(a + 1).join("<span></span>");
          (l = document.createElement("span")).setAttribute("aria-hidden", "true"), l.className = "line-numbers-rows", l.innerHTML = u, s2.hasAttribute("data-start") && (s2.style.counterReset = "linenumber " + (parseInt(s2.getAttribute("data-start"), 10) - 1)), t3.element.appendChild(l), r([s2]), Prism.hooks.run("line-numbers", t3);
        }
      }
    }), Prism.hooks.add("line-numbers", function(e3) {
      e3.plugins = e3.plugins || {}, e3.plugins.lineNumbers = true;
    });
  }
  function r(e3) {
    if (0 != (e3 = e3.filter(function(e4) {
      var n3, t4 = (n3 = e4, n3 ? window.getComputedStyle ? getComputedStyle(n3) : n3.currentStyle || null : null)["white-space"];
      return "pre-wrap" === t4 || "pre-line" === t4;
    })).length) {
      var t3 = e3.map(function(e4) {
        var t4 = e4.querySelector("code"), i2 = e4.querySelector(".line-numbers-rows");
        if (t4 && i2) {
          var r2 = e4.querySelector(".line-numbers-sizer"), s2 = t4.textContent.split(n2);
          r2 || ((r2 = document.createElement("span")).className = "line-numbers-sizer", t4.appendChild(r2)), r2.innerHTML = "0", r2.style.display = "block";
          var l = r2.getBoundingClientRect().height;
          return r2.innerHTML = "", { element: e4, lines: s2, lineHeights: [], oneLinerHeight: l, sizer: r2 };
        }
      }).filter(Boolean);
      t3.forEach(function(e4) {
        var n3 = e4.sizer, t4 = e4.lines, i2 = e4.lineHeights, r2 = e4.oneLinerHeight;
        i2[t4.length - 1] = void 0, t4.forEach(function(e5, t5) {
          if (e5 && e5.length > 1) {
            var s2 = n3.appendChild(document.createElement("span"));
            s2.style.display = "block", s2.textContent = e5;
          } else
            i2[t5] = r2;
        });
      }), t3.forEach(function(e4) {
        for (var n3 = e4.sizer, t4 = e4.lineHeights, i2 = 0, r2 = 0; r2 < t4.length; r2++)
          void 0 === t4[r2] && (t4[r2] = n3.children[i2++].getBoundingClientRect().height);
      }), t3.forEach(function(e4) {
        var n3 = e4.sizer, t4 = e4.element.querySelector(".line-numbers-rows");
        n3.style.display = "none", n3.innerHTML = "", e4.lineHeights.forEach(function(e5, n4) {
          t4.children[n4].style.height = e5 + "px";
        });
      });
    }
  }
}();
!function() {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var e2 = [], t2 = {}, n2 = function() {
    };
    Prism.plugins.toolbar = {};
    var a = Prism.plugins.toolbar.registerButton = function(n3, a2) {
      var r2;
      r2 = "function" == typeof a2 ? a2 : function(e3) {
        var t3;
        return "function" == typeof a2.onClick ? ((t3 = document.createElement("button")).type = "button", t3.addEventListener("click", function() {
          a2.onClick.call(this, e3);
        })) : "string" == typeof a2.url ? (t3 = document.createElement("a")).href = a2.url : t3 = document.createElement("span"), a2.className && t3.classList.add(a2.className), t3.textContent = a2.text, t3;
      }, n3 in t2 ? console.warn('There is a button with the key "' + n3 + '" registered already.') : e2.push(t2[n3] = r2);
    }, r = Prism.plugins.toolbar.hook = function(a2) {
      var r2 = a2.element.parentNode;
      if (r2 && /pre/i.test(r2.nodeName) && !r2.parentNode.classList.contains("code-toolbar")) {
        var o2 = document.createElement("div");
        o2.classList.add("code-toolbar"), r2.parentNode.insertBefore(o2, r2), o2.appendChild(r2);
        var i = document.createElement("div");
        i.classList.add("toolbar");
        var l = e2, d = function(e3) {
          for (; e3; ) {
            var t3 = e3.getAttribute("data-toolbar-order");
            if (null != t3)
              return (t3 = t3.trim()).length ? t3.split(/\s*,\s*/g) : [];
            e3 = e3.parentElement;
          }
        }(a2.element);
        d && (l = d.map(function(e3) {
          return t2[e3] || n2;
        })), l.forEach(function(e3) {
          var t3 = e3(a2);
          if (t3) {
            var n3 = document.createElement("div");
            n3.classList.add("toolbar-item"), n3.appendChild(t3), i.appendChild(n3);
          }
        }), o2.appendChild(i);
      }
    };
    a("label", function(e3) {
      var t3 = e3.element.parentNode;
      if (t3 && /pre/i.test(t3.nodeName) && t3.hasAttribute("data-label")) {
        var n3, a2, r2 = t3.getAttribute("data-label");
        try {
          a2 = document.querySelector("template#" + r2);
        } catch (e4) {
        }
        return a2 ? n3 = a2.content : (t3.hasAttribute("data-url") ? (n3 = document.createElement("a")).href = t3.getAttribute("data-url") : n3 = document.createElement("span"), n3.textContent = r2), n3;
      }
    }), Prism.hooks.add("complete", r);
  }
}();
!function() {
  if ("undefined" != typeof Prism && "undefined" != typeof document)
    if (Prism.plugins.toolbar) {
      var e2 = { none: "Plain text", plain: "Plain text", plaintext: "Plain text", text: "Plain text", txt: "Plain text", html: "HTML", xml: "XML", svg: "SVG", mathml: "MathML", ssml: "SSML", rss: "RSS", css: "CSS", clike: "C-like", js: "JavaScript", abap: "ABAP", abnf: "ABNF", al: "AL", antlr4: "ANTLR4", g4: "ANTLR4", apacheconf: "Apache Configuration", apl: "APL", aql: "AQL", ino: "Arduino", arff: "ARFF", armasm: "ARM Assembly", "arm-asm": "ARM Assembly", art: "Arturo", asciidoc: "AsciiDoc", adoc: "AsciiDoc", aspnet: "ASP.NET (C#)", asm6502: "6502 Assembly", asmatmel: "Atmel AVR Assembly", autohotkey: "AutoHotkey", autoit: "AutoIt", avisynth: "AviSynth", avs: "AviSynth", "avro-idl": "Avro IDL", avdl: "Avro IDL", awk: "AWK", gawk: "GAWK", sh: "Shell", basic: "BASIC", bbcode: "BBcode", bbj: "BBj", bnf: "BNF", rbnf: "RBNF", bqn: "BQN", bsl: "BSL (1C:Enterprise)", oscript: "OneScript", csharp: "C#", cs: "C#", dotnet: "C#", cpp: "C++", cfscript: "CFScript", cfc: "CFScript", cil: "CIL", cilkc: "Cilk/C", "cilk-c": "Cilk/C", cilkcpp: "Cilk/C++", "cilk-cpp": "Cilk/C++", cilk: "Cilk/C++", cmake: "CMake", cobol: "COBOL", coffee: "CoffeeScript", conc: "Concurnas", csp: "Content-Security-Policy", "css-extras": "CSS Extras", csv: "CSV", cue: "CUE", dataweave: "DataWeave", dax: "DAX", django: "Django/Jinja2", jinja2: "Django/Jinja2", "dns-zone-file": "DNS zone file", "dns-zone": "DNS zone file", dockerfile: "Docker", dot: "DOT (Graphviz)", gv: "DOT (Graphviz)", ebnf: "EBNF", editorconfig: "EditorConfig", ejs: "EJS", etlua: "Embedded Lua templating", erb: "ERB", "excel-formula": "Excel Formula", xlsx: "Excel Formula", xls: "Excel Formula", fsharp: "F#", "firestore-security-rules": "Firestore security rules", ftl: "FreeMarker Template Language", gml: "GameMaker Language", gamemakerlanguage: "GameMaker Language", gap: "GAP (CAS)", gcode: "G-code", gdscript: "GDScript", gedcom: "GEDCOM", gettext: "gettext", po: "gettext", glsl: "GLSL", gn: "GN", gni: "GN", "linker-script": "GNU Linker Script", ld: "GNU Linker Script", "go-module": "Go module", "go-mod": "Go module", graphql: "GraphQL", hbs: "Handlebars", hs: "Haskell", hcl: "HCL", hlsl: "HLSL", http: "HTTP", hpkp: "HTTP Public-Key-Pins", hsts: "HTTP Strict-Transport-Security", ichigojam: "IchigoJam", "icu-message-format": "ICU Message Format", idr: "Idris", ignore: ".ignore", gitignore: ".gitignore", hgignore: ".hgignore", npmignore: ".npmignore", inform7: "Inform 7", javadoc: "JavaDoc", javadoclike: "JavaDoc-like", javastacktrace: "Java stack trace", jq: "JQ", jsdoc: "JSDoc", "js-extras": "JS Extras", json: "JSON", webmanifest: "Web App Manifest", json5: "JSON5", jsonp: "JSONP", jsstacktrace: "JS stack trace", "js-templates": "JS Templates", keepalived: "Keepalived Configure", kts: "Kotlin Script", kt: "Kotlin", kumir: "KuMir (КуМир)", kum: "KuMir (КуМир)", latex: "LaTeX", tex: "TeX", context: "ConTeXt", lilypond: "LilyPond", ly: "LilyPond", emacs: "Lisp", elisp: "Lisp", "emacs-lisp": "Lisp", llvm: "LLVM IR", log: "Log file", lolcode: "LOLCODE", magma: "Magma (CAS)", md: "Markdown", "markup-templating": "Markup templating", matlab: "MATLAB", maxscript: "MAXScript", mel: "MEL", metafont: "METAFONT", mongodb: "MongoDB", moon: "MoonScript", n1ql: "N1QL", n4js: "N4JS", n4jsd: "N4JS", "nand2tetris-hdl": "Nand To Tetris HDL", naniscript: "Naninovel Script", nani: "Naninovel Script", nasm: "NASM", neon: "NEON", nginx: "nginx", nsis: "NSIS", objectivec: "Objective-C", objc: "Objective-C", ocaml: "OCaml", opencl: "OpenCL", openqasm: "OpenQasm", qasm: "OpenQasm", parigp: "PARI/GP", objectpascal: "Object Pascal", psl: "PATROL Scripting Language", pcaxis: "PC-Axis", px: "PC-Axis", peoplecode: "PeopleCode", pcode: "PeopleCode", php: "PHP", phpdoc: "PHPDoc", "php-extras": "PHP Extras", "plant-uml": "PlantUML", plantuml: "PlantUML", plsql: "PL/SQL", powerquery: "PowerQuery", pq: "PowerQuery", mscript: "PowerQuery", powershell: "PowerShell", promql: "PromQL", properties: "", protobuf: "Protocol Buffers", purebasic: "PureBasic", pbfasm: "PureBasic", purs: "PureScript", py: "Python", qsharp: "Q#", qs: "Q#", q: "Q (kdb+ database)", qml: "QML", rkt: "Racket", cshtml: "Razor C#", razor: "Razor C#", jsx: "React JSX", tsx: "React TSX", renpy: "Ren'py", rpy: "Ren'py", res: "ReScript", rest: "reST (reStructuredText)", robotframework: "Robot Framework", robot: "Robot Framework", rb: "Ruby", sas: "SAS", sass: "Sass (Sass)", scss: "Sass (SCSS)", "shell-session": "Shell session", "sh-session": "Shell session", shellsession: "Shell session", sml: "SML", smlnj: "SML/NJ", solidity: "Solidity (Ethereum)", sol: "Solidity (Ethereum)", "solution-file": "Solution file", sln: "Solution file", soy: "Soy (Closure Template)", sparql: "SPARQL", rq: "SPARQL", "splunk-spl": "Splunk SPL", sqf: "SQF: Status Quo Function (Arma 3)", sql: "SQL", stata: "Stata Ado", iecst: "Structured Text (IEC 61131-3)", supercollider: "SuperCollider", sclang: "SuperCollider", systemd: "Systemd configuration file", "t4-templating": "T4 templating", "t4-cs": "T4 Text Templates (C#)", t4: "T4 Text Templates (C#)", "t4-vb": "T4 Text Templates (VB)", tap: "TAP", tt2: "Template Toolkit 2", toml: "TOML", trickle: "trickle", troy: "troy", trig: "TriG", ts: "TypeScript", tsconfig: "TSConfig", uscript: "UnrealScript", uc: "UnrealScript", uorazor: "UO Razor Script", uri: "URI", url: "URL", vbnet: "VB.Net", vhdl: "VHDL", vim: "vim", "visual-basic": "Visual Basic", vba: "VBA", vb: "Visual Basic", wasm: "WebAssembly", "web-idl": "Web IDL", webidl: "Web IDL", wgsl: "WGSL", wiki: "Wiki markup", wolfram: "Wolfram language", nb: "Mathematica Notebook", wl: "Wolfram language", xeoracube: "XeoraCube", "xml-doc": "XML doc (.net)", xojo: "Xojo (REALbasic)", xquery: "XQuery", yaml: "YAML", yml: "YAML", yang: "YANG" };
      Prism.plugins.toolbar.registerButton("show-language", function(a) {
        var t2 = a.element.parentNode;
        if (t2 && /pre/i.test(t2.nodeName)) {
          var o2, i = t2.getAttribute("data-language") || e2[a.language] || ((o2 = a.language) ? (o2.substring(0, 1).toUpperCase() + o2.substring(1)).replace(/s(?=cript)/, "S") : o2);
          if (i) {
            var s2 = document.createElement("span");
            return s2.textContent = i, s2;
          }
        }
      });
    } else
      console.warn("Show Languages plugin loaded before Toolbar plugin.");
}();
!function() {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var t2 = [];
    o2(function(t3) {
      if (t3 && t3.meta && t3.data) {
        if (t3.meta.status && t3.meta.status >= 400)
          return "Error: " + (t3.data.message || t3.meta.status);
        if ("string" == typeof t3.data.content)
          return "function" == typeof atob ? atob(t3.data.content.replace(/\s/g, "")) : "Your browser cannot decode base64";
      }
      return null;
    }, "github"), o2(function(t3, e3) {
      if (t3 && t3.meta && t3.data && t3.data.files) {
        if (t3.meta.status && t3.meta.status >= 400)
          return "Error: " + (t3.data.message || t3.meta.status);
        var n3 = t3.data.files, a2 = e3.getAttribute("data-filename");
        if (null == a2) {
          for (var r2 in n3)
            if (n3.hasOwnProperty(r2)) {
              a2 = r2;
              break;
            }
        }
        return void 0 !== n3[a2] ? n3[a2].content : "Error: unknown or missing gist file " + a2;
      }
      return null;
    }, "gist"), o2(function(t3) {
      return t3 && t3.node && "string" == typeof t3.data ? t3.data : null;
    }, "bitbucket");
    var e2 = 0, n2 = "data-jsonp-status", a = "failed", r = 'pre[data-jsonp]:not([data-jsonp-status="loaded"]):not([data-jsonp-status="loading"])';
    Prism.hooks.add("before-highlightall", function(t3) {
      t3.selector += ", " + r;
    }), Prism.hooks.add("before-sanity-check", function(o3) {
      var i2, u = o3.element;
      if (u.matches(r)) {
        o3.code = "", u.setAttribute(n2, "loading");
        var s2 = u.appendChild(document.createElement("CODE"));
        s2.textContent = "Loading…";
        var d = o3.language;
        s2.className = "language-" + d;
        var f2 = Prism.plugins.autoloader;
        f2 && f2.loadLanguages(d);
        var l = u.getAttribute("data-adapter"), c = null;
        if (l) {
          if ("function" != typeof window[l])
            return u.setAttribute(n2, a), void (s2.textContent = (i2 = l, '✖ Error: JSONP adapter function "' + i2 + `" doesn't exist`));
          c = window[l];
        }
        var p2 = u.getAttribute("data-jsonp");
        !function(r2, o4, i3, d2) {
          var f3 = "prismjsonp" + e2++, l2 = document.createElement("a");
          l2.href = r2, l2.href += (l2.search ? "&" : "?") + (o4 || "callback") + "=" + f3;
          var p3 = document.createElement("script");
          p3.src = l2.href, p3.onerror = function() {
            g(), d2();
          };
          var m = setTimeout(function() {
            g(), d2();
          }, Prism.plugins.jsonphighlight.timeout);
          function g() {
            clearTimeout(m), document.head.removeChild(p3), delete window[f3];
          }
          window[f3] = function(e3) {
            g(), function(e4) {
              var r3 = null;
              if (c)
                r3 = c(e4, u);
              else
                for (var o5 = 0, i4 = t2.length; o5 < i4 && null === (r3 = t2[o5].adapter(e4, u)); o5++)
                  ;
              null === r3 ? (u.setAttribute(n2, a), s2.textContent = "✖ Error: Cannot parse response (perhaps you need an adapter function?)") : (u.setAttribute(n2, "loaded"), s2.textContent = r3, Prism.highlightElement(s2));
            }(e3);
          }, document.head.appendChild(p3);
        }(p2, u.getAttribute("data-callback"), 0, function() {
          u.setAttribute(n2, a), s2.textContent = "✖ Error: Timeout loading " + p2;
        });
      }
    }), Prism.plugins.jsonphighlight = { timeout: 5e3, registerAdapter: o2, removeAdapter: function(e3) {
      if ("string" == typeof e3 && (e3 = i(e3)), "function" == typeof e3) {
        var n3 = t2.findIndex(function(t3) {
          return t3.adapter === e3;
        });
        n3 >= 0 && t2.splice(n3, 1);
      }
    }, highlight: function(t3) {
      for (var e3, n3 = (t3 || document).querySelectorAll(r), a2 = 0; e3 = n3[a2++]; )
        Prism.highlightElement(e3);
    } };
  }
  function o2(e3, n3) {
    n3 = n3 || e3.name, "function" != typeof e3 || i(e3) || i(n3) || t2.push({ adapter: e3, name: n3 });
  }
  function i(e3) {
    if ("function" == typeof e3) {
      for (var n3 = 0; a2 = t2[n3++]; )
        if (a2.adapter.valueOf() === e3.valueOf())
          return a2.adapter;
    } else if ("string" == typeof e3) {
      var a2;
      for (n3 = 0; a2 = t2[n3++]; )
        if (a2.name === e3)
          return a2.adapter;
    }
    return null;
  }
}();
!function() {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var n2 = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g, r = /^#?((?:[\da-f]){3,4}|(?:[\da-f]{2}){3,4})$/i, o2 = [function(n3) {
      var o3 = r.exec(n3);
      if (o3) {
        for (var s2 = (n3 = o3[1]).length >= 6 ? 2 : 1, e2 = n3.length / s2, t2 = 1 == s2 ? 1 / 15 : 1 / 255, i = [], a = 0; a < e2; a++) {
          var c = parseInt(n3.substr(a * s2, s2), 16);
          i.push(c * t2);
        }
        return 3 == e2 && i.push(1), "rgba(" + i.slice(0, 3).map(function(n4) {
          return String(Math.round(255 * n4));
        }).join(",") + "," + String(Number(i[3].toFixed(3))) + ")";
      }
    }, function(n3) {
      var r2 = new Option().style;
      return r2.color = n3, r2.color ? n3 : void 0;
    }];
    Prism.hooks.add("wrap", function(r2) {
      if ("color" === r2.type || r2.classes.indexOf("color") >= 0) {
        for (var s2, e2 = r2.content, t2 = e2.split(n2).join(""), i = 0, a = o2.length; i < a && !s2; i++)
          s2 = o2[i](t2);
        if (!s2)
          return;
        var c = '<span class="inline-color-wrapper"><span class="inline-color" style="background-color:' + s2 + ';"></span></span>';
        r2.content = c + e2;
      }
    });
  }
}();
!function() {
  if ("undefined" != typeof Prism) {
    var i = { pattern: /(.)\bdata:[^\/]+\/[^,]+,(?:(?!\1)[\s\S]|\\\1)+(?=\1)/, lookbehind: true, inside: { "language-css": { pattern: /(data:[^\/]+\/(?:[^+,]+\+)?css,)[\s\S]+/, lookbehind: true }, "language-javascript": { pattern: /(data:[^\/]+\/(?:[^+,]+\+)?javascript,)[\s\S]+/, lookbehind: true }, "language-json": { pattern: /(data:[^\/]+\/(?:[^+,]+\+)?json,)[\s\S]+/, lookbehind: true }, "language-markup": { pattern: /(data:[^\/]+\/(?:[^+,]+\+)?(?:html|xml),)[\s\S]+/, lookbehind: true } } }, a = ["url", "attr-value", "string"];
    Prism.plugins.dataURIHighlight = { processGrammar: function(n2) {
      n2 && !n2["data-uri"] && (Prism.languages.DFS(n2, function(n3, r, e2) {
        a.indexOf(e2) > -1 && !Array.isArray(r) && (r.pattern || (r = this[n3] = { pattern: r }), r.inside = r.inside || {}, "attr-value" == e2 ? Prism.languages.insertBefore("inside", r.inside["url-link"] ? "url-link" : "punctuation", { "data-uri": i }, r) : r.inside["url-link"] ? Prism.languages.insertBefore("inside", "url-link", { "data-uri": i }, r) : r.inside["data-uri"] = i);
      }), n2["data-uri"] = i);
    } }, Prism.hooks.add("before-highlight", function(a2) {
      if (i.pattern.test(a2.code)) {
        for (var n2 in i.inside)
          if (i.inside.hasOwnProperty(n2) && !i.inside[n2].inside && i.inside[n2].pattern.test(a2.code)) {
            var r = n2.match(/^language-(.+)/)[1];
            Prism.languages[r] && (i.inside[n2].inside = { rest: (e2 = Prism.languages[r], Prism.plugins.autolinker && Prism.plugins.autolinker.processGrammar(e2), e2) });
          }
      }
      var e2;
      Prism.plugins.dataURIHighlight.processGrammar(a2.grammar);
    });
  }
}();
!function() {
  if ("undefined" != typeof Prism) {
    var e2 = /^diff-([\w-]+)/i, i = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g, a = RegExp("(?:__|[^\r\n<])*(?:\r\n?|\n|(?:__|[^\r\n<])(?![^\r\n]))".replace(/__/g, function() {
      return i.source;
    }), "gi"), s2 = false;
    Prism.hooks.add("before-sanity-check", function(i2) {
      var a2 = i2.language;
      e2.test(a2) && !i2.grammar && (i2.grammar = Prism.languages[a2] = Prism.languages.diff);
    }), Prism.hooks.add("before-tokenize", function(i2) {
      s2 || Prism.languages.diff || Prism.plugins.autoloader || (s2 = true, console.warn("Prism's Diff Highlight plugin requires the Diff language definition (prism-diff.js).Make sure the language definition is loaded or use Prism's Autoloader plugin."));
      var a2 = i2.language;
      e2.test(a2) && !Prism.languages[a2] && (Prism.languages[a2] = Prism.languages.diff);
    }), Prism.hooks.add("wrap", function(s3) {
      var r, n2;
      if ("diff" !== s3.language) {
        var g = e2.exec(s3.language);
        if (!g)
          return;
        r = g[1], n2 = Prism.languages[r];
      }
      var f2 = Prism.languages.diff && Prism.languages.diff.PREFIXES;
      if (f2 && s3.type in f2) {
        var u, l = s3.content.replace(i, "").replace(/&lt;/g, "<").replace(/&amp;/g, "&"), t2 = l.replace(/(^|[\r\n])./g, "$1");
        u = n2 ? Prism.highlight(t2, n2, r) : Prism.util.encode(t2);
        var o2, m = new Prism.Token("prefix", f2[s3.type], [/\w+/.exec(s3.type)[0]]), d = Prism.Token.stringify(m, s3.language), c = [];
        for (a.lastIndex = 0; o2 = a.exec(u); )
          c.push(d + o2[0]);
        /(?:^|[\r\n]).$/.test(l) && c.push(d), s3.content = c.join(""), n2 && s3.classes.push("language-" + r);
      }
    });
  }
}();
!function() {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector);
    var e2, t2 = Prism.util.currentScript(), n2 = [], r = Prism.plugins.filterHighlightAll = { add: function(e3) {
      n2.push(function(t3) {
        return e3({ element: t3, language: Prism.util.getLanguage(t3) });
      });
    }, addSelector: function(e3) {
      n2.push(function(t3) {
        return t3.matches(e3);
      });
    }, reject: { add: function(e3) {
      n2.push(function(t3) {
        return !e3({ element: t3, language: Prism.util.getLanguage(t3) });
      });
    }, addSelector: function(e3) {
      n2.push(function(t3) {
        return !t3.matches(e3);
      });
    } }, filterKnown: !!t2 && t2.hasAttribute("data-filter-known") };
    r.add(function(e3) {
      return !r.filterKnown || "object" == typeof Prism.languages[e3.language];
    }), t2 && ((e2 = t2.getAttribute("data-filter-selector")) && r.addSelector(e2), (e2 = t2.getAttribute("data-reject-selector")) && r.reject.addSelector(e2)), Prism.hooks.add("before-all-elements-highlight", function(e3) {
      e3.elements = e3.elements.filter(i);
    });
  }
  function i(e3) {
    for (var t3 = 0, r2 = n2.length; t3 < r2; t3++)
      if (!n2[t3](e3))
        return false;
    return true;
  }
}();
function Highlight(vm) {
  this.vm = vm;
}
Highlight.prototype.onParse = function(node, vm) {
  if (node.name === "pre") {
    if (vm.options.editable) {
      node.attrs.class = (node.attrs.class || "") + " hl-pre";
      return;
    }
    let i;
    for (i = node.children.length; i--; ) {
      if (node.children[i].name === "code")
        break;
    }
    if (i === -1)
      return;
    const code = node.children[i];
    let className = code.attrs.class + " " + node.attrs.class;
    i = className.indexOf("language-");
    if (i === -1) {
      i = className.indexOf("lang-");
      if (i === -1) {
        className = "language-text";
        i = 9;
      } else {
        i += 5;
      }
    } else {
      i += 9;
    }
    let j;
    for (j = i; j < className.length; j++) {
      if (className[j] === " ")
        break;
    }
    const lang = className.substring(i, j);
    if (code.children.length) {
      const text = this.vm.getText(code.children).replace(/&amp;/g, "&");
      if (!text)
        return;
      if (node.c) {
        node.c = void 0;
      }
      if (Prism.languages[lang]) {
        code.children = new Parser$1(this.vm).parse(
          // 加一层 pre 保留空白符
          "<pre>" + Prism.highlight(text, Prism.languages[lang], lang).replace(/token /g, "hl-") + "</pre>"
        )[0].children;
      }
      node.attrs.class = "hl-pre";
      code.attrs.class = "hl-code";
    }
  }
};
function Search(vm) {
  vm.search = function(key, anchor, style = "background-color:yellow") {
    const res = [];
    const stack2 = [];
    (function traversal(nodes) {
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (node.type === "text" && key) {
          const text = node.text;
          const arr = text.split(key);
          if (arr.length > 1) {
            node = {
              name: "span",
              attrs: {},
              type: "node",
              c: 1,
              s: 1,
              children: []
            };
            vm.$set(nodes, i, node);
            for (let j = 0; j < arr.length; j++) {
              if (arr[j]) {
                node.children.push({
                  type: "text",
                  text: arr[j]
                });
              }
              if (j !== arr.length - 1) {
                node.children.push({
                  name: "span",
                  attrs: {
                    id: anchor ? "search" + (res.length + 1) : void 0,
                    // 用于锚点的 id
                    style
                  },
                  c: 1,
                  children: [{
                    type: "text",
                    text: key instanceof RegExp ? key.exec(text)[0] : key
                  }]
                });
                res.push(node.children[node.children.length - 1].attrs);
              }
            }
            if (key instanceof RegExp) {
              key.exec(text);
            }
            if (anchor) {
              for (let l = stack2.length; l--; ) {
                if (stack2[l].c) {
                  break;
                } else {
                  vm.$set(stack2[l], "c", 1);
                }
              }
            }
          }
        } else if (node.s) {
          let text = "";
          for (let k = 0; k < node.children.length; k++) {
            const child = node.children[k];
            if (child.text) {
              text += child.text;
            } else {
              text += child.children[0].text;
            }
          }
          vm.$set(nodes, i, {
            type: "text",
            text
          });
          if (key && (key instanceof RegExp ? key.test(text) : text.includes(key))) {
            i--;
          }
        } else if (node.children) {
          stack2.push(node);
          traversal(node.children);
          stack2.pop();
        }
      }
    })(vm.nodes);
    return new Promise(function(resolve2) {
      setTimeout(() => {
        resolve2({
          num: res.length,
          // 结果数量
          /**
           * @description 高亮某一个结果
           * @param {number} i 第几个
           * @param {string} hlstyle 高亮的样式
           */
          highlight(i, hlstyle = "background-color:#FF9632") {
            if (i < 1 || i > res.length)
              return;
            if (this.last) {
              res[this.last - 1].style = style;
            }
            this.last = i;
            res[i - 1].style = hlstyle;
          },
          /**
           * @description 跳转到搜索结果
           * @param {number} i 第几个
           * @param {number} offset 偏移量
           */
          jump: anchor ? (i, offset) => {
            if (i > 0 && i <= res.length) {
              vm.navigateTo("search" + i, offset);
            }
          } : void 0
        });
      }, 200);
    });
  };
}
const blank = {
  " ": true,
  "\n": true,
  "	": true,
  "\r": true,
  "\f": true
};
function Parser() {
  this.styles = [];
  this.selectors = [];
}
Parser.prototype.parse = function(content) {
  new Lexer(this).parse(content);
  return this.styles;
};
Parser.prototype.onSelector = function(name) {
  if (name.includes("[") || name.includes("*") || name.includes("@"))
    return;
  const selector = {};
  if (name.includes(":")) {
    const info = name.split(":");
    const pseudo = info.pop();
    if (pseudo === "before" || pseudo === "after") {
      selector.pseudo = pseudo;
      name = info[0];
    } else
      return;
  }
  function splitItem(str) {
    const arr = [];
    let i, start;
    for (i = 1, start = 0; i < str.length; i++) {
      if (str[i] === "." || str[i] === "#") {
        arr.push(str.substring(start, i));
        start = i;
      }
    }
    if (!arr.length) {
      return str;
    } else {
      arr.push(str.substring(start, i));
      return arr;
    }
  }
  if (name.includes(" ")) {
    selector.list = [];
    const list = name.split(" ");
    for (let i = 0; i < list.length; i++) {
      if (list[i].length) {
        const arr = list[i].split(">");
        for (let j = 0; j < arr.length; j++) {
          selector.list.push(splitItem(arr[j]));
          if (j < arr.length - 1) {
            selector.list.push(">");
          }
        }
      }
    }
  } else {
    selector.key = splitItem(name);
  }
  this.selectors.push(selector);
};
Parser.prototype.onContent = function(content) {
  for (let i = 0; i < this.selectors.length; i++) {
    this.selectors[i].style = content;
  }
  this.styles = this.styles.concat(this.selectors);
  this.selectors = [];
};
function Lexer(handler) {
  this.selector = "";
  this.style = "";
  this.handler = handler;
}
Lexer.prototype.parse = function(content) {
  this.i = 0;
  this.content = content;
  this.state = this.blank;
  for (let len = content.length; this.i < len; this.i++) {
    this.state(content[this.i]);
  }
};
Lexer.prototype.comment = function() {
  this.i = this.content.indexOf("*/", this.i) + 1;
  if (!this.i) {
    this.i = this.content.length;
  }
};
Lexer.prototype.blank = function(c) {
  if (!blank[c]) {
    if (c === "/" && this.content[this.i + 1] === "*") {
      this.comment();
      return;
    }
    this.selector += c;
    this.state = this.name;
  }
};
Lexer.prototype.name = function(c) {
  if (c === "/" && this.content[this.i + 1] === "*") {
    this.comment();
    return;
  }
  if (c === "{" || c === "," || c === ";") {
    this.handler.onSelector(this.selector.trimEnd());
    this.selector = "";
    if (c !== "{") {
      while (blank[this.content[++this.i]])
        ;
    }
    if (this.content[this.i] === "{") {
      this.floor = 1;
      this.state = this.val;
    } else {
      this.selector += this.content[this.i];
    }
  } else if (blank[c]) {
    this.selector += " ";
  } else {
    this.selector += c;
  }
};
Lexer.prototype.val = function(c) {
  if (c === "/" && this.content[this.i + 1] === "*") {
    this.comment();
    return;
  }
  if (c === "{") {
    this.floor++;
  } else if (c === "}") {
    this.floor--;
    if (!this.floor) {
      this.handler.onContent(this.style);
      this.style = "";
      this.state = this.blank;
      return;
    }
  }
  this.style += c;
};
function Style() {
  this.styles = [];
}
Style.prototype.onParse = function(node, vm) {
  if (node.name === "style" && node.children.length && node.children[0].type === "text") {
    this.styles = this.styles.concat(new Parser().parse(node.children[0].text));
  } else if (node.name) {
    let matched = ["", "", "", ""];
    for (let i = 0, len = this.styles.length; i < len; i++) {
      const item = this.styles[i];
      let res = match(node, item.key || item.list[item.list.length - 1]);
      let j;
      if (res) {
        if (!item.key) {
          j = item.list.length - 2;
          for (let k = vm.stack.length; j >= 0 && k--; ) {
            if (item.list[j] === ">") {
              if (j < 1 || j > item.list.length - 2)
                break;
              if (match(vm.stack[k], item.list[j - 1])) {
                j -= 2;
              } else {
                j++;
              }
            } else if (match(vm.stack[k], item.list[j])) {
              j--;
            }
          }
          res = 4;
        }
        if (item.key || j < 0) {
          if (item.pseudo && node.children) {
            let text;
            item.style = item.style.replace(/content:([^;]+)/, (_, $1) => {
              text = $1.replace(/['"]/g, "").replace(/attr\((.+?)\)/, (_2, $12) => node.attrs[$12.trim()] || "").replace(/\\(\w{4})/, (_2, $12) => String.fromCharCode(parseInt($12, 16)));
              return "";
            });
            const pseudo = {
              name: "span",
              attrs: {
                style: item.style
              },
              children: [{
                type: "text",
                text
              }]
            };
            if (item.pseudo === "before") {
              node.children.unshift(pseudo);
            } else {
              node.children.push(pseudo);
            }
          } else {
            matched[res - 1] += item.style + (item.style[item.style.length - 1] === ";" ? "" : ";");
          }
        }
      }
    }
    matched = matched.join("");
    if (matched.length > 2) {
      node.attrs.style = matched + (node.attrs.style || "");
    }
  }
};
function match(node, keys) {
  function matchItem(key) {
    if (key[0] === "#") {
      if (node.attrs.id && node.attrs.id.trim() === key.substr(1))
        return 3;
    } else if (key[0] === ".") {
      key = key.substr(1);
      const selectors = (node.attrs.class || "").split(" ");
      for (let i = 0; i < selectors.length; i++) {
        if (selectors[i].trim() === key)
          return 2;
      }
    } else if (node.name === key) {
      return 1;
    }
    return 0;
  }
  if (keys instanceof Array) {
    let res = 0;
    for (let j = 0; j < keys.length; j++) {
      const tmp = matchItem(keys[j]);
      if (!tmp)
        return 0;
      if (tmp > res) {
        res = tmp;
      }
    }
    return res;
  }
  return matchItem(keys);
}
function Card(vm) {
}
const config = {
  // 普通标签的菜单项
  node: ["大小", "颜色", "斜体", "粗体", "下划线", "居中", "缩进", "上移", "下移", "删除"],
  // 可以设置的文字颜色，此项可以添加 css 颜色
  color: ["red", "yellow", "blue", "green", "gray", "white", "black"],
  // 图片的菜单项
  img: ["换图", "宽度", "超链接", "预览图", "禁用预览", "上移", "下移", "删除"],
  // 链接的菜单项
  link: ["更换链接", "上移", "下移", "删除"],
  // 音视频的菜单项
  media: ["封面", "循环", "自动播放", "上移", "下移", "删除"],
  // 卡片的菜单项
  card: ["上移", "下移", "删除"]
};
function Editable(vm) {
  this.vm = vm;
  this.editHistory = [];
  this.editI = -1;
  vm._mask = [];
  vm._setData = function(path, val) {
    const paths = path.split(".");
    let target = vm;
    for (let i = 0; i < paths.length - 1; i++) {
      target = target[paths[i]];
    }
    vm.$set(target, paths.pop(), val);
  };
  const move = (num) => {
    setTimeout(() => {
      const item = this.editHistory[this.editI + num];
      if (item) {
        this.editI += num;
        vm._setData(item.key, item.value);
      }
    }, 200);
  };
  vm.undo = () => move(-1);
  vm.redo = () => move(1);
  vm._editVal = (path, oldVal, newVal, set2) => {
    while (this.editI < this.editHistory.length - 1) {
      this.editHistory.pop();
    }
    while (this.editHistory.length > 30) {
      this.editHistory.pop();
      this.editI--;
    }
    const last = this.editHistory[this.editHistory.length - 1];
    if (!last || last.key !== path) {
      if (last) {
        this.editHistory.pop();
        this.editI--;
      }
      this.editHistory.push({
        key: path,
        value: oldVal
      });
      this.editI++;
    }
    this.editHistory.push({
      key: path,
      value: newVal
    });
    this.editI++;
    if (set2) {
      vm._setData(path, newVal);
    }
  };
  vm._getItem = function(node, up, down) {
    let items;
    let i;
    if (node === "color") {
      return config.color;
    }
    if (node.name === "img") {
      items = config.img.slice(0);
      if (!vm.getSrc) {
        i = items.indexOf("换图");
        if (i !== -1) {
          items.splice(i, 1);
        }
        i = items.indexOf("超链接");
        if (i !== -1) {
          items.splice(i, 1);
        }
        i = items.indexOf("预览图");
        if (i !== -1) {
          items.splice(i, 1);
        }
      }
      i = items.indexOf("禁用预览");
      if (i !== -1 && node.attrs.ignore) {
        items[i] = "启用预览";
      }
    } else if (node.name === "a") {
      items = config.link.slice(0);
      if (!vm.getSrc) {
        i = items.indexOf("更换链接");
        if (i !== -1) {
          items.splice(i, 1);
        }
      }
    } else if (node.name === "video" || node.name === "audio") {
      items = config.media.slice(0);
      i = items.indexOf("封面");
      if (!vm.getSrc && i !== -1) {
        items.splice(i, 1);
      }
      i = items.indexOf("循环");
      if (node.attrs.loop && i !== -1) {
        items[i] = "不循环";
      }
      i = items.indexOf("自动播放");
      if (node.attrs.autoplay && i !== -1) {
        items[i] = "不自动播放";
      }
    } else if (node.name === "card") {
      items = config.card.slice(0);
    } else {
      items = config.node.slice(0);
    }
    if (!up) {
      i = items.indexOf("上移");
      if (i !== -1) {
        items.splice(i, 1);
      }
    }
    if (!down) {
      i = items.indexOf("下移");
      if (i !== -1) {
        items.splice(i, 1);
      }
    }
    return items;
  };
  vm._tooltip = function(obj) {
    vm.$set(vm, "tooltip", {
      top: obj.top,
      items: obj.items
    });
    vm._tooltipcb = obj.success;
  };
  vm._slider = function(obj) {
    vm.$set(vm, "slider", {
      min: obj.min,
      max: obj.max,
      value: obj.value,
      top: obj.top
    });
    vm._slideringcb = obj.changing;
    vm._slidercb = obj.change;
  };
  vm._color = function(obj) {
    vm.$set(vm, "color", {
      items: obj.items,
      top: obj.top
    });
    vm._colorcb = obj.success;
  };
  vm._maskTap = function() {
    while (vm._mask.length) {
      vm._mask.pop()();
    }
    if (vm.tooltip) {
      vm.$set(vm, "tooltip", null);
    }
    if (vm.slider) {
      vm.$set(vm, "slider", null);
    }
    if (vm.color) {
      vm.$set(vm, "color", null);
    }
  };
  function insert(node) {
    if (vm._edit) {
      vm._edit.insert(node);
    } else {
      const nodes = vm.nodes.slice(0);
      nodes.push(node);
      vm._editVal("nodes", vm.nodes, nodes, true);
    }
  }
  vm.insertHtml = (html) => {
    this.inserting = true;
    const arr = new Parser$1(vm).parse(html);
    this.inserting = void 0;
    for (let i = 0; i < arr.length; i++) {
      insert(arr[i]);
    }
  };
  vm.insertImg = function() {
    vm.getSrc && vm.getSrc("img").then((src) => {
      if (typeof src === "string") {
        src = [src];
      }
      const parser = new Parser$1(vm);
      for (let i = 0; i < src.length; i++) {
        insert({
          name: "img",
          attrs: {
            src: parser.getUrl(src[i])
          }
        });
      }
    }).catch(() => {
    });
  };
  vm.insertLink = function() {
    vm.getSrc && vm.getSrc("link").then((url) => {
      insert({
        name: "a",
        attrs: {
          href: url
        },
        children: [{
          type: "text",
          text: url
        }]
      });
    }).catch(() => {
    });
  };
  vm.insertTable = function(rows, cols) {
    const table = {
      name: "table",
      attrs: {
        style: "display:table;width:100%;margin:10px 0;text-align:center;border-spacing:0;border-collapse:collapse;border:1px solid gray"
      },
      children: []
    };
    for (let i = 0; i < rows; i++) {
      const tr = {
        name: "tr",
        attrs: {},
        children: []
      };
      for (let j = 0; j < cols; j++) {
        tr.children.push({
          name: "td",
          attrs: {
            style: "padding:2px;border:1px solid gray"
          },
          children: [{
            type: "text",
            text: ""
          }]
        });
      }
      table.children.push(tr);
    }
    insert(table);
  };
  function insertMedia(node) {
    if (typeof node.src === "string") {
      node.src = [node.src];
    }
    const parser = new Parser$1(vm);
    for (let i = 0; i < node.src.length; i++) {
      node.src[i] = parser.getUrl(node.src[i]);
    }
    insert({
      name: "div",
      attrs: {
        style: "text-align:center"
      },
      children: [node]
    });
  }
  vm.insertVideo = function() {
    vm.getSrc && vm.getSrc("video").then((src) => {
      insertMedia({
        name: "video",
        attrs: {
          controls: "T"
        },
        children: [],
        src
      });
    }).catch(() => {
    });
  };
  vm.insertAudio = function() {
    vm.getSrc && vm.getSrc("audio").then((attrs) => {
      let src;
      if (attrs.src) {
        src = attrs.src;
        attrs.src = void 0;
      } else {
        src = attrs;
        attrs = {};
      }
      attrs.controls = "T";
      insertMedia({
        name: "audio",
        attrs,
        children: [],
        src
      });
    }).catch(() => {
    });
  };
  vm.insertText = function() {
    insert({
      name: "p",
      attrs: {},
      children: [{
        type: "text",
        text: ""
      }]
    });
  };
  vm.clear = function() {
    vm._maskTap();
    vm._edit = void 0;
    vm.$set(vm, "nodes", [{
      name: "p",
      attrs: {},
      children: [{
        type: "text",
        text: ""
      }]
    }]);
  };
  vm.getContent = function() {
    let html = "";
    (function traversal(nodes, table) {
      for (let i = 0; i < nodes.length; i++) {
        let item = nodes[i];
        if (item.type === "text") {
          html += item.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>").replace(/\xa0/g, "&nbsp;");
        } else {
          if (item.name === "img") {
            item.attrs.i = "";
            if ((item.attrs.src || "").includes("data:image/svg+xml;utf8,")) {
              html += item.attrs.src.substr(24).replace(/%23/g, "#").replace("<svg", '<svg style="' + (item.attrs.style || "") + '"');
              continue;
            }
          } else if (item.name === "video" || item.name === "audio") {
            item = JSON.parse(JSON.stringify(item));
            if (item.src.length > 1) {
              item.children = [];
              for (let j = 0; j < item.src.length; j++) {
                item.children.push({
                  name: "source",
                  attrs: {
                    src: item.src[j]
                  }
                });
              }
            } else {
              item.attrs.src = item.src[0];
            }
          } else if (item.name === "div" && (item.attrs.style || "").includes("overflow:auto") && (item.children[0] || {}).name === "table") {
            item = item.children[0];
          }
          if (item.name === "table") {
            item = JSON.parse(JSON.stringify(item));
            table = item.attrs;
            if ((item.attrs.style || "").includes("display:grid")) {
              item.attrs.style = item.attrs.style.split("display:grid")[0];
              const children = [{
                name: "tr",
                attrs: {},
                children: []
              }];
              for (let j = 0; j < item.children.length; j++) {
                item.children[j].attrs.style = item.children[j].attrs.style.replace(/grid-[^;]+;*/g, "");
                if (item.children[j].r !== children.length) {
                  children.push({
                    name: "tr",
                    attrs: {},
                    children: [item.children[j]]
                  });
                } else {
                  children[children.length - 1].children.push(item.children[j]);
                }
              }
              item.children = children;
            }
          }
          html += "<" + item.name;
          for (const attr in item.attrs) {
            let val = item.attrs[attr];
            if (!val)
              continue;
            if (val === "T" || val === true) {
              html += " " + attr;
              continue;
            } else if (item.name[0] === "t" && attr === "style" && table) {
              val = val.replace(/;*display:table[^;]*/, "");
              if (table.border) {
                val = val.replace(/border[^;]+;*/g, ($) => $.includes("collapse") ? $ : "");
              }
              if (table.cellpadding) {
                val = val.replace(/padding[^;]+;*/g, "");
              }
              if (!val)
                continue;
            }
            html += " " + attr + '="' + val.replace(/"/g, "&quot;") + '"';
          }
          html += ">";
          if (item.children) {
            traversal(item.children, table);
            html += "</" + item.name + ">";
          }
        }
      }
    })(vm.nodes);
    for (let i = vm.plugins.length; i--; ) {
      if (vm.plugins[i].onGetContent) {
        html = vm.plugins[i].onGetContent(html) || html;
      }
    }
    return html;
  };
}
Editable.prototype.onUpdate = function(content, config2) {
  if (this.vm.editable) {
    this.vm._maskTap();
    config2.entities.amp = "&";
    if (!this.inserting) {
      this.vm._edit = void 0;
      if (!content) {
        setTimeout(() => {
          this.vm.$set(this.vm, "nodes", [{
            name: "p",
            attrs: {},
            children: [{
              type: "text",
              text: ""
            }]
          }]);
        }, 0);
      }
    }
  }
};
Editable.prototype.onParse = function(node) {
  if (this.vm.editable && (node.name === "td" || node.name === "th") && !this.vm.getText(node.children)) {
    node.children.push({
      type: "text",
      text: ""
    });
  }
};
exports.Audio = Audio;
exports.Card = Card;
exports.Editable = Editable;
exports.Emoji = Emoji;
exports.Highlight = Highlight;
exports.Markdown = Markdown;
exports.Parser = Parser$1;
exports.Search = Search;
exports.Style = Style;
exports._export_sfc = _export_sfc;
exports.context = context;
exports.createSSRApp = createSSRApp;
exports.e = e;
exports.f = f;
exports.getCurrentInstance = getCurrentInstance;
exports.index = index$2;
exports.n = n;
exports.nextTick$1 = nextTick$1;
exports.o = o;
exports.onBeforeUnmount = onBeforeUnmount;
exports.onHide = onHide;
exports.onLaunch = onLaunch;
exports.onLoad = onLoad;
exports.onMounted = onMounted;
exports.onPageScroll = onPageScroll;
exports.onReachBottom = onReachBottom;
exports.onShareAppMessage = onShareAppMessage;
exports.onShareTimeline = onShareTimeline;
exports.onShow = onShow;
exports.onUnload = onUnload;
exports.p = p;
exports.reactive = reactive;
exports.ref = ref;
exports.resolveComponent = resolveComponent;
exports.s = s;
exports.t = t$1;
exports.wx$1 = wx$1;
