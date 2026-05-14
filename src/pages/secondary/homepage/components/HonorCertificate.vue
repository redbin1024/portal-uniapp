<template>
  <view class="honor-certificate">
    <view class="hc-title">荣誉证书</view>

    <view class="hc-viewport">
      <!-- 第一排：向左滚动 -->
      <view
        v-if="firstRow.length"
        class="hc-track hc-track-ltr"
        :style="{ animationDuration: duration + 's' }"
      >
        <view
          v-for="(item, index) in firstRowLoop"
          :key="'r1-' + index"
          class="hc-item"
        >
          <image
            class="hc-item-img"
            :src="getImage(item) + '?image_process=format,webp'"
            mode="aspectFit"
          />
          <text v-if="getName(item)" class="hc-item-name">{{
            getName(item)
          }}</text>
        </view>
      </view>

      <!-- 第二排：向右滚动 -->
      <view
        v-if="secondRow.length"
        class="hc-track hc-track-rtl"
        :style="{ animationDuration: duration + 's' }"
      >
        <view
          v-for="(item, index) in secondRowLoop"
          :key="'r2-' + index"
          class="hc-item"
        >
          <image
            class="hc-item-img"
            :src="getImage(item) + '?image_process=format,webp'"
            mode="aspectFit"
          />
          <text v-if="getName(item)" class="hc-item-name">{{
            getName(item)
          }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // 支持字符串数组（图片URL）或对象数组（{image,name}）
  list: {
    type: Array,
    default: () => [],
  },
  // 一轮滚动时长（秒），值越大越慢
  duration: {
    type: Number,
    default: 30,
  },
});

const getImage = (item) =>
  typeof item === "string" ? item : item?.image || "";
const getName = (item) => (typeof item === "string" ? "" : item?.name || "");

// 按奇偶拆两排
const firstRow = computed(() =>
  props.list.filter((_, i) => i % 2 === 0)
);
const secondRow = computed(() =>
  props.list.filter((_, i) => i % 2 === 1)
);

// 拼接一次实现无缝循环
const firstRowLoop = computed(() => [...firstRow.value, ...firstRow.value]);
const secondRowLoop = computed(() => [...secondRow.value, ...secondRow.value]);
</script>

<style scoped>
.honor-certificate {
  background: #f4f5fa;
  padding: 46rpx 0 60rpx;
}

.hc-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #000000;
  text-align: center;
  line-height: 56rpx;
  margin-bottom: 32rpx;
}

.hc-viewport {
  width: 100%;
  overflow: hidden;
}

.hc-track {
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  width: max-content;
  will-change: transform;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.hc-track + .hc-track {
  margin-top: 24rpx;
}
.hc-track-ltr {
  animation-name: hc-scroll-left;
}
.hc-track-rtl {
  animation-name: hc-scroll-right;
}

.hc-item {
  flex-shrink: 0;
  width: 240rpx;
  margin-right: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hc-item-img {
  width: 240rpx;
  height: 260rpx;
  border-radius: 16rpx;
  background: #ffffff;
  display: block;
}
.hc-item-name {
  margin-top: 16rpx;
  width: 240rpx;
  font-size: 24rpx;
  color: #313131;
  line-height: 34rpx;
  text-align: center;
}

/* 整排平移 50%（因为轨道是两份拼接） */
@keyframes hc-scroll-left {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}
@keyframes hc-scroll-right {
  from {
    transform: translate3d(-50%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
