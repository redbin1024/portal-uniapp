<template>
  <view class="detail-page">
    <view class="detail-top">
      <view class="detail-status-bar" :style="{ height: `${statusBarHeight}px` }"></view>
      <view class="detail-navbar">
        <view class="detail-back" @tap="goBack">
          <view class="detail-back-arrow"></view>
        </view>
        <text class="detail-navbar-title">{{ currentCard.title }}</text>
        <view class="detail-navbar-capsule">
        </view>
      </view>
    </view>

    <view class="detail-card">
      <view class="detail-section">
        <view v-if="currentTabs.length" class="tab-header">
          <view v-for="(tab, index) in currentTabs" :key="tab.id || index" class="tab-item"
            :class="{ 'tab-active': activeTabIndex === index }" @tap="changeTab(index)">
            <image class="tab-icon" :src="formatWisdomImageUrl(getWisdomTabIcon(tab.name, tab.image))"
              mode="aspectFit" />
            <text class="tab-name">{{ tab.name }}</text>
          </view>
        </view>
        <view v-else class="tab-header tab-header-empty">
          <text class="tab-empty-text">{{ loading ? '标签加载中...' : '暂无标签数据' }}</text>
        </view>

        <view class="content-detail-box">
          <mp-html v-if="currentActiveContent" class="rich-content" :content="formatRichText(currentActiveContent)"
            @imgtap="previewImage" />
          <view v-else class="empty-state">
            <text class="empty-title">{{ loading ? '加载中...' : '暂无详情内容' }}</text>
            <text class="empty-desc">当前模块的详情内容会在这里展示</text>
          </view>
        </view>

        <RecentDynamic v-if="showOnlineCustomerSections && companyNewsList.length > 0" class="wisdom-case-section"
          title="案例展示" subtitle="CASE DISPLAY" :list="companyNewsList" @select="navigateToRecentDetails"
          @more="goToRecentUpdates" />

        <view v-if="showOnlineCustomerSections && partnerList.length > 0" class="wisdom-partners">
          <view class="wisdom-partners-title">
            <text>500+月子中心</text>
            <text>共同选择</text>
          </view>
          <view class="wisdom-partners-stack">
            <view v-for="(row, rowIndex) in partnerRows" :key="rowIndex" class="wisdom-partners-row"
              :class="`wisdom-partners-row-${rowIndex}`">
              <view v-for="(item, index) in row" :key="index" class="wisdom-partners-cell">
                <image class="wisdom-partners-logo" :src="formatWisdomImageUrl(item)" mode="aspectFit" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <ShareFloatBtn />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import {
  onLoad,
  onShareAppMessage,
  onShareTimeline,
} from '@dcloudio/uni-app';
import mpHtml from 'uni-app-mp-html/components/mp-html/mp-html.vue';
import { get } from '@/utils/request.js';
import { getCompanyNewsList, getEnterpriseList } from '@/api/activity.js';
import { formatRichText } from '@/utils/richText.js';
import RecentDynamic from '@/pages/winthecustomer/components/RecentDynamic.vue';
import {
  getWisdomTabIcon,
  formatWisdomImageUrl,
} from '../config.js';
import {
  mapWisdomTypeToCard,
  normalizeWisdomTypeDetail,
  normalizeWisdomTypeRows,
  findWisdomTypeById,
  isPrimaryWisdomType,
} from '../apiAdapters.mjs';

const statusBarHeight = ref(uni.getSystemInfoSync().statusBarHeight || 20);
const currentTypeId = ref(0);
const activeTabIndex = ref(0);
const loading = ref(false);
const tabList = ref([]);
const partnerList = ref([]);
const companyNewsList = ref([]);
const typeDetail = ref(null);
const typeList = ref([]);
const currentType = computed(() => findWisdomTypeById(typeList.value, currentTypeId.value));
const currentTypeName = computed(() => typeDetail.value?.name || currentType.value?.name || '');

