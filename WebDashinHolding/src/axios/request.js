// src/utils/request.js
import axios from 'axios'
import {ball} from "@/utils/showMessAge.js";

const {open4} = ball()
// 创建实例
const instance = axios.create({
  baseURL: '/api', // 统一接口前缀
  timeout: 10000,  // 超时时间
  headers: {'Content-Type': 'application/json'}
})
// 请求拦截器
instance.interceptors.request.use(
    (config) => {
      // 可在此添加token等逻辑
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
)

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
      return response.data // 直接返回业务数据
    },
    (error) => {
      // open4('网络加载错误', 3000)
      console.error('请求错误:', error)
      return Promise.reject(error)
    }
)

export default instance