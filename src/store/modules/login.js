import api from '../../api/login'
import types from '../mutation-types/login'
import moment from "moment";
import imsRoutes from '../../routes/index.js'
// import router from '@/router.js';


const state = {
    title: 'IMS',
    slogan: '一切从登录开始',
    logining: false,
    is_logined: false,
    imsRoutes: imsRoutes.children,
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
    login({commit}, request) {
        commit(types.CHANGE_LOGINING);
        return api.login(request).then(rsp => {
            console.info(rsp.data.data);
            // console.info('vvv', imsRoutes.children);
            commit(types.FINISH_LOGIN, rsp.data);
            commit(types.GET_ROUTES, rsp.data.data.routes);
            commit(types.CHANGE_LOGINING);
            return rsp;
        }).catch(error => {
            commit(types.CHANGE_LOGINING);
            return error;
        });
    },
}

// mutations
const mutations = {
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
                    ...state.imsRoutes,
                    {
                        path: '/',
                        name: 'dashboard',
                        component: () => import('@/views/Dashboard.vue')
                    }

                ]
            }
        ];
        data.forEach((item, index) => {
            if (item.type == 1 && item.options.path && item.options.name) {
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
