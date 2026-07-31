<template>
  <view class="system-business" v-if="list.length > 0">
    <!-- 标题 -->
    <view class="sb-title">
      <text class="sb-title-line">{{ title }}</text>
      <text class="sb-title-line">{{ subtitle }}</text>
    </view>

    <!-- 网格列表 -->
    <view class="sb-list">
      <view
        v-for="(item, index) in list"
        :key="index"
        class="sb-card"
        @click="handleClick(item)"
      >
        <view class="sb-image-wrap">
          <image
            class="sb-image"
            :src="resolveImage(item, index) + '?image_process=format,webp'"
            mode="aspectFill"
          />
        </view>
        <text class="sb-card-title">{{ item.serviceName }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '宝妈小叮当',
  },
  subtitle: {
    type: String,
    default: '业务系统',
  },
  list: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['click']);

const defaultCovers = [
  'http://cdn.xiaodingdang1.com/2026/07/16/1eadcef2ea114374812b002da56d2b22.png', // 卡片一（原图二）
  'http://cdn.xiaodingdang1.com/2026/07/16/002d7019ea1c44129b1e48e8c171f95b.png', // 卡片二（原图一）
  'http://cdn.xiaodingdang1.com/2026/07/16/802f16de8d454acd8c7522f56b4f0861.png', // 卡片三
  'http://cdn.xiaodingdang1.com/2026/07/16/3750dd96a0944dfaa9da6bd8f98875ab.png', // 卡片四
];

const resolveImage = (item, index) => {
  if (props.subtitle === '业务系统' && index !== undefined && defaultCovers[index]) {
    return defaultCovers[index];
  }
  if (!item) return '';
  const img = item.serviceImage;
  if (Array.isArray(img)) return img[0] || '';
  return img || '';
};

const handleClick = (item) => {
  emit('click', item);
};
</script>

<style scoped>
.system-business {
  background: #ffffff;
  padding: 60rpx 24rpx 80rpx;
}

/* 标题 */
.sb-title {
  text-align: center;
  margin-bottom: 56rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sb-title-line {
  display: block;
  font-family: SourceHanSansCN-Revision, system-ui, -apple-system, sans-serif;
  font-size: 46rpx;
  font-weight: bold;
  color: #000000;
  line-height: 64rpx;
  letter-spacing: 2rpx;
}

/* 网格列表 */
.sb-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40rpx 22rpx;
  width: 702rpx;
}

.sb-card {
  width: 340rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sb-image-wrap {
  width: 340rpx;
  height: 340rpx;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
  background-color: #f7f9ff;
}

.sb-image {
  width: 100%;
  height: 100%;
  display: block;
}

.sb-card-title {
  display: block;
  margin-top: 24rpx;
  font-family: SourceHanSansCN-Revision, 'PingFang SC', system-ui, -apple-system, sans-serif;
  font-size: 32rpx;
  font-weight: bold;
  color: #1a1a1a;
  line-height: 44rpx;
  text-align: center;
}
</style>
