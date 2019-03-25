import axios from 'axios';
import * as storages from '../utils/storages';

import store from '../store/index';


console.info('store', store);
console.info('storages', storages);

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

window.isRefreshing = false;

axios.interceptors.request.use(
    config => {

        // 检测是否有 access_token
        console.info('interceptors', storages.checkLogin());
        if (storages.checkLogin() === true) {
            let accessTokenStatus = storages.isAccessTokenWillOrExpired();

            switch (accessTokenStatus) {
                case 'expired':
                    console.info('expired:' + accessTokenStatus);
                    sessionStorage.clear();
                    window.location.href = '#/login';
                    break;
                case 'will_expired':
                    if (config.url !== '/admin/refresh') {
                        if (!window.isRefreshing) {
                            window.isRefreshing = true;
                            store.dispatch('refreshToken').then((data) => {
                                window.isRefreshing = false;
                                config.headers.Authorization = `${data.token_type} ${data.access_token}`;
                            }).catch(error => {
                                console.info(error);
                                window.location.href = '#/login'
                            });
                        }
                    }
                    console.info('will_expired:' + accessTokenStatus);
                    break;
                default:
                    config.headers.Authorization = `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`;
            }

        } else {
            sessionStorage.clear();
            window.location.href = '#/login';
        }
        console.info(config.headers.Authorization);

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export {
    axios
}
