import * as mysql from 'mysql';
import DBConfig from '../config/db.config';

/**
 * @description 创建Mysql类接口
 */
interface MysqlInterface {
    query(sql: string, values: any): Promise<any>
}

/**
 * @description 创建Mysql类
 */

class Mysql implements MysqlInterface{
    private pool: any;
    constructor() {
        this.pool = mysql.createPool({
            host: DBConfig.host,
            user: DBConfig.user,
            password: DBConfig.password,
            database: DBConfig.database
        });
    }
    /**
     * @description 执行传入的sql语句
     * @param sql sql语句
     * @param values 新值
     * @return Promse<any> 返回一个promise包装后的对象
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

export default Mysql;