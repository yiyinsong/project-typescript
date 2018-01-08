"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var login_1 = require("../controllers/login/login");
var router = new Router();
var loginController = new login_1.default();
router.get('/', function (ctx, next) {
    ctx.body = 'haha';
});
router.get('/login', loginController.login);
router.post('/login/action', loginController.loginAction);
router.get('/register', loginController.register);
router.post('/register/action', loginController.registerAction);
exports.default = router;
