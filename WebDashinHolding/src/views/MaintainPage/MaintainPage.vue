<script setup lang="ts">
import { useRepairs } from '@/stores/useRepairs'
import { onMounted } from 'vue'
import inpView from '@/components/Main/pop-up-windows/inpView.vue'
import { IpSite } from '@/stores/IpSite'
import { ref, reactive } from 'vue'
const { repairRecords, fetchRepairRecords, isuploading, } = useRepairs()
onMounted(() => {
  fetchRepairRecords()
})
const getStatusType = (status) => {
  switch (status) {
    case '待处理':
      return 'warning'  // 待处理
    case '2':
      return 'primary'  // 处理中
    case '3':
      return 'success'  // 已完成
    default:
      return 'info'     // 其他状态
  }
}
const getStatus = (status) => {
  switch (status) {
    case '待处理':
      return '待处理'  // 待处理
    case '2':
      return '处理中'  // 处理中
    case '3':
      return '已完成'  // 已完成
    default:
      return '驳回'     // 其他状态
  }
}
// 获取所有图片列表
let obj = reactive([])
const getImageList = (photoUrls) => {
  obj.push(IpSite + '/uploads/' + photoUrls)
  try {
    return obj
  } catch {
    return []
  }
}
/* 查看详情 */
const currentRepair = ref(null)
const dialogVisible = ref(false)
// 显示详情
const showDetail = (repair) => {
  currentRepair.value = repair
  dialogVisible.value = true
}
</script>

