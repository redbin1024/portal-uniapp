<template>
  <view class="page" :class="{ 'page--locked': showPreview }">
    <view class="nav-bar" :class="{ 'nav-bar--solid': showHeaderBg }">
      <view class="nav-bar__inner">
        <view class="nav-bar__logo">
          <image class="nav-bar__logo-img"
            src="http://cdn.xiaodingdang1.com/2025/09/18/45411cdc8ffd4ca9a16fc436c85ae0e8.png" mode="aspectFit" />
        </view>
        <view class="nav-bar__title">{{ enterpriseList.enterpriseName }}</view>
      </view>
    </view>

    <!-- Hero 区域 -->
    <view class="hero">
      <image class="hero__bg" src="/static/hero-bg.png" mode="aspectFill" />
      <view class="hero__content">
        <!-- 品牌 Logo -->
        <view class="hero__brand">
          <image class="hero__brand-logo"
            src="http://cdn.xiaodingdang1.com/2025/09/18/45411cdc8ffd4ca9a16fc436c85ae0e8.png" mode="aspectFit" />
          <view class="hero__brand-name">{{ enterpriseList.enterpriseName || '天天拓客' }}</view>
          <view class="hero__brand-slogan">TIAN TIAN TUO KE</view>
        </view>
        <!-- 主标语 -->
        <view class="hero__tagline">
          <view class="hero__tagline-line">月子中心全案运营</view>
          <view class="hero__tagline-line">行业领跑者</view>
        </view>
        <!-- 服务卡片 -->
        <view class="hero__services">
          <view class="service-card" @click="nextDetile(serviceList)">
            <view class="service-card__info">
              <text class="service-card__title">线上获客</text>
              <text class="service-card__subtitle">Client</text>
            </view>
            <image class="service-card__img" :src="serviceList?.serviceImage?.[0]" v-if="serviceList?.serviceImage?.[0]"
              mode="aspectFit" />
          </view>
          <view class="service-card" @click="next(serviceLists[0])" v-if="serviceLists.length > 0">
            <view class="service-card__info">
              <text class="service-card__title">系统服务</text>
              <text class="service-card__subtitle">System</text>
            </view>
            <image class="service-card__img" :src="serviceLists[0]?.serviceImage" v-if="serviceLists[0]?.serviceImage"
              mode="aspectFit" />
          </view>
        </view>
      </view>
    </view>

    <!-- 企业信息 -->
    <view class="company-info">
      <text class="company-info__name">{{ enterpriseList.enterpriseName }}</text>
      <text class="company-info__desc">{{ enterpriseList.enterpriseDescription }}</text>
      <view class="company-info__actions">
        <button class="action-btn" @click="handlePhoneCall">
          <image src="http://cdn.xiaodingdang1.com/2025/09/27/a51f8b4f36a54f4385c0a695ab191a77.png" />
        </button>
        <button class="action-btn" @click="handleNavigation">
          <image src="http://cdn.xiaodingdang1.com/2025/09/27/41563146d6c54148a0e1b9f80ca4c1c1.png" />
        </button>
        <button class="action-btn" open-type="share">
          <image src="http://cdn.xiaodingdang1.com/2025/09/27/8669297789b34a3d9848db137bd084fb.png" />
        </button>
      </view>
    </view>
    <!-- 线上获客模块 -->
    <view class="section">
      <view class="section__header">
        <view class="section__header-inner">
          <image src="http://cdn.xiaodingdang1.com/2025/09/29/0e9ee0c847c048809e8e5d520cbc7fa2.png"
            class="section__header-icon" />
          <view class="section__header-title">线上获客</view>
        </view>
      </view>
      <view class="section__banner" @click="nextDetile(serviceList)">
        <image :src="serviceList?.serviceImage?.[0]" v-if="serviceList?.serviceImage?.[0]" mode="widthFix"
          class="section__banner-img" />
      </view>
    </view>

    <!-- 系统服务模块 -->
    <view class="section">
      <view class="section__header">
        <view class="section__header-inner">
          <image src="http://cdn.xiaodingdang1.com/2025/09/29/91ec3c9320a946c3a2cb84795b82cf82.png"
            class="section__header-icon" />
          <view class="section__header-title">系统服务</view>
        </view>
      </view>
      <view class="section__grid">
        <view class="grid-card" v-for="(item, index) in serviceLists" :key="index" @click="next(item)">
          <image :src="item.serviceImage" class="grid-card__img" />
          <view class="grid-card__name">{{ item.serviceName }}</view>
        </view>
      </view>
    </view>

    <!-- 荣誉证书 -->
    <view class="cert-section">
      <view class="divider-title">
        <view class="divider-title__line divider-title__line--left"></view>
        <view class="divider-title__text">荣誉证书</view>
        <view class="divider-title__line divider-title__line--right"></view>
      </view>
      <view class="cert-scroll">
        <view class="cert-scroll__wrapper">
          <view class="cert-scroll__row">
            <view v-for="(certificate, index) in getFirstRowCertificates(enterpriseList.honorCertificates)"
              :key="'row1-' + index" class="cert-item">
              <image :src="certificate" mode="aspectFit" />
            </view>
          </view>
          <view class="cert-scroll__row" v-if="getSecondRowCertificates(enterpriseList.honorCertificates).length > 0">
            <view v-for="(certificate, index) in getSecondRowCertificates(enterpriseList.honorCertificates)"
              :key="'row2-' + index" class="cert-item">
              <image :src="certificate" mode="aspectFit" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 合作商家 -->
    <view class="partner-section">
      <view class="divider-title">
        <view class="divider-title__line divider-title__line--left"></view>
        <view class="divider-title__text">合作商家</view>
        <view class="divider-title__line divider-title__line--right"></view>
      </view>
      <view class="partner-list">
        <view class="partner-list__row">
          <view v-for="(partner, index) in getFirstRowPartners(enterpriseList.cooperationMerchants)"
            :key="'row1-' + index" class="partner-item">
            <image :src="partner" mode="aspectFit" />
          </view>
        </view>
        <view class="partner-list__row" v-if="getSecondRowPartners(enterpriseList.cooperationMerchants).length > 0">
          <view v-for="(partner, index) in getSecondRowPartners(enterpriseList.cooperationMerchants)"
            :key="'row2-' + index" class="partner-item">
            <image :src="partner" mode="aspectFit" />
          </view>
        </view>
      </view>
    </view>
    <!-- 底部联系信息 -->
    <view class="footer">
      <view class="footer__info">
        <view class="footer__company-name">{{ enterpriseList.enterpriseName }}</view>
        <view class="footer__address">{{ enterpriseList.enterpriseAddress }}</view>
        <view class="footer__divider"></view>
        <view class="footer__phone">电话：{{ enterpriseList.contactPhone }}</view>
      </view>
      <view class="footer__qrcode">
        <image :src="enterpriseList.qrCode" />
        <view class="footer__qrcode-label">扫码添加微信</view>
      </view>
    </view>

    <!-- 全屏预览组件 -->
    <view v-if="showPreview" class="preview-modal" :class="{ 'video-fullscreen': isVideoFullscreen }"
      @click="handlePreviewModalClick">
      <!-- 媒体内容 -->
      <view class="preview-content">
        <video v-if="previewMedia.type === 'video'" :src="previewMedia.src" class="preview-video" controls autoplay
          :poster="getVideoPoster(previewMedia.src)" :show-fullscreen-btn="true" @fullscreenchange="onFullscreenChange"
          :id="'preview-video-' + previewMedia.index" />
        <image v-else :src="previewMedia.src" class="preview-image" mode="aspectFit" />
        <view class="arrows">
          <view class="leftarrows" @click.stop="prevMedia">
            <image src="http://cdn.xiaodingdang1.com/2025/09/29/936dbb6c2ac74e06a550872104bd2231.png"></image>
          </view>
          <view class="rightarrows" @click.stop="nextMedia">
            <image src="http://cdn.xiaodingdang1.com/2025/09/29/3a9d97e8cbf947aaa810020e259a23b8.png"></image>
          </view>
        </view>
      </view>
    </view>

    <!-- 客服按钮 -->
    <view class="customer-service-btn">
      <image src="http://cdn.xiaodingdang1.com/2025/09/29/84932e513ebd49d093825177c28edf83.png" mode="aspectFit"
        @click="handleCustomerServiceClick" />
    </view>
  </view>
  <BackHome />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";

