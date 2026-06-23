
<template>
  <view class="main" :class="{ 'no-scroll': showPreview }">
    <!-- 容器和热区 -->
    <ContainerHotspot
      :background-image="enterpriseList.enterpriseLogo"
      @left-click="goToWinTheCustomer"
      @right-click="goToSystem"
    >
      <!-- 企业介绍 -->
      <AnimateOnView animation="fade-up" :duration="700">
        <IntroSection
          :title="enterpriseList.enterpriseName || '天天拓客'"
          :description1="enterpriseList.enterpriseIntroOne"
          :description2="enterpriseList.enterpriseIntroTwo"
        />
      </AnimateOnView>

      <!-- 公司发展历程 -->
      <AnimateOnView animation="fade-up" :delay="40" :duration="700">
        <CompanyHistory />
      </AnimateOnView>

      <!-- 合作商家 · 赋能月子服务（内部已集成视频预览） -->
      <AnimateOnView animation="fade-up" :duration="700">
        <BusinessPartner
          v-if="enterpriseList.videoEnabled"
          :list="caseDataList"
          @more="viewmore"
        />
      </AnimateOnView>

      <!-- 合作商家底部横幅图 -->
      <AnimateOnView animation="fade-in" :duration="650">
        <BannerImage
          v-if="enterpriseList.videoEnabled && enterpriseList.bannerImages?.[0]"
          :image-url="enterpriseList.bannerImages[0]"
        />
      </AnimateOnView>

      <!-- 天天拓客 · 精准获取线上流量 -->
      <AnimateOnView animation="fade-up" :duration="700">
        <TrafficBanner @click="goToTrafficDetails" />
      </AnimateOnView>

      <!-- 关于宝妈小叮当 -->
      <AnimateOnView animation="fade-up" :duration="700">
        <AboutSection />
      </AnimateOnView>

      <!-- 宝妈小叮当 业务系统 -->
      <AnimateOnView animation="fade-up" :duration="700">
        <BusinessSystem
          title="宝妈小叮当"
          subtitle="业务系统"
          :list="businessSystemList"
          @click="next"
        />
      </AnimateOnView>

      <!-- 宝妈小叮当 管理系统 -->
      <AnimateOnView animation="fade-up" :duration="700">
        <BusinessSystem
          title="宝妈小叮当"
          subtitle="管理系统"
          :list="managementSystemList"
          @click="next"
        />
      </AnimateOnView>

      <!-- 你的会所是否需要解决 这些经营问题 -->
      <AnimateOnView animation="fade-up" :duration="700">
        <ProblemList
          v-if="productIntroList.length > 0"
          :list="productIntroList"
          :limit="4"
          @click="goToIndex"
          @more="goToIssueList"
        />
      </AnimateOnView>

      <!-- 荣誉证书（双排自动跑马灯轮播） -->
      <AnimateOnView animation="fade-in" :duration="650">
        <view class="brand-story">
          <HonorCertificate
            v-if="
              enterpriseList.honorCertificates &&
              enterpriseList.honorCertificates.length
            "
            :list="enterpriseList.honorCertificates"
          />
        </view>
      </AnimateOnView>

      <view class="introduce">
        <image
          src="http://cdn.xiaodingdang1.com/2025/11/07/c6dd442174ea42628e4c8a5fc0a58617.png"
          style="width: 170rpx; height: 47rpx"
        ></image>
        <view class="introduce-title4">{{
          enterpriseList.enterpriseAddress
        }}</view>
      </view>
    </ContainerHotspot>

    <!-- 全屏预览（图片/视频） -->
    <MediaPreview
      v-model:visible="showPreview"
      :media="previewMedia"
      @fullscreenchange="isVideoFullscreen = $event"
    />

    <!-- 右下角悬浮客服按钮 -->
    <CustomerServiceBtn @click="handleCustomerServiceClick" />
    <ShareFloatBtn />
  </view>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { onShow, onHide } from "@dcloudio/uni-app";

