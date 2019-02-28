import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'


Vue.use(Router)

const createRouter = () => new Router({
    // mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/404',
            name: '404',
            component: () => import('@/views/404.vue')
        }
    ]
});

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher // the relevant part
}

router.beforeEach((to, from, next) => {
    console.info('router.beforeEach');
    next();
});

router.afterEach(route => {
    // console.info(route);
});

export default router;
