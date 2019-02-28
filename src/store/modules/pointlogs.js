import pointlogs from '../../api/pointlogs'
import * as types from '../mutation-types'
// initial state

const state = {
    pointlogs: [],
    pointlogsCount: 0,
    report: [],

}
// getters
const getters = {
    pointlogs: state => state.pointlogs,
    pointlogsCount: state => state.pointlogsCount,
    report: state => state.report,

}
// actions
const actions = {

    getPointlogs({ commit, state }, request) {
        pointlogs.getPointlogs(request).then(rsp => {
            commit(types.GET_POINT_LOGS, rsp.data.data)
        })

    },


    getReport({ commit, state }, request) {
        pointlogs.getReport(request).then(rsp => {
            console.info(rsp.data.data);
            commit(types.GET_REPORT, rsp.data.data)
        })

    },

}
// mutations
const mutations = {


    [types.GET_POINT_LOGS](state, data) {
        // console.info(payload);
        state.pointlogs = data.list;
        state.pointlogsCount = data.total;

    },
    [types.GET_REPORT](state, data) {
        // console.info(payload);
        state.report = data;


    },

}
export default {
    state,
    getters,
    actions,
    mutations
}