import node from '../../api/role'
import * as types from '../mutation-types'

const state = {
    lists: [],
    columns: [
        {
            title: '名称',
            slot: 'name',
            fixed: 'left'
        },

        {
            title: '标识',
            slot: 'code'
        },

        {
            title: '关联部门',
            key: 'department_names', // Authorized
            // width:150,
            tooltip: true
        },
        {
            title: '授权节点',
            key: 'node_names',
            tooltip: true
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
    lists: state => state.lists,
    statusList: state => state.statusList,
    columns: state => state.columns,
}
// actions
const actions = {
    lists({commit, state}, request) {
        return node.index(request).then(rsp => {
            commit(types.GET_ROLES, rsp.data);
            return rsp.data.data;
        });
    },
    create({dispatch}, request) {
        return node.store(request).then(rsp => {
            dispatch('lists');
        });
    },
    edit({commit, state, dispatch}, request) {
        let filter = request.filter;
        delete request.filter;
        return node.update(request).then(rsp => {
            dispatch('lists', filter);
        });
    },
    delete({dispatch}, request) {
        return node.delete(request).then(rsp => {
            dispatch('lists', {is_show_tree: 1});
        });
    },
    validateCode({commit, state}, request) {
        return node.validateCode(request).then(rsp => {
            return rsp.data.data.result;
        });
    },
}

// mutations
const mutations = {

    [types.GET_ROLES](state, data) {
        state.lists = {
            data: data.data,
            meta: data.meta,
        };
    },

    [types.ADD_ROLE](state, data) {
        console.info(data);
        // state.menus = data.data;
    },


}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