// 组件导入
import ContainerHotspot from "./components/ContainerHotspot.vue";
import IntroSection from "./components/IntroSection.vue";
import AboutSection from "./components/AboutSection.vue";
import BannerImage from "./components/BannerImage.vue";
import CompanyHistory from "./components/CompanyHistory.vue";
import BusinessPartner from "./components/BusinessPartner.vue";
import TrafficBanner from "./components/TrafficBanner.vue";
import BusinessSystem from "./components/BusinessSystem.vue";
import ProblemList from "./components/ProblemList.vue";
import HonorCertificate from "./components/HonorCertificate.vue";
import CustomerServiceBtn from "@/components/CustomerServiceBtn/CustomerServiceBtn.vue";
import MediaPreview from "@/components/MediaPreview/MediaPreview.vue";
import AnimateOnView from "@/components/AnimateOnView/AnimateOnView.vue";

// Composables
import { useHomepageData } from "./composables/useHomepageData.js";
import { useNavigation } from "./composables/useNavigation.js";
import basePoint from "@/utils/basePoint.js";

// 使用数据管理 composable
const {
  enterpriseList,
  caseDataList,
  productIntroList,
  businessSystemList,
  managementSystemList,
  initAllData,
} = useHomepageData();

// 使用导航 composable
const {
  goToWinTheCustomer,
  goToSystem,
  goToCustomerDetail,
  goToIssueList,
  goToIssueDetail,
  viewMoreCases,
  goToTrafficDetails,
} = useNavigation();

// 查看更多案例（BusinessPartner 组件使用）
const viewmore = () => {
  uni.navigateTo({
    url: "/pages/businesspartner/index",
  });
};

// 跳转到问题详情（ProblemList 组件使用）
const goToIndex = (item) => {
  goToIssueDetail(item);
};

// 页面生命周期
onMounted(() => {
  initAllData();
});

// 页面显示/隐藏时的埋点追踪
onShow(async () => {
  await basePoint.trackingStart({
    visitModule: "首页",
    visitContent: "首页",
  });
});

onHide(async () => {
  const trackingId = uni.getStorageSync("trackingId");
  if (trackingId) {
    await basePoint.trackingEnd({
      id: trackingId,
    });
  }
});

const problemScrollLeft = ref(0);
const problemScrollDirection = ref(1);
const problemMaxScroll = ref(0);
let problemScrollTimer = null;
const computeProblemMax = () => {
  const totalContentUpx =
    problemList.value.length * 306 + (problemList.value.length - 1) * 20 + 26;
  const containerWidthUpx = 750 - 52;
  const maxUpx = Math.max(totalContentUpx - containerWidthUpx, 0);
  problemMaxScroll.value = uni.upx2px(maxUpx);
};
const startProblemAutoScroll = () => {
  computeProblemMax();
  stopProblemAutoScroll();
  problemScrollTimer = setInterval(() => {
    problemScrollLeft.value += problemScrollDirection.value * 2;
    if (problemScrollLeft.value >= problemMaxScroll.value) {
      problemScrollDirection.value = -1;
      problemScrollLeft.value = problemMaxScroll.value;
    } else if (problemScrollLeft.value <= 0) {
      problemScrollDirection.value = 1;
      problemScrollLeft.value = 0;
    }
  }, 16);
};
const stopProblemAutoScroll = () => {
  if (problemScrollTimer) {
    clearInterval(problemScrollTimer);
    problemScrollTimer = null;
  }
};

const onSwiperChange = (e) => {
  currentIndex.value = e.detail.current;

  // 如果当前项是视频，则自动播放
  const currentItem = caseDataList.value[currentIndex.value];
  if (isVideo(currentItem)) {
    // 延迟一小段时间确保DOM已更新再播放视频
    setTimeout(() => {
      const videoContext = uni.createVideoContext(
        "bannerVideo" + currentIndex.value
      );
      videoContext.play();
    }, 100);
  }
};

