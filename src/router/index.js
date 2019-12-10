import Vue from 'vue'
import Router from 'vue-router'
// import INDEX from '@/components/INDEX'
import page1 from '@/page1/index'
import page2 from '@/page2/index'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'page1',
      component: page1,
      meta:{
        title:"全棉时代会员礼包"
      }
    },
	{
	  path: '/page2',
	  name: 'page2',
	  component: page2,
	  meta:{
	    title:"全棉时代会员礼包"
	  }
	},
  ]
})
