<script>
import request from '../request/request'
export default {
	data() {
		return {
			form: {
				username: '',
				password: '',
			},
		}
	},
	methods: {
		login() {
			request
				.post('api/users/login', {
					userName: this.form.username,
					userPwd: this.form.password,
				})
				.then((res) => {
					if (res.data.code === 200) {
						localStorage.setItem('token', res.data.token)
						ElNotification({
							message: res.data.msg,
							type: 'success',
						})
						this.$store.dispatch('changeCurrentUser',res.data.userName)
						this.$store.dispatch('changeCurrentUserAvatar',res.data.userAvatar)
                        this.$router.push('/home')
					} else {
						ElNotification({
							message: res.data.msg,
							type: 'error',
						})
					}
				})
		},
	},
	mounted() {
	}
}
</script>

<template>
	<div class="login-container">
		<el-form class="login-form" :model="form" label-width="80px">
			<el-row class="login-title">
				<el-col :span="24" class="title-text"> 登录 </el-col>
			</el-row>
			<el-form-item label="用户名" prop="username">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="form.password" type="password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="login">登录</el-button>
				<el-button type="primary">注册</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<style>
.login-title {
	margin-top: 20px;
	margin-bottom: 50px;
	text-align: center;
}
.title-text {
	font-size: 24px;
	font-weight: bold;
}
.login-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
.login-form {
	width: 400px;
	background-color: #fff;
	border-radius: 5px;
	padding: 20px;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
</style>
