import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const RouterMap = [{
    path: '/',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: () => import('@/views/Layout'),
    redirect: '/default',
    children: [{
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/Setting')
      },
      {
        path: '/chat-room/',
        name: 'chatRoom',
        component: () => import('@/views/ChatRoom'),
      },
      {
        path: '/personal-info-page',
        name: 'personalInfoPage',
        component: () => import('@/views/PersonalInfoPage'),
      },
      {
        path: '/group-info-page',
        name: 'groupInfoPage',
        component: () => import('@/views/GroupInfoPage'),
      },
      {
        path: '/default',
        name: 'default',
        component: () => import('@/views/DefaultPage')
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    component: () => import('@/views/404')
  }
]

const router = new Router({
  linkActiveClass: 'active',
  routes: [...RouterMap],
})

export default router
