// 定义一个中间件来验证 Token
const jwt = require('jsonwebtoken')

const authMiddleware = async (ctx, next) => {
	// 从请求头部获取 Token
	const token = ctx.headers.authorization.split(' ')[1]

	try {
		// 验证 Token
		const decoded = jwt.verify(token, 'Huangzeming')

		// 将用户信息保存在 ctx.state 中，以便其他中间件可以访问它
		ctx.state.user = decoded

		// 执行下一个中间件
		await next()
	} catch (err) {
		// 如果 Token 无效，返回错误响应
		ctx.status = 401
		ctx.body = { error: 'Invalid Token' }
	}
}
module.exports = authMiddleware