<template>
  <view class="blur-swiper-container" :style="{ height: height }">
    <view
      class="swiper-wrapper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <view
        v-for="(item, index) in list"
        :key="index"
        class="swiper-slide"
        :class="{ active: index === currentIndex }"
        :style="getSlideStyle(index)"
        @click="handleSlideClick(item, index)"
      >
        <view class="slide-content">
          <!-- 根据类型显示图片或视频 -->
          <image
            v-if="!item.type || item.type === 'image'"
            class="slide-image"
            :src="item.image || item.src"
            mode="aspectFill"
          />
          <!-- 视频封面显示 -->
          <view v-else-if="item.type === 'video'" class="video-container">
            <video
              :id="'video-' + index"
              class="video-cover-container"
              :src="item.video || item.src"
              :controls="item.controls !== false"
              :poster="getVideoCover(item)"
              :show-center-play-btn="item.showCenterPlayBtn !== false"
              :show-play-btn="item.showPlayBtn !== false"
              :enable-play-gesture="item.enablePlayGesture !== false"
              :object-fit="item.objectFit || 'contain'"
              :muted="item.muted || false"
              :autoplay="item.autoplay || false"
              :loop="item.loop || false"
              :show-fullscreen-btn="item.showFullscreenBtn !== false"
              @play="handleVideoPlay"
              @pause="handleVideoPause"
              @ended="handleVideoEnded"
              @error="handleVideoError"
              @loadedmetadata="handleVideoLoaded"
              @fullscreenchange="handleFullscreenChange"
            />
            <!-- 自定义播放按钮覆盖层 - 只在需要时显示 -->
            <view
              v-if="index === currentIndex"
              class="video-play-overlay"
              @click="handleVideoClick(item, index)"
            >
              <view class="play-button">
                <view class="play-icon"></view>
              </view>
            </view>
          </view>

          <view class="slide-overlay">
            <view class="slide-title">{{ item.title }}</view>
            <view class="slide-description">{{ item.description }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 指示器 -->
    <view v-if="showIndicator" class="swiper-indicators">
      <view
        v-for="(_, index) in list"
        :key="index"
        class="indicator-dot"
        :class="{ active: currentIndex === index }"
        @click="goToSlide(index)"
      />
    </view>
  </view>
</template>

<script>
export default {
  name: "BlurSwiper",
  props: {
    // 轮播图列表
    list: {
      type: Array,
      default: () => [],
    },
    // 容器高度
    height: {
      type: String,
      default: "400rpx",
    },
    // 自动轮播间隔时间（毫秒）
    interval: {
      type: Number,
      default: 3000,
    },
    // 是否自动轮播
    autoplay: {
      type: Boolean,
      default: true,
    },
    // 是否显示指示器
    showIndicator: {
      type: Boolean,
      default: true,
    },
    // 轮播项之间的间隙（rpx）
    gap: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      currentIndex: 0,
      touchStartX: 0,
      touchStartY: 0,
      timer: null,
      isTransitioning: false,
      playingVideoIndex: -1, // 当前播放视频的索引
    };
  },
  mounted() {
    this.startAutoplay();
    console.log("BlurSwiper mounted, list:", this.list);
    // 检查视频数据
    this.list.forEach((item, index) => {
      if (item.type === "video") {
        console.log(`视频项 ${index}:`, {
          src: item.video || item.src,
          poster: item.poster,
          type: item.type,
          controls: item.controls,
          muted: item.muted,
          autoplay: item.autoplay,
        });
      }
    });
  },
  beforeDestroy() {
    this.stopAutoplay();
    this.stopAllVideos();
  },
  methods: {
    // 获取每个滑块的样式
    getSlideStyle(index) {
      const totalSlides = this.list.length;
      const relativeIndex =
        (index - this.currentIndex + totalSlides) % totalSlides;

      let translateX = 0;
      let scale = 0.8;
      let opacity = 0.4;
      let zIndex = 1;
      const gap = this.gap; // 使用 props 中的间隙值

      if (relativeIndex === 0) {
        // 当前激活的卡片
        translateX = 0;
        scale = 1;
        opacity = 1;
        zIndex = 10;
      } else if (relativeIndex === 1 || relativeIndex === totalSlides - 1) {
        // 左右相邻的卡片
        translateX = relativeIndex === 1 ? 230 + gap : -230 - gap;
        scale = 0.85;
        opacity = 0.6;
        zIndex = 5;
      } else if (relativeIndex === 2 || relativeIndex === totalSlides - 2) {
        // 更远的卡片
        translateX = relativeIndex === 2 ? 380 + gap * 2 : -380 - gap * 2;
        scale = 0.7;
        opacity = 0.3;
        zIndex = 2;
      } else {
        // 最远的卡片
        translateX =
          relativeIndex > totalSlides / 2 ? -480 - gap * 3 : 480 + gap * 3;
        scale = 0.6;
        opacity = 0.1;
        zIndex = 1;
      }

      return {
        transform: `translateX(${translateX}rpx) scale(${scale})`,
        opacity: opacity,
        zIndex: zIndex,
        transition: this.isTransitioning
          ? "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          : "none",
      };
    },

    // 触摸开始
    touchStart(e) {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.stopAutoplay();
    },

    // 触摸移动
    touchMove(e) {
      const deltaX = e.touches[0].clientX - this.touchStartX;
      const deltaY = e.touches[0].clientY - this.touchStartY;

      // 判断是否为水平滑动
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
      }
    },

    // 触摸结束
    touchEnd(e) {
      const deltaX = e.changedTouches[0].clientX - this.touchStartX;
      const threshold = 50; // 滑动阈值

      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          this.prevSlide();
        } else {
          this.nextSlide();
        }
      }

      this.startAutoplay();
    },

    // 上一张
    prevSlide() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;

      const newIndex =
        (this.currentIndex - 1 + this.list.length) % this.list.length;
      this.currentIndex = newIndex;

      this.$emit("change", {
        index: this.currentIndex,
        item: this.list[this.currentIndex],
      });

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    // 下一张
    nextSlide() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;

      const newIndex = (this.currentIndex + 1) % this.list.length;
      this.currentIndex = newIndex;

      this.$emit("change", {
        index: this.currentIndex,
        item: this.list[this.currentIndex],
      });

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    // 跳转到指定滑块
    goToSlide(index) {
      if (index === this.currentIndex || this.isTransitioning) return;
      this.isTransitioning = true;

      // 停止当前播放的视频
      this.stopAllVideos();

      this.currentIndex = index;
      this.$emit("change", {
        index: this.currentIndex,
        item: this.list[this.currentIndex],
      });

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);

      this.stopAutoplay();
      this.startAutoplay();
    },

    // 处理滑块点击
    handleSlideClick(item, index) {
      if (index === this.currentIndex) {
        // 如果是当前激活的滑块，进行预览
        if (item.type === "video") {
          // 视频类型：全屏播放
          this.handleVideoClick(item, index);
        } else {
          // 图片类型：图片预览
          this.previewImage(item);
        }
        // 同时触发 itemClick 事件，让父组件也能处理
        this.$emit("itemClick", { item, index });
      } else {
        // 如果不是当前激活的滑块，切换到该滑块
        this.goToSlide(index);
      }
    },

    // 图片预览功能
    previewImage(item) {
      const imageUrl = item.image || item.src;
      if (imageUrl) {
        uni.previewImage({
          urls: [imageUrl],
          current: imageUrl,
          success: () => {
            console.log("图片预览成功");
          },
          fail: (err) => {
            console.error("图片预览失败:", err);
            uni.showToast({
              title: "图片预览失败",
              icon: "none",
            });
          },
        });
      }
    },

    // 开始自动轮播
    startAutoplay() {
      if (!this.autoplay || this.list.length <= 1) return;
      this.stopAutoplay();
      this.timer = setInterval(() => {
        this.nextSlide();
      }, this.interval);
    },

    // 停止自动轮播
    stopAutoplay() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    // 视频播放事件
    handleVideoPlay(e) {
      // 视频开始播放时暂停自动轮播
      this.stopAutoplay();
      this.playingVideoIndex = this.currentIndex;
      this.$emit("videoPlay", e);
    },

    // 视频暂停事件
    handleVideoPause(e) {
      // 视频暂停时恢复自动轮播
      this.startAutoplay();
      this.playingVideoIndex = -1;
      this.$emit("videoPause", e);
    },

    // 视频播放结束事件
    handleVideoEnded(e) {
      // 视频播放结束时恢复自动轮播
      this.startAutoplay();
      this.playingVideoIndex = -1;
      this.$emit("videoEnded", e);
    },

    // 视频错误事件
    handleVideoError(e) {
      console.error("视频播放错误:", e);
      console.error("错误详情:", {
        errMsg: e.detail?.errMsg || e.errMsg,
        errCode: e.detail?.errCode || e.errCode,
        target: e.target,
        currentTarget: e.currentTarget,
      });
      this.playingVideoIndex = -1;
      this.$emit("videoError", e);
      uni.showToast({
        title: "视频播放出错: " + (e.detail?.errMsg || e.errMsg || "未知错误"),
        icon: "none",
        duration: 3000,
      });
    },

    // 视频加载完成事件
    handleVideoLoaded(e) {
      console.log("视频加载完成:", e);
      this.$emit("videoLoaded", e);
    },

    // 视频全屏状态变化事件
    handleFullscreenChange(e) {
      console.log("视频全屏状态变化:", e);
      this.$emit("fullscreenChange", e);
    },

    // 获取视频封面图片
    getVideoCover(item) {
      // 优先使用 poster，然后是 image，最后是默认占位图
      if (item.poster && item.poster.trim()) {
        return item.poster;
      }
      if (item.image && item.image.trim()) {
        return item.image;
      }
      // 如果没有封面图，返回空字符串让视频显示第一帧
      return "";
    },

    // 获取默认视频封面（兼容安卓设备）
    getDefaultVideoCover() {
      // 使用简单的base64编码的灰色PNG图片，确保在安卓设备上能正常显示
      // 这是一个1x1像素的灰色PNG图片，非常小且兼容性好
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
    },

    // 处理封面图片加载错误
    handleCoverError(e) {
      console.warn("视频封面加载失败:", e);
      // 当封面加载失败时，可以设置一个备用图片
      const target = e.target || e.currentTarget;
      if (target) {
        target.src = this.getFallbackCover();
      }
    },

    // 获取备用封面
    getFallbackCover() {
      // 使用简单的灰色占位图，确保在所有设备上都能正常显示
      return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";
    },

    // 获取视频第一帧（备用方案，如果没有poster）
    getVideoFirstFrame(videoUrl) {
      // 这里可以实现视频第一帧提取逻辑
      // 由于uni-app限制，这里返回默认占位图
      return this.getDefaultVideoCover();
    },

    // 视频点击事件 - 全屏预览
    handleVideoClick(item, index) {
      console.log("视频点击事件触发:", { item, index });

      // 触发视频点击事件
      this.$emit("videoClick", { item, index });

      // 使用 uni-app 的视频全屏 API
      if (item.video || item.src) {
        try {
          const videoId = "video-" + index;
          console.log("尝试创建视频上下文:", videoId);

          const videoContext = uni.createVideoContext(videoId, this);
          if (videoContext) {
            console.log("视频上下文创建成功");

            // 直接请求全屏播放
            videoContext.requestFullScreen({
              direction: 0, // 0: 正常竖向, 90: 屏幕逆时针90度, -90: 屏幕顺时针90度
              success: () => {
                console.log("视频全屏成功");
                // 全屏成功后再播放
                setTimeout(() => {
                  videoContext.play();
                }, 200);
              },
              fail: (err) => {
                console.error("视频全屏失败:", err);
                // 如果全屏失败，尝试直接播放
                videoContext.play();
                uni.showToast({
                  title: "视频全屏失败，尝试直接播放",
                  icon: "none",
                });
              },
            });
          } else {
            console.error("无法创建视频上下文，videoId:", videoId);
            // 尝试使用原生视频播放
            this.fallbackVideoPlay(item);
          }
        } catch (error) {
          console.error("视频播放异常:", error);
          // 尝试使用原生视频播放
          this.fallbackVideoPlay(item);
        }
      }
    },

    // 备用视频播放方法
    fallbackVideoPlay(item) {
      const videoUrl = item.video || item.src;
      if (videoUrl) {
        // 使用 uni.previewMedia 作为备用方案
        uni.previewMedia({
          sources: [
            {
              url: videoUrl,
              type: "video",
              poster: item.poster || item.image,
            },
          ],
          success: () => {
            console.log("备用视频播放成功");
          },
          fail: (err) => {
            console.error("备用视频播放失败:", err);
            uni.showToast({
              title: "视频播放失败",
              icon: "none",
            });
          },
        });
      }
    },

    // 停止所有视频播放
    stopAllVideos() {
      if (this.playingVideoIndex >= 0) {
        try {
          const videoId = "video-" + this.playingVideoIndex;
          const videoContext = uni.createVideoContext(videoId, this);
          if (videoContext) {
            videoContext.pause();
            console.log("停止视频播放:", videoId);
          }
        } catch (error) {
          console.error("停止视频播放失败:", error);
        }
        this.playingVideoIndex = -1;
      }
    },
  },
};
</script>

<style scoped>
.blur-swiper-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-slide {
  position: absolute;
  width: 480rpx;
  height: 720rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

.slide-content {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.3);
}

.slide-image {
  width: 100%;
  height: 100%;
}

.slide-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20rpx;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  color: white;
}

.slide-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.slide-description {
  font-size: 22rpx;
  opacity: 0.9;
}

.swiper-indicators {
  position: absolute;
  bottom: 20rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12rpx;
  z-index: 100;
}

.indicator-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
}

.indicator-dot.active {
  background-color: rgba(255, 255, 255, 0.9);
  transform: scale(1.2);
}

.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
  border-radius: 20rpx;
  overflow: hidden;
}

.video-cover-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: block;
}

.video-play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.play-button {
  width: 120rpx;
  height: 120rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.3);
}

.play-icon {
  width: 30rpx;
  height: 30rpx;
  border-left: 30rpx solid #333;
  border-top: 20rpx solid transparent;
  border-bottom: 20rpx solid transparent;
  margin-left: 8rpx;
}
</style>
