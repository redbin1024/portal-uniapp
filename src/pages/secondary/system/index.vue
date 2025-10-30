<template>
  <view class="main">
    <view class="video" @click="nextVideo(bannerImages, coverImage)">
      <!-- <video :src="bannerImages"></video> -->
      <image
        :src="enterpriseList.coverImage + '?image_process=format,webp'"
        mode="aspectFill"
        style="width: 100%; height: 100%; border-radius: 20rpx"
      ></image>
      <view class="custom-play-button">
        <image
          src="http://cdn.xiaodingdang1.com/2025/10/22/2f504fbb11944ad8834f6c479f233281.png"
          class="play-icon"
        />
      </view>
    </view>
    <view class="videoTitle">
      <view class="videoTitle1">{{ enterpriseList.enterpriseName }}</view>
      <view
        class="videoTitle2"
        v-html="enterpriseList.enterpriseDescription"
      ></view>
    </view>
    <view class="head">
      <view>
        <view class="winthecustomer-content">
          <view
            class="winthecustomer-content1"
            v-for="(item, index) in serviceLists"
            :key="index"
            @click="next(item)"
          >
            <image
              :src="item.serviceImage[0] + '?image_process=format,webp'"
            ></image>
            <view class="winthecustomer-content2">
              <view class="winthecustomer-content2-1">
                {{ item.serviceName }}
              </view>
              <view class="winthecustomer-content2-2">了解详情</view>
            </view>
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
import {
  getServiceList,
  getcaseList,
  getEnterpriseList,
} from "@/api/activity.js";
import VearCarousel from "@/components/vear-carousel/vear-carousel.vue";

// 响应式数据
const activeTab = ref(0); // 默认选中第一个
//查询服务信息列表
const serviceList = ref([]);
const serviceLists = ref([]);
const caseList = ref([]);
const richText = ref("");
const imgList = ref([]);
const bannerImages = ref("");
const coverImage = ref("");
// 企业列表数据
const enterpriseList = ref([]);
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
const nextVideo = (url, coverImage) => {
  uni.navigateTo({
    url:
      "/pages/secondary/index/index?url=" + url + "&coverImage=" + coverImage,
  });
};
const onFullscreenChange = (e, index, isEnteringFullscreen) => {
  console.log(
    "视频全屏状态变化:",
    e,
    "索引:",
    index,
    "进入全屏:",
    isEnteringFullscreen
  );

  if (isEnteringFullscreen) {
    console.log("视频进入全屏模式，已取消静音");
    uni.showToast({
      title: "全屏播放已开启声音",
      icon: "none",
      duration: 1500,
    });
  } else {
    console.log("视频退出全屏模式，已恢复静音");
  }
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
// 获取企业列表数据
const fetchEnterpriseList = async () => {
  try {
    const response = await getEnterpriseList({
      pageSize: 10,
      pageNum: 1,
    });
    console.log("企业列表数据:", response);
    if (
      response &&
      response.rows &&
      Array.isArray(response.rows) &&
      response.rows.length > 0
    ) {
      enterpriseList.value = response.rows[0];
      coverImage.value = response.rows[0].coverImage;
      let video;
      response.rows[0].bannerImages.forEach((str1) => {
        let result1 = str1.slice(-3);
        if (result1 == "mp4") {
          video = str1;
        }
      });
      bannerImages.value = video;
    }
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
  }
};
// 页面加载完成后触发按钮动画
onMounted(() => {
  fetchServiceList();
  fetchcaseList(); // 暂时注释掉，因为当前页面主要显示服务信息
  fetchEnterpriseList();
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
  background-color: #ffffff;
  min-height: 100vh;
}
.first {
  padding-top: 40rpx;
  background: #fff;
}
.head {
  background: #f0f0f0;
  margin-top: 80rpx;
}
.headTab {
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* padding: 20rpx; */
  background: #fff;
  border-bottom: 1rpx solid #f0f0f0;
}

.tab-item {
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20rpx 0;
}

.tab-text {
  font-size: 36rpx;
  color: #000000;
  transition: color 0.3s ease;
}

.tab-item.active .tab-text {
  color: #000000;
  font-weight: bold;
}

.tab-line {
  width: 60rpx;
  height: 6rpx;
  background: #000000;
  border-radius: 2rpx;
  margin-top: 10rpx;
  animation: lineSlide 0.3s ease;
}

@keyframes lineSlide {
  from {
    width: 0;
  }
  to {
    width: 60rpx;
  }
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
  background: linear-gradient(to bottom, #ffffff 0%, #3351e2 70%);
  padding-top: 20rpx;
}
.winthecustomer-content1:nth-of-type(2n) {
  margin-left: 3%;
}
.winthecustomer-content1 {
  width: 48%;
  background: #f2f6ff;
  margin-bottom: 38rpx;
  border-radius: 20rpx;
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
  text-align: center;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  display: flex;
  justify-content: space-between;
}
.winthecustomer-content2-1 {
  color: #000000;
  font-size: 28rpx;
  margin-left: 24rpx;
}
.winthecustomer-content2-2 {
  width: 112rpx;
  height: 44rpx;
  background: #3552e3;
  border-radius: 100rpx;
  color: #ffffff;
  font-size: 20rpx;
  line-height: 44rpx;
  text-align: center;
  margin-right: 24rpx;
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
.video {
  width: 702rpx;
  height: 394rpx;
  border-radius: 20rpx;
  margin: 20rpx auto;
  position: relative;
}
.video video {
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
}
.videoTitle {
  margin-top: 20rpx;
}
.videoTitle1 {
  color: #000000;
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-top: 24rpx;
}
.videoTitle2 {
  color: #4e4d4d;
  font-size: 24rpx;
  padding: 0 24rpx;
}
/* 自定义播放按钮样式 */
.custom-play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}

.custom-play-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
  /* background: rgba(255, 255, 255, 1); */
}

.custom-play-button .play-icon {
  width: 80rpx;
  height: 80rpx;
}
</style>
