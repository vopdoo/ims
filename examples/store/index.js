import Vue from 'vue'
import Vuex from "vuex";

import DefaultStoreConstructorOptions from '@ims/store';

import rootActions from './actions'
import rootGetters from './getters'
import rootState from './state'
import rootMutations from './mutations'

const state = {
    ...rootState,
    ...DefaultStoreConstructorOptions.state
}

const actions = {
    ...rootActions,
    ...DefaultStoreConstructorOptions.actions,
}
//
const getters = {
    ...rootGetters,
    ...DefaultStoreConstructorOptions.getters,
}

const mutations = {
    ...rootMutations,
    ...DefaultStoreConstructorOptions.mutations,
}

import node from './modules/node'
import department from './modules/department'
// import admin from './modules/admin'

const debug = false;

const StoreConstructorOptions = {
    state,
    actions,
    getters,
    mutations,
    modules: {
        ...DefaultStoreConstructorOptions.modules,
        node,
        department,
        // admin,
    },
    strict: debug,

}
Vue.use(Vuex);
export default new Vuex.Store(StoreConstructorOptions);

// export default StoreConstructorOptions;
