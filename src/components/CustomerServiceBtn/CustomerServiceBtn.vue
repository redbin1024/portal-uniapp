<template>
  <!-- 右下角悬浮客服按钮 -->
  <view class="customer-service-btn" :style="positionStyle">
    <button open-type="contact" class="cs-btn">
      <image
        class="cs-btn-img"
        :src="icon"
        mode="aspectFit"
        @click="handleClick"
      />
    </button>
  </view>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'CustomerServiceBtn' });

const props = defineProps({
  // 图标 URL
  icon: {
    type: String,
    default:
      'http://cdn.xiaodingdang1.com/2025/09/29/84932e513ebd49d093825177c28edf83.png',
  },
  // 距底部距离（rpx）
  bottom: {
    type: [Number, String],
    default: 160,
  },
  // 距右侧距离（rpx），默认 0 贴边
  right: {
    type: [Number, String],
    default: 0,
  },
});

const emit = defineEmits(['click']);

const toRpx = (v) => (typeof v === 'number' ? `${v}rpx` : v);

const positionStyle = computed(() => ({
  bottom: toRpx(props.bottom),
  right: toRpx(props.right),
}));

const handleClick = () => {
  emit('click');
};
</script>

<style scoped>
.customer-service-btn {
  position: fixed;
  z-index: 999;
  width: 160rpx;
  height: 160rpx;
}
.cs-btn {
  padding: 0;
  margin: 0;
  background: none;
  width: 160rpx;
  height: 160rpx;
  overflow: hidden;
  border: none !important;
  line-height: normal;
}
.cs-btn::after {
  border: none;
}
.cs-btn-img {
  width: 100%;
  height: 100%;
}
</style>
