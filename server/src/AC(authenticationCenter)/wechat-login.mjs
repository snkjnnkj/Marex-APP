import {pool} from "../../config/Mysql_db.mjs";
import {ROLES} from '../../config/constant.mjs'

// 微信登录处理
export async function handleWechatLogin(openid, sessionKey, wechatUserInfo) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        // 1. 检查是否已有微信认证
        const [authRows] = await connection.query(
            `SELECT user_id
             FROM user_auth
             WHERE identity_type = 'weixin'
               AND identifier = ?`,
            [openid]
        );
        // 2. 已有绑定用户
        if (authRows.length > 0) {
            const userId = authRows[0].user_id;
            // 更新session_key（可选）
            await connection.query(
                `UPDATE user_auth
                 SET credential = ?
                 WHERE identity_type = 'weixin'
                   AND identifier = ?`,
                [sessionKey, openid]
            );
            return getFullUserInfo(connection, userId);
        }
        // 3. 新用户注册
        // 生成唯一用户名（示例：微信昵称+随机数）
        const baseUsername = wechatUserInfo.nickName || `wxuser_${openid.slice(-4)}`;
        let finalUsername = baseUsername;
        let retryCount = 0;
        // 处理用户名冲突
        while (retryCount < 3) {
            try {
                // 插入用户信息表
                const [userResult] = await connection.query(
                    `INSERT INTO user
                     SET username = ?, avatar = ?, status = 1,user_role=?`,
                    [finalUsername, wechatUserInfo.avatarUrl || null, '1']
                );
                // 插入用户认证表
                await connection.query(
                    `INSERT INTO user_auth
                     SET user_id = ?, identity_type = 'weixin', identifier = ?, credential = ?`,
                    [userResult.insertId, openid, sessionKey]
                );
                await connection.commit();
                return getFullUserInfo(connection, userResult.insertId);
            } catch (err) {
                if (err.code === 'ER_DUP_ENTRY' && err.sqlMessage.includes('uniq_username')) {
                    finalUsername = `${baseUsername}_${Math.floor(Math.random() * 1000)}`;
                    retryCount++;
                    continue;
                }
                throw err;
            }
        }
        throw new Error('用户名生成失败，请稍后重试');
    } finally {
        connection.release();
    }
}

// 获取完整用户信息
async function getFullUserInfo(connection, userId) {
    const [userRows] = await connection.query(
        `SELECT *
         FROM user
         WHERE id = ?`,
        [userId]
    );
    return {
        ...userRows[0],
    };
}