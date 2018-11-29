// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' //这样直接引用vue，引用的是vue的runtime，现在没有compiler，不支持template！！！ 因为compiler有6k
// 你可以这样引入import Vue from 'vue/dist/vue.js' 因为vue=compiler(可以编译模板)+runtime

import App from './App'
import router from './router'

import notify from './plugin/notify.js'
Vue.use(notify,{delay:2000});

// 导入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
// 使用轮播图插件
Vue.use(VueAwesomeSwiper, /* { default global options } */)
// require styles
import 'swiper/dist/css/swiper.css'


import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=396805210,4266088262&fm=27&gp=0.jpg',
    loading: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=396805210,4266088262&fm=27&gp=0.jpg',
    attempt: 1
})

// 在进入路由之前 每一次都会执行此方法，全局钩子 拦截功能
router.beforeEach(function(to,from,next){
    document.title = to.meta.title;
    if(to.path == '/list') {
        // next({path:'/add'}); //拦截 eg:点击列表页，跳到添加页
        next()
    } else {
        next();
    }
})

import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
    ...App
  // components: { App },
  // template: '<App/>'
  // render(h){return h(App)} // render函数的作用是将虚拟的dom渲染成真实的dom，createElement返回的是虚拟的dom
})


// render: function (createElement) {
//     return createElement('h1',[
//         'hello',
//         createElement('span','一天测试')
//     ])
// }
