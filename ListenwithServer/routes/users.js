// /routes/demo.js

const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const SECRETKEY = require('../config')
router.prefix('/users') // 路径前缀

router.get('/', function (ctx) {
	// ctx即context，是req(request)和res(response)的集合
	ctx.body = 'this is get demo' // 返回数据
})
router.post('/login', function (ctx) {
	const { userName, userPwd } = ctx.request.body
	if (userName === 'admin'||userName === 'admin2' && userPwd === '123456') {
		const token = jwt.sign({ userName, userPwd }, SECRETKEY, {
			expiresIn: '24h',
		})
		const data = {
			msg: '登录成功',
			token,
			userName,
			userAvatar:'https://i.imgur.com/YQz6dN5.jpg',
			code: 200,
		}
		ctx.body = data
	} else {
		const data = {
			msg: '登录失败，请检查账号和密码',
			code: 40001,
		}
		ctx.body = data
	}
})

module.exports = router
