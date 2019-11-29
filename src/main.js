// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '@/assets/js/utils.js'//引入公共js
// import 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js'

import { Button,Row, Col ,Field,Popup,Icon,Toast} from 'vant';
Vue.use(Row).use(Col).use(Button).use(Field).use(Popup).use(Icon).use(Toast);
Vue.config.productionTip = false
router.beforeEach((to,form,next) =>{
  if(to.meta.title){
      document.title=to.meta.title
  }
  next();
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
//手机号码验证
Vue.prototype.$validationPhone = function(phone){
    var getMobile = phone;
    var temp = "";
    var myreg = /^0?(13|14|15|16|17|18|19)[0-9]{9}$/;
    if (getMobile.length == 0) {
        return temp = "手机号码不能为空";
    }else if (getMobile.length != 11) {
        return temp = "请输入11位有效的手机号码";
    }else if (!myreg.test(getMobile)) {
        return temp = "请输入有效手机号";
    }else{
        return temp;
    }
};