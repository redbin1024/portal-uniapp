<template>
  <!-- 全屏图片/视频预览 -->
  <view
    v-if="visible"
    class="preview-modal"
    :class="{ 'video-fullscreen': isVideoFullscreen }"
    @click="handleModalClick"
  >
    <view class="preview-content">
      <video
        v-if="media && media.type === 'video'"
        :id="'preview-video-' + (media.index ?? 0)"
        :src="media.src"
        class="preview-video"
        controls
        autoplay
        :poster="poster"
        :show-fullscreen-btn="true"
        @fullscreenchange="onFullscreenChange"
      />
      <image
        v-else-if="media && media.src"
        :src="media.src"
        class="preview-image"
        mode="aspectFit"
      />
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

defineOptions({ name: 'MediaPreview' });

const props = defineProps({
  // 是否显示（v-model）
  visible: {
    type: Boolean,
    default: false,
  },
  // 预览媒体对象：{ src, type: 'image' | 'video', index?: number }
  media: {
    type: Object,
    default: () => ({ src: '', type: 'image', index: 0 }),
  },
  // 视频封面图（可选，默认自动从 src 派生）
  videoPoster: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:visible', 'close', 'fullscreenchange']);

// 视频是否处于原生全屏
const isVideoFullscreen = ref(false);

// 视频封面：优先用传入的，否则按视频 URL 派生（部分 CDN 支持取帧）
const poster = computed(() => {
  if (props.videoPoster) return props.videoPoster;
  const url = props.media?.src;
  if (typeof url !== 'string' || !url) return '';
  // 阿里云/七牛/网易等常用取首帧规则示例
  return `${url}?x-oss-process=video/snapshot,t_0,m_fast`;
});

// 点击蒙层关闭（视频全屏时禁止关闭）
const handleModalClick = () => {
  if (isVideoFullscreen.value) return;
  emit('update:visible', false);
  emit('close');
};

// 视频全屏变化
const onFullscreenChange = (e) => {
  const isEnter = !!(
    e &&
    e.detail &&
    (e.detail.fullScreen || e.detail.fullscreen)
  );
  isVideoFullscreen.value = isEnter;
  emit('fullscreenchange', isEnter);
};
</script>

<style scoped>
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000;
}
/* 视频全屏时提升层级，防止被原生全屏遮挡 */
.preview-modal.video-fullscreen {
  z-index: 9998;
}
.preview-content {
  width: 100%;
  height: 100%;
  position: relative;
}
.preview-video,
.preview-image {
  width: 100%;
  height: 100%;
}
</style>
