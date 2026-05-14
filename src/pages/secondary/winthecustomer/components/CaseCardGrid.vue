<template>
  <view class="case-grid">
    <view
      class="case-card"
      v-for="(item, index) in list"
      :key="item.successCaseId || index"
      :class="{ 'case-card--in': visible[index] }"
      @click="$emit('select', item)"
    >
      <view class="case-card__image-wrap">
        <image
          class="case-card__image"
          :src="item.caseImages?.[0] + '?image_process=format,webp'"
          mode="aspectFill"
        ></image>
      </view>
      <view class="case-card__info">
        <view class="case-card__title">{{ item.customerName }}</view>
        <view class="case-card__desc">{{ item.caseValue }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";

const props = defineProps({
  list: { type: Array, default: () => [] },
  // 每个卡片相对前一个的延迟（ms）。设小一点能更快出现
  staggerMs: { type: Number, default: 30 },
});

defineEmits(["select"]);

const visible = ref([]);

const reveal = () => {
  const len = props.list.length;
  visible.value = new Array(len).fill(false);
  nextTick(() => {
    for (let i = 0; i < len; i++) {
      setTimeout(() => {
        // 触发响应式更新
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
</script>

<style scoped>
.case-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 24rpx;
}

.case-card {
  width: 338rpx;
  background: #ffffff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
  box-sizing: border-box;
  opacity: 0;
  transform: translateY(20rpx);
  transition: opacity 0.45s ease-out, transform 0.45s ease-out;
}
.case-card--in {
  opacity: 1;
  transform: translateY(0);
}

.case-card__image-wrap {
  width: 338rpx;
  height: 450rpx;
  border-radius: 16rpx 16rpx 0 0;
  overflow: hidden;
  background-color: #f0f0f0;
}
.case-card__image {
  width: 100%;
  height: 100%;
  display: block;
}

.case-card__info {
  padding: 18rpx 18rpx 24rpx;
  box-sizing: border-box;
}
.case-card__title {
  font-size: 26rpx;
  font-weight: 500;
  line-height: 36rpx;
  color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.case-card__desc {
  margin-top: 12rpx;
  font-size: 22rpx;
  font-weight: normal;
  line-height: 30rpx;
  color: rgba(0, 0, 0, 0.4);
  letter-spacing: 0;
  text-align: justify;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
</style>
