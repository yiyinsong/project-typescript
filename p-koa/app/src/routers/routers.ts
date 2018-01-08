import * as Router from 'koa-router';

import LoginController from '../controllers/login/login';

const router: Router = new Router();

const loginController: LoginController = new LoginController();

router.get('/', (ctx, next): void => {
    ctx.body = 'haha';
});

router.get('/login', loginController.login);
router.post('/login/action', loginController.loginAction);
router.get('/register', loginController.register);
router.post('/register/action', loginController.registerAction);

export default router;