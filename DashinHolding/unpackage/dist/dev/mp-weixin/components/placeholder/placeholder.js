"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "placeholder",
  setup(__props) {
    common_vendor.ref("这个是主页面");
    const navBarHeight = common_vendor.ref(0);
    const statusBarHeight = common_vendor.ref(0);
    const titleBarHeight = common_vendor.ref(50);
    const menuButtonWidth = common_vendor.ref(87);
    common_vendor.onMounted(() => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
      statusBarHeight.value = systemInfo.statusBarHeight || (systemInfo.platform === "android" ? 55 : 20);
      if (menuButtonInfo.top) {
        titleBarHeight.value = (menuButtonInfo.top - statusBarHeight.value) * 2 + menuButtonInfo.height;
      }
      navBarHeight.value = statusBarHeight.value + titleBarHeight.value;
      menuButtonWidth.value = systemInfo.windowWidth - menuButtonInfo.right + 6;
    });
    return (_ctx, _cache) => {
      return {
        a: `${navBarHeight.value}px`
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/placeholder/placeholder.js.map
