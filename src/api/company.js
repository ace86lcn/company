module.exports = {
    // 获取企业资料
    GetCompanyDetail: {
        url: '/admin/SmallCompany/detail',
        methods: 'get'
    },
    // 上传企业资料
    UploadCompanyData: {
        url: '/admin/SmallCompany/update',
        methods: 'post'
    },
    // 企业图片上传
    UploadComopanyImg: '/admin/SmallCompany/uploadData'
}