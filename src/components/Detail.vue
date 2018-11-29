<template>
    <div class="detail">
        <m-header :back="true">详情页</m-header>
        <ul>
            <li>
                <label for="bookName">书的名称</label>
                <input type="text" id="bookName" v-model="book.bookName"/>
            </li>
            <li>
                <label for="bookInfo">书的信息</label>
                <input type="text" id="bookInfo" v-model="book.bookInfo"/>
            </li>
            <li>
                <label for="bookPrice">书的价格</label>
                <input type="text" id="bookPrice" v-model="book.bookPrice"/>
            </li>
            <li>
                <button @click="updateBook">确认修改</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import MHeader from '../base/MHeader'
    import {findOneBook, updateBook} from '../api'
    export default {
        data() {
            return {
                book:{}
            }
        },
        watch:{
            $route() { //只要路径变化 重新获取数据
                this.findOneBook();
            }
        },
        created() { //页面一加载，需要根据id， 发送请求
            this.findOneBook();
        },
        methods:{
            async findOneBook() {
                this.book = await findOneBook(this.bid);
                //如果是空对象 需要跳转回列表页
                Object.keys(this.book).length == 0 ? this.$router.push('/list') : null;
            },
            async updateBook() {
                await updateBook(this.bid, this.book);
                this.$router.push('/list')
            }
        },
        components:{
            MHeader
        },
        computed:{
            bid() {
                return this.$route.params.bid; // 将路径参数的id映射到bid上
            }
        }
    }
</script>

<style scoped lang="less">
    .detail{
        position: absolute;
        left: 0;
        top:0;
        bottom: 0;
        right: 0;
        background: #ffffff;
        z-index: 100;
    }
    ul{
        padding: 50px 10px;
    }

    li{
        margin-bottom: 10px;

        label{
            display: block;
            font-size: 25px;
        }
        input{
            margin: 10px 0;
            height: 25px;
            width: 100%;
            font-size: 20px;
        }
        button{
            display: block;
            width: 80px;
            height: 35px;
            background: #269abc;
            color: #ffffff;
            border:none;
            border-radius: 7px;

        }
    }
</style>