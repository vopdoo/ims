import node from '../../api/admin'
import * as types from '../mutation-types'

const state = {
    admins: [],
    columns: [
        {
            title: '姓名',
            slot: 'name',
            fixed: 'left'
        },

        {
            title: '昵称',
            slot: 'nick_name'
        },
        {
            title: '部门',
            key: 'department_names',
            // width:150,
            tooltip:true
        },
        {
            title: '邮箱',
            key:'email',
            tooltip:true,
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
            fixed: 'right'
        }
    ],
    statusList: [
        // {
        //     value: '',
        //     label: '全部'
        // },
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
            console.info(rsp);
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

    [types.GET_ADMINS](state, data) {
        // state.admins = data.data;
        state.admins = {
            data: data.data,
            meta: data.meta,
        };
    },

    // [types.DIFF_ROUTES](state, data) {
    //     console.info('DIFF_ROUTES',data);
    //     // state.menus = data.data;
    // },

    [types.ADD_NODE](state, data) {
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
