<template>
    <div>
        <Row type="flex" justify="space-between" align="top" >
            <Col span="20">
                <slot name="filter"></slot>
            </Col>
            <Col span="4" class="list-tlbr">
                <slot name="actions"></slot>
            </Col>
        </Row>
        <slot name="table"></slot>
        <Row type="flex" style="margin-top: 10px;">
            <Col span="8">
                <slot name="batch-actions"></slot>
            </Col>
            <Col span="16" class="list-tb-right">
                <Page :total="lists.meta.total"
                      show-elevator
                      show-sizer
                      show-total
                      @on-change="handlePageChange"
                      @on-page-size-change="handlePageSizeChange"
                />
            </Col>
        </Row>
    </div>
</template>

<script>
    // import {mapGetters} from 'vuex'
    // import store from '@/store/index';
    // //
    // import TableDatetime from '@/components/table-datetime/index';
    export default {
        name: "ims-curd",
        components: {},
        props: {
            lists: {
                type: Object,
                default() {
                    return {
                        data: [],
                        meta: {
                            total: 100
                        }
                    };
                }
            },
            columns: {
                type: Array,
                default() {
                    return [];
                }
            },
        },
        computed: {
            // ...mapGetters({
            // })
        },
        data() {
            return {
                tblLoading: false,
            }
        },
        methods: {
            handlePageChange(page) {
                console.info('handlePageChange', page);
                this.tblLoading = true;
                this.searchForm.page = page;

                this.tblLoading = false;
            },
            handleSearch() {
                this.tblLoading = true;

                this.tblLoading = false;
            },
            handlePageSizeChange(size) {
                console.info('handlePageSizeChange', size);
            },
        }
    }
</script>
