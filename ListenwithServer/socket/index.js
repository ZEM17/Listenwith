const socket = require('socket.io')()
const SECRETKEY = require('../config')
const jwt = require('jsonwebtoken')
const { insertMessage } = require('../database')
const musicSokcet = require('./music')
let socketFlag = true
//权限校验
socket.use((client, next) => {
	const token = client.handshake.query.token
	try {
		const decoded = jwt.verify(token, SECRETKEY)
		client.emit('message', decoded)
		next()
	} catch (error) {
		client.emit('fail', 'token无效,请重新登录')
		socketFlag = false
		next()
	}
})

socket.use((client, next) => {
	if (socketFlag === false) {
		next()
	} else {
		client.emit('message', '连接socket成功')

		//业务逻辑

		//音乐功能
		client.on('musicGet', (data) => {
			musicSokcet(data, client, socket)
		})

		//聊天功能
		client.on('clientToServerChat', (data) => {
			insertMessage(data)
			const clients = Array.from(socket.sockets.sockets.values())
			clients.forEach((item, index) => {
				if (item.id !== client.id) {
					item.emit('ServerToClientChat', data)
				}
			})
		})

		//message测试
		client.on('message', (data) => {
			console.log(data)
		})

		next()
	}
})

module.exports = socket
