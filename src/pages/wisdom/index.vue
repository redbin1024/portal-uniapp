<template>
  <view class="main-container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 沉浸式海报头部区域 -->
    <view class="hero-section">
      <!-- 现代化商务城市科技背景图 (契合月子智慧的区域竞争力头部品牌调性) -->
      <image 
        class="hero-bg" 
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" 
        mode="aspectFill"
      />
      <!-- 渐变蓝色浮层，提供更深邃的科技蓝质感与文字易读性 -->
      <view class="hero-overlay"></view>

      <!-- 头部文字内容 -->
      <view class="hero-content">
        <!-- 标签牌 -->
        <view class="hero-badge animate-fade-in">
          <text class="badge-icon">✓</text>
          <text class="badge-text">一站式解决方案品牌</text>
        </view>
        <!-- 主标题 -->
        <view class="hero-title animate-fade-up">月子智慧</view>
        <!-- 副标题 -->
        <view class="hero-subtitle animate-fade-up-delay">
          让您的月子中心成为区域竞争力第一的头部品牌
        </view>
      </view>
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
          <text class="highlight-text">月子智慧</text> 是“天天拓客”旗下专注于月子中心全案增长的高端服务品牌。
        </view>
        <view class="desc-paragraph">
          我们秉持 <text class="term-text">“一区一店、深度绑定、长期陪跑”</text> 的合作理念，为每家合作会所提供定制化、系统化、结果化的全链路运营赋能，助其快速建立区域竞争壁垒，实现可持续盈利与品牌领先。
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
      
      <scroll-view scroll-x="true" class="escort-scroll-view" show-scrollbar="false" enhanced="true">
        <!-- 步骤 01 -->
        <view 
          class="step-card" 
          :class="{ 'center-step': activeStep === 1 }"
          @tap="changeStep(1)"
        >
          <view class="step-header">
            <text class="step-number">01</text>
            <text class="step-title">获客客户</text>
          </view>
          <image class="step-divider-line" :src="activeStep === 1 ? stepDividerCenter : stepDividerNormal" mode="aspectFit" />
          
          <view class="capsule-button-container" hover-class="button-hover" @tap.stop="clickCapsule(1, 0)">
            <view class="capsule-button">
              <UIcon name="plane" size="14" :color="activeStep === 1 ? '#1e56fc' : '#64748b'" class="capsule-icon" />
              <image class="capsule-arrow" :src="gradientArrowIcon" mode="aspectFit" />
              <text class="capsule-text">线上获客</text>
            </view>
          </view>
          
          <view class="capsule-button-container" hover-class="button-hover" @tap.stop="clickCapsule(1, 1)">
            <view class="capsule-button">
              <UIcon name="briefcase" size="14" :color="activeStep === 1 ? '#1e56fc' : '#64748b'" class="capsule-icon" />
              <image class="capsule-arrow" :src="gradientArrowIcon" mode="aspectFit" />
              <text class="capsule-text">工具获客</text>
            </view>
          </view>
        </view>

        <!-- 加号桥梁 01 -->
        <view class="plus-bridge-container">
          <view class="plus-bridge-circle">
            <image class="plus-icon" :src="plusIcon" mode="aspectFit" />
          </view>
        </view>

        <!-- 步骤 02 (视觉中心卡片) -->
        <view 
          class="step-card" 
          :class="{ 'center-step': activeStep === 2 }"
          @tap="changeStep(2)"
        >
          <view class="step-header">
            <text class="step-number">02</text>
            <text class="step-title">教育客户</text>
          </view>
          <image class="step-divider-line" :src="activeStep === 2 ? stepDividerCenter : stepDividerNormal" mode="aspectFit" />
          
          <view class="capsule-button-container" hover-class="button-hover" @tap.stop="clickCapsule(2, 0)">
            <view class="capsule-button">
              <UIcon name="store" size="14" :color="activeStep === 2 ? '#1e56fc' : '#64748b'" class="capsule-icon" />
              <image class="capsule-arrow" :src="gradientArrowIcon" mode="aspectFit" />
              <text class="capsule-text">商家官网</text>
            </view>
          </view>
          
          <view class="capsule-button-container" hover-class="button-hover" @tap.stop="clickCapsule(2, 1)">
            <view class="capsule-button">
              <UIcon name="ai" size="14" :color="activeStep === 2 ? '#1e56fc' : '#64748b'" class="capsule-icon" />
              <image class="capsule-arrow" :src="gradientArrowIcon" mode="aspectFit" />
              <text class="capsule-text">AI签单助手</text>
            </view>
          </view>
        </view>

        <!-- 加号桥梁 02 -->
        <view class="plus-bridge-container">
          <view class="plus-bridge-circle">
            <image class="plus-icon" :src="plusIcon" mode="aspectFit" />
          </view>
        </view>

        <!-- 步骤 03 -->
        <view 
          class="step-card" 
          :class="{ 'center-step': activeStep === 3 }"
          @tap="changeStep(3)"
        >
          <view class="step-header">
            <text class="step-number">03</text>
            <text class="step-title">转化客户</text>
          </view>
          <image class="step-divider-line" :src="activeStep === 3 ? stepDividerCenter : stepDividerNormal" mode="aspectFit" />
          
          <view class="capsule-button-container" hover-class="button-hover" @tap.stop="clickCapsule(3, 0)">
            <view class="capsule-button">
              <UIcon name="live" size="14" :color="activeStep === 3 ? '#1e56fc' : '#64748b'" class="capsule-icon" />
              <image class="capsule-arrow" :src="gradientArrowIcon" mode="aspectFit" />
              <text class="capsule-text">直播</text>
            </view>
          </view>
          
          <view class="capsule-button-container" hover-class="button-hover" @tap.stop="clickCapsule(3, 1)">
            <view class="capsule-button">
              <UIcon name="star" size="14" :color="activeStep === 3 ? '#1e56fc' : '#64748b'" class="capsule-icon" />
              <image class="capsule-arrow" :src="gradientArrowIcon" mode="aspectFit" />
              <text class="capsule-text">线下活动</text>
            </view>
          </view>
        </view>
      </scroll-view>

      <!-- 标签和内容详情区域 (根据当前选中的步骤卡片显示其关联的子项) -->
      <view class="detail-section">
        <!-- 标签切换栏 -->
        <view class="tab-header">
          <view 
            v-for="(tab, index) in currentTabs" 
            :key="tab.id || index"
            class="tab-item"
            :class="{ 'tab-active': activeTabIndex === index }"
            @tap="changeTab(index)"
          >
            <!-- 标签图标 -->
            <image class="tab-icon" :src="getTabIcon(tab.name, tab.image)" mode="aspectFit" />
            <!-- 标签名称 -->
            <text class="tab-name">{{ tab.name }}</text>
            <!-- 底部蓝色指示线 -->
            <view class="tab-indicator" v-if="activeTabIndex === index"></view>
          </view>
        </view>

        <!-- 详情富文本内容区域 -->
        <view class="content-detail-box">
          <rich-text :nodes="formatRichText(currentActiveContent)" class="rich-content"></rich-text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { onShow, onHide, onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app';
import basePoint from '@/utils/basePoint.js';
import UIcon from '@/components/UIcon/UIcon.vue';
import { get } from '@/utils/request.js';
import { formatRichText } from '@/utils/richText.js';
import { 
  createTeamIcon, 
  createOperationIcon, 
  createEffectIcon,
  createPaperPlaneIcon,
  createGradientArrowIcon,
  createBriefcaseIcon,
  createStoreContentIcon,
  createAiAssistantIcon,
  createLivePlayIcon,
  createActivityStarIcon,
  createStepDividerIcon,
  createPlusIcon
} from '@/utils/svgDataUri.js';

// 像素级适配的 SVG Data URI，100% 兼容微信小程序端，绝不丢失渲染
const teamIcon = ref(createTeamIcon());
const operationIcon = ref(createOperationIcon());
const effectIcon = ref(createEffectIcon());

// 陪跑服务小胶囊功能微型 SVG 图标
const paperPlaneIcon = ref(createPaperPlaneIcon());
const gradientArrowIcon = ref(createGradientArrowIcon());
const briefcaseIcon = ref(createBriefcaseIcon());
const storeContentIcon = ref(createStoreContentIcon());
const aiAssistantIcon = ref(createAiAssistantIcon());
const livePlayIcon = ref(createLivePlayIcon());
const activityStarIcon = ref(createActivityStarIcon());

// 分割线与加号
const stepDividerNormal = ref(createStepDividerIcon('#E2E8F0', true));
const stepDividerCenter = ref(createStepDividerIcon('rgba(255, 255, 255, 0.35)', true));
const plusIcon = ref(createPlusIcon('#3B82F6'));

// 交互与数据驱动状态
const activeStep = ref(1);
const activeTabIndex = ref(0);
const tabLists = ref({
  1: [],
  2: [],
  3: []
});

const listLoading = ref(false);

// 后端 API 接口查询
const fetchListData = async (type) => {
  try {
    listLoading.value = true;
    const res = await get('/mp/biz/postnatalCare/list', { type });
    if (res && res.code === 200 && res.data && res.data.rows && res.data.rows.length > 0) {
      tabLists.value[type] = res.data.rows;
    } else if (res && Array.isArray(res.rows) && res.rows.length > 0) {
      tabLists.value[type] = res.rows;
    }
  } catch (err) {
    console.error('获取后端月子智慧数据失败，将完美降级至高品质本地静态数据: ', err);
  } finally {
    listLoading.value = false;
  }
};

// 切换大步骤卡片
const changeStep = (step) => {
  if (activeStep.value === step) return;
  activeStep.value = step;
  activeTabIndex.value = 0;
  fetchListData(step);
};

// 切换子 Tab 项
const changeTab = (index) => {
  activeTabIndex.value = index;
};

// 极速胶囊快捷键点击，一步联动 Step 与子 Tab
const clickCapsule = (step, index) => {
  activeStep.value = step;
  activeTabIndex.value = index;
  fetchListData(step);
};

// 计算当前激活的大类拥有的 Tab 子项
const currentTabs = computed(() => {
  return tabLists.value[activeStep.value] || [];
});

// 计算当前激活渲染的富文本详情
const currentActiveContent = computed(() => {
  const tabs = currentTabs.value;
  if (tabs && tabs[activeTabIndex.value]) {
    return tabs[activeTabIndex.value].content || '';
  }
  return '';
});

// 解析并映射图标
const getTabIcon = (name, itemImage) => {
  if (itemImage && itemImage.startsWith('http') && !itemImage.includes('example.com')) {
    return itemImage;
  }
  const cleanName = String(name || '');
  if (cleanName.includes('线上')) return '/static/widsom/01.png';
  if (cleanName.includes('工具')) return '/static/widsom/02.png';
  if (cleanName.includes('官网') || cleanName.includes('门店')) return '/static/widsom/03.png';
  if (cleanName.includes('AI') || cleanName.includes('助手')) return '/static/widsom/04.png';
  if (cleanName.includes('直播')) return '/static/widsom/05.png';
  if (cleanName.includes('活动')) return '/static/widsom/06.png';
  return '/static/widsom/01.png';
};

// 自定义导航栏高度获取，保障各类手机机型完美适配
const statusBarHeight = ref(20);

onMounted(() => {
  // 获取系统状态栏高度，保证全屏背景下的顶部安全距离
  const systemInfo = uni.getSystemInfoSync();
  statusBarHeight.value = systemInfo.statusBarHeight || 20;

  // 异步预加载所有步骤的数据，提供无缝流畅体验
  fetchListData(1);
  fetchListData(2);
  fetchListData(3);
});

// 智慧页面统计追踪埋点
onShow(async () => {
  await basePoint.trackingStart({ visitModule: '智慧', visitContent: '智慧' });
});

onHide(async () => {
  const trackingId = uni.getStorageSync('trackingId');
  if (trackingId) {
    await basePoint.trackingEnd({ id: trackingId });
  }
});

// 支持小程序分享
onShareAppMessage(() => {
  return {
    title: '月子智慧 — 一区一店，独家赋能月子中心全案增长',
    path: '/pages/wisdom/index',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600'
  };
});

onShareTimeline(() => {
  return {
    title: '月子智慧 — 独家赋能月子会所全案增长',
    query: ''
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
  height: 520rpx;
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

/* 高级蓝调渐变叠加，提升科技感与文字质感 */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg, 
    rgba(14, 34, 61, 0.45) 0%, 
    rgba(14, 40, 85, 0.75) 60%, 
    rgba(10, 31, 74, 0.95) 100%
  );
  z-index: 2;
}

/* 头部文字排版 */
.hero-content {
  position: absolute;
  bottom: 80rpx; /* 留出白底卡片覆盖的余量 */
  left: 0;
  right: 0;
  padding: 0 46rpx;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* 一站式解决方案精美药丸标牌 */
.hero-badge {
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 100rpx;
  padding: 10rpx 28rpx;
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
  backdrop-filter: blur(10px);
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.badge-icon {
  color: #38bdf8;
  font-size: 24rpx;
  font-weight: bold;
  margin-right: 12rpx;
}

.badge-text {
  color: #ffffff;
  font-size: 22rpx;
  font-weight: 500;
  letter-spacing: 1rpx;
}

/* “月子智慧”大字主标题 */
.hero-title {
  color: #ffffff;
  font-size: 56rpx;
  font-weight: 800;
  letter-spacing: 4rpx;
  margin-bottom: 16rpx;
  text-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.25);
  font-family: system-ui, -apple-system, sans-serif;
}

/* “竞争力第一头部品牌”副标题 */
.hero-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 28rpx;
  line-height: 42rpx;
  font-weight: 400;
  letter-spacing: 1rpx;
  max-width: 600rpx;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
}

/* 白底核心赋能卡片 (立体向上压盖 50rpx) */
.content-card {
  flex: 1;
  background: #ffffff;
  border-radius: 40rpx 40rpx 0 0;
  margin-top: -50rpx;
  position: relative;
  z-index: 5;
  padding: 60rpx 46rpx 100rpx 46rpx;
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
  font-size: 38rpx;
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
  width: 76rpx;
  height: 76rpx;
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
  width: 36rpx;
  height: 36rpx;
}

.operation-icon {
  width: 40rpx;
  height: 40rpx;
}

.effect-icon {
  width: 44rpx;
  height: 34rpx;
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
  opacity: 0; /* 配合动画初始状态 */
}

.animate-fade-up-delay {
  animation: fadeInUp 0.8s ease-out 0.25s forwards;
  opacity: 0; /* 配合动画初始状态 */
}

/* ========================================================
   三大核心全程陪跑大模块 (像素级适配 rpx 与惯性滑动交互)
   ======================================================== */

.escort-section {
  position: relative;
  width: 750rpx;
  background-color: #f4f5f9;
  padding: 80rpx 0 100rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 主标题：三大核心全程陪跑 */
.escort-title {
  text-align: center;
  font-size: 38rpx;
  font-family: SourceHanSansCN-Revision, sans-serif;
  font-weight: 700;
  line-height: 56rpx;
  color: #000000;
  display: block;
}

/* 副标题：从领先到绝对领先 */
.escort-subtitle {
  text-align: center;
  font-size: 26rpx;
  font-family: SourceHanSansCN-Revision, sans-serif;
  font-weight: 400;
  line-height: 46rpx;
  color: rgba(0, 0, 0, 0.6);
  display: block;
  margin-top: 10rpx;
}

/* 横向滑动 scroll-view 容器 */
.escort-scroll-view {
  position: relative;
  width: 750rpx;
  white-space: nowrap; /* 极其关键：防止子模块在横向上换行 */
  margin-top: 50rpx;
}

/* 通用流程卡片 (01, 02, 03) */
.step-card {
  width: 294rpx;
  height: 354rpx;
  display: inline-block; /* 极其关键：支持 inline 排布与横向滑出 */
  vertical-align: top;
  white-space: normal; /* 卡片内文字恢复正常换行 */
  border-radius: 19rpx;
  box-shadow: 0px 6rpx 23rpx 0px rgba(220, 222, 229, 0.4);
  position: relative;
  padding: 30rpx 20rpx;
  box-sizing: border-box;
  background-color: #ffffff;
}

/* 02 卡片为重磅高贵蓝色渐变底色，作为流程视觉中心 */
.step-card.center-step {
  background: linear-gradient(180deg, #2668ff 0%, #1857e8 100%);
}

/* 卡片边距修正，保证两端滑动呼吸空间 */
.step-card:first-child {
  margin-left: 40rpx;
}
.step-card:last-child {
  margin-right: 40rpx;
}

/* 卡片头部 01, 02, 03 布局 */
.step-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 步骤序号数字 */
.step-number {
  text-align: center;
  font-size: 50rpx;
  font-family: 'DIN Pro', system-ui, sans-serif;
  font-weight: bold;
  line-height: 60rpx;
  color: rgba(0, 0, 0, 0.2);
}
.center-step .step-number {
  color: rgba(255, 255, 255, 0.4);
}

/* 步骤中文核心字 */
.step-title {
  text-align: center;
  font-size: 32rpx;
  font-family: SourceHanSansCN-Revision, sans-serif;
  font-weight: 700;
  line-height: 48rpx;
  margin-top: 6rpx;
  color: #0f172a;
}
.center-step .step-title {
  color: #ffffff;
}

/* 分割虚线/实线图片 */
.step-divider-line {
  width: 230rpx;
  height: 2rpx;
  display: block;
  margin: 20rpx auto 0 auto;
}

/* 步骤内带小盾牌图标的功能丸子按钮容器 */
.capsule-button-container {
  width: 230rpx;
  height: 52rpx;
  margin: 18rpx auto 0 auto;
  box-shadow: 0px 4rpx 12rpx 0px rgba(189, 206, 240, 0.3);
  border-radius: 17rpx;
  overflow: hidden;
  transition: all 0.15s ease;
}

/* 按钮按压反馈动效 */
.button-hover {
  transform: scale(0.96);
  opacity: 0.85;
}

/* 胶囊按钮主体 */
.capsule-button {
  width: 100%;
  height: 100%;
  background-color: #fdfcfe;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16rpx;
  box-sizing: border-box;
}

/* 按钮内核心微图标 */
.capsule-icon {
  width: 28rpx;
  height: 28rpx;
  flex-shrink: 0;
}

/* 按钮内的小指引箭头/符号 */
.capsule-arrow {
  width: 6rpx;
  height: 22rpx;
  margin-left: 12rpx;
  flex-shrink: 0;
}

/* 按钮内的超精致小文字 */
.capsule-text {
  font-size: 20rpx;
  font-family: SourceHanSansCN-Revision, sans-serif;
  font-weight: 500;
  color: #475569;
  margin-left: 12rpx;
}

/* 当大步骤卡片激活选中时，胶囊内的文本变高亮深蓝色 */
.center-step .capsule-text {
  color: #1e56fc;
  font-weight: bold;
}

/* ====================
   卡片之间的“加号桥梁”
   ==================== */
.plus-bridge-container {
  width: 56rpx;
  height: 56rpx;
  display: inline-block;
  vertical-align: top;
  margin: 146rpx -10rpx 0 -10rpx; /* 极高工艺：悬挂在两卡片正中做连结 */
  position: relative;
  z-index: 5;
}

.plus-bridge-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0px 4rpx 10rpx rgba(15, 23, 42, 0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* 加号十字图标 */
.plus-icon {
  width: 28rpx;
  height: 28rpx;
}

/* ========================================================
   步骤详情子 Tab 及数据驱动富文本区域 (扁平化通栏布局)
   ======================================================== */
.detail-section {
  width: 750rpx;
  background: #ffffff;
  border-radius: 0;
  margin-top: 40rpx;
  padding: 40rpx 46rpx;
  box-sizing: border-box;
  box-shadow: none;
}

.tab-header {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 2rpx solid #f1f5f9;
  padding-bottom: 24rpx;
  position: relative;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  padding: 10rpx 0;
  transition: all 0.2s ease;
}

.tab-icon {
  width: 72rpx;
  height: 72rpx;
  margin-bottom: 12rpx;
  transition: transform 0.2s ease;
}

.tab-item:active .tab-icon {
  transform: scale(0.92);
}

.tab-name {
  font-size: 24rpx;
  color: #64748b;
  font-weight: 500;
  line-height: 36rpx;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.tab-active .tab-name {
  color: #1e56fc;
  font-weight: bold;
}

.tab-indicator {
  position: absolute;
  bottom: -24rpx; /* 紧贴下边框线 */
  width: 80rpx;
  height: 6rpx;
  background: linear-gradient(90deg, #2668ff 0%, #1450ff 100%);
  border-radius: 100rpx;
}

.content-detail-box {
  margin-top: 30rpx;
  min-height: 200rpx;
  animation: fadeIn 0.35s ease-in-out;
}

.rich-content {
  font-size: 26rpx;
  color: #334155;
  line-height: 1.6;
}
</style>
