<template>
  <view class="waterfall-demo">
    <view class="header">
      <text class="title">瀑布流演示</text>
    </view>

    <view class="waterfall-container">
      <view
        class="waterfall-column"
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
      >
        <view
          class="waterfall-item"
          v-for="item in column"
          :key="item.id"
          :style="{ height: item.height + 'px' }"
        >
          <image
            class="item-image"
            :src="item.image"
            mode="aspectFill"
            @load="onImageLoad"
          />
          <view class="item-content">
            <text class="item-title">{{ item.title }}</text>
            <text class="item-desc">{{ item.description }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="loading" v-if="loading">
      <text>加载中...</text>
    </view>
  </view>
  <BackHome />
</template>

<script>
export default {
  name: "WaterfallDemo",
  onShareAppMessage() {
    return {
      title: "瀑布流演示",
      path: "/pages/waterfall-demo/index",
    };
  },
  onShareTimeline() {
    return {
      title: "瀑布流演示",
      query: "",
    };
  },
  data() {
    return {
      loading: false,
      columns: [[], [], []], // 三列瀑布流
      items: [],
      page: 1,
      pageSize: 20,
    };
  },

  onLoad() {
    this.loadData();
  },

  onReachBottom() {
    this.loadMore();
  },

  methods: {
    // 加载数据
    async loadData() {
      this.loading = true;
      try {
        // 模拟API数据
        const newItems = this.generateMockData();
        this.items = [...this.items, ...newItems];
        this.distributeItems();
      } catch (error) {
        console.error("加载数据失败:", error);
        uni.showToast({
          title: "加载失败",
          icon: "none",
        });
      } finally {
        this.loading = false;
      }
    },

    // 加载更多
    loadMore() {
      if (this.loading) return;
      this.page++;
      this.loadData();
    },

    // 生成模拟数据
    generateMockData() {
      const mockData = [];
      for (let i = 0; i < this.pageSize; i++) {
        const id = (this.page - 1) * this.pageSize + i + 1;
        mockData.push({
          id: id,
          title: `项目案例 ${id}`,
          description: `这是第 ${id} 个项目的详细描述，展示了我们团队的专业能力和创新思维。`,
          image: `https://picsum.photos/300/${
            200 + Math.floor(Math.random() * 200)
          }?random=${id}`,
          height: 200 + Math.floor(Math.random() * 200), // 随机高度
        });
      }
      return mockData;
    },

    // 分配项目到不同列
    distributeItems() {
      // 重置列
      this.columns = [[], [], []];

      // 按照高度分配到最短的列
      this.items.forEach((item) => {
        const shortestColumnIndex = this.getShortestColumnIndex();
        this.columns[shortestColumnIndex].push(item);
      });
    },

    // 获取最短列的索引
    getShortestColumnIndex() {
      let shortestIndex = 0;
      let shortestHeight = this.getColumnHeight(0);

      for (let i = 1; i < this.columns.length; i++) {
        const height = this.getColumnHeight(i);
        if (height < shortestHeight) {
          shortestHeight = height;
          shortestIndex = i;
        }
      }

      return shortestIndex;
    },

    // 计算列的总高度
    getColumnHeight(columnIndex) {
      return this.columns[columnIndex].reduce(
        (total, item) => total + item.height + 20,
        0
      );
    },

    // 图片加载完成
    onImageLoad() {
      // 可以在这里处理图片加载完成的逻辑
    },
  },
};
</script>

<style scoped>
.waterfall-demo {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 30rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.waterfall-container {
  display: flex;
  justify-content: space-between;
}

.waterfall-column {
  display: flex;
  flex-direction: column;
}

.waterfall-item {
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.waterfall-item:active {
  transform: scale(0.98);
}

.item-image {
  width: 100%;
  height: 60%;
  object-fit: cover;
}

.item-content {
  padding: 20rpx;
}

.item-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: block;
}

.item-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.loading {
  text-align: center;
  padding: 40rpx;
  color: #999;
}

/* 响应式设计 */
/* @media screen and (max-width: 750rpx) {
  .waterfall-container {
    gap: 15rpx;
  }

  .waterfall-column {
    gap: 15rpx;
  }

  .item-content {
    padding: 15rpx;
  }
} */
</style>
