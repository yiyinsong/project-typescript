/**
 * 后台编辑用户信息接口
 * @interface UserInterface
 */
interface UserInterface {
    init(): void;
    checkName(): boolean;
    checkTel(): boolean;
    checkEmail(): boolean;
    submit(): void;
}
/**
 * @class User
 * @implements {UserInterface}
 */
class User implements UserInterface{
    constructor() {
        
    }
    /**
     * 初始化页面，绑定页面编辑框事件
     * @method init
     */
    public init() {
        $('#iconFile').on('change', (e) => this.uploadImg(e));
    }
    /**
     * 上传图片
     * @private
     * @method uploadImg
     */
    private uploadImg(e: any) {
        if($(e.target).val() === '') return;
		let formData = new FormData();
		formData.append('file', e.target.files[0]);
		formData.append('rootPath', 'user');
		$.ajax({
			url: '/api/upload',
			type: 'post',
			cache: false,
			data: formData,
			processData: false,
			contentType: false
		}).done((res) => {
			if(res.code === 1) {
				$('#iconImg').attr('src', res.path).addClass('active');
				$('input[name=icon]').val(res.path);
			} else {
				console.log(res.message);
			}
		}).fail((res) => {
		});
    }
    /**
     * 校验用户名字
     * @method checkName
     * @returns {boolean} 
     */
    public checkName(): boolean {
        return true;
    }
    /**
     * 校验用户手机号码
     * @method checkTel
     * @returns {boolean} 
     */
    public checkTel(): boolean {
        return true;
    }
    /**
     * 校验用户Email
     * @method checkEmail
     * @returns {boolean} 
     */
    public checkEmail(): boolean {
        return true;
    }
    /**
     * 提交保存
     * @method submit
     */
    public submit() {

    }
}

const user: User = new User();
user.init();