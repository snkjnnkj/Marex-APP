<template>
  <view class="content">
    <navbar>
      <div class="left-section">
        <div class="off" @click="off">
          <image :src="fanhuiPng" mode="aspectFit"></image>
        </div>
        修改性别
      </div>
    </navbar>
    <view class="content-box">
      <!-- 占位符号 -->
      <placeholder></placeholder>
      <view class="shows"></view>
      <view class="main-content">
        <view class="select" v-for="(i,index) in selectSex" :key="i.id" @click="select(i.text,index)">
          <text>{{ i.text }}</text>
          <image class="image" :class="{show: isShow === index}" :src="binggoPng" mode="widthFix"></image>
        </view>
        <button @click="setSex(title)">保存</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import {Photo} from '../../hooks/photo';
import {SetUser} from "@/stores/setUser";
import {ref} from 'vue'

const {fanhuiPng, offPng, binggoPng} = Photo()
const {setSex} = SetUser()

function off() {
  uni.navigateBack({
    delta: 1
  })
}

const selectSex = ref([
  {
    id: '001',
    text: '男',
  },
  {
    id: '001',
    text: '女',
  },
  {
    id: '001',
    text: '？？？',
  },
])
const isShow = ref(0)
const title = ref('')

function select(i, index) {
  title.value = i
  isShow.value = index
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

  .select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    background: #fff;
    border-bottom: 1px solid #f5f5f5;

    .image {
      width: 20px;
      opacity: 0;
    }

    .show {
      opacity: 1;
    }
  }

  .hover {
    background: rgba(61, 199, 153, 0.32);
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
