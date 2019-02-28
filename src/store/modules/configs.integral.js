import api from '../../api/configs.integral.js'
import * as types from '../mutation-types'

const state = {
    config_integral_list: {},

}
// getters
const getters = {
    config_integral_list: state => state.config_integral_list,
}
// actions
const actions = {

    configIntegralList({commit, state}, request) {
        return api.configIntegralList(request).then(rsp => {
            commit(types.CONFIG_INTEGRAL_LIST, rsp.data);
        });
    },


    addConfigIntegral({commit, state}, request) {
        return api.addConfigIntegral(request).then(rsp => {

        });

    },
    editConfigIntegral({commit, state}, request) {
        return api.editConfigIntegral(request).then(rsp => {
        });
    },

    delConfigIntegral({commit, state}, request) {
        return api.delConfigIntegral(request).then(rsp => {

        });
    },

}

// mutations
const mutations = {

    [types.CONFIG_INTEGRAL_LIST](state, data) {
        state.config_integral_list = {
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
