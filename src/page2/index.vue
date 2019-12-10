<template>
  <div class='wrap'>
	<div v-if='!showPop' class='pagebg'>
		<img src='@/assets/image/page2/beijing.png'  />
	 </div>
	 <div v-if='!showPop' class='container1'>
		 <div  style="position: relative;">
			<div class='img_box'>
				 <img  src='@/assets/image/page2/kuangkuang.png' />
			 </div>
			<div class='content_box'>
				 <div >
					 <img src='@/assets/image/page2/youhuiquan.png' />
				 </div>
				 <div class='tip'>
					 <p>- 输入手机号 领取专享优惠券 -</p>
				 </div>
				 <div class='input_wrap'>
				 	<div class='input1'>
				 		<input v-model="userphone" @blur="onFieldBlur" placeholder="请输入手机号" />
				 	</div>
				 </div>
				 <div class="agreement-wrap clearfix">
				 	  <a href="javascript:;" v-bind:class="getAgreeClassObject" id="agreeBtn"  @click="getAgreeBtn" v-bind:data-agree="getRegstAgreeNum"></a>
				 	  <a :href="userRegisterProtocolLink" class="agree-link">同意<span class="green">《全棉时代用户注册协议》</span></a>
				 </div>
				 <div class='input_wrap'>
					  <van-button v-bind:class="getSubmitRegstClassObject" size='large' text='点击领取 >' @click="phoneExit(userphone)" :loading="loading" id="submitRegst" loading-text="提交中"> </van-button>
				 </div>
				 <div class='text_wrap'>
					<img src='@/assets/image/page2/text.png' />
				 </div>
			 </div>
	    </div>
	 </div>
	 <div v-if='showPop'>
	   <Popup :show='showPop' :type='showType' pagetag='page2' @closePop='() => showPop = false' />
	 </div>
  </div>
</template>
<script>
import api from '@/axios/api.js';
import { get } from '@/axios/fetch';
import Popup from '@/components/popup';
export default {
  data () {
    return {
      baseUrl: process.env.API_ROOT,
      userRegisterProtocolLink: 'https://m.purcotton.com/wap/user_register_protocol.html',
      userphone:'',
      loading:false,
      returnNumber:'',
      getRegstAgreeNum: 1,//同意协议
      getAgreeClassObject: { "agree-img": true, agree: true, unagree: false },
      userRegisterProtocolLink: 'https://m.purcotton.com/wap/user_register_protocol.html',
      getSubmitRegstClassObject: { "submit-btn": true, gray: false },
      submitBtnNum: "1",
      getconpontype_url:'/api/coupon/ruleId',
      couponId:'ZH00062',    
      showPop:false,
      showType: 'null', //弹窗类型
    }
  },
  watch: {//监控输入框输入长度
    userphone() {
      if (this.userphone.length > 11) {
          this.userphone = String(this.userphone).slice(0, 11);
      }
    }
  },
  components: {
     Popup
    },
  mounted() {
	 
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
	 gotoMylist(){
	  wx.miniProgram.navigateTo({url:'/pages/order/list'});
	},
	submitRegst(phoneNum) {
	    let url = '/api/member/webpage/register?phone='+phoneNum+'&registerBelong=guanwang&registerExplain=purcotton-frisoLB';  
	   this.loading = true;
	   get(url).then(res => {
		   console.log('res_submitRegst',res)
	     this.loading = false;
	     if(res.code=='200'){
	       this.account = res.data.account;
	       this.callbackphone = res.data.phone.substr(0,3)+ '****' + res.data.phone.substr(-4);
	       this.getCouponType(this.getconpontype_url,this.account)
	     }else{
			  this.$toast(res.data.message); 
		 }
	   }).catch((err)=>{
		  this.$toast(err.message); 
	      this.loading = false;
	   })
	 },
	phoneExit(phoneNum){
		let tmpeMsg = this.$validationPhone(this.userphone);//手机号码
		let regstAgreeNum = this.getRegstAgreeNum;//同意协议
			if(tmpeMsg){
			this.$toast(tmpeMsg);
		  return
		}else if(regstAgreeNum == '0'){
		  this.$toast("请同意全棉时代用户注册协议");
		  return
		 }
	    let url = '/api/member/webpage/phone?phone='+ phoneNum;  //检查是否为会员
	    this.loading = true;
	   get(url).then(res => {
	     this.loading = false;
	     if(res.code=='200'){
	       this.account = res.data.account;
	       this.getCouponType(this.getconpontype_url,this.account)
	     }else if(res.code=='500'){
			this.submitRegst(phoneNum)
		 }else{
			  this.$toast(res.data.message); 
		 }
	   }).catch((err)=>{
		  this.$toast(err.message); 
	     this.loading = false;
	   })
	},
	 getCouponType(url,account){  //获取优惠券类型
	    let query = '?'+'memberCode='+account +'&ruleId=' + this.couponId;
	    let url1 = url + query
	    this.loading = true;
	    get(url1).then(res => {
	      this.loading = false;
	      this.showType = res.code;
	      if(this.showType=='201' ||this.showType=='200'){ 
	         this.showPop = true;
	      }else{
			  this.$toast(res.data.message); 
		 }
	    }).catch((err)=>{
	      //网络问题咨询客服
		   this.$toast(err.message); 
	      this.loading = false;
	    })
	},
	  //是否同意协议
	getAgreeBtn() {
		console.log('getRegstAgreeNum',this.getRegstAgreeNum)
	  if (this.getAgreeClassObject.agree == true) {
	    this.getAgreeClassObject.agree = false;
	    this.getAgreeClassObject.unagree = true;
	    this.getRegstAgreeNum = 0;
	  } else if (this.getAgreeClassObject.agree == false) {
	    this.getAgreeClassObject.agree = true;
	    this.getAgreeClassObject.unagree = false;
	    this.getRegstAgreeNum = 1;
	  }
	},
	 // 解决ios键盘错位问题
	onFieldBlur(){
	  let browser = {
	      versions: function() {
	          let u = navigator.userAgent;
	          return {
	              ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	          };
	      }()
	  };
	  if(browser.versions.ios){
	    setTimeout(() => {
	      const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
	      window.scrollTo(0, Math.max(scrollHeight - 1, 0))
	    }, 100)
	  }
	},
  }
}
</script>

<style lang="less" scoped src='./index.css'></style>
	
