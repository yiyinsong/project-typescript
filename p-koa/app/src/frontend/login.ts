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
     * 弹出提示
     * @param {string} text
     * @return {JQuery<HTMLElement>} 返回jquery对象
     */
    private alert(text: string): JQuery<HTMLElement> {
        return $('#modal').find('.alert-text').html(text).end().modal({
            show: true
        });
    }
    /**
     * 验证手机号码格式
     * @return {boolean} 验证是否通过
     */
    public checkTel(): boolean {
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
     * 验证密码
     * @return {boolean} 验证是否通过
     */
    public checkPwd(): boolean {
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