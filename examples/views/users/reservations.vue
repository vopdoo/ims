<template>
    <div style="height: 100%;">
        <Row type="flex" justify="space-between" align="top">
            <Col span="20">
                <Form :model="searchForm" class="search-form" inline>
                    <FormItem>
                        <Select v-model="searchForm.type" clearable placeholder="类型" style="width:100px">
                            <Option v-for="item in typeList"
                                    :value="item.value"
                                    :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem>
                        <Select v-model="searchForm.status" clearable placeholder="状态" style="width:100px">
                            <Option v-for="item in statusList"
                                    :value="item.value"
                                    :key="item.value">
                                {{ item.label }}
                            </Option>
                        </Select>
                    </FormItem>

                    <FormItem>
                        <Input v-model="searchForm.keywords"
                               class="filter-kws"
                               search
                               @on-search="handleSearch"
                               placeholder="预约手机号"
                        />
                    </FormItem>
                </Form>
            </Col>
            <Col span="4" class="list-tlbr">
                <Button @click="handleCreate">添加预约</Button>
            </Col>
        </Row>

        <Table :columns="columns"
               :data="lists.data"
               border
               :loading="tblLoading"
        >
            <template slot-scope="{ row, index }" slot="user_name">

                <span>{{ row.user.name }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="department">
                <span v-if="row.schedules">{{ row.schedules[0].admin.departments[0].name }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="status">
                <span>{{ statusList[row.status-1].label }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="admin">

                <span v-if="row.schedules">{{ row.schedules[0].admin.name }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="schedule_at">

                <span v-if="row.schedules">{{ row.schedules[0].start_at }} - {{ row.schedules[0].end_at }}</span>
            </template>


            <template slot-scope="{ row, index }" slot="type">
                <span>{{ row.type == 1 ?'初诊':'复诊' }}</span>
            </template>


            <template slot-scope="{ row, index }" slot="action">
                <Button @click="handleEdit(row)" size="small" type="text">编辑</Button>
                <Button @click="handleDetail(row,index)" size="small" type="text">查看</Button>
                <Poptip
                        confirm
                        :transfer="true"
                        title="客户是否已经到院？"
                        @on-ok="handleArrivedHospitalOk(row)"
                >
                    <Button size="small" type="text" :disabled="row.status != 1">到院</Button>
                </Poptip>
                <Button @click="handleTriage(row)" :disabled="row.status != 2" size="small" type="text">分诊</Button>
                <Button @click="handleConsult(row)" :disabled="row.status != 3" size="small" type="text">咨询</Button>
                <Button @click="handleReVisit(row)" size="small" type="text">回访</Button>

                <Poptip
                        confirm
                        :transfer="true"
                        title="确认要删除此预约记录？"
                        @on-ok="handleDeleteUserOk(row)"
                        @on-cancel="handleDeleteUserCancel">
                    <Button size="small" type="text">删除</Button>
                </Poptip>
            </template>
            <TableDatetime slot-scope="{ row, index }" :datetime="row.created_at" slot="created_at"
                           style="width: 500px;"/>
            <TableDatetime slot-scope="{ row, index }" :datetime="row.updated_at" slot="updated_at"/>
        </Table>

        <Row type="flex" style="margin-top: 10px;">
            <Col span="8">

            </Col>
            <Col span="16" class="list-tb-right">
                <Page :total="lists.meta.total"
                      show-elevator
                      show-sizer
                      show-total
                      @on-change="handlePageChange"
                      @on-page-size-change="handlePageSizeChange"
                />
            </Col>
        </Row>


        <Modal
                v-model="hasceing"
                :title="cetitle"
                :loading="celoading"
                class-name="ce-modal"
                width="600"
                :mask-closable="false"
                :scrollable="true"
                @on-ok="handleCeOk"
                @on-cancel="handleCeCancel"
        >
            <Form :model="fmData" label-position="top" :rules="rules">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="客户" prop="user_id">
                            <Select v-model="fmData.user_id" :disabled="fmData.id >0">
                                <Option v-for="item in users.data" :value="item.id" :label="item.name" :key="item.id">
                                    <span>{{ item.name }}</span>
                                    <span style="float:right;color:#ccc">{{ item.mobile }}</span>
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="类型" prop="type">
                            <Select v-model="fmData.type" :disabled="fmData.id >0" clearable placeholder="请选择预约类型">
                                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label
                                    }}
                                </Option>
                            </Select>

                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="手机" prop="mobile">
                            <Input v-model="fmData.mobile" placeholder="请输入预约客户手机号码"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="医生排班">

                            <Select v-model="fmData.doctor_schedule_id" placeholder="选择医生排班">
                                <OptionGroup v-for="item in schedules.data"
                                             :label="item[0].admin.name +' ('+item[0].admin.departments[0].name+')'"
                                             :key="item.id">
                                    <Option v-for="line in item" :value="line.id"
                                            :label="line.admin.name + ' '+line.start_at.substring(5) +'-' + line.end_at.substring(5)"
                                            :key="line.id">
                                        <span>{{ line.start_at }} - {{ line.end_at }}</span>
                                        <!--<span style="float:right;color:#ccc">{{line.admin.name}}</span>-->
                                    </Option>
                                </OptionGroup>

                            </Select>
                        </FormItem>
                    </Col>
                </Row>

                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="治疗项目">
                            <Input v-model="fmData.project" placeholder="请输入治疗项目"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="项目报价">
                            <Input v-model="fmData.quotation" placeholder="请输入项目报价"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="心理预期">
                            <Input v-model="fmData.expectation" placeholder="请输入客户心理预期"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="返点比例">
                            <InputNumber :max="99" :min="0" v-model="fmData.deal_ratio" placeholder="返点比例"/>
                            %
                        </FormItem>
                    </Col>
                </Row>

                <FormItem label="过往治疗记录">
                    <Input type="textarea"
                           v-model="fmData.doctored_record"
                           :rows="4"
                           placeholder="备注 预约情况介绍"
                    />
                </FormItem>
                <FormItem label="就诊描述">
                    <Input type="textarea"
                           v-model="fmData.doctor_desc"
                           :rows="4"
                           placeholder="就诊描述"
                    />
                </FormItem>


                <FormItem label="备注">
                    <Input type="textarea"
                           v-model="fmData.remark"
                           :rows="4"
                           placeholder="备注 预约情况介绍"
                    />
                </FormItem>
            </Form>
        </Modal>

        <Modal
                v-model="triageing"
                title="分诊"
                :loading="celoading"
                class-name="ce-modal"
                width="600"
                :mask-closable="false"
                :scrollable="true"
                @on-ok="handleTriageOk"
                @on-cancel="handleTriageCancel"

        >
            <Form :model="triageFmdata" label-position="top" :rules="rules">
                <FormItem label="咨询师" prop="counselor_schedule_id">
                    <Select v-model="triageFmdata.counselor_schedule_id" placeholder="选择咨询师">
                        <OptionGroup v-for="item in schedules.data"
                                     :label="item[0].admin.name +' ('+item[0].admin.departments[0].name+')'"
                                     :key="item.id">
                            <Option v-for="line in item" :value="line.id"
                                    :label="line.admin.name + ' '+line.start_at.substring(5) +'-' + line.end_at.substring(5)"
                                    :key="line.id">
                                <span>{{ line.start_at }} - {{ line.end_at }}</span>
                                <!--<span style="float:right;color:#ccc">{{line.admin.name}}</span>-->
                            </Option>
                        </OptionGroup>

                    </Select>
                </FormItem>

                <FormItem label="备注">
                    <Input type="textarea"
                           v-model="triageFmdata.triage_remark"
                           :rows="4"
                           placeholder="备注"
                    />
                </FormItem>
            </Form>
        </Modal>

        <Modal
                v-model="consulting"
                title="咨询"
                :loading="consultLoading"
                class-name="ce-modal"
                width="600"
                :mask-closable="false"
                :scrollable="true"
                @on-ok="handleConsultOk('consultFm')"
                @on-cancel="handleConsultCancel('consultFm')"
        >

            <Form :model="consultFmData" ref="consultFm" label-position="top" :rules="rules">
                <FormItem label="咨询明细" prop="content">
                    <Input type="textarea"
                           v-model="consultFmData.content"
                           :rows="4"
                           placeholder="咨询明细情况"
                    />
                </FormItem>
                <FormItem label="医师">
                    <Select v-model="consultFmData.doctor_schedule_id" placeholder="选择咨询师">
                        <OptionGroup v-for="item in schedules.data"
                                     :label="item[0].admin.name +' ('+item[0].admin.departments[0].name+')'"
                                     :key="item.id">
                            <Option v-for="line in item" :value="line.id"
                                    :label="line.admin.name + ' '+line.start_at.substring(5) +'-' + line.end_at.substring(5)"
                                    :key="line.id">
                                <span>{{ line.start_at }} - {{ line.end_at }}</span>
                            </Option>
                        </OptionGroup>

                    </Select>
                </FormItem>
                <FormItem label="是否成交" required>
                    <Switch size="large"
                            v-model="consultFmData.is_deal"
                    >
                        <span slot="open">成交</span>
                        <span slot="close">否</span>
                    </Switch>
                    <!--v-model="consultFmData.is_deal" @on-change="handleIsDealChange"-->
                </FormItem>
                <div v-if="consultFmData.is_deal">
                    <FormItem label="项目" prop="items">
                        <span slot="label">项目
                            &nbsp;&nbsp;<Checkbox v-model="consultFmData.has_approve">是否需要服务价格审批</Checkbox>
                        </span>
                        <CheckboxGroup v-model="consultFmData.items"
                                       @on-change="handleItemsChange"
                        >
                            <Row :gutter="32">
                                <Col span="6">
                                    项目名称
                                </Col>
                                <Col span="6">
                                    数量
                                </Col>
                                <Col span="6">
                                    价格
                                </Col>
                                <Col span="6">
                                    折扣
                                </Col>
                            </Row>
                            <!--{{serviceItems}}-->
                            <Row :gutter="32" v-for="(item,index) in items.data" :key="index">
                                <Col span="6">
                                    <!--@on-change="handleItemChange"-->
                                    <Checkbox :label="item.id"
                                    >
                                        {{item.name}}
                                    </Checkbox>
                                </Col>
                                <Col span="6">
                                    <InputNumber :max="10" v-model="serviceItems[index].num" :min="1"/>
                                </Col>
                                <Col span="6">
                                    <InputNumber
                                            style="width: 120px;"
                                            :max="10000"
                                            v-model="serviceItems[index].price"
                                            :formatter="value => `￥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
                                            :parser="value => value.replace(/$s?|(,*)/g, '')"
                                    />
                                </Col>
                                <Col span="6">
                                    <InputNumber
                                            :max="100"
                                            v-model="serviceItems[index].discount"
                                            :formatter="value => `${value}%`"
                                            :parser="value => value.replace('%', '')"
                                    />
                                </Col>
                            </Row>
                        </CheckboxGroup>
                    </FormItem>
                </div>

            </Form>

        </Modal>

        <Modal
                v-model="revisiting"
                title="回访"
                :loading="celoading"
                class-name="ce-modal"
                width="600"
                :mask-closable="false"
                :scrollable="true"
                @on-ok="handleRevisitOk('revisitFm')"
                @on-cancel="handleRevisitCancel('revisitFm')"

        >
            <Form :model="revisitFmData" ref="revisitFm" label-position="top" :rules="rules">
                <FormItem label="回访类型" prop="type">
                    <RadioGroup v-model="revisitFmData.type">
                        <Radio label="1">术后回访</Radio>
                        <Radio label="2">服务回访</Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem label="回访计划" prop="next_at">
                    <DatePicker v-model="revisitFmData.next_at" @on-change="handleNextAatChange" type="datetime"
                                placeholder="请选择下次回访时间"/>
                </FormItem>

                <FormItem label="回访情况" prop="content">
                    <Input type="textarea"
                           v-model="revisitFmData.content"
                           :rows="4"
                           placeholder="回访明细情况"
                    />
                </FormItem>


            </Form>
        </Modal>

        <Drawer
                width="640"
                v-model="detailing"
                title="预约明细"
                @on-close="handleDetailClose"
        >
            <p :style="pStyle">基本信息</p>
            <div class="demo-drawer-profile">
                <Form :model="fmData" label-position="top" :rules="rules">
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem label="客户" prop="user_id">
                                <Select v-model="fmData.user_id" disabled>
                                    <Option v-for="item in users.data" :value="item.id" :label="item.name"
                                            :key="item.id">
                                        <span>{{ item.name }}</span>
                                        <span style="float:right;color:#ccc">{{ item.mobile }}</span>
                                    </Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="类型" prop="type">
                                <Select v-model="fmData.type" disabled clearable placeholder="请选择预约类型">
                                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label
                                        }}
                                    </Option>
                                </Select>

                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem label="手机" prop="mobile">
                                <Input v-model="fmData.mobile" disabled placeholder="请输入预约客户手机号码"/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="医生排班">

                                <Select v-model="fmData.doctor_schedule_id" disabled placeholder="选择医生排班">
                                    <OptionGroup v-for="item in schedules.data"
                                                 :label="item[0].admin.name +' ('+item[0].admin.departments[0].name+')'"
                                                 :key="item.id">
                                        <Option v-for="line in item" :value="line.id"
                                                :label="line.admin.name + ' '+line.start_at.substring(5) +'-' + line.end_at.substring(5)"
                                                :key="line.id">
                                            <span>{{ line.start_at }} - {{ line.end_at }}</span>
                                            <!--<span style="float:right;color:#ccc">{{line.admin.name}}</span>-->
                                        </Option>
                                    </OptionGroup>

                                </Select>
                            </FormItem>
                        </Col>
                    </Row>

                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem label="治疗项目">
                                <Input v-model="fmData.project" disabled placeholder="请输入治疗项目"/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="项目报价">
                                <Input v-model="fmData.quotation" disabled placeholder="请输入项目报价"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="12">
                            <FormItem label="心理预期">
                                <Input v-model="fmData.expectation" disabled placeholder="请输入客户心理预期"/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="返点比例">
                                <InputNumber :max="99" :min="0"
                                             disabled
                                             v-model="fmData.deal_ratio"
                                             placeholder="返点比例"
                                />
                                %
                            </FormItem>
                        </Col>
                    </Row>

                    <FormItem label="过往治疗记录">
                        <Input type="textarea"
                               v-model="fmData.doctored_record"
                               :rows="4"
                               disabled
                               placeholder="备注 预约情况介绍"
                        />
                    </FormItem>
                    <FormItem label="就诊描述">
                        <Input type="textarea"
                               v-model="fmData.doctor_desc"
                               :rows="4"
                               disabled
                               placeholder="就诊描述"
                        />
                    </FormItem>


                    <FormItem label="备注">
                        <Input type="textarea"
                               v-model="fmData.remark"
                               :rows="4"
                               disabled
                               placeholder="备注 预约情况介绍"
                        />
                    </FormItem>
                </Form>

            </div>
            <Divider/>
            <p :style="pStyle">最近咨询</p>
            <div class="demo-drawer-profile">
                <Table :columns="consultsColumns" :data="fmData.consults">
                    <template slot-scope="{ row, index }" slot="is_deal">
                        {{ row.is_deal ?'成交':'否' }}
                    </template>
                </Table>
            </div>
            <Divider/>
            <p :style="pStyle">最近回访</p>
            <div class="demo-drawer-profile">
                <Table :columns="revisitColumns" :data="fmData.revisits">
                    <template slot-scope="{ row, index }" slot="type">
                        {{ row.type == 1 ?'术后回访':'服务回访' }}
                    </template>
                </Table>
            </div>
        </Drawer>

    </div>

