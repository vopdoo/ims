const routes = {
    top: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/404',
            name: '404',
            component: () => import('../views/404.vue')
        },
    ],
    children: [
        {
            path: 'sdf',
            name: 'sdf',
            component: () => import('../views/Sdf.vue')
        }
    ]
};

export default routes;
