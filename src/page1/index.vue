<template>
  <div class='wrap'>
	<div class='pagebg'>
	<img src='../assets/image/beijing.png'  />
	</div>
	 <div class='container1 '>
		333333
	 </div>
  </div>
</template>
<script>
import api from '@/axios/api.js';
import { get } from '@/axios/fetch';
import { Toast} from 'vant';

export default {
  data () {
    return {
      baseUrl: process.env.API_ROOT,
      
    }
  },
  watch: {//监控输入框输入长度
    userphone() {
      if (this.userphone.length > 11) {
          this.userphone = String(this.userphone).slice(0, 11);
      }
    }
  },
  created(){

  },
  components: {
     
    },
  mounted() {
    
    //隐藏分享功能
    wx.hideMenuItems({
      menuList: []
    });
     //这里监听键盘收起，然后滚动顶部;
    document.body.addEventListener('focusout', () => {
      //软键盘收起的事件处理
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('iphone') > 0 || ua.indexOf('ipad') > 0) {  //键盘收齐页面空白问题
        document.body.scrollTop = document.body.scrollHeight;
      }
    });
  },
  methods:{
    
  }
}
</script>
<style lang="less" scoped  src='./index.less'> </style>
