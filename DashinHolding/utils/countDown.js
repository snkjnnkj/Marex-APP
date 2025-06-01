import { ref } from 'vue'

export function useCountDown() {
  // 每个实例独立的响应式状态
  const countdown = ref('获取验证码')
  const isCounting = ref(false)
  let timer = null

  const startCountdown = () => {
    return new Promise((resolve) => {
      isCounting.value = true
      countdown.value = 60

      timer = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value--
        } else {
          clearInterval(timer)
          countdown.value = '获取验证码'
          isCounting.value = false
          resolve()
        }
      }, 1000)
    })
  }

  const handleClick = async (callback) => {
    if (!isCounting.value) {
      await startCountdown()
      if (callback) {
        await callback()
      }
    }
  }

  // 组件卸载时自动清理
  const stop = () => {
    if (timer) {
      clearInterval(timer)
      isCounting.value = false
      countdown.value = '获取验证码'
    }
  }

  return {
    countdown,
    handleClick,
    stop,
  }
}
