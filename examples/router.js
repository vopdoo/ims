import Vue from 'vue'
import Router from 'vue-router'

// import {routes as imsRoutes} from '@dist/ims.umd.min.js'
import {routes as imsRoutes} from '@ims'
// console.info('imsRoutes',imsRoutes);

import {LoadingBar, Modal} from 'iview'

// import * as storages from '@/utils/storages';
//
// import store from '@/store/index';

Vue.use(Router);

const createRouter = () => new Router({
    // mode: 'history',
    routes: [
        ...imsRoutes.top
    ]
});

const router = createRouter();


export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher // the relevant part
}

router.beforeEach((to, from, next) => {
    LoadingBar.start();
    next();
    // if (storages.checkLogin() === true) {
    //     let accessTokenStatus = storages.isAccessTokenWillOrExpired();
    //     switch (accessTokenStatus) {
    //         case 'expired':
    //             sessionStorage.clear();
    //             Modal.remove();
    //             Modal.warning({
    //                 title: '登录超时',
    //                 okText:'登录',
    //                 content: '<p>登录超时，请重新登录！</p>',
    //                 onOk:()=>{
    //                     to.path === '/login' ? next() : next({path: '/login'});
    //                 }
    //             });
    //             break;
    //         case 'will_expired':
    //             store.dispatch('admin/refreshToken').then((data) => {
    //                 to.path === '/login' ? next({path: '/console'}) : next();
    //             }).catch(() => {
    //                 // error
    //                 // console.info(error);
    //                 to.path === '/login' ? next() : next({path: '/login'});
    //             });
    //             break;
    //         default:
    //             to.path === '/login' ? next({path: '/console'}) : next();
    //     }
    //
    // } else {
    //     to.path === '/login' ? next() : next({path: '/login'});
    // }
});

router.afterEach(route => {
    LoadingBar.finish();
    // console.info('router.afterEach',route);
});

export default router;
