import mysql from '../mysql/mysql';
class ModelUser {
    constructor() {
        
    }

    /**
     * 插入一条用户记录
     * @param {string} tel 手机号码
     * @param {string} password 密码
     * @return {Promise<any>} promise执行函数
     */
    async insertOne(tel: string, password: string): Promise<any>{
        const _sql_user_exit: string = `select 1 from users where tel = ${tel} limit 1`;
        const _r: any[] = await mysql.query(_sql_user_exit, {});
        if(_r.length > 0) {
            return false;
        } else {
            return true;
        }
    }
}

export default ModelUser;