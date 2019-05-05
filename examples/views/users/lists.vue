<template>
    <div style="height: 100%;">
        <Row type="flex" justify="space-between" align="top">
            <Col span="20">
                <Form :model="searchForm" class="search-form" inline>
                    <FormItem>
                        <Select v-model="searchForm.gender" clearable placeholder="性别" style="width:100px">
                            <Option v-for="item in genderList"
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
                               placeholder="姓名/昵称/姓名/邮箱/编号/手机号/微信号"
                        />
                    </FormItem>
                </Form>
            </Col>
            <Col span="4" class="list-tlbr">
                <Button @click="handleCreate">添加</Button>
            </Col>
        </Row>

        <Table :columns="columns"
               :data="lists.data"
               border
               :loading="tblLoading"
        >
            <template slot-scope="{ row, index }" slot="name">
                <Input type="text" v-model="editName" v-if="editIndex === index"/>
                <span v-else>{{ row.name }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="gender">
                <span >{{ row.gender == 0 ?'女':'男' }}</span>
            </template>



            <template slot-scope="{ row, index }" slot="departments">
                            <span v-if="row.departments.length">
                                <span v-for="(item,index) in row.departments" :key="index">{{item.name}},</span>
                            </span>
                <span v-else>-</span>
            </template>


            <template slot-scope="{ row, index }" slot="nick_name">
                <Input type="text" v-model="editAge" v-if="editIndex === index"/>
                <span v-else>{{ row.nick_name }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="email">
                <Input type="text" v-model="editBirthday" v-if="editIndex === index"/>
                <span v-else>{{row.email }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="status">
                <!--<Poptip-->
                <!--confirm-->
                <!--:transfer="true"-->
                <!--title="确认要禁用此用户？"-->
                <!--@on-ok="handleSwitchStatusOk(row)"-->
                <!--@on-cancel="handleSwitchStatusCancel">-->

                <!--</Poptip>-->

                <Switch size="large" v-model="row.status">
                    <span slot="open">启用</span>
                    <span slot="close">禁用</span>
                </Switch>

            </template>

            <template slot-scope="{ row, index }" slot="action">
                <Button @click="handleEdit(row, index)" size="small" type="text">编辑</Button>
                <Tooltip
                        :content="`已有 ${row.reservations.length} 条预约记录，请到预约管理查看`"
                        :transfer="true"
                        :disabled="!row.reservations.length"
                >
                    <!--@click="handleShowReservations(row, index)"-->
                    <Button  size="small"  :disabled="!row.reservations.length" type="text">预约记录</Button>
                </Tooltip>

                <Button @click="handleShowEmr(row, index)" size="small" disabled type="text">电子病历</Button>
                <Poptip
                        confirm
                        :transfer="true"
                        title="确认要删除此用户？"
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
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="客户姓名" prop="name">
                            <Input v-model="fmData.name" placeholder="请输入客户姓名"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="昵称">
                            <Input v-model="fmData.nick_name" placeholder="请输入昵称"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="手机" prop="mobile">
                            <Input v-model="fmData.mobile" placeholder="请输入客户手机号码"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="微信号">
                            <Input v-model="fmData.wechat_id" placeholder="请输入客户微信号"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="性别" prop="gender">
                            <Select v-model="fmData.gender"  placeholder="请选择性别" >
                                <Option v-for="item in genderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="职业">
                            <Input v-model="fmData.occupation" placeholder="请输入客户职业"/>
                        </FormItem>
                    </Col>
                </Row>

                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="年龄" prop="age">
                            <InputNumber :max="99" :min="1" v-model="fmData.age" placeholder="年龄"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="出生日期" >
                            <DatePicker type="date"
                                        v-model="fmData.birthday"
                                        @on-change="handleBirthdayChange"
                                        placeholder="请选择出生日期"
                            />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="通讯地址">
                            <Input v-model="fmData.address" placeholder="请输入通讯地址"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="邮箱" prop="email">
                            <Input v-model="fmData.email" placeholder="邮箱"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="兴趣爱好">
                            <Input v-model="fmData.hobbies" placeholder="兴趣爱好"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="消费特征">
                            <Input v-model="fmData.consumption_feature" placeholder="消费特征"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="社会属性">
                            <Input v-model="fmData.social_attribute" placeholder="社会属性"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="开发方式">
                            <Input v-model="fmData.development_mode" placeholder="开发方式"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="渠道">
                            <Input v-model="fmData.channel_id" disabled placeholder="请选择渠道"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="咨询项目">
                            <Input v-model="fmData.consulting_project" placeholder="咨询项目"/>
                        </FormItem>
                    </Col>
                </Row>

                <FormItem label="备注">
                    <Input type="textarea" v-model="fmData.remark" :rows="4"
                           placeholder="备注"/>
                </FormItem>
            </Form>
        </Modal>

    </div>

</template>
<script>
    import {mapGetters} from 'vuex'
    // import store from '@/store/index';
    import dateUtil from 'iview/src/utils/date'

    import TableDatetime from '@/components/table-datetime/index';

    export default {
        name: 'UserLists',
        components: {
            TableDatetime,
        },
        async created() {
            await this.$store.dispatch('users/lists');
            await this.$store.dispatch('system/changeSpining', {spining: false});
        },
        computed: {
            ...mapGetters({
                lists: 'users/lists',
                statusList: 'users/statusList',
                columns: 'users/columns',
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
                // serial_number,name,nick_name,mobile,wechat_id,age,birthday,address,email,hobbies,consumption_feature,social_attribute
                // development_mode,channel_id,consulting_project
                fmData: {
                    name: '',
                    nick_name: '',
                    mobile: '',
                    wechat_id: '',
                    age: 1,
                    gender: '',
                    occupation: '',
                    birthday: '',
                    address: '',
                    email: '',
                    hobbies: '',
                    consumption_feature: '',
                    social_attribute: '',
                    development_mode: '',
                    channel_id: 0,
                    consulting_project: '',
                    sort: 0,
                    status: true,
                    remark: '',
                },

                rules: {
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
                    gender: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    interest: [
                        {
                            required: true,
                            type: 'array',
                            min: 1,
                            message: 'Choose at least one hobby',
                            trigger: 'change'
                        },
                        {type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change'}
                    ],
                    birthday: [
                        {required: true, type: 'date', message: '请选择出生日期', trigger: 'change'}
                    ],
                },
                hasceing: false,
                show_emr_ing:false,
                show_reservations_ing:false,
                cetitle: '增加用户',
                celoading: false,
                tblLoading: false,
                genderList: [
                    {
                        value: '0',
                        label: '女'
                    },
                    {
                        value: '1',
                        label: '男'
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
            handleShowReservations(){

                this.show_reservations_ing = true;
            },
            handleShowEmr() {
                this.show_emr_ing = true;
            },
            handleBirthdayChange(date,type){
                // console.info(date,type);
                this.fmData.birthday = date;
            },

            handleDeleteUserOk(data) {
                console.info('handleDeleteUserOk', data);
                this.$store.dispatch('users/delete', data);
            },
            handleDeleteUserCancel() {
                console.info('handleDeleteUserCancel');
            },
            initFmData() {
                this.fmData =
                    {

                        name: '',
                        nick_name: '',
                        mobile: '',
                        wechat_id: '',
                        age: 1,
                        gender: '',
                        occupation: '',
                        birthday: '',
                        address: '',
                        email: '',
                        hobbies: '',
                        consumption_feature: '',
                        social_attribute: '',
                        development_mode: '',
                        channel_id: 0,
                        consulting_project: '',
                        sort: 0,
                        status: true,
                        remark: '',
                    };
            },
            handleTogglePassword() {
                if (this.passwordInputType == 'password') {
                    this.passwordInputType = 'text';
                    this.passwordInputSuffixIcon = 'md-eye-off';
                } else {
                    this.passwordInputType = 'password';
                    this.passwordInputSuffixIcon = 'md-eye';
                }
            },
            async handleCeOk() {
                this.celoading = true;
                this.tblLoading = true;
                let action = this.fmData.id ? 'users/edit' : 'users/create';
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

                this.hasceing = !this.hasceing;
            },
            async handlePageChange(page) {
                this.tblLoading = true;
                this.searchForm.page = page;
                await this.$store.dispatch('users/lists', this.searchForm);
                this.tblLoading = false;
            },
            async handleSearch() {
                this.tblLoading = true;
                await this.$store.dispatch('users/lists', this.searchForm);
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
            async handleEdit(row, index) {

                this.fmData = row;
                this.fmData.gender  = row.gender.toString();
                console.info(row);
                console.info(this.fmData.gender)


                this.hasceing = true;
            },
            handleSave(index) {
                this.data[index].name = this.editName;
                this.data[index].age = this.editAge;
                this.data[index].birthday = this.editBirthday;
                this.data[index].address = this.editAddress;
                this.editIndex = -1;
            },
            getBirthday(birthday) {
                const date = new Date(parseInt(birthday));
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                return `${year}-${month}-${day}`;
            }
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
