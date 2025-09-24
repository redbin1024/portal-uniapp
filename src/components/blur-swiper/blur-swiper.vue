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
          <image class="slide-image" :src="item.image" mode="aspectFill" />
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
    };
  },
  mounted() {
    this.startAutoplay();
  },
  beforeDestroy() {
    this.stopAutoplay();
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
        this.$emit("itemClick", { item, index });
      } else {
        this.goToSlide(index);
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
  cursor: pointer;
  will-change: transform, opacity;
}

.swiper-slide:not(.active) .slide-content::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  pointer-events: none;
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
  object-fit: cover;
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
  line-height: 1.2;
}

.slide-description {
  font-size: 22rpx;
  opacity: 0.9;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.swiper-slide.active .slide-content {
  box-shadow: 0 12rpx 48rpx rgba(0, 0, 0, 0.4);
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
  cursor: pointer;
}

.indicator-dot.active {
  background-color: rgba(255, 255, 255, 0.9);
  transform: scale(1.2);
}

.indicator-dot:hover {
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
