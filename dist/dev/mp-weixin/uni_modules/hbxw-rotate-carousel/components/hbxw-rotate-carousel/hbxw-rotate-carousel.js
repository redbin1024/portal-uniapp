"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "hbxw-rotate-carousel",
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
    // 指示器样式，支持dot（圆点）和line（线条）
    indicatorStyle: {
      type: String,
      default: "dot",
      validator: function(value) {
        return ["dot", "line"].includes(value);
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
      previousIndex: 0,
      touchStartX: 0,
      touchStartY: 0,
      timer: null
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
      const relativeIndex = ((index - this.currentIndex + count) % count + count) % count;
      const maxAngle = 60;
      let angle;
      if (relativeIndex <= count / 2) {
        angle = relativeIndex * maxAngle;
      } else {
        angle = (relativeIndex - count) * maxAngle;
      }
      const radius = 310;
      const angleAbs = Math.abs(angle);
      const scaleIndex = Math.cos(angleAbs * Math.PI / 180);
      const opacity = angleAbs <= 90 ? scaleIndex * 0.4 + 0.6 : 0;
      return {
        transform: `rotateY(${angle}deg) translateZ(${radius}rpx) scale(${scaleIndex * 0.1 + 0.9})`,
        zIndex: Math.floor((1 - angleAbs / 180) * 100),
        opacity
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
      const newIndex = (this.currentIndex - 1 + this.list.length) % this.list.length;
      if (newIndex !== this.currentIndex) {
        this.previousIndex = this.currentIndex;
        this.currentIndex = newIndex;
        this.$emit("change", {
          index: this.currentIndex,
          item: this.list[this.currentIndex],
          previousIndex: this.previousIndex
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
          previousIndex: this.previousIndex
        });
      }
    },
    // 开始自动轮播
    startAutoplay() {
      if (!this.autoplay)
        return;
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
      if (index >= 0 && index < this.list.length && index !== this.currentIndex) {
        this.previousIndex = this.currentIndex;
        this.currentIndex = index;
        this.$emit("change", {
          index: this.currentIndex,
          item: this.list[this.currentIndex],
          previousIndex: this.previousIndex
        });
        this.stopAutoplay();
        this.startAutoplay();
      }
    },
    // 新增：处理轮播项点击事件
    handleItemClick(item, index) {
      if (index === this.currentIndex) {
        this.$emit("itemClick", { item, index });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($props.list, (item, index, i0) => {
      return {
        a: item.image,
        b: "d-" + i0,
        c: common_vendor.r("d", {
          item,
          index
        }, i0),
        d: common_vendor.o(($event) => $options.handleItemClick(item, index), index),
        e: index,
        f: common_vendor.s($options.getItemStyle(index))
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
        b: common_vendor.n({
          active: $data.currentIndex === index
        }),
        c: common_vendor.o(($event) => $options.goToIndex(index), index)
      };
    }),
    g: common_vendor.n($props.indicatorStyle === "dot" ? "indicator-dot" : "indicator-line"),
    h: common_vendor.r("indicator", {
      currentIndex: $data.currentIndex,
      total: $props.list.length,
      goTo: $options.goToIndex
    })
  } : {}, {
    i: $props.height
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-394d6a52"]]);
wx.createComponent(Component);
