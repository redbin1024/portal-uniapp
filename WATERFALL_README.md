# 瀑布流组件使用指南

本项目实现了两个瀑布流组件，适用于类似小红书的内容展示场景。

## 组件介绍

### 1. WaterfallFlow.vue - 基础瀑布流组件

- 适用于数据量较少的场景（< 100 条）
- 简单易用，性能良好
- 支持响应式布局

### 2. VirtualWaterfall.vue - 虚拟滚动瀑布流组件

- 适用于大数据量场景（> 100 条）
- 支持虚拟滚动，性能优异
- 包含骨架屏加载效果
- 支持懒加载和预加载

## 快速开始

### 基础用法

```vue
<template>
  <WaterfallFlow :items="items" :column-count="2" @item-click="onItemClick" />
</template>

<script setup>
import WaterfallFlow from "@/components/WaterfallFlow.vue";

const items = ref([
  {
    id: 1,
    title: "标题",
    description: "描述",
    image: "https://example.com/image.jpg",
    avatar: "https://example.com/avatar.jpg",
    author: "作者",
    likes: 100,
  },
]);

const onItemClick = (item) => {
  console.log("点击了:", item);
};
</script>
```

### 虚拟滚动用法

```vue
<template>
  <VirtualWaterfall
    :items="items"
    :column-count="2"
    @item-click="onItemClick"
    @load-more="loadMore"
    @like="onLike"
    @share="onShare"
  />
</template>

<script setup>
import VirtualWaterfall from "@/components/VirtualWaterfall.vue";

const loadMore = () => {
  // 加载更多数据
};

const onLike = (item) => {
  // 点赞逻辑
};

const onShare = (item) => {
  // 分享逻辑
};
</script>
```

## 数据格式

每个数据项应包含以下字段：

```javascript
{
  id: Number|String,        // 唯一标识符
  title: String,           // 标题
  description: String,     // 描述（可选）
  image: String,          // 图片URL
  avatar: String,         // 头像URL
  author: String,         // 作者名称
  likes: Number,          // 点赞数
  comments: Number,       // 评论数（可选）
  shares: Number,         // 分享数（可选）
  isLiked: Boolean,       // 是否已点赞（可选）
  isVideo: Boolean,       // 是否为视频（可选）
  category: String,       // 分类（可选）
  tags: Array,           // 标签数组（可选）
  createTime: String     // 创建时间（可选）
}
```

## 组件属性

### WaterfallFlow Props

| 属性名      | 类型   | 默认值 | 说明     |
| ----------- | ------ | ------ | -------- |
| items       | Array  | []     | 数据数组 |
| columnCount | Number | 2      | 列数     |

### VirtualWaterfall Props

| 属性名        | 类型   | 默认值 | 说明         |
| ------------- | ------ | ------ | ------------ |
| items         | Array  | []     | 数据数组     |
| columnCount   | Number | 2      | 列数         |
| gap           | Number | 8      | 间距（rpx）  |
| itemMinHeight | Number | 200    | 最小项目高度 |

## 组件事件

### WaterfallFlow Events

| 事件名     | 参数 | 说明             |
| ---------- | ---- | ---------------- |
| item-click | item | 点击项目时触发   |
| load-more  | -    | 滚动到底部时触发 |

### VirtualWaterfall Events

| 事件名     | 参数 | 说明             |
| ---------- | ---- | ---------------- |
| item-click | item | 点击项目时触发   |
| load-more  | -    | 滚动到底部时触发 |
| like       | item | 点赞时触发       |
| share      | item | 分享时触发       |

## 工具函数

项目提供了一系列工具函数，位于 `@/utils/waterfall.js`：

### calculateWaterfallLayout

计算瀑布流布局

```javascript
import { calculateWaterfallLayout } from "@/utils/waterfall.js";

const layout = calculateWaterfallLayout(items, columnCount, gap, getItemHeight);
```

### generateMockData

生成模拟数据

```javascript
import { generateMockData } from "@/utils/waterfall.js";

const mockData = generateMockData(20); // 生成20条数据
```

### formatCount

格式化数量显示

```javascript
import { formatCount } from "@/utils/waterfall.js";

formatCount(1234); // "1.2k"
formatCount(12345); // "1.2w"
```

## 性能优化建议

### 1. 图片优化

- 使用适当的图片尺寸
- 启用懒加载
- 使用 WebP 格式

### 2. 数据优化

- 分页加载数据
- 使用虚拟滚动（大数据量）
- 缓存已加载的数据

### 3. 渲染优化

- 避免频繁的重新布局
- 使用防抖和节流
- 合理设置缓冲区大小

## 自定义样式

组件支持通过 CSS 变量自定义样式：

```scss
.waterfall-container {
  --item-border-radius: 16rpx;
  --item-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
  --item-padding: 16rpx;
  --title-color: #333;
  --desc-color: #666;
  --author-color: #999;
}
```

## 响应式设计

组件支持响应式布局，会根据屏幕尺寸自动调整：

- 小屏设备：1-2 列
- 中等屏幕：2-3 列
- 大屏设备：3-4 列

## 兼容性

- 支持微信小程序
- 支持 H5
- 支持 App
- 要求 Vue 3.0+

## 演示页面

访问 `/pages/waterfall-demo/index` 查看完整的演示效果，包括：

- 基础瀑布流演示
- 虚拟滚动演示
- 不同列数切换
- 性能监控
- 交互功能

## 常见问题

### Q: 图片高度不一致怎么办？

A: 组件会自动计算每个项目的高度，确保瀑布流布局的平衡。

### Q: 如何实现无限滚动？

A: 监听 `load-more` 事件，在回调中加载更多数据。

### Q: 如何自定义项目样式？

A: 可以通过修改组件的 SCSS 变量或直接修改组件样式。

### Q: 大数据量时性能如何？

A: 建议使用 `VirtualWaterfall` 组件，它支持虚拟滚动，可以处理大量数据。

## 更新日志

### v1.0.0

- 初始版本
- 基础瀑布流功能
- 虚拟滚动支持
- 响应式布局
- 工具函数库

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进组件功能。

## 许可证

MIT License
