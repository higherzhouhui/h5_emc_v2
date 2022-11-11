<template>
	<div class="password-retrieval">
		<HeaderTop :title="`设置新密码`"></HeaderTop>
		<div class="getBack-pwd">
			<div class="login_inp login_inp_2">
				<input class="pwdIpt" type="password" placeholder="请输入密码" ref="login_pw4" @input='checkInput()' oninput="if(value.length>16)value=value.slice(0,16)">
				<div class="delete-box delete-box2">
					<img v-if="showPwd4" class="delete" src="../../../static/images/account-delete.png"
					     @click="deletePwd4()">
				</div>
			</div>
			<div class="login_inp login_inp_2">
				<input class="pwdIpt" type="password" placeholder="请再次输入密码" ref="login_pw5" @input='checkInput()' oninput="if(value.length>16)value=value.slice(0,16)">
				<div class="delete-box delete-box2">
					<img v-if="showPwd5" class="delete" src="../../../static/images/account-delete.png"
					     @click="deletePwd5()">
				</div>
			</div>
			<div class="submitBtn submitBlue">
                <van-button class="btnCover" type="info" @click="commitPassword()" :disabled="inputStatus">确定</van-button>
			</div>
		</div>
		
	</div>
</template>

<script>
import {Toast} from 'vant';
import HeaderTop from '../../components/top/top';

export default {
	name: 'password-set',
	components: {
		HeaderTop,
	},
	data() {
		return {
			showAcc3: false,
			showAcc8: false,
			showPwd4: false,
			showPwd5: false,
			showTip: false,
            inputStatus:true,
			// eyes: require('../../../static/images/login-pwd-noShow.png'),
			// eyes2: require('../../../static/images/login-pwd-noShow.png'),
		}
	},
    beforeRouteLeave(to, from, next) {
        sessionStorage.removeItem('checkLoginName')
        sessionStorage.removeItem('checkRealName')
        sessionStorage.removeItem('checkPhone')
        sessionStorage.removeItem('checkCode')
		this.$destroy(true)
		next()
	},
	methods: {
		deletePwd4() {
			this.$refs.login_pw4.value = '';
			this.showPwd4 = false;
		},
		deletePwd5() {
			this.$refs.login_pw5.value = '';
			this.showPwd5 = false;
		},
        checkInput() {
            if(this.$refs.login_pw4.value !== '' && this.$refs.login_pw5.value !== ''){
                this.inputStatus = false
            }else{
                this.inputStatus = true
            }
        },
		openEyes4() {
			if (!this.eyesFlag) {
				// this.eyes = require('');
				this.$refs.login_pw4.type = "text";
				this.eyesFlag = !this.eyesFlag;
			} else {
				// this.eyes = require('');
				this.$refs.login_pw4.type = "password";
				this.eyesFlag = !this.eyesFlag;
			}
		},
		openEyes5() {
			if (!this.eyesFlag) {
				// this.eyes2 = require('');
				this.$refs.login_pw5.type = "text";
				this.eyesFlag = !this.eyesFlag;
			} else {
				// this.eyes2 = require('');
				this.$refs.login_pw5.type = "password";
				this.eyesFlag = !this.eyesFlag;
			}
		},
		commitPassword() {
			let params = {
				oldPassword:'',
				newPassword: this.$refs.login_pw4.value,
				vailPassword: this.$refs.login_pw5.value,
				type: 'forget',
                version:this.API.paramVersion,
                loginName:sessionStorage.getItem('checkLoginName'),
                realName:sessionStorage.getItem('checkRealName'),
                phone:sessionStorage.getItem('checkPhone'),
                vcode:sessionStorage.getItem('checkCode'),
			};
			if (this.isEmpty(params.newPassword)) {
                this.$toastTop('新密码不能为空',3)
				return false;
			}
			if (params.newPassword != params.vailPassword) {
                this.$toastTop('两次密码输入不相同',3)
				return false;
			}
			if(this.$refs.login_pw4.value.length < 5 || this.$refs.login_pw5.value.length < 5){
                this.$toastTop('请输入 5-16 位字母和数字组合的密码',3)
				return false
			}
			this.ServerAPI.postAPI(this.API.updatePass2, params, (success, data) => {
				if (success) {
					if (data.code == '0000') {
                        this.$toastTop('密码修改成功，请登录',1)
                        sessionStorage.setItem('loginMark','1')
						this.$router.replace('/login');
					} else {
						this.$toastTop(data.info,3)
					}
				} else {
					this.$toastTop('似乎已断开与互联网的连接',2)
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.password-retrieval {
	width: 100%;
	height: 100%;
	background: #FFFFFF;
	
	.to-back {
		position: absolute;
		top: 3%;
		left: 5%;
		width: .26rem;
		height: .4rem;
		/*background: url("../../../static/images/head-back-icon.png")no-repeat;*/
		background-size: 100% 100%;
		z-index: 9;
	}
	
	.getBack-pwd {
		position: absolute;
		top: 10%;
		left: 10%;
		z-index: 9;
		width: 80%;
		
		.getBack-pwd-title {
			color: #000000;
			font-size: .4rem;
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
			}
			
			.delete-box {
				width: 10%;
			}
			
			.verifyNum {
				width: 23%;
			}
			
			.get-verifyNum {
				width: 30%;
				text-align: center;
				height: .5rem;
				line-height: .45rem;
				color: #0F94FF;
				border: #0F94FF 1px solid;
				border-radius: .08rem;
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
	}
}

.remind {
	width: 2rem !important;
	height: 2rem !important;
	color: #000000 !important;
	background: rgba(255, 255, 255, .2);
}
</style>
