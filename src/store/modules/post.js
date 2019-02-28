import api from '../../api/post'
import * as types from '../mutation-types'

const state = {
    post_list: {},

}
// getters
const getters = {
    post_list: state => state.post_list,
}
// actions
const actions = {

    postList({commit, state}, request) {
        return api.postList(request).then(rsp => {
            commit(types.POST_LIST, rsp.data);
        });
    },


    addPost({commit, state}, request) {
        return api.addPost(request).then(rsp => {

        });

    },
    editPost({commit, state}, request) {
        return api.editPost(request).then(rsp => {
        });
    },

    delPost({commit, state}, request) {
        return api.delPost(request).then(rsp => {
            // console.info(rsp);
            // getHospitals();
        });
    },
}

// mutations
const mutations = {

    [types.POST_LIST](state, data) {
        state.post_list = {
            data: data.data,
            meta: data.meta,
        };

    },

}
export default {
    state,
    getters,
    actions,
    mutations
}
