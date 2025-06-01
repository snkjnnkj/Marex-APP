<template>
  <div class="inline-block">
    <ModulNav></ModulNav>
    <Navigation></Navigation>
    <MainPage></MainPage>
    <FoolPage></FoolPage>
    <Teleport to="body">
      <Login v-if="isLogin"></Login>
    </Teleport>
  </div>
</template>
<script setup>
import {onMounted, ref} from 'vue'
/*移动端的导航栏*/
import ModulNav from "@/components/Main/modulNav/modulNav.vue";
/*导航栏*/
import Navigation from '@/components/Main/nav/Navigation.vue'
/*路由组件*/
import MainPage from "@/components/Main/MainPage.vue";
/*页脚*/
import FoolPage from "@/components/Main/FoolPage/FoolPage.vue";
/*导入登录框*/
import Login from '@/components/PublicUi/LogIn/Login.vue';
/*导入登录框*/
import {useLogin} from "@/stores/useLogin.js";
/*导入消息提示框*/
import {ball} from "@/utils/showMessAge.js";

const {open4} = ball()
const {isLogin, userCookes, out} = useLogin()
import {IpSite} from '@/stores/IpSite.js'
import axios from "axios";
// 查询账号状态（比如1天查一次或者半天查询一次）
const getUserStatus = async () => {
  if (userCookes.value) {
    try {
      const res = await axios.get(`${IpSite}/api/getUserByIdStatus/${userCookes.value.id}`)
      if (res.data.status === 0) {
        console.log(res.data.status)
        open4('账号已被封禁,请联系管理员', 5000)
        out()
      }
      // if (res.data.user_role !== 1) {
      //   open4('权限已变更，请重新登录', 5000)
      // }
    } catch (err) {
      console.log('请求失败')
    }
  }
}
onMounted(() => {
  getUserStatus()
  /*定时轮询状态*/
  setInterval(() => {
    getUserStatus()
  }, 5000)
})
</script>
<style scoped lang="scss">
.inline-block {
  width: 100%;
  height: 100vh;
}
</style>