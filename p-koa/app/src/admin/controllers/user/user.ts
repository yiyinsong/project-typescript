/*
 * 用户中心
 */

import ModelUser from "../../../model/model.user";

const modelUser: ModelUser = new ModelUser();

interface AdminUserInfoInterface {
    editInfo(ctx: any, next: any): Promise<void>
    saveInfo(ctx: any, next: any): Promise<void>
}

class AdminUserInfo implements AdminUserInfoInterface{
    constructor() {}

    public async editInfo(ctx: any, next: any): Promise<void> {
        const _info = await modelUser.findByTel(ctx.session.user.tel);
        await ctx.render('admin/user/userinfo', {
            title: '用户中心',
            data: _info.data || {}
        });
    }

    public async saveInfo(ctx: any, next: any): Promise<void> {
        const info = ctx.request.body;
        if(info.name == '') {
           ctx.body = '请填写用户名称';
        } else if(info.tel == '') {
            ctx.body = '用户不存在';
        } else if(info.email == '') {
            ctx.body = '请填写用户邮箱';
        } else if(info.icon == '') {
            ctx.body = '请上传用户头像';
        } else {
            await modelUser.infoSave(ctx, info);
        }
    }
}

export default AdminUserInfo;