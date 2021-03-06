import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router); //注册一些全局的内容，比如<router-view></router-view>组件

let routes = [
    {
        path:'/home',
        component: ()=>import('../components/Home.vue'),
        name:'home',
        meta:{keepAlive:true}  //存储在this.$route.meta.keepAlive
    },
    {
        path:'/list',
        component: ()=>import('../components/List.vue'),
        name:'list',
        meta:{keepAlive:true}
    },
    //  /detail/1 {bid:1} 路径参数 必须有但是可以随机
    {
        path:'/detail/:bid',
        component: ()=>import('../components/Detail.vue'),
        name:'detail'
    },
    {
        path:'/collect',
        component: ()=>import('../components/Collect.vue'),
        name:'collect'
    },
    {
        path:'/add',
        component: ()=>import('../components/Add.vue'),
        name:'add'
    },
    {
        path:'*',
        redirect:'/home'
    }
];

export default new Router({
  routes
})
