import axios from 'axios';
import * as storages from '../utils/storages';

import store from '@/store/index';
import {Modal} from 'iview';


axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

window.isRefreshing = false;

axios.interceptors.request.use(
    config => {
        // 检测是否有 access_token
        if (storages.checkLogin() === true) {
            let accessTokenStatus = storages.isAccessTokenWillOrExpired();
            switch (accessTokenStatus) {
                case 'expired':
                    sessionStorage.clear();
                    Modal.remove();
                    Modal.warning({
                        title: '登录超时',
                        okText: '登录',
                        content: '<p>登录超时，请重新登录！</p>',
                        onOk: () => {
                            window.location.href = '/#/login';
                        }
                    });
                    break;
                case 'will_expired':
                    config.headers.Authorization = `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`;
                    if (config.url !== 'admin/refresh') {
                        if (!window.isRefreshing) {
                            window.isRefreshing = true;
                            config.headers.Authorization = `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`;
                            store.dispatch('admin/refreshToken').then((data) => {
                                window.isRefreshing = false;
                                config.headers.Authorization = `${data.token_type} ${data.access_token}`;
                            }).catch(error => {
                                window.location.href = '/#/login'
                            });
                        }
                    }
                    break;
                default:
                    config.headers.Authorization = `${sessionStorage.getItem('token_type')} ${sessionStorage.getItem('access_token')}`;
            }

        } else {
            sessionStorage.clear();
            window.location.href = '#/login';
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export {
    axios
}
