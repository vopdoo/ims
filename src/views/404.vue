<template>
    <div :class="classes">
        404
    </div>
</template>

<script>
    const prefixCls = 'ims-404';
    export default {
        name: "NotFound",
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                    }
                ];
            },

        },
    }
</script>
