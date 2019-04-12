import node from '../../api/node'
import * as types from '../mutation-types'

const state = {
    nodes: [],
}
// getters
const getters = {
    nodes: state => state.nodes,
}
// actions
const actions = {
    lists({commit, state}, request) {
        return node.index(request).then(rsp => {
            commit(types.GET_NODES, rsp.data);
            return rsp.data.data;
        });
    },
    create({dispatch}, request) {
        return node.store(request).then(rsp => {
            dispatch('lists', {is_show_tree: 1});
        });
    },
    edit({commit, state,dispatch}, request) {
        return node.update(request).then(rsp => {
            dispatch('lists', {is_show_tree: 1});
            // commit(types.ADD_MENUS, rsp.data);
            // this.getMenus({commit, state},{});
        });
    },
    delete({dispatch}, request) {
        return node.delete(request).then(rsp => {
            dispatch('lists', {is_show_tree: 1});
        });
    },
    validateCode({commit, state}, request) {
        return node.validateCode(request).then(rsp => {
            return rsp.data.data.result;
        });
    },
}

// mutations
const mutations = {

    [types.GET_NODES](state, data) {
        state.nodes = data.data;
    },

    // [types.DIFF_ROUTES](state, data) {
    //     console.info('DIFF_ROUTES',data);
    //     // state.menus = data.data;
    // },

    [types.ADD_NODE](state, data) {
        console.info(data);
        // state.menus = data.data;

    },


}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
