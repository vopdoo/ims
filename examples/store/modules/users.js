import api from '../../api/users'
import types from '../mutation-types/users'

const state = {
    lists: {
        data:[],
        meta:{
            total:0
        }
    },
    columns: [
        {
            title: '档案编号',
            key:'serial_number',
            fixed: 'left',
            width: 150
        },
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
            title: '性别',
            // key: 'gender',
            slot: 'gender',
            width: 80,
            tooltip: true
        },
        {
            title: '手机号码',
            key: 'mobile',
            width: 100,
        },
        {
            title: '邮箱',
            key: 'email',
            width: 100,
            tooltip: true,
            // slot: 'email'
        },
        {
            title: '微信号',
            key: 'wechat_id',
            width: 100,
            // slot: 'wechat_id'
        },
        {
            title: '年龄',
            key: 'age',
            width: 100,
            // slot: 'wechat_id'
        },
        {
            title: '生日',
            key: 'birthday',
            width: 100,
            // slot: 'wechat_id'
        },
        {
            title: '职业',
            key: 'occupation',
            width: 150,
            tooltip: true
        },
        {
            title: '兴趣爱好',
            key: 'hobbies',
            width: 150,
            tooltip: true
        },
        {
            title: '咨询项目',
            key: 'consulting_project',
            width: 150,
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
    lists: state => state.lists,
    statusList: state => state.statusList,
    columns: state => state.columns,
}
// actions
const actions = {
    lists({commit, state}, request) {
        return api.index(request).then(rsp => {
            commit(types.GET_USERS, rsp.data);
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

    [types.GET_USERS](state, data) {
        // state.admins = data.data;
        state.lists = {
            data: data.data,
            meta: data.meta,
        };
    },


    [types.ADD_USERS](state, data) {
        console.info(data);
    },





}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
