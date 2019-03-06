/**
 * Admin Api
 */

import {axios} from '../plugins/axios';

export default {
    index: (payload) => {

        return axios.get('admins', {
            params: payload
        });
    },
    store: (payload) => {
        return axios.post('admins', payload);
    },

    update: (payload) => {
        return axios.put('admins/' + payload.id, payload);
    },


    login: (payload) => {
        console.info('api => admin.js');
        console.info('payload =>', payload);
        console.info('baseURL', axios.defaults.baseURL);
        return axios.post('admins/login', payload);
    },

    getRoutes(payload) {
        console.info('vvv ----');
        return axios.post('admins/getRoutes', payload);
    },
    getNavMenus(payload) {
        return axios.post('admins/getNavMenus', payload);
    },

    refreshToken(payload) {
        return axios.post('admins/refresh', payload);
    },
    logout(payload) {
        return axios.post('admins/logout', payload);

    },

}
