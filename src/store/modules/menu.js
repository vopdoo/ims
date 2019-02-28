import menu from '../../api/menu'
import * as types from '../mutation-types'
// initial state
// shape: [{ id, quantity }]
const state = {
    menus: [],


}
// getters
const getters = {
    menus: state => state.menus,
}
// actions
const actions = {


    getMenus({commit, state}, request) {
        return menu.getMenus(request).then(rsp => {
            commit(types.GET_MENUS, rsp.data);
            return rsp.data.data;
        });

    },

    validateNamePath({commit, state}, request) {
        return menu.validateNamePath(request).then(rsp => {
            return rsp.data.data.result;
        });

    },

    addMenu({commit, state}, request) {
        return menu.addMenu(request).then(rsp => {
            // commit(types.ADD_MENUS, rsp.data);
            // this.getMenus({commit, state},{});
        });

    },
    editMenu({commit, state}, request) {
        return menu.editMenu(request).then(rsp => {
            // commit(types.ADD_MENUS, rsp.data);
            // this.getMenus({commit, state},{});
        });

    },

    delMenu({commit, state}, request) {
        return menu.delMenu(request).then(rsp => {
            console.info(rsp);
            // commit(types.ADD_MENUS, rsp.data);
            // this.getMenus({commit, state},{});
        });

    },


}

// mutations
const mutations = {

    [types.GET_MENUS](state, data) {
        state.menus = data.data;
    },

    [types.DIFF_ROUTES](state, data) {
        console.info('DIFF_ROUTES',data);
        // state.menus = data.data;
    },

    [types.ADD_MENUS](state, data) {
        console.info(data);
        // state.menus = data.data;

    },


}
export default {
    state,
    getters,
    actions,
    mutations
}
