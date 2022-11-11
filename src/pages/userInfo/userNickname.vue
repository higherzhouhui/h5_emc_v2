<template>
	<div class="revisePhone">
		<HeaderTop :title="`修改昵称`"></HeaderTop>
		<div class="revise-account">
			<div class="revise-account-input">
				<div class="revise-account-input-left">昵称</div>
				<div class="revise-account-input-box">
					<input type="text" @input="checkInput()" ref="nickName" placeholder="请输入昵称">
					<div v-if="hasInput" class="clickDel" @click="delInput()"></div>
				</div>
			</div>
		</div>
		<div class="bottom-btn-box">
			<van-button class="bottom-btn" round type="info" color="#0895FE" block
			            @click="toPush">提交
			</van-button>
		</div>
	</div>

</template>

<script>
import HeaderTop from '../../components/top/top';
import MuSubmit from '../../components/submit/muSubmit';
import {Toast} from 'vant';

export default {
	name: 'userNickname',
	components: {
		HeaderTop,
		MuSubmit,
		Toast
	},
	data() {
		return {
			value: "",
			hasInput: false
		}
	},
	mounted() {
		this.loadTop();
		this.checkInput();
		
	},
	beforeRouteLeave(to, from, next) {    // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true)
		next()
	},
	methods: {
		loadTop() {
			let params = {
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.userInfo, params, this.userInfo)
		},
		userInfo(success, data) {
			if (success) {
				if (data.code == '0000') {
					this.$refs.nickName.value = data.data.nickName;
					if (this.$refs.nickName.value.length != 0) {
						this.hasInput = true;
					}
				}
			}
		},
		checkInput() {
			if (this.$refs.nickName.value.length == 0) {
				this.hasInput = false;
			} else {
				this.hasInput = true;
			}
		},
		delInput() {
			this.$refs.nickName.value = '';
			this.hasInput = false;
		},
		toPush() {
			let params = {
				nickName: this.$refs.nickName.value
			}
			if (this.isEmpty(params.nickName)) {
				Toast("昵称不能为空");
				return false;
			}
			this.ServerAPI.postAPI(this.API.editUserInfo, params, (success, data) => {
				if (success) {
					if (data.code == '0000') {
						Toast("提交成功");
						this.$router.push('/userInfo');
					} else {
						Toast(data.info);
					}
				} else {
					Toast("网络错误，请重试");
				}
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.revisePhone {
	width: 100%;
	height: 100%;
	background: #edeff2;
	
	.bottom-btn-box {
		width: 70%;
		margin: .6rem auto 0;
	}
	.revise-account {
		margin: .3rem auto 0;
		padding: 0 .3rem;

		display: flex;
		justify-content: space-between;
		align-items: center;

		
		.revise-account-input {
			width: 100%;
			height: .8rem;
			border-radius: .07rem;
			background: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 .3rem;
			.revise-account-input-box {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				input {
					border: 0 none;
					font-size: .28rem;
					color: #191D2A;
					text-align: right;
					width: 2rem;
				}
				
				.clickDel {
					width: .3rem;
					height: .3rem;
					background: url("../../../static/images/click-delet.png") no-repeat;
					background-size: 100% 100%;
					margin-left: .15rem;
				}
			}
		}
	}
	
	.or-btn {
		width: 70%;
		margin: 1rem auto 0;
	}
}
</style>
