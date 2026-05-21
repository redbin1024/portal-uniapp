<template>
  <view class="back-home" @click="goHome">
    <image
      class="back-icon"
      src="http://cdn.xiaodingdang1.com/2026/01/13/7b26b7060ed4435ba6950a005b3cb4c1.png"
      mode="aspectFit"
    />
  </view>
</template>

<script setup>
const goHome = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};
</script>

<style scoped>
.back-home {
  position: fixed;
  right: 18rpx;
  bottom: 280rpx; /* 稍微避开底部可能的 tabBar 或安全区 */
  z-index: 9999;
  width: 88rpx;
  height: 88rpx;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}
.back-icon {
  width: 100%;
  height: 100%;
}
</style>
