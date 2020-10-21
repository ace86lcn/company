import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// iconfont
import '@/assets/iconfont/iconfont.css'

// style
import '@/assets/scss/reset.scss'

// element-ui
import './plugins/element.js'
// 自定义message弹窗
import message from '@/utils/validate'
Vue.prototype.$msg = message
import '@/assets/scss/element-variables.scss'

// request
import request from './utils/request'
Vue.prototype.$http = request

// 域名
Vue.prototype.domain = process.env.VUE_APP_API_URL

Vue.config.productionTip = false

// 公共组件
Vue.component('Pages', () => import('@/components/Pages'))
Vue.component('Search', () => import('@/components/Search'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
 return originalPush.call(this, location).catch(err => err)
}