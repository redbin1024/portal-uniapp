<template>
  <scroll-view
    class="main"
    scroll-y="true"
    enable-back-to-top="true"
    @scroll="onScroll"
  >
    <view class="slideshow">
      <blur-swiper
        :list="slideshowData"
        height="800rpx"
        :autoplay="true"
        :interval="4000"
        :showIndicator="true"
        :gap="50"
        @change="onSlideshowChange"
        @itemClick="onSlideshowClick"
      />
    </view>
    <view class="dynamic">
      <view class="dynamic-title">最近动态</view>
      <view class="dynamic-title1">关注正在发生的故事</view>
      <!-- 动态内容区域 -->
      <view class="dynamic-content">
        <view
          class="dynamic-item"
          v-for="(item, index) in dynamicData"
          :key="index"
        >
          <!-- 左边内容 -->
          <view
            class="dynamic-left"
            :class="{
              'animate-fade-in-left': visibleDynamicItems.includes(index),
            }"
          >
            <view class="dynamic-date">{{ item.date }}</view>
            <view class="dynamic-text1">{{ item.date }}</view>
            <view class="dynamic-text">{{ item.content }}</view>
          </view>

          <!-- 中间步骤条 -->
          <view class="dynamic-center">
            <view
              class="step-dot"
              :class="{ 'animate-dot': visibleDynamicItems.includes(index) }"
            ></view>
            <view
              class="step-line"
              v-if="index < dynamicData.length - 1"
              :id="'step-line-' + index"
            ></view>
          </view>

          <!-- 右边图片 -->
          <view
            class="dynamic-right"
            :class="{
              'animate-fade-in-right': visibleDynamicItems.includes(index),
            }"
          >
            <image
              class="dynamic-image"
              :src="item.image"
              mode="aspectFill"
            ></image>
          </view>
        </view>
      </view>
      <!-- 查看更多按钮 -->
      <view class="view-more-btn" @click="goToRecentUpdates">
        <text class="view-more-text">查看更多</text>
        <text class="arrow-right">→</text>
      </view>
    </view>

    <view class="container">
      <view class="container-title">成功案例</view>
      <view
        class="list-item"
        v-for="(item, index) in listData"
        :key="index"
        :class="{ 'animate-up': visibleItems.includes(index) }"
        :style="{ backgroundColor: getBackgroundColor(index) }"
        @click="navigateToDetail(item)"
      >
        <view class="image-container">
          <image class="item-image" :src="item.image" mode="aspectFit"></image>
        </view>
        <view class="content-container">
          <view class="title">{{ item.title }}</view>
          <view class="description">{{ item.description }}</view>
        </view>
      </view>
      <!-- 查看更多按钮 -->
      <view class="view-more-btn" @click="goToCooperationcase">
        <text class="view-more-text">查看更多</text>
        <text class="arrow-right">→</text>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import { onPageScroll } from "@dcloudio/uni-app";
import hbxwRotateCarousel from "@/uni_modules/hbxw-rotate-carousel/components/hbxw-rotate-carousel/hbxw-rotate-carousel.vue";
import BlurSwiper from "@/components/blur-swiper/blur-swiper.vue";

