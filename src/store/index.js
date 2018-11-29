import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger';
Vue.use(Vuex);

let state = {
    cartList : []
};

import mutations from './mutations';
import getters from './getters';

export default new Vuex.Store({
    state,
    mutations,
    getters,
    strict: true, // 只能通过mutation来更改状态， mutation不支持异步
    plugins: [logger()]
})
