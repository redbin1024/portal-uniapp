<template>
  <scroll-view
    class="page-scroll"
    scroll-y
    scroll-anchoring
    enhanced
    enable-passive
    bounces
    style="height: 100vh"
  >
    <view class="page-wrapper">
      <view
        class="video-banner reveal"
        :class="{ 'reveal--visible': visibleSet.has('video') }"
        data-reveal-id="video"
        @click="handleVideoClick(videoUrl)"
        v-if="videoUrl && videoEnabled"
      >
        <image
          :src="companyInfo.coverImage + '?image_process=format,webp'"
          mode="aspectFill"
          style="width: 100%; height: 100%; border-radius: 20rpx"
        ></image>
        <view class="play-button">
          <image
            src="http://cdn.xiaodingdang1.com/2025/10/22/2f504fbb11944ad8834f6c479f233281.png"
            class="play-icon"
          />
        </view>
      </view>

      <view
        class="system-service-wrapper reveal"
        :class="{ 'reveal--visible': visibleSet.has('service') }"
        data-reveal-id="service"
      >
        <view class="brand-header">
          <text class="brand-title">宝妈小叮当</text>
          <text class="brand-subtitle">专注月子系统开发服务</text>
        </view>
        <view class="service-list">
          <view
            class="service-card"
            v-for="(item, index) in serviceCardList"
            :key="index"
          >
            <view
              class="service-card-header"
              @click="navigateToServiceDetail(item)"
            >
              <text class="service-card-name">{{ item.serviceName }}</text>
              <image
                class="service-card-arrow"
                src="/static/right-arrow.svg"
                mode="aspectFit"
              ></image>
            </view>
            <view class="service-divider">
              <view class="service-divider-active"></view>
            </view>
            <view class="service-card-body">
              <view class="service-img-wrap">
                <image
                  v-if="item.serviceImage?.length"
                  class="service-card-img"
                  :src="getServiceCover(item, index)"
                  mode="aspectFill"
                ></image>
              </view>
              <view class="service-info">
                <text class="service-info-title">{{ item.serviceName }}</text>
                <view class="service-info-features">
                  <view
                    class="service-info-feature"
                    v-for="(feat, fi) in item.features"
                    :key="'feat-' + fi"
                  >
                    <view class="service-info-dot"></view>
                    <view class="service-info-feature-text">{{ feat }}</view>
                  </view>
                </view>
                <view class="service-btns">
                  <view
                    class="service-btn-primary"
                    @click="navigateToServiceDetail(item)"
                  >
                    <text class="service-btn-text">免费试用</text>
                  </view>
                  <view
                    class="service-btn-outline"
                    @click="navigateToServiceDetail(item)"
                  >
                    <text class="service-btn-text-outline">了解更多</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view
        class="problem-section reveal"
        :class="{ 'reveal--visible': visibleSet.has('problem') }"
        data-reveal-id="problem"
        v-if="problemItemList.length > 0"
      >
        <view class="problem-section-header">
          <text class="problem-section-title"
            >月子会所经营痛点&#10;你是否也有</text
          >
        </view>
        <view class="problem-list">
          <view
            class="problem-item"
            :class="{ 'problem-item-highlighted': index === 0 }"
            v-for="(item, index) in problemItemList"
            :key="index"
            @click="handleProblemClick(item)"
          >
            <text class="problem-item-title">{{ item.title }}</text>
            <text class="problem-item-desc">{{ item.introName }}</text>
          </view>
        </view>
        <view class="view-more" @click="handleViewMore">
          <text class="view-more-text">查看更多</text>
        </view>
      </view>

      <view
        class="partner-section reveal"
        :class="{ 'reveal--visible': visibleSet.has('partner') }"
        data-reveal-id="partner"
        v-if="partnerList.length > 0"
      >
        <view class="partner-section-header">
          <text class="partner-section-title">合作伙伴</text>
        </view>
        <view class="partner-grid">
          <view
            class="partner-item"
            v-for="(item, index) in partnerList"
            :key="index"
          >
            <image class="partner-logo" :src="item" mode="aspectFill"></image>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup>
