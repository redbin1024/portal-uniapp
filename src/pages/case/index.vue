<template>
  <view class="container">
    <view
      class="list-item"
      :class="{ 'animate-up': animatedItems[index] }"
      v-for="(item, index) in successCaseList"
      :key="index"
      :style="{ backgroundColor: getBackgroundColor(index) }"
      @click="navigateToDetail(item)"
    >
      <view class="image-container">
        <image
          class="item-image"
          :src="item.caseImages[0]"
          mode="aspectFill"
        ></image>
      </view>
      <view class="content-container">
        <view class="title">{{ item.customerName }}</view>
        <view class="description">{{ item.caseValue }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, getCurrentInstance } from "vue";
import { getsuccessCaseList } from "@/api/activity.js";

// 获取当前实例
const instance = getCurrentInstance();

// 响应式数据
const successCaseList = ref([]);
const animatedItems = ref([]);

const listData = reactive([
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
    title: "东方幸福国际母婴会所",
    description:
      "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png",
    title: "东方幸福国际母婴会所",
    description:
      "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
    title: "东方幸福国际母婴会所",
    description:
      "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
    title: "东方幸福国际母婴会所",
    description:
      "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
    title: "东方幸福国际母婴会所",
    description:
      "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
    title: "东方幸福国际母婴会所",
    description:
      "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
    title: "东方幸福国际母婴会所",
    description:
      "月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。",
  },
]);

// 方法
const fetchsuccessCaseList = async (response) => {
  try {
    const result = await getsuccessCaseList({
      pageSize: 20,
      pageNum: 1,
    });
    console.log("企业列表数据:", result);
    if (result && result.rows && result.rows.length > 0) {
      successCaseList.value = result.rows;
    }
  } catch (error) {
    console.error("获取成功案例列表失败:", error);
  }
};

const navigateToDetail = () => {
  uni.navigateTo({
    url: "/pages/casedetails/index",
  });
};

const getBackgroundColor = (index) => {
  const colors = ["#FFEFEB", "#DFF1FF", "#EDF1FF", "#DAF9FF"];
  return colors[index % 4];
};

// 初始化动画 - 页面进入时的弹出效果
const initAnimation = () => {
  nextTick(() => {
    // 延迟执行，让页面先渲染
    setTimeout(() => {
      successCaseList.value.forEach((_, index) => {
        setTimeout(() => {
          animatedItems.value[index] = true;
        }, index * 150); // 每个item延迟150ms，形成依次弹出的效果
      });
    }, 200);
  });
};

// 处理滚动事件
const handleScroll = (e) => {
  const scrollTop = e.scrollTop;

  // 获取所有list-item的位置信息
  uni
    .createSelectorQuery()
    .in(instance)
    .selectAll(".list-item")
    .boundingClientRect((rects) => {
      if (rects) {
        rects.forEach((rect, index) => {
          // 当item进入视窗时触发动画
          if (
            rect.top < uni.getSystemInfoSync().windowHeight * 0.8 &&
            rect.bottom > 0
          ) {
            if (!animatedItems.value[index]) {
              animatedItems.value[index] = true;
            }
          }
        });
      }
    })
    .exec();
};

// 生命周期
onMounted(() => {
  initAnimation();
  fetchsuccessCaseList();
});

// 导出页面滚动事件处理函数，供uni-app页面使用
defineExpose({
  onPageScroll: handleScroll,
});
</script>

<script>
// 页面配置和生命周期钩子（uni-app特有）
export default {
  onPageScroll(e) {
    // 调用setup中定义的handleScroll方法
    if (this.$refs && this.$refs.handleScroll) {
      this.$refs.handleScroll(e);
    }
  },
};
</script>

<style scoped>
.container {
  padding: 60rpx 26rpx 20rpx 26rpx;
  background-color: #f5f5f5;
}

.list-item {
  display: flex;
  align-items: flex-start;
  border-radius: 16rpx;
  height: 270rpx;
  padding: 0 24rpx;
  padding-top: 40rpx;
  margin-bottom: 62rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  position: relative;
  /* 初始状态 - 隐藏和向下偏移 */
  opacity: 0;
  transform: translateY(80rpx) scale(0.85);
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation-fill-mode: both;
}

