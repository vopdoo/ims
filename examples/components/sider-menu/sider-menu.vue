<template>
    <div :class="prefixCls">
        <ul>
            <MenuNode
                    v-for="(item, i) in stateTree"
                    :key="i"
                    :data="item"
                    :trigger="trigger"
                    :children-key="childrenKey">
            </MenuNode>
        </ul>

    </div>
</template>

<script>
    import MenuNode from './menu-node.vue';

    const prefixCls = 'ims-sider-menu';
    export default {
        name: "SiderMenu",
        components: {MenuNode},
        props: {
            trigger: {
                type: String,
                default: 'click'
            },
            data: {
                type: Array,
                default() {
                    return [];
                }
            },
            childrenKey: {
                type: String,
                default: 'children'
            },

        },
        data() {
            return {
                prefixCls: prefixCls,
                stateTree: this.data,
                menuTrigger: 'click',
                flatState: [],
            }
        },
        watch: {
            data: {
                deep: true,
                handler() {
                    this.stateTree = this.data;
                    this.flatState = this.compileFlatState();
                }
            }
        },
        methods: {

            compileFlatState() { // so we have always a relation parent/children of each node
                let keyCounter = 0;
                let childrenKey = this.childrenKey;
                const flatTree = [];

                function flattenChildren(node, parent) {
                    node.nodeKey = keyCounter++;
                    flatTree[node.nodeKey] = {node: node, nodeKey: node.nodeKey};
                    if (typeof parent != 'undefined') {
                        flatTree[node.nodeKey].parent = parent.nodeKey;
                        flatTree[parent.nodeKey][childrenKey].push(node.nodeKey);
                    }

                    if (node[childrenKey]) {
                        flatTree[node.nodeKey][childrenKey] = [];
                        node[childrenKey].forEach(child => flattenChildren(child, node));
                    }
                }

                this.stateTree.forEach(rootNode => {
                    flattenChildren(rootNode);
                });
                return flatTree;
            },

            handleSelect(nodeKey) {
                console.info(nodeKey);
                const node = this.flatState[nodeKey].node;
                const currentSelectedKey = this.flatState.findIndex(obj => obj.node.selected);
                if (currentSelectedKey >= 0 && currentSelectedKey !== nodeKey) this.$set(this.flatState[currentSelectedKey].node, 'selected', false);
                if (!(node[this.childrenKey] && node[this.childrenKey].length)) this.$set(node, 'selected', !node.selected);
                console.info(node);
                this.$emit('on-select-change', node);
            },
        },
        created() {
            this.flatState = this.compileFlatState();
        },
        mounted() {
            this.$on('on-selected', this.handleSelect);
            // console.info('on-selected');
        }
    }
</script>

<style lang="less">
    .ims-sider-menu {
        overflow-y: auto;
        overflow-x: hidden;
        user-select: none;
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            font-size: 14px;

            li {
                list-style: none;
                line-height: 40px;
                box-sizing: border-box;
                display: inline-block;
                width: 100%;
                /*padding: 8px;*/
                .ims-sider-menu-icon {
                    margin-right: 5px;
                    font-size: 16px;
                }

                white-space: nowrap;
                outline: 0;

                ul {
                    margin: 0;
                    /*padding: 0 0 0 5px;*/
                }
            }
        }

    }
</style>
