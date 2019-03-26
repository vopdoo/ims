import axios from 'axios';
import moment from 'moment';
// import store from './store/index'
import store from '../store/index';

// import { Message } from 'iview';
// import router from '../router'

window.isRefreshing = false;
let utils = {};
utils.title = function (title) {
    title = title ? title + ' - IMS' : 'IMS';
    window.document.title = title;
};
// const api_serve = 'http://weapp.scmhmt.com/api';
const api_serve = 'http://ims.vopdoo.test/api/v1';
const ajaxUrl = true ?
    api_serve :
    false ?
        api_serve :
        api_serve;

utils.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});
// **  判断access_token 是否过期或者将要过期
const isAccessTokenWillOrExpired = function () {
    let expired_at = parseInt(sessionStorage.getItem('expired_at'));
    let current_at = moment().unix();
    let time_difference = expired_at - current_at;
    if (time_difference <= 0) {
        // console.info('已经过期 ');
        return 'expired';
    }
    if (time_difference <= 100 && time_difference > 0) {
        // console.info('将要过期 ');
        return 'will_expired';
    }
};

utils.ajax.interceptors.request.use(
    config => {
        let access_token = sessionStorage.getItem('access_token');
        if (access_token) {
            let token_type = sessionStorage.getItem('token_type');
            config.headers.Authorization = `${token_type} ${access_token}`;
            if (isAccessTokenWillOrExpired() == 'expired') {
                console.info('登录过期 重新登录')
                window.location.href = '#/login';
                // config.headers.Authorization = 'Bear xxx';
                return false;
            }
            if (isAccessTokenWillOrExpired() == 'will_expired' && config.url !== '/admin/refresh') {
                if (!window.isRefreshing) {
                    window.isRefreshing = true;
                    store.dispatch('refreshToken').then((data) => {
                        window.isRefreshing = false;

                        config.headers.Authorization = `${data.token_type} ${data.access_token}`;
                    }).catch(error => {
                        // console.info(error);
                        window.location.href = '#/login'
                    });
                } else {
                    console.info(window.isRefreshing);
                    return config;
                }
            }
        } else {
            // window.location.href = '#/login';
            if (config.url != '/login') {
                window.location.href = '#/login';
                // console.info('dd');
                // console.info(config.url);
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
utils.ajax.interceptors.response.use(function (response) {
    // console.info('axios :', response);
    // let willAddedRoutes = [
    //     {
    //         path: '/',
    //         component: () => import('@/views/Layout.vue'),
    //         children: [
    //             {
    //                 path: '/',
    //                 name: 'dashboard',
    //                 component: () => import('@/views/Dashboard.vue')
    //             },
    //             {
    //                 path: '/aa',
    //                 name: 'Setting',
    //                 component: () => import('@/views/Setting.vue')
    //             }, {
    //                 path: '/sdf',
    //                 name: 'sdf',
    //                 component: () => import('@/views/settings/menu.vue')
    //             },
    //         ]
    //     }
    //
    // ];
    // console.info(willAddedRoutes);
    // console.info('http rsp:', response);
    // console.info('current router:', router.options.routes[0].children);
    // router.addRoutes(willAddedRoutes);
    // console.info('added router:', router);
    // 对响应数据做点什么
    // console.info('------- axios  response-----');
    // console.info(response);
    // 判断一下响应中是否有 token，如果有就直接使用此 token 替换掉本地的 token。你可以根据你的业务需求自己编写更新 token 的逻辑
    // let token = response.headers.authorization;
    // if (token) {
    //     // 如果 header 中存在 token，那么触发 refreshToken 方法，替换本地的 token
    //     // this.$store.dispatch('refreshToken', token)
    // }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export {
    utils,
    isAccessTokenWillOrExpired
};
