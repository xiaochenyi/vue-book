<template>
    <div>
        <m-header>首页</m-header>
        <div class="content">
            <loading v-if="loading"></loading>
            <template v-else>
                <swiper :swiperSlides="sliders"></swiper>
                <div class="container">
                    <h3>热门图书</h3>
                    <ul>
                        <li v-for="hot in hotBooks">
                            <img :src="hot.bookCover"/>
                            <b>{{hot.bookName}}</b>
                        </li>
                    </ul>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    //1.引入 2.注册 3.使用组件
    import MHeader from '../base/MHeader'
    import Swiper from '../base/Swiper'
    import Loading from '../base/loading'
    import {getSliders,getHotBook, getAll} from "../api";

    export default {
        data(){
            return {
                sliders:[],
                hotBooks:[],
                loading:true
            }
        },
        components: {
            MHeader,Swiper,Loading
        },
        methods:{
            //async和await必须成对使用 await后面必须是promise对象
            async getSliders(){
                this.sliders = await getSliders();
            },
            async getHotBook() {
                this.hotBooks = await getHotBook();
            },
            async getAll() {
                console.log(await getAll())
                let [sliders, hotBooks] = await getAll(); // 返回的是数组
                this.sliders = sliders;
                this.hotBooks = hotBooks;
                this.loading = false;
            }
        },
        created() {
            // this.getSliders();
            // this.getHotBook();
            this.getAll();
        }
    }
</script>

<style scoped lang="less">
    .container{
        width: 90%;
        margin: 0 auto;
        h3{
            padding: 5px 0;
            color: #999;
        }
        ul {
            display: flex;
            flex-wrap: wrap; // 默认不换行，wrap换行
            padding-bottom: 10px;
            li{
                width: 50%;
                text-align: center;
                margin: 5px 0;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>