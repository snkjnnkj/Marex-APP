<template>
  <view class="content">
    <navbar>
      <div class="left-section">
        <div class="off" @click="off">
          <image :src="fanhuiPng" mode="aspectFit"></image>
        </div>
      </div>
    </navbar>
    <view class="content-box">
      <placeholder></placeholder>
      <view class="shows"></view>
      <view class="login__title">
        请输入验证码
      </view>
      <view class="login__content">
        <view class="login-code__tips">
          验证码已通过邮件发送至 {{ mailbox }}
        </view>
        <view class="t-input">
          <input type="text" placeholder="请输入" v-model="codeInput">
          <view class="code" @click="getLoginCode">{{ countdown1 }}</view>
        </view>
        <button class="btn" @click="verificationCode">登录</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {onShow} from "@dcloudio/vue-cli-plugin-uni/packages/uni-app";
import {Photo} from '../../hooks/photo';

const {fanhuiPng} = Photo()
import {useLogin} from '../../stores/useLogin'

const {mailbox, codeInput, countdown1, getLoginCode, verificationCode} = useLogin();

//返回上一个界面
function off() {
  uni.navigateBack({
    delta: 1
  })
}
</script>


<style scoped lang="scss">
.content {
  width: 100vw;
  height: 100vh;
  background: #fff;
}

/* 左侧内容样式 */
.left-section {
  width: 58%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;

  image {
    width: 20px;
    height: 20px;
  }
}

.content-box {
  height: 100vh;
  // background: #eee;
  display: flex;
  flex-direction: column;

  .shows {
    width: 100%;
    height: 20px;
    background: rgba(61, 199, 153, 0.32);
  }

  .login__title {
    color: rgba(0, 0, 0, 0.9);
    font-size: 56rpx;
    font-weight: 600;
    line-height: 72rpx;
    padding: 16px;
    padding-top: 0px;
  }

  .login__content {
    padding: 16px;
    height: 100vh;
    padding-top: 0px;

    .t-input {
      height: 50px;
      border-bottom: 1px solid #a8a8a8;
      margin-top: 30px;
      display: flex;
      align-items: center;
      position: relative;

      input {
        width: 70%;
        height: 100%;
        font-size: 20px;
      }

      .code {
        width: 110px;
        height: 60%;
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
        border-left: 1px solid #a8a8a8;
        display: flex;
        justify-content: flex-end;
      }
    }

    .btn {
      margin-top: 40px;
      height: 44px;
      background: rgba(61, 199, 153, 0.32);
    }
  }
}
</style>
