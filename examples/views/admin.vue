<template>
    <div>
        <ImsLayout :menus="nav_menus">
            <div slot="notifications">

                <div
                        v-for="(item,index) in revisits.data"
                >
                    <p class="notification-title">
                        <span v-if="item.type == 1">术后回访 </span>
                        <span v-if="item.type == 2">服务回访 </span>
                        <span v-if="item.type == 3">复诊回访 </span>
                        <span style="font-size: 11px;color: #808695;" >{{item.next_at}}</span>
                    </p>

                    <p v-if="item.reservation"> {{item.reservation.user.name}} <Divider type="vertical" /> {{item.reservation.user.mobile}}</p>
                    <p>{{item.content}}</p>
                    <Divider/>
                </div>

            </div>
        </ImsLayout>

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
            await this.$store.dispatch('admin/getNavMenus', {});
            await this.$store.dispatch('revisits/lists', {per_page: 200});
        },

        computed: {
            ...mapGetters({
                'nav_menus': 'admin/nav_menus',
                'revisits': 'revisits/lists',
            })
        },
        data() {
            return {}
        }
    }
</script>
