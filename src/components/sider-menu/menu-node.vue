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
            <span :class="titleClasses">{{ data.name }}</span>

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

    import ImsPopup from '@/components/popup';

    export default {
        name: "MenuNode",
        mixins: [Popper, Emitter],
        components: {
            ImsPopup
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
                default: 'right-end'
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
                    // && this.trigger == 'hover'
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
                // console.info('pageY',event.pageY);
                // console.info('screenY ',event.screenY );
                // console.info('y ',event.y );
                // let childrenHeight = 0;
                // console.info(this.children)
                // if(this.children) {
                //     childrenHeight = 10 + this.children.length * 40;
                //
                // }
                // console.info(childrenHeight);
                // console.info(this.children.length)
                if (this.trigger !== 'hover') {
                    return false;
                }
                // console.info('event',event);
                // console.info(event.target.childNodes[1]);
                // console.info(event.target.childNodes[1].offsetHeight);

                if (this.enterTimer) clearTimeout(this.enterTimer);
                this.enterTimer = setTimeout(() => {
                    // console.info('显示之前',event.target.childNodes[1].style.top);
                    this.visible = true;
                }, 100);

            },
            handleMouseleave() {
                if (this.trigger !== 'hover') {
                    return false;
                } else {
                    // document.querySelector('#navigations').style.position = 'relative';
                    // document.querySelector('#navigations').style.overflow = 'hidden';
                }
                if (this.enterTimer) {
                    clearTimeout(this.enterTimer);
                    this.enterTimer = setTimeout(() => {
                        this.visible = false;
                        // document.querySelector('#navigations').style.position = 'relative';
                        // document.querySelector('#navigations').style.overflow = 'hidden';

                    }, 100);

                }
            },
            indent() {
                return this.level === 0 ? 10 : this.level * 20;
                // return 10;
            },
            handleSelect() {
                console.info(this.data);
                // this.data.type == 2 &&
                if (this.data[this.childrenKey]) {
                    if (this.trigger !== 'click') {
                        return false;
                    }
                    this.visible = !this.visible;
                } else {
                    this.dispatch('SiderMenu', 'on-selected', this.data.nodeKey);
                }
            },
        }
    }
</script>

