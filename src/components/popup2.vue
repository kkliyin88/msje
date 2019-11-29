<template>
  <div class="pop-wrap">
    <transition name="cover">
      <div v-if="show" class="cover">
       <!-- <img class='clear' src="@/assets/img/clear.png" @click="close()" alt=""> -->
      </div>
    </transition>
    <transition name="content" >
      <div v-if="show" class="pop-container">
        <template > <!-- 来晚了 已领取完 -->
		 <div class='wrap'>
			 <div class='img_box'>
				  <img  src="@/assets/image/pop/pop1.png" width="100%" alt="">
				  
				  <img @click="close" class='close' src='../assets/image/pop/icon-close.png' />
			 </div>
			 <div class='link_box'>
				 <div class='abox'>
					 <a > </a>
				 </div>
				 <div class='abox'>
					 <a > </a>
				 </div>
			 </div>
         
		  </div>
        </template>
     
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },

  },
mounted(){
  console.log('type',this.type)
},
  methods: {
    close () {
      this.$emit('closePop')
    },
    getservice(){
      wx.miniProgram.navigateTo({url:'/pages/webview'});
    },
    goToDetails(commodityNo,goodsNo){
          wx.miniProgram.navigateTo({url:'/pages/commodity/detail?commodityNo=' + commodityNo + '&goodsNo=' + goodsNo});
    },  //https://m.purcotton.com/wap/detail/002000003575/P3403G037.html
  }
}
</script>

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
.close{
	width: 32px;
	height: 32px;
	display: inline-block;
	margin-top: 40px;
}
.pop-container {
  position: fixed;
  width: 100%;
  padding: 0 3vw;
  box-sizing: border-box;
  left: 0;
  top: 30vh;
}
.cover {
  position: fixed;
 width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .4);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-top: 70vh
}




</style>
