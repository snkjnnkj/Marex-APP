<template>
  <RoutingAnimation :rou="'/PersonalCenter'" :title="'个人资料'">
    <template v-slot:mian>
      <div class="paing">
        <div class="box">
          <div class="item">
            <div class="item-list" style="position: relative;">
              <span>头像</span>
              <div class="right">
                <img class="avatar" style="border-radius: 4px;" :src="userCookes.avatar"></img>
                <svg t="1747566407830" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="2822" width="25" height="25">
                  <path
                      d="M558.933333 490.666667L384 665.6l59.733333 59.733333 234.666667-234.666666L443.733333 256 384 315.733333l174.933333 174.933334z"
                      fill="#2c2c2c" p-id="2823"></path>
                </svg>
              </div>
              <input class="inp" ref="fileInput" type="file" accept="image/*"
                     @change="uploadPictures">
            </div>
            <div class="item-list" @click="router.push('/SetNamePage')">
              <span>昵称</span>
              <div class="right">
                <span>{{ userCookes.username }}</span>
                <svg t="1747566407830" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="2822" width="25" height="25">
                  <path
                      d="M558.933333 490.666667L384 665.6l59.733333 59.733333 234.666667-234.666666L443.733333 256 384 315.733333l174.933333 174.933334z"
                      fill="#2c2c2c" p-id="2823"></path>
                </svg>
              </div>
            </div>
            <div class="item-list" @click="router.push('/SetSex')">
              <span>性别</span>
              <div class="right">
                <span>{{ userCookes.sex == null ? '未填写' : userCookes.sex }}</span>
                <svg t="1747566407830" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="2822" width="25" height="25">
                  <path
                      d="M558.933333 490.666667L384 665.6l59.733333 59.733333 234.666667-234.666666L443.733333 256 384 315.733333l174.933333 174.933334z"
                      fill="#2c2c2c" p-id="2823"></path>
                </svg>
              </div>
            </div>
            <div class="item-list" @click="router.push('/SetEmail')">
              <span>邮箱</span>
              <div class="right">
                <span>{{ userCookes.email == null ? '未填写' : userCookes.email }}</span>
                <svg t="1747566407830" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="2822" width="25" height="25">
                  <path
                      d="M558.933333 490.666667L384 665.6l59.733333 59.733333 234.666667-234.666666L443.733333 256 384 315.733333l174.933333 174.933334z"
                      fill="#2c2c2c" p-id="2823"></path>
                </svg>
              </div>
            </div>
            <div class="item-list" @click="router.push('/SetPhone')">
              <span>手机号</span>
              <div class="right">
                <span>{{ userCookes.phone == null ? '未填写' : userCookes.phone }}</span>
                <svg t="1747566407830" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="2822" width="25" height="25">
                  <path
                      d="M558.933333 490.666667L384 665.6l59.733333 59.733333 234.666667-234.666666L443.733333 256 384 315.733333l174.933333 174.933334z"
                      fill="#2c2c2c" p-id="2823"></path>
                </svg>
              </div>
            </div>
            <div class="btn">
              <div class="out">
                注销账号
              </div>
              <div class="out" @click="logOut">
                退出登录
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </RoutingAnimation>
</template>
<script setup>
import RoutingAnimation from '@/components/PublicUi/RoutingAnimation/RoutingAnimation.vue'
import {useLogin} from '@/stores/useLogin'

const {userCookes} = useLogin()
import {SetUser} from '@/stores/setUser.js'

const {uploadPictures} = SetUser()
import {useRouter} from "vue-router";

const router = useRouter()
</script>
<style scoped lang="scss">
.paing {
  width: 100vw;
  height: 100%;
  padding: 16px;
  background: #fff;
}

.box {
  width: 100%;
  height: 100%;
  //background: #eee;
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

  .inp {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
}

.btn {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.out {
  width: 70%;
  height: 45px;
  background: #fff;
  border-radius: 8px;
  background: rgba(61, 199, 153, 0.32);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.out:nth-child(1) {
  margin-top: 50%;
}
</style>