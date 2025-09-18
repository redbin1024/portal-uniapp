# 接口请求封装使用指南

这是一个功能完整的 uni-app 接口请求封装工具，提供了丰富的功能和灵活的配置选项。

## 🚀 主要特性

- ✅ **请求/响应拦截器** - 统一处理请求头、token、错误等
- ✅ **重复请求取消** - 自动取消重复的请求
- ✅ **加载状态管理** - 自动显示/隐藏加载提示
- ✅ **错误统一处理** - HTTP 错误和业务错误的统一处理
- ✅ **Token 自动管理** - 自动添加 token，过期自动跳转登录
- ✅ **请求重试机制** - 支持失败重试
- ✅ **并发请求控制** - 支持并发、竞速、串行请求
- ✅ **文件上传下载** - 支持单文件、多文件上传和下载
- ✅ **进度监听** - 上传下载进度实时监听
- ✅ **自定义实例** - 支持创建多个请求实例
- ✅ **开发调试** - 开发环境详细的请求日志

## 📦 安装使用

```javascript
// 导入所需方法
import { get, post, put, del, upload } from "@/utils/request.js";

// 或导入所有方法
import * as api from "@/utils/request.js";
```

## 🔧 基础配置

### 环境配置

确保 `src/config/env.js` 文件包含以下配置：

```javascript
export default {
  baseURL: "https://api.example.com", // API基础地址
  debug: true, // 开发环境调试开关
};
```

### 全局配置

```javascript
import { setConfig } from "@/utils/request.js";

// 动态修改全局配置
setConfig({
  baseURL: "https://new-api.example.com",
  timeout: 60000,
  header: {
    "Custom-Header": "value",
  },
});
```

## 📖 基础用法

### GET 请求

```javascript
// 基础GET请求
const users = await get("/api/users");

// 带参数的GET请求
const users = await get("/api/users", {
  page: 1,
  pageSize: 10,
});

// 带配置的GET请求
const users = await get(
  "/api/users",
  { page: 1 },
  {
    loading: true,
    loadingText: "加载用户列表...",
  }
);
```

### POST 请求

```javascript
// 基础POST请求
const result = await post("/api/users", {
  name: "张三",
  email: "zhangsan@example.com",
});

// 不显示loading的POST请求
const result = await post("/api/users", userData, {
  loading: false,
});
```

### PUT/DELETE/PATCH 请求

```javascript
// PUT请求
await put("/api/users/1", { name: "李四" });

// DELETE请求
await del("/api/users/1");

// PATCH请求
await patch("/api/users/1", { status: "active" });
```

## 📁 文件操作

### 单文件上传

```javascript
// 基础文件上传
const result = await upload("/api/upload", filePath);

// 带配置的文件上传
const result = await upload("/api/upload", filePath, {
  name: "avatar", // 文件字段名
  formData: {
    // 额外表单数据
    userId: "123",
    type: "avatar",
  },
  onProgress: (res) => {
    console.log("上传进度：", res.progress + "%");
  },
  loading: true,
  loadingText: "上传中...",
});
```

### 多文件上传

```javascript
import { uploadMultiple } from "@/utils/request.js";

const filePaths = ["path1", "path2", "path3"];
const results = await uploadMultiple("/api/upload/batch", filePaths, {
  name: "files",
  formData: { type: "gallery" },
});
```

### 文件下载

```javascript
import { download } from "@/utils/request.js";

const result = await download("/api/files/123/download", {
  onProgress: (res) => {
    console.log("下载进度：", res.progress + "%");
  },
});
```

## 🔄 高级功能

### 并发请求

```javascript
import { all } from "@/utils/request.js";

// 同时发起多个请求
const [users, posts, comments] = await all([
  get("/api/users"),
  get("/api/posts"),
  get("/api/comments"),
]);
```

### 竞速请求

```javascript
import { race } from "@/utils/request.js";

// 多个数据源，取最快返回的
const data = await race([
  get("/api/data/source1"),
  get("/api/data/source2"),
  get("/api/data/source3"),
]);
```

### 串行请求

```javascript
import { series } from "@/utils/request.js";

// 按顺序执行请求
const results = await series([
  () => post("/api/step1", data1),
  () => post("/api/step2", data2),
  () => post("/api/step3", data3),
]);
```

### 请求重试

```javascript
import { retry } from "@/utils/request.js";

// 失败时自动重试
const data = await retry(
  () => get("/api/unstable-endpoint"),
  3, // 最大重试3次
  2000 // 每次重试间隔2秒
);
```

## 🏗️ 自定义实例

