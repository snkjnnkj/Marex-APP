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
  __name: "sexPage",
  setup(__props) {
    const { fanhuiPng, offPng, binggoPng } = hooks_photo.Photo();
    const { setSex } = stores_setUser.SetUser();
    function off() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    const selectSex = common_vendor.ref([
      {
        id: "001",
        text: "男"
      },
      {
        id: "001",
        text: "女"
      },
      {
        id: "001",
        text: "？？？"
      }
    ]);
    const isShow = common_vendor.ref(0);
    const title = common_vendor.ref("");
    function select(i, index) {
      title.value = i;
      isShow.value = index;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(fanhuiPng),
        b: common_vendor.o(off),
        c: common_vendor.f(selectSex.value, (i, index, i0) => {
          return {
            a: common_vendor.t(i.text),
            b: isShow.value === index ? 1 : "",
            c: i.id,
            d: common_vendor.o(($event) => select(i.text, index), i.id)
          };
        }),
        d: common_vendor.unref(binggoPng),
        e: common_vendor.o(($event) => common_vendor.unref(setSex)(title.value))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-efa40ebe"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/sexPage/sexPage.js.map