import basePoint from '@/utils/basePoint.js';
import {
  onLoad,
  onShow,
  onHide,
  onShareAppMessage,
  onShareTimeline,
} from '@dcloudio/uni-app';
import {
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
  getCurrentInstance,
} from 'vue';
import {
  getServiceList,
  getEnterpriseList,
  getProductIntroList,
} from '@/api/activity.js';

// 分享配置
onShareAppMessage(() => ({
  title: '系统',
  path: '/pages/secondary/system/index',
}));

onShareTimeline(() => ({
  title: '系统',
  query: '',
}));

// 企业信息
const companyInfo = ref({});
const videoUrl = ref('');
const videoEnabled = ref(true);

// 系统服务卡片列表（排除第一个 banner 服务）
const serviceCardList = ref([]);

// 经营痛点列表
const problemItemList = ref([]);

// 合作伙伴列表
const partnerList = ref([]);

// 导航：查看视频
const handleVideoClick = (url) => {
  uni.navigateTo({
    url: '/pages/secondary/index/index?url=' + url + '&visitContent=宣传视频',
  });
};

// 导航：查看服务详情
const navigateToServiceDetail = (item) => {
  try {
    uni.navigateTo({
      url: '/pages/customer/index?serviceId=' + item.serviceId,
    });
  } catch (error) {
    console.error('序列化参数失败:', error);
    uni.showToast({ title: '参数传递失败', icon: 'none' });
  }
};

const getServiceCover = (item, index) => {
  let current = 0; //index === 3 ? 1 : 0;
  return `${item.serviceImage[current]}?image_process=format,webp`;
};

// 导航：查看痛点详情
const handleProblemClick = (item) => {
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

// 导航：查看更多痛点
const handleViewMore = () => {
  uni.navigateTo({ url: '/pages/secondary/issueList/index' });
};

// 获取企业信息
const fetchCompanyInfo = async () => {
  try {
    const response = await getEnterpriseList({ pageSize: 10, pageNum: 1 });
    if (response?.rows?.[0]) {
      companyInfo.value = response.rows[0];

      let video;
      if (Array.isArray(response.rows[0].bannerImages)) {
        response.rows[0].bannerImages.forEach((str) => {
          if (str.slice(-3) === 'mp4') {
            video = str;
          }
        });
      }
      videoUrl.value = video;
      videoEnabled.value = response.rows[0].videoEnabled;
      partnerList.value = Array.isArray(response.rows[0].cooperationMerchants)
        ? response.rows[0].cooperationMerchants
        : [];
    }
  } catch (error) {
    console.error('获取企业列表失败:', error);
    uni.showToast({ title: '获取企业列表失败', icon: 'none' });
  }
};

// 从 description HTML 中提取特性列表
const parseFeaturesFromDescription = (html) => {
  if (!html) return [];
  const liMatches = html.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);
  if (liMatches && liMatches.length > 0) {
    return liMatches
      .map((s) => s.replace(/<[^>]+>/g, '').trim())
      .filter(Boolean);
  }
  return html
    .replace(/<[^>]+>/g, '\n')
    .split(/\n|•|·/)
    .map((s) => s.trim())
    .filter(Boolean);
};

// 获取服务列表
const fetchServiceList = async () => {
  try {
    const response = await getServiceList({ pageSize: 10, pageNum: 1 });
    if (response?.rows?.length > 0) {
      serviceCardList.value = response.rows.slice(1).map((row) => ({
        ...row,
        features: parseFeaturesFromDescription(row.description),
      }));
    }
  } catch (error) {
    console.error('获取服务列表失败:', error);
    uni.showToast({ title: '获取服务列表失败', icon: 'none' });
  }
};

// 获取痛点列表
const fetchProblemList = async () => {
  try {
    const response = await getProductIntroList({ pageSize: 6, pageNum: 1 });
    if (response?.rows?.length > 0) {
      response.rows.forEach((item) => {
        item.introDetailFormat = stripHtmlTags(item.introDetail);
      });
      problemItemList.value = response.rows;
    }
  } catch (error) {
    console.error('获取产品介绍列表失败:', error);
    uni.showToast({ title: '获取产品介绍列表失败', icon: 'none' });
  }
};

