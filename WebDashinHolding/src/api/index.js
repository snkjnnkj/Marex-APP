/*该封装的axios没有动画控制*/
import request from '@/axios/request.js'
/*导入控制加载动画的axios*/
import useApi from '@/axios/useApi.js'

const { get, post } = useApi()
import { IpSite } from "@/stores/IpSite.js";
/*查询所有的工作人员的数据*/
export const getStaff = async (data) => await get(IpSite + '/api/getStaff/' + data)
/*根据邮箱查询当个工作人员信息*/
export const getStaffByEmail = async (data, email) => await get(IpSite + '/api/getStaffByEmail/' + data + '/' + email)
//根据当前账号的权限加真实姓名来查找工作人员（必须要管理员权限才能查询）
export const getStaffByRealName = async (data, Real_name) => await get(IpSite + '/api/getStaffByRealName/' + data + '/' + Real_name)
/*获取验证码*/
export const getCode = async (data) => await post('/app/getCode', { params: data })
/*向数据库写入注册信息，若果注册就直接返回用户信息，并不直接返回密码*/
export const AddUser = async (data) => await get('/app/addUser', { params: data })
/*修改用户昵称*/
export const setUserName = async (data) => await get('/app/setName', { params: data })
/*修改用户手机号*/
export const setUserPhone = async (data) => await post('/app/setPhone', { params: data })
/*修改邮箱账号*/
export const setUserEmail = async (data) => await get('/app/setEmail', { params: data })
/*修改性别*/
export const setUserSex = async (data) => await get('/app/setSex', { params: data })
/*上传图片，可用于上传头像留言等各种操作*/
export const uploadingPhoto = async (data) => await post('/app/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } })
/*删除上传的图片*/
export const deleteImage = async (data) => await post('/app/DeleteThePhoto', { params: data })
/*修改数据库的头像图片*/
export const setUserAvatar = async (data) => await post('/app/setAvatar', { params: data })
/*添加报修记录(需要及时通知到管理员端)*/
export const AddRepairs = async (data) => await post(IpSite + '/api/addRepairRequest', data)
/* 根据用户id查询报修记录 */
export const getRepairsByUser_id = async (data) => await get(IpSite + '/api/getRepairsByUser_id/' + data)
/*发送通用邮件*/
export const taskEmail = async (data) => await post('/app/succeed', { params: data })
/*查询所有保修记录*/
export const setRepairs = async () => await get(IpSite + '/api/getRepairs')
/* 添加工作人员的报修记录表 */
export const getStaffByReal_name = async (data) => await post(IpSite + '/api/StaffRepairReportRecord', data)
/* 修改报修状态 */
export const setRepairStatus = async (data) => await post(IpSite + '/api/updateRepairStatus', data)
/* 修改当前报修记录的人员数据 */
export const getRepairServiceman = async (data) => await post(IpSite + '/api/updateRepairServiceman', data)
/* 根据邮箱查询工作人员的数据表 */
export const getStaffRepairReport = async (data) => await get(IpSite + '/api/getStaffRepairReport/' + data)
/* 添加驳回消息 */
export const rejection_notice = async (data) => await post(IpSite + '/api/rejection_notice', data)
/* 删除某一条报修记录 */
export const deleteRepairById = async (data) => await post(IpSite + '/api/deleteRepairById', data)
/* 删除工作人员的报修表 */
export const deleteStaff = async (data) => await post(IpSite + '/api/deleteStaff', data)
