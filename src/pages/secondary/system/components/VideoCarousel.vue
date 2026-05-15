<template>
  <view class="video-section" v-if="videos.length > 0">
    <swiper
      class="video-swiper"
      :current="currentIndex"
      :circular="videos.length > 1"
      next-margin="80rpx"
      @change="onSwiperChange"
    >
      <swiper-item v-for="(item, i) in videos" :key="i">
        <view class="video-card">
          <video
            class="video-player"
            :src="item.videoUrl"
            :controls="false"
            object-fit="cover"
          ></video>
          <view class="video-mask" @click="onVideoTap(item)"></view>
        </view>
      </swiper-item>
    </swiper>
    <text class="video-section__title">{{
      videos[currentIndex].enterpriseName
    }}</text>
    <view class="video-pager">
      <view class="video-pager__bar">
        <block v-for="(item, i) in videos" :key="i">
          <view
            v-if="i === currentIndex"
            class="video-pager__progress"
          ></view>
          <view v-else class="video-pager__dot"></view>
        </block>
      </view>
      <view class="video-pager__next" @click="goNext">
        <image class="video-pager__next-icon" :src="nextIcon"></image>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  videos: { type: Array, default: () => [] },
});
const emit = defineEmits(["play"]);

const currentIndex = ref(0);

watch(
  () => props.videos.length,
  () => {
    currentIndex.value = 0;
  }
);

const nextIcon =
  "data:image/svg+xml;utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27white%27 stroke-width=%273%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%279 18 15 12 9 6%27/%3E%3C/svg%3E";

const onSwiperChange = (e) => {
  currentIndex.value = e.detail.current;
};

const goNext = () => {
  const total = props.videos.length;
  if (total <= 1) return;
  currentIndex.value = (currentIndex.value + 1) % total;
};

const onVideoTap = (item) => {
  if (!item.videoUrl) return;
  emit("play", item);
};
</script>

<style scoped>
.video-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx;
}

.video-swiper {
  width: 100%;
  height: 360rpx;
}

.video-card {
  position: relative;
  width: calc(100% - 32rpx);
  height: 360rpx;
  border-radius: 20rpx;
  overflow: hidden;
  box-sizing: border-box;
}

.video-player {
  width: 100%;
  height: 100%;
  display: block;
}

.video-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-section__title {
  width: 504rpx;
  margin-top: 32rpx;
  font-family: SourceHanSansCN-Revision;
  font-size: 24rpx;
  font-weight: normal;
  color: #3d3d3d;
  letter-spacing: 0;
  text-align: center;
}

.video-pager {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 48rpx;
  gap: 24rpx;
}

.video-pager__bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24rpx;
  width: 272rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background-color: #f4f5f9;
}

.video-pager__dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background-color: #c8cad1;
}

.video-pager__progress {
  width: 72rpx;
  height: 14rpx;
  border-radius: 8rpx;
  background-color: #006dff;
}

.video-pager__next {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  background-color: #006dff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-pager__next-icon {
  width: 28rpx;
  height: 36rpx;
}
</style>
