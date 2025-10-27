<template>
  <view class="video-container">
    <video
      id="myVideo"
      :src="videoUrl"
      :autoplay="autoplay"
      :loop="loop"
      :controls="true"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      @fullscreenchange="onFullscreenchange"
      class="video-player"
    >
      <!-- 自定义控件区域 -->
    </video>
  </view>
</template>

<script>
export default {
  data() {
    return {
      videoUrl:
        "http://cdn.xiaodingdang1.com/2025/10/24/14761649ac8a42c693481f96a0b19917.mp4",
      autoplay: true,
      loop: false,
      isPlaying: false,
      isFullScreen: false,
      currentTime: 0,
      duration: 0,
      isLandscape: false,
      videoContext: null,
      // 添加用于存储页面参数的数据
    };
  },

  onLoad(options) {
    // 获取上个页面传递的参数
    // 如果传递了视频链接，则使用传递的链接
    if (options && options.url) {
      this.videoUrl = decodeURIComponent(options.url);
    }
    console.log(this.videoUrl);
  },

  onReady() {
    this.videoContext = uni.createVideoContext("myVideo", this);
  },

  onShow() {
    // 监听横竖屏变化
    uni.onWindowResize((res) => {
      this.isLandscape = res.deviceOrientation === "landscape";
    });
  },

  methods: {
    // 切换播放状态
    togglePlay() {
      if (this.isPlaying) {
        this.videoContext.pause();
      } else {
        this.videoContext.play();
      }
    },

    // 切换全屏状态
    toggleFullScreen() {
      if (this.isFullScreen) {
        this.videoContext.exitFullScreen();
      } else {
        this.videoContext.requestFullScreen({
          direction: this.isLandscape ? 0 : 90,
        });
      }
    },

    // 全屏状态变化回调
    onFullscreenchange(e) {
      this.isFullScreen = e.detail.fullScreen;
      if (!this.isFullScreen) {
        this.videoContext.pause();
      }
    },

    // 播放事件
    onPlay() {
      this.isPlaying = true;
    },

    // 暂停事件
    onPause() {
      this.isPlaying = false;
    },

    // 时间更新
    onTimeupdate(e) {
      this.currentTime = e.detail.currentTime;
    },

    // 视频元数据加载
    onLoadedmetadata(e) {
      this.duration = e.detail.duration;
    },

    // 进度条变化
    onSliderChange(e) {
      const seekTime = e.detail.value;
      this.videoContext.seek(seekTime);
    },

    // 格式化时间显示
    formatTime(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min.toString().padStart(2, "0")}:${sec
        .toString()
        .padStart(2, "0")}`;
    },
  },
};
</script>

<style scoped>
.video-container {
  width: 100%;
  height: 100vh;
  background: #000;
  position: relative;
}

.video-player {
  width: 100%;
  height: 100%;
}

.custom-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
}

.custom-controls.horizontal-layout {
  flex-direction: column;
  right: 0;
  left: auto;
  width: 120rpx;
  height: 100%;
  justify-content: center;
  background: linear-gradient(to left, transparent, rgba(0, 0, 0, 0.7));
}

.control-btn {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.control-icon {
  width: 40rpx;
  height: 40rpx;
}

.progress-container {
  flex: 1;
  margin: 0 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress-slider {
  width: 100%;
}

.time-text {
  color: #fff;
  font-size: 24rpx;
  margin-top: 10rpx;
}

/* 横屏适配 */
@media (orientation: landscape) {
  .custom-controls {
    flex-direction: column;
    right: 0;
    left: auto;
    width: 120rpx;
    height: 100%;
    justify-content: center;
  }
}
</style>