<template>
  <div class="MaintainPage">
    <div class="top-title">
      <h3 class="yk-title">维修申报</h3><!---->
      <div class="option">
        <svg t="1748249965665" @click="isuploading = true" class="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="7788" width="20" height="20">
          <path
            d="M925.696 384q19.456 0 37.376 7.68t30.72 20.48 20.48 30.72 7.68 37.376q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68l-287.744 0 0 287.744q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888l0-287.744-287.744 0q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68l287.744 0 0-287.744q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68q39.936 0 68.096 28.16t28.16 68.096l0 287.744 287.744 0z"
            p-id="7789" fill="#212121"></path>
        </svg>
        <svg t="1748414039958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="4945" width="20" height="20">
          <path
            d="M384 0H85.333333C38.4 0 0 38.4 0 85.333333v298.666667c0 46.933333 38.4 85.333333 85.333333 85.333333h298.666667c46.933333 0 85.333333-38.4 85.333333-85.333333V85.333333c0-46.933333-38.4-85.333333-85.333333-85.333333z m0 411.733333v14.933334-14.933334zM938.666667 0H640c-46.933333 0-85.333333 38.4-85.333333 85.333333v298.666667c0 46.933333 38.4 85.333333 85.333333 85.333333h298.666667c46.933333 0 85.333333-38.4 85.333333-85.333333V85.333333c0-46.933333-38.4-85.333333-85.333333-85.333333zM384 554.666667H85.333333c-46.933333 0-85.333333 38.4-85.333333 85.333333v298.666667c0 46.933333 38.4 85.333333 85.333333 85.333333h298.666667c46.933333 0 85.333333-38.4 85.333333-85.333333V640c0-46.933333-38.4-85.333333-85.333333-85.333333z m0 426.666666v-42.666666 42.666666zM938.666667 554.666667H640c-46.933333 0-85.333333 38.4-85.333333 85.333333v298.666667c0 46.933333 38.4 85.333333 85.333333 85.333333h298.666667c46.933333 0 85.333333-38.4 85.333333-85.333333V640c0-46.933333-38.4-85.333333-85.333333-85.333333z"
            p-id="4946" fill="#212121"></path>
        </svg>
      </div>
    </div>
    <inpView v-if="isuploading"></inpView>
    <div class="main-box">
      <el-table :data="repairRecords" style="width: 100%" border stripe>
        <el-table-column prop="id" label="报修编号" width="100" />
        <el-table-column prop="reporter_name" label="报修人" width="120" />
        <el-table-column prop="reporter_contact" label="联系方式" width="150" />
        <el-table-column prop="location" label="地点" />
        <el-table-column prop="issue_description" label="问题描述" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatus(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="报修时间" width="180" />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button @click="showDetail(scope.row)" type="primary">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 详情对话框 -->
      <el-dialog v-model="dialogVisible" title="报修详情" width="60%">
        <div class="repair-detail" v-if="currentRepair">
          <div class="detail-item">
            <span class="label">报修编号：</span>
            <span>{{ currentRepair.id }}</span>
          </div>
          <div class="detail-item">
            <span class="label">报修人：</span>
            <span>{{ currentRepair.reporter_name }}</span>
          </div>
          <div class="detail-item">
            <span class="label">联系方式：</span>
            <span>{{ currentRepair.reporter_contact }}</span>
          </div>
          <div class="detail-item">
            <span class="label">维修地点：</span>
            <span>{{ currentRepair.location }}</span>
          </div>
          <div class="detail-item">
            <span class="label">问题描述：</span>
            <span>{{ currentRepair.issue_description }}</span>
          </div>
          <div class="detail-item">
            <span class="label">状态：</span>
            <el-tag :type="getStatusType(currentRepair.status)">
              {{ getStatus(currentRepair.status) }}
            </el-tag>
          </div>
          <div class="detail-item">
            <span class="label">驳回原因：</span>
            <span>{{ currentRepair.rejection_notice }}</span>
          </div>
          <div class="detail-item">
            <span class="label">报修时间：</span>
            <span>{{ currentRepair.created_at }}</span>
          </div>
          <div class="detail-item" v-if="currentRepair.photo_urls">
            <span class="label">报修图片：</span>
            <div class="image-list imaegs">
              <el-image :hide-on-click-modal="true" :lazy="true"
                v-for="(url, index) in JSON.parse(currentRepair.photo_urls)" :key="index"
                style="width: 100px; height: 100px; margin-right: 10px" :src="IpSite + '/uploads/' + url"
                :preview-src-list="getImageList(url)" />
            </div>
          </div>
        </div>
        <!-- <div class="btn">
          <el-button plain @click="Rejectio_Notice = true">驳回</el-button>
          <el-button type="danger" @click="deleteRepair(currentRepair.id)">删除</el-button>
        </div> -->
      </el-dialog>
    </div>
  </div>
</template>

<style scoped lang="scss">
.MaintainPage {
  width: 100%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  --padding: 0 20px; //css变量，用于内边距
  --boderRadius: 4px; // 通用变量，用于圆角
  padding-top: 12px;
  position: relative;

  .top-title {
    height: 48px;
    display: flex;
    align-items: center;
    padding: var(--padding);
    background: var(--bgColor2);
    box-shadow: 0 0 12px rgba(0, 0, 0, .12);
    border-radius: var(--boderRadius);
    justify-content: space-between;

    .option {
      width: fit-content;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 15px;
    }
  }

  .yk-title {
    font-size: 20px;
  }

  .main-box {
    height: 750px;
    background: var(--bgColor2);
    box-shadow: 0 0 12px rgba(0, 0, 0, .12);
    border-radius: var(--boderRadius);
    position: relative;
    padding: 20px;
    padding-bottom: 150px;

    .item {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: flex-start;
      overflow-y: scroll;

      .item-card {
        width: 24%;
        height: 250px;
        border-radius: 8px;
        background: #eee;
        color: #212121;
        background: var(--bgColor2);
        position: relative;
        overflow: hidden;
        box-shadow: 0 0 12px rgba(0, 0, 0, .12);

        .flex {
          display: flex;
          flex-direction: column;
          gap: 30%;
          padding: 16px;
        }

        .title {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .bottom {
          width: 100%;
          position: absolute;
          bottom: 0;
          height: 40px;
          background: rgba(0, 0, 0, .5);
          display: flex;
          align-items: center;
          padding: 0 16px;
          color: #fff;
        }
      }
    }

    .detail-item {
      margin-bottom: 15px;

      .serviceman {
        width: 100%;
        min-height: 20px;
      }
    }

    .label {
      font-weight: bold;
      margin-right: 10px;
      color: #606266;
    }

    .image-list {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .imaegs {
      width: 100%;
      height: fit-content;
      overflow-y: scroll;
    }

    .btn {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 20px;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
  }


  .add {
    width: 70px;
    height: 70px;
    position: absolute;
    bottom: 10%;
    right: 3%;
    background: #212121;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
