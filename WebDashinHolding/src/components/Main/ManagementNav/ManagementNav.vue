<script setup lang="ts">
import {useRouter} from "vue-router";
import {reactive} from "vue";
import {useLogin} from '@/stores/useLogin'

const {userCookes} = useLogin();
const router = useRouter();
//导航栏列表渲染素组对象
const obj = reactive([
  {
    id: 1,
    title: "主页",
    icon: 'home', //模拟后端传入的图片路径
    two: [
      {
        id: 1,
        tltle: '总览',
        router: '/jurisdiction/home',
        status: 1,
      },
      {
        id: 2,
        tltle: '首页',
        router: '',
        status: 1,
      },
      {
        id: 3,
        tltle: '文章',
        router: '',
        status: 1,
      },
      {
        id: 4,
        tltle: '图库',
        router: '',
        status: 1,
      },
      {
        id: 5,
        tltle: '资源分享',
        router: '',
        status: 1,
      }
    ]
  },
  {
    id: 2,
    title: "管理员",
    icon: 'home', //模拟后端传入的图片路径
    two: [
      {
        id: 1,
        tltle: '用户管理',
        router: '/',
        status: 3,
      },
      {
        id: 2,
        tltle: '维修人员派遣',
        router: '/jurisdiction/Examine',
        status: 3,
      },
    ]
  },
  {
    id: 3,
    title: "维修申报",
    icon: 'home', //模拟后端传入的图片路径
    two: [
      {
        id: 1,
        tltle: '维修申报',
        router: '/jurisdiction/MaintainPage',
        status: 1,
      },
    ]
  },
  {
    id: 5,
    title: "工作人员",
    icon: 'home',
    two: [
      {
        id: 1,
        tltle: '任务处理',
        router: '/jurisdiction/TaskProcessing',
        status: 2,
      },
      {
        id: 2,
        tltle: '工作汇报',
        router: '>>',
        status: 2,
      },
      {
        id: 3,
        tltle: '资源查询',
        router: '>>',
        status: 2,
      }
    ]
  },
  {
    id: 4,
    title: "广告投放",
    icon: 'home',
    two: [
      {
        id: 1,
        tltle: '',
        router: '',
        status: 4,
      }
    ]
  },
])
</script>

