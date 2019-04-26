((typeof self !== 'undefined' ? self : this)["webpackJsonpims"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpims"] || []).push([[11],{

/***/ "a55b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"0c67ec4e-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/iview-loader??ref--0-2!./src/views/Login.vue?vue&type=template&id=7e4720e8&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.classes},[_c('div',{class:_vm.wrapClasses,attrs:{"id":"login-fm"}},[_c('div',{class:_vm.headerClasses},[_c('h1',[_vm._v(_vm._s(_vm.title))]),_c('p',[_vm._v(_vm._s(_vm.slogan))])]),_c('div',{class:_vm.bodyClasses},[_c('Form',{ref:"loginForm",staticClass:"login-form",attrs:{"model":_vm.loginForm,"rules":_vm.ruleValidate}},[_c('FormItem',{attrs:{"prop":"account"}},[_c('Input',{attrs:{"element-id":"account","prefix":"ios-contact","placeholder":"账号/邮箱/手机号"},model:{value:(_vm.loginForm.account),callback:function ($$v) {_vm.$set(_vm.loginForm, "account", $$v)},expression:"loginForm.account"}})],1),_c('FormItem',{attrs:{"prop":"password"}},[_c('Input',{attrs:{"element-id":"password","type":_vm.passwordInputType,"prefix":"ios-unlock","icon":_vm.passwordInputSuffixIcon,"placeholder":"密码"},on:{"on-click":_vm.showPwd},model:{value:(_vm.loginForm.password),callback:function ($$v) {_vm.$set(_vm.loginForm, "password", $$v)},expression:"loginForm.password"}})],1),_c('FormItem',[_c('Tooltip',{attrs:{"content":"请勿在公共场所使用","placement":"right"}},[_c('Checkbox',{model:{value:(_vm.loginForm.rememb),callback:function ($$v) {_vm.$set(_vm.loginForm, "rememb", $$v)},expression:"loginForm.rememb"}},[_vm._v("记住密码")])],1),_c('Tooltip',{class:_vm.forgetPasswordClasses,attrs:{"placement":"right","content":"忘记密码请联系管理员"}},[_c('span',[_vm._v(" 忘记密码？ ")])])],1),_c('FormItem',[_c('Button',{attrs:{"type":"success","loading":_vm.logining,"long":""},on:{"click":function($event){return _vm.login('loginForm')}}},[_vm._v("登录")])],1)],1)],1)]),(_vm.spinShow)?_c('Spin',{attrs:{"size":"large","fix":""}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/Login.vue?vue&type=template&id=7e4720e8&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("3b8d");

// EXTERNAL MODULE: ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js
var objectSpread = __webpack_require__("cebc");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./node_modules/lodash/lodash.js
var lodash = __webpack_require__("2ef0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./node_modules/iview-loader??ref--0-2!./src/views/Login.vue?vue&type=script&lang=js&




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


 // console.info(_.now());

var prefixCls = 'ims-login';
/* harmony default export */ var Loginvue_type_script_lang_js_ = ({
  name: "Login",
  computed: Object(objectSpread["a" /* default */])({
    classes: function classes() {
      return ["".concat(prefixCls)];
    },
    wrapClasses: function wrapClasses() {
      return ["".concat(prefixCls, "-wrap"), {}];
    },
    headerClasses: function headerClasses() {
      return "".concat(prefixCls, "-header");
    },
    bodyClasses: function bodyClasses() {
      return "".concat(prefixCls, "-body");
    },
    forgetPasswordClasses: function forgetPasswordClasses() {
      return "".concat(prefixCls, "-forget-password");
    }
  }, Object(vuex_esm["c" /* mapGetters */])({
    'title': 'login/title',
    'slogan': 'login/slogan',
    'logining': 'login/logining',
    'is_logined': 'login/is_logined',
    'routers': 'login/routers'
  })),
  created: function () {
    var _created = Object(asyncToGenerator["a" /* default */])(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.$store.dispatch('login/loginInfo', {});

            case 2:
              this.spinShow = false;

            case 3:
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
  data: function data() {
    return {
      spinShow: true,
      loading: false,
      passwordInputType: 'password',
      passwordInputSuffixIcon: 'md-eye',
      loginForm: {
        account: 'cw001@163.com',
        password: '123456',
        rememb: false
      },
      ruleValidate: {
        account: [{
          required: true,
          message: '请输入登录账号',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入登录密码',
          trigger: 'blur'
        }]
      }
    };
  },
  methods: Object(objectSpread["a" /* default */])({}, Object(vuex_esm["b" /* mapActions */])('db', ['database']), {
    showPwd: function showPwd() {
      if (this.passwordInputType == 'password') {
        this.passwordInputType = 'text';
        this.passwordInputSuffixIcon = 'md-eye-off';
      } else {
        this.passwordInputType = 'password';
        this.passwordInputSuffixIcon = 'md-eye';
      }
    },
    login: function login(name) {
      var _this = this;

      this.$refs[name].validate(function (valid) {
        if (valid) {
          _this.$store.dispatch('login/login', _this.loginForm).then(function () {
            if (_this.is_logined) {
              _this.$router.addRoutes(_this.routers.concat([{
                path: '*',
                redirect: '/404'
              }])); // sessionStorage.setItem('test','vvvv');


              _this.$router.push('/admin');
            } else {
              _this.$Message.error('账号或密码错误!');
            }
          }).catch(function (error) {
            _this.$Message.error('登录失败请重新登录!'); // console.info('catch -- error',error);

          });
        } else {// this.$Message.error('请正确输入账号密码');
        }
      });
    }
  })
});
// CONCATENATED MODULE: ./src/views/Login.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_Loginvue_type_script_lang_js_ = (Loginvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/Login.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  views_Loginvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Login = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=ims.umd.11.js.map