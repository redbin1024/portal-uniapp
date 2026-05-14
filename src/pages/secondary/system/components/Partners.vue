<template>
  <view class="partners" v-if="list.length > 0">
    <view class="partners__title">合作伙伴</view>
    <view class="partners__grid">
      <view class="partners__cell" v-for="(item, index) in list" :key="index">
        <image
          class="partners__logo"
          :src="item + '?image_process=format,webp'"
          mode="aspectFit"
        ></image>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  list: { type: Array, default: () => [] },
});
</script>

<style scoped>
.partners {
  background: #ffffff;
  padding: 60rpx 26rpx 40rpx;
}

.partners__title {
  font-size: 40rpx;
  font-weight: 700;
  color: #000000;
  line-height: 56rpx;
  text-align: center;
  margin-bottom: 36rpx;
}

.partners__grid {
  display: grid;
  grid-template-columns: repeat(3, 228rpx);
  gap: 8rpx;
  justify-content: center;
}

.partners__cell {
  width: 228rpx;
  height: 80rpx;
  background: #fbfbfb;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.partners__logo {
  width: 100%;
  height: 100%;
}
</style>
