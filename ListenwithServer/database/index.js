const mysql = require('mysql')
const mysqlConfig = {
	host: 'localhost',
	user: 'root',
	password: 'k0d&I/%.pdu>',
	database: 'Listenwith',
}

const getMessages = function () {
	return new Promise((resolve, reject) => {
		const connection = mysql.createConnection(mysqlConfig)
		connection.query(
			'SELECT * FROM messages ORDER BY time DESC LIMIT 5',
			(error, results) => {
				if (error) {
					console.error(error)
					reject()
					connection.end()
				} else {
					resolve(results)
					connection.end()
				}
			}
		)
	})
}

const insertMessage = function (message) {
	return new Promise((resolve, reject) => {
		const connection = mysql.createConnection(mysqlConfig)
		const sql = 'INSERT INTO messages SET ?'
		connection.query(sql, message, (err, result) => {
			if (err) {
				console.error(err)
				reject()
				connection.end()
			} else {
				resolve(result)
				connection.end()
			}
		})
	})
}
const getMusic = function () {
	return new Promise((resolve, reject) => {
		const connection = mysql.createConnection(mysqlConfig)
		const sql = 'SELECT * FROM music'
		connection.query(sql, (err, result) => {
			if (err) {
				console.error(err)
				reject()
				connection.end()
			} else {
				resolve(result)
				connection.end()
			}
		})
	})
}

const changeMusic = function (music) {
	return new Promise((resolve, reject) => {
		const connection = mysql.createConnection(mysqlConfig)
		const sql = "UPDATE music SET ?"
		connection.query(sql, music ,(err, result) => {
			if (err) {
				console.error(err)
				reject()
				connection.end()
			} else {
				resolve(result)
				connection.end()
			}
		})
	})
}
module.exports = { getMessages, insertMessage, getMusic, changeMusic }
