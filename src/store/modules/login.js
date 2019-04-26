import api from '../../api/login'
import types from '../mutation-types/login'
import moment from "moment";
import imsRoutes from '../../routes'
import utils from '../../utils'


// console.info(imsRoutes.children);

const state = {
    title: 'IMSss',
    slogan: '一切从登录开始',
    logining: false,
    is_logined: false,
    // imsRoutes: imsRoutes.children,
    imsRoutes: imsRoutes,
    routers: [],
}
// getters
const getters = {
    title: state => state.title,
    slogan: state => state.slogan,
    logining: state => state.logining,
    is_logined: state => state.is_logined,
    routers: state => state.routers,

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
     login({commit, dispatch}, request) {
        commit(types.CHANGE_LOGINING);

        return api.login(request).then(async rsp => {
            utils.cookies.set('uuid', rsp.data.data.admin.id);
            utils.cookies.set('access_token', rsp.data.data.access_token);
            const db = await dispatch('db/database', {user:true}, {root: true});
            // sessionStorage.token_type = data.data.token_type;
            // sessionStorage.expires_in = data.data.expires_in;
            // sessionStorage.expired_at = data.data.expires_in + moment().unix();
            // sessionStorage.id = data.data.admin.id;
            // sessionStorage.nick_name = data.data.admin.nick_name;
            db.set('routes', rsp.data.data.routes).write();
            commit(types.FINISH_LOGIN, rsp.data);
            commit(types.GET_ROUTES, rsp.data.data.routes);
            commit(types.CHANGE_LOGINING);
            return rsp;
        }).catch(error => {
            commit(types.CHANGE_LOGINING);
            return error;
        });
    },
    logout({commit, state}, request) {

        return api.logout(request).then(rsp => {
            commit(types.LOGIN_LOGOUT, rsp.data);
            return rsp;
        }).catch(error => {
            return error;
        });
    },
}

// mutations
const mutations = {
    [types.LOGIN_LOGOUT](state, data) {
        state.is_logined = false;
        sessionStorage.clear();
        localStorage.clear();
    },
    [types.GET_LOGIN_DATA](state, data) {
        state.title = data.data.title;
        state.slogan = data.data.slogan;
    },
    [types.CHANGE_LOGINING](state) {
        state.logining = !state.logining;
    },

    [types.FINISH_LOGIN](state, data) {
        state.is_logined = true;
        sessionStorage.access_token = data.data.access_token;
        sessionStorage.token_type = data.data.token_type;
        sessionStorage.expires_in = data.data.expires_in;
        sessionStorage.expired_at = data.data.expires_in + moment().unix();
        sessionStorage.id = data.data.admin.id;
        sessionStorage.nick_name = data.data.admin.nick_name;
    },

    [types.GET_ROUTES](state, data) {
        let willAddedRoutes = [
            {
                path: '/admin',
                component: () => import('@/views/admin.vue'),
                children: [
                    ...state.imsRoutes.children,
                    {
                        path: '/',
                        name: 'dashboard',
                        component: () => import('@/views/Dashboard.vue')
                    }
                ]
            }
        ];
        data.forEach((item, index) => {
            const lastHistoryRouteIndex = state.imsRoutes.children.findIndex(obj => {
                return obj.path == item.options.path
            });
            if (item.type == 1 && item.options.path && item.options.name && lastHistoryRouteIndex < 0) {

                willAddedRoutes[0].children.push({
                    path: item.options.path,
                    name: item.options.name,
                    meta: {
                        index: index
                    },
                    component: () => import('@/views/' + item.options.path + '.vue')
                });
            }
        });
        // willAddedRoutes.concat([{
        //     path: '*',
        //     redirect: '/404'
        // }]);
        // console.info('willAddedRoutes', willAddedRoutes);
        state.routers = willAddedRoutes;
    },


};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