export default {
  name: "CaseDetails",
  components: {
    "hbxw-rotate-carousel": hbxwRotateCarousel,
    "blur-swiper": BlurSwiper,
  },
  data() {
    return {
      visibleItems: [], // 用于控制哪些列表项显示动画
      visibleDynamicItems: [], // 用于控制动态内容项的动画
      scrollTimer: null, // 滚动节流定时器
      slideshowData: [
        {
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
          title: "专业团队服务",
          description: "为您提供专业的技术解决方案",
        },
        {
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png",
          title: "创新技术应用",
          description: "运用最新技术为客户创造价值",
        },
        {
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "优质服务保障",
          description: "全程跟踪服务，确保项目成功",
        },
        {
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "优质服务保障",
          description: "全程跟踪服务，确保项目成功",
        },
        {
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "优质服务保障",
          description: "全程跟踪服务，确保项目成功",
        },
        {
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "优质服务保障",
          description: "全程跟踪服务，确保项目成功",
        },
        {
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
          title: "优质服务保障",
          description: "全程跟踪服务，确保项目成功",
        },
      ],
      dynamicData: [
        {
          date: "2024.09.20",
          content:
            "成功完成东方幸福国际母婴会所项目，为客户提供了完整的数字化解决方案，包括小程序开发、后台管理系统等。",
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
        },
        {
          date: "2024.09.15",
          content:
            "启动新的电商平台项目，为客户打造全新的线上购物体验，集成支付、物流、客服等多项功能。",
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png",
        },
        {
          date: "2024.09.10",
          content:
            "完成企业官网改版升级，采用响应式设计，提升用户体验和品牌形象展示效果。",
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png",
        },
        {
          date: "2024.09.05",
          content:
            "与多家知名企业达成合作协议，将为其提供定制化的软件开发服务和技术咨询。",
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png",
        },
        {
          date: "2024.08.30",
          content:
            "团队技术培训完成，全面提升开发能力，为客户提供更优质的技术服务。",
          image:
            "http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png",
        },
      ],
      listData: [
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
      ],
    };
  },
  mounted() {
    this.initScrollAnimation();
  },
  onLoad() {
    // 页面加载时初始化动画
    this.initScrollAnimation();
  },
  onShow() {
    // 页面显示时重新初始化动画
    this.initScrollAnimation();
  },
  methods: {
    // 跳转到最近动态页面
    goToRecentUpdates() {
      uni.navigateTo({
        url: "/pages/recentUpdates/index",
      });
    },
    goToCooperationcase() {
      uni.navigateTo({
        url: "/pages/case/index",
      });
    },
    // scroll-view 滚动事件处理
    onScroll(e) {
      this.handleScroll();
    },

    // 初始化滚动动画
    initScrollAnimation() {
      // 初始检查已在视口内的元素
      this.$nextTick(() => {
        setTimeout(() => {
          this.handleScroll();
        }, 100);
      });
    },

    // 处理滚动事件（添加节流优化）
    handleScroll() {
      // 节流处理，避免频繁执行
      if (this.scrollTimer) {
        clearTimeout(this.scrollTimer);
      }

      this.scrollTimer = setTimeout(() => {
        try {
          const systemInfo = uni.getSystemInfoSync();
          const windowHeight = systemInfo.windowHeight;

          // 获取页面滚动信息 - 成功案例列表
          uni
            .createSelectorQuery()
            .in(this)
            .selectAll(".list-item")
            .boundingClientRect((rects) => {
              if (rects && rects.length > 0) {
                rects.forEach((rect, index) => {
                  // 检查元素是否进入视口（提前150px触发动画，让动画更早开始）
                  if (rect.top < windowHeight - 50 && rect.top > -rect.height) {
                    // 每次进入视口都触发动画
                    if (!this.visibleItems.includes(index)) {
                      // 添加延迟，让动画更自然，每个元素延迟递增
                      setTimeout(() => {
                        if (!this.visibleItems.includes(index)) {
                          this.visibleItems.push(index);
                          console.log("触发列表项动画:", index);
                        }
                      }, index * 80); // 每个元素延迟80ms，让动画更快
                    }
                  }
                });
              }
            })
            .exec();

          // 获取页面滚动信息 - 动态内容项
          uni
            .createSelectorQuery()
            .in(this)
            .selectAll(".dynamic-item")
            .boundingClientRect((rects) => {
              if (rects && rects.length > 0) {
                rects.forEach((rect, index) => {
                  // 检查元素是否进入视口（提前100px触发动画）
                  if (rect.top < windowHeight - 50 && rect.top > -rect.height) {
                    if (!this.visibleDynamicItems.includes(index)) {
                      // 添加延迟，让左右动画错开
                      setTimeout(() => {
                        if (!this.visibleDynamicItems.includes(index)) {
                          this.visibleDynamicItems.push(index);
                          console.log("触发动态项动画:", index);
                        }
                      }, index * 120); // 每个元素延迟120ms
                    }
                  }
                });
              }
            })
            .exec();
        } catch (error) {
          console.error("滚动动画处理错误:", error);
        }
      }, 16); // 减少节流时间，提高响应性
    },

    navigateToDetail() {
      uni.navigateTo({
        url: "/pages/casedetails/index",
      });
    },
    getBackgroundColor(index) {
      const colors = ["#FFEFEB", "#DFF1FF", "#EDF1FF", "#DAF9FF"];
      return colors[index % 4];
    },
    // 轮播图点击事件
    onSlideshowClick(event) {
      console.log("轮播图点击:", event);
      // 可以在这里添加点击后的逻辑，比如跳转到详情页
    },
    // 轮播图切换事件
    onSlideshowChange(event) {
      console.log("轮播图切换:", event);
      // 可以在这里添加切换后的逻辑，比如更新当前索引
    },
  },

  // 页面销毁时清理监听器和定时器
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
  },
};
</script>

