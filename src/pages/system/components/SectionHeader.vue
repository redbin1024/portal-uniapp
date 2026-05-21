<template>
  <view class="section-header" :style="wrapStyle">
    <view class="section-header__inner">
      <view class="section-header__title">{{ title }}</view>
      <view class="section-header__subtitle">{{ subtitle }}</view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  wrapStyle: { type: [String, Object], default: "" },
});
</script>

<style scoped>
.section-header {
  display: flex;
}
.section-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.section-header__title {
  color: #000000;
  font-weight: bold;
  font-size: 40rpx;
}
.section-header__subtitle {
  color: #d6d4d4;
  font-size: 28rpx;
}
</style>
