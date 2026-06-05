<template>
  <button class="share-float-btn" open-type="share" hover-class="share-float-btn-hover">
    <image class="share-icon" :src="shareIconSrc" mode="aspectFit" />
    <text class="share-text">分享</text>
  </button>
</template>

<script setup>
const shareIconSrc =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Ccircle cx="36" cy="9" r="5" fill="%232C80FF"/%3E%3Ccircle cx="36" cy="39" r="5" fill="%232C80FF"/%3E%3Ccircle cx="12" cy="24" r="5" fill="%232C80FF"/%3E%3Cline x1="31.5" y1="11.5" x2="16.5" y2="21.5" stroke="%232C80FF" stroke-width="3" stroke-linecap="round"/%3E%3Cline x1="31.5" y1="36.5" x2="16.5" y2="26.5" stroke="%232C80FF" stroke-width="3" stroke-linecap="round"/%3E%3C/svg%3E';
</script>

<style lang="scss" scoped>
.share-float-btn {
  position: fixed;
  right: 28rpx;
  bottom: calc(260rpx + env(safe-area-inset-bottom));
  width: 100rpx;
  height: 100rpx;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 8rpx 28rpx rgba(0, 0, 0, 0.1), 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  line-height: 1;
}

.share-float-btn::after {
  border: none;
}

.share-float-btn-hover {
  transform: scale(0.94);
  opacity: 0.9;
}

.share-icon {
  width: 34rpx;
  height: 34rpx;
  display: block;
  margin-bottom: 2rpx;
}

.share-text {
  font-size: 20rpx;
  font-weight: 500;
  color: #666666;
  line-height: 28rpx;
}
</style>
