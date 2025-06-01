import express from 'express';

const router = express.Router();
/* ========================================== */
/* 测试代码 */
import { roomLable } from '../controllers/test.mjs';

router.get('/text', roomLable);
/* ========================================== */
/*============================================*/
//微信登录
import { WxChat } from "../AC(authenticationCenter)/WXRouter.js";

const { wechatLogin } = WxChat()
router.post('/wechat-login', wechatLogin);
/*==================================================================*/
/*================================发送验证码到qq邮箱============================*/
import { Code } from '../AC(authenticationCenter)/code.mjs'
const { getVerificationCode, useSucceed } = Code()
import { Add } from '../AC(authenticationCenter)/addUser.js'
const { writeInUser } = Add()
router.post('/getCode', getVerificationCode)//获取登录验证码
router.post('/succeed', useSucceed)//获取注册验证码,通用系统消息
router.get('/addUser', writeInUser)//添加注册信息到mysql
/*================================发送验证码到qq邮箱============================*/


/*===========================================================================*/
//修改用户信息值
import { set } from '../AC(authenticationCenter)/setUser.js'

const { setAvatar, setName, setSex, setEmail, setPhone, setTeacher } = set()
router.post('/setAvatar', setAvatar)//修改数据库头像路径
router.get('/setName', setName)//修改用户昵称
router.get('/setSex', setSex) //修改性别
router.get('/setEmail', setEmail) //修改用户邮箱
router.post('/setPhone', setPhone)//修改手机号
router.get('/setTeacher', setTeacher)// 修改教师标识
/*===========================================================================*/
/*===========================================================================*/
// 上传图片
import { upload } from '../utils/multer.mjs'
import { uploading } from '../controllers/uploading.mjs'

const { images, useupload, imagesDelete } = uploading()
router.get('/images', images)
router.post('/upload', upload.array('image'), useupload);
router.post('/DeleteThePhoto', imagesDelete);
/*============================================================================*/
/*把路由导出*/
export default router;