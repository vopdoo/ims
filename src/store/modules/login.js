import api from '../../api/login'
import types from '../mutation-types/login'

const state = {
    title: 'IMS',
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
        console.info('request', request);
        return api.info(request).then(rsp => {
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
