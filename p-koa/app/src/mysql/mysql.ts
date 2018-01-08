import * as mysql from 'mysql';
import DBConfig from '../config/db.config';

/**
 * @description 创建Mysql类接口
 */
interface MysqlInterface {
    init(): Promise<void>;
    query(sql: string, values: any): Promise<any>;
}

/**
 * @description 创建Mysql类
 */

class Mysql implements MysqlInterface{
    private pool: any;
    constructor() {

    }
    /**
     * @description 手动初始化
     */
    async init(): Promise<void> {
        this.pool = mysql.createPool({
            host: DBConfig.host,
            user: DBConfig.user,
            password: DBConfig.password,
            database: DBConfig.database
        });
        /**
         * @description 创建表user
         */
        const sql_create_table_user: string = `
            create table if not exists users(
                id INT UNSIGNED AUTO_INCREMENT,
                name VARCHAR(100),
                tel CHAR(11) NOT NULL,
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
     * @description 执行传入的sql语句
     * @param sql sql语句
     * @param values 新值
     * @return Promise<any> 返回一个promise包装后的对象
     */
    query(sql: string, values: any): Promise<any> {
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