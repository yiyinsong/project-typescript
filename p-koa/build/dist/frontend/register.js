var Register = (function () {
    function Register() {
        var _this = this;
        this.submitHandle = function () {
            if (!_this.checkTel())
                return;
            if (!_this.checkPwd())
                return;
            $.ajax({
                url: '/register/action',
                type: 'post',
                data: {
                    tel: $('#modelTel').val(),
                    password: $('#modelPwd').val()
                },
                dataType: 'json',
                success: function (r) {
                    if (r.code === 0) {
                        layer.alert(r.message);
                    }
                    else {
                        window.location.href = '/login';
                    }
                }
            });
        };
    }
    Register.prototype.checkTel = function () {
        if ($('#modelTel').val() === '') {
            layer.alert('请填写电话号码');
            return false;
        }
        else if (!/^\d{11}$/.test("" + $('#modelTel').val())) {
            layer.alert('电话号码格式错误');
            return false;
        }
        else {
            return true;
        }
    };
    Register.prototype.checkPwd = function () {
        if ($('#modelPwd').val() === '') {
            layer.alert('请填写密码');
            return false;
        }
        else if (('' + $('#modelPwd').val()).length < 6) {
            layer.alert('密码长度不能小于6位');
            return false;
        }
        else {
            return true;
        }
    };
    return Register;
}());
var register = new Register();
$('#submit').on('click', register.submitHandle);
//# sourceMappingURL=register.js.map