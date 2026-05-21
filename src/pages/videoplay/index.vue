<template>
  <view
    class="page"
    :style="dragStyle"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <!-- Video Player -->
    <video
      id="myVideo"
      :src="videoUrl"
      :autoplay="autoplay"
      :controls="false"
      :show-play-btn="false"
      :show-center-play-btn="false"
      :enable-progress-gesture="false"
      object-fit="contain"
      class="video-player"
      :custom-cache="false"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      @ended="onEnded"
      @waiting="onWaiting"
      @click="onVideoClick"
    ></video>

    <!-- Loading Spinner -->
    <view class="loading-overlay" v-if="isLoading">
      <view class="loading-spinner"></view>
    </view>

    <!-- Center Play Button (when paused) -->
    <view
      class="center-play-overlay"
      v-if="!isPlaying"
      @click.stop="togglePlay"
    >
      <image
        src="http://cdn.xiaodingdang1.com/2025/10/22/2f504fbb11944ad8834f6c479f233281.png"
        style="width: 80rpx; height: 80rpx"
      />
    </view>

    <!-- Bottom Capsule Controls -->
    <view class="bottom-capsule-container">
      <view class="controls-capsule">
        <!-- Main Controls (Collapsible) -->
        <view class="main-controls-group">
          <!-- Play/Pause -->
          <view class="icon-btn" @click.stop="togglePlay">
            <uni-icons
              :type="isPlaying ? 'pause-filled' : 'play-filled'"
              size="28"
              color="#fff"
            ></uni-icons>
          </view>

          <!-- Middle: Time + Slider -->
          <view class="middle-section">
            <text class="time-text"
              >{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</text
            >
            <view class="slider-wrapper">
              <slider
                class="progress-slider"
                :value="currentTime"
                :max="duration || 1"
                activeColor="#ffffff"
                backgroundColor="#454545"
                block-size="8"
                block-color="#ffffff"
                @change="onSliderChange"
                @changing="onSliderChanging"
              />
            </view>
          </view>

          <!-- Rate -->
          <view class="rate-text" @click.stop="toggleRate">
            {{ playbackRate === 1 ? "倍速" : playbackRate + "x" }}
          </view>

          <!-- Divider -->
          <view class="vertical-divider"></view>
        </view>
      </view>
    </view>
  </view>
  <!-- <BackHome /> -->
</template>

<script>
export default {
  data() {
    return {
      coverImage: "",
      videoUrl: "",
      autoplay: true,
      isPlaying: true,
      currentTime: 0,
      duration: 0,
      showControls: true,
      controlsTimer: null,

      // Playback Rate
      playbackRate: 1,
      playbackRates: [1, 1.25, 1.5, 2, 0.5],

      // Drag to Close Logic
      dragStartY: 0,
      dragTranslateY: 0,
      dragActivated: false,
      dragThreshold: 150,
      isDragging: false,

      videoContext: null,
      isSliderChanging: false, // To prevent timeupdate from jumping slider while dragging
      lastTimeUpdate: 0,
      isLoading: true,
      visitContent: "",
    };
  },

  computed: {
    dragStyle() {
      if (this.dragTranslateY > 0) {
        const scale = 1 - this.dragTranslateY / 1000;
        return {
          transform: `translateY(${this.dragTranslateY}px) scale(${Math.max(
            0.8,
            scale
          )})`,
          opacity: 1 - this.dragTranslateY / 600,
          transition: this.isDragging ? "none" : "all 0.3s ease",
          backgroundColor: `rgba(0,0,0,${Math.max(
            0,
            1 - this.dragTranslateY / 300
          )})`,
        };
      }
      return {
        backgroundColor: "#000",
      };
    },
  },

  onLoad(options) {
    if (options && options.url) {
      this.videoUrl = decodeURIComponent(options.url);
      this.coverImage = options.coverImage
        ? decodeURIComponent(options.coverImage)
        : "";
      this.visitContent = decodeURIComponent(options.visitContent);
    }
  },

  onReady() {
    this.videoContext = uni.createVideoContext("myVideo", this);
    this.resetControlsTimer();
  },

  onShareAppMessage(res) {
    return {
      title: this.visitContent,
      path: `/pages/videoplay/index?url=${encodeURIComponent(
        this.videoUrl
      )}&coverImage=${encodeURIComponent(this.coverImage)}`,
      imageUrl: this.coverImage,
    };
  },

  onShareTimeline(res) {
    return {
      title: this.visitContent,
      query: `url=${encodeURIComponent(
        this.videoUrl
      )}&coverImage=${encodeURIComponent(this.coverImage)}`,
      imageUrl: this.coverImage,
    };
  },

  methods: {
    handleBack() {
      // Show controls when clicked
      this.showControls = true;
      this.resetControlsTimer();

      const pages = getCurrentPages();
      if (pages.length > 1) {
        uni.navigateBack({ delta: 1 });
      } else {
        uni.switchTab({ url: "/pages/index/index" });
      }
    },

    togglePlay() {
      if (this.isPlaying) {
        this.videoContext.pause();
      } else {
        this.videoContext.play();
      }
    },

    onPlay() {
      this.isPlaying = true;
      this.isLoading = false;
      this.showControls = true;
      this.resetControlsTimer();
    },

    onWaiting() {
      this.isLoading = true;
    },

    onPause() {
      this.isPlaying = false;
      this.isLoading = false;
      this.showControls = true;
      if (this.controlsTimer) clearTimeout(this.controlsTimer);
    },

    onEnded() {
      this.isPlaying = false;
      this.showControls = true;
    },

    onTimeupdate(e) {
      this.isLoading = false;
      if (!this.isSliderChanging) {
        const now = Date.now();
        // 节流更新，减少渲染频率，优化iOS卡顿
        if (now - this.lastTimeUpdate > 200) {
          this.currentTime = e.detail.currentTime;
          this.lastTimeUpdate = now;
        }
      }
    },

    onLoadedmetadata(e) {
      this.duration = e.detail.duration;
    },

    onVideoClick() {
      // If controls are hidden, show them.
      // If controls are shown and playing, hide them? Or pause?
      // WeChat style:
      // Tap -> Toggle Controls? No, usually Tap -> Pause/Play?
      // Actually WeChat Moments: Tap video -> Toggle Play/Pause.
      // The controls visibility is usually coupled with play state or user interaction.
      // Let's make it: Tap -> Toggle Play/Pause.
      this.togglePlay();
    },

    toggleControls() {
      // If we want separate control visibility toggle
      this.showControls = !this.showControls;
      if (this.showControls && this.isPlaying) {
        this.resetControlsTimer();
      }
    },

    resetControlsTimer() {
      if (this.controlsTimer) clearTimeout(this.controlsTimer);
      this.controlsTimer = setTimeout(() => {
        if (this.isPlaying) {
          this.showControls = false;
        }
      }, 3000);
    },

    formatTime(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min.toString().padStart(2, "0")}:${sec
        .toString()
        .padStart(2, "0")}`;
    },

    toggleRate() {
      const idx = this.playbackRates.findIndex((r) => r === this.playbackRate);
      const nextIndex = (idx + 1) % this.playbackRates.length;
      this.playbackRate = this.playbackRates[nextIndex];
      this.videoContext.playbackRate(this.playbackRate);
      uni.showToast({ title: `倍速: ${this.playbackRate}x`, icon: "none" });
    },

    onSliderChanging(e) {
      this.isSliderChanging = true;
      this.currentTime = e.detail.value;
      this.showControls = true;
      this.resetControlsTimer();
    },

    onSliderChange(e) {
      this.isSliderChanging = false;
      this.currentTime = e.detail.value;
      this.videoContext.seek(this.currentTime);
      this.videoContext.play();
      this.isPlaying = true;
      this.resetControlsTimer();
    },

    // Touch Logic for Pull Down to Close
    onTouchStart(e) {
      if (e.touches.length === 1) {
        this.dragStartY = e.touches[0].clientY;
        this.dragActivated = true;
        this.isDragging = true;
      }
    },

    onTouchMove(e) {
      if (this.dragActivated && e.touches.length === 1) {
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - this.dragStartY;
        if (deltaY > 0) {
          // Only allow drag down
          this.dragTranslateY = deltaY;
        }
      }
    },

    onTouchEnd(e) {
      this.isDragging = false;
      if (this.dragTranslateY > this.dragThreshold) {
        this.handleBack();
      } else {
        this.dragTranslateY = 0;
      }
      this.dragActivated = false;
    },
  },
};
</script>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.video-player {
  width: 100%;
  height: 100%;
}

.center-play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 120rpx;
  height: 120rpx;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto; /* Ensure it captures clicks */
}

.bottom-capsule-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.controls-capsule {
  background-color: #262626;
  border-radius: 60rpx;
  display: flex;
  align-items: center;
  padding: 12rpx 20rpx;
  pointer-events: auto;
  transition: all 0.3s ease;
}

.main-controls-group {
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: all 0.3s ease;
  max-width: 600rpx;
  opacity: 1;
}

.main-controls-group.hide-controls {
  max-width: 0;
  opacity: 0;
}

.middle-section {
  display: flex;
  flex-direction: column;
  width: 360rpx;
  margin: 0 20rpx;
  justify-content: center;
}

.time-text {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.7);
  margin-left: 8rpx;
  margin-bottom: 6rpx;
  line-height: 1;
}

.slider-wrapper {
  width: 100%;
  height: 20rpx;
  display: flex;
  align-items: center;
}

.progress-slider {
  width: 100%;
  margin: 0;
}

.rate-text {
  font-size: 26rpx;
  color: #fff;
  margin: 0 20rpx;
  white-space: nowrap;
}

.vertical-divider {
  width: 1px;
  height: 30rpx;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 10rpx;
}

.icon-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60rpx;
  height: 60rpx;
}

.loading-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: none;
}

.loading-spinner {
  width: 60rpx;
  height: 60rpx;
  border: 6rpx solid rgba(255, 255, 255, 0.3);
  border-top: 6rpx solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
