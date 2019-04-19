<template>
    <div class="dashboard">

        <Table width="550" border :columns="columns2" :data="data3"></Table>

        <div style="height: 2000px;border: none;">
            <grid-layout
                    :layout="testLayout"
                    :col-num="12"
                    :row-height="30"
                    :is-draggable="true"
                    :is-resizable="false"
                    :is-mirrored="false"
                    :vertical-compact="true"
                    :margin="[5, 5]"
                    :use-css-transforms="true"
            >

                <grid-item v-for="item in testLayout"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                           :i="item.i">
                    {{item.i}}
                </grid-item>
            </grid-layout>
        </div>

    </div>
</template>

<script>
    import VueGridLayout from 'vue-grid-layout';

    export default {
        name: "Dashboard",
        components: {VueGridLayout},
        data() {
            return {
                testLayout: [
                    {"x": 0, "y": 0, "w": 4, "h": 2, "i": "0"},
                    {"x": 2, "y": 0, "w": 4, "h": 4, "i": "1"},
                    {"x": 4, "y": 0, "w": 2, "h": 5, "i": "2"},
                    {"x": 6, "y": 0, "w": 2, "h": 3, "i": "3"},
                    {"x": 8, "y": 0, "w": 2, "h": 3, "i": "4"},
                    // {"x": 10, "y": 0, "w": 2, "h": 3, "i": "5"},
                    // {"x": 0, "y": 5, "w": 2, "h": 5, "i": "6"},
                    // {"x": 2, "y": 5, "w": 2, "h": 5, "i": "7"},
                    // {"x": 4, "y": 5, "w": 2, "h": 5, "i": "8"},
                    // {"x": 6, "y": 4, "w": 2, "h": 4, "i": "9"},
                    // {"x": 8, "y": 4, "w": 2, "h": 4, "i": "10"},
                    // {"x": 10, "y": 4, "w": 2, "h": 4, "i": "11"},
                    // {"x": 0, "y": 10, "w": 2, "h": 5, "i": "12"},
                    // {"x": 2, "y": 10, "w": 2, "h": 5, "i": "13"},
                    // {"x": 4, "y": 8, "w": 2, "h": 4, "i": "14"},
                    // {"x": 6, "y": 8, "w": 2, "h": 4, "i": "15"},
                    // {"x": 8, "y": 10, "w": 2, "h": 5, "i": "16"},
                    // {"x": 10, "y": 4, "w": 2, "h": 2, "i": "17"},
                    // {"x": 0, "y": 9, "w": 2, "h": 3, "i": "18"},
                    // {"x": 2, "y": 6, "w": 2, "h": 2, "i": "19"}
                ],
                poptions: {
                    modifiers: {
                        arrow: {
                            enabled: false
                        }
                    }
                },
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        }
    }
</script>

<style lang="less" scoped>

    .vue-grid-item {
        background: #ccc;
        border: 1px solid black;
    }

</style>
