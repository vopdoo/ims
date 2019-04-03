<template>
    <div>
        <ImsCurd>
            <Form :model="searchForm" class="search-form" inline slot="filter">
                <FormItem>
                    <Select clearable placeholder="客户" style="width:100px">
                        <Option value="1">张三</Option>
                        <Option value="2">李四</Option>
                        <Option value="3">王五</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Select clearable placeholder="状态" style="width:100px">
                        <Option value="1">未到院</Option>
                        <Option value="2">已到院</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Select clearable placeholder="类型" style="width:100px">
                        <Option value="1">初诊</Option>
                        <Option value="2">复疹</Option>
                    </Select>
                </FormItem>

                <FormItem>
                    <Input v-model="searchForm.keywords"
                           class="filter-kws"
                           search
                           @on-search="handleSearch"
                           placeholder="客户姓名/姓名/邮箱"
                    />
                </FormItem>
            </Form>
            <div slot="actions">
                <Button @click="handleCreate">添加预约</Button>
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
                    <Poptip
                            confirm
                            :transfer="true"
                            title="确认客户已经到院？"
                            @on-ok="handleDeleteUserOk(row)"
                            @on-cancel="handleDeleteUserCancel">
                        <Button size="small" type="text">到院</Button>
                    </Poptip>
                    <Button @click="handleDetail(row, index)" size="small" type="text">详细</Button>
                    <Button @click="handleTriage(row, index)" size="small" type="text">分诊</Button>
                    <Button @click="handleConsult(row, index)" size="small" type="text">咨询</Button>
                    <Button @click="handleAfter(row, index)" size="small" type="text">回访</Button>
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

        </ImsCurd>

        <Drawer title="预约详细" width="640" v-model="value4">
            <p :style="pStyle">客户信息</p>
            <div class="demo-drawer-profile">
                <Row>
                    <Col span="12">
                        姓名: 张三
                    </Col>
                    <Col span="12">
                        邮箱: aresn@aresn.com
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        性别: 男
                    </Col>
                    <Col span="12">
                        XXXX: xxx
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        XXXX: xxx
                    </Col>
                    <Col span="12">
                        XXXX: xxx
                    </Col>
                </Row>
            </div>
            <Divider/>
            <p :style="pStyle">咨询记录</p>
            <div class="demo-drawer-profile">
                <Row>
                    <Col span="12">
                        咨询师: 咨询师001
                    </Col>
                    <Col span="12">
                        时间: 2019-09-04-12 16:20:33
                    </Col>
                </Row>
                <br>
                <Form label-position="top">

                    <FormItem label="咨询明细">
                        咨询明细咨询明细咨询明细咨询明细咨询明细咨询明细咨询明细咨询明细咨询明细咨询明细咨询明细咨询明细
                        咨询明细咨询明细咨询明细咨询明细咨询明细咨询明细咨询明细咨询明细咨询明细咨询明细咨询明细咨询明细
                    </FormItem>

                    <FormItem label="成交项目">
                        <Table :columns="columns1" :data="data1"></Table>
                    </FormItem>

                </Form>

            </div>
            <Divider/>
            <p :style="pStyle">回访记录</p>
            <div class="demo-drawer-profile">

                <Row>
                    <Col span="12">
                        客服: 客服001
                    </Col>
                    <Col span="12">
                        时间: 2019-09-04-12 16:20:33
                    </Col>
                </Row>
                <br>
                <Form label-position="top">

                    <FormItem label="回访明细">
                        回访XXXXXXXX
                    </FormItem>

                </Form>

            </div>
        </Drawer>

        <Modal
                v-model="triageing"
                title="分诊"
                :loading="celoading"
                class-name="ce-modal"
                width="600"
                :mask-closable="false"
                :scrollable="true"
                @on-ok="handleCeOk"
                @on-cancel="handleCeCancel"
        >
            <Form label-position="top">
                <FormItem label="咨询师" required>
                    <Select clearable placeholder="请选择咨询师">
                        <Option value="1">询师1</Option>
                        <Option value="2">询师2</Option>
                        <Option value="2">询师3</Option>
                    </Select>
                </FormItem>

                <FormItem label="备注">
                    <Input type="textarea" placeholder="分诊备注"/>
                </FormItem>


            </Form>

        </Modal>


        <Modal
                v-model="aftering"
                title="增加回访记录"
                :loading="celoading"
                class-name="ce-modal"
                width="600"
                :mask-closable="false"
                :scrollable="true"
                @on-ok="handleCeOk"
                @on-cancel="handleCeCancel"
        >

            <Form ref="formDynamic" :model="formDynamic" label-position="top">
                <FormItem label="客户姓名">
                    <Input placeholder="回访客户" readonly disabled value="张三"/>
                </FormItem>
                <FormItem label="回访类型">
                    <CheckboxGroup>
                        <Checkbox label="术后回访"></Checkbox>
                        <Checkbox label="服务回访"></Checkbox>
                    </CheckboxGroup>
                </FormItem>

                <FormItem label="回访计划">
                    <DatePicker type="datetime" placeholder="下次回访时间"></DatePicker>
                </FormItem>

                <FormItem label="回访情况">
                    <Input type="textarea" placeholder="回访情况明细" :autosize="{minRows: 5,maxRows: 10}"/>
                </FormItem>


            </Form>

        </Modal>

        <Modal
                v-model="consulting"
                title="增加咨询记录"
                :loading="celoading"
                class-name="ce-modal"
                width="600"
                :mask-closable="false"
                :scrollable="true"
                @on-ok="handleCeOk"
                @on-cancel="handleCeCancel"
        >


            <Form ref="formDynamic" :model="formDynamic" label-position="top">
                <FormItem label="咨询明细">
                    <Input type="textarea" placeholder="咨询明细" :autosize="{minRows: 5,maxRows: 10}"/>
                </FormItem>
                <FormItem label="是否成交" required>
                    <Switch size="large">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </Switch>
                </FormItem>
                <FormItem label="医师" required>
                    <Select clearable placeholder="请选择医师">
                        <Option value="1">医师1</Option>
                        <Option value="2">医师2</Option>
                        <Option value="2">医师3</Option>
                    </Select>
                </FormItem>
                <Divider orientation="left">服务项目</Divider>
                <FormItem
                        v-for="(item, index) in formDynamic.items"
                        v-if="item.status"
                        :key="index"
                        :label="'项目 ' + item.index"
                        :prop="'items.' + index + '.value'"
                        :rules="{required: true, message: '项目 ' + item.index +' can not be empty', trigger: 'blur'}">
                    <Row gutter="16">
                        <Col span="5">
                            <Select placeholder="请选择项目">
                                <Option value="1">项目名称1</Option>
                                <Option value="1">项目名称2</Option>
                            </Select>
                        </Col>
                        <Col span="5">
                            <InputNumber :max="10" :min="1"/>
                        </Col>
                        <Col span="5">
                            <Input placeholder="请输入价格"/>
                        </Col>
                        <Col span="5">
                            <Input placeholder="折扣"/>
                        </Col>
                        <Col span="2" offset="1">
                            <Button @click="handleRemove(index)">删除</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Row gutter="16">
                        <Col span="12">
                            <Button type="dashed" long @click="handleAdd" icon="md-add">增加项目</Button>
                        </Col>
                        <Col span="12">
                            <Checkbox>服务项目价格审批</Checkbox>
                        </Col>
                    </Row>
                </FormItem>
            </Form>

        </Modal>

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
                        <FormItem label="客户" required>
                            <Select clearable placeholder="请选择客户">
                                <Option value="1">张三</Option>
                                <Option value="2">李四</Option>
                                <Option value="2">客户四</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="手机" required>
                            <Input placeholder="手机"/>
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
                        <FormItem label="科室">
                            <Select clearable placeholder="请选择科室">
                                <Option value="1">科室一</Option>
                                <Option value="2">科室二</Option>
                                <Option value="2">科室三</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="医生排班">
                            <Select v-model="model7">
                                <OptionGroup label="张医生">
                                    <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{
                                        item.label }}
                                    </Option>
                                </OptionGroup>
                                <OptionGroup label="李医生">
                                    <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{
                                        item.label }}
                                    </Option>
                                </OptionGroup>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>

                <FormItem label="就诊描述">
                    <Input type="textarea"/>
                </FormItem>
                <FormItem label="心理预期">
                    <Input type="textarea"/>
                </FormItem>

                <FormItem label="上传部位图">
                    <div class="demo-upload-list" v-for="item in uploadList">
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
                            :default-file-list="defaultList"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple
                            type="drag"
                            action="//jsonplaceholder.typicode.com/posts/"
                            style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="View Image" v-model="visible">
                        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible"
                             style="width: 100%">
                    </Modal>
                </FormItem>


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
        name: 'Reservations',
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
                columns1: [
                    {
                        title: '项目',
                        key: 'name'
                    },
                    {
                        title: '数量',
                        key: 'age'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '折扣',
                        key: 'discount'
                    },
                    {
                        title: '小计',
                        key: 'amount'
                    }

                ],
                data1: [
                    {
                        name: '项目一',
                        age: 1,
                        price: '100.23',
                        discount: '1%',
                        amount: '10.23',
                    },
                    {
                        name: '项目二',
                        age: 2,
                        price: '99.23',
                        discount: '17%',
                        amount: '99.23'
                    },

                ],
                value4: false,
                pStyle: {
                    fontSize: '16px',
                    color: 'rgba(0,0,0,0.85)',
                    lineHeight: '24px',
                    display: 'block',
                    marginBottom: '16px'
                },
                index: 1,
                formDynamic: {
                    items: [
                        {
                            value: '',
                            index: 1,
                            status: 1
                        }
                    ]
                },
                triageing: false,
                consulting: false,
                aftering: false,
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                cityList1: [
                    {
                        value: '09:00 - 10:00',
                        label: '09:00 - 10:00'
                    },
                    {
                        value: '01:00 - 11:00',
                        label: '01:00 - 11:00'
                    },
                    {
                        value: '11:00 - 12:00',
                        label: '11:00 - 12:00'
                    }
                ],
                cityList2: [
                    {
                        value: '09:00 - 10:00',
                        label: '09:00 - 10:00'
                    },
                    {
                        value: '01:00 - 11:00',
                        label: '01:00 - 11:00'
                    },
                    {
                        value: '11:00 - 12:00',
                        label: '11:00 - 12:00'
                    }
                ],
                model7: '',
                columns: [
                    {
                        title: '预约编号',
                        slot: 'name',
                        fixed: 'left',
                        width: 100
                    },
                    // 科室	医生排班	预约时间段	姓名	年龄	手机号	过往治疗记录	渠道来源
                    // 就诊描述	上传部位图	治疗项目	项目报价	心理预期
                    // 返点比例
                    //
                    // 初诊
                    //
                    // 复诊

                    {
                        title: '客户姓名',
                        slot: 'name',
                        width: 100
                    },

                    {
                        title: '科室',
                        slot: 'nick_name',
                        width: 100
                    },
                    {
                        title: '医生排班',
                        key: 'department_names',
                        width: 150,
                        tooltip: true
                    },

                    {
                        title: '手机',
                        key: 'email',
                        width: 100,
                        tooltip: true,
                        // slot: 'email'
                    },
                    {
                        title: '年龄',
                        key: 'email',
                        width: 100,
                        tooltip: true,
                        // slot: 'email'
                    },


                    {
                        title: '状态',
                        slot: 'status',
                        width: 100
                    },
                    {
                        title: '创建时间',
                        slot: 'created_at',
                        width: 150
                    },
                    {
                        title: '更新时间',
                        slot: 'updated_at',
                        width: 150
                    },
                    {
                        title: '操作',
                        slot: 'action',
                        width: 280,
                        fixed: 'right'
                    }
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
                cetitle: '客户预约',
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
            handleAdd() {
                this.index++;
                this.formDynamic.items.push({
                    value: '',
                    index: this.index,
                    status: 1
                });
            },
            handleRemove(index) {
                this.formDynamic.items[index].status = 0;
            },

            async handleDetail() {

                this.$Loading.start();
                await this.$store.dispatch('department/withCheckedDepartmentlists', {});
                this.$Loading.finish();
                this.value4 = true;

            },
            async handleTriage() {

                this.$Loading.start();
                await this.$store.dispatch('department/withCheckedDepartmentlists', {});
                this.$Loading.finish();
                this.triageing = true;

            },
            async handleAfter() {

                this.$Loading.start();
                await this.$store.dispatch('department/withCheckedDepartmentlists', {});
                this.$Loading.finish();
                this.aftering = true;

            },


            async handleConsult() {
                this.$Loading.start();
                await this.$store.dispatch('department/withCheckedDepartmentlists', {});
                this.$Loading.finish();
                this.consulting = true;

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
