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
        :class="['pl-card', getCardTypeClass(index)]"
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

const getCardTypeClass = (index) => {
  if (index === 0) return 'pl-card--type1';
  if (index === 3) return 'pl-card--type3';
  return 'pl-card--type2';
};

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
  padding: 46rpx 24rpx 60rpx;
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
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24rpx 22rpx;
  width: 702rpx;
}

.pl-card {
  display: flex;
  background: #ffffff;
  border-radius: 24rpx;
  box-sizing: border-box;
  overflow: hidden;
}

.pl-cover-wrap {
  overflow: hidden;
  flex-shrink: 0;
}

.pl-cover {
  width: 100%;
  height: 100%;
  display: block;
}

/* Card type 1 */
.pl-card--type1 {
  width: 702rpx;
  height: 500rpx;
  flex-direction: column;
}
.pl-card--type1 .pl-cover-wrap {
  width: 702rpx;
  height: 340rpx;
}
.pl-card--type1 .pl-body {
  width: 702rpx;
  height: 160rpx;
  padding: 40rpx 22rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pl-card--type1 .pl-card-title {
  display: block;
  font-family: 'PingFang SC';
  font-size: 28rpx;
  line-height: 40rpx;
  height: 80rpx;
  color: rgba(0, 0, 0, 0.8);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}

/* Card type 2 */
.pl-card--type2 {
  width: 340rpx;
  height: 600rpx;
  flex-direction: column;
}
.pl-card--type2 .pl-cover-wrap {
  width: 340rpx;
  height: 440rpx;
}
.pl-card--type2 .pl-body {
  width: 340rpx;
  height: 160rpx;
  padding: 40rpx 22rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pl-card--type2 .pl-card-title {
  display: block;
  font-family: 'PingFang SC';
  font-size: 28rpx;
  line-height: 40rpx;
  height: 80rpx;
  color: rgba(0, 0, 0, 0.8);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}

/* Card type 3 */
.pl-card--type3 {
  width: 702rpx;
  height: 320rpx;
  flex-direction: row;
}
.pl-card--type3 .pl-cover-wrap {
  width: 462rpx;
  height: 320rpx;
}
.pl-card--type3 .pl-body {
  width: 240rpx;
  height: 320rpx;
  padding: 60rpx 24rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pl-card--type3 .pl-card-title {
  display: block;
  font-family: 'PingFang SC';
  font-size: 28rpx;
  line-height: 40rpx;
  height: 200rpx;
  color: rgba(0, 0, 0, 0.8);
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
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
