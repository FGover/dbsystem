import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register/Register.vue'),
  },
  {
    path: '/Main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    redirect: '/echart',
    children: [
      {
        path: '/user_info',
        name: 'user_info',
        component: () => import('../views/user/user_info.vue'),
      },
      {
        path: '/user_manage',
        name: 'user_manage',
        component: () => import('../views/user/user_manage.vue'),
      },
      {
        path: '/echart',
        name: 'echart',
        component: () => import('../views/echarts/Echart.vue'),
      },
      {
        path: '/uinfo',
        name: 'uinfo',
        component: () => import('../views/info/Uinfo.vue'),
      },
      {
        path: '/ainfo',
        name: 'ainfo',
        component: () => import('../views/info/Ainfo.vue'),
      },
      {
        path: '/calendar',
        name: 'calendar',
        component: () => import('../views/daka/Calendar.vue'),
      },
      {
        path: '/uholiday',
        name: 'uholiday',
        component: () => import('../views/qingjia/Uholiday.vue'),
      },
      {
        path: '/aholiday',
        name: 'aholiday',
        component: () => import('../views/qingjia/Aholiday.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    token ? next() : next('/login')
  }
})

export default router

// 跳转相同路由
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}
