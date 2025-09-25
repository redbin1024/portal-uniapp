# DataLoader 高级数据加载组件

一个功能强大的 Vue 3 数据加载组件，封装了请求逻辑、加载状态、错误处理、重试机制、缓存等功能。

## 特性

- ✅ 自动加载状态管理
- ✅ 错误处理和重试机制
- ✅ 分页支持
- ✅ 数据缓存
- ✅ 下拉刷新
- ✅ 触底加载更多
- ✅ 空数据状态
- ✅ 灵活的数据提取
- ✅ TypeScript 支持

## 基础用法

```vue
<template>
  <data-loader
    :requestFn="fetchData"
    :params="{ category: 'news' }"
    v-slot="{ data, loading, error, refresh }"
  >
    <view v-for="item in data" :key="item.id">
      {{ item.title }}
    </view>
  </data-loader>
</template>

<script setup>
import DataLoader from "@/components/data-loader/DataLoader.vue";
import { getNewsList } from "@/api/news";

const fetchData = getNewsList;
</script>
```

## 分页用法

```vue
<template>
  <data-loader
    :requestFn="fetchData"
    :pagination="true"
    :pageSize="20"
    dataPath="data.list"
    totalPath="data.total"
    v-slot="{ data, loadMore, hasMore }"
  >
    <view v-for="item in data" :key="item.id">
      {{ item.title }}
    </view>

    <button v-if="hasMore" @click="loadMore">加载更多</button>
  </data-loader>
</template>
```

## 复杂数据结构

```vue
<template>
  <data-loader
    :requestFn="fetchData"
    dataPath="result.rows.list"
    totalPath="result.pagination.total"
    v-slot="{ data }"
  >
    <!-- 渲染数据 -->
  </data-loader>
</template>
```

## 缓存用法

```vue
<template>
  <data-loader
    :requestFn="fetchData"
    :cacheTime="300000"
    cacheKey="user-list"
    v-slot="{ data }"
  >
    <!-- 数据会缓存5分钟 -->
  </data-loader>
</template>
```

## 下拉刷新和触底加载

```vue
<template>
  <data-loader
    :requestFn="fetchData"
    :pagination="true"
    :enablePullRefresh="true"
    :enableReachBottom="true"
    v-slot="{ data }"
  >
    <!-- 支持下拉刷新和触底加载更多 -->
  </data-loader>
</template>
```

## Props

| 参数                | 类型     | 默认值      | 说明                           |
| ------------------- | -------- | ----------- | ------------------------------ |
| requestFn           | Function | -           | 请求函数（必需）               |
| params              | Object   | {}          | 请求参数                       |
| autoLoad            | Boolean  | true        | 是否自动加载                   |
| pagination          | Boolean  | false       | 是否支持分页                   |
| pageSize            | Number   | 10          | 每页数量                       |
| dataPath            | String   | ''          | 数据路径                       |
| totalPath           | String   | 'total'     | 总数路径                       |
| loadingText         | String   | '加载中...' | 加载文本                       |
| emptyText           | String   | '暂无数据'  | 空数据文本                     |
| showRefreshOnEmpty  | Boolean  | true        | 空数据时显示刷新按钮           |
| showNoMoreTip       | Boolean  | true        | 显示没有更多数据提示           |
| maxRetries          | Number   | 3           | 重试次数                       |
| retryDelay          | Number   | 1000        | 重试延迟（毫秒）               |
| cacheTime           | Number   | 0           | 缓存时间（毫秒，0 表示不缓存） |
| cacheKey            | String   | ''          | 缓存键                         |
| enablePullRefresh   | Boolean  | false       | 启用下拉刷新                   |
| enableReachBottom   | Boolean  | false       | 启用触底加载更多               |
| reachBottomDistance | Number   | 50          | 触底距离                       |

## 插槽参数

| 参数     | 类型     | 说明         |
| -------- | -------- | ------------ |
| data     | Array    | 数据列表     |
| loading  | Boolean  | 加载状态     |
| error    | Object   | 错误信息     |
| refresh  | Function | 刷新方法     |
| loadMore | Function | 加载更多方法 |

