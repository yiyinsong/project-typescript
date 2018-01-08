/**
 * @description 入口文件
 */

import * as Koa from 'koa';
import * as koaStatic from 'koa-static';
import * as koaViews from 'koa-views';
import * as koaBodyParser from 'koa-bodyparser';
import * as path from 'path';
import router from './routers/routers';
import mysql from './mysql/mysql';

/**
 * @description 实例化一个app对象
 */
const app: Koa = new Koa();

/**
 * @description 实例app使用相应中间件
 * @middleware koa-bodyparser 解析表单数据
 * @middleware koa-static 设置静态目录
 * @middleware koa-views  设置模板目录
 */
app.use(koaBodyParser());
app.use(koaStatic(path.join(__dirname, '../../build')));
app.use(koaViews(path.join(__dirname, '../../views'), {
    map: { 
        html: 'pug',
        pug: 'pug'
    },
    extension: 'pug'
}));
/**
 * @description 引入mysql并初始化一个mysql连接池
 */
mysql.init();
/**
 * @description 使用路由
 */
app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);