</template>
<script>
    import {mapGetters} from 'vuex'

    import dateUtil from 'iview/src/utils/date'

    import _ from 'lodash'

    // console.info(collections);


    import TableDatetime from '@/components/table-datetime/index';
    import Departments from "../systems/departments";

    export default {
        name: 'UserLists',
        components: {
            Departments,
            TableDatetime,
        },
        async created() {
            await this.$store.dispatch('reservations/lists');
            await this.$store.dispatch('system/changeSpining', {spining: false});
        },
        computed: {
            ...mapGetters({
                users: 'users/lists',
                items: 'items/lists',
                schedules: 'schedules/lists',
                lists: 'reservations/lists',
                statusList: 'reservations/statusList',
                columns: 'reservations/columns',
            })
        },
        data() {
            const validateCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('值不能为空'));
                }
                let validateFieldRequest = {
                    type: rule.field,
                    value: value,
                    id: this.menuFm.id
                };
                this.$store.dispatch('validateCode', validateFieldRequest).then(result => {
                    if (result) {
                        callback(new Error('已经存在了，请重新输入！'));
                    } else {
                        callback();
                    }
                });
            };
            return {
                // user_id,type,mobile,schedule_id,project,quotation,expectation,deal_ratio,doctored_record,doctor_desc,remark
                pStyle: {
                    fontSize: '16px',
                    color: 'rgba(0,0,0,0.85)',
                    lineHeight: '24px',
                    display: 'block',
                    marginBottom: '16px'
                },
                consultsColumns: [
                    {
                        title: '内容',
                        key: 'content'
                    },
                    {
                        title: '是否成交',
                        slot: 'is_deal'
                    },
                    {
                        title: '咨询时间',
                        key: 'created_at'
                    }
                ],

                revisitColumns: [
                    {
                        title: '回访内容',
                        key: 'content'
                    },
                    {
                        title: '类型',
                        slot: 'type'
                    },
                    {
                        title: '下次回访时间',
                        key: 'next_at'
                    },
                    {
                        title: '回访时间',
                        key: 'created_at'
                    }
                ],
                fmData: {
                    user_id: '',
                    type: '',
                    mobile: '',
                    doctor_schedule_id: '',
                    project: '',
                    quotation: '',
                    expectation: '',
                    deal_ratio: 0,
                    doctored_record: '',
                    doctor_desc: '',
                    remark: '',

                },

                triageFmdata: {
                    id: '',
                    counselor_schedule_id: '',
                    triage_remark: '',
                },
                consultFmData: {
                    reservation_id: '',
                    doctor_schedule_id: '',
                    is_deal: false,
                    content: '',
                    items: [],
                    has_approve: false,
                },
                revisitFmData: {
                    reservation_id: '',
                    type: '',
                    content: '',
                    next_at: '',
                },
                rules: {
                    next_at: [
                        {required: true, message: '下次回访时间', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请选择回访类型', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '明细不能为空', trigger: 'blur'}
                    ],
                    user_id: [
                        {required: true, message: '请选择客户', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入客户姓名', trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '邮箱必须填写', trigger: 'blur'},
                        {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请选择预约类型', trigger: 'change'}
                    ],
                    counselor_schedule_id: [
                        {required: true, message: '请选择咨询师排班', trigger: 'change'}
                    ],
                    items: [
                        {
                            required: true,
                            type: 'array',
                            min: 1,
                            message: '请至少选择一项服务项目',
                            trigger: 'change'
                        },
                        {type: 'array', max: 4, message: '最多选择 20 服务项目', trigger: 'change'}
                    ],
                    birthday: [
                        {required: true, type: 'date', message: '请选择出生日期', trigger: 'change'}
                    ],
                },
                hasceing: false,
                detailing: false,
                triageing: false,
                revisiting: false,
                consulting: false,
                consultLoading: true,
                cetitle: '添加预约',
                celoading: true,
                tblLoading: false,
                detailData: {},
                serviceItems: [],
                typeList: [
                    {
                        value: '1',
                        label: '初诊'
                    },
                    {
                        value: '2',
                        label: '复诊'
                    },

                ],

                searchForm: {
                    dept_ids: [],
                    role_ids: [],
                    keywords: '',
                    gender: '',
                    status: '',
                    page: 1,
                    per_page: 10,
                },
                editIndex: -1,  // 当前聚焦的输入框的行数
                editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editAge: '',  // 第二列输入框
                editBirthday: '',  // 第三列输入框
                editAddress: '',  // 第四列输入框
            }
        },
        methods: {
            handleItemChange() {
                console.info('handleItemChange')

            },
            handleItemsChange(values) {
                console.info('handleItemsChange')
                console.info(values)
                let tmps = _.find(this.serviceItems, function (o) {
                    return _.indexOf(values, o.id) >= 0;
                })
                console.info(tmps);
                // collections
            },
            handleNextAatChange(value, type) {
                console.info(value);
                this.revisitFmData.next_at = value;
            },
            handleRevisitOk(ref) {
                this.$refs[ref].validate(async (valid) => {
                    if (valid) {
                        console.info(this.revisitFmData);
                        this.tblLoading = true;
                        await this.$store.dispatch('reservations/revisit', this.revisitFmData);
                        // await this.$Message.success('增加咨询成功!');
                        this.revisiting = false;
                        this.tblLoading = false;
                    } else {
                        this.celoading = false;
                        let that = this;
                        setTimeout(() => {
                            that.celoading = true;
                        }, 10);
                    }
                })
            },
            handleDetailClose() {
                this.initFmData();
            },
            handleRevisitCancel(ref) {
                this.initRevisitFmData();
                this.$refs[ref].resetFields();
                this.revisiting = false;
            },
            handleConsultOk(ref) {
                this.$refs[ref].validate(async (valid) => {
                    if (valid) {
                        let that = this;
                        let items = [];
                        if(this.consultFmData.is_deal) {
                            this.serviceItems.forEach((item) => {
                                if(_.includes(that.consultFmData.items, item.id)) {
                                    items.push(item);
                                }
                            });
                        }
                        this.consultFmData.items = items;
                        this.tblLoading = true;
                        await this.$store.dispatch('reservations/consult', this.consultFmData);
                        this.consulting = false;
                        this.tblLoading = false;
                        this.initConsultFmData();

                    } else {
                        this.consultLoading = false;
                        let that = this;
                        setTimeout(() => {
                            that.consultLoading = true;
                        }, 10);
                    }
                })
            },
            handleConsultCancel(ref) {
                this.initConsultFmData();
                this.$refs[ref].resetFields();

                this.consulting = false;
            },
            handleIsDealChange(v) {
                this.consultFmData.is_deal = v;
            },
            async handleTriageOk() {
                this.tblLoading = true;

                let data = this.triageFmdata;
                data.filter = this.searchForm;
                await this.$store.dispatch('reservations/edit', data);
                this.tblLoading = false;

            },
            handleTriageCancel() {

            },
            async handleTriage(row) {
                this.$Loading.start();
                this.triageFmdata.id = row.id;
                await this.$store.dispatch('schedules/lists', {is_group: 1, type: 2});
                this.$Loading.finish();
                this.triageing = true;
            },
            async handleConsult(row) {
                this.$Loading.start();
                let doctor_schedule_id = '';
                // await this.$store.dispatch('users/lists', {});
                if (row.schedules.length) {
                    let index = row.schedules.findIndex((item) => {
                        return item.type == 1;
                    })
                    doctor_schedule_id = row.schedules[index].id;
                } else {
                    doctor_schedule_id = '';
                }
                this.consultFmData.doctor_schedule_id = doctor_schedule_id;
                this.consultFmData.reservation_id = row.id;
                await this.$store.dispatch('schedules/lists', {is_group: 1, type: 1, schedule_id: doctor_schedule_id});
                await this.$store.dispatch('items/lists');
                let serviceItems = [];
                this.items.data.forEach((item, index) => {
                    console.info(item, index);
                    serviceItems.push({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        discount: item.discount,
                        num: 1,
                    })
                })
                this.serviceItems = serviceItems;
                this.$Loading.finish();
                this.consulting = true;

            },
            handleReVisit(row) {
                this.revisitFmData.reservation_id = row.id;
                this.revisiting = true;
            },
            async handleArrivedHospitalOk(row) {
                this.tblLoading = true;
                let action = 'reservations/edit';

                let data = {id: row.id, status: 2};
                data.filter = this.searchForm;
                await this.$store.dispatch(action, data);
                this.tblLoading = false;
            },
            handleBirthdayChange(date, type) {
                // console.info(date,type);
                this.fmData.birthday = date;
            },

            handleDeleteUserOk(data) {
                console.info('handleDeleteUserOk', data);
                this.$store.dispatch('reservations/delete', data);
            },
            handleDeleteUserCancel() {
                console.info('handleDeleteUserCancel');
            },
            initConsultFmData() {
                this.consultFmData = {
                    reservation_id: '',
                    doctor_schedule_id: '',
                    is_deal: false,
                    content: '',
                    items: [],
                    has_approve: false,
                }
            },
            initRevisitFmData() {
                this.revisitFmData = {
                    reservation_id: '',
                    type: '',
                    content: '',
                    next_at: '',
                }
            },
            initFmData() {
                this.fmData = {
                    user_id: '',
                    type: '',
                    mobile: '',
                    doctor_schedule_id: '',
                    project: '',
                    quotation: '',
                    expectation: '',
                    deal_ratio: 0,
                    doctored_record: '',
                    doctor_desc: '',
                    remark: '',
                };

            },

            async handleCeOk() {
                this.celoading = true;
                this.tblLoading = true;
                let action = this.fmData.id ? 'reservations/edit' : 'reservations/create';
                if (typeof(this.fmData.birthday) == 'object') {
                    this.fmData.birthday = dateUtil.format(this.fmData.birthday, 'yyyy-MM-dd HH:mm:ss');
                }
                let data = this.fmData;
                console.info(data);
                data.filter = this.searchForm;
                await this.$store.dispatch(action, data);
                this.celoading = false;
                this.tblLoading = false;
                // this.hasceing = true;
            },
            handleCeCancel() {
                console.info('handleCeCancel');
                this.initFmData();
            },
            async handleCreate() {
                this.$Loading.start();
                await this.$store.dispatch('users/lists', {});
                await this.$store.dispatch('schedules/lists', {is_group: 1, type: 1});
                this.$Loading.finish();

                this.hasceing = !this.hasceing;
            },
            async handlePageChange(page) {
                this.tblLoading = true;
                this.searchForm.page = page;
                await this.$store.dispatch('reservations/lists', this.searchForm);
                this.tblLoading = false;
            },
            async handleSearch() {
                this.tblLoading = true;
                await this.$store.dispatch('reservations/lists', this.searchForm);
                this.tblLoading = false;
            },
            handlePageSizeChange(size) {
                console.info('handlePageSizeChange', size);
            },
            handleSwitchStatusOk(row) {
                row.status = !row.status;
                console.info('handleSwitchStatusOk', row);
            },
            handleSwitchStatusCancel() {
                console.info('handleSwitchStatusCancel');
            },
            handleStatusChange(status) {
                console.info('handleStatusChange', status);
            },
            async handleDetail(row) {
                this.$Loading.start();
                await this.$store.dispatch('users/lists', {});
                let doctor_schedule_id = '';
                if (row.schedules.length) {
                    let index = row.schedules.findIndex((item) => {
                        return item.type == 1;
                    })
                    doctor_schedule_id = row.schedules[index].id;
                } else {
                    doctor_schedule_id = '';
                }
                await this.$store.dispatch('schedules/lists', {is_group: 1, type: 1, schedule_id: doctor_schedule_id});
                this.$Loading.finish();
                this.fmData = row;
                this.fmData.type = row.type.toString();
                this.fmData.doctor_schedule_id = doctor_schedule_id;
                this.detailing = true;
            },
            async handleEdit(row, index) {
                this.$Loading.start();
                let doctor_schedule_id = '';
                // await this.$store.dispatch('users/lists', {});
                if (row.schedules.length) {
                    let index = row.schedules.findIndex((item) => {
                        return item.type == 1;
                    })
                    doctor_schedule_id = row.schedules[index].id;
                } else {
                    doctor_schedule_id = '';
                }
                await this.$store.dispatch('schedules/lists', {is_group: 1, type: 1, schedule_id: doctor_schedule_id});
                this.$Loading.finish();


                this.fmData = row;
                this.fmData.type = row.type.toString();
                this.fmData.doctor_schedule_id = doctor_schedule_id;
                this.hasceing = !this.hasceing;
            },

        }
    }
</script>


<style lang="less">
    .list-tlbr {
        float: right;
        text-align: right;
    }

    .demo-split {
        height: 100%;

    }

    .demo-split-left-pane {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .demo-split-right-pane {
        padding-left: 16px;
    }

</style>
