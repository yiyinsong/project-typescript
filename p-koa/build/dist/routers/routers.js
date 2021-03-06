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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require("koa-router");
var Multer = require("koa-multer");
var path = require("path");
var login_1 = require("../controllers/login/login");
var index_1 = require("../admin/controllers/index/index");
var user_1 = require("../admin/controllers/user/user");
var router = new Router();
var storage = Multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./build/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var upload = Multer({ storage: storage });
var loginController = new login_1.default();
var adminIndexController = new index_1.default();
var adminUserController = new user_1.default();
var fnIsLogin = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, loginController.alreadyLogged(ctx, next)];
            case 1: return [2, _a.sent()];
        }
    });
}); };
router.get('/', function (ctx, next) {
    ctx.body = ctx.session;
});
router.get('/login', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, loginController.login(ctx, next)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
router.post('/login/action', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, loginController.loginAction(ctx, next)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
router.get('/register', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, loginController.register(ctx, next)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
router.post('/register/action', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, loginController.registerAction(ctx, next)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
router.get('/logout', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, loginController.logout(ctx, next)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
router.get('/admin', fnIsLogin, function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, adminIndexController.init(ctx, next)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
router.get('/admin/index', fnIsLogin, function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, adminIndexController.init(ctx, next)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
router.get('/admin/user', fnIsLogin, function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, adminUserController.editInfo(ctx, next)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
router.post('/admin/user/saveinfo', function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, adminUserController.saveInfo(ctx, next)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); });
router.post('/api/upload', upload.single('imgs'), function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var r;
    return __generator(this, function (_a) {
        r = {
            code: 1,
            message: '上传成功',
            data: "/uploads/" + ctx.req.file.filename
        };
        ctx.body = r;
        return [2];
    });
}); });
exports.default = router;
