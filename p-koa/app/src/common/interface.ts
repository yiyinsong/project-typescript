/**
 * 返回数据接口
 *  @interface DataInterface
 *  @param {number} code 数据错误码
 *  @param {string} message 信息提示
 *  @param {any} data 数据内容
 *  @param {any} propName 其余未确定数据
 */
export interface DataInterface {
    readonly code: number;
    readonly message: string;
    readonly data?: any;
    [propName: string]: any
}