<style scoped>
view,
image,
text {
  box-sizing: border-box;
}

.main {
  background: #f7f7f7;
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  /* scroll-view 需要固定高度才能滚动 */
}

/**最近动态 */
.dynamic {
  background: #ffffff;
  padding: 60rpx 28rpx;
  margin: 80rpx 0;
}

.dynamic-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #000000;
  text-align: center;
}

.dynamic-title1 {
  font-size: 26rpx;
  color: #3d3d3d;
  margin-top: 12rpx;
  text-align: center;
  margin-bottom: 60rpx;
}

/* 动态内容样式 */
.dynamic-content {
  margin-top: 40rpx;
}

.dynamic-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 90rpx;
  position: relative;
  min-height: auto;
  width: 100%;
  /* 移除 overflow: hidden，避免影响滚动 */
  box-sizing: border-box;
}

.dynamic-left {
  padding-right: 20rpx;
  width: 50%;
  flex-shrink: 0;
  box-sizing: border-box;
  /* 初始状态：从左侧淡入 */
  transform: translateX(-80rpx);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 左侧内容淡入动画 */
.dynamic-left.animate-fade-in-left {
  transform: translateX(0);
  opacity: 1;
}

.dynamic-date {
  font-size: 24rpx;
  color: #2c80ff;
  margin-bottom: 8rpx;
  font-weight: bold;
  transform: translateY(20rpx);
  opacity: 0;
  transition: all 0.6s ease-out 0.3s;
}

.dynamic-text1 {
  color: #3d3d3d;
  font-size: 28rpx;
  font-weight: bold;
  transform: translateY(20rpx);
  opacity: 0;
  transition: all 0.6s ease-out 0.4s;
}

.dynamic-text {
  font-size: 24rpx;
  color: #535353;
  line-height: 1.5;
  transform: translateY(20rpx);
  opacity: 0;
  transition: all 0.6s ease-out 0.5s;
}

/* 左侧内容子元素动画 */
.dynamic-left.animate-fade-in-left .dynamic-date,
.dynamic-left.animate-fade-in-left .dynamic-text1,
.dynamic-left.animate-fade-in-left .dynamic-text {
  transform: translateY(0);
  opacity: 1;
}

.dynamic-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 0 20rpx; */
  position: relative;
  flex: 0 0 auto;
  width: 10%;
}

.step-dot {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  background-color: #007aff;
  border: 3rpx solid #ffffff;
  box-shadow: 0 0 0 2rpx #007aff;
  z-index: 2;
  position: relative;
  transform: scale(0.5);
  opacity: 0.5;
  transition: all 0.6s ease-out 0.4s; /* 延迟0.4s，让中间点动画在左右内容之后出现 */
}

/* 中间点动画 */
.step-dot.animate-dot {
  transform: scale(1);
  opacity: 1;
  box-shadow: 0 0 0 3rpx #007aff, 0 0 10rpx rgba(0, 122, 255, 0.5);
}

.step-dot.active {
  background-color: #007aff;
  box-shadow: 0 0 0 2rpx #007aff;
}

.step-line {
  width: 2rpx;
  background-color: #e0e0e0;
  position: absolute;
  top: 30rpx;
  left: 50%;
  height: 290rpx;
  z-index: 1;
}

.dynamic-right {
  width: 40%;
  flex-shrink: 0;
  box-sizing: border-box;
  overflow: hidden;
  /* 初始状态：从右侧淡入 */
  transform: translateX(80rpx);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s; /* 延迟0.2s，让左右动画错开 */
}

