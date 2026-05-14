<template>
  <view class="section-header">
    <view class="section-header__title">{{ title }}</view>
    <view class="section-header__subtitle">{{ subtitle }}</view>
  </view>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
});
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section-header__title {
  font-size: 40rpx;
  font-weight: bold;
  color: #000000;
  text-align: center;
}
.section-header__subtitle {
  font-size: 28rpx;
  color: #b1b0b0;
  text-align: center;
}
</style>