/* 动画激活状态 - 增强弹出效果 */
.list-item.animate-up {
  opacity: 1;
  transform: translateY(0) scale(1);
  animation: bounceInUp 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 弹跳向上动画关键帧 */
@keyframes bounceInUp {
  0% {
    opacity: 0;
    transform: translateY(80rpx) scale(0.85);
  }
  20% {
    opacity: 0.6;
    transform: translateY(-20rpx) scale(1.08);
  }
  40% {
    opacity: 0.8;
    transform: translateY(12rpx) scale(0.95);
  }
  60% {
    opacity: 0.95;
    transform: translateY(-8rpx) scale(1.03);
  }
  80% {
    opacity: 1;
    transform: translateY(4rpx) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.image-container {
  flex-shrink: 0;
  margin-right: 24rpx;
  position: relative;
  top: -36rpx; /* 图片高出列表50rpx */
  /* 为图片容器添加增强的弹出动画效果 */
  opacity: 0;
  transform: translateY(40rpx) scale(0.7) rotate(-5deg);
  transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s;
}

.list-item.animate-up .image-container {
  opacity: 1;
  transform: translateY(-36rpx) scale(1) rotate(0deg);
  animation: imagePopIn 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s;
}

/* 图片弹入动画 */
@keyframes imagePopIn {
  0% {
    opacity: 0;
    transform: translateY(40rpx) scale(0.7) rotate(-5deg);
  }
  30% {
    opacity: 0.8;
    transform: translateY(-50rpx) scale(1.15) rotate(2deg);
  }
  60% {
    opacity: 1;
    transform: translateY(-30rpx) scale(0.95) rotate(-1deg);
  }
  80% {
    transform: translateY(-40rpx) scale(1.05) rotate(0.5deg);
  }
  100% {
    opacity: 1;
    transform: translateY(-36rpx) scale(1) rotate(0deg);
  }
}

.item-image {
  width: 214rpx;
  height: 282rpx;
  border-radius: 20rpx;
  background-color: #f0f0f0;
  border: 3rpx solid #ffffff;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* 为内容容器添加增强的弹出动画效果 */
  opacity: 0;
  transform: translateY(50rpx) translateX(30rpx) scale(0.9);
  transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s;
}

.list-item.animate-up .content-container {
  opacity: 1;
  transform: translateY(0) translateX(0) scale(1);
  animation: contentSlideIn 1.1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s;
}

/* 内容滑入动画 */
@keyframes contentSlideIn {
  0% {
    opacity: 0;
    transform: translateY(50rpx) translateX(30rpx) scale(0.9);
  }
  25% {
    opacity: 0.7;
    transform: translateY(-10rpx) translateX(-5rpx) scale(1.05);
  }
  50% {
    opacity: 0.9;
    transform: translateY(8rpx) translateX(3rpx) scale(0.98);
  }
  75% {
    opacity: 1;
    transform: translateY(-3rpx) translateX(-1rpx) scale(1.01);
  }
  100% {
    opacity: 1;
    transform: translateY(0) translateX(0) scale(1);
  }
}

.title {
  height: 80rpx;
  line-height: 80rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  margin-bottom: 12rpx;
  /* 为标题添加单独的动画效果 */
  transform: translateY(20rpx);
  opacity: 0;
  transition: all 0.6s ease-out 0.4s;
}

.list-item.animate-up .title {
  transform: translateY(0);
  opacity: 1;
}

.description {
  font-size: 22rpx;
  color: #7e7f80;
  line-height: 1.5;
  word-break: break-all;
  /* 为描述文字添加单独的动画效果 */
  transform: translateY(20rpx);
  opacity: 0;
  transition: all 0.6s ease-out 0.5s;
}

.list-item.animate-up .description {
  transform: translateY(0);
  opacity: 1;
}

/* 添加悬停效果增强交互性 */
.list-item.animate-up:hover {
  transform: translateY(-8rpx) scale(1.02);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
}

/* 添加点击效果 */
.list-item.animate-up:active {
  transform: translateY(-4rpx) scale(0.98);
  transition: all 0.1s ease-out;
}
</style>