## 事件

| 事件名     | 参数                           | 说明         |
| ---------- | ------------------------------ | ------------ |
| success    | { data, response, isLoadMore } | 请求成功     |
| error      | { error, isLoadMore }          | 请求失败     |
| loading    | { isLoadMore }                 | 开始加载     |
| refresh    | -                              | 开始刷新     |
| loadMore   | -                              | 开始加载更多 |
| dataChange | data                           | 数据变化     |

## 暴露的方法

| 方法名     | 参数                         | 说明         |
| ---------- | ---------------------------- | ------------ |
| refresh    | params                       | 刷新数据     |
| loadMore   | -                            | 加载更多     |
| retry      | -                            | 重试请求     |
| clear      | -                            | 清空数据     |
| clearCache | -                            | 清空缓存     |
| loadData   | params, isLoadMore, useCache | 手动加载数据 |

## 使用示例

### 1. 瀑布流布局

```vue
<template>
  <data-loader
    :requestFn="getFeedPostPage"
    :params="{ pageSize: 10 }"
    dataPath="rows.list"
    v-slot="{ data }"
  >
    <view class="waterfall-container">
      <view
        class="waterfall-column"
        v-for="(column, index) in getColumns(data)"
        :key="index"
      >
        <view class="card-item" v-for="item in column" :key="item.id">
          <!-- 卡片内容 -->
        </view>
      </view>
    </view>
  </data-loader>
</template>
```

### 2. 带搜索的列表

```vue
<template>
  <view>
    <input
      v-model="searchKeyword"
      @input="handleSearch"
      placeholder="搜索..."
    />

    <data-loader
      ref="dataLoaderRef"
      :requestFn="searchData"
      :params="{ keyword: searchKeyword }"
      :autoLoad="false"
      v-slot="{ data, loading }"
    >
      <view v-if="loading" class="loading">搜索中...</view>
      <view v-for="item in data" :key="item.id">
        {{ item.title }}
      </view>
    </data-loader>
  </view>
</template>

<script setup>
import { ref, nextTick } from "vue";

const searchKeyword = ref("");
const dataLoaderRef = ref();

const handleSearch = async () => {
  await nextTick();
  if (searchKeyword.value.trim()) {
    dataLoaderRef.value.loadData({ keyword: searchKeyword.value });
  } else {
    dataLoaderRef.value.clear();
  }
};
</script>
```

### 3. 错误处理和重试

```vue
<template>
  <data-loader
    :requestFn="fetchData"
    :maxRetries="5"
    :retryDelay="2000"
    @error="handleError"
    @success="handleSuccess"
    v-slot="{ data, error, retry }"
  >
    <view v-if="error" class="error-container">
      <text>{{ error.message }}</text>
      <button @click="retry">重试</button>
    </view>

    <view v-else>
      <!-- 正常数据展示 -->
    </view>
  </data-loader>
</template>

<script setup>
const handleError = ({ error }) => {
  console.error("数据加载失败:", error);
  // 可以在这里进行错误上报
};

const handleSuccess = ({ data }) => {
  console.log("数据加载成功:", data);
};
</script>
```

## 注意事项

1. `requestFn` 必须返回 Promise
2. 使用 `dataPath` 时，确保路径正确，支持嵌套属性（如 `data.list.items`）
3. 缓存基于请求参数和页码，参数变化会自动清除对应缓存
4. 下拉刷新和触底加载需要页面支持对应的生命周期
5. 重试机制使用指数退避算法，避免频繁请求

## 最佳实践

1. 为不同的数据类型设置合适的 `cacheKey`
2. 根据数据更新频率设置合理的 `cacheTime`
3. 在列表页面启用分页和触底加载
4. 为用户体验考虑，设置合适的 `loadingText` 和 `emptyText`
5. 在网络不稳定的环境下，适当增加 `maxRetries` 和 `retryDelay`
