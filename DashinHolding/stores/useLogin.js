import {ref} from 'vue'
import {ip} from "@/stores/ipconfig.js";
import {useCountDown} from '../utils/countDown.js'
import {getMathRandom} from '../utils/random.js'
import {formatDateTime} from '../utils/CreateDate.js'

const {countdown: countdown1, handleClick: handleClick1} = useCountDown()

//储存账号
const mailbox = ref('264201536@qq.com')
//登录的加载动画
const isLoading = ref(false)
//粗存用户登录信息
const user = ref([])
//储存token
const token = ref();
//储存用户的cookes信息
const cookesUser = ref()
//储存后端返回的验证码
const code = ref()
//储存用户输入的验证码
const codeInput = ref()

// 邮箱正则验证函数
/**
 * 
*/
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@(qq|163|126|yeah)\.(com|net)$/i;
    return regex.test(email);
}

/*登录验证邮箱是否正确*/
function verificationMailbox() {
    // 邮箱验证
    if (!mailbox.value) {
        uni.showToast({
            title: '邮箱不能为空',  // 提示内容
            icon: 'none',     // 图标类型（success/loading/none）
            duration: 2000,      // 显示时长（毫秒）
            mask: true           // 是否显示透明蒙层
        })
        return false
    } else if (!validateEmail(mailbox.value)) {
        uni.showToast({
            title: '请输入正确的邮箱格式',  // 提示内容
            icon: 'none',     // 图标类型（success/loading/none）
            duration: 2000,      // 显示时长（毫秒）
            mask: true           // 是否显示透明蒙层
        })
        return false
    } else {
        return true
    }
}

//封装一个post请求
async function getRegisterCode(data) {
    return await uni.request({
        url: ip + '/app/getCode',
        method: 'POST',
        data
    });
}

/*获取验证码*/
async function RegistrationVerificationCode() {
    try {
        let res = await getRegisterCode({
            mailbox: mailbox.value,
            content: `用于<a href="https://xiaoli.icu">报修云</a>平台的安全验证，5分钟内有效，若非本人操作请忽略此消息。`
        })
        if (res.data.code === 200) {
            code.value = res.data.data
            console.log(code.value)
        }
    } catch (error) {
        console.error(error)
    }
}

/* 发送验证码，并且倒计时 */
function getLoginCode() {
    handleClick1()
    RegistrationVerificationCode()
    uni.showToast({
        title: '验证码发送成功',
        icon: 'none'
    });
}

/*封装一个向数据库写入注册信息的函数*/
async function add(data) {
    return await uni.request({
        url: ip + '/app/addUser',
        method: 'GET',
        data
    });
}

/*写入*/
async function WriteToTheDatabase() {
    let x = getMathRandom()
    let date = formatDateTime()
    return await add({
        username: x,
        email: mailbox.value,
        phone: '',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132',
        created_at: date,
        updated_at: date,
    })
}

/*验证验证码*/
async function verificationCode() {
    if (codeInput.value === code.value) {
        uni.showToast({
            title: '验证成功',
            icon: 'none'
        });
        const res = await WriteToTheDatabase()
        console.log(res.data.data[0])
        console.log(res.data.data)
        uni.setStorageSync('user', res.data.data[0] || res.data.data);
        home()
    } else {
        uni.showToast({
            title: '验证失败',
            icon: 'none'
        });
    }
}

/*确定验证邮箱*/
function verification() {
    const mailboxTrue = verificationMailbox()
    if (mailboxTrue) {
        uni.navigateTo({
            url: '/pages/code/code',
        });
    }
}

// 进入首页
function home() {
    uni.switchTab({
        url: '/pages/index/index'
    });
}

/*调用微信登录接口*/
const wechatLogin = async () => {
    try {
        isLoading.value = true
        // 1. 获取微信code（正确用法）
        const loginRes = await new Promise((resolve, reject) => {
            uni.login({
                provider: 'weixin',
                success: resolve,
                fail: reject
            });
        });

        // 2. 获取用户信息（正确用法）
        const userRes = await new Promise((resolve, reject) => {
            uni.getUserInfo({
                provider: 'weixin',
                success: resolve,
                fail: reject
            });
        });
        // 4. 发送请求到后端
        const requestRes = await uni.request({
            url: ip + '/app/wechat-login',
            method: 'POST',
            data: {
                code: loginRes.code,
                encryptedData: userRes.encryptedData,
                iv: userRes.iv
            }
        });
        if (requestRes.data.code === 200) {
            user.value = requestRes.data.user
            console.log(user.value)
            token.value = requestRes.data.token
            uni.setStorageSync('user', user.value);
            home()
            uni.showToast({
                title: '登录成功',
                icon: 'none'
            });
            isLoading.value = false
        }

    } catch (error) {
        isLoading.value = false
        console.error('登录流程异常:', error);
        uni.showToast({
            title: '登录失败,请检查网络',
            icon: 'none'
        });
    }
}

//读取cookes
function getUserInfo() {
    cookesUser.value = uni.getStorageSync('user');
}

/*确认微信登录*/
function WxChatLogin() {
    //如果点击确定就调用微信登录函数
    uni.showModal({
        title: '提示', // 标题（可选）
        content: '确定要使用微信账号进行登录或注册吗？', // 内容（可选）
        confirmText: '确定', // 确认按钮文字（可选，默认"确定"）
        cancelText: '取消', // 取消按钮文字（可选，默认"取消"）
        success: async (res) => { // 用户点击后的回调
            if (res.confirm) {
                await wechatLogin()
                console.log('用户点击了确定')
            } else if (res.cancel) {
                console.log('用户点击了取消')
            }
        }
    })
}

//退出登录
function outWxChatLogin() {
    uni.removeStorageSync('user')
    cookesUser.value = []
    uni.redirectTo({
        url: '/pages/Login/Login'
    });
    uni.showToast({
        title: '登出成功',
        icon: 'none'
    });
}

export function useLogin() {
    getUserInfo() //先读取一次cookes
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
    }
}