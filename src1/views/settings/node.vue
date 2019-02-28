<template>
    <Card dis-hover :bordered="false" title="节点管理">
        <Button slot="extra" type="success" @click="addTopMenu">增加顶级节点</Button>
        <Tree :data="nodes" :render="renderContent"></Tree>

        <Modal
                v-model="is_add_menuing"
                title="增加节点"
                :loading="loading"
                class-name="add-edit-modal"
                @on-ok="saveMenu"
                @on-cancel="cancelAddMenu"
        >
            <Form :model="menuFm" :label-width="80" ref="menuFm" :rules="menuFmRules">
                <FormItem label="名称" prop="name">
                    <Input v-model="menuFm.name" placeholder="名称"/>
                </FormItem>
                <FormItem label="标识" prop="code">
                    <Input v-model="menuFm.code" placeholder="标识"/>
                </FormItem>
                <FormItem label="类型" prop="type">
                    <Select v-model="menuFm.type" placeholder="类型" @on-change="typeChange">
                        <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <div v-if="menuFm.type == 1">
                    <FormItem label="路由名称">
                        <Input v-model="menuFm.others.name" placeholder="路由名称"/>
                    </FormItem>

                    <FormItem label="路由路径">
                        <Input v-model="menuFm.others.path" placeholder="路由路径"/>
                    </FormItem>
                </div>


                <FormItem label="图标">
                    <Input v-model="menuFm.icon" placeholder="图标"/>
                </FormItem>
                <FormItem label="排序">
                    <InputNumber :max="9999" :min="0" placeholder="排序值 越小越靠前" v-model="menuFm.sort"/>
                </FormItem>
                <Alert closable>{{ menuFm }}</Alert>
            </Form>
        </Modal>
    </Card>


</template>
<script>
    import {mapGetters} from 'vuex'
    // const  vm = new Vue;
    import  store from '../../store';

    console.info(store);
    store.dispatch("abc")
    export default {
        name: 'Node',
         beforeRouteEnter(to, from, next) {
            // 等待模型数据加载完毕,才继续进行vue组件的生命周期
            console.info('beforeRouteEnter');
            // 这个时候 getNodes 是没有的
            // vuex.esm.js?2f62:410 [vuex] unknown action type: getNodes 会有这个错误
             console.log(store);
             console.log(store.state.nodes)
             store.dispatch('abcd');
            console.info('数据加载之后');
            // next();
            next(vm => {
                console.log(store.state.nodes)
                console.info('next');
                vm.$store.dispatch('abc')
            });
        },
        computed: {
            ...mapGetters([
                'nodes',
            ])
        },
        mounted() {
            console.info('mounted');
            // this.$store.dispatch('getNodes', {is_show_tree: 1});
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
                    others: {},
                    icon: 'md-apps',
                    sort: 0,
                    pid: 0
                },
                loading: true,

                menuFmRules: {
                    name: [
                        {required: true, message: '菜单名称不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '至少2个字符', trigger: 'blur'},
                    ],
                    // type: [
                    //     {required: true, message: '类型必须选择', trigger: 'blur'},
                    // ],
                    code: [
                        {required: true, message: '节点标识不能为空', trigger: 'blur'},
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
            typeChange(option) {
                console.info(option);
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
                        h('Icon', {
                            props: {
                                type: data.icon
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.name)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-add'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => {
                                    this.menuFm.pid = data.id;
                                    this.is_add_menuing = true;
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

                                    this.menuFm.name = data.name;
                                    this.menuFm.code = data.code;
                                    this.menuFm.sort = data.sort;
                                    this.menuFm.id = data.id;
                                    this.menuFm.icon = data.icon;
                                    this.menuFm.pid = data.pid;
                                    this.menuFm.type = data.type;
                                    if (data.type == 1) {
                                        this.menuFm.others = data.others;
                                    }
                                    this.is_add_menuing = true;
                                }
                            }
                        }),

                        h('Poptip', {

                            props: {
                                confirm: true,
                                title: '确认要删除',

                                // transfer:true,
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
                this.menuFm.pid = 0;
                this.is_add_menuing = true;
            },
            cancelAddMenu() {
                this.$refs['menuFm'].resetFields();

                this.menuFm['id'] && delete this.menuFm['id'];
            },
            saveMenu() {
                this.$refs['menuFm'].validate((valid) => {
                    if (valid) {
                        // this.$Message.success('Success!');
                        this.loading = !this.loading;
                        let action = 'addNode';
                        if (this.menuFm.id && this.menuFm.id > 0) action = 'editNode';
                        this.$store.dispatch(action, this.menuFm).then(rsp => {
                            console.info(rsp);
                            this.loading = !this.loading;
                            this.cancelAddMenu();
                            this.$store.dispatch('getNodes');
                            this.is_add_menuing = false;
                        }).catch(rsp => {
                            console.info('ddddddd');
                            this.loading = !this.loading;
                            this.$Message.error('保存失败，请重试!');
                            return false;
                        })
                    } else {
                        this.loading = !this.loading;
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


                this.$store.dispatch('delMenu', {id: data.id}).then(rsp => {
                    this.$store.dispatch('getMenus');
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
        }
    }
</style>
