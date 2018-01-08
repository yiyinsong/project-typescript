/**
 * 用户数据库操作类
 */
import * as bcryptjs from 'bcryptjs';
import ModelUser from '../../model/model.user';
const modelUser: ModelUser = new ModelUser();

/**
 * 登录接口
 * @interface LoginInterface
 */
interface LoginInterface {
    /**
     * @param ctx koa上下文
     * @param next koa中间件next指针
     * @returns {Promise<void>}
     */
    login(ctx: any, next: any): Promise<void>;
    loginAction(ctx: any, next: any): Promise<void>;
    register(ctx: any, next: any): Promise<void>;
    registerAction(ctx: any, next: any): Promise<void>;
}

/**
 * 用户数据格式接口
 * @interface UserDataInterface
 */
interface UserDataInterface {
    readonly tel: string,
    readonly password: string
}

/**
 * @class LoginController
 * @implements {LoginInterface}
 */
class LoginController implements LoginInterface{
    constructor() {

    }
    //密码加密生成salt的迭代次数
    private passwordSaltRounds: number = 10; 
    /**
     * 密码加盐加密
     * @private
     * @params {string} password 用户输入密码
     * @return {Promise<string>} 加密后的密码.
     */
    private async encrypt (password: string): Promise<string> {
        const salt = await  bcryptjs.genSalt(this.passwordSaltRounds);
        const hash = await bcryptjs.hash(password, salt);
        return hash;
    }
    /**
     * 比对密码与加密后代码是否一致
     * @params {string} password 用户输入密码
     * @params {string} hash 加密后的密码
     * @return {boolean} 密码对比结果
     */
    private async validate (password: string, hash: string): Promise<boolean> {
        return await bcryptjs.compare(password, hash);
    }
    
    
    // 渲染登录页面
    async login(ctx: any, next: any): Promise<void>{
        await ctx.render('login/login', {
            title: '登录'
        });
    }

    // 登录处理
    async loginAction(ctx: any, next: any): Promise<void>{
        ctx.body = ctx.request.body;
    }

    // 渲染注册页面
    async register(ctx: any, next: any): Promise<void>{
        await ctx.render('login/register', {
            title: '注册'
        });
    }

    // 注册处理
    async registerAction(ctx: any, next: any): Promise<void>{
        const _user: UserDataInterface =  ctx.request.body.user;
        const bcryptjsPassword: string = await this.encrypt(_user.password);
        console.log(await modelUser.insertOne(_user.tel, bcryptjsPassword));
    }
}

export default LoginController;