<template>
  <view class="main">

    <!-- 顶部头部：logo + slogan -->
    <view class="sys-header">
      <view class="sys-header__bar">
        <image class="sys-header__logo-img" src="/static/system/top_log.png" mode="heightFix"></image>
        <text class="sys-header__slogan">专注月子中心业务系统</text>
      </view>
    </view>

    <view class="sys-hero-video">
      <VideoCarousel :videos="videoList" :images="bannerImageList" @play="onVideoPlay" @image="onImagePreview" />
    </view>

    <!-- 关于宝妈小叮当系统 -->
    <view class="about-system-section">
      <text class="about-system-title">宝妈小叮当系统</text>
      <text class="about-system-desc">宝妈小叮当围绕月子中心“签单转化难、管理效率低、业务增长乏力”三大核心痛点研发，是集获客、转化、管理于一体的系统。帮助月子中心实现从流量获取到客户转化的全链路提效。</text>
    </view>


    <ProblemList v-if="productIntroList.length > 0" :list="productIntroList" :limit="8" @click="goToIntro"
      @more="goToIssueList" />

    <SystemBusiness v-if="businessSystemList.length > 0" title="宝妈小叮当" subtitle="业务系统" :list="businessSystemList"
      @click="goToCustomer" />

    <Partners :list="partnerList" />
    <ShareFloatBtn />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  onShow,
  onHide,
  onShareAppMessage,
  onShareTimeline,
} from '@dcloudio/uni-app';
import {
  getServiceList,
  getEnterpriseList,
  getProductIntroList,
} from '@/api/activity.js';
import basePoint from '@/utils/basePoint.js';
import VideoCarousel from './components/VideoCarousel.vue';
import ProblemList from '@/pages/index/components/ProblemList.vue';
import SystemBusiness from './components/SystemBusiness.vue';
import Partners from './components/Partners.vue';

const videoList = ref([]);
const bannerImageList = ref([]);
const productIntroList = ref([]);
const serviceLists = ref([]);
const businessSystemList = ref([]);
const partnerList = ref([]);
const isNavigatingVideo = ref(false);

// ===== 工具方法 =====
const normalizeBannerVideos = (bannerVideos) => {
  if (!Array.isArray(bannerVideos)) return [];
  return bannerVideos
    .map((item) => {
      if (typeof item === 'string') return item;
      return item?.videoUrl || item?.url || '';
    })
    .filter(Boolean);
};

const normalizeBannerImages = (bannerImages) => {
  if (!Array.isArray(bannerImages)) return [];
  return bannerImages
    .map((item) => {
      if (typeof item === 'string') return item;
      return item?.imageUrl || item?.url || '';
    })
    .filter(Boolean);
};

const formatRichText = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/gi, '');
};

// ===== 数据获取 =====
const fetchEnterpriseList = async () => {
  try {
    const response = await getEnterpriseList({ pageSize: 10, pageNum: 1 });
    if (response && Array.isArray(response.rows) && response.rows.length > 0) {
      const enterpriseVideos = response.rows
        .filter((row) => row.videoEnabled)
        .flatMap((row) =>
          normalizeBannerVideos(row.bannerVideos).map((videoUrl) => ({
            enterpriseName: row.enterpriseName,
            coverImage: row.coverImage,
            videoUrl,
          })),
        )
        .filter((row) => row.videoUrl && row.coverImage);
      videoList.value = enterpriseVideos.slice(0, 1);
      bannerImageList.value = normalizeBannerImages(
        response.rows[0].bannerImages,
      );
      partnerList.value = Array.isArray(response.rows[0].cooperationMerchants)
        ? response.rows[0].cooperationMerchants
        : [];
    }
  } catch (error) {
    uni.showToast({ title: '获取企业列表失败', icon: 'none' });
  }
};

const fetchProductIntroList = async () => {
  try {
    const response = await getProductIntroList({ pageSize: 8, pageNum: 1 });
    if (response && Array.isArray(response.rows) && response.rows.length > 0) {
      response.rows.forEach((item) => {
        item.introDetailFormat = formatRichText(item.introDetail);
      });
      productIntroList.value = response.rows;
    }
  } catch (error) {
    uni.showToast({ title: '获取产品介绍列表失败', icon: 'none' });
  }
};

