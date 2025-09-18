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
              :src="item.image"
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
            <text class="merchant-name">{{ item.merchantName }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "ClientEvaluation",
  data() {
    return {
      // 瀑布流列数据
      columns: [[], []],
      // 列高度记录
      columnHeights: [0, 0],
      // 商家数据
      merchantData: [
        {
          id: 1,
          image:
            "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=500&fit=crop",
          overlayText: "月子中心上班Vlog",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
          merchantName: "东方幸福国际母婴会所",
          height: 0,
        },
        {
          id: 2,
          image:
            "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=400&h=300&fit=crop",
          overlayText: "",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
          merchantName: "长沙艾丽斯月子中心",
          height: 0,
        },
        {
          id: 3,
          image:
            "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=400&h=450&fit=crop",
          overlayText: "产后恢复日记",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
          merchantName: "悦享月子会所",
          height: 0,
        },
        {
          id: 4,
          image:
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=350&fit=crop",
          overlayText: "",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
          merchantName: "贝康母婴护理中心",
          height: 0,
        },
        {
          id: 5,
          image:
            "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=480&fit=crop",
          overlayText: "新生儿护理分享",
          avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop",
          merchantName: "馨月汇月子中心",
          height: 0,
        },
        {
          id: 6,
          image:
            "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=400&h=320&fit=crop",
          overlayText: "",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
          merchantName: "爱帝宫月子中心",
          height: 0,
        },
        {
          id: 7,
          image:
            "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=420&fit=crop",
          overlayText: "月子餐食谱推荐",
          avatar:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
          merchantName: "圣贝拉母婴护理",
          height: 0,
        },
        {
          id: 8,
          image:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=380&fit=crop",
          overlayText: "",
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop",
          merchantName: "优艾贝月子会所",
          height: 0,
        },
      ],
    };
  },
  mounted() {
    this.initWaterfall();
  },
  methods: {
    // 初始化瀑布流
    initWaterfall() {
      // 重置列数据
      this.columns = [[], []];
      this.columnHeights = [0, 0];

      // 分配数据到列
      this.merchantData.forEach((item) => {
        // 找到高度最小的列
        const minHeightIndex =
          this.columnHeights[0] <= this.columnHeights[1] ? 0 : 1;

        // 添加到对应列
        this.columns[minHeightIndex].push(item);

        // 模拟高度（实际项目中应该根据图片实际高度计算）
        const estimatedHeight = this.getEstimatedHeight(item);
        this.columnHeights[minHeightIndex] += estimatedHeight;
      });
    },

    // 估算卡片高度
    getEstimatedHeight(item) {
      // 根据不同的内容类型返回不同的估算高度
      // 实际项目中应该根据图片加载后的实际高度
      const baseHeight = 200;
      const randomHeight = Math.random() * 150 + 100;
      return baseHeight + randomHeight;
    },

    // 图片加载完成
    onImageLoad(itemId, columnIndex, itemIndex) {
      // 图片加载完成后可以获取实际高度并重新计算布局
      console.log("Image loaded:", itemId);
    },

    // 处理卡片点击
    handleCardClick(item) {
      console.log("Card clicked:", item);
      // 可以跳转到详情页或执行其他操作
      uni.showToast({
        title: item.merchantName,
        icon: "none",
      });
    },
  },
};
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
