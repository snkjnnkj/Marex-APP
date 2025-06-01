<template>
  <view class="content">
    <navbar>
      <div class="left-section">
        <div class="off" @click="off">
          <image :src="fanhuiPng" mode="aspectFit"></image>
        </div>
        修改手机号
      </div>
    </navbar>
    <view class="content-box">
      <!-- 占位符号 -->
      <placeholder></placeholder>
      <view class="shows"></view>
      <view class="main-content">
        <view class="inp" hover-class="hover">
          <input type="text" name="" id="" @focus="fous" @blur="odd" v-model="inpPhone">
          <image :src="offPng" mode="widthFix" :class="{dipsplay:isDipsplay}" @click="empty"></image>
        </view>
        <button @click="confirm">保存</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import {Photo} from '../../hooks/photo';
import {SetUser} from "@/stores/setUser";
import {ref} from 'vue'

const {fanhuiPng, offPng} = Photo()
const {inpPhone, setPhone} = SetUser()

function off() {
  uni.navigateBack({
    delta: 1
  })
}

const isDipsplay = ref(false)

function fous() {
  isDipsplay.value = true
}

function odd() {
  isDipsplay.value = false
}

// 邮箱正则验证函数
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@(qq|163|126|yeah)\.(com|net)$/i;
  return regex.test(email);
}

function confirm() {
  if (inpPhone.value == '') {
    uni.showToast({
      title: '请输入正确的手机号',  // 提示内容
      icon: 'none',     // 图标类型（success/loading/none）
      duration: 2000,      // 显示时长（毫秒）
      mask: true           // 是否显示透明蒙层
    })
    return
  }
  off()
  setPhone()
}

function empty() {
  inpPhone.value = ''
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
}

.main-content {
  height: 100%;
  background: #fff;
  padding: 16px;
  position: relative;

  .inp {
    height: 45px;
    border-bottom: 1px solid rgba(61, 199, 153, 0.32);
    position: relative;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      height: 45px;
    }

    image {
      width: 20px;
      position: absolute;
      right: 0;
      top: 10px;
      opacity: 0;
      z-index: 12;
    }

    .dipsplay {
      opacity: 1;
    }
  }

  button {
    width: 70%;
    position: absolute;
    bottom: 20%;
    background: rgba(61, 199, 153, 0.32);
    left: 0;
    right: 0;
    margin: auto;
  }
}

</style>
