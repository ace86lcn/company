import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '@/views/Home'

Vue.use(VueRouter)

/**
 * hidden:            不在侧边栏显示 meta里还有一个hidden
 * noLogin：          不需要登录
 * defaulNeedrefresh
 * defaultActive
 * 
 */
const routes = [
  { path: '/login', name: 'login', hidden: true, meta: { title: '登录', noLogin: true }, component: () => import('@/views/Login') },
  { path: '/404', name: '404', hidden: true, meta: { title: '404', noLogin: true }, component: () => import('@/views/404') },
  { path: '*', hidden: true, redirect: { path: '/404' } },
  { path: '/real/authentication', name: '实名认证', hidden: true, meta: { title: '实名认证', noLogin: true }, component: () => import('@/views/Real/Authentication') },
  { path: '/real/under-review', name: '审核中', hidden: true, meta: { title: '审核中', noLogin: true }, component: () => import('@/views/Real/UnderReview') },
  { path: '/real/audit-failure', name: '审核失败', hidden: true, meta: { title: '审核失败', noLogin: true }, component: () => import('@/views/Real/AuditFailure') },
  { path: '/pwd/change', name: 'pwd-change', hidden: true, meta: { title: '修改密码' }, component: () => import('@/views/Pwd/Change') },
  { path: '/pwd/forget', name: 'pwd-forget', hidden: true, meta: { title: '忘记密码', noLogin: true }, component: () => import('@/views/Pwd/Forget') },
  {
    path: '/',
    component: Home,
    name: '首页',      
    iconCls: 'iconfont iconicon_xinyong_xianxing_jijin-154 menu-icon',
    leaf: true,
    redirect: '/company-data/index',
    children:[
      { path: '/company-data/index', name: '企业资料', meta: { title: '企业资料' }, component: () => import('../views/CompanyData/Index') },
      { path: '/company-data/upload-data', name: '上传企业资料', meta: { title: '上传企业资料', hidden: true, defaultActive: '/company-data/index' }, component: () => import('../views/CompanyData/UploadData') }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '劳务',
    iconCls: 'iconfont iconbox menu-icon',
    redirect: '/labour-service/lobby',
    children:[
      { path: '/labour-service/lobby', name: '劳务大厅', meta: { title: '劳务大厅' }, component: () => import('@/views/LabourService/Lobby') },
      { path: '/labour-service/contacted', name: '我联系过的', meta: { title: '我联系过的' }, component: () => import('@/views/LabourService/Contacted') },
      { path: '/labour-service/worker-detail/:id', name: '工人主页', meta: { title: '工人主页', hidden: true, defaulNeedrefresh: true }, component: () => import('@/views/LabourService/WorkerDetail') },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '招聘',
    iconCls: 'iconfont iconadd-account menu-icon',
    children:[
      { path: '/recruit-management/index', name: '招聘管理', meta: { title: '招聘管理' }, component: () => import('@/views/RecruitManagement/Index') },
      { path: '/recruit-management/add-new', name: '新增招聘', meta: { title: '新增招聘', hidden: true, defaultActive: '/recruit-management/index' }, component: () => import('@/views/RecruitManagement/AddNew') },
      { path: '/recruit-management/recruit-detail/:id', name: '招聘详情', meta: { title: '招聘详情', hidden: true, defaultActive: '/recruit-management/index' }, component: () => import('@/views/RecruitManagement/RecruitDetail') },
      { path: '/recruit-management/apply-list/:id', name: '报名列表', meta: { title: '报名列表', hidden: true, defaultActive: '/recruit-management/index' }, component: () => import('@/views/RecruitManagement/ApplyList') },
      { path: '/recruit-management/recruited', name: '已招聘人员', meta: { title: '已招聘人员' }, component: () => import('@/views/RecruitManagement/Recruited') },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '财务账号管理',
    iconCls: 'iconfont iconqunzu menu-icon',
    leaf: true,//只有一个节点
    children:[
      { path: '/finance-account/index', name: '财务账号管理', meta: { title: '财务账号管理' }, component: () => import('@/views/FinanceAccount/Index') },
      { path: '/finance-account/add-account', name: '新增账户', meta: { title: '新增账户', hidden: true, defaultActive: '/finance-account/index' }, component: () => import('@/views/FinanceAccount/AddAccount') },
      { path: '/finance-account/edit-account', name: '编辑账户', meta: { title: '编辑账户', hidden: true, defaultActive: '/finance-account/index' }, component: () => import('@/views/FinanceAccount/AddAccount') },
      { path: '/finance-account/account-detail', name: '账户详情', meta: { title: '账户详情', hidden: true, defaultActive: '/finance-account/index' }, component: () => import('@/views/FinanceAccount/AccountDetail') },
    ]
  },
  {
    path: '/',
    component: Home,
    name: '首页',      
    iconCls: 'iconfont iconset menu-icon',
    leaf: true,
    children:[
      { path: '/account-setting/index', name: '账户设置', meta: { title: '账户设置' }, component: () => import('../views/AccountSetting/Index') }
    ]
  },
  {
    path: '/',
    component: Home,
    name: '首页',      
    iconCls: 'iconfont iconqiehuan menu-icon',
    leaf: true,
    children:[
      { path: '/switch/index', name: '切换平台', meta: { title: '切换平台' }, component: () => import('../views/Switch/Index') }
    ]
  }
]

const router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.hidden && to.meta.defaulNeedrefresh) {
    to.meta.defaultActive = from.fullPath
  }
  next()
  if(!store.state.token && !to.meta.noLogin) {
      alert('请您先登录')
      next('/login')
  } else {
      next()
  }
})

router.afterEach((to, from) => {
  let title = to.meta.title
  if (title) document.title = title
})

export default router
