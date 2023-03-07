const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const SECRETKEY = require('../config')
const { getMessages } = require('../database')
router.prefix('/data') // 路径前缀

//路由token验证
router.use(async (ctx, next) => {
	const authHeader = ctx.headers.authorization
	if (!authHeader) {
		ctx.status = 401
		ctx.body = 'Unauthorized'
		return
	}

	const token = authHeader.replace('Bearer ', '')
	try {
		const decoded = jwt.verify(token, SECRETKEY)
		ctx.state.user = decoded
	} catch (err) {
		ctx.status = 401
		ctx.body = 'Unauthorized'
		return
	}

	await next()
})

router.get('/messages', async (ctx) => {
	const res = await getMessages()
	ctx.body = res
})

module.exports = router
