<template>
    <Card dis-hover :bordered="false" title="菜单管理">
        <Button slot="extra" type="dashed" @click="addTopMenu">增加顶级菜单</Button>
        <Tree :data="menus" :render="renderContent"></Tree>

        <Modal
                v-model="is_add_menuing"
                title="增加菜单"
                :loading="loading"
                @on-ok="saveMenu"
                @on-cancel="cancelAddMenu"
        >


            <Form :model="menuFm" :label-width="80" ref="menuFm" :rules="menuFmRules">
                <FormItem label="标题" prop="title">
                    <Input v-model="menuFm.title" placeholder="标题"/>
                </FormItem>
                <FormItem label="名称" prop="name">
                    <Input v-model="menuFm.name" placeholder="名称"/>
                </FormItem>
                <FormItem label="路径" prop="path">
                    <Input v-model="menuFm.path" placeholder="路径"/>
                </FormItem>
                <FormItem label="图标">
                    <Input v-model="menuFm.icon" placeholder="图标"/>
                </FormItem>
                <FormItem label="排序">
                    <InputNumber :max="9999" :min="0"  placeholder="排序" v-model="menuFm.sort" />
                </FormItem>

                <div>
                    {{ menuFm }}
                </div>

            </Form>
        </Modal>
    </Card>


</template>
<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'NavMenu',
        computed: {
            ...mapGetters([
                'menus',
            ])
        },
        mounted() {
            this.$store.dispatch('getMenus');
        },
        data() {
            const validateNamePath = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('值不能为空'));
                }
                let validateNamePathRequest = {
                    type: rule.field,
                    value: value,
                    id: this.menuFm.id
                };
                this.$store.dispatch('validateNamePath', validateNamePathRequest).then(result => {
                    if (result) {
                        callback(new Error('已经存在了，请重新输入！'));
                    } else {
                        callback();
                    }
                });

            };

            return {
                menuFm: {
                    title: '',
                    name: '',
                    path: '',
                    icon: 'ios-paper-outline',
                    sort: 0,
                    pid: 0
                },
                loading: true,

                menuFmRules: {
                    title: [
                        {required: true, message: '菜单标题不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '至少2个字符', trigger: 'blur'},

                    ],
                    name: [
                        {required: true, message: '菜单名称不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '至少2个字符', trigger: 'blur'},
                        {validator: validateNamePath, trigger: 'blur'}
                    ],
                    path: [
                        {required: true, message: '菜单路径不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '至少2个字符', trigger: 'blur'},
                        {validator: validateNamePath, trigger: 'blur'}
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
            renderContent(h, {root, node, data}) {
                data.expand = true;
                // console.info(data.children);

                return h('span', {
                    class:{
                        'menus-span':true,
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
                        h('span', data.title)
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
                                    this.menuFm.path = data.path;
                                    this.menuFm.sort = data.sort;
                                    this.menuFm.title = data.title;
                                    this.menuFm.id = data.id;
                                    this.menuFm.icon = data.icon;
                                    this.menuFm.pid = data.pid;
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
                        let action = 'addMenu';
                        if (this.menuFm.id && this.menuFm.id > 0) action = 'editMenu';
                        this.$store.dispatch(action, this.menuFm).then(rsp => {
                            console.info(rsp);
                            this.loading = !this.loading;
                            this.cancelAddMenu();
                            this.$store.dispatch('getMenus');
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


<style  lang="less">
    .menus-span {
        &:hover {
            color: #2d8cf0;
        }
    }
</style>
