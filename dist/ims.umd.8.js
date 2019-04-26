((typeof self !== 'undefined' ? self : this)["webpackJsonpims"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpims"] || []).push([[8],{

/***/ "26f99":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_iview_loader_index_js_ref_0_2_nodes_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c0b7");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_iview_loader_index_js_ref_0_2_nodes_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_iview_loader_index_js_ref_0_2_nodes_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_iview_loader_index_js_ref_0_2_nodes_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5730":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0c67ec4e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/iview-loader??ref--0-2!./src/views/systems/nodes.vue?vue&type=template&id=4f8e77a9&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('Row',{attrs:{"gutter":32}},[_c('Col',{attrs:{"span":"20"}},[_vm._v("\n             \n        ")]),_c('Col',{staticClass:"list-tlbr",attrs:{"span":"4"}},[_c('Button',{attrs:{"type":"success"},on:{"click":_vm.addTopMenu}},[_vm._v("增加顶级节点")])],1)],1),_c('Tree',{attrs:{"data":_vm.nodes,"render":_vm.renderContent}}),_c('Modal',{attrs:{"title":_vm.title,"loading":_vm.loading,"class-name":"ce-modal","mask-closable":false,"scrollable":true},on:{"on-ok":_vm.saveMenu,"on-cancel":_vm.cancelAddMenu},model:{value:(_vm.is_add_menuing),callback:function ($$v) {_vm.is_add_menuing=$$v},expression:"is_add_menuing"}},[_c('Form',{ref:"menuFm",attrs:{"model":_vm.menuFm,"label-position":"top","rules":_vm.menuFmRules}},[_c('FormItem',{attrs:{"label":"类型","prop":"type"}},[_c('Select',{attrs:{"placeholder":"类型"},on:{"on-change":_vm.typeChange},model:{value:(_vm.menuFm.type),callback:function ($$v) {_vm.$set(_vm.menuFm, "type", $$v)},expression:"menuFm.type"}},_vm._l((_vm.typeList),function(item){return _c('Option',{key:item.value,attrs:{"value":item.value}},[_vm._v(_vm._s(item.label))])}),1)],1),_c('FormItem',{attrs:{"label":"名称"}},[_c('Input',{attrs:{"placeholder":"名称"},model:{value:(_vm.menuFm.name),callback:function ($$v) {_vm.$set(_vm.menuFm, "name", $$v)},expression:"menuFm.name"}})],1),_c('FormItem',{attrs:{"label":"标识"}},[_c('Input',{attrs:{"placeholder":"标识"},model:{value:(_vm.menuFm.code),callback:function ($$v) {_vm.$set(_vm.menuFm, "code", $$v)},expression:"menuFm.code"}})],1),(_vm.menuFm.type == 1)?_c('div',[_c('FormItem',{attrs:{"label":"路由名称"}},[_c('Input',{attrs:{"placeholder":"路由名称"},model:{value:(_vm.menuFm.options.name),callback:function ($$v) {_vm.$set(_vm.menuFm.options, "name", $$v)},expression:"menuFm.options.name"}})],1),_c('FormItem',{attrs:{"label":"路由路径"}},[_c('Input',{attrs:{"placeholder":"路由路径"},model:{value:(_vm.menuFm.options.path),callback:function ($$v) {_vm.$set(_vm.menuFm.options, "path", $$v)},expression:"menuFm.options.path"}})],1)],1):_vm._e(),_c('FormItem',{attrs:{"label":"图标"}},[_c('Input',{attrs:{"placeholder":"图标"},model:{value:(_vm.menuFm.icon),callback:function ($$v) {_vm.$set(_vm.menuFm, "icon", $$v)},expression:"menuFm.icon"}})],1),_c('FormItem',{attrs:{"label":"排序"}},[_c('InputNumber',{attrs:{"max":9999,"min":0,"placeholder":"排序值 越小越靠前"},model:{value:(_vm.menuFm.sort),callback:function ($$v) {_vm.$set(_vm.menuFm, "sort", $$v)},expression:"menuFm.sort"}})],1),_c('Alert',{attrs:{"closable":""}},[_vm._v(_vm._s(_vm.menuFm))])],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/systems/nodes.vue?vue&type=template&id=4f8e77a9&

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/core-js/object/assign.js
var object_assign = __webpack_require__("5176");
var assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__("cebc");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("3b8d");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/iview-loader??ref--0-2!./src/views/systems/nodes.vue?vue&type=script&lang=js&





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
 // import store from '@/store/index';

/* harmony default export */ var nodesvue_type_script_lang_js_ = ({
  name: 'Node',
  created: function () {
    var _created = Object(asyncToGenerator["a" /* default */])(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.$store.dispatch('node/lists', {
                is_show_tree: 1
              });

            case 2:
              _context.next = 4;
              return this.$store.dispatch('system/changeSpining', {
                spining: false
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _created.apply(this, arguments);
    }

    return created;
  }(),
  computed: Object(objectSpread["a" /* default */])({}, Object(vuex_esm["c" /* mapGetters */])({
    nodes: 'node/nodes'
  })),
  data: function data() {
    var _this = this;

    var validateCode = function validateCode(rule, value, callback) {
      if (!value) {
        return callback(new Error('值不能为空'));
      }

      var validateFieldRequest = {
        type: rule.field,
        value: value,
        id: _this.menuFm.id
      };

      _this.$store.dispatch('validateCode', validateFieldRequest).then(function (result) {
        if (result) {
          callback(new Error('已经存在了，请重新输入！'));
        } else {
          callback();
        }
      });
    };

    return {
      title: '增加节点',
      typeList: [{
        value: 1,
        label: '页面'
      }, {
        value: 2,
        label: '菜单'
      }, {
        value: 3,
        label: '操作'
      }],
      menuFm: {
        name: '',
        code: '',
        type: 1,
        options: {
          tree_path: '0'
        },
        icon: 'md-apps',
        sort: 0,
        pid: 0
      },
      loading: true,
      menuFmRules: {
        name: [{
          required: true,
          message: '菜单名称不能为空',
          trigger: 'blur'
        }, {
          type: 'string',
          min: 2,
          message: '至少2个字符',
          trigger: 'blur'
        }],
        // type: [
        //     {required: true, message: '类型必须选择', trigger: 'blur'},
        // ],
        code: [{
          required: true,
          message: '节点标识不能为空',
          trigger: 'blur'
        }, {
          type: 'string',
          min: 2,
          message: '至少2个字符',
          trigger: 'blur'
        }, {
          validator: validateCode,
          trigger: 'blur'
        }],
        sort: [{
          required: false,
          type: 'integer',
          message: '排序只能是数字',
          trigger: 'blur'
        }]
      },
      is_add_menuing: false,
      buttonProps: {
        size: 'small'
      }
    };
  },
  methods: {
    getNodeTag: function getNodeTag(type) {
      if (type == 1) {
        return '#2d8cf0';
      } else if (type == 2) {
        return '#19be6b';
      } else {
        return '#f90';
      }
    },
    typeChange: function typeChange(option) {
      console.info(option);
    },
    initFmData: function initFmData() {
      this.menuFm = {
        name: '',
        code: '',
        type: 1,
        options: {
          tree_path: '0'
        },
        icon: 'md-apps',
        sort: 0,
        pid: 0
      };
    },
    createNode: function createNode(data) {
      console.info(data.id);

      if (data.id) {
        console.info('zi  node');
        this.menuFm.pid = data.id;

        if (data.pid === 0) {
          // 一级节点
          this.menuFm.options.tree_path = "".concat(data.id);
        } else {
          this.menuFm.options.tree_path = "".concat(data.options.tree_path, ",").concat(data.id);
        }
      } else {
        // add top node
        console.info('add Top Node');
        this.menuFm.type = 2; // 一般情况为菜单
      } // this.menuFm.pid = data.id;
      // if (data.pid > 0) {
      //     // 子节点
      //     this.menuFm.options.tree_path = `${data.options.tree_path},${data.id}`;
      //     if (data.type == 1) {
      //         this.menuFm.type = 3;
      //     } else if (data.type == 2) {
      //         this.menuFm.type = 1;
      //     }
      // } else {
      //     // 根节点
      //     this.menuFm.options.tree_path = `${data.id}`;
      //     this.menuFm.type = 2;
      // }


      this.title = '增加节点';
      this.is_add_menuing = true;
    },
    editNode: function editNode(data) {
      this.title = '编辑节点';
      this.menuFm = {
        name: data.name,
        code: data.code,
        type: data.type,
        options: data.options,
        icon: data.icon,
        sort: 0,
        pid: data.pid,
        id: data.id
      };
      this.is_add_menuing = true;
    },
    renderContent: function renderContent(h, _ref) {
      var _this2 = this;

      var root = _ref.root,
          node = _ref.node,
          data = _ref.data;
      // console.info(data);
      data.expand = true; // console.info(data.children);

      return h('span', {
        class: {
          'menus-span': true
        },
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [h('span', [h('Icon', {
        props: {
          type: data.icon,
          color: this.getNodeTag(data.type)
        },
        style: {
          marginRight: '8px'
        }
      }), h('span', data.name)]), h('span', {
        style: {
          display: 'inline-block',
          float: 'right',
          marginRight: '16px'
        }
      }, [h('Button', {
        props: assign_default()({}, this.buttonProps, {
          icon: 'ios-add',
          disabled: data.type == 3
        }),
        style: {
          marginRight: '8px'
        },
        on: {
          click: function click() {
            _this2.createNode(data);
          }
        }
      }), h('Button', {
        props: assign_default()({}, this.buttonProps, {
          icon: 'ios-create-outline'
        }),
        style: {
          marginRight: '8px'
        },
        on: {
          click: function click() {
            _this2.editNode(data);
          }
        }
      }), h('Poptip', {
        props: {
          confirm: true,
          title: '确认要删除',
          transfer: true
        },
        on: {
          'on-ok': function onOk() {
            _this2.remove(root, node, data);
          }
        }
      }, [h('Button', {
        props: assign_default()({}, this.buttonProps, {
          icon: 'ios-remove',
          disabled: data.children && true
        })
      })])])]);
    },
    addTopMenu: function addTopMenu() {
      this.initFmData();
      this.createNode(this.menuFm);
    },
    cancelAddMenu: function cancelAddMenu() {
      this.initFmData();
    },
    saveMenu: function saveMenu() {
      var _this3 = this;

      this.$refs['menuFm'].validate(function (valid) {
        if (valid) {
          // this.$Message.success('Success!');
          _this3.loading = !_this3.loading;
          var action = 'node/create';
          if (_this3.menuFm.id && _this3.menuFm.id > 0) action = 'node/edit';

          _this3.$store.dispatch(action, _this3.menuFm).then(function (rsp) {
            _this3.loading = !_this3.loading;

            _this3.cancelAddMenu();

            _this3.is_add_menuing = false;
          }).catch(function (rsp) {
            _this3.loading = !_this3.loading;

            _this3.$Message.error('保存失败，请重试!');

            return false;
          });
        } else {
          _this3.loading = !_this3.loading;
          return false;
        }
      });
    },
    append: function append(data) {
      var children = data.children || [];
      children.push({
        title: 'appended node',
        expand: true
      });
      this.$set(data, 'children', children);
    },
    remove: function remove(root, node, data) {
      this.$store.dispatch('node/delete', {
        id: data.id
      }).then(function (rsp) {// this.$store.dispatch('getMenus');
        // const parentKey = root.find(el => el === node).parent;
        // const parent = root.find(el => el.nodeKey === parentKey).node;
        // const index = parent.children.indexOf(data);
        // parent.children.splice(index, 1);
      });
    }
  }
});
// CONCATENATED MODULE: ./src/views/systems/nodes.vue?vue&type=script&lang=js&
 /* harmony default export */ var systems_nodesvue_type_script_lang_js_ = (nodesvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/systems/nodes.vue?vue&type=style&index=0&lang=less&
var nodesvue_type_style_index_0_lang_less_ = __webpack_require__("26f99");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/systems/nodes.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  systems_nodesvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var nodes = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "c0b7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=ims.umd.8.js.map