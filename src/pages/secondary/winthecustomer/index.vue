<template>
  <scroll-view
    class="main page-scroll"
    scroll-y
    scroll-anchoring
    enhanced
    enable-passive
    bounces
    enable-back-to-top="true"
    style="height: 100vh"
    @scroll="onScroll"
  >
    <!-- <VearCarousel
      :img-list="imgList"
      url-key="url"
      :show-title="true"
      @selected="selectedBanner"
      @video-play="onVideoPlay"
      @video-pause="onVideoPause"
      @video-ended="onVideoEnded"
      @video-error="onVideoError"
      @fullscreen-change="onFullscreenChange"
      @pause-all-videos="onPauseAllVideos"
    /> -->

    <view
      class="hero-banner reveal"
      :class="{ 'reveal--visible': visibleSet.has('hero') }"
      data-reveal-id="hero"
    >
      <image
        class="hero-banner__bg"
        src="/static/banner_02.png"
        mode="aspectFill"
      />
      <view class="hero-banner__overlay"></view>
      <view class="hero-banner__content">
        <text class="hero-banner__title">全域线上获客解决方案</text>
        <text class="hero-banner__desc">
          我们专为月子中心提供线上获客方案，专业运营精准锁定同城孕妈，从品牌曝光到高效转化，签单更轻松全程无忧。
        </text>
        <view class="hero-banner__btn" @click="goToServiceDetail">
          <text class="hero-banner__btn-text">了解更多</text>
          <view class="hero-banner__arrows">
            <image
              class="hero-banner__arrow"
              src="/static/right-arrow.svg"
              mode="aspectFit"
            />
            <image
              class="hero-banner__arrow hero-banner__arrow--second"
              src="/static/right-arrow.svg"
              mode="aspectFit"
            />
          </view>
        </view>
      </view>
    </view>

    <view
      class="intro-section reveal"
      :class="{ 'reveal--visible': visibleSet.has('intro') }"
      data-reveal-id="intro"
    >
      <view class="intro-section__title">我们是谁</view>
      <view class="intro-section__body">
        <text class="intro-section__text">
          天天拓客是专注为月子中心、产后康复机构提供全域线上获客的专业服务品牌。我们深耕本地母婴流量运营，依托成熟的线上推广体系与精细化运营团队，精准挖掘同城高意向孕妈群体，从品牌曝光、内容种草、线索获取到到店转化，提供全流程一站式解决方案。
        </text>
        <text class="intro-section__text">
          公司以“高效拓客、轻松满房”为核心，凭借对月子行业的深度理解，量身定制差异化获客策略，省去门店自行摸索试错成本，真正实现客源稳定、业绩增长、运营省心，助力合作月子中心持续健康发展。
        </text>
      </view>
      <view class="intro-section__icon-wrap">
        <image
          class="intro-section__icon"
          src="/static/right-arrow.svg"
          mode="aspectFit"
        />
      </view>
    </view>

    <view
      class="dynamic reveal"
      :class="{ 'reveal--visible': visibleSet.has('dynamic') }"
      data-reveal-id="dynamic"
    >
      <view class="dynamic-title2">
        <view class="dynamic-title">最近动态</view>
      </view>
      <!-- 动态内容区域 -->
      <view class="dynamic-content">
        <view
          class="dynamic-item"
          v-for="(item, index) in companyNewsList"
          :key="index"
          :class="{
            'dynamic-item-visible': visibleDynamicItems.includes(index),
          }"
          @click="navigateToRecentDetails(item)"
        >
          <!-- 时间线 -->
          <view class="dynamic-timeline">
            <view
              class="step-dot"
              :class="{ 'animate-dot': visibleDynamicItems.includes(index) }"
            ></view>
            <view
              class="step-line"
              v-if="index < companyNewsList.length - 1"
            ></view>
          </view>

          <!-- 内容区 -->
          <view
            class="dynamic-body"
            :class="{
              'animate-fade-in': visibleDynamicItems.includes(index),
            }"
          >
            <view class="dynamic-meta">
              <view class="dynamic-date">{{
                formatDate(item.createTime)
              }}</view>
            </view>
            <view class="dynamic-text1">{{ item.newsTitle }}</view>
            <view class="dynamic-text">{{ item.newsContent }}</view>
            <view class="dynamic-media">
              <image
                class="dynamic-image"
                :src="item.newsImages[0] + '?image_process=format,webp'"
                mode="aspectFill"
              ></image>
            </view>
          </view>
        </view>
      </view>
      <!-- 查看更多按钮 -->
      <!-- <view
        class="view-more-btn"
        :class="{ 'view-more-animate': showDynamicViewMoreBtn }"
        v-show="showDynamicViewMoreBtn"
        @click="goToRecentUpdates"
      >
        <text class="view-more-text">查看更多</text>
        <text class="arrow-right">→</text>
      </view> -->
      <view class="intro-section__btn" @click="goToRecentUpdates">
        <text class="intro-section__btn-text">了解更多</text>
      </view>
    </view>

    <view
      class="container reveal"
      :class="{ 'reveal--visible': visibleSet.has('case') }"
      data-reveal-id="case"
    >
      <!-- <view class="container-title">成功案例</view> -->
      <view class="dynamic-title2" style="margin-bottom: 36rpx">
        <view class="dynamic-title">商家案例</view>
      </view>
      <swiper
        class="case-swiper"
        :indicator-dots="false"
        :autoplay="true"
        :loop="true"
        :current="caseCurrent"
        next-margin="60rpx"
        @change="onCaseSwiperChange"
      >
        <swiper-item
          v-for="(item, index) in successCaseList"
          :key="index"
          class="case-swiper-item"
        >
          <view class="case-card" @click="navigateToDetail(item)">
            <view class="case-card__media">
              <image
                class="case-card__img"
                :src="item.caseImages[0] + '?image_process=format,webp'"
                mode="aspectFill"
              ></image>
            </view>
            <view class="case-card__title">{{ item.customerName }}</view>
            <view class="case-card__desc">{{ item.caseValue }}</view>
          </view>
        </swiper-item>
      </swiper>

      <view class="case-controls">
        <view class="case-card__indicator">
          <view
            class="case-card__segment"
            v-for="d in successCaseList.length"
            :key="d"
            :class="{ 'case-card__segment--active': d - 1 === caseCurrent }"
          ></view>
        </view>
        <view class="case-card__btn" @click="nextCase">
          <image
            class="case-card__btn-icon"
            src="/static/right-arrow.svg"
            mode="aspectFit"
          ></image>
        </view>
      </view>

      <view class="case-learn-more" @click="goToCooperationcase">
        <text class="case-learn-more__text">了解更多</text>
      </view>
    </view>
  </scroll-view>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
  getCurrentInstance,
} from 'vue';
import { onShow, onHide } from '@dcloudio/uni-app';
import {
  getcaseList,
  getCompanyNewsList,
  getsuccessCaseList,
} from '@/api/activity.js';
import basePoint from '@/utils/basePoint.js';

