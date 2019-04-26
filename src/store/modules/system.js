import api from '../../api/system'
import types from '../mutation-types/system'
import moment from "moment";

const state = {
    spining: false,
    nav_tabs: [
        {
            title: '控制台',
            name: '控制台',
            icon: 'ios-home-outline',
            path: '/admin',
            selected: true
        },
    ]
}
// getters
const getters = {
    nav_tabs: state => state.nav_tabs,
    spining: state => state.spining,
}
// actions
const actions = {
    async getNavTabs({commit, dispatch}, request) {
        // console.info(request);
        const db = await dispatch('db/database', {user: true}, {root: true});
        let nav_tabs = db.get('nav_tabs').value();
        commit(types.GET_NAV_TABS, nav_tabs);
    },
    changeSpining({commit, dispatch}, request) {
        commit(types.CHANGE_SPINING, request.spining);
    },
    refreshToken({commit}, request) {
        return api.refreshToken(request).then(rsp => {
            commit(types.SYSTEM_REFRESH_TOKEN, rsp.data);
            return rsp.data.data;
        }).catch(error => {
            return error;
        });
    },
}

// mutations
const mutations = {
    [types.GET_NAV_TABS](state, data) {
        if (data !== undefined) {
            state.nav_tabs = data;
        }
    },
    [types.SYSTEM_REFRESH_TOKEN](state, data) {
        sessionStorage.access_token = data.data.access_token;
        sessionStorage.token_type = data.data.token_type;
        sessionStorage.expires_in = data.data.expires_in;
        sessionStorage.expired_at = data.data.expires_in + moment().unix();
    },

    [types.CHANGE_SPINING](state, data) {
        state.spining = data;
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
