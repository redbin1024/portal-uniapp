<template>
  <view
    class="back-home-float-btn"
    :style="positionStyle"
    hover-class="back-home-float-btn-hover"
    @click="goHome"
  >
    <image class="back-home-icon" :src="homeIconSrc" mode="aspectFit" />
    <text class="back-home-text">首页</text>
  </view>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  bottom: {
    type: [Number, String],
    default: "calc(360rpx + env(safe-area-inset-bottom))",
  },
  right: {
    type: [Number, String],
    default: "28rpx",
  },
});

const positionStyle = computed(() => {
  const b = typeof props.bottom === "number" ? `${props.bottom}rpx` : props.bottom;
  const r = typeof props.right === "number" ? `${props.right}rpx` : props.right;
  return {
    bottom: b,
    right: r,
  };
});

const homeIconSrc =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Cpath d="M9 19v21a2 2 0 0 0 2 2h26a2 2 0 0 0 2-2V19" fill="none" stroke="%232C80FF" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/%3E%3Cpath d="M4 19L24 4l20 15" fill="none" stroke="%232C80FF" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/%3E%3Cpath d="M19 42V26h10v16" fill="none" stroke="%232C80FF" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/%3E%3C/svg%3E';

const goHome = () => {
  uni.switchTab({
    url: "/pages/index/index",
  });
};
</script>

<style lang="scss" scoped>
.back-home-float-btn {
  position: fixed;
  width: 100rpx;
  height: 100rpx;
  padding: 0;
  margin: 0;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 8rpx 28rpx rgba(0, 0, 0, 0.1), 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  line-height: 1;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.back-home-float-btn-hover {
  transform: scale(0.94);
  opacity: 0.9;
}

.back-home-icon {
  width: 34rpx;
  height: 34rpx;
  display: block;
  margin-bottom: 2rpx;
}

.back-home-text {
  font-size: 20rpx;
  font-weight: 500;
  color: #666666;
  line-height: 28rpx;
}
</style>

