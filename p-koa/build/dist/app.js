"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var koaStatic = require("koa-static");
var koaViews = require("koa-views");
var koaBodyParser = require("koa-bodyparser");
var path = require("path");
var routers_1 = require("./routers/routers");
var app = new Koa();
app.use(koaBodyParser());
app.use(koaStatic(path.join(__dirname, '../../build')));
app.use(koaViews(path.join(__dirname, '../../views'), {
    map: {
        html: 'pug',
        pug: 'pug'
    },
    extension: 'pug'
}));
app.use(routers_1.default.routes())
    .use(routers_1.default.allowedMethods());
console.log('start');
app.listen(3000);
