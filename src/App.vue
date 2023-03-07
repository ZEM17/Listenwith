<script setup>
import request from './request/request'
function login() {
	request
		.post('api/users/login', {
			userName: 'admin',
			userPwd: '123456',
		})
		.then((res) => {
			console.log(res.data.token)
			localStorage.setItem('token', res.data.token)
		})
}
</script>

<template>
	<div class="app-container">
		<router-view></router-view>
	</div>
</template>

<style>
.app-container {
	height: 100vh;
	user-select: none;
}
</style>
