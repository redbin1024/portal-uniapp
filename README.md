# MasterGo Project - 微信小程序

基于 MasterGo 设计稿的 UniApp 项目，支持多环境运行模式。

## 项目结构

```
mastergo-project/
├── src/
│   ├── config/
│   │   └── env.js          # 环境配置管理
│   ├── utils/
│   │   └── request.js      # 网络请求封装
│   ├── pages/              # 页面文件
│   ├── static/             # 静态资源
│   ├── manifest.json       # 应用配置
│   ├── pages.json          # 页面路由配置
│   └── uni.scss           # 全局样式
├── package.json            # 项目依赖配置
└── vite.config.js         # 构建配置
```

## 运行模式

项目支持四种运行环境：

### 1. 开发环境 (dev)

- **API 地址**: https://dev-api.xiaodingdang1.com/
- **特点**: 开启调试模式、vconsole 控制台
- **用途**: 本地开发调试

**运行命令**:

```bash
# 开发模式运行
npm run dev:mp-weixin

# 构建开发版本
npm run build:mp-weixin:dev
```

### 2. 测试环境 (test)

- **API 地址**: https://test-api.xiaodingdang1.com/
- **特点**: 开启调试模式、vconsole 控制台
- **用途**: 功能测试、集成测试

**运行命令**:

```bash
# 测试模式运行
npm run dev:mp-weixin:test

# 构建测试版本
npm run build:mp-weixin:test
```

### 3. 预发布环境 (staging)

- **API 地址**: https://staging-api.xiaodingdang1.com/
- **特点**: 关闭调试模式，接近生产环境
- **用途**: 上线前最终测试

**运行命令**:

```bash
# 预发布模式运行
npm run dev:mp-weixin:staging

# 构建预发布版本
npm run build:mp-weixin:staging
```

### 4. 生产环境 (pro)

- **API 地址**: https://admin-api.xiaodingdang1.com/
- **特点**: 关闭所有调试功能，性能优化
- **用途**: 正式发布版本

**运行命令**:

```bash
# 生产模式运行
npm run dev:mp-weixin:pro

# 构建生产版本
npm run build:mp-weixin:pro
```

## 环境配置

### 环境变量说明

每个环境都包含以下配置项：

- `ENV_TYPE`: 环境类型标识
- `UNI_PLATFORM`: 平台标识 (mp-weixin)
- `VITE_BASE_API`: API 基础地址
- `NODE_ENV`: Node 环境变量

### 配置文件

#### 1. package.json

在 `uni-app.scripts` 中定义了各环境的配置：

```json
{
  "uni-app": {
    "scripts": {
      "dev": {
        "title": "微信小程序——开发版",
        "env": {
          "ENV_TYPE": "dev",
          "UNI_PLATFORM": "mp-weixin",
          "VITE_BASE_API": "https://dev-api.xiaodingdang1.com/",
          "NODE_ENV": "development"
        }
      }
    }
  }
}
```

#### 2. src/config/env.js

环境配置管理文件，根据当前环境返回对应配置：

```javascript
import config from "@/config/env.js";

// 获取当前环境配置
console.log("当前环境:", config.title);
console.log("API地址:", config.baseURL);
console.log("调试模式:", config.debug);
```

#### 3. src/utils/request.js

网络请求封装，自动根据环境配置 API 地址：

```javascript
import { get, post } from "@/utils/request.js";

// 使用示例
const getUserInfo = () => {
  return get("/api/user/info");
};

const updateUser = (data) => {
  return post("/api/user/update", data);
};
```

## 使用说明

### 1. 安装依赖

```bash
npm install
```

### 2. 开发调试

```bash
# 使用开发环境
npm run dev:mp-weixin

# 使用测试环境
npm run dev:mp-weixin:test
```

### 3. 构建发布

```bash
# 构建测试版本
npm run build:mp-weixin:test

# 构建生产版本
npm run build:mp-weixin:pro
```

### 4. 微信开发者工具

1. 打开微信开发者工具
2. 导入项目，选择 `dist/dev/mp-weixin` 或 `dist/build/mp-weixin` 目录
3. 设置 AppID 为: `wx573564cfaa3b019d`

## 功能特性

### 1. 多环境支持

- 开发、测试、预发布、生产四套环境
- 自动切换 API 地址和配置
- 环境标识和调试开关

### 2. 网络请求

- 统一的请求拦截器
- 自动 token 处理
- 错误统一处理
- 文件上传支持

### 3. 小程序优化

- 懒加载组件
- 分包优化
- 网络超时配置
- 权限申请配置

### 4. 开发体验

- 热重载支持
- 调试信息输出
- vconsole 集成
- 错误提示优化

## 注意事项

1. **环境切换**: 不同环境需要使用对应的构建命令
2. **API 配置**: 确保各环境 API 地址正确配置
3. **AppID 配置**: 生产环境需要配置正确的微信小程序 AppID
4. **权限申请**: 根据功能需求在 manifest.json 中配置相应权限
5. **分包策略**: 大型项目建议使用分包加载优化性能

## 更新日志

### v1.0.0

- 初始化项目结构
- 完成多环境配置
- 集成网络请求封装
- 完善微信小程序配置
