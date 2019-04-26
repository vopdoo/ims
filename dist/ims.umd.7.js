((typeof self !== 'undefined' ? self : this)["webpackJsonpims"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpims"] || []).push([[7],{

/***/ "51a3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0c67ec4e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/iview-loader??ref--0-2!./examples/views/systems/departments.vue?vue&type=template&id=2c555a70&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Row',{attrs:{"gutter":32}},[_c('Col',{attrs:{"span":"20"}},[_vm._v("\n             \n        ")]),_c('Col',{staticClass:"list-tlbr",attrs:{"span":"4"}},[_c('Button',{attrs:{"type":"success"},on:{"click":function($event){return _vm.addTopMenu()}}},[_vm._v("增加顶级部门")])],1)],1),_c('Tree',{attrs:{"data":_vm.nodes,"render":_vm.renderContent}}),_c('Modal',{attrs:{"title":_vm.title,"loading":_vm.loading,"class-name":"ce-modal","mask-closable":false,"scrollable":true},on:{"on-ok":_vm.saveMenu,"on-cancel":_vm.cancelAddMenu},model:{value:(_vm.is_add_menuing),callback:function ($$v) {_vm.is_add_menuing=$$v},expression:"is_add_menuing"}},[_c('Form',{ref:"menuFm",attrs:{"model":_vm.menuFm,"label-position":"top","rules":_vm.menuFmRules}},[_c('FormItem',{attrs:{"label":"类型","prop":"type"}},[_c('Select',{attrs:{"placeholder":"类型"},on:{"on-change":_vm.typeChange},model:{value:(_vm.menuFm.type),callback:function ($$v) {_vm.$set(_vm.menuFm, "type", $$v)},expression:"menuFm.type"}},_vm._l((_vm.typeList),function(item){return _c('Option',{key:item.value,attrs:{"value":item.value}},[_vm._v(_vm._s(item.label))])}),1)],1),_c('FormItem',{attrs:{"label":"名称"}},[_c('Input',{attrs:{"placeholder":"名称"},model:{value:(_vm.menuFm.name),callback:function ($$v) {_vm.$set(_vm.menuFm, "name", $$v)},expression:"menuFm.name"}})],1),_c('FormItem',{attrs:{"label":"标识"}},[_c('Input',{attrs:{"placeholder":"标识"},model:{value:(_vm.menuFm.code),callback:function ($$v) {_vm.$set(_vm.menuFm, "code", $$v)},expression:"menuFm.code"}})],1),_c('FormItem',{attrs:{"label":"角色"}},[_c('Select',{attrs:{"multiple":"","placeholder":"请选择角色"},model:{value:(_vm.menuFm.role_ids),callback:function ($$v) {_vm.$set(_vm.menuFm, "role_ids", $$v)},expression:"menuFm.role_ids"}},_vm._l((_vm.roles.data),function(item){return _c('Option',{key:item.id,attrs:{"value":item.id}},[_vm._v("\n                        "+_vm._s(item.name)+"\n                    ")])}),1)],1),(_vm.menuFm.type == 1)?_c('div',[_c('FormItem',{attrs:{"label":"路由名称"}},[_c('Input',{attrs:{"placeholder":"路由名称"},model:{value:(_vm.menuFm.options.name),callback:function ($$v) {_vm.$set(_vm.menuFm.options, "name", $$v)},expression:"menuFm.options.name"}})],1),_c('FormItem',{attrs:{"label":"路由路径"}},[_c('Input',{attrs:{"placeholder":"路由路径"},model:{value:(_vm.menuFm.options.path),callback:function ($$v) {_vm.$set(_vm.menuFm.options, "path", $$v)},expression:"menuFm.options.path"}})],1)],1):_vm._e(),_c('FormItem',{attrs:{"label":"图标"}},[_c('Input',{attrs:{"placeholder":"图标"},model:{value:(_vm.menuFm.icon),callback:function ($$v) {_vm.$set(_vm.menuFm, "icon", $$v)},expression:"menuFm.icon"}})],1),_c('FormItem',{attrs:{"label":"排序"}},[_c('InputNumber',{attrs:{"max":9999,"min":0,"placeholder":"排序值 越小越靠前"},model:{value:(_vm.menuFm.sort),callback:function ($$v) {_vm.$set(_vm.menuFm, "sort", $$v)},expression:"menuFm.sort"}})],1),_c('Alert',{attrs:{"closable":""}},[_vm._v(_vm._s(_vm.menuFm))])],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./examples/views/systems/departments.vue?vue&type=template&id=2c555a70&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/iview-loader??ref--0-2!./examples/views/systems/departments.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var departmentsvue_type_script_lang_js_ = ({
    name: 'Departments',
    async created() {
        await this.$store.dispatch('department/lists', {is_show_tree: 1});
        await this.$store.dispatch('role/lists', {status: 1, per_page: 100});
        await this.$store.dispatch('system/changeSpining',{spining:false});
    },
    computed: {
        ...Object(vuex_esm["c" /* mapGetters */])({
            nodes: 'department/nodes',
            roles: 'role/lists',
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
                role_ids: [],
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
        createNode(data) {
            this.menuFm.pid = data.pid;
            if (data.pid > 0) {
                // 子节点
                if (data.type == 1) {
                    this.menuFm.type = 3;
                } else if (data.type == 2) {
                    this.menuFm.type = 1;
                }
            } else {
                // 根节点
                this.menuFm.type = 2;
            }
            this.title = '增加节点';
            this.is_add_menuing = true;
        },
        editNode(data) {
            this.title = '编辑节点';
            this.menuFm = {
                name: data.name,
                code: data.code,
                type: data.type,
                options: data.options,
                icon: data.icon,
                sort: 0,
                pid: data.pid,
                role_ids: data.role_ids,
                id: data.id
            };
            this.is_add_menuing = true;
        },
        renderContent(h, {root, node, data}) {
            let roleTags = [];
            data.roles.forEach((item) => {
                roleTags.push(h('Tag', item.name));
            });
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
                            type: data.icon,
                            color: this.getNodeTag(data.type)
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', data.name),

                    h('span', {
                        style: {
                            marginLeft: '6px'
                        }
                    }, roleTags),


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
                                // this.menuFm.pid = data.id;
                                // this.menuFm.type = 2;
                                // this.createNode(data.id, data.type);
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
        saveMenu() {
            this.$refs['menuFm'].validate((valid) => {
                if (valid) {
                    // this.$Message.success('Success!');
                    this.loading = !this.loading;
                    let action = 'department/create';
                    if (this.menuFm.id && this.menuFm.id > 0) action = 'department/edit';
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
            this.$store.dispatch('department/delete', {id: data.id}).then(rsp => {
                // this.$store.dispatch('getMenus');
                // const parentKey = root.find(el => el === node).parent;
                // const parent = root.find(el => el.nodeKey === parentKey).node;
                // const index = parent.children.indexOf(data);
                // parent.children.splice(index, 1);
            })
        }
    }
});

// CONCATENATED MODULE: ./examples/views/systems/departments.vue?vue&type=script&lang=js&
 /* harmony default export */ var systems_departmentsvue_type_script_lang_js_ = (departmentsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./examples/views/systems/departments.vue?vue&type=style&index=0&lang=less&
var departmentsvue_type_style_index_0_lang_less_ = __webpack_require__("5864");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./examples/views/systems/departments.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  systems_departmentsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var departments = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "52ab":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "5864":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_iview_loader_index_js_ref_0_2_departments_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("52ab");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_iview_loader_index_js_ref_0_2_departments_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_iview_loader_index_js_ref_0_2_departments_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_iview_loader_index_js_ref_0_2_departments_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

}]);
//# sourceMappingURL=ims.umd.7.js.map