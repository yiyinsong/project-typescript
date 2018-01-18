import * as mysql from 'mysql';
import DBConfig from '../config/db.config';

/**
 * Mysql类接口
 * @interface MysqlInterface
 */
interface MysqlInterface {
    init(): Promise<void>;
    query(sql: string, values?: any): Promise<any>;
}

/**
 * Mysql管理类
 * @class Mysql
 * @implements {MysqlInterface}
 */
class Mysql implements MysqlInterface{
    private pool: any;
    constructor() {

    }
    /**
     * 手动初始化mysql
     * @returns {Promise<void>} 初始化结果
     */
    public async init(): Promise<void> {
        this.pool = mysql.createPool({
            host: DBConfig.host,
            user: DBConfig.user,
            password: DBConfig.password,
            database: DBConfig.database
        });

        // 如果没有相关表，创建表user
        const sql_create_table_user: string = `
            create table if not exists users(
                id INT UNSIGNED AUTO_INCREMENT,
                name VARCHAR(100),
                tel CHAR(11) NOT NULL,
                email VARCHAR(30),
                password VARCHAR(100) NOT NULL,
                create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                update_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                icon VARCHAR(100),
                PRIMARY KEY(id)
            )ENGINE=InnoDB DEFAULT CHARSET=utf8
        `;
        await this.query(sql_create_table_user, {});
    }
    /**
     * 执行传入的sql语句
     * @param {string} sql sql语句
     * @param {any} values 新值
     * @return Promise<any> 返回一个promise包装后的对象
     */
    public query(sql: string, values?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: any, connection: any) => {
                if(err) {
                    resolve(err);
                }
                connection.query(sql, values, ( err: any, rows: any) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(rows);
                    }
                    connection.release()
                });
            });
        });
    }
}

const pool: Mysql = new Mysql();

export default pool;