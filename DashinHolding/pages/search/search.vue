<template>
  <view class="container">
    <button @click="chooseImages">选择图片（最多9张）</button>
    <view style="display: flex;flex-wrap: wrap;">
      <view class="thumbs" v-for="(item, idx) in images" :key="item.filename">
        <image
            :src="ip + '/uploads/' + item"
            mode="heightFix"
            class="thumb"
            @click="previewImage(idx)"
        />
        <button @click.stop="deleteImage(item, idx)" class="del-btn">删除</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {onShow} from "@dcloudio/vue-cli-plugin-uni/packages/uni-app";

const images = ref([]);
import {ip} from "@/stores/ipconfig";

// 拉取当前已上传的列表
async function fetchImages() {
  try {
    const res = await uni.request({
      url: ip + '/app/images',
    });
    console.log(res.data)
    images.value = res.data;
    console.log(images.value)
  } catch (e) {
    console.error('获取列表失败', e);
  }
}

// 选多图并上传
function chooseImages() {
  uni.chooseImage({
    count: 9,
    sizeType: ['compressed'],
    success: chooseRes => {
      const paths = chooseRes.tempFilePaths;
      const uploadTasks = paths.map(p => new Promise((resolve, reject) => {
        uni.uploadFile({
          url: ip + '/app/upload',
          filePath: p,
          name: 'files',
          formData: {},
          success: uRes => {
            try {
              const json = JSON.parse(uRes.data);
              if (json.success) {
                resolve(json.data)
              } else {
                reject(json)
              }
            } catch (err) {
              reject(err);
            }
          },
          fail: reject
        });
      }));

      // 并行上传所有选中的
      Promise.all(uploadTasks)
          .then(results => {
            // results 是多个[ {filename,url}, ... ]
            // 合并到 images
            results.flat().forEach(img => {
              images.value.push(img.url)
              console.log(img.url)
            });
            uni.showToast({title: '全部上传完成', icon: 'success'});
          })
          .catch(err => {
            console.error('上传错误', err);
            uni.showToast({title: '上传失败', icon: 'none'});
          });
    }
  });
}

// 删除
function deleteImage(filename, idx) {
  uni.request({
    url: ip + `/app/images/${filename}`,
    method: 'DELETE',
    success: (res) => {
      // 这里只有一个参数 res
      // 并不是 (err, response)
      console.log('raw response:', res)
      const json = res.data
      if (json.success) {
        images.value.splice(idx, 1)
        uni.showToast({title: '删除成功', icon: 'success'})
      } else {
        uni.showToast({title: '删除失败', icon: 'none'})
      }
    },
    fail: (err) => {
      console.error('删除请求出错', err)
      uni.showToast({title: '删除出错', icon: 'none'})
    }
  })

}

// 新增预览功能
function previewImage(currentIndex) {
  // 生成完整的图片URL数组
  const urls = images.value.map(item => ip + '/uploads/' + item);

  uni.previewImage({
    current: currentIndex,       // 当前显示图片的索引
    urls: urls,                 // 所有需要预览的图片URL列表
    indicator: 'default',       // 显示指示器
    loop: true                  // 支持循环预览
  });
}

onMounted(fetchImages);
onShow(()=>{
  fetchImages()
})
</script>

<style>
.container {
  padding-top: 120px;
  display: flex;
  flex-wrap: wrap;
}

.thumbs {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  position: relative;
}

.thumb {
  width: 100px;
  height: 100px;
  margin: 5px;
}

.del-btn {
  position: absolute;
  margin-top: -20px;
  margin-left: 80px;
  font-size: 12px;
}

.container {
  padding-top: 120px;
  display: flex;
  flex-wrap: wrap;
}

.thumbs {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  position: relative;
}

.thumb {
  width: 100px;
  height: 100px;
  margin: 5px;
}

.del-btn {
  position: absolute;
  margin-top: -20px;
  margin-left: 80px;
  font-size: 12px;
}

.thumb {
  cursor: pointer;
  transition: opacity 0.3s;
}

.thumb:active {
  opacity: 0.7;
}
</style>
