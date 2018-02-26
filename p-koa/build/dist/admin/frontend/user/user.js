var User = (function () {
    function User() {
    }
    User.prototype.init = function () {
        var _this = this;
        $('#iconFile').on('change', function (e) { return _this.uploadImg(e); });
        $('#submit').on('click', function (e) {
            if ($('input[name=name]').val() == '') {
                return layer.alert('请填写用户名称');
            }
            var _val_email = "" + $('input[name=email]').val();
            if (_val_email == '') {
                return layer.alert('请填写用户邮箱');
            }
            else if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(_val_email)) {
                return layer.alert('邮箱格式错误');
            }
            if ($('input[name=icon]').val() == '') {
                return layer.alert('请上传用户头像');
            }
            $('form').submit();
        });
    };
    User.prototype.uploadImg = function (e) {
        if ($(e.target).val() === '')
            return;
        var formData = new FormData();
        formData.append('imgs', e.target.files[0]);
        $.ajax({
            url: '/api/upload',
            type: 'post',
            cache: false,
            data: formData,
            processData: false,
            contentType: false
        }).done(function (res) {
            if (res.code === 1) {
                $('#iconImg').attr('src', res.data).addClass('active');
                $('input[name=icon]').val(res.data);
            }
            else {
                console.log(res.message);
            }
        }).fail(function (res) {
        });
    };
    User.prototype.checkName = function () {
        return true;
    };
    User.prototype.checkTel = function () {
        return true;
    };
    User.prototype.checkEmail = function () {
        return true;
    };
    User.prototype.submit = function () {
    };
    return User;
}());
var user = new User();
user.init();
