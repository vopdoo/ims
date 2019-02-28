<template>
    <div class="ims-layouts">
        <div class="left" :style="layoutCommonStyles">
            <div class="logo">Vopdoo</div>
            <div class="navigation" ref="navigationWrapper">
                <SiderMenu class="sider-menu" @on-select-change="selectMenu" :data="nav_menus" :trigger="menuTrigger"/>
            </div>
            <div class="trigger">
                <Icon type="md-swap" @click="navigationTrigger" size="16"/>
            </div>
        </div>
        <div class="right" :style="layoutRightStyles">
            <div class="header">
                <div class="horizontal-nav">
                    <Row class-name="top-tools">
                        <Col span="12" class-name="nav">
                            <ul>
                                <li>
                                    <Icon type="md-apps"/>
                                    <span></span>
                                </li>
                            </ul>
                        </Col>
                        <Col span="6" class-name="search" :xs="0">
                            <Input search placeholder="关键词"/>
                        </Col>
                        <Col span="6" :xs="12" class-name="custom">
                            <ul>
                                <li @click="toggleNotificationsDrawer">
                                    <Badge dot :offset="[15,0]">
                                        <Icon type="ios-notifications-outline" size="20"></Icon>
                                    </Badge>
                                </li>
                                <li class="last">
                                    <Dropdown placement="bottom">
                                        <Avatar icon="ios-person" size="small"/>
                                        <div class="login-user-dropdown-list" slot="list">
                                            <div class="item">设置</div>
                                            <div class="item divided">锁屏</div>
                                            <div class="item" @click="logout">退出</div>
                                        </div>
                                    </Dropdown>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </div>
                <!-- hor-tab-bar -->
                <HorizontalTabBar :data="navTabs" @on-close-all="closeAll"/>
            </div>
            <div class="middle " ref="wrapper">
                <router-view class="contents"></router-view>
            </div>
            <div class="footer">
                footer
            </div>
            <Drawer title="消息通知" :closable="true" v-model="is_show_notifications_drawer">
                <p>消息通知</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>

        </div>
    </div>
</template>

