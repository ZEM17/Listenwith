import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
	{
		name: 'home',
		path: '/home',
		meta: {
			title: 'Enjoy!',
			requireAuth: true,
		},
		component: () => import('../views/Home.vue'),
	},
	{
		name: 'login',
		path: '/login',
		meta: {
			title: '登录',
		},
		component: () => import('../views/Login.vue'),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token')
	if (to.meta.requireAuth) {
		// 判断该路由是否需要登录权限
		if (token) {
			// 已登录
			console.log(token)
			next()
		} else {
			// 未登录
			ElNotification({
				message: '请先登录！',
				type: 'error',
			})
			next({
				path: '/login',
				query: { redirect: to.fullPath }, // 将要跳转的路由 path 作为参数，登录成功后跳转到该路由
			})
		}
	} else {
		// 不需要登录权限的路由直接放行
		next()
	}
})

export default router
