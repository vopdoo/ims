<template>
    <span
            :class="classes"
            :style="styles"
            @click="handleClick"
    >
        {{datetime}}
    </span>
</template>

<script>
    const prefixCls = 'vpd-tbl-datetime';
    export default {
        name: "TableDatetime",
        directives: {},
        components: {},
        props: {
            datetime: {
                type: String
            },
            width: {
                default: '',
                type: [String, Number]
            },

        },
        data() {
            return {
                prefixCls: prefixCls,
            };
        },
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
        },
        methods: {
            handleClick() {
                console.info('handleClick');
            },

        },
        mounted() {
        },
        beforeDestroy() {

        }
    }
</script>
<style lang="less" scoped>
    .vpd-tbl-datetime {
        width: 200px;
    }
</style>
