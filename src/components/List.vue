<template>
    <div>
        <m-header :back="false">列表页</m-header>

        <div class="content" ref="scroll" @scroll="loadMore">
            <ul>
                <router-link v-for="(book,index) in books" :key="index" :to="{name:'detail', params:{bid:book.bookId}}" tag="li">
                    <img v-lazy="book.bookCover"/>
                    <div>
                        <h4>{{book.bookName}}</h4>
                        <p>{{book.bookInfo}}</p>
                        <b>{{book.bookPrice}}</b>
                        <button @click.stop="removeBook(book.bookId)">删除</button>
                    </div>
                </router-link>
            </ul>
            <div v-if="hasMore" class="more" @click="more">加载更多</div>
        </div>
    </div>
</template>

<script>
    import MHeader from '../base/MHeader'
    import Loading from '../base/loading'
    import {getBooks,removeBook,pagination} from '../api'
    export default {
        data() {
            return {
                books:[],
                offset:0,
                hasMore: true,
                isLoading:false
            }
        },
        mounted() {
            let el = this.$refs.scroll; //获取到要拖拽的元素
            let top = el.offsetTop;
            let dis = 0;
            el.addEventListener('touchstart', (e)=>{
                if(el.scrollTop != 0 || el.offsetTop != top) {
                   return;
                }
                let start = e.touches[0].pageY; //手指点击的开始
                let move = (e)=>{
                    let current = e.touches[0].pageY;
                    dis = current - start; //求拉动的距离（负的就不要了）
                    if(dis > 0) {
                        if(dis > 50) {
                            dis = 50;
                        }
                        el.style.top = dis+top + 'px';
                    } else {
                        // 如果不在考虑范围内，移除move和end事件
                        el.removeEventListener('touchmove', move);
                        el.removeEventListener('touchend', end);
                    }
                };
                let end = (e)=>{
                    clearInterval(this.timer1);
                    this.timer1 = setInterval(()=>{
                        if(dis <= 0) {
                            clearInterval(this.timer1);
                            dis = 0;
                            el.style.top = top +'px';
                            console.log('获取数据');
                            el.removeEventListener('touchmove', move);
                            el.removeEventListener('touchend', end);
                            this.offset = 0;
                            this.books = [];
                            this.pagination();
                            return;
                        }
                        dis -= 1;
                        el.style.top = top + dis + 'px';
                    },1);
                };
                el.addEventListener('touchmove', move, false)
                el.addEventListener('touchend', end, false)
            }, false);
        },
        created() {
          this.pagination();
        },
        components:{
            Loading,
            MHeader
        },
        methods:{
            loadMore() {
                /**
                 * // 节流 防抖
                 * 触发scroll事件，可能触发n次， 先进来开一个定时器， 下次触发时将上一次的定时器清掉
                 */
                clearTimeout(this.timer);
                this.timer = setTimeout(()=>{
                    // 卷去的高度 当前的可见高度  总高
                    let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll;
                    if(scrollTop + clientHeight + 20 > scrollHeight) {
                        this.pagination();
                    }
                    console.log(10000)
                }, 60);
            },
            more() {
                this.pagination();
            },
            async pagination() {
                if(this.hasMore && !this.isLoading) {
                    this.isLoading = true;
                    let {hasMore, books} = await pagination(this.offset);
                    this.books = [...this.books, ...books];
                    this.hasMore = hasMore;
                    this.isLoading = false;
                    this.offset = this.books.length; // 维护偏移量，书的长度
                }
            },
            async getBooks() {
                this.books = await getBooks();
                this.loading = false
            },
            async removeBook(id) {
                await removeBook(id); //删除某一项
                // this.books = await getBooks(); //这样也行，但是多调用了一次
                this.books = this.books.filter((item)=>item.bookId != id)
            }
        }
    }
</script>

<style scoped lang="less">
    .more{
        text-align: center;
        line-height: 40px;
        padding-bottom: 10px;
    }
    .content{
        ul{
            padding: 10px;
            li{
                display: flex;
                padding: 10px 0;
                border-bottom: 1px solid #cccccc;
                img{
                    height: 150px;
                }
                h4{
                    font-size: 20px;
                    line-height: 35px;
                }
                p{
                    color: #2a2a2a;
                    line-height: 25px;
                }
                b{
                    color: red;
                }
                button{
                    outline: none;
                }
            }
        }
        
    }
</style>