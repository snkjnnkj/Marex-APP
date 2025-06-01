"use strict";
const common_vendor = require("../common/vendor.js");
const stores_ipconfig = require("./ipconfig.js");
const stores_useLogin = require("./useLogin.js");
const { cookesUser, getUserInfo } = stores_useLogin.useLogin();
const images = common_vendor.ref("");
function chooseImages() {
  common_vendor.index.chooseImage({
    count: 1,
    sizeType: ["compressed"],
    success: (chooseRes) => {
      const paths = chooseRes.tempFilePaths;
      const uploadTasks = paths.map((p) => new Promise((resolve, reject) => {
        common_vendor.index.uploadFile({
          url: stores_ipconfig.ip + "/app/upload",
          filePath: p,
          name: "files",
          formData: {},
          success: (uRes) => {
            try {
              const json = JSON.parse(uRes.data);
              if (json.success) {
                resolve(json.data);
              } else {
                reject(json);
              }
            } catch (err) {
              reject(err);
            }
          },
          fail: reject
        });
      }));
      Promise.all(uploadTasks).then((results) => {
        results.flat().forEach((img) => {
          images.value = stores_ipconfig.ip + "/uploads/" + img.url;
        });
        set(images.value);
        common_vendor.index.showToast({ title: "修改成功", icon: "success" });
      }).catch((err) => {
        common_vendor.index.__f__("error", "at stores/setUser.js:50", "上传错误", err);
        common_vendor.index.showToast({ title: "上传失败", icon: "none" });
      });
    }
  });
}
async function getRegisterCode(data) {
  return await common_vendor.index.request({
    url: stores_ipconfig.ip + "/app/setAvatar",
    method: "GET",
    data
  });
}
async function set(img) {
  const res = await getRegisterCode({
    price: img,
    id: cookesUser.value.id
  });
  common_vendor.index.setStorageSync("user", res.data.data[0]);
  getUserInfo();
}
const inpName = common_vendor.ref(cookesUser.value.username);
async function setNameData(data) {
  return await common_vendor.index.request({
    url: stores_ipconfig.ip + "/app/setName",
    method: "GET",
    data
  });
}
async function setName() {
  const res = await setNameData({
    price: inpName.value,
    id: cookesUser.value.id
  });
  if (res.data.code === 200) {
    common_vendor.index.setStorageSync("user", res.data.data[0]);
    getUserInfo();
    common_vendor.index.showToast({ title: "修改成功", icon: "success" });
  }
}
async function setSexData(data) {
  return await common_vendor.index.request({
    url: stores_ipconfig.ip + "/app/setSex",
    method: "GET",
    data
  });
}
async function setSex(sex) {
  const res = await setSexData({
    price: sex,
    id: cookesUser.value.id
  });
  if (res.data.code === 200) {
    common_vendor.index.setStorageSync("user", res.data.data[0]);
    getUserInfo();
    common_vendor.index.showToast({ title: "修改成功", icon: "success" });
  }
}
const inpEmail = common_vendor.ref(cookesUser.value.email == "" ? "未填写" : cookesUser.value.email);
async function setEmailData(data) {
  return await common_vendor.index.request({
    url: stores_ipconfig.ip + "/app/setEmail",
    method: "GET",
    data
  });
}
async function setEmail() {
  const res = await setEmailData({
    price: inpEmail.value,
    id: cookesUser.value.id
  });
  if (res.data.code === 200) {
    common_vendor.index.setStorageSync("user", res.data.data[0]);
    getUserInfo();
    common_vendor.index.showToast({ title: "修改成功", icon: "success" });
  }
}
const inpPhone = common_vendor.ref(cookesUser.value.phone);
async function setPhoneData(data) {
  return await common_vendor.index.request({
    url: stores_ipconfig.ip + "/app/setPhone",
    method: "GET",
    data
  });
}
async function setPhone() {
  const res = await setPhoneData({
    price: inpPhone.value,
    id: cookesUser.value.id
  });
  if (res.data.code === 200) {
    common_vendor.index.setStorageSync("user", res.data.data[0]);
    getUserInfo();
    common_vendor.index.showToast({ title: "修改成功", icon: "success" });
  }
}
const inpTeacher = common_vendor.ref(cookesUser.value.teacher);
async function setTeacherData(data) {
  return await common_vendor.index.request({
    url: stores_ipconfig.ip + "/app/setTeacher",
    method: "GET",
    data
  });
}
async function setTeacher() {
  const res = await setTeacherData({
    price: inpTeacher.value,
    id: cookesUser.value.id
  });
  common_vendor.index.__f__("log", "at stores/setUser.js:194", res.data);
  if (res.data.code === 200) {
    common_vendor.index.setStorageSync("user", res.data.data[0]);
    getUserInfo();
    common_vendor.index.showToast({ title: "修改成功", icon: "success" });
  }
}
function SetUser() {
  return {
    chooseImages,
    set,
    inpName,
    setName,
    setSex,
    inpEmail,
    setEmail,
    inpPhone,
    setPhone,
    inpTeacher,
    setTeacher
  };
}
exports.SetUser = SetUser;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/setUser.js.map
