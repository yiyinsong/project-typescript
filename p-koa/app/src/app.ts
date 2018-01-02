/**
 * @description 入口文件
 */

import * as Koa from 'koa';
import * as koaStatic from 'koa-static';
import * as koaViews from 'koa-views';
import * as koaRouter from 'koa-router';
import * as koaBodyParser from 'koa-bodyparser';
import * as path from 'path';

const app = new Koa();

app.use(koaBodyParser());
app.use(koaStatic(path.join(__dirname, '../../build')));
app.use(koaViews(path.join(__dirname, '../../views'), {
    map: { 
        html: 'pug',
        pug: 'pug'
    },
    extension: 'pug'
}));

console.log('start');

app.listen(3000);