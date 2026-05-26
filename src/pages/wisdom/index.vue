<template>
  <view class="main-container">
    <!-- 状态栏占位 -->
    <view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

    <!-- 沉浸式海报头部区域 -->
    <view class="hero-section">
      <!-- 现代化商务城市科技背景图 (契合月子智慧的区域竞争力头部品牌调性) -->
      <image
        class="hero-bg"
        :src="formatImageUrl('https://cdn.xiaodingdang1.com/2026/05/25/c0f6b7b8626343faa0db97aa8f37b8b6.png')"
        mode="aspectFill"
      />
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
        <view
          class="feature-item"
          hover-class="feature-item-hover"
          :hover-stay-time="150"
        >
          <view class="icon-wrapper team-bg-wrapper">
            <!-- 团队/人 图标 -->
            <image
              class="feature-svg team-icon"
              :src="teamIcon"
              mode="aspectFit"
            />
          </view>
          <text class="feature-title">专业团队</text>
          <text class="feature-desc">深耕行业</text>
        </view>

        <view
          class="feature-item"
          hover-class="feature-item-hover"
          :hover-stay-time="150"
        >
          <view class="icon-wrapper operation-bg-wrapper">
            <!-- 全案运营/六边形 图标 -->
            <image
              class="feature-svg operation-icon"
              :src="operationIcon"
              mode="aspectFit"
            />
          </view>
          <text class="feature-title">全案运营</text>
          <text class="feature-desc">落地执行</text>
        </view>

        <view
          class="feature-item"
          hover-class="feature-item-hover"
          :hover-stay-time="150"
        >
          <view class="icon-wrapper effect-bg-wrapper">
            <!-- 效果驱动/趋势折线 图标 -->
            <image
              class="feature-svg effect-icon"
              :src="effectIcon"
              mode="aspectFit"
            />
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
        <view class="escort-scroll-view">
          <!-- 步骤 01 -->
          <view
            class="step-card"
            :class="{ 'center-step': activeStep === 1 }"
            @tap="changeStep(1)"
          >
          <view class="step-header">
            <text class="step-number">01</text>
            <text class="step-title">获取客户</text>
          </view>
          <image
            class="step-divider-line"
            :src="activeStep === 1 ? stepDividerCenter : stepDividerNormal"
            mode="aspectFit"
          />

          <view
            class="capsule-button-container"
            hover-class="button-hover"
            @tap.stop="clickCapsule(1, 0)"
          >
            <view class="capsule-button">
              <UIcon
                name="plane"
                size="14"
                :color="activeStep === 1 ? '#1e56fc' : '#64748b'"
                class="capsule-icon"
              />
              <image
                class="capsule-arrow"
                :src="gradientArrowIcon"
                mode="aspectFit"
              />
              <text class="capsule-text">线上获客</text>
            </view>
          </view>

          <view
            class="capsule-button-container"
            hover-class="button-hover"
            @tap.stop="clickCapsule(1, 1)"
          >
            <view class="capsule-button">
              <UIcon
                name="briefcase"
                size="14"
                :color="activeStep === 1 ? '#1e56fc' : '#64748b'"
                class="capsule-icon"
              />
              <image
                class="capsule-arrow"
                :src="gradientArrowIcon"
                mode="aspectFit"
              />
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
          <image
            class="step-divider-line"
            :src="activeStep === 2 ? stepDividerCenter : stepDividerNormal"
            mode="aspectFit"
          />

          <view
            class="capsule-button-container"
            hover-class="button-hover"
            @tap.stop="clickCapsule(2, 0)"
          >
            <view class="capsule-button">
              <UIcon
                name="store"
                size="14"
                :color="activeStep === 2 ? '#1e56fc' : '#64748b'"
                class="capsule-icon"
              />
              <image
                class="capsule-arrow"
                :src="gradientArrowIcon"
                mode="aspectFit"
              />
              <text class="capsule-text">商家官网</text>
            </view>
          </view>

          <view
            class="capsule-button-container"
            hover-class="button-hover"
            @tap.stop="clickCapsule(2, 1)"
          >
            <view class="capsule-button">
              <UIcon
                name="ai"
                size="14"
                :color="activeStep === 2 ? '#1e56fc' : '#64748b'"
                class="capsule-icon"
              />
              <image
                class="capsule-arrow"
                :src="gradientArrowIcon"
                mode="aspectFit"
              />
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
          <image
            class="step-divider-line"
            :src="activeStep === 3 ? stepDividerCenter : stepDividerNormal"
            mode="aspectFit"
          />

          <view
            class="capsule-button-container"
            hover-class="button-hover"
            @tap.stop="clickCapsule(3, 0)"
          >
            <view class="capsule-button">
              <UIcon
                name="live"
                size="14"
                :color="activeStep === 3 ? '#1e56fc' : '#64748b'"
                class="capsule-icon"
              />
              <image
                class="capsule-arrow"
                :src="gradientArrowIcon"
                mode="aspectFit"
              />
              <text class="capsule-text">直播</text>
            </view>
          </view>

          <view
            class="capsule-button-container"
            hover-class="button-hover"
            @tap.stop="clickCapsule(3, 1)"
          >
            <view class="capsule-button">
              <UIcon
                name="star"
                size="14"
                :color="activeStep === 3 ? '#1e56fc' : '#64748b'"
                class="capsule-icon"
              />
              <image
                class="capsule-arrow"
                :src="gradientArrowIcon"
                mode="aspectFit"
              />
              <text class="capsule-text">线下活动</text>
            </view>
          </view>
          </view>
        </view>

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
              <image
                class="tab-icon"
                :src="formatImageUrl(getTabIcon(tab.name, tab.image))"
                mode="aspectFit"
              />
              <!-- 标签名称 -->
              <text class="tab-name">{{ tab.name }}</text>
              <!-- 底部蓝色指示线 -->
              <view class="tab-indicator" v-if="activeTabIndex === index"></view>
            </view>
          </view>

          <!-- 详情富文本内容区域 -->
          <view class="content-detail-box">
            <rich-text
              :nodes="formatRichText(currentActiveContent)"
              class="rich-content"
            ></rich-text>
          </view>

          <RecentDynamic
            v-if="showOnlineCustomerSections && companyNewsList.length > 0"
            class="wisdom-case-section"
            title="案例展示"
            subtitle="CASE DISPLAY"
            :list="companyNewsList"
            @select="navigateToRecentDetails"
            @more="goToRecentUpdates"
          />

          <view
            class="wisdom-partners"
            v-if="showOnlineCustomerSections && partnerList.length > 0"
          >
            <view class="wisdom-partners-title">
              <text>500+月子中心</text>
              <text>共同选择</text>
            </view>
            <view class="wisdom-partners-stack">
              <view
                class="wisdom-partners-row"
                :class="`wisdom-partners-row-${rowIndex}`"
                v-for="(row, rowIndex) in partnerRows"
                :key="rowIndex"
              >
                <view
                  class="wisdom-partners-cell"
                  v-for="(item, index) in row"
                  :key="index"
                >
                  <image
                    class="wisdom-partners-logo"
                    :src="formatImageUrl(item)"
                    mode="aspectFit"
                  />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view
      class="back-top-button"
      v-if="showBackTop"
      hover-class="button-hover"
      @tap="backToTop"
    >
      <text class="back-top-arrow">⌃</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import {
  onShow,
  onHide,
  onPageScroll,
  onShareAppMessage,
  onShareTimeline,
} from '@dcloudio/uni-app';
import basePoint from '@/utils/basePoint.js';
import UIcon from '@/components/UIcon/UIcon.vue';
import { get } from '@/utils/request.js';
import { getCompanyNewsList, getEnterpriseList } from '@/api/activity.js';
import { formatRichText } from '@/utils/richText.js';
import RecentDynamic from '@/pages/winthecustomer/components/RecentDynamic.vue';
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
  createPlusIcon,
  createBadgeCheckIcon,
} from '@/utils/svgDataUri.js';

