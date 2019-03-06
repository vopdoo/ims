<template>
    <Card dis-hover :bordered="false" title="体验报告">
       ddddd
    </Card>
</template>

<script>
    export default {
        name: "vv",
        data() {
            return {
                searchForm: {
                    keywords: '',
                    payment_method: '',
                    type: '',
                    status: '',
                    page: 1,
                    per_page: 1000,
                },
            }
        }
    }
</script>

<style scoped>

</style>