// 响应式数据
const visibleDynamicItems = ref([]);
const visibleListItems = ref([]);
const showDynamicViewMoreBtn = ref(false);
const showCaseViewMoreBtn = ref(false);
const companyNewsList = ref([]);
const successCaseList = ref([]);
const caseCurrent = ref(0);

const onCaseSwiperChange = (e) => {
  caseCurrent.value = e.detail.current;
};
// 方法定义

const goToServiceDetail = () => {
  uni.navigateTo({
    url: '/pages/secondary/serviceDetail/index',
  });
};

//查询公司动态列表
const fetchsuccessCaseList = async () => {
  try {
    const response = await getsuccessCaseList({
      pageSize: 4,
      pageNum: 1,
    });
    console.log('企业列表数据:', response);
    if (
      response &&
      response.rows &&
      Array.isArray(response.rows) &&
      response.rows.length > 0
    ) {
      successCaseList.value = response.rows;
    }
  } catch (error) {
    console.error('获取企业列表失败:', error);
    uni.showToast({
      title: '获取企业列表失败',
      icon: 'none',
    });
  }
};
// 文字截取函数
const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) : text;
};

//查询公司动态列表
const fetchCompanyNewsList = async () => {
  try {
    const response = await getCompanyNewsList({
      pageSize: 4,
      pageNum: 1,
      type: 1,
    });
    console.log('公司动态数据:', response);

    if (
      response &&
      response.rows &&
      Array.isArray(response.rows) &&
      response.rows.length > 0
    ) {
      // 对数据进行安全处理
      const processedData = response.rows.map((item, index) => {
        console.log(`处理第${index + 1}个动态项:`, item);

        // 安全获取字段值，使用默认值防止undefined
        const newsTitle =
          item.newsTitle || item.title || `动态标题${index + 1}`;
        const newsContent =
          item.newsContent ||
          item.content ||
          item.description ||
          `动态内容${index + 1}`;
        const createTime =
          item.createTime ||
          item.createDate ||
          item.date ||
          new Date().toISOString();

        // 安全处理图片数组
        let newsImages = [];
        if (
          item.newsImages &&
          Array.isArray(item.newsImages) &&
          item.newsImages.length > 0
        ) {
          newsImages = item.newsImages;
        } else if (
          item.images &&
          Array.isArray(item.images) &&
          item.images.length > 0
        ) {
          newsImages = item.images;
        } else if (item.image) {
          newsImages = [item.image];
        } else {
          // 使用默认图片
          newsImages = [
            'http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png',
          ];
        }

        return {
          ...item,
          newsTitle: truncateText(newsTitle, 21),
          newsContent: truncateText(newsContent, 24),
          newsImages: newsImages,
          createTime: createTime,
          newsId: item.newsId || item.id || index + 1,
        };
      });

      console.log('处理后的动态数据:', processedData);
      companyNewsList.value = processedData;

      // 确保数据更新后重新检查可见性
      setTimeout(() => {
        checkDynamicItemVisibility();
        showAllDynamicItems();
      }, 100);
    } else {
      console.log('没有获取到动态数据，使用默认数据');
      // 使用默认数据作为后备
      const defaultData = [
        {
          newsId: 1,
          newsTitle: '公司成功完成新项目',
          newsContent: '我们很高兴地宣布，公司成功完成了最新的软件开发项目。',
          createTime: '2024-10-25',
          newsImages: [
            'http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png',
          ],
        },
        {
          newsId: 2,
          newsTitle: '技术团队培训完成',
          newsContent: '我们的技术团队完成了新一轮的技能培训，提升了服务质量。',
          createTime: '2024-10-20',
          newsImages: [
            'http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png',
          ],
        },
        {
          newsId: 3,
          newsTitle: '客户满意度持续提升',
          newsContent: '通过持续优化服务流程，我们的客户满意度达到了新的高度。',
          createTime: '2024-10-15',
          newsImages: [
            'http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png',
          ],
        },
      ];

      companyNewsList.value = defaultData;

      // 显示默认数据后重新检查可见性
      setTimeout(() => {
        showAllDynamicItems();
      }, 100);
    }
  } catch (error) {
    console.error('获取公司动态失败:', error);
    uni.showToast({
      title: '获取动态信息失败',
      icon: 'none',
    });

    // 发生错误时也使用默认数据
    const fallbackData = [
      {
        newsId: 1,
        newsTitle: '欢迎了解我们的服务',
        newsContent: '我们致力于为客户提供最优质的技术解决方案。',
        createTime: '2024-10-30',
        newsImages: [
          'http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png',
        ],
      },
    ];

    companyNewsList.value = fallbackData;

    // 显示备用数据后重新检查可见性
    setTimeout(() => {
      showAllDynamicItems();
    }, 100);
  }
};
//查询商家案例列表
const fetchcaseList = async () => {
  try {
    const response = await getcaseList({
      pageSize: 10,
      pageNum: 1,
    });
    console.log('案例列表数据:', response);
    if (response && response.rows) {
      let data = response.rows;
      let slideshowData = [];
      data.forEach((res, index) => {
        if (res.caseImages && res.caseImages.length > 0) {
          slideshowData.push({
            type: 'image',
            url: res.caseImages[0],
            src: res.caseImages[0],
            title: res.caseName || '',
            description: res.caseDescription || '',
            id: res.id || index,
            caseTitle: res.caseTitle,
          });
        }
      });
      console.log('案例轮播数据:', slideshowData);
    }
  } catch (error) {
    console.error('获取案例列表失败:', error);
    uni.showToast({
      title: '获取案例列表失败',
      icon: 'none',
    });
  }
};
/**
 * 跳转到最近动态详情页面并传递item数据
 */
