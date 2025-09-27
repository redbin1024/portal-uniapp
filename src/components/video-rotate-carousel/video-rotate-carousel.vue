<template>
  <view class="slide-carousel" :style="{ height: height }">
    <view
      class="carousel-container"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <view class="carousel-wrapper" :style="getWrapperStyle()">
        <view v-for="(item, index) in list" :key="index" class="carousel-item">
          <view
            class="carousel-item-content"
            @click="handleItemClick(item, index)"
          >
            <!-- 视频内容 -->
            <view v-if="item.type === 'video'" class="video-container">
              <video
                :id="`video-${index}`"
                :src="item.src"
                :poster="item.poster"
                :autoplay="item.autoplay && index === currentIndex"
                :loop="item.loop"
                :muted="item.muted"
                :controls="item.controls"
                :show-fullscreen-btn="item.showFullscreenBtn"
                class="video-player"
                @play="onVideoPlay(item, index)"
                @pause="onVideoPause(item, index)"
                @ended="onVideoEnded(item, index)"
                @error="onVideoError(item, index)"
                @fullscreenchange="onFullscreenChange(item, index)"
              />
              <view class="video-overlay" v-if="index !== currentIndex">
                <view class="play-icon">▶</view>
              </view>
              <view class="video-info" v-if="item.title || item.description">
                <view class="video-title" v-if="item.title">{{
                  item.title
                }}</view>
                <view class="video-description" v-if="item.description">{{
                  item.description
                }}</view>
              </view>
            </view>

            <!-- 图片内容 -->
            <view v-else class="image-container">
              <image
                :src="item.src || item.image"
                mode="aspectFill"
                class="carousel-image"
              />
              <view class="image-info" v-if="item.title || item.description">
                <view class="image-title" v-if="item.title">{{
                  item.title
                }}</view>
                <view class="image-description" v-if="item.description">{{
                  item.description
                }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 指示器 -->
    <view v-if="showIndicator" class="carousel-indicators">
      <view
        v-for="(item, index) in list"
        :key="index"
        :class="[
          indicatorStyle === 'dot' ? 'indicator-dot' : 'indicator-line',
          { active: currentIndex === index },
        ]"
        @click="goToIndex(index)"
      >
        <view v-if="item.type === 'video'" class="indicator-video-icon"
          >📹</view
        >
      </view>
    </view>

    <!-- 控制按钮 -->
    <view class="carousel-controls" v-if="showControls">
      <view class="control-btn prev-btn" @click="prev">‹</view>
      <view class="control-btn next-btn" @click="next">›</view>
    </view>
  </view>
</template>

