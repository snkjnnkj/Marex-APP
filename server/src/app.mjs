import express from 'express'
/*导入https模块*/
import https from "https";
import http from "http";
import path from 'path';
/*导入fs模块*/
import fs from "fs";
import cors from 'cors'
//创建数据库
import {initializeDatabase} from './models/CreateTable.mjs'
import {CommunicationProject} from './models/index.mjs'
//导入路由
import router from './router/index.mjs'
// 声明端口（支持环境变量配置）
const PORT = process.env.PORT || 3005;
const app = express()

// 统一启动入口
async function bootstrap() {
    try {
        // 第一步：初始化数据库
        await initializeDatabase('uni-app项目', CommunicationProject);
        console.log('[Init] 数据库准备就绪');
        // 第二步：挂载中间件
        app.use(express.json());
        app.use(cors());
        app.use('/app', router);
        //配置静态头像目录
        app.use('/uploads', express.static(path.join('uploads')));
        app.use('/public', express.static(path.join('public')));
        // --- 全局错误处理（保证所有异常均返回 JSON） ---
        app.use((err, req, res, next) => {
            console.error(err);
            res.status(500).json({success: false, message: '后台数据错误清联系管理员'});
        });
        console.log('[Init] 中间件加载完成');
        app.listen(PORT, '0.0.0.0', () => {
            console.log('[server]运行在端口：http://lcalhost:' + PORT)
        })
        // const options = {
        //     key: fs.readFileSync('./SSL/private.pem'),
        //     cert: fs.readFileSync('./SSL/fullchain.crt')
        // };
        // https.createServer(options, app).listen(PORT, () => {
        //     console.log('HTTPS Server running on port' + PORT);
        // });
    } catch (err) {
        console.error('[Fatal] 启动失败:', err);
        process.exit(1);
    }
}

export function useApp() {
    return {
        bootstrap,
    }
}