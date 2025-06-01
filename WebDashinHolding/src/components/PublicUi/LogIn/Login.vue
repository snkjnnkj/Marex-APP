<template>
  <div class="vs-dialog-content" style="z-index: 100">
    <Transition name="bounce" mode="out-in">
      <div v-if="vsDialog" class="vs-dialog">
        <button class="vs-dialog__close" @click="off">
          <i class="vs-icon-close vs-icon-hover-x"></i></button>
        <header class="vs-dialog__header">
          <h4 class="not-margin">欢迎来到 <b>xxxx</b></h4>
        </header>
        <div class="vs-dialog__content">
          <div class="con-form">
            <div class="vs-input-parent vs-input-parent--state-null vs-component--primary" placeholder="Email">
              <div class="vs-input-content">
                <input placeholder="" v-model="mailbox" id="vs-input--511" class="vs-input vs-input--has-icon">
                <label for="vs-input--511" class="vs-input__label">{{
                    mailbox ? '' : '电子邮件'
                  }}</label>
                <span class="vs-input__icon">
                  <svg t="1741268506154" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="8174" width="20" height="20">
                    <path
                        d="M690.944 628.352c52.821333 40.277333 88.32 48.682667 110.805333 38.613333 14.762667-6.656 25.386667-22.229333 31.573334-39.466666a341.461333 341.461333 0 0 0-150.613334-411.050667 341.333333 341.333333 0 1 0-170.026666 637.013333l0.256 85.333334a424.874667 424.874667 0 0 1-214.186667-57.216C94.677333 763.733333 24.746667 502.784 142.592 298.752c117.76-204.074667 378.752-274.005333 582.826667-156.16a426.752 426.752 0 0 1 188.202666 513.877333 172.202667 172.202667 0 0 1-20.096 39.466667c-14.378667 21.077333-33.066667 38.186667-56.832 48.853333-56.618667 25.429333-125.653333 8.106667-206.08-55.338666a213.333333 213.333333 0 1 1 60.330667-61.098667z m-178.858667 11.733333a128 128 0 1 0 0-256 128 128 0 0 0 0 256z"
                        fill="#2E2F30" p-id="8175"></path>
                  </svg>
                </span>
                <div class="vs-input__affects">
                  <div class="vs-input__affects__1"></div>
                  <div class="vs-input__affects__2"></div>
                  <div class="vs-input__affects__3"></div>
                  <div class="vs-input__affects__4"></div>
                </div>
              </div><!----><!----><!----><!---->
            </div>
            <div class="vs-input-parent vs-input-parent--state-null vs-component--primary" type="password"
                 placeholder="Password">
              <div class="vs-input-content">
                <input type="text" placeholder="" id="vs-input--512dfd6" class="vs-input vs-input--has-icon"
                       v-model="code"/>
                <label for="vs-input--512dfd6" class="vs-input__label">{{
                    code ? '' : '验证码'
                  }}</label>
                <span class="vs-input__icon">
              <svg t="1741268366050" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="6280" width="20" height="20">
                <path
                    d="M877.19 151.588L927 144.42v481.433l-2.542 7.15a622.398 622.398 0 0 1-142.386 227.621l-0.182 0.185-0.183 0.183c-36.781 36.581-80.07 70.963-122.936 96.574C607.109 988.43 557.585 1006 512.5 1006c-45.088 0-94.592-17.534-146.202-48.35-42.884-25.605-86.18-60.003-123.018-96.671l-0.191-0.19-0.189-0.193A624.791 624.791 0 0 1 100.555 633.04L98 625.874V150.83l44.375 0.378c48.96 0.418 97.62-7.685 143.797-23.945l0.521-0.184 0.526-0.17a748.46 748.46 0 0 0 199.96-99.893L511.573 9.85l24.979 16.306a986.95 986.95 0 0 0 201.955 100.987c36.862 11.904 69.104 19.111 96.726 22.556 18.276 2.28 31.852 2.633 40.737 1.992 0.527-0.038 0.934-0.074 1.22-0.103z m-52.849 85.435c-33.369-4.162-71.286-12.66-113.692-26.402l-0.73-0.237-0.72-0.261a1074.982 1074.982 0 0 1-195.89-94.53 836.489 836.489 0 0 1-198.436 94.86A510.113 510.113 0 0 1 186 237.65V610.5a536.8 536.8 0 0 0 119.554 188.3C374.804 867.672 459.142 918 512.5 918c53.292 0 137.733-50.42 206.967-119.22A534.407 534.407 0 0 0 839 610.522v-371.92c-4.676-0.42-9.563-0.944-14.659-1.58z m-354.355 342.84l197.99-197.99c17.183-17.182 45.043-17.182 62.226 0 17.183 17.184 17.183 45.043 0 62.226L469.986 704.314 310.887 545.215c-17.183-17.183-17.183-45.042 0-62.225s45.043-17.183 62.226 0l96.873 96.874z"
                    fill="#000000" p-id="6281"></path>
              </svg>
            </span>
                <div class="vs-input__affects">
                  <div class="vs-input__affects__1"></div>
                  <div class="vs-input__affects__2"></div>
                  <div class="vs-input__affects__3"></div>
                  <div class="vs-input__affects__4"></div>
                </div>
                <div class="verificationCode" @click="GetEmail">{{ countdown1 }}</div>
              </div>
            </div>
            <div class="flex">
              <div class="vs-checkbox-content vs-component--primary">
                <div class="vs-checkbox-con">
                  <input type="checkbox" id="521" class="vs-checkbox" v-model="remember">
                  <div class="vs-checkbox-mask">
                    <i class="vs-icon-check">
                      <span>
                        <div class="line1"></div>
                        <div class="line2"></div>
                      </span>
                    </i>
                  </div>
                </div>
                <label for="521" class="vs-checkbox-label">记住我</label>
              </div>
            </div>
          </div>
        </div>
        <footer class="vs-dialog__footer">
          <div class="footer-dialog">
            <button @click="confirm"
                    class="vs-button vs-button--null vs-button--size-null vs-button--block vs-button--primary vs-button--default"
                    style="height: 35px;">
              <div class="vs-button__content">
                登录
              </div>
            </button>
            <div class="new"></div>
          </div>
        </footer>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
