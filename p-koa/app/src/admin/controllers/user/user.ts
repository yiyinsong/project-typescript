/*
 * 用户中心
 */

interface AdminUserInfoInterface {
    editInfo(ctx: any, next: any): Promise<void>
}

class AdminUserInfo implements AdminUserInfoInterface{
    constructor() {}

    public async editInfo(ctx: any, next: any): Promise<void> {
        await ctx.render('admin/user/userinfo', {
            title: '用户中心',
            data: ctx.session.user || {} 
        });
    }
}

export default AdminUserInfo;