onShareAppMessage(() => {
  return {
    title: "MasterGo项目",
    path: "/pages/homepage/index",
  };
});

onShareTimeline(() => {
  return {
    title: "MasterGo项目",
    query: "",
  };
});

// 轮播图数据import { onPageScroll } from "@dcloudio/uni-app";
import {
  getEnterpriseList,
  getServiceList,
  getCompanyNewsList,
} from "@/api/activity.js";

// 标题动画状态
const titleVisible = ref(false);
// headContent 动画状态
const headContentVisible = ref({});
// winthecustomer-content1 动画状态
const content1Visible = ref([]);
//查询公司动态列表
const fetchCompanyNewsList = async () => {
  try {
    const response = await getCompanyNewsList({
      pageSize: 10,
      pageNum: 1,
      type: 0,
    });
    console.log("企业列表数据:", response);
    if (
      response &&
      response.rows &&
      Array.isArray(response.rows) &&
      response.rows.length > 0
    ) {
      companyNewsList.value = response.rows;
    }
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
  }
};
const nextDetile = (item) => {
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
//查询服务信息列表
const fetchServiceList = async () => {
  try {
    const response = await getServiceList({
      pageSize: 5,
      pageNum: 1,
    });
    console.log("企业列表数据:", response);
    if (
      response &&
      response.rows &&
      Array.isArray(response.rows) &&
      response.rows.length > 0
    ) {
      serviceList.value = response.rows[0];
      serviceLists.value = response.rows.slice(1);
    }
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
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
    }
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
  }
};
/**
 * 跳转到公司动态详情页面并传递item数据
 */
