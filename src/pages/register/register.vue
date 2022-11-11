<template>
	<div class="register">
		<HeaderTop :title="`用户名注册`"></HeaderTop>
		<div class="red-line"></div>
		<div class="register-body">
			<div class="top-fonts">设置用户名密码</div>
			<div class="top-fonts-intro">用户名、密码由5-16位字母+数字组合</div>
			<div class="input-area">
				<div class="user-name">
					<input id="userName" type="text" placeholder="用户名" @input="accountStore()" ref="accountInput" oninput="if(value.length>16)value=value.slice(0,16)">
					<div class="delete-box">
						<img v-if="showAcc" class="delete" src="../../../static/images/account-delete.png"
						     @click="deleteIpt()">
					</div>
				</div>
				<div class="user-pwd">
					<input id="userPwd" type="password" placeholder="密码" @input="pwdStore()" ref="pwdInput" oninput="if(value.length>16)value=value.slice(0,16)">
					<div class="delete-box2">
						<img v-if="showPwd" class="delete2" src="../../../static/images/pwd-show.png"
						     @click="switchShow()">
						<img v-if="showPwd2" class="delete3" src="../../../static/images/pwd-hide.png"
						     @click="switchShow2()">
					</div>
				</div>
				<div class="user-pwd">
					<input id="userPwd2" type="password" placeholder="请再次输入密码" @input="pwdStore2()" ref="pwdInput2" oninput="if(value.length>16)value=value.slice(0,16)">
					<div class="delete-box2">
						<img v-if="showPwd3" class="delete2" src="../../../static/images/pwd-show.png"
						     @click="switchShow3()">
						<img v-if="showPwd4" class="delete3" src="../../../static/images/pwd-hide.png"
						     @click="switchShow4()">
					</div>
				</div>
			</div>
		</div>
		<div class="submitBlue">
			<div class="btnCover" @click="nextStep()">下一步</div>
		</div>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top';
import {Toast} from 'vant';

export default {
	name: 'register',
	components: {
		HeaderTop
	},
	data() {
		return {
			showNameRemind: false,
			showAcc: false,
			showPwd: false,
			showPwd2: false,
			showPwd3: false,
			showPwd4: false
		}
	},
	created() {
	},
	//创建之前
	beforeCreate() {
	
	},
	mounted() {
	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
	methods: {
		accountStore() {
			if (this.$refs.accountInput.value.length == 0) {
				this.showAcc = false;
			} else {
				this.showAcc = true;
				this.showNameRemind = false;
			}
		},
		deleteIpt() {
			this.$refs.accountInput.value = '';
		},
		pwdStore() {
			if (this.$refs.pwdInput.value.length == 0) {
				this.showPwd = false;
				this.showPwd2 = false;
			} else {
				if (this.$refs.pwdInput.type == 'password') {
					this.showPwd2 = true;
				} else {
					this.showPwd = true;
				}
			}
		},
		pwdStore2() {
			if (this.$refs.pwdInput2.value.length == 0) {
				this.showPwd3 = false;
				this.showPwd4 = false;
			} else {
				if (this.$refs.pwdInput2.type == 'password') {
					this.showPwd4 = true;
				} else {
					this.showPwd3 = true;
				}
			}
		},
		switchShow() {
			this.$refs.pwdInput.type = 'password';
			this.showPwd = false;
			this.showPwd2 = true;
		},
		switchShow2() {
			this.$refs.pwdInput.type = 'text';
			this.showPwd = true;
			this.showPwd2 = false;
		},
		switchShow3() {
			this.$refs.pwdInput2.type = 'password';
			this.showPwd3 = false;
			this.showPwd4 = true;
		},
		switchShow4() {
			this.$refs.pwdInput2.type = 'text';
			this.showPwd3 = true;
			this.showPwd4 = false;
		},
		nextStep() {
			if (this.$refs.accountInput.value.length > 16 || this.$refs.accountInput.value.length < 5) {
                this.$toastTop('请输入5到16位字母和数字组合的用户名',3)
				return false;
			}
			if (this.$refs.pwdInput.value.length > 16 || this.$refs.pwdInput.value.length < 5) {
                this.$toastTop('请输入5到16位字母和数字组合的密码',3)
				return false;
			}
			if (this.$refs.pwdInput.value != this.$refs.pwdInput2.value) {
                this.$toastTop('两次密码输入不一致',3)
				return false;
			}
			let params = {
				loginName: this.$refs.accountInput.value,
				password: this.$refs.pwdInput.value,
			}
			this.ServerAPI.postAPI(this.API.registerCheck, params, (success, data) => {
				if (success) {
					if (data.code == '0000') {
                        this.$toastTop('成功,请继续下一步',1)
						sessionStorage.setItem('queryRegName', JSON.stringify(this.$refs.accountInput.value))
						sessionStorage.setItem('queryRegPwd', JSON.stringify(this.$refs.pwdInput.value))
						this.$router.push("/registerStep2");
					} else {
						this.$toastTop(data.info,3)
                    }
				}else{
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.red-line {
	width: 50%;
	height: .05rem;
	background: #067dff;
}

.register-body {
	width: 80%;
	margin: .4rem auto 0;
	
	.top-fonts {
		font-size: .38rem;
		color: #000000;
		font-weight: bold;
	}
	
	.top-fonts-intro {
		font-size: .24rem;
		color: #999999;
		margin-top: .2rem;
	}
	
	.input-area {
		width: 100%;
		margin: .8rem auto 0;
		position: relative;
		color: #999999;
		
		.name-remind {
			position: absolute;
			top: -.4rem;
			font-size: .24rem;
		}
		
		.user-name {
			border-bottom: #E1E0E9 1px solid;
			display: flex;
			align-items: center;
			
			input {
				width: 100%;
				border: none;
			}
			
			.delete-box {
				img {
					width: .2rem;
					height: .2rem;
				}
			}
		}
		
		.user-pwd {
			border-bottom: #E1E0E9 1px solid;
			margin-top: .6rem;
			display: flex;
			align-items: center;
			
			input {
				width: 100%;
				border: none;
			}
			
			.delete-box2 {
				img {
					width: .45rem;
					height: .25rem;
				}
			}
		}
	}
}

.submitBlue {
	width: 70%;
	margin: 0 auto;
	
	.btnCover {
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		color: #FFFFFF;
		text-align: center;
		background: linear-gradient(90deg,#20a4ff,#067dff);
		margin-top: .8rem;
		border: none;
		border-radius: .45rem;
	}
}

</style>

