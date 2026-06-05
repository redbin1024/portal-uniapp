<template>
  <view class="main">
    <view class="system-hero">
      <image class="system-hero-bg" src="http://cdn.xiaodingdang1.com/2026/06/04/db67846d9c5f43f9bed93d42278f040f.png"
        mode="aspectFill" />
      <view class="system-hero-content">
        <text class="system-hero-title">关于宝妈小叮当</text>
        <text class="system-hero-subtitle">宝妈小叮当是天天拓客旗下，专为解决”月子中心有客户、
          但转化难”痛点而生的智能签单系统。解决月子中心"转化差、流失高、管理乱”的
          顽疾，让每一条客资，都最大可能转化为实打实的业绩。</text>
      </view>
    </view>

    <VideoCarousel :videos="videoList" @play="onVideoPlay" />

    <image class="business-banner"
      src="http://cdn.xiaodingdang1.com/2026/05/22/87c4f3899c114908adf6862a0c40c0ab.jpg?image_process=format,webp"
      mode="widthFix"></image>

    <BusinessSystem v-if="businessSystemList.length > 0" title="宝妈小叮当" subtitle="业务系统" :list="businessSystemList"
      @click="goToCustomer" />

    <ProblemList v-if="productIntroList.length > 0" :list="productIntroList" :limit="4" @click="goToIntro"
      @more="goToIssueList" />

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
import AboutSection from '@/pages/index/components/AboutSection.vue';
import BusinessSystem from '@/pages/index/components/BusinessSystem.vue';
import Partners from './components/Partners.vue';

const videoList = ref([]);
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

const formatRichText = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/gi, '');
};

// ===== 数据获取 =====
const fetchEnterpriseList = async () => {
  try {
    const response = await getEnterpriseList({ pageSize: 10, pageNum: 1 });
    if (response && Array.isArray(response.rows) && response.rows.length > 0) {
      videoList.value = response.rows
        .filter((row) => row.videoEnabled)
        .flatMap((row) =>
          normalizeBannerVideos(row.bannerVideos).map((videoUrl) => ({
            enterpriseName: row.enterpriseName,
            coverImage: row.coverImage,
            videoUrl,
          })),
        )
        .filter((row) => row.videoUrl && row.coverImage);
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
    const response = await getProductIntroList({ pageSize: 6, pageNum: 1 });
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

.system-hero {
  position: relative;
  width: 750rpx;
  height: 834rpx;
  overflow: hidden;
}

.system-hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 750rpx;
  height: 834rpx;
  z-index: 1;
}

.system-hero-content {
  position: absolute;
  top: 180rpx;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 40rpx;
}

.system-hero-title {
  font-family: SourceHanSansCN-Revision, system-ui, -apple-system, sans-serif;
  font-size: 46rpx;
  font-weight: bold;
  line-height: 56rpx;
  text-align: center;
  margin-bottom: 24rpx;
  background: linear-gradient(90deg, #006eee 53%, #00bdfe 97%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.system-hero-subtitle {
  font-family: SourceHanSansCN-Revision, system-ui, -apple-system, sans-serif;
  font-size: 27rpx;
  font-weight: normal;
  line-height: 48rpx;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
}

.business-banner {
  margin-top: 40rpx;
  display: block;
  width: 750rpx;
  height: 1688rpx;
}
</style>
