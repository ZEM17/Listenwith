const jwt = require('jsonwebtoken')
const SECRETKEY = require('../config')
router.prefix('/verify') // 路径前缀
router.post('/', function (ctx) {
	const { token } = ctx.request.body || ''
	try {
		const decoded = jwt.verify(token, SECRETKEY)
		ctx.body = {
			flag: true,
		}
		next()
	} catch (error) {
		ctx.body = {
			flag: false,
		} 
		next()
	}
})
module.exports = router
