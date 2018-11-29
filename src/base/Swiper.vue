<template>
    <swiper :options="swiperOption">
        <swiper-slide v-for="(slide,index) in swiperSlides" :key="index">
            <img :src="slide" alt="" width="100%"/>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
    export default {
        name: 'carrousel',
        props:{
            swiperSlides:{
                require:true
            }
        }, //校验的话就写对象，不校验就写数组
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    }
                }
            }
        }
    }
</script>