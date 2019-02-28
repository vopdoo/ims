<template>
    <div id="ims-console">
        <div class="layouts">
            <div class="header">
                <div class="logo" :style="[layoutCommonStyles]">
                    Vopdoo
                </div>
                <div class="horizontal-nav">
                    horizontal-navs
                </div>
            </div>
            <div class="main">
                <div class="navigation" :style="[layoutCommonStyles]">
                    <div class="menu">
                        <!--<div class="item" v-for="n in 100" :key="n">Menu {{n}}</div>-->
                        <Menu theme="dark" width="200">
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-paper" />
                                    内容管理
                                </template>
                                <MenuItem name="1-1">文章管理</MenuItem>
                                <MenuItem name="1-2">评论管理</MenuItem>
                                <MenuItem name="1-3">举报管理</MenuItem>
                            </Submenu>
                            <Submenu name="2">
                                <template slot="title">
                                    <Icon type="ios-people" />
                                    用户管理
                                </template>
                                <MenuItem name="2-1">新增用户</MenuItem>
                                <MenuItem name="2-2">活跃用户</MenuItem>
                            </Submenu>
                            <Submenu name="3">
                                <template slot="title">
                                    <Icon type="ios-stats" />
                                    统计分析
                                </template>
                                <MenuGroup title="使用">
                                    <MenuItem name="3-1">新增和启动</MenuItem>
                                    <MenuItem name="3-2">活跃分析</MenuItem>
                                    <MenuItem name="3-3">时段分析</MenuItem>
                                </MenuGroup>
                                <MenuGroup title="留存">
                                    <MenuItem name="3-4">用户留存</MenuItem>
                                    <MenuItem name="3-5">流失用户</MenuItem>
                                </MenuGroup>
                            </Submenu>
                        </Menu>
                    </div>
                </div>
                <div class="contents">
                    <div class="horizontal-tab-bar">
                        Tabs

                    </div>
                    <div class="main-content">
                        <router-view></router-view>
                    </div>

                </div>
            </div>
            <div class="footer">
                <div class="navigation-trigger" :style="[layoutCommonStyles]">
                    <Icon type="md-swap" class="trigger" @click="navigationTrigger" size="16"/>
                </div>
                <div class="copyright">copyright</div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Console",
        data() {
            return {
                layoutCommonStyles: {
                    width: '200px',
                    minWidth: '50px',
                    // background: '#525A6C',
                }
            }
        },
        methods: {
            navigationTrigger() {
                console.info('navigationTrigger');
                console.info(this.layoutCommonStyles.width);
                this.layoutCommonStyles.width = this.layoutCommonStyles.width == this.layoutCommonStyles.minWidth ? '200px' : '50px';
            }
        }
    }
</script>

<style lang="less" scoped>
    .layouts {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        .header {
            height: 60px;
            box-sizing: border-box;
            background-color: #fff;
            display: flex;
            line-height: 60px;
            width: 100%;
            position: fixed;
            top: 0;
            z-index: 1000;
            .logo {
                width: 200px;
                text-align: center;
                background: #525A6C;
                color: #fff;
            }
            .horizontal-nav {
                flex: 1;
                padding-left: 16px;
            }

        }
        .main {
            flex: 1;
            position: absolute;
            margin-top: 60px;
            margin-bottom: 40px;

            width: 100%;
            height: 100%;
            display: flex;

            .navigation {
                width: 200px;
                background: #525A6C;
                color: #fff;

                height: 100%;
                .menu {
                    overflow-y: auto;
                    overflow-x: hidden;
                }
            }
            .contents {
                background: #f8f8f9;

                height: auto;
                width: 100%;

                flex: 1;
                display: flex;
                flex-direction: column;
                .main-content {
                    flex: 1;
                    padding: 16px;
                    height: auto;
                    width: 100%;
                    overflow-y: auto;
                    overflow-x: hidden;
                }
                .horizontal-tab-bar {
                    border: 1px solid red;
                    height: 40px;
                    line-height: 40px;
                }

            }
        }

        .footer {
            height: 40px;
            line-height: 40px;
            width: 100%;
            display: flex;
            z-index: 1001;
            position: fixed;
            bottom: 0;
            .navigation-trigger {
                width: 200px;
                background: #525A6C;
                text-align: center;
                .trigger {
                    color: #fff;
                    cursor: pointer;
                }

            }
            .copyright {
                flex: 1;
                text-align: center;
                box-sizing: border-box;
                background: #fff;
            }

        }

    }

</style>
