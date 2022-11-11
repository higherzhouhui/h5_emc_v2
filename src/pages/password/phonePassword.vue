<template>
	<div class="password-retrieval">
		<HeaderTop :title="`忘记密码`"></HeaderTop>
		<div class="getBack-pwd">
			<div class="getBack-pwd-title">找回密码</div>
			<div class="getBack-pwd-intro">通过手机号找回密码</div>
			<div class="login_inp login_inp_2">
				<input type="text" maxlength="16" placeholder="请输入登录账号名" ref="login_account1" @input="deleteBtn1()" oninput="if(value.length>16)value=value.slice(0,16)">
				<div class="delete-box">
					<img v-if="showAcc1" class="delete" src="../../../static/images/account-delete.png"
					     @click="deleteIpt1()">
				</div>
			</div>
			<div class="login_inp login_inp_2">
				<input type="text" maxlength="16" placeholder="请输入真实姓名" ref="login_account2" @input="deleteBtn2()" oninput="if(value.length>16)value=value.slice(0,16)">
				<div class="delete-box">
					<img v-if="showAcc2" class="delete" src="../../../static/images/account-delete.png"
					     @click="deleteIpt2()">
				</div>
			</div>
			<div class="login_inp login_inp_2">
				<input type="number" maxlength="11" placeholder="请输入手机号码" ref="login_account3" @input="deleteBtn3()" oninput="if(value.length>11)value=value.slice(0,11)">
				<div class="delete-box">
					<img v-if="showAcc3" class="delete" src="../../../static/images/account-delete.png"
					     @click="deleteIpt3()">
				</div>
			</div>
			<div class="login_inp login_inp_2">
				<input class="verifyNum" type="text" placeholder="验证码" ref="login_account8" @input="deleteBtn8()">
				<div class="delete-box ">
					<img v-if="showAcc8" class="delete" src="../../../static/images/account-delete.png" @click="deleteIpt8()">
				</div>
				<div class="get-verifyNum" v-if="vcodeShow" @click="sendMessage()">获取验证码</div>
				<div class="get-verifyNum" v-if="!vcodeShow">{{ count }} s</div>
			</div>
			<div class="submitBlue">
                <van-button class="btnCover" type="info" @click="toPush()" :disabled="inputStatus">下一步</van-button>
			</div>
		</div>
	</div>
</template>

<script>
import {Toast} from 'vant';
import HeaderTop from '../../components/top/top';
// import 'video.js/dist/video-js.css'

