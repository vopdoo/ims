/**
 * Admin Api
 */

import {axios} from '../plugins/axios';

let resource = 'admins';

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
    },
    login: (payload) => {
        return axios.post(`${resource}/login`, payload);
    },
    loginInfo: (payload) => {
        return axios.post(`${resource}/login/info`, payload);
    },

    getRoutes(payload) {
        return axios.post(`${resource}/getRoutes`, payload);
    },
    getNavMenus(payload) {
        return axios.post(`${resource}/getNavMenus`, payload);
    },
    refreshToken(payload) {
        return axios.post(`${resource}/refresh`, payload);
    },
    logout(payload) {
        return axios.post(`${resource}/logout`, payload);
    },

}
