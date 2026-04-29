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
    <view class="page">
      <!-- 顶部 Banner（sticky 固定） -->
      <view class="hero" :style="heroStyle"></view>

      <view class="page__content">
        <!-- 合作伙伴案例 -->
        <view
          class="partner-section reveal"
          :class="{ 'reveal--visible': visibleSet.has('partner') }"
          data-reveal-id="partner"
          v-if="enterpriseInfo.videoEnabled"
        >
          <view class="partner-section__grid">
            <view
              class="partner-section__item"
              v-for="(item, index) in partnerCaseList"
              :key="index"
            >
              <view
                class="partner-card"
                @click="
                  openPartnerCase(
                    item.caseImages,
                    item.coverImage,
                    item.caseTitle,
                  )
                "
              >
                <image
                  class="partner-card__cover"
                  :src="toWebpUrl(item.coverImage)"
                  mode="aspectFill"
                />
                <view class="partner-card__play-overlay">
                  <image
                    class="partner-card__play-icon"
                    src="http://cdn.xiaodingdang1.com/2025/10/22/2f504fbb11944ad8834f6c479f233281.png"
                  />
                </view>
              </view>
            </view>
          </view>

          <view class="partner-section__more" @click="goToPartnerListPage">
            <view>查看更多</view>
            <view>></view>
          </view>
        </view>

        <!-- 宣传 Banner 图 -->
        <view
          class="partner-section__banner reveal"
          :class="{ 'reveal--visible': visibleSet.has('banner') }"
          data-reveal-id="banner"
          v-if="enterpriseInfo.bannerImages && enterpriseInfo.bannerImages[0]"
        >
          <image
            class="partner-section__banner-image"
            :src="toWebpUrl(enterpriseInfo.bannerImages[0])"
            mode="aspectFill"
          ></image>
        </view>

        <!-- 全域流量转化 -->
        <view
          class="conversion-section reveal"
          :class="{ 'reveal--visible': visibleSet.has('conversion') }"
          data-reveal-id="conversion"
        >
          <image
            class="conversion-section__bg"
            src="/static/conversion-bg.png"
            mode="aspectFill"
          />
          <view class="conversion-section__title">
            <text class="conversion-section__brand">天天拓客</text>
            <text class="conversion-section__slogan">全域流量高效转化</text>
          </view>
          <view class="conversion-section__card">
            <image
              class="conversion-section__card-deco"
              src="/static/conversion-card-deco.png"
              mode="aspectFill"
            />
            <view class="conversion-section__card-content">
              <text class="conversion-section__card-line1"
                >充足的客资是业绩</text
              >
              <text class="conversion-section__card-line2">唯一的保障</text>
              <text class="conversion-section__card-desc"
                >全域全域引流精准锁客</text
              >
              <view class="conversion-section__card-btn">
                <text>了解详情</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 业务系统 -->
        <view
          class="business-section reveal"
          :class="{ 'reveal--visible': visibleSet.has('business') }"
          data-reveal-id="business"
          v-if="businessSystemList.length > 0"
        >
          <view class="business-section__heading">
            <view class="business-section__brand">宝妈小叮当</view>
            <view class="business-section__slogan">专注业务系统</view>
          </view>

          <view
            class="business-card"
            v-for="(item, index) in businessSystemList"
            :key="'biz-' + index"
            @click="goToServiceDetail(item)"
          >
            <view class="business-card__header">
              <view class="business-card__title">{{ item.title }}</view>
              <image
                class="business-card__arrow-icon"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgMkwxMCA2TDQgMTAiIHN0cm9rZT0iI0E3QTdBNyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4="
                mode="aspectFit"
              />
            </view>
            <view class="business-card__divider">
              <view class="business-card__divider-bar"></view>
            </view>
            <view class="business-card__body">
              <image
                class="business-card__image"
                :src="item.image"
                mode="aspectFill"
              />
              <view class="business-card__content">
                <view class="business-card__subtitle">{{ item.title }}</view>
                <view class="business-card__features">
                  <view
                    class="business-card__feature"
                    v-for="(feat, fi) in item.features"
                    :key="'feat-' + fi"
                  >
                    <view class="business-card__dot"></view>
                    <view class="business-card__feature-text">{{ feat }}</view>
                  </view>
                </view>
                <view class="business-card__actions">
                  <view
                    class="business-card__btn business-card__btn--primary"
                    @click.stop="goToServiceDetail(item)"
                    >免费试用</view
                  >
                  <view
                    class="business-card__btn business-card__btn--ghost"
                    @click.stop="goToServiceDetail(item)"
                    >了解更多</view
                  >
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 管理系统 -->
        <view
          class="management-section reveal"
          :class="{ 'reveal--visible': visibleSet.has('management') }"
          data-reveal-id="management"
          v-if="managementItem.serviceId"
        >
          <view class="management-section__heading">
            <view class="management-section__brand">宝妈小叮当</view>
            <view class="management-section__slogan">专注管理系统</view>
          </view>

          <view
            class="management-card"
            @click="goToServiceDetail(managementItem)"
          >
            <view class="management-card__header">
              <view class="management-card__title">{{
                managementItem.title
              }}</view>
              <image
                class="management-card__arrow-icon"
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgMkwxMCA2TDQgMTAiIHN0cm9rZT0iI0E3QTdBNyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4="
                mode="aspectFit"
              />
            </view>
            <view class="management-card__divider">
              <view class="management-card__divider-bar"></view>
            </view>

            <image
              class="management-card__image"
              :src="managementItem.image"
              mode="aspectFill"
            />

            <view class="management-card__subtitle">{{
              managementItem.subtitle
            }}</view>

            <view class="management-card__features">
              <view
                class="management-card__feature"
                v-for="(feat, fi) in managementItem.features"
                :key="'mfeat-' + fi"
              >
                <view class="management-card__dot"></view>
                <view class="management-card__feature-text">{{ feat }}</view>
              </view>
            </view>

            <view class="management-card__actions">
              <view
                class="management-card__btn management-card__btn--primary"
                @click.stop="goToServiceDetail(managementItem)"
                >免费试用</view
              >
              <view
                class="management-card__btn management-card__btn--ghost"
                @click.stop="goToServiceDetail(managementItem)"
                >了解更多</view
              >
            </view>
          </view>
        </view>

        <!-- 经营痛点 -->
        <view
          class="problem-section reveal"
          :class="{ 'reveal--visible': visibleSet.has('problem') }"
          data-reveal-id="problem"
          v-if="productIntroList.length > 0"
        >
          <view class="problem-section__heading">
            <view class="problem-section__title-main">月子会所经营痛点</view>
            <view class="problem-section__title-sub">你是否也有</view>
          </view>

          <view class="problem-section__list">
            <view
              class="problem-card"
              v-for="(item, index) in productIntroList.slice(0, 3)"
              :key="'problem-' + index"
              @click="handleIntroClick(item)"
            >
              <view class="problem-card__inner">
                <view class="problem-card__title">{{ item.title || '' }}</view>
                <view class="problem-card__desc">{{ item.introName }}</view>
              </view>
            </view>
          </view>

          <view class="problem-section__more" @click="goToIssueListPage">
            查看更多
          </view>
        </view>

        <!-- 荣誉证书 -->
        <view
          class="surface-section reveal"
          :class="{ 'reveal--visible': visibleSet.has('certificate') }"
          data-reveal-id="certificate"
        >
          <view class="certificate-section">
            <view class="section-header">
              <view class="section-header__row">
                <view class="section-header__title">荣誉证书</view>
              </view>
            </view>

            <swiper
              class="certificate-section__swiper"
              :indicator-dots="false"
              :autoplay="true"
              :interval="3000"
              :duration="500"
              :circular="true"
            >
              <swiper-item
                v-for="(page, pi) in certificatePages"
                :key="'cert-page-' + pi"
              >
                <view class="certificate-section__grid">
                  <view
                    class="certificate-section__card"
                    v-for="(certificate, ci) in page"
                    :key="ci"
                  >
                    <view class="certificate-section__image-wrap">
                      <image
                        class="certificate-section__image"
                        :src="toWebpUrl(certificate)"
                        mode="aspectFit"
                      />
                    </view>
                  </view>
                </view>
              </swiper-item>
            </swiper>
          </view>
        </view>

        <!-- 页脚：Logo 与企业地址 -->
        <view
          class="footer-info reveal"
          :class="{ 'reveal--visible': visibleSet.has('footer') }"
          data-reveal-id="footer"
        >
          <image
            class="footer-info__logo"
            src="http://cdn.xiaodingdang1.com/2025/11/07/c6dd442174ea42628e4c8a5fc0a58617.png"
          ></image>
          <view class="footer-info__address">{{
            enterpriseInfo.enterpriseAddress
          }}</view>
        </view>
      </view>

      <!-- 悬浮客服按钮 -->
      <view class="customer-service">
        <button class="customer-service__button" open-type="contact">
          <image
            class="customer-service__image"
            src="http://cdn.xiaodingdang1.com/2025/09/29/84932e513ebd49d093825177c28edf83.png"
            mode="aspectFit"
          />
        </button>
      </view>
    </view>
  </scroll-view>
