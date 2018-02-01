import * as fs from 'fs';
import * as path from 'path';
import { DataInterface } from "../common/interface";
import UlpoadConfig from '../config/upload.config';

/**
 * @interface UploadInterface
 */
interface UploadInterface {
    start(ctx: any, next: any): Promise<DataInterface>
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
    public async start(ctx: any, next: any): Promise<DataInterface> {


        let r: DataInterface;

        const fields = ctx.request.body.fields;
        const file = ctx.request.body.files.file;
    	if(!file){
            r = {
    			code: 0,
    			message: '参数错误'
    		};
        } else if(!fields.rootPath) {
    		r = {
    			code: 0,
    			message: '请传入rootPath'
    		};
    	} else {
    		//判断系统是否存在rootPath路径，没有先循环创建目录
    		const rootPaths = (UlpoadConfig.path + fields.rootPath).split('/');
    		let p = '';
    		while(rootPaths.length) { 
    			p += rootPaths.shift() + '/';
    			if (!fs.existsSync(p)) {
    				fs.mkdirSync(p);
    			}
    		}
    		//上传图片
    		const fileName = new Date().getTime() + file.name.substr(file.name.lastIndexOf('.'));
    		const reader = fs.createReadStream(file.path);
    		const writer = fs.createWriteStream(UlpoadConfig.path + fields.rootPath + '/' + fileName);
    		reader.pipe(writer);
    		const currentPath = UlpoadConfig.webPath + fields.rootPath + '/' + fileName;
    
            r = {
                code: 1,
                message: '上传成功',
                data: ctx.request.body
            };
    
            return r;
        }
    }
}

export default Upload;