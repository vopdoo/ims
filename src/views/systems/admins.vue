<template>
    <div>
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
            </template>
            <TableDatetime  slot-scope="{ row, index }" :datetime="row.created_at" slot="created_at" style="width: 500px;" />
            <TableDatetime  slot-scope="{ row, index }" :datetime="row.updated_at" slot="updated_at" />
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
                        <FormItem label="邮箱">
                            <Input v-model="fmData.email" placeholder="邮箱"/>
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
                <FormItem label="备注">
                    <Input type="textarea" v-model="fmData.remark" :rows="4"
                           placeholder="备注"/>
                </FormItem>
                <Alert closable>{{fmData}}</Alert>
            </Form>
        </Modal>
    </div>


</template>
<script>
    import {mapGetters} from 'vuex'
    import store from '../../store/index';

    import TableDatetime from '@/components/table-datetime/index';

    export default {
        name: 'Admin',
        components: {
            TableDatetime,
        },
        async beforeRouteEnter(to, from, next) {
            await store.dispatch('admin/lists', {is_show_tree: 1});
            next();
        },
        computed: {
            ...mapGetters({
                admins: 'admin/admins',
                statusList: 'admin/statusList',
                columns: 'admin/columns',
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
                passwordInputType: 'password',
                passwordInputSuffixIcon: 'md-eye',
                fmData: {
                    name: '',
                    nick_name: '',
                    email: '',
                    status: true,
                },
                hasceing: false,
                cetitle: '增加用户',
                celoading: false,
                tblLoading: false,
                searchForm: {
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
            initFmData() {
                this.fmData = {
                    name: '',
                    nick_name: '',
                    email: '',
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
                console.info('handleCeOk', this.fmData);
                let action = this.fmData.id ? 'admin/edit' : 'admin/create';
                console.info(action);
                await this.$store.dispatch(action, this.fmData);
                this.celoading = false;
                // this.hasceing = true;
            },
            handleCeCancel() {
                console.info('handleCeCancel');
                this.initFmData();
            },
            handleCreate() {
                console.info('handleCreate');

                this.hasceing = !this.hasceing;
            },
            async handlePageChange(page) {
                this.tblLoading = true;
                console.info('handlePageChange', page);
                await this.$store.dispatch('admin/lists', {page: page});
                this.tblLoading = false;
            },
            async handleSearch() {
                console.info('handleSearch');
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
            handleEdit(row, index) {
                console.info('handleEdit', row, index);
                this.fmData = row;
                this.hasceing = true;
                // this.editName = row.name;
                // this.editAge = row.age;
                // this.editAddress = row.address;
                // this.editBirthday = row.birthday;
                // this.editIndex = index;
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

</style>
