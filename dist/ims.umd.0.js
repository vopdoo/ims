((typeof self !== 'undefined' ? self : this)["webpackJsonpims"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpims"] || []).push([[0],{

/***/ "2ae0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0c67ec4e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/iview-loader??ref--0-2!./examples/views/Dashboard.vue?vue&type=template&id=05437c2d&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dashboard"},[_vm._v("\n    vvvv\n    "),_c('div',{staticStyle:{"height":"2000px","border":"none"}},[_vm._v("\n       vvssdf\n    ")])])}]


// CONCATENATED MODULE: ./examples/views/Dashboard.vue?vue&type=template&id=05437c2d&scoped=true&

// EXTERNAL MODULE: ./node_modules/vue-grid-layout/dist/vue-grid-layout.common.js
var vue_grid_layout_common = __webpack_require__("7be8");
var vue_grid_layout_common_default = /*#__PURE__*/__webpack_require__.n(vue_grid_layout_common);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/iview-loader??ref--0-2!./examples/views/Dashboard.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Dashboardvue_type_script_lang_js_ = ({
    name: "Dashboard",
    components: {VueGridLayout: vue_grid_layout_common_default.a},
    async created() {
        await this.$store.dispatch('login/loginInfo', {});
        await this.$store.dispatch('system/changeSpining',{spining:false});
    },
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
});

// CONCATENATED MODULE: ./examples/views/Dashboard.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Dashboardvue_type_script_lang_js_ = (Dashboardvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./examples/views/Dashboard.vue?vue&type=style&index=0&id=05437c2d&lang=less&scoped=true&
var Dashboardvue_type_style_index_0_id_05437c2d_lang_less_scoped_true_ = __webpack_require__("dbe2");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./examples/views/Dashboard.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_Dashboardvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "05437c2d",
  null
  
)

/* harmony default export */ var Dashboard = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "ca99":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "dbe2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_iview_loader_index_js_ref_0_2_Dashboard_vue_vue_type_style_index_0_id_05437c2d_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ca99");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_iview_loader_index_js_ref_0_2_Dashboard_vue_vue_type_style_index_0_id_05437c2d_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_iview_loader_index_js_ref_0_2_Dashboard_vue_vue_type_style_index_0_id_05437c2d_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_css_loader_index_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_node_modules_iview_loader_index_js_ref_0_2_Dashboard_vue_vue_type_style_index_0_id_05437c2d_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

}]);
//# sourceMappingURL=ims.umd.0.js.map