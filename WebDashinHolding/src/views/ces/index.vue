<template>
  <div class="upload-container">
    <button @click="uploadFiles">保存</button>
    <!-- 文件选择区域 -->
    <div class="drop-zone" @dragover.prevent @drop.prevent="handleDrop">
      <input
          type="file"
          ref="fileInput"
          multiple
          accept="image/*"
          @change="handleFileSelect"
          class="hidden-input"
      />
      <button @click="triggerFileSelect" class="select-button">
        {{ uploading ? '上传中...' : '选择图片' }}
      </button>
      <p class="drag-hint">或拖放图片到此区域</p>
    </div>

    <!-- 预览区域 -->
    <div v-if="previews.length" class="preview-grid">
      <div v-for="(preview, index) in previews" :key="index" class="preview-item">
        <img :src="preview.url" :alt="preview.name" class="preview-image"/>
        <div class="preview-info">
          <span class="filename">{{ preview.name }}</span>
          <span class="file-size">{{ formatSize(preview.size) }}</span>
          <div v-if="preview.status === 'uploading'" class="upload-progress">
            <div class="progress-bar"></div>
          </div>
          <span v-else-if="preview.status === 'success'" class="status-success">✓</span>
          <span v-else-if="preview.status === 'error'" class="status-error">✕</span>
        </div>
      </div>
    </div>

    <!-- 状态反馈 -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
      <ul v-if="uploadedFiles.length">
        <li v-for="(file, index) in uploadedFiles" :key="index">{{ file }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const API_URL = 'http://localhost:3005/api/uploadMultipleImages'

const fileInput = ref(null)
const uploading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const uploadedFiles = ref([])
const previews = ref([])

// 触发文件选择
const triggerFileSelect = () => {
  if (!uploading.value) {
    fileInput.value.click()
  }
}

// 处理文件选择
const handleFileSelect = (e) => {
  const files = Array.from(e.target.files)
  if (files.length) {
    generatePreviews(files)
  }
}

// 处理拖放文件
const handleDrop = (e) => {
  const files = Array.from(e.dataTransfer.files)
  if (files.length) {
    generatePreviews(files)
  }
}

// 生成预览
const generatePreviews = (files) => {
  previews.value = files.map(file => ({
    file,
    name: file.name,
    size: file.size,
    url: URL.createObjectURL(file),
    status: 'pending'
  }))
}

// 格式化文件大小
const formatSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 执行上传
const uploadFiles = async () => {
  uploading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  const formData = new FormData()
  previews.value.forEach((preview, index) => {
    formData.append('images[]', preview.file)
  })

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || '上传失败')
    }
    // 更新上传状态
    previews.value = previews.value.map(preview => ({
      ...preview,
      status: 'success'
    }))
    successMessage.value = data.message || '上传成功'
    uploadedFiles.value = data.saved_files || []
    console.log(uploadedFiles.value)
  } catch (error) {
    errorMessage.value = error.message || '发生未知错误'
    previews.value = previews.value.map(preview => ({
      ...preview,
      status: 'error'
    }))
  } finally {
    uploading.value = false
    // 清理预览URL
    previews.value.forEach(preview => URL.revokeObjectURL(preview.url))
  }
}
</script>

<style scoped>
.upload-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 100px;
}

.drop-zone {
  border: 2px dashed #ccc;
  padding: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  transition: border-color 0.3s;
}

.drop-zone:hover {
  border-color: #2196f3;
}

.hidden-input {
  display: none;
}

.select-button {
  background: #2196f3;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.select-button:hover {
  background: #1976d2;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.preview-item {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.preview-info {
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  padding: 1rem;
  background: #f8d7da;
  border-radius: 4px;
}

.success-message {
  color: #28a745;
  margin-top: 1rem;
  padding: 1rem;
  background: #d4edda;
  border-radius: 4px;
}

.upload-progress {
  height: 3px;
  background: #ddd;
  margin-top: 0.5rem;
}

.progress-bar {
  width: 30%;
  height: 100%;
  background: #2196f3;
  animation: progress 2s infinite;
}

@keyframes progress {
  0% {
    width: 0;
  }
  50% {
    width: 70%;
  }
  100% {
    width: 100%;
  }
}
</style>