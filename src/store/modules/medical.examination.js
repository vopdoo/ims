import api from '../../api/medical.examination'
import * as types from '../mutation-types'
// initial state
// shape: [{ id, quantity }]
const state = {
    medical_examination_items: {},
    medical_examination_packages: {},
    medical_examination_appointments: {},
    medical_examination_report: {},
    medical_examination_all_items: [],
    medical_examination_goods: [],


}
// getters
const getters = {
    medical_examination_items: state => state.medical_examination_items,
    medical_examination_packages: state => state.medical_examination_packages,
    medical_examination_appointments: state => state.medical_examination_appointments,
    medical_examination_report: state => state.medical_examination_report,
    medical_examination_goods: state => state.medical_examination_goods,
    medical_examination_all_items: state => state.medical_examination_all_items,
}
// actions
const actions = {

    goodList({commit, state}, request) {
        return api.goodList(request).then(rsp => {
            commit(types.GET_GOOD, rsp.data);
        });

    },


    addGood({commit, state}, request) {
        return api.addGood(request).then(rsp => {

        });

    },
    editGood({commit, state}, request) {
        return api.editGood(request).then(rsp => {
        });
    },
    delGood({commit, state}, request) {
        return api.delGood(request).then(rsp => {
            // console.info(rsp);
            // getHospitals();
        });
    },


    appointmentList({commit, state}, request) {
        return api.appointmentList(request).then(rsp => {
            commit(types.GET_APPOINTMENT, rsp.data);
        });

    },

    reportList({commit, state}, request) {
        return api.reportList(request).then(rsp => {
            commit(types.GET_REPORT, rsp.data);
        });

    },

    editReport({commit, state}, request) {
        return api.editReport(request).then(rsp => {
        });
    },


    itemAllList({commit, state}, request) {
        return api.itemAllList(request).then(rsp => {
            commit(types.GET_ALL_ITEMS, rsp.data);
        });

    },

    packageList({commit, state}, request) {
        return api.packageList(request).then(rsp => {
            // console.info(rsp);
            commit(types.GET_PACKAGE, rsp.data);
        });

    },


    addPackage({commit, state}, request) {
        return api.addPackage(request).then(rsp => {

        });

    },

    editAppointment({commit, state}, request) {
        return api.editAppointment(request).then(rsp => {
        });
    },




    editPackage({commit, state}, request) {
        return api.editPackage(request).then(rsp => {
        });
    },
    delPackage({commit, state}, request) {
        return api.delPackage(request).then(rsp => {
            // console.info(rsp);
            // getHospitals();
        });
    },

    itemList({commit, state}, request) {
        return api.itemList(request).then(rsp => {
            // console.info(rsp);
            commit(types.GET_ITEMS, rsp.data);
        });

    },

    /***
     *
     * @param commit
     * @param state
     * @param request
     * @returns {*|PromiseLike<T>|Promise<T>}
     */
    validateName({commit, state}, request) {
        return api.validateName(request).then(rsp => {
            return rsp.data.data.result;
        });
    },

    validatePackageCodeOrName({commit, state}, request) {
        return api.validatePackageCodeOrName(request).then(rsp => {
            return rsp.data.data.result;
        });
    },



    addItem({commit, state}, request) {
        return api.addItem(request).then(rsp => {

        });

    },
    editItem({commit, state}, request) {
        return api.editItem(request).then(rsp => {
        });
    },
    delItem({commit, state}, request) {
        return api.delItem(request).then(rsp => {
            // console.info(rsp);
            // getHospitals();
        });
    },


}

// mutations
const mutations = {

    [types.GET_ITEMS](state, data) {
        state.medical_examination_items = {
            data: data.data,
            meta: data.meta,
        };

    },

    [types.GET_ALL_ITEMS](state, data) {
        state.medical_examination_all_items = data.data;
    },


    [types.GET_PACKAGE](state, data) {
        state.medical_examination_packages = {
            data: data.data,
            meta: data.meta,
        };

    },

    [types.GET_APPOINTMENT](state, data) {
        state.medical_examination_appointments = {
            data: data.data,
            meta: data.meta,
        };

    },

    [types.GET_GOOD](state, data) {
        state.medical_examination_goods = {
            data: data.data,
            meta: data.meta,
        };

    },

    [types.GET_REPORT](state, data) {
        state.medical_examination_report = {
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
