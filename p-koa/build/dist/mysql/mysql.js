"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var db_config_1 = require("../config/db.config");
var Mysql = (function () {
    function Mysql() {
        this.pool = mysql.createPool({
            host: db_config_1.default.host,
            user: db_config_1.default.user,
            password: db_config_1.default.password,
            database: db_config_1.default.database
        });
    }
    Mysql.prototype.query = function (sql, values) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.pool.getConnection(function (err, connection) {
                if (err) {
                    resolve(err);
                }
                connection.query(sql, values, function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                    connection.release();
                });
            });
        });
    };
    return Mysql;
}());
exports.default = Mysql;
//# sourceMappingURL=mysql.js.map