<template>
    <div>
        <ImsCurd>
            <Form :model="searchForm" class="search-form" inline slot="filter">
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
                    <Select v-model="searchForm.status" clearable placeholder="性别" style="width:100px">
                        <Option>男</Option>
                        <Option>女</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Select v-model="searchForm.role_ids"
                            multiple
                            placeholder="标签"
                            style="width:250px">
                        <Option v-for="item in tags"
                                :value="item.id"
                                :key="item.id">
                            {{ item.label }}
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
            <div slot="actions">
                <Button @click="handleCreate">添加档案</Button>
            </div>

            <Table :columns="columns"
                   :data="lists.data"
                   border
                   slot="table"
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
                    <Button @click="handleOrder(row, index)" size="small" type="text">预约记录</Button>
                    <Button size="small" type="text">电子病历</Button>
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

        </ImsCurd>

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
                        <FormItem label="客户姓名" required>
                            <Input placeholder="客户姓名"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="性别" required>
                            <Select clearable placeholder="请选择性别">
                                <Option value="1">男</Option>
                                <Option value="2">女</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="年龄" required>
                            <Input/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="职业">
                            <Input/>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="手机" required>
                            <Input/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="生日" required>
                            <Input/>
                        </FormItem>
                    </Col>
                </Row>

                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="微信号">
                            <Input/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="星座">
                            <Input/>
                        </FormItem>
                    </Col>
                </Row>

                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="兴趣爱好">
                            <Input/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="消费特征">
                            <Input v-model="fmData.nick_name"/>
                        </FormItem>
                    </Col>
                </Row>

                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="渠道">
                            <Input/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="通讯地址">
                            <Input v-model="fmData.nick_name"/>
                        </FormItem>
                    </Col>
                </Row>

                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="头像">
                            <Input/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="咨询项目">
                            <Input v-model="fmData.nick_name"/>
                        </FormItem>
                    </Col>
                </Row>

                <Row :gutter="32">
                    <Col span="12">
                        <FormItem label="社会属性">
                            <Input/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="开发方式">
                            <Input v-model="fmData.nick_name"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>


        </Modal>

    </div>

</template>
<script>
    import {mapGetters} from 'vuex'
    import store from '@/store/index';

    import TableDatetime from '@/components/table-datetime/index';
    import ImsCurd from '@/components/ims-curd/index';

    export default {
        name: 'Users',
        components: {
            TableDatetime,
            ImsCurd,
        },
        async beforeRouteEnter(to, from, next) {
            await store.dispatch('department/lists', {is_show_tree: 1, has_admins: 1});
            await store.dispatch('role/lists', {status: 1, per_page: 1000});
            await store.dispatch('user/lists');
            next();
        },
        computed: {
            ...mapGetters({
                lists: 'user/lists',
                tags: 'user/tags',
                statusList: 'user/statusList',
                columns: 'user/columns',
                departments: 'department/nodes',
                depts: 'department/depts',
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
            return {
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
                cetitle: '增加客户档案',
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
            handleOrder() {

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
                this.$Loading.start();
                await this.$store.dispatch('department/withCheckedDepartmentlists', {
                    is_show_tree: 1,
                    has_admins: 1,
                    checked_department_ids: row.department_ids
                });
                this.fmData = row;
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
