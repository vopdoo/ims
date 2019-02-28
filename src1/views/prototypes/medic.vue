<template>
    <Card dis-hover :bordered="false" title="医护人员">

        <Row type="flex" justify="space-between" align="top">
            <Col span="20">
                <Form :model="searchForm" class="search-form" inline>
                    <FormItem>
                        <Input v-model="searchForm.keywords"
                               class="filter-input"
                               @on-search="search()"
                               placeholder="关键词"
                        />
                    </FormItem>
                    <FormItem>
                        <Button icon="ios-search" type="primary" @click="search()">搜索</Button>
                    </FormItem>
                </Form>
            </Col>
            <Col span="4" class="list-tb-right">
                <Button @click="showAddModal()">添加</Button>
            </Col>
        </Row>


        <Table border :columns="columns" :data="tdata"></Table>
        <Row type="flex" style="margin-top: 10px;">
            <Col span="8">

            </Col>
            <Col span="16" class="list-tb-right">
                <Page :total="100" show-elevator/>
            </Col>
        </Row>

        <Modal
                v-model="is_show_modal"
                title="增加"
                :loading="loading"
                @on-ok="save"
                @on-cancel="cancelAddHospital"
        >
            <Form :model="fmData" :label-width="80" ref="fm" :rules="fmRules">
                <FormItem label="名称" prop="name">
                    <Input v-model="fmData.name" placeholder="渠道名称"/>
                </FormItem>
                <FormItem label="排序">
                    <InputNumber :max="999" :min="0" v-model="fmData.sort"/>
                </FormItem>
                <FormItem label="备注">
                    <Input v-model="fmData.remark" placeholder="渠道备注"/>
                </FormItem>
            </Form>
        </Modal>

        <Modal
                v-model="is_show_scheduling_modal"
                title="排班表"
                :loading="loading"
                @on-ok="save"
                @on-cancel="cancelAddHospital"
        >
            <Table border :columns="columns1" :data="data1"></Table>

        </Modal>




    </Card>
</template>

<script>
    export default {
        name: "medic",
        data() {
            return {
                columns1: [
                    {
                        title: '时间段',
                        key: 'no'
                    },
                    {
                        title: '状态',
                        key: 'name'
                    }

                ],
                data1: [
                    {
                        no: '2019-03-10 09:00 - 10:00',
                        name: '已预约',
                    },
                    {
                        no: '2019-03-10 09:00 - 10:00',
                        name: '-',

                    },
                    {
                        no: '2019-03-10 10:30 - 11:30',
                        name: '-',

                    },
                    {
                        no: '2019-03-10 13:30 - 14:30',
                        name: '已预约',

                    },

                    {
                        no: '2019-03-10 15:30 - 16:30',
                        name: '-',

                    },
                ],
                searchForm: {
                    keywords: '',
                    payment_method: '',
                    type: '',
                    status: '',
                    page: 1,
                    per_page: 1000,
                },
                is_show_modal: false,
                is_show_scheduling_modal: false,
                loading: true,
                fmData: {
                    head:'',
                    name: '',
                    level: '',
                    address: '',
                    sort: 0,
                    thumb: 'aaa',
                    tel: '',
                    lng: '',
                    lat: '',
                },

                fmRules: {
                    name: [
                        {required: true, message: '名称不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '至少2个字符', trigger: 'blur'},
                        // {validator: validateNamePath, trigger: 'blur'}
                    ],
                    sort: [
                        {required: false, type: 'integer', message: '排序只能是数字', trigger: 'blur'}
                    ]

                },
                tdata: [
                    {
                        head: '头像一',
                        name: '姓名一',
                        remark: '介绍',
                        sort: 20,
                        created_at: '2019-09-24 23:33:33',
                        updated_at: '2019-09-24 23:33:33'
                    },
                    {
                        head: '头像二',
                        name: '姓名二',
                        remark: '介绍',
                        sort: 21,
                        created_at: '2019-09-24 23:33:33',
                        updated_at: '2019-09-24 23:33:33'
                    }
                ],
                columns: [
                    {
                        type: 'selection',
                        width: 45,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: '头像',
                        key: 'head',
                        width: 150
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        width: 150
                    },
                    {
                        title: '排序',
                        key: 'sort',
                        width: 150
                    },

                    {
                        title: '备注',
                        key: 'remark',
                    },
                    {
                        title: '创建时间',
                        key: 'created_at',
                        width: 150
                    },
                    {
                        title: '更新时间',
                        key: 'updated_at',
                        width: 150
                    },
                    //
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        className: 'actions',
                        width: 185,
                        render: (h, params) => {
                            console.info('role_id', this.role_id);
                            let actions = [];
                            actions = [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                    },
                                    on: {
                                        click: () => {
                                            this.is_show_modal = true;
                                            this.fmData = params.row;
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small',
                                    },
                                    on: {
                                        click: () => {
                                            this.is_show_scheduling_modal = true;
                                            this.fmData = params.row;
                                        }
                                    }
                                }, '排班'),
                                h('Poptip', {

                                    props: {
                                        confirm: true,
                                        title: '确认要删除',
                                        transfer: true,
                                    },
                                    on: {
                                        'on-ok': () => {
                                            console.info(params.index);
                                            this.tdata.splice(params.index,1);
                                        }
                                    }
                                }, [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        }

                                    }, '删除')
                                ])
                            ];
                            return h('div', actions);
                        }
                    }
                ],
            }
        },
        methods: {
            search() {
                console.info('search');
            },
            showAddModal() {
                this.is_show_modal = true;
            },
            save() {
                this.$refs['fm'].validate((valid) => {
                    if (valid) {
                        this.loading = !this.loading;

                        this.loading = !this.loading;
                        this.cancelAddHospital();
                        this.loading = !this.loading;
                        this.fmData.created_at = '2019-09-24 23:33:33';
                        this.fmData.updated_at = '2019-09-24 23:33:33';
                        this.tdata.push(this.fmData);
                        this.$Message.success('添加成功!');
                    } else {
                        this.loading = !this.loading;
                        return false;
                    }
                })
            },
            cancelAddHospital() {
                this.is_show_modal = false;
            },
        }
    }
</script>

<style scoped>

    .list-tb-right {
        float: right;
        text-align: right;
    }

    .filter-input {
        width: 250px;
    }

</style>