const goToSlide = (index) => {
  currentIndex.value = index;
};
let videoContext = null;
// 播放视频
const playVideo = (index) => {
  // 暂停所有其他视频
  for (let i = 0; i < caseDataList.value.length; i++) {
    if (i !== index) {
      const otherVideoContext = uni.createVideoContext("bannerVideo" + i);
      otherVideoContext.pause();
    }
  }

  // 播放当前选中的视频并全屏
  videoContext = uni.createVideoContext("bannerVideo" + index);
  videoContext.play(); // 先播放视频

  // 延迟进入全屏，确保视频已经开始播放
  setTimeout(() => {
    videoContext.requestFullScreen({ direction: 0 });
    // 设置当前全屏视频索引
    videoFullscreenIndex.value = index;

    // 再次延迟确保全屏状态已触发
    setTimeout(() => {
      videoFullscreenIndex.value = index;
      console.log("强制设置全屏视频索引:", index);
    }, 200);
  }, 100);
};

// 当前全屏播放的视频索引
const videoFullscreenIndex = ref(-1);

// 触摸事件相关变量
const touchStartX = ref(0);
const touchStartY = ref(0);
const touchEndX = ref(0);
const touchEndY = ref(0);
const isDragging = ref(false);

// 触摸开始事件
const handleTouchStart = (e, index) => {
  // 只有在全屏状态下才处理触摸事件
  if (videoFullscreenIndex.value !== index) return;

  isDragging.value = true;
  touchStartX.value = e.touches[0].clientX;
  touchStartY.value = e.touches[0].clientY;
};

// 触摸移动事件
const handleTouchMove = (e, index) => {
  // 只有在全屏状态下且正在拖动才处理触摸事件
  if (videoFullscreenIndex.value !== index || !isDragging.value) return;

  touchEndX.value = e.touches[0].clientX;
  touchEndY.value = e.touches[0].clientY;
};

// 触摸结束事件
const handleTouchEnd = (e, index) => {
  // 只有在全屏状态下才处理触摸事件
  if (videoFullscreenIndex.value !== index || !isDragging.value) {
    isDragging.value = false;
    return;
  }

  isDragging.value = false;

  // 计算水平滑动距离
  const deltaX = touchEndX.value - touchStartX.value;
  const deltaY = Math.abs(touchEndY.value - touchStartY.value);

  // 判断是否为左滑或右滑手势（水平滑动距离大于50px，垂直滑动距离小于30px）
  if (Math.abs(deltaX) > 50 && deltaY < 30) {
    // 左滑或右滑退出全屏
    exitFullscreen(index);
  }
};

// 监听视频全屏状态变化
const onVideoFullscreenChange = (e, index) => {
  console.log("视频全屏状态变化:", e.detail.fullScreen, "索引:", index);
  if (e.detail.fullScreen) {
    // 进入全屏，记录当前视频索引
    videoFullscreenIndex.value = index;
    // 多次延迟强制更新视图，确保按钮显示
    setTimeout(() => {
      videoFullscreenIndex.value = index;
      console.log("第一次更新:", index);
    }, 100);
    setTimeout(() => {
      videoFullscreenIndex.value = index;
      console.log("第二次更新:", index);
    }, 300);
    setTimeout(() => {
      videoFullscreenIndex.value = index;
      console.log("第三次更新:", index);
    }, 500);
  } else {
    // 退出全屏，重置索引
    videoContext.stop();
    videoFullscreenIndex.value = -1;
    console.log("退出全屏");
  }
};
// 退出视频全屏
const exitFullscreen = (index) => {
  videoContext = uni.createVideoContext("bannerVideo" + index);
  videoContext.exitFullScreen();
  videoContext.pause();
  videoFullscreenIndex.value = -1;
};

// 媒体预览相关状态
const showPreview = ref(false);
const isVideoFullscreen = ref(false);
const previewMedia = ref({
  src: "",
  type: "image", // 'image' 或 'video'
  index: 0,
});

// 判断是否为视频文件
const isVideo = (url) => {
  if (!url) return false;
  const videoExtensions = [
    ".mp4",
    ".webm",
    ".ogg",
    ".mov",
    ".avi",
    ".wmv",
    ".flv",
    ".mkv",
  ];
  const urlLower = url.toLowerCase();
  return videoExtensions.some((ext) => urlLower.includes(ext));
};