// 像素级适配的 SVG Data URI，100% 兼容微信小程序端，绝不丢失渲染
const teamIcon = ref(createTeamIcon());
const operationIcon = ref(createOperationIcon());
const effectIcon = ref(createEffectIcon());

// 药丸标牌勾选图标
const badgeCheckIcon = ref(createBadgeCheckIcon());

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
const stepDividerCenter = ref(
  createStepDividerIcon('rgba(255, 255, 255, 0.35)', true),
);
const plusIcon = ref(createPlusIcon('#3B82F6'));

// 交互与数据驱动状态
const activeStep = ref(1);
const activeTabIndex = ref(0);
const showBackTop = ref(false);
const partnerList = ref([]);
const companyNewsList = ref([]);
const tabLists = ref({
  1: [],
  2: [],
  3: [],
});

const listLoading = ref(false);

// 后端 API 接口查询
const fetchListData = async (type) => {
  try {
    listLoading.value = true;
    const res = await get('/mp/biz/postnatalCare/list', { type });
    console.log(`[Wisdom] fetchListData for type ${type} response:`, res);

    let rows = [];
    if (res) {
      if (res.code === 200) {
        if (res.data && Array.isArray(res.data.rows)) {
          rows = res.data.rows;
        } else if (Array.isArray(res.rows)) {
          rows = res.rows;
        } else if (Array.isArray(res.data)) {
          rows = res.data;
        }
      } else if (Array.isArray(res.rows)) {
        rows = res.rows;
      } else if (Array.isArray(res)) {
        rows = res;
      }
    }

    console.log(`[Wisdom] type ${type} assigned rows:`, rows);
    tabLists.value[type] = rows;
  } catch (err) {
    console.error('获取后端月子智慧数据失败: ', err);
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

const backToTop = () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 260,
  });
};

