<template>
    <Card dis-hover :bordered="false" title="文章管理">

        <Row type="flex" justify="space-between" align="top">
            <Col span="20">
            <Form ref="searchForm" :model="searchForm" inline>

                <FormItem>
                    <Select v-model="searchForm.category_id" placeholder="分类">
                        <Option value="" >全部</Option>
                        <Option v-for="item in categories_list.data" :value="item.id" :key="item.id">{{ item.name }}
                        </Option>
                    </Select>
                </FormItem>

                <FormItem>
                    <Select v-model="searchForm.status" placeholder="状态">
                        <Option v-for="item in postStatus" :value="item.id" :key="item.id">{{ item.text }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Input search v-model="searchForm.keywords"  class="search-ipt" @on-search="search('searchForm')"
                           placeholder="标题/描述"/>
                </FormItem>

            </Form>
            </Col>
            <Col span="4" class="list-tb-right">
                <Button @click="showAddModal()">增加</Button>
            </Col>
        </Row>

        <Table border :columns="columns" :data="banner_list.data"></Table>
        <Row type="flex" style="margin-top: 10px;">
            <Col span="8">

            </Col>
            <Col span="16" class="list-tb-right">
            <Page :total="banner_list.meta.total" @on-change="changePage" :current="1"></Page>
            </Col>
        </Row>

        <Modal
                v-model="is_show_modal"
                title="编辑文章"
                :loading="loading"
                @on-ok="save('Banner')"
                @on-cancel="cancelAddEditModal"
                width="800"
        >


            <Form :model="fmData" :label-width="100" ref="fm" :rules="fmRules">
                <FormItem label="分类" prop="category_id">
                    <Select v-model="fmData.category_id" >
                        <Option v-for="item in categories_list.data" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="标题" prop="title">
                    <Input  placeholder="请输入文章标题" v-model="fmData.title" />
                </FormItem>
                <FormItem label="描述">
                    <Input  placeholder="请输入文章标题" v-model="fmData.description" />
                </FormItem>

                <FormItem label="图片">


                    <div class="demo-upload-list" v-for="item in fmData.uploadCoverList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleThumbRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload
                            ref="thumb"
                            :show-upload-list="false"
                            :default-file-list="fmData.coverDefaultList"
                            :on-success="handleThumbSuccess"
                            :format="['jpg','jpeg','png']"
                            :max-size="2048"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleThumbBeforeUpload"
                            type="drag"
                            action="http://weapp.scmhmt.com/api/imgUpload"
                            style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                </FormItem>

                <FormItem label="排序">
                    <InputNumber :max="9999" :min="1" v-model="fmData.sort" />
                </FormItem>

                <FormItem label="状态">
                    <i-switch size="large" v-model="fmData.status">
                        <span slot="open">发布</span>
                        <span slot="close">隐藏</span>
                    </i-switch>
                </FormItem>




            </Form>
        </Modal>

        <Modal title="查看图片" v-model="visible" footer-hide>
            <img :src="visible_img_src" v-if="visible" style="width: 100%">
        </Modal>


    </Card>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "ContentsBanners",
        mounted() {
            this.getLists();
            this.$store.dispatch('categoriesList', {with_posts:false,type:2});
        },
        computed: {
            ...mapGetters([
                'banner_list',
                'categories_list'
            ])
        },
        methods: {
            showAddModal() {
                this.fmData.uploadCoverList = [];
                this.fmData.coverDefaultList = [];
                this.fmData.status = true;


                setTimeout(() => {
                    this.fmData.uploadCoverList = this.$refs.thumb.fileList;
                }, 200)
                this.is_show_modal = true;
            },
            getLists() {
                this.$store.dispatch('bannerList', this.searchForm);
            },
            search() {
                this.getLists();
            },
            changePage(page) {
                this.searchForm.page = page;
                this.getLists();
            },
            cancelAddEditModal() {
                this.is_show_modal = false;
                this.fmData = {};
            },
            save(action) {

                this.loading = !this.loading;
                let addOrEditAction = 'add' + action;
                if (this.fmData.id && this.fmData.id > 0) addOrEditAction = 'edit' + action;
                console.info(addOrEditAction);
                console.info(this.fmData);
                this.$store.dispatch(addOrEditAction, this.fmData).then(rsp => {
                    this.loading = !this.loading;
                    this.cancelAddEditModal();
                    this.getLists();
                }).catch(rsp => {
                    // console
                    this.loading = !this.loading;
                    this.$Message.error('保存失败，请重试!');
                    return false;
                })

            },

            handleView(url) {
                console.info(url);
                this.visible_img_src = url;
                this.visible = true;
            },

            handleThumbRemove(file) {
                const fileList = this.$refs.thumb.fileList;
                this.$refs.thumb.fileList.splice(fileList.indexOf(file), 1);
            },

            handleThumbSuccess(response, file, fileList) {
                file.url = file.response.data.uri;
                file.name = file.response.data.name;
                this.fmData.cover = file.response.data.uri;
            },



            handleFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式错误',
                    desc: '文件 ' + file.name + ' 不正确请重新选择.'
                });
            },
            handleMaxSize(file) {
                this.$Notice.warning({
                    title: '文件太大了',
                    desc: '文件  ' + file.name + ' 太大了，不能超过2M.'
                });
            },
            handleThumbBeforeUpload() {
                const check = this.fmData.uploadCoverList.length < 1;
                if (!check) {
                    this.$Notice.warning({
                        title: '提示信息',
                        desc:'缩略图只能上传1张,要更换请删除重新上传.'
                    });
                }
                return check;
            },

        },

        data() {
            return {

                fmRules: {
                    title: [
                        {required: true, message: '标题不能为空', trigger: 'blur'},
                        {type: 'string', min: 2, message: '至少2个字符', trigger: 'blur'}
                    ],
                    category_id: [
                        {required: true, message: '请选择分类', trigger: 'blur'},
                    ],
                },



                imgName: '',
                visible: false,
                visible_img_src: '',



                is_show_modal: false,
                loading: true,
                searchForm: {
                    keywords: '',
                    page: 1,
                },
                fmData: {
                    description: '',
                    uploadCoverList: [],
                    coverDefaultList: [],
                },
                postStatus: [
                    {
                        id: '',
                        text: '全部',
                    },
                    {
                        id: 1,
                        text: '发布',
                    },
                    {
                        id: 0,
                        text: '隐藏',
                    }
                ],

                columns: [
                    {
                        title: 'ID',
                        key: 'id',
                        width: 80,
                        fixed: 'left'
                    },
                    {
                        title: '分类', key: 'user', width: 120, render: (h, params) => {
                            return h('span', params.row.category.name);
                        }
                    },
                    {
                        title: '图片', key: 'user', width: 120, render: (h, params) => {
                            return h('div', [
                                h('Avatar', {
                                    props: {
                                        src: params.row.cover,
                                        shape: 'square'
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '标题',
                        key: 'title',
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width: 100,
                        render:(h,params) => {
                            return h('Tag', {
                                props: {
                                    color: params.row.status ? 'success':'error'
                                }
                            }, params.row.status ? '发布':'隐藏');
                        }
                    },
                    {
                        title: '排序',
                        key: 'sort',
                    },
                    {
                        title: '提交时间',
                        key: 'created_at',
                        width: 150
                    },
                    {
                        title: '更新时间',
                        key: 'updated_at',
                        width: 150
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.fmData = params.row;

                                            this.fmData.coverDefaultList = [];
                                            this.fmData.coverDefaultList = params.row.uploadCoverList;

                                            setTimeout(() => {
                                                this.fmData.uploadCoverList = this.$refs.thumb.fileList;
                                            }, 200)

                                            this.is_show_modal = true;
                                        }
                                    }
                                }, '编辑'),
                                h('Poptip', {

                                    props: {
                                        confirm: true,
                                        title: '确认要删除',
                                        transfer: true,
                                    },
                                    on: {
                                        'on-ok': () => {
                                            this.$store.dispatch('delBanner', {id: params.row.id}).then(rsp => {
                                                this.getLists();
                                            });
                                        }
                                    }
                                }, [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
                                        }

                                    }, '删除')
                                ])

                            ]);
                        }
                    }
                ]

            }
        }
    }
</script>

<style scoped>

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

    .search-ipt {
        width: 300px;
    }

    .list-tb-right {
        float: right;
        text-align: right;
    }
</style>
