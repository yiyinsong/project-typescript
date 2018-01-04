interface LoginInterface {
    alert(text: string): JQuery<HTMLElement>;
    checkTel(): boolean;
    checkPwd(): boolean;
}

class Login implements LoginInterface {
    constructor() {

    }
    alert(text: string): JQuery<HTMLElement> {
        return $('#modal').find('.alert-text').html(text).end().modal({
            show: true
        });
    }
    checkTel(): boolean {
        if($('#modelTel').val() === '') {
            this.alert('请填写电话号码');
            return false;
        } else if(!/^\d{11}$/.test(`${$('#modelTel').val()}`)) {
            this.alert('电话号码格式错误');
            return false;
        } else {
            return true;
        }
    }
    checkPwd(): boolean {
        if($('#modelPwd').val() === '') {
            this.alert('请填写密码');
            return false;
        } else if((''+$('#modelPwd').val()).length < 6) {
            this.alert('密码长度不能小于6位');
            return false;
        } else {
            return true;
        }
    }
}

const login: Login = new Login();
$('#submit').on('click', (e) => {
    const _ct = login.checkTel();
    if(!_ct) return;
    const _cp = login.checkPwd();
    if(!_cp) return;
    $('form').submit();
});