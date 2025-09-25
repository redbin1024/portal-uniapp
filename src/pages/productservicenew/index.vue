<template>
  <view class="main">
    <view class="head">
      <view class="headTab">
        <view
          class="tab-item"
          :class="{ active: activeTab === 0 }"
          @click="switchTab(0)"
        >
          <image
            :src="
              activeTab === 0
                ? 'http://cdn.xiaodingdang1.com/2025/09/25/7c516c90b157468c8edbbaf68cb83934.png'
                : 'http://cdn.xiaodingdang1.com/2025/09/25/edccf81f026f4b6f9e840aa44464722e.png'
            "
            class="tab-icon"
          />
        </view>
        <view
          class="tab-item"
          :class="{ active: activeTab === 1 }"
          @click="switchTab(1)"
        >
          <image
            :src="
              activeTab === 1
                ? 'http://cdn.xiaodingdang1.com/2025/09/25/250cd94c9cf64e5cb0c0dec53715acdc.png'
                : 'http://cdn.xiaodingdang1.com/2025/09/25/ee13d09dee5d4323b111d0f6f2af4705.png'
            "
            class="tab-icon"
          />
        </view>
      </view>
      <view class="first" v-if="activeTab == 0">
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
        <view class="content-container">
          <view class="content-img">
            <image
              src="http://cdn.xiaodingdang1.com/2025/09/25/4dc6d670aade4f83a8f77997a6f13a01.jpg"
              mode="widthFix"
            ></image>
          </view>
        </view>
      </view>
      <view v-if="activeTab == 1">
        <view class="winthecustomer-content">
          <view
            class="winthecustomer-content1"
            v-for="(item, index) in [1, 2, 3, 4, 5]"
            :key="index"
            @click="next()"
          >
            <image
              src="http://cdn.xiaodingdang1.com/2025/09/25/20c54857feda44eba2d1cd3eb1f9603c.png"
            ></image>
            <view class="winthecustomer-content2">谈单系统</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import BlurSwiper from "@/components/blur-swiper/blur-swiper.vue";
export default {
  name: "About",
  components: {
    "blur-swiper": BlurSwiper,
  },
  data() {
    return {
      activeTab: 0, // 默认选中第一个
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
    };
  },
  methods: {
    switchTab(index) {
      this.activeTab = index;
    },
    next() {
      uni.navigateTo({
        url: "/pages/customer/index",
      });
    },
  },
};
</script>

<style scoped>
.main {
  background-color: #f0f0f0;
  min-height: 100vh;
}
.head {
  background: #f0f0f0;
}
.headTab {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20rpx;
  gap: 40rpx;
  background: #fff;
}

.tab-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-item.active {
  transform: scale(1.1);
}

.tab-icon {
  width: 330rpx;
  height: 115rpx;
}
.slideshow {
  background: #fff;
}
.content-img {
  margin-top: 38rpx;
  width: 750rpx;
}
.content-img image {
  width: 100%;
}

.winthecustomer-content {
  display: flex;
  flex-wrap: wrap;
  padding: 0rpx 18rpx 52rpx 18rpx;
  background: #fff;
}
.winthecustomer-content1:nth-of-type(2n) {
  margin-left: 3%;
}
.winthecustomer-content1 {
  width: 48%;
  background: #f2f6ff;
  margin-top: 38rpx;
}
.winthecustomer-content1 image {
  width: 100%;
  height: 350rpx;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}
.winthecustomer-content2 {
  width: 100%;
  padding: 20rpx 0;
  background: #f2f6ff;
  color: #3d3d3d;
  font-size: 32rpx;
  text-align: center;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
}
</style>