const fetchServiceList = async () => {
  try {
    const response = await getServiceList({ pageSize: 10, pageNum: 1 });
    if (response && Array.isArray(response.rows) && response.rows.length > 0) {
      serviceLists.value = response.rows;
      // 业务系统模块排除 serviceName 为「线上获客」的项
      businessSystemList.value = response.rows.filter(
        (it) => (it?.serviceName || '').trim() !== '线上获客',
      );
    }
  } catch (error) {
    uni.showToast({ title: '获取服务列表失败', icon: 'none' });
  }
};

// ===== 跳转事件 =====
const onVideoPlay = (item) => {
  if (isNavigatingVideo.value) return;
  isNavigatingVideo.value = true;
  uni.navigateTo({
    url:
      '/pages/videoplay/index?url=' + item.videoUrl + '&visitContent=宣传视频',
    complete: () => {
      setTimeout(() => {
        isNavigatingVideo.value = false;
      }, 800);
    },
  });
};

const onImagePreview = (item) => {
  if (!item?.url) return;
  uni.previewImage({
    urls: bannerImageList.value,
    current: item.url,
    indicator: 'number',
    loop: true,
  });
};

const goToIntro = (item) => {
  if (item.introType == 2) {
    let url =
      '/pages/videoplay/index?url=' +
      item.videoUrl +
      '&visitContent=' +
      item.title;
    if (item.coverImage) {
      url += '&coverImage=' + encodeURIComponent(item.coverImage);
    }
    uni.navigateTo({ url });
  } else {
    uni.navigateTo({
      url: '/pages/issueDetails/index?introId=' + item.introId,
    });
  }
};

const goToIssueList = () => {
  uni.navigateTo({ url: '/pages/issueList/index' });
};

const goToCustomer = (item) => {
  uni.navigateTo({
    url: '/pages/customer/index?serviceId=' + item.serviceId,
  });
};

// ===== 生命周期 =====
onMounted(() => {
  fetchEnterpriseList();
  fetchProductIntroList();
  fetchServiceList();
});

onShow(async () => {
  await basePoint.trackingStart({ visitModule: '系统', visitContent: '系统' });
});

onHide(async () => {
  const trackingId = uni.getStorageSync('trackingId');
  if (trackingId) {
    await basePoint.trackingEnd({ id: trackingId });
  }
});

// ===== 分享 =====
onShareAppMessage(() => ({
  title: '系统',
  path: '/pages/system/index',
}));

onShareTimeline(() => ({
  title: '系统',
  query: '',
}));
</script>

<style scoped>
.main {
  background: #fff;
  min-height: 100vh;
  overflow: hidden;
}

/* 顶部头部：宽高比 1094 : 271，满屏宽 → 高约 186rpx */
.sys-header {
  height: 186rpx;
  box-sizing: border-box;
  background: linear-gradient(86deg, #6493f7 4%, #2e5fdc 97%);
  border-bottom-left-radius: 24rpx;
  border-bottom-right-radius: 24rpx;
}

.sys-header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 36rpx 40rpx 0;
}

/* 视频卡片上叠进头部弧形区 */
.sys-hero-video {
  margin-top: -75rpx;
  position: relative;
  z-index: 2;
}

.sys-header__logo-img {
  height: 66rpx;
  width: auto;
}

.sys-header__slogan {
  font-family: SourceHanSansCN-Revision, system-ui, -apple-system, sans-serif;
  font-size: 28rpx;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: 1rpx;
}

.system-hero {
  width: 750rpx;
  display: block;
}

.system-hero-bg {
  width: 750rpx;
  display: block;
}

.about-system-section {
  padding: 48rpx 44rpx 56rpx;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.about-system-title {
  display: block;
  font-family: SourceHanSansCN-Revision, system-ui, -apple-system, sans-serif;
  font-size: 44rpx;
  font-weight: bold;
  color: #000000;
  text-align: left;
  margin-bottom: 28rpx;
}

.about-system-desc {
  display: block;
  font-family: SourceHanSansCN-Revision, system-ui, -apple-system, sans-serif;
  font-size: 30rpx;
  color: rgba(0, 0, 0, 0.8);
  line-height: 52rpx;
  text-align: left;
}

.business-banner {
  margin-top: 40rpx;
  display: block;
  width: 750rpx;
  height: 1688rpx;
}
</style>
