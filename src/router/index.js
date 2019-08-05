import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from "@/components/Login";
import Register from "@/components/Register"
import Successful from "@/components/Successful"
import Page from "@/components/Page"



Vue.use(Router)

const router =new Router({
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path :"/",component:Login
    },
    {
      path :"/register",component:Register
    },
    {
      path :"/successful",
      meta:{
        auth:true
      },
      component:Successful
    },
    {
      path :"/page",component:Page
    },
    
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) { //权限判断
    if (localStorage.getItem('token')) { //读取token值
    //  成功
      next()
    } else {
      next({path:'/'})
    }
  } else {
    // 没有meta.auth 不用管
    next()
  }
});

export default router;