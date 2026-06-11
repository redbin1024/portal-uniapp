<template>
  <view
    class="customer-service-float-btn"
    :style="positionStyle"
    hover-class="customer-service-float-btn-hover"
  >
    <button open-type="contact" class="cs-btn" @click="handleClick">
      <image class="cs-icon" :src="csIconSrc" mode="aspectFit" />
      <text class="cs-text">客服</text>
    </button>
  </view>
</template>

<script setup>
import { computed } from "vue";

defineOptions({ name: "CustomerServiceBtn" });

const props = defineProps({
  bottom: {
    type: [Number, String],
    default: "calc(120rpx + env(safe-area-inset-bottom))",
  },
  right: {
    type: [Number, String],
    default: "28rpx",
  },
});

const emit = defineEmits(["click"]);

const positionStyle = computed(() => {
  const b = typeof props.bottom === "number" ? `${props.bottom}rpx` : props.bottom;
  const r = typeof props.right === "number" ? `${props.right}rpx` : props.right;
  return {
    bottom: b,
    right: r,
  };
});

const csIconSrc =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Cpath d="M8 24C8 15.1634 15.1634 8 24 8C32.8366 8 40 15.1634 40 24" fill="none" stroke="%232C80FF" stroke-width="3.5" stroke-linecap="round"/%3E%3Crect x="6" y="22" width="6" height="12" rx="3" fill="none" stroke="%232C80FF" stroke-width="3.5" stroke-linejoin="round"/%3E%3Crect x="36" y="22" width="6" height="12" rx="3" fill="none" stroke="%232C80FF" stroke-width="3.5" stroke-linejoin="round"/%3E%3Cpath d="M38 32C38 37 32 39 30 39" fill="none" stroke="%232C80FF" stroke-width="3.5" stroke-linecap="round"/%3E%3C/svg%3E';

const handleClick = () => {
  emit("click");
};
</script>

<style lang="scss" scoped>
.customer-service-float-btn {
  position: fixed;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 8rpx 28rpx rgba(0, 0, 0, 0.1), 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  z-index: 100;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.customer-service-float-btn-hover {
  transform: scale(0.94);
  opacity: 0.9;
}

.cs-btn {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.cs-btn::after {
  border: none;
}

.cs-icon {
  width: 34rpx;
  height: 34rpx;
  display: block;
  margin-bottom: 2rpx;
}

.cs-text {
  font-size: 20rpx;
  font-weight: 500;
  color: #666666;
  line-height: 28rpx;
}
</style>

