<script>
import ChatMessage from './ChatMessage.vue'
import { nanoid } from 'nanoid'
import { getTime } from '../utils'
import { mapState } from 'vuex'
import request from '../request/request'
export default {
	components: {
		ChatMessage,
	},
	props: ['toggleOption', 'socket'],
	data() {
		return {
			messages: [],
			inputVal: '',
		}
	},
	computed: {
		...mapState({
			currentUser: (state) => state.currentUser,
			currentUserAvatar: (state) => state.currentUserAvatar,
		}),
	},
	methods: {
		scrollToBottom() {
			this.$refs.scrollbar.setScrollTop(100000)
		},
		//向服务器发送聊天信息
		postMessage() {
			const message = {
				id: nanoid(8),
				sender: this.currentUser,
				avatar: this.currentUserAvatar,
				content: this.inputVal,
				time: getTime(),
			}
			this.socket.emit('clientToServerChat', message)
			this.messages.push(message)
			this.$nextTick(() => {
				this.scrollToBottom()
			})
		},
	},
	mounted() {
		//监听服务器发送的聊天信息
		this.socket.on('ServerToClientChat', (data) => {
			this.messages.push(data)
		})

		//获取历史消息
		request.get('api/data/messages').then((res) => {
			const message = res.data
				.map((item) => {
					return item
				})
				.reverse()
			this.messages = this.messages.concat(message)
		})
	},
}
</script>

<template>
	<div class="chat-right-warpper">
		<div class="chat-banner">
			<div class="chat-banner-title">这是标题</div>
			<div class="chat-banner-btns">
				昵称
				<el-button circle color="#fff" size="large" @click="toggleOption"
					><el-icon size="20"><Setting /></el-icon
				></el-button>
			</div>
		</div>

		<div class="chat-messager">
			<el-scrollbar ref="scrollbar">
				<ChatMessage
					v-for="i in messages"
					:key="i.id"
					:message="i"
					:current-user="currentUser"
				></ChatMessage>
			</el-scrollbar>
		</div>

		<div class="chat-chatter">
			<div class="chat-chtter-input">
				<div class="chat-chtter-input-btn">
					<el-button circle icon="plus"></el-button>
				</div>
				<input
					v-model="inputVal"
					@keydown.enter="postMessage"
					placeholder="Please input"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.chat-right-warpper {
	width: 70%;
	.chat-messager {
		width: 100%;
		height: 80%;
		background-color: #fff;
		overflow: auto;
	}
	.chat-banner {
		width: 100%;
		height: 8%;
		background-color: #fff;
		border-bottom: 1px solid #dcdbdb;
		font-size: 20px;
		.chat-banner-title {
			float: left;
			height: 100%;
			display: flex;
			align-items: center;
			padding-left: 10px;
		}
		.chat-banner-btns {
			float: right;
			height: 100%;
			display: flex;
			align-items: center;
			padding-right: 10px;
		}
	}
	.chat-chatter {
		box-sizing: border-box;
		width: 100%;
		height: 12%;
		padding: 16px;
		.chat-chtter-input {
			background-color: rgb(73, 73, 73);
			width: 100%;
			height: 100%;
			border-radius: 8px;
			display: flex;
			align-items: center;
			// padding-left: 56px;
			input {
				// margin-left: ;
				background-color: rgb(73, 73, 73);
				border-color: transparent;
				color: #fff;
				font-size: 20px;
				width: 100%;
			}
			input:focus {
				outline: none;
			}
			.chat-chtter-input-btn {
				width: 50px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			button {
				background-color: #fff;
			}
		}
	}
}
</style>
