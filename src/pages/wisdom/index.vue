<template>
  <view class="main-container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 沉浸式海报头部区域 -->
    <view class="hero-section">
      <!-- 现代化商务城市科技背景图 (契合月子智慧的区域竞争力头部品牌调性) -->
      <image class="hero-bg"
        :src="formatWisdomImageUrl('https://cdn.xiaodingdang1.com/2026/05/25/c0f6b7b8626343faa0db97aa8f37b8b6.png')"
        mode="aspectFill" />
      <!-- 渐变蓝色浮层，提供更深邃的科技蓝质感与文字易读性 -->
      <view class="hero-overlay"></view>

      <!-- 头部文字内容 -->
      <!-- <view class="hero-content">
        主标题
        <view class="hero-title animate-fade-up">月子智慧</view>
        副标题
        <view class="hero-subtitle animate-fade-up-delay">
          让您的月子中心成为区域竞争力第一的头部品牌
        </view>
        标签牌
        <view class="hero-badge animate-fade-in">
          <view class="badge-icon-circle">
            <image
              class="badge-check-svg"
              :src="badgeCheckIcon"
              mode="aspectFit"
            />
          </view>
          <text class="badge-text">一站式解决方案品牌</text>
        </view>
      </view> -->
    </view>

    <!-- 核心赋能白底卡片 (立体压盖在海报底部，形成 overlapping 层次) -->
    <view class="content-card">
      <view class="drag-indicator"></view>

      <!-- 主标题 -->
      <view class="section-title">
        <text class="title-main">一区一店 独家赋能</text>
        <view class="title-line"></view>
      </view>

      <!-- 文字段落区 -->
      <view class="desc-container">
        <view class="desc-paragraph first-paragraph">
          <text class="highlight-text">月子智慧</text>
          是“天天拓客”旗下专注于月子中心全案增长的高端服务品牌。
        </view>
        <view class="desc-paragraph">
          我们秉持
          <text class="term-text">“一区一店、深度绑定、长期陪跑”</text>
          的合作理念，为每家合作会所提供定制化、系统化、结果化的全链路运营赋能，助其快速建立区域竞争壁垒，实现可持续盈利与品牌领先。
        </view>
      </view>

      <!-- 三大核心优势板块 (等宽弹性网格，精美微立体质感) -->
      <view class="features-grid">
        <view class="feature-item" hover-class="feature-item-hover" :hover-stay-time="150">
          <view class="icon-wrapper team-bg-wrapper">
            <!-- 团队/人 图标 -->
            <image class="feature-svg team-icon" :src="teamIcon" mode="aspectFit" />
          </view>
          <text class="feature-title">专业团队</text>
          <text class="feature-desc">深耕行业</text>
        </view>

        <view class="feature-item" hover-class="feature-item-hover" :hover-stay-time="150">
          <view class="icon-wrapper operation-bg-wrapper">
            <!-- 全案运营/六边形 图标 -->
            <image class="feature-svg operation-icon" :src="operationIcon" mode="aspectFit" />
          </view>
          <text class="feature-title">全案运营</text>
          <text class="feature-desc">落地执行</text>
        </view>

        <view class="feature-item" hover-class="feature-item-hover" :hover-stay-time="150">
          <view class="icon-wrapper effect-bg-wrapper">
            <!-- 效果驱动/趋势折线 图标 -->
            <image class="feature-svg effect-icon" :src="effectIcon" mode="aspectFit" />
          </view>
          <text class="feature-title">效果驱动</text>
          <text class="feature-desc">持续增长</text>
        </view>
      </view>
    </view>

    <!-- 全程陪跑服务大模块 (新模块：采用横向 scroll-view 滑动机制，真机体验丝滑) -->
    <view class="escort-section">
      <text class="escort-title">三大核心全程陪跑</text>
      <text class="escort-subtitle">从领先到绝对领先</text>

      <view class="escort-card-panel">
        <view class="escort-card-list">
          <view v-for="card in typeCards" :key="card.id" class="step-card"
            :class="`step-card-${card.theme}`"
            @tap="goToWisdomDetail(card.id)">
            <image class="step-card-bg-image" :src="wisdomCardBgImage" mode="scaleToFill" />
            <view class="step-card-body">
              <view class="step-card-header">
                <view class="step-card-heading">
                  <text class="step-card-title">{{ card.title }}</text>
                </view>
                <view class="step-card-action" hover-class="button-hover" @tap.stop="goToWisdomDetail(card.id)">
                  <text class="step-card-action-text">查看详情</text>
                </view>
              </view>

              <text class="step-card-subtitle">{{ card.subtitle }}</text>

              <view class="step-card-preview">
                <view class="step-card-preview-inner">
                  <image class="step-card-preview-image" :src="formatWisdomImageUrl(card.previewImage)" mode="aspectFill" />
                </view>
              </view>
            </view>
          </view>
        </view>

      </view>
    </view>

    <ShareFloatBtn />

    <view class="back-top-button" v-if="showBackTop" hover-class="back-top-button-hover" @tap="backToTop">
      <image class="back-top-icon" :src="backTopIconSrc" mode="aspectFit" />
      <text class="back-top-text">顶部</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  onShow,
  onHide,
  onPageScroll,
  onShareAppMessage,
  onShareTimeline,
} from '@dcloudio/uni-app';
import basePoint from '@/utils/basePoint.js';
import { get } from '@/utils/request.js';
import {
  createTeamIcon,
  createOperationIcon,
  createEffectIcon,
} from '@/utils/svgDataUri.js';
import {
  wisdomCardBgImage,
  formatWisdomImageUrl,
} from './config.js';
import {
  normalizeWisdomTypeRows,
  mapWisdomTypeToCard,
} from './apiAdapters.mjs';

