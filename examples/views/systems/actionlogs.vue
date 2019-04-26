<template>
    <div>
        ActionLogs vvv ss
    </div>
</template>

<script>

    export default {
        name: "ActionLogs",
        async created() {
            await this.$store.dispatch('system/changeSpining',{spining:false});
        },
    }
</script>
