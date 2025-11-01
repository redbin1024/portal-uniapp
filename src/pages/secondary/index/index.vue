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
        // 尝试阻止默认行为，避免内置进度条拖动（不同平台兼容性不同）
        if (e && typeof e.preventDefault === "function") {
          e.preventDefault();
        }
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
