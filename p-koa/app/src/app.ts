import * as Koa from 'koa';
import * as koaStatic from 'koa-static';
import * as koaViews from 'koa-views';
import * as koaBodyParser from 'koa-bodyparser';
import * as path from 'path';
import * as session from 'koa-generic-session';
import * as MysqlStore from 'koa-mysql-session';
import router from './routers/routers';
import mysql from './mysql/mysql';
import DBConfig from './config/db.config';

// 实例化一个app对象
const app: Koa = new Koa();

const THIRTY_MINTUES: number = 30 * 60 * 1000;
app.keys = ['koa mall'];
app.use(session({
    store: new MysqlStore({
        user: DBConfig.user,
        password: DBConfig.password,
        database: DBConfig.database,
        host: DBConfig.host
    }),
    rolling: true,
    cookie: {
        maxAge:THIRTY_MINTUES
    }
}))
/**
 * 实例app使用相应中间件
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

// 引入mysql并初始化一个mysql连接池
mysql.init();

// 使用路由
app.use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);