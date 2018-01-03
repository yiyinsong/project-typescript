/**
 * @description 入口文件
 */

import * as Koa from 'koa';
import * as koaStatic from 'koa-static';
import * as koaViews from 'koa-views';
import * as koaBodyParser from 'koa-bodyparser';
import * as path from 'path';
import router from './routers/routers';

const app: Koa = new Koa();

app.use(koaBodyParser());
app.use(koaStatic(path.join(__dirname, '../../build')));
app.use(koaViews(path.join(__dirname, '../../views'), {
    map: { 
        html: 'pug',
        pug: 'pug'
    },
    extension: 'pug'
}));

app.use(router.routes())
    .use(router.allowedMethods());

console.log('start');

app.listen(3000);