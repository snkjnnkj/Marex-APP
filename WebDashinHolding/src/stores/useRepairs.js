import { ref, reactive, onMounted } from 'vue'
import { useTextareaAutosize } from '@vueuse/core';
import { AddRepairs, getRepairsByUser_id, uploadingPhoto } from '@/api/index.js'
import { useLogin } from '@/stores/useLogin';
import { taskEmail } from '@/api/index.js'

const { userCookes } = useLogin()
import { IpSite } from "@/stores/IpSite.js";
//存储报修记录
const repairRecords = ref();
//打开添加记录的报修弹窗
const isuploading = ref(false)
/* 问题描述的输入框 */
const { textarea, input } = useTextareaAutosize();
//定义后端api的接口
const API_URL = IpSite + '/api/uploadMultipleImages'
// 多图片上传的变量
const fileInput = ref(null)
const uploading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const uploadedFiles = ref([])
const previews = ref([])


/* 查询报修记录 */
async function fetchRepairRecords() {
  // 这里可以添加查询报修记录的逻辑
  const response = await getRepairsByUser_id(formData.user_id);
  console.log(response)
  repairRecords.value = response
  repairRecords.value.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)); // 按更新时间降序排列
}

/*上传图片，选择图片*/
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
const uploadFiles = async (_callBack) => {
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
    photo_urls.value = JSON.stringify(uploadedFiles.value)
    if (_callBack) {
      _callBack()
    }
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
//定义传入的json格式的数据
const photo_urls = ref()
// 定义表单数据
const formData = reactive({
  user_id: userCookes.value.id,
  reporter_name: '',
  reporter_contact: '',
  location: '',
  issue_description: input,
  photo_urls: '' //
})

/*获取验证码封装为一个函数用于后续的多次调用*/
async function getTaskEmail() {
  const res = await taskEmail({
    mailbox: userCookes.value.email,
    content: `【系统消息】您有新的任务待处理`
  })
}

/* 确定上传报修记录 */
async function submitRepairRequest() {
  formData.photo_urls = JSON.stringify(uploadedFiles.value)
  const response = await AddRepairs(formData)
  repairRecords.value.unshift(response.data)
  isuploading.value = false
  console.log(response);
}

/*确定*/
function confirm() {
  uploadFiles(() => {
    submitRepairRequest()
    getTaskEmail()
  })
}

export function useRepairs() {
  return {
    repairRecords,
    isuploading,
    formData,
    input,
    handleDrop,
    handleFileSelect,
    triggerFileSelect,
    uploading,
    previews,
    formatSize,
    errorMessage,
    successMessage,
    uploadedFiles,
    fileInput,
    textarea,
    uploadFiles,
    fetchRepairRecords,
    submitRepairRequest,
    confirm
  }
}
