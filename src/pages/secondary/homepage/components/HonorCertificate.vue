<template>
  <view class="honor-certificate">
    <view class="hc-title">荣誉证书</view>

    <scroll-view class="hc-scroll" scroll-x>
      <view class="hc-pages">
        <view v-for="(page, pageIndex) in pages" :key="pageIndex" class="hc-page">
          <view
            v-for="(item, index) in page"
            :key="pageIndex + '-' + index"
            class="hc-item"
          >
            <image
              class="hc-item-img"
              :src="getImage(item) + '?image_process=format,webp'"
              mode="aspectFit"
            />
            <text v-if="getName(item)" class="hc-item-name">{{
              getName(item)
            }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // 支持字符串数组（图片URL）或对象数组（{image,name}）
  list: {
    type: Array,
    default: () => [],
  },
});

const getImage = (item) =>
  typeof item === "string" ? item : item?.image || "";
const getName = (item) => (typeof item === "string" ? "" : item?.name || "");

const pages = computed(() => {
  const result = [];
  for (let i = 0; i < props.list.length; i += 10) {
    result.push(props.list.slice(i, i + 10));
  }
  return result;
});

</script>

<style scoped>
.honor-certificate {
  background: #f4f5fa;
  padding: 46rpx 0 60rpx;
}

.hc-title {
  font-size: 40rpx;
  font-weight: 700;
  color: #000000;
  text-align: center;
  line-height: 56rpx;
  margin-bottom: 32rpx;
}

.hc-scroll {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  white-space: nowrap;
}

.hc-pages {
  display: flex;
}

.hc-page {
  flex-shrink: 0;
  width: 1210rpx;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 22rpx;
  column-gap: 10rpx;
  box-sizing: border-box;
  padding: 0 26rpx;
}

.hc-item {
  width: 220rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hc-item-img {
  width: 220rpx;
  height: 260rpx;
  border-radius: 16rpx;
  background: #ffffff;
  display: block;
}
.hc-item-name {
  margin-top: 16rpx;
  width: 220rpx;
  font-size: 24rpx;
  color: #313131;
  line-height: 34rpx;
  text-align: center;
}

.hc-scroll ::-webkit-scrollbar {
  display: none;
}

</style>
