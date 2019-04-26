import Vue from 'vue'
import Router from 'vue-router'

// import {routes as imsRoutes} from '@dist/ims.umd.min.js'
import {routes as imsRoutes} from '@ims'
import {LoadingBar, Modal} from 'iview'

import util from '@ims/utils';
//
import store from '@/store/index';

// console.info(imsRoutes.top);

Vue.use(Router);

const createRouter = () => new Router({
    // mode: 'history',
    routes: [
        ...imsRoutes.top
    ]
});
const BROWSER_EVENT_REFRESH = 1;
const BROWSER_EVENT_CLOSE = 0;

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher // the relevant part
}

const reAddRoutes = async function () {
    if (sessionStorage.getItem('BROWSER_EVENT') && sessionStorage.getItem('BROWSER_EVENT') == BROWSER_EVENT_REFRESH) {
        const db = await store.dispatch('db/database', {user: true});
        let routes = db.get('routes').value();
        let willAddedRoutes = [
            {
                path: '/admin',
                component: () => import('@/views/admin.vue'),
                children: [
                    ...imsRoutes.children,
                    {
                        path: '/',
                        name: 'dashboard',
                        component: () => import('@/views/Dashboard.vue')
                    }
                ]
            }
        ];
        routes.forEach((item, index) => {
            const lastHistoryRouteIndex = imsRoutes.children.findIndex(obj => {
                return obj.path == item.options.path
            });
            if (item.type == 1 && item.options.path && item.options.name && lastHistoryRouteIndex < 0) {
                willAddedRoutes[0].children.push({
                    path: item.options.path,
                    name: item.options.name,
                    meta: {
                        index: index
                    },
                    component: () => import('@/views/' + item.options.path + '.vue')
                });
            }
        });
        willAddedRoutes = willAddedRoutes.concat([{
            path: '*',
            redirect: '/404'
        }]);
        resetRouter();
        router.addRoutes(willAddedRoutes);
        sessionStorage.removeItem('BROWSER_EVENT');
    }
}
window.addEventListener('beforeunload', async e => {
    let n = window.event.screenX - window.screenLeft;
    let b = n > document.documentElement.scrollWidth - 20;
    if (b && window.event.clientY < 0 || window.event.altKey) {
        sessionStorage.setItem('BROWSER_EVENT', BROWSER_EVENT_CLOSE);
    } else {
        sessionStorage.setItem('BROWSER_EVENT', BROWSER_EVENT_REFRESH);
    }
});

router.beforeEach((to, from, next) => {
    LoadingBar.start();
    reAddRoutes();
    store.dispatch('system/changeSpining',{spining:true});

    next();
    if (util.checkLogin() === true) {
        let accessTokenStatus = util.isAccessTokenWillOrExpired();
        switch (accessTokenStatus) {
            case 'expired':
                sessionStorage.clear();
                localStorage.clear();
                Modal.remove();
                Modal.warning({
                    title: '登录超时',
                    okText:'登录',
                    content: '<p>登录超时，请重新登录！</p>',
                    onOk:()=>{
                        to.path === '/login' ? next() : next({path: '/login'});
                    }
                });
                break;
            case 'will_expired':
                store.dispatch('system/refreshToken').then((data) => {
                    to.path === '/login' ? next({path: '/admin'}) : next();
                }).catch(() => {
                    to.path === '/login' ? next() : next({path: '/login'});
                });
                break;
            default:
                to.path === '/login' ? next({path: '/admin'}) : next();
        }

    } else {
        to.path === '/login' ? next() : next({path: '/login'});
    }
});

router.afterEach(route => {
    LoadingBar.finish();
});

export default router;
