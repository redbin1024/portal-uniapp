# 3D 旋转轮播视频组件

一个支持视频和图片的 3D 旋转轮播组件，专为 uni-app 框架设计。

## 功能特性

- ✨ **3D 旋转效果**: 流畅的 3D 旋转动画，支持自定义旋转角度和半径
- 🎬 **视频支持**: 完整的视频播放功能，包括自动播放、循环、静音等控制
- 🖼️ **图片支持**: 同时支持图片展示，混合内容轮播
- 📱 **触摸交互**: 支持触摸滑动切换和点击操作
- 🎯 **自动轮播**: 可配置的自动轮播功能
- 🎨 **自定义样式**: 丰富的样式配置选项
- 📊 **指示器**: 支持圆点和线条两种指示器样式
- 🎮 **控制按钮**: 可选的左右切换控制按钮

## 安装使用

### 1. 复制组件文件

将 `video-rotate-carousel.vue` 文件复制到你的项目组件目录中。

### 2. 在页面中引入

```vue
<script setup>
import VideoRotateCarousel from "@/components/video-rotate-carousel/video-rotate-carousel.vue";
</script>
```

### 3. 使用组件

```vue
<template>
  <video-rotate-carousel
    :list="carouselData"
    height="800rpx"
    :autoplay="true"
    :interval="6000"
    :showIndicator="true"
    :showControls="true"
    :radius="380"
    :maxAngle="50"
    @change="onCarouselChange"
    @itemClick="onCarouselClick"
    @videoPlay="onVideoPlay"
    @videoPause="onVideoPause"
    @videoEnded="onVideoEnded"
    @videoError="onVideoError"
  />
</template>
```

## Props 属性

| 属性名         | 类型    | 默认值   | 说明                        |
| -------------- | ------- | -------- | --------------------------- |
| list           | Array   | []       | 轮播数据列表                |
| height         | String  | '600rpx' | 组件高度                    |
| interval       | Number  | 5000     | 自动轮播间隔时间(毫秒)      |
| autoplay       | Boolean | true     | 是否自动轮播                |
| showIndicator  | Boolean | true     | 是否显示指示器              |
| showControls   | Boolean | true     | 是否显示控制按钮            |
| indicatorStyle | String  | 'dot'    | 指示器样式: 'dot' \| 'line' |
| radius         | Number  | 350      | 3D 旋转半径                 |
| maxAngle       | Number  | 45       | 最大旋转角度                |

## 数据格式

### 视频数据格式

```javascript
{
  type: 'video',
  src: 'https://example.com/video.mp4',
  poster: 'https://example.com/poster.jpg',
  title: '视频标题',
  description: '视频描述',
  autoplay: true,
  loop: false,
  muted: true,
  controls: true,
  showFullscreenBtn: true
}
```

### 图片数据格式

```javascript
{
  type: 'image',
  src: 'https://example.com/image.jpg',
  title: '图片标题',
  description: '图片描述'
}
```

## 事件

| 事件名           | 参数                           | 说明                   |
| ---------------- | ------------------------------ | ---------------------- |
| change           | { index, item, previousIndex } | 轮播切换时触发         |
| itemClick        | { item, index }                | 点击轮播项时触发       |
| videoClick       | { item, index }                | 点击视频时触发         |
| videoPlay        | { item, index }                | 视频开始播放时触发     |
| videoPause       | { item, index }                | 视频暂停时触发         |
| videoEnded       | { item, index }                | 视频播放结束时触发     |
| videoError       | { item, index }                | 视频播放错误时触发     |
| fullscreenChange | { item, index }                | 视频全屏状态变化时触发 |

## 完整示例

```vue
<template>
  <view class="page">
    <video-rotate-carousel
      :list="videoList"
      height="800rpx"
      :autoplay="true"
      :interval="6000"
      :showIndicator="true"
      :showControls="true"
      :radius="380"
      :maxAngle="50"
      @change="handleCarouselChange"
      @videoPlay="handleVideoPlay"
      @videoError="handleVideoError"
    />
  </view>
</template>

<script setup>
import { ref } from "vue";
import VideoRotateCarousel from "@/components/video-rotate-carousel/video-rotate-carousel.vue";

const videoList = ref([
  {
    type: "video",
    src: "https://example.com/video1.mp4",
    poster: "https://example.com/poster1.jpg",
    title: "产品介绍视频",
    description: "详细介绍我们的核心产品功能",
    autoplay: true,
    loop: false,
    muted: true,
    controls: true,
    showFullscreenBtn: true,
  },
  {
    type: "image",
    src: "https://example.com/image1.jpg",
    title: "产品展示图",
    description: "高清产品展示图片",
  },
  {
    type: "video",
    src: "https://example.com/video2.mp4",
    poster: "https://example.com/poster2.jpg",
    title: "用户案例视频",
    description: "真实用户使用案例分享",
    autoplay: true,
    loop: true,
    muted: true,
    controls: true,
    showFullscreenBtn: true,
  },
]);

const handleCarouselChange = (e) => {
  console.log("轮播切换:", e);
};

const handleVideoPlay = (e) => {
  console.log("视频播放:", e);
};

const handleVideoError = (e) => {
  console.error("视频错误:", e);
  uni.showToast({
    title: "视频加载失败",
    icon: "none",
  });
};
</script>

<style scoped>
.page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 40rpx 0;
}
</style>
```

## 样式自定义

组件提供了丰富的 CSS 变量和类名，可以通过覆盖样式来自定义外观：

```css
/* 自定义轮播容器背景 */
.video-rotate-carousel {
  background: linear-gradient(135deg, #your-color1, #your-color2);
}

/* 自定义轮播项阴影 */
.carousel-item-content {
  box-shadow: 0 30rpx 80rpx rgba(0, 0, 0, 0.4);
}

/* 自定义控制按钮样式 */
.control-btn {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10rpx);
}

/* 自定义指示器样式 */
.indicator-dot.active {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
}
```

## 注意事项

1. **视频格式**: 确保视频格式兼容目标平台
2. **自动播放**: 移动端浏览器可能限制自动播放，建议设置 `muted: true`
3. **性能优化**: 大量视频时注意内存使用，可以考虑懒加载
4. **网络环境**: 视频加载依赖网络环境，建议提供加载状态提示
5. **平台兼容**: 在不同平台测试确保功能正常

## 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ uni-app H5
- ✅ uni-app App

## 更新日志

### v1.0.0

- 初始版本发布
- 支持 3D 旋转轮播效果
- 支持视频和图片混合展示
- 支持触摸交互和自动轮播
- 提供丰富的配置选项和事件回调