const truncateText = (text, max) => {
  if (!text) return '';
  return text.length > max ? text.substring(0, max) : text;
};

// 计算当前激活的大类拥有的 Tab 子项
const currentTabs = computed(() => {
  const tabs = tabLists.value[activeStep.value] || [];
  console.log(
    `[Wisdom] currentTabs computed. activeStep: ${activeStep.value}, tabs:`,
    tabs,
  );
  return tabs;
});

// 计算当前激活渲染的富文本详情
const currentActiveContent = computed(() => {
  const tabs = currentTabs.value;
  let index = activeTabIndex.value;
  if (index >= tabs.length) {
    index = 0;
  }
  const activeTab = tabs[index];
  const content = activeTab ? activeTab.content || '' : '';
  console.log(
    `[Wisdom] currentActiveContent computed. index: ${index}, content length: ${content.length}`,
  );
  return content;
});

const showOnlineCustomerSections = computed(() => {
  return activeStep.value === 1 && activeTabIndex.value === 0;
});

const partnerRows = computed(() => {
  const rows = [[], [], [], [], []];
  const pattern = [3, 3, 3, 3, 3];
  let cursor = 0;
  pattern.forEach((count, rowIndex) => {
    rows[rowIndex] = partnerList.value.slice(cursor, cursor + count);
    cursor += count;
  });
  return rows.filter((row) => row.length > 0);
});

// 解析并映射图标
const getTabIcon = (name, itemImage) => {
  if (
    itemImage &&
    itemImage.startsWith('http') &&
    !itemImage.includes('example.com')
  ) {
    return formatImageUrl(itemImage);
  }
  const cleanName = String(name || '');
  if (cleanName.includes('线上')) return '/static/widsom/01.png';
  if (cleanName.includes('工具')) return '/static/widsom/02.png';
  if (cleanName.includes('官网') || cleanName.includes('门店'))
    return '/static/widsom/03.png';
  if (cleanName.includes('AI') || cleanName.includes('助手'))
    return '/static/widsom/04.png';
  if (cleanName.includes('直播')) return '/static/widsom/05.png';
  if (cleanName.includes('活动')) return '/static/widsom/06.png';
  return '/static/widsom/01.png';
};

