·
<template>
  <view class="data-loader">
    <!-- 加载状态 -->
    <view v-if="loading && !data.length" class="loading-container">
      <view class="loading-spinner">
        <view class="spinner"></view>
      </view>
      <text class="loading-text">{{ loadingText }}</text>
    </view>

    <!-- 错误状态 -->
    <view v-else-if="error && !data.length" class="error-container">
      <view class="error-icon">⚠️</view>
      <text class="error-message">{{ error.message || "加载失败" }}</text>
      <button class="retry-btn" @click="retry">重试</button>
    </view>

    <!-- 空数据状态 -->
    <view v-else-if="!loading && !data.length" class="empty-container">
      <view class="empty-icon">📭</view>
      <text class="empty-message">{{ emptyText }}</text>
      <button v-if="showRefreshOnEmpty" class="refresh-btn" @click="refresh">
        刷新
      </button>
    </view>

    <!-- 数据内容 -->
    <view v-else class="content-container">
      <!-- 下拉刷新指示器 -->
      <view v-if="refreshing" class="refresh-indicator">
        <view class="refresh-spinner"></view>
        <text class="refresh-text">刷新中...</text>
      </view>

      <!-- 插槽内容 -->
      <slot
        :data="data"
        :loading="loading"
        :error="error"
        :refresh="refresh"
        :loadMore="loadMore"
      ></slot>

      <!-- 加载更多 -->
      <view v-if="hasMore && data.length" class="load-more-container">
        <view v-if="loadingMore" class="loading-more">
          <view class="loading-more-spinner"></view>
          <text>加载更多...</text>
        </view>
        <button v-else class="load-more-btn" @click="loadMore">加载更多</button>
      </view>

      <!-- 没有更多数据 -->
      <view
        v-if="!hasMore && data.length && showNoMoreTip"
        class="no-more-container"
      >
        <text class="no-more-text">没有更多数据了</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, watch, computed } from "vue";

// Props 定义
const props = defineProps({
  // 请求函数
  requestFn: {
    type: Function,
    required: true,
  },
  // 请求参数
  params: {
    type: Object,
    default: () => ({}),
  },
  // 是否自动加载
  autoLoad: {
    type: Boolean,
    default: true,
  },
  // 是否支持分页
  pagination: {
    type: Boolean,
    default: false,
  },
  // 每页数量
  pageSize: {
    type: Number,
    default: 10,
  },
  // 数据路径（用于从响应中提取数据）
  dataPath: {
    type: String,
    default: "",
  },
  // 总数路径（用于分页）
  totalPath: {
    type: String,
    default: "total",
  },
  // 加载文本
  loadingText: {
    type: String,
    default: "加载中...",
  },
  // 空数据文本
  emptyText: {
    type: String,
    default: "暂无数据",
  },
  // 是否在空数据时显示刷新按钮
  showRefreshOnEmpty: {
    type: Boolean,
    default: true,
  },
  // 是否显示没有更多数据提示
  showNoMoreTip: {
    type: Boolean,
    default: true,
  },
  // 重试次数
  maxRetries: {
    type: Number,
    default: 3,
  },
  // 重试延迟（毫秒）
  retryDelay: {
    type: Number,
    default: 1000,
  },
  // 缓存时间（毫秒，0表示不缓存）
  cacheTime: {
    type: Number,
    default: 0,
  },
  // 缓存键
  cacheKey: {
    type: String,
    default: "",
  },
  // 是否启用下拉刷新
  enablePullRefresh: {
    type: Boolean,
    default: false,
  },
  // 是否启用触底加载更多
  enableReachBottom: {
    type: Boolean,
    default: false,
  },
  // 触底距离
  reachBottomDistance: {
    type: Number,
    default: 50,
  },
});

// Emits 定义
const emit = defineEmits([
  "success",
  "error",
  "loading",
  "refresh",
  "loadMore",
  "dataChange",
]);

