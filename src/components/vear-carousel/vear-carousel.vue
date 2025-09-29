<template>
  <view class="carousel-wrapper">
    <!-- 轮播图容器 -->
    <swiper
      class="image-container"
      previous-margin="155rpx"
      next-margin="155rpx"
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
            :class="currentIndex == index ? 'item-video' : 'item-video-side'"
            :src="item[urlKey] || item.src"
            :autoplay="item.autoplay || false"
            :loop="item.loop || false"
            :muted="
              isFullscreen
                ? false
                : item.muted !== undefined
                ? item.muted
                : true
            "
            :controls="item.controls || true"
            :show-fullscreen-btn="false"
            :style="dontFirstAnimation ? 'animation: none;' : ''"
            :object-fit="isFullscreen ? 'contain' : 'cover'"
            :id="'video-' + index"
            @play="onVideoPlay"
            @pause="onVideoPause"
            @ended="onVideoEnded"
            @error="onVideoError"
            @fullscreenchange="onFullscreenChange"
          ></video>
          <!-- 图片内容 -->
          <image
            v-else
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
      isFullscreen: false,
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
      const isEnteringFullscreen = !!(
        e &&
        e.detail &&
        (e.detail.fullScreen || e.detail.fullscreen)
      );

      this.isFullscreen = isEnteringFullscreen;

      // 全屏时取消静音，退出全屏时恢复静音
      if (isEnteringFullscreen) {
        // 进入全屏时，确保视频有声音
        console.log("进入全屏，取消静音");
      } else {
        // 退出全屏时，恢复静音
        console.log("退出全屏，恢复静音");
      }

      this.$emit(
        "fullscreen-change",
        e,
        this.currentIndex,
        isEnteringFullscreen
      );
    },
    // 处理视频点击事件，实现真正的全屏播放
    onVideoClick(index) {
      console.log("视频点击事件，索引:", index);
      const videoId = "video-" + index;

      try {
        const videoContext = uni.createVideoContext(videoId, this);
        if (videoContext) {
          console.log("视频上下文创建成功，请求全屏");

          // 请求全屏播放
          videoContext.requestFullScreen({
            direction: 0, // 0: 正常竖向, 90: 屏幕逆时针90度, -90: 屏幕顺时针90度
            success: () => {
              console.log("视频全屏成功");
              // 全屏成功后播放视频
              setTimeout(() => {
                videoContext.play();
              }, 200);
            },
            fail: (err) => {
              console.error("视频全屏失败:", err);
              // 如果全屏失败，尝试直接播放
              videoContext.play();
              uni.showToast({
                title: "视频全屏失败，尝试直接播放",
                icon: "none",
              });
            },
          });
        } else {
          console.error("无法创建视频上下文，videoId:", videoId);
        }
      } catch (error) {
        console.error("视频播放异常:", error);
      }
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
  height: 780rpx;
  /* 添加安卓兼容性样式 */
  overflow: hidden;
  position: relative;
}

.item-img {
  width: 400rpx;
  height: 750rpx;
  border-radius: 14rpx;
  animation: to-big 0.3s;
}

.item-video {
  width: 400rpx;
  height: 750rpx;
  border-radius: 14rpx;
  animation: to-big 0.3s;
  /* 全屏时的样式优化 */
  object-fit: cover;
}

/* 全屏状态下的视频样式 */
.item-video[data-fullscreen="true"] {
  width: 100vw !important;
  height: 100vh !important;
  border-radius: 0 !important;
  object-fit: contain !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  z-index: 9999 !important;
}

.swiper-item {
  width: 400rpx;
  height: 750rpx;
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
  width: 400rpx;
  height: 750rpx;
  border-radius: 14rpx;
  animation: to-mini 0.3s;
}

.item-video-side {
  width: 400rpx;
  height: 750rpx;
  border-radius: 14rpx;
  animation: to-mini 0.3s;
}

.swiper-item-side {
  width: 400rpx;
  height: 750rpx;
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
  width: 400rpx;
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
