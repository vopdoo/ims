import Vue from 'vue'
import Vuex from "vuex";

import * as actions from './actions'
import * as getters from './getters'


import node from './modules/node'
import department from './modules/department'
// import admin from './modules/admin'

const debug = false;

const StoreConstructorOptions = {
    actions,
    getters,
    modules: {
        node,
        department,
        // admin,
    },
    strict: debug,

}
Vue.use(Vuex);
export default new Vuex.Store(StoreConstructorOptions);

// export default StoreConstructorOptions;
