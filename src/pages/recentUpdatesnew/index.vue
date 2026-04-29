<template>
  <view class="main">
    <!-- 加载状态 -->
    <view v-if="loading" class="loading-container">
      <text class="loading-text">加载中...</text>
    </view>
    <view class="timeline">
      <view
        class="timeline-item"
        v-for="(item, index) in companyNewsList"
        :key="index"
        @click="next(item)"
      >
        <view class="left-col">
          <view class="circle"></view>
          <view class="line" v-if="index < companyNewsList.length - 1"></view>
        </view>
        <view class="right-col">
          <text class="date">{{ formatDate(item.createTime) }}</text>
          <text class="title">{{ item.newsTitle }}</text>
          <text class="description">{{ item.newsContent }}</text>
          <view
            class="image-container"
            v-if="item.newsImages && item.newsImages.length > 0"
          >
            <image
              :src="item.newsImages[0] + '?image_process=format,webp'"
              mode="aspectFill"
              class="news-image"
            ></image>
          </view>
        </view>
      </view>
    </view>
    <!-- 加载更多状态 -->
    <view v-if="loadingMore" class="loading-more-container">
      <text class="loading-more-text">加载更多中...</text>
    </view>
  </view>
  <BackHome />
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
    const cleanDate = dateString.split(" ")[0].split("T")[0];
    const parts = cleanDate.split("-");
    if (parts.length === 3) {
      return `${parts[0]}.${parseInt(parts[1])}.${parseInt(parts[2])}`;
    }
    return cleanDate;
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
  padding: 48rpx 32rpx 40rpx;
  background: #ffffff;
  min-height: 100vh;
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

.timeline {
  width: 100%;
}

.timeline-item {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

/* 左侧时间轴列 */
.left-col {
  width: 56rpx;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 圆形指示器 */
.circle {
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  background-color: #000000;
  flex-shrink: 0;
  margin-top: 6rpx;
}

/* 虚线连接线 */
.line {
  width: 2rpx;
  flex: 1;
  background-image: repeating-linear-gradient(
    to bottom,
    #c8c8c8 0,
    #c8c8c8 8rpx,
    transparent 8rpx,
    transparent 16rpx
  );
  min-height: 32rpx;
}

/* 右侧内容列 */
.right-col {
  flex: 1;
  padding-left: 16rpx;
  padding-bottom: 56rpx;
  min-width: 0;
}

/* 日期 */
.date {
  display: block;
  font-size: 28rpx;
  font-weight: 700;
  line-height: 36rpx;
  color: #000000;
  margin-bottom: 18rpx;
}

/* 标题 */
.title {
  display: block;
  font-size: 34rpx;
  font-weight: 700;
  line-height: 48rpx;
  color: #000000;
  margin-bottom: 16rpx;
}

/* 描述 */
.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  overflow: hidden;
  font-size: 24rpx;
  font-weight: 400;
  line-height: 36rpx;
  color: #3d3d3d;
  margin-bottom: 24rpx;
}

/* 图片容器 */
.image-container {
  width: 100%;
  border-radius: 16rpx;
  overflow: hidden;
}

.news-image {
  width: 100%;
  height: 420rpx;
  border-radius: 16rpx;
  display: block;
}
</style>
