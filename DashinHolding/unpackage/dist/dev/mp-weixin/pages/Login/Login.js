"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_photo = require("../../hooks/photo.js");
const stores_useLogin = require("../../stores/useLogin.js");
if (!Array) {
  const _easycom_loading_animation2 = common_vendor.resolveComponent("loading-animation");
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_placeholder2 = common_vendor.resolveComponent("placeholder");
  (_easycom_loading_animation2 + _easycom_navbar2 + _easycom_placeholder2)();
}
const _easycom_loading_animation = () => "../../components/loading-animation/loading-animation.js";
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_placeholder = () => "../../components/placeholder/placeholder.js";
if (!Math) {
  (_easycom_loading_animation + _easycom_navbar + _easycom_placeholder)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "Login",
  setup(__props) {
    const { wxxchatPng, QQicuon } = hooks_photo.Photo();
    const {
      mailbox,
      verification,
      isLoading,
      WxChatLogin
    } = stores_useLogin.useLogin();
    function off() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          loading: common_vendor.unref(isLoading)
        }),
        b: common_vendor.o(off),
        c: common_vendor.unref(mailbox),
        d: common_vendor.o(($event) => common_vendor.isRef(mailbox) ? mailbox.value = $event.detail.value : null),
        e: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(verification) && common_vendor.unref(verification)(...args)
        ),
        f: common_vendor.unref(wxxchatPng),
        g: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(WxChatLogin) && common_vendor.unref(WxChatLogin)(...args)
        ),
        h: common_vendor.unref(QQicuon)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-461d1d79"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/Login/Login.js.map