const goToDetails = (item) => {
  uni.navigateTo({
    url:
      "/pages/firmdynamicdetails/index?item=" +
      encodeURIComponent(JSON.stringify(item)),
  });
};
// 页面加载完成后触发按钮动画
onMounted(() => {
  // 获取企业列表数据
  fetchEnterpriseList();
  //查询服务信息列表
  fetchServiceList();
  //查询公司动态列表
  fetchCompanyNewsList();
});

// 轮播图数据
const bannerList = ref([
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png",
    title: "专业团队",
    desc: "拥有多年行业经验的专业团队",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/17/dff756b4214e4fdb94a2a803a38a16fa.png",
    title: "优质服务",
    desc: "为客户提供一站式解决方案",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/12/bcf4ff23413847129727a6a265fd2b34.png",
    title: "创新技术",
    desc: "运用最新技术为客户创造价值",
  },
]);

// 团队数据
const teamList = ref([
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/17/e7c6eb7643134423ab31c7726397b807.png",
    title: "销售部",
    content:
      '拥有超过10年的建筑经验，包括担任奥地利"蓝天组"建筑事务所的首席设计师(奥地利的Coophimmelblau)和Hernan Diaz Alonso在洛杉矶的Xefirotarch。2008年得南加州建筑学院建筑学硕士学位。',
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/17/3e714aab0c1044f3a6d9ad78dc856e63.png",
    title: "技术部",
    content:
      "专业的技术团队，拥有丰富的软件开发经验，致力于为客户提供最优质的技术解决方案。团队成员均具备扎实的技术功底和创新思维。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/17/dff756b4214e4fdb94a2a803a38a16fa.png",
    title: "运营部",
    content:
      "负责公司日常运营管理，拥有丰富的项目管理经验。致力于优化业务流程，提升工作效率，确保项目顺利进行。",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/12/bcf4ff23413847129727a6a265fd2b34.png",
    title: "市场部",
    content:
      "专业的市场推广团队，深谙市场营销策略，具备敏锐的市场洞察力，为公司业务拓展提供强有力的支持。",
  },
]);

// 证书数据
const certificateList = ref([
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
    name: "优秀企业证书",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
    name: "技术创新奖",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
    name: "服务质量奖",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
    name: "行业领先奖",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/fd0961babb634f3b9fefb2f9ad8c0855.png",
    name: "客户满意奖",
  },
]);

