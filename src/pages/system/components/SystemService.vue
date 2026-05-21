<template>
  <view class="system-service-wrapper">
    <SectionHeader
      title="系统服务"
      subtitle="SYSTEM SERVICE"
      wrap-style="margin: 30rpx 24rpx 0 24rpx"
    />
    <view class="service-list">
      <view
        class="service-item"
        v-for="(item, index) in services"
        :key="index"
        @click="$emit('select', item)"
      >
        <image
          v-if="item.serviceImage && item.serviceImage[0]"
          :src="item.serviceImage[0] + '?image_process=format,webp'"
        ></image>
        <view class="service-item__footer">
          <view class="service-item__name">{{ item.serviceName }}</view>
          <view class="service-item__btn">了解详情</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import SectionHeader from "./SectionHeader.vue";

defineProps({
  services: { type: Array, default: () => [] },
});
defineEmits(["select"]);
</script>

<style scoped>
.system-service-wrapper {
  background: linear-gradient(
    to bottom,
    #f0f8ff 30%,
    #acb4db 50%,
    #3351e2 100%
  );
  padding: 20rpx 0;
}

.service-list {
  display: flex;
  flex-wrap: wrap;
  padding: 20rpx 18rpx 52rpx 18rpx;
}
.service-item:nth-of-type(2n) {
  margin-left: 3%;
}
.service-item {
  width: 48%;
  background: #f2f6ff;
  margin-bottom: 38rpx;
  border-radius: 20rpx;
}
.service-item image {
  width: 100%;
  height: 350rpx;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}
.service-item__footer {
  width: 100%;
  padding: 20rpx 0;
  text-align: center;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  display: flex;
  justify-content: space-between;
}
.service-item__name {
  color: #000000;
  font-size: 28rpx;
  margin-left: 24rpx;
}
.service-item__btn {
  width: 112rpx;
  height: 44rpx;
  background: #3552e3;
  border-radius: 100rpx;
  color: #ffffff;
  font-size: 20rpx;
  line-height: 44rpx;
  text-align: center;
  margin-right: 24rpx;
}
</style>
