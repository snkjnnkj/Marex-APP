<template>
  <view class="content">
    <navbar>
      <div class="left-section">
        <div class="off" @click="off">
          <image :src="fanhuiPng" mode="aspectFit"></image>
        </div>
        个人资料
      </div>
    </navbar>
    <view class="content-box">
      <!-- 占位符号 -->
      <placeholder></placeholder>
      <view class="shows"></view>
      <view class="main-content">
        <view class="item">
          <view class="item-list" @click="chooseImages">
            <text>头像</text>
            <view class="right">
              <image class="avatar" :src="cookesUser.avatar" mode="aspectFill"></image>
              <image class="icon" :src="xiangyouPng" mode="widthFix"></image>
            </view>
          </view>
          <view class="item-list" @click="LeaveForNamePages">
            <text>名字</text>
            <view class="right">
              <text>{{ cookesUser.username }}</text>
              <image class="icon" :src="xiangyouPng" mode="widthFix"></image>
            </view>
          </view>
          <view class="item-list" @click="sexPage">
            <text>性别</text>
            <view class="right">
              <text>{{ cookesUser.sex == null ? '未填写' : cookesUser.sex }}</text>
              <image class="icon" :src="xiangyouPng" mode="widthFix"></image>
            </view>
          </view>
          <view class="item-list" @click="EmailPage">
            <text>邮箱</text>
            <view class="right">
              <text>{{ cookesUser.email == null ? '未填写' : cookesUser.email }}</text>
              <image class="icon" :src="xiangyouPng" mode="widthFix"></image>
            </view>
          </view>
          <view class="item-list" @click="PhonePage">
            <text>手机号</text>
            <view class="right">
              <text>{{ cookesUser.phone == null ? '未填写' : cookesUser.phone }}</text>
              <image class="icon" :src="xiangyouPng" mode="widthFix"></image>
            </view>
          </view>
          <view class="item-list" @click="TeacherPagePage">
            <text>教师标识</text>
            <view class="right">
              <text>{{ cookesUser.teacher == null ? '未填写' : cookesUser.teacher }}</text>
              <image class="icon" :src="xiangyouPng" mode="widthFix"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {Photo} from '../../hooks/photo.js';
import {useLogin} from '../../stores/useLogin.js'
import {SetUser} from '../../stores/setUser'

const {cookesUser} = useLogin()
const {fanhuiPng, xiangyouPng} = Photo()
const {chooseImages} = SetUser()

function off() {
  uni.navigateBack({
    delta: 1
  })
}

function LeaveForNamePages() {
  uni.navigateTo({
    url: '/pages/name/name',
  })
}


function sexPage() {
  uni.navigateTo({
    url: '/pages/sexPage/sexPage',
  })
}

//跳转修改邮箱界面
function EmailPage() {
  uni.navigateTo({
    url: '/pages/setEmailPage/setEmailPage',
  })
}

//跳转修改手机号界面
function PhonePage() {
  uni.navigateTo({
    url: '/pages/setPhonePage/setPhonePage',
  })
}

//跳转修改教师认证编号
function TeacherPagePage() {
  uni.navigateTo({
    url: '/pages/setTeacherPage/setTeacherPage',
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
}

.main-content {
  height: 100%;
  background: #fff;
  padding: 16px;
}

.item {
  height: fit-content;
  //border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.item-list {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #bbb9b9;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .right {
    width: fit-content;
    display: flex;
    align-items: center;
    height: 100%;
    gap: 10px;

    .avatar {
      width: 30px;
      height: 30px;
    }

    .icon {
      width: 20px;
    }
  }
}
</style>
