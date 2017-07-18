import Vue from 'vue'
import Router from 'vue-router'
import Republish from '@/components/Republish'
import Operation from '@/components/Operation'
import UserInfo from '@/components/UserInfo'
import BlackList from '@/components/BlackList'
import DeleteList from '@/components/DeleteList'
import AllList from '@/components/AllList'
import Analytics from '@/components/Analytics'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Republish',
      component: Republish
    },
    {
      path: '/operation',
      name: 'Operation',
      component: Operation,
      children: [
        {
          path: '/operation/:openid',
          name: 'UserInfo',
          component: UserInfo
        }
      ]
    },
    {
      path: '/blacklist',
      name: 'BlackList',
      component: BlackList
    },
    {
      path: '/deletelist',
      name: 'DeleteList',
      component: DeleteList
    },
    {
      path: '/alllist',
      name: 'AllList',
      component: AllList
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: Analytics
    }
  ]
})
