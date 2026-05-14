<template>
  <view class="business-partner">
    <!-- 标题 -->
    <view class="bp-title">
      <text class="bp-title-text">合作商家</text>
      <text class="bp-title-text bp-title-gradient"
        >{{ '\n' }}赋能月子服务</text
      >
    </view>

    <!-- 案例网格 -->
    <view class="bp-grid">
      <view
        class="bp-item"
        v-for="(item, index) in list"
        :key="index"
        @click="handlePlay(item, index)"
      >
        <image
          class="bp-cover"
          :src="item.coverImage + '?image_process=format,webp'"
          mode="aspectFill"
        />
        <view class="bp-play-mask">
          <image
            class="bp-play-icon"
            src="http://cdn.xiaodingdang1.com/2025/10/22/2f504fbb11944ad8834f6c479f233281.png"
            mode="aspectFit"
          />
        </view>
      </view>
    </view>

    <!-- 查看更多 -->
    <view class="bp-more" @click="handleMore">
      <text class="bp-more-text">查看更多</text>
      <UIcon name="right" :size="'24rpx'" color="#313131" class="bp-more-icon" />
    </view>

    <!-- 内置全屏预览（点击案例直接播放） -->
    <MediaPreview v-model:visible="showPreview" :media="previewMedia" />
  </view>
</template>

<script setup>
import { ref } from 'vue';
import UIcon from '@/components/UIcon/UIcon.vue';
import MediaPreview from '@/components/MediaPreview/MediaPreview.vue';

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['play', 'more']);

// 预览状态
const showPreview = ref(false);
const previewMedia = ref({ src: '', type: 'video', index: 0 });

// 点击案例：如果是视频则直接在本组件全屏预览，同时对外报件 play 供需要的父级拓展
// item.caseImages 为视频 URL，item.coverImage 为封面
const handlePlay = (item, index) => {
  if (item && item.caseImages) {
    previewMedia.value = {
      src: item.caseImages,
      type: 'video',
      index,
    };
    showPreview.value = true;
  }
  emit('play', item);
};

const handleMore = () => {
  emit('more');
};
</script>

<style scoped>
.business-partner {
  background: #ffffff;
  border-top-left-radius: 52rpx;
  border-top-right-radius: 52rpx;
  padding: 46rpx 26rpx;
}

/* 标题 */
.bp-title {
  text-align: center;
  margin-bottom: 46rpx;
}
.bp-title-text {
  font-size: 40rpx;
  font-weight: 700;
  color: #000000;
  line-height: 56rpx;
}
.bp-title-gradient {
  background-image: linear-gradient(90deg, #006eee 53.65%, #00bdfe 97.02%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* 网格 */
.bp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24rpx 16rpx;
}
.bp-item {
  position: relative;
  width: 100%;
  aspect-ratio: 224 / 340;
  border-radius: 20rpx;
  overflow: hidden;
}
.bp-cover {
  width: 100%;
  height: 100%;
  display: block;
}
.bp-play-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.85;
}
.bp-play-icon {
  width: 80rpx;
  height: 80rpx;
}

/* 查看更多 */
.bp-more {
  margin-top: 40rpx;
  width: 100%;
  height: 72rpx;
  background: #f3f5fb;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bp-more-text {
  font-family: 'PingFang SC';
  font-size: 30rpx;
  font-weight: normal;
  line-height: 32rpx;
  letter-spacing: 0;
  color: #313131;
}
.bp-more-icon {
  margin-left: 8rpx;
}
</style>
