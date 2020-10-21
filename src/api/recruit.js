module.exports = {
    // 我的招揽工列表
    GetRecruitList: {
        url: '/admin/SmallBringIn/lists',
        methods: 'get'
    },
    // 下架招聘
    DownRecruitItem: {
        url: '/admin/SmallBringIn/status',
        methods: 'get'
    },
    // 上架招聘
    UpRecruitItem: {
        url: '/admin/SmallBringIn/status',
        methods: 'get'
    },
    // 删除招聘
    DelRecruitItem: {
        url: '/admin/SmallBringIn/delete',
        methods: 'get'
    },
    // 添加招聘，包括草稿
    AddRecruitItem: {
        url: '/admin/SmallBringIn/add',
        methods: 'post'
    },
    // 获取编辑招聘详情
    GetRecruitDetail: {
        url: '/admin/SmallBringIn/detail',
        methods: 'get'
    },
    // 报名列表
    GetSignUpList: {
        url: '/admin/SmallBringIn/signUpList',
        methods: 'get'
    },
    // 员工录用（通过/拒绝）
    Employment: {
        url: '/admin/SmallBringIn/employment',
        methods: 'get'
    },
    // 立即联系
    ContactWorker: {
        url: '/admin/ServiceHall/contact',
        methods: 'get'
    },
    // 获取招聘详情
    RecruitDetail: {
        url: '/admin/SmallBringIn/detail',
        methods: 'get'
    },
    // 获取已招聘列表
    AgreeSignUpList: {
        url: '/admin/SmallBringIn/agreeSignUpList',
        methods: 'get'
    },
    // 已报名列表（删除）
    DelAgreeSignUp: {
        url: '/admin/SmallBringIn/deleteSignU',
        methods: 'get'
    },
}