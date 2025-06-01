<script setup>
import {onLaunch} from "@dcloudio/vue-cli-plugin-uni/packages/uni-app";
import {useLogin} from './stores/useLogin.js'

const {cookesUser, home} = useLogin()
onLaunch(() => {
  // 检查本地存储中是否存在关键数据（如 token）
  // try {
  //   if (cookesUser.value) {
  //     // 数据存在，跳转首页
  //     uni.switchTab({
  //       url: '/pages/index/index' // 假设首页是 tabbar 页面
  //     });
  //   } else {
  //     // 数据不存在，跳转登录页
  //     uni.redirectTo({
  //       url: '/pages/Login/Login'
  //     });
  //   }
  // } catch (error) {
  //   // 异常处理（如存储读取失败）
  //   console.error('存储读取失败:', error);
  //   uni.redirectTo({
  //     url: '/pages/Login/Login'
  //   });
  // }
})
</script>

<style>

</style>