<script>
    import SiderMenu from '@/components/sider-menu/index'
    import HorizontalTabBar from '@/components/horizontal-tab-bar/index'
    import {mapGetters} from 'vuex'
    import store from '../store/index';

    // import BScroll from 'better-scroll'

    export default {
        name: "Layout",
        components: {
            SiderMenu,
            HorizontalTabBar
        },
        // async beforeRouteEnter(to, from, next) {
        //     // 等待模型数据加载完毕,才继续进行vue组件的生命周期
        //     console.info('beforeRouteEnter');
        //     // 这个时候 getNodes 是没有的
        //     // vuex.esm.js?2f62:410 [vuex] unknown action type: getNodes 会有这个错误
        //     await store.dispatch('abcDe');
        //     console.info('数据加载之后');
        //     next();
        //     // next(vm => {
        //     //     console.info('next');
        //     //     vm.$store.dispatch('getNodes', {is_show_tree: 1})
        //     // });
        // },
        created() {
            console.info('Layout created');
        },
        mounted() {
            this.$store.dispatch('getNavMenus', {}).then(rsp => {
                console.info('layout rsp:', rsp);
                console.info('current:', this.$router);
            });
            this.nick_name = sessionStorage.getItem('nick_name');
        },

        beforeDestroy() {
            // this.scrollDestroy()
            // this.navigationWrapperScrollInitDestroy()
        },
        computed: {
            layoutCommonStyles() {
                return this.menu_expanded ? {width: '200px', minWidth: '200px'} : {width: '60px', minWidth: '60px'};
            },
            layoutRightStyles() {
                return this.menu_expanded ? {width: 'calc(100% - 200px)'} : {width: 'calc(100% - 60px)'};
            },
            ...mapGetters([
                'admin',
                'is_logined',
                'menus',
                'nav_menus'
            ])
        },
        data() {
            return {
                BS: null,
                navigationBS: null,
                menuTrigger: 'click',
                is_show_notifications_drawer: false,
                menu_expanded: true,
                // layoutCommonStyles: {
                //     width: '200px',
                //     minWidth: '200px',
                //     // background: '#525A6C',
                // },
                navTabs: [
                    {
                        title: '控制台',
                        name: '控制台',
                        icon: 'ios-home-outline',
                        path: '/',
                        selected: true
                    },
                ]
            }
        },
        methods: {
            logout() {
                this.$Modal.confirm({
                    title: '确认提示',
                    content: '<p>确定要退出吗？</p>',
                    loading: true,
                    onOk: () => {
                        this.$store.dispatch('logout', {}).then(rsp => {
                            this.$Modal.remove();
                            this.$router.replace({path: '/login'});
                        }).catch(error => {
                            // console.info('catch -- error');
                            // console.info(error);
                        });

                    }
                });
                // // console.info('logout');
                // this.$store.dispatch('logout', {}).then(rsp => {
                //     // console.info(rsp);
                //     this.$router.replace({name:'login'});
                //
                // }).catch(error => {
                //     // console.info('catch -- error');
                //     // console.info(error);
                // });
                // this.$router.push('login');
            },
            lockScreen() {
                console.info('lockScreen');
            },
            navigationWrapperScrollInit() {
                this.navigationBS = new BScroll(this.$refs.navigationWrapper, {
                    mouseWheel: true,
                    scrollbar: {
                        fade: true,
                        interactive: false
                    }
                })
            },
            scrollInit() {
                this.BS = new BScroll(this.$refs.wrapper, {
                    mouseWheel: true,
                    scrollbar: {
                        fade: true,
                        interactive: false
                    }
                })
            },
            scrollDestroy() {
                if (this.BS) {
                    this.BS.destroy()
                }
            },
            navigationWrapperScrollInitDestroy() {
                if (this.navigationBS) {
                    this.navigationBS.destroy()
                }
            },
            closeAll(data) {
                this.navTabs = [data];
            },
            selectMenu(node) {
                console.info('Layout....');
                const hasExist = this.navTabs.findIndex(obj => obj.name === node.name);
                console.info('ss', node);
                hasExist < 0 && this.navTabs.push(node);
                console.info(this.navTabs);
                this.navTabs[0].selected = false;
                if (this.$router.currentRoute.name !== node.name) {
                    // console.info(node);
                    // return false;
                    this.$router.push({name: node.options.name});
                    // this.$router.push({name: 'settings_nodes'});
                }
            },
            toggleNotificationsDrawer() {
                this.is_show_notifications_drawer = !this.is_show_notifications_drawer;
            },
            toggleThemeDrawer() {
                this.is_show_theme_drawer = !this.is_show_theme_drawer;
            },
            navigationTrigger() {
                this.menu_expanded = !this.menu_expanded;
                if (this.menu_expanded) {
                    this.menuTrigger = 'click';
                } else {

                    this.menuTrigger = 'hover';
                }

            }
        }
    }
</script>

