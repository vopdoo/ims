/**
 * User Api
 */

import { utils } from '../libs/utils'


export default {

    getMenus(request) {
        return utils.ajax({
            method: 'get',
            url: '/admin/menus',
            data: request,
        });

    },




    validateNamePath(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/menu/validateNamePath',
            data: request,
        });
    },
    addMenu(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/menus',
            data: request,
        });
    },
    editMenu(request) {
        return utils.ajax({
            method: 'put',
            url: '/admin/menus/' + request.id,
            data: request,
        });
    },
    delMenu(request) {
        return utils.ajax({
            method: 'delete',
            url: '/admin/menus/' + request.id,
        });
    }

}
