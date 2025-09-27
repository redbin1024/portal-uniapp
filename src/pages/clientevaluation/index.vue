<template>
  <view class="client-evaluation-page">
    <!-- 固定头部 -->
    <!-- <view class="fixed-header">
      <view class="header-content">
        <text class="main-title">客户评价</text>
        <view class="chat-icon">
          <view class="chat-bubble">
            <view class="dot"></view>
            <view class="dot"></view>
            <view class="dot"></view>
          </view>
        </view>
      </view>
      <text class="sub-title">真实客户反馈与评价</text>
    </view> -->

    <!-- 内容区域 -->
    <view class="content-area">
      <!-- 加载状态 -->
      <view v-if="loading" class="loading-container">
        <text class="loading-text">加载中...</text>
      </view>

      <!-- 瀑布流列表 -->
      <view v-else class="waterfall-container">
        <!-- 左列 -->
        <view class="waterfall-column">
          <view
            v-for="(item, index) in columns[0]"
            :key="`left-${item.id || item.newsId || index}`"
            class="card-item"
            @tap="handleCardClick(item)"
          >
            <view class="image-wrapper">
              <!-- 图片 -->
              <image
                v-if="!isVideo(item.newsImages)"
                :src="item.newsImages[0] || '/static/video-placeholder.png'"
                class="main-image"
                mode="aspectFill"
                @load="onImageLoad(item.id || item.newsId, 0, index)"
                @tap.stop="handleMediaClick(item, 'image')"
              />

              <!-- 视频 -->
              <video
                v-else
                :src="item.newsImages[0]"
                class="main-video"
                :poster="item.videoPoster || '/static/video-placeholder.png'"
                @loadedmetadata="onVideoLoad(item.id || item.newsId, 0, index)"
                @tap.stop="handleMediaClick(item, 'video')"
              >
                <view class="media-type-indicator">
                  <view class="play-icon">
                    <text class="play-symbol">▶</text>
                  </view>
                </view>
              </video>
            </view>

            <!-- 标题信息 -->
            <view class="info-bar">
              <text class="card-title">{{ item.newsTitle || "暂无标题" }}</text>
            </view>
          </view>
        </view>

        <!-- 右列 -->
        <view class="waterfall-column">
          <view
            v-for="(item, index) in columns[1]"
            :key="`right-${item.id || item.newsId || index}`"
            class="card-item"
            @tap="handleCardClick(item)"
          >
            <view class="image-wrapper">
              <!-- 图片 -->
              <image
                v-if="!isVideo(item.newsImages)"
                :src="item.newsImages || '/static/video-placeholder.png'"
                class="main-image"
                mode="aspectFill"
                @load="onImageLoad(item.id || item.newsId, 1, index)"
                @tap.stop="handleMediaClick(item, 'image')"
              />

              <!-- 视频 -->
              <video
                v-else
                :src="item.newsImages"
                class="main-video"
                :poster="item.videoPoster || '/static/video-placeholder.png'"
                @loadedmetadata="onVideoLoad(item.id || item.newsId, 1, index)"
                @tap.stop="handleMediaClick(item, 'video')"
              >
                <view class="media-type-indicator">
                  <view class="play-icon">
                    <text class="play-symbol">▶</text>
                  </view>
                </view>
              </video>
            </view>

            <!-- 标题信息 -->
            <view class="info-bar">
              <text class="card-title">{{ item.newsTitle || "暂无标题" }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCompanyNewsList } from "@/api/activity.js";
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
    const response = await getCompanyNewsList({
      pageSize: 10,
      pageNum: 1,
      type: 2,
    });

    console.log("API响应数据:", response);

    // 确保返回的数据是数组格式
    let dataArray = [];

    // 根据不同的数据结构进行处理
    if (response && response.rows && Array.isArray(response.rows)) {
      dataArray = response.rows;
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

// 判断是否为视频文件
const isVideo = (url) => {
  if (!url || typeof url !== "string") return false;
  const videoExtensions = [
    ".mp4",
    ".avi",
    ".mov",
    ".wmv",
    ".flv",
    ".webm",
    ".m4v",
  ];
  const lowerUrl = url.toLowerCase();
  return videoExtensions.some((ext) => lowerUrl.includes(ext));
};

// 图片加载完成
const onImageLoad = (itemId, columnIndex, itemIndex) => {
  // 图片加载完成后可以获取实际高度并重新计算布局
  console.log("Image loaded:", itemId);
};

// 视频加载完成
const onVideoLoad = (itemId, columnIndex, itemIndex) => {
  // 视频元数据加载完成后可以获取实际高度并重新计算布局
  console.log("Video loaded:", itemId);
};

// 处理媒体点击（图片或视频）
const handleMediaClick = (item, mediaType) => {
  console.log("Media clicked:", mediaType, item);

  if (mediaType === "video") {
    // 处理视频点击 - 可以播放视频或跳转到视频详情页
    // 这里可以添加视频播放逻辑
    uni.showModal({
      title: "视频播放",
      content: "点击了视频内容",
      showCancel: false,
    });
  } else {
    // 处理图片点击 - 可以预览图片或跳转到详情页
    const imageUrl = item.newsImages || "";
    if (imageUrl) {
      uni.previewImage({
        urls: [imageUrl],
        current: imageUrl,
      });
    }
  }
};

// 处理卡片点击
const handleCardClick = (item) => {
  console.log("Card clicked:", item);
  // 根据实际需求跳转到对应的详情页面
  // 例如跳转到动态详情页面
  uni.navigateTo({
    url: `/pages/dynamicdetails/index?id=${
      item.id || item.newsId || ""
    }&title=${encodeURIComponent(item.newsTitle || "")}`,
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

// 内容区域
.content-area {
  padding-top: 20rpx; // 为固定头部留出空间
}

// 加载状态
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

// 瀑布流容器
.waterfall-container {
  display: flex;
  gap: 16rpx;

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
    width: 330rpx; // 设置图片宽度为330rpx
    height: 600rpx; // 设置图片高度为600rpx
    overflow: hidden;

    .main-image {
      width: 100%;
      height: 100%;
      display: block;
    }

    .main-video {
      width: 100%;
      height: 100%;
      display: block;
      background-color: #000;
    }

    .media-type-indicator {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      pointer-events: none;
    }

    .play-icon {
      width: 80rpx;
      height: 80rpx;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10rpx);
      border: 2rpx solid rgba(255, 255, 255, 0.3);
    }

    .play-symbol {
      color: #ffffff;
      font-size: 32rpx;
      margin-left: 4rpx; /* 微调播放符号位置 */
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

    .card-title {
      width: 330rpx; // 设置标题宽度为330rpx
      height: 60rpx; // 设置标题高度为60rpx
      font-size: 26rpx;
      color: #333333;
      line-height: 60rpx; // 设置行高等于高度，实现垂直居中
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

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