```javascript
import { createInstance } from "@/utils/request.js";

// 创建第三方API实例
const thirdPartyAPI = createInstance({
  baseURL: "https://api.third-party.com",
  timeout: 10000,
  header: {
    "API-Key": "your-api-key",
  },
});

// 使用自定义实例
const data = await thirdPartyAPI({
  url: "/data",
  method: "GET",
  data: { id: 123 },
});
```

## 🛠️ 请求管理

### 取消请求

```javascript
import { cancelAllRequests, getPendingRequestsCount } from "@/utils/request.js";

// 取消所有进行中的请求
cancelAllRequests();

// 获取当前进行中的请求数量
const count = getPendingRequestsCount();
console.log("当前进行中的请求：", count);
```

## ⚠️ 错误处理

### 自动错误处理

请求封装会自动处理以下错误：

- **HTTP 错误**：400、401、403、404、500 等
- **网络错误**：超时、连接失败等
- **业务错误**：根据响应中的 code 字段判断
- **Token 过期**：自动清除 token 并跳转登录页

### 自定义错误处理

```javascript
try {
  const data = await get("/api/users");
  // 处理成功响应
} catch (error) {
  // 自定义错误处理
  if (error.code === 404) {
    uni.showModal({
      title: "提示",
      content: "数据不存在",
    });
  }
}
```

## 🎯 最佳实践

### 1. API 模块化管理

```javascript
// src/api/user.js
import { get, post, put, del } from "@/utils/request.js";

export const userAPI = {
  // 获取用户列表
  getList: (params) => get("/api/users", params),

  // 创建用户
  create: (data) => post("/api/users", data),

  // 更新用户
  update: (id, data) => put(`/api/users/${id}`, data),

  // 删除用户
  delete: (id) => del(`/api/users/${id}`),
};
```

### 2. 分页请求封装

```javascript
export function getPagedData(page = 1, pageSize = 10) {
  return get(
    "/api/data",
    { page, pageSize },
    {
      loading: page === 1, // 只在首页显示loading
      loadingText: "加载数据中...",
    }
  );
}
```

### 3. 搜索防抖

```javascript
let searchTimer = null;

export function searchData(keyword) {
  if (searchTimer) clearTimeout(searchTimer);

  return new Promise((resolve, reject) => {
    searchTimer = setTimeout(() => {
      get("/api/search", { keyword }, { loading: false })
        .then(resolve)
        .catch(reject);
    }, 300);
  });
}
```

### 4. 条件请求

```javascript
// 根据条件决定是否发起请求
export async function getUserData(userId, force = false) {
  // 检查缓存
  const cached = uni.getStorageSync(`user_${userId}`);
  if (cached && !force) {
    return cached;
  }

  // 发起请求
  const userData = await get(`/api/users/${userId}`);

  // 缓存结果
  uni.setStorageSync(`user_${userId}`, userData);

  return userData;
}
```

## 🔍 调试技巧

### 开发环境日志

设置 `config.debug = true` 后，控制台会显示详细的请求日志：

```
🚀 API请求 - GET /api/users
  请求地址: https://api.example.com/api/users?page=1
  请求方法: GET
  请求参数: {page: 1}
  请求头: {Authorization: "Bearer xxx", ...}

📦 API响应 - 200
  响应状态: 200
  响应头: {...}
  响应数据: {...}
```

### 请求监控

```javascript
import { getPendingRequestsCount } from "@/utils/request.js";

// 在页面中监控请求状态
setInterval(() => {
  const count = getPendingRequestsCount();
  if (count > 0) {
    console.log(`当前有 ${count} 个请求正在进行`);
  }
}, 1000);
```

## 📋 配置选项

### 请求配置选项

| 参数        | 类型    | 默认值      | 说明             |
| ----------- | ------- | ----------- | ---------------- |
| loading     | Boolean | true        | 是否显示加载提示 |
| loadingText | String  | '加载中...' | 加载提示文字     |
| timeout     | Number  | 30000       | 请求超时时间(ms) |
| header      | Object  | {}          | 自定义请求头     |

### 上传配置选项

| 参数        | 类型     | 默认值      | 说明             |
| ----------- | -------- | ----------- | ---------------- |
| name        | String   | 'file'      | 文件字段名       |
| formData    | Object   | {}          | 额外表单数据     |
| onProgress  | Function | null        | 进度回调函数     |
| loading     | Boolean  | true        | 是否显示上传提示 |
| loadingText | String   | '上传中...' | 上传提示文字     |

## 🤝 贡献

如果你发现问题或有改进建议，欢迎提交 Issue 或 Pull Request。

## 📄 许可证

MIT License
