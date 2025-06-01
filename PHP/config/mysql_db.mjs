import mysql from 'mysql2/promise'
// require('dotenv').config();
export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'Acq335.5',
    database: 'xsh',
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0,
    // 核心配置：
    idleTimeout: 60000,          // 空闲连接60秒后释放
    enableKeepAlive: true,       // 启用保活机制
    keepAliveInitialDelay: 0,    // 立即开始发送保活探测
    connectTimeout: 10000,       // 连接超时时间
    acquireTimeout: 10000,       // 获取连接超时时间
    maxIdle: 5,                  // 最大空闲连接数（避免过多闲置）
});
// 定期发送轻量级查询（如SELECT 1）保持连接活跃
setInterval(() => {
    pool.query('SELECT 1');
}, 300000); // 5分钟一次（需小于数据库的 wait_timeout）