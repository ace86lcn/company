module.exports = {
    // 劳务大厅列表
    GetLabourList: {
        url: '/admin/ServiceHall/lists',
        methods: 'get'
    },
    // 联系工人
    ContactWorker: {
        url: '/admin/ServiceHall/contact',
        methods: 'get'
    },
    // 联系过的列表
    ContactedList: {
        url: '/admin/ServiceHall/contactList',
        methods: 'get'
    },
    // 删除联系过的工人
    DelContactItem: {
        url: '/admin/ServiceHall/delete',
        methods: 'get'
    },
    // 清空联系过的工人
    ClearContact: {
        url: '/admin/ServiceHall/clear',
        methods: 'get'
    },
    // 工人详情
    GetWorkerDetail: {
        url: '/admin/ServiceHall/userHomePage',
        methods: 'get'
    }
}