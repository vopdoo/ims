<template>
    <div style="height: 100%;">
        <div class="demo-split">
            <Split v-model="split1">
                <div slot="left" class="demo-split-left-pane">
                    <!--:render="renderContent"-->
                    <Tree :data="departments"
                          ref="leftDeptTree"
                          :render="renderContent"
                          @on-toggle-expand="handleToggleExpand"
                          @on-select-change="handleDepartmentSelectChange"
                          show-checkbox
                          multiple
                    >
                    </Tree>
                </div>
                <div slot="right" class="demo-split-right-pane">
                    <Row type="flex" justify="space-between" align="top">
                        <Col span="20">
                            <Form :model="searchForm" class="search-form" inline>
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
                                    <Select v-model="searchForm.role_ids"
                                            multiple
                                            placeholder="角色"
                                            style="width:250px">
                                        <Option v-for="item in roles.data"
                                                :value="item.id"
                                                :key="item.id">
                                            {{ item.name }}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem>
                                    <Input v-model="searchForm.keywords"
                                           class="filter-kws"
                                           search
                                           @on-search="handleSearch"
                                           placeholder="姓名/昵称/姓名/邮箱"
                                    />
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span="4" class="list-tlbr">
                            <Button @click="handleCreate">添加</Button>
                        </Col>
                    </Row>

                    <Table :columns="columns"
                           :data="admins.data"
                           border
                           :loading="tblLoading"
                    >
                        <template slot-scope="{ row, index }" slot="name">
                            <Input type="text" v-model="editName" v-if="editIndex === index"/>
                            <span v-else>{{ row.name }}</span>
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
                            <Page :total="admins.meta.total"
                                  show-elevator
                                  show-sizer
                                  show-total
                                  @on-change="handlePageChange"
                                  @on-page-size-change="handlePageSizeChange"
                            />
                        </Col>
                    </Row>
                </div>
            </Split>
        </div>
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
            <Form :model="fmData" label-position="top">
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="姓名">
                            <Input v-model="fmData.name" placeholder="姓名"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="昵称">
                            <Input v-model="fmData.nick_name" placeholder="昵称"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">

                    <Col span="12">
                        <FormItem label="部门">
                            <Input v-model="fmData.department_names" placeholder="请选择部门">
                            <Poptip :transfer="true" slot="suffix" title="选择部门 (可多选)"
                                    @on-popper-hide="handleDepartmentChange">
                                <Icon type="md-checkbox-outline"/>
                                <div slot="content"
                                     style="padding-bottom: 16px; width:200px;height: 300px;overflow-y: auto;">
                                    <Tree :data="depts" :check-strictly="true"
                                          @on-check-change="handleDepartmentTreeChange"
                                          :render="renderContent"
                                          @on-toggle-expand="handleToggleExpand"
                                          show-checkbox
                                    >

                                    </Tree>
                                </div>
                            </Poptip>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="邮箱">
                            <Input v-model="fmData.email" placeholder="邮箱"/>
                        </FormItem>
                    </Col>
                </Row>

                <FormItem label="角色">
                    <Select v-model="fmData.role_ids"
                            multiple
                            placeholder="请选择角色"
                    >
                        <Option v-for="item in roles.data"
                                :value="item.id"
                                :key="item.id">
                            {{ item.name }}
                        </Option>
                    </Select>
                </FormItem>

                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="排序">
                            <InputNumber :max="9999" :min="0" placeholder="排序值 越小越靠前" v-model="fmData.sort"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="状态">
                            <Switch size="large" v-model="fmData.status">
                                <span slot="open">开启</span>
                                <span slot="close">关闭</span>
                            </Switch>
                        </FormItem>
                    </Col>
                </Row>

                <FormItem label="密码">
                    <Input element-id="password"
                           @on-click="handleTogglePassword"
                           v-model="fmData.password"
                           :type="passwordInputType"
                           :icon="passwordInputSuffixIcon"
                           placeholder="密码"
                    />
                </FormItem>
                <!--{{schedules}}-->
                <FormItem label="排班计划" v-if="fmData.has_schedule">
                    <span slot="label">
                        <span>排班计划</span>
                        <Button @click="handleAddSchedule" icon="ios-add-circle" type="text"></Button>
                    </span>
                    <Table :columns="columns1" :data="schedules.data"></Table>
                </FormItem>
                <FormItem label="备注">
                    <Input type="textarea" v-model="fmData.remark" :rows="4"
                           placeholder="备注"/>
                </FormItem>
            </Form>
        </Modal>

        <!--class-name="ce-modal"-->
        <Modal
                v-model="scheduleing"
                title="排班"
                :loading="scheduleLoading"
                width="600"
                :mask-closable="false"
                :scrollable="true"
                @on-ok="handleScheduleOk('schedule')"
                @on-cancel="handleScheduleCancel('schedule')"
        >
            <Form :model="scheduleFmData"
                  :rules="rules"
                  label-position="top"
                  ref="schedule"
            >

                <FormItem label="排班时间段" prop="se_at">
                    <DatePicker type="datetimerange"
                                v-model="scheduleFmData.se_at"
                                format="yyyy-MM-dd HH:mm"
                                @on-change="handleScheduleAeChange"
                                placeholder="请选择排班时间" style="width: 300px;"></DatePicker>
                </FormItem>
            </Form>

        </Modal>

    </div>

