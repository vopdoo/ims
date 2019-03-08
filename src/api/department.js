/**
 * Node Api
 */

import {utils} from '../libs/utils'
import {axios} from '@/plugins/axios';

export default {
    store: (payload) => {
        console.info('store', payload);
        // return utils.ajax.post('nodes', payload);
        return axios.post('departments', payload);
    },
    index: (payload) => {
        return axios.get('departments', {
            params: payload
        });
    },
    update(payload) {
        return axios.put('departments/' + payload.id, payload);
    },
    delete(payload) {
        return axios.delete('departments/' + payload.id);
    },
    validateCode(request) {
        return utils.ajax({
            method: 'post',
            url: '/admin/departments/validateCode',
            data: request,
        });
    },
}
