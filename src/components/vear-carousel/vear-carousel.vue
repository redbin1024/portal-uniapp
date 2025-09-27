<template>
  <view class="carousel-wrapper">
    <!-- 轮播图容器 -->
    <swiper
      class="image-container"
      previous-margin="120rpx"
      next-margin="120rpx"
      circular
      autoplay
      :duration="300"
      :interval="3000"
      :display-multiple-items="1"
      @change="swiperChange"
    >
      <swiper-item
        :class="currentIndex == index ? 'swiper-item' : 'swiper-item-side'"
        v-for="(item, index) in imgList"
        :key="item[urlKey] || item.id"
      >
        <view class="swiper-content">
          <!-- 视频内容 -->
          <video
            v-if="item.type === 'video'"
            @click="clickImg(item)"
            :class="currentIndex == index ? 'item-video' : 'item-video-side'"
            :src="item[urlKey] || item.src"
            :poster="item.poster"
            :autoplay="item.autoplay || false"
            :loop="item.loop || false"
            :muted="item.muted || true"
            :controls="item.controls || true"
            :show-fullscreen-btn="item.showFullscreenBtn || true"
            :style="dontFirstAnimation ? 'animation: none;' : ''"
            object-fit="cover"
            @play="onVideoPlay"
            @pause="onVideoPause"
            @ended="onVideoEnded"
            @error="onVideoError"
            @fullscreenchange="onFullscreenChange"
          ></video>
          <!-- 图片内容 -->
          <image
            v-else
            @click="clickImg(item)"
            :class="currentIndex == index ? 'item-img' : 'item-img-side'"
            :src="item[urlKey] || item.src"
            lazy-load
            :style="dontFirstAnimation ? 'animation: none;' : ''"
            mode="aspectFill"
          ></image>

          <!-- 标题容器 -->
          <view
            class="title-container"
            :class="currentIndex == index ? 'title-active' : 'title-side'"
          >
            <text class="title-text">{{ item.caseTitle }}</text>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  props: {
    imgList: {
      type: Array,
      default() {
        return [];
      },
    },
    urlKey: {
      type: String,
      default() {
        return "url";
      },
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    titleKey: {
      type: String,
      default: "title",
    },
  },
  data() {
    return {
      currentIndex: 0,
      dontFirstAnimation: true,
    };
  },
  computed: {
    currentItem() {
      return this.imgList[this.currentIndex] || {};
    },
  },
  methods: {
    swiperChange(e) {
      this.dontFirstAnimation = false;
      this.currentIndex = e.detail.current;
      // 暂停所有视频，只播放当前视频
      this.pauseAllVideos();
    },
    clickImg(item) {
      this.$emit("selected", item, this.currentIndex);
    },
    // 视频事件处理
    onVideoPlay(e) {
      console.log("视频开始播放:", e);
      this.$emit("video-play", e, this.currentIndex);
    },
    onVideoPause(e) {
      console.log("视频暂停:", e);
      this.$emit("video-pause", e, this.currentIndex);
    },
    onVideoEnded(e) {
      console.log("视频播放结束:", e);
      this.$emit("video-ended", e, this.currentIndex);
    },
    onVideoError(e) {
      console.error("视频播放错误:", e);
      this.$emit("video-error", e, this.currentIndex);
    },
    onFullscreenChange(e) {
      console.log("视频全屏状态变化:", e);
      this.$emit("fullscreen-change", e, this.currentIndex);
    },
    // 暂停所有视频
    pauseAllVideos() {
      // 这里可以通过ref或其他方式控制视频播放
      // 由于uni-app的限制，这里主要是提供事件通知
      this.$emit("pause-all-videos");
    },
  },
};
</script>

<style scoped>
.carousel-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  width: 100vw;
  height: 720rpx;
  /* 添加安卓兼容性样式 */
  overflow: hidden;
  position: relative;
}

.item-img {
  width: 479rpx;
  height: 720rpx;
  border-radius: 14rpx;
  animation: to-big 0.3s;
}

.item-video {
  width: 479rpx;
  height: 720rpx;
  border-radius: 14rpx;
  animation: to-big 0.3s;
}

.swiper-item {
  width: 479rpx;
  height: 720rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 安卓兼容性优化 */
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.swiper-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.item-img-side {
  width: 479rpx;
  height: 680rpx;
  border-radius: 14rpx;
  animation: to-mini 0.3s;
}

.item-video-side {
  width: 479rpx;
  height: 680rpx;
  border-radius: 14rpx;
  animation: to-mini 0.3s;
}

.swiper-item-side {
  width: 479rpx;
  height: 680rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 安卓兼容性优化 */
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}

.title-container {
  width: 478rpx;
  height: 140rpx;
  background-color: #fff;
  font-size: 28rpx;
  color: #3d3d3d;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20rpx;
  box-sizing: border-box;
  border-radius: 0 0 14rpx 14rpx;
  margin-top: -14rpx;
  position: relative;
  z-index: 2;
}

.title-active {
  animation: title-to-big 0.3s;
}

.title-side {
  animation: title-to-mini 0.3s;
  height: 120rpx;
}

.title-text {
  color: #3d3d3d;
  font-size: 28rpx;
  text-align: center;
  line-height: 1.4;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
@keyframes to-mini {
  from {
    height: 720rpx;
  }
  to {
    height: 680rpx;
  }
}

@keyframes to-big {
  from {
    height: 680rpx;
  }
  to {
    height: 720rpx;
  }
}

@keyframes title-to-mini {
  from {
    height: 140rpx;
  }
  to {
    height: 120rpx;
  }
}

@keyframes title-to-big {
  from {
    height: 120rpx;
  }
  to {
    height: 140rpx;
  }
}
</style>
