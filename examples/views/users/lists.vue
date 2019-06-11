<template>
    <div style="height: 100%;">
        <Row type="flex" justify="space-between" align="top">
            <Col span="20">
                <Form :model="searchForm" class="search-form" inline>
                    <FormItem>
                        <Select v-model="searchForm.hospital_id" clearable placeholder="医院" style="width:100px">
                            <Option v-for="item in hospitals.data" :value="item.id" :key="item.id">{{ item.name
                                }}
                            </Option>
                        </Select>
                    </FormItem>
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
                <Avatar size="small" :src="row.avatar"/>
                <span style="margin-left: 5px;">{{row.name}}</span>
            </template>

            <template slot-scope="{ row, index }" slot="gender">
                <span>{{ row.gender == 0 ?'女':'男' }}</span>
            </template>


            <template slot-scope="{ row, index }" slot="departments">
                            <span v-if="row.departments.length">
                                <span v-for="(item,index) in row.departments" :key="index">{{item.name}},</span>
                            </span>
                <span v-else>-</span>
            </template>
            <template slot-scope="{ row, index }" slot="nick_name">
                <span>{{ row.nick_name }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="email">

                <span>{{row.email }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="status">
                <Switch size="large" v-model="row.status">
                    <span slot="open">启用</span>
                    <span slot="close">禁用</span>
                </Switch>

            </template>

            <template slot-scope="{ row, index }" slot="action">
                <Button @click="handleEdit(row, index)" size="small" type="text">编辑</Button>
                <Button size="small" type="text" @click="handleCreateReservation(row)">预约</Button>
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
                            <Input v-model="fmData.name" placeholder="请输入客户姓名">
                            <Select v-model="fmData.hospital_id"
                                    slot="prepend"
                                    placeholder="医院"
                                    style="width: 80px;"
                            >
                                <Option :value="item.id" v-for="(item) in hospitals.data" :key="item.id">
                                    {{item.name}}
                                </Option>
                            </Select>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="头像">
                            <Upload
                                    :action="uploadAction"
                                    accept="image/jpeg, image/png"
                                    :max-size="1024"
                                    :on-success="handleAvatarUploadSuccess"
                                    :data="{is_batch:false,model:'user'}"
                                    :show-upload-list="false"
                            >
                                <Avatar :src="fmData.avatar"/>
                            </Upload>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="手机" prop="mobile">
                            <Input v-model="fmData.mobile" :maxlength="11" placeholder="请输入客户手机号码"/>
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
                            <Select v-model="fmData.gender" placeholder="请选择性别">
                                <Option v-for="item in genderList" :value="item.value" :key="item.value">{{ item.label
                                    }}
                                </Option>
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
                        <FormItem label="出生日期">
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
                        <FormItem label="昵称">
                            <Input v-model="fmData.nick_name" placeholder="请输入昵称"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="需求标签">
                            <Input v-model="fmData.tags" placeholder="需求标签"/>
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

                <FormItem label="相册">
                    <div class="demo-upload-list" v-for="item in fmData.uploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload
                            ref="upload"
                            :show-upload-list="false"
                            :default-file-list="fmData.defaultList"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            accept="image/jpeg, image/png"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple
                            type="drag"
                            :action="uploadAction"
                            style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>

                </FormItem>
            </Form>
        </Modal>

        <Modal
                v-model="visible"
                footer-hide
        >
            <img :src="imgName" v-if="visible" style="width: 100%">
        </Modal>
        <Modal
                v-model="reservationing"
                title="添加预约"
                :loading="celoading"
                class-name="ce-modal"
                width="600"
                :mask-closable="false"
                :scrollable="true"
                @on-ok="handleCeReservationOk"
                @on-cancel="handleCeReservationCancel"

        >
            <Form :model="reservationFmData" label-position="top" :rules="rules">

                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="类型" prop="type">
                            <Select v-model="reservationFmData.type" :disabled="fmData.id >0" clearable
                                    placeholder="请选择预约类型">
                                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label
                                    }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="医院" prop="hospital_id">
                            <Select v-model="reservationFmData.hospital_id"
                                    clearable
                                    placeholder="请选择医院"
                                    @on-change="handleHospitalChange"
                            >
                                <Option v-for="(item,index) in hospitals.data" :value="item.id" :key="index">
                                    {{ item.name}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>

                <FormItem label="医生排班">

                    <Select v-model="reservationFmData.doctor_schedule_id" placeholder="选择医生排班">
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

                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="治疗项目">
                            <Input v-model="reservationFmData.project" placeholder="请输入治疗项目"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="项目报价">
                            <Input v-model="reservationFmData.quotation" placeholder="请输入项目报价"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="心理预期">
                            <Input v-model="reservationFmData.expectation" placeholder="请输入客户心理预期"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="返点比例">
                            <InputNumber :max="99" :min="0" v-model="reservationFmData.deal_ratio" placeholder="返点比例"/>
                            %
                        </FormItem>
                    </Col>
                </Row>

                <FormItem label="过往治疗记录">
                    <Input type="textarea"
                           v-model="reservationFmData.doctored_record"
                           :rows="4"
                           placeholder="备注 预约情况介绍"
                    />
                </FormItem>
                <FormItem label="就诊描述">
                    <Input type="textarea"
                           v-model="reservationFmData.doctor_desc"
                           :rows="4"
                           placeholder="就诊描述"
                    />
                </FormItem>
                <FormItem label="备注">
                    <Input type="textarea"
                           v-model="reservationFmData.remark"
                           :rows="4"
                           placeholder="备注 预约情况介绍"
                    />
                </FormItem>
            </Form>
        </Modal>

        <span v-if="tmpchange"></span>

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
            await this.$store.dispatch('hospitals/lists', {status: 1, per_page: 1000});
            await this.$store.dispatch('users/lists');
            await this.$store.dispatch('system/changeSpining', {spining: false});
        },
        computed: {
            ...mapGetters({
                lists: 'users/lists',
                statusList: 'users/statusList',
                schedules: 'schedules/lists',
                hospitals: 'hospitals/lists',
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
                tmpchange:false,

                uploadAction: process.env.VUE_APP_API_BASE_URL + 'files',

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
                imgName: '',
                visible: false,
                reservationFmData: {
                    user_id: '',
                    type: '',
                    mobile: '',
                    doctor_schedule_id: '',
                    hospital_id: '',
                    project: '',
                    quotation: '',
                    expectation: '',
                    deal_ratio: 0,
                    doctored_record: '',
                    doctor_desc: '',
                    remark: '',

                },
                fmData: {
                    hospital_id: 1,
                    uploadList: [],
                    defaultList: [],
                    avatar: '',
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
                    tags: '',
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
                reservationing: false,
                show_emr_ing: false,
                show_reservations_ing: false,
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
                    hospital_id: '',
                    dept_ids: [],
                    role_ids: [],
                    keywords: '',
                    gender: '',
                    status: '',
                    page: 1,
                    per_page: 10,
                },
            }
        },
        methods: {

            handleHospitalChange(value) {
                this.$store.dispatch('schedules/lists', {is_group: 1, type: 1, status: 1, hospital_id: value});
            },

            async handleCeReservationOk() {
                this.celoading = true;
                this.tblLoading = true;
                let action = 'reservations/create';
                let data = this.reservationFmData;
                data.filter = {};
                console.info(data);
                await this.$store.dispatch(action, data);
                this.celoading = false;
                this.tblLoading = false;
                // this.hasceing = true;
            },
            handleCeReservationCancel() {
                console.info('handleCeReservationCancel');
                this.initReservationFmData();
            },
            initReservationFmData() {
                this.reservationFmData = {
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
            async handleCreateReservation(row) {
                this.$Loading.start();
                await this.$store.dispatch('users/lists', {});

                this.$Loading.finish();
                this.reservationFmData.user_id = row.id;
                this.reservationFmData.hospital_id = row.hospital_id;
                this.reservationFmData.mobile = row.mobile;
                await this.$store.dispatch('schedules/lists', {is_group: 1, type: 1,status:1,hospital_id:row.hospital_id});
                this.reservationing = !this.reservationing;
            },
            handleView(name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove(file) {
                console.info(file);
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                this.tmpchange = !this.tmpchange;
                // this.handleView(file.name,false);
                // console.info(this.$refs.upload.fileList);
                // let tmp =  JSON.parse(JSON.stringify(this.$refs.upload.fileList));
                //
                // this.fmData.uploadList = [];
                // tmp.forEach((item,index)=>{
                //     this.$set(this.fmData.uploadList, index, item);
                //     // this.fmData.uploadList.push(item);
                // });
                //
                // console.info(this.fmData.uploadList);
            },
            handleSuccess(res, file) {
                file.url = res.data.uri;
                file.name = res.data.uri;
                this.tmpchange = !this.tmpchange;
            },
            handleBeforeUpload() {
                this.fmData.uploadList = this.$refs.upload.fileList;
            },
            handleFormatError(file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleAvatarUploadSuccess(response) {
                this.fmData.avatar = response.data.uri;
            },
            handleShowReservations() {
                this.show_reservations_ing = true;
            },
            handleShowEmr() {
                this.show_emr_ing = true;
            },
            handleBirthdayChange(date, type) {
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
                this.fmData = {
                    hospital_id: 1,
                    uploadList: [],
                    defaultList: [],
                    avatar: '',
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
                    tags: '',
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
                this.fmData.uploadList = this.$refs.upload.fileList;
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
            async handleEdit(row) {
                const editRow = row;
                this.fmData = editRow;
                this.fmData.gender = editRow.gender.toString();

                this.fmData.defaultList = [];
                if (editRow.albums.length) {
                    editRow.albums.forEach((item, index) => {
                        this.fmData.defaultList.push({url: item.uri, name: item.uri});
                    })
                }
                await setTimeout(() => {
                    this.fmData.uploadList = this.$refs.upload.fileList;
                    console.info(this.fmData.uploadList);
                    this.hasceing = true;

                }, 20)
            },
            handleSave(index) {
                this.data[index].name = this.editName;
                this.data[index].age = this.editAge;
                this.data[index].birthday = this.editBirthday;
                this.data[index].address = this.editAddress;
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

    .demo-upload-list {
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
        margin-right: 4px;
    }

    .demo-upload-list img {
        width: 100%;
        height: 100%;
    }

    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
        display: block;
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }

</style>
