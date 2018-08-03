// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
// 使用轮播图插件
Vue.use(VueAwesomeSwiper, /* { default global options } */)
// require styles
import 'swiper/dist/css/swiper.css'

import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render(h){return h(App)}
})
