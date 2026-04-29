<template>
  <view class="container">
    <!-- 加载状态 -->
    <view v-if="loading" class="loading-container">
      <text class="loading-text">加载中...</text>
    </view>
    <view
      class="list-item"
      :class="{ 'list-item-animate': animatedItems[index] }"
      v-for="(item, index) in successCaseList"
      :key="index"
      @click="navigateToDetail(item)"
    >
      <view class="card-image-wrap">
        <image
          class="item-image"
          :src="item.caseImages[0] + '?image_process=format,webp'"
          mode="aspectFill"
        ></image>
      </view>
      <view class="card-content">
        <text class="card-title">{{ item.customerName }}</text>
        <text class="card-desc">{{ item.caseValue }}</text>
      </view>
    </view>
    <!-- 加载更多状态 -->
    <view v-if="loadingMore" class="loading-more-container">
      <text class="loading-more-text">加载更多中...</text>
    </view>
    <BackHome />
  </view>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, getCurrentInstance } from 'vue';
import { getsuccessCaseList } from '@/api/activity.js';
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
} from '@dcloudio/uni-app';
// 获取当前实例
const instance = getCurrentInstance();

// 响应式数据
const successCaseList = ref([]);
const animatedItems = ref([]);
const loading = ref(false);
const loadingMore = ref(false);
const types = ref([]);
const pageNum = ref(1);
onReachBottom(() => {
  if (types.value == 1) {
    pageNum.value += 1;
    fetchsuccessCaseList();
  }
});
const listData = reactive([
  {
    image:
      'http://cdn.xiaodingdang1.com/2025/09/15/cbbd7e2aa0cd4016b59a3f31dbe46cb2.png',
    title: '东方幸福国际母婴会所',
    description:
      '月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。',
  },
  {
    image:
      'http://cdn.xiaodingdang1.com/2025/09/15/d177663900974c55bd7b9d093b77c379.png',
    title: '东方幸福国际母婴会所',
    description:
      '月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。',
  },
  {
    image:
      'http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png',
    title: '东方幸福国际母婴会所',
    description:
      '月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。',
  },
  {
    image:
      'http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png',
    title: '东方幸福国际母婴会所',
    description:
      '月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。',
  },
  {
    image:
      'http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png',
    title: '东方幸福国际母婴会所',
    description:
      '月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。',
  },
  {
    image:
      'http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png',
    title: '东方幸福国际母婴会所',
    description:
      '月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。',
  },
  {
    image:
      'http://cdn.xiaodingdang1.com/2025/09/15/b2eb116026c54ead93ac75a6d1c01607.png',
    title: '东方幸福国际母婴会所',
    description:
      '月子中心一般为生产母亲提供专业产后恢复服务的场所，也称为月子会所，有专业营养师负责给产妇提供月子。',
  },
]);

// 方法
const fetchsuccessCaseList = async () => {
  try {
    // 只有第一页时才显示全局loading，加载更多时使用loadingMore
    if (pageNum.value === 1) {
      loading.value = true;
    } else {
      loadingMore.value = true;
    }
    const response = await getsuccessCaseList({
      pageSize: 10,
      pageNum: pageNum.value,
    });
    // 确保返回的数据是数组格式
    let dataArray = [];
    // 根据不同的数据结构进行处理
    if (response && response.rows && Array.isArray(response.rows)) {
      dataArray = response.rows;
    } else {
      dataArray = [];
    }
    // 处理分页数据
    if (pageNum.value === 1) {
      successCaseList.value = dataArray;
    } else {
      successCaseList.value = [...successCaseList.value, ...dataArray];
    }

    // 判断是否还有更多数据（根据返回数据量是否达到pageSize）
    types.value = dataArray.length >= 10 ? 1 : 2;
    initAnimation();
  } catch (error) {
    console.error('获取成功案例列表失败:', error);
  } finally {
    loading.value = false;
    loadingMore.value = false;
  }
};

const navigateToDetail = (item) => {
  uni.navigateTo({
    url: '/pages/casedetails/index?successCaseId=' + item.successCaseId,
  });
};

// 初始化动画 - 页面进入时的弹出效果
const initAnimation = () => {
  nextTick(() => {
    // 延迟执行，让页面先渲染
    setTimeout(() => {
      successCaseList.value.forEach((_, index) => {
        setTimeout(() => {
          animatedItems.value[index] = true;
        }, index * 50); // 每个item延迟150ms，形成依次弹出的效果
      });
    }, 100);
  });
};

// 处理滚动事件
const handleScroll = (e) => {
  const scrollTop = e.scrollTop;

  // 获取所有list-item的位置信息
  uni
    .createSelectorQuery()
    .in(instance)
    .selectAll('.list-item')
    .boundingClientRect((rects) => {
      if (rects) {
        rects.forEach((rect, index) => {
          // 当item进入视窗时触发动画
          if (
            rect.top < uni.getSystemInfoSync().windowHeight * 0.8 &&
            rect.bottom > 0
          ) {
            if (!animatedItems.value[index]) {
              animatedItems.value[index] = true;
            }
          }
        });
      }
    })
    .exec();
};

// 生命周期
onMounted(() => {
  // initAnimation();
  fetchsuccessCaseList();
});

// 导出页面滚动事件处理函数，供uni-app页面使用
defineExpose({
  onPageScroll: handleScroll,
});
</script>

<script>
// 页面配置和生命周期钩子（uni-app特有）
export default {
  onPageScroll(e) {
    // 调用setup中定义的handleScroll方法
    if (this.$refs && this.$refs.handleScroll) {
      this.$refs.handleScroll(e);
    }
  },
};
</script>

<style scoped lang="scss">
.container {
  padding: 60rpx 26rpx 20rpx 26rpx;
  background-color: #ffffff;
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
.list-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 40rpx;
  position: relative;
  isolation: isolate;
  opacity: 0;
  transform: translateY(20rpx);
  transition: all 0.6s ease-out;
}

.list-item.list-item-animate {
  opacity: 1;
  transform: translateY(0);
}

.card-image-wrap {
  width: 100%;
  position: relative;
  z-index: 1;
}

.item-image {
  width: 100%;
  height: 436rpx;
  display: block;
  border-radius: 20rpx 20rpx 0 0;
}

.card-content {
  width: 100%;
  height: 184rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -28rpx;
  position: relative;
  z-index: 0;
}

.card-title {
  font-size: 28rpx;
  font-family:
    SourceHanSansCN-Revision,
    Source Han Sans CN,
    sans-serif;
  font-weight: 700;
  line-height: 36rpx;
  color: #000000;
  margin-top: 60rpx;
  white-space: nowrap;
}

.card-desc {
  font-size: 22rpx;
  font-family:
    SourceHanSansCN-Revision,
    Source Han Sans CN,
    sans-serif;
  font-weight: 400;
  line-height: 32rpx;
  color: #636363;
  margin-top: 12rpx;
  text-align: center;
  padding: 0 20rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
</style>
