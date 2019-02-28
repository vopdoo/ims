import api from '../../api/user'
import * as types from '../mutation-types'
import moment from 'moment';
import {resetRouter} from '@/router';

const state = {
    logining: false,
    is_logined: false,
    admin: {},
    menu: [],
    nav_menus: [],
    routers: [],
    users: {},
}
// getters
const getters = {
    logining: state => state.logining,
    is_logined: state => state.is_logined,
    admin: state => state.admin,
    menu: state => state.menu,
    nav_menus: state => state.nav_menus,
    users: state => state.users,
    routers: state => state.routers,
}
// actions
const actions = {
    userList({commit, state}, request) {
        return api.userList(request).then(rsp => {
            commit(types.GET_USER, rsp.data);
        });

    },
    editUser({commit, state}, request) {
        return api.editUser(request).then(rsp => {
        });
    },
    delUser({commit, state}, request) {
        return api.delUser(request).then(rsp => {
        });
    },

    refreshToken({commit}, request) {
        return api.refreshToken(request).then(rsp => {
            commit(types.REFRESH_TOKEN, rsp.data);
            return rsp.data.data;
        }).catch(error => {
            console.info('refreshToken Fail');
            return error;
        });
    },
    logout({commit}, request) {
        return api.logout(request).then(rsp => {
            commit(types.ADMIN_LOGOUT);
        });
    },

    login({commit, state}, request) {
        commit(types.ADMIN_CHANGE_LOGINING);
        return api.login(request).then(rsp => {
            commit(types.ADMIN_LOGIN, rsp.data);
            commit(types.ADMIN_CHANGE_LOGINING);
            commit(types.GET_ROUTES, rsp.data.data.routes);
            return rsp;
        }).catch(error => {
            commit(types.ADMIN_CHANGE_LOGINING);
            return error;
        });
    },

    getNavMenus({commit, state}, request) {
        return api.getNavMenus(request).then(rsp => {
            commit(types.GET_NAV_MENUS, rsp.data.data);
            return rsp.data.data;
        });

    },
    getRoutes({commit, state}, request) {
        return api.getRoutes(request).then(rsp => {
            commit(types.GET_ROUTES, rsp.data.data);
            return rsp;
        }).catch(error => {
            console.info('getRoutes:error', error);
            return error;
        });
    }
}

// mutations
const mutations = {
    [types.GET_USER](state, data) {
        state.users = {
            data: data.data,
            meta: data.meta,
        };
    },
    [types.ADMIN_LOGOUT](state, data) {
        sessionStorage.clear();
        resetRouter();
    },


    [types.GET_NAV_MENUS](state, data) {
        console.info('GET_NAV_MENUS', data);
        state.nav_menus = data;
    },
    [types.GET_ROUTES](state, data) {
        console.info('GET_ROUTES', data);
        let willAddedRoutes = [
            {
                path: '/',
                component: () => import('@/views/Layout.vue'),
                children: [

                    {
                        path: '/',
                        name: 'dashboard',
                        component: () => import('@/views/Dashboard.vue')
                    },
                    // {
                    //     path: 'settings/nodes',
                    //     name: 'settings_nodes',
                    //     component: () => import('@/views/settings/node.vue')
                    // }
                ]
            }
        ];
        data.forEach((item, index) => {
            console.info('addRoutes', item);
            willAddedRoutes[0].children.push({
                path: item.others.path,
                name: item.others.name,
                meta: {
                    index: index
                },
                component: () => import('@/views/' + item.others.path + '.vue')
            });
        });
        console.info('vv', willAddedRoutes);
        state.routers = willAddedRoutes;
    },
    [types.ADMIN_LOGIN](state, data) {
        console.info('mutations..... ADMIN_LOGIN');
        state.is_logined = true;
        sessionStorage.access_token = data.data.access_token;
        sessionStorage.token_type = data.data.token_type;
        sessionStorage.expires_in = data.data.expires_in;
        sessionStorage.expired_at = data.data.expires_in + moment().unix();
        sessionStorage.id = data.data.admin.id;
        sessionStorage.nick_name = data.data.admin.nick_name;
        state.admin = data.data.admin;
        state.menu = data.data.menu;

    },
    [types.REFRESH_TOKEN](state, data) {
        sessionStorage.access_token = data.data.access_token;
        sessionStorage.token_type = data.data.token_type;
        sessionStorage.expires_in = data.data.expires_in;
        sessionStorage.expired_at = data.data.expires_in + moment().unix();
    },
    [types.ADMIN_CHANGE_LOGINING](state) {
        state.logining = !state.logining;
    },
}
export default {
    state,
    getters,
    actions,
    mutations
}
