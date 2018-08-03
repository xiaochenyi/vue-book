import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import List from '../components/List'
import Add from '../components/Add'


Vue.use(Router)

var routes = [
    {
        path:'/home',
        component: Home,
        name:'home'
    },
    {
        path:'/list',
        component: List,
        name:'list'
    },
    {
        path:'/add',
        component: Add,
        name:'add'
    }
]

export default new Router({
  routes
})