<style lang="less" scoped>
    .ims-layouts {
        display: flex;
        height: 100vh;

        .left {
            width: 50px;
            height: 100%;
            /*border-right: 1px solid red;*/
            display: flex;
            flex-direction: column;
            background: #041527;

            .logo {
                height: 50px;
                line-height: 50px;
                text-align: center;
                background: #07213E;
                color: #fff;
                cursor: pointer;
            }

            .navigation {
                flex: 1;
                overflow-y: auto;
                overflow-x: hidden;
                color: #fff;

                .menu {
                }
            }

            .trigger {
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #07213E;
                color: #fff;
                cursor: pointer;
            }
        }

        .right-explaned {
            width: calc(100% - 200px);
        }

        .right-shrink {
            width: calc(100% - 60px);
        }

        .right {
            flex: 1;
            display: flex;
            flex-direction: column;

            .header {
                height: 90px;
                background: #fff;
                box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
                display: flex;
                flex-direction: column;
                z-index: 1;
                .horizontal-nav {
                    height: 50px;
                    line-height: 50px;
                    /*border-bottom: 1px solid #f6f6f6;*/
                    box-shadow: 0 1px 0 0 #e8eaec;;
                    /*border-bottom: 1px solid #e8eaec;*/
                    padding: 0 16px 0 16px;
                    .top-tools {
                        .nav {
                            /*padding-left: 16px;*/
                            ul {
                                list-style: none;
                                li {
                                    display: inline-block;
                                    height: 50px;
                                    line-height: 50px;
                                    margin-right: 20px;
                                    position: relative;
                                    vertical-align: middle;
                                    font-size: 14px;
                                    transition: all .3s;
                                    cursor: pointer;
                                    color: #17233d;
                                    font-weight: 700;

                                    i {
                                        color: #17233d;
                                        line-height: 40px;
                                        font-size: 24px;
                                        font-weight: 700;

                                    }

                                    &:after {
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        width: 0;
                                        height: 2px;
                                        border-radius: 0;
                                        background-color: #00c1de;
                                        transition: all .3s;
                                    }

                                    &:hover {
                                        color: #2db7f5;
                                        i {
                                            color: #2db7f5;
                                        }
                                        &:after {
                                            width: 100%;
                                        }
                                    }
                                }
                            }
                        }

                        .custom {
                            text-align: right;
                            ul {
                                list-style: none;
                                .last {
                                    margin-right: 10px;
                                }
                                li {
                                    display: inline-block;
                                    height: 50px;
                                    line-height: 50px;
                                    margin-right: 20px;
                                    position: relative;
                                    vertical-align: middle;
                                    font-size: 14px;
                                    transition: all .3s;
                                    cursor: pointer;

                                    .login-user-dropdown-list {
                                        .item {
                                            text-align: left;
                                            margin: 0;
                                            line-height: normal;
                                            padding: 7px 16px;
                                            vertical-align: middle;
                                            clear: both;
                                            color: #515a6e;
                                            font-size: 12px !important;
                                            white-space: nowrap;
                                            list-style: none;
                                            cursor: pointer;
                                            transition: background .2s ease-in-out;
                                            i {
                                                font-size: 14px;
                                            }
                                            &:hover {
                                                background: #f3f3f3;
                                            }
                                        }
                                        .disabled {
                                            color: #c5c8ce;
                                            cursor: not-allowed;
                                        }
                                        .divided {
                                            margin-top: 5px;
                                            border-top: 1px solid #e8eaec;
                                        }

                                    }
                                    &:after {
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        width: 0;
                                        height: 2px;
                                        border-radius: 0;
                                        background-color: #00c1de;
                                        transition: all .3s;
                                    }

                                    &:hover {
                                        color: #2db7f5;
                                        i {
                                            color: #2db7f5;
                                        }
                                        &:after {
                                            width: 100%;
                                        }
                                    }
                                }
                            }
                        }

                    }
                }
                .horizontal-tab-bar {
                    height: 40px;
                    line-height: 40px;
                    display: flex;

                    .tab-control {
                        cursor: pointer;
                        width: 40px;
                        text-align: center;
                        border-left: 1px solid #f6f6f6;
                        border-right: 1px solid #f6f6f6;
                    }
                    .control-tool-left {
                        float: left;
                        text-align: center;

                        .prev {
                            border-left: none;
                        }

                    }
                    .control-tabs {
                        overflow: hidden;
                        flex: 1;
                        .tabs {
                            font-size: 0;
                            transition: all .2s;
                            width: 100%;
                            white-space: nowrap;
                            display: block;
                            li {
                                display: inline-block;
                                line-height: 40px;
                                max-width: 160px;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                border-right: 1px solid #f6f6f6;
                                vertical-align: top;
                                font-size: 14px;
                                position: relative;
                                padding: 0 25px 0 10px;
                                text-align: center;
                                cursor: pointer;
                                list-style: none;

                                &:after {
                                    content: '';
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 0;
                                    height: 2px;
                                    border-radius: 0;
                                    background-color: #515a6e;
                                    transition: all .3s;
                                }

                                &:hover {
                                    background-color: #f6f6f6;
                                    &:after {
                                        width: 100%;
                                    }
                                }

                                span {
                                    display: inline-block;
                                    width: auto;
                                    &:hover {
                                        color: #000;
                                    }
                                }

                                .tab-close {
                                    position: absolute;
                                    right: 8px;
                                    top: 50%;
                                    margin: -7px 0 0;
                                    width: 16px;
                                    height: 16px;
                                    line-height: 16px;
                                    border-radius: 50%;
                                    font-size: 16px;
                                    &:hover {
                                        color: red;
                                    }
                                }
                            }
                        }

                    }
                    .control-tool-right {
                        display: flex;
                        .refresh {
                            border: none;
                        }
                        .oths {
                            border-right: none;
                            .oths-dropdown-tools {
                                width: 36px;
                                .dropdown-tool-item {
                                    text-align: center;
                                    i {
                                        color: #17233d;
                                        font-size: 18px;
                                    }
                                    &:hover {
                                        background: #f3f3f3;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .middle {
                flex: 1;
                overflow-y: auto;
                overflow-x: hidden;
                .contents {
                    padding: 10px;
                }
            }
            .footer {
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #fff;
                color: #808695;
                box-shadow: 0 -1px 0 0 #e8eaec;
                /*border-top: 1px solid #07213E;*/
                /*<!--box-shadow: 0 -1px 0 #07213E;-->*/

            }

        }
    }
</style>