const fetchPartnerList = async () => {
  try {
    const res = await getEnterpriseList({ pageSize: 10, pageNum: 1 });
    if (res && Array.isArray(res.rows) && res.rows.length > 0) {
      partnerList.value = Array.isArray(res.rows[0].cooperationMerchants)
        ? res.rows[0].cooperationMerchants.slice(0, 12)
        : [];
    }
  } catch (err) {
    console.error('获取合作伙伴数据失败: ', err);
  }
};

const fetchCompanyNewsList = async () => {
  try {
    const response = await getCompanyNewsList({
      pageSize: 4,
      pageNum: 1,
      type: 1,
    });
    if (response?.rows?.length > 0) {
      companyNewsList.value = response.rows.map((item, index) => ({
        ...item,
        newsTitle: truncateText(
          item.newsTitle || item.title || `动态标题${index + 1}`,
          21,
        ),
        newsContent: truncateText(
          item.newsContent || item.content || item.description || '',
          24,
        ),
        newsImages:
          Array.isArray(item.newsImages) && item.newsImages.length
            ? item.newsImages.map(formatImageUrl)
            : Array.isArray(item.images) && item.images.length
              ? item.images.map(formatImageUrl)
              : item.image
                ? [formatImageUrl(item.image)]
                : [
                    formatImageUrl(
                      'http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png',
                    ),
                  ],
        createTime:
          item.createTime ||
          item.createDate ||
          item.date ||
          new Date().toISOString(),
        newsId: item.newsId || item.id || index + 1,
      }));
    }
  } catch (error) {
    uni.showToast({ title: '获取案例展示失败', icon: 'none' });
  }
};

const navigateToRecentDetails = (item) => {
  uni.navigateTo({
    url:
      '/pages/recentdetails/index?newsId=' +
      item.newsId +
      '&newsTitle=' +
      item.newsTitle,
  });
};

const goToRecentUpdates = () => {
  uni.navigateTo({ url: '/pages/recentUpdatesnew/index' });
};

