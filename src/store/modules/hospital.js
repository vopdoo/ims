import hospital from '../../api/hospital'
import * as types from '../mutation-types'
// initial state
// shape: [{ id, quantity }]
const state = {
    hospitals: {},
    hospital_levels:{},
}
// getters
const getters = {
    hospitals: state => state.hospitals,
    hospital_levels: state => state.hospital_levels,
}
// actions
const actions = {

    getHospitals({commit, state}, request) {
        return hospital.lists(request).then(rsp => {
            // console.info(rsp);
            commit(types.GET_HOSPITAL, rsp.data);
        });

    },

    getHospitalLevels({commit, state}, request) {
        return hospital.getHospitalLevels(request).then(rsp => {
            // console.info(rsp);
            commit(types.GET_HOSPITAL_LEVELS, rsp.data);
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
        return hospital.validateName(request).then(rsp => {
            return rsp.data.data.result;
        });
    },

    addLevel({commit, state}, request) {
        return hospital.addLevel(request).then(rsp => {

        });

    },
    editLevel({commit, state}, request) {
        return hospital.editLevel(request).then(rsp => {

        });

    },

    delLevel({commit, state}, request) {
        return hospital.delLevel(request).then(rsp => {
            // console.info(rsp);
            // getHospitals();
        });
    },

    add({commit, state}, request) {
        return hospital.add(request).then(rsp => {

        });

    },
    edit({commit, state}, request) {
        return hospital.edit(request).then(rsp => {

        });

    },

    getGeocoder({commit, state}, request) {

        return hospital.getGeocoder(request).then(rsp => {
            return rsp;
        });

    },
    del({commit, state}, request) {
        return hospital.del(request).then(rsp => {
            // console.info(rsp);
            // getHospitals();
        });
    },


}

// mutations
const mutations = {

    [types.GET_HOSPITAL](state, data) {
        state.hospitals = {
            data:data.data,
            meta:data.meta,
        };

    },

    [types.GET_HOSPITAL_LEVELS](state, data) {
        state.hospital_levels = {
            data:data.data,
            meta:data.meta,
        };

    },



    [types.ADD_MENUS](state, data) {
        // console.info(data);
        // state.menus = data.data;

    },


}
export default {
    state,
    getters,
    actions,
    mutations
}
