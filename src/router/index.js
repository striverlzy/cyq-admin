import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/label',
  //   name: '首页',
  //   hidden: true,
  //   children: [{
  //     path: 'label',
  //     component: () => import('@/views/dashboard/index')
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    name: '标签',
    redirect: '/label',
    children: [
      {
        path: '/label',
        name: 'label',
        component: () => import('@/views/table/label'),
        meta: {title: '标签管理', icon: 'tree'}
      }
    ]
  },

  {
    path: '/gathering',
    component: Layout,
    children: [
      {
        path: '/gathering',
        name: '活动',
        component: () => import('@/views/table/gathering'),
        meta: {title: '活动管理', icon: 'nested'}
      }
    ]
  },

  {
    path: '/question',
    component: Layout,
    children: [
      {
        path: '/question',
        name: 'Form',
        component: () => import('@/views/table/question'),
        meta: {title: '问答管理', icon: 'form'}
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    name: 'user',
    children: [
      {
        path: '/user', name: 'user',
        component: () => import('@/views/table/user'),
        meta: {title: '用户管理', icon: 'user'},
      }
    ]
  },

  {
    path: '/article',
    component: Layout,
    name: '活动',

    children: [
      { path: '/article', name: 'article', component: () => import('@/views/table/article'), meta: { title: '文章审核', icon: 'eye' }}
    ]
  },
  {
    path: '/echarts',
    component: Layout,
    name: 'echarts',

    children: [
      { path: 'echarts', name: 'echarts', component: () => import('@/views/echarts'), meta: { title: '统计分析', icon: 'example' }},
    ]
  },


  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
