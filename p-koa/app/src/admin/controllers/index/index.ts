/*
 * 后台首页控制器
 */
interface AdminIndexInterface {
    init(ctx: any, next: any): Promise<void>
}

class AdminIndexController implements AdminIndexInterface {
    constructor() {

    }
    /**
     * 渲染后台框架页面
     * @param {*} ctx 
     * @param {*} next 
     * @returns {Promise<void>} 
     */
    public async init(ctx: any, next: any): Promise<void> {
        await ctx.render('admin/index/index', {
            title: '商城后台',
            data: ctx.session.user || {}
        });
    }
}

export default AdminIndexController;