/* 右侧内容淡入动画 */
.dynamic-right.animate-fade-in-right {
  transform: translateX(0);
  opacity: 1;
}

.dynamic-image {
  width: 100%;
  max-width: 280rpx;
  height: 200rpx;
  border-radius: 12rpx;
  background-color: #f0f0f0;
  transform: scale(0.8) rotate(5deg);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s;
  box-sizing: border-box;
}

/* 右侧图片动画 */
.dynamic-right.animate-fade-in-right .dynamic-image {
  transform: scale(1) rotate(0deg);
  opacity: 1;
}

/**成功案例 */
.container {
  padding: 60rpx 26rpx 20rpx 26rpx;
  background-color: #fff;
}

.container-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #000000;
  margin-bottom: 80rpx;
  text-align: center;
}

.list-item {
  display: flex;
  align-items: flex-start;
  border-radius: 16rpx;
  height: 270rpx;
  padding: 0 24rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  position: relative;
  width: 100%;
  box-sizing: border-box;
  /* 保留 overflow: hidden 用于图片效果，但确保不影响页面滚动 */
  overflow: hidden;
  /* 初始状态：隐藏在下方，增加更大的偏移和旋转效果 */
  transform: translateY(120rpx) scale(0.9);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 动画激活状态 */
.list-item.animate-up {
  transform: translateY(0) scale(1);
  opacity: 1;
}

/* 为图片容器添加额外的动画效果 */
.list-item .image-container {
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.15s;
  transform: translateY(40rpx) scale(0.95);
}

.list-item.animate-up .image-container {
  transform: translateY(-36rpx) scale(1); /* 恢复原来的位置并添加缩放效果 */
}

/* 为内容容器添加渐入和滑入效果 */
.list-item .content-container {
  transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.25s;
  opacity: 0;
  transform: translateX(30rpx);
}

.list-item.animate-up .content-container {
  opacity: 1;
  transform: translateX(0);
}

/* 为标题添加单独的动画效果 */
.list-item .title {
  transition: all 0.6s ease-out 0.4s;
  transform: translateY(20rpx);
  opacity: 0;
}

.list-item.animate-up .title {
  transform: translateY(0);
  opacity: 1;
}

/* 为描述文字添加单独的动画效果 */
.list-item .description {
  transition: all 0.6s ease-out 0.5s;
  transform: translateY(20rpx);
  opacity: 0;
}

.list-item.animate-up .description {
  transform: translateY(0);
  opacity: 1;
}

/* 添加悬停效果增强交互性 */
.list-item.animate-up:hover {
  transform: translateY(-8rpx) scale(1.02);
  box-shadow: 0 12rpx 30rpx rgba(0, 0, 0, 0.15);
}

/* 添加点击效果 */
.list-item.animate-up:active {
  transform: translateY(-4rpx) scale(0.98);
  transition: all 0.1s ease-out;
}

.image-container {
  flex-shrink: 0;
  margin-right: 24rpx;
  position: relative;
  top: -40rpx; /* 图片高出列表40rpx */
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
}

.title {
  height: 80rpx;
  line-height: 80rpx;
  font-size: 40rpx;
  font-weight: 600;
  color: #000000;
  margin-bottom: 12rpx;
}

.description {
  font-size: 24rpx;
  color: #7e7f80;
  line-height: 1.5;
  word-break: break-all;
}
/**轮播图样式 */
.slideshow {
  width: 100%;
  height: 800rpx;
  position: relative;
  overflow: hidden;
}

.slideshow-item {
  width: 100%;
  height: 100%;
  position: relative;
}

.slideshow-image {
  width: 100%;
  height: 100%;
}

.slideshow-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20rpx;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
}

.slideshow-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.slideshow-desc {
  font-size: 24rpx;
}
/* 查看更多按钮样式 */
.view-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40rpx 26rpx 0;
  padding: 20rpx 0;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.view-more-btn:active {
  opacity: 0.7;
}

.view-more-text {
  font-size: 28rpx;
  color: #2c80ff;
  margin-right: 10rpx;
}

.arrow-right {
  font-size: 28rpx;
  color: #2c80ff;
  font-weight: bold;
}
</style>
