<template>
    <Card dis-hover :bordered="false" title="体验报告">
        <Form :model="searchForm" class="search-form" inline>
            <FormItem>
                <Select v-model="searchForm.type" placeholder="类别" class="filter-select">
                    <Option value="">全部</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Select v-model="searchForm.status" placeholder="状态" class="filter-select">
                    <Option value="">全部</Option>
                </Select>
            </FormItem>






            <FormItem>
                <!--:options="experienceAtRangOptions"-->
                <DatePicker type="daterange"
                            v-model="searchForm.experience_at_range"
                            @on-change="experienceAtRangeChange"
                            placement="bottom-start"
                            placeholder="体检时间"

                            class="filter-datepicker"
                />
            </FormItem>

            <FormItem>
                <DatePicker type="daterange"
                            v-model="searchForm.created_at_range"
                            @on-change="createdAtRangeChange"
                            placement="bottom-start"
                            placeholder="创建时间"
                            class="filter-datepicker"
                />
            </FormItem>
            <FormItem>
                <Input v-model="searchForm.keywords"
                       class="filter-input"
                       @on-search="search()"
                       placeholder="..."
                />
            </FormItem>

        </Form>


        <Table border :columns="columns" :data="medical_examination_report.data"></Table>
        <Row type="flex" style="margin-top: 10px;">
            <Col span="8">

            </Col>
            <Col span="16" class="list-tb-right">
                <Page :total="medical_examination_report.meta.total" show-total @on-change="changePage"
                      :current="1"></Page>
            </Col>
        </Row>

        <Modal
                v-model="is_show_modal"
                title="编辑报告"
                class-name="add-edit-modal"
                :loading="loading"
                @on-ok="save('Report')"
                @on-cancel="cancelAddEditModal"
                width="800"
        >


            <Form :model="fmData" :label-width="150" ref="fm">

                <Card :bordered="false" dis-hover title="总结&建议">
                    <FormItem label="总结">
                        <Input v-model="fmData.summarize" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="总结"/>
                        <!--<froala :tag="'textarea'" :config="config" v-model="fmData.summarize"></froala>-->
                    </FormItem>
                    <FormItem label="建议">
                        <Input v-model="fmData.suggest" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                               placeholder="建议"/>
                        <!--<froala :tag="'textarea'" :config="config" v-model="fmData.suggest"></froala>-->
                    </FormItem>
                </Card>


                <Card :bordered="false" dis-hover :title="pkg.name" :key="index" v-for="(pkg,index) in fmData.packages">
                    <FormItem :label="item.name" :key="idx" v-for="(item,idx) in pkg.items">
                        <Input v-model="item.value" :placeholder="item.name">
                        <span slot="append" v-if="item.unit != 'null'">{{item.unit}}</span>
                        </Input>
                    </FormItem>
                </Card>


                <FormItem label="状态">
                    <i-switch v-model="fmData.status"></i-switch>
                </FormItem>
            </Form>
        </Modal>
        <Modal
                v-model="is_show_import_upload"
                title="导入报告"
                :loading="loading"
                :with="800"
        >
            <Form :model="fmData" :label-width="100" ref="fm">
                <FormItem label="报告表格">
                    <Upload action="http://weapp.scmhmt.com/api/importReport" :on-success="handleSuccess">
                        <Button icon="ios-cloud-upload-outline">选择导入的Excel表格</Button>
                    </Upload>
                </FormItem>
            </Form>
        </Modal>
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
