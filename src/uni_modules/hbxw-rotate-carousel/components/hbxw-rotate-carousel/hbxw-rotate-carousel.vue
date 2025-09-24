<template>
  <view class="rotate-carousel" :style="{ height: height }">
    <view
      class="carousel-container"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <view
        v-for="(item, index) in list"
        :key="index"
        class="carousel-item"
        :style="getItemStyle(index)"
      >
        <view
          class="carousel-item-content"
          @click="handleItemClick(item, index)"
        >
          <slot :item="item" :index="index">
            <image :src="item.image" mode="aspectFill" />
          </slot>
        </view>
      </view>
    </view>
    <view v-if="showIndicator" class="carousel-indicators">
      <slot
        name="indicator"
        :currentIndex="currentIndex"
        :total="list.length"
        :goTo="goToIndex"
      >
        <view
          v-for="(_, index) in list"
          :key="index"
          :class="[
            indicatorStyle === 'dot' ? 'indicator-dot' : 'indicator-line',
            { active: currentIndex === index },
          ]"
          @click="goToIndex(index)"
        />
      </slot>
    </view>
  </view>
</template>

<script>
export default {
  name: "hbxw-rotate-carousel",
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
    };
  },
  mounted() {
    this.startAutoplay();
  },
  beforeDestroy() {
    this.stopAutoplay();
  },
  methods: {
    // 获取每个轮播项的样式
    getItemStyle(index) {
      const count = this.list.length;
      const relativeIndex =
        (((index - this.currentIndex + count) % count) + count) % count;
      const maxAngle = 60;
      let angle;

      if (relativeIndex <= count / 2) {
        angle = relativeIndex * maxAngle;
      } else {
        angle = (relativeIndex - count) * maxAngle;
      }

      const radius = 310;
      const angleAbs = Math.abs(angle);
      const scaleIndex = Math.cos((angleAbs * Math.PI) / 180);
      const opacity = angleAbs <= 90 ? scaleIndex * 0.4 + 0.6 : 0;

      return {
        transform: `rotateY(${angle}deg) translateZ(${radius}rpx) scale(${
          scaleIndex * 0.1 + 0.9
        })`,
        zIndex: Math.floor((1 - angleAbs / 180) * 100),
        opacity,
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
    // 新增：跳转到指定索引的方法，用于插槽
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
        // 重置自动播放定时器（可选，看是否需要在点击后重置）
        this.stopAutoplay();
        this.startAutoplay();
      }
    },
    // 新增：处理轮播项点击事件
    handleItemClick(item, index) {
      // 只有当前展示的项（中间项）允许触发点击事件，防止点击到侧边的项
      if (index === this.currentIndex) {
        this.$emit("itemClick", { item, index });
      }
    },
  },
};
</script>

<style scoped>
.rotate-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  perspective: 5000rpx;
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s ease-out;
  overflow: hidden;
  backface-visibility: hidden;
  will-change: transform;
}

.carousel-item {
  position: absolute;
  width: 520rpx;
  height: 100%;
  left: 50%;
  top: 0;
  margin-left: -260rpx;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  backface-visibility: visible;
  transform-style: preserve-3d;
  transform-origin: 50% 50% -155rpx;
  opacity: 1;
  will-change: transform, opacity, z-index;
  pointer-events: none;
  perspective: 1000rpx;
  transform-box: preserve-3d;
}

.carousel-item-content {
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
  box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
  transform-style: preserve-3d;
  backface-visibility: visible;
  pointer-events: auto;
  transform: translateZ(1px);
}

/* 确保插槽的直接子元素(常见类型)能正确显示并填充 */
.carousel-item-content ::v-deep > view,
.carousel-item-content ::v-deep > image {
  display: block;
  width: 100%;
  height: 100%;
}

/* 保留对 image 的特定样式 */
.carousel-item-content ::v-deep image {
  object-fit: cover; /* 确保图片覆盖 */
}

.carousel-indicators {
  position: absolute;
  bottom: 6rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 16rpx;
  z-index: 9999;
  pointer-events: auto;
  backface-visibility: visible;
  transform-style: preserve-3d;
  flex-wrap: nowrap; /* 显式禁止换行 */
}

.indicator-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  transition: all 0.5s ease;
  cursor: pointer;
  box-shadow: 0 0 4rpx rgba(0, 0, 0, 0.2);
}

.indicator-dot.active {
  background-color: #ffffff;
  transform: scale(1.2);
}

.indicator-line {
  width: 24rpx;
  height: 8rpx;
  border-radius: 4rpx;
  background-color: rgba(255, 255, 255, 0.7);
  transition: all 0.5s ease;
  cursor: pointer;
  box-shadow: 0 0 4rpx rgba(0, 0, 0, 0.2);
}

.indicator-line.active {
  width: 32rpx;
  background-color: #ffffff;
}
</style>
