<template>
  <view class="box">
    <!-- 自定义导航栏 -->
    <navbar>
      <div class="left-section">
        <div class="off" @click="off">
          <!--          <image :src="fanhuiPng" mode="aspectFit"></image>-->
        </div>
        个人中心
      </div>
    </navbar>
    <view class="content-box">
      <!-- 占位符号 -->
      <placeholder></placeholder>
      <view class="shows"></view>
      <view class="main-content">
        <!-- 登录框 -->
        <view class="carousel" @click="myData">
          <view class="login">
            <view class="top" style="display: flex;">
              <view class="images" style="display: flex;">
                <image :src="cookesUser.avatar" mode="widthFix"></image>
              </view>
              <view>
                {{ cookesUser.username }}
              </view>
            </view>
            <view class="bottom">
              <view class="item" style="display: flex;">
                <view class="item-card" style="display: flex;">
                  <view class="card-icon" style="display: flex">
                    <image src="/static/icon/my.png" mode="scaleToFill"></image>
                  </view>
                  <text>
                    工作汇报
                  </text>
                </view>
                <view class="item-card" style="display: flex;">
                  <view class="card-icon" style="display: flex">
                    <image src="/static/icon/my.png" mode="scaleToFill"></image>
                  </view>
                  <text>
                    待审核
                  </text>
                </view>
                <view class="item-card" style="display: flex;">
                  <view class="card-icon" style="display: flex">
                    <image src="/static/icon/my.png" mode="scaleToFill"></image>
                  </view>
                  <text>
                    全部上传
                  </text>
                </view>
                <view class="item-card" style="display: flex;">
                  <view class="card-icon" style="display: flex">
                    <image src="/static/icon/my.png" mode="scaleToFill"></image>
                  </view>
                  <text>
                    全部上传
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <!--设置加客服-->
        <view class="SetAndServices">
          <view class="service">
            <view class="padding" style="display: flex">
              <view class="alng" style="display: flex">
                <image class="images" :src="kefuPnmg" mode="aspectFit"></image>
                <text>功能正在开发</text>
              </view>
              <image class="xiangyou" :src="xiangyouPng" mode="aspectFit"></image>
            </view>
          </view>
          <view class="service">
            <view class="padding" style="display: flex">
              <view class="alng" style="display: flex">
                <image class="images" :src="kefuPnmg" mode="aspectFit"></image>
                <text>功能正在开发</text>
              </view>
              <image class="xiangyou" :src="xiangyouPng" mode="aspectFit"></image>
            </view>
          </view>
          <view class="service">
            <view class="padding" style="display: flex">
              <view class="alng" style="display: flex">
                <image class="images" :src="kefuPnmg" mode="aspectFit"></image>
                <text>功能正在开发</text>
              </view>
              <image class="xiangyou" :src="xiangyouPng" mode="aspectFit"></image>
            </view>
          </view>
          <view class="service">
            <view class="padding" style="display: flex">
              <view class="alng" style="display: flex">
                <image class="images" :src="kefuPnmg" mode="aspectFit"></image>
                <text>功能正在开发</text>
              </view>
              <image class="xiangyou" :src="xiangyouPng" mode="aspectFit"></image>
            </view>
          </view>
          <view class="service">
            <view class="padding" style="display: flex">
              <view class="alng" style="display: flex">
                <image class="images" :src="kefuPnmg" mode="aspectFit"></image>
                <text>功能正在开发</text>
              </view>
              <image class="xiangyou" :src="xiangyouPng" mode="aspectFit"></image>
            </view>
          </view>
          <view class="set">
            <view class="padding" style="display: flex">
              <view class="alng" style="display: flex">
                <image class="images" :src="setPng" mode="aspectFit"></image>
                <text>系统设置</text>
              </view>
              <image class="xiangyou" :src="xiangyouPng" mode="aspectFit"></image>
            </view>
          </view>
        </view>
        <!--退出登录-->
        <view class="outlin" style="display: flex" hover-class="#000" @click="outWxChatLogin">
          退出登录
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {onShow} from "@dcloudio/vue-cli-plugin-uni/packages/uni-app";
import {Photo} from "@/hooks/photo";

const {kefuPnmg, setPng, xiangyouPng, fanhuiPng} = Photo()

// 返回
function off() {
  uni.navigateBack({
    delta: 2
  })
}

function myData() {
  uni.navigateTo({
    url: '/pages/MyData/MyData'
  });
}

//获取本地的登录信息
import {useLogin} from '../../stores/useLogin'

const {cookesUser, outWxChatLogin, getUserInfo} = useLogin()
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
				height: 200px;
				background: #fff;
				border-radius: 8px;
				overflow: hidden;
				position: absolute;
				top: -80px;
				left: 0px;
				right: 0px;
				margin: auto;

				.login {
					width: 100%;
					height: 100%;
					// padding: 16px;

					.top {
						width: 100%;
						height: 50%;
						border-bottom: 1px solid #f8f8f8;
						align-items: center;
						padding-left: 16px;
						gap: 15px;

						.images {
							width: 60px;
							height: 60px;
							// border: 1px solid #000;
							border-radius: 50%;
							justify-content: center;
							align-items: center;
							overflow: hidden;
							background: rgba(61, 199, 153, 0.32);
								
							image {
								width: 60px;
								height: 60px;
							}
						}
					}

					.bottom {
						width: 100%;
						height: 50%;
						overflow: hidden;

						.item {
							//padding: 0 16px;
							padding-top: 6px;
							height: 100%;
							justify-content: space-between;
							//background: red;
							.item-card {
								width: 85px;
								height: 85%;
								flex-direction: column;
								justify-content: space-between;
								align-items: center;

								.card-icon {
									width: 55px;
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

			}

			.recommend {
				padding: 16px;
				height: 194px;
				background: #fff;
				border-radius: 8px;
				overflow: hidden;
				margin-top: 20px;
				padding-bottom: 30px;

				text {
					color: #212121;
				}
			}

			.SetAndServices {
				margin-top: 20px;
				height: fit-content;
				background: #fff;
				border-radius: 8px;
				overflow: hidden;

				.set,
				.service {
					width: 100%;
					height: 65px;
					border-bottom: 1px solid #f8f8f8;

					.padding {
						width: 100%;
						height: 100%;
						padding: 0 16px;
						align-items: center;
						justify-content: flex-start;
						position: relative;

						.alng {
							height: 100%;
							align-items: center;
							gap: 15px;
						}

						.images {
							width: 30px;
							height: 30px;
							//height: 100%;
						}

						.xiangyou {
							width: 22px;
							height: 22px;
							position: absolute;
							right: 45px;
							top: 22px;
						}
					}
				}

			}

			.outlin {
				margin-top: 30px;
				height: 52px;
				background: #fff;
				border-radius: 8px;
				overflow: hidden;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>