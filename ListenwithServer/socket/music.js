const { getMp3Length, getSong } = require('../utils')
const { getMusic, changeMusic } = require('../database')

// getMusic().then((res)=>{
//     console.log(res[0])
// })

async function initMusicObj(id) {
	const musicObj = {
		id,
		url: `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
		name: '',
		cover: '',
		length: null,
		current: 0,
		isPlaying: false,
	}

	await getMp3Length(musicObj.url).then((res) => {
		musicObj.length = Math.floor(res)
	})
	await getSong(id).then((res) => {
		musicObj.name = res.songName
		musicObj.cover = res.coverUrl
	})
	return musicObj
}

async function musicSokcet(data, client, socket) {
	const clients = Array.from(socket.sockets.sockets.values())
	if (clients.length === 1) {
		await initMusicObj(data.id).then((res) => {
            changeMusic(res)
			client.emit('musicInfo', res)
		})
	} else if (clients.length > 1) {
		getMusic().then((res)=>{
            client.emit('musicInfo', res[0])
        })
	}
}

module.exports = musicSokcet
