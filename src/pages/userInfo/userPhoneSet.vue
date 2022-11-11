<template>
	<div class="revisePhone">
		<HeaderTop :title="`新手机号验证`"></HeaderTop>
		<div class="topP">
			<div class="pw-banner">
				<div class="revise-account-input-left">新手机号码</div>
				<div class="revise-account-input-box">
					<input type="number" ref="userPhone" placeholder="请输入新手机号">
				</div>
			</div>
			<div class="pw-banner">
				<div class="left-align">
					<input type="number" ref="code" placeholder="请输入验证码">
				</div>
				<div class="send-code" @click="sendMessage">获取验证码</div>
			</div>
			<div class="bottom-btn-box">
				<van-button class="bottom-btn" round type="info" color="#0895FE" block
				            @click="toPush">提交
				</van-button>
			</div>
		</div>
	</div>

</template>

<script>
import HeaderTop from '../../components/top/top';
import {Toast} from 'vant'

export default {
	name: 'revisePhone',
	components: {
		HeaderTop,
		Toast
	},
	data() {
		return {
			value: "",
		}
	},
	mounted() {
	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
	methods: {
		toStep1() {
			this.$router.push('/userPhone');
		},
		sendMessage(e) {
			let time = 60;
			if (time == 60) {
				let params = {
					phone: this.$refs.userPhone.value,
					type: "edit"
				};
				if (this.isEmpty(params.phone)) {
					Toast("请输入手机号码");
					return false;
				}
				this.ServerAPI.postAPI(this.API.sendSms, params, (success, data) => {
					if (success) {
						if (data.code == '0000') {
							Toast("短信发送成功");
							e.target.disabled = true;
							let timer;
							timer = setInterval(() => {
								time--;
								if (time > 0) {
									e.target.disabled = true;
									e.target.innerHTML = time + "s";
								} else if (time == 0) {
									clearTimeout(timer)
									e.target.disabled = false;
									e.target.innerText = '重新发送';
									
								}
							}, 1000)
						} else {
							Toast(data.info);
						}
					} else {
						Toast("网络错误，请重试");
					}
				});
			}
		},
		toPush() {
			let params = {
				phone: this.$refs.userPhone.value,
				vcode: this.$refs.code.value,
			}
			if (this.isEmpty(params.phone)) {
				Toast('手机号码不能为空');
				return false;
			}
			this.ServerAPI.postAPI(this.API.updatePhone, params, (success, data) => {
				if (success) {
					if (data.code == '0000') {
						Toast('提交成功');
						this.$router.push('/userInfo');
					} else {
						Toast(data.info);
					}
				} else {
					Toast("网络错误，请重试");
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.revisePhone {
	width: 100%;
	height: 100%;
	background: #edeff2;
	
	.topP {
		margin: .2rem 0 0;
		padding: 0 .3rem;
		
		.pw-banner {
			width: 100%;
			height: .8rem;
			border-radius: .07rem;
			background: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 .3rem;
			margin-bottom: .2rem;
			
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
			
			.left-align {
				width: 2rem;
				
				input {
					width: 100%;
					border: 0 none;
					font-size: .28rem;
				}
			}
			
			.send-code {
				font-size: .24rem;
				padding: .08rem .2rem;
				border-radius: .08rem;
				color: #1989fa;
				border: #1989fa 1px solid;
			}
		}
		
		.bottom-btn-box {
			width: 70%;
			margin: .4rem auto 0;
		}
	}
}
</style>
