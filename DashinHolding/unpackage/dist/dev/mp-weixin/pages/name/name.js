"use strict";
const common_vendor = require("../../common/vendor.js");
const hooks_photo = require("../../hooks/photo.js");
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
const _sfc_main = {
  __name: "name",
  setup(__props) {
    const { fanhuiPng, offPng } = hooks_photo.Photo();
    const { inpName, setName } = stores_setUser.SetUser();
    function off() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    const isDipsplay = common_vendor.ref(false);
    function fous() {
      isDipsplay.value = true;
    }
    function odd() {
      isDipsplay.value = false;
    }
    function confirm() {
      if (inpName.value == "") {
        common_vendor.index.showToast({
          title: "姓名不能为空",
          icon: "none"
        });
        return;
      }
      off();
      setName();
    }
    function empty() {
      inpName.value = "";
      common_vendor.index.__f__("log", "at pages/name/name.vue:64", "@");
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(fanhuiPng),
        b: common_vendor.o(off),
        c: common_vendor.o(fous),
        d: common_vendor.o(odd),
        e: common_vendor.unref(inpName),
        f: common_vendor.o(($event) => common_vendor.isRef(inpName) ? inpName.value = $event.detail.value : null),
        g: common_vendor.unref(offPng),
        h: isDipsplay.value ? 1 : "",
        i: common_vendor.o(empty),
        j: common_vendor.o(confirm)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1ca1e1b3"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/name/name.js.map
