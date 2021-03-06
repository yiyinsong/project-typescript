"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var koaStatic = require("koa-static");
var koaViews = require("koa-views");
var koaBodyParser = require("koa-bodyparser");
var path = require("path");
var session = require("koa-session-minimal");
var MysqlStore = require("koa-mysql-session");
var routers_1 = require("./routers/routers");
var mysql_1 = require("./mysql/mysql");
var db_config_1 = require("./config/db.config");
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
app.keys = ['koa mall'];
app.use(session({
    key: 'SESSION_ID',
    store: new MysqlStore({
        user: db_config_1.default.user,
        password: db_config_1.default.password,
        database: db_config_1.default.database,
        host: db_config_1.default.host
    }),
    cookie: {
        maxAge: 86400000
    }
}));
app.use(routers_1.default.routes())
    .use(routers_1.default.allowedMethods());
app.listen(3000);