const currentCard = computed(() => {
  if (typeDetail.value) {
    return mapWisdomTypeToCard(typeDetail.value);
  }

  return {
    id: Number(currentTypeId.value) || 0,
    theme: 'blue',
    typeName: currentTypeName.value,
    title: currentTypeName.value || '月子智慧服务详情',
    subtitle: '',
    previewImage: '',
  };
});
const currentTabs = computed(() => tabList.value || []);
const currentActiveContent = computed(() => {
  if (!currentTabs.value.length) return '';
  const safeIndex =
    activeTabIndex.value >= currentTabs.value.length ? 0 : activeTabIndex.value;
  return currentTabs.value[safeIndex]?.content || '';
});
const showOnlineCustomerSections = computed(() => {
  return isPrimaryWisdomType(typeList.value, currentTypeName.value) && activeTabIndex.value === 0;
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

const normalizeTabRows = (res) => {
  if (!res) return [];

  if (Array.isArray(res)) return res;
  if (Array.isArray(res.rows)) return res.rows;
  if (Array.isArray(res.list)) return res.list;
  if (Array.isArray(res.records)) return res.records;

  const data = res.data;
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== 'object') return [];

  if (Array.isArray(data.rows)) return data.rows;
  if (Array.isArray(data.list)) return data.list;
  if (Array.isArray(data.records)) return data.records;
  if (Array.isArray(data.data)) return data.data;

  if (data.rows && Array.isArray(data.rows.rows)) return data.rows.rows;
  if (data.list && Array.isArray(data.list.rows)) return data.list.rows;

  return [];
};

const fetchListData = async (typeId) => {
  try {
    loading.value = true;
    const res = await get('/mp/biz/postnatalCare/list', { typeId });
    const rows = normalizeTabRows(res);
    tabList.value = rows;
    activeTabIndex.value = 0;

    if (!rows.length) {
      console.warn('[Wisdom Detail] no tab rows found for typeId:', typeId, res);
    }
  } catch (err) {
    console.error('获取月子智慧详情失败: ', err);
    uni.showToast({
      title: '详情加载失败',
      icon: 'none',
    });
  } finally {
    loading.value = false;
  }
};

const fetchTypeList = async () => {
  try {
    const res = await get(
      '/mp/biz/postnatalCareType/list',
      {
        pageNum: 1,
        pageSize: 50,
      },
      { loading: false },
    );
    typeList.value = normalizeWisdomTypeRows(res);
  } catch (error) {
    console.error('获取月子智慧类型列表失败: ', error);
  }
};

const fetchTypeDetail = async (id) => {
  if (!id) return;
  try {
    const res = await get(`/mp/biz/postnatalCareType/${id}`, {}, { loading: false });
    const detail = normalizeWisdomTypeDetail(res);

    if (detail) {
      typeDetail.value = detail;
    }
  } catch (error) {
    console.error('获取月子智慧类型详情失败: ', error);
  }
};

const syncCurrentType = async () => {
  const matchedType = findWisdomTypeById(typeList.value, currentTypeId.value);

  if (!matchedType) {
    typeDetail.value = null;
    tabList.value = [];
    return;
  }

  await fetchTypeDetail(matchedType.id);
  await fetchListData(matchedType.id);
};

const changeTab = (index) => {
  activeTabIndex.value = index;
};

const truncateText = (text, max) => {
  if (!text) return '';
  return text.length > max ? text.substring(0, max) : text;
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
            ? item.newsImages.map(formatWisdomImageUrl)
            : Array.isArray(item.images) && item.images.length
              ? item.images.map(formatWisdomImageUrl)
              : item.image
                ? [formatWisdomImageUrl(item.image)]
                : [],
        createTime:
          item.createTime ||
          item.createDate ||
          item.date ||
          new Date().toISOString(),
        newsId: item.newsId || item.id || index + 1,
      }));
    }
  } catch (error) {
    console.error('获取案例展示失败: ', error);
  }
};

