/**
 * @description 登录
 */
interface LoginInterface {
    login(ctx: any, next: any): Promise<void>;
}
class LoginController implements LoginInterface{
    constructor() {

    }
    /**
     * @description 渲染登录页面
     * @param ctx koa上下文
     * @param next koa中间件next指针
     * @returns {Promise<void>}
     */
    public async login(ctx: any, next: any): Promise<void>{
        await ctx.render('login/login', {
            title: '登录'
        });
    }
}

export default LoginController;