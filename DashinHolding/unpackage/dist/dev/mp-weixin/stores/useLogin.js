"use strict";
const common_vendor = require("../common/vendor.js");
const stores_ipconfig = require("./ipconfig.js");
const utils_countDown = require("../utils/countDown.js");
const utils_random = require("../utils/random.js");
const utils_CreateDate = require("../utils/CreateDate.js");
const { countdown: countdown1, handleClick: handleClick1 } = utils_countDown.useCountDown();
const mailbox = common_vendor.ref("264201536@qq.com");
const isLoading = common_vendor.ref(false);
const user = common_vendor.ref([]);
const token = common_vendor.ref();
const cookesUser = common_vendor.ref();
const code = common_vendor.ref();
const codeInput = common_vendor.ref();
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@(qq|163|126|yeah)\.(com|net)$/i;
  return regex.test(email);
}
function verificationMailbox() {
  if (!mailbox.value) {
    common_vendor.index.showToast({
      title: "邮箱不能为空",
      // 提示内容
      icon: "none",
      // 图标类型（success/loading/none）
      duration: 2e3,
      // 显示时长（毫秒）
      mask: true
      // 是否显示透明蒙层
    });
    return false;
  } else if (!validateEmail(mailbox.value)) {
    common_vendor.index.showToast({
      title: "请输入正确的邮箱格式",
      // 提示内容
      icon: "none",
      // 图标类型（success/loading/none）
      duration: 2e3,
      // 显示时长（毫秒）
      mask: true
      // 是否显示透明蒙层
    });
    return false;
  } else {
    return true;
  }
}
async function getRegisterCode(data) {
  return await common_vendor.index.request({
    url: stores_ipconfig.ip + "/app/getCode",
    method: "POST",
    data
  });
}
async function RegistrationVerificationCode() {
  try {
    let res = await getRegisterCode({
      mailbox: mailbox.value,
      content: `用于<a href="https://xiaoli.icu">报修云</a>平台的安全验证，5分钟内有效，若非本人操作请忽略此消息。`
    });
    if (res.data.code === 200) {
      code.value = res.data.data;
      common_vendor.index.__f__("log", "at stores/useLogin.js:72", code.value);
    }
  } catch (error) {
    common_vendor.index.__f__("error", "at stores/useLogin.js:75", error);
  }
}
function getLoginCode() {
  handleClick1();
  RegistrationVerificationCode();
  common_vendor.index.showToast({
    title: "验证码发送成功",
    icon: "none"
  });
}
async function add(data) {
  return await common_vendor.index.request({
    url: stores_ipconfig.ip + "/app/addUser",
    method: "GET",
    data
  });
}
async function WriteToTheDatabase() {
  let x = utils_random.getMathRandom();
  let date = utils_CreateDate.formatDateTime();
  return await add({
    username: x,
    email: mailbox.value,
    phone: "",
    avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132",
    created_at: date,
    updated_at: date
  });
}
async function verificationCode() {
  if (codeInput.value === code.value) {
    common_vendor.index.showToast({
      title: "验证成功",
      icon: "none"
    });
    const res = await WriteToTheDatabase();
    common_vendor.index.__f__("log", "at stores/useLogin.js:120", res.data.data[0]);
    common_vendor.index.__f__("log", "at stores/useLogin.js:121", res.data.data);
    common_vendor.index.setStorageSync("user", res.data.data[0] || res.data.data);
    home();
  } else {
    common_vendor.index.showToast({
      title: "验证失败",
      icon: "none"
    });
  }
}
function verification() {
  const mailboxTrue = verificationMailbox();
  if (mailboxTrue) {
    common_vendor.index.navigateTo({
      url: "/pages/code/code"
    });
  }
}
function home() {
  common_vendor.index.switchTab({
    url: "/pages/index/index"
  });
}
const wechatLogin = async () => {
  try {
    isLoading.value = true;
    const loginRes = await new Promise((resolve, reject) => {
      common_vendor.index.login({
        provider: "weixin",
        success: resolve,
        fail: reject
      });
    });
    const userRes = await new Promise((resolve, reject) => {
      common_vendor.index.getUserInfo({
        provider: "weixin",
        success: resolve,
        fail: reject
      });
    });
    const requestRes = await common_vendor.index.request({
      url: stores_ipconfig.ip + "/app/wechat-login",
      method: "POST",
      data: {
        code: loginRes.code,
        encryptedData: userRes.encryptedData,
        iv: userRes.iv
      }
    });
    if (requestRes.data.code === 200) {
      user.value = requestRes.data.user;
      common_vendor.index.__f__("log", "at stores/useLogin.js:182", user.value);
      token.value = requestRes.data.token;
      common_vendor.index.setStorageSync("user", user.value);
      home();
      common_vendor.index.showToast({
        title: "登录成功",
        icon: "none"
      });
      isLoading.value = false;
    }
  } catch (error) {
    isLoading.value = false;
    common_vendor.index.__f__("error", "at stores/useLogin.js:195", "登录流程异常:", error);
    common_vendor.index.showToast({
      title: "登录失败,请检查网络",
      icon: "none"
    });
  }
};
function getUserInfo() {
  cookesUser.value = common_vendor.index.getStorageSync("user");
}
function WxChatLogin() {
  common_vendor.index.showModal({
    title: "提示",
    // 标题（可选）
    content: "确定要使用微信账号进行登录或注册吗？",
    // 内容（可选）
    confirmText: "确定",
    // 确认按钮文字（可选，默认"确定"）
    cancelText: "取消",
    // 取消按钮文字（可选，默认"取消"）
    success: async (res) => {
      if (res.confirm) {
        await wechatLogin();
        common_vendor.index.__f__("log", "at stores/useLogin.js:219", "用户点击了确定");
      } else if (res.cancel) {
        common_vendor.index.__f__("log", "at stores/useLogin.js:221", "用户点击了取消");
      }
    }
  });
}
function outWxChatLogin() {
  common_vendor.index.removeStorageSync("user");
  cookesUser.value = [];
  common_vendor.index.redirectTo({
    url: "/pages/Login/Login"
  });
  common_vendor.index.showToast({
    title: "登出成功",
    icon: "none"
  });
}
function useLogin() {
  getUserInfo();
  return {
    mailbox,
    isLoading,
    verification,
    wechatLogin,
    WxChatLogin,
    getUserInfo,
    cookesUser,
    home,
    outWxChatLogin,
    RegistrationVerificationCode,
    verificationCode,
    countdown1,
    getLoginCode,
    codeInput
  };
}
exports.useLogin = useLogin;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/useLogin.js.map
