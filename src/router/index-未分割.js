import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import List from '../components/List'
import Detail from '../components/Detail'
import Collect from '../components/Collect'
import Add from '../components/Add'


Vue.use(Router); //注册一些全局的内容，比如<router-view></router-view>组件

let routes = [
    {
        path:'/home',
        component: Home,
        name:'home',
        meta:{keepAlive:true}  //存储在this.$route.meta.keepAlive
    },
    {
        path:'/list',
        component: List,
        name:'list',
        meta:{keepAlive:true}
    },
    //  /detail/1 {bid:1} 路径参数 必须有但是可以随机
    {
        path:'/detail/:bid',
        component: Detail,
        name:'detail'
    },
    {
        path:'/collect',
        component: Collect,
        name:'collect'
    },
    {
        path:'/add',
        component: Add,
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
