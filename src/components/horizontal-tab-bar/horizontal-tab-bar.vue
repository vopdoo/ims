<template>
    <div>
        <div class="horizontal-tab-bar">
            <div class="control-tool-left">
                <div class="tab-control prev" @click="scrollPrev">
                    <Icon type="ios-arrow-back"/>
                </div>
            </div>
            <div class="control-tabs">
                <ul class="tabs" :style="navTabsStyle" ref="navTabs">
                    <li :class="['item',{'selected':item.selected}]"
                        v-for="(item,index) in data"
                        :key="index"
                        @click="tabChange(item, index)"
                    >
                        <Icon :type="item.icon"></Icon>
                        <span>{{item.name}}</span>
                        <span @click.stop="remove(item,index)" v-if="index !== 0"><Icon type="ios-close"
                                                                                        class="tab-close"></Icon></span>
                    </li>
                </ul>
            </div>
            <div class="control-tool-right">
                <div class="tab-control next" @click="scrollNext">
                    <Icon type="ios-arrow-forward"/>
                </div>
                <div class="tab-control refresh">
                    <Icon type="md-refresh"/>
                </div>
                <div class="tab-control oths">

                    <Dropdown placement="bottom">
                        <Icon type="ios-arrow-down"/>
                        <div slot="list" class="oths-dropdown-tools">
                            <div class="dropdown-tool-item">
                                <Icon type="md-expand"/>
                            </div>
                            <div class="dropdown-tool-item" @click="toggleThemeDrawer">
                                <Icon type="ios-color-palette"/>
                            </div>
                            <div class="dropdown-tool-item" @click="closeAllTabs">
                                <Icon type="md-close"/>
                            </div>
                            <div class="dropdown-tool-item">
                                <Icon type="md-help"/>
                            </div>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </div>
        <Drawer title="主题配置" :closable="true" v-model="is_show_theme_drawer">
            <Divider orientation="left">整体风格设置</Divider>
            <div>
                dddd
            </div>
            <Divider orientation="left">主题色</Divider>
            <div>
                <span>dd</span>
                <span>ddd</span>
                <span>ddd</span>
            </div>
            <Divider orientation="left">其他设置</Divider>
            <div>
                ddddccccc
            </div>
        </Drawer>
    </div>
</template>

<script>
    export default {
        name: "horizontal-tab-bar",
        props: {
            data: {
                type: Array,
                default() {
                    return [];
                }
            },
        },
        data() {
            return {
                navTabsStyle: {
                    transform: ''
                },
                is_show_theme_drawer: false,
            }
        },
        methods: {
            closeAllTabs() {
                this.$set(this.data[0], 'selected', true);
                this.$router.push({path: this.data[0].path});
                this.$emit('on-close-all', this.data[0]);
            },
            scrollNext() {
                console.info('scrollNext');
                const navTabs = this.$refs.navTabs;
                const containerWidth = navTabs.offsetWidth;

                let liOffsetWidth = 0;
                for (let i = 0; i < navTabs.children.length; i++) {
                    liOffsetWidth += navTabs.children[i].offsetWidth;
                }
                if (containerWidth > liOffsetWidth) return;
                const currentOffset = this.getCurrentScrollOffset();

                if (!currentOffset) return;

                let newOffset = currentOffset > containerWidth
                    ? currentOffset - containerWidth
                    : 0;

                this.setOffset(newOffset);
            },
            scrollPrev() {
                console.info('scrollPrev');
                const navTabs = this.$refs.navTabs;
                const containerWidth = navTabs.offsetWidth;
                let liOffsetWidth = 0;
                for (let i = 0; i < navTabs.children.length; i++) {
                    liOffsetWidth += navTabs.children[i].offsetWidth;
                }
                const currentOffset = this.getCurrentScrollOffset();
                if (liOffsetWidth - currentOffset <= containerWidth) return;

                let newOffset = liOffsetWidth - currentOffset > containerWidth * 2
                    ? currentOffset + containerWidth
                    : (liOffsetWidth - containerWidth);
                this.setOffset(newOffset);
            },

            getCurrentScrollOffset() {
                const {navTabsStyle} = this;
                return navTabsStyle.transform
                    ? Number(navTabsStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1])
                    : 0;
            },
            setOffset(value) {
                this.navTabsStyle.transform = `translateX(-${value}px)`;
            },

            remove(item, index) {
                if (item.options.name === this.$route.name) {
                    let lastHistoryRouteName = sessionStorage.getItem('last_history_route_name')
                    const lastHistoryRouteIndex = this.data.findIndex(obj => obj.name == lastHistoryRouteName);
                    console.info(lastHistoryRouteIndex);
                    if (lastHistoryRouteIndex == -1) {
                        this.$router.push({path: '/'});
                        this.$set(this.data[0], 'selected', true);
                    } else {
                        this.$router.push({name: lastHistoryRouteName});
                        this.$set(this.data[lastHistoryRouteIndex], 'selected', true);
                    }
                }
                this.data.splice(index, 1);
            },
            tabChange(item, index) {
                const currentSelectedIndex = this.data.findIndex(obj => obj.selected);
                if (currentSelectedIndex >= 0 && currentSelectedIndex !== index) this.$set(this.data[currentSelectedIndex], 'selected', false);
                this.$set(this.data[index], 'selected', true);
                console.info(item);
                if (item.path === '/') {
                    this.$router.push({path: '/'});
                } else {
                    if (this.$router.currentRoute.name !== item.name) this.$router.push({name: item.options.name});
                }

            },
            toggleThemeDrawer() {
                this.is_show_theme_drawer = !this.is_show_theme_drawer;
                console.info('toggleThemeDrawer');
            }
        }
    }
</script>

<style lang="less" scoped>
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
            font-size: 18px;
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
                .item {
                    height: 40px;
                }
                .selected {
                    color: #000;
                    background-color: #f6f6f6;
                    &:after {
                        width: 100%;
                    }
                }
                li {
                    display: inline-block;
                    line-height: 40px;
                    height: 40px;
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
                        background-color: #00c1de;
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
</style>
