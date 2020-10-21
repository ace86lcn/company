module.exports = {
    /* 
    *    接口方法名: {
    *        url: '接口路由',
    *        methods: '请求方法 get/post'
    *    }
    *    用法：$http(接口方法名, params:没有参数传{}可不传,res=> {}成功回调) 
    */

    // 获取账号审核状态  0待审核  1.拒绝  2通过  4未提交认证
    GetUserStatus: {
        url: '/admin/SmallUser/getUserStatus',
        methods: 'get'
    },
    // 获取客服电话
    GetServiceMobile: {
        url: '/admin/SmallOrder/getServiceMobile',
        methods: 'get'
    },
    // 获取职位/薪资/工龄列表
    GetThreeList: {
        url: '/admin/SmallBringIn/positionList',
        methods: 'get'
    },
    // 获取项目列表
    GetProjectList: {
        url: '/admin/FinanceEmployees/getProjectList',
        methods: 'get'
    },
    // 账号密码登录
    PwdLogin: {
        url: '/admin/SmallUser/login',
        methods: 'post'
    },
    // 手机号登录
    PhoneLogin: {
        url: '/admin/SmallUser/loginByMobile',
        methods: 'post'
    },
    // 登录账号发送验证码
    LoginCode: {
        url: '/admin/SmallUser/sendCaptchaLogin',
        methods: 'get'
    },
    // 账号注册
    Register: {
        url: '/admin/SmallUser/checkCaptcha',
        methods: 'post'
    },
    // 注册发送验证码
    RegisterCode: {
        url: '/admin/SmallUser/sendCaptcha',
        methods: 'get'
    },
    // 忘记密码发送验证码
    SendForgetCode: {
        url: '/admin/SmallUser/sendCaptchaForget',
        methods: 'get'
    },
    // 忘记密码验证验证码
    CheckForgetCode: {
        url: '/admin/SmallUser/checkCaptchaForget',
        methods: 'post'
    },
    // 修改账号密码
    ChangeAccountPwd: {
        url: '/admin/SmallUser/modifyPassword',
        methods: 'post'
    },
    // 验证旧密码
    CheckOldPassword: {
        url: '/admin/SmallUser/checkOldPassword',
        methods: 'post'
    },
    // 公司信息认证
    CompanyRegister: {
        url: '/admin/SmallUser/register',
        methods: 'post'
    },
}