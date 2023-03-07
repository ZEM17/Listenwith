<template>
	<div :class="messageClass">
		<div class="message-avatar">
			<img :src="message.avatar" alt="" />
		</div>
		<div class="message-content">
			<div class="message-header">
				<span class="message-sender">{{ message.sender }}</span>
				<span class="message-timestamp">{{ timeFormated }}</span>
			</div>
			<div class="message-body">{{ message.content }}</div>
		</div>
	</div>
</template>

<script>
import { formatTime } from '../utils'
export default {
	props: {
		message: {
			type: Object,
			required: true,
		},
		currentUser: {
			type: String,
			required: true,
		},
	},
	computed: {
		messageClass() {
			return {
				message: true,
				sent: this.message.sender === this.currentUser,
				received: this.message.sender !== this.currentUser,
			}
		},
		timeFormated() {
			return formatTime(this.message.time)
		},
	},
}
</script>

<style>
.message {
	display: flex;
	margin: 8px;
	margin-bottom: 24px;
}

.sent {
	flex-direction: row-reverse;
}

.received {
	flex-direction: row;
}

.message-avatar {
	margin-right: 6px;
	margin-left: 6px;
}

.message-avatar img {
	width: 40px;
	height: 40px;
	border-radius: 50%;
}

.message-content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 8px;
	background-color: #36393f;
	border-radius: 8px;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	color: #fff;
	font-size: 14px;
	line-height: 20px;
	min-width: 120px;
}

.message-header {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	margin-bottom: 4px;
}

.message-sender {
	font-weight: bold;
}

.message-timestamp {
	color: #8e9297;
	font-size: 12px;
}

.message-body {
	margin-bottom: 4px;
	word-wrap: break-word;
	word-break: break-all;
	text-align: justify;
}
</style>