<script>
export default {
  name: "slide-carousel",
  props: {
    // 轮播图列表
    list: {
      type: Array,
      default: () => [],
    },
    // 容器高度
    height: {
      type: String,
      default: "600rpx",
    },
    // 自动轮播间隔时间（毫秒）
    interval: {
      type: Number,
      default: 5000,
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
    // 是否显示控制按钮
    showControls: {
      type: Boolean,
      default: true,
    },
    // 指示器样式，支持dot（圆点）和line（线条）
    indicatorStyle: {
      type: String,
      default: "dot",
      validator: function (value) {
        return ["dot", "line"].includes(value);
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
      previousIndex: 0,
      touchStartX: 0,
      touchStartY: 0,
      timer: null,
      videoContexts: {},
    };
  },
  mounted() {
    this.initVideoContexts();
    this.startAutoplay();
  },
  beforeDestroy() {
    this.stopAutoplay();
    this.pauseAllVideos();
  },
  watch: {
    currentIndex(newIndex, oldIndex) {
      // 当切换轮播项时，暂停之前的视频，播放当前视频
      this.handleVideoSwitch(oldIndex, newIndex);
    },
  },
  methods: {
    // 初始化视频上下文
    initVideoContexts() {
      this.list.forEach((item, index) => {
        if (item.type === "video") {
          this.videoContexts[index] = uni.createVideoContext(
            `video-${index}`,
            this
          );
        }
      });
    },

    // 处理视频切换
    handleVideoSwitch(oldIndex, newIndex) {
      // 暂停之前的视频
      if (
        this.list[oldIndex] &&
        this.list[oldIndex].type === "video" &&
        this.videoContexts[oldIndex]
      ) {
        this.videoContexts[oldIndex].pause();
      }

      // 如果当前项是视频且设置了自动播放，则播放
      if (
        this.list[newIndex] &&
        this.list[newIndex].type === "video" &&
        this.list[newIndex].autoplay &&
        this.videoContexts[newIndex]
      ) {
        setTimeout(() => {
          this.videoContexts[newIndex].play();
        }, 500); // 延迟播放，等待滑动动画完成
      }
    },

    // 暂停所有视频
    pauseAllVideos() {
      Object.values(this.videoContexts).forEach((context) => {
        if (context) {
          context.pause();
        }
      });
    },

    // 获取轮播容器的平移样式
    getWrapperStyle() {
      return {
        transform: `translateX(-${this.currentIndex * 100}%)`,
        transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        width: `${this.list.length * 100}%`,
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

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault();
      }
    },

    // 触摸结束
    touchEnd(e) {
      const deltaX = e.changedTouches[0].clientX - this.touchStartX;
      const threshold = 50;

      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          this.prev();
        } else {
          this.next();
        }
      }

      this.startAutoplay();
    },

    // 切换到上一张
    prev() {
      const newIndex =
        (this.currentIndex - 1 + this.list.length) % this.list.length;
      if (newIndex !== this.currentIndex) {
        this.previousIndex = this.currentIndex;
        this.currentIndex = newIndex;
        this.$emit("change", {
          index: this.currentIndex,
          item: this.list[this.currentIndex],
          previousIndex: this.previousIndex,
        });
      }
    },

    // 切换到下一张
    next() {
      const newIndex = (this.currentIndex + 1) % this.list.length;
      if (newIndex !== this.currentIndex) {
        this.previousIndex = this.currentIndex;
        this.currentIndex = newIndex;
        this.$emit("change", {
          index: this.currentIndex,
          item: this.list[this.currentIndex],
          previousIndex: this.previousIndex,
        });
      }
    },

    // 跳转到指定索引
    goToIndex(index) {
      if (
        index >= 0 &&
        index < this.list.length &&
        index !== this.currentIndex
      ) {
        this.previousIndex = this.currentIndex;
        this.currentIndex = index;
        this.$emit("change", {
          index: this.currentIndex,
          item: this.list[this.currentIndex],
          previousIndex: this.previousIndex,
        });
        this.stopAutoplay();
        this.startAutoplay();
      }
    },

    // 处理轮播项点击事件
    handleItemClick(item, index) {
      if (index === this.currentIndex) {
        this.$emit("itemClick", { item, index });

        // 如果是视频，切换播放状态
        if (item.type === "video" && this.videoContexts[index]) {
          // 这里可以添加播放/暂停逻辑
          this.$emit("videoClick", { item, index });
        }
      } else {
        // 如果点击的不是当前项，则切换到该项
        this.goToIndex(index);
      }
    },

    // 开始自动轮播
    startAutoplay() {
      if (!this.autoplay) return;
      this.stopAutoplay();
      this.timer = setInterval(() => {
        this.next();
      }, this.interval);
    },

    // 停止自动轮播
    stopAutoplay() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    // 视频事件处理
    onVideoPlay(item, index) {
      this.$emit("videoPlay", { item, index });
    },

    onVideoPause(item, index) {
      this.$emit("videoPause", { item, index });
    },

    onVideoEnded(item, index) {
      this.$emit("videoEnded", { item, index });
      // 视频结束后可以自动切换到下一个
      if (this.autoplay) {
        setTimeout(() => {
          this.next();
        }, 1000);
      }
    },

    onVideoError(item, index) {
      this.$emit("videoError", { item, index });
    },

    onFullscreenChange(item, index) {
      this.$emit("fullscreenChange", { item, index });
    },
  },
};
</script>

<style scoped>
.slide-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  width: calc(100% * var(--item-count, 1));
  height: 100%;
}

.carousel-item {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  padding: 20rpx;
  box-sizing: border-box;
}

.carousel-item-content {
  width: 100%;
  height: 100%;
  border-radius: 24rpx;
  box-shadow: 0 20rpx 60rpx rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
  background: #fff;
}

/* 视频容器样式 */
.video-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.play-icon {
  width: 120rpx;
  height: 120rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
  color: #333;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
}

.video-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 40rpx 24rpx 24rpx;
  color: white;
  z-index: 3;
}

.video-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
  line-height: 1.4;
}

.video-description {
  font-size: 24rpx;
  opacity: 0.9;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 图片容器样式 */
.image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 40rpx 24rpx 24rpx;
  color: white;
}

.image-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
  line-height: 1.4;
}

.image-description {
  font-size: 24rpx;
  opacity: 0.9;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 指示器样式 */
.carousel-indicators {
  position: absolute;
  bottom: 24rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16rpx;
  z-index: 100;
}

.indicator-dot {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.indicator-dot.active {
  background-color: #ffffff;
  transform: scale(1.2);
}

.indicator-line {
  width: 32rpx;
  height: 8rpx;
  border-radius: 4rpx;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.indicator-line.active {
  width: 48rpx;
  background-color: #ffffff;
}

.indicator-video-icon {
  font-size: 12rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 控制按钮样式 */
.carousel-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 20rpx;
  z-index: 100;
  pointer-events: none;
}

.control-btn {
  width: 80rpx;
  height: 80rpx;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: auto;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
}

.control-btn:hover {
  background: #ffffff;
  transform: scale(1.1);
}

.prev-btn {
  margin-left: 0;
}

.next-btn {
  margin-right: 0;
}
</style>
