<template>
  <view class="main">
    <!-- 加载状态 -->
    <view v-if="loading" class="loading-container">
      <text class="loading-text">加载中...</text>
    </view>
    <view
      class="update-item"
      v-for="(item, index) in companyNewsList"
      :key="index"
      @click="next(item)"
    >
      <view class="content">
        <view class="date">{{ formatDate(item.createTime) }}</view>
        <view class="title">{{ item.newsTitle }}</view>
        <view class="description">{{ item.newsContent }}</view>
      </view>
      <view class="image">
        <view
          v-for="(res, index) in item.newsImages"
          :key="index"
          class="image-url"
        >
          <image
            :src="res + '?image_process=format,webp'"
            mode="aspectFill"
          ></image>
        </view>
      </view>
    </view>
    <!-- 加载更多状态 -->
    <view v-if="loadingMore" class="loading-more-container">
      <text class="loading-more-text">加载更多中...</text>
    </view>
  </view>
  <BackHome />
  <ShareFloatBtn />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCompanyNewsList } from "@/api/activity.js";
import {
  onLoad,
  onReady,
  onShow,
  onHide,
  onUnload,
  onReachBottom,
  onPageScroll,
  onShareAppMessage,
  onShareTimeline,
} from "@dcloudio/uni-app";
import basePoint from "@/utils/basePoint.js";
// 定义组件名称（可选）
defineOptions({
  name: "RecentUpdates",
});
// 生命周期钩子
onShareAppMessage(() => ({
  title: "最近动态",
  path: "/pages/recentUpdatesnew/index",
}));

onShareTimeline(() => ({
  title: "最近动态",
  query: "",
}));

onMounted(() => {
  fetchCompanyNewsList();
});
onShow(async () => {
  await basePoint.trackingStart({
    visitModule: "最近动态",
    visitContent: "最近动态",
  });
});
onHide(async () => {
  let trackingId = uni.getStorageSync("trackingId");
  if (trackingId) {
    await basePoint.trackingEnd({
      id: trackingId,
    });
  }
});
const loading = ref(false);
const loadingMore = ref(false);
const companyNewsList = ref([]);
const types = ref([]);
const pageNum = ref(1);
onReachBottom(() => {
  if (types.value == 1) {
    pageNum.value += 1;
    fetchCompanyNewsList();
  }
});
//查询公司动态列表
const fetchCompanyNewsList = async () => {
  try {
    // 只有第一页时才显示全局loading，加载更多时使用loadingMore
    if (pageNum.value === 1) {
      loading.value = true;
    } else {
      loadingMore.value = true;
    }
    const response = await getCompanyNewsList({
      pageSize: 10,
      pageNum: pageNum.value,
      type: 1,
    });
    console.log("企业列表数据:", response);
    // 确保返回的数据是数组格式
    let dataArray = [];
    // 根据不同的数据结构进行处理
    if (response && response.rows && Array.isArray(response.rows)) {
      dataArray = response.rows;
    } else if (response && response.data && Array.isArray(response.data)) {
      dataArray = response.data;
    } else if (response && Array.isArray(response)) {
      dataArray = response;
    } else {
      console.warn("API返回的数据格式不正确:", response);
      dataArray = [];
    }
    // 处理分页数据
    if (pageNum.value == 1) {
      companyNewsList.value = dataArray;
    } else {
      companyNewsList.value = companyNewsList.value.concat(dataArray);
    }

    // 判断是否还有更多数据
    types.value = dataArray.length >= 10 ? 1 : 2;
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};
// 响应式数据
const updateList = ref([
  {
    date: "2024-01-15",
    title: "月子中心一般为生产母亲",
    description:
      "月子中心一般为生产母亲提供专业产后恢复（即坐月子）服务的场所，也称为月子会所",
    image:
      "http://cdn.xiaodingdang1.com/2025/09/24/0f0d79a3bc9c4bb999418531047e1af4.jpg",
  },
  {
    date: "2024-01-10",
    title: "月子中心一般为生产母亲",
    description:
      "月子中心一般为生产母亲提供专业产后恢复（即坐月子）服务的场所，也称为月子会所",
    image:
      "http://cdn.xiaodingdang1.com/2025/09/24/0f0d79a3bc9c4bb999418531047e1af4.jpg",
  },
  {
    date: "2024-01-05",
    title: "月子中心一般为生产母亲",
    description:
      "月子中心一般为生产母亲提供专业产后恢复（即坐月子）服务的场所，也称为月子会所",
    image:
      "http://cdn.xiaodingdang1.com/2025/09/24/0f0d79a3bc9c4bb999418531047e1af4.jpg",
  },
]);

// 格式化日期，去掉时分秒
const formatDate = (dateString) => {
  if (!dateString) return "";

  // 如果是时间戳格式
  if (typeof dateString === "number") {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

  // 如果是字符串格式
  if (typeof dateString === "string") {
    // 处理 "YYYY-MM-DD HH:mm:ss" 格式
    if (dateString.includes(" ")) {
      return dateString.split(" ")[0];
    }
    // 处理 ISO 格式 "YYYY-MM-DDTHH:mm:ss"
    if (dateString.includes("T")) {
      return dateString.split("T")[0];
    }
    // 如果已经是 YYYY-MM-DD 格式，直接返回
    return dateString;
  }

  return dateString;
};

// 方法
const next = (item) => {
  let itemStr = JSON.stringify(item);
  uni.navigateTo({
    url:
      "/pages/recentdetails/index?newsId=" +
      item.newsId +
      "&newsTitle=" +
      item.newsTitle,
  });
};
</script>

<style scoped lang="scss">
.main {
  padding: 20rpx 0;
  background: #f0f0f0;
}
.loading-more-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40rpx 0;
  .loading-more-text {
    font-size: 24rpx;
    color: #999999;
  }
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100rpx 0;
  .loading-text {
    font-size: 28rpx;
    color: #999999;
  }
}
.update-item {
  padding: 32rpx 32rpx;
  background: #ffffff;
  margin-bottom: 20rpx;
}

.update-item:last-child {
  border-bottom: none;
}

.content {
  flex: 1;
  margin-right: 20rpx;
}

.date {
  color: #2c80ff;
  font-size: 32rpx;
  margin-bottom: 10rpx;
}

.title {
  color: #3d3d3d;
  font-size: 32rpx;
  margin-bottom: 10rpx;
  font-weight: bold;
}

.description {
  color: #535353;
  font-size: 26rpx;
  line-height: 1.4;
}
.image {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32rpx;
}
.image-url {
  width: 328rpx;
  height: 328rpx;
  border-radius: 8rpx;
  overflow: hidden;
}

.image-url image {
  width: 100%;
  height: 100%;
}
</style>
