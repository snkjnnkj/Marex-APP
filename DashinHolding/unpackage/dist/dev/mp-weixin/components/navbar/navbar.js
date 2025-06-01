"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "navbar",
  setup(__props) {
    const navBarHeight = common_vendor.ref(0);
    const statusBarHeight = common_vendor.ref(0);
    const titleBarHeight = common_vendor.ref(50);
    const menuButtonWidth = common_vendor.ref(87);
    common_vendor.onMounted(() => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
      statusBarHeight.value = systemInfo.statusBarHeight || (systemInfo.platform === "android" ? 52 : 20);
      if (menuButtonInfo.top) {
        titleBarHeight.value = (menuButtonInfo.top - statusBarHeight.value) * 2 + menuButtonInfo.height;
      }
      navBarHeight.value = statusBarHeight.value + titleBarHeight.value;
      menuButtonWidth.value = systemInfo.windowWidth - menuButtonInfo.right + 6;
    });
    return (_ctx, _cache) => {
      return {
        a: `${statusBarHeight.value}px`,
        b: `${titleBarHeight.value}px`,
        c: `${navBarHeight.value}px`
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eaf4c2e5"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/navbar/navbar.js.map