</template>
<script setup>
import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
  getCurrentInstance,
} from 'vue';
import {
  onShow,
  onHide,
  onShareAppMessage,
  onShareTimeline,
} from '@dcloudio/uni-app';
import {
  getEnterpriseList,
  getServiceList,
  getcaseList,
  getProductIntroList,
} from '@/api/activity.js';
import basePoint from '@/utils/basePoint.js';

const enterpriseInfo = ref({});
const partnerCaseList = ref([]);
const productIntroList = ref([]);

const businessSystemList = ref([]);
const managementItem = ref({});

const certificatePages = computed(() => {
  const certs = enterpriseInfo.value.honorCertificates || [];
  const pages = [];
  for (let i = 0; i < certs.length; i += 6) {
    pages.push(certs.slice(i, i + 6));
  }
  return pages;
});

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

const mapServiceToBusinessItem = (item) => {
  return {
    serviceId: item.serviceId || '',
    title: item.serviceName || item.title || '',
    subtitle: item.subtitle || '',
    image:
      (Array.isArray(item.serviceImage)
        ? item.serviceImage[0]
        : item.serviceImage) ||
      item.image ||
      item.coverImage ||
      '',
    features: Array.isArray(item.features)
      ? item.features
      : parseFeaturesFromDescription(item.description),
  };
};

