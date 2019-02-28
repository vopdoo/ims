<template>
    <div id="app" class="ims-app">
        <router-view></router-view>
    </div>
</template>

<script>

    import {checkLogin} from './utils/storages';

    // import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'app',
        components: {},
        created() {
            console.info('App created');
            this.checkLogin();
            // console.info(sessionStorage.getItem('access_token'));
            // if (!sessionStorage.getItem('access_token')) {
            //     this.$router.push({name:'login'});
            // }
        },
        methods: {
            checkLogin() {
                console.info('checkLogin', 'start.....');
                // 检查是否登录
                if (!checkLogin()) {
                    console.info('没有登录 定向到 登录页面....');
                    this.$router.replace({name: 'login'});
                } else {
                    this.$store.dispatch('getRoutes').then(rsp => {
                        console.info(this.$store.getters.routers);
                        this.$router.addRoutes(this.$store.getters.routers.concat([{
                            path: '*',
                            redirect: '/404'
                        }]));
                        // console.info(rsp);
                    });
                    console.info('vvvv');
                }
                // console.info(sessionStorage.getItem('access_token'));
            }
        }
    }
</script>

<style lang="less" scoped>

    .add-edit-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
            .ivu-modal-body {
                height: 550px;
                overflow-y: auto;
            }
        }
    }
    .list-tb-right {
        text-align: right;
    }

</style>
