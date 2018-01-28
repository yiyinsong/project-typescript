/**
 * 前台登陆注册页面
 * @interface LoginInterface
 */
interface LoginInterface {
    checkTel(): boolean;
    checkPwd(): boolean;
    submitHandle(): void;
}

class Login implements LoginInterface {
    constructor() {

    }
    /**
     * 验证手机号码格式
     * @return {boolean} 验证是否通过
     */
    public checkTel(): boolean {
        if($('#modelTel').val() === '') {
            layer.alert('请填写电话号码');
            return false;
        } else if(!/^\d{11}$/.test(`${$('#modelTel').val()}`)) {
            layer.alert('电话号码格式错误');
            return false;
        } else {
            return true;
        }
    }
    /**
     * 验证密码
     * @return {boolean} 验证是否通过
     */
    public checkPwd(): boolean {
        if($('#modelPwd').val() === '') {
            layer.alert('请填写密码');
            return false;
        } else if((''+$('#modelPwd').val()).length < 6) {
            layer.alert('密码长度不能小于6位');
            return false;
        } else {
            return true;
        }
    }
    /**
     * 验证提交表单
     * @return {void}
     */
    public submitHandle = ():void =>  {
        if(!this.checkTel()) return;
        if(!this.checkPwd()) return;
        $('form').submit();
    }
}

const login: Login = new Login();
$('#submit').on('click', login.submitHandle);