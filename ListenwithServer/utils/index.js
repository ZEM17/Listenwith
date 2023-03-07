const axios = require('axios')
const cheerio = require('cheerio')
const mp3Duration = require('mp3-duration')
async function getMp3Length(mp3Url) {
	// 通过axios获取MP3文件内容
	const response = await axios.get(mp3Url, { responseType: 'arraybuffer' })
	// 解析MP3文件并获取其长度
	const duration = await new Promise((resolve, reject) => {
		mp3Duration(response.data, (err, duration) => {
			if (err) {
				reject(err)
			} else {
				resolve(duration)
			}
		})
	})

	return duration
}
async function getSong(songId) {
	const url = `https://music.163.com/song?id=${songId}`

	// 发送 GET 请求获取页面内容
	const response = await axios.get(url, {
		headers: {
			Referer: 'https://music.163.com/',
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
		},
	})

	// 解析页面内容获取元素内容
	const $ = cheerio.load(response.data)
	const songName = $('.tit > em').text()
	const coverUrl = $('img.j-img').attr('src')
	return { songName, coverUrl }
}

module.exports = {
	getMp3Length,
	getSong,
}
// // 使用示例
// getMp3Length('http://example.com/song.mp3')
// 	.then((duration) => {
// 		console.log('Song duration:', duration)
// 	})
// 	.catch((err) => {
// 		console.error('Error:', err)
// 	})
