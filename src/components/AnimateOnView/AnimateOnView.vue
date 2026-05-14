<template>
  <view
    :id="observerId"
    class="aov"
    :class="[
      'aov-' + animation,
      { 'aov-in': inView },
      { 'aov-once': once },
    ]"
    :style="{
      animationDelay: delay + 'ms',
      animationDuration: duration + 'ms',
    }"
  >
    <slot />
  </view>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  nextTick,
} from "vue";

defineOptions({ name: "AnimateOnView" });

const props = defineProps({
  // 动画类型：fade-up | fade-in | zoom-in | slide-left | slide-right
  animation: {
    type: String,
    default: "fade-up",
  },
  // 是否仅触发一次（默认 true，离开视口不重置）
  once: {
    type: Boolean,
    default: true,
  },
  // 动画时长（ms）
  duration: {
    type: Number,
    default: 1100,
  },
  // 动画延迟（ms）
  delay: {
    type: Number,
    default: 0,
  },
  // 触发阈值（0~1），>0 表示元素需要露出指定比例才触发
  threshold: {
    type: Number,
    default: 0.15,
  },
  // 提前触发的下边距偏移（rpx），例如 80 表示距离视口底部 80rpx 就开始触发
  rootMarginBottom: {
    type: Number,
    default: 80,
  },
});

const inView = ref(false);
const instance = getCurrentInstance();
const observerId = `aov_${Math.random().toString(36).slice(2, 9)}`;
let observer = null;
let pollTimer = null;
let pollCount = 0;
const MAX_POLLS = 20; // 最长轮询 ~6s（300ms * 20），覆盖异步数据后到的情况

const disconnectObserver = () => {
  if (observer) {
    try {
      observer.disconnect();
    } catch (e) {}
    observer = null;
  }
};

const stopPolling = () => {
  if (pollTimer) {
    clearTimeout(pollTimer);
    pollTimer = null;
  }
};

// 主动查询元素位置：仅当真的在视口内（含 rootMarginBottom 提前量）才触发
const checkInViewport = () => {
  try {
    const query = uni.createSelectorQuery().in(instance.proxy);
    query
      .select(`#${observerId}`)
      .boundingClientRect()
      .selectViewport()
      .exec((res) => {
        const rect = res && res[0];
        const vp = res && res[1];
        if (!rect || !vp) {
          schedulePoll();
          return;
        }
        const viewportH = vp.windowHeight || 0;
        const margin = props.rootMarginBottom || 0;
        const hasSize = (rect.height || 0) > 0;
        const inside =
          hasSize && rect.top < viewportH + margin && rect.bottom > 0;
        if (inside) {
          inView.value = true;
          if (props.once) {
            disconnectObserver();
            stopPolling();
          }
        } else {
          // 还没进入视口：继续轮询，直到达到上限（覆盖数据延迟到达的场景）
          schedulePoll();
        }
      });
  } catch (e) {
    schedulePoll();
  }
};

const schedulePoll = () => {
  if (pollCount >= MAX_POLLS) return;
  pollCount += 1;
  pollTimer = setTimeout(checkInViewport, 300);
};

onMounted(() => {
  // 1. 注册 IntersectionObserver（滚动触发主路径）
  try {
    observer = uni.createIntersectionObserver(instance, {
      thresholds: [props.threshold],
    });
    observer
      .relativeToViewport({ bottom: props.rootMarginBottom })
      .observe(`#${observerId}`, (res) => {
        const isIntersecting =
          res && (res.intersectionRatio > 0 || res.intersectionRect?.height > 0);
        if (isIntersecting) {
          inView.value = true;
          if (props.once) {
            disconnectObserver();
            stopPolling();
          }
        } else if (!props.once) {
          inView.value = false;
        }
      });
  } catch (e) {
    inView.value = true;
    return;
  }

  // 2. 启动主动轮询，仅在元素真的进入视口时触发（兼容 observer 因数据异步到达而错过的情况）
  nextTick(() => {
    checkInViewport();
  });
});

onBeforeUnmount(() => {
  disconnectObserver();
  stopPolling();
});
</script>

<style scoped>
.aov {
  opacity: 0;
  will-change: opacity, transform;
  transform-origin: center center;
}

.aov-in {
  /* 带轻微回弹的缓动，让动画更有"弹性" */
  animation-timing-function: cubic-bezier(0.22, 1.2, 0.36, 1);
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

/* fade-up：底部上滑 + 轻微缩放 */
.aov-fade-up {
  transform: translate3d(0, 140rpx, 0) scale(0.94);
}
.aov-fade-up.aov-in {
  animation-name: aov-fade-up;
}
@keyframes aov-fade-up {
  0% {
    opacity: 0;
    transform: translate3d(0, 140rpx, 0) scale(0.94);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

/* fade-in：纯淡入 + 缩放 */
.aov-fade-in {
  transform: scale(1.04);
}
.aov-fade-in.aov-in {
  animation-name: aov-fade-in;
}
@keyframes aov-fade-in {
  0% {
    opacity: 0;
    transform: scale(1.04);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* zoom-in：从小放大，带回弹 */
.aov-zoom-in {
  transform: scale(0.6);
}
.aov-zoom-in.aov-in {
  animation-name: aov-zoom-in;
  animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes aov-zoom-in {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* slide-left（从右滑入），带轻微旋转 */
.aov-slide-left {
  transform: translate3d(220rpx, 0, 0) rotate(2deg);
}
.aov-slide-left.aov-in {
  animation-name: aov-slide-left;
}
@keyframes aov-slide-left {
  0% {
    opacity: 0;
    transform: translate3d(220rpx, 0, 0) rotate(2deg);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0);
  }
}

/* slide-right（从左滑入），带轻微旋转 */
.aov-slide-right {
  transform: translate3d(-220rpx, 0, 0) rotate(-2deg);
}
.aov-slide-right.aov-in {
  animation-name: aov-slide-right;
}
@keyframes aov-slide-right {
  0% {
    opacity: 0;
    transform: translate3d(-220rpx, 0, 0) rotate(-2deg);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0);
  }
}

/* flip-up：兼容性优先，改为"下方大缩放上滑"代替 3D 翻转 */
.aov-flip-up {
  transform: translate3d(0, 180rpx, 0) scale(0.82);
  transform-origin: center bottom;
}
.aov-flip-up.aov-in {
  animation-name: aov-flip-up;
}
@keyframes aov-flip-up {
  0% {
    opacity: 0;
    transform: translate3d(0, 180rpx, 0) scale(0.82);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

/* bounce-in：弹跳进入 */
.aov-bounce-in {
  transform: translate3d(0, 200rpx, 0) scale(0.85);
}
.aov-bounce-in.aov-in {
  animation-name: aov-bounce-in;
  animation-timing-function: cubic-bezier(0.18, 1.5, 0.6, 1);
}
@keyframes aov-bounce-in {
  0% {
    opacity: 0;
    transform: translate3d(0, 200rpx, 0) scale(0.85);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -16rpx, 0) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}
</style>