const formatImageUrl = (url) => {
  if (!url) return '';
  const imageUrl = String(url);
  if (/image_process=format,webp/i.test(imageUrl)) return imageUrl;
  if (/^(data:|blob:|wxfile:|file:|\/static\/)/i.test(imageUrl)) return imageUrl;

  const hashIndex = imageUrl.indexOf('#');
  const hash = hashIndex >= 0 ? imageUrl.slice(hashIndex) : '';
  const baseUrl = hashIndex >= 0 ? imageUrl.slice(0, hashIndex) : imageUrl;
  const separator = baseUrl.includes('?') ? '&' : '?';

  return `${baseUrl}${separator}image_process=format,webp${hash}`;
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
  fetchPartnerList();
  fetchCompanyNewsList();
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

onPageScroll((e) => {
  showBackTop.value = e.scrollTop > 600;
});

// 支持小程序分享
onShareAppMessage(() => {
  return {
    title: '月子智慧 — 一区一店，独家赋能月子中心全案增长',
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
  background-color: #f8f8f8;
  padding: 80rpx 0 72rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.escort-card-panel {
  width: 707rpx;
  margin-top: 50rpx;
  padding: 24rpx 20rpx 48rpx;
  background: #ffffff;
  border-radius: 14rpx;
  box-shadow: 0px 4rpx 32rpx 0px rgba(199, 199, 199, 0.4);
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

/* 横向滑动 scroll-view 容器 */
.escort-scroll-view {
  position: relative;
  width: 100%;
  padding-bottom: 34rpx;
  box-sizing: border-box;
  white-space: normal;
  display: flex;
  justify-content: center;
}

.escort-scroll-view ::v-deep .uni-scroll-view-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* 通用流程卡片 (01, 02, 03) */
.step-card {
  width: 215rpx;
  height: 280rpx;
  flex: 0 0 215rpx;
  white-space: normal; /* 卡片内文字恢复正常换行 */
  border-radius: 14rpx;
  box-shadow: 0px 5rpx 17rpx 0px rgba(220, 222, 229, 0.3);
  position: relative;
  padding: 31rpx 16rpx 20rpx;
  box-sizing: border-box;
  background-color: #ffffff;
  margin-right: 12rpx;
}

/* 02 卡片为重磅高贵蓝色渐变底色，作为流程视觉中心 */
.step-card.center-step {
  background: linear-gradient(180deg, #2668ff 0%, #1857e8 100%);
}

.step-card.center-step::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -13rpx;
  width: 44rpx;
  height: 18rpx;
  background: #1857e8;
  transform: translateX(-50%);
  clip-path: polygon(50% 100%, 0 0, 100% 0);
}

/* 卡片边距修正，保证两端滑动呼吸空间 */
.step-card:first-child {
  margin-left: 0;
}
.step-card:last-child {
  margin-right: 0;
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
  font-size: 37rpx;
  font-family: 'DIN Pro', system-ui, sans-serif;
  font-weight: normal;
  line-height: 51rpx;
  color: rgba(0, 0, 0, 0.2);
}
.center-step .step-number {
  color: rgba(255, 255, 255, 0.4);
}

/* 步骤中文核心字 */
.step-title {
  text-align: center;
  font-size: 28rpx;
  font-family: SourceHanSansCN-Revision, sans-serif;
  font-weight: 700;
  line-height: 41rpx;
  margin-top: -6rpx;
  color: #0f172a;
}
.center-step .step-title {
  color: #ffffff;
}

/* 分割虚线/实线图片 */
.step-divider-line {
  width: 187rpx;
  height: 1rpx;
  display: block;
  margin: 18rpx auto 0 auto;
}

/* 步骤内带小盾牌图标的功能丸子按钮容器 */
.capsule-button-container {
  width: 168rpx;
  height: 36rpx;
  margin: 25rpx auto 0 auto;
  box-shadow: 0px 0px 9rpx 0px rgba(189, 206, 240, 0.6);
  border-radius: 12rpx;
  overflow: hidden;
  transition: all 0.15s ease;
}

.capsule-button-container + .capsule-button-container {
  margin-top: 15rpx;
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
  justify-content: center;
  padding: 0 8rpx;
  box-sizing: border-box;
}

/* 按钮内核心微图标 */
.capsule-icon {
  width: 20rpx;
  height: 20rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 按钮内的小指引箭头/符号 */
.capsule-arrow {
  width: 4rpx;
  height: 16rpx;
  margin-left: 6rpx;
  flex-shrink: 0;
}

/* 按钮内的超精致小文字 */
.capsule-text {
  font-size: 20rpx;
  font-family: SourceHanSansCN-Revision, sans-serif;
  font-weight: 500;
  color: #475569;
  line-height: 28rpx;
  margin-left: 8rpx;
  white-space: nowrap;
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
  width: 46rpx;
  height: 46rpx;
  flex: 0 0 46rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 118rpx -17rpx 0 -17rpx; /* 极高工艺：悬挂在两卡片正中做连结 */
  position: relative;
  z-index: 5;
}

.plus-bridge-circle {
  width: 46rpx;
  height: 46rpx;
  min-width: 46rpx;
  min-height: 46rpx;
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
  width: 23rpx;
  height: 23rpx;
}

/* ========================================================
   步骤详情子 Tab 及数据驱动富文本区域 (扁平化通栏布局)
   ======================================================== */
.detail-section {
  width: 100%;
  background: #ffffff;
  border-radius: 0;
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 0;
  box-sizing: border-box;
  box-shadow: none;
}

.tab-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 68rpx;
  border-bottom: none;
  padding: 0;
  position: relative;
  border-radius: 254rpx;
  background: #ffffff;
  box-shadow: 0px 4rpx 24rpx 0px rgba(199, 199, 199, 0.28);
  overflow: visible;
}

.tab-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 1;
  height: 68rpx;
  padding: 0;
  border-radius: 254rpx;
  transition: all 0.2s ease;
}

.tab-item.tab-active {
  background: linear-gradient(97deg, #5b8bfa -6%, #1c5cf5 18%, #1e5ef5 71%, #3c75f9 104%);
}

.tab-item.tab-active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -14rpx;
  width: 42rpx;
  height: 18rpx;
  background: #1e5ef5;
  transform: translateX(-50%);
  clip-path: polygon(50% 100%, 0 0, 100% 0);
}

.tab-icon {
  width: 36rpx;
  height: 36rpx;
  margin-right: 14rpx;
  margin-bottom: 0;
  transition: transform 0.2s ease;
}

.tab-item:active .tab-icon {
  transform: scale(0.92);
}

.tab-name {
  font-size: 30rpx;
  color: #666666;
  font-weight: 700;
  line-height: 42rpx;
  transition:
    color 0.2s ease,
    font-weight 0.2s ease;
}

.tab-active .tab-name {
  color: #ffffff;
  font-weight: bold;
}

.tab-indicator {
  display: none;
}

.content-detail-box {
  margin-top: 32rpx;
  min-height: 1200rpx;
  background: #f8f8f8;
  overflow: hidden;
}

.wisdom-case-section {
  margin-top: 32rpx;
  border-radius: 14rpx;
  overflow: hidden;
}

.rich-content {
  font-size: 26rpx;
  color: #334155;
  line-height: 1.6;
}

.back-top-button {
  position: fixed;
  right: 30rpx;
  bottom: calc(120rpx + env(safe-area-inset-bottom));
  width: 84rpx;
  height: 84rpx;
  border-radius: 50%;
  background: linear-gradient(180deg, #5b8bfa 0%, #1c5cf5 100%);
  box-shadow: 0 10rpx 28rpx rgba(28, 92, 245, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

.back-top-arrow {
  font-size: 48rpx;
  font-weight: 700;
  color: #ffffff;
  line-height: 84rpx;
  transform: translateY(6rpx);
}

.wisdom-partners {
  width: 100%;
  margin-top: 32rpx;
  padding: 42rpx 18rpx 34rpx;
  background: #ffffff;
  box-sizing: border-box;
  overflow: hidden;
}

.wisdom-partners-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32rpx;
  font-size: 34rpx;
  line-height: 48rpx;
  font-weight: 800;
  color: #050505;
  letter-spacing: 1rpx;
}

.wisdom-partners-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rpx;
  margin-bottom: 34rpx;
}

.wisdom-partners-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
}

.wisdom-partners-row-0,
.wisdom-partners-row-1,
.wisdom-partners-row-2 {
  width: 660rpx;
}

.wisdom-partners-row-3,
.wisdom-partners-row-4 {
  width: 660rpx;
}

.wisdom-partners-row-1,
.wisdom-partners-row-3 {
  transform: translateX(-38rpx);
}

.wisdom-partners-cell {
  flex: 1;
  min-width: 0;
  height: 70rpx;
  background: #fcfcfd;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.wisdom-partners-cell-active {
  border: 5rpx solid #3976ff;
  background: #ffffff;
}

.wisdom-partners-logo {
  width: 78%;
  height: 58rpx;
}

.wisdom-partners-cta {
  height: 72rpx;
  margin: 0 2rpx;
  border-radius: 20rpx;
  background: linear-gradient(90deg, #235cf6 0%, #427cff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 28rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  box-shadow: 0 12rpx 24rpx rgba(37, 99, 235, 0.2);
}

.wisdom-partners-arrow {
  margin-left: 14rpx;
  font-size: 32rpx;
  line-height: 32rpx;
}
</style>