// 合作商家数据
const businessPartnerList = ref([
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴1",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴2",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴3",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴4",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴5",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴5",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴5",
  },
  {
    image:
      "http://cdn.xiaodingdang1.com/2025/09/18/cc70bc251d644d78866a0ad1e0ba546c.png",
    name: "合作伙伴5",
  },
]);

// 企业列表数据
const enterpriseList = ref([]);
//查询服务信息列表
const serviceList = ref([]);
const serviceLists = ref([]);
//查询公司动态列表
const companyNewsList = ref([]);
// 轮播图相关
const currentIndex = ref(0);

// 滚动相关
const showHeaderBg = ref(false);

const onSwiperChange = (e) => {
  currentIndex.value = e.detail.current;

  // 如果当前项是视频，则自动播放
  const currentItem = enterpriseList.value.bannerImages[currentIndex.value];
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

// 获取视频封面图
const getVideoPoster = (videoUrl) => {
  // 这里可以返回视频的封面图，如果没有可以返回默认图片
  return videoUrl.replace(
    /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i,
    "_poster.jpg"
  );
};

// 媒体点击事件
const onMediaClick = (item, index, type) => {
  console.log("Media clicked:", item, index, type);
  previewMedia.value = {
    src: item,
    type: type,
    index: index,
  };
  showPreview.value = true;
};

// 关闭预览
const closePreview = () => {
  // 如果视频正在全屏，不关闭预览
  if (isVideoFullscreen.value) {
    return;
  }
  showPreview.value = false;
};

// 处理视频全屏状态变化
const onFullscreenChange = (e) => {
  console.log("视频全屏状态变化:", e);
  const isEnteringFullscreen = !!(
    e &&
    e.detail &&
    (e.detail.fullScreen || e.detail.fullscreen)
  );

  isVideoFullscreen.value = isEnteringFullscreen;

  if (isEnteringFullscreen) {
    console.log("视频进入全屏，保持showPreview显示");
  } else {
    console.log("视频退出全屏");
  }
};

// 处理预览模态框点击事件
const handlePreviewModalClick = (e) => {
  // 如果视频正在全屏，不关闭预览
  if (isVideoFullscreen.value) {
    console.log("视频全屏中，不关闭预览");
    return;
  }
  closePreview();
};

// 切换到上一个媒体
const prevMedia = () => {
  const currentIndex = previewMedia.value.index;
  const newIndex =
    currentIndex > 0
      ? currentIndex - 1
      : enterpriseList.value.bannerImages.length - 1;
  const newSrc = enterpriseList.value.bannerImages[newIndex];
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
    currentIndex < enterpriseList.value.bannerImages.length - 1
      ? currentIndex + 1
      : 0;
  const newSrc = enterpriseList.value.bannerImages[newIndex];
  previewMedia.value = {
    src: newSrc,
    type: isVideo(newSrc) ? "video" : "image",
    index: newIndex,
  };
};

// 跳转到指定媒体
const goToMedia = (index) => {
  const newSrc = enterpriseList.value.bannerImages[index];
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
const handleContactClick = () => {
  console.log("Contact clicked");
};

// 客服按钮点击事件
const handleCustomerServiceClick = () => {
  console.log("Customer service clicked");
  // 这里可以添加客服相关的逻辑，比如跳转到客服页面或打开客服对话框
};

// 获取第一排证书数据
const getFirstRowCertificates = (certificates) => {
  if (!certificates || !Array.isArray(certificates)) return [];
  return certificates.filter((_, index) => index % 2 === 0);
};

// 获取第二排证书数据
const getSecondRowCertificates = (certificates) => {
  if (!certificates || !Array.isArray(certificates)) return [];
  return certificates.filter((_, index) => index % 2 === 1);
};

// 获取第一排合作商家数据
const getFirstRowPartners = (partners) => {
  if (!partners || !Array.isArray(partners)) return [];
  return partners.filter((_, index) => index % 2 === 0);
};

// 获取第二排合作商家数据
const getSecondRowPartners = (partners) => {
  if (!partners || !Array.isArray(partners)) return [];
  return partners.filter((_, index) => index % 2 === 1);
};

onPageScroll((e) => { });
</script>

<style lang="scss" scoped>
/* ===== 页面基础 ===== */
.page {
  background-color: #f5f6fa;
  min-height: 100vh;
}

.page--locked {
  overflow: hidden;
  height: 100vh;
  position: fixed;
  width: 100%;
}

/* ===== 导航栏 ===== */
.nav-bar {
  padding: 110rpx 0 30rpx 26rpx;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  transition: background-color 0.3s ease;
}

.nav-bar--solid {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10rpx);
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.nav-bar__inner {
  display: flex;
  align-items: center;
}

.nav-bar__logo {
  border-radius: 100rpx;
  width: 62rpx;
  height: 62rpx;
}

.nav-bar__logo-img {
  width: 100%;
  height: 100%;
}

.nav-bar__title {
  font-size: 28rpx;
  font-weight: bold;
  color: #313131;
  margin-left: 12rpx;
}

/* ===== Hero 区域 ===== */
.hero {
  position: relative;
  width: 100%;
  min-height: 900rpx;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero__content {
  position: relative;
  z-index: 1;
  padding: 200rpx 40rpx 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero__brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40rpx;
}

.hero__brand-logo {
  width: 80rpx;
  height: 80rpx;
  border-radius: 16rpx;
}

.hero__brand-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #ffffff;
  margin-top: 16rpx;
  letter-spacing: 4rpx;
}

.hero__brand-slogan {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 8rpx;
  letter-spacing: 6rpx;
}

.hero__tagline {
  text-align: center;
  margin: 40rpx 0 60rpx;
}

.hero__tagline-line {
  font-size: 56rpx;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.4;
  text-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.2);
}

.hero__services {
  display: flex;
  gap: 24rpx;
  width: 100%;
}

.service-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20rpx);
  border-radius: 24rpx;
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 240rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.08);
}

