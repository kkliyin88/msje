<template>
  <div class="pop-wrap">
    <transition name="cover">
      <div v-if="show" class="cover">
        <img v-if="pagetag=='page1'&&type=='200'" src='@/assets/image/pop/beijing1.png' />
		<img v-if="pagetag=='page1'&&type=='201'" src='@/assets/image/pop/beijing2.png' />
		<img v-if="pagetag=='page2'&&type=='200'" src='@/assets/image/pop/beijing3.png' />
		<img v-if="pagetag=='page2'&&type=='201'" src='@/assets/image/pop/beijing3.png' />
      </div>
    </transition>
	
    <transition name="content" >
      <div v-if="show" class="pop-container">
		  <template > <!-- page2 200 -->
		       <div v-if="pagetag=='page1'&&type=='201'" class='pop1'>
		  		<div class='box'>
		  			<ul>
		  				<li @click.stop="goToDetails('TA040351','802-005237')"></li> <!-- 生产 -->
		  				<li @click.stop="goToDetails('KA040113','802-004467')"></li>
		  			</ul>
		  		</div>
		  	 </div>
		  </template>
		  <template > <!-- page2 200 -->
		       <div v-if="pagetag=='page2'&&type=='200'" class='pop3'>
		  		 <div class='gouse'>
		  			 <span @click=''></span>
		  		 </div>
		  		 <div class='close'>
		  			 <span @click="close" ></span>
		  		 </div>
		  	 </div>
		  </template>
		  <template > <!-- page2 200 -->
		       <div v-if="pagetag=='page2'&&type=='201'" class='pop3'>
		  		 <div class='gouse'>
		  			 <span @click='gotocouponList'></span>
		  		 </div>
		  		 <div class='close'>
		  			 <span @click="close" ></span>
		  		 </div>
		  	 </div>
		  </template>
      </div>
    </transition>
  </div>
</template>

<script>
import { Toast} from 'vant';
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },
    pagetag: {
      type: String,
	  default: 'page1'
    },
  },
mounted(){
  console.log('type',this.type)
},
  methods: {
    close () {
		console.log('关闭弹窗');
        this.$emit('closePop');
    },
	gotocouponList(){
		 wx.miniProgram.navigateTo({url:'/pages/usercenter/coupon?itemSelect=1'});
	},
    getservice(){
      wx.miniProgram.navigateTo({url:'/pages/webview'});
    },
    goToDetails(commodityNo,goodsNo){
		let msg= 'commodityNo:'+ commodityNo +'  ' + 'goodsNo:' + goodsNo
		 this.$toast(msg);
          wx.miniProgram.navigateTo({url:'/pages/commodity/detail?commodityNo=' + commodityNo + '&goodsNo=' + goodsNo});
    },  //https://m.purcotton.com/wap/detail/002000003575/P3403G037.html
  }
}
</script>
<style scoped lang="less" src='./popup.less' ></style>
<style scoped >
.pop-wrap {
  z-index: 1000;
}
.wrap{
	/* position: relative; */
	width:95vw;
	height: 90vw;
	
}
.img_box{
	position: relative;
	text-align: center;
}
.content_box{
	position: absolute;
	top: 29%;
	text-align: center;
	height: 15px;
	line-height: 15px;
}
.link_box{
	position: absolute;
	bottom: 8vw;
	height: 40vw;
	width: 94vw;
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.abox{
		width: 40vw;
	}
	
.abox a{
	display: block;
	width: 100%;
	height: 100%;
}
/* .close{
	width: 32px;
	height: 32px;
	display: inline-block;
	margin-top: 40px;
} */
.pop-container {
/*  position: fixed;
  width: 100%;
  padding: 0 3vw;
  box-sizing: border-box;
  left: 0;
  top: 30vh; */
}
.cover {
  position: fixed;
 /* width: 100%;
  height: 100%; */
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .4);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
</style>
