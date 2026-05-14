<template>
  <view class="main">
    <VideoCarousel :videos="videoList" @play="onVideoPlay" />

    <image
      class="business-banner"
      src="http://cdn.xiaodingdang1.com/2026/05/13/b01ee0a56c40431a8d1a3534c0001f14.png?image_process=format,webp"
      mode="widthFix"
    ></image>

    <BusinessSystem
      v-if="businessSystemList.length > 0"
      title="宝妈小叮当"
      subtitle="业务系统"
      :list="businessSystemList"
      @click="goToCustomer"
    />

    <ProblemList
      v-if="productIntroList.length > 0"
      :list="productIntroList"
      :limit="4"
      @click="goToIntro"
      @more="goToIssueList"
    />

    <Partners :list="partnerList" />
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
import ProblemList from '@/pages/secondary/homepage/components/ProblemList.vue';
import SystemService from './components/SystemService.vue';
import BusinessSystem from '@/pages/secondary/homepage/components/BusinessSystem.vue';
import Partners from './components/Partners.vue';

const videoList = ref([]);
const productIntroList = ref([]);
const serviceLists = ref([]);
const businessSystemList = ref([]);
const partnerList = ref([]);

// ===== 工具方法 =====
const extractVideoUrl = (bannerVideos) => {
  if (!Array.isArray(bannerVideos)) return '';
  for (const item of bannerVideos) {
    if (typeof item === 'string' && item.includes('.mp4')) return item;
    if (item?.videoUrl) return item.videoUrl;
    if (item?.url) return item.url;
  }
  return '';
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
        .map((row) => ({
          enterpriseName: row.enterpriseName,
          coverImage: row.coverImage,
          videoUrl: extractVideoUrl(row.bannerVideos),
        }))
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
        (it) => (it?.serviceName || '').trim() !== '线上获客'
      );
    }
  } catch (error) {
    uni.showToast({ title: '获取服务列表失败', icon: 'none' });
  }
};

// ===== 跳转事件 =====
const onVideoPlay = (item) => {
  uni.navigateTo({
    url:
      '/pages/secondary/index/index?url=' +
      item.videoUrl +
      '&visitContent=宣传视频',
  });
};

const goToIntro = (item) => {
  if (item.introType == 2) {
    let url =
      '/pages/secondary/index/index?url=' +
      item.videoUrl +
      '&visitContent=' +
      item.title;
    if (item.coverImage) {
      url += '&coverImage=' + encodeURIComponent(item.coverImage);
    }
    uni.navigateTo({ url });
  } else {
    uni.navigateTo({
      url: '/pages/secondary/issueDetails/index?introId=' + item.introId,
    });
  }
};

const goToIssueList = () => {
  uni.navigateTo({ url: '/pages/secondary/issueList/index' });
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
  path: '/pages/secondary/system/index',
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
.business-banner {
  margin-top: 40rpx;
  display: block;
  width: 750rpx;
  height: 1688rpx;
}
</style>
