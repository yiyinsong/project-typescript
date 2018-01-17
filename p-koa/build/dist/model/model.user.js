"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = require("../mysql/mysql");
var ModelUser = (function () {
    function ModelUser() {
    }
    ModelUser.prototype.findByTel = function (tel) {
        return __awaiter(this, void 0, void 0, function () {
            var _sql_select_one, _r, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _sql_select_one = "select * from users where tel = " + tel;
                        return [4, mysql_1.default.query(_sql_select_one)];
                    case 1:
                        _r = _a.sent();
                        if (_r.length > 0) {
                            return [2, {
                                    code: 1,
                                    message: '查询成功',
                                    data: _r[0]
                                }];
                        }
                        else {
                            return [2, {
                                    code: 0,
                                    message: '用户不存在'
                                }];
                        }
                        return [3, 3];
                    case 2:
                        err_1 = _a.sent();
                        return [2, {
                                code: 0,
                                message: '登录出错',
                                data: err_1
                            }];
                    case 3: return [2];
                }
            });
        });
    };
    ModelUser.prototype.insertOne = function (tel, password) {
        return __awaiter(this, void 0, void 0, function () {
            var _sql_user_exit, _r, _sql_user_insert, _r_1, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        _sql_user_exit = "select 1 from users where tel = " + tel + " limit 1";
                        return [4, mysql_1.default.query(_sql_user_exit)];
                    case 1:
                        _r = _a.sent();
                        if (!(_r.length > 0)) return [3, 2];
                        return [2, {
                                code: 0,
                                message: '手机号码已注册过'
                            }];
                    case 2:
                        _sql_user_insert = "insert into users (tel, password) values (\"" + tel + "\", \"" + password + "\")";
                        return [4, mysql_1.default.query(_sql_user_insert)];
                    case 3:
                        _r_1 = !!(_a.sent());
                        return [2, {
                                code: _r_1 ? 1 : 0,
                                message: _r_1 ? '注册成功' : '注册失败'
                            }];
                    case 4: return [3, 6];
                    case 5:
                        err_2 = _a.sent();
                        return [2, {
                                code: 0,
                                message: '注册出错',
                                data: err_2
                            }];
                    case 6: return [2];
                }
            });
        });
    };
    return ModelUser;
}());
exports.default = ModelUser;
//# sourceMappingURL=model.user.js.map