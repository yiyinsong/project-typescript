/*
 * 后台首页控制器
 */

import ModelUser from "../../../model/model.user";

const modelUser: ModelUser = new ModelUser();

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
        const _info = await modelUser.findByTel(ctx.session.user.tel);
        await ctx.render('admin/index/index', {
            title: '商城后台',
            data: _info.data || {}
        });
    }
}

export default AdminIndexController;