// 滚动入场动效
const visibleSet = ref(new Set());
let revealObserver = null;

const setupRevealObserver = () => {
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }
  const instance = getCurrentInstance();
  revealObserver = uni.createIntersectionObserver(instance, {
    observeAll: true,
    thresholds: [0, 0.05],
  });
  revealObserver
    .relativeTo('.page-scroll', { bottom: 0 })
    .observe('.reveal', (res) => {
      if (res.intersectionRatio <= 0) return;
      const id = res.dataset && res.dataset.revealId;
      if (!id || visibleSet.value.has(id)) return;
      const next = new Set(visibleSet.value);
      next.add(id);
      visibleSet.value = next;
    });
};

// 数据加载后（含 v-if 的模块）重新启动观察
watch(
  () => [
    videoUrl.value,
    videoEnabled.value,
    problemItemList.value.length,
    partnerList.value.length,
  ],
  () => {
    nextTick(() => {
      setTimeout(setupRevealObserver, 100);
    });
  },
);

onBeforeUnmount(() => {
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }
});

// 页面加载
onMounted(() => {
  fetchServiceList();
  fetchCompanyInfo();
  fetchProblemList();
  nextTick(() => {
    setTimeout(setupRevealObserver, 100);
  });
});

// HTML 标签去除
const stripHtmlTags = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/gi, '');
};

// 页面展示埋点
onShow(async () => {
  await basePoint.trackingStart({ visitModule: '系统', visitContent: '系统' });
});

// 页面隐藏结束埋点
onHide(async () => {
  const trackingId = uni.getStorageSync('trackingId');
  if (trackingId) {
    await basePoint.trackingEnd({ id: trackingId });
  }
});
</script>

<style scoped>
.page-wrapper {
  background: #fff;
  min-height: 100vh;
  overflow: hidden;
}