// 处理长按二维码事件
const handleLongPressQrCode = () => {
  if (!enterpriseList.value.qrCode) {
    uni.showToast({
      title: "二维码不存在",
      icon: "none",
    });
    return;
  }

  // 提示用户保存二维码
  uni.downloadFile({
    url: enterpriseList.value.qrCode,
    success: (downloadRes) => {
      if (downloadRes.statusCode === 200) {
        uni.saveImageToPhotosAlbum({
          filePath: downloadRes.tempFilePath,
          success: () => {
            uni.showToast({
              title: "二维码保存相册成功",
              icon: "none",
              duration: 1500,
            });
          },
          fail: () => {
            uni.showToast({
              title: "保存失败，请检查相册权限",
              icon: "none",
            });
          },
        });
      } else {
        uni.showToast({
          title: "下载失败",
          icon: "none",
        });
      }
    },
    fail: () => {
      uni.showToast({
        title: "下载失败",
        icon: "none",
      });
    },
  });
};

// 媒体点击事件（打开全屏预览）
const onMediaClick = (item, index, type) => {
  previewMedia.value = { src: item, type, index };
  showPreview.value = true;
};

// 预览企业首图
const previewBusinessImage = () => {
  const first = enterpriseList.value?.bannerImages?.[0];
  if (!first) return;
  previewMedia.value = { src: first, type: "image", index: 0 };
  showPreview.value = true;
};

// 切换到上一个媒体
const prevMedia = () => {
  const currentIndex = previewMedia.value.index;
  const newIndex =
    currentIndex > 0 ? currentIndex - 1 : caseDataList.value.length - 1;
  const newSrc = caseDataList.value[newIndex];
  previewMedia.value = {
    src: newSrc,
    type: isVideo(newSrc) ? "video" : "image",
    index: newIndex,
  };
};

// 切换到下一个媒体
const nextMedia = () => {
  const currentIndex = previewMedia.value.index;
  const newIndex =
    currentIndex < caseDataList.value.length - 1 ? currentIndex + 1 : 0;
  const newSrc = caseDataList.value[newIndex];
  previewMedia.value = {
    src: newSrc,
    type: isVideo(newSrc) ? "video" : "image",
    index: newIndex,
  };
};
//预览大图
const previewSingleImage = (bannerImages) => {
  let urls = [bannerImages];
  uni.previewImage({
    urls: urls,
    current: 0,
    indicator: "number",
    loop: false,
  });
};
// 跳转到指定媒体
const goToMedia = (index) => {
  const newSrc = caseDataList.value[index];
  previewMedia.value = {
    src: newSrc,
    type: isVideo(newSrc) ? "video" : "image",
    index: index,
  };
};

// 打电话功能
const handlePhoneCall = () => {
  uni.makePhoneCall({
    phoneNumber: this.enterpriseList.contactPhone, // 使用页面中显示的电话号码
    success: () => {
      console.log("拨打电话成功");
    },
    fail: (err) => {
      console.error("拨打电话失败:", err);
      uni.showToast({
        title: "拨打电话失败",
        icon: "none",
      });
    },
  });
};

// 定位导航功能
const handleNavigation = () => {
  console.log("Navigation clicked");
  uni.openLocation({
    latitude: 28.1941, // 长沙市芙蓉区的大概坐标
    longitude: 113.0116,
    name: "天天拓客",
    address: "湖南省长沙市芙蓉区壹号座品A座613",
    scale: 18,
    success: () => {
      console.log("打开地图成功");
    },
    fail: (err) => {
      console.error("打开地图失败:", err);
      uni.showToast({
        title: "打开地图失败",
        icon: "none",
      });
    },
  });
};
// 跳转到服务详情（BusinessSystem 组件使用）
const next = (item) => {
  goToCustomerDetail(item.serviceId);
};

// 客服按钮点击事件
const handleCustomerServiceClick = () => {
  console.log("Customer service clicked");
};

// 小程序分享功能
const onShareAppMessage = (res) => {
  return {
    title: enterpriseList.value.enterpriseName || "天天拓客",
    path: "/pages/index/index",
    imageUrl: enterpriseList.value.enterpriseLogo || "", // 分享封面图片
  };
};

// 朋友圈分享功能
const onShareTimeline = () => {
  return {
    title: enterpriseList.value.enterpriseName || "天天拓客",
    query: "",
    imageUrl: enterpriseList.value.enterpriseLogo || "",
  };
};
</script>

