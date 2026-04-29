<template>
  <view class="main">
    <view class="issue-list">
      <view
        v-for="(item, index) in problemList"
        :key="index"
        class="issue-card-wrap"
        :class="{ 'issue-card-wrap--active': index === 0 }"
        @click="goToIndex(item)"
      >
        <view class="issue-card">
          <view class="issue-card-inner">
            <text class="issue-card-title">{{ item.title }}</text>
            <text class="issue-card-desc">{{ item.introName }}</text>
          </view>
        </view>
      </view>
      <view class="issue-more" v-if="!isFinish" @click="loadMore">
        <view class="issue-more-inner">
          <text class="issue-more-text">查看更多</text>
        </view>
      </view>
    </view>
  </view>
  <BackHome />
</template>

<script>
export default {
  onShareAppMessage() {
    return {
      title: '列表',
      path: '/pages/secondary/issueList/index',
    };
  },
  onShareTimeline() {
    return {
      title: '列表',
      query: '',
    };
  },
};
</script>

<script setup>
import { onShow, onReachBottom } from '@dcloudio/uni-app';
import { ref, onMounted } from 'vue';
import { getEnterpriseList, getProductIntroList } from '@/api/activity.js';

const problemIcons = ref([
  'http://cdn.xiaodingdang1.com/2026/01/07/329586497cb141d69864b7ffe44c01e2.png',
  'http://cdn.xiaodingdang1.com/2026/01/07/3c68ffd0fa574800b29257226f5d92cf.png',
  'http://cdn.xiaodingdang1.com/2026/01/07/3500dffbb8d24fa1970e0e1c33a9fcd4.png',
  'http://cdn.xiaodingdang1.com/2026/01/07/a4859ef57e154df784dde7f35a99a3a8.png',
  'http://cdn.xiaodingdang1.com/2026/01/07/eb5b036256d842e199c48424b5bda131.png',
  'http://cdn.xiaodingdang1.com/2026/01/07/303e3c6ea6b34406bf1024b2cb0e9a70.png',
]);
const problemOverlayImages = ref([]);
const problemList = ref([]);
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref(0);
const isFinish = ref(false);
const goToIndex = (item) => {
  if (item.introType == 2) {
    let url =
      '/pages/secondary/index/index?url=' +
      item.videoUrl +
      '&visitContent=' +
      item.title;
    if (item.coverImage) {
      url += '&coverImage=' + encodeURIComponent(item.coverImage);
    }
    uni.navigateTo({
      url: url,
    });
  } else {
    uni.navigateTo({
      url: '/pages/secondary/issueDetails/index?introId=' + item.introId,
    });
  }
};
// 获取企业列表数据
const fetchEnterpriseList = async () => {
  try {
    const response = await getEnterpriseList({
      pageSize: 10,
      pageNum: 1,
    });
    console.log('企业列表数据:', response);
    if (
      response &&
      response.rows &&
      Array.isArray(response.rows) &&
      response.rows.length > 0
    ) {
      enterpriseList.value = response.rows[0];
      coverImage.value = response.rows[0].coverImage;
      let video;
      response.rows[0].bannerImages.forEach((str1) => {
        let result1 = str1.slice(-3);
        if (result1 == 'mp4') {
          video = str1;
        }
      });
      bannerImages.value = video;
    }
  } catch (error) {
    console.error('获取企业列表失败:', error);
    uni.showToast({
      title: '获取企业列表失败',
      icon: 'none',
    });
  }
};
// 获取产品介绍列表
const fetchProductIntroList = async () => {
  if (isFinish.value && pageNum.value > 1) return;
  try {
    const response = await getProductIntroList({
      pageSize: pageSize.value,
      pageNum: pageNum.value,
    });
    console.log('产品介绍列表数据:', response);
    if (response && response.rows) {
      if (pageNum.value === 1) {
        problemList.value = response.rows;
      } else {
        problemList.value = [...problemList.value, ...response.rows];
      }

      // 判断是否加载完成
      if (response.total) {
        total.value = response.total;
        if (problemList.value.length >= total.value) {
          isFinish.value = true;
        }
      } else {
        if (response.rows.length < pageSize.value) {
          isFinish.value = true;
        }
      }
    }
  } catch (error) {
    console.error('获取产品介绍列表失败:', error);
  }
};

onReachBottom(() => {
  if (!isFinish.value) {
    pageNum.value++;
    fetchProductIntroList();
  }
});

// 页面加载完成后触发按钮动画
onMounted(() => {});

const loadMore = () => {
  if (!isFinish.value) {
    pageNum.value++;
    fetchProductIntroList();
  }
};

onShow(async () => {
  fetchProductIntroList();
});
</script>

<style scoped>
.main {
  background-color: #f4f5f9;
  min-height: 100vh;
}

.issue-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60rpx;
}

.issue-heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60rpx;
}

.issue-heading-line {
  font-size: 40rpx;
  font-weight: 700;
  line-height: 56rpx;
  color: #000000;
  text-align: center;
}

.issue-card-wrap {
  width: 698rpx;
  border-radius: 24rpx;
  margin-top: 22rpx;
}

.issue-card-wrap:first-of-type {
  margin-top: 36rpx;
}

.issue-card-wrap--active {
  background: linear-gradient(91.3deg, #f178ff 0.37%, #006dff 99.68%);
  padding: 2rpx;
}

.issue-card-wrap--active .issue-card {
  border-radius: 22rpx;
}

.issue-card {
  width: 100%;
  background-color: #ffffff;
  border-radius: 24rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 228rpx;
}

.issue-card-inner {
  width: 622rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 38rpx auto;
}

.issue-card-title {
  font-size: 28rpx;
  font-weight: 700;
  line-height: 40rpx;
  color: #3d3d3d;
  white-space: pre-line;
}

.issue-card-desc {
  font-size: 24rpx;
  font-weight: 400;
  line-height: 34rpx;
  color: rgba(61, 61, 61, 0.6);
  margin-top: 16rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.issue-more {
  width: 698rpx;
  height: 72rpx;
  margin-top: 22rpx;
}

.issue-more-inner {
  width: 100%;
  height: 72rpx;
  background-color: #ffffff;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.issue-more-text {
  font-size: 24rpx;
  font-weight: 400;
  line-height: 28rpx;
  color: #000000;
}
</style>
