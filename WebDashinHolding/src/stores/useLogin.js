/*导入vue3的各种工具函数*/
import {ref, watchEffect} from 'vue'
/*倒计时函数*/
import {useCountDown} from '@/utils/CountDown.js'
const {countdown: countdown1, handleClick: handleClick1} = useCountDown()
/*导入获取验证码的api*/
import {getCode, AddUser} from '@/api/index.js'
/*导入所需要用到的消息弹窗*/
import {ball} from '@/utils/showMessAge.js'
const {open2, open4} = ball()
/*导入获取时间函数*/
import {formatDateTime} from '@/utils/CreateDate.js'
/*导入nanoid用于获取随机id*/
import {nanoid} from "nanoid";
/*导入Cookes储存库*/
import Cookies from 'js-cookie'
import router from "@/router/index.js";
/*控制登录框的弹出和关闭*/
const isLogin = ref(true)
/*账号输入框*/
const mailbox = ref('')
/*储存验证码*/
const code = ref('')
/*储存后端传入的验证码*/
const ServerCode = ref('111');
/*储存cookes的名称*/
const __cookies__ = '__cookes__';
/*储存cookes的变量*/
const userCookes = ref()
/*储存后端返回的用户数据*/
const userData = ref()
/*记住我选项*/
const remember = ref('')
/**
 * 验证邮箱是否输入错误，正则表达式的验证
 */
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@(qq|163|126|yeah)\.(com|net)$/i;
  return regex.test(email);
}
/*登录验证邮箱是否正确*/
function verificationMailbox() {
  // 邮箱验证
  if (!mailbox.value) {
    open4('邮箱不能为空', 3000)
    return false
  } else if (!validateEmail(mailbox.value)) {
    open4('请输入正确的邮箱格式', 3000)
    return false
  } else {
    return true
  }
}
/*获取验证码封装为一个函数用于后续的多次调用*/
async function getPuilCode() {
  console.log(mailbox.value)
  const res = await getCode({
    mailbox: mailbox.value,
    content: `用于<a href="https://xiaoli.icu">报修云</a>平台的安全验证，5分钟内有效，若非本人操作请忽略此消息。`
  })
  if (res.code === 200) {
    ServerCode.value = res.data
    console.log(res.data)
  }
}
/*点击确定获取验证码,如果获取成功就弹窗提示获取成功*/
function GetEmail() {
  /*邮箱验证邮箱账号，如果正确就通过验证*/
  const email = verificationMailbox()
  if (email === false) {
    return
  }
  getPuilCode()
  handleClick1()
}
/*确定登录*/
async function confirm() {
  console.log(ServerCode.value)
  if (code.value === ServerCode.value) {
    /*第一次登录调用该函数向数据库添加数据库信息*/
    const res = await AddUsserData()
    if (res === true) {
      StoreCookies() //储存Cookes
      verificationCookes() //读取Cookes
    }
  } else {
    open4('验证码不正确', 3000)
    return
  }
}
/*向数据库写入用户的注册信息，如果有数据就直接存进数据库*/
async function AddUsserData() {
  const date = formatDateTime()
  const x = nanoid()
  const res = await AddUser({
    username: x,
    email: mailbox.value,
    phone: '',
    avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
    created_at: date,
    updated_at: date,
  })
  if (res.code == 200) {
    userData.value = res.data[0]
    open2({
      x: '登录成功',
      time: 3000,
      close: () => {
        mailbox.value = ''
        code.value = ''
      }
    })
    return true;
  } else {
    return false;
  }
}

/*存储cookies*/
function StoreCookies() {
  /*若选择记住我后就让cookies的值两天后过期*/
  if (remember.value === true) {
    Cookies.set(__cookies__, JSON.stringify(userData.value), {expires: 30})
  } else {
    Cookies.set(__cookies__, JSON.stringify(userData.value), {expires: 7})
  }
}

/*读取Cookes*/
function readCookes() {
  userCookes.value = Cookies.get(__cookies__) ? JSON.parse(Cookies.get(__cookies__)) : false
}

/*打开弹窗*/
function onMessAge() {
  isLogin.value = true
}

function OffMessAge() {
  isLogin.value = false
}

/*清除Cookes还可以应用于退出登录*/
function out() {
  Cookies.remove(__cookies__)
  verificationCookes()
  router.push('/HomeView')
  open4('已退出登录', 3000)
}

/*验证Cookes，如果有值就关闭登录,没有就打开弹窗*/
function verificationCookes(callBack, messAge) {
  readCookes()
  if (userCookes.value) {
    OffMessAge()
    if (callBack) {
      callBack()
    }
  } else {
    onMessAge()
    if (messAge) {
      messAge()
    }
  }
}

export function useLogin() {
  verificationCookes()
  return {
    userCookes,
    isLogin,
    mailbox,
    code,
    countdown1,
    remember,
    GetEmail,
    confirm,
    out,
    userData,
    StoreCookies,
    readCookes,
    verificationCookes
  }
}