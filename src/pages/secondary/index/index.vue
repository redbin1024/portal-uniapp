<template>
  <view
    class="page"
    :style="dragStyle"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <!-- 顶部返回箭头 -->
    <view class="nav-bar">
      <view class="back-btn" @click="handleBack">
        <text class="back-arrow">←</text>
        <text class="back-text">返回</text>
      </view>
      <!-- 转发视频按钮（微信小程序支持 open-type=share） -->
      <button class="share-btn" open-type="share">转发视频</button>
    </view>

    <!-- 下拉提示 -->
    <view class="drag-hint" :style="dragHintStyle">
      <text class="drag-hint-text">{{ hintText }}</text>
    </view>

    <view class="video-container" :style="dragVideoStyle">
      <video
        id="myVideo"
        :src="videoUrl"
        :autoplay="autoplay"
        :loop="loop"
        :controls="true"
        :show-progress="false"
        :enable-progress-gesture="false"
        :show-play-btn="false"
        :show-center-play-btn="true"
        controlsList="nodownload noplaybackrate noremoteplayback"
        @play="onPlay"
        @pause="onPause"
        @timeupdate="onTimeupdate"
        @loadedmetadata="onLoadedmetadata"
        @fullscreenchange="onFullscreenchange"
        @click="onVideoClick"
        class="video-player"
      >
        <!-- 自定义控件区域 -->
      </video>
      <!-- 拖拽进度预览覆盖层 -->
      <view v-if="dragSeekActive" class="seek-overlay">
        <view class="seek-info">
          <text class="seek-time"
            >{{ formatTime(seekPreviewTime) }} /
            {{ formatTime(duration) }}</text
          >
        </view>
        <view class="seek-progress-bar">
          <view
            class="seek-progress"
            :style="{ width: (seekPreviewTime / (duration || 1)) * 100 + '%' }"
          ></view>
        </view>
      </view>

      <!-- 自定义底部进度条控件 -->
      <!-- <view class="custom-controls">
        <view class="progress-container">
          <slider
            class="progress-slider"
            :min="0"
            :max="duration"
            :value="currentTime"
            activeColor="#ff4d4f"
            backgroundColor="rgba(255,255,255,0.2)"
            blockColor="#fff"
            @changing="onSliderChanging"
            @change="onSliderChange"
          />
          <view class="time-text"
            >{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</view
          >
        </view>
      </view> -->
      <!-- 居中播放覆盖层：暂停时显示，点击恢复播放 -->
      <view
        v-if="!isPlaying"
        class="center-play-overlay"
        @click.stop="togglePlay"
      >
        <image
          src="http://cdn.xiaodingdang1.com/2025/10/22/2f504fbb11944ad8834f6c479f233281.png"
          class="play-icon"
        />
      </view>
      <!-- 倍速选择控件 -->
      <view class="rate-controls">
        <picker
          mode="selector"
          :range="playbackRateLabels"
          @change="onRatePickerChange"
        >
          <view class="rate-dropdown">
            <text class="rate-selected">{{ playbackRate }}x</text>
            <text class="dropdown-icon">▼</text>
          </view>
        </picker>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      coverImage: "",
      videoUrl: "",
      autoplay: true,
      loop: false,
      isPlaying: false,
      isFullScreen: false,
      currentTime: 0,
      duration: 0,
      isLandscape: false,
      videoContext: null,
      // 倍速相关
      playbackRate: 1,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      // 下拖返回相关状态
      dragStartY: 0,
      dragTranslateY: 0,
      dragTransitionEnabled: false,
      dragActivated: false,
      dragThreshold: 200,
      lastMoveY: 0,
      // 左右滑动相关状态（用于避免进度条加速/拖动）
      touchStartX: 0,
      touchStartY: 0,
      touchEndX: 0,
      touchEndY: 0,
      isDragging: false,
      horizontalSwipeActive: false,
      // 横向拖拽进度相关
      dragSeekActive: false,
      seekInitialTime: 0,
      seekPreviewTime: 0,
      windowWidth: 375,
      // 添加用于存储页面参数的数据
    };
  },

  onLoad(options) {
    // 获取上个页面传递的参数
    // 如果传递了视频链接，则使用传递的链接
    if (options && options.url) {
      this.videoUrl = decodeURIComponent(options.url);
      this.coverImage = decodeURIComponent(options.coverImage);
    }
  },

  onReady() {
    this.videoContext = uni.createVideoContext("myVideo", this);
    // 获取窗口宽度用于进度拖拽换算
    try {
      const info = uni.getSystemInfoSync && uni.getSystemInfoSync();
      if (info && info.windowWidth) this.windowWidth = info.windowWidth;
    } catch (e) {}
    // 初始化倍速
    try {
      if (
        this.videoContext &&
        typeof this.videoContext.playbackRate === "function"
      ) {
        this.videoContext.playbackRate(this.playbackRate);
      } else {
        const el =
          typeof document !== "undefined" &&
          document.getElementById &&
          document.getElementById("myVideo");
        if (el) el.playbackRate = this.playbackRate;
      }
    } catch (e) {
      // 忽略倍速初始化异常，保证跨端兼容
    }
  },

  onShow() {
    // 监听横竖屏变化
    uni.onWindowResize((res) => {
      this.isLandscape = res.deviceOrientation === "landscape";
    });
  },

  methods: {
    // 分享当前视频到微信好友/群聊
    onShareAppMessage(res) {
      const sharePath =
        "/pages/secondary/index/index?url=" +
        encodeURIComponent(this.videoUrl || "");
      return {
        path: sharePath,
        imageUrl: this.coverImage,
      };
    },
    // 返回上一页，若无历史则跳转到首页 Tab
    handleBack() {
      const pages = getCurrentPages?.() || [];
      if (pages.length > 1) {
        uni.navigateBack({ delta: 1 });
      } else {
        // 回退失败时跳转到首页（TabBar 页面）
        uni.switchTab({ url: "/pages/secondary/homepage/index" });
      }
    },
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

    // 点击视频区域时，若正在播放则暂停并显示居中播放按钮
    onVideoClick() {
      try {
        if (this.isPlaying && this.videoContext) {
          this.videoContext.pause();
        }
      } catch (err) {
        // 兼容处理：在某些端直接操作 video 元素
        const el =
          typeof document !== "undefined" &&
          document.getElementById &&
          document.getElementById("myVideo");
        if (el && !el.paused) {
          el.pause();
        }
      }
    },

    // 进度条变化
    onSliderChange(e) {
      const seekTime = e.detail.value;
      this.videoContext.seek(seekTime);
    },
    // 进度条拖动中（实时预览与 seek）
    onSliderChanging(e) {
      const seekTime = e.detail.value;
      this.seekPreviewTime = seekTime;
      this.dragSeekActive = true;
      try {
        this.videoContext && this.videoContext.seek(seekTime);
      } catch (err) {}
    },

    // 格式化时间显示
    formatTime(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min.toString().padStart(2, "0")}:${sec
        .toString()
        .padStart(2, "0")}`;
    },

    // 修改倍速
    changeRate(rate) {
      this.playbackRate = rate;
      try {
        if (
          this.videoContext &&
          typeof this.videoContext.playbackRate === "function"
        ) {
          this.videoContext.playbackRate(rate);
        } else {
          const el =
            typeof document !== "undefined" &&
            document.getElementById &&
            document.getElementById("myVideo");
          if (el) el.playbackRate = rate;
        }
        uni.showToast({ title: `已切换为${rate}倍速`, icon: "none" });
      } catch (e) {
        uni.showToast({ title: "当前端不支持倍速", icon: "none" });
      }
    },

    // 下拉选择倍速事件
    onRatePickerChange(e) {
      const index = Array.isArray(e?.detail?.value)
        ? e.detail.value[0]
        : e?.detail?.value;
      const rate = this.playbackRates[index] ?? this.playbackRate;
      this.changeRate(rate);
    },

    // 触摸开始 - 记录起点
    onTouchStart(e) {
      const touch = e.touches && e.touches[0];
      if (!touch) return;
      // 记录通用触摸起点
      this.touchStartX = touch.clientX || touch.pageX || 0;
      this.touchStartY = touch.clientY || touch.pageY || 0;
      this.touchEndX = this.touchStartX;
      this.touchEndY = this.touchStartY;
      this.isDragging = true;
      this.horizontalSwipeActive = false;
      // 记录拖拽进度起始时间
      this.seekInitialTime = this.currentTime || 0;
      this.seekPreviewTime = this.seekInitialTime;
      this.dragSeekActive = false;

      // 仅在非全屏下启用下拖返回
      if (!this.isFullScreen) {
        this.dragStartY = this.touchStartY;
        this.lastMoveY = this.dragStartY;
        this.dragActivated = true;
        this.dragTransitionEnabled = false;
      } else {
        // 全屏下不启用纵向拖拽返回
        this.dragActivated = false;
      }
    },

    // 触摸移动 - 计算下拖位移并跟随
    onTouchMove(e) {
      const touch = e.touches && e.touches[0];
      if (!touch) return;
      const currentX = touch.clientX || touch.pageX || 0;
      const currentY = touch.clientY || touch.pageY || 0;
      this.touchEndX = currentX;
      this.touchEndY = currentY;

      const deltaX = currentX - this.touchStartX;
      const deltaY = currentY - this.touchStartY;

      // 判断是否主要是水平滑动（避免被识别为进度拖动）
      const isMostlyHorizontal =
        (Math.abs(deltaX) > 18 && Math.abs(deltaY) < 12) ||
        Math.abs(deltaX) > Math.abs(deltaY) * 2;
      if (isMostlyHorizontal) {
        this.horizontalSwipeActive = true;
        // 横向拖拽：实时预览并更新进度
        const width = this.windowWidth || 375;
        const ratio = width > 0 ? deltaX / width : 0;
        let nextTime =
          (this.seekInitialTime || 0) + ratio * (this.duration || 0);
        if (!isFinite(nextTime)) nextTime = 0;
        // 边界限制
        nextTime = Math.max(0, Math.min(nextTime, this.duration || 0));
        this.seekPreviewTime = nextTime;
        this.dragSeekActive = true;
        // 尝试阻止默认行为，避免内置进度条拖动（不同平台兼容性不同）
        if (e && typeof e.preventDefault === "function") {
          e.preventDefault();
        }
        try {
          // 即时 seek，提升拖拽体验
          this.videoContext && this.videoContext.seek(nextTime);
        } catch (err) {}
        return; // 不触发下拉返回计算
      }

      // 非全屏且未判定为水平滑动时，按原逻辑处理下拉返回
      if (!this.isFullScreen && this.dragActivated) {
        const deltaYDown = currentY - this.dragStartY;
        const translateY = deltaYDown > 0 ? deltaYDown : 0; // 仅响应向下拖动
        this.dragTranslateY = translateY;
        this.lastMoveY = currentY;
      }
    },

    // 触摸结束 - 阈值判断执行返回或回弹
    onTouchEnd(e) {
      // 若识别为水平滑动，则不进行进度拖动；在全屏下可选择退出全屏
      if (this.horizontalSwipeActive) {
        const deltaX = (this.touchEndX || 0) - (this.touchStartX || 0);
        const deltaY = Math.abs(
          (this.touchEndY || 0) - (this.touchStartY || 0)
        );
        // 完成一次拖拽 seek（已在移动过程中实时更新），此处仅清理状态
        if (this.dragSeekActive) {
          this.dragSeekActive = false;
        }
        if (this.isFullScreen && Math.abs(deltaX) > 50 && deltaY < 30) {
          // 左右滑动退出全屏（与首页行为保持一致）
          this.videoContext && this.videoContext.exitFullScreen();
        }
        // 重置水平滑动状态
        this.horizontalSwipeActive = false;
        this.isDragging = false;
        return;
      }

      // 原有下拉返回逻辑（仅在非全屏下生效）
      if (!this.isFullScreen && this.dragActivated) {
        this.dragActivated = false;
        if (this.dragTranslateY >= this.dragThreshold) {
          // 松手超过阈值，执行返回上一页
          const pages = getCurrentPages?.() || [];
          if (pages.length > 1) {
            uni.navigateBack({ delta: 1 });
          } else {
            uni.switchTab({ url: "/pages/secondary/homepage/index" });
          }
          // 重置状态（以防在 H5 下 navigateBack 延迟）
          this.dragTranslateY = 0;
          this.dragTransitionEnabled = false;
        } else {
          // 未达阈值，回弹到初始位置
          this.dragTransitionEnabled = true;
          this.dragTranslateY = 0;
          setTimeout(() => {
            this.dragTransitionEnabled = false;
          }, 200);
        }
      }
      this.isDragging = false;
    },
  },
  computed: {
    // 页面位移样式
    dragStyle() {
      const t = this.dragTranslateY || 0;
      const transition = this.dragTransitionEnabled
        ? "transform 0.2s ease-out"
        : "none";
      return `transform: translate3d(0, ${t}px, 0); transition: ${transition};`;
    },
  },
  computed: {
    // 页面位移样式
    dragStyle() {
      const t = this.dragTranslateY || 0;
      const transition = this.dragTransitionEnabled
        ? "transform 0.2s ease-out"
        : "none";
      return `transform: translate3d(0, ${t}px, 0); transition: ${transition};`;
    },

    // 视频容器的缩放、圆角、阴影动画
    dragVideoStyle() {
      const y = this.dragTranslateY || 0;
      const progress = Math.min(Math.max(y / 240, 0), 1);
      const scale = 1 - 0.08 * progress; // 最多缩小 8%
      const radius = 24 * progress; // 圆角随进度增加
      const shadowOpacity = 0.22 * progress; // 阴影随进度增强
      const transition = this.dragTransitionEnabled
        ? "transform 0.2s ease-out, border-radius 0.2s ease-out, box-shadow 0.2s ease-out"
        : "none";
      return `transform: scale(${scale}); border-radius: ${radius}rpx; box-shadow: 0 20rpx 60rpx rgba(0,0,0,${shadowOpacity}); overflow: hidden; transition: ${transition};`;
    },

    // 顶部提示的透明度与位移
    dragHintStyle() {
      const y = this.dragTranslateY || 0;
      const progress = Math.min(Math.max(y / 240, 0), 1);
      const offsetY = Math.round(y * 0.15);
      const transition = this.dragTransitionEnabled
        ? "opacity 0.2s ease-out, transform 0.2s ease-out"
        : "none";
      return `opacity: ${
        0.9 * progress
      }; transform: translate(-50%, ${offsetY}px); transition: ${transition};`;
    },

    // 提示文案
    hintText() {
      return this.dragTranslateY >= this.dragThreshold
        ? "松手返回上一页"
        : "下拉返回上一页";
    },
    // 倍速标签
    playbackRateLabels() {
      return this.playbackRates.map((r) => `${r}x`);
    },
  },
};
</script>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  position: relative;
  background: #000;
  will-change: transform;
}

.nav-bar {
  position: absolute;
  top: 100rpx;
  left: 0;
  right: 0;
  height: 88rpx;
  padding: 0 24rpx;
  display: flex;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
  z-index: 20;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 12rpx;
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.18);
}

.back-arrow {
  color: #fff;
  font-size: 34rpx;
  line-height: 1;
}

.back-text {
  color: #fff;
  font-size: 28rpx;
}

/* 分享按钮样式 */
.share-btn {
  margin-left: auto;
  padding: 0rpx 18rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  font-size: 28rpx;
  margin: 0 0 0 10rpx;
}

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

/* 屏蔽 H5 下原生视频控件的时间线与时间显示（Chrome/Safari/webkit 系） */
.video-player::-webkit-media-controls-timeline {
  display: none !important;
}
.video-player::-webkit-media-controls-current-time-display,
.video-player::-webkit-media-controls-time-remaining-display {
  display: none !important;
}
.video-player::-webkit-media-controls-play-button {
  display: none !important;
}
.video-player::-webkit-media-controls-start-playback-button {
  display: none !important;
}
.video-player::-webkit-media-controls {
  overflow: hidden !important;
}

/* 暂停时的居中播放覆盖层 */
.center-play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.28);
  z-index: 30;
}

.play-icon {
  width: 120rpx;
  height: 120rpx;
}

/* 倍速控件样式 */
.rate-controls {
  position: absolute;
  bottom: 28rpx;
  right: 24rpx;
  display: flex;
  gap: 12rpx;
  z-index: 25;
}

.rate-chip {
  padding: 10rpx 16rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  font-size: 26rpx;
}

.rate-chip.active {
  background: rgba(255, 255, 255, 0.36);
}

/* 下拉倍速控件样式 */
.rate-dropdown {
  padding: 10rpx 16rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  font-size: 26rpx;
  display: inline-flex;
  align-items: center;
  gap: 10rpx;
}

.rate-selected {
  color: #fff;
}

.dropdown-icon {
  font-size: 22rpx;
  opacity: 0.8;
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
  z-index: 25;
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

/* 拖拽进度预览覆盖层 */
.seek-overlay {
  position: absolute;
  bottom: 120rpx;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  z-index: 28;
}

.seek-info {
  padding: 12rpx 18rpx;
  border-radius: 999rpx;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
}

.seek-time {
  color: #fff;
  font-size: 28rpx;
}

.seek-progress-bar {
  width: 80%;
  height: 8rpx;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 999rpx;
  overflow: hidden;
}

.seek-progress {
  height: 100%;
  background: #ff4d4f;
}

/* 下拉提示 */
.drag-hint {
  position: absolute;
  top: 24rpx;
  left: 50%;
  transform: translateX(-50%);
  z-index: 30;
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(6px);
  pointer-events: none;
}

.drag-hint-text {
  color: #fff;
  font-size: 26rpx;
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
