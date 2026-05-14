<template>
  <view class="company-history">
    <view class="company-history-viewport" :style="viewportStyle">
      <view class="company-history-track" :style="trackStyle">
        <image class="company-history-image" :src="src" mode="aspectFit" />
        <image class="company-history-image" :src="src" mode="aspectFit" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  src: {
    type: String,
    default:
      "https://seal-img.nos-jd.163yun.com/obj/w5rCgMKVw6DCmGzCmsK-/80172634322/adfa/1612/7d3e/2f9ce6f52b3503ccf745b020743c8a1b.png",
  },
  // 视口高度，单位 rpx
  height: {
    type: Number,
    default: 416,
  },
  // 图片原始宽度（px）
  imageWidth: {
    type: Number,
    default: 1298,
  },
  // 图片原始高度（px）
  imageHeight: {
    type: Number,
    default: 416,
  },
  // 一次滚动一整张图所需时长（秒），值越大越慢
  duration: {
    type: Number,
    default: 22,
  },
});

// 按宽高比计算每张图渲染宽度（rpx）
const imageWidthRpx = computed(
  () => (props.height * props.imageWidth) / props.imageHeight
);

const viewportStyle = computed(() => ({
  height: props.height + "rpx",
}));

const trackStyle = computed(() => ({
  // 轨道宽度 = 两张图
  width: imageWidthRpx.value * 2 + "rpx",
  height: props.height + "rpx",
  animationDuration: props.duration + "s",
  "--ch-image-width": imageWidthRpx.value + "rpx",
}));
</script>

<style scoped>
.company-history {
  background: #ffffff;
  padding: 20rpx 0 40rpx;
}
.company-history-viewport {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.company-history-track {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  will-change: transform;
  animation-name: ch-marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.company-history-image {
  width: var(--ch-image-width);
  height: 100%;
  flex-shrink: 0;
  display: block;
}

@keyframes ch-marquee {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(calc(var(--ch-image-width) * -1), 0, 0);
  }
}
</style>