export default {
	name: 'password-retrieval',
	components: {
		HeaderTop,
	},
	data() {
		return {
			showAcc1: false,
			showAcc2: false,
			showAcc3: false,
			showAcc8: false,
			vcodeShow: true,
			count: '',
            inputStatus:true,
		}
	},
	beforeRouteLeave(to, from, next) {
        if(this.timer){
            clearInterval(this.timer);
        }
		this.$destroy(true)
		next()
	},
	methods: {
		deleteBtn1() {
			this.showAcc1 = true;
            this.checkInput()
		},
		deleteIpt1() {
			this.$refs.login_account1.value = '';
			this.showAcc1 = false;
		},
		deleteBtn2() {
			this.showAcc2 = true;
            this.checkInput()
		},
		deleteIpt2() {
			this.$refs.login_account2.value = '';
			this.showAcc2 = false;
		},
		deleteBtn3() {
			this.showAcc3 = true;
            this.checkInput()
		},
		deleteIpt3() {
			this.$refs.login_account3.value = '';
			this.showAcc3 = false;
		},
		deleteIpt8() {
			this.$refs.login_account8.value = '';
			this.showAcc8 = false;
		},
		deleteBtn8() {
			this.showAcc8 = true;
            this.checkInput()
		},
        checkInput(){
            if(this.$refs.login_account1.value !== '' && this.$refs.login_account2.value !== '' && this.$refs.login_account3.value !== '' && this.$refs.login_account8.value !== '') {
                this.inputStatus = false
            }else{
                this.inputStatus = true
            }
        },
		sendMessage() {
			let params = {
				loginName: this.$refs.login_account1.value,
				realName: this.$refs.login_account2.value,
				phone: this.$refs.login_account3.value,
				type: 'forget',
                version:this.API.paramVersion,
			};
			if (this.isEmpty(params.loginName)) {
                this.$toastTop('请输入登录账号',3)
				return false;
			}
			if (this.isEmpty(params.realName)) {
                this.$toastTop('请输入真实姓名',3)
				return false;
			}
			if (this.isEmpty(params.phone)) {
                this.$toastTop('请输入手机号码',3)
				return false;
			}
            const toast = Toast.loading({
				duration: 0, // 持续展示 toast
				forbidClick: true,
				message: '验证码发送中'
			})
			this.ServerAPI.postAPI(this.API.sendSms2, params, (success, data) => {
                Toast.clear();
				if (success) {
                    if(data.code === '0000') {
                        this.$toastTop('验证码发送成功',1)
                        this.getCode();
                    }else{
                        this.$toastTop(data.info,3)
                    }
				}else{
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
			})
		},
		toPush() {
			let params = {
                loginName: this.$refs.login_account1.value,
                realName: this.$refs.login_account2.value,
				phone: this.$refs.login_account3.value,
				vcode: this.$refs.login_account8.value,
				type: "forget",
                version:this.API.paramVersion,
			};
            if (this.isEmpty(params.loginName)) {
                this.$toastTop('请输入登录账号',3)
				return false;
			}
            if (this.isEmpty(params.realName)) {
                this.$toastTop('请输入真实姓名',3)
				return false;
			}
			if (this.isEmpty(params.phone)) {
                this.$toastTop('请输入手机号码',3)
				return false;
			}
			if (this.isEmpty(params.vcode)) {
                this.$toastTop('请输入手机验证码',3)
				return false;
			}
			this.ServerAPI.postAPI(this.API.checkFindMobile2, params, (success, data) => {
				if (success) {
					if (data.code == '0000') {
                        this.$toastTop('验证成功',1)
                        sessionStorage.setItem('checkLoginName',params.loginName)
                        sessionStorage.setItem('checkRealName',params.realName)
                        sessionStorage.setItem('checkPhone',params.phone)
                        sessionStorage.setItem('checkCode',params.vcode)
						this.$router.push('/phonePasswordSet');
					} else {
						this.$toastTop(data.info,3)
					}
				} else {
					this.$toastTop('似乎已断开与互联网的连接',2)
				}
			});
		},
		toLogin() {
			this.$router.push({path: '/login'})
			location.reload();
		},
		getCode() {
			const TIME_COUNT = 60;
			if (!this.timer) {
				this.count = TIME_COUNT;
				this.vcodeShow = false;
				this.timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						this.count--;
					} else {
						this.vcodeShow = true;
						clearInterval(this.timer);
						this.timer = null;
					}
				}, 1000)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.password-retrieval {
	width: 100%;
	height: 100%;
	background: #f7f8fa;
	
	.to-back {
		position: absolute;
		top: 3%;
		left: 5%;
		width: .26rem;
		height: .4rem;
		/*background: url("")no-repeat;*/
		background-size: 100% 100%;
		z-index: 999;
	}
	
	.getBack-pwd {
		position: absolute;
		top: 10%;
		left: 10%;
		z-index: 999;
		width: 80%;
		
		.getBack-pwd-title {
			color: #191D2A;
			font-size: .4rem;
		}
		
		.getBack-pwd-intro {
			color: #7B8499;
			font-size: .24rem;
			margin-bottom: .5rem;
		}
		
		.login_inp {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: .9rem;
			background: rgba(255, 255, 255, .2);
			border-radius: 3px;
			border-bottom: #E1E0E9 1px solid;
			
			.left-icon {
				width: 0.4rem;
				height: 0.4rem;
			}
			
			.delete, .eyes {
				width: .25rem;
				height: .25rem;
			}
			
			.separated-line {
				width: 1px;
				height: .3rem;
				background: rgba(255, 255, 255, 0.2);
			}
			
			input {
				width: 60%;
				background: transparent;
				border: none;
				color: #000000;
				font-size: .26rem;
			}
			
			.delete-box {
				width: 10%;
			}
			
			.verifyNum {
				width: 23%;
			}
			
			.get-verifyNum {
				width: 1.6rem;
				text-align: center;
				font-size: .24rem;
				height: .5rem;
				line-height: .5rem;
				color: #FFFFFF;
				background: linear-gradient(90deg,#20a4ff,#067dff);
				border-radius: .45rem;
			}
		}
	}
	
	.video-player {
		position: relative;
		width: 100%;
		height: 100%;
	}
}
.submitBlue {
    width: 88%;
    margin: 0 auto;
    .btnCover {
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        color: #FFFFFF;
        text-align: center;
        background: linear-gradient(90deg,#20a4ff,#067dff);
        margin-top: .6rem;
        border: none;
        border-radius: .06rem;
    }
}
.login_inp_2 {
	margin-top: 0rem;
}
</style>
