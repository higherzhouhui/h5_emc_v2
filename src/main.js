import Vue from 'vue'
import App from './app'
import router from './routers/index'
import Store from './store/store'

import VueSwiper from 'vue-awesome-swiper'
Vue.use(VueSwiper)

import './style/index'
// var API = require('./urls');
import API from './common/urls'
Vue.prototype.API = API;

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import lottie from 'vue-lottie'
Vue.component('lottie',lottie)

import toastReg from './components/toast/toast_js'
Vue.use(toastReg);

import toastLoginFn from './components/toast_login/toast_login_js'
Vue.use(toastLoginFn);

import toastTopReg from './components/toast_top/toast_top_js'
Vue.use(toastTopReg);

import quickDepositPop from './components/quickDepositToast/quick_deposit_toast_js'
Vue.use(quickDepositPop);

import VueLazyload from 'vue-lazyload'
//  VueLazyload配置项
Vue.use(VueLazyload, {
  preLoad: 1.3,                 // 预载高度比例
//   error: 'static/images/home-banner-lazy.jpg',     // 加载失败图片
//   loading: 'static/images/home-banner-lazy.jpg',   // 加载中
  attempt: 1
})

// 全局配置 fingerprint 需要时可打开
// import { fpjsPlugin } from '@fingerprintjs/fingerprintjs-pro-vue-v2'
// const apiKey = 'pbDgmfPENJO53RBwOkxp'
// Vue.use(fpjsPlugin, {
//   loadOptions: {
//     apiKey,
//   },
// })

import Func from './common/commonFunc'
Vue.use(Func);
import ServerAPI from './common/server-api'
import ServerAPI_fb from './common/server-api-fb'

//文字垂直滚动走马灯
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

        // var ServerAPI = require('../../api/server-api')
Vue.prototype.ServerAPI = ServerAPI;
Vue.prototype.ServerAPI_fb = ServerAPI_fb;

new Vue({
  el: '#app',
  store: Store,
  router,
  template: '<App/>',
  components: { App }
})



