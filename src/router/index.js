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
    meta: { title: '登录' },
    component: () => import('../views/login/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: '注册' },
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
        meta: { title: '员工信息' },
        component: () => import('../views/user/user_info.vue'),
      },
      {
        path: '/user_manage',
        name: 'user_manage',
        meta: { title: '员工信息' },
        component: () => import('../views/user/user_manage.vue'),
      },
      {
        path: '/echart',
        name: 'echart',
        meta: { title: '图形数据' },
        component: () => import('../views/echarts/Echart.vue'),
      },
      {
        path: '/uinfo',
        name: 'uinfo',
        meta: { title: '个人中心' },
        component: () => import('../views/info/Uinfo.vue'),
      },
      {
        path: '/ainfo',
        name: 'ainfo',
        meta: { title: '个人中心' },
        component: () => import('../views/info/Ainfo.vue'),
      },
      {
        path: '/calendar',
        name: 'calendar',
        meta: { title: '打卡签到' },
        component: () => import('../views/daka/Calendar.vue'),
      },
      {
        path: '/uholiday',
        name: 'uholiday',
        meta: { title: '请假审批' },
        component: () => import('../views/qingjia/Uholiday.vue'),
      },
      {
        path: '/aholiday',
        name: 'aholiday',
        meta: { title: '请假审批' },
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

router.afterEach((to) => {
  document.title = `${to.meta.title || ''} - ${process.env.VUE_APP_TITLE}`
})

// 跳转相同路由
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}

export default router
