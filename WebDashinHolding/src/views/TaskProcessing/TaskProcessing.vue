<script setup>
import { getStaffRepairReport, deleteStaff } from '@/api/index.js';
import { onMounted, ref, reactive } from 'vue';
import { useLogin } from '@/stores/useLogin';
import { on } from 'cropperjs';
const { userCookes } = useLogin();
import { IpSite } from '@/stores/IpSite.js';
/* 获取待处理的数据 */
const RepairReport = ref([]);
const getStaffRepairReportData = async () => {
    try {
        const response = await getStaffRepairReport(userCookes.value.email);
        RepairReport.value = response.data;
        RepairReport.value.sort((a, b) => b.id - a.id); // 按照id降序排序
    } catch (error) {
        console.error('获取报修数据失败:', error);
    }
};

onMounted(() => {
    getStaffRepairReportData(); // 页面挂载的时候获取数据
});
/* 当前数据的处理状态 */
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
//  打开查看详情
const dialogVisible = ref(false);
const currentRepair = ref(null);
const show = (row) => {
    currentRepair.value = row;
    dialogVisible.value = true;
};
// 获取图片列表（查看问题图片）
let obj = reactive([])
const getImageList = (photoUrls) => {
    obj.push(IpSite + '/uploads/' + photoUrls)
    try {
        return obj
    } catch {
        return []
    }
}
/* 关闭查看大图时候让obj存储图片的数组清空 */
function close() {
    obj = []
}
/* 删除工作人员的数据表 */
const deleteStaffData = async (id) => {
    try {
        await deleteStaff({
            id: id
        });
        // 删除成功后重新获取数据
        await getStaffRepairReportData();
        dialogVisible.value = false; // 关闭对话框
    } catch (error) {
        console.error('删除报修数据失败:', error);
    }
};
</script>

<template>
    <div class="TaskProcessing">
        <div class="top-title">
            <h3 class="yk-title">任务处理</h3>
            <div class="option">
                <!-- 其他操作按钮可以放在这里 -->
            </div>
        </div>
        <div class="main">
            <el-table style="width: 100%" :data="RepairReport" border stripe>
                <el-table-column prop="id" label="报修编号" width="100" />
                <el-table-column prop="reporter_name" label="报修人" width="120" />
                <el-table-column prop="reporter_phone" label="联系方式" width="150" />
                <el-table-column prop="location" label="地点" />
                <el-table-column prop="problem_description" label="问题描述" />
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
                        <el-button type="primary" @click="show(scope.row)">查看详情</el-button>
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
                        <span>{{ currentRepair.reporter_phone }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">维修地点：</span>
                        <span>{{ currentRepair.location }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">问题描述：</span>
                        <span>{{ currentRepair.problem_description }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">状态：</span>
                        <el-tag :type="getStatusType(currentRepair.status)">
                            {{ currentRepair.status }}
                        </el-tag>
                    </div>
                    <div class="detail-item">
                        <span class="label">报修时间：</span>
                        <span>{{ currentRepair.created_at }}</span>
                    </div>
                    <div class="detail-item" v-if="currentRepair.problem_images">
                        <span class="label">报修图片：</span>
                        <div class="image-list imaegs">
                            <el-image :hide-on-click-modal="true" :lazy="true" @close="close"
                                v-for="(url, index) in JSON.parse(currentRepair.problem_images)" :key="index"
                                style="width: 100px; height: 100px; margin-right: 10px"
                                :src="IpSite + '/uploads/' + url" :preview-src-list="getImageList(url)" />
                        </div>
                    </div>
                </div>
                <div class="btn">
                    <el-button type="success">收到</el-button>
                    <el-button type="info" @click="deleteStaffData(currentRepair.id)">删除</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<style scoped lang="scss">
.TaskProcessing {
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

    .main {
        width: 100%;
        height: 70vh;
        background: #fff;
        border-radius: 4px;
        overflow: auto;
        padding: 16px;
    }
}

.repair-detail {
    padding: 20px;
}

.detail-item {
    margin-bottom: 15px;

    .serviceman {
        width: 100%;
        min-height: 20px;
    }

    .image-list {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .imaegs {
        width: 100%;
        height: 200px;
        overflow-y: scroll;
    }
}

.btn {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
