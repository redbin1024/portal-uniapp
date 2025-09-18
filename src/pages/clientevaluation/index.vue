<template>
  <view class="client-evaluation-page">
    <!-- 瀑布流内容区域 -->
    <view class="waterfall-container">
      <!-- 固定头部区域 -->
      <view class="fixed-header">
        <view class="header-content">
          <text class="main-title">真实合作商家 </text>
          <view class="chat-icon">
            <view class="chat-bubble">
              <view class="dot"></view>
              <view class="dot"></view>
              <view class="dot"></view>
            </view>
          </view>
        </view>
        <text class="sub-title">看看他们的评价吧~</text>
      </view>
      <view
        class="waterfall-column"
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
      >
        <view
          class="card-item"
          v-for="(item, index) in column"
          :key="item.id"
          @click="handleCardClick(item)"
        >
          <!-- 主图区域 -->
          <view class="image-wrapper">
            <image
              :src="item.contentPhotos[0]"
              mode="widthFix"
              class="main-image"
              @load="onImageLoad(item.id, columnIndex, index)"
            />
            <!-- 图片上的覆盖文字 -->
            <view v-if="item.overlayText" class="overlay-text">
              {{ item.overlayText }}
            </view>
          </view>

          <!-- 信息栏 -->
          <view class="info-bar">
            <image :src="item.avatar" class="avatar" />
            <text class="merchant-name">{{ item.nodeName }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getFeedPostPage } from "@/api/activity.js";

// 响应式数据
const columns = ref([[], []]);
const columnHeights = ref([0, 0]);
const loading = ref(false);

// 商家数据
const merchantData = ref([]);

// 获取商家数据
const fetchMerchantData = async () => {
  try {
    loading.value = true;
    const response = await getFeedPostPage({
      pageSize: 10,
      pageNum: 1,
    });

    console.log("API响应数据:", response);

    // 确保返回的数据是数组格式
    let dataArray = [];

    // 根据不同的数据结构进行处理
    if (response && response.rows && Array.isArray(response.rows.list)) {
      dataArray = response.rows.list;
    } else if (response && response.rows && Array.isArray(response.rows)) {
      dataArray = response.rows;
    } else if (response && Array.isArray(response)) {
      dataArray = response;
    } else {
      console.warn("API返回的数据格式不正确:", response);
      dataArray = [];
    }

    merchantData.value = dataArray;
    console.log("处理后的商家数据:", merchantData.value);

    // 获取数据后初始化瀑布流
    initWaterfall();
  } catch (error) {
    console.error("获取商家数据失败:", error);
    merchantData.value = [];
    uni.showToast({
      title: "获取数据失败",
      icon: "none",
    });
  } finally {
    loading.value = false;
  }
};

// 初始化瀑布流
const initWaterfall = () => {
  // 重置列数据
  columns.value = [[], []];
  columnHeights.value = [0, 0];

  // 确保 merchantData.value 是数组
  if (!Array.isArray(merchantData.value)) {
    console.warn("merchantData.value is not an array:", merchantData.value);
    return;
  }

  // 分配数据到列
  merchantData.value.forEach((item) => {
    // 找到高度最小的列
    const minHeightIndex =
      columnHeights.value[0] <= columnHeights.value[1] ? 0 : 1;
    // 添加到对应列
    columns.value[minHeightIndex].push(item);
    // 模拟高度（实际项目中应该根据图片实际高度计算）
    const estimatedHeight = getEstimatedHeight(item);
    columnHeights.value[minHeightIndex] += estimatedHeight;
  });
};

// 估算卡片高度
const getEstimatedHeight = (item) => {
  // 根据不同的内容类型返回不同的估算高度
  // 实际项目中应该根据图片加载后的实际高度
  const baseHeight = 200;
  const randomHeight = Math.random() * 150 + 100;
  return baseHeight + randomHeight;
};

// 图片加载完成
const onImageLoad = (itemId, columnIndex, itemIndex) => {
  // 图片加载完成后可以获取实际高度并重新计算布局
  console.log("Image loaded:", itemId);
};

// 处理卡片点击
const handleCardClick = (item) => {
  console.log("Card clicked:", item);
  // 可以跳转到详情页或执行其他操作
  uni.showToast({
    title: item.merchantName,
    icon: "none",
  });
};

// 组件挂载时获取数据
onMounted(() => {
  fetchMerchantData();
});
</script>

<style lang="scss" scoped>
.client-evaluation-page {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding-bottom: 20rpx;
}

// 固定头部区域
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 40rpx 32rpx 30rpx;
  background-color: #f7f7f7;

  .header-content {
    display: flex;
    align-items: center;
    margin-bottom: 12rpx;
  }

  .main-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
    margin-right: 16rpx;
  }

  .chat-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .chat-bubble {
    width: 60rpx;
    height: 44rpx;
    background: linear-gradient(135deg, #cde2ff 0%, #eaf2ff 100%);
    border-radius: 22rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6rpx;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -4rpx;
      left: 10rpx;
      width: 0;
      height: 0;
      border-left: 8rpx solid transparent;
      border-right: 8rpx solid transparent;
      border-top: 8rpx solid #eaf2ff;
      transform: rotate(-30deg);
    }

    .dot {
      width: 6rpx;
      height: 6rpx;
      background-color: #7ba7e7;
      border-radius: 50%;
    }
  }

  .sub-title {
    font-size: 28rpx;
    color: #999999;
    margin-left: 4rpx;
  }
}

// 瀑布流容器
.waterfall-container {
  display: flex;
  padding: 0 16rpx;
  gap: 16rpx;
  margin-top: 140rpx;

  .waterfall-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16rpx;
  }
}

// 卡片样式
.card-item {
  background-color: #ffffff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:active {
    transform: scale(0.98);
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;

    .main-image {
      width: 100%;
      display: block;
    }

    .overlay-text {
      position: absolute;
      bottom: 20rpx;
      left: 20rpx;
      right: 20rpx;
      color: #ffffff;
      font-size: 32rpx;
      font-weight: bold;
      text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
      padding: 16rpx 20rpx;
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0.2) 100%
      );
      border-radius: 12rpx;
      backdrop-filter: blur(10rpx);
    }
  }

  .info-bar {
    display: flex;
    align-items: center;
    padding: 20rpx;

    .avatar {
      width: 48rpx;
      height: 48rpx;
      border-radius: 50%;
      margin-right: 16rpx;
      border: 2rpx solid #f0f0f0;
    }

    .merchant-name {
      flex: 1;
      font-size: 26rpx;
      color: #666666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

// 响应式适配
@media screen and (min-width: 750px) {
  .waterfall-container {
    max-width: 750px;
    margin: 0 auto;
  }
}
</style>
