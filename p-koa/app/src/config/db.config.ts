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
    public static port:number = 3306;
    public static host:string = 'localhost';
    public static user:string = 'root';
    public static password:string = 'xiaosong999';
    public static database:string = 'koamall';
}

export default DBConfig;