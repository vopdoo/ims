((typeof self !== 'undefined' ? self : this)["webpackJsonpims"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpims"] || []).push([[1],{

/***/ "1d78":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0c67ec4e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/iview-loader??ref--0-2!./examples/views/admin.vue?vue&type=template&id=7913eb8d&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('ImsLayout',{attrs:{"menus":_vm.nav_menus}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./examples/views/admin.vue?vue&type=template&id=7913eb8d&

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/iview-loader??ref--0-2!./examples/views/admin.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//




/* harmony default export */ var adminvue_type_script_lang_js_ = ({
    name: "Admin",
    // async
    // beforeRouteEnter(to, from, next) {
    //     console.info('admin beforeRouteEnter');
    //     // await store.dispatch('admin/getNavMenus',{a:'aa'});
    //     next();
    // },
    async created() {
        // this.$Spin.show();
        await this.$store.dispatch('admin/getNavMenus', {});
        // setTimeout(() => {
        //     this.$Spin.hide();
        // }, 3000);
    },
    computed: {
        ...Object(vuex_esm["c" /* mapGetters */])({
            'nav_menus': 'admin/nav_menus',
        })
    },
    data() {
        return {
        }
    }
});

// CONCATENATED MODULE: ./examples/views/admin.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_adminvue_type_script_lang_js_ = (adminvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./examples/views/admin.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_adminvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var admin = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=ims.common.1.js.map