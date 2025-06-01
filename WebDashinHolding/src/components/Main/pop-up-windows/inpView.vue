<script setup lang="ts">
import { useRepairs } from '@/stores/useRepairs'
import { onMounted } from 'vue'
const { formData, input, fetchRepairRecords, textarea, isuploading, confirm, handleDrop, handleFileSelect, triggerFileSelect, uploading, previews, formatSize, errorMessage, successMessage, uploadedFiles, fileInput } = useRepairs()
// 获取所有图片列表
let obj = []
const getImageList = (photoUrls) => {
  obj.push(photoUrls)
  try {
    return obj
  } catch {
    return []
  }
}
function close() {
  obj = []
}
onMounted(() => {
  fetchRepairRecords()
})
</script>

<template>
  <!--  输入框  -->
  <div class="uploading">
    <div class="uploading-main">
      <button class="btnOff" @click="isuploading = false">
        <svg t="1748250336512" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="9710" width="20" height="20">
          <path
            d="M240.512 180.181333l271.530667 271.488 271.530666-271.488a42.666667 42.666667 0 0 1 56.32-3.541333l4.010667 3.541333a42.666667 42.666667 0 0 1 0 60.330667l-271.530667 271.530667 271.530667 271.530666a42.666667 42.666667 0 0 1-56.32 63.872l-4.010667-3.541333-271.530666-271.530667-271.530667 271.530667-4.010667 3.541333a42.666667 42.666667 0 0 1-56.32-63.872l271.488-271.530666-271.488-271.530667a42.666667 42.666667 0 0 1 60.330667-60.330667z"
            fill="#2c2c2c" p-id="9711"></path>
        </svg>
      </button>
      <span>报修</span>
      <div class="main-content">
        <div class="upload-container">
          <!-- 文件选择区域 -->
          <div class="hejivb">
            <div class="drop-zone" @dragover.prevent @drop.prevent="handleDrop" @click="triggerFileSelect">
              <input type="file" ref="fileInput" multiple accept="image/*" @change="handleFileSelect"
                class="hidden-input" />
              <p class="drag-hint">点击或拖放图片到此区域</p>
            </div>
            <div class="import">
              <input type="text" v-model="formData.reporter_name" placeholder="请输入联系人姓名" />
              <input type="text" v-model="formData.reporter_contact" placeholder="请输入联系方式" />
              <input type="text" v-model="formData.location" placeholder="请输入地点" />
            </div>
          </div>
          <!-- 预览区域 -->
          <div v-if="previews.length" class="preview-grid">
            <div v-for="(preview, index) in previews" :key="index" class="preview-item">
              <el-image @close="close" :alt="preview.name" class="preview-image" :hide-on-click-modal="true"
                :lazy="true" :key="index" style="width: 100%; height: 100px; margin-right: 10px" :src="preview.url"
                :preview-src-list="getImageList(preview.url)" />
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
        <div class="textInp">
          <textarea ref="textarea" v-model="input" class="auto-resize" placeholder="请输入问题描述..."></textarea>
        </div>
      </div>
      <div class="confirm">
        <button @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.uploading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 111;


  .uploading-main {
    width: 90%;
    height: 90%;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .upload-container {
      //margin: 2rem auto;
      //padding: 20px;
      //border: 1px solid #e0e0e0;
      border-radius: 8px;
    }

    .hejivb {
      width: 100%;
      display: flex;
      gap: 15px;

      .import {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 16px;

        input {
          width: 100%;
          height: 50px;
          border-radius: 8px;
          background: rgba(238, 238, 238, 0.42);
          padding: 8px;
          box-sizing: border-box;
        }
      }
    }

    .drop-zone {
      width: 50%;
      border: 2px dashed #ccc;
      border-radius: 8px;
      padding: 3rem;
      text-align: center;
      transition: border-color 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(238, 238, 238, 0.42);
    }

    .drop-zone:hover {
      border-color: #2196f3;
    }

    .hidden-input {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
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
      height: 180px;
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

      span {
        font-size: 15px;
      }

      .filename {
        width: 100%;
        height: 21px;
        overflow: hidden;

      }
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


  }

  .btnOff {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -10px;
    right: -10px;
    background: #fff;
    box-shadow: 0 0 12px rgba(0, 0, 0, .3);
    cursor: pointer;
  }

  .btnOff:hover {
    box-shadow: 0 0 0px rgba(0, 0, 0, .12);

    svg {
      path {
        fill: red;
      }
    }
  }

  span {
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 25px;
  }

  .main-content {
    width: 100%;
    height: 82%;

    .textInp {
      width: 100%;
      height: fit-content;
    }

    textarea {
      resize: none;
      overflow: hidden;
      min-height: 30px;
      max-height: 100px;
      height: 40px;
      width: 100%;
      line-height: 1.5;
      padding: 8px;
      box-sizing: border-box;
      background: rgba(238, 238, 238, 0.42);
      resize: none;
      overflow: hidden;
      height: 40px;
      min-height: 40px;
      max-height: 200px;
      width: 100%;
      line-height: 1.5;
      padding: 8px;
      box-sizing: border-box;
      display: flex;
      flex: 1;
      margin-top: 20px;
      border-radius: 8px;
    }
  }

  .confirm {
    width: 100%;
    height: 45px;
    display: flex;
    justify-content: flex-end;

    button {
      width: 90px;
      height: 45px;
      background: #0aa9db;
      border-radius: 8px;
    }
  }
}
</style>
