<template>
    <div>
        <m-header>首页</m-header>
        <div class="content">
            <swiper :swiperSlides="sliders"></swiper>
        </div>
    </div>
</template>

<script>
    import MHeader from '../base/MHeader'
    import Swiper from '../base/Swiper'
    import {getSliders} from "../api";

    export default {
        data(){
            return {
                sliders:[]
            }
        },
        components: {
            MHeader,Swiper
        },
        async created() {
            let {data: sliders} =  await getSliders();
            this.sliders = sliders;
        }
    }
</script>

<style scoped>

</style>