// 响应式数据
const data = ref([]);
const loading = ref(false);
const loadingMore = ref(false);
const refreshing = ref(false);
const error = ref(null);
const currentPage = ref(1);
const total = ref(0);
const retryCount = ref(0);

// 缓存相关
const cache = reactive(new Map());

// 计算属性
const hasMore = computed(() => {
  if (!props.pagination) return false;
  return data.value.length < total.value;
});

// 从响应中提取数据
const extractData = (response) => {
  if (!props.dataPath) return response;

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

// 从响应中提取总数
const extractTotal = (response) => {
  if (!props.totalPath) return 0;

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

// 生成缓存键
const generateCacheKey = (params, page = 1) => {
  const baseKey = props.cacheKey || "data-loader";
  const paramsStr = JSON.stringify({ ...params, page });
  return `${baseKey}-${paramsStr}`;
};

// 获取缓存数据
const getCachedData = (cacheKey) => {
  if (!props.cacheTime || !cacheKey) return null;

  const cached = cache.get(cacheKey);
  if (!cached) return null;

  const now = Date.now();
  if (now - cached.timestamp > props.cacheTime) {
    cache.delete(cacheKey);
    return null;
  }

  return cached.data;
};

// 设置缓存数据
const setCachedData = (cacheKey, data) => {
  if (!props.cacheTime || !cacheKey) return;

  cache.set(cacheKey, {
    data,
    timestamp: Date.now(),
  });
};

// 执行请求
const executeRequest = async (params, isLoadMore = false, useCache = true) => {
  const requestParams = {
    ...props.params,
    ...params,
  };

  if (props.pagination) {
    requestParams.pageSize = props.pageSize;
    requestParams.pageNum = isLoadMore ? currentPage.value + 1 : 1;
  }

  // 检查缓存
  const cacheKey = generateCacheKey(requestParams, requestParams.pageNum);
  if (useCache) {
    const cachedData = getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  }

  try {
    const response = await props.requestFn(requestParams);

    // 缓存数据
    setCachedData(cacheKey, response);

    return response;
  } catch (err) {
    throw err;
  }
};

// 加载数据
const loadData = async (params = {}, isLoadMore = false, useCache = true) => {
  if (loading.value && !isLoadMore) return;
  if (loadingMore.value && isLoadMore) return;

  try {
    // 设置加载状态
    if (isLoadMore) {
      loadingMore.value = true;
    } else {
      loading.value = true;
      error.value = null;
    }

    emit("loading", { isLoadMore });

    const response = await executeRequest(params, isLoadMore, useCache);
    const newData = extractData(response);
    const newTotal = extractTotal(response);

    // 更新数据
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

    // 如果不是加载更多，清空数据
    if (!isLoadMore) {
      data.value = [];
    }
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

// 重试机制
const retryWithBackoff = async (params = {}, isLoadMore = false) => {
  if (retryCount.value >= props.maxRetries) {
    throw new Error(`重试${props.maxRetries}次后仍然失败`);
  }

  retryCount.value++;

  // 指数退避延迟
  const delay = props.retryDelay * Math.pow(2, retryCount.value - 1);
  await new Promise((resolve) => setTimeout(resolve, delay));

  try {
    await loadData(params, isLoadMore, false); // 重试时不使用缓存
  } catch (err) {
    if (retryCount.value < props.maxRetries) {
      return retryWithBackoff(params, isLoadMore);
    }
    throw err;
  }
};

// 刷新数据
const refresh = async (params = {}) => {
  refreshing.value = true;
  emit("refresh");

  try {
    await loadData(params, false, false); // 刷新时不使用缓存
  } finally {
    refreshing.value = false;
  }
};

// 加载更多
const loadMore = async () => {
  if (!hasMore.value || loadingMore.value) return;

  emit("loadMore");
  await loadData({}, true);
};

// 重试
const retry = async () => {
  retryCount.value = 0;
  await loadData({}, false, false);
};

// 清空数据
const clear = () => {
  data.value = [];
  currentPage.value = 1;
  total.value = 0;
  error.value = null;
  loading.value = false;
  loadingMore.value = false;
  refreshing.value = false;
};

// 清空缓存
const clearCache = () => {
  cache.clear();
};

// 监听参数变化
watch(
  () => props.params,
  (newParams) => {
    if (props.autoLoad) {
      loadData(newParams, false, false);
    }
  },
  { deep: true }
);

// 下拉刷新处理
const handlePullRefresh = () => {
  if (props.enablePullRefresh) {
    refresh();
  }
};

// 触底加载更多处理
const handleReachBottom = () => {
  if (props.enableReachBottom && hasMore.value) {
    loadMore();
  }
};

// 页面生命周期
onMounted(() => {
  if (props.autoLoad) {
    loadData();
  }

  // 监听页面事件
  if (props.enablePullRefresh) {
    uni.$on("onPullDownRefresh", handlePullRefresh);
  }

  if (props.enableReachBottom) {
    uni.$on("onReachBottom", handleReachBottom);
  }
});

onUnmounted(() => {
  // 清理事件监听
  uni.$off("onPullDownRefresh", handlePullRefresh);
  uni.$off("onReachBottom", handleReachBottom);
});

// 暴露方法给父组件
defineExpose({
  data,
  loading,
  error,
  refresh,
  loadMore,
  retry,
  clear,
  clearCache,
  loadData,
});
</script>

<style lang="scss" scoped>
.data-loader {
  width: 100%;
  min-height: 200rpx;
}

// 加载状态
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 40rpx;

  .loading-spinner {
    margin-bottom: 20rpx;

    .spinner {
      width: 60rpx;
      height: 60rpx;
      border: 4rpx solid #f3f3f3;
      border-top: 4rpx solid #007aff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }

  .loading-text {
    font-size: 28rpx;
    color: #999;
  }
}

// 错误状态
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 40rpx;

  .error-icon {
    font-size: 80rpx;
    margin-bottom: 20rpx;
  }

  .error-message {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 40rpx;
    text-align: center;
  }

  .retry-btn {
    padding: 16rpx 40rpx;
    background-color: #007aff;
    color: white;
    border: none;
    border-radius: 8rpx;
    font-size: 28rpx;
  }
}

// 空数据状态
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 40rpx;

  .empty-icon {
    font-size: 80rpx;
    margin-bottom: 20rpx;
  }

  .empty-message {
    font-size: 28rpx;
    color: #999;
    margin-bottom: 40rpx;
  }

  .refresh-btn {
    padding: 16rpx 40rpx;
    background-color: #f8f8f8;
    color: #333;
    border: 2rpx solid #ddd;
    border-radius: 8rpx;
    font-size: 28rpx;
  }
}

// 内容容器
.content-container {
  width: 100%;
}

// 刷新指示器
.refresh-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx;

  .refresh-spinner {
    width: 32rpx;
    height: 32rpx;
    border: 2rpx solid #f3f3f3;
    border-top: 2rpx solid #007aff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 16rpx;
  }

  .refresh-text {
    font-size: 24rpx;
    color: #999;
  }
}

// 加载更多
.load-more-container {
  display: flex;
  justify-content: center;
  padding: 40rpx;

  .loading-more {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 28rpx;

    .loading-more-spinner {
      width: 32rpx;
      height: 32rpx;
      border: 2rpx solid #f3f3f3;
      border-top: 2rpx solid #007aff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 16rpx;
    }
  }

  .load-more-btn {
    padding: 16rpx 40rpx;
    background-color: #f8f8f8;
    color: #333;
    border: 2rpx solid #ddd;
    border-radius: 8rpx;
    font-size: 28rpx;
  }
}

// 没有更多数据
.no-more-container {
  display: flex;
  justify-content: center;
  padding: 40rpx;

  .no-more-text {
    font-size: 24rpx;
    color: #ccc;
  }
}

// 动画
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
