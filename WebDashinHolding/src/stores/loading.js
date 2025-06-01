import {defineStore} from 'pinia'

export const useLoadingStore = defineStore('loading', {
    state: () => ({
        isLoading: false,
        reqCount: 0 // 用于处理多个请求
    }),
    actions: {
        startLoading() {
            this.reqCount++
            this.isLoading = true
        },
        stopLoading() {
            this.reqCount--
            if (this.reqCount <= 0) {
                this.reqCount = 0
                this.isLoading = false
            }
        }
    }
})