<style lang="scss" scoped>
.main {
  background-color: #f7f7f7;
  min-height: 100vh;
  overflow-x: hidden;
}

.main.no-scroll {
  overflow: hidden;
  height: 100vh;
  position: fixed;
  width: 100%;
}
.header {
  padding: 110rpx 0rpx 30rpx 26rpx;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  transition: background-color 0.3s ease;
}

.header-with-bg {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10rpx);
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.title-wrapper {
  display: flex;
  align-items: center;
}
.headLogo {
  border-radius: 100rpx;
  width: 62rpx;
  height: 62rpx;
}
.logo {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 28rpx;
  font-weight: bold;
  color: #313131;
  margin-left: 12rpx;
}

.right-icons {
  display: flex;
  align-items: center;
}

.search-icon {
  font-size: 32rpx;
  margin-left: 20rpx;
}

.banner {
  margin-top: 250rpx;
  position: relative;
  width: 100%;
  height: 400rpx;
  overflow: hidden;
}

// .company-banner {
//   background-image: url("http://cdn.xiaodingdang1.com/2025/09/27/9838f69dbc1c4ded945f24358ae5424e.jpg");
//   background-size: cover;
//   background-position: center;
//   background-repeat: no-repeat;
//   padding: 60rpx 0;
//   width: 100%;
// }

.company-info {
  // background: rgba(255, 255, 255, 0.9);
  border-radius: 20rpx;
  padding: 40rpx 30rpx;
  margin: 0 26rpx;
  backdrop-filter: blur(10rpx);
  text-align: center;
}

.company-title {
  display: block;
  font-size: 40rpx;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20rpx;
  text-align: center;
}

.company-desc {
  font-size: 28rpx;
  color: #000000;
  text-align: center;
  margin-top: 50rpx;
}

/* 按钮样式 */
.company-btn {
  width: 60%;
  display: flex;
  margin-top: 80rpx;
  justify-content: space-between;
  margin: 60rpx auto;
}
.company-btn1 {
  display: flex;
  justify-content: center;
  width: 20%;
}
.contact-btn {
  width: 80rpx;
  height: 80rpx;
  padding: 0;
  margin: 0;
  border: none !important;
  border-radius: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.1);
}

.contact-btn::after {
  border: none !important;
}
.contact-btn image {
  width: 80rpx;
  height: 80rpx;
}

/* 按钮悬停效果 */
.contact-btn:hover {
  transform: scale(1.1);
}

/* 轮播图样式 */
.slideshow {
  border-radius: 32rpx;
  overflow: hidden;
  position: relative;
  padding: 26rpx 26rpx;
}

.swiper-container {
  width: 100%;
  height: 391rpx;
  border-radius: 32rpx;
}

.swiper-item {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 32rpx;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 60rpx 30rpx 30rpx;
  color: white;
}

.banner-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.5);
}

.banner-desc {
  font-size: 26rpx;
  opacity: 0.9;
  line-height: 1.4;
  text-shadow: 0 1rpx 2rpx rgba(0, 0, 0, 0.5);
}
/**线上获客 */
.brand-story {
  background: #ffffff;
  // padding: 80rpx 26rpx;
  color: #000000;
}

/* 品牌/团队/荣誉证书/合作商的旧样式已迁移至对应组件内部。 */
.teamappearance-content {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 0 26rpx;
  gap: 20rpx;
  margin-top: 38rpx;

  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}
._deprecated_teamappearance-item {
  background: #f7f7f7;
  border-radius: 20rpx;
  flex-shrink: 0;
  width: 440rpx;
  margin-right: 20rpx;
  &:last-child {
    margin-right: 26rpx;
  }
}
._deprecated_teamappearance-item-content {
  padding: 18rpx 18rpx;
  color: #3d3d3d;
  font-size: 22rpx;
}

.certificate {
  background: #f4f5fa;
  padding: 40rpx 26rpx;
  // margin-top: 38rpx;
}
.certificate-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #000000;
  text-align: center;
  padding: 0 49rpx;
}
.certificate-list {
  margin-top: 20rpx;
}

