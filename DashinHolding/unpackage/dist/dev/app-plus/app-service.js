if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$b = {
    __name: "navbar",
    setup(__props, { expose: __expose }) {
      __expose();
      const navBarHeight = vue.ref(0);
      const statusBarHeight = vue.ref(0);
      const titleBarHeight = vue.ref(50);
      const menuButtonWidth = vue.ref(87);
      vue.onMounted(() => {
        const systemInfo = uni.getSystemInfoSync();
        const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
        statusBarHeight.value = systemInfo.statusBarHeight || (systemInfo.platform === "android" ? 52 : 20);
        if (menuButtonInfo.top) {
          titleBarHeight.value = (menuButtonInfo.top - statusBarHeight.value) * 2 + menuButtonInfo.height;
        }
        navBarHeight.value = statusBarHeight.value + titleBarHeight.value;
        menuButtonWidth.value = systemInfo.windowWidth - menuButtonInfo.right + 6;
      });
      const __returned__ = { navBarHeight, statusBarHeight, titleBarHeight, menuButtonWidth, ref: vue.ref, onMounted: vue.onMounted };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 自定义导航栏容器 "),
        vue.createElementVNode(
          "view",
          {
            class: "custom-navbar",
            style: vue.normalizeStyle({ height: `${$setup.navBarHeight}px` })
          },
          [
            vue.createCommentVNode(" 状态栏占位 "),
            vue.createElementVNode(
              "view",
              {
                class: "status-bar",
                style: vue.normalizeStyle({ height: `${$setup.statusBarHeight}px` })
              },
              null,
              4
              /* STYLE */
            ),
            vue.createCommentVNode(" 导航内容区域 "),
            vue.createElementVNode(
              "view",
              {
                class: "nav-content",
                style: vue.normalizeStyle({ height: `${$setup.titleBarHeight}px` })
              },
              [
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ],
              4
              /* STYLE */
            )
          ],
          4
          /* STYLE */
        )
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-eaf4c2e5"], ["__file", "C:/Users/marex/Documents/web/Marex-APP/DashinHolding/components/navbar/navbar.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const _sfc_main$a = {
    __name: "placeholder",
    setup(__props, { expose: __expose }) {
      __expose();
      const title = vue.ref("这个是主页面");
      const navBarHeight = vue.ref(0);
      const statusBarHeight = vue.ref(0);
      const titleBarHeight = vue.ref(50);
      const menuButtonWidth = vue.ref(87);
      vue.onMounted(() => {
        const systemInfo = uni.getSystemInfoSync();
        const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
        statusBarHeight.value = systemInfo.statusBarHeight || (systemInfo.platform === "android" ? 55 : 20);
        if (menuButtonInfo.top) {
          titleBarHeight.value = (menuButtonInfo.top - statusBarHeight.value) * 2 + menuButtonInfo.height;
        }
        navBarHeight.value = statusBarHeight.value + titleBarHeight.value;
        menuButtonWidth.value = systemInfo.windowWidth - menuButtonInfo.right + 6;
      });
      const __returned__ = { title, navBarHeight, statusBarHeight, titleBarHeight, menuButtonWidth, ref: vue.ref, onMounted: vue.onMounted };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "box-title",
        style: vue.normalizeStyle({ height: `${$setup.navBarHeight}px` })
      },
      null,
      4
      /* STYLE */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "C:/Users/marex/Documents/web/Marex-APP/DashinHolding/components/placeholder/placeholder.vue"]]);
  const ON_SHOW = "onShow";
  const ON_LAUNCH = "onLaunch";
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => (
    // post-create lifecycle registrations are noops during SSR
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target)
  );
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
  const ip = "http://192.168.112.158:3001";
  const twoPng = ip + "/public/two.png";
  const searchPng = ip + "/public/search.png";
  const huibaoPng = ip + "/public/huibao.png";
  const cahxunPng = ip + "/public/cahxun.png";
  const CobblerPng = ip + "/public/Cobbler.png";
  const kefuPnmg = ip + "/public/liaotian.png";
  const setPng = ip + "/public/set.png";
  const xiangyouPng = ip + "/public/xiangyou.png";
  const fanhuiPng = ip + "/public/fanhui.png";
  const wxxchatPng = ip + "/public/weix.png";
  const QQicuon = ip + "/public/qq.png";
  function Photo() {
    return {
      twoPng,
      searchPng,
      huibaoPng,
      cahxunPng,
      CobblerPng,
      kefuPnmg,
      setPng,
      xiangyouPng,
      fanhuiPng,
      wxxchatPng,
      QQicuon
    };
  }
  function useCountDown() {
    const countdown = vue.ref("获取验证码");
    const isCounting = vue.ref(false);
    let timer = null;
    const startCountdown = () => {
      return new Promise((resolve) => {
        isCounting.value = true;
        countdown.value = 60;
        timer = setInterval(() => {
          if (countdown.value > 0) {
            countdown.value--;
          } else {
            clearInterval(timer);
            countdown.value = "获取验证码";
            isCounting.value = false;
            resolve();
          }
        }, 1e3);
      });
    };
    const handleClick = async (callback) => {
      if (!isCounting.value) {
        await startCountdown();
        if (callback) {
          await callback();
        }
      }
    };
    const stop = () => {
      if (timer) {
        clearInterval(timer);
        isCounting.value = false;
        countdown.value = "获取验证码";
      }
    };
    return {
      countdown,
      handleClick,
      stop
    };
  }
  const { countdown: countdown1, handleClick: handleClick1 } = useCountDown();
  const mailbox = vue.ref("2844060059@qq.com");
  const isLoading = vue.ref(false);
  const user = vue.ref([]);
  const token = vue.ref();
  const isWxChart = vue.ref(false);
  const cookesUser = vue.ref();
  const code = vue.ref();
  const codeInput = vue.ref();
  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@(qq|163|126|yeah)\.(com|net)$/i;
    return regex.test(email);
  }
  function verificationMailbox() {
    if (!mailbox.value) {
      uni.showToast({
        title: "邮箱不能为空",
        // 提示内容
        icon: "none",
        // 图标类型（success/loading/none）
        duration: 2e3,
        // 显示时长（毫秒）
        mask: true
        // 是否显示透明蒙层
      });
      return false;
    } else if (!validateEmail(mailbox.value)) {
      uni.showToast({
        title: "请输入正确的邮箱格式",
        // 提示内容
        icon: "none",
        // 图标类型（success/loading/none）
        duration: 2e3,
        // 显示时长（毫秒）
        mask: true
        // 是否显示透明蒙层
      });
      return false;
    } else {
      return true;
    }
  }
  async function getRegisterCode(data) {
    return await uni.request({
      url: ip + "/app/getCode",
      method: "POST",
      data
    });
  }
  async function RegistrationVerificationCode() {
    try {
      let res = await getRegisterCode({
        mailbox: mailbox.value,
        content: `用于<a href="https://xiaoli.icu">报修云</a>平台的安全验证，5分钟内有效，若非本人操作请忽略此消息。`
      });
      if (res.data.code === 200) {
        code.value = res.data.data;
        formatAppLog("log", "at stores/useLogin.js:73", code.value);
      }
    } catch (error) {
      formatAppLog("error", "at stores/useLogin.js:76", error);
    }
  }
  function getLoginCode() {
    handleClick1();
    RegistrationVerificationCode();
    uni.showToast({
      title: "验证码发送成功",
      icon: "none"
    });
  }
  async function add(data) {
    return await uni.request({
      url: ip + "/app/addUser",
      method: "GET",
      data
    });
  }
  async function WriteToTheDatabase() {
    return await add({
      username: "59656",
      email: mailbox.value,
      phone: "19983757294",
      avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
      created_at: "2025-05-12",
      updated_at: "2025-05-12"
    });
  }
  async function verificationCode() {
    if (codeInput.value === code.value) {
      uni.showToast({
        title: "验证成功",
        icon: "none"
      });
      const res = await WriteToTheDatabase();
      formatAppLog("log", "at stores/useLogin.js:119", res.data.data[0]);
      uni.setStorageSync("user", res.data.data[0]);
      home();
    } else {
      uni.showToast({
        title: "验证失败",
        icon: "none"
      });
    }
  }
  function verification() {
    const mailboxTrue = verificationMailbox();
    if (mailboxTrue) {
      uni.navigateTo({
        url: "/pages/code/code"
      });
    }
  }
  function home() {
    uni.switchTab({
      url: "/pages/index/index"
    });
  }
  const wechatLogin = async () => {
    try {
      isLoading.value = true;
      const loginRes = await new Promise((resolve, reject) => {
        uni.login({
          provider: "weixin",
          success: resolve,
          fail: reject
        });
      });
      const userRes = await new Promise((resolve, reject) => {
        uni.getUserInfo({
          provider: "weixin",
          success: resolve,
          fail: reject
        });
      });
      const requestRes = await uni.request({
        url: ip + "/app/wechat-login",
        method: "POST",
        data: {
          code: loginRes.code,
          encryptedData: userRes.encryptedData,
          iv: userRes.iv
        }
      });
      if (requestRes.data.code === 200) {
        user.value = requestRes.data.user;
        formatAppLog("log", "at stores/useLogin.js:180", user.value);
        token.value = requestRes.data.token;
        uni.setStorageSync("user", user.value);
        home();
        uni.showToast({
          title: "登录成功",
          icon: "none"
        });
        isLoading.value = false;
      }
    } catch (error) {
      isLoading.value = false;
      formatAppLog("error", "at stores/useLogin.js:193", "登录流程异常:", error);
      uni.showToast({
        title: "登录失败,请检查网络",
        icon: "none"
      });
    }
  };
  function getUserInfo() {
    cookesUser.value = uni.getStorageSync("user");
    formatAppLog("log", "at stores/useLogin.js:204", cookesUser.value.username);
  }
  function onWxChartConfirmationBox() {
    isWxChart.value = true;
  }
  function offWxChartConfirmationBox() {
    isWxChart.value = false;
  }
  async function WxChatLogin() {
    await wechatLogin();
    isWxChart.value = false;
  }
  function outWxChatLogin() {
    uni.removeStorageSync("user");
    cookesUser.value = [];
    uni.redirectTo({
      url: "/pages/Login/Login"
    });
    uni.showToast({
      title: "登出成功",
      icon: "none"
    });
  }
  function useLogin() {
    getUserInfo();
    return {
      mailbox,
      isLoading,
      verification,
      wechatLogin,
      isWxChart,
      onWxChartConfirmationBox,
      offWxChartConfirmationBox,
      WxChatLogin,
      getUserInfo,
      cookesUser,
      home,
      outWxChatLogin,
      RegistrationVerificationCode,
      verificationCode,
      countdown1,
      getLoginCode,
      codeInput
    };
  }
  const _sfc_main$9 = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const { twoPng: twoPng2, searchPng: searchPng2, huibaoPng: huibaoPng2, cahxunPng: cahxunPng2, CobblerPng: CobblerPng2 } = Photo();
      const { cookesUser: cookesUser2, getUserInfo: getUserInfo2 } = useLogin();
      function Repair_report_review_page() {
        uni.navigateTo({
          url: "/pages/UploadIssue/UploadIssue"
        });
      }
      function RepairInquiry() {
        uni.navigateTo({
          url: "/pages/RepairInquiry/RepairInquiry"
        });
      }
      function PersonnelInquiry() {
        uni.navigateTo({
          url: "/pages/PersonnelInquiry/PersonnelInquiry"
        });
      }
      onShow(() => {
        getUserInfo2();
      });
      const __returned__ = { twoPng: twoPng2, searchPng: searchPng2, huibaoPng: huibaoPng2, cahxunPng: cahxunPng2, CobblerPng: CobblerPng2, cookesUser: cookesUser2, getUserInfo: getUserInfo2, Repair_report_review_page, RepairInquiry, PersonnelInquiry, get onShow() {
        return onShow;
      }, get Photo() {
        return Photo;
      }, get useLogin() {
        return useLogin;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = resolveEasycom(vue.resolveDynamicComponent("navbar"), __easycom_0$1);
    const _component_placeholder = resolveEasycom(vue.resolveDynamicComponent("placeholder"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "box" }, [
      vue.createCommentVNode(" 自定义导航栏 "),
      vue.createVNode(_component_navbar, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", {
            class: "left-section",
            style: { "display": "flex" }
          }, [
            vue.createElementVNode("view"),
            vue.createElementVNode("text", null, "主页")
          ])
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createElementVNode("view", { class: "content-box" }, [
        vue.createCommentVNode(" 占位符号 "),
        vue.createVNode(_component_placeholder),
        vue.createElementVNode("view", { class: "shows" }),
        vue.createElementVNode("view", { class: "main-content" }, [
          vue.createCommentVNode(" 轮播图 "),
          vue.createElementVNode("swiper", {
            class: "carousel",
            "indicator-dots": false,
            autoplay: true,
            interval: 3e3,
            duration: 500,
            circular: true,
            "indicator-active-color": "#ffffff",
            "indicator-color": "#6c6c6c"
          }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(5, (i) => {
                return vue.createElementVNode("swiper-item", { key: i }, [
                  vue.createElementVNode("navigator", {
                    url: "https://xiaoli.icu",
                    "open-type": "redirect"
                  }, [
                    vue.createElementVNode("image", { src: "http://localhost:3001/public/b1ac3ce23e712b34829793a21815ca1e.png" }),
                    vue.createElementVNode("view", { class: "text" }, " 该小程序由Marex星河赞助,点击可查看 ")
                  ])
                ]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createCommentVNode("    公告    "),
          vue.createElementVNode("view", {
            class: "announcement",
            style: { "display": "flex" }
          }, [
            vue.createElementVNode("view", { class: "swiper-text" }, " 公告： "),
            vue.createElementVNode("swiper", {
              class: "swiper-announcement",
              vertical: true,
              circular: true,
              "indicator-dots": false,
              autoplay: true,
              interval: 2e3,
              duration: 300
            }, [
              vue.createElementVNode("swiper-item", { style: { "display": "flex" } }, [
                vue.createElementVNode("view", { class: "swiper-item" }, "3223145234152451e74251542er1rfdwqtduf']\\")
              ]),
              vue.createElementVNode("swiper-item", { style: { "display": "flex" } }, [
                vue.createElementVNode("view", { class: "swiper-item" }, "sdafsdhbfjks")
              ])
            ])
          ]),
          vue.createCommentVNode("    常用服务列表    "),
          $setup.cookesUser.user_role === 1 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "recommend"
          }, [
            vue.createElementVNode("text", {
              class: "text",
              style: { "padding": "0 16px" }
            }, " 服务列表 "),
            vue.createElementVNode("view", {
              class: "server",
              style: { "display": "flex" }
            }, [
              vue.createElementVNode("div", {
                class: "server-card",
                onClick: $setup.Repair_report_review_page
              }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 维修申报 ")
                ])
              ]),
              vue.createElementVNode("div", {
                class: "server-card",
                onClick: $setup.RepairInquiry
              }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 维修记录 ")
                ])
              ]),
              vue.createElementVNode("div", {
                class: "server-card",
                onClick: $setup.PersonnelInquiry
              }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 高手查询 ")
                ])
              ]),
              vue.createElementVNode("div", { class: "server-card" }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 维修建议 ")
                ])
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode("    工作人员列表    "),
          $setup.cookesUser.user_role === 2 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "recommend"
          }, [
            vue.createElementVNode("text", {
              class: "text",
              style: { "padding": "0 16px" }
            }, " 工作人员列表 "),
            vue.createElementVNode("view", {
              class: "server",
              style: { "display": "flex" }
            }, [
              vue.createElementVNode("div", {
                class: "server-card",
                onClick: $setup.Repair_report_review_page
              }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 维修申报 ")
                ])
              ]),
              vue.createElementVNode("div", {
                class: "server-card",
                onClick: $setup.RepairInquiry
              }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 维修记录 ")
                ])
              ]),
              vue.createElementVNode("div", {
                class: "server-card",
                onClick: $setup.PersonnelInquiry
              }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 高手查询 ")
                ])
              ]),
              vue.createElementVNode("div", { class: "server-card" }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 维修建议 ")
                ])
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode("    管理员列表    "),
          $setup.cookesUser.user_role === 3 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "recommend"
          }, [
            vue.createElementVNode("text", {
              class: "text",
              style: { "padding": "0 16px" }
            }, " 普通 "),
            vue.createElementVNode("view", {
              class: "server",
              style: { "display": "flex" }
            }, [
              vue.createElementVNode("div", {
                class: "server-card",
                onClick: $setup.Repair_report_review_page
              }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 维修申报 ")
                ])
              ]),
              vue.createElementVNode("div", {
                class: "server-card",
                onClick: $setup.RepairInquiry
              }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 维修记录 ")
                ])
              ]),
              vue.createElementVNode("div", {
                class: "server-card",
                onClick: $setup.PersonnelInquiry
              }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 高手查询 ")
                ])
              ]),
              vue.createElementVNode("div", { class: "server-card" }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 维修建议 ")
                ])
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true),
          vue.createCommentVNode("    超级管理列表    "),
          $setup.cookesUser.user_role === 4 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 3,
            class: "recommend"
          }, [
            vue.createElementVNode("text", {
              class: "text",
              style: { "padding": "0 16px" }
            }, " 超级管理 "),
            vue.createElementVNode("view", {
              class: "server",
              style: { "display": "flex" }
            }, [
              vue.createElementVNode("div", {
                class: "server-card",
                onClick: $setup.Repair_report_review_page
              }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 维修申报 ")
                ])
              ]),
              vue.createElementVNode("div", {
                class: "server-card",
                onClick: $setup.RepairInquiry
              }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 维修记录 ")
                ])
              ]),
              vue.createElementVNode("div", {
                class: "server-card",
                onClick: $setup.PersonnelInquiry
              }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 高手查询 ")
                ])
              ]),
              vue.createElementVNode("div", { class: "server-card" }, [
                vue.createElementVNode("view", {
                  class: "item-card",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "card-icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: "",
                      mode: "scaleToFill"
                    })
                  ]),
                  vue.createElementVNode("text", null, " 维修建议 ")
                ])
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/Users/marex/Documents/web/Marex-APP/DashinHolding/pages/index/index.vue"]]);
  const _imports_0 = "/static/icon/my.png";
  const _sfc_main$8 = {
    __name: "mine",
    setup(__props, { expose: __expose }) {
      __expose();
      const { kefuPnmg: kefuPnmg2, setPng: setPng2, xiangyouPng: xiangyouPng2, fanhuiPng: fanhuiPng2 } = Photo();
      function off() {
        uni.navigateBack({
          delta: 2
        });
      }
      function Lonin() {
        uni.navigateTo({
          url: "/pages/Login/Login"
        });
      }
      const { cookesUser: cookesUser2, outWxChatLogin: outWxChatLogin2, getUserInfo: getUserInfo2 } = useLogin();
      onShow(() => {
        getUserInfo2();
      });
      const __returned__ = { kefuPnmg: kefuPnmg2, setPng: setPng2, xiangyouPng: xiangyouPng2, fanhuiPng: fanhuiPng2, off, Lonin, cookesUser: cookesUser2, outWxChatLogin: outWxChatLogin2, getUserInfo: getUserInfo2, get onShow() {
        return onShow;
      }, get Photo() {
        return Photo;
      }, get useLogin() {
        return useLogin;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = resolveEasycom(vue.resolveDynamicComponent("navbar"), __easycom_0$1);
    const _component_placeholder = resolveEasycom(vue.resolveDynamicComponent("placeholder"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "box" }, [
      vue.createCommentVNode(" 自定义导航栏 "),
      vue.createVNode(_component_navbar, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("div", { class: "left-section" }, [
            vue.createElementVNode("div", {
              class: "off",
              onClick: $setup.off
            }, [
              vue.createCommentVNode('          <image :src="fanhuiPng" mode="aspectFit"></image>')
            ]),
            vue.createTextVNode(" 个人中心 ")
          ])
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createElementVNode("view", { class: "content-box" }, [
        vue.createCommentVNode(" 占位符号 "),
        vue.createVNode(_component_placeholder),
        vue.createElementVNode("view", { class: "shows" }),
        vue.createElementVNode("view", { class: "main-content" }, [
          vue.createCommentVNode(" 登录框 "),
          vue.createElementVNode("view", {
            class: "carousel",
            onClick: $setup.Lonin
          }, [
            vue.createElementVNode("view", { class: "login" }, [
              vue.createElementVNode("view", {
                class: "top",
                style: { "display": "flex" }
              }, [
                vue.createElementVNode("view", {
                  class: "images",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("image", {
                    src: $setup.cookesUser.avatar
                  }, null, 8, ["src"])
                ]),
                vue.createElementVNode(
                  "view",
                  null,
                  vue.toDisplayString($setup.cookesUser.username),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "bottom" }, [
                vue.createElementVNode("view", {
                  class: "item",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "item-card",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("view", {
                      class: "card-icon",
                      style: { "display": "flex" }
                    }, [
                      vue.createElementVNode("image", {
                        src: _imports_0,
                        mode: "scaleToFill"
                      })
                    ]),
                    vue.createElementVNode("text", null, " 工作汇报 ")
                  ]),
                  vue.createElementVNode("view", {
                    class: "item-card",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("view", {
                      class: "card-icon",
                      style: { "display": "flex" }
                    }, [
                      vue.createElementVNode("image", {
                        src: _imports_0,
                        mode: "scaleToFill"
                      })
                    ]),
                    vue.createElementVNode("text", null, " 待审核 ")
                  ]),
                  vue.createElementVNode("view", {
                    class: "item-card",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("view", {
                      class: "card-icon",
                      style: { "display": "flex" }
                    }, [
                      vue.createElementVNode("image", {
                        src: _imports_0,
                        mode: "scaleToFill"
                      })
                    ]),
                    vue.createElementVNode("text", null, " 全部上传 ")
                  ]),
                  vue.createElementVNode("view", {
                    class: "item-card",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("view", {
                      class: "card-icon",
                      style: { "display": "flex" }
                    }, [
                      vue.createElementVNode("image", {
                        src: _imports_0,
                        mode: "scaleToFill"
                      })
                    ]),
                    vue.createElementVNode("text", null, " 全部上传 ")
                  ])
                ])
              ])
            ])
          ]),
          vue.createCommentVNode("设置加客服"),
          vue.createElementVNode("view", { class: "SetAndServices" }, [
            vue.createElementVNode("view", { class: "service" }, [
              vue.createElementVNode("view", {
                class: "padding",
                style: { "display": "flex" }
              }, [
                vue.createElementVNode("view", {
                  class: "alng",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("image", {
                    class: "images",
                    src: $setup.kefuPnmg,
                    mode: "aspectFit"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("text", null, "联系客服")
                ]),
                vue.createElementVNode("image", {
                  class: "xiangyou",
                  src: $setup.xiangyouPng,
                  mode: "aspectFit"
                }, null, 8, ["src"])
              ])
            ]),
            vue.createElementVNode("view", { class: "service" }, [
              vue.createElementVNode("view", {
                class: "padding",
                style: { "display": "flex" }
              }, [
                vue.createElementVNode("view", {
                  class: "alng",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("image", {
                    class: "images",
                    src: $setup.kefuPnmg,
                    mode: "aspectFit"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("text", null, "联系客服")
                ]),
                vue.createElementVNode("image", {
                  class: "xiangyou",
                  src: $setup.xiangyouPng,
                  mode: "aspectFit"
                }, null, 8, ["src"])
              ])
            ]),
            vue.createElementVNode("view", { class: "service" }, [
              vue.createElementVNode("view", {
                class: "padding",
                style: { "display": "flex" }
              }, [
                vue.createElementVNode("view", {
                  class: "alng",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("image", {
                    class: "images",
                    src: $setup.kefuPnmg,
                    mode: "aspectFit"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("text", null, "联系客服")
                ]),
                vue.createElementVNode("image", {
                  class: "xiangyou",
                  src: $setup.xiangyouPng,
                  mode: "aspectFit"
                }, null, 8, ["src"])
              ])
            ]),
            vue.createElementVNode("view", { class: "service" }, [
              vue.createElementVNode("view", {
                class: "padding",
                style: { "display": "flex" }
              }, [
                vue.createElementVNode("view", {
                  class: "alng",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("image", {
                    class: "images",
                    src: $setup.kefuPnmg,
                    mode: "aspectFit"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("text", null, "联系客服")
                ]),
                vue.createElementVNode("image", {
                  class: "xiangyou",
                  src: $setup.xiangyouPng,
                  mode: "aspectFit"
                }, null, 8, ["src"])
              ])
            ]),
            vue.createElementVNode("view", { class: "service" }, [
              vue.createElementVNode("view", {
                class: "padding",
                style: { "display": "flex" }
              }, [
                vue.createElementVNode("view", {
                  class: "alng",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("image", {
                    class: "images",
                    src: $setup.kefuPnmg,
                    mode: "aspectFit"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("text", null, "联系客服")
                ]),
                vue.createElementVNode("image", {
                  class: "xiangyou",
                  src: $setup.xiangyouPng,
                  mode: "aspectFit"
                }, null, 8, ["src"])
              ])
            ]),
            vue.createElementVNode("view", { class: "set" }, [
              vue.createElementVNode("view", {
                class: "padding",
                style: { "display": "flex" }
              }, [
                vue.createElementVNode("view", {
                  class: "alng",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("image", {
                    class: "images",
                    src: $setup.setPng,
                    mode: "aspectFit"
                  }, null, 8, ["src"]),
                  vue.createElementVNode("text", null, "系统设置")
                ]),
                vue.createElementVNode("image", {
                  class: "xiangyou",
                  src: $setup.xiangyouPng,
                  mode: "aspectFit"
                }, null, 8, ["src"])
              ])
            ])
          ]),
          vue.createCommentVNode("        退出登录"),
          vue.createElementVNode("view", {
            class: "outlin",
            style: { "display": "flex" },
            "hover-class": "#000",
            onClick: _cache[0] || (_cache[0] = (...args) => $setup.outWxChatLogin && $setup.outWxChatLogin(...args))
          }, " 退出登录 ")
        ])
      ])
    ]);
  }
  const PagesMineMine = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-7c2ebfa5"], ["__file", "C:/Users/marex/Documents/web/Marex-APP/DashinHolding/pages/mine/mine.vue"]]);
  const _sfc_main$7 = {
    props: {
      loading: Boolean
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.loading ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "loading-container"
    }, [
      vue.createElementVNode("view", { class: "loading-spinner" }),
      vue.createElementVNode("text", { class: "loading-text" }, "数据加载中...")
    ])) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-fbbdae64"], ["__file", "C:/Users/marex/Documents/web/Marex-APP/DashinHolding/components/loading-animation/loading-animation.vue"]]);
  const _sfc_main$6 = {
    __name: "search",
    setup(__props, { expose: __expose }) {
      __expose();
      const isLoading2 = vue.ref(false);
      const user2 = vue.ref([]);
      const wechatLogin2 = async () => {
        try {
          isLoading2.value = true;
          const loginRes = await new Promise((resolve, reject) => {
            uni.login({
              provider: "weixin",
              success: resolve,
              fail: reject
            });
          });
          const userRes = await new Promise((resolve, reject) => {
            uni.getUserInfo({
              provider: "weixin",
              success: resolve,
              fail: reject
            });
          });
          const requestRes = await uni.request({
            url: "http://localhost:3001/app/wechat-login",
            method: "POST",
            data: {
              code: loginRes.code,
              encryptedData: userRes.encryptedData,
              iv: userRes.iv
            }
          });
          if (requestRes.data.code === 200) {
            user2.value = requestRes.data.user;
            formatAppLog("log", "at pages/search/search.vue:46", user2.value);
            formatAppLog("log", "at pages/search/search.vue:47", requestRes.data.token);
            uni.showToast({
              title: "登录成功",
              icon: "none"
            });
            isLoading2.value = false;
          }
        } catch (error) {
          isLoading2.value = false;
          formatAppLog("error", "at pages/search/search.vue:57", "登录流程异常:", error);
          uni.showToast({
            title: "登录失败,请检查网络",
            icon: "none"
          });
        }
      };
      const __returned__ = { isLoading: isLoading2, user: user2, wechatLogin: wechatLogin2, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_loading_animation = resolveEasycom(vue.resolveDynamicComponent("loading-animation"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode(_component_loading_animation, { loading: $setup.isLoading }, null, 8, ["loading"]),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.user, (i) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: i.id
            }, [
              vue.createElementVNode("image", {
                style: { "width": "30px", "height": "30px" },
                src: i.avatar,
                mode: "aspectFill"
              }, null, 8, ["src"])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        )),
        vue.createElementVNode("button", { onClick: $setup.wechatLogin }, "微信登录")
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "C:/Users/marex/Documents/web/Marex-APP/DashinHolding/pages/search/search.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" });
  }
  const PagesUploadIssueUploadIssue = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__file", "C:/Users/marex/Documents/web/Marex-APP/DashinHolding/pages/UploadIssue/UploadIssue.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" });
  }
  const PagesRepairInquiryRepairInquiry = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "C:/Users/marex/Documents/web/Marex-APP/DashinHolding/pages/RepairInquiry/RepairInquiry.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "PersonnelInquiry" });
  }
  const PagesPersonnelInquiryPersonnelInquiry = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "C:/Users/marex/Documents/web/Marex-APP/DashinHolding/pages/PersonnelInquiry/PersonnelInquiry.vue"]]);
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "Login",
    setup(__props, { expose: __expose }) {
      __expose();
      const { fanhuiPng: fanhuiPng2, wxxchatPng: wxxchatPng2, QQicuon: QQicuon2 } = Photo();
      const {
        mailbox: mailbox2,
        verification: verification2,
        isLoading: isLoading2,
        isWxChart: isWxChart2,
        onWxChartConfirmationBox: onWxChartConfirmationBox2,
        offWxChartConfirmationBox: offWxChartConfirmationBox2,
        WxChatLogin: WxChatLogin2,
        cookesUser: cookesUser2,
        home: home2
      } = useLogin();
      function off() {
        uni.navigateBack({
          delta: 1
        });
      }
      const __returned__ = { fanhuiPng: fanhuiPng2, wxxchatPng: wxxchatPng2, QQicuon: QQicuon2, mailbox: mailbox2, verification: verification2, isLoading: isLoading2, isWxChart: isWxChart2, onWxChartConfirmationBox: onWxChartConfirmationBox2, offWxChartConfirmationBox: offWxChartConfirmationBox2, WxChatLogin: WxChatLogin2, cookesUser: cookesUser2, home: home2, off };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_loading_animation = resolveEasycom(vue.resolveDynamicComponent("loading-animation"), __easycom_0);
    const _component_navbar = resolveEasycom(vue.resolveDynamicComponent("navbar"), __easycom_0$1);
    const _component_placeholder = resolveEasycom(vue.resolveDynamicComponent("placeholder"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createVNode(_component_loading_animation, { loading: $setup.isLoading }, null, 8, ["loading"]),
        vue.createElementVNode("view", { class: "content" }, [
          vue.createVNode(_component_navbar, null, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", { class: "left-section" }, [
                vue.createElementVNode("div", {
                  class: "off",
                  onClick: $setup.off
                }, [
                  vue.createCommentVNode('          <image :src="fanhuiPng" mode="aspectFit"></image>')
                ]),
                vue.createTextVNode(" 登录和注册 ")
              ])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createElementVNode("view", { class: "content-box" }, [
            vue.createVNode(_component_placeholder),
            vue.createElementVNode("view", { class: "shows" }),
            vue.createElementVNode("view", { class: "login__title" }, " 欢迎登录报修云 "),
            vue.createElementVNode("view", { class: "login__content" }, [
              vue.createElementVNode("view", { class: "t-input" }, [
                vue.withDirectives(vue.createElementVNode(
                  "input",
                  {
                    type: "text",
                    placeholder: "请输入邮箱账号",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.mailbox = $event)
                  },
                  null,
                  512
                  /* NEED_PATCH */
                ), [
                  [vue.vModelText, $setup.mailbox]
                ])
              ]),
              vue.createElementVNode("view", { class: "title" }, " 未注册的邮箱账号验证通过后会自动注册 "),
              vue.createElementVNode("view", {
                class: "agreement",
                style: { "display": "flex" }
              }, [
                vue.createElementVNode("checkbox"),
                vue.createElementVNode("text", null, "同意协议条款")
              ]),
              vue.createElementVNode("button", {
                class: "btn",
                onClick: _cache[1] || (_cache[1] = (...args) => $setup.verification && $setup.verification(...args))
              }, "验证并且登录"),
              vue.createElementVNode("view", {
                class: "wx",
                style: { "display": "flex" }
              }, [
                vue.createElementVNode("view", null, "选择其它"),
                vue.createElementVNode("view", {
                  class: "login-method",
                  style: { "display": "flex" }
                }, [
                  vue.createElementVNode("view", {
                    class: "icon",
                    onClick: _cache[2] || (_cache[2] = (...args) => $setup.onWxChartConfirmationBox && $setup.onWxChartConfirmationBox(...args)),
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: $setup.wxxchatPng,
                      mode: "aspectFill"
                    }, null, 8, ["src"])
                  ]),
                  vue.createElementVNode("view", {
                    class: "icon",
                    style: { "display": "flex" }
                  }, [
                    vue.createElementVNode("image", {
                      src: $setup.QQicuon,
                      mode: "aspectFill"
                    }, null, 8, ["src"])
                  ]),
                  vue.createElementVNode("view", { class: "icon" })
                ])
              ])
            ])
          ]),
          vue.createCommentVNode("  微信登录确认框  "),
          $setup.isWxChart ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "wxChart"
          }, [
            vue.createElementVNode("view", {
              class: "box",
              style: { "display": "flex" }
            }, [
              vue.createElementVNode("view", {
                class: "text-box",
                "scroll-y": "true"
              }, [
                vue.createElementVNode("text", null, "确认登录")
              ]),
              vue.createElementVNode("view", { style: { "padding": "16px" } }, [
                vue.createElementVNode("text", null, "确定使用当前登录的微信账号进行该平台的登录和注册吗？")
              ]),
              vue.createElementVNode("view", {
                class: "agreement",
                style: { "display": "flex" }
              }, [
                vue.createElementVNode("button", {
                  onClick: _cache[3] || (_cache[3] = (...args) => $setup.offWxChartConfirmationBox && $setup.offWxChartConfirmationBox(...args))
                }, "取消"),
                vue.createElementVNode("button", {
                  onClick: _cache[4] || (_cache[4] = (...args) => $setup.WxChatLogin && $setup.WxChatLogin(...args))
                }, "确定")
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ],
      64
      /* STABLE_FRAGMENT */
    );
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-461d1d79"], ["__file", "C:/Users/marex/Documents/web/Marex-APP/DashinHolding/pages/Login/Login.vue"]]);
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "code",
    setup(__props, { expose: __expose }) {
      __expose();
      const { fanhuiPng: fanhuiPng2 } = Photo();
      const { mailbox: mailbox2, codeInput: codeInput2, countdown1: countdown12, getLoginCode: getLoginCode2, verificationCode: verificationCode2 } = useLogin();
      function off() {
        uni.navigateBack({
          delta: 1
        });
      }
      onShow(() => {
        getLoginCode2();
      });
      const __returned__ = { fanhuiPng: fanhuiPng2, mailbox: mailbox2, codeInput: codeInput2, countdown1: countdown12, getLoginCode: getLoginCode2, verificationCode: verificationCode2, off };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  });
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_navbar = resolveEasycom(vue.resolveDynamicComponent("navbar"), __easycom_0$1);
    const _component_placeholder = resolveEasycom(vue.resolveDynamicComponent("placeholder"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createVNode(_component_navbar, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("div", { class: "left-section" }, [
            vue.createElementVNode("div", {
              class: "off",
              onClick: $setup.off
            }, [
              vue.createElementVNode("image", {
                src: $setup.fanhuiPng,
                mode: "aspectFit"
              }, null, 8, ["src"])
            ])
          ])
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createElementVNode("view", { class: "content-box" }, [
        vue.createVNode(_component_placeholder),
        vue.createElementVNode("view", { class: "shows" }),
        vue.createElementVNode("view", { class: "login__title" }, " 请输入验证码 "),
        vue.createElementVNode("view", { class: "login__content" }, [
          vue.createElementVNode(
            "view",
            { class: "login-code__tips" },
            " 验证码已通过邮件发送至 " + vue.toDisplayString($setup.mailbox),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "t-input" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                type: "text",
                placeholder: "请输入",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.codeInput = $event)
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $setup.codeInput]
            ]),
            vue.createElementVNode(
              "view",
              {
                class: "code",
                onClick: _cache[1] || (_cache[1] = (...args) => $setup.getLoginCode && $setup.getLoginCode(...args))
              },
              vue.toDisplayString($setup.countdown1),
              1
              /* TEXT */
            )
          ]),
          vue.createElementVNode("button", {
            class: "btn",
            onClick: _cache[2] || (_cache[2] = (...args) => $setup.verificationCode && $setup.verificationCode(...args))
          }, "登录")
        ])
      ])
    ]);
  }
  const PagesCodeCode = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__scopeId", "data-v-3e257929"], ["__file", "C:/Users/marex/Documents/web/Marex-APP/DashinHolding/pages/code/code.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/mine/mine", PagesMineMine);
  __definePage("pages/search/search", PagesSearchSearch);
  __definePage("pages/UploadIssue/UploadIssue", PagesUploadIssueUploadIssue);
  __definePage("pages/RepairInquiry/RepairInquiry", PagesRepairInquiryRepairInquiry);
  __definePage("pages/PersonnelInquiry/PersonnelInquiry", PagesPersonnelInquiryPersonnelInquiry);
  __definePage("pages/Login/Login", PagesLoginLogin);
  __definePage("pages/code/code", PagesCodeCode);
  const _sfc_main = {
    __name: "App",
    setup(__props, { expose: __expose }) {
      __expose();
      const { cookesUser: cookesUser2, home: home2 } = useLogin();
      onLaunch(() => {
        try {
          if (cookesUser2.value) {
            uni.switchTab({
              url: "/pages/index/index"
              // 假设首页是 tabbar 页面
            });
          } else {
            uni.redirectTo({
              url: "/pages/Login/Login"
            });
          }
        } catch (error) {
          formatAppLog("error", "at App.vue:22", "存储读取失败:", error);
          uni.redirectTo({
            url: "/pages/Login/Login"
          });
        }
      });
      const __returned__ = { cookesUser: cookesUser2, home: home2, get onLaunch() {
        return onLaunch;
      }, get useLogin() {
        return useLogin;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/marex/Documents/web/Marex-APP/DashinHolding/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
