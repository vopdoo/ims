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

    .info-menu-aside-vip {
        margin-top: 3px
    }

    .info-menu-aside-vip img {
        width: 12px;
        height: 12px;
        vertical-align: middle
    }

    .info-menu-aside-vip span {
        font-size: 12px;
        display: inline-block;
        vertical-align: middle
    }

    .info-menu-user {
        width: 140px
    }

    .info-menu-user-name {
        font-size: 16px
    }

    .info-menu-user {
        .ivu-dropdown-item {

            font-size: 14px !important;
            padding: 8px 16px;
            img {
                fill: inherit;
            }
            i {
                text-align: center;
            }

            .ivu-icon {
                vertical-align: middle;
                margin-right: 5px;
                font-size: 22px;
            }
            span {
                vertical-align: middle;
            }
        }

    }

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