const navigateToRecentDetails = (item) => {
  uni.navigateTo({
    url:
      '/pages/recentdetails/index?newsId=' +
      item.newsId +
      '&newsTitle=' +
      item.newsTitle,
  });
};

// 跳转到最近动态页面
const goToRecentUpdates = () => {
  uni.navigateTo({
    url: '/pages/recentUpdatesnew/index',
  });
};

const nextCase = () => {
  if (successCaseList.value.length === 0) return;
  caseCurrent.value = (caseCurrent.value + 1) % successCaseList.value.length;
};

// 跳转到合作商家页面
const goToCooperationcase = () => {
  uni.navigateTo({
    url: '/pages/case/index',
  });
};

// 添加小程序分享给好友功能
const onShareAppMessage = (res) => {
  return {
    title: '合作商家',
    path: '/pages/secondary/winthecustomer/index',
    imageUrl: '', // 可以设置默认分享封面图
  };
};

// 添加小程序分享到朋友圈功能
const onShareTimeline = () => {
  return {
    title: '合作商家',
    query: '',
    imageUrl: '', // 可以设置默认分享封面图
  };
};

// scroll-view 滚动事件处理
const onScroll = (e) => {
  // 滚动时检查list-item可见性
  checkListItemVisibility();
  // 滚动时检查dynamic-item可见性
  checkDynamicItemVisibility();
};

