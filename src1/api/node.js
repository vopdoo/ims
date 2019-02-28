/**
 * Node Api
 */

import {utils} from '../libs/utils'

// import axios from 'axios';


export default {

    store: (payload) => {
        return utils.ajax.post('nodes', payload);
    },

    getNodes(request) {
        console.info('getNodes', request);
        return utils.ajax({
            method: 'get',
            url: 'nodes',
            params: request,
        });
    },
    validateCode(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/nodes/validateCode',
            data: request,
        });
    },
    addNode(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/nodes',
            data: request,
        });
    },
    editNode(request) {
        return utils.ajax({
            method: 'put',
            url: '/admin/nodes/' + request.id,
            data: request,
        });
    },
    delNode(request) {
        return utils.ajax({
            method: 'delete',
            url: '/admin/nodes/' + request.id,
        });
    }
}
