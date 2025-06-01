"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_ipconfig = require("../../stores/ipconfig.js");
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const images = common_vendor.ref([]);
    async function fetchImages() {
      try {
        const res = await common_vendor.index.request({
          url: stores_ipconfig.ip + "/app/images"
        });
        common_vendor.index.__f__("log", "at pages/search/search.vue:31", res.data);
        images.value = res.data;
        common_vendor.index.__f__("log", "at pages/search/search.vue:33", images.value);
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/search/search.vue:35", "获取列表失败", e);
      }
    }
    function chooseImages() {
      common_vendor.index.chooseImage({
        count: 9,
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
              images.value.push(img.url);
              common_vendor.index.__f__("log", "at pages/search/search.vue:75", img.url);
            });
            common_vendor.index.showToast({ title: "全部上传完成", icon: "success" });
          }).catch((err) => {
            common_vendor.index.__f__("error", "at pages/search/search.vue:80", "上传错误", err);
            common_vendor.index.showToast({ title: "上传失败", icon: "none" });
          });
        }
      });
    }
    function deleteImage(filename, idx) {
      common_vendor.index.request({
        url: stores_ipconfig.ip + `/app/images/${filename}`,
        method: "DELETE",
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/search/search.vue:95", "raw response:", res);
          const json = res.data;
          if (json.success) {
            images.value.splice(idx, 1);
            common_vendor.index.showToast({ title: "删除成功", icon: "success" });
          } else {
            common_vendor.index.showToast({ title: "删除失败", icon: "none" });
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/search/search.vue:105", "删除请求出错", err);
          common_vendor.index.showToast({ title: "删除出错", icon: "none" });
        }
      });
    }
    function previewImage(currentIndex) {
      const urls = images.value.map((item) => stores_ipconfig.ip + "/uploads/" + item);
      common_vendor.index.previewImage({
        current: currentIndex,
        // 当前显示图片的索引
        urls,
        // 所有需要预览的图片URL列表
        indicator: "default",
        // 显示指示器
        loop: true
        // 支持循环预览
      });
    }
    common_vendor.onMounted(fetchImages);
    common_vendor.onShow(() => {
      fetchImages();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(chooseImages),
        b: common_vendor.f(images.value, (item, idx, i0) => {
          return {
            a: common_vendor.unref(stores_ipconfig.ip) + "/uploads/" + item,
            b: common_vendor.o(($event) => previewImage(idx), item.filename),
            c: common_vendor.o(($event) => deleteImage(item, idx), item.filename),
            d: item.filename
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map
