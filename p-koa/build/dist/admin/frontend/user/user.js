var User = (function () {
    function User() {
    }
    User.prototype.init = function () {
        var _this = this;
        $('#iconFile').on('change', function (e) { return _this.uploadImg(e); });
    };
    User.prototype.uploadImg = function (e) {
        if ($(e.target).val() === '')
            return;
        var formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('rootPath', 'user');
        $.ajax({
            url: '/api/upload',
            type: 'post',
            cache: false,
            data: formData,
            processData: false,
            contentType: false
        }).done(function (res) {
            if (res.code === 1) {
                $('#iconImg').attr('src', res.path).addClass('active');
                $('input[name=icon]').val(res.path);
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
