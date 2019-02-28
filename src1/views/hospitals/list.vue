<template>
    <Card dis-hover :bordered="false" title="医院列表">
        <Row type="flex" justify="space-between" align="top">
            <Col span="20">
            <Form ref="searchForm" :model="searchForm" inline>

                <FormItem>
                    <Select v-model="searchForm.level" placeholder="医院等级">
                        <Option v-for="item in hospital_levels.data" :value="item.id" :key="item.id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Input search  v-model="searchForm.kw" @on-search="handleSearch('searchForm')" placeholder="名称/地址/电话" />
                </FormItem>

            </Form>
            </Col>
            <Col span="4" class="list-tb-right">
            <Button  @click="showAddModal()">添加</Button>
            </Col>
        </Row>

        <Table border :columns="columns" :data="hospitals.data"></Table>
        <Row type="flex" style="margin-top: 10px;">
            <Col span="8">

            </Col>
            <Col span="16" class="list-tb-right">
            <!--:page-size="hospitals.meta.per_page"-->
            <Page :total="hospitals.meta.total" @on-change="changePage"  :current="1"></Page>
            </Col>
        </Row>

        <Modal
                v-model="is_show_modal"
                title="增加医院"
                :loading="loading"
                @on-ok="save"
                @on-cancel="cancelAddHospital"
        >


            <Form :model="fmData" :label-width="80" ref="fm" :rules="fmRules">

                <FormItem label="名称" prop="name">
                    <Input v-model="fmData.name" :disabled="is_view_detail" placeholder="名称"/>
                </FormItem>
                <FormItem label="等级" prop="level">
                    <Select v-model="fmData.level" :disabled="is_view_detail">
                        <Option v-for="item in levels" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="电话">
                    <Input v-model="fmData.tel" :disabled="is_view_detail" placeholder="联系电话"/>
                </FormItem>
                <FormItem label="排序">
                    <InputNumber :max="9999" :min="0" :disabled="is_view_detail" v-model="fmData.sort" />
                </FormItem>
                <FormItem label="地址" prop="address">
                    <Input v-model="fmData.address" :disabled="is_view_detail" icon="ios-locate-outline" @on-click="showAddrPicker"
                           placeholder="地址"/>
                </FormItem>
                <FormItem label="经度" prop="address">
                    <Input v-model="fmData.lng" :disabled="is_view_detail" placeholder="经度" />
                </FormItem>
                <FormItem label="纬度" prop="address">
                    <Input v-model="fmData.lat" :disabled="is_view_detail" placeholder="纬度"/>
                </FormItem>
                <FormItem label="图片" prop="thumb">
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
                            <Icon type="camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="View Image" v-model="visible">
                        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible"
                             style="width: 100%">
                    </Modal>
                </FormItem>


                <div>
                    {{ fmData }}
                </div>

            </Form>
        </Modal>

        <Modal
                v-model="is_show_addr_picker_modal"
                title="选取医院地址"


        >
            <div id="qmap-container" style="width:500px; height:300px"></div>

            <div slot="footer" style="text-align: center;">
                {{fmData.address}}
            </div>
        </Modal>

    </Card>
</template>


<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: "hospital",
        computed: {
            ...mapGetters([
                'hospitals',
                'hospital_levels',
            ])
        },
        mounted() {
            this.getHospitals();
            this.$store.dispatch('getHospitalLevels');
            this.uploadList = this.$refs.upload.fileList;
            this.initQmap();
        },
        methods: {
            changePage(page){
                this.searchForm.page = page;
                this.getHospitals();
            },
            getHospitals() {
                this.$store.dispatch('getHospitals',this.searchForm);
            },
            initQmap() {
                let myLatlng = new qq.maps.LatLng(30.807350, 106.085680);
                let myOptions = {
                    zoom: 13,
                    center: myLatlng,
                    mapTypeId: qq.maps.MapTypeId.ROADMAP
                };
                let map = new qq.maps.Map(document.getElementById("qmap-container"), myOptions);
                let that = this;

                let marker;

                qq.maps.event.addListener(map, 'click', function (event) {
                    map.setCenter(event.latLng);
                    if (marker) {
                        marker.setPosition(event.latLng);
                    } else {
                        marker = new qq.maps.Marker({map: map, position: event.latLng});
                    }
                    that.$store.dispatch('getGeocoder', event.latLng).then(rsp => {
                        that.fmData.lng = rsp.location.lng;
                        that.fmData.lat = rsp.location.lat;
                        that.fmData.address = rsp.address;
                    });
                });
            },
            save() {
                this.$refs['fm'].validate((valid) => {
                    if (valid) {
                        this.loading = !this.loading;
                        let addOrEditAction = 'add';
                        if (this.fmData.id && this.fmData.id > 0) addOrEditAction = 'edit';
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

                levels: [
                    {
                        value: 1,
                        label: '一级甲等'
                    },
                    {
                        value: 2,
                        label: '二级甲等'
                    },
                    {
                        value: 3,
                        label: '三级甲等'
                    },

                ],
                is_show_modal: false,
                loading: true,
                fmData: {
                    name: '',
                    level: '',
                    address: '',
                    sort: 0,
                    thumb: 'aaa',
                    tel: '',
                    lng: '',
                    lat: '',
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
                        width: 80,
                        fixed: 'left'
                    },
                    {
                        title: '名称',
                        key: 'name',
                        width: 200,
                    },
                    {
                        title: '地址',
                        key: 'address',
                        width: 250
                    },
                    {
                        title: '电话',
                        key: 'tel',
                        width: 150
                    },
                    {
                        title: '等级',
                        key: 'city',
                        width: 100
                    },
                    {
                        title: '经度',
                        key: 'lng',
                        width: 120
                    },
                    {
                        title: '纬度',
                        key: 'lat',
                        width: 120
                    },
                    {
                        title: '排序',
                        key: 'province',
                        width: 100
                    },
                    {
                        title: '创建时间',
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
                                            this.is_view_detail = true;
                                            // return false;
                                            this.fmData.name = params.row.name;
                                            this.fmData.address = params.row.address;
                                            this.fmData.sort = params.row.sort;
                                            this.fmData.lng = params.row.lng;
                                            this.fmData.level = params.row.level;
                                            this.fmData.tel = params.row.tel;
                                            this.fmData.id = params.row.id;
                                            this.fmData.lat = params.row.lat;
                                            this.is_show_modal = true;
                                        }
                                    }
                                }, '查看'),
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
                                            this.fmData.address = params.row.address;
                                            this.fmData.sort = params.row.sort;
                                            this.fmData.lng = params.row.lng;
                                            this.fmData.level = params.row.level;
                                            this.fmData.tel = params.row.tel;
                                            this.fmData.id = params.row.id;
                                            this.fmData.lat = params.row.lat;
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
                                            this.$store.dispatch('del',{id:params.row.id}).then(rsp=>{
                                                this.getHospitals();
                                            });
                                            // this.remove(root, node, data)
                                        }
                                    }
                                }, [
                                    h('Button', {
                                        props: {
                                            type: 'text',
                                            size: 'small'
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
