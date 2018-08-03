<template>
    <div>
        Collection
    </div>
</template>

<script>
    import MHeader from '../base/MHeader';
    // 辅助函数 语法糖
    import {mapState, mapGetters} from 'vuex';
    export default {
        computed: {
            // 等价于
            /**
             * cartList() {
             *  return this.$store.state.cartList
             * }
             */
            ...mapState(['cartList']),
            ...mapGetters(['count'])
        }
    }
</script>

<style scoped>

</style>