<template>
  <div class="sidebar-container">
    <div class="menubar">
      <div v-for="(i,index) in obj" :key="i.id" class="demo-collapse">
        <el-collapse accordion>
          <el-collapse-item :name="index">
            <template #title="{ isActive }">
              <div :class="['title-wrapper', { 'is-active': isActive }]">
                <div class="home-icon">
                  <svg data-v-bf428d4a="" t="1748073092433" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="2881" width="20" height="20">
                    <path data-v-bf428d4a=""
                          d="M795.648 923.648H228.352c-58.368 0-105.472-47.104-107.52-104.448L81.92 360.448c0-38.912 21.504-74.752 55.296-93.184L450.56 93.184c38.912-21.504 84.992-21.504 123.904 0L887.808 266.24c33.792 18.432 55.296 54.272 55.296 93.184v3.072l-39.936 454.656c-2.048 59.392-49.152 106.496-107.52 106.496zM163.84 359.424l39.936 457.728c0 13.312 11.264 24.576 25.6 24.576h567.296c14.336 0 25.6-11.264 25.6-24.576v-3.072L860.16 359.424c0-8.192-5.12-16.384-13.312-20.48l-312.32-174.08c-14.336-8.192-30.72-8.192-44.032 0l-313.344 174.08c-8.192 4.096-13.312 11.264-13.312 20.48z"
                          fill="#333C4F" p-id="2882"></path>
                    <path data-v-bf428d4a=""
                          d="M699.392 905.216h-81.92V611.328c0-11.264-6.144-17.408-8.192-17.408H413.696c-2.048 0-8.192 6.144-8.192 17.408v293.888h-81.92V611.328c0-55.296 39.936-99.328 90.112-99.328h195.584c49.152 0 90.112 45.056 90.112 99.328v293.888z"
                          fill="#333C4F" p-id="2883"></path>
                  </svg>
                  <span>{{ i.title }}</span>
                </div>
              </div>
            </template>
            <div class="item-card">
              <router-link v-show="t.status === userCookes.user_role || t.status === 1" v-for="(t,index) in i.two" :to="t.router"
                           :key="t.id"
                           active-class="demoCollapseActive"
                           style="margin-top: 5px;">
                <div class="crad">
                  <div class="icon">
                    <svg t="1748242853241" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="3246" width="20" height="20">
                      <path
                          d="M599.061868 216.612433 936.943248 216.612433c11.447726 0 20.729114-9.281387 20.729114-20.729114 0-11.447726-9.281387-20.729114-20.729114-20.729114L599.061868 175.154205c-11.447726 0-20.729114 9.281387-20.729114 20.729114C578.332754 207.330022 587.614142 216.612433 599.061868 216.612433z"
                          fill="#272636" p-id="3247"></path>
                      <path
                          d="M936.943248 332.694241 599.061868 332.694241c-11.447726 0-20.729114 9.281387-20.729114 20.729114 0 11.447726 9.281387 20.729114 20.729114 20.729114L936.943248 374.152469c11.447726 0 20.729114-9.281387 20.729114-20.729114C957.672362 341.975629 948.390975 332.694241 936.943248 332.694241z"
                          fill="#272636" p-id="3248"></path>
                      <path
                          d="M366.897228 65.290005 180.336228 65.290005c-62.966077 0-114.009613 51.043536-114.009613 114.009613l0 186.561c0 62.966077 51.043536 114.009613 114.009613 114.009613l186.561 0c62.966077 0 114.009613-51.043536 114.009613-114.009613L480.906841 179.299619C480.906841 116.334565 429.862281 65.290005 366.897228 65.290005zM439.448614 365.860619c0 40.068578-32.482809 72.551386-72.551386 72.551386L180.336228 438.412005c-40.068578 0-72.551386-32.482809-72.551386-72.551386L107.784842 179.299619c0-40.068578 32.482809-72.551386 72.551386-72.551386l186.561 0c40.068578 0 72.551386 32.482809 72.551386 72.551386L439.448614 365.860619z"
                          fill="#272636" p-id="3249"></path>
                      <path
                          d="M936.943248 653.992945 599.061868 653.992945c-11.447726 0-20.729114 9.281387-20.729114 20.729114s9.281387 20.729114 20.729114 20.729114L936.943248 695.451172c11.447726 0 20.729114-9.281387 20.729114-20.729114S948.390975 653.992945 936.943248 653.992945z"
                          fill="#272636" p-id="3250"></path>
                      <path
                          d="M936.943248 811.534004 599.061868 811.534004c-11.447726 0-20.729114 9.281387-20.729114 20.729114s9.281387 20.729114 20.729114 20.729114L936.943248 852.992231c11.447726 0 20.729114-9.281387 20.729114-20.729114S948.390975 811.534004 936.943248 811.534004z"
                          fill="#272636" p-id="3251"></path>
                      <path
                          d="M366.897228 544.129768 180.336228 544.129768c-62.966077 0-114.009613 51.043536-114.009613 114.009613l0 186.561c0 62.966077 51.043536 114.009613 114.009613 114.009613l186.561 0c62.966077 0 114.009613-51.043536 114.009613-114.009613L480.906841 658.139381C480.906841 595.173304 429.862281 544.129768 366.897228 544.129768zM439.448614 844.699358c0 40.068578-32.482809 72.551386-72.551386 72.551386L180.336228 917.250744c-40.068578 0-72.551386-32.482809-72.551386-72.551386L107.784842 658.139381c0-40.068578 32.482809-72.551386 72.551386-72.551386l186.561 0c40.068578 0 72.551386 32.482809 72.551386 72.551386L439.448614 844.699358z"
                          fill="#272636" p-id="3252"></path>
                    </svg>
                    <p>{{ t.tltle }}</p>
                  </div>
                  <span>
                    <i class="el-icon el-collapse-item__arrow">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                        <path fill="currentColor"
                              d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"></path>
                      </svg>
                    </i>
                  </span>
                </div>
              </router-link>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sidebar-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 215px;
  height: 100vh;
  background: rgba(0, 94, 235, .1);
  overflow: auto;
  padding-bottom: 100px;

  .menubar {
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    background: none;
    width: 100%;
    padding: 0 7px;

    .demo-collapse {
      margin-top: 8px;
      border-radius: 4px;
      overflow: hidden;

      .home-icon {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      span {
        margin: 0;
      }
    }

    .title-wrapper {
      padding-left: 7px;
    }

    .el-collapse-item__content {
      padding-bottom: 0;
    }

    #el-collapse-content-4 {
      background: transparent !important;
      padding: 0;
      background: transparent;
    }

    .el-collapse-item__content {
      background: transparent !important;
    }

    .el-collapse-item__wrap {
      background: transparent !important;
    }
  }
}


.item-card {
  width: 100%;
  height: fit-content;
  color: #ffffff;
  margin-top: 5px;
  transition: all .2s ease;
  display: flex;
  flex-direction: column;
  gap: 15px;

  a {
    color: currentColor;
  }

  .crad {
    width: 100%;
    height: 48px;
    background: rgba(255, 255, 255, .3);
    padding: 0 7px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #212121;
    transition: 0.2s ease;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }
  }

  .crad:hover {
    background: #212121;
    background: var(--bgColor3);
  }

  .demoCollapseActive {
    .crad {
      background: linear-gradient(180deg, var(--pcolor6) 0%, var(--pcolor8) 100%) !important;
      color: #fff;

      svg {
        path {
          fill: #fff;
        }
      }
    }
  }
}
</style>
