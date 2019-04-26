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
                <div class="tab-control oths">

                    <Dropdown placement="bottom"
                              :transfer="true"
                              transfer-class-name="oths-tool"
                              @on-click="handleOthsTool"
                    >

                        <Icon type="ios-arrow-down"/>
                        <DropdownMenu slot="list" >
                            <DropdownItem>
                                <Icon type="md-expand"/>
                            </DropdownItem>
                            <DropdownItem name="theme">
                                <Icon type="ios-color-palette"/>
                            </DropdownItem>
                            <DropdownItem>
                                <Icon type="md-close"/>
                            </DropdownItem>
                            <DropdownItem>
                                <Icon type="md-help"/>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="tab-control  refresh">
                    <Icon type="md-refresh"/>
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
            handleOthsTool(name) {
                if (name == 'theme') {
                    this.toggleThemeDrawer();
                }
            },
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

            async remove(item, index) {
                if (item.options.name === this.$route.name) {
                    let lastHistoryRouteName = sessionStorage.getItem('last_history_route_name')
                    const lastHistoryRouteIndex = this.data.findIndex(obj => obj.name == lastHistoryRouteName);
                    console.info(lastHistoryRouteIndex);
                    if (lastHistoryRouteIndex == -1) {
                        this.$router.push({path: '/admin'});
                        this.$set(this.data[0], 'selected', true);
                    } else {
                        this.$router.push({name: lastHistoryRouteName});
                        this.$set(this.data[lastHistoryRouteIndex], 'selected', true);
                    }
                }
                this.data.splice(index, 1);
                const db = await this.$store.dispatch('db/database', {user: true});
                db.set('nav_tabs',this.data).write();
                this.$store.dispatch('system/getNavTabs');
            },

            async tabChange(item, index) {
                const currentSelectedIndex = this.data.findIndex(obj => obj.selected);
                if (currentSelectedIndex >= 0 && currentSelectedIndex !== index) this.$set(this.data[currentSelectedIndex], 'selected', false);
                this.$set(this.data[index], 'selected', true);
                if (item.path === '/admin') {
                    this.$router.push({path: '/admin'});
                } else {
                    if (this.$router.currentRoute.name !== item.name) this.$router.push({name: item.options.name});
                }
                // console.info(this.data)
                const db = await this.$store.dispatch('db/database', {user: true});
                db.set('nav_tabs',this.data).write();
                this.$store.dispatch('system/getNavTabs');

            },
            toggleThemeDrawer() {
                this.is_show_theme_drawer = !this.is_show_theme_drawer;
                console.info('toggleThemeDrawer');
            }
        }
    }
</script>

