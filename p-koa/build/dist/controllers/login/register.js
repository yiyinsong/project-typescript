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
var bcryptjs = require("bcryptjs");
var model_user_1 = require("../../model/model.user");
var modelUser = new model_user_1.default();
var LoginController = (function () {
    function LoginController() {
        this.passwordSaltRounds = 10;
    }
    LoginController.prototype.encrypt = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, bcryptjs.genSalt(this.passwordSaltRounds)];
                    case 1:
                        salt = _a.sent();
                        return [4, bcryptjs.hash(password, salt)];
                    case 2:
                        hash = _a.sent();
                        return [2, hash];
                }
            });
        });
    };
    LoginController.prototype.validate = function (password, hash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, bcryptjs.compare(password, hash)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    LoginController.prototype.login = function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, ctx.render('login/login', {
                            title: '登录'
                        })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    LoginController.prototype.loginAction = function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, _r, _r2, _compare_result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _user = ctx.request.body;
                        return [4, modelUser.findByTel(_user.tel)];
                    case 1:
                        _r = _a.sent();
                        if (!(_r.code === 1)) return [3, 3];
                        _r2 = void 0;
                        return [4, this.validate(_user.password, _r.data.password)];
                    case 2:
                        _compare_result = _a.sent();
                        if (_compare_result) {
                            ctx.session.user = _r.data;
                            _r2 = {
                                code: 1,
                                message: '登录成功'
                            };
                        }
                        else {
                            _r2 = {
                                code: 0,
                                message: '密码错误'
                            };
                        }
                        ctx.body = _r2;
                        return [3, 4];
                    case 3:
                        ctx.body = _r;
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    LoginController.prototype.register = function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, ctx.render('login/register', {
                            title: '注册'
                        })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    LoginController.prototype.registerAction = function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _user, _bcryptjsPassword, _r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _user = ctx.request.body.user;
                        return [4, this.encrypt(_user.password)];
                    case 1:
                        _bcryptjsPassword = _a.sent();
                        return [4, modelUser.insertOne(_user.tel, _bcryptjsPassword)];
                    case 2:
                        _r = _a.sent();
                        if (_r.code === 1) {
                            ctx.redirect('/login');
                        }
                        else {
                            ctx.body = _r;
                        }
                        return [2];
                }
            });
        });
    };
    LoginController.prototype.logout = function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                ctx.session = null;
                ctx.redirect('/login');
                return [2];
            });
        });
    };
    LoginController.prototype.alreadyLogged = function (ctx, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (ctx.session.user) {
                    return [2, next()];
                }
                else {
                    ctx.redirect('/login');
                }
                return [2];
            });
        });
    };
    return LoginController;
}());
exports.default = LoginController;
//# sourceMappingURL=register.js.map