<template>
    <swiper :options="swiperOption">
        <swiper-slide v-for="(slide,index) in swiperSlides" :key="index">
            <img :src="slide" width="100%">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
    export default {
        name: 'carrousel',
        props: ['swiperSlides'],
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    }
                }
            }
        },
        // mounted() {
            // setInterval(() => {
            //     console.log('simulate async data')
            //     if (this.swiperSlides.length < 10) {
            //         this.swiperSlides.push(this.swiperSlides.length + 1)
            //     }
            // }, 3000)
        // }
    }
</script>