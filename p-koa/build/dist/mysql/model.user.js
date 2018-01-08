"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelUser = (function () {
    function ModelUser() {
    }
    ModelUser.prototype.addUser = function (tel, password) {
        var _sql_user_exit = "select 1 from users where tel = " + tel + " limit 1";
    };
    return ModelUser;
}());
exports.default = ModelUser;
