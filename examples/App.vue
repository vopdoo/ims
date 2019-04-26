<template>
    <div id="app" class="ims-app">
        <router-view></router-view>
    </div>
</template>

<script>



    import {mapGetters} from 'vuex'

    export default {
        name: 'app',
        components: {},
        computed: {
            ...mapGetters({
                'routers': 'admin/routers',
            })
        },
        beforeMount() {
            // window.onbeforeunload = e => {      //刷新时弹出提示
            //     // console.info(e);
            //     localStorage.setItem('is_refresh', 'app');
            //     localStorage.setItem('cur_time_app', new Date().getTime());
            //     // localStorage.setItem('cur_time_app', new Date().getMilliseconds());
            //
            //     // return ''
            //     // console.info('onbeforeunload');
            // };
        },
        beforeDestroy() {
            window.onbeforeunload = e => {      //刷新时弹出提示
                // console.info(e);

                localStorage.setItem('cur_time_app', new Date().getTime());
                localStorage.setItem('is_refresh', 'app');
                // localStorage.setItem('cur_time_app', new Date().getMilliseconds());

                // return ''
                // console.info('onbeforeunload');
            };
        },
        mounted() {

        },
        beforeRouteLeave (to, from, next) {
            console.info('beforeRouteLeave App');
            // 导航离开该组件的对应路由时调用
            // 可以访问组件实例 `this`
        },

        async created() {
            console.info('App created');
            await this.$store.dispatch('system/getNavTabs');
            // console.info('before getNavTabs');
        },
        methods: {

        }
    }
</script>

<style lang="less">

    .oths-tool {
        .ivu-dropdown-menu {
            min-width: 28px;
            .ivu-dropdown-item {
                i {
                    text-align: center;
                }
                .ivu-icon {
                    vertical-align: middle;
                    font-size: 16px;
                }
            }
        }
    }
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
