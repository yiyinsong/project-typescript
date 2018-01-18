import {DataInterface} from "../common/interface";

/**
 * @interface UploadInterface
 */
interface UploadInterface {
    start(ctx: any, next: any): Promise<void>
}

class Upload implements UploadInterface{
    /**
     * 开始上传图片
     * @type API数据接口
     * @method start
     * @param {*} ctx 
     * @param {*} next 
     * @returns {Promise<DataInterface>} 
     */
    public async start(ctx: any, next: any): Promise<void> {

        let r: DataInterface;

        r = {
            code: 1,
            message: '上传成功',
            data: ctx.request.body
        };

        ctx.body = r;
    }
}

export default Upload;