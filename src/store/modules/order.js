import api from '../../api/order'
import * as types from '../mutation-types'
// initial state
// shape: [{ id, quantity }]
const state = {
    examination_order_list: {},
    examination_order_detail_list: {},

}
// getters
const getters = {
    examination_order_list: state => state.examination_order_list,
    examination_order_detail_list: state => state.examination_order_detail_list,
}
// actions
const actions = {


    examinationOrderList({commit, state}, request) {
        return api.examinationOrderList(request).then(rsp => {
            commit(types.EXAMINATION_ORDER_LIST, rsp.data);
        });
    },

    examinationOrderDetailList({commit, state}, request) {
        return api.examinationOrderDetailList(request).then(rsp => {
            commit(types.EXAMINATION_ORDER_DETAIL_LIST, rsp.data);
        });
    },



    editExaminationOrder({commit, state}, request) {
        return api.editExaminationOrder(request).then(rsp => {
        });
    },




}

// mutations
const mutations = {

    [types.EXAMINATION_ORDER_LIST](state, data) {
        state.examination_order_list = {
            data: data.data,
            meta: data.meta,
        };

    },

    [types.EXAMINATION_ORDER_DETAIL_LIST](state, data) {
        state.examination_order_detail_list = {
            data: data.data,
            meta: data.meta,
        };

    },



}
export default {
    state,
    getters,
    actions,
    mutations
}
