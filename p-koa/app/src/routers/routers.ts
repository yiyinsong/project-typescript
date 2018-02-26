import * as Router from 'koa-router';
import * as Multer from 'koa-multer';
import * as path from 'path';

import { DataInterface } from "../common/interface";

import LoginController from '../controllers/login/login';

import AdminIndexController from '../admin/controllers/index/index';
import AdminUserController from '../admin/controllers/user/user';

const router: Router = new Router();

const storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./build/uploads/`)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const upload = Multer({storage: storage});

const loginController: LoginController = new LoginController();

const adminIndexController: AdminIndexController = new AdminIndexController();
const adminUserController: AdminUserController = new AdminUserController();


const fnIsLogin = async (ctx: any, next: any): Promise<any> => {
    return await loginController.alreadyLogged(ctx, next);
}


router.get('/', (ctx, next): void => {
    ctx.body = ctx.session;
});
// 登录
router.get('/login', async (ctx, next) => {
    await loginController.login(ctx, next);
});
//登录处理
router.post('/login/action', async (ctx, next) => {
    await loginController.loginAction(ctx, next);
});
// 注册
router.get('/register', async (ctx, next) => {
    await loginController.register(ctx, next);
});
// 注册处理
router.post('/register/action', async (ctx, next) => {
    await loginController.registerAction(ctx, next);
});
// 退出登录
router.get('/logout', async (ctx, next) => {
    await loginController.logout(ctx, next);
});

// 后台框架页面
router.get('/admin', fnIsLogin, async (ctx, next) => {
    await adminIndexController.init(ctx, next);
}); 
// 后台框架页面
router.get('/admin/index', fnIsLogin, async (ctx, next) => {
    await adminIndexController.init(ctx, next);
});
// 后台用户中心
router.get('/admin/user', fnIsLogin, async (ctx, next) => {
    await adminUserController.editInfo(ctx, next);
});
// 后台用户信息保存
router.post('/admin/user/saveinfo', async (ctx, next) => {
    await adminUserController.saveInfo(ctx, next);
});

// API图片上传
router.post('/api/upload', upload.single('imgs'), async (ctx: any, next: any) => {
    let r: DataInterface = {
        code: 1,
        message: '上传成功',
        data: `/uploads/${ctx.req.file.filename}`
    };
    ctx.body = r;
});

export default router;