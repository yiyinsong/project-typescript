
/**
 * @description 登录
 */
interface LoginInterface {
    /**
     * @description 渲染登录页面
     * @param ctx koa上下文
     * @param next koa中间件next指针
     * @returns {Promise<void>}
     */
    login(ctx: any, next: any): Promise<void>;
    loginAction(ctx: any, next: any): Promise<void>;
    register(ctx: any, next: any): Promise<void>;
    registerAction(ctx: any, next: any): Promise<void>;
}
class LoginController implements LoginInterface{
    constructor() {

    }
    /**
     * @description 渲染登录页面
     */
    async login(ctx: any, next: any): Promise<void>{
        await ctx.render('login/login', {
            title: '登录'
        });
    }
    /**
     * @description 登录处理
     */
    async loginAction(ctx: any, next: any): Promise<void>{
        ctx.body = ctx.request.body;
    }
    /**
     * @description 渲染注册页面
     */
    async register(ctx: any, next: any): Promise<void>{
        await ctx.render('login/register', {
            title: '注册'
        });
    }
    /**
     * @description 注册处理
     */
    async registerAction(ctx: any, next: any): Promise<void>{
        ctx.body = ctx.request.body;
    }
}

export default LoginController;