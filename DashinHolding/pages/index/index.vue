<template>
  <view class="box">
    <!-- 自定义导航栏 -->
    <navbar>
      <view class="left-section" style="display: flex">
        <view>

        </view>
        <text>主页</text>
      </view>
    </navbar>
    <view class="content-box">
      <!-- 占位符号 -->
      <placeholder></placeholder>
      <view class="shows"></view>
      <view class="main-content">
        <!-- 轮播图 -->
        <swiper class="carousel" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="500"
                :circular="true" indicator-active-color="#ffffff" indicator-color="#6c6c6c">
          <swiper-item v-for="i in 5" :key="i">
            <navigator url="https://xiaoli.icu" open-type="redirect">
              <image src="http://localhost:3001/public/b1ac3ce23e712b34829793a21815ca1e.png"></image>
              <view class="text">
                该小程序由Marex星河赞助,点击可查看
              </view>
            </navigator>
          </swiper-item>
        </swiper>
        <!--    公告    -->
        <view class="announcement" style="display: flex;">
          <view class="swiper-text">
            公告：
          </view>
          <swiper class="swiper-announcement" :vertical="true" :circular="true" :indicator-dots="false"
                  :autoplay="true" :interval="2000" :duration="300">
            <swiper-item style="display: flex;">
              <view class="swiper-item">3223145234152451e74251542er1rfdwqtduf']\</view>
            </swiper-item>
            <swiper-item style="display: flex;">
              <view class="swiper-item">sdafsdhbfjks</view>
            </swiper-item>
          </swiper>
        </view>
        <!--    常用服务列表    -->
        <view v-if="cookesUser.user_role === 1" class="recommend">
          <text class="text" style="padding: 0 16px">
            服务列表
          </text>
          <view class="server" style="display:flex">
            <div class="server-card" @click="Repair_report_review_page">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  维修申报
                </text>
              </view>
            </div>
            <div class="server-card" @click="RepairInquiry">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  维修记录
                </text>
              </view>
            </div>
            <div class="server-card" @click="PersonnelInquiry">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  高手查询
                </text>
              </view>
            </div>
            <div class="server-card">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  维修建议
                </text>
              </view>
            </div>
          </view>
        </view>
        <!--    工作人员列表    -->
        <view v-if="cookesUser.user_role === 2" class="recommend">
          <text class="text" style="padding: 0 16px">
            工作人员列表
          </text>
          <view class="server" style="display:flex">
            <div class="server-card" @click="Repair_report_review_page">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  维修申报
                </text>
              </view>
            </div>
            <div class="server-card" @click="RepairInquiry">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  维修记录
                </text>
              </view>
            </div>
            <div class="server-card" @click="PersonnelInquiry">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  高手查询
                </text>
              </view>
            </div>
            <div class="server-card">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  维修建议
                </text>
              </view>
            </div>
          </view>
        </view>
        <!--    管理员列表    -->
        <view v-if="cookesUser.user_role === 3" class="recommend">
          <text class="text" style="padding: 0 16px">
            普通
          </text>
          <view class="server" style="display:flex">
            <div class="server-card" @click="Repair_report_review_page">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  维修申报
                </text>
              </view>
            </div>
            <div class="server-card" @click="RepairInquiry">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  维修记录
                </text>
              </view>
            </div>
            <div class="server-card" @click="PersonnelInquiry">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  高手查询
                </text>
              </view>
            </div>
            <div class="server-card">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  维修建议
                </text>
              </view>
            </div>
          </view>
        </view>
        <!--    超级管理列表    -->
        <view v-if="cookesUser.user_role === 4" class="recommend">
          <text class="text" style="padding: 0 16px">
            超级管理
          </text>
          <view class="server" style="display:flex">
            <div class="server-card" @click="Repair_report_review_page">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  维修申报
                </text>
              </view>
            </div>
            <div class="server-card" @click="RepairInquiry">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  维修记录
                </text>
              </view>
            </div>
            <div class="server-card" @click="PersonnelInquiry">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  高手查询
                </text>
              </view>
            </div>
            <div class="server-card">
              <view class="item-card" style="display: flex;">
                <view class="card-icon" style="display: flex">
                  <image src="" mode="scaleToFill"></image>
                </view>
                <text>
                  维修建议
                </text>
              </view>
            </div>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {onShow} from "@dcloudio/vue-cli-plugin-uni/packages/uni-app";
