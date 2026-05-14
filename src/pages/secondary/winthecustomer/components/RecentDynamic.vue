<template>
  <view class="dynamic">
    <SectionHeader title="最近动态" subtitle="RECENT UPDATES" />
    <view class="dynamic-content">
      <view
        class="dynamic-item"
        v-for="(item, index) in list"
        :key="item.newsId || index"
        :class="{ 'dynamic-item--in': visible[index] }"
        @click="$emit('select', item)"
      >
        <view class="dynamic-left">
          <view class="dynamic-date">{{ formatDate(item.createTime) }}</view>
          <view class="dynamic-title">{{ item.newsTitle }}</view>
          <view class="dynamic-text">{{ item.newsContent }}</view>
        </view>
        <view class="dynamic-center">
          <view class="step-dot"></view>
          <view class="step-line" v-if="index < list.length - 1"></view>
        </view>
        <view class="dynamic-right">
          <image
            class="dynamic-image"
            :src="item.newsImages?.[0] + '?image_process=format,webp'"
            mode="aspectFill"
          ></image>
        </view>
      </view>
    </view>
    <view
      v-if="visible.length && visible.every(Boolean) && showMore"
      class="view-more-btn view-more-btn--in"
      @click="$emit('more')"
    >
      <view>查看更多</view>
      <view class="view-more-icon"></view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import SectionHeader from "./SectionHeader.vue";

const props = defineProps({
  list: { type: Array, default: () => [] },
  showMore: { type: Boolean, default: true },
  staggerMs: { type: Number, default: 40 },
});

defineEmits(["select", "more"]);

const visible = ref([]);

const reveal = () => {
  const len = props.list.length;
  visible.value = new Array(len).fill(false);
  nextTick(() => {
    for (let i = 0; i < len; i++) {
      setTimeout(() => {
        const next = visible.value.slice();
        next[i] = true;
        visible.value = next;
      }, 30 + i * props.staggerMs);
    }
  });
};

watch(
  () => props.list.length,
  () => reveal(),
  { immediate: true }
);

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return dateStr.split(" ")[0];
};
</script>

<style scoped>
.dynamic {
  background: #ffffff;
  padding: 30rpx 28rpx;
}

.dynamic-content {
  margin-top: 40rpx;
}

.dynamic-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20rpx;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20rpx);
  transition: opacity 0.45s ease-out, transform 0.45s ease-out;
}
.dynamic-item--in {
  opacity: 1;
  transform: translateY(0);
}

.dynamic-left {
  width: 45%;
  flex-shrink: 0;
  box-sizing: border-box;
}
.dynamic-date {
  font-size: 24rpx;
  color: #2c80ff;
  margin-bottom: 8rpx;
  font-weight: bold;
}
.dynamic-title {
  color: #3d3d3d;
  font-size: 28rpx;
  font-weight: bold;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 36rpx;
  max-height: 72rpx;
}
.dynamic-text {
  font-size: 24rpx;
  color: #535353;
  line-height: 1.5;
  margin-top: 15rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dynamic-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 0 0 auto;
  width: 15%;
}
.step-dot {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background-color: #007aff;
  border: 3rpx solid #ffffff;
  box-shadow: 0 0 0 2rpx #007aff;
  z-index: 2;
  position: relative;
}
.step-line {
  width: 2rpx;
  background-color: #e0e0e0;
  position: absolute;
  top: 30rpx;
  left: 50%;
  height: 290rpx;
  z-index: 1;
}

.dynamic-right {
  width: 40%;
  flex-shrink: 0;
  box-sizing: border-box;
  overflow: hidden;
}
.dynamic-image {
  width: 100%;
  max-width: 280rpx;
  height: 200rpx;
  border-radius: 12rpx;
  background-color: #f0f0f0;
}

.view-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f5fb;
  border-radius: 8rpx;
  width: 100%;
  height: 88rpx;
  color: #313131;
  font-size: 30rpx;
  line-height: 88rpx;
  margin-top: 8rpx;
  opacity: 0;
  transform: translateY(20rpx);
  transition: opacity 0.45s ease-out 0.1s, transform 0.45s ease-out 0.1s;
}
.view-more-btn--in {
  opacity: 1;
  transform: translateY(0);
}
.view-more-btn:active {
  opacity: 0.7;
}
.view-more-icon {
  width: 14rpx;
  height: 14rpx;
  border-top: 3rpx solid currentColor;
  border-right: 3rpx solid currentColor;
  transform: rotate(45deg);
  margin-left: 12rpx;
}
</style>
