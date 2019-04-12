<template>
    <div>
        Sdf vvvvv
        <p>ddd</p>
    </div>
</template>

<script>
    export default {
        name: "Sdf",
        async beforeRouteEnter(to, from, next) {
            console.info('beforeRouteEnter','Sdf ====');
            next();
        },
    }
</script>

<style scoped>

</style>
