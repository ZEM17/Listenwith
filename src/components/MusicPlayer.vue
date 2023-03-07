<script>
export default {
	data() {
		return {
			searchVal: '',
			isPlaying: false,
			rotate: false,
			music: {
				cover: '',
				name: '',
				length: 0,
				current: 0,
				isPlaying: false,
				url: '',
			},
		}
	},
	props: ['socket'],
	methods: {
		togglePlay() {
			this.music.isPlaying = !this.music.isPlaying
			this.rotate = !this.rotate
			if (this.music.isPlaying) {
				this.$refs.audio.currentTime = this.music.current
				this.$refs.audio.play()
			} else {
				this.$refs.audio.pause()
			}
		},
	},
	mounted() {
		this.socket.on('musicInfo', (data) => {
			console.log(data)
			this.music = data
			this.$refs.playerCoverPic.style.backgroundImage = `url('${data.cover}')`
			this.$refs.audio.src = data.url
		})
		this.socket.emit('musicGet', { id: '1340439829' })
		
	},
}
</script>

<template>
	<div class="player">
		<audio src="" ref="audio"></audio>
		<div class="player-header">
			<div class="player-search">
				<el-input v-model="searchVal">
					<template #prefix>
						<el-icon><search /></el-icon>
					</template>
				</el-input>
			</div>
		</div>
		<div class="player-cover">
			<div
				class="player-cover-pic"
				:class="{ rotate }"
				ref="playerCoverPic"
			></div>
			<div></div>
		</div>
		<div class="player-name">{{ this.music.name }}</div>
		<div class="player-playBtns">
			<div id="play-btn">
				<el-icon v-if="!music.isPlaying" @click="togglePlay"><VideoPlay /></el-icon>
				<el-icon v-if="music.isPlaying" @click="togglePlay"><VideoPause /></el-icon>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.player {
	width: 30%;
	height: 100%;
	background-color: rgb(150, 150, 150);
	.player-header {
		height: 24%;
		width: 100%;
		// background-color: red;
		.player-search {
			padding: 20px;
		}
	}
	.player-cover {
		width: 100%;
		height: 40%;
		margin-top: -50px;
		margin-bottom: -16px;
		display: flex;
		justify-content: center;
		align-items: center;
		.player-cover-pic {
			background-image: url('');
			background-size: cover;
			height: 200px;
			width: 200px;
			border-radius: 50%;
		}
	}
	.player-name {
		width: 100%;
		height: 6%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
	}
	.player-playBtns {
		width: 100%;
		height: 38%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: -50px;
	}
}
#play-btn {
	height: 70px;
	width: 70px;
	font-size: 70px;
	background-color: transparent;
	border: none;
	color: #e8e4e4;
}
#play-btn:hover {
	cursor: pointer;
}
#play-btn:active {
	color: #a6a6a6;
}

@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
.rotate {
	animation: rotate 10s linear infinite;
}
</style>
