const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const SECRETKEY = 'Huangzeming'

router.prefix('/test') // 路径前缀

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
router.get('/protected', async (ctx) => {
	ctx.body = `Hello`
})
module.exports = router