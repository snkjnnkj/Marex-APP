import crypto from 'crypto';

/**
 * 解密微信加密数据
 * @param {string} encryptedData 加密数据
 * @param {string} iv 加密向量
 * @param {string} sessionKey 微信会话密钥
 * @returns {object} 解密后的用户信息
 */
export function decryptData(encryptedData, iv, sessionKey) {
    try {
        // 创建解密器
        const decipher = crypto.createDecipheriv(
            'aes-128-cbc',
            Buffer.from(sessionKey, 'base64'),
            Buffer.from(iv, 'base64')
        );

        // 执行解密
        let decoded = decipher.update(
            Buffer.from(encryptedData, 'base64'),
            undefined,
            'utf8'
        );
        decoded += decipher.final('utf8');

        return JSON.parse(decoded);
    } catch (error) {
        console.error('解密失败:', error);
        throw new Error('数据解密失败');
    }
}