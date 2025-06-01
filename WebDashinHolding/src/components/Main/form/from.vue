<template>
  <div class="repair-list">
    <el-table :data="repairs" style="width: 100%" border stripe>
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
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button v-if="scope.row.status !== '2'" @click="showDispatch(scope.row)" type="success">派遣人员</el-button>
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
        <div class="detail-item">
          <span class="label">当前维修人员：</span>
          <div class="serviceman">
            <div class="user-list">
              <table class="table">
                <thead>
                  <tr>
                    <th>头像</th>
                    <th>昵称</th>
                    <th>邮箱</th>
                    <th>联系方式</th>
                    <th>性别</th>
                    <th>状态</th>
                    <th>角色</th>
                    <th>创建时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in JSON.parse(currentRepair.serviceman)" :key="user.id">
                    <td>
                      <img v-if="user.avatar" :src="user.avatar" :alt="user.username" class="avatar">
                      <span v-else>无头像</span>
                    </td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email || '-' }}</td>
                    <td>{{ user.phone || '-' }}</td>
                    <td>{{ user.sex || '-' }}</td>
                    <td>
                      <span :class="['status-tag', getStatusClass(user.status)]">
                        {{ user.status === 1 ? '正常' : '禁用' }}
                      </span>
                    </td>
                    <td>
                      <span :class="['role-tag', getRoleClass(user.user_role)]">
                        {{ getRoleName(user.user_role) }}
                      </span>
                    </td>
                    <td>{{ formatDate(user.created_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="detail-item" v-if="currentRepair.photo_urls">
          <span class="label">报修图片：</span>
          <div class="image-list imaegs">
            <el-image :hide-on-click-modal="true" :lazy="true" @close="close"
              v-for="(url, index) in JSON.parse(currentRepair.photo_urls)" :key="index"
              style="width: 100px; height: 100px; margin-right: 10px" :src="IpSite + '/uploads/' + url"
              :preview-src-list="getImageList(url)" />
          </div>
        </div>
      </div>
      <div class="btn">
        <el-button plain @click="Rejectio_Notice = true">驳回</el-button>
        <el-button type="danger" @click="deleteRepair(currentRepair.id)">删除</el-button>
      </div>
    </el-dialog>
    <!-- 输入驳回原因 -->
    <el-dialog v-model="Rejectio_Notice" title="驳回" width="60%">
      <div class="repair-detail">
        <!-- 驳回原因输入框 -->
        <el-input type="textarea" placeholder="请输入驳回原因" v-model="RejectioNoticeInp"></el-input>
      </div>
      <div class="btn">
        <el-button @click="rejection_noticeData(() => { open2({ x: '已驳回', time: 3000 }) })"
          type="primary">确定</el-button>
        <el-button @click="Rejectio_Notice = false" type="danger">取消</el-button>
      </div>
    </el-dialog>
    <!--选择派遣人员-->
    <el-dialog v-model="dispatch" title="选择派遣人员" width="60%">
      <div class="dispatch" v-if="dispatch">
        <div class="inp">
          <label>
            <button @click="getStaffData" style="color: rgb(96, 98, 102);">查询所有人员</button>
          </label>
          <label>
            <input v-model="email" type="text" placeholder="查询账号" @keydown.enter="getStaffByEmailData">
          </label>
          <label>
            <input v-model="real_name" @keydown.enter="getStaffByRealNameData" type="text" placeholder="查询真实姓名">
          </label>
        </div>
        <div class="content">
          <div class="user-list">
            <table class="table">
              <thead>
                <tr>
                  <th>头像</th>
                  <th>昵称</th>
                  <th>邮箱</th>
                  <th>联系方式</th>
                  <th>性别</th>
                  <th>状态</th>
                  <th>角色</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in user_role" :key="user.id">
                  <td>
                    <img v-if="user.avatar" :src="user.avatar" :alt="user.username" class="avatar">
                    <span v-else>无头像</span>
                  </td>
                  <td>{{ user.username }}</td>
                  <td>{{ user.email || '-' }}</td>
                  <td>{{ user.phone || '-' }}</td>
                  <td>{{ user.sex || '-' }}</td>
                  <td>
                    <span :class="['status-tag', getStatusClass(user.status)]">
                      {{ user.status === 1 ? '正常' : '禁用' }}
                    </span>
                  </td>
                  <td>
                    <span :class="['role-tag', getRoleClass(user.user_role)]">
                      {{ getRoleName(user.user_role) }}
                    </span>
                  </td>
                  <td>{{ formatDate(user.created_at) }}</td>
                  <td style="display: flex;justify-content: center;align-items: center;height: 62px;">
                    <input style="cursor: pointer;width: 25px; height: 25px;" type="checkbox" name="" id=""
                      v-model="user.checkbox" @change="updateRepair(user)">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="btn">
          <el-button @click="getStaffByReal_nameData" type="success">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { IpSite } from "@/stores/IpSite.js";
import { getStaff, deleteRepairById, rejection_notice, getRepairServiceman, getStaffByRealName, setRepairStatus, getStaffByEmail, taskEmail, getStaffByReal_name, setRepairs } from '@/api/index.js'
import { useLogin } from '@/stores/useLogin.js'
import { ball } from "@/utils/showMessAge.js";
//储存选中的维修人员
const user_personnel = ref([])
const { open4, open2 } = ball()
const { userCookes } = useLogin()
const repairs = ref([])
const dialogVisible = ref(false)
const currentRepair = ref(null)
/*打开派遣对话框*/
const dispatch = ref(false);
// 获取报修列表
const fetchRepairs = async () => {
  try {
    if (userCookes.value.user_role === 3 || userCookes.value.user_role === 4) {
      const response = await setRepairs()
      repairs.value = response
      repairs.value.sort((a, b) => b.id - a.id)
    }
  } catch (error) {
    console.error('获取报修列表失败:', error)
  }
}

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
// 获取角色样式类
const getRoleClass = (role) => {
  const classMap = {
    1: 'role-admin',
    2: 'role-staff',
    3: 'role-user'
  }
  return classMap[role] || ''
}
// 获取角色名称
const getRoleName = (role) => {
  const roleMap = {
    1: '管理员',
    2: '维修人员',
    3: '用户'
  }
  return roleMap[role] || '未知'
}
// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleString('zh-CN')
}
// 获取状态样式类
const getStatusClass = (status) => {
  return status === 1 ? 'status-normal' : 'status-disabled'
}

function close() {
  obj = []
}

// 显示详情
const showDetail = (repair) => {
  currentRepair.value = repair
  dialogVisible.value = true
}
/* 点击显示派遣工作人员，显示详情 */
const showDispatch = (repair) => {
  dispatch.value = true
  currentRepair.value = repair
}
/*查询工作人员的数据*/
const user_role = ref([])

/*根据权限来查询*/
async function getStaffData() {
  const res = await getStaff(2)
  user_role.value = res
  // 为每个用户添加checked属性
  user_role.value = res.map(user => ({
    ...user,
    checked: false
  }))
}

/*根据邮箱加权限来查询工作人员的信息*/
const email = ref('')

async function getStaffByEmailData() {
  if (email.value.trim() === '') {
    open4('账号不能为空', 3000)
    return
  }
  const res = await getStaffByEmail('2', email.value)
  user_role.value = res.data
  if (res.data.length === 0) {
    open4('没找到该工作人员', 3000)
  }
}

/*根据真实姓名加权限来查询工作人员信息*/
const real_name = ref('')
const getStaffByRealNameData = async () => {
  if (real_name.value.trim() === '') {
    open4('姓名不能为空', 3000)
    return
  }
  const res = await getStaffByRealName('2', real_name.value)
  user_role.value = res.data
  if (res.data.length === 0) {
    open4('没找到该工作人员', 3000)
  }
}

// 定义表单数据
const formData = reactive({
  nickname: 'dfbbddfd', // 发送给谁来报修
  email: 'sdsdddv', // 邮箱
  location: 'sdbddsdb', // 位置
  problem_images: [''], // 问题图片
  problem_description: 'dddd', // 问题描述
  reporter_name: 'sdbddbds', // 报修人姓名
  reporter_phone: 'dddd', // 报修人联系方式
  repair_time: new Date().toISOString().slice(0, 16) // 报修时间
})

/*获取验证码封装为一个函数用于后续的多次调用*/
async function getTaskEmail() {
  const res = await taskEmail({
    mailbox: user_personnel.value.email, // 发送给谁
    content: `【系统消息】您有新的任务待处理`
  })
}
// 发起更新状态的请求
const updateRepairStatus = async (repair_id, status) => {
  const res = await setRepairStatus({
    repair_id,
    status,
  })
  console.log(res);
};
// 更新当前维修记录的维修人员
async function updateRepairServicemanData() {
  const res = await getRepairServiceman({
    repair_id: currentRepair.value.id,
    serviceman: JSON.stringify(user_personnel.value)
  });
  console.log(res);
}
/* 添加工作人员的报修表 */
async function getStaffByReal_nameData() {
  if (user_personnel.value.length === 0) {
    open4('请先选择维修人员', 3000)
    return
  }
  const res = await getStaffByReal_name(JSON.stringify(formData))
  console.log(res.code);
  /* 发送邮件给 */
  if (res.code === 200) {
    open2({
      x: '派遣成功',
      time: 3000
    })
    // user_personnel.value = [] // 清空选中的维修人员
    dispatch.value = false // 关闭派遣对话框
    await getTaskEmail();
    await updateRepairStatus(currentRepair.value.id, 2) // 修改报修状态为处理中
    await fetchRepairs() //从新请求待维修列表
    await updateRepairServicemanData()
  }
}

/*向工作人员发送信息*/
function updateRepair(user) { // 点击选择框的时候触发
  if (user.checkbox) {
    user_personnel.value.push(user)
    dispatch.value = true
    // currentRepair.value 当前报修的详细信息
    // user 报修人员的信息
    /* 修改表单的数据，再通过邮箱发送消息到工作人员 */
    formData.nickname = user.username // 发送给谁来报修
    formData.email = user.email // 工作人员的邮箱
    formData.location = currentRepair.value.location// 位置
    formData.problem_images = currentRepair.value.photo_urls // 问题图片
    formData.problem_description = currentRepair.value.issue_description // 问题描述
    formData.reporter_name = currentRepair.value.reporter_name // 报修人姓名
    formData.reporter_phone = currentRepair.value.reporter_contact // 报修人联系方式
    formData.repair_time = currentRepair.value.created_at // 报修时间
  }
}
/* 驳回消息输入框 */
const Rejectio_Notice = ref(false)
const RejectioNoticeInp = ref('无')
const rejection_noticeData = async (_back) => {
  const obj = [{
    id: currentRepair.value.id,
    rejection_notice: RejectioNoticeInp.value
  }]
  const res = await rejection_notice(JSON.stringify(obj))
  if (res.code === 200) {
    if (_back) {
      _back()
    }
    fetchRepairs()
    Rejectio_Notice.value = false
  } else {
    open4('驳回消息发送失败', 3000)
  }
}
/* 删除某一条数据 */
const deleteRepair = async (repairId) => {
  console.log(repairId);
  try {
    const response = await deleteRepairById({
      id: repairId
    })
    console.log(response);
    if (response.code === 200) {
      open2({
        x: '删除成功',
        time: 3000
      })
      fetchRepairs()
    } else {
      open4('删除失败', 3000)
    }
  } catch (error) {
    console.error('删除报修记录失败:', error)
    open4('删除报修记录失败', 3000)
  }
}
onMounted(() => {
  fetchRepairs()
  getStaffData()
})
</script>

<style scoped lang="scss">
.repair-list {
  padding: 20px;
}

.title {
  margin-bottom: 20px;
}

.repair-detail {
  padding: 20px;
}

.dispatch {
  width: 100%;
  height: 63vh;
  margin-top: 15px;

  .inp {
    width: 100%;
    height: 60px;
    display: flex;
    gap: 5px;
    align-items: center;

    label {
      width: calc(100% / 3);
      background: #eee;
      height: 45px;
      border-radius: 5px;
      font-size: 20px;
      padding-left: 5px;
      display: flex;
      gap: 5px;
      align-items: center;
    }
  }

  .content {
    width: 100%;
    height: 80%;
    overflow: auto;
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

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.status-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-normal {
  background-color: #67c23a;
  color: white;
}

.status-disabled {
  background-color: #f56c6c;
  color: white;
}

.role-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.role-admin {
  background-color: #f56c6c;
  color: white;
}

.role-staff {
  background-color: #e6a23c;
  color: white;
}

.role-user {
  background-color: #909399;
  color: white;
}

.btn-detail {
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  background-color: #409eff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-detail:hover {
  background-color: #66b1ff;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
}

.detail-info p {
  margin: 8px 0;
}

.btn-close {
  margin-top: 15px;
  padding: 6px 15px;
  border: none;
  border-radius: 4px;
  background-color: #909399;
  color: white;
  cursor: pointer;
}

.btn-close:hover {
  background-color: #a6a9ad;
}
</style>