// 检查list-item是否在视窗内的函数
const checkListItemVisibility = () => {
  uni.getSystemInfo({
    success: (res) => {
      const windowHeight = res.windowHeight;
      uni
        .createSelectorQuery()
        .selectAll('.list-item')
        .boundingClientRect((rects) => {
          if (!rects || !rects.length) return;
          rects.forEach((rect, index) => {
            if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
              setTimeout(() => {
                visibleListItems.value[index] = true;
                const visibleCount =
                  visibleListItems.value.filter(Boolean).length;
                if (visibleCount === successCaseList.value.length) {
                  setTimeout(() => {
                    showCaseViewMoreBtn.value = true;
                  }, 500);
                }
              }, index * 150);
            }
          });
        })
        .exec();
    },
  });
};

// 检查dynamic-item是否在视窗内的函数
const checkDynamicItemVisibility = () => {
  const query = uni.createSelectorQuery();
  query
    .selectAll('.dynamic-item')
    .boundingClientRect((rects) => {
      if (rects && rects.length > 0) {
        rects.forEach((rect, index) => {
          setTimeout(() => {
            if (!visibleDynamicItems.value.includes(index)) {
              visibleDynamicItems.value.push(index);
            }
            // 当所有动态内容项都显示完成后，显示查看更多按钮
            if (
              visibleDynamicItems.value.length === companyNewsList.value.length
            ) {
              setTimeout(() => {
                showDynamicViewMoreBtn.value = true;
              }, 200); // 延迟500ms显示按钮，让动画更自然
            }
          }, index * 50); // 每个元素间隔200ms，让动画更流畅
        });
      }
    })
    .exec();
};

// 直接显示所有动态内容项的函数
const showAllDynamicItems = () => {
  // 页面加载时直接显示所有动态项
  companyNewsList.value.forEach((_, index) => {
    setTimeout(() => {
      if (!visibleDynamicItems.value.includes(index)) {
        visibleDynamicItems.value.push(index);
      }

      // 当所有动态内容项都显示完成后，显示查看更多按钮
      if (visibleDynamicItems.value.length === companyNewsList.value.length) {
        setTimeout(() => {
          showDynamicViewMoreBtn.value = true;
        }, 500); // 延迟500ms显示按钮，让动画更自然
      }
    }, index * 200); // 每个元素间隔200ms，让动画更流畅
  });
};

const navigateToDetail = (item) => {
  uni.navigateTo({
    url: '/pages/casedetails/index?successCaseId=' + item.successCaseId,
  });
};

const getBackgroundColor = (index) => {
  const colors = ['#FFEFEB', '#DFF1FF', '#EDF1FF', '#DAF9FF'];
  return colors[index % 4];
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
  () => [companyNewsList.value.length, successCaseList.value.length],
  () => {
    nextTick(() => {
      setTimeout(setupRevealObserver, 100);
    });
  },
);

// 生命周期钩子
onMounted(() => {
  // 初始化时检查list-item可见性
  // 直接显示所有动态内容项，不依赖滚动检测
  setTimeout(() => {
    showAllDynamicItems(); // 直接显示所有动态项，立即触发动画
    checkListItemVisibility();
  }, 100); // 延迟100ms，确保页面元素已渲染完成
  fetchcaseList(); // 暂时注释掉，因为当前页面主要显示服务信息
  fetchCompanyNewsList();
  fetchsuccessCaseList();
  nextTick(() => {
    setTimeout(setupRevealObserver, 100);
  });
});

onBeforeUnmount(() => {
  if (revealObserver) {
    revealObserver.disconnect();
    revealObserver = null;
  }
});

// 格式化日期，只显示年月日
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return dateStr.split(' ')[0];
};

