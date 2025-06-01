import {pool} from "../../config/Mysql_db.mjs";

const setAvatar = async (req, res) => {
  console.log(req.query.price);
  console.log(req.body.params.price);
  
  try {
    // 1. 先查询数据是否存在
    const [rows] = await pool.query(
        'SELECT * FROM user WHERE id = ?',
        [req.body.params.id]
    );
    if (rows.length === 0) {
      throw new Error('Record not found');
    }
    // 2. 执行更新操作（示例修改字段名为 target_column）
    const [Result] = await pool.query(
        'UPDATE user SET avatar = ? WHERE id = ?',
        [req.body.params.price, req.body.params.id]
    );
    // 3. 查询刚才上传的数据返回给前端
    const [row] = await pool.query('SELECT * FROM user WHERE id = ?', [req.body.params.id]);
    res.json({
      success: true, data: row, code: 200,
    });
  } catch (e) {
    return
  }
}
const setName = async (req, res) => {
  try {
    // 1. 先查询数据是否存在
    const [rows] = await pool.query(
        'SELECT * FROM user WHERE id = ?',
        [req.query.id]
    );
    if (rows.length === 0) {
      throw new Error('Record not found');
    }
    // 2. 执行更新操作（示例修改字段名为 target_column）
    const [Result] = await pool.query(
        'UPDATE user SET username = ? WHERE id = ?',
        [req.query.price, req.query.id]
    );
    // 3. 查询刚才上传的数据返回给前端
    const [row] = await pool.query('SELECT * FROM user WHERE id = ?', [req.query.id]);
    res.json({
      success: true, data: row, code: 200,
    });
  } catch (e) {
    return
  }
}
const setSex = async (req, res) => {
  try {
    // 1. 先查询数据是否存在
    const [rows] = await pool.query(
        'SELECT * FROM user WHERE id = ?',
        [req.query.id]
    );
    if (rows.length === 0) {
      throw new Error('Record not found');
    }
    // 2. 执行更新操作（示例修改字段名为 target_column）
    const [Result] = await pool.query(
        'UPDATE user SET sex = ? WHERE id = ?',
        [req.query.price, req.query.id]
    );
    // 3. 查询刚才上传的数据返回给前端
    const [row] = await pool.query('SELECT * FROM user WHERE id = ?', [req.query.id]);
    res.json({
      success: true, data: row, code: 200,
    });
  } catch (e) {
    return
  }
}
const setEmail = async (req, res) => {
  try {
    // 1. 先查询数据是否存在
    const [rows] = await pool.query(
        'SELECT * FROM user WHERE id = ?',
        [req.query.id]
    );
    if (rows.length === 0) {
      throw new Error('Record not found');
    }
    // 2. 执行更新操作（示例修改字段名为 target_column）
    const [Result] = await pool.query(
        'UPDATE user SET email = ? WHERE id = ?',
        [req.query.price, req.query.id]
    );
    // 3. 查询刚才上传的数据返回给前端
    const [row] = await pool.query('SELECT * FROM user WHERE id = ?', [req.query.id]);
    res.json({
      success: true, data: row, code: 200,
    });
  } catch (e) {
    return
  }
}
const setPhone = async (req, res) => {
  try {
    // 1. 先查询数据是否存在
    const [rows] = await pool.query(
        'SELECT * FROM user WHERE id = ?',
        [req.body.params.id]
    );
    if (rows.length === 0) {
      throw new Error('Record not found');
    }
    // 2. 执行更新操作（示例修改字段名为 target_column）
    const [Result] = await pool.query(
        'UPDATE user SET phone = ? WHERE id = ?',
        [req.body.params.price, req.body.params.id]
    );
    // 3. 查询刚才上传的数据返回给前端
    const [row] = await pool.query('SELECT * FROM user WHERE id = ?', [req.body.params.id]);
    console.log(row)
    res.json({
      success: true, data: row, code: 200,
    });
  } catch (e) {
    return
  }
}
const setTeacher = async (req, res) => {
  try {
    // 1. 先查询数据是否存在
    const [rows] = await pool.query(
        'SELECT * FROM user WHERE id = ?',
        [req.query.id]
    );
    if (rows.length === 0) {
      throw new Error('Record not found');
    }
    /* 查询数据库是否有该数据 */
    const [res] = await pool.query(
        'SELECT * FROM teachernuber WHERE nuber = ?',
        [req.query.price]
    );
    if (res.length == 0) {
      console.log(res.length)
      res.json({
        success: true, data: '您不是教师', code: 200,
      });
      return
    }
    // 2. 执行更新操作（示例修改字段名为 target_column）
    const [Result] = await pool.query(
        'UPDATE user SET teacher = ? WHERE id = ?',
        [req.query.price, req.query.id]
    );
    // 3. 查询刚才上传的数据返回给前端
    const [row] = await pool.query('SELECT * FROM user WHERE id = ?', [req.query.id]);
    console.log(row)
    res.json({
      success: true, data: row, code: 200,
    });
  } catch (e) {
    return
  }
}

export function set() {
  return {
    setAvatar,
    setName,
    setSex,
    setEmail,
    setPhone,
    setTeacher
  }
}