/**
 * User Api
 */

import { utils } from '../libs/utils'


export default {

    userList(request) {
        return utils.ajax({
            method: 'get',
            url: '/admin/users',
            params: request,
        });
    },

    editUser(request) {
        return utils.ajax({
            method: 'put',
            url: '/admin/users/' + request.id,
            data: request,
        });
    },
    delUser(request) {
        return utils.ajax({
            method: 'delete',
            url: '/admin/users/' + request.id,
        });
    },

    login(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/login',
            data: request,
        });
    },



    getRoutes(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/getRoutes',
            data: request,
        });
    },
    getNavMenus(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/getNavMenus',
            data: request,
        });
    },

    refreshToken(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/refresh',
            data: request,
        });
    },
    logout(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/logout',
            data: request,

        });

    },


    // login ()
}
