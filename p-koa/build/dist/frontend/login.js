var Login = (function () {
    function Login() {
        var _this = this;
        this.submitHandle = function () {
            if (!_this.checkTel())
                return;
            if (!_this.checkPwd())
                return;
            $('form').submit();
        };
    }
    Login.prototype.alert = function (text) {
        return $('#modal').find('.alert-text').html(text).end().modal({
            show: true
        });
    };
    Login.prototype.checkTel = function () {
        if ($('#modelTel').val() === '') {
            this.alert('请填写电话号码');
            return false;
        }
        else if (!/^\d{11}$/.test("" + $('#modelTel').val())) {
            this.alert('电话号码格式错误');
            return false;
        }
        else {
            return true;
        }
    };
    Login.prototype.checkPwd = function () {
        if ($('#modelPwd').val() === '') {
            this.alert('请填写密码');
            return false;
        }
        else if (('' + $('#modelPwd').val()).length < 6) {
            this.alert('密码长度不能小于6位');
            return false;
        }
        else {
            return true;
        }
    };
    return Login;
}());
var login = new Login();
$('#submit').on('click', login.submitHandle);
