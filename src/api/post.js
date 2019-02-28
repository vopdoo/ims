/**
 * User Api
 */

import {utils} from '../libs/utils'

export default {

    postList(request) {
        return utils.ajax({
            method: 'get',
            url: 'admin/posts',
            params: request,
        });
    },
    addPost(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/posts',
            data: request,
        });
    },
    editPost(request) {
        return utils.ajax({
            method: 'put',
            url: 'admin/posts/' + request.id,
            data: request,
        });
    },
    delPost(request) {
        return utils.ajax({
            method: 'delete',
            url: '/admin/posts/' + request.id,
        });
    },

}
