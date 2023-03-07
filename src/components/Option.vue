<script>
export default {
	name:'option',
	data() {
		return {
		}
	}
}
</script>

<template>
		<div class="option">
			<div class="option-warpper">
				<div class="option-header">
					<div class="option-info">
						<img src="https://i.imgur.com/YQz6dN5.jpg" alt="User Avatar" />
						<span>ABC</span>
					</div>
				</div>
				<div class="user-editor">
					<!-- 封装成组件 todo-->
					<div class="user-editor-name">
						<div class="user-editor-name-warpper">
							<div class="user-editor-name1">用户名</div>
							<div class="user-editor-name2">ABC</div>
						</div>
						<el-button>编辑</el-button>
					</div>
				</div>
			</div>
		</div>
</template>

<style lang="scss">
.option {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
}
.option-warpper {
	width: 50vw;
	height: 70vh;
	padding: 10px 20px;
	background-color: #cacaca;
	border-radius: 10px;
	box-shadow: 1px 1px 10px 2px #888888;
}
.option-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 20px;
	.option-info {
		display: flex;
		align-items: center;
	}

	.option-info img {
		width: 70px;
		height: 70px;
		border-radius: 50%;
		margin-right: 20px;
	}
	.option-info span {
		font-size: 18px;
		font-weight: 600;
	}
}
.user-editor {
	margin-top: 20px;
	background-color: #dddddd;
	height: 76%;
	width: 100%;
	border-radius: 10px;
	padding: 30px;
	box-sizing: border-box;
	.user-editor-name {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 18px;
	}
	.user-editor-name1 {
		font-size: 14px;
	}
	.user-editor-name2 {
		font-size: 16px;
		margin: 6px 0px;
	}
}
</style>
