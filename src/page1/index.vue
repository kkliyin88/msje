<template>
  <div class='wrap'>
	<div class='pagebg'>
	<img src='@/assets/image/beijing.png'  />
	</div>
	 <div class='container1 '>
		<ul>
			<li class='li1' >
				<div class='btn_wrap'>
					<div class='btn'>
						0元兑换
					</div>
				</div>
			</li>
			<li class='li2' >
				<div class='btn_wrap'>
					<div class='btn'>
						99元兑换
					</div>
				</div>
			</li>
		</ul>
		<div class='text_wrap'>
			<div class='text'>
				无门槛兑换,同一用户 收货人每款礼包限兑1次
				全场选购满99元包邮,未满邮费用户需要自费8元邮费
			</div>
		</div>
		<div class='title_wrap'>
			<div class='text'>
				登录/注册 领取兑换券
			</div>
		</div>
		<div class='input_wrap'>
			<div class='input1'>
				<input v-model="phone" placeholder="请输入手机号" />
			</div>
		</div>
	
		 <div class="agreement-wrap clearfix">
			  <a href="javascript:;" v-bind:class="getAgreeClassObject" id="agreeBtn"  @click="getAgreeBtn" v-bind:data-agree="getRegstAgreeNum"></a>
			  <a :href="userRegisterProtocolLink" class="agree-link">同意<span class="green">《全棉时代用户注册协议》</span></a>
		</div>
		<div class='input_wrap'>
			<div class='input3'>
				一键Get超值礼包 >
			</div>
		</div>
	 </div>
	 <div class='contain2'>
		 <p>兑换平台:全棉时代官方商城(app/小程序/微信商城/PC官网)</p>
		 <p>如您页面信息有异常,请联系在线客服,我们会尽快调整</p>
		 <p>联系方式:400-608-1000</p>
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
	  userRegisterProtocolLink: 'https://m.purcotton.com/wap/user_register_protocol.html',
      phone:'',
	  returnNumber:'',
	  getRegstAgreeNum: "1",//同意协议
	  getAgreeClassObject: { "agree-img": true, agree: true, unagree: false },
	  userRegisterProtocolLink: 'https://m.purcotton.com/wap/user_register_protocol.html',
	  getSubmitRegstClassObject: { "submit-btn": true, gray: false },
	  submitBtnNum: "1",
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
      //是否同意协议
    getAgreeBtn() {
      if (this.getAgreeClassObject.agree == true) {
        this.getAgreeClassObject.agree = false;
        this.getAgreeClassObject.unagree = true;
        this.getRegstAgreeNum = "0";
      } else if (this.getAgreeClassObject.agree == false) {
        this.getAgreeClassObject.agree = true;
        this.getAgreeClassObject.unagree = false;
        this.getRegstAgreeNum = "1";
      }
    },
  }
}
</script>
<style lang="less" scoped  src='./index.less'> </style>
