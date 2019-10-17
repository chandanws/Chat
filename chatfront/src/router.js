import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: () => import('@/views/Login')
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: () => import('@/views/Layout'),
      children: [{
          path: '/notice',
          name: 'notice',
          component: () => import('@/views/Notice')
        },
        {
          path: '/friends-group',
          name: 'friends-group-router',
          components: {
            asideFriendsGroupRouter: () => ('@/views/AsideFriendsGroup'),
            asideShowRouter: () => {
              '@/views/AsideShow'
            }
          }
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('@/views/Setting')
        }
      ]
    },
    {
      path: '*',
      redirect: '/404',
      component: () => import('@/views/404')
    }
  ]
})
