const Koa = require('koa')
const app = new Koa()
const users = require('./routes/users')
const test = require('./routes/test')
const getData = require('./routes/getData')
const http = require('http')
const socket = require('./socket')
const bodyParser = require('koa-bodyparser')
const server = http.createServer(app.callback())

app.use(bodyParser())
//router
app.use(users.routes(), users.allowedMethods())
app.use(test.routes(), test.allowedMethods())
app.use(getData.routes(), getData.allowedMethods())

socket.attach(server)
server.listen(3000, () => {
	console.log('running at http://localhost:3000/')
})
