/*
 * @description 路由
 */
import * as Router from 'koa-router';

import LoginController from '../controllers/login/login';

const router: Router = new Router();

const loginController: LoginController = new LoginController();

router.get('/', (ctx, next): void => {
    console.log(typeof ctx, typeof next);
    ctx.body = 'haha';
});

router.get('/login', loginController.login);

export default router;