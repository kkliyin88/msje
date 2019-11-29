import Vue from 'vue'
import axios from 'axios'//引入axios 方便访问接口

import wx from 'weixin-js-sdk'

import VueLazyload from 'vue-lazyload' //引入图片懒加载

Vue.prototype.$http = axios;
Vue.prototype.$wx = wx;

Vue.use(VueLazyload);



