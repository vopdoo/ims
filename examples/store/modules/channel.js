import api from '../../api/channel'
import types from '../mutation-types/channel'

const state = {
    channels: [],
}
// getters
const getters = {
    channels: state => state.channels,
}
// actions
const actions = {
    lists({commit, state}, request) {
        return api.index(request).then(rsp => {
            commit(types.GET_CHANNELS, rsp.data);
            return rsp.data.data;
        });
    },
    create({dispatch}, request) {
        return api.store(request).then(rsp => {
            dispatch('lists', {is_show_tree: 1});
        });
    },
    edit({commit, state,dispatch}, request) {
        return api.update(request).then(rsp => {
            dispatch('lists', {is_show_tree: 1});
            // commit(types.ADD_MENUS, rsp.data);
            // this.getMenus({commit, state},{});
        });
    },
    delete({dispatch}, request) {
        return api.delete(request).then(rsp => {
            dispatch('lists', {is_show_tree: 1});
        });
    },
    validateCode({commit, state}, request) {
        return api.validateCode(request).then(rsp => {
            return rsp.data.data.result;
        });
    },
}

// mutations
const mutations = {

    [types.GET_CHANNELS](state, data) {
        state.channels = data.data;
    },


    [types.ADD_CHANNELS](state, data) {
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
