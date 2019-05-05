import api from '../../api/reservations'
import types from '../mutation-types/reservations'

const state = {
    lists: {
        data:[],
        meta:{
            total:0
        }
    },
    columns: [
        {
            title: '预约编号',
            key:'id',
            fixed: 'left',
            width: 90
        },
        {
            title: '类型',
            slot: 'type',
            width: 80,
            fixed: 'left',
        },
        {
            title: '客户姓名',
            slot: 'user_name',
            fixed: 'left',
            width: 100
        },
        {
            title: '手机',
            key: 'mobile',
            width: 120
        },

        {
            title: '科室',
            slot: 'department',
            width: 100
        },
        {
            title: '医生',
            slot: 'admin',
            width: 100
        },
        {
            title: '预约时间段',
            slot: 'schedule_at',
            width: 280
        },

        {
            title: '状态',
            slot: 'status',
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
            width: 320,
            fixed: 'right'
        }
    ],
    statusList: [
        {
            value: '1',
            label: '待到院'
        },
        {
            value: '2',
            label: '待分诊'
        },
        {
            value: '3',
            label: '已分诊'
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
            commit(types.GET_RESERVATIONS, rsp.data);
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
    consult({dispatch}, request) {
        return api.consult(request).then(rsp => {
            dispatch('lists');
        });
    },
    revisit({dispatch}, request) {
        return api.revisit(request).then(rsp => {
            dispatch('lists');
        });
    },





}

// mutations
const mutations = {

    [types.GET_RESERVATIONS](state, data) {
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
