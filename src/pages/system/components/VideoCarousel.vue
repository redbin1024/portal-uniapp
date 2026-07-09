<template>
  <view class="video-section" v-if="mediaList.length > 0">
    <swiper class="video-swiper" :current="currentIndex" :circular="mediaList.length > 1" next-margin="0rpx"
      @change="onSwiperChange">
      <swiper-item v-for="(item, i) in mediaList" :key="i">
        <view class="video-card-shell">
          <view class="video-card">
            <view class="video-media">
              <!-- 图片 -->
              <image v-if="item.type === 'image'" class="video-player" :src="item.url" mode="aspectFill"
                @click="onImageTap(item)"></image>
              <!-- 视频 -->
              <template v-else>
                <video class="video-player" :src="item.url" :controls="false" object-fit="cover"></video>
                <view class="video-play-btn">
                  <image class="video-play-btn__icon" :src="playIcon"></image>
                </view>
                <view class="video-mask" @click="onVideoTap(item)"></view>
              </template>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="video-pager" v-if="mediaList.length > 1">
      <view v-for="(_, i) in mediaList" :key="i" class="video-pager__dot"
        :class="{ 'video-pager__dot--active': i === currentIndex }"></view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  // 视频列表，元素形如 { videoUrl, coverImage, enterpriseName }
  videos: { type: Array, default: () => [] },
  // 图片列表，元素为图片 URL 字符串或 { url }
  images: { type: Array, default: () => [] },
});
const emit = defineEmits(["play", "image"]);

const currentIndex = ref(0);

// 合并媒体列表：图片在前，视频在后
const mediaList = computed(() => {
  const imageItems = (props.images || [])
    .map((it) => (typeof it === "string" ? it : it?.url || it?.imageUrl || ""))
    .filter(Boolean)
    .map((url) => ({ type: "image", url }));
  const videoItems = (props.videos || [])
    .filter((it) => it && it.videoUrl)
    .map((it) => ({
      type: "video",
      url: it.videoUrl,
      videoUrl: it.videoUrl,
      coverImage: it.coverImage,
      enterpriseName: it.enterpriseName,
    }));
  return [...imageItems, ...videoItems];
});

watch(
  () => mediaList.value.length,
  () => {
    currentIndex.value = 0;
  }
);

const playIcon =
  "data:image/svg+xml;utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 64 64%27%3E%3Ccircle cx=%2732%27 cy=%2732%27 r=%2732%27 fill=%27rgba(0,0,0,0.45)%27/%3E%3Cpolygon points=%2726,20 26,44 46,32%27 fill=%27white%27/%3E%3C/svg%3E";

const onSwiperChange = (e) => {
  currentIndex.value = e.detail.current;
};

const onVideoTap = (item) => {
  if (!item.videoUrl) return;
  emit("play", item);
};

const onImageTap = (item) => {
  emit("image", item);
};
</script>

<style scoped>
.video-section {
  position: relative;
  margin-top: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24rpx;
}

.video-swiper {
  width: 100%;
  height: 400rpx;
}

.video-card-shell {
  position: relative;
  width: 100%;
  height: 400rpx;
  margin: 0 auto;
  padding: 4rpx;
  border-radius: 24rpx;
  background: linear-gradient(180deg, #7fb0f7 0%, #4f8bf0 100%);
  box-shadow: 0 12rpx 28rpx rgba(79, 139, 240, 0.25);
  box-sizing: border-box;
}

.video-card {
  width: 100%;
  height: 100%;
  padding: 0;
  border-radius: 22rpx;
  background: #ffffff;
  overflow: hidden;
  box-sizing: border-box;
}

.video-media {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 22rpx;
  overflow: hidden;
  background: #000000;
}

.video-player {
  width: 100%;
  height: 100%;
  display: block;
  background: #000000;
}

.video-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 88rpx;
  height: 88rpx;
  z-index: 1;
  pointer-events: none;
}

.video-play-btn__icon {
  width: 100%;
  height: 100%;
}

.video-pager {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32rpx;
  gap: 16rpx;
}

.video-pager__dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background-color: #c8cad1;
  transition: all 0.2s ease;
}

.video-pager__dot--active {
  background-color: #006dff;
}
</style>