/*进入动画*/
import {onMounted, ref} from 'vue'
/*控制输入框弹出的缩放大小*/
const vsDialog = ref(false);
// 暴露动画状态给路由守卫
defineExpose({
  vsDialog,
});
/*进入组件的时候应用弹出动画*/
onMounted(() => {
  vsDialog.value = true
})
/*导入登录框*/
import {useLogin} from "@/stores/useLogin.js";
/*
* isLogin 控制登录弹窗
* mailbox 邮箱账号输入值
* code 验证码输入值
* countdown1 倒计时数字
* GetEmail 获取验证码函数
* confirm 确定登录函数
* remember 是否记住我的账号，用于下次不需要重新登录
* */
const {isLogin, mailbox, code, countdown1, remember, GetEmail, confirm} = useLogin()

/*关闭当前弹窗*/
function off() {
  isLogin.value = false //关闭登录框的缩放动画，其实不需要这个东西
  vsDialog.value = false //关闭登录弹窗
}
</script>
<style scoped lang="scss">
@import "@/assets/style/login.css";
// PC 断点
@media (min-width: 769px) {
  @import "pc.scss";
  .verificationCode {
    width: fit-content;
    position: absolute;
    right: 0;
    padding: 0 10px;
    cursor: pointer;
  }
}


@media (max-width: 770px) {
  .verificationCode {
    width: fit-content;
    position: absolute;
    right: 0;
    padding: 0 10px;
    cursor: pointer;
  }
}
</style>