// uni-app 生命周期
onShow(async () => {
  await basePoint.trackingStart({
    visitModule: '获客',
    visitContent: '获客',
  });
});
onHide(async () => {
  let trackingId = uni.getStorageSync('trackingId');
  if (trackingId) {
    await basePoint.trackingEnd({
      id: trackingId,
    });
  }
});
</script>

<style scoped>
view,
image,
text {
  box-sizing: border-box;
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

.main {
  background: #ffffff;
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  /* scroll-view 需要固定高度才能滚动 */
}

/**最近动态 */
.dynamic {
  background: #ffffff;
  padding: 60rpx 26rpx 40rpx;
}

.dynamic-title2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dynamic-title {
  font-size: 44rpx;
  font-weight: bold;
  line-height: 60rpx;
  color: #000000;
  text-align: center;
}

.dynamic-title1 {
  font-size: 28rpx;
  color: #b1b0b0;
  text-align: center;
}

/* 动态内容样式 */
.dynamic-content {
  margin-top: 36rpx;
}

/* ===== 最近动态卡片 ===== */
.dynamic-item {
  display: flex;
  align-items: stretch;
  margin-bottom: 0;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

/* 时间线 */
.dynamic-timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 48rpx;
  flex-shrink: 0;
  position: relative;
  padding-top: 2rpx;
}

.step-dot {
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  border: 2rpx solid #000000;
  background-color: #ffffff;
  z-index: 2;
  position: relative;
  transform: scale(0.6);
  opacity: 0.6;
  transition: all 0.4s ease-out 0.2s;
}

.step-dot.animate-dot {
  transform: scale(1);
  opacity: 1;
}

.step-line {
  width: 2rpx;
  background-color: #e0e0e0;
  position: absolute;
  top: 24rpx;
  left: 50%;
  bottom: 0;
  z-index: 1;
  transform: translateX(-1rpx);
}

/* 内容区 */
.dynamic-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 16rpx;
  padding-bottom: 40rpx;
  /* 初始状态 */
  transform: translateX(-40rpx);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.dynamic-body.animate-fade-in {
  transform: translateX(0);
  opacity: 1;
}

.dynamic-meta {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
}

.dynamic-date {
  font-size: 28rpx;
  font-weight: 700;
  color: #000000;
}

.dynamic-text1 {
  color: #000000;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 42rpx;
  margin-bottom: 4rpx;
}

.dynamic-text {
  font-size: 24rpx;
  color: #3d3d3d;
  line-height: 36rpx;
  margin-bottom: 12rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dynamic-media {
  width: 100%;
  border-radius: 10rpx;
  overflow: hidden;
  background-color: #f0f0f0;
}

.dynamic-image {
  width: 100%;
  height: 328rpx;
  border-radius: 10rpx;
}

/**成功案例 */
.container {
  padding: 60rpx 26rpx 40rpx;
  background-color: #fff;
}

.container-title {
  font-size: 40rpx;
  font-weight: bold;
  color: #000000;
  margin-bottom: 36rpx;
  text-align: center;
}

/* ===== 商家案例轮播 ===== */
.case-swiper {
  width: 100%;
  height: 600rpx;
}

.case-swiper-item {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 0 12rpx;
}

/* ===== 商家案例卡片 ===== */
.case-card {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

/* 图片区域 */
.case-card__media {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: 436rpx;
  margin-bottom: 16rpx;
}

.case-card__img {
  flex: 1;
  height: 436rpx;
  border-radius: 10rpx;
  background-color: #f0f0f0;
}

.case-card__strip {
  width: 64rpx;
  height: 436rpx;
  margin-left: 12rpx;
  border-radius: 10rpx;
  background-color: #f0f0f0;
}

/* 标题和描述 */
.case-card__title {
  width: 100%;
  font-size: 28rpx;
  font-weight: 700;
  line-height: 36rpx;
  color: #000000;
  margin-top: 16rpx;
  text-align: center;
}

.case-card__desc {
  font-size: 22rpx;
  font-weight: 400;
  line-height: 32rpx;
  color: #636363;
  margin-top: 6rpx;
  margin-bottom: 21rpx;
  text-align: center;
}

/* 共用控制栏 */
.case-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 16rpx;
}

/* 分段进度指示器 */
.case-card__indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  height: 60rpx;
  padding: 0 28rpx;
  border-radius: 30rpx;
  background-color: #f4f5f9;
}

.case-card__segment {
  width: 10rpx;
  height: 10rpx;
  border-radius: 5rpx;
  background-color: #d8d8d8;
  transition: all 0.3s ease;
}

.case-card__segment--active {
  width: 28rpx;
  background-color: #006dff;
  border-radius: 5rpx;
}

.case-card__btn {
  width: 60rpx;
  height: 60rpx;
  margin-left: 20rpx;
  border-radius: 50%;
  background-color: #006dff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.case-card__btn-icon {
  width: 30%;
  height: 40%;
}

/* 了解更多 */
.case-learn-more {
  margin: 44rpx auto 0;
  width: 240rpx;
  height: 64rpx;
  border-radius: 16rpx;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.case-learn-more__text {
  font-size: 24rpx;
  font-weight: 500;
  line-height: 34rpx;
  color: #ffffff;
}
/**轮播图样式 */
.slideshow {
  width: 100%;
  height: 800rpx;
  position: relative;
  overflow: hidden;
}

.slideshow-item {
  width: 100%;
  height: 100%;
  position: relative;
}

.slideshow-image {
  width: 100%;
  height: 100%;
}

.slideshow-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20rpx;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
}

.slideshow-title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.slideshow-desc {
  font-size: 24rpx;
}
/* 查看更多按钮样式 */
.view-more-btn {
  display: flex;
  justify-content: center;
  background: #f3f5fb;
  border-radius: 8rpx;
  width: 100%;
  height: 88rpx;
  color: #313131;
  font-size: 30rpx;
  line-height: 88rpx;
  margin: 0rpx 0 20rpx 0;
  opacity: 0;
  transform: translateY(20rpx);
  transition: all 0.6s ease-out;
}

/* 当按钮显示时的动画效果 */
.view-more-btn.view-more-animate {
  opacity: 1;
  transform: translateY(0);
}

.view-more-btn:active {
  opacity: 0.7;
}

.viewmore {
  display: flex;
  justify-content: center;
  background: #f3f5fb;
  border-radius: 8rpx;
  width: 100%;
  height: 72rpx;
  color: #313131;
  font-size: 30rpx;
  line-height: 72rpx;
  margin: 28rpx 0 60rpx 0;
}

/* ===== hero banner ===== */
.hero-banner {
  position: relative;
  width: 100%;
  height: 748rpx;
  overflow: hidden;
}

.hero-banner__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-banner__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-banner__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 250rpx;
}

