<template>
  <view class="problem-list">
    <!-- 标题 -->
    <view v-if="showTitle" class="pl-title">
      <text class="pl-title-text">你的会所是否需要解决</text>
      <text class="pl-title-text">{{ "\n" }}这些经营问题</text>
    </view>

    <!-- 卡片列表 -->
    <view class="pl-list">
      <view
        v-for="(item, index) in displayList"
        :key="index"
        class="pl-card"
        @click="handleClick(item)"
      >
        <view class="pl-cover-wrap">
          <image
            class="pl-cover"
            :src="item.coverImage + '?image_process=format,webp'"
            mode="aspectFill"
          />
        </view>
        <view class="pl-body">
          <text class="pl-card-title">{{ item.title }}</text>
          <text class="pl-card-desc">{{ item.introName || '' }}</text>
        </view>
      </view>
    </view>

    <!-- 查看更多 -->
    <view v-if="showMore" class="pl-more" @click="handleMore">
      <text class="pl-more-text">查看更多</text>
    </view>
  </view>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  // 限制首屏展示条数；<=0 表示展示全部
  limit: {
    type: Number,
    default: 4,
  },
  // 是否展示"查看更多"
  showMore: {
    type: Boolean,
    default: true,
  },
  // 是否展示标题
  showTitle: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["click", "more"]);

const displayList = computed(() =>
  props.limit > 0 ? props.list.slice(0, props.limit) : props.list
);

const handleClick = (item) => {
  emit("click", item);
};

const handleMore = () => {
  emit("more");
};
</script>

<style scoped>
.problem-list {
  background: #f3f5fb;
  padding: 46rpx 26rpx 60rpx;
}

/* 标题 */
.pl-title {
  text-align: center;
  margin-bottom: 32rpx;
}
.pl-title-text {
  font-size: 40rpx;
  font-weight: 700;
  color: #000000;
  line-height: 56rpx;
}

/* 卡片列表 */
.pl-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}
.pl-card {
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 20rpx;
  padding: 24rpx;
  box-sizing: border-box;
}
.pl-cover-wrap {
  width: 152rpx;
  height: 152rpx;
  border-radius: 16rpx;
  overflow: hidden;
  flex-shrink: 0;
}
.pl-cover {
  width: 100%;
  height: 100%;
  display: block;
}
.pl-body {
  flex: 1;
  min-width: 0;
  margin-left: 24rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.pl-card-title {
  font-family: 'PingFang SC';
  font-size: 30rpx;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 42rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pl-card-desc {
  margin-top: 12rpx;
  font-size: 26rpx;
  color: #9ca2be;
  line-height: 36rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}

/* 查看更多 */
.pl-more {
  margin-top: 32rpx;
  width: 100%;
  height: 88rpx;
  background: #ffffff;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pl-more-text {
  font-family: 'PingFang SC';
  font-size: 30rpx;
  color: #313131;
  line-height: 88rpx;
}
</style>
