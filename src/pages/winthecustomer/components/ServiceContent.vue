<template>
  <view class="service-content">
    <view class="service-content__img">
      <mp-html :content="richText" />
    </view>
    <view class="service-content__btn">
      <button
        show-message-card="true"
        open-type="contact"
        bindcontact="handleContact"
        class="contact-btn"
      >
        联系我们
      </button>
    </view>
  </view>
</template>

<script setup>
import mpHtml from "uni-app-mp-html/components/mp-html/mp-html.vue";

defineProps({
  richText: { type: String, default: "" },
});
</script>

<style scoped>
.service-content {
  padding-bottom: 40rpx;
}
.service-content__img {
  margin-top: 38rpx;
  width: 750rpx;
}
.service-content__img image {
  width: 100%;
}
.service-content__btn {
  margin: 20rpx 0;
  display: flex;
  justify-content: center;
}
.contact-btn {
  background: #2f6cf4;
  color: #fff;
  font-size: 32rpx;
  width: 90vw;
  height: 88rpx;
  text-align: center;
  line-height: 85rpx;
  border-radius: 20rpx;
}
</style>