const previewImage = (e) => {
  uni.previewImage({
    current: e.detail.src,
    urls: e.detail.imgs,
  });
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

const goBack = () => {
  uni.navigateBack({
    fail: () => {
      uni.switchTab({ url: '/pages/wisdom/index' });
    },
  });
};

onLoad((options) => {
  currentTypeId.value = Number(options?.typeId) || 0;
  fetchPartnerList();
  fetchCompanyNewsList();
  fetchTypeList().then(() => {
    syncCurrentType();
  });
});

onShareAppMessage(() => {
  return {
    title: currentCard.value.title,
    path: `/pages/wisdom/detail/index?typeId=${currentTypeId.value}`,
  };
});

onShareTimeline(() => {
  return {
    title: currentCard.value.title,
    query: `typeId=${currentTypeId.value}`,
  };
});
</script>

<style lang="scss" scoped>
.detail-page {
  min-height: 100vh;
  background: #ffffff;
  box-sizing: border-box;
}

.detail-top {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(180deg, #0d52c1 13%, #0877e3 100%);
}

.detail-status-bar {
  width: 100%;
}

.detail-navbar {
  height: 88rpx;
  padding: 0 28rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}

.detail-back {
  width: 88rpx;
  height: 88rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-back-arrow {
  width: 24rpx;
  height: 24rpx;
  border-left: 5rpx solid #ffffff;
  border-bottom: 5rpx solid #ffffff;
  transform: rotate(45deg);
}

.detail-navbar-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  font-size: 32rpx;
  line-height: 72rpx;
  color: #ffffff;
  font-weight: 700;
}

.detail-card {
  width: 750rpx;
}

.detail-section {
  width: 100%;
}

.tab-header {
  position: relative;
  display: flex;
  width: 100%;
  height: 128rpx;
  background: #ffffff;
  box-sizing: border-box;
  overflow: visible;
  padding: 18rpx 32rpx;
  gap: 24rpx;
  border-bottom: 1rpx solid #e2e8f0;
}

.tab-header-empty {
  justify-content: center;
  align-items: center;
  padding: 0;
}

.tab-empty-text {
  font-size: 24rpx;
  color: #94a3b8;
  line-height: 36rpx;
}

.tab-item {
  position: relative;
  display: flex;
  flex: 1 1 50%;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 92rpx;
  border-radius: 46rpx;
  transition: all 0.2s ease;
  box-sizing: border-box;
  overflow: visible;
}

.tab-item.tab-active {
  background-color: #0e50be;
  z-index: 1;
}

.tab-active::after {
  content: '';
  position: absolute;
  bottom: -12rpx;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 24rpx;
  height: 24rpx;
  background-color: #0e50be;
  border-bottom-right-radius: 6rpx;
  z-index: 2;
}

.tab-icon {
  width: 38rpx;
  height: 38rpx;
  margin-right: 14rpx;
  flex-shrink: 0;
  opacity: 0.7;
  position: relative;
  z-index: 1;
}

.tab-name {
  font-size: 28rpx;
  line-height: 40rpx;
  color: #6b7280;
  font-weight: 700;
  position: relative;
  z-index: 1;
}

.tab-active .tab-icon {
  filter: brightness(0) invert(1);
  opacity: 1;
}

.tab-active .tab-name {
  color: #ffffff;
}

.content-detail-box {
  min-height: 760rpx;
  padding: 36rpx 32rpx;
  box-sizing: border-box;
}

.rich-content {
  font-size: 26rpx;
  color: #334155;
  line-height: 1.7;
}

.rich-content :deep(img) {
  display: block;
  max-width: 100%;
  height: auto;
}

.wisdom-case-section {
  margin-top: 32rpx;
  border-radius: 14rpx;
  overflow: hidden;
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
}

.wisdom-partners-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6rpx;
}

.wisdom-partners-row-0,
.wisdom-partners-row-1,
.wisdom-partners-row-2,
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

.wisdom-partners-logo {
  width: 78%;
  height: 58rpx;
}

.empty-state {
  min-height: 560rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
}

.empty-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #334155;
}

.empty-desc {
  margin-top: 12rpx;
  font-size: 24rpx;
  color: #94a3b8;
}

</style>
