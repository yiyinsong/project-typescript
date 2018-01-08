/**
 * 数据库配置类
 * @class DBConfig
 * @static {number} port 数据库连接端口
 * @static {string} host 数据库域名地址
 * @static {string} user 数据库账号
 * @static {string} password 数据库密码
 * @static {string} database 项目数据库名称
 */
class DBConfig {
    static port:number = 3306;
    static host:string = 'localhost';
    static user:string = 'root';
    static password:string = 'xiaosong999';
    static database:string = 'koamall';
}

export default DBConfig;