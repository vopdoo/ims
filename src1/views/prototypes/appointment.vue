<template>
    <Card dis-hover :bordered="false" title="预约管理">

        <Row type="flex" justify="space-between" align="top">
            <Col span="20">
                <Form :model="searchForm" class="search-form" inline>
                    <FormItem>
                        <DatePicker type="daterange" split-panels placeholder="时间段" style="width: 200px"></DatePicker>
                    </FormItem>
                    <FormItem>
                        <Input v-model="searchForm.keywords"
                               class="filter-input"
                               @on-search="search()"
                               placeholder="编号/卡号/姓名/手机"
                        />
                    </FormItem>
                    <FormItem>
                        <Button icon="ios-search" type="primary" @click="search()">搜索</Button>
                    </FormItem>
                </Form>
            </Col>
            <Col span="4" class="list-tb-right">
                <Button @click="showAddModal()">添加预约</Button>
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
                title="增加预约"
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
                        <FormItem label="预约编号">
                            <Input v-model="fmData.reservation_number" placeholder=""/>
                        </FormItem>
                    </Col>

                    <Col span="12">
                        <FormItem label="部门">
                            <Select v-model="fmData.department" placeholder="选择部门" style="width:100px">
                                <Option v-for="item in departmentList" :value="item.value" :key="item.value">{{
                                    item.label }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                        <FormItem label="客户姓名">
                            <Input v-model="fmData.customer_name" placeholder=""/>
                            <!--<Select v-model="fmData.customer" placeholder="选择客户" style="width:100px">-->
                            <!--<Option v-for="item in customerList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                            <!--</Select>-->
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
                        <FormItem label="客户手机">
                            <Input v-model="fmData.mobile" placeholder=""/>
                        </FormItem>
                    </Col>

                    <Col span="12">
                        <FormItem label="预约日期">
                            <DatePicker type="datetimerange" :transfer="true" placeholder="选择时间"
                                        style="width: 260px"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <!--预约单号：登记日期：预约类型：客户卡号：预约医生：预约日期：预约时间段：-->
                <!--结束时间：微信提醒：客户手机：预约咨询：微信内容：发送时间：预约说明：-->
                <!--医生排班：职员姓名：排班：上班：下班：排班说明：预约项目：预约次数:-->
                <!--应付金额：类型：预约医生：说明：-->
                <Row>
                    <Col span="12">
                        <FormItem label="预约类型">
                            <Select v-model="fmData.type" style="width:200px">
                                <Option value="beijing">治疗预约</Option>
                                <Option value="shenzhen">会诊预约</Option>
                                <Option value="shenzhen">手术预约</Option>
                            </Select>
                        </FormItem>
                    </Col>


                    <Col span="12">
                        <FormItem label="预约医生">
                            <Select v-model="fmData.doctor" style="width:200px">
                                <Option value="beijing">张医生</Option>
                                <Option value="shenzhen">李医生</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>


                <FormItem label="预约说明">
                    <Input v-model="fmData.remark" type="textarea" placeholder=""/>
                </FormItem>


            </Form>
        </Modal>

        <Modal
                v-model="is_show_triage_modal"
                title="分诊"
                :loading="loading"
                width="800"
                class-name="add-edit-modal"
                :scrollable="true"
                @on-ok="save"
                @on-cancel="cancelAddHospital"
        >
            <Form :model="fmData" :label-width="80" ref="fm" :rules="fmRules">
                <FormItem label="咨询人员">
                    <Select v-model="fmData.consultant" :transfer="true" placeholder="选择咨询人员" style="width:100px">
                        <Option v-for="item in consultantList" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>


    </Card>
</template>

<script>
    export default {
        name: "record",
        data() {
            return {
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
                customerList: [
                    {
                        value: '1',
                        label: '客户一'
                    },
                    {
                        value: '2',
                        label: '王二'
                    },
                    {
                        value: '3',
                        label: '张三'
                    },
                    {
                        value: '4',
                        label: '李四'
                    },

                ],

                consultantList: [
                    {
                        value: '1',
                        label: '咨询一'
                    },
                    {
                        value: '2',
                        label: '咨询二'
                    },
                    {
                        value: '3',
                        label: '咨询三'
                    },
                    {
                        value: '4',
                        label: '咨询四'
                    },

                ],

                departmentList: [
                    {
                        value: '1',
                        label: '部门一'
                    },
                    {
                        value: '2',
                        label: '部门二'
                    },
                    {
                        value: '3',
                        label: '部门三'
                    },
                    {
                        value: '4',
                        label: '部门四'
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
                is_show_triage_modal: false,
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
                    consultant:'',
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
                        type: '治疗预约',
                        fn: 'G000001',
                        customer_number: '2019000001',
                        name: '张三',
                        doctor: '张医生',
                        appointment_time: '2019-02-13 14:30 - 15:30',
                        mobile: '17780610112',
                        remark: '预约说明预约说明预约说明预约说明',
                        status: '预约',
                        created_at: '2019-09-24 23:33:33',
                        updated_at: '2019-09-24 23:33:33'
                    },
                ],

                columns: [
                    {
                        type: 'selection',
                        width: 45,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: '预约类型',
                        key: 'type',
                        width: 100,
                        fixed: 'left'
                    },

                    {
                        title: '预约编号',
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
                        title: '预约时间',
                        key: 'appointment_time',
                        width: 120
                    },
                    {
                        title: '手机',
                        key: 'mobile',
                        width: 120,
                    },
                    {
                        title: '预约说明',
                        key: 'remark',
                        width: 140,
                    },
                    {
                        title: '预约医生',
                        key: 'doctor',
                        width: 140,
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 80,
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
                        width: 205,
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
                                            this.is_show_triage_modal = true;
                                            this.fmData = params.row;
                                        }
                                    }
                                }, '分诊'),
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