.service-card__info {
  display: flex;
  flex-direction: column;
}

.service-card__title {
  font-size: 32rpx;
  font-weight: bold;
  color: #1a1a2e;
}

.service-card__subtitle {
  font-size: 24rpx;
  color: #8e8ea0;
  margin-top: 6rpx;
  font-style: italic;
}

.service-card__img {
  width: 100%;
  height: 160rpx;
  margin-top: 16rpx;
}

/* ===== 企业信息 ===== */
.company-info {
  background: #ffffff;
  border-radius: 20rpx;
  padding: 50rpx 30rpx;
  margin: -40rpx 26rpx 0;
  position: relative;
  z-index: 2;
  text-align: center;
  box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.06);
}

.company-info__name {
  display: block;
  font-size: 40rpx;
  font-weight: bold;
  color: #1a1a2e;
  margin-bottom: 20rpx;
}

.company-info__desc {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.company-info__actions {
  display: flex;
  justify-content: center;
  gap: 60rpx;
  margin-top: 40rpx;
}

.action-btn {
  width: 80rpx;
  height: 80rpx;
  padding: 0;
  margin: 0;
  border: none !important;
  border-radius: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
  transition: transform 0.2s;

  &::after {
    border: none !important;
  }

  image {
    width: 80rpx;
    height: 80rpx;
  }

  &:hover {
    transform: scale(1.1);
  }
}

/* ===== 内容板块 ===== */
.section {
  margin-top: 30rpx;
}

.section__header {
  height: 152rpx;
  background: url("http://cdn.xiaodingdang1.com/2025/10/08/423f8b0e1de441c3976ad67950b39860.png") no-repeat center;
  background-size: cover;
  display: flex;
}

.section__header-inner {
  height: 100rpx;
  display: flex;
  align-items: center;
  margin-left: 26rpx;
}

.section__header-icon {
  width: 50rpx;
  height: 50rpx;
}

.section__header-title {
  color: #1a1a2e;
  font-weight: bold;
  font-size: 40rpx;
  margin-left: 22rpx;
}

.section__banner {
  background: linear-gradient(to bottom, #f0f0f0 30%, #ffffff 70%);
  margin-top: -60rpx;
  padding: 38rpx 26rpx 50rpx;
  text-align: center;
}

.section__banner-img {
  width: 698rpx;
  border-radius: 20rpx;
}

.section__grid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20rpx;
  background: linear-gradient(to bottom, #f0f0f0 30%, #ffffff 70%);
  margin-top: -60rpx;
  padding: 10rpx 26rpx 50rpx;
}

.grid-card {
  width: calc(50% - 10rpx);
  background: #f2f6ff;
  margin-top: 28rpx;
  border-radius: 20rpx;
  overflow: hidden;
}

.grid-card__img {
  width: 100%;
  height: 350rpx;
}

.grid-card__name {
  padding: 20rpx 0;
  color: #3d3d3d;
  font-size: 32rpx;
  text-align: center;
}

/* ===== 分割标题 ===== */
.divider-title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx 0 20rpx;
}

.divider-title__line {
  width: 142rpx;
  height: 5rpx;

  &--left {
    background: linear-gradient(90deg,
        rgba(216, 216, 216, 0) 0%,
        rgba(51, 51, 51, 0.5) 100%);
  }

  &--right {
    background: linear-gradient(90deg,
        rgba(51, 51, 51, 0.5) 0%,
        rgba(216, 216, 216, 0) 100%);
  }
}

.divider-title__text {
  color: #1a1a2e;
  font-size: 40rpx;
  font-weight: bold;
  text-align: center;
  margin: 0 20rpx;
}

/* ===== 荣誉证书 ===== */
.cert-section {
  background: #ffffff;
  padding: 30rpx 0;
}

.cert-scroll {
  margin-top: 30rpx;
  padding-left: 49rpx;
  overflow-x: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
}

.cert-scroll__wrapper {
  display: flex;
  flex-direction: column;
  width: max-content;
}

.cert-scroll__row {
  display: flex;

  &:last-child {
    margin-bottom: 0;
  }
}

.cert-item {
  width: 239rpx;
  height: 265rpx;
  flex-shrink: 0;
  background: #ffffff;
  overflow: hidden;

  &:last-child {
    margin-right: 49rpx;
  }

  image {
    width: 100%;
    height: 265rpx;
    object-fit: cover;
  }
}

/* ===== 合作商家 ===== */
.partner-section {
  padding: 40rpx 0 80rpx;
}

.partner-list {
  margin-top: 30rpx;
  padding: 0 49rpx;
  overflow-x: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
}

.partner-list__row {
  display: flex;
  gap: 20rpx;
  margin-bottom: 20rpx;
  width: max-content;

  &:last-child {
    margin-bottom: 0;
  }
}

.partner-item {
  border-radius: 20rpx;
  width: 216rpx;
  height: 88rpx;
  flex-shrink: 0;
  overflow: hidden;

  &:last-child {
    margin-right: 49rpx;
  }

  image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

/* ===== 底部联系 ===== */
.footer {
  background: #ffffff;
  padding: 63rpx 44rpx;
  display: flex;
  justify-content: space-between;
}

.footer__company-name {
  color: #3d3d3d;
  font-size: 21rpx;
  font-weight: bold;
}

.footer__address {
  color: #666;
  font-size: 18rpx;
  margin-top: 8rpx;
}

.footer__divider {
  border-top: 1rpx solid #e2e2e2;
  margin: 24rpx 0;
}

.footer__phone {
  color: #1a1a2e;
  font-size: 21rpx;
}

.footer__qrcode {
  text-align: center;

  image {
    width: 152rpx;
    height: 152rpx;
  }
}

.footer__qrcode-label {
  color: #666;
  font-size: 18rpx;
  margin-top: 18rpx;
}

/* ===== 通用重置 ===== */
wx-button {
  border: none !important;
}

/* ===== 媒体预览 ===== */
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;

  &.video-fullscreen {
    z-index: 9998;
  }
}

.preview-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.preview-video,
.preview-image {
  width: 100%;
  height: 100%;
}

.arrows {
  position: fixed;
  top: 50%;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.leftarrows image,
.rightarrows image {
  width: 100rpx;
  height: 100rpx;
}

/* ===== 客服按钮 ===== */
.customer-service-btn {
  position: fixed;
  right: 0;
  bottom: 200rpx;
  width: 160rpx;
  height: 160rpx;
  z-index: 999;

  image {
    width: 160rpx;
    height: 160rpx;
  }
}
</style>
