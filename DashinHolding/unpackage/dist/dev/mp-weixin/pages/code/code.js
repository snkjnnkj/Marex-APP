"use strict";
const common_vendor = require("../../common/vendor.js");
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
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "code",
  setup(__props) {
    const { fanhuiPng } = hooks_photo.Photo();
    const { mailbox, codeInput, countdown1, getLoginCode, verificationCode } = stores_useLogin.useLogin();
    function off() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(fanhuiPng),
        b: common_vendor.o(off),
        c: common_vendor.t(common_vendor.unref(mailbox)),
        d: common_vendor.unref(codeInput),
        e: common_vendor.o(($event) => common_vendor.isRef(codeInput) ? codeInput.value = $event.detail.value : null),
        f: common_vendor.t(common_vendor.unref(countdown1)),
        g: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(getLoginCode) && common_vendor.unref(getLoginCode)(...args)
        ),
        h: common_vendor.o(
          //@ts-ignore
          (...args) => common_vendor.unref(verificationCode) && common_vendor.unref(verificationCode)(...args)
        )
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3e257929"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/code/code.js.map
