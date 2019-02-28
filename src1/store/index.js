import * as actions from './actions'
import * as getters from './getters'

import Vue from 'vue'

import auth from './modules/auth'
import node from './modules/node'
// import createPersistedState from "vuex-persistedstate";
import Vuex from "vuex";

const debug = false;


let StoreConstructorOptions = {
    actions,
    getters,
    modules: {
        auth,
        node,
    },
    strict: debug,
    // plugins: [createPersistedState()]
    // plugins: debug ? [createLogger()] : []

}
Vue.use(Vuex);
export default new Vuex.Store(StoreConstructorOptions);

// export default StoreConstructorOptions;
