# vue-book

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 项目用到less
```
npm install less less-loader axios vuex bootstrap
```

- mock 模拟数据
- api 代表的是所有的接口
- base 基本组件
- components 页面组件


#### 初始化vue项目
- npm install -g vue-cli
- vue init webpack vue-book
- cd vue-book
- npm install
- npm run dev

## font字体 阿里巴巴矢量图标库
- 我的项目-> 点击生成链接
链接：//at.alicdn.com/t/font_769798_zyoyg3cx22.css

## npm intall vue-awesome-swiper --save

## 热门图书的功能
- 先写服务端，确保数据能正常返回
- 去api增加方法，实现调取数据的功能
- 在哪个组件中应用这个api，如果是一个基础组件需要用这些数据，在使用这个组件的父级中调用这个方法，将数据传递给基础组件
- 写一个基础组件
    - 创建一个.vue文件
    - 在需要使用这个组件的父级中引用这个组件
    - 在组件中注册
    - 以标签的形式引入

## 实现页面的缓存
- 路由元信息
> 路由配置的时候，加meta:{keepAlive:true}  //存储在this.$route.meta.keepAlive
```
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

## 路由动画
```
<transition name="fadeIn">
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
</transition>
<transition name="fadeIn">
  <router-view v-if="!$route.meta.keepAlive"></router-view>
</transition>
```

.fadeIn-enter{
    opacity: 0;
}
.fadeIn-enter-active{
    transition: all 0.3s linear;
}
.fadeIn-leave-active{
    transition: all 0.3s linear;
    opacity: 0;
}

## 下拉加载
- 默认每次给5条，前端告诉后台现在要从第几条开始给我
- eg：/page?offset=5   从第五条开始取


## 图片懒加载 插件（vue-lazyload）
```
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=396805210,4266088262&fm=27&gp=0.jpg',
    loading: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=396805210,4266088262&fm=27&gp=0.jpg',
    attempt: 1
})
```
```
// <img :src="book.bookCover"/>
<img v-lazy="book.bookCover"/>
```


### 发布项目
- coding split 代码分割 （点一个页面，加载当前数据）
- https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97
- 脚手架已经自带了 syntax-dynamic-import 插件





## 代码上传到服务器
> 把mock拖拽到filezilla上一个文件夹
- 命令
    - ssh root@39.13.4.5
    - 输入密码
    - cd 文件夹
    - node server.js



## history路由
```
routes:[
    mode:'history'  // 默认不写模式，就是hash的 ，写上history就是'/'
]
```
会出现404

解决
```
if(err) {
    res.statusCode = 404;
    res.end('NOT FOUND');
}

//改成
if(err) {
    fs.createReadStream('index.html').pipe(res)
}
```






















