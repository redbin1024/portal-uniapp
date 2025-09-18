<template>
  <view class="app">
    <router-view />
  </view>
</template>

<script>
export default {
  name: "App",
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style></style>