const fetchBusinessSystemList = async () => {
  try {
    const rows = getResponseRows(
      await getServiceList({ pageSize: 10, pageNum: 1 }),
    );
    if (rows.length === 0) return;
    // 业务系统卡片：跳过首个 banner 服务（与系统页面一致），取接下来的 3 个
    const business = rows.slice(1, 4).map(mapServiceToBusinessItem);
    if (business.length > 0) {
      businessSystemList.value = business;
    }
    // 管理系统卡片：取第 5 个，若无则取最后一个
    const mgmtRow = rows[4] || rows[rows.length - 1];
    if (mgmtRow) {
      managementItem.value = mapServiceToBusinessItem(mgmtRow);
    }
  } catch (error) {
    uni.showToast({
      title: '获取业务系统列表失败',
      icon: 'none',
    });
  }
};

const getResponseRows = (response) => {
  return Array.isArray(response?.rows) ? response.rows : [];
};

const toWebpUrl = (url) => {
  if (!url) return '';
  return `${url}${url.includes('?') ? '&' : '?'}image_process=format,webp`;
};

const heroStyle = computed(() => {
  const bg = enterpriseInfo.value?.enterpriseLogo;
  if (!bg) return {};
  return { backgroundImage: `url(${toWebpUrl(bg)})` };
});

const openPartnerCase = (videoUrl, coverImage, visitContent) => {
  uni.navigateTo({
    url:
      '/pages/secondary/index/index?url=' +
      encodeURIComponent(videoUrl || '') +
      '&coverImage=' +
      encodeURIComponent(coverImage || '') +
      '&visitContent=' +
      encodeURIComponent(visitContent || ''),
  });
};

const goToPartnerListPage = () => {
  uni.navigateTo({
    url: '/pages/secondary/businesspartner/index',
  });
};

const goToIssueListPage = () => {
  uni.navigateTo({
    url: '/pages/secondary/issueList/index',
  });
};

const fetchPartnerCaseList = async () => {
  try {
    const rows = getResponseRows(
      await getcaseList({ pageSize: 9, pageNum: 1 }),
    );
    partnerCaseList.value = rows;
  } catch (error) {
    uni.showToast({
      title: '获取合作商家失败',
      icon: 'none',
    });
  }
};

