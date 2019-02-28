import api from '../../api/categories'
import * as types from '../mutation-types'

const state = {
    categories_list: {},

}
// getters
const getters = {
    categories_list: state => state.categories_list,
}
// actions
const actions = {

    categoriesList({commit, state}, request) {
        return api.categoriesList(request).then(rsp => {
            commit(types.CATEGORIES_LIST, rsp.data);
        });
    },


    addCategories({commit, state}, request) {
        return api.addCategories(request).then(rsp => {

        });

    },
    editCategories({commit, state}, request) {
        return api.editCategories(request).then(rsp => {
        });
    },

    delCategories({commit, state}, request) {
        return api.delCategories(request).then(rsp => {
            // console.info(rsp);
            // getHospitals();
        });
    },

    /***
     *
     * @param commit
     * @param state
     * @param request
     * @returns {*|PromiseLike<T>|Promise<T>}
     */
    validateCategoriesName({commit, state}, request) {
        return api.validateCategoriesName(request).then(rsp => {
            return rsp.data.data.result;
        });
    },

    /***
     *
     * @param commit
     * @param state
     * @param request
     * @returns {*|PromiseLike<T>|Promise<T>}
     */
    validateCategoriesIdCode({commit, state}, request) {
        return api.validateCategoriesIdCode(request).then(rsp => {
            return rsp.data.data.result;
        });
    },




}

// mutations
const mutations = {

    [types.CATEGORIES_LIST](state, data) {
        state.categories_list = {
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
