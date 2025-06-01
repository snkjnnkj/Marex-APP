<template>
  <loading-animation :loading="isLoading"/>
  <view class="content">
    <navbar>
      <div class="left-section">
        <div class="off" @click="off">
          <!--          <image :src="fanhuiPng" mode="aspectFit"></image>-->
        </div>
        登录和注册
      </div>
    </navbar>
    <view class="content-box">
      <placeholder></placeholder>
      <view class="shows"></view>
      <view class="login__title">
        欢迎登录报修云
      </view>
      <view class="login__content">
        <view class="t-input">
          <input type="text" placeholder="请输入邮箱账号" v-model="mailbox">
        </view>
        <view class="title">
          未注册的邮箱账号验证通过后会自动注册
        </view>
        <view class="agreement" style="display: flex;">
          <checkbox></checkbox>
          <text>同意协议条款</text>
        </view>
        <button class="btn" @click="verification">验证并且登录</button>
        <view class="wx" style="display: flex">
          <view>选择其它</view>
          <view class="login-method" style="display: flex">
            <view class="icon" @click="WxChatLogin" style="display: flex">
              <image :src="wxxchatPng" mode="aspectFill"></image>
            </view>
            <view class="icon" style="display: flex">
              <image :src="QQicuon" mode="aspectFill"></image>
            </view>
            <view class="icon">

            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {Photo} from "@/hooks/photo.js";

const {wxxchatPng, QQicuon} = Photo()
import {useLogin} from '../../stores/useLogin.js'

const {
  mailbox,
  verification,
  isLoading,
  WxChatLogin,
} = useLogin()

// 返回主页
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
  background: #eee;
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
  width: 100%;
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
      height: 55px;
      border-bottom: 1px solid #a8a8a8;

      input {
        width: 100%;
        height: 100%;
        font-size: 20px;
      }
    }

    .title {
      margin-top: 10px;
      color: rgba(141, 136, 136, 0.51);
    }

    .agreement {
      margin-top: 30px;
      align-items: center;
      gap: 10px;

      checkbox {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
    }

    .btn {
      margin-top: 40px;
      height: 44px;
      background: rgba(61, 199, 153, 0.32);
    }

    .wx {
      width: 100%;
      margin-top: 20px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .login-method {
        width: 50%;
        justify-content: space-between;
        align-items: center;

        .icon {
          width: 40px;
          height: 40px;
          background: rgba(61, 199, 153, 0.32);
          border-radius: 50%;
          align-items: center;
          justify-content: center;

          image {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
}

.wxChart {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .3);
  z-index: 10;

  .box {
    width: 65%;
    height: 18%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    flex-direction: column;
    justify-content: space-between;

    .text-box {
      display: flex;
      justify-content: center;

      text {
        text-align: center;
        font-size: 22px;
      }
    }

    button {
      width: 100px;
    }
  }
}
</style>
