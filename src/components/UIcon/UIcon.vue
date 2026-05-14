<template>
  <image
    v-if="dataUri"
    :src="dataUri"
    class="u-icon"
    :style="{ width: computedSize, height: computedSize }"
  />
</template>

<script setup>
import { computed } from 'vue';
import {
  encodeSvg,
  createArrowRightIcon,
  createArrowLeftIcon,
  createCloseIcon,
  createArrowDownIcon,
} from '@/utils/svgDataUri.js';

defineOptions({ name: 'UIcon' });

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [String, Number], default: 24 },
  color: { type: String, default: '#333333' },
});

const computedSize = computed(() => {
  const s = props.size;
  if (typeof s === 'number') return `${s}px`;
  if (/^\d+$/.test(String(s))) return `${s}px`;
  return String(s);
});

const factories = {
  right: createArrowRightIcon,
  'arrow-left': createArrowLeftIcon,
  close: createCloseIcon,
  'arrow-down': createArrowDownIcon,
};

const dataUri = computed(() => {
  const fn = factories[props.name];
  if (!fn) {
    return encodeSvg(
      '<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"></svg>'
    );
  }
  try {
    return fn(props.color);
  } catch (e) {
    return encodeSvg(
      '<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"></svg>'
    );
  }
});
</script>

<style scoped>
.u-icon {
  display: block;
}
</style>
