/**
 * Admin Api
 */

import {axios} from '../plugins/axios';

export default {
    store: (payload) => {
        return axios.post('admins', payload);
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
