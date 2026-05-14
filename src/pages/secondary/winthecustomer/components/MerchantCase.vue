<template>
  <view class="merchant-case">
    <SectionHeader title="商家案例" subtitle="MERCHANT CASE" />
    <view class="merchant-case__grid">
      <CaseCardGrid :list="list" @select="$emit('select', $event)" />
    </view>
    <view
      v-if="showMore && list.length > 0"
      class="view-more-btn"
      @click="$emit('more')"
    >
      <view>查看更多</view>
      <view>></view>
    </view>
  </view>
</template>

<script setup>
import SectionHeader from "./SectionHeader.vue";
import CaseCardGrid from "./CaseCardGrid.vue";

defineProps({
  list: { type: Array, default: () => [] },
  showMore: { type: Boolean, default: true },
});

defineEmits(["select", "more"]);
</script>

<style scoped>
.merchant-case {
  padding: 60rpx 26rpx 20rpx;
  background-color: #fff;
}
.merchant-case__grid {
  margin: 60rpx 0 40rpx;
}

.view-more-btn {
  display: flex;
  justify-content: center;
  background: #f3f5fb;
  border-radius: 8rpx;
  width: 100%;
  height: 88rpx;
  color: #313131;
  font-size: 30rpx;
  line-height: 88rpx;
  margin: 0 0 20rpx 0;
}
.view-more-btn:active {
  opacity: 0.7;
}
</style>
