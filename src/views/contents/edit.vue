<template>

    <Form :model="fmData" :label-width="100" ref="fm" style="background-color: #fff;">
        <div style="height: 100px;"></div>
        <FormItem label="标题">
            <Input  placeholder="请输入文章标题"  />
        </FormItem>
        <FormItem label="描述">
            <Input  placeholder="请输入文章标题"  />
        </FormItem>

        <FormItem label="缩略图">
            <Input  placeholder="请输入文章标题"  />
        </FormItem>


        <FormItem label-width="60">
            <i-editor v-model="content"></i-editor>
        </FormItem>









    </Form>

</template>

<script>
    export default {
        name: "edit",
        data() {
            return {
                content:'',
                is_show_modal: false,
                loading: true,
                searchForm: {
                    keywords: '',
                    page: 1,
                },
                fmData: {},



            }
        }
    }
</script>

<style scoped>

</style>
