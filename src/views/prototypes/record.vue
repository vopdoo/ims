<template>
    <Card dis-hover :bordered="false" title="档案管理">

        <Row type="flex" justify="space-between" align="top">
            <Col span="20">
                <Form :model="searchForm" class="search-form" inline>
                    <FormItem>
                        <Select v-model="searchForm.channel" placeholder="渠道" style="width:100px">
                            <Option v-for="item in channelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Input v-model="searchForm.keywords"
                               class="filter-input"
                               @on-search="search()"
                               placeholder="档案号/卡号/姓名/手机/微信号/通讯地址"
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
                title="增加客户档案"
                :loading="loading"
                width="800"
                class-name="add-edit-modal"
                :scrollable="true"
                @on-ok="save"
                @on-cancel="cancelAddHospital"
        >
            <Form :model="fmData" :label-width="80" ref="fm" :rules="fmRules">


                <Row>
                    <Col span="12">
                        <FormItem label="客户姓名">
                            <Input v-model="fmData.name" placeholder=""/>
                        </FormItem>
                    </Col>

                    <Col span="12">
                        <FormItem label="客户卡号">
                            <Input v-model="fmData.customer_number" placeholder=""/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="年龄">
                            <Input v-model="fmData.age" placeholder=""/>
                        </FormItem>
                    </Col>

                    <Col span="12">
                        <FormItem label="固定电话">
                            <Input v-model="fmData.telephone" placeholder=""/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="手机">
                            <Input v-model="fmData.mobile" placeholder=""/>
                        </FormItem>
                    </Col>


                    <Col span="12">
                        <FormItem label="出生日期">
                            <Input v-model="fmData.birth_date" placeholder=""/>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                        <FormItem label="微信号">
                            <Input v-model="fmData.wechat_id" placeholder=""/>
                        </FormItem>
                    </Col>

                    <Col span="12">
                        <FormItem label="通讯地址">
                            <Input v-model="fmData.address" placeholder=""/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="区域">
                            <Input v-model="fmData.area" placeholder=""/>
                        </FormItem>
                    </Col>

                    <Col span="12">
                        <FormItem label="职业">
                            <Input v-model="fmData.profession" placeholder=""/>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                        <FormItem label="信息来源">
                            <Input v-model="fmData.source" placeholder=""/>
                        </FormItem>
                    </Col>

                    <Col span="12">
                        <FormItem label="开发渠道">
                            <Input v-model="fmData.channel" placeholder=""/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="客户状态">
                            <Input v-model="fmData.status" placeholder=""/>
                        </FormItem>
                    </Col>

                    <Col span="12">
                        <FormItem label="介绍人卡号">
                            <Input v-model="fmData.introducer" placeholder=""/>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                        <FormItem label="消费特征">
                            <Input v-model="fmData.consumption_feature" placeholder=""/>
                        </FormItem>
                    </Col>

                    <Col span="12">
                        <FormItem label="星座">
                            <Input v-model="fmData.constellation" placeholder=""/>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                        <FormItem label="兴趣爱好">
                            <Input v-model="fmData.hobbies" placeholder=""/>
                        </FormItem>
                    </Col>

                    <Col span="12">
                        <FormItem label="社会属性">
                            <Input v-model="fmData.social_attribute" placeholder=""/>
                        </FormItem>
                    </Col>
                </Row>

                <FormItem label="备注">
                    <Input v-model="fmData.remark" placeholder=""/>
                </FormItem>


            </Form>
        </Modal>

        <Modal
                v-model="is_show_case_history_modal"
                title="查看病历"
                :loading="loading"
                width="800"
                class-name="add-edit-modal"
                :scrollable="true"
                @on-ok="save"
                @on-cancel="cancelAddHospital"
        >
            <Table border :columns="columns1" :data="data1"></Table>
        </Modal>





    </Card>
</template>

