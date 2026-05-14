<template>
  <view class="traffic-banner">
    <!-- 标题 -->
    <view class="tb-title">
      <text class="tb-title-text">天天拓客</text>
      <text class="tb-title-text tb-title-gradient"
        >{{ '\n' }}精准获取线上流量</text
      >
    </view>

    <!-- 主图 -->
    <image
      class="tb-image"
      :src="image + '?image_process=format,webp'"
      mode="aspectFill"
      @click="handleClick"
    />
  </view>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    default:
      'https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/80173492910/6fc8/6e26/5633/e540f65d0b3b56c4ee78fd0e56cc3b16.jpg',
  },
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>

<style scoped>
.traffic-banner {
  background: #f4f5f9;
  padding: 72rpx 26rpx;
}

/* 标题 */
.tb-title {
  text-align: center;
  margin-bottom: 36rpx;
}
.tb-title-text {
  font-size: 40rpx;
  font-weight: 700;
  color: #000000;
  line-height: 56rpx;
}
.tb-title-gradient {
  background-image: linear-gradient(90deg, #006eee 53.65%, #00bdfe 97.02%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* 主图 */
.tb-image {
  width: 704rpx;
  height: 348rpx;
  border-radius: 24rpx;
  display: block;
}
</style>
