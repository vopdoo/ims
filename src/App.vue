<template>
    <div id="app" class="ims-app">
        <router-view></router-view>
    </div>
</template>

<script>

    import {checkLogin} from './utils/storages';

    import {mapGetters} from 'vuex'

    export default {
        name: 'app',
        components: {},
        computed: {
            ...mapGetters({
                'routers': 'admin/routers',
            })
        },
        created() {
            this.checkLogin();
        },
        methods: {
            checkLogin() {
                // 检查是否登录
                if (!checkLogin()) {
                    this.$router.replace({name: 'login'});
                } else {
                    this.$store.dispatch('admin/getRoutes').then(rsp => {
                        this.$router.addRoutes(this.routers.concat([{
                            path: '*',
                            redirect: '/404'
                        }]));
                    });
                }
            }
        }
    }
</script>

<style lang="less">

    .add-edit-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
            .ivu-modal-body {
                height: 550px;
                overflow-y: auto;
            }
        }
    }

    .ce-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
            .ivu-modal-body {
                height: 520px;
                overflow-y: auto;
            }
        }
    }

    .list-tb-right {
        text-align: right;
    }

    .list-tlbr {
        float: right;
        text-align: right;
    }

    .filter-kws {
        width: 300px !important;
    }
</style>
