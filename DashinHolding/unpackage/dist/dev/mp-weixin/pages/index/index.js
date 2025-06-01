"use strict";
const common_vendor = require("../../common/vendor.js");
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
  __name: "index",
  setup(__props) {
    const { cookesUser, getUserInfo } = stores_useLogin.useLogin();
    function Repair_report_review_page() {
      common_vendor.index.navigateTo({
        url: "/pages/UploadIssue/UploadIssue"
      });
    }
    function RepairInquiry() {
      common_vendor.index.navigateTo({
        url: "/pages/RepairInquiry/RepairInquiry"
      });
    }
    function PersonnelInquiry() {
      common_vendor.index.navigateTo({
        url: "/pages/PersonnelInquiry/PersonnelInquiry"
      });
    }
    common_vendor.onShow(() => {
      getUserInfo();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(5, (i, k0, i0) => {
          return {
            a: i
          };
        }),
        b: common_vendor.unref(cookesUser).user_role === 1
      }, common_vendor.unref(cookesUser).user_role === 1 ? {
        c: common_vendor.o(Repair_report_review_page),
        d: common_vendor.o(RepairInquiry),
        e: common_vendor.o(PersonnelInquiry)
      } : {}, {
        f: common_vendor.unref(cookesUser).user_role === 2
      }, common_vendor.unref(cookesUser).user_role === 2 ? {
        g: common_vendor.o(Repair_report_review_page),
        h: common_vendor.o(RepairInquiry),
        i: common_vendor.o(PersonnelInquiry)
      } : {}, {
        j: common_vendor.unref(cookesUser).user_role === 3
      }, common_vendor.unref(cookesUser).user_role === 3 ? {
        k: common_vendor.o(Repair_report_review_page),
        l: common_vendor.o(RepairInquiry),
        m: common_vendor.o(PersonnelInquiry)
      } : {}, {
        n: common_vendor.unref(cookesUser).user_role === 4
      }, common_vendor.unref(cookesUser).user_role === 4 ? {
        o: common_vendor.o(Repair_report_review_page),
        p: common_vendor.o(RepairInquiry),
        q: common_vendor.o(PersonnelInquiry)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
