// src/composables/useApi.js
import axios from 'axios'
import {useLoadingStore} from '@/stores/loading.js'
import {ball} from "@/utils/showMessAge.js";

const {open4} = ball()
// 创建基础实例
const createInstance = () => {
  return axios.create({
    baseURL: '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 全局实例
const instance = createInstance()
// 请求拦截器
instance.interceptors.request.use(
    config => {
      // 认证令牌逻辑（示例）
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // 加载状态控制
      if (!config.headers?.silentLoading) {
        useLoadingStore().startLoading()
      }
      return config
    },
    error => {
      useLoadingStore().stopLoading()
      return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    response => {
      if (!response.config.headers?.silentLoading) {
        useLoadingStore().stopLoading()
      }
      return response.data // 直接返回业务数据
    },
    error => {
      useLoadingStore().stopLoading()
      // 统一错误处理
      const status = error.response?.status || 0
      const errorMessage = error.response?.data?.message || '请求失败'
      // open4('网络加载错误',3000)
      console.error(`[HTTP Error] Status: ${status}, Message: ${errorMessage}`)
      // 认证失败处理
      if (status === 401) {
        window.location.href = '/login'
      }
      return Promise.reject({status, message: errorMessage})
    }
)

// 封装请求方法
const httpClient = {
  get: async (url, config) => {
    try {
      return await instance.get(url, config)
    } catch (e) {
      throw e // 错误已在上层拦截器处理
    }
  },
  post: async (url, data, config) => {
    try {
      return await instance.post(url, data, config)
    } catch (e) {
      throw e
    }
  },
  put: async (url, data, config) => {
    return instance.put(url, data, config)
  },
  delete: async (url, config) => {
    return instance.delete(url, config)
  }
}

// 组合式函数
export default function useApi() {
  return {
    ...httpClient,
    // 特殊场景的定制方法
    uploadFile: async (url, file) => {
      const formData = new FormData()
      formData.append('file', file)
      return instance.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }
}

// 导出基础实例供特殊场景使用
export const axiosInstance = instance