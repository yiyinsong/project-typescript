/**
 * 数据库配置类
 * @class DBConfig
 * @static {string} path 上传图片服务器地址
 * @static {string} webPath 图片访问地址
 */
class UploadConfig {
    public static path: string = '/build/uploads/';
    public static webPath: string = '/uploads/';
}

export default UploadConfig;