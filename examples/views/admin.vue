<template>
    <div>
        <ImsLayout :menus="nav_menus"></ImsLayout>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    // import store from '@/store/index';

    // console.info('store',store);
    export default {
        name: "Admin",
        // async
        beforeRouteEnter(to, from, next) {
            console.info('admin beforeRouteEnter');
            // await store.dispatch('admin/getNavMenus',{a:'aa'});
            next();
        },
        computed: {
            ...mapGetters({
                'nav_menus': 'admin/nav_menus',
            })
        },
        data() {
            return {

            }
        }
    }
</script>
