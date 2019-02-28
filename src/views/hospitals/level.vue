<template>
    <Card dis-hover :bordered="false" title="医院等级">
        <div slot="extra">
            <Button  @click="showAddModal()">添加</Button>
        </div>

        <Table border :columns="columns" :data="hospital_levels.data"></Table>
        <Row type="flex" style="margin-top: 10px;">
            <Col span="8">

            </Col>
            <Col span="16" class="list-tb-right">
            <Page :total="hospital_levels.meta.total" @on-change="changePage"  :current="1"></Page>
            </Col>
        </Row>

        <Modal
                v-model="is_show_modal"
                title="增加等级"
                :loading="loading"
                @on-ok="save('Level')"
                @on-cancel="cancelAddHospital"
        >


            <Form :model="fmData" :label-width="80" ref="fm" :rules="fmRules">

                <FormItem label="名称" prop="name">
                    <Input v-model="fmData.name"  placeholder="等级名称"/>
                </FormItem>




                <div>
                    {{ fmData }}
                </div>

            </Form>
        </Modal>



    </Card>
</template>


<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "hospital",
        computed: {
            ...mapGetters([
                'hospital_levels',
            ])
        },
        mounted() {
            this.getHospitals();
        },
        methods: {
            changePage(page){
                this.searchForm.page = page;
                this.getHospitals();
            },
            getHospitals() {
                this.$store.dispatch('getHospitalLevels',this.searchForm);
            },

            save(action) {
                this.$refs['fm'].validate((valid) => {
                    if (valid) {
                        this.loading = !this.loading;
                        let addOrEditAction = 'add'+action;
                        if (this.fmData.id && this.fmData.id > 0) addOrEditAction = 'edit'+action;
                        this.$store.dispatch(addOrEditAction, this.fmData).then(rsp => {
                            console.info(rsp);
                            this.loading = !this.loading;
                            this.cancelAddHospital();
                            this.getHospitals();
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
            cancelAddHospital() {
                this.is_show_modal = false;
            },
            showAddrPicker() {
                this.is_show_addr_picker_modal = true;
            },
            handleSearch(ref) {
                this.getHospitals();
            },
            showAddModal() {
                this.is_show_modal = true;
            },
            handleView(name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove(file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess(res, file) {
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
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
            handleBeforeUpload() {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            }
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
                is_show_addr_picker_modal: false,
                is_show_modal: false,
                loading: true,
                fmData: {
                    name: '',
                },

                fmRules: {
                    name: [
                        {required: true, message: '名称不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '至少2个字符', trigger: 'blur'},
                        // {validator: validateNamePath, trigger: 'blur'}
                    ],
                    sort: [
                        {required: false, type: 'integer', message: '排序只能是数字', trigger: 'blur'}
                    ]

                },

                defaultList: [
                    // {
                    //     'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    //     'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    // },
                    // {
                    //     'name': 'bc7521e033abdd1e92222d733590f104',
                    //     'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    // }
                ],
                imgName: '',
                visible: false,
                is_view_detail:false,
                uploadList: [],

                searchForm: {
                    page: 1,
                    kw: '',
                    level:'',
                },
                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        // fixed: 'left'
                    },
                    {
                        title: '名称',
                        key: 'name',
                    },


                    {
                        title: '排序',
                        key: 'province',
                    },
                    {
                        title: '创建时间',
                        key: 'created_at',
                    },
                    {
                        title: '更新时间',
                        key: 'updated_at',
                    },

                    {
                        title: '操作',
                        key: 'action',
                        // fixed: 'right',
                        width: 160,
                        render: (h, params) => {
                            return h('div', [

                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on:{
                                        click: () => {
                                            console.info(params);
                                            // return false;
                                            this.fmData.name = params.row.name;
                                            this.fmData.id = params.row.id;

                                            this.is_show_modal = true;
                                        }
                                    }
                                }, '编辑'),
                                h('Poptip', {

                                    props: {
                                        confirm: true,
                                        title: '确认要删除',
                                        transfer:true,
                                    },
                                    on: {
                                        'on-ok': () => {
                                            this.$store.dispatch('delLevel',{id:params.row.id}).then(rsp=>{
                                                this.getHospitals();
                                            });
                                            // this.remove(root, node, data)
                                        }
                                    }
                                }, [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small',
                                            disabled: params.row.hospitals.length > 0
                                        }

                                    },'删除')
                                ])

                            ]);
                        }
                    }
                ],

            }
        }
    }
</script>

<style scoped lang="less">
    .list-tb-right {
        text-align: right;
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
