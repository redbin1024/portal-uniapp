<template>
  <view class="page">
    <view class="hero" :style="heroStyle">
      <view class="hero__spacer"></view>

      <view class="conversion-section">
        <image class="conversion-section__bg" src="/static/conversion-bg.png" mode="aspectFill" />
        <view class="conversion-section__title">
          <text class="conversion-section__brand">天天拓客</text>
          <text class="conversion-section__slogan">全域流量高效转化</text>
        </view>
        <view class="conversion-section__card">
          <image class="conversion-section__card-deco" src="/static/conversion-card-deco.png" mode="aspectFill" />
          <view class="conversion-section__card-content">
            <text class="conversion-section__card-line1">充足的客资是业绩</text>
            <text class="conversion-section__card-line2">唯一的保障</text>
            <text class="conversion-section__card-desc">全域全域引流精准锁客</text>
            <view class="conversion-section__card-btn">
              <text>了解详情</text>
            </view>
          </view>
        </view>
      </view>

      <view class="partner-section" v-if="enterpriseInfo.videoEnabled">
        <view class="section-header">
          <view class="section-header__row">
            <view class="section-header__title">合作商家</view>
            <view class="section-header__subtitle">PARTNER MERCHANT</view>
          </view>
        </view>

        <view class="partner-section__grid">
          <view
            class="partner-section__item"
            v-for="(item, index) in partnerCaseList"
            :key="index"
          >
            <view
              class="partner-card"
              @click="
                openPartnerCase(item.caseImages, item.coverImage, item.caseTitle)
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

        <view
          class="partner-section__banner"
          v-if="enterpriseInfo.bannerImages && enterpriseInfo.bannerImages[0]"
        >
          <image
            class="partner-section__banner-image"
            :src="toWebpUrl(enterpriseInfo.bannerImages[0])"
            mode="aspectFill"
          ></image>
        </view>
      </view>

      <view class="problem-section" v-if="productIntroList.length > 0">
        <view class="section-header">
          <view class="section-header__row">
            <view class="section-header__title">您是否也遇到这些问题？</view>
            <view class="section-header__more" @click="goToIssueListPage"
              >查看更多></view
            >
          </view>
        </view>

        <swiper
          class="problem-section__swiper"
          :indicator-dots="false"
          :autoplay="true"
          :interval="2500"
          :duration="500"
          :circular="true"
          :display-multiple-items="2"
        >
          <swiper-item
            v-for="(item, index) in productIntroList"
            :key="'problem-' + index"
          >
            <view
              class="problem-section__slide"
              @click="handleIntroClick(item)"
            >
              <image
                :src="toWebpUrl(item.coverImage)"
                class="problem-section__slide-image"
                mode="scaleToFill"
              />
            </view>
          </swiper-item>
        </swiper>
      </view>

      <view class="service-section">
        <view class="traffic-service">
          <view class="section-header">
            <view class="section-header__row">
              <view class="section-header__title">流量服务</view>
              <view class="section-header__subtitle">PRODUCT SERVICE</view>
            </view>
          </view>

          <view @click="goToTrafficServicePage">
            <view class="traffic-service__image">
              <image
                v-if="trafficService.serviceImage && trafficService.serviceImage[0]"
                :src="toWebpUrl(trafficService.serviceImage[0])"
                mode="aspectFill"
              ></image>
            </view>
            <view class="traffic-service__footer">
              <view class="traffic-service__name">抖音线上获客</view>
              <view class="traffic-service__cta">
                <view class="traffic-service__cta-text">了解详情</view>
                <image
                  class="traffic-service__cta-icon"
                  src="http://cdn.xiaodingdang1.com/2025/10/21/71d280df9062455ca2b23bd5ecda6223.png"
                  mode="aspectFit"
                />
              </view>
            </view>
          </view>
        </view>

        <view class="section-header">
          <view class="section-header__row">
            <view class="section-header__title">系统服务</view>
            <view class="section-header__subtitle section-header__subtitle--muted"
              >SYSTEM SERVICE</view
            >
          </view>
        </view>

        <view class="system-service">
          <view class="system-service__grid">
            <view
              class="system-service__card"
              v-for="(item, index) in systemServiceList"
              :key="index"
              @click="goToServiceDetail(item)"
            >
              <image :src="toWebpUrl(item.serviceImage)"></image>
              <view class="system-service__card-footer">
                <view class="system-service__card-title">
                  {{ item.serviceName }}
                </view>
                <view class="system-service__card-cta">了解详情</view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="surface-section">
        <view class="certificate-section">
          <view class="section-header">
            <view class="section-header__row">
              <view class="section-header__title">荣誉证书</view>
              <view class="section-header__subtitle">CERTIFICATE OF HONOR</view>
            </view>
          </view>

          <view class="certificate-section__list">
            <view class="certificate-section__scroll">
              <view class="certificate-section__double-row">
                <view class="certificate-section__row">
                  <view
                    v-for="(certificate, index) in getEvenIndexItems(
                      enterpriseInfo.honorCertificates
                    )"
                    :key="'row1-' + index"
                    class="certificate-section__item"
                  >
                    <image
                      :src="toWebpUrl(certificate)"
                      mode="aspectFit"
                    ></image>
                  </view>
                </view>
                <view
                  class="certificate-section__row"
                  v-if="
                    getOddIndexItems(enterpriseInfo.honorCertificates).length >
                      0
                  "
                >
                  <view
                    v-for="(certificate, index) in getOddIndexItems(
                      enterpriseInfo.honorCertificates
                    )"
                    :key="'row2-' + index"
                    class="certificate-section__item"
                  >
                    <image :src="toWebpUrl(certificate)" mode="aspectFit"></image>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="footer-info">
        <image
          class="footer-info__logo"
          src="http://cdn.xiaodingdang1.com/2025/11/07/c6dd442174ea42628e4c8a5fc0a58617.png"
        ></image>
        <view class="footer-info__address">{{
          enterpriseInfo.enterpriseAddress
        }}</view>
      </view>
    </view>

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
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { onShow, onHide, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import {
  getEnterpriseList,
  getServiceList,
  getcaseList,
  getProductIntroList,
} from "@/api/activity.js";
import basePoint from "@/utils/basePoint.js";

const enterpriseInfo = ref({});
const trafficService = ref({});
const systemServiceList = ref([]);
const partnerCaseList = ref([]);
const productIntroList = ref([]);

const getResponseRows = (response) => {
  return Array.isArray(response?.rows) ? response.rows : [];
};

const toWebpUrl = (url) => {
  if (!url) return "";
  return `${url}${url.includes("?") ? "&" : "?"}image_process=format,webp`;
};

const heroStyle = computed(() => {
  const bg = enterpriseInfo.value?.enterpriseLogo;
  if (!bg) return {};
  return { backgroundImage: `url(${toWebpUrl(bg)})` };
});

const openPartnerCase = (videoUrl, coverImage, visitContent) => {
  uni.navigateTo({
    url:
      "/pages/secondary/index/index?url=" +
      encodeURIComponent(videoUrl || "") +
      "&coverImage=" +
      encodeURIComponent(coverImage || "") +
      "&visitContent=" +
      encodeURIComponent(visitContent || ""),
  });
};

const goToPartnerListPage = () => {
  uni.navigateTo({
    url: "/pages/secondary/businesspartner/index",
  });
};

const goToIssueListPage = () => {
  uni.navigateTo({
    url: "/pages/secondary/issueList/index",
  });
};

const fetchPartnerCaseList = async () => {
  try {
    const rows = getResponseRows(await getcaseList({ pageSize: 9, pageNum: 1 }));
    partnerCaseList.value = rows;
  } catch (error) {
    uni.showToast({
      title: "获取合作商家失败",
      icon: "none",
    });
  }
};

const goToTrafficServicePage = () => {
  try {
    uni.switchTab({
      url: "/pages/secondary/winthecustomer/index",
    });
  } catch (error) {
    uni.showToast({
      title: "跳转失败",
      icon: "none",
    });
  }
};

const fetchServiceList = async () => {
  try {
    const rows = getResponseRows(await getServiceList({ pageSize: 5, pageNum: 1 }));
    trafficService.value = rows[0] || {};
    systemServiceList.value = rows.slice(1);
  } catch (error) {
    uni.showToast({
      title: "获取服务列表失败",
      icon: "none",
    });
  }
};

const fetchProductIntroList = async () => {
  try {
    const rows = getResponseRows(
      await getProductIntroList({ pageSize: 10, pageNum: 1 })
    );
    productIntroList.value = rows;
  } catch (error) {
    uni.showToast({
      title: "获取产品介绍列表失败",
      icon: "none",
    });
  }
};

const fetchEnterpriseInfo = async () => {
  try {
    const rows = getResponseRows(
      await getEnterpriseList({ pageSize: 10, pageNum: 1 })
    );
    if (rows.length > 0) {
      enterpriseInfo.value = rows[0] || {};
      uni.setStorageSync("videoEnabled", !!rows[0]?.videoEnabled);
    }
  } catch (error) {
    uni.showToast({
      title: "获取企业信息失败",
      icon: "none",
    });
  }
};

const handleIntroClick = (item) => {
  if (item.introType == 2) {
    uni.navigateTo({
      url:
        "/pages/secondary/index/index?url=" +
        encodeURIComponent(item.videoUrl || "") +
        "&visitContent=" +
        encodeURIComponent(item.title || ""),
    });
  } else {
    uni.navigateTo({
      url: "/pages/secondary/issueDetails/index?introId=" + item.introId,
    });
  }
};

const goToServiceDetail = (item) => {
  uni.navigateTo({
    url: "/pages/customer/index?serviceId=" + item.serviceId,
  });
};

onMounted(() => {
  fetchEnterpriseInfo();
  fetchProductIntroList();
  fetchServiceList();
  fetchPartnerCaseList();
});

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

const getEvenIndexItems = (items) => {
  if (!items || !Array.isArray(items)) return [];
  return items.filter((_, index) => index % 2 === 0);
};

const getOddIndexItems = (items) => {
  if (!items || !Array.isArray(items)) return [];
  return items.filter((_, index) => index % 2 === 1);
};

onShareAppMessage(() => {
  return {
    title: enterpriseInfo.value.enterpriseName || "天天拓客",
    path: "/pages/secondary/homepage/index",
    imageUrl: enterpriseInfo.value.enterpriseLogo || "",
  };
});

onShareTimeline(() => {
  return {
    title: enterpriseInfo.value.enterpriseName || "天天拓客",
    query: "",
    imageUrl: enterpriseInfo.value.enterpriseLogo || "",
  };
});
</script>

<style lang="scss" scoped>
.page {
  background-color: #f7f7f7;
  min-height: 100vh;
}

.hero {
  width: 100%;
  height: 750rpx;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero__spacer {
  height: 580rpx;
}

.conversion-section {
  position: relative;
  width: 750rpx;
  height: 560rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -200rpx;
}

.conversion-section__bg {
  position: absolute;
  top: -92rpx;
  left: -220rpx;
  width: 2612rpx;
  height: 890rpx;
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
  background: linear-gradient(90deg, #006EEE 0%, #00BDFE 94%);
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
  box-shadow: 0 8rpx 32rpx 0 #C4E2F1;
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
  background: linear-gradient(90deg, #006EEE 0%, #00BDFE 94%);
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
  background: #006DFF;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 28rpx;
}

.conversion-section__card-btn text {
  color: #F4F5F9;
  font-size: 14rpx;
  font-weight: 500;
  line-height: 20rpx;
}

.section-header {
  display: flex;
}

.section-header__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  border-top-right-radius: 52rpx;
  border-top-left-radius: 52rpx;
  padding: 46rpx 26rpx;
  margin-top: 130rpx;
}

.partner-section__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
  margin-top: 24rpx;
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
  margin: 28rpx 0 60rpx 0;
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
  background: #ffffff;
  padding: 46rpx 26rpx;
}

.problem-section__swiper {
  height: 364rpx;
  background-color: #fff;
  margin-top: 24rpx;
}

.problem-section__slide {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 24rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.problem-section__slide-image {
  height: 360rpx;
  border-radius: 20rpx;
  border: 2rpx solid #e1e1e1;
}

.service-section {
  background: linear-gradient(
    to bottom,
    #f0f8ff 30%,
    #acb4db 50%,
    #3351e2 100%
  );
  padding: 50rpx 24rpx 0 24rpx;
}

.traffic-service__image {
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  padding: 24rpx 0 0rpx 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

.traffic-service__image image {
  width: 698rpx;
  height: 380rpx;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  display: block;
}

.traffic-service__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 28rpx 28rpx;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  margin-bottom: 50rpx;
}

.traffic-service__cta {
  display: flex;
  background: #3552e3;
  align-items: center;
  width: 164rpx;
  height: 56rpx;
  border-radius: 100rpx;
  justify-content: center;
}

.traffic-service__cta-text {
  font-size: 24rpx;
  color: #ffffff;
}

.traffic-service__cta-icon {
  width: 24rpx;
  height: 24rpx;
}

.traffic-service__name {
  color: #000000;
  font-size: 34rpx;
  font-weight: bold;
}

.system-service {
  margin-top: 88rpx;
}

.system-service__grid {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20rpx;
  margin-top: -60rpx;
  padding: 0 0rpx 50rpx 0rpx;
}

.system-service__card {
  width: calc(49% - 6rpx);
  background: #f2f6ff;
  margin-top: 8rpx;
  border-radius: 20rpx;
}

.system-service__card image {
  width: 100%;
  height: 350rpx;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}

.system-service__card-footer {
  width: 100%;
  padding: 20rpx 0;
  text-align: center;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
  display: flex;
  justify-content: space-between;
}

.system-service__card-title {
  color: #000000;
  font-size: 28rpx;
  margin-left: 18rpx;
}

.system-service__card-cta {
  width: 112rpx;
  height: 44rpx;
  background: #3552e3;
  border-radius: 100rpx;
  color: #ffffff;
  font-size: 20rpx;
  line-height: 44rpx;
  text-align: center;
  margin-right: 18rpx;
}

.surface-section {
  background: #ffffff;
}

.certificate-section {
  background: #f4f5fa;
  padding: 40rpx 26rpx;
}

.certificate-section__list {
  margin-top: 20rpx;
}

.certificate-section__scroll {
  overflow-x: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.certificate-section__double-row {
  display: flex;
  flex-direction: column;
  width: max-content;
}

.certificate-section__row {
  display: flex;
  gap: 0;
  &:last-child {
    margin-bottom: 0;
  }
}

.certificate-section__item {
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
.certificate-section__item image {
  width: 100%;
  height: 265rpx;
  object-fit: cover;
  border-radius: 12rpx;
}

.footer-info {
  background: #ffffff;
  padding: 63rpx 44rpx;
}

.footer-info__logo {
  width: 170rpx;
  height: 47rpx;
}

.footer-info__address {
  color: #7a7878;
  font-size: 24rpx;
  margin-top: 15rpx;
}

.customer-service {
  position: fixed;
  right: 0;
  bottom: 280rpx;
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
</style>
