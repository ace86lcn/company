

module.exports = {
    /* 
    *    接口方法名: {
    *        url: '接口路由',
    *        methods: '请求方法 get/post'
    *    }
    *    用法：$http(接口方法名, params:没有参数传{}可不传,res=> {}成功回调) 
    */
        //获取财务账号列表
        GetFinance: {
            url: '/admin/FinanceEmployees/lists',
            methods: 'get'
        },
        //删除操作
        DeleteFinance: {
            url: '/admin/FinanceEmployees/delete',
            methods: 'get'
        },
        //详情
        DetailFinance: {
            url: '/admin/FinanceEmployees/details',
            methods: 'get'
        },
        //获取验证码
        GetCode: {
            url: '/admin/FinanceEmployees/sendCaptcha',
            methods: 'post'
        },
        // 新增保存
        AddSave: {
            url: '/admin/FinanceEmployees/insert',
            methods: 'post'
        },
        //获取管理项目
        GetProjects: {
            url: '/admin/FinanceEmployees/getProjectList',
            methods: 'get'
        },
        //编辑成功
        UpdateSave: {
            url: '/admin/FinanceEmployees/update',
            methods: 'post'
        },
        //验证用户信息格式是否正确
        CodeUserInfo: {
            url: '/admin/FinanceEmployees/checkMessage',
            methods: 'post'
        }
}