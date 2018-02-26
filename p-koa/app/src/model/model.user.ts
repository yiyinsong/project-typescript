import mysql from '../mysql/mysql';
import { DataInterface } from "../common/interface";


class ModelUser {
    constructor() {
        
    }
    /**
     * 通过手机号码查询对应用户密码
     * @param {string} tel 手机号码
     * @returns {Promise<DataInterface>}
     */
    public async findByTel(tel: string): Promise<DataInterface> {
       try {
           const _sql_select_one: string = `select * from users where tel = ${tel}`;
           const _r: any[] = await mysql.query(_sql_select_one);
            if(_r.length > 0) {
                return {
                    code: 1,
                    message: '查询成功',
                    data: _r[0]
                }
            } else {
                return {
                    code: 0,
                    message: '用户不存在'
                }
            }
       } catch (err) {
           return {
               code: 0,
               message: '登录出错',
               data: err
           };
       }
    }
    /**
     * 插入一条用户记录
     * @param {string} tel 手机号码
     * @param {string} password 密码
     * @return {Promise<DataInterface>} DataInterface结构对象
     */
    public async insertOne(tel: string, password: string): Promise<DataInterface> {
        try {
            const _sql_user_exit: string = `select 1 from users where tel = ${tel} limit 1`;
            const _r: any[] = await mysql.query(_sql_user_exit);
            if(_r.length > 0) {
                return {
                    code: 0,
                    message: '手机号码已注册过'
                };
            } else {
                const _sql_user_insert = `insert into users (tel, password) values ("${tel}", "${password}")`;
                const _r = !!await mysql.query(_sql_user_insert);
                return {
                    code: _r ? 1 : 0,
                    message: _r ? '注册成功' : '注册失败'
                }
            }
        } catch (err) {
            return {
                code: 0,
                message: '注册出错',
                data: err
            };
        }
    }
    public async infoSave(ctx: any, info: any) {
        try {
            const _sql_info_save: string = `update users set name='${info.name}',email='${info.email}',icon='${info.icon}' where tel=${info.tel} limit 1`;
            const _r = !!await mysql.query(_sql_info_save);
            if(_r) {
                ctx.redirect('/admin');
            } else {
                ctx.body = '更新失败';
            }
        } catch (err) {
            ctx.body = err;
        }
    }
}

export default ModelUser;