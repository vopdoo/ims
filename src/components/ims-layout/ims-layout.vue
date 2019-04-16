<template>
    <div :class="classes">
        <div class="left" :class="layoutLeftClasses" :style="layoutCommonStyles">
            <div :class="logoClasses">
                <span :class="logoTitleClasses">Ims</span>
            </div>
            <div class="navigation" :class="navigationClasses" ref="navigationWrapper">
                <!-- <SiderMenu class="sider-menu" @on-select-change="selectMenu" :data="nav_menus" :trigger="menuTrigger"/> -->
            </div>
            <div :class="triggerClasses">
                <Icon type="md-swap" @click="navigationTrigger" size="16"/>
            </div>
        </div>
        <div :class="layoutRightClasses" :style="layoutRightStyles">
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
                                    <Dropdown placement="bottom" :transfer="true" @on-click="handleAdminDpdClick">
                                        <Avatar icon="ios-person" size="small"/>
                                        <DropdownMenu slot="list" class="info-menu-user">
                                            <DropdownItem>
                                                <strong class="info-menu-user-name">名称</strong>
                                                <div class="info-menu-aside-vip">
                                                    <span>角色</span>
                                                </div>
                                            </DropdownItem>
                                            <!--<DropdownItem divided>-->
                                            <!--<Icon type="ios-person-outline" />-->
                                            <!--<span>我的主页</span>-->
                                            <!--</DropdownItem>-->
                                            <DropdownItem divided name="lock_screen">
                                                <Icon type="ios-lock-outline"/>
                                                <span>锁屏</span>
                                            </DropdownItem>
                                            <DropdownItem divided name="logout">
                                                <Icon type="ios-log-out"/>
                                                <span>退出</span>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </div>
                <!-- hor-tab-bar -->
                <HorizontalTabBar :data="navTabs" @on-close-all="closeAll"/>
                <!--<div  class="breadcrumb-wrapper">-->
                <!--<Breadcrumb>-->
                <!--<BreadcrumbItem to="/">系统</BreadcrumbItem>-->
                <!--<BreadcrumbItem>用户管理</BreadcrumbItem>-->
                <!--</Breadcrumb>-->
                <!--</div>-->
            </div>
            <div class="middle " ref="wrapper">
                <transition name="fade">
                    <router-view class="contents"></router-view>
                </transition>

            </div>
            <!--<div class="footer">-->
            <!--footer-->
            <!--</div>-->
            <Drawer title="消息通知" :closable="true" v-model="is_show_notifications_drawer">
                <p>消息通知</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>

        </div>
    </div>
</template>

<script>
    import SiderMenu from '../sider-menu/index'
    import HorizontalTabBar from '../horizontal-tab-bar/index'

    const prefixCls = 'ims-layout';
    // import {mapGetters} from 'vuex'
    // import store from '@ims/store/index';

    // import BScroll from 'better-scroll'

    export default {
        name: "ImsLayout",
        components: {
            SiderMenu,
            HorizontalTabBar
        },
        // async
        beforeRouteEnter(to, from, next) {
            console.info('vvv');
            // await store.dispatch('admin/getNavMenus', {});
            next(vm => {
                // vm.nick_name = sessionStorage.getItem('nick_name');
            });
        },
        created() {
            console.info('ImsLayout Created....');
        },

        beforeDestroy() {
            // this.scrollDestroy()
            // this.navigationWrapperScrollInitDestroy()
        },
        computed: {
            classes() {
                return `${prefixCls}`;
            },
            layoutLeftClasses() {
                return `${prefixCls}-left`;
            },
            logoClasses() {
                return `${prefixCls}-left-logo`;
            },
            logoTitleClasses() {
                return `${prefixCls}-left-logo-title`;
            },
            navigationClasses() {
                return `${prefixCls}-left-navigation`;
            },
            triggerClasses() {
                return `${prefixCls}-left-trigger`;
            },
            layoutRightClasses() {
                return `${prefixCls}-right`;
            },


            layoutCommonStyles() {
                return this.menu_expanded ? {width: '200px', minWidth: '200px'} : {width: '60px', minWidth: '60px'};
            },
            layoutRightStyles() {
                return this.menu_expanded ? {width: 'calc(100% - 200px)'} : {width: 'calc(100% - 60px)'};
            },
            // ...mapGetters({
            //     'admin': 'admin/admin',
            //     'is_logined': 'admin/is_logined',
            //     'menus': 'admin/menus',
            //     'nav_menus': 'admin/nav_menus'
            // })
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
            handleAdminDpdClick(name) {
                if (name == 'logout') {
                    this.logout();
                } else {
                    console.info(name);
                }
            },
            logout() {
                this.$Modal.confirm({
                    title: '确认提示',
                    content: '<p>确定要退出吗？</p>',
                    loading: true,
                    onOk: () => {
                        this.$store.dispatch('admin/logout', {}).then(rsp => {
                            this.$Modal.remove();
                            this.$router.replace({path: '/login'});
                        }).catch(error => {
                        });

                    }
                });
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
                const hasExist = this.navTabs.findIndex(obj => obj.name === node.name);
                // console.info('ss', node);
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
