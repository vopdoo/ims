import api from '../../api/schedules'
import types from '../mutation-types/schedules'

const state = {
    lists: {
        data:[],
        meta:{
            total:0
        }
    },
    columns: [

        {
            title: '时间段',
            key: 'mobile',
            width: 120
        },

        {
            title: '状态',
            key: 'status',
            width: 100,
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
            width: 280,
            fixed: 'right'
        }
    ],
    statusList: [
        {
            value: 1,
            label: '待到院'
        },
        {
            value: 2,
            label: '待分诊'
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
        return api.index(request).then(rsp => {
            commit(types.GET_SCHEDULES, rsp.data);
            return rsp.data.data;
        });
    },
    create({dispatch}, request) {
        return api.store(request).then(rsp => {
            dispatch('lists');
        });
    },
    edit({commit, state, dispatch}, request) {
        let filter = request.filter;
        delete request.filter;
        return api.update(request).then(rsp => {
            dispatch('lists', filter);
        });
    },
    delete({dispatch}, request) {
        return api.delete(request).then(rsp => {
            dispatch('lists', {is_show_tree: 1});
        });
    },
    validateCode({commit, state}, request) {
        return api.validateCode(request).then(rsp => {
            return rsp.data.data.result;
        });
    },



}

// mutations
const mutations = {

    [types.GET_SCHEDULES](state, data) {
        // state.admins = data.data;
        state.lists = {
            data: data.data,
            meta: data.meta,
        };
    },






}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
