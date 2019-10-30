import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

import demo from '@/components/demo'
import img from '@/components/common/img'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  { path: '/img',name:'img', component: img, hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  },
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
	 {
		    path: '/system',
		    component: Layout,
		    meta: { perm:'m:sys', title: '系统', icon: 'chart' },
		    children: [
		      {
		        path: 'user_manage',
		        name: 'user_manage',
		        component: _import('_system/user/index'),
		        meta: { perm: 'm:sys:user', title: '用户管理', icon: 'chart', noCache: true }
		      },
		      {
		          path: 'branch_manage',
		          name: 'branch_manage',
		          component: _import('_system/branch/index'),
		          meta: { perm: 'm:sys:branch', title: '机构管理', icon: 'chart', noCache: true },
		        },
		      {
		        path: 'role_manage',
		        name: 'role_manage',
		        component: _import('_system/role/index'),
		        meta: { perm: 'm:sys:role', title: '角色管理', icon: 'chart', noCache: true },
		      },
		      {
		        hidden: true,
		        path: 'role_manage/:roleId/assign_perm',
		        name: 'role_manage_assign_perm',
		        component: _import('_system/role/assign_perm'),
		        meta: { hiddenTag: true , title: '角色授权'},
		      },
		      {
		          path: 'perm_manage',
		          name: 'perm_manage',
		          component: _import('_system/perm/index'),
		          meta: { perm: 'm:sys:perm', title: '权限管理', icon: 'chart', noCache: true }

		        },
		    ]
		  },
  {
    path: '/test',
    component: Layout,
    children: [
        {
            path: 'test',
            component: _import('components/Test'),
            name: 'test',
            meta: { perm:'m:test', title: '测试页面', icon: 'icon', noCache: true }
        },
    ]
},
]
