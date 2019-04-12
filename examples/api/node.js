/**
 * Node Api
 */

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
        return axios.put('nodes/' + payload.id, payload);
    },
    delete(payload) {
        return axios.delete('nodes/' + payload.id);
    },

}
