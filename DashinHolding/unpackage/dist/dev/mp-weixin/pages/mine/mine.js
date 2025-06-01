"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const hooks_photo = require("../../hooks/photo.js");
const stores_useLogin = require("../../stores/useLogin.js");
if (!Array) {
  const _easycom_navbar2 = common_vendor.resolveComponent("navbar");
  const _easycom_placeholder2 = common_vendor.resolveComponent("placeholder");
  (_easycom_navbar2 + _easycom_placeholder2)();
}
const _easycom_navbar = () => "../../components/navbar/navbar.js";
const _easycom_placeholder = () => "../../components/placeholder/placeholder.js";
if (!Math) {
  (_easycom_navbar + _easycom_placeholder)();
}
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const { kefuPnmg, setPng, xiangyouPng, fanhuiPng } = hooks_photo.Photo();
    function off() {
      common_vendor.index.navigateBack({
        delta: 2
      });
    }
    function myData() {
      common_vendor.index.navigateTo({
        url: "/pages/MyData/MyData"
      });
    }
    const { cookesUser, outWxChatLogin, getUserInfo } = stores_useLogin.useLogin();
    common_vendor.onShow(() => {
      getUserInfo();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(off),
        b: common_vendor.unref(cookesUser).avatar,
        c: common_vendor.t(common_vendor.unref(cookesUser).username),
        d: common_assets._imports_0,
        e: common_assets._imports_0,
        f: common_assets._imports_0,
        g: common_assets._imports_0,
        h: common_vendor.o(myData),
        i: common_vendor.unref(kefuPnmg),
        j: common_vendor.unref(xiangyouPng),
        k: common_vendor.unref(kefuPnmg),
        l: common_vendor.unref(xiangyouPng),
        m: common_vendor.unref(kefuPnmg),
        n: common_vendor.unref(xiangyouPng),
        o: common_vendor.unref(kefuPnmg),
        p: common_vendor.unref(xiangyouPng),
        q: common_vendor.unref(kefuPnmg),
        r: common_vendor.unref(xiangyouPng),
        s: common_vendor.unref(setPng),
        t: common_vendor.unref(xiangyouPng),
        v: common_vendor.o((...args) => common_vendor.unref(outWxChatLogin) && common_vendor.unref(outWxChatLogin)(...args))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
