/**
 * Users Api
 */

import {axios} from '@ims/plugins/axios';

let resource = 'users';

export default {
    index: (payload) => {
        return axios.get(resource, {
            params: payload
        });
    },
    store: (payload) => {
        return axios.post(resource, payload);
    },
    update: (payload) => {
        return axios.put(`${resource}/${payload.id}`, payload);
    },
    delete: (payload) => {
        return axios.delete(`${resource}/${payload.id}`, payload);
    }


}
