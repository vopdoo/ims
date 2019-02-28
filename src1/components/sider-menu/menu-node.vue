<template>

    <li
            :class="menuItemClasses"
            @mouseenter="handleMouseenter"
            @mouseleave="handleMouseleave"

    >
        <span :class="itemClasses"
             :style="abc"
             @click="handleSelect"
             :ref="triggerRelatedRef.relRef"
        >
            <Icon :type="data.icon" :class="iconClasses"></Icon>
            <span :class="titleClasses" >{{ data.name }}</span>
        </span>
        <ul
                v-if="children"
                :class="submenuClasses"
                :ref="triggerRelatedRef.popperRef"

                v-show="visible"
        >
            <MenuNode
                    v-for="(item, i) in children"
                    :key="i"
                    :data="item"
                    :level="currentLevel"
                    :trigger="trigger"
                    :children-key="childrenKey"
            />
        </ul>


    </li>
</template>

<script>
    const prefixCls = 'ims-sider-menu';
    import Emitter from '../../mixins/emitter';

    import Popper from 'iview/src/components/base/popper';
    import {oneOf} from 'iview/src/utils/assist';

    import Vpdpopup from '@/components/popup';

    export default {
        name: "MenuNode",
        mixins: [Popper, Emitter],
        components: {
            Vpdpopup
        },
        props: {
            data: {
                type: Object,
                default() {
                    return {};
                }
            },
            childrenKey: {
                type: String,
                default: 'children'
            },
            level: {
                type: Number,
                default: 0
            },

            trigger: {
                validator(value) {
                    return oneOf(value, ['click', 'focus', 'hover']);
                },
                default: 'click'
            },
            placement: {
                validator(value) {
                    return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
                },
                default: 'right'
            },

        },
        watch: {
            trigger: {
                handler() {
                    // fixed trigger 由click 切换到hover 时 已经展示的菜单 也显示的问题
                    (this.trigger == 'hover' && this.visible) && (this.visible = !this.visible);
                }
            }
        },
        data() {
            return {
                prefixCls: prefixCls,
                // triggerRelatedRef:{
                //     // popperRef: this.trigger == 'click' ? '' : 'popper'
                // },
                abc: {
                    paddingLeft: this.indent() + 'px',
                    // width:'200px'
                },
                submenuPlacement: [],
            };
        },
        computed: {

            triggerRelatedRef() {
                return {
                    popperRef: this.trigger == 'click' ? 'popper' : 'popper',
                    relRef: this.trigger == 'click' ? '' : 'reference'
                }
            },

            currentLevel() {
                return this.level + 1;
            },
            // classes() {
            //     return [
            //         `${prefixCls}-children`,
            //     ];
            // },
            iconClasses() {
                return [
                    `${prefixCls}-icon`
                ];
            },
            menuItemClasses() {
                return [
                    `${prefixCls}-item`,
                    {
                        [`${prefixCls}-submenu`]: this.data[this.childrenKey] && this.data[this.childrenKey].length,
                        [`${prefixCls}-submenu-popup`]: this.data[this.childrenKey] && this.data[this.childrenKey].length && this.trigger == 'hover',
                    },
                    ...this.submenuPlacement,
                ];

            },
            itemClasses() {
                return [
                    `${prefixCls}-item-title`,
                    {
                        [`${prefixCls}-item-children`]: this.data[this.childrenKey],
                        [`${prefixCls}-item-top-lv`]: this.level == 0 && this.trigger == 'hover',
                        [`${prefixCls}-item-selected`]: this.data.selected,
                        [`${prefixCls}-item-expanded`]: this.trigger == 'click' && this.visible && this.data[this.childrenKey],
                    }
                ];
            },
            //
            submenuClasses() {
                return [
                    // `${prefixCls}-submenu-popper`,
                    // `${prefixCls}-submenu-poptip`:this.data.poptip,
                    {
                        [`${prefixCls}-submenu-popper`]: this.data[this.childrenKey] && this.data[this.childrenKey].length && this.trigger == 'hover',
                        [`${prefixCls}-submenu-normal`]: this.data[this.childrenKey] && this.data[this.childrenKey].length && this.trigger == 'click',
                    },
                ];
            },
            titleClasses() {
                return [
                    `${prefixCls}-item-title-text`,
                ];
            },
            children() {
                return this.data[this.childrenKey];
            }
        },
        methods: {
            handleMouseenter(event) {

                if (this.trigger !== 'hover') {
                    return false;
                }
                if (this.enterTimer) clearTimeout(this.enterTimer);
                this.enterTimer = setTimeout(() => {
                    this.visible = true;
                }, 100);

            },
            handleMouseleave() {
                // console.info('handleMouseleave');

                if (this.trigger !== 'hover') {
                    return false;
                }
                if (this.enterTimer) {
                    clearTimeout(this.enterTimer);
                    this.enterTimer = setTimeout(() => {
                        this.visible = false;
                    }, 100);
                }
            },
            indent() {
                return this.level === 0 ? 10 : this.level * 20;
                // return 10;
            },
            handleSelect() {
                console.info(this.data);
                if(this.data[this.childrenKey]) {
                    if (this.trigger !== 'click') {
                        return false;
                    }
                    this.visible = !this.visible;
                } else {
                    console.info('最后一级跳转路由或者做一些其他事情....');
                    this.dispatch('SiderMenu', 'on-selected', this.data.nodeKey);
                }
            },
        }
    }
</script>

<style scoped lang="less">

    .ims-sider-menu-submenu {
        display: flex;
        flex-direction: column;

    }

    .ims-sider-menu-item-children {
        &:after {
            position: relative;
            float: right;
            margin-right: 10px;
            content: '\F116';
            font-family: "Ionicons";
            font-size: 14px;
            display: inline-block;
            transition: all .2s ease-in-out;
        }

        &:hover {
        }
    }

    .ims-sider-menu-item {
        .ims-sider-menu-item-expanded {
            &:after {
                content: '\F124';
            }
        }
        .ims-sider-menu-item-title {
            display: inline-block;
            width: 100%;
            cursor: pointer;
            .ims-sider-menu-icon {
                font-size: 22px;
            }
            &:hover {
                background-color: #384f73;
                color: #00c1de;
                .ims-sider-menu-icon {
                    color: #00c1de;
                }
            }
        }


        .ims-sider-menu-item-top-lv {
            text-align: center;
            padding-left: 0 !important;

            .ims-sider-menu-icon {
                font-size: 32px;
            }
            &:after {
                position: relative;
                float: right;
                margin-right: 10px;
                content: '\F11F';
                font-family: "Ionicons";
                font-size: 14px;
                display: none;
                transition: all .2s ease-in-out;
            }
            .ims-sider-menu-item-title-text {
                display: none;
            }
        }

    }


    .ims-sider-menu-submenu-normal {
        background: #071526;
        display: flex;
        flex-direction: column;
        position: inherit !important;
        top: inherit !important;
        left: inherit !important;
        will-change: inherit !important;
    }

    .ims-sider-menu-submenu-popup {
        .ims-sider-menu-submenu-popper {
            background: #071526;
            display: flex;
            flex-direction: column;
            width: 200px;
            z-index: 9999;
            margin-left: 1px;
            border-radius: 2px;
            padding: 5px 0;
            .ims-sider-menu-item-children {
                &:after {
                    content: '\F11F';
                }
            }
            .ims-sider-menu-item-title {
                padding-left: 10px !important;
            }

        }
    }

    .ims-sider-menu-item-selected {
        background-color: #384f73;
    }


</style>
