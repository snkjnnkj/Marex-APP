<template>
  <div class="TY-Home">
    <!-- 第一屏 -->
    <section class="block">
      <div class="h-[60vh] min-h-[400px] relative w-full overflow-hidden">
        <!--背景-->
        <div
            class="absolute inset-0 flex items-center justify-center bg-cover bg-center bg-no-repeat transition-transform duration-1000">
          <div class="h-full w-full object-cover relative">
            <!-- 视频背景 -->
            <video src="https://oss.ideaflow.top/video/backgroundVideo.mp4" class="h-full w-full object-cover"
                   autoplay="" loop="" muted="" playsinline=""></video>
          </div>
          <div class="bg-black/1 absolute inset-0 transition-opacity duration-300 dark:bg-black/40"></div>
        </div>
        <div class="banner none">
          <div class="banner-left">
            <div class="yk-space align-center justify-start">
              <DefinitionText :font-size="170" :text="'text2'" style="transform: translateY(15px)">
                大信
              </DefinitionText>
              <DefinitionText :font-size="150" :text="'text1'" style="transform: translateY(20px)">
                中心
              </DefinitionText>
            </div>
            <p class="slogan">别害怕黑暗<br/>光会照亮你前行的脚步</p>
            <div class="down">
              <svg data-v-9557f118="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"
                   class="yk-icon icon-arrow-down-outline moves" stroke-width="0" stroke-linecap="butt"
                   style="fill: currentcolor; font-size: inherit">
                <path
                    d="M550.4 51.2v771.098l178.816-178.816 54.323 54.297L512 969.32 240.46 697.78l54.324-54.297 178.79 178.816L473.6 51.2h76.8z">
                </path>
              </svg>
            </div>
            <div class="yk-space size-s align-center justify-start links">
              <span class="yk-text" style="color: #fff;">相关地址</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" class="yk-icon icon-bilibili-fill"
                   stroke-width="0" stroke-linecap="butt" style="fill: #ffffff;">
                <path
                    d="M688.9 881.9H336.4v11.9c0 12.7-4.7 24.6-13.8 33.6-9 9-20.8 13.8-33.6 13.8-12.7 0-24.6-5.2-33.6-13.8-9-8.4-13.6-20.8-13.6-33.6v-11.9h-23.3c-85.3 0-154.4-63.6-154.4-142V365.7c0-78.1 69.1-142 154.4-142H388l-91-81c-16.5-14.7-17.6-30.3-2.9-46.9 14.7-16.5 30.3-17.6 46.9-2.9l146.3 130.7h49.2L683.1 92.8c16.5-14.7 32.1-13.8 46.9 2.9 14.7 16.5 13.8 32.1-2.9 46.9l-91 81.5h170.6c43.6 0 85.3 17.1 114.2 46.5 25.5 25.1 39.9 59.6 39.3 95.7v374.2c0 78.1-69.1 142-154.4 142h-23.2v11.9c0 12.7-4.7 24.6-13.8 33.6-9 9-20.8 13.8-33.6 13.8-12.7 0-24.6-4.7-33.6-13.8-9-9-13.8-20.8-13.8-33.6V882h1.1zM562.5 717.6c7.2 0 14.2-2.3 19.9-6.6l42.6-31.8c6.6-3.8 9.9-11 9.5-18.5-.5-7.5-5.2-13.6-12.4-16.5-7.2-2.9-14.7-1.4-20.3 3.8l-37.9 28.4-27.5-33.6c-6.1-7.5-15.6-12.4-25.5-12.4s-19.4 4.3-25.5 11.9l-28 33.2-32.7-26.9c-5.2-4.7-12.7-6.1-19.4-3.8-6.6 2.3-11.3 8.1-12.4 15.1-.9 7.2 2 14.2 7.2 18.5l37 30.7c14.2 11.3 34.7 9.5 46.5-4.3l26.9-32.1 26.6 32.7c5.8 7.4 15.3 12.2 25.4 12.2zM397.1 499.3c16.2-3.8 26.9-19.9 23.2-35.9-1.4-8.1-6.1-15.1-13.3-19.4-6.6-4.3-15.1-5.7-23.2-4.3l-149.2 34.1c-16.5 3.2-26.9 19.9-23.2 35.9 3.2 16.5 19.9 26.9 35.9 23.2l149.8-33.6zm231.1 0 149.2 34.1c10.4 2.3 21.7-1.4 28.9-9.5 7.2-8.1 9.5-19.4 6.1-29.8-3.2-10.4-11.9-18-22.8-20.3l-149.2-34.1c-8.1-2-16.2-.5-23.2 4.3-6.6 4.3-11.3 11.3-13.3 19.4-2.7 15.4 8.3 31.9 24.3 35.9zm0 0">
                </path>
              </svg>
              <a href="https://github.com/snkjnnkj/Real-time-message-system.git">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" class="yk-icon icon-github-fill"
                     stroke-width="0" stroke-linecap="butt" style="fill: #ffffff;">
                  <path
                      d="M0 524.992q0 166.016 95.488 298.496t247.488 185.504q6.016.992 10.016.992t6.496-1.504 4-3.008 2.016-4.992.512-4.992V894.976q-36.992 4-66.016-.512t-45.504-14.016-28.992-23.488-16.992-25.504-8.992-24-5.504-14.496q-8.992-15.008-27.008-27.488t-27.008-20-2.016-14.496Q188 704.96 250.976 796.992 284.992 848 369.984 827.008q10.016-40.992 40-70.016-116-20.992-172-86.016t-56-158.016q0-87.008 55.008-151.008-22.016-64.992 6.016-136.992Q272 222.944 308 236.448t50.496 23.008T384 276.96q56.992-16 128.512-16t129.504 16q12.992-8.992 28.992-19.008T720 236.448t60.992-9.504Q808 297.952 788 361.952q56 64 56 151.008 0 92.992-56.992 158.496t-172 85.504q43.008 43.008 43.008 104v128.992q0 .992.992 3.008 0 6.016.512 8.992t4.512 6.016 12 3.008q152.992-52 250.496-185.504t97.504-300.512q0-104-40.512-199.008T874.528 162.464 711.04 53.472 512.032 12.96 313.024 53.472 149.536 162.464 40.544 325.952.032 524.96z">
                  </path>
                </svg>
              </a>
            </div>
          </div>
          <div class="yk-space dir-vertical align-start justify-start web-link">
            <a href="/jurisdiction/MaintainPage" target="_blank">
              <div class="web-link-num">
                <div class="images">
                  <img src="https://huohuo90.com/images/lyq.png" alt=""/>
                </div>
                <span class="yk-text">维修服务</span>
              </div>
            </a>
            <div class="web-link-num" @click="management">
              <div class="images">
                <img src="https://huohuo90.com/images/lyq.png" alt=""/>
              </div>
              <span class="yk-text">管理员权限</span>
            </div>
            <a href="https://xiaoli.icu" target="_blank">
              <div class="web-link-num">
                <div class="images">
                  <img src="@/assets/img/c313b59d22b1ae9773a471285db503f5.png" alt=""/>
                </div>
                <span class="yk-text">marex官网</span>
              </div>
            </a>
            <a href="https://xiaoli.icu:3003/HomePage" target="_blank">
              <div class="web-link-num">
                <div class="images">
                  <img src="@/assets/img/970bc8ab78462a3bdd7a16864f728203.png" alt=""/>
                </div>
                <span class="yk-text">实时通讯</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
    <starrySky></starrySky>
  </div>
</template>
<script setup>
/* 波浪组件 */
import starrySky from '@/components/PublicUi/starrySky/starrySky.vue'
/* 字体组件 */
import DefinitionText from '@/components/PublicUi/DefinitionText/Definition-text.vue'
import {useLogin} from "@/stores/useLogin.js";
import router from "@/router/index.js";
import {ball} from "@/utils/showMessAge.js";

const {open4} = ball();
const {verificationCookes} = useLogin()

/*优先验证登录否则不能进入管理员页面*/
function management() {
  verificationCookes(
      () => {
        router.push('/jurisdiction')
      },
      () => {
        open4('请先登录', 3000)
      }
  )
}
</script>
<style scoped lang="scss">
// 公共样式（PC 和移动端共用）
@media (min-width: 769px) {
  // PC 断点
  @import "pc.scss"; // 在 PC 端加载
}

/*移动端显示的css样式*/
@media (max-width: 769px) {
  @import "move.scss";
}
</style>
