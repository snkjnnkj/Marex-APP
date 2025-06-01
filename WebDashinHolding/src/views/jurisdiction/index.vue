<template>
  <div class="jurisdiction">
    <div class="nav">
      <div class="logo" @click="router.push('/HomeView')">
        <img
            src="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20width='32px'%20height='32px'%20viewBox='0%200%2032%2032'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3ctitle%3e编组%3c/title%3e%3cg%20id='留言墙'%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%3e%3cg%20id='首页'%20transform='translate(-30.000000,%20-10.000000)'%3e%3cg%20id='编组'%20transform='translate(30.000000,%2010.000000)'%3e%3crect%20id='矩形'%20fill='%23B7B7B7'%20opacity='0'%20x='0'%20y='0'%20width='32'%20height='32'%3e%3c/rect%3e%3cpath%20d='M3.92308291,6.52079314%20L11.6822922,10.5576791%20C13.6675812,11.5905659%2014.9130435,13.6424839%2014.9130435,15.8803909%20L14.9130435,24.6614913%20C14.9130435,25.7660608%2014.017613,26.6614913%2012.9130435,26.6614913%20C12.5916798,26.6614913%2012.2750482,26.5840512%2011.9899606,26.4357286%20L4.23075127,22.3988427%20C2.24546227,21.3659558%201,19.3140378%201,17.0761308%20L1,8.29503042%20C1,7.19046092%201.8954305,6.29503042%203,6.29503042%20C3.32136364,6.29503042%203.63799523,6.37247049%203.92308291,6.52079314%20Z'%20id='矩形'%20fill='%233B73F0'%3e%3c/path%3e%3cpath%20d='M20.2307513,10.5576791%20L27.9899606,6.52079314%20C28.9698448,6.01098852%2030.1774761,6.39206331%2030.6872808,7.37194751%20C30.8356034,7.65703519%2030.9130435,7.97366678%2030.9130435,8.29503042%20L30.9130435,17.0761308%20C30.9130435,19.3140378%2029.6675812,21.3659558%2027.6822922,22.3988427%20L19.9230829,26.4357286%20C18.9431987,26.9455332%2017.7355673,26.5644584%2017.2257627,25.5845742%20C17.0774401,25.2994866%2017,24.982855%2017,24.6614913%20L17,15.8803909%20C17,13.6424839%2018.2454623,11.5905659%2020.2307513,10.5576791%20Z'%20id='矩形备份-7'%20fill='%233B73F0'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e">
        <span>后台管理系统</span>
      </div>
      <div class="TY-nav-user">
        <!-- 搜索框 -->
        <div class="yk-space size-s align-center justify-start" style="gap: 15px;">
          <div class="yk-input"><!---->
            <div class="yk-input__inner yk-input__inner--primary yk-input__inner--l">
              <input placeholder="文章/图库/日记/资源" class="yk-input__widget" type="text" tabindex="0" value="">
              <div class="yk-input__buttons"><!----><!----></div><!----><!---->
              <svg @click="enterSearch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
                   class="yk-icon icon-search-outline search" stroke-width="0" stroke-linecap="butt"
                   style="fill: currentcolor; font-size: inherit;">
                <path
                    d="M435.2 76.8c197.94 0 358.4 160.46 358.4 358.4a356.864 356.864 0 0 1-78.029 223.258l253.107 253.081-54.297 54.272-252.8-252.749A356.915 356.915 0 0 1 435.2 793.6c-197.94 0-358.4-160.46-358.4-358.4S237.26 76.8 435.2 76.8zm0 76.8c-155.52 0-281.6 126.08-281.6 281.6s126.08 281.6 281.6 281.6 281.6-126.08 281.6-281.6c0-153.062-122.112-277.58-274.227-281.498l-7.373-.102z">
                </path>
              </svg>
            </div><!---->
          </div><!---->
          <!--        主题切换-->
          <div class="yk-theme" @click="toggleTheme">
            <svg class="yk-icon icon-moon-fill" stroke-linecap="butt" stroke-width="0" style="fill: var(--switch)"
                 viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M644.506 70.528C834.406 127.488 972.8 303.565 972.8 512c0 254.49-206.31 460.8-460.8 460.8-222.413 0-408.013-157.568-451.277-367.13A433.485 433.485 0 0 0 230.4 640c240.358 0 435.2-194.842 435.2-435.2 0-44.211-6.58-86.86-18.842-127.053z">
              </path>
            </svg>
            <svg class="yk-icon icon-sun-fill" stroke-linecap="butt" stroke-width="0"
                 style="fill: var(--switch2); font-size: inherit" viewBox="0 0 1024 1024"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M550.4 842.598V998.4h-76.8V842.598a336.333 336.333 0 0 0 76.8 0zm222.515-123.98 110.183 110.156-54.324 54.324-110.156-110.183a334.797 334.797 0 0 0 54.272-54.272zm-521.83 0a334.797 334.797 0 0 0 54.272 54.272L195.226 883.098l-54.324-54.324 110.183-110.156zM512 256c141.389 0 256 114.611 256 256S653.389 768 512 768 256 653.389 256 512s114.611-256 256-256zm486.4 217.6v76.8H842.598a336.333 336.333 0 0 0 0-76.8H998.4zm-816.998 0a336.333 336.333 0 0 0 0 76.8H25.6v-76.8h155.802zm13.824-332.698 110.156 110.183a334.797 334.797 0 0 0-54.272 54.272L140.877 195.25l54.323-54.323zm633.548 0 54.324 54.324-110.183 110.156a334.797 334.797 0 0 0-54.272-54.272l110.131-110.208zM550.4 25.6v155.802a336.333 336.333 0 0 0-76.8 0V25.6h76.8z">
              </path>
            </svg>
          </div>
          <!--          头像显示-->
          <div class="photo-login">
            <img class="login"
                 :src="userCookes.avatar?userCookes.avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'"
                 alt="头像" title="个人">
          </div>
          <!--          下拉列表-->
          <el-dropdown placement="bottom-end" trigger="click">
            <svg t="1747804913158" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="8625" width="20" height="20">
              <path
                  d="M904 332c0-8.189-3.124-16.379-9.372-22.628-12.497-12.496-32.759-12.496-45.256 0L512 646.745 174.628 309.372c-12.497-12.496-32.758-12.496-45.255 0-12.497 12.498-12.497 32.758 0 45.256l360 360c12.497 12.496 32.758 12.496 45.255 0l360-360C900.876 348.379 904 340.189 904 332z"
                  fill="#2c2c2c" p-id="8626"></path>
            </svg>
            <template #dropdown>
              <div class="personage" style="width: 250px;">
                <div class="bg" v-if="userCookes">
                  <div class="option">
                    <div class="photo">
                      <img
                          :src="userCookes.avatar?userCookes.avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132'"
                          alt="头像" title="头像">
                    </div>
                    <div class="right">
                      <span>{{ userCookes.username }}</span>
                      <span>{{ userCookes.email }}</span>
                    </div>
                  </div>
                  <div class="option" @click="router.push('/PersonalCenter')">
                    个人中心
                    <img alt="" src="@/assets/icon/向右1.svg"/>
                  </div>
                  <div class="option" @click="router.push('/HomeView')">
                    返回首页
                    <img alt="" src="@/assets/icon/向右1.svg"/>
                  </div>
                  <div class="option" @click="out">
                    退出登录
                    <img alt="" src="@/assets/icon/向右1.svg"/>
                  </div>
                </div>
                <!--点击弹出登录框-->
                <div class="bg" v-else>
                  <div class="option" @click="isLogin = true">
                    点击登录
                    <img alt="" src="@/assets/icon/向右1.svg"/>
                  </div>
                </div>
              </div>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="main">
      <ManagementNav></ManagementNav>
      <div class="box">
        <!--路由占位-->
        <RouterView>

        </RouterView>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ManagementNav from "@/components/Main/ManagementNav/ManagementNav.vue";
/*导入主题切换函数*/
import {useTheme} from '@/stores/TopicSwitching.js'
/*解构出点击按钮切换浅色和深色模式函数*/
const {toggleTheme} = useTheme()
/*导入登录的公共变量、并且解构赋值*/
import {useLogin} from "@/stores/useLogin.js";

const {isLogin, userCookes, out} = useLogin();
import {useRouter} from "vue-router";

const router = useRouter();
</script>
<style scoped lang="scss">
@media (min-width: 770px) {
  @import "pc.scss";
}
</style>