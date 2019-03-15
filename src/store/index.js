import * as actions from './actions'
import * as getters from './getters'

import Vue from 'vue'

// import user from './modules/user'
import menu from './modules/menu'
import hospital from './modules/hospital'
import medicalExamination from './modules/medical.examination'
import order from './modules/order'
import categories from './modules/categories'
import configIntegral from './modules/configs.integral'
import post from './modules/post'
import banner from './modules/banner'


import node from './modules/node'
import department from './modules/department'
import admin from './modules/admin'
import role from './modules/role'
import thunder_project from './modules/thunder_project'
// import createPersistedState from "vuex-persistedstate";
import Vuex from "vuex";
const debug = false;

const StoreConstructorOptions = {
    actions,
    getters,
    modules: {
        // user,
        menu,
        hospital,
        medicalExamination,
        categories,
        post,
        configIntegral,
        banner,
        node,
        department,
        admin,
        role,
        thunder_project,
        order
    },
    strict: debug,
    // plugins: [createPersistedState()]
    // plugins: debug ? [createLogger()] : []

}
Vue.use(Vuex);
export default new Vuex.Store(StoreConstructorOptions);

// export default StoreConstructorOptions;