// 像素级适配的 SVG Data URI，100% 兼容微信小程序端，绝不丢失渲染
const teamIcon = ref(createTeamIcon());
const operationIcon = ref(createOperationIcon());
const effectIcon = ref(createEffectIcon());

// 交互与数据驱动状态
const showBackTop = ref(false);
const typeCards = ref([]);

const backTopIconSrc =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"%3E%3Cpath d="M12 28L24 16L36 28" fill="none" stroke="%232C80FF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/%3E%3Cpath d="M12 12H36" fill="none" stroke="%232C80FF" stroke-width="3.5" stroke-linecap="round"/%3E%3C/svg%3E';

const backToTop = () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 260,
  });
};

const goToWisdomDetail = (typeId) => {
  uni.navigateTo({
    url: `/pages/wisdom/detail/index?typeId=${typeId}`,
  });
};

const fetchWisdomTypeCards = async () => {
  try {
    const res = await get(
      '/mp/biz/postnatalCareType/list',
      {
        pageNum: 1,
        pageSize: 10,
      },
      { loading: false },
    );
    const rows = normalizeWisdomTypeRows(res);

    if (rows.length) {
      typeCards.value = rows.map((item, index) => mapWisdomTypeToCard(item, index));
    }
  } catch (error) {
    console.error('获取月子智慧类型列表失败: ', error);
  }
};

// 自定义导航栏高度获取，保障各类手机机型完美适配
const statusBarHeight = ref(20);

onMounted(() => {
  // 获取系统状态栏高度，保证全屏背景下的顶部安全距离
  const systemInfo = uni.getSystemInfoSync();
  statusBarHeight.value = systemInfo.statusBarHeight || 20;
});

// 智慧页面统计追踪埋点
onShow(async () => {
  fetchWisdomTypeCards();
  await basePoint.trackingStart({ visitModule: '智慧', visitContent: '智慧' });
});

onHide(async () => {
  const trackingId = uni.getStorageSync('trackingId');
  if (trackingId) {
    await basePoint.trackingEnd({ id: trackingId });
  }
});

onPageScroll((e) => {
  showBackTop.value = e.scrollTop > 600;
});

// 支持小程序分享
onShareAppMessage(() => {
  return {
    title: '全案服务 — 一区一店，独家赋能月子中心全案增长',
    path: '/pages/wisdom/index',
    imageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600',
  };
});

onShareTimeline(() => {
  return {
    title: '月子智慧 — 独家赋能月子会所全案增长',
    query: '',
  };
});
</script>

<style lang="scss" scoped>
/* 整个页面主容器，采用深色/浅色优雅拼接 */
.main-container {
  min-height: 100vh;
  background-color: #f7f9fc;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

/* 状态栏占位，保证完全沉浸式体验 */
.status-bar {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  pointer-events: none;
}

/* 沉浸式海报头部 */
.hero-section {
  width: 100%;
  height: 882rpx;
  position: relative;
  overflow: hidden;
}

.hero-bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

/* 高级蓝调渐变叠加 - 针对全新亮色背景，我们设为透明以完全还原精美原图调性 */
.hero-overlay {
  display: none;
}

/* 头部文字排版 (使用响应式流式 Flex 布局，告绝对定位硬编码) */
.hero-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 124rpx 46rpx 52rpx 46rpx;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
}

