<template>
  <div class="image-msg" @click="onPreview">
    <img 
      :src="imageSrc" 
      alt="图片" 
      class="msg-image" 
      @load="onLoad"
      @error="onError"
      :class="{ loading: isLoading }"
    />
    <div v-if="isLoading" class="loading-mask">
      <span>加载中...</span>
    </div>
    <div v-if="isError" class="error-mask">
      <span>加载失败</span>
    </div>
  </div>
  <!-- 图片预览弹窗 -->
  <teleport to="body">
    <div v-if="showPreview" class="image-preview-overlay" @click="showPreview = false">
      <img :src="imageSrc" alt="预览" class="preview-image" @click.stop />
      <div class="close-btn" @click="showPreview = false">×</div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SERVICE_URL } from '@/utils/axios.js'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const isLoading = ref(true)
const isError = ref(false)
const showPreview = ref(false)

// 计算图片完整URL
const imageSrc = computed(() => {
  if (!props.src) return ''
  // 如果已经是完整URL则直接返回
  if (props.src.startsWith('http://') || props.src.startsWith('https://')) {
    return props.src
  }
  // 否则拼接后端地址
  return `${SERVICE_URL}/api/v1/file/${props.src}`
})

const onLoad = () => {
  isLoading.value = false
  isError.value = false
}

const onError = () => {
  isLoading.value = false
  isError.value = true
}

const onPreview = () => {
  if (!isError.value) {
    showPreview.value = true
  }
}
</script>

<style lang="less" scoped>
.image-msg {
  position: relative;
  max-width: 250px;
  min-width: 100px;
  min-height: 60px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;

  .msg-image {
    display: block;
    max-width: 100%;
    max-height: 300px;
    object-fit: contain;
    border-radius: 8px;
    transition: opacity 0.3s;

    &.loading {
      opacity: 0;
    }
  }

  .loading-mask,
  .error-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(var(--text-color), 0.7);
    font-size: 12px;
  }

  .error-mask {
    background-color: rgba(255, 0, 0, 0.1);
    color: #ff4444;
  }
}

.image-preview-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  cursor: pointer;

  .preview-image {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    cursor: default;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 40px;
    color: white;
    cursor: pointer;
    user-select: none;
    
    &:hover {
      color: #ccc;
    }
  }
}
</style>
