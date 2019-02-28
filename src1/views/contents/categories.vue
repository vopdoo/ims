<template>
    <Card dis-hover :bordered="false" title="分类管理">

        <Row type="flex" justify="space-between" align="top">
            <Col span="20">
                <Form ref="searchForm" :model="searchForm" inline>
                    <FormItem>
                        <Select v-model="searchForm.status" placeholder="状态">
                            <Option v-for="item in categoriesStatus" :value="item.id" :key="item.id">{{ item.text }}
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Select v-model="searchForm.type" placeholder="类型">
                            <Option value="">全部</Option>
                            <Option v-for="item in categoriesTypes" :value="item.id" :key="item.id">{{ item.text }}
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
                <Button @click="showAddModal()">增加</Button>
            </Col>
        </Row>

        <Table border :columns="columns" :data="categories_list.data"></Table>

        <Row type="flex" style="margin-top: 10px;">
            <Col span="8">

            </Col>
            <Col span="16" class="list-tb-right">
                <Page :total="categories_list.meta.total" @on-change="changePage" show-total :current="1"></Page>
            </Col>
        </Row>

        <Modal
                v-model="is_show_modal"
                title="编辑分类"
                :loading="loading"
                @on-ok="save('Categories')"
                @on-cancel="cancelAddEditModal"
                width="800"
        >


            <Form :model="fmData" :label-width="100" ref="fm" :rules="fmRules">
                <FormItem label="类型" >

                    <Select v-model="fmData.type" placeholder="请选择类型">
                        <Option v-for="item in categoriesTypes" :value="item.id" :key="item.id">{{ item.text }}
                        </Option>

                    </Select>
                </FormItem>
                <FormItem label="名称" prop="name">
                    <Input placeholder="请输入分类名称" v-model="fmData.name"/>
                </FormItem>
                <FormItem label="标识代码" prop="id_code">
                    <Input placeholder="标识代码" v-model="fmData.id_code"/>
                </FormItem>
                <FormItem label="描述">
                    <Input placeholder="请输入分类描述" v-model="fmData.description"/>
                </FormItem>
                <FormItem label="状态">
                    <i-switch size="large" v-model="fmData.status">
                        <span slot="open">正常</span>
                        <span slot="close">禁用</span>
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
        name: "ContentsCategories",
        mounted() {
            this.getLists();
        },
        computed: {
            ...mapGetters([
                'categories_list',
            ])
        },
        methods: {
            showAddModal() {
                this.fmData.status = true;
                // this.fmData.type = 1;
                this.is_show_modal = true;

            },
            getLists() {
                this.$store.dispatch('categoriesList', this.searchForm);
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
            const validateNamePath = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                let validateCategoriesNameParams = {
                    type: rule.field,
                    value: value,
                    id: this.fmData.id
                };
                this.$store.dispatch('validateCategoriesName', validateCategoriesNameParams).then(result => {
                    if (result) {
                        callback(new Error('已经存在了，请重新输入！'));
                    } else {
                        callback();
                    }
                });

            };

            const validateIdCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                let validateParams = {
                    type: rule.field,
                    value: value,
                    id: this.fmData.id
                };
                this.$store.dispatch('validateCategoriesIdCode', validateParams).then(result => {
                    if (result) {
                        callback(new Error('已经存在了，请重新输入！'));
                    } else {
                        callback();
                    }
                });

            };


            return {

                fmRules: {
                    name: [
                        {required: true, message: '名称不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '至少2个字符', trigger: 'blur'},
                        {validator: validateNamePath, trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请选择类型', trigger: 'change'}
                    ],
                    id_code: [
                        {required: true, message: '标识代码不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '至少2个字符', trigger: 'blur'},
                        {validator: validateIdCode, trigger: 'blur'}
                    ],
                },
                is_show_modal: false,
                loading: true,
                searchForm: {
                    type: '',
                    keywords: '',
                    page: 1,
                    with_posts: true,
                },
                fmData: {
                    type: 0,
                    status: true,
                },
                categoriesStatus: [
                    {
                        id: '',
                        text: '全部',
                    },
                    {
                        id: 0,
                        text: '禁用',
                    },
                    {
                        id: 1,
                        text: '正常',
                    }

                ],
                categoriesTypes: [
                    {
                        id: 1,
                        text: '文章',
                    },
                    {
                        id: 2,
                        text: '轮播',
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
                        title: '类型',
                        key: 'type',
                        width: 100,
                        render: (h, params) => {
                            return h('span',  params.row.type == 1 ? '文章' : '轮播');
                        }
                    },
                    {
                        title: '标识代码',
                        key: 'id_code',
                        // width: 100
                    },
                    {
                        title: '名称',
                        key: 'name',
                        // width: 100
                    },

                    {
                        title: '描述',
                        key: 'description',
                        // width: 100
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
                            }, params.row.status ? '正常' : '禁用');
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
                                }, '编辑'),
                                h('Poptip', {

                                    props: {
                                        confirm: true,
                                        title: '确认要删除',
                                        transfer: true,
                                    },
                                    on: {
                                        'on-ok': () => {
                                            this.$store.dispatch('delCategories', {id: params.row.id}).then(rsp => {
                                                this.getLists();
                                            });
                                        }
                                    }
                                }, [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                            disabled: params.row.posts.length >= 1
                                        }

                                    }, '删除')
                                ])

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
