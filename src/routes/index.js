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
        // {
        //     path: '*',
        //     redirect: '/404'
        // }
    ],
    children: [
        {
            path: 'sdf',
            name: 'sdf',
            component: () => import('../views/Sdf.vue')
        },
        {
            path: 'systems/nodes',
            name: 'systems_nodes',
            component: () => import('../views/systems/nodes.vue')
        },
        {
            path: 'systems/roles',
            name: 'systems_roles',
            component: () => import('../views/systems/roles.vue')
        }
    ]
};

export default routes;
