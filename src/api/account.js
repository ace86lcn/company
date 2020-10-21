module.exports = {
    // 获取账户设置页面数据
    GetAccountData: {
        url: '/admin/SmallUserInvoiceInfo/index',
        methods: 'get'
    },
    // 删除地址
    DelAddressItem: {
        url: '/admin/UserInvoiceAddress/delete',
        methods: 'get'
    },
    // 删除抬头
    DelInvoiceItem: {
        url: '/admin/SmallUserInvoiceInfo/delete',
        methods: 'get'
    },
    // 新增抬头
    AddInvoiceItem: {
        url: '/admin/SmallUserInvoiceInfo/save',
        methods: 'post'
    },
    // 新增地址
    AddAddressItem: {
        url: '/admin/SmallUserInvoiceInfo/saveAddress',
        methods: 'post'
    },
}