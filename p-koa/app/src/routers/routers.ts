import * as Router from 'koa-router';

import LoginController from '../controllers/login/login';

const router: Router = new Router();

const loginController: LoginController = new LoginController();

router.get('/', (ctx, next): void => {
    ctx.body = 'haha';
});

router.get('/login', async (ctx, next) => {
    await loginController.login(ctx, next);
});
router.post('/login/action', async (ctx, next) => {
    await loginController.loginAction(ctx, next);
});
router.get('/register', async (ctx, next) => {
    await loginController.register(ctx, next);
});
router.post('/register/action', async (ctx, next) => {
    await loginController.registerAction(ctx, next);
});

export default router;