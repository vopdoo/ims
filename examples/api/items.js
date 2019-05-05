/**
 * Items Api
 */

import {axios} from '@ims/plugins/axios';

let resource = 'items';

export default {
    store: (payload) => {
        console.info(resource, payload);
        return axios.post(resource, payload);
    },
    index: (payload) => {
        return axios.get(resource, {
            params: payload
        });
    },
    update(payload) {
        return axios.put(`${resource}/${payload.id}`, payload);
    },
    delete(payload) {
        return axios.delete(`${resource}/${payload.id}`);
    },
    validateCode: (payload) => {
        return axios.post(`${resource}/validateCode`, payload);
    },

}
