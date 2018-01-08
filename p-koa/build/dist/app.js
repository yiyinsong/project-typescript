"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var koaStatic = require("koa-static");
var koaViews = require("koa-views");
var koaBodyParser = require("koa-bodyparser");
var path = require("path");
var routers_1 = require("./routers/routers");
var mysql_1 = require("./mysql/mysql");
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
mysql_1.default.init();
app.use(routers_1.default.routes())
    .use(routers_1.default.allowedMethods());
app.listen(3000);
