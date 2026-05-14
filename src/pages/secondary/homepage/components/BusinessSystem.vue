<template>
  <view class="business-system">
    <!-- 标题 -->
    <view class="bs-title">
      <text class="bs-title-text">{{ title }}</text>
      <text class="bs-title-text bs-title-gradient"
        >{{ "\n" }}{{ subtitle }}</text
      >
    </view>

    <!-- 卡片列表 -->
    <view class="bs-list">
      <view
        v-for="(item, index) in list"
        :key="index"
        class="bs-card"
        @click="handleClick(item)"
      >
        <!-- 头部：标题 + 右箭头 -->
        <view class="bs-card-head">
          <text class="bs-card-title">{{ item.serviceName }}</text>
          <UIcon name="right" size="20rpx" color="#9CA2BE" />
        </view>

        <!-- 分割线 -->
        <view class="bs-divider">
          <view class="bs-divider-active"></view>
        </view>

        <!-- 主图 -->
        <view class="bs-image-wrap">
          <image
            class="bs-image"
            :src="resolveImage(item) + '?image_process=format,webp'"
            mode="aspectFill"
          />
        </view>

        <!-- 描述（富文本） -->
        <rich-text class="bs-desc" :nodes="item.description || ''" />
      </view>
    </view>
  </view>
</template>

<script setup>
import UIcon from '@/components/UIcon/UIcon.vue';

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

const resolveImage = (item) => {
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
.business-system {
  background: #ffffff;
  padding: 46rpx 26rpx 60rpx;
}

/* 标题 */
.bs-title {
  text-align: center;
  margin-bottom: 36rpx;
}
.bs-title-text {
  font-size: 40rpx;
  font-weight: 700;
  color: #000000;
  line-height: 56rpx;
}
.bs-title-gradient {
  background-image: linear-gradient(90deg, #006eee 53%, #00bdfe 97%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* 卡片列表 */
.bs-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.bs-card {
  width: 100%;
  border-radius: 24rpx;
  border: 1rpx solid #e5e5e5;
  background: #ffffff;
  box-shadow: 0 6rpx 22rpx 0 rgba(220, 222, 229, 0.5);
  padding: 24rpx;
  box-sizing: border-box;
}

/* 头部 */
.bs-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40rpx;
}
.bs-card-title {
  font-family: SourceHanSansCN-Revision, 'PingFang SC';
  font-size: 28rpx;
  font-weight: 700;
  color: #000000;
  line-height: 40rpx;
}

/* 分割线 */
.bs-divider {
  position: relative;
  width: 100%;
  height: 2rpx;
  background: #e5e5e5;
  margin-top: 11rpx;
}
.bs-divider-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 140rpx;
  height: 2rpx;
  background: #006dff;
}

/* 图片 */
.bs-image-wrap {
  margin-top: 19rpx;
  width: 100%;
  aspect-ratio: 662 / 372;
  border-radius: 15rpx;
  overflow: hidden;
  background: linear-gradient(123.78deg, #cfecff 9.01%, #f7f9ff 97.39%);
}
.bs-image {
  width: 100%;
  height: 100%;
  display: block;
}

/* 描述 */
.bs-desc {
  display: block;
  margin-top: 24rpx;
  font-family: SourceHanSansCN-Revision, 'PingFang SC';
  font-size: 25rpx;
  font-weight: 400;
  line-height: 37rpx;
  color: rgba(0, 0, 0, 0.6);
}
</style>
