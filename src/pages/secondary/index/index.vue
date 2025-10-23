<template>
  <view class="video-container">
    <!-- 页面中的视频展示，不自动播放，显示控制按钮 -->
    <video
      id="myVideo"
      :src="videoSrc"
      controls
      show-center-play-btn
      @play="onVideoPlay"
      class="video-player"
      :muted="true"
    ></video>

    <!-- 全屏播放的视频容器，通过条件渲染控制显示 -->
    <view v-if="isFullscreen" class="fullscreen-video-wrapper">
      <video
        id="fullscreenVideo"
        :src="videoSrc"
        :autoplay="true"
        @fullscreenchange="onFullscreenChange"
        class="fullscreen-video"
      ></video>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 视频源地址
const videoSrc = ref(
  "http://cdn.xiaodingdang1.com/2025/10/23/8ee4114c7cf04a4185e5a0442e2cd2e0.mp4"
);
// 是否处于全屏状态
const isFullscreen = ref(false);
// 页面视频上下文
let videoContext = null;
// 全屏视频上下文
let fullscreenVideoContext = null;

onMounted(() => {
  // 创建页面视频上下文
  videoContext = uni.createVideoContext("myVideo");
  // 创建全屏视频上下文
  fullscreenVideoContext = uni.createVideoContext("fullscreenVideo");
});

onUnmounted(() => {
  // 清理资源
  videoContext = null;
  fullscreenVideoContext = null;
});

// 视频播放事件
const onVideoPlay = () => {
  // 当点击视频中间的播放按钮时，触发全屏播放
  enterFullscreen();
};

// 进入全屏播放
const enterFullscreen = () => {
  isFullscreen.value = true;

  // 下一个tick确保DOM已更新
  //   setTimeout(() => {
  if (fullscreenVideoContext) {
    // 请求竖屏全屏播放，direction为0表示竖屏
    fullscreenVideoContext.requestFullScreen({ direction: 0 });
    fullscreenVideoContext.play();
  }
  //   }, 100);
};

// 全屏状态变化事件
const onFullscreenChange = (e) => {
  const { fullScreen } = e.detail;

  if (!fullScreen) {
    // 退出全屏
    exitFullscreen();
  }
};

// 退出全屏
const exitFullscreen = () => {
  if (fullscreenVideoContext) {
    fullscreenVideoContext.pause();
    fullscreenVideoContext.seek(0);
  }
  isFullscreen.value = false;

  // 重置页面视频状态
  if (videoContext) {
    videoContext.pause();
  }
};
</script>

<style scoped>
.video-container {
  padding: 20rpx;
}

.video-player {
  width: 100%;
  height: 400rpx;
  border-radius: 16rpx;
}

.fullscreen-video-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 9999;
}

.fullscreen-video {
  width: 100%;
  height: 100%;
}
</style>
