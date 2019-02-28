<template>
    <Card dis-hover :bordered="false" title="分类管理">

        <Row type="flex" justify="space-between" align="top">
            <Col span="20">
                <Form ref="searchForm" :model="searchForm" inline>
                    <FormItem>
                        <Select v-model="searchForm.status" placeholder="状态">
                            <Option v-for="item in configsStatus" :value="item.id" :key="item.id">{{ item.text }}
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem>
                        <Input search v-model="searchForm.keywords" class="search-ipt" @on-search="search('searchForm')"
                               placeholder="名称/描述"/>
                    </FormItem>
                </Form>
            </Col>
            <Col span="4" class="list-tb-right">
                <!--<Button @click="showAddModal()">增加</Button>-->
            </Col>
        </Row>

        <Table border :columns="columns" :data="config_integral_list.data"></Table>
        <Row type="flex" style="margin-top: 10px;">
            <Col span="8">

            </Col>
            <Col span="16" class="list-tb-right">
                <Page :total="config_integral_list.meta.total" @on-change="changePage" show-total :current="1"></Page>
            </Col>
        </Row>

        <Modal
                v-model="is_show_modal"
                title="编辑积分配置"
                :loading="loading"
                @on-ok="save('ConfigIntegral')"
                @on-cancel="cancelAddEditModal"
                width="800"
        >


            <Form :model="fmData" :label-width="100" ref="fm" :rules="fmRules">

                <FormItem label="名称" prop="name">
                    <Input placeholder="请输入名称" v-model="fmData.name"/>
                </FormItem>

                <FormItem label="描述">
                    <Input placeholder="请输入描述" v-model="fmData.description"/>
                </FormItem>
                <FormItem label="积分值">
                    <Input placeholder="请输入描述" v-model="fmData.value"/>
                </FormItem>
                <FormItem label="状态">
                    <i-switch size="large" v-model="fmData.status">
                        <span slot="open">显示</span>
                        <span slot="close">隐藏</span>
                    </i-switch>
                </FormItem>

                <FormItem label="排序">
                    <InputNumber :max="9999" :min="1" v-model="fmData.sort" />
                </FormItem>

            </Form>
        </Modal>


    </Card>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "ConfigsIntegral",
        mounted() {
            this.getLists();
        },
        computed: {
            ...mapGetters([
                'config_integral_list',
            ])
        },
        methods: {
            showAddModal() {
                this.fmData.status = true;
                // this.fmData.type = 1;
                this.is_show_modal = true;

            },
            getLists() {
                this.$store.dispatch('configIntegralList', this.searchForm);
            },
            search() {
                this.searchForm.page = 1;
                this.getLists();
            },
            changePage(page) {
                this.searchForm.page = page;
                this.getLists();
            },
            cancelAddEditModal() {
                this.is_show_modal = false;
                this.fmData = {};
            },
            save(action) {

                this.$refs['fm'].validate((valid) => {
                    if (valid) {
                        this.loading = !this.loading;
                        let addOrEditAction = 'add' + action;
                        if (this.fmData.id && this.fmData.id > 0) addOrEditAction = 'edit' + action;
                        console.info(addOrEditAction);
                        console.info(this.fmData);
                        this.$store.dispatch(addOrEditAction, this.fmData).then(rsp => {
                            this.loading = !this.loading;
                            this.cancelAddEditModal();
                            this.getLists();
                        }).catch(rsp => {
                            // console
                            this.loading = !this.loading;
                            this.$Message.error('保存失败，请重试!');
                            return false;
                        })
                    } else {
                        this.loading = !this.loading;
                        return false;
                    }
                })
            },
        },

        data() {
            return {
                fmRules: {
                    name: [
                        {required: true, message: '名称不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '至少2个字符', trigger: 'blur'},
                    ]
                },
                is_show_modal: false,
                loading: true,
                searchForm: {
                    keywords: '',
                    page: 1,
                },
                fmData: {
                    type: 0,
                    status: true,
                },
                configsStatus: [
                    {
                        id: '',
                        text: '全部',
                    },
                    {
                        id: 1,
                        text: '显示',
                    },
                    {
                        id: 0,
                        text: '隐藏',
                    }

                ],


                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        width: 80,
                        fixed: 'left'
                    },
                    {
                        title: '名称',
                        key: 'name',
                    },
                    {
                        title: '描述',
                        key: 'description',
                    },
                    {
                        title: '积分值',
                        key: 'value',
                    },

                    {
                        title: '状态',
                        key: 'status',
                        width: 100,
                        render: (h, params) => {
                            return h('Tag', {
                                props: {
                                    color: params.row.status ? 'success' : 'error'
                                }
                            }, params.row.status  ? '显示' : '隐藏');
                        }
                    },
                    {
                        title: '排序',
                        key: 'sort',
                        width: 80
                    },

                    {
                        title: '提交时间',
                        key: 'created_at',
                        width: 150
                    },
                    {
                        title: '更新时间',
                        key: 'updated_at',
                        width: 150
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.fmData = params.row;
                                            this.is_show_modal = true;
                                        }
                                    }
                                }, '编辑')


                            ]);
                        }
                    }
                ]

            }
        }
    }
</script>

<style scoped>
    .search-ipt {
        width: 300px;
    }

    .list-tb-right {
        float: right;
        text-align: right;
    }
</style>
