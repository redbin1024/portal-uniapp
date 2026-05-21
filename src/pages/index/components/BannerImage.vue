<template>
  <view class="businesspartnernew-image" v-if="imageUrl">
    <image
      :src="imageUrl + '?image_process=format,webp'"
      mode="aspectFill"
    ></image>
  </view>
</template>

<script setup>
/**
 * 横幅图片组件
 * 用于显示合作商家底部横幅图等
 */
const props = defineProps({
  imageUrl: {
    type: String,
    default: ''
  }
});
</script>

<style lang="scss" scoped>
.businesspartnernew-image {
  width: 100%;
  height: 1440rpx;
}

.businesspartnernew-image image {
  width: 100%;
  height: 100%;
}
</style>