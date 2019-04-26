import Vue from 'vue'
import Vuex from "vuex"

import {storeConstructorOptions as imsStoreConstructorOptions} from '@ims'


import rootActions from './actions'
import rootGetters from './getters'
import rootState from './state'
import rootMutations from './mutations'
import businessModules from './modules'

const state = {
    ...rootState,
    ...imsStoreConstructorOptions.state
}

const actions = {
    ...rootActions,
    ...imsStoreConstructorOptions.actions,
}
//
const getters = {
    ...rootGetters,
    ...imsStoreConstructorOptions.getters,
}

const mutations = {
    ...rootMutations,
    ...imsStoreConstructorOptions.mutations,
}


const modules = {
    ...imsStoreConstructorOptions.modules,
    ...businessModules
}

const debug = false;

const StoreConstructorOptions = {
    state,
    actions,
    getters,
    mutations,
    modules,
    strict: debug,

}
Vue.use(Vuex);
export default new Vuex.Store(StoreConstructorOptions);

// export default StoreConstructorOptions;
