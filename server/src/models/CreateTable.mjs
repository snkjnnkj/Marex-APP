import { pool } from '../../config/Mysql_db.mjs';

/**
 * 通用表创建器（支持批量/单表/自动重试）
 * @param {Array|Object} tables 表配置（支持批量）
 * @param {Object} [options] 高级选项
 * @param {boolean} [options.force=false] 强制重建（DROP IF EXISTS）
 * @param {number} [options.retry=1] 失败重试次数
 * @returns {Promise<Array>} 每个表的创建结果
 */
async function createTables(tables, options = {}) {
    const defaultOptions = {
        force: false,
        retry: 1,
        silent: false
    };
    const mergedOpts = { ...defaultOptions, ...options };

    // 标准化输入为数组
    const tableList = Array.isArray(tables) ? tables : [tables];
    const results = [];

    let connection;
    try {
        // 单连接处理所有表（提升性能）
        connection = await pool.getConnection();

        for (const [index, table] of tableList.entries()) {
            let retryCount = 0;
            const result = {
                name: table.name,
                exists: false,
                created: false,
                error: null
            };

            while (retryCount <= mergedOpts.retry) {
                try {
                    // 检查表是否存在
                    const [checkResult] = await connection.query(
                        `SELECT TABLE_NAME
                         FROM information_schema.TABLES
                         WHERE TABLE_SCHEMA = ?
                           AND TABLE_NAME = ?`,
                        [pool.database, table.name]
                    );

                    // 处理存在逻辑
                    if (checkResult.length > 0) {
                        result.exists = true;
                        if (mergedOpts.force) {
                            await connection.query(`DROP TABLE ${table.name}`);
                            result.exists = false;
                            if (!mergedOpts.silent) {
                                console.log(`[DB] 强制重建表 ${table.name}`);
                            }
                        }
                    }

                    // 执行创建逻辑
                    if (!result.exists || mergedOpts.force) {
                        const createSQL = mergedOpts.force
                            ? `CREATE TABLE ${table.name} ${table.definition}`
                            : `CREATE TABLE IF NOT EXISTS ${table.name} ${table.definition}`;

                        await connection.query(createSQL);
                        result.created = true;
                    }

                    break; // 成功则跳出重试循环
                } catch (err) {
                    if (retryCount === mergedOpts.retry) {
                        result.error = err.message;
                        if (!mergedOpts.silent) {
                            console.error(`[DB] 表 ${table.name} 创建失败:`, err.message);
                        }
                        break;
                    }
                    retryCount++;
                    await new Promise(res => setTimeout(res, 1000 * retryCount)); // 指数退避
                }
            }

            results.push(result);
        }

        return results;
    } catch (err) {
        console.error('[DB] 全局连接异常:', err.message);
        throw err;
    } finally {
        if (connection) connection.release();
    }
}

// 初始化所有表（带强制更新和错误重试）
export async function initializeDatabase(x, tableSchemas) {
    try {
        const results = await createTables(tableSchemas, {
            force: process.env.NODE_ENV === 'development', // 开发环境强制重建
            retry: 3,
            silent: false
        });
        const successTables = results.filter(r => r.created);
        console.log(`已成功创建 ${successTables.length}/${tableSchemas.length} 张表`, x);
        return results;
    } catch (err) {
        console.error('数据库初始化失败:', err);
        process.exit(1);
    }
}