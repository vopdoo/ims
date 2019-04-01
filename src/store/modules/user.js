import node from '../../api/admin'
import * as types from '../mutation-types'
import moment from "moment";

const state = {
    logining: false,
    is_logined: false,
    lists: {},
    tags: [
        {
            value: 1,
            label: '有钱人'
        },
        {
            value: 2,
            label: '鼻子'
        },
        {
            value: 3,
            label: '面部'
        },
    ],
    menu: [],
    nav_menus: [],
    routers: [],
    users: {},
    admins: [],

    // 消费特征	客户状态	所属咨询	客服人员	指派咨询人员	咨询时间	首次预约	咨询项目	拍照	社会属性	区域	开发方式
    // 咨询项目


    columns: [
        {
            title: '档案编号',
            slot: 'name',
            fixed: 'left',
            width: 100
        },

        {
            title: '客户姓名',
            slot: 'name',
            width: 100
        },

        {
            title: '性别',
            slot: 'nick_name',
            width: 100
        },
        {
            title: '年龄',
            key: 'department_names',
            width: 150,
            tooltip: true
        },
        {
            title: '职业',
            key: 'role_names',
            width: 150,
            tooltip: true
        },
        {
            title: '手机',
            key: 'email',
            width: 100,
            tooltip: true,
            // slot: 'email'
        },
        {
            title: '生日',
            key: 'email',
            width: 100,
            tooltip: true,
            // slot: 'email'
        },
        {
            title: '微信号',
            key: 'email',
            width: 100,
            tooltip: true,
            // slot: 'email'
        },
        {
            title: '星座',
            key: 'email',
            width: 100,
            tooltip: true,
            // slot: 'email'
        },
        {
            title: '兴趣爱好',
            key: 'email',
            width: 100,
            tooltip: true,
            // slot: 'email'
        },
        {
            title: '通讯地址',
            key: 'email',
            width: 100,
            tooltip: true,
            // slot: 'email'
        },
        {
            title: '渠道',
            key: 'email',
            width: 100,
            tooltip: true,
            // slot: 'email'
        },

        {
            title: '状态',
            slot: 'status',
            width: 100
        },
        {
            title: '创建时间',
            slot: 'created_at',
            width: 150
        },
        {
            title: '更新时间',
            slot: 'updated_at',
            width: 150
        },
        {
            title: '操作',
            slot: 'action',
            width: 250,
            fixed: 'right'
        }
    ],
    statusList: [
        {
            value: 1,
            label: '启用'
        },
        {
            value: 0,
            label: '禁用'
        },
    ],
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
    lists: state => state.lists,
    statusList: state => state.statusList,
    columns: state => state.columns,
    tags: state => state.tags,
}
// actions
const actions = {
    lists({commit, state}, request) {
        return node.index(request).then(rsp => {
            commit(types.GET_USER_LIST, rsp.data);
            return rsp.data.data;
        });
    },
    create({dispatch}, request) {
        return node.store(request).then(rsp => {
            dispatch('lists');
            dispatch('department/lists', {is_show_tree: 1, has_admins: 1}, {root: true});
        });
    },
    edit({commit, state, dispatch}, request) {
        let filter = request.filter;
        delete request.filter;
        return node.update(request).then(rsp => {
            dispatch('lists', filter);
            dispatch('department/lists', {is_show_tree: 1, has_admins: 1}, {root: true});
        });
    },
    delete({dispatch}, request) {
        return node.delete(request).then(rsp => {
            dispatch('lists', {is_show_tree: 1});
            dispatch('department/lists', {is_show_tree: 1, has_admins: 1}, {root: true});
        });
    },
    validateCode({commit, state}, request) {
        return node.validateCode(request).then(rsp => {
            return rsp.data.data.result;
        });
    },
    login({commit, state}, request) {

        commit(types.ADMIN_CHANGE_LOGINING);
        return node.login(request).then(rsp => {
            console.info('vvv', rsp.data.data.routes);
            commit(types.ADMIN_LOGIN, rsp.data);
            commit(types.GET_ROUTES, rsp.data.data.routes);
            commit(types.ADMIN_CHANGE_LOGINING);
            return rsp;
        }).catch(error => {
            commit(types.ADMIN_CHANGE_LOGINING);
            return error;
        });
    },


    refreshToken({commit}, request) {
        return node.refreshToken(request).then(rsp => {
            commit(types.REFRESH_TOKEN, rsp.data);
            return rsp.data.data;
        }).catch(error => {
            console.info('refreshToken Fail');
            return error;
        });
    },


    logout({commit, state}, request) {

        return node.logout(request).then(rsp => {
            commit(types.ADMIN_LOGOUT, rsp.data);
            return rsp;
        }).catch(error => {
            return error;
        });
    },

    getNavMenus({commit, state}, request) {
        return node.getNavMenus(request).then(rsp => {
            commit(types.GET_NAV_MENUS, rsp.data.data);
            return rsp.data.data;
        });

    },
    getRoutes({commit, state}, request) {
        return node.getRoutes(request).then(rsp => {
            commit(types.GET_ROUTES, rsp.data.data);
            return rsp;
        }).catch(error => {
            return error;
        });
    }
}

// mutations
const mutations = {

    [types.GET_USER_LIST](state, data) {
        // state.admins = data.data;
        state.lists = {
            data: data.data,
            meta: data.meta,
        };
    },


    [types.ADD_NODE](state, data) {
        console.info(data);
    },

    [types.ADMIN_LOGOUT](state, data) {
        state.is_logined = false;
        sessionStorage.clear();
        state.admin = {};
        state.menu = [];
    },

    [types.ADMIN_LOGIN](state, data) {
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

    [types.GET_NAV_MENUS](state, data) {
        state.nav_menus = data;
    },
    [types.GET_ROUTES](state, data) {
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
        state.routers = willAddedRoutes;
    },


}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