<script>
    export default {
        name: "record",
        data() {
            return {
                columns1: [
                    {
                        title: '病案号',
                        key: 'no'
                    },
                    {
                        title: '时间',
                        key: 'name'
                    },
                    {
                        title: '项目',
                        key: 'age'
                    },
                    {
                        title: '详细',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        no: 'BL001',
                        name: '2017-12-22',
                        age: '项目一，项目二，....',
                        address: '查看',
                        date: '2016-10-03'
                    },
                    {
                        no: 'BL001',
                        name: '2018-12-22',
                        age: '项目一，项目二，....',
                        address: '查看',
                        date: '2016-10-01'
                    },
                    {
                        no: 'BL001',
                        name: '2019-02-29',
                        age: '项目一，项目二，....',
                        address: '查看',
                        date: '2016-10-02'
                    }

                ],
                channelList: [
                    {
                        value: '1',
                        label: '渠道一'
                    },
                    {
                        value: '2',
                        label: '渠道二'
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
                is_show_case_history_modal: false,
                loading: true,
                fmData: {
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
                        fn: 'FN000001',
                        customer_number: '2019000001',
                        name: '张三',
                        age: '25',
                        telephone: '0286666666',
                        mobile: '17780610112',
                        birth_date: '1989-10-11',
                        wechat_id: 'wx00222',
                        address: '四川省成都市武侯区致民路48号',
                        area: '区域一',
                        profession: '教师',
                        source: '网络',
                        channel: '渠道一',
                        introducer: '2019000201',
                        consumption_feature: '高端',
                        constellation: '处女座',
                        hobbies: '音乐',
                        social_attribute: '自由',
                        remark: '备注',
                        status: '启用',
                        created_at: '2019-09-24 23:33:33',
                        updated_at: '2019-09-24 23:33:33'
                    },
                    {
                        fn: 'FN000001',
                        customer_number: '2019000001',
                        name: '张三',
                        age: '25',
                        telephone: '028-6666666',
                        mobile: '17780610112',
                        birth_date: '1989-10-11',
                        wechat_id: 'wx00222',
                        address: '四川省成都市武侯区致民路48号',
                        area: '区域一',
                        profession: '教师',
                        source: '网络',
                        channel: '渠道一',
                        introducer: '2019000201',
                        consumption_feature: '高端',
                        constellation: '处女座',
                        hobbies: '音乐',
                        social_attribute: '自由',
                        remark: '备注',
                        status: '启用',
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
                        title: '档案号',
                        key: 'fn',
                        width: 100,
                        fixed: 'left'
                    },
                    {
                        title: '客户卡号',
                        key: 'customer_number',
                        width: 120
                    },
                    {
                        title: '客户姓名',
                        key: 'name',
                        width: 100
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        width: 80
                    },
                    {
                        title: '固定电话',
                        key: 'telephone',
                        width: 120,
                    },
                    {
                        title: '手机',
                        key: 'mobile',
                        width: 120,
                    },
                    {
                        title: '出生日期',
                        key: 'birth_date',
                        width: 140,
                    },
                    {
                        title: '微信号',
                        key: 'wechat_id',
                        width: 140,
                    },
                    {
                        title: '通讯地址',
                        key: 'address',
                        width: 260,
                    },
                    {
                        title: '区域',
                        key: 'area',
                        width: 100
                    },
                    {
                        title: '职业',
                        key: 'profession',
                        width: 100
                    },
                    {
                        title: '信息来源',
                        key: 'source',
                        width: 100
                    },
                    {
                        title: '开发渠道',
                        key: 'channel',
                        width: 100
                    },
                    {
                        title: '客户状态',
                        key: 'status',
                        width: 100
                    },
                    {
                        title: '介绍人卡号',
                        key: 'introducer',
                        width: 120,
                    },
                    {
                        title: '消费特征',
                        key: 'consumption_feature',
                        width: 100
                    },
                    {
                        title: '星座',
                        key: 'constellation',
                        width: 100
                    },
                    {
                        title: '兴趣爱好',
                        key: 'hobbies',
                        width: 100
                    },
                    {
                        title: '社会属性',
                        key: 'social_attribute',
                        width: 100
                    },
                    {
                        title: '备注',
                        key: 'remark',
                        width: 100
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
                                            this.is_show_case_history_modal = true;
                                            this.fmData = params.row;
                                        }
                                    }
                                }, '查看病历'),
                                h('Poptip', {

                                    props: {
                                        confirm: true,
                                        title: '确认要删除',
                                        transfer: true,
                                    },
                                    on: {
                                        'on-ok': () => {
                                            console.info(params.index);
                                            this.tdata.splice(params.index, 1);
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
