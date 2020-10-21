import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'      //vuex持久化解决

Vue.use(Vuex)

const state = {
    moyunLogo: require('@/assets/images/logo.png'),                //平台logo
    moyunLogo2: require('@/assets/images/logo2.png'),              //平台主页logo
    moyunLogo3: require('@/assets/images/logo3.png'),              //平台主页logo
    //platformName: '摩云劳务管理结算云平台',                        //平台名称
    //adminName: 'adminName',                                      //当前操作用户姓名
    tokenName: 'admin-auth-token',                                 //令牌名
    token: '',                                                     //要用到的令牌
    companyName: '',                                               //账号所属公司名称
    adminAvatar: require('@/assets/images/default-header.png'),    //默认用户头像
    authStatus: '',                                                //账号审核状态     0待审核  1.拒绝  2通过  4未提交认证
    authMobile: '',                                                //账号手机号
    serviceMobile: '',                                             //客服电话
    positionList: [],                                              //职位列表
    wageList: [],                                                  //薪资列表
    workYearsList: [],                                             //工龄列表,
    companyIsPass: false,                                          //该企业是否通过实名认证
    bgScreen: require('@/assets/images/login.jpg'),                //大背景图
}

const mutations = {
    changeToken(state, token) {
        state.token = token
    },
    changeCompanyName(state, companyName) {
        state.companyName = companyName
    },
    changeAuthStatus(state, authStatus) {
        state.authStatus = authStatus
    },
    changeAuthMobile(state, authMobile) {
        state.authMobile = authMobile
    },
    changeServiceMobile(state, serviceMobile) {
        state.serviceMobile = serviceMobile
    },
    // 更改职位列表
    changePositionList(state, data) {
        state.positionList = data
    },
    // 更改薪资列表
    changeWageList(state, data) {
        state.wageList = data
    },
    // 更改工龄列表
    changeWorkYearsList(state, data) {
        state.workYearsList = data
    },
    changeCompanyPass(state, data) {
        state.companyIsPass = data
    }
}

export default new Vuex.Store({
    state,
    mutations,
    plugins:[
        new VuexPersistence({
            reducer: state => ({
                //这个就是存入localStorage的值
                token: state.token,
                companyName: state.companyName,
                authStatus: state.authStatus,
                authMobile: state.authMobile,
                positionList: state.positionList,
                wageList: state.wageList,
                workYearsList: state.workYearsList,
                serviceMobile: state.serviceMobile,
                companyIsPass: state.companyIsPass
            })
        }).plugin
    ]
})