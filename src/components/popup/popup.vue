<template>
    <div
            :class="classes"
            @mouseenter="handleMouseenter"
            @mouseleave="handleMouseleave"
    >
        <div
                :class="[prefixCls + '-rel']"
                ref="reference"
                @click="handleClick"
                @mousedown="handleFocus(false)"
                @mouseup="handleBlur(false)">
            <slot></slot>
        </div>

        <transition name="fade">
            <div
                    :class="popperClasses"
                    :style="styles"
                    ref="popper"
                    v-show="visible"
                    @mouseenter="handleMouseenter"
                    @mouseleave="handleMouseleave"
                    >
                <div :class="[prefixCls + '-content']">

                    <div :class="[prefixCls + '-inner']" >
                        <div :class="[prefixCls + '-body']" :style="contentPaddingStyle">
                            <div :class="contentClasses"><slot name="content"><div :class="[prefixCls + '-body-content-inner']">{{ content }}</div></slot></div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<!--<style lang="less" scoped>-->
    <!--.vpd-popup {-->
        <!--/*background: gray;*/-->
        <!--/*border: 1px solid red;*/-->

        <!--.vpd-popup-rel {-->
            <!--&:hover {-->
                <!--/*background: gold;*/-->
            <!--}-->
        <!--}-->

        <!--.vpd-popup-popper {-->
            <!--width: 200px;-->
            <!--background-color: #071526;-->
            <!--/*margin: 5px 5px;*/-->
            <!--padding: 5px 0;-->
            <!--margin-left: 5px;-->
            <!--box-sizing: border-box;-->
            <!--border-radius: 4px;-->
            <!--box-shadow: 0 1px 6px rgba(0,0,0,.2);-->
            <!--position: absolute;-->
            <!--z-index: 900;-->
            <!--.vpd-popup-popper-content {-->
                <!--background: gold;-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</style>-->

<script>
    import Popper from 'iview/src/components/base/popper';
    import {oneOf} from 'iview/src/utils/assist';

    const prefixCls = 'ims-popup';

    export default {
        name: "ImsPopup",
        mixins: [Popper],
        directives: {},
        components: {},
        computed: {
            classes() {
                return [
                    `${prefixCls}`,
                    // {
                    //     [`${prefixCls}-confirm`]: this.confirm
                    // }
                ];
            },
            styles() {
                let style = {};

                if (this.width) {
                    style.width = `${this.width}px`;
                }
                return style;
            },
            popperClasses () {
                return [
                    `${prefixCls}-popper`,
                    {
                        [`${this.popperClass}`]: !!this.popperClass
                    }
                ];
            },
            contentClasses () {
                return [
                    `${prefixCls}-body-content`,
                    // {
                    //     [`${prefixCls}-body-content-word-wrap`]: this.wordWrap
                    // }
                ];
            },
            contentPaddingStyle () {
                const styles = {};
                if (this.padding !== '') styles['padding'] = this.padding;
                return styles;
            }
        },
        props: {
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
            title: {
                type: [String, Number]
            },
            content: {
                type: [String, Number],
                default: ''
            },
            width: {
                type: [String, Number]
            },
            popperClass: {
                type: String
            },
            padding: {
                type: String
            }
        },
        data() {
            return {
                prefixCls: prefixCls,
            };
        },
        methods: {
            handleClick() {
                if (this.confirm) {
                    this.visible = !this.visible;
                    return true;
                }
                if (this.trigger !== 'click') {
                    return false;
                }
                this.visible = !this.visible;
            },
            handleTransferClick() {
                if (this.transfer) this.disableCloseUnderTransfer = true;
            },
            handleClose() {
                this.visible = false;
            },
            handleFocus(fromInput = true) {
                if (this.trigger !== 'focus' || (this.isInput && !fromInput)) {
                    return false;
                }
                this.visible = true;
            },
            handleBlur(fromInput = true) {
                if (this.trigger !== 'focus' || (this.isInput && !fromInput)) {
                    return false;
                }
                this.visible = false;
            },
            handleMouseenter() {
                if (this.trigger !== 'hover') {
                    return false;
                }
                if (this.enterTimer) clearTimeout(this.enterTimer);
                this.enterTimer = setTimeout(() => {
                    this.visible = true;
                }, 100);
            },
            handleMouseleave() {
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

            getInputChildren() {
                const $input = this.$refs.reference.querySelectorAll('input');
                const $textarea = this.$refs.reference.querySelectorAll('textarea');
                let $children = null;

                if ($input.length) {
                    $children = $input[0];
                } else if ($textarea.length) {
                    $children = $textarea[0];
                }

                return $children;
            }
        },
        mounted() {

            // if trigger and children is input or textarea,listen focus & blur event
            if (this.trigger === 'focus') {
                this.$nextTick(() => {
                    const $children = this.getInputChildren();
                    if ($children) {
                        this.isInput = true;
                        $children.addEventListener('focus', this.handleFocus, false);
                        $children.addEventListener('blur', this.handleBlur, false);
                    }
                });
            }
        },
        beforeDestroy() {
            const $children = this.getInputChildren();
            if ($children) {
                $children.removeEventListener('focus', this.handleFocus, false);
                $children.removeEventListener('blur', this.handleBlur, false);
            }
        }
    }
</script>
