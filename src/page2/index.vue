<template>
  <div class='wrap'>
	  2222
  </div>
</template>

<script>
import api from '@/axios/api.js';
import { get } from '@/axios/fetch';
import { Toast} from 'vant';
// import Popup from '@/components/popup'
// import './index.css'
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
    this.getUrlParm();
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
     getUrlParm(name){ //获取丁香妈妈的token
        var url = window.location.href;
        var search = url.split('?')[1];
        if(search) search = search.split('=')[1];
        if(search){
          this.token =search.split('').filter((item) =>{
           return item !== '/' && item !== '#'
           }).join('')
        }
    },
    gotoMylist(){
      wx.miniProgram.navigateTo({url:'/pages/order/list'});
    },
    goToDetails(commodityNo,goodsNo){
          wx.miniProgram.navigateTo({url:'/pages/commodity/detail?commodityNo=' + commodityNo + '&goodsNo=' + goodsNo});
    },  //https://m.purcotton.com/wap/detail/002000003575/P3403G037.html
    submitRegst(phoneNum) {
      let tmpeMsg = this.$validationPhone(this.userphone);//手机号码
      let regstAgreeNum = this.getRegstAgreeNum;//同意协议
      	if(tmpeMsg){
      	Toast(tmpeMsg);
        return
      }else if(regstAgreeNum == '0'){
        Toast("请同意全棉时代用户注册协议");
        return
       }
       let url = '/api/member/webpage/register?phone='+phoneNum;
      this.loading = true;
      get(url).then(res => {
        this.loading = false;
        if(res.code=='200'){
          this.account = res.data.account;
          this.callbackphone = res.data.phone.substr(0,3)+ '****' + res.data.phone.substr(-4);
          let getconpontype_url =  '/api/member/find/coupon/receiveDxmm'
          this.getCouponType(getconpontype_url,this.token,this.account)
        }
      }).catch((error)=>{
         this.phoneExit(phoneNum) //号码已经注册
         this.loading = false;
      })
    },
   phoneExit(phoneNum){
       let url = '/api/member/webpage/phone?phone='+ phoneNum;
        this.loading = true;
      get(url).then(res => {
        this.loading = false;
        if(res.code=='200'){
          this.account = res.data.account;
          this.callbackphone = res.data.phone.substr(0,3)+ '****' + res.data.phone.substr(-4);
          let getconpontype_url ='/api/member/find/coupon/receiveDxmm'
          this.getCouponType(getconpontype_url,this.token,this.account)
        }
      }).catch(()=>{
        this.loading = false;
      })
   },
     getCouponType(url,token,account){  //获取优惠券类型
         let query = '?token='+token + '&memberAccount='+account;
         let url1 = url + query
         this.loading = true;
         get(url1).then(res => {
           this.loading = false;
           this.showType = res.code;
           if(this.showType=='201'){  //如果已领取，不弹窗
              this.resultType = 1;
           }
           //如果已领取，不弹窗
           if(this.resultType==0) this.showPop = true;
         }).catch(()=>{
           //网络问题咨询客服
           this.showType=='500';
           this.showPop = true
           this.loading = false;
         })
     },

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
	
