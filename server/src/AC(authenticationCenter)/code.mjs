import fs from 'fs';
import path from 'path';
/*mysql数据库连接池配置*/
import { pool } from "../../config/Mysql_db.mjs"
/*导入随机数用于发送验证码*/
import getMathRandom from '../utils/getRandomNumber.mjs'
/*导入发送邮件中间件*/
import nodemailer from 'nodemailer'
// 创建QQ邮箱的邮件发送对象
const from = '3863124009@qq.com'
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
        user: from, pass: 'mdfsrchfmaomcgfd'// 注意这里不是QQ密码，而是授权码
    }
})
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 定义 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadTemplate() {
    const templatePath = path.join(__dirname, 'EmliHTML', 'email.html');
    try {
        return fs.readFileSync(templatePath, 'utf8'); // 直接返回 HTML 内容
    } catch (err) {
        console.error('读取模板失败:', err);
        throw err;
    }
}

const getVerificationCode = async (req, res) => {
    const { mailbox, content } = req.body.params;
    console.log(mailbox);
    // 生成验证码，这里简单示例为6位随机数字
    const verificationCode = getMathRandom();
    const mailOptions = {
        from: from,
        to: mailbox,
        subject: '系统验证码',
        text: `【平台验证】验证码为${verificationCode}，${content}`
    };
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            res.json({
                data: '该账号不存在', code: 500,
            });
        } else {
            res.json({
                data: verificationCode, code: 200,
            });
        }
    });
}
const useSucceed = async (req, res) => {
    const { mailbox, content } = req.body.params;
    const verificationCode = getMathRandom();
    const mailOptions = {
        from: from,
        to: mailbox,
        subject: '消息提示',
        text: `${content}`,
    };
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            res.json({
                data: '该账号不存在', code: 500,
            });
        } else {
            res.json({
                data: verificationCode, code: 200,
            });
        }
    });
}


export function Code() {
    return {
        getVerificationCode, useSucceed
    }
}