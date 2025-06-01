import axios from "axios";
import {decryptData} from "../utils/crypto-helper.js";
import {handleWechatLogin} from "./wechat-login.mjs";
import {generate_WIT} from "../utils/auth.mjs";
// 从环境变量获取配置（建议使用 dotenv 管理）
const WX_APPID = process.env.WX_APPID || 'wxcf14c8380a50f59c';
const WX_APPSECRET = process.env.WX_APPSECRET || '374b879069beb78d356648ba259f74b0';
const wechatLogin = async (req, res) => {
    try {
        // ...之前获取openid和session_key的代码...
        const {code} = req.body;
        // 调用微信接口
        const wxResponse = await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
            params: {
                appid: WX_APPID,
                secret: WX_APPSECRET,
                js_code: code,
                grant_type: 'authorization_code'
            }
        });
        const {openid, session_key} = wxResponse.data;
        // 获取微信用户信息（需前端传递加密数据）
        const {encryptedData, iv} = req.body;
        const wechatUserInfo = decryptData(encryptedData, iv, session_key);
        // 处理数据库操作
        const userInfo = await handleWechatLogin(openid, session_key, wechatUserInfo);
        // 生成JWT
        const token = generate_WIT(userInfo.id);
        res.json({
            success: true,
            token,
            user: userInfo,
            code: 200
        });
    } catch (error) {
        // ...错误处理...
        console.log(error)
    }
}

export function WxChat() {
    return {
        wechatLogin
    }
}