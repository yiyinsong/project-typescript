interface LoginInterface {
    checkTel(): boolean;
    checkPwd(): boolean;
    submitHandle(): void;
}

class Login implements LoginInterface {
    constructor() {

    }
    /**
     * @function alert
     * @description  弹出提示
     * @param text 
     * @return JQuery<HTMLElement> 返回jquery对象
     */
    private alert(text: string): JQuery<HTMLElement> {
        return $('#modal').find('.alert-text').html(text).end().modal({
            show: true
        });
    }
    /**
     * @function checkTel
     * @description  验证手机号码
     * @return boolean 验证是否通过
     */
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
    /**
     * @function checkPwd
     * @description  验证密码
     * @return boolean 验证是否通过
     */
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
    /**
     * @function submit
     * @description  验证提交表单
     * @return void
     */
    submitHandle = ():void =>  {
        if(!this.checkTel()) return;
        if(!this.checkPwd()) return;
        $('form').submit();
    }
}

const login: Login = new Login();
$('#submit').on('click', login.submitHandle);