import node from '../../api/admin'
import * as types from '../mutation-types'
import moment from "moment";

const state = {
    admin: {},
    menu: [],
    nav_menus: [],
    users: {},
    admins: {
        data:[],
        meta:{
            total:0
        }
    },
    columns: [
        {
            title: '姓名',
            slot: 'name',
            fixed: 'left',
            width: 100
        },

        {
            title: '昵称',
            slot: 'nick_name',
            width: 100
        },
        {
            title: '部门',
            key: 'department_names',
            width: 150,
            tooltip: true
        },
        {
            title: '角色',
            key: 'role_names',
            width: 150,
            tooltip: true
        },
        {
            title: '邮箱',
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
            width: 150,
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
    admins: state => state.admins,
    statusList: state => state.statusList,
    columns: state => state.columns,
}
// actions
const actions = {
    lists({commit, state}, request) {
        return node.index(request).then(rsp => {
            commit(types.GET_ADMINS, rsp.data);
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

    refreshToken({commit}, request) {
        return node.refreshToken(request).then(rsp => {
            commit(types.REFRESH_TOKEN, rsp.data);
            return rsp.data.data;
        }).catch(error => {
            return error;
        });
    },
    getNavMenus({commit, state}, request) {
        return node.getNavMenus(request).then(rsp => {
            commit(types.GET_NAV_MENUS, rsp.data.data);
            return rsp.data.data;
        });
    }


}

// mutations
const mutations = {

    [types.GET_ADMINS](state, data) {
        // state.admins = data.data;
        state.admins = {
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
    [types.GET_NAV_MENUS](state, data) {
        state.nav_menus = data;
    },



}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
