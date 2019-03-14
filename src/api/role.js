/**
 * Admin Api
 */

import {axios} from '../plugins/axios';

export default {
    index: (payload) => {

        return axios.get('roles', {
            params: payload
        });
    },
    store: (payload) => {
        return axios.post('roles', payload);
    },

    update: (payload) => {
        return axios.put('roles/' + payload.id, payload);
    },

    delete: (payload) => {
        return axios.delete('roles/' + payload.id, payload);
    },
}
