<template>
    <div style="height: 100%;">

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
                        <Input v-model="searchForm.keywords"
                               class="filter-kws"
                               search
                               @on-search="handleSearch"
                               placeholder="角色名称/标识代码"
                        />
                    </FormItem>
                </Form>
            </Col>
            <Col span="4" class="list-tlbr">
                <Button @click="handleCreate">添加</Button>
            </Col>
        </Row>

        <Table :columns="columns"
               :data="roles.data"
               tooltip-theme="light"
               border
               :loading="tblLoading"
        >
            <template slot-scope="{ row, index }" slot="name">
                <span>{{row.name }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="code">
                <span>{{row.code }}</span>
            </template>


            <template slot-scope="{ row, index }" slot="nick_name">

                <span>{{row.email }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="email">
                <span>{{row.email }}</span>
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
                        title="确认要删除此角色？"
                        @on-ok="handleDeleteRoleOk(row)"
                        @on-cancel="handleDeleteRoleCancel">
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
                <Page :total="roles.meta.total"
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
            <Form :model="fmData" label-position="top">
                <FormItem label="名称">
                    <Input v-model="fmData.name" placeholder="名称"/>
                </FormItem>
                <FormItem label="标识代码">
                    <Input v-model="fmData.code" placeholder="标识代码"/>
                </FormItem>
                <FormItem label="部门（可多选）">
                    <Tree :data="depts" :check-strictly="true"
                          @on-check-change="handleDepartmentTreeChange"
                          :render="renderContent"
                          show-checkbox
                    >

                    </Tree>
                </FormItem>
                <FormItem label="授权（可多选）">
                    <Tree :data="nodes"
                          ref="authorizationNodeTree"
                          :check-strictly="false"
                          @on-check-change="handleNodeTreeChange"
                          :render="renderNodeContent"
                          show-checkbox
                    >
                    </Tree>
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
    import store from '@/store/index';

    import TableDatetime from '@/components/table-datetime/index';

    export default {
        name: 'Admin',
        components: {
            TableDatetime,
        },
        // async beforeRouteEnter(to, from, next) {
        //     await store.dispatch('role/lists');
        //     next();
        // },
        async created() {
            await this.$store.dispatch('role/lists');
            await this.$store.dispatch('system/changeSpining',{spining:false});
        },
        computed: {
            ...mapGetters({
                roles: 'role/lists',
                depts: 'department/depts',
                nodes: 'node/nodes',
                statusList: 'role/statusList',
                columns: 'role/columns',
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
                spinShow:true,
                fmData: {
                    name: '',
                    code: '',
                    department_ids: [],
                    department_names: '',
                    node_ids: [],
                    node_names: '',
                    sort: 0,
                    remark: '',
                    status: true,
                },
                hasceing: false,
                cetitle: '增加角色',
                celoading: false,
                tblLoading: false,
                searchForm: {
                    keywords: '',
                    status: '',
                    page: 1,
                    per_page: 10,
                },
            }
        },
        methods: {
            handleDeleteRoleOk(data) {
                console.info('handleDelethandleDeleteRoleOkeUserOk', data);
                this.$store.dispatch('role/delete', data);
            },
            handleDeleteRoleCancel() {
                // console.info('handleDeleteRoleCancel');
            },
            handleDepartmentSelectChange(nodes) {
                console.info('handleDepartmentSelectChange');
                console.info(nodes);
            },
            initFmData() {
                this.fmData = {
                    name: '',
                    code: '',
                    department_ids: [],
                    department_names: '',
                    node_ids: [],
                    node_names: '',
                    sort: 0,
                    remark: '',
                    status: true,
                };
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
            handleNodeTreeChange(nodes) {
                // console.info('changed', nodes);
                // let checkedAndIndeterminateNodes = this.$refs.authorizationNodeTree.getCheckedAndIndeterminateNodes();
                // console.info(checkedAndIndeterminateNodes.length, checkedAndIndeterminateNodes);
                if (nodes.length) {
                    let node_names = [];
                    let node_ids = [];
                    nodes.forEach((item) => {
                        // console.info(item.name);
                        node_names.push(item.name);
                        node_ids.push(item.id);
                    });
                    this.fmData.node_ids = node_ids;
                    this.fmData.node_names = node_names.join(',');
                } else {
                    this.fmData.node_ids = [];
                    this.fmData.node_names = '';
                }
            },

            renderNodeContent(h, {root, node, data}) {
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
                                backgroundColor: data.selected === true ? '#d5e8fc' : ''
                            },
                            on: {}
                        }, data.name),
                        // h('span', {
                        //     style: {
                        //         color: '#515a6e',
                        //         marginLeft: '4px'
                        //     }
                        // }, `(${data.admins.length})`),


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
                                backgroundColor: data.selected === true ? '#d5e8fc' : ''
                            },
                            on: {}
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

            async handleCeOk() {
                this.celoading = true;
                this.tblLoading = true;
                let action = this.fmData.id ? 'role/edit' : 'role/create';
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
            getNodeTag(type) {
                if (type == 1) {
                    return '#2d8cf0';
                } else if (type == 2) {
                    return '#19be6b';
                } else {
                    return '#f90';
                }
            },
            async handleCreate() {
                this.$Loading.start();
                await store.dispatch('department/withCheckedDepartmentlists', {
                    is_show_tree: 1,
                    has_admins: 1,
                });
                await store.dispatch('node/lists', {
                    is_show_tree: 1,
                });
                this.$Loading.finish();
                this.hasceing = !this.hasceing;
            },
            async handlePageChange(page) {
                this.tblLoading = true;
                this.searchForm.page = page;
                await this.$store.dispatch('role/lists', this.searchForm);
                this.tblLoading = false;
            },
            async handleSearch() {
                this.tblLoading = true;
                await this.$store.dispatch('role/lists', this.searchForm);
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
                await this.$store.dispatch('node/lists', {
                    is_show_tree: 1,
                    checked_node_ids: row.node_ids
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
