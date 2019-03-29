import Vue from 'vue'
import Vuex from "vuex";

import * as actions from './actions'
import * as getters from './getters'

import menu from './modules/menu'
import categories from './modules/categories'
import post from './modules/post'
import banner from './modules/banner'
import node from './modules/node'
import department from './modules/department'
import admin from './modules/admin'
import user from './modules/user'

import role from './modules/role'
import thunder_project from './modules/thunder_project'

const debug = false;

const StoreConstructorOptions = {
    actions,
    getters,
    modules: {
        menu,
        categories,
        post,
        banner,
        node,
        department,
        user,
        admin,
        role,
        thunder_project,
    },
    strict: debug,

}
Vue.use(Vuex);
export default new Vuex.Store(StoreConstructorOptions);

// export default StoreConstructorOptions;
