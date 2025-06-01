"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_photo = require("../../hooks/photo.js");
const stores_useLogin = require("../../stores/useLogin.js");
const stores_setUser = require("../../stores/setUser.js");
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
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "MyData",
  setup(__props) {
    const { cookesUser } = stores_useLogin.useLogin();
    const { fanhuiPng, xiangyouPng } = hooks_photo.Photo();
    const { chooseImages } = stores_setUser.SetUser();
    function off() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    function LeaveForNamePages() {
      common_vendor.index.navigateTo({
        url: "/pages/name/name"
      });
    }
    function sexPage() {
      common_vendor.index.navigateTo({
        url: "/pages/sexPage/sexPage"
      });
    }
    function EmailPage() {
      common_vendor.index.navigateTo({
        url: "/pages/setEmailPage/setEmailPage"
      });
    }
    function PhonePage() {
      common_vendor.index.navigateTo({
        url: "/pages/setPhonePage/setPhonePage"
      });
    }
    function TeacherPagePage() {
      common_vendor.index.navigateTo({
        url: "/pages/setTeacherPage/setTeacherPage"
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(fanhuiPng),
        b: common_vendor.o(off),
        c: common_vendor.unref(cookesUser).avatar,
        d: common_vendor.unref(xiangyouPng),
        e: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(chooseImages) && common_vendor.unref(chooseImages)(...args)
        ),
        f: common_vendor.t(common_vendor.unref(cookesUser).username),
        g: common_vendor.unref(xiangyouPng),
        h: common_vendor.o(LeaveForNamePages),
        i: common_vendor.t(common_vendor.unref(cookesUser).sex == null ? "未填写" : common_vendor.unref(cookesUser).sex),
        j: common_vendor.unref(xiangyouPng),
        k: common_vendor.o(sexPage),
        l: common_vendor.t(common_vendor.unref(cookesUser).email == null ? "未填写" : common_vendor.unref(cookesUser).email),
        m: common_vendor.unref(xiangyouPng),
        n: common_vendor.o(EmailPage),
        o: common_vendor.t(common_vendor.unref(cookesUser).phone == null ? "未填写" : common_vendor.unref(cookesUser).phone),
        p: common_vendor.unref(xiangyouPng),
        q: common_vendor.o(PhonePage),
        r: common_vendor.t(common_vendor.unref(cookesUser).teacher == null ? "未填写" : common_vendor.unref(cookesUser).teacher),
        s: common_vendor.unref(xiangyouPng),
        t: common_vendor.o(TeacherPagePage)
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5641dd24"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/MyData/MyData.js.map
