"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const stores_useLogin = require("./stores/useLogin.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/mine/mine.js";
  "./pages/search/search.js";
  "./pages/UploadIssue/UploadIssue.js";
  "./pages/RepairInquiry/RepairInquiry.js";
  "./pages/PersonnelInquiry/PersonnelInquiry.js";
  "./pages/Login/Login.js";
  "./pages/code/code.js";
  "./pages/MyData/MyData.js";
  "./pages/name/name.js";
  "./pages/sexPage/sexPage.js";
  "./pages/setEmailPage/setEmailPage.js";
  "./pages/setPhonePage/setPhonePage.js";
  "./pages/setTeacherPage/setTeacherPage.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    stores_useLogin.useLogin();
    common_vendor.onLaunch(() => {
    });
    return () => {
    };
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
