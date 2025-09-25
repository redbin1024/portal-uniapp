"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "DataLoader",
  props: {
    // 请求函数
    requestFn: {
      type: Function,
      required: true
    },
    // 请求参数
    params: {
      type: Object,
      default: () => ({})
    },
    // 是否自动加载
    autoLoad: {
      type: Boolean,
      default: true
    },
    // 是否支持分页
    pagination: {
      type: Boolean,
      default: false
    },
    // 每页数量
    pageSize: {
      type: Number,
      default: 10
    },
    // 数据路径（用于从响应中提取数据）
    dataPath: {
      type: String,
      default: ""
    },
    // 总数路径（用于分页）
    totalPath: {
      type: String,
      default: "total"
    },
    // 加载文本
    loadingText: {
      type: String,
      default: "加载中..."
    },
    // 空数据文本
    emptyText: {
      type: String,
      default: "暂无数据"
    },
    // 是否在空数据时显示刷新按钮
    showRefreshOnEmpty: {
      type: Boolean,
      default: true
    },
    // 是否显示没有更多数据提示
    showNoMoreTip: {
      type: Boolean,
      default: true
    },
    // 重试次数
    maxRetries: {
      type: Number,
      default: 3
    },
    // 重试延迟（毫秒）
    retryDelay: {
      type: Number,
      default: 1e3
    },
    // 缓存时间（毫秒，0表示不缓存）
    cacheTime: {
      type: Number,
      default: 0
    },
    // 缓存键
    cacheKey: {
      type: String,
      default: ""
    },
    // 是否启用下拉刷新
    enablePullRefresh: {
      type: Boolean,
      default: false
    },
    // 是否启用触底加载更多
    enableReachBottom: {
      type: Boolean,
      default: false
    },
    // 触底距离
    reachBottomDistance: {
      type: Number,
      default: 50
    }
  },
  emits: [
    "success",
    "error",
    "loading",
    "refresh",
    "loadMore",
    "dataChange"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const data = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const loadingMore = common_vendor.ref(false);
    const refreshing = common_vendor.ref(false);
    const error = common_vendor.ref(null);
    const currentPage = common_vendor.ref(1);
    const total = common_vendor.ref(0);
    const retryCount = common_vendor.ref(0);
    const cache = common_vendor.reactive(/* @__PURE__ */ new Map());
    const hasMore = common_vendor.computed(() => {
      if (!props.pagination)
        return false;
      return data.value.length < total.value;
    });
    const extractData = (response) => {
      if (!props.dataPath)
        return response;
      const paths = props.dataPath.split(".");
      let result = response;
      for (const path of paths) {
        if (result && typeof result === "object" && path in result) {
          result = result[path];
        } else {
          return [];
        }
      }
      return Array.isArray(result) ? result : [];
    };
    const extractTotal = (response) => {
      if (!props.totalPath)
        return 0;
      const paths = props.totalPath.split(".");
      let result = response;
      for (const path of paths) {
        if (result && typeof result === "object" && path in result) {
          result = result[path];
        } else {
          return 0;
        }
      }
      return Number(result) || 0;
    };
    const generateCacheKey = (params, page = 1) => {
      const baseKey = props.cacheKey || "data-loader";
      const paramsStr = JSON.stringify(__spreadProps(__spreadValues({}, params), { page }));
      return `${baseKey}-${paramsStr}`;
    };
    const getCachedData = (cacheKey) => {
      if (!props.cacheTime || !cacheKey)
        return null;
      const cached = cache.get(cacheKey);
      if (!cached)
        return null;
      const now = Date.now();
      if (now - cached.timestamp > props.cacheTime) {
        cache.delete(cacheKey);
        return null;
      }
      return cached.data;
    };
    const setCachedData = (cacheKey, data2) => {
      if (!props.cacheTime || !cacheKey)
        return;
      cache.set(cacheKey, {
        data: data2,
        timestamp: Date.now()
      });
    };
    const executeRequest = (params, isLoadMore = false, useCache = true) => __async(this, null, function* () {
      const requestParams = __spreadValues(__spreadValues({}, props.params), params);
      if (props.pagination) {
        requestParams.pageSize = props.pageSize;
        requestParams.pageNum = isLoadMore ? currentPage.value + 1 : 1;
      }
      const cacheKey = generateCacheKey(requestParams, requestParams.pageNum);
      if (useCache) {
        const cachedData = getCachedData(cacheKey);
        if (cachedData) {
          return cachedData;
        }
      }
      try {
        const response = yield props.requestFn(requestParams);
        setCachedData(cacheKey, response);
        return response;
      } catch (err) {
        throw err;
      }
    });
    const loadData = (..._0) => __async(this, [..._0], function* (params = {}, isLoadMore = false, useCache = true) {
      if (loading.value && !isLoadMore)
        return;
      if (loadingMore.value && isLoadMore)
        return;
      try {
        if (isLoadMore) {
          loadingMore.value = true;
        } else {
          loading.value = true;
          error.value = null;
        }
        emit("loading", { isLoadMore });
        const response = yield executeRequest(params, isLoadMore, useCache);
        const newData = extractData(response);
        const newTotal = extractTotal(response);
        if (isLoadMore) {
          data.value = [...data.value, ...newData];
          currentPage.value++;
        } else {
          data.value = newData;
          currentPage.value = 1;
        }
        total.value = newTotal;
        retryCount.value = 0;
        emit("success", { data: data.value, response, isLoadMore });
        emit("dataChange", data.value);
      } catch (err) {
        console.error("数据加载失败:", err);
        error.value = err;
        emit("error", { error: err, isLoadMore });
        if (!isLoadMore) {
          data.value = [];
        }
      } finally {
        loading.value = false;
        loadingMore.value = false;
      }
    });
    const refresh = (..._0) => __async(this, [..._0], function* (params = {}) {
      refreshing.value = true;
      emit("refresh");
      try {
        yield loadData(params, false, false);
      } finally {
        refreshing.value = false;
      }
    });
    const loadMore = () => __async(this, null, function* () {
      if (!hasMore.value || loadingMore.value)
        return;
      emit("loadMore");
      yield loadData({}, true);
    });
    const retry = () => __async(this, null, function* () {
      retryCount.value = 0;
      yield loadData({}, false, false);
    });
    const clear = () => {
      data.value = [];
      currentPage.value = 1;
      total.value = 0;
      error.value = null;
      loading.value = false;
      loadingMore.value = false;
      refreshing.value = false;
    };
    const clearCache = () => {
      cache.clear();
    };
    common_vendor.watch(
      () => props.params,
      (newParams) => {
        if (props.autoLoad) {
          loadData(newParams, false, false);
        }
      },
      { deep: true }
    );
    const handlePullRefresh = () => {
      if (props.enablePullRefresh) {
        refresh();
      }
    };
    const handleReachBottom = () => {
      if (props.enableReachBottom && hasMore.value) {
        loadMore();
      }
    };
    common_vendor.onMounted(() => {
      if (props.autoLoad) {
        loadData();
      }
      if (props.enablePullRefresh) {
        common_vendor.index.$on("onPullDownRefresh", handlePullRefresh);
      }
      if (props.enableReachBottom) {
        common_vendor.index.$on("onReachBottom", handleReachBottom);
      }
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("onPullDownRefresh", handlePullRefresh);
      common_vendor.index.$off("onReachBottom", handleReachBottom);
    });
    __expose({
      data,
      loading,
      error,
      refresh,
      loadMore,
      retry,
      clear,
      clearCache,
      loadData
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value && !data.value.length
      }, loading.value && !data.value.length ? {
        b: common_vendor.t(__props.loadingText)
      } : error.value && !data.value.length ? {
        d: common_vendor.t(error.value.message || "加载失败"),
        e: common_vendor.o(retry)
      } : !loading.value && !data.value.length ? common_vendor.e({
        g: common_vendor.t(__props.emptyText),
        h: __props.showRefreshOnEmpty
      }, __props.showRefreshOnEmpty ? {
        i: common_vendor.o(refresh)
      } : {}) : common_vendor.e({
        j: refreshing.value
      }, refreshing.value ? {} : {}, {
        k: common_vendor.r("d", {
          data: data.value,
          loading: loading.value,
          error: error.value,
          refresh,
          loadMore
        }),
        l: hasMore.value && data.value.length
      }, hasMore.value && data.value.length ? common_vendor.e({
        m: loadingMore.value
      }, loadingMore.value ? {} : {
        n: common_vendor.o(loadMore)
      }) : {}, {
        o: !hasMore.value && data.value.length && __props.showNoMoreTip
      }, !hasMore.value && data.value.length && __props.showNoMoreTip ? {} : {}), {
        c: error.value && !data.value.length,
        f: !loading.value && !data.value.length
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-aff7c20b"]]);
wx.createComponent(Component);
