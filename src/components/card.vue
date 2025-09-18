<template>
  <view
    :class="['card-content', styleType == 'list' ? 'card-list-content' : '']"
  >
    <view :class="['card-content-img', styleType == 'list' ? 'pd-img' : '']">
      <image
        mode="aspectFill"
        v-if="list.displayPhotos && list.displayPhotos.length > 0"
        :src="list.displayPhotos[0]"
        alt=""
      />
      <view
        :class="['card-content-title', styleType == 'list' ? 'pd-left' : '']"
        >{{ list.projectName }}</view
      >
    </view>
  </view>
</template>

<script setup>
// 产康/房间列表 顶部推荐卡片
import { onMounted, ref } from "vue";
const props = defineProps({
  list: {
    type: Object,
    default: () => {},
  },
  showPrice: {
    type: Boolean,
    default: true,
  },
  cardType: {
    type: String,
    default: "产康",
  },
  styleType: {
    type: String,
    default: "card",
  },
});
const clubName = ref("");
const SessionFrom = ref("");
onMounted(() => {
  clubName.value = uni.getStorageSync("clubName") || "";
  SessionFrom.value =
    uni.getStorageSync("tenantId") +
    "," +
    uni.getStorageSync("userInfo").nickname +
    "," +
    props.cardType;
});
const handleContact = (e) => {
  uni.navigateTo({
    url: "/subPackages/customerService/pages/userChat",
  });
};
</script>

<style lang="less" scoped>
.card-content-title {
  height: 100rpx;
}
.card-content {
  background: red;
  &-img {
    height: 630rpx;
    border-radius: 20rpx;
    width: 100%;
    margin-bottom: 12rpx;
    image {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &-title {
    width: 192rpx;
    height: 44rpx;
    font-weight: 500;
    font-size: 32rpx;
    color: #333333;
    line-height: 38rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-bottom: 12rpx;
  }

  &-enum {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;

    &-tag {
      display: inline-block;
      margin-right: 8rpx;
      height: 40rpx;
      background-color: #f2f2f2;
      border-radius: 6rpx;
      padding: 6rpx 12rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #999;
      line-height: 28rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }

  &-bottom {
    margin-top: 24rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-button {
      // padding: 8rpx 16rpx;
      // background: #FD4233;
      // border-radius: 6rpx 6rpx 6rpx 6rpx;
      // font-weight: 500;
      // font-size: 24rpx;
      // color: #FFFFFF;
      // line-height: 28rpx;
      // text-align: left;
      // font-style: normal;
      // text-transform: none;
    }

    &-price {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-icon {
        width: 24rpx;
        height: 24rpx;
        font-weight: 600;
        font-size: 24rpx;
        color: #fd4233;
        line-height: 24rpx;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      &-text {
        height: 36rpx;
        font-weight: bold;
        font-size: 40rpx;
        color: #fd4233;
        line-height: 36rpx;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }
}

.card-list-content {
  padding: 0;
  padding-bottom: 24rpx;

  .pd-left {
    padding-left: 24rpx;
  }

  .pd-bottom {
    // padding-bottom: 32rpx;
    padding-left: 24rpx;
  }

  .pd-img {
    height: 360rpx;
    border-radius: 20rpx 20rpx 0 0;
  }
}
</style>
