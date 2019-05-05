/**
 * Node Api
 */

import {axios} from '@ims/plugins/axios';

export default {
    store: (payload) => {
        console.info('store', payload);
        // return utils.ajax.post('nodes', payload);
        return axios.post('channels', payload);
    },
    index: (payload) => {
        return axios.get('channels', {
            params: payload
        });
    },
    update(payload) {
        return axios.put('channels/' + payload.id, payload);
    },
    delete(payload) {
        return axios.delete('channels/' + payload.id);
    },
    validateCode: (payload) => {
        // return utils.ajax.post('nodes', payload);
        return axios.post('channels/validateCode', payload);
    },


}