/* “月子智慧”大字主标题 (TBMCYXT 字体, 渐变色) */
.hero-title {
  font-family:
    TBMCYXT,
    system-ui,
    -apple-system,
    sans-serif;
  font-size: 68rpx;
  font-weight: normal;
  line-height: 1.1;
  margin-bottom: 18rpx;
  background: linear-gradient(87deg, #0a1446 -5%, #0d2c85 62%, #001964 99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* “竞争力第一头部品牌”副标题 */
.hero-subtitle {
  font-family:
    SourceHanSansCN-Revision,
    system-ui,
    -apple-system,
    sans-serif;
  font-size: 25rpx;
  font-weight: normal;
  line-height: 38rpx;
  color: #040f40;
  max-width: 430rpx;
  margin-bottom: 30rpx;
}

/* 一站式解决方案精美药丸标牌 */
.hero-badge {
  height: 38rpx;
  background: #ffffff;
  border-radius: 100rpx;
  box-shadow: 0px 4rpx 12rpx rgba(4, 15, 64, 0.08);
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  padding: 0 18rpx;
  box-sizing: border-box;
}

.badge-icon-circle {
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  background: #001e8d;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8rpx;
  flex-shrink: 0;
}

.badge-check-svg {
  width: 10rpx;
  height: 8rpx;
  display: block;
}

.badge-text {
  font-family:
    SourceHanSansCN-Revision,
    system-ui,
    -apple-system,
    sans-serif;
  font-size: 16rpx;
  font-weight: 500;
  color: #001e8d;
  line-height: normal;
}

/* 白底核心赋能卡片 (立体向上压盖 50rpx) */
.content-card {
  flex: 1;
  background: #ffffff;
  border-radius: 40rpx 40rpx 0 0;
  margin-top: -42rpx;
  position: relative;
  z-index: 5;
  padding: 100rpx 46rpx 100rpx 46rpx;
  box-shadow: 0 -12rpx 40rpx rgba(10, 31, 74, 0.08);
  display: flex;
  flex-direction: column;
}

/* 卡片顶部装饰指示条 */
.drag-indicator {
  width: 72rpx;
  height: 8rpx;
  background-color: #e2e8f0;
  border-radius: 100rpx;
  position: absolute;
  top: 20rpx;
  left: 50%;
  transform: translateX(-50%);
}

/* “一区一店 独家赋能”主标题 */
.section-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50rpx;
}

.title-main {
  color: #0d1e3d;
  font-size: 48rpx;
  font-weight: 800;
  letter-spacing: 4rpx;
  position: relative;
}

.title-line {
  width: 48rpx;
  height: 6rpx;
  background: linear-gradient(90deg, #3b82f6, #6366f1);
  border-radius: 100rpx;
  margin-top: 14rpx;
}

/* 段落描述区，兼顾舒适的行高与灰度，不显拥挤 */
.desc-container {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  margin-bottom: 72rpx;
}

.desc-paragraph {
  color: rgba(15, 23, 42, 0.72);
  font-size: 26rpx;
  line-height: 48rpx;
  text-align: justify;
  letter-spacing: 1rpx;
}

.first-paragraph {
  font-size: 28rpx;
  color: rgba(15, 23, 42, 0.8);
  line-height: 50rpx;
}

.highlight-text {
  color: #1d4ed8;
  font-weight: 700;
}

.term-text {
  color: #0f172a;
  font-weight: 700;
  background: rgba(59, 130, 246, 0.06);
  padding: 2rpx 8rpx;
  border-radius: 6rpx;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

/* 三大核心板块 Grid (Flex等宽布局实现) */
.features-grid {
  display: flex;
  justify-content: space-between;
  gap: 24rpx;
  width: 100%;
}

.feature-item {
  flex: 1;
  border-radius: 24rpx;
  padding: 36rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-item-hover {
  transform: translateY(-4rpx);
  background: #ffffff;
  border-color: rgba(59, 130, 246, 0.15);
  box-shadow: 0 12rpx 24rpx rgba(59, 130, 246, 0.08);
}

/* 圆角图标微背景 */
.icon-wrapper {
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20rpx;
  position: relative;
}

/* 团队背景圆圈 (rgba 50% 不透明度) */
.team-bg-wrapper {
  background: rgba(255, 233, 228, 0.5);
}

/* 运营背景圆圈 (rgba 50% 不透明度) */
.operation-bg-wrapper {
  background: rgba(228, 233, 255, 0.5);
}

/* 效果驱动背景圆圈 (rgba 50% 不透明度) */
.effect-bg-wrapper {
  background: rgba(255, 242, 228, 0.5);
}

.feature-svg {
  transition: transform 0.2s ease;
}

/* 针对三款定制 SVG 的像素级黄金宽高与居中结构适配 */
.team-icon {
  width: 48rpx;
  height: 48rpx;
}

.operation-icon {
  width: 48rpx;
  height: 48rpx;
}

.effect-icon {
  width: 48rpx;
  height: 48rpx;
}

.feature-title {
  color: #0f172a;
  font-size: 28rpx;
  font-weight: 700;
  margin-bottom: 6rpx;
  letter-spacing: 1rpx;
}

.feature-desc {
  color: #64748b;
  font-size: 22rpx;
  font-weight: 500;
}

/* 动效 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-fade-up {
  animation: fadeInUp 0.8s ease-out 0.1s forwards;
  opacity: 0;
  /* 配合动画初始状态 */
}

.animate-fade-up-delay {
  animation: fadeInUp 0.8s ease-out 0.25s forwards;
  opacity: 0;
  /* 配合动画初始状态 */
}

/* ========================================================
   三大核心全程陪跑大模块 (像素级适配 rpx 与惯性滑动交互)
   ======================================================== */

.escort-section {
  position: relative;
  width: 750rpx;
  background-color: #fff;
  padding: 80rpx 0 72rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.escort-card-panel {
  margin-top: 50rpx;
  padding: 24rpx 20rpx 48rpx;
  border-radius: 24rpx;
  box-sizing: border-box;
  overflow: hidden;
}

/* 主标题：三大核心全程陪跑 */
.escort-title {
  text-align: center;
  font-size: 48rpx;
  font-family: SourceHanSansCN-Revision, sans-serif;
  font-weight: 700;
  line-height: 56rpx;
  color: #000000;
  display: block;
}

/* 副标题：从领先到绝对领先 */
.escort-subtitle {
  text-align: center;
  font-size: 32rpx;
  font-family: SourceHanSansCN-Revision, sans-serif;
  font-weight: 400;
  line-height: 46rpx;
  color: rgba(0, 0, 0, 0.6);
  display: block;
  margin-top: 10rpx;
}

.escort-card-list {
  width: 100%;
}

.step-card {
  width: 100%;
  border-radius: 46rpx;
  overflow: hidden;
  position: relative;
}

.step-card-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}

.step-card+.step-card {
  margin-top: 36rpx;
}

.step-card-body {
  position: relative;
  z-index: 1;
  padding: 44rpx 38rpx 38rpx;
}

.step-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.step-card-heading {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.step-card-title {
  width: 264rpx;
  min-height: 65rpx;
  font-size: 44rpx;
  font-family: SourceHanSansCN-Revision, sans-serif;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0;
  font-variation-settings: 'opsz' auto;
  font-feature-settings: 'kern' on;
  color: rgba(0, 0, 0, 0.9);
}

.step-card-action {
  width: 170rpx;
  min-width: 170rpx;
  height: 62rpx;
  padding: 0;
  border-radius: 252rpx;
  background: linear-gradient(102deg, #007aff 54%, #72a7ff 106%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 8rpx 20rpx rgba(0, 122, 255, 0.18);
  box-sizing: border-box;
  margin-left: 20rpx;
}

.step-card-action-text {
  font-size: 26rpx;
  font-family: SourceHanSansCN-Revision, sans-serif;
  font-weight: 500;
  line-height: 38rpx;
  color: #ffffff;
}

.step-card-subtitle {
  display: block;
  width: 392rpx;
  min-height: 41rpx;
  margin-top: 16rpx;
  font-size: 28rpx;
  font-family: SourceHanSansCN-Revision, sans-serif;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0;
  font-variation-settings: 'opsz' auto;
  font-feature-settings: 'kern' on;
  color: rgba(0, 0, 0, 0.6);
}

.step-card-preview {
  margin-top: 36rpx;
}

.step-card-preview-inner {
  border: 4rpx solid #FFFFFF;
  position: relative;
  width: 630rpx;
  height: 376rpx;
  margin: 0 auto;
  border-radius: 30rpx;
  overflow: hidden;
  padding: 0;
  box-sizing: border-box;
  background: #ffffff;
}

.step-card-preview-image {
  position: absolute;
  inset: 0;
  width: 630rpx;
  height: 374rpx;
  display: block;
  border-radius: 30rpx;
}

.button-hover {
  transform: scale(0.96);
  opacity: 0.85;
}


.back-top-button {
  position: fixed;
  right: 28rpx;
  bottom: calc(120rpx + env(safe-area-inset-bottom));
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 8rpx 28rpx rgba(0, 0, 0, 0.1), 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.back-top-button-hover {
  transform: scale(0.94);
  opacity: 0.9;
}

.back-top-icon {
  width: 34rpx;
  height: 34rpx;
  display: block;
  margin-bottom: 2rpx;
}

.back-top-text {
  font-size: 20rpx;
  font-weight: 500;
  color: #666666;
  line-height: 28rpx;
}

</style>
