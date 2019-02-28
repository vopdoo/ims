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

    abc({commit, state}, request) {
        alert(1);
    },


    getNodes({commit, state}, request) {
        return node.getNodes(request).then(rsp => {
            commit(types.GET_NODES, rsp.data);
            return rsp.data.data;
        });

    },

    validateCode({commit, state}, request) {
        return node.validateCode(request).then(rsp => {
            return rsp.data.data.result;
        });

    },

    addNode({commit, state}, request) {
        return node.addNode(request).then(rsp => {
            // commit(types.ADD_MENUS, rsp.data);
            // this.getMenus({commit, state},{});
        });

    },
    editNode({commit, state}, request) {
        return node.editNode(request).then(rsp => {
            // commit(types.ADD_MENUS, rsp.data);
            // this.getMenus({commit, state},{});
        });
    },

    delMenu({commit, state}, request) {
        return node.delNode(request).then(rsp => {
            console.info(rsp);
            // commit(types.ADD_MENUS, rsp.data);
            // this.getMenus({commit, state},{});
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
export const nodes = {
    state,
    getters,
    actions,
    mutations
}

// export {
//     state,
//     getters,
//     actions,
//     mutations
// }
