<template>
    <div>
        <ImsLayout :menus="nav_menus"></ImsLayout>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'


    export default {
        name: "Admin",
        // async
        // beforeRouteEnter(to, from, next) {
        //     console.info('admin beforeRouteEnter');
        //     // await store.dispatch('admin/getNavMenus',{a:'aa'});
        //     next();
        // },
        async created() {
            // this.$Spin.show();
            await this.$store.dispatch('admin/getNavMenus', {});
            // setTimeout(() => {
            //     this.$Spin.hide();
            // }, 3000);
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
