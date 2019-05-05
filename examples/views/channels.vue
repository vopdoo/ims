<template>
    <div>
        <Row :gutter="32">
            <Col span="20">
                &nbsp;
            </Col>
            <Col span="4" class="list-tlbr">
                <Button type="success" @click="addTopMenu">增加一级渠道</Button>
            </Col>
        </Row>

        <Tree :data="channels" :render="renderContent"></Tree>
        <Modal
                v-model="is_add_menuing"
                :title="title"
                :loading="loading"
                class-name="ce-modal"
                :mask-closable="false"
                :scrollable="true"
                @on-ok="saveMenu"
                @on-cancel="cancelAddMenu"
        >
            <Form :model="menuFm" label-position="top" ref="menuFm" :rules="menuFmRules">
                <!--<FormItem label="类型" prop="type">-->
                    <!--<Select v-model="menuFm.type" placeholder="类型" @on-change="typeChange">-->
                        <!--<Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                    <!--</Select>-->
                <!--</FormItem>-->
                <FormItem label="名称" prop="name">
                    <!--prop="name"-->
                    <Input v-model="menuFm.name" placeholder="名称"/>
                </FormItem>
                <FormItem label="标识" prop="code">
                    <!--prop="code"-->
                    <Input v-model="menuFm.code" placeholder="标识"/>
                </FormItem>



                <!--<FormItem label="图标">-->
                    <!--<Input v-model="menuFm.icon" placeholder="图标"/>-->
                <!--</FormItem>-->
                <FormItem label="排序">
                    <InputNumber :max="9999" :min="0" placeholder="排序值 越小越靠前" v-model="menuFm.sort"/>
                </FormItem>
                <!--<Alert closable>{{ menuFm }}</Alert>-->
            </Form>
        </Modal>
        <!--<Spin size="large" fix v-if="spinShow"></Spin>-->
    </div>


