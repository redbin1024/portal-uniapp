"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "BlurSwiper",
  props: {
    // 轮播图列表
    list: {
      type: Array,
      default: () => []
    },
    // 容器高度
    height: {
      type: String,
      default: "400rpx"
    },
    // 自动轮播间隔时间（毫秒）
    interval: {
      type: Number,
      default: 3e3
    },
    // 是否自动轮播
    autoplay: {
      type: Boolean,
      default: true
    },
    // 是否显示指示器
    showIndicator: {
      type: Boolean,
      default: true
    },
    // 轮播项之间的间隙（rpx）
    gap: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      currentIndex: 0,
      touchStartX: 0,
      touchStartY: 0,
      timer: null,
      isTransitioning: false
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
      const relativeIndex = (index - this.currentIndex + totalSlides) % totalSlides;
      let translateX = 0;
      let scale = 0.8;
      let opacity = 0.4;
      let zIndex = 1;
      const gap = this.gap;
      if (relativeIndex === 0) {
        translateX = 0;
        scale = 1;
        opacity = 1;
        zIndex = 10;
      } else if (relativeIndex === 1 || relativeIndex === totalSlides - 1) {
        translateX = relativeIndex === 1 ? 230 + gap : -230 - gap;
        scale = 0.85;
        opacity = 0.6;
        zIndex = 5;
      } else if (relativeIndex === 2 || relativeIndex === totalSlides - 2) {
        translateX = relativeIndex === 2 ? 380 + gap * 2 : -380 - gap * 2;
        scale = 0.7;
        opacity = 0.3;
        zIndex = 2;
      } else {
        translateX = relativeIndex > totalSlides / 2 ? -480 - gap * 3 : 480 + gap * 3;
        scale = 0.6;
        opacity = 0.1;
        zIndex = 1;
      }
      return {
        transform: `translateX(${translateX}rpx) scale(${scale})`,
        opacity,
        zIndex,
        transition: this.isTransitioning ? "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none"
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
          this.prevSlide();
        } else {
          this.nextSlide();
        }
      }
      this.startAutoplay();
    },
    // 上一张
    prevSlide() {
      if (this.isTransitioning)
        return;
      this.isTransitioning = true;
      const newIndex = (this.currentIndex - 1 + this.list.length) % this.list.length;
      this.currentIndex = newIndex;
      this.$emit("change", {
        index: this.currentIndex,
        item: this.list[this.currentIndex]
      });
      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },
    // 下一张
    nextSlide() {
      if (this.isTransitioning)
        return;
      this.isTransitioning = true;
      const newIndex = (this.currentIndex + 1) % this.list.length;
      this.currentIndex = newIndex;
      this.$emit("change", {
        index: this.currentIndex,
        item: this.list[this.currentIndex]
      });
      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },
    // 跳转到指定滑块
    goToSlide(index) {
      if (index === this.currentIndex || this.isTransitioning)
        return;
      this.isTransitioning = true;
      this.currentIndex = index;
      this.$emit("change", {
        index: this.currentIndex,
        item: this.list[this.currentIndex]
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
      if (!this.autoplay || this.list.length <= 1)
        return;
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
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($props.list, (item, index, i0) => {
      return {
        a: item.image,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.description),
        d: index,
        e: index === $data.currentIndex ? 1 : "",
        f: common_vendor.s($options.getSlideStyle(index)),
        g: common_vendor.o(($event) => $options.handleSlideClick(item, index), index)
      };
    }),
    b: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    c: common_vendor.o((...args) => $options.touchMove && $options.touchMove(...args)),
    d: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args)),
    e: $props.showIndicator
  }, $props.showIndicator ? {
    f: common_vendor.f($props.list, (_, index, i0) => {
      return {
        a: index,
        b: $data.currentIndex === index ? 1 : "",
        c: common_vendor.o(($event) => $options.goToSlide(index), index)
      };
    })
  } : {}, {
    g: $props.height
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-04802057"]]);
wx.createComponent(Component);