// 图片集中管理，需要用到的时候导入 
import {Photo} from "../../hooks/photo.js";

const {twoPng, searchPng, huibaoPng, cahxunPng, CobblerPng} = Photo()
import {useLogin} from "@/stores/useLogin";

const {cookesUser, getUserInfo} = useLogin();

// 点击进入报修上传页面
function Repair_report_review_page() {
  // 利用uniapp的api进行页面跳转
  uni.navigateTo({
    url: '/pages/UploadIssue/UploadIssue',
  });
}

// 点击进入查询历史维修记录页面
function RepairInquiry() {
  uni.navigateTo({
    url: '/pages/RepairInquiry/RepairInquiry',
  });
}

// 点击进入查询某个高手存在的页面
function PersonnelInquiry() {
  uni.navigateTo({
    url: '/pages/PersonnelInquiry/PersonnelInquiry',
  });
}

onShow(() => {
  getUserInfo()
})
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background: #eee;
}

/* 左侧内容样式 */
.left-section {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;

  .ICON {
    width: 40px;
    height: 40px;
    border: 1px solid;
    border-radius: 50%;
  }

  text {
    font-weight: bold;
  }
}

.title {
  font-size: 36rpx;
  font-weight: 600;
  color: #212121;
  line-height: 1.4;
}

.content-box {
  width: 100%;
  height: 100vh;
  // background: #eee;
  display: flex;
  flex-direction: column;

  .shows {
    width: 100%;
    height: 150px;
    background: rgba(61, 199, 153, 0.32);
  }

  .main-content {
    height: 100%;
    // background-color: #fff;
    padding: 20rpx;
    position: relative;
    padding-top: 110px;

    .carousel {
      width: 95%;
      height: 180px;
      // background: #fff;
      border-radius: 8px;
      overflow: hidden;
      position: absolute;
      top: -80px;
      left: 0px;
      right: 0px;
      margin: auto;

      .text {
        width: 100%;
        height: 50px;
        background: rgba(0, 0, 0, .5);
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        color: #fff;
        padding: 0 16px;
        z-index: 12757;
      }

      image {
        width: 100%;
      }

      .item-list {
        width: 100%;
        height: 100%;
      }
    }

    .announcement {
      width: 100%;
      height: 50px;
      background-color: #fff;
      border-radius: 4px;
      padding: 16;

      .swiper-text {
        width: 60px;
        height: 50px;
        line-height: 50px;
        padding-left: 16px;
      }

      .swiper-announcement {
        width: 100%;
        height: 100%;

        swiper-item {
          align-items: center;
        }
      }

    }

    .recommend {
      //padding: 16px;
      height: fit-content;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      margin-top: 10px;
      padding-bottom: 20px;
      padding-top: 16px;

      text {
        color: #212121;
      }

      .server {
        height: 100%;
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .server-card {
          height: 85px;
          border-radius: 4px;

          .item-card {
            width: 85px;
            height: 100%;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .card-icon {
              width: 60px;
              height: 55px;
              background: #eee;
              border-radius: 4px;
              justify-content: center;
              align-items: center;

              image {
                width: 30px;
                height: 30px;
              }
            }

            text {
              color: #212121;
            }
          }
        }
      }
    }

    .suggest {
      //padding: 16px;
      height: 100px;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      margin-top: 10px;
      padding-bottom: 30px;
      padding-top: 16px;
    }
  }
}
</style>