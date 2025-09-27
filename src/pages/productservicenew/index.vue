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
        <VearCarousel
          :img-list="imgList"
          url-key="url"
          :show-title="true"
          @selected="selectedBanner"
          @video-play="onVideoPlay"
          @video-pause="onVideoPause"
          @video-ended="onVideoEnded"
          @video-error="onVideoError"
          @fullscreen-change="onFullscreenChange"
          @pause-all-videos="onPauseAllVideos"
        />
        <view class="content-container">
          <view class="content-img">
            <rich-text
              class="activity"
              :nodes="richText"
              type="text"
            ></rich-text>
          </view>
        </view>
      </view>
      <view v-if="activeTab == 1">
        <view class="winthecustomer-content">
          <view
            class="winthecustomer-content1"
            v-for="(item, index) in serviceLists"
            :key="index"
            @click="next(item)"
          >
            <image :src="item.serviceImage[0]"></image>
            <view class="winthecustomer-content2">{{ item.serviceName }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BlurSwiper from "@/components/blur-swiper/blur-swiper.vue";
import VideoRotateCarousel from "@/components/video-rotate-carousel/video-rotate-carousel.vue";
import { getServiceList, getcaseList } from "@/api/activity.js";
import VearCarousel from "@/components/vear-carousel/vear-carousel.vue";

// 响应式数据
const activeTab = ref(0); // 默认选中第一个
//查询服务信息列表
const serviceList = ref([]);
const serviceLists = ref([]);
const caseList = ref([]);
const richText = ref("");
const imgList = ref([]);
//查询商家案例列表
const fetchcaseList = async () => {
  try {
    const response = await getcaseList({
      pageSize: 10,
      pageNum: 1,
    });
    console.log("案例列表数据:", response);
    if (response && response.rows) {
      let data = response.rows;
      let slideshowData = [];
      data.forEach((res, index) => {
        // 检查是否有视频，如果有则添加视频类型的数据
        if (res.caseImages && res.caseImages.length > 0) {
          slideshowData.push({
            type: "video",
            url: res.caseImages[0],
            src: res.caseImages[0],
            poster:
              res.caseImages && res.caseImages[0] ? res.caseImages[0] : "",
            title: res.caseName || "",
            description: res.caseDescription || "",
            id: res.id || index,
            autoplay: false,
            loop: false,
            muted: true, // 默认静音自动播放
            controls: true,
            showFullscreenBtn: true,
            caseTitle: res.caseTitle,
          });
        } else if (res.caseImages && res.caseImages.length > 0) {
          // 如果没有视频，则使用图片
          slideshowData.push({
            type: "image",
            url: res.caseImages[0],
            src: res.caseImages[0],
            title: res.caseName || "",
            description: res.caseDescription || "",
            id: res.id || index,
            caseTitle: res.caseTitle,
          });
        }
      });
      console.log("案例轮播数据:", slideshowData);
      caseList.value = slideshowData;
      // 将案例数据传递给 carousel 组件
      imgList.value = slideshowData;
    }
  } catch (error) {
    console.error("获取案例列表失败:", error);
    uni.showToast({
      title: "获取案例列表失败",
      icon: "none",
    });
  }
};
//查询服务信息列表
const fetchServiceList = async () => {
  try {
    const response = await getServiceList({
      pageSize: 10,
      pageNum: 1,
    });
    console.log("服务列表数据:", response);
    if (response && response.rows && response.rows.length > 0) {
      let data = response.rows[0];
      let slideshowData = [];

      // 确保 serviceImage 存在且是数组
      if (data.serviceImage && Array.isArray(data.serviceImage)) {
        data.serviceImage.forEach((res) => {
          slideshowData.push({
            image: res,
            title: "",
            description: "",
          });
        });
      }

      console.log("服务轮播数据:", slideshowData);
      serviceList.value = slideshowData;
      serviceLists.value = response.rows.slice(1);

      if (data.serviceDescription) {
        processContent(data.serviceDescription);
      }
    } else {
      console.log("服务列表数据为空");
    }
  } catch (error) {
    console.error("获取服务列表失败:", error);
    uni.showToast({
      title: "获取服务列表失败",
      icon: "none",
    });
  }
};
// 方法
const switchTab = (index) => {
  activeTab.value = index;
  console.log("切换到tab:", index);
  console.log("当前serviceList:", serviceList.value);
};

const next = (item) => {
  try {
    const itemStr = JSON.stringify(item);
    uni.navigateTo({
      url: "/pages/customer/index?item=" + encodeURIComponent(itemStr),
    });
  } catch (error) {
    console.error("序列化参数失败:", error);
    uni.showToast({
      title: "参数传递失败",
      icon: "none",
    });
  }
};

// 轮播图事件处理
const onCarouselChange = (e) => {
  console.log("轮播图切换:", e);
};

const onCarouselClick = (e) => {
  console.log("轮播图点击:", e);
};

// 视频相关事件处理
const onVideoClick = (e) => {
  console.log("视频点击全屏:", e);
  // 可扩展：点击视频时的自定义逻辑
};

const onVideoPlay = (e) => {
  console.log("视频开始播放:", e);
};

const onVideoPause = (e) => {
  console.log("视频暂停:", e);
};

const onVideoEnded = (e) => {
  console.log("视频播放结束:", e);
};

const onVideoError = (e) => {
  console.error("视频播放错误:", e);
  uni.showToast({
    title: "视频播放失败",
    icon: "none",
  });
};

const onFullscreenChange = (e) => {
  console.log("视频全屏状态变化:", e);
};

const onPauseAllVideos = () => {
  console.log("暂停所有视频");
  // 这里可以添加暂停所有视频的逻辑
};

const selectedBanner = (item, index) => {
  console.log("选中轮播项:", item, "索引:", index);
  // 这里可以添加点击轮播项的处理逻辑
  if (item.type === "video") {
    console.log("点击了视频项");
  } else {
    console.log("点击了图片项");
  }
};

// 页面加载完成后触发按钮动画
onMounted(() => {
  fetchServiceList();
  fetchcaseList(); // 暂时注释掉，因为当前页面主要显示服务信息
});
const processContent = (content) => {
  // 处理图片样式
  richText.value = content
    .replace(/<img[^>]*>/gi, function (match, capture) {
      return match.replace(/style=".*"/gi, "").replace(/style='.*'/gi, "");
    })
    .replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;"');
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-item.active {
  transform: scale(1.1);
  background: transparent;
}

.tab-icon {
  width: 330rpx;
  height: 115rpx;
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  image-rendering: pixelated;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
.slideshow {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 0;
  border-radius: 0 0 40rpx 40rpx;
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

.loading-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800rpx;
  background: #f8f8f8;
  border-radius: 20rpx;
  margin: 20rpx;
}

.loading-placeholder text {
  color: #999;
  font-size: 28rpx;
}
</style>
