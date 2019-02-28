/**
 * Node Api
 */

import {utils} from '../libs/utils'
import {axios} from '../plugins/axios';

export default {
    store: (payload) => {
        console.info('store', payload);
        // return utils.ajax.post('nodes', payload);
        return axios.post('nodes', payload);
    },
    index: (payload) => {
        return axios.get('nodes', {
            params: payload
        });
    },
    update(payload) {
        return axios.put('nodes/' + payload.id, {data: payload});
    },
    delete(payload) {
        return axios.delete('nodes/' + payload.id);
    },
    validateCode(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/nodes/validateCode',
            data: request,
        });
    },
}
