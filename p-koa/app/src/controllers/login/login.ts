/**
 * 用户数据库操作类
 */
import * as bcryptjs from 'bcryptjs';
import ModelUser from '../../model/model.user';
import {DataInterface} from "../../common/interface";

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
    // 密码加密生成salt的迭代次数
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
     * @private
     * @params {string} password 用户输入密码
     * @params {string} hash 加密后的密码
     * @return {Promise<boolean>} 密码对比结果
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
        // 获取用户提交过来的数据
        const _user: UserDataInterface =  ctx.request.body.user;
        // 查询用户密码是否存在
        const _r: DataInterface = await modelUser.findByTel(_user.tel);
        // 如果用户存在
        if(_r.code === 1) {
            // 比对数据库密码与传递过来密码
            const _compare_result: boolean = await this.validate(_user.password, _r.data.password);
            // 如果插入成功
            if(_compare_result) {
                ctx.session.user = _r.data;
                console.log(ctx.session.user);
                ctx.redirect('/');
            } else {
                ctx.body = '登录失败，密码错误';
            }
        } else {
            ctx.body = _r;
        }
    }

    // 渲染注册页面
    async register(ctx: any, next: any): Promise<void>{
        await ctx.render('login/register', {
            title: '注册'
        });
    }

    // 注册处理
    async registerAction(ctx: any, next: any): Promise<void>{
        // 获取用户提交过来的数据
        const _user: UserDataInterface =  ctx.request.body.user;
        // 加密传递过来的密码
        const _bcryptjsPassword: string = await this.encrypt(_user.password);
        // 向数据库中插入一条数据
        const _r: DataInterface = await modelUser.insertOne(_user.tel, _bcryptjsPassword);
        // 如果插入成功
        if(_r.code === 1) {
            ctx.redirect('/login');
        } else {
            ctx.body = _r;
        }
    }
}

export default LoginController;