const fetchProductIntroList = async () => {
  try {
    const rows = getResponseRows(
      await getProductIntroList({ pageSize: 10, pageNum: 1 }),
    );
    productIntroList.value = rows;
  } catch (error) {
    uni.showToast({
      title: '获取产品介绍列表失败',
      icon: 'none',
    });
  }
};

const fetchEnterpriseInfo = async () => {
  try {
    const rows = getResponseRows(
      await getEnterpriseList({ pageSize: 10, pageNum: 1 }),
    );
    if (rows.length > 0) {
      enterpriseInfo.value = rows[0] || {};
      uni.setStorageSync('videoEnabled', !!rows[0]?.videoEnabled);
    }
  } catch (error) {
    uni.showToast({
      title: '获取企业信息失败',
      icon: 'none',
    });
  }
};

const handleIntroClick = (item) => {
  if (item.introType == 2) {
    uni.navigateTo({
      url:
        '/pages/secondary/index/index?url=' +
        encodeURIComponent(item.videoUrl || '') +
        '&visitContent=' +
        encodeURIComponent(item.title || ''),
    });
  } else {
    uni.navigateTo({
      url: '/pages/secondary/issueDetails/index?introId=' + item.introId,
    });
  }
};

const goToServiceDetail = (item) => {
  uni.navigateTo({
    url: '/pages/customer/index?serviceId=' + item.serviceId,
  });
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

onMounted(() => {
  fetchEnterpriseInfo();
  fetchProductIntroList();
  fetchPartnerCaseList();
  fetchBusinessSystemList();
  nextTick(() => {
    setTimeout(setupRevealObserver, 100);
  });
});

// 数据加载后（含 v-if 的模块）重新启动观察
watch(
  () => [
    enterpriseInfo.value.videoEnabled,
    enterpriseInfo.value.bannerImages?.length,
    productIntroList.value.length,
    businessSystemList.value.length,
    managementItem.value.serviceId,
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

onShow(async () => {
  await basePoint.trackingStart({
    visitModule: '首页',
    visitContent: '首页',
  });
});

onHide(async () => {
  const trackingId = uni.getStorageSync('trackingId');
  if (trackingId) {
    await basePoint.trackingEnd({
      id: trackingId,
    });
  }
});

onShareAppMessage(() => {
  return {
    title: enterpriseInfo.value.enterpriseName || '天天拓客',
    path: '/pages/secondary/homepage/index',
    imageUrl: enterpriseInfo.value.enterpriseLogo || '',
  };
});

onShareTimeline(() => {
  return {
    title: enterpriseInfo.value.enterpriseName || '天天拓客',
    query: '',
    imageUrl: enterpriseInfo.value.enterpriseLogo || '',
  };
});
</script>

<style lang="scss" scoped>
.page {
  background-color: #f7f7f7;
  min-height: 100vh;
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

.hero {
  position: sticky;
  top: 0;
  z-index: 0;
  width: 100%;
  height: 750rpx;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.page__content {
  position: relative;
  z-index: 1;
  margin-top: -40rpx;
  background: #ffffff;
  border-top-left-radius: 52rpx;
  border-top-right-radius: 52rpx;
  overflow: hidden;
}

.conversion-section {
  position: relative;
  width: 750rpx;
  height: 560rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.conversion-section__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.conversion-section__title {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 36rpx;
}

.conversion-section__brand {
  color: #000000;
  font-size: 40rpx;
  font-weight: 700;
  line-height: 56rpx;
}

.conversion-section__slogan {
  font-size: 40rpx;
  font-weight: 700;
  line-height: 56rpx;
  background: linear-gradient(90deg, #006eee 0%, #00bdfe 94%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.conversion-section__card {
  position: relative;
  z-index: 3;
  width: 702rpx;
  height: 330rpx;
  margin-top: 24rpx;
  border-radius: 16rpx;
  box-shadow: 0 8rpx 32rpx 0 #c4e2f1;
  overflow: hidden;
}

.conversion-section__card-deco {
  position: absolute;
  right: -4rpx;
  top: -118rpx;
  width: 794rpx;
  height: 506rpx;
  z-index: 1;
}

.conversion-section__card-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 256rpx;
  height: 192rpx;
  margin-left: 48rpx;
  margin-top: 70rpx;
}

.conversion-section__card-line1 {
  color: #000000;
  font-size: 32rpx;
  font-weight: 700;
  line-height: 48rpx;
}

.conversion-section__card-line2 {
  font-size: 32rpx;
  font-weight: 700;
  line-height: 48rpx;
  background: linear-gradient(90deg, #006eee 0%, #00bdfe 94%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.conversion-section__card-desc {
  color: rgba(61, 61, 61, 0.6);
  font-size: 22rpx;
  line-height: 32rpx;
  margin-top: 16rpx;
}

.conversion-section__card-btn {
  width: 100rpx;
  height: 36rpx;
  background: #006dff;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 28rpx;
}

.conversion-section__card-btn text {
  color: #f4f5f9;
  font-size: 14rpx;
  font-weight: 500;
  line-height: 20rpx;
}

.section-header {
  display: flex;
  justify-content: center;
  width: 100%;
}

.section-header__row {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.section-header__title {
  color: #000000;
  font-weight: bold;
  font-size: 40rpx;
}

.section-header__subtitle {
  color: #d6d4d4;
  font-size: 28rpx;
}

.section-header__subtitle--muted {
  color: #9ca2be;
}

.section-header__more {
  font-size: 33rpx;
  color: #313131;
  padding: 6rpx 16rpx;
  border-radius: 6rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.partner-section {
  background: #ffffff;
  padding: 60rpx 26rpx 40rpx;
}

.partner-section__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
}

.partner-section__item {
  width: 224rpx;
  height: 340rpx;
  border-radius: 20rpx;
  position: relative;
}

.partner-card {
  width: 224rpx;
  height: 340rpx;
  border-radius: 20rpx;
  overflow: hidden;
  position: relative;
}

.partner-card__cover {
  width: 224rpx;
  height: 340rpx;
  border-radius: 20rpx;
}

.partner-card__play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 100%;
  height: 100%;
  opacity: 0.5;
}

.partner-card__play-icon {
  width: 80rpx;
  height: 80rpx;
}

.partner-section__more {
  display: flex;
  justify-content: center;
  background: #f3f5fb;
  border-radius: 8rpx;
  width: 100%;
  height: 88rpx;
  color: #313131;
  font-size: 30rpx;
  line-height: 88rpx;
  margin: 24rpx 0 0 0;
}

.partner-section__banner {
  width: 100%;
  height: 1440rpx;
}

.partner-section__banner-image {
  width: 100%;
  height: 100%;
}

.problem-section {
  background: #f4f5fa;
  padding: 60rpx 26rpx 40rpx;
}

.problem-section__heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 36rpx;
}

.problem-section__title-main {
  color: #000000;
  font-size: 40rpx;
  font-weight: 700;
  line-height: 56rpx;
}

.problem-section__title-sub {
  color: #000000;
  font-size: 40rpx;
  font-weight: 700;
  line-height: 56rpx;
}

.problem-section__list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.problem-card {
  background: linear-gradient(91deg, #f178ff 0%, #006dff 100%);
  border-radius: 24rpx;
  padding: 2rpx;
}

.problem-card__inner {
  background: #ffffff;
  border-radius: 22rpx;
  padding: 38rpx 32rpx;
}

.problem-card__title {
  color: #3d3d3d;
  font-size: 28rpx;
  font-weight: 700;
  line-height: 40rpx;
  margin-bottom: 16rpx;
}

.problem-card__desc {
  color: rgba(61, 61, 61, 0.6);
  font-size: 24rpx;
  font-weight: 400;
  line-height: 28rpx;
}

.problem-section__more {
  margin-top: 28rpx;
  background: #ffffff;
  border-radius: 16rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  font-size: 30rpx;
  font-weight: 500;
}

.business-section {
  background: #ffffff;
  padding: 60rpx 26rpx 40rpx;
}

.business-section__heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 36rpx;
}

.business-section__brand {
  color: #000000;
  font-size: 44rpx;
  font-weight: 700;
  line-height: 60rpx;
}

.business-section__slogan {
  font-size: 40rpx;
  font-weight: 700;
  line-height: 56rpx;
  margin-top: 4rpx;
  background: linear-gradient(90deg, #006eee 0%, #00bdfe 94%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.business-card {
  background: #ffffff;
  border: 1rpx solid #d9d9d9;
  border-radius: 24rpx;
  padding: 23rpx 22rpx 26rpx 22rpx;
  margin-bottom: 24rpx;
  box-shadow: 0rpx 6rpx 22rpx 0rpx rgba(220, 222, 229, 0.8);
}

.business-card:last-child {
  margin-bottom: 0;
}

.business-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.business-card__title {
  color: #000000;
  font-size: 28rpx;
  font-weight: 700;
}

.business-card__arrow {
  color: #9aa0b4;
  font-size: 18rpx;
  line-height: 18rpx;
  width: 10rpx;
  height: 18rpx;
}

.business-card__divider {
  height: 2rpx;
  background: #d9d9d9;
  margin-top: 12rpx;
  position: relative;
  width: 100%;
}

.business-card__divider-bar {
  position: absolute;
  left: 0;
  top: 0;
  width: 140rpx;
  height: 2rpx;
  background: #006dff;
}

.business-card__body {
  display: flex;
  margin-top: 18rpx;
}

.business-card__image {
  width: 368rpx;
  height: 264rpx;
  border-radius: 16rpx;
  flex-shrink: 0;
}

.business-card__content {
  flex: 1;
  margin-left: 48rpx;
  display: flex;
  flex-direction: column;
  padding-top: 20rpx;
}

.business-card__subtitle {
  color: #000000;
  font-size: 20rpx;
  font-weight: 700;
  line-height: 30rpx;
}

.business-card__features {
  margin-top: 12rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}

.business-card__feature {
  display: flex;
  align-items: center;
  height: 28rpx;
}

.business-card__dot {
  width: 4rpx;
  height: 4rpx;
  border-radius: 50%;
  background: #3d3d3d;
  margin-right: 6rpx;
  flex-shrink: 0;
}

.business-card__feature-text {
  color: #3d3d3d;
  font-size: 16rpx;
  line-height: 28rpx;
}

.business-card__actions {
  display: flex;
  gap: 14rpx;
  margin-top: 20rpx;
}

.business-card__btn {
  width: 100rpx;
  height: 34rpx;
  border-radius: 8rpx;
  font-size: 12rpx;
  line-height: 34rpx;
  text-align: center;
  padding: 0;
}

.business-card__btn--primary {
  background: #006dff;
  color: #f4f5f9;
}

.business-card__btn--ghost {
  background: #ffffff;
  color: #006dff;
  border: 1rpx solid #006dff;
}

.management-section {
  background: #ffffff;
  padding: 60rpx 26rpx 40rpx;
}

.management-section__heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 36rpx;
}

.management-section__brand {
  color: #000000;
  font-size: 44rpx;
  font-weight: 700;
  line-height: 60rpx;
}

.management-section__slogan {
  font-size: 40rpx;
  font-weight: 700;
  line-height: 56rpx;
  margin-top: 4rpx;
  background: linear-gradient(90deg, #006eee 0%, #00bdfe 94%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.management-card {
  background: #ffffff;
  border: 1rpx solid #d9d9d9;
  border-radius: 24rpx;
  padding: 23rpx 22rpx 26rpx 22rpx;
  margin-bottom: 0;
  box-shadow: 0rpx 6rpx 22rpx 0rpx rgba(220, 222, 229, 0.8);
}

.management-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.management-card__title {
  color: #000000;
  font-size: 28rpx;
  font-weight: 700;
}

.management-card__divider {
  height: 2rpx;
  background: #d9d9d9;
  margin-top: 12rpx;
  position: relative;
  width: 100%;
}

.management-card__divider-bar {
  position: absolute;
  left: 0;
  top: 0;
  width: 140rpx;
  height: 2rpx;
  background: #006dff;
}

.management-card__image {
  width: 100%;
  height: 380rpx;
  border-radius: 16rpx;
  margin-top: 18rpx;
}

.management-card__subtitle {
  color: #000000;
  font-size: 24rpx;
  font-weight: 700;
  line-height: 36rpx;
  margin-top: 20rpx;
}

.management-card__features {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-top: 12rpx;
}

.management-card__feature {
  display: flex;
  align-items: center;
  height: 28rpx;
}

.management-card__dot {
  width: 4rpx;
  height: 4rpx;
  border-radius: 50%;
  background: #3d3d3d;
  margin-right: 6rpx;
  flex-shrink: 0;
}

.management-card__feature-text {
  color: #3d3d3d;
  font-size: 16rpx;
  line-height: 28rpx;
}

.management-card__actions {
  display: flex;
  gap: 14rpx;
  margin-top: 20rpx;
}

.management-card__btn {
  width: 100rpx;
  height: 34rpx;
  border-radius: 8rpx;
  font-size: 12rpx;
  line-height: 34rpx;
  text-align: center;
  padding: 0;
}

.management-card__btn--primary {
  background: #006dff;
  color: #f4f5f9;
}

.management-card__btn--ghost {
  background: #ffffff;
  color: #006dff;
  border: 1rpx solid #006dff;
}

.surface-section {
  background: #ffffff;
}

.certificate-section {
  background: #f4f5fa;
  padding: 60rpx 26rpx 40rpx;
}

.certificate-section__swiper {
  height: 580rpx;
  margin-top: 36rpx;
}

.certificate-section__grid {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  align-content: flex-start;
}

.certificate-section__card {
  width: calc(33.333% - 16rpx);
  margin-right: 24rpx;
  margin-bottom: 24rpx;
  background: #ffffff;
  border-radius: 16rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20rpx;
  box-sizing: border-box;
}

.certificate-section__card:nth-child(3n) {
  margin-right: 0;
}

.certificate-section__image-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.certificate-section__image {
  width: 100%;
  height: 240rpx;
  object-fit: contain;
}

.footer-info {
  background: #ffffff;
  padding: 40rpx 42rpx 60rpx 42rpx;
}

.footer-info__logo {
  width: 170rpx;
  height: 48rpx;
}

.footer-info__address {
  color: rgba(0, 0, 0, 0.6);
  font-size: 24rpx;
  font-weight: 400;
  line-height: 34rpx;
  margin-top: 13rpx;
}

.customer-service {
  position: fixed;
  right: 0;
  bottom: 140rpx;
  width: 160rpx;
  height: 160rpx;
  z-index: 999;
}

.customer-service__button {
  padding: 0;
  background: none;
  width: 160rpx;
  height: 160rpx;
  overflow: hidden;
  border: none;
  border-radius: 0;
}

.customer-service__button::after {
  border: none;
}

.customer-service__image {
  width: 100%;
  height: 100%;
}
wx-button:after {
  border: none;
}

/* ===== 交互动效 ===== */

/* 卡片按压反馈 */
.business-card,
.management-card,
.problem-card,
.certificate-section__card,
.conversion-section__card,
.partner-card,
.partner-section__more,
.problem-section__more {
  transition:
    transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.2s ease;
}
.business-card:active,
.management-card:active,
.problem-card:active,
.certificate-section__card:active,
.conversion-section__card:active,
.partner-card:active,
.partner-section__more:active,
.problem-section__more:active {
  transform: scale(0.97);
}

/* 按钮按压反馈 */
.business-card__btn,
.management-card__btn,
.conversion-section__card-btn {
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;
}
.business-card__btn:active,
.management-card__btn:active,
.conversion-section__card-btn:active {
  transform: scale(0.92);
  opacity: 0.8;
}

/* 分割线展开动画 */
@keyframes dividerExpand {
  from {
    width: 0;
  }
  to {
    width: 140rpx;
  }
}
.business-card__divider-bar,
.management-card__divider-bar {
  animation: dividerExpand 0.6s ease-out 0.15s both;
}

/* 箭头点击微动 */
.business-card__arrow-icon,
.management-card__arrow-icon {
  width: 24rpx;
  height: 24rpx;
  transition: transform 0.2s ease;
}
.business-card:active .business-card__arrow-icon,
.management-card:active .management-card__arrow-icon {
  transform: translateX(6rpx);
}

/* 客服按钮持续浮动 */
@keyframes floatY {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12rpx);
  }
}
.customer-service {
  animation: floatY 3s ease-in-out infinite;
}
</style>
