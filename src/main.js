// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//解决移动端300ms延迟
import fastclick from 'fastclick'
//图片懒加载
import VueLazyload from 'vue-lazyload'
//引入mint-mi
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
//引入jsonp
import VueJsonp from 'vue-jsonp'
Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.use(VueLazyload,{
    loading:require('assets/douban-app-logo.png')
})
Vue.use(MintUI)
Vue.use(VueJsonp)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
