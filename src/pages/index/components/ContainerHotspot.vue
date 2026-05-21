<template>
  <view
    class="container"
    :style="{
      backgroundImage: `url(${backgroundImage}?image_process=format,webp)`,
    }"
  >
    <!-- 顶部背景占位 -->
    <view style="height: 380rpx"></view>
    
    <!-- 热区容器 -->
    <view class="hotspot-container">
      <!-- 左侧热区：线上获客 -->
      <view class="hotspot-left" @click="handleLeftClick"></view>
      <!-- 右侧热区：系统服务 -->
      <view class="hotspot-right" @click="handleRightClick"></view>
    </view>

    <slot></slot>
  </view>
</template>

<script setup>
/**
 * 容器热区组件
 * 包含背景图片和两个可点击的热区
 */
const props = defineProps({
  backgroundImage: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['leftClick', 'rightClick']);

const handleLeftClick = () => {
  emit('leftClick');
};

const handleRightClick = () => {
  emit('rightClick');
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 640rpx;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

/* 热区容器 */
.hotspot-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 80rpx;
  gap: 40rpx;
  height: 260rpx;
}

/* 左侧热区：线上获客 */
.hotspot-left {
  width: 280rpx;
  height: 200rpx;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.hotspot-left:active {
  transform: scale(0.98);
  opacity: 0.9;
}

/* 右侧热区：系统服务 */
.hotspot-right {
  width: 280rpx;
  height: 200rpx;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.hotspot-right:active {
  transform: scale(0.98);
  opacity: 0.9;
}
</style>