<script setup>
import Chat from '../components/Chat.vue'
import MusicPlayer from '../components/MusicPlayer.vue'
import Option from '../components/Option.vue'
import io from 'socket.io-client'
const isOption = ref(false)
const socket = ref(null)
const music = ref(null)
function toggleOption() {
	isOption.value = !isOption.value
	console.log(isOption.value)
}
function initSocket() {
	const token = localStorage.getItem('token')
	socket.value = io('http://120.78.138.159:3000/', {
		transports: ['websocket'],
		cors: true,
		query: { token },
	})
	socket.value.on('message', (data) => {
		console.log(data)
	})
	socket.value.on('fail', (data) => {
		console.log(data)
	})
	socket.value.on('disconnect', function () {
		console.log('Disconnected from server')
	})
}
initSocket()
</script>

<template>
	<div class="home-container">
		<div class="home-box">
			<MusicPlayer :socket="socket"></MusicPlayer>
			<Chat :toggleOption="toggleOption" :socket="socket"></Chat>
		</div>
		<Option v-if="isOption"></Option>
	</div>
</template>

<style>
.home-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: #f2f2f2;
}
.home-box {
	width: 80%;
	height: 86%;
	background-color: #fff;
	border-radius: 6px;
	display: flex;
	overflow: hidden;
	box-shadow: 1px 1px 10px 2px #888888;
}
</style>
