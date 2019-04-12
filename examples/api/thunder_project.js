/**
 * Admin Api
 */

import {axios} from '../plugins/axios';

export default {
    index: (payload) => {

        return axios.get('projects', {
            params: payload
        });
    },
    store: (payload) => {
        return axios.post('projects', payload);
    },

    update: (payload) => {
        return axios.put('projects/' + payload.id, payload);
    },

    delete: (payload) => {
        return axios.delete('projects/' + payload.id, payload);
    },
}
