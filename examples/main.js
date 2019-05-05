import Vue from 'vue'
import App from './App.vue'


import store from './store/index'
import './plugins/iview.js'
import router from './router'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
