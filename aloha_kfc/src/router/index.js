import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/Address.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('../views/My.vue')
      },

    ]
  },
  {
    path:'/detail/:pid',
    name:'Detail',
    component:()=>import('../views/Detail.vue')
  },
  {
    path:'/cart',
    name:'Cart',
    component:()=>import('../views/Cart.vue')
  },
  {
    path:'/address',
    name:'Address',
    component:()=>import('../views/Address.vue')
  },
  {
    path:'/order',
    name:'Order',
    component:()=>import('../views/Order.vue')
  },
  {
    path:'/allorder',
    name:'AllOrder',
    component:()=>import('../views/AllOrder.vue')
  },
  {
    path:'/search',
    name:'Search',
    component:()=>import('../views/Search.vue')
  },
  {
    path:'/addresslist',
    name:'AddressList',
    component:()=>import('../views/AddressList.vue')
  },
  // 重定向  ⭐
  // * 除了上面已经定义的路径 会自动跳到想要的页面
  {
    path: '*',
    redirect: {
      name: 'Home'
    }
  }
]

const router = new VueRouter({
  routes,
  mode:"history"
})

export default router
