import api from '../../api/admin'
import * as types from '../mutation-types'

const state = {
    title: 'IMSvvv',
    slogan: '一切从登录开始',
}
// getters





const getters = {
    title: state => state.title,
    slogan: state => state.slogan,

}
// actions
const actions = {
    loginInfo({commit}, request) {
        return api.loginInfo(request).then(rsp => {
            commit(types.GET_LOGIN_DATA, rsp.data);
            return rsp.data.data;
        });
    },
}

// mutations
const mutations = {

    [types.GET_LOGIN_DATA](state, data) {
        state.title = data.data.title;
        state.slogan = data.data.slogan;
    },

};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
