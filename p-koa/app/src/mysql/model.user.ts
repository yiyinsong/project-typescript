import * as mysql from './mysql';
class ModelUser {
    constructor() {
        
    }

    /**
     *
     * @param {string} tel 手机号码
     * @param {string} password 密码
     */
    addUser(tel: string, password: string){
        const _sql_user_exit = `select 1 from users where tel = ${tel} limit 1`;
    }
}

export default ModelUser;