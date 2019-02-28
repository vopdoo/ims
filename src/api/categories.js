/**
 * User Api
 */

import {utils} from '../libs/utils'

export default {

    categoriesList(request) {
        return utils.ajax({
            method: 'get',
            url: 'admin/categoriess',
            params: request,
        });
    },
    addCategories(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/categoriess',
            data: request,
        });
    },
    editCategories(request) {
        return utils.ajax({
            method: 'put',
            url: 'admin/categoriess/' + request.id,
            data: request,
        });
    },
    delCategories(request) {
        return utils.ajax({
            method: 'delete',
            url: '/admin/categoriess/' + request.id,
        });
    },

    //  editCategories

    validateCategoriesName(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/categoriess/validateCategoriesName',
            data: request,
        });
    },

    validateCategoriesIdCode(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/categoriess/validateCategoriesIdCode',
            data: request,
        });
    },




}
