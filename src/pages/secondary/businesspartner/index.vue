<template>
  <view class="main" :class="{ 'no-scroll': showPreview }">
    <view class="businesspartnernew-content">
      <view
        class="businesspartnernew-item"
        v-for="(item, index) in caseDataList"
        :key="index"
      >
        <video
          :id="'bannerVideo' + index"
          :src="item"
          class="banner-video"
          :autoplay="index === currentIndex"
          :muted="true"
          controls
          object-fit="cover"
          @click="onMediaClick(item, index, 'video')"
          style="border-radius: 20rpx"
        />
      </view>
    </view>
    <!-- 全屏预览组件 -->
    <view
      v-if="showPreview"
      class="preview-modal"
      :class="{ 'video-fullscreen': isVideoFullscreen }"
      @click="handlePreviewModalClick"
    >
      <!-- 媒体内容 -->
      <view class="preview-content">
        <video
          v-if="previewMedia.type === 'video'"
          :src="previewMedia.src"
          class="preview-video"
          controls
          autoplay
          :poster="getVideoPoster(previewMedia.src)"
          :show-fullscreen-btn="true"
          @fullscreenchange="onFullscreenChange"
          :id="'preview-video-' + previewMedia.index"
        />
        <image
          v-else
          :src="previewMedia.src"
          class="preview-image"
          mode="aspectFit"
        />
        <view class="arrows">
          <view class="leftarrows" @click.stop="prevMedia"
            ><image
              src="http://cdn.xiaodingdang1.com/2025/09/29/936dbb6c2ac74e06a550872104bd2231.png"
            ></image
          ></view>
          <view class="rightarrows" @click.stop="nextMedia"
            ><image
              src="http://cdn.xiaodingdang1.com/2025/09/29/3a9d97e8cbf947aaa810020e259a23b8.png"
            ></image
          ></view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getcaseList } from "@/api/activity.js";

const caseDataList = ref([]);
const showPreview = ref(false);
const previewMedia = ref({
  src: "",
  type: "image", // 'image' 或 'video'
  index: 0,
});
// 处理预览模态框点击事件
const handlePreviewModalClick = (e) => {
  // 如果视频正在全屏，不关闭预览
  if (isVideoFullscreen.value) {
    console.log("视频全屏中，不关闭预览");
    return;
  }
  closePreview();
};
// 判断是否为视频文件
const isVideo = (url) => {
  if (!url) return false;
  const videoExtensions = [
    ".mp4",
    ".webm",
    ".ogg",
    ".mov",
    ".avi",
    ".wmv",
    ".flv",
    ".mkv",
  ];
  const urlLower = url.toLowerCase();
  return videoExtensions.some((ext) => urlLower.includes(ext));
};

// 获取视频封面图
const getVideoPoster = (videoUrl) => {
  // 确保 videoUrl 是字符串类型
  if (typeof videoUrl !== "string") {
    console.warn("videoUrl is not a string:", videoUrl);
    return "";
  }

  // 这里可以返回视频的封面图，如果没有可以返回默认图片
  return videoUrl.replace(
    /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i,
    "_poster.jpg"
  );
};
// 切换到上一个媒体
const prevMedia = () => {
  const currentIndex = previewMedia.value.index;
  const newIndex =
    currentIndex > 0 ? currentIndex - 1 : caseDataList.value.length - 1;
  const newSrc = caseDataList.value[newIndex];
  previewMedia.value = {
    src: newSrc,
    type: isVideo(newSrc) ? "video" : "image",
    index: newIndex,
  };
};

// 切换到下一个媒体
const nextMedia = () => {
  const currentIndex = previewMedia.value.index;
  const newIndex =
    currentIndex < caseDataList.value.length - 1 ? currentIndex + 1 : 0;
  const newSrc = caseDataList.value[newIndex];
  previewMedia.value = {
    src: newSrc,
    type: isVideo(newSrc) ? "video" : "image",
    index: newIndex,
  };
};
//查询商家案例列表
const caseList = async () => {
  try {
    const response = await getcaseList({
      pageSize: 9,
      pageNum: 1,
    });
    console.log("企业列表数据:", response);
    if (
      response &&
      response.rows &&
      Array.isArray(response.rows) &&
      response.rows.length > 0
    ) {
      let data = [];
      for (let i = 0; i < response.rows.length; i++) {
        data.push(response.rows[i].caseImages[0]);
      }
      caseDataList.value = data;
    }
  } catch (error) {
    console.error("获取企业列表失败:", error);
    uni.showToast({
      title: "获取企业列表失败",
      icon: "none",
    });
  }
};
// 关闭预览
const closePreview = () => {
  // 如果视频正在全屏，不关闭预览
  if (isVideoFullscreen.value) {
    return;
  }
  showPreview.value = false;
};
// 媒体点击事件
const onMediaClick = (item, index, type) => {
  console.log("Media clicked:", item, index, type);
  previewMedia.value = {
    src: item,
    type: type,
    index: index,
  };
  showPreview.value = true;
};
onMounted(() => {
  caseList();
});
</script>
<style lang="scss" scoped>
.main {
  padding: 24rpx;
}
.businesspartnernew-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 24rpx;
}
.businesspartnernew-item {
  width: 344rpx;
  height: 458rpx;
  border-radius: 20rpx;
}
.banner-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* 全屏预览样式 */

.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
}

/* 视频全屏时可调整z-index，防止被原生全屏遮挡 */
.preview-modal.video-fullscreen {
  z-index: 9998;
}
.preview-content {
  width: 100%;
  height: 100%;
  position: relative;
}
.preview-video {
  width: 100%;
  height: 100%;
}
.preview-image {
  width: 100%;
  height: 100%;
}
.arrows {
  position: fixed;
  top: 50%;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.leftarrows image {
  width: 100rpx;
  height: 100rpx;
}
.rightarrows image {
  width: 100rpx;
  height: 100rpx;
}
</style>
