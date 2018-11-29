<template>
    <div class="add">
        <m-header>添加图书</m-header>
        <ul>
            <li>
                <label for="bookCover">书的封面</label>
                <input type="text" id="bookCover" v-model="book.bookCover"/>
            </li>
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
                <input type="text" id="bookPrice" v-model.number="book.bookPrice"/>
            </li>
            <li>
                <button @click="addBook">添加</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import MHeader from '../base/MHeader'
    import {addBook} from '../api'
    export default {
        data() {
            return {
                book:{}
            }
        },
        methods:{
            async addBook() {
                await addBook(this.book);
                this.$router.push('/list')
            }
        },
        components:{
            MHeader
        }
    }
</script>

<style scoped lang="less">
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