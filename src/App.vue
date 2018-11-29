<template>
  <div id="app">
    <transition name="fadeIn">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fadeIn">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <Tab></Tab>
    <!--<button @click="modal">notify</button>-->
  </div>
</template>

<script>
  import Tab from './base/Tab'
  export default {
    components: {
        Tab
    },
    methods:{
      modal() {
          this.$notify("你很丑");
      }
    }
  }
</script>

<style>
  *{margin: 0;padding: 0}
  ul,li{list-style: none}
  a{text-decoration: none}
  input,button{
    appearance: none;
  }
  .content{position: fixed;left: 0;top:40px;bottom:50px;width: 100%;overflow: auto}

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
</style>