/* 滚动入场：上浮 + 淐入 + 轻量 Z 轴缩放 */
.reveal {
  opacity: 0;
  transform: translate3d(0, 60rpx, 0) scale(0.94);
  transition:
    opacity 0.9s cubic-bezier(0.22, 0.61, 0.36, 1),
    transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.reveal--visible {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

.system-service-wrapper {
  padding: 0;
}

/* 视频 Banner */
.video-banner {
  width: 702rpx;
  height: 394rpx;
  border-radius: 20rpx;
  margin: 20rpx auto;
  position: relative;
}
.video-banner video {
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
}

/* 播放按钮 */
.play-button {
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
.play-button:hover {
  transform: translate(-50%, -50%) scale(1.1);
}
.play-button .play-icon {
  width: 80rpx;
  height: 80rpx;
}

/* 品牌标题 */
.brand-header {
  margin: 60rpx auto 36rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.brand-title {
  color: #000000;
  font-size: 44rpx;
  font-weight: bold;
  text-align: center;
  line-height: 60rpx;
}
.brand-subtitle {
  color: #000000;
  font-size: 44rpx;
  font-weight: bold;
  text-align: center;
  line-height: 60rpx;
}

/* 服务卡片 */
.service-list {
  padding: 0 26rpx 40rpx;
}
.service-card {
  width: 100%;
  border-radius: 24rpx;
  border: 1rpx solid #d9d9d9;
  background-color: #ffffff;
  box-shadow: 0rpx 6rpx 22rpx 0rpx rgba(220, 222, 229, 0.8);
  overflow: hidden;
  padding-bottom: 18rpx;
  margin-bottom: 24rpx;
}
.service-card-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 24rpx 0 24rpx;
  height: 64rpx;
}
.service-card-name {
  font-size: 28rpx;
  font-weight: 700;
  color: #000000;
  line-height: 40rpx;
}
.service-card-arrow {
  width: 28rpx;
  height: 28rpx;
  flex-shrink: 0;
}
.service-divider {
  width: 100%;
  height: 2rpx;
  background-color: #d9d9d9;
  margin-top: 12rpx;
}
.service-divider-active {
  width: 140rpx;
  height: 2rpx;
  background-color: #006dff;
  margin-left: 48rpx;
}
.service-card-body {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 18rpx;
  padding: 0 18rpx;
}
.service-img-wrap {
  width: 360rpx;
  height: 264rpx;
  border-radius: 16rpx;
  overflow: hidden;
  flex-shrink: 0;
}
.service-card-img {
  width: 100%;
  height: 100%;
}
.service-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 48rpx;
  padding-top: 26rpx;
  min-width: 0;
}
.service-info-title {
  font-size: 20rpx;
  font-weight: 700;
  color: #000000;
  line-height: 30rpx;
  margin-bottom: 12rpx;
}
.service-info-desc {
  font-size: 16rpx;
  font-weight: 400;
  color: #3d3d3d;
  line-height: 26rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  overflow: hidden;
}
.service-info-features {
  margin-top: 8rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}
.service-info-feature {
  display: flex;
  align-items: center;
  height: 28rpx;
}
.service-info-dot {
  width: 4rpx;
  height: 4rpx;
  border-radius: 50%;
  background: #3d3d3d;
  margin-right: 6rpx;
  flex-shrink: 0;
}
.service-info-feature-text {
  color: #3d3d3d;
  font-size: 16rpx;
  line-height: 28rpx;
}
.service-btns {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20rpx;
}
.service-btn-primary {
  width: 100rpx;
  height: 36rpx;
  border-radius: 8rpx;
  background-color: #006dff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14rpx;
}
.service-btn-text {
  font-size: 18rpx;
  color: #f4f5f9;
  font-weight: 500;
}
.service-btn-outline {
  width: 100rpx;
  height: 36rpx;
  border-radius: 8rpx;
  border: 1rpx solid #006dff;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.service-btn-text-outline {
  font-size: 18rpx;
  color: #006dff;
  font-weight: 500;
}

/* 合作伙伴模块 */
.partner-section {
  background-color: #ffffff;
  padding: 60rpx 26rpx 40rpx;
}
.partner-section-header {
  padding-bottom: 36rpx;
  text-align: center;
}
.partner-section-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #000000;
  line-height: 56rpx;
}
.partner-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12rpx;
}
.partner-item {
  background-color: #fbfbfb;
  height: 120rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.partner-logo {
  width: 100%;
  height: 100%;
}

/* 痛点模块 */
.problem-section {
  background-color: #f4f5f9;
  padding: 60rpx 26rpx 40rpx;
}
.problem-section-header {
  padding-bottom: 36rpx;
  text-align: center;
}
.problem-section-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #000000;
  line-height: 56rpx;
  text-align: center;
  white-space: pre;
}
.problem-list {
  display: flex;
  flex-direction: column;
}
.problem-item {
  width: 100%;
  background-color: #ffffff;
  border-radius: 24rpx;
  padding: 38rpx 36rpx;
  margin-bottom: 24rpx;
  box-shadow: 0rpx 2rpx 12rpx 0rpx rgba(0, 0, 0, 0.04);
}
.problem-item-highlighted {
  border: 2rpx solid transparent;
  background-image:
    linear-gradient(#ffffff, #ffffff),
    linear-gradient(91.3deg, #f178ff 0.37%, #006dff 99.68%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
.problem-item-title {
  display: block;
  font-size: 28rpx;
  font-weight: 700;
  line-height: 40rpx;
  color: #3d3d3d;
  margin-bottom: 16rpx;
}
.problem-item-desc {
  display: block;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 36rpx;
  color: rgba(61, 61, 61, 0.6);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
}

/* 查看更多 */
.view-more {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 24rpx;
  width: 100%;
  height: 72rpx;
  margin: 6rpx 0 0 0;
  box-shadow: 0rpx 2rpx 12rpx 0rpx rgba(0, 0, 0, 0.04);
}
.view-more-text {
  font-size: 24rpx;
  font-weight: 400;
  color: #000000;
  text-align: center;
}
</style>