</template>
<script>
    import {mapGetters} from 'vuex'

    export default {
        name: 'Channels',
        async created() {
            await this.$store.dispatch('channel/lists', {is_show_tree: 1});
            await this.$store.dispatch('system/changeSpining',{spining:false});
        },
        computed: {
            ...mapGetters({
                channels: 'channel/channels',
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
                this.$store.dispatch('channel/validateCode', validateFieldRequest).then(result => {
                    if (result) {
                        callback(new Error('渠道标识已经存在了，请重新输入！'));
                    } else {
                        callback();
                    }
                });
            };
            return {
                title: '增加节点',
                typeList: [
                    {
                        value: 1,
                        label: '页面'
                    },
                    {
                        value: 2,
                        label: '菜单'
                    },
                    {
                        value: 3,
                        label: '操作'
                    },
                ],
                menuFm: {
                    name: '',
                    code: '',
                    type: 1,
                    options: {
                        tree_path: '0'
                    },
                    icon: 'md-apps',
                    sort: 0,
                    pid: 0
                },
                loading: true,
                menuFmRules: {
                    name: [
                        {required: true, message: '渠道名称不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '至少2个字符', trigger: 'blur'},
                    ],
                    // type: [
                    //     {required: true, message: '类型必须选择', trigger: 'blur'},
                    // ],
                    code: [
                        {required: true, message: '渠道标识不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '至少2个字符', trigger: 'blur'},
                        {validator: validateCode, trigger: 'blur'}
                    ],
                    sort: [
                        {required: false, type: 'integer', message: '排序只能是数字', trigger: 'blur'}
                    ]
                },
                is_add_menuing: false,
                buttonProps: {
                    size: 'small',
                }
            }
        },
        methods: {
            getNodeTag(type) {
                if (type == 1) {
                    return '#2d8cf0';
                } else if (type == 2) {
                    return '#19be6b';
                } else {
                    return '#f90';
                }
            },
            typeChange(option) {
                console.info(option);
            },
            initFmData() {
                this.menuFm = {
                    name: '',
                    code: '',
                    type: 1,
                    options: {
                        tree_path: '0',
                    },
                    icon: 'md-apps',
                    sort: 0,
                    pid: 0
                };
            },
            createNode(data) {
                if (data.id) {
                    this.menuFm.pid = data.id;
                    if (data.pid === 0) {
                        // 一级节点
                        this.menuFm.options.tree_path = `${data.id}`;
                    } else {
                        this.menuFm.options.tree_path = `${data.options.tree_path},${data.id}`;
                    }

                } else {
                    this.menuFm.type = 2; // 一般情况为菜单
                }
                this.title = '增加渠道';
                this.is_add_menuing = true;
            },
            editNode(data) {
                this.title = '编辑渠道';
                this.menuFm = {
                    name: data.name,
                    code: data.code,
                    type: data.type,
                    options: data.options,
                    icon: data.icon,
                    sort: 0,
                    pid: data.pid,
                    id: data.id
                };
                this.is_add_menuing = true;
            },
            renderContent(h, {root, node, data}) {
                // console.info(data);
                data.expand = true;
                // console.info(data.children);
                return h('span', {
                    class: {
                        'menus-span': true,
                    },
                    style: {
                        display: 'inline-block',
                        width: '100%',
                    }
                }, [
                    h('span', [

                        // h('Icon', {
                        //     props: {
                        //         type: data.icon,
                        //         color: this.getNodeTag(data.type)
                        //     },
                        //     style: {
                        //         marginRight: '8px'
                        //     }
                        // }),
                        h('span', data.name),


                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '16px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-add',
                                disabled: data.type == 3
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => {
                                    this.createNode(data);
                                }
                            }
                        }),

                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-create-outline'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => {
                                    this.editNode(data);
                                }
                            }
                        }),

                        h('Poptip', {

                            props: {
                                confirm: true,
                                title: '确认要删除',
                                transfer: true,
                            },
                            on: {
                                'on-ok': () => {
                                    this.remove(root, node, data)
                                }
                            }
                        }, [
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-remove',
                                    disabled: data.children && true
                                }),

                            })
                        ]),
                    ])
                ]);
            },
            addTopMenu() {
                this.initFmData();
                this.createNode(this.menuFm);
            },
            cancelAddMenu() {
                this.initFmData();
            },
            saveMenu() {
                this.$refs['menuFm'].validate((valid) => {
                    console.info('vvv');
                    if (valid) {
                        this.$Message.success('Success!');
                        this.loading = !this.loading;
                        let action = 'channel/create';
                        console.info(action);
                        if (this.menuFm.id && this.menuFm.id > 0) action = 'channel/edit';
                        console.info(action);
                        this.$store.dispatch(action, this.menuFm).then(rsp => {
                            this.loading = !this.loading;
                            this.cancelAddMenu();
                            this.is_add_menuing = false;
                        }).catch(rsp => {
                            this.loading = !this.loading;
                            this.$Message.error('保存失败，请重试!');
                            return false;
                        })
                    } else {
                        console.info('dd');
                        // this.loading = !this.loading;
                        return false;
                    }
                })
            },
            append(data) {
                const children = data.children || [];
                children.push({
                    title: 'appended node',
                    expand: true
                });
                this.$set(data, 'children', children);
            },
            remove(root, node, data) {
                this.$store.dispatch('channel/delete', {id: data.id}).then(rsp => {
                    // this.$store.dispatch('getMenus');
                    // const parentKey = root.find(el => el === node).parent;
                    // const parent = root.find(el => el.nodeKey === parentKey).node;
                    // const index = parent.children.indexOf(data);
                    // parent.children.splice(index, 1);
                })
            }
        }
    }
</script>


<style lang="less">
    .menus-span {
        &:hover {
            color: #2d8cf0;
            background-color: #f8f8f9;
        }
    }
</style>
