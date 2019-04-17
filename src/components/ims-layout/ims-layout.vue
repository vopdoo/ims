<template>
    <div :class="classes">
        <div class="left" :class="layoutLeftClasses" :style="layoutCommonStyles">
            <div :class="logoClasses">
                <span :class="logoTitleClasses">Ims</span>
            </div>
            <div class="navigation" :class="navigationClasses" ref="navigationWrapper">
                 <SiderMenu class="sider-menu" @on-select-change="selectMenu" :data="nav_menus" :trigger="menuTrigger"/>
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

    import BScroll from 'better-scroll'

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
        mounted() {
            this.$nextTick(() => {
                this.navigationWrapperScrollInit();
                this.scrollInit();
            })
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
                nav_menus:[
                    {
                        "id": 1,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-apps",
                        "name": "系统",
                        "code": "systems",
                        "options": {
                            "name": "systems_nodes",
                            "path": "systems/nodes",
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2018-05-26 07:32:54",
                        "updated_at": "2019-03-07 16:09:56",
                        "children": [
                            {
                                "id": 3,
                                "pid": 1,
                                "type": 1,
                                "icon": "ios-code-working",
                                "name": "节点管理",
                                "code": "node",
                                "options": {
                                    "name": "systems_nodes",
                                    "path": "systems/nodes",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2018-05-26 07:32:54",
                                "updated_at": "2019-03-07 16:11:47"
                            },
                            {
                                "id": 93,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "用户管理",
                                "code": "systems_admins",
                                "options": {
                                    "name": "systems_admins",
                                    "path": "systems/admins",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-04 17:21:21",
                                "updated_at": "2019-03-07 16:14:24"
                            },
                            {
                                "id": 94,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "操作日志",
                                "code": "systems_actionlogs",
                                "options": {
                                    "name": "systems_actionlogs",
                                    "path": "systems/actionlogs",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-05 17:37:12",
                                "updated_at": "2019-03-12 11:43:05"
                            },
                            {
                                "id": 95,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "组织机构",
                                "code": "systems_departments",
                                "options": {
                                    "name": "systems_departments",
                                    "path": "systems/departments",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-07 16:55:50",
                                "updated_at": "2019-03-12 11:45:23"
                            },
                            {
                                "id": 104,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "角色管理",
                                "code": "roles",
                                "options": {
                                    "name": "systems_roles",
                                    "path": "systems/roles",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-12 11:55:43",
                                "updated_at": "2019-03-12 11:55:43"
                            },
                            {
                                "id": 116,
                                "pid": 1,
                                "type": 2,
                                "icon": "md-apps",
                                "name": "权限管理",
                                "code": "测试001",
                                "options": null,
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-14 22:26:45",
                                "updated_at": "2019-03-15 10:12:58",
                                "children": [
                                    {
                                        "id": 117,
                                        "pid": 116,
                                        "type": 2,
                                        "icon": "md-apps",
                                        "name": "比方说",
                                        "code": "123123",
                                        "options": null,
                                        "sort": 0,
                                        "status": true,
                                        "created_at": "2019-03-14 22:28:03",
                                        "updated_at": "2019-03-15 10:13:41",
                                        "children": [
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-apps",
                        "name": "会员",
                        "code": "uses",
                        "options": {
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2019-03-29 03:43:35",
                        "updated_at": "2019-03-29 03:43:35",
                        "children": [
                            {
                                "id": 122,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "会员档案",
                                "code": "users_lists",
                                "options": {
                                    "name": "users_lists",
                                    "path": "users/lists",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 03:44:27",
                                "updated_at": "2019-04-01 03:55:29"
                            },
                            {
                                "id": 123,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "预约管理",
                                "code": "reservations",
                                "options": {
                                    "name": "users_reservations",
                                    "path": "users/reservations",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 07:25:13",
                                "updated_at": "2019-03-29 07:25:13"
                            }
                        ]
                    }
                ],
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
                })
            },
            scrollInit() {
                this.BS = new BScroll(this.$refs.wrapper,{
                    mouseWheel: true,
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
