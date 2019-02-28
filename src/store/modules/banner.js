import api from '../../api/banner'
import * as types from '../mutation-types'

const state = {
    post_list: {},

}
// getters
const getters = {
    banner_list: state => state.banner_list,
}
// actions
const actions = {

    bannerList({commit, state}, request) {
        return api.bannerList(request).then(rsp => {
            commit(types.BANNER_LIST, rsp.data);
        });
    },


    addBanner({commit, state}, request) {
        return api.addBanner(request).then(rsp => {

        });

    },
    editBanner({commit, state}, request) {
        return api.editBanner(request).then(rsp => {
        });
    },

    delBanner({commit, state}, request) {
        return api.delBanner(request).then(rsp => {
            // console.info(rsp);
            // getHospitals();
        });
    },
}

// mutations
const mutations = {

    [types.BANNER_LIST](state, data) {
        state.banner_list = {
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
