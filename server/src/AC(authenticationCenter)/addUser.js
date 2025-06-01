import {pool} from "../../config/Mysql_db.mjs";
import {formatDateTime} from '../utils/CreateDate.mjs'
/*导入随机数*/
import getMathRandom from '../utils/getRandomNumber.mjs'
/*向mysql写入注册信息*/
export const writeInUser = async (req, res) => {
  const random = getMathRandom()
  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [req.query.email]);
    if (rows.length !== 0) {
      res.json({
        success: true, data: rows, code: 200,
      });
    } else if (rows.length == 0) {
      console.log(req.query.username)
      //插入用户的基础信息
      const [result] = await pool.query('INSERT INTO user SET username=?, email=?, avatar=?, status=1, user_role=1, created_at=?, updated_at=?', [
        req.query.username,
        req.query.email,
        req.query.avatar,
        req.query.created_at,
        req.query.updated_at,
      ]);
      // 查询刚插入的行
      const [row] = await pool.execute(
          'SELECT * FROM user WHERE id = ?',
          [result.insertId]
      );
      // 插入用户认证表（认证方式可以不用，后端验证，返回账号信息，token可以直接认证）
      await pool.query(
          `INSERT INTO user_auth
           SET user_id = ?, identity_type = 'email', identifier = ?, credential = ?`,
          [result.insertId, random, random]
      );
      res.json({
        success: true, data: row, code: 200,
      });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false, message: 'Server error', code: 500,
    });
  }
}

export function Add() {
  return {
    writeInUser
  }
}