</template>
<script>
    import {mapGetters} from 'vuex'
    // import store from '@/store/index';

    import TableDatetime from '@/components/table-datetime/index';

    export default {
        name: 'Admin',
        components: {
            TableDatetime,
        },
        async created() {
            await this.$store.dispatch('department/lists', {is_show_tree: 1, has_admins: 1});
            await this.$store.dispatch('role/lists', {status: 1, per_page: 1000});
            await this.$store.dispatch('admin/lists');
            await this.$store.dispatch('system/changeSpining', {spining: false});
        },
        computed: {
            ...mapGetters({
                admins: 'admin/admins',
                statusList: 'admin/statusList',
                columns: 'admin/columns',
                departments: 'department/nodes',
                depts: 'department/depts',
                schedules: 'schedules/lists',
                roles: 'role/lists',
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
            const validateSeAt = (rule, value, callback) => {
                if (value.length != 2) {
                    return callback(new Error('请选择排班时间段'));
                }
                if (value[0] == '' || value[1] == '') {
                    return callback(new Error('请选择排班时间段'));
                }
                callback();
            };
            return {
                rules: {
                    se_at: [
                        {required: true, type: 'array', message: '请选择排班时间段', trigger: 'change'},
                        {validator: validateSeAt, trigger: 'change'}
                    ],
                },
                scheduleFmData: {
                    type: '',
                    admin_id: '',
                    se_at: [],
                    start_at: '',
                    end_at: ''
                },
                columns1: [
                    {
                        title: '开始时间',
                        key: 'start_at'
                    },
                    {
                        title: '结束时间',
                        key: 'end_at'
                    },
                    // {
                    //     title: '状态',
                    //     key: 'age'
                    // }
                ],
                split1: '200px',
                passwordInputType: 'password',
                passwordInputSuffixIcon: 'md-eye',
                fmData: {
                    name: '',
                    nick_name: '',
                    department_ids: [],
                    role_ids: [],
                    department_names: '',
                    email: '',
                    sort: 0,
                    status: true,
                },
                hasceing: false,
                scheduleing: false,
                scheduleLoading: false,
                cetitle: '增加用户',
                celoading: false,
                tblLoading: false,
                searchForm: {
                    dept_ids: [],
                    role_ids: [],
                    keywords: '',
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
            handleScheduleAeChange(value, type) {
                // console.info(value, type);
                this.scheduleFmData.start_at = value[0];
                this.scheduleFmData.end_at = value[1];
            },
            handleScheduleOk(ref) {

                this.$refs[ref].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('schedules/create', this.scheduleFmData);
                        this.$Message.success('增加排班成功！');
                        this.scheduleLoading = false;
                        this.scheduleing = false;
                    } else {
                        // this.$Message.error('Fail!');
                    }
                })
            },
            handleScheduleCancel(ref) {
                this.$refs[ref].resetFields();
                this.scheduleFmData = {
                    type: '',
                    admin_id: '',
                    se_at: [],
                    start_at: '',
                    end_at: ''
                };
            },
            handleAddSchedule() {
                console.info('handleAddSchedule', this.fmData);
                this.scheduleLoading = true;
                this.scheduleing = true;
            },
            handleDeleteUserOk(data) {
                console.info('handleDeleteUserOk', data);
                this.$store.dispatch('admin/delete', data);
            },
            handleDeleteUserCancel() {
                console.info('handleDeleteUserCancel');
            },
            handleDepartmentSelectChange(nodes) {
                console.info('handleDepartmentSelectChange');
                console.info(nodes);
            },
            handleDepartmentTreeChange(nodes) {
                console.info(nodes)
                if (nodes.length) {
                    let dept_names = [];
                    let dept_ids = [];
                    nodes.forEach((item) => {
                        dept_names.push(item.name);
                        dept_ids.push(item.id);
                    });
                    this.fmData.department_ids = dept_ids;
                    this.fmData.department_names = dept_names.join(',');
                } else {
                    this.fmData.department_ids = [];
                    this.fmData.department_names = '';
                }


            },
            handleDepartmentChange() {
                console.info('handleDepartmentChange Hide');
                // this.has_dept_selecting = !this.has_dept_selecting;
            },
            handleToggleExpand(node) {
                // console.info(node,node.expand);
                // node.expand = node.expand;
                // console.info(node.expand);
            },
            renderContents(h, {root, node, data}) {
                return h('span', {
                    class: {
                        'dept-span': true,
                    },
                    style: {
                        display: 'inline-block',
                        width: '100%',
                    }
                }, [
                    h('span', {
                        style: {
                            cursor: 'pointer',
                        }
                    }, [

                        h('Icon', {
                            props: {
                                type: data.icon,
                                color: this.getNodeTag(data.type)
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.name),


                    ])

                ]);
            },
            renderContent(h, {root, node, data}) {
                return h('span', {
                    class: {
                        'dept-span': true,
                    },
                    style: {
                        display: 'inline-block',
                        width: '100%',
                    }
                }, [
                    h('span', {
                        style: {
                            cursor: 'pointer',
                        }
                    }, [

                        h('Icon', {
                            props: {
                                type: data.icon,
                                color: this.getNodeTag(data.type)
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', {
                            style: {
                                // color: '#000',
                                backgroundColor: data.selected === true ? '#d5e8fc' : ''
                            },
                            on: {
                                click: () => {
                                    data.selected = !data.selected;
                                    let selectedNodes = this.$refs.leftDeptTree.getSelectedNodes();
                                    let deptIds = [];
                                    if (selectedNodes.length) {
                                        selectedNodes.forEach((item, index) => {
                                            deptIds.push(item.id);
                                        });
                                    }
                                    this.searchForm.dept_ids = deptIds;
                                    this.$store.dispatch('admin/lists', this.searchForm);
                                    // console.info(this.searchForm.dept_ids);
                                }
                            }
                        }, data.name),
                        h('span', {
                            style: {
                                color: '#515a6e',
                                marginLeft: '4px'
                            }
                        }, `(${data.admins.length})`),


                    ])

                ]);
            },
            getNodeTag(type) {
                if (type == 1) {
                    return '#2d8cf0';
                } else if (type == 2) {
                    return '#19be6b';
                } else {
                    return '#f90';
                }
            },
            initFmData() {
                this.fmData = {
                    name: '',
                    nick_name: '',
                    department_ids: [],
                    role_ids: [],
                    department_names: '',
                    email: '',
                    sort: 0,
                    status: true,
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
                let action = this.fmData.id ? 'admin/edit' : 'admin/create';
                let data = this.fmData;
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
                await store.dispatch('department/withCheckedDepartmentlists', {
                    is_show_tree: 1,
                    has_admins: 1,
                });
                this.$Loading.finish();
                this.hasceing = !this.hasceing;
            },
            async handlePageChange(page) {
                this.tblLoading = true;
                this.searchForm.page = page;
                await this.$store.dispatch('admin/lists', this.searchForm);
                this.tblLoading = false;
            },
            async handleSearch() {
                this.tblLoading = true;
                await this.$store.dispatch('admin/lists', this.searchForm);
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
                await this.$store.dispatch('schedules/lists', {admin_id: row.id});
                let has_schedule = -1;
                let type = 1;
                has_schedule = row.role_ids.findIndex((line) => {
                    if (line == 31 || line == 39 || line == 40) {
                        switch (line) {
                            case 31:
                                type = 2;
                                break;
                            case 40:
                                type = 1;
                                break;
                            case 39:
                                type = 3;
                                break;
                            default:
                                type = 1;
                        }
                        if (line == 40) {
                            type = 1;
                        }
                        return true;
                    }
                })
                console.info(type);
                this.scheduleFmData.type = type;
                this.scheduleFmData.admin_id = row.id;
                this.$Loading.start();
                await this.$store.dispatch('department/withCheckedDepartmentlists', {
                    is_show_tree: 1,
                    has_admins: 1,
                    checked_department_ids: row.department_ids
                });
                this.fmData = row;
                this.fmData.has_schedule = has_schedule >= 0 ? true : false;
                this.$Loading.finish();
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