.certificate-scroll-container {
  overflow-x: auto;
  scroll-behavior: smooth;

  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.certificate-double-row {
  display: flex;
  flex-direction: column;
  width: max-content;
}

.certificate-row {
  display: flex;
  gap: 0;
  &:last-child {
    margin-bottom: 0;
  }
}

.certificate-item {
  width: 239rpx;
  height: 265rpx;
  flex-shrink: 0;
  background: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 16rpx 16rpx;
  border-radius: 12rpx;
  &:last-child {
    margin-right: 49rpx;
  }
}
.certificate-item image {
  width: 100%;
  height: 265rpx;
  object-fit: cover;
  border-radius: 12rpx;
}
/**合作商 */
.businesspartner {
  padding: 80rpx 0;
}
.businesspartner-list {
  margin-top: 40rpx;
  padding: 0 49rpx;
  overflow-x: auto;
  scroll-behavior: smooth;

  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.businesspartner-row {
  display: flex;
  gap: 20rpx;
  margin-bottom: 20rpx;
  width: max-content;

  &:last-child {
    margin-bottom: 0;
  }
}

.businesspartner-item {
  border-radius: 20rpx;
  width: 216rpx;
  height: 88rpx;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  scroll-snap-align: center;

  &:last-child {
    margin-right: 49rpx;
  }
}
.businesspartner-item image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
/** 系统服务 / 流量服务样式已移除（原模块已下线，由 BusinessSystem、TrafficBanner 等组件代替） */
.winthecustomer-head {
  display: flex;
}
.winthecustomer-head1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

@keyframes popIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.winthecustomer-title {
  color: #000000;
  font-weight: bold;
  font-size: 40rpx;
}
.view-more-btn {
  font-size: 33rpx;
  color: #313131;
  padding: 6rpx 16rpx;
  border-radius: 6rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* .winthecustomer-line / .winthecustomer-content* 已废弃 */
.headContent {
  display: flex;
  align-items: center;
  justify-content: center;
}
.headLeft {
  width: 142rpx;
  height: 5rpx;
  background: linear-gradient(
    90deg,
    rgba(216, 216, 216, 0) 0%,
    rgba(51, 51, 51, 0.5) 100%
  );
  border-radius: 0rpx 0rpx 0rpx 0rpx;
}
.headRight {
  width: 142rpx;
  height: 5rpx;
  background: linear-gradient(
    90deg,
    rgba(51, 51, 51, 0.5) 0%,
    rgba(216, 216, 216, 0) 100%
  );
  border-radius: 0rpx 0rpx 0rpx 0rpx;
}

.introduce {
  background: #ffffff;
  padding: 63rpx 44rpx;
}
.introduce-title1 {
  color: #3d3d3d;
  font-size: 21rpx;
  font-weight: bold;
}
.introduce-title2 {
  color: #000000;
  font-size: 18rpx;
  margin-top: 8rpx;
}
.introduce-title3 {
  border: 1rpx solid #e2e2e2;
  margin: 24rpx 0;
}
.introduce-title4 {
  color: #7a7878;
  font-size: 24rpx;
  margin-top: 15rpx;
}
.introduce-container5 {
  text-align: center;
}
.introduce-container5 image {
  width: 152rpx;
  height: 152rpx;
}
.introduce-container6 {
  color: #000000;
  font-size: 18rpx;
  margin-top: 18rpx;
}

wx-button {
  border: none !important;
}

/* 媒体容器样式 */
.media-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.banner-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 隐藏视频控件 */
  /* 移除所有可能的控制条 */
  ::-webkit-media-controls-panel {
    display: none !important;
  }
  ::-webkit-media-controls-play-button {
    display: none !important;
  }
  ::-webkit-media-controls {
    display: none !important;
  }
  video::-webkit-media-controls {
    display: none !important;
  }
  video::-webkit-media-controls-start-playback-button {
    display: none !important;
  }
}

.media-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  cursor: pointer;
}

.play-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.play-icon image {
  width: 100%;
  height: 100%;
}

.preview-icon {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 40rpx;
  height: 40rpx;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon-text {
  font-size: 20rpx;
  color: white;
}

/* 全屏预览样式已迁移至 @/components/MediaPreview */

/* 客服按钮样式（已封装至 CustomerServiceBtn 组件，保留其他页面可能的兼容样式） */
.customer-service-btn {
  position: fixed;
  right: 0;
  bottom: 160rpx;
  width: 160rpx;
  height: 160rpx;
  z-index: 999;
  cursor: pointer;
  background-color: transparent !important;
  border: none !important;
}

.customer-service-btn image {
  width: 100%;
  height: 100%;
}
wx-button:after {
  border: none !important;
}
/**合作商家 */
.businesspartnernew {
  background: #ffffff;
  border-top-right-radius: 52rpx;
  border-top-left-radius: 52rpx;
  padding: 46rpx 26rpx;
  margin-top: 100rpx;
}
.businesspartnernew-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
  margin-top: 24rpx;
}
.businesspartnernew-item {
  width: 224rpx;
  height: 340rpx;
  border-radius: 20rpx;
  position: relative;
}
.viewmore {
  display: flex;
  justify-content: center;
  background: #f3f5fb;
  border-radius: 8rpx;
  width: 100%;
  height: 88rpx;
  color: #313131;
  font-size: 30rpx;
  line-height: 88rpx;
  margin: 28rpx 0 60rpx 0;
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
  // box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.2);
  // transition: all 0.3s ease;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}

.custom-play-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
  // background: rgba(255, 255, 255, 1);
}

.custom-play-button .play-icon {
  width: 80rpx;
  height: 80rpx;
}

.problem {
  background: #ffffff;
  padding: 46rpx 26rpx;
}
.problem-swiper {
  height: 364rpx;
  background-color: #fff;
  margin-top: 24rpx;
}
.problem-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 24rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.problem-slide-image {
  height: 360rpx;
  border-radius: 20rpx;
  border: 2rpx solid #e1e1e1;
}
.problem-scroll {
  margin-top: 24rpx;
  white-space: nowrap;
}
.problem-scroll-inner {
  display: flex;
  gap: 20rpx;
  padding-right: 26rpx;
}
.problem-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20rpx;
  margin-top: 24rpx;
}
.problem-card {
  width: 306rpx;
  height: 366rpx;
  background-image: url("http://cdn.xiaodingdang1.com/2026/01/07/c4032fd2437547538d32d660aba816b9.png"),
    url("http://cdn.xiaodingdang1.com/2026/01/07/eef8835804c445578657bcd774639c8f.png");
  background-size: 106rpx 112rpx, cover;
  background-position: right 24rpx bottom 24rpx, center;
  background-repeat: no-repeat, no-repeat;
  overflow: hidden;
  border-radius: 20rpx;
  flex-shrink: 0;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
}
.problem-card-header {
  display: flex;
  align-items: center;
  padding: 60rpx 20rpx 8rpx 30rpx;
  justify-content: space-between;
}
.problem-icon {
}
.problem-icon image {
  width: 56rpx;
  height: 56rpx;
}
.problem-arrow {
}
.problem-arrow image {
  width: 30rpx;
  height: 30rpx;
}
.problem-card-body {
  padding: 24rpx;
}
.problem-title {
  width: 128rpx;
  height: 40rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 600;
  font-size: 32rpx;
  color: #3351e3;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.problem-desc {
  width: 270rpx;
  height: 80rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #3d3d3d;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-top: 24rpx;
}

/* 全屏返回按钮样式 */
.video-fullscreen-back-btn {
  position: fixed !important;
  top: 80rpx !important;
  left: 40rpx !important;
  z-index: 999999 !important;
  width: 80rpx !important;
  height: 80rpx !important;
  border-radius: 50% !important;
  background-color: rgba(0, 0, 0, 0.7) !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  transition: all 0.3s ease;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.3) !important;
  animation: fadeIn 0.3s ease-in-out;
  transform: translate3d(0, 0, 0) !important;
  visibility: visible !important;
  opacity: 1 !important;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.video-fullscreen-back-btn:hover {
  background-color: rgba(0, 0, 0, 0.9);
  transform: scale(1.1);
}

.video-fullscreen-back-btn .back-icon {
  width: 48rpx;
  height: 48rpx;
}

.close-icon {
  width: 30rpx;
  height: 30rpx;
}
</style>