.hero-banner__title {
  font-size: 44rpx;
  font-weight: 700;
  line-height: 60rpx;
  color: #ffffff;
  text-align: center;
}

.hero-banner__desc {
  font-size: 24rpx;
  font-weight: 400;
  line-height: 28rpx;
  color: #ffffff;
  text-align: center;
  margin-top: 16rpx;
  padding: 0 60rpx;
}

.hero-banner__btn {
  margin-top: 36rpx;
  width: 222rpx;
  height: 62rpx;
  border-radius: 12rpx;
  border: 1.4rpx solid #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.hero-banner__btn-text {
  font-size: 18rpx;
  font-weight: 500;
  line-height: 28rpx;
  color: #ffffff;
}

.hero-banner__arrows {
  position: relative;
  width: 16rpx;
  height: 16rpx;
  margin-left: 4rpx;
}

.hero-banner__arrow {
  position: absolute;
  width: 10rpx;
  height: 6rpx;
  top: 18%;
  left: 18%;
}

.hero-banner__arrow--second {
  top: 44%;
}

.hero-banner__deco {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 375rpx;
  height: 432rpx;
  z-index: 1;
}

/* ===== 我们是谁 ===== */
.intro-section {
  background: #ffffff;
  padding: 60rpx 26rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.intro-section__title {
  font-size: 40rpx;
  font-weight: bold;
  color: #000000;
  text-align: center;
  margin-bottom: 36rpx;
}

.intro-section__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.intro-section__text {
  font-size: 28rpx;
  color: #4a4a4a;
  line-height: 1.8;
  text-align: center;
  margin-bottom: 28rpx;
}

.intro-section__icon-wrap {
  margin-top: 12rpx;
  display: flex;
  justify-content: center;
}

.intro-section__icon {
  width: 36rpx;
  height: 36rpx;
  opacity: 0.6;
}

.intro-section__btn {
  margin: 0 auto;
  margin-top: 28rpx;
  width: fit-content;
  height: 56rpx;
  width: 176rpx;
  border-radius: 14rpx;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro-section__btn-text {
  font-size: 20rpx;
  font-weight: 500;
  line-height: 28rpx;
  color: #f4f5f9;
}
</style>
