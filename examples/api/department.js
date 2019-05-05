/**
 * Node Api
 */

import {axios} from '@ims/plugins/axios';


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

}
