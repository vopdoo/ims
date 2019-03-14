import node from '../../api/thunder_project'
import * as types from '../mutation-types'

const state = {
    roles: [],
    // 序号	档案号	项目名称	委托单位	申请日期	合同日期	检测日期	"报告
    // 有效期至"	项目地址	建筑面积	面积单价折扣	检测点数	点单价	金额	项目负责人	联系人	TEL:	TEL:2	E-mail：	备注1	备注3	备注4

    columns: [
        {
            title: '序号',
            type: 'index',
            width: 80,
            fixed: 'left'
        },
        {
            title: '档案号',
            key: 'serial_number',
            width: 160,
            fixed: 'left'
        },

        {
            title: '项目名称',
            width: 150,
            key: 'name',
        },
        {
            title: '委托单位',
            width: 150,
            key: 'client',
        },
        {
            title: '申请日期',
            width: 150,
            key: 'applyed_at',
        },
        {
            title: '合同日期',
            width: 150,
            key: 'contracted_at',
        },
        {
            title: '检测日期',
            width: 150,
            key: 'tested_at',
        },
        {
            title: '报告有效期至',
            key: 'expired_at',
            width: 150,
        },
        {
            title: '项目地址',
            key: 'address',
            width: 150,
            tooltip: true
        },
        {
            title: '建筑面积',
            key: 'covered_area',
            width: 150,
        },
        {
            title: '面积单价折扣',
            key: 'discount',
            width: 150,
        },
        {
            title: '检测点数',
            key: 'point',
            width: 150,
        },
        {
            title: '点单价',
            key: 'unit_price',
            width: 150,
        },
        {
            title: '金额',
            key: 'amount',
            width: 150,
        },
        {
            title: '项目负责人',
            key: 'leader',
            width: 150,
        },
        {
            title: '联系人',
            key: 'contact',
            width: 150,
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
            label: '待审核'
        },
        {
            value: 2,
            label: '待签定'
        },
        {
            value: 3,
            label: '待检测'
        },
        {
            value: 3,
            label: '待付款'
        },
    ],
}
// getters
const getters = {
    roles: state => state.roles,
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
        state.roles = {
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
