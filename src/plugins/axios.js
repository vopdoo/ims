import axios from 'axios';
import * as storages from '../utils/storages';

import store from '@/store/index';
import {Message} from 'iview';


axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

window.isRefreshing = false;

axios.interceptors.request.use(
    config => {
        // 检测是否有 access_token
        if (storages.checkLogin() === true) {
            let accessTokenStatus = storages.isAccessTokenWillOrExpired();
            console.info('expired:' + accessTokenStatus);

            switch (accessTokenStatus) {
                case 'expired':
                    console.info('expired:' + accessTokenStatus);
                    // sessionStorage.clear();

                    Message.destroy();
                    Message.warning({
                        duration: 120,
                        onClose: () => {
                            sessionStorage.clear();
                            window.location.href = '/#/login';
                        },
                        // content:'登录超时，请重新',
                        render: h => {
                            return h('span', [
                                '登录超时，请重新',
                                h('a', {
                                    attrs: {
                                        href: '/#/login',
                                    },
                                    on: {
                                        click: () => {
                                            Message.destroy();
                                            sessionStorage.clear();
                                            window.location.href = '/#/login';
                                        }
                                    },
                                    style: {
                                        color: '#57a3f3'
                                    }
                                }, '登录'),
                            ])
                        }
                    });

                    // window.location.href = '#/login';
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
                                console.info(error);
                                window.location.href = '#/login'
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
        // console.info(config.headers.Authorization);

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export {
    axios
}
