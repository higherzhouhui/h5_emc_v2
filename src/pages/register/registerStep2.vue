<template>
	<div class="registerStep2">
		<!--loading-new-->
		<div class="loading-new" v-if="showLoading"><img src="../../../static/images/allLoading.gif" alt=""></div>
		<HeaderTop :title="`用户名注册`"></HeaderTop>
		<div class="red-line"></div>
		<div class="register2-body">
			<div class="top-fonts">完善个人信息</div>
			<div class="top-fonts-intro">请填写常用手机号、真实姓名(用于提款)</div>
		</div>
		<div class="input-area">
			<div class="user-name">
				<input id="userName" type="text" maxlength="16" placeholder="真实姓名"
				       @focus="nameRemindShow()" v-model='realName' @input="accountStore()" ref="accountInput">
				<div class="delete-box">
					<img v-if="showAcc" class="delete" src="../../../static/images/account-delete.png"
					     @click="deleteIpt()">
				</div>
			</div>
			<div class="user-pwd">
				<input id="userPwd" type="number" oninput="if(value.length>11)value=value.slice(0,11)"
				       placeholder="手机号码" @focus="nameRemindShow2()" @input="pwdStore()" ref="pwdInput">
				<div class="delete-box2">
					<img v-if="showPwd" class="delete" src="../../../static/images/account-delete.png"
					     @click="deleteIpt2()">
				</div>
			</div>
			<div class="user-pwd user-pwd2" style="margin-top: .4rem">
				<input class="verifyNum" type="text" oninput="if(value.length>4)value=value.slice(0,4)"
				       placeholder="验证码" ref="vsCode" @input="checkInput()">
				<div v-show="VsCodeShow" class="get-verifyNum" @click="sendMessage()">{{vCodeTitle}}</div>
				<div v-show="!VsCodeShow" class="get-verifyNum get-verifyNum2">{{ count }} s</div>
			</div>
<!--            <div class="user-name user-pwd">-->
<!--                <input id="agentName" type="text" oninput="if(value.length>10)value=value.slice(0,10)" placeholder="推荐人"-->
<!--                       @focus="agentNameRemindShow()" @input="accountStore2()" ref="accountInput2">-->
<!--                <div class="delete-box">-->
<!--                    <img v-if="showAcc2" class="delete" src="../../../static/images/account-delete.png"-->
<!--                         @click="deleteIpt3()">-->
<!--                </div>-->
<!--            </div>-->
            <div class="radio-box">
                <div class="radio-list" @click="radioChosing(1)">
                    <img src="../../../static/images/register-invite-icon1.png" alt="" class="radio-icon" v-if="radioValue === 1">
                    <img src="../../../static/images/register-invite-icon2.png" alt="" class="radio-icon" v-if="radioValue === 2">
                    <div class="radio-fonts radio-fonts1" :class="radioValue === 2?'radio-fonts-gray':''">呼朋唤友活动</div>
                </div>
                <div class="radio-list" @click="radioChosing(2)">
                    <img src="../../../static/images/register-invite-icon1.png" alt="" class="radio-icon" v-if="radioValue === 2">
                    <img src="../../../static/images/register-invite-icon2.png" alt="" class="radio-icon" v-if="radioValue === 1">
                    <div class="radio-fonts radio-fonts2" :class="radioValue === 1?'radio-fonts-gray':''">代理邀请</div>
                </div>
            </div>
            <div class="user-name">
                <div class="radio-input-box">
                    <div class="radio-input-left">{{radioInputTitle}}</div>
                    <input type="text" class="radio-input-right" v-model="agentValue" oninput="if(value.length>16)value=value.slice(0,16)" :placeholder="radioPld" ref="agentInput">
                </div>
            </div>
            <div class="red-reminds" v-if="radioValue === 2">※不适用呼朋唤友活动</div>
            <van-checkbox class='reminds-radio' v-model="radioChecked" shape="square">完成注册后将无法输入推荐人/邀请码</van-checkbox>
			<div class="submitBlue">
                <van-button round block color="linear-gradient(to right, #78BDF2, #167BFF)" @click="toReg()" :disabled="subCheck">注册</van-button>
<!--				<div class="btnCover" @click="toReg()">注册</div>-->
			</div>
		</div>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top';
import {Dialog, Toast, Picker, Notify} from 'vant'
import toastPop from '../../components/toast/toast_js';
export default {
	name: 'registerStep2',
	components: {
		HeaderTop,
        toastPop,
		// Toast
	},
	data() {
		return {
			showNameRemind: false,
			showAcc: false,
			showAcc2: false,
			showPwd: false,
			VsCodeShow: true,
			count: '',
			recName: '',
			recPwd: '',
			showLoader: false,
			showLoading: false,
			keepLoginSwitch: true,//开关的值
			agentName:'',
			radioValue:1,
            radioInputTitle:'邀请码',
            radioPld:'呼朋唤友活动邀请码',
            agentType:1,
            subCheck:true,
            vCodeTitle:'获取验证码',
            radioChecked:false,
            realName:'',
            visitorId:null,
            agentValue:'',
		}
	},
	created() {
        this.visitorId = localStorage.getItem('visitorId')
		this.recName = JSON.parse(sessionStorage.getItem('queryRegName'))
		this.recPwd = JSON.parse(sessionStorage.getItem('queryRegPwd'))
        if(sessionStorage.getItem('queryName')){
            this.agentName = sessionStorage.getItem('queryName')
        }
        // this.$toast('222',2,false,)
	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
	methods: {
        radioChosing(value){
            if(this.radioValue !== value) {
                this.radioValue = this.agentType = value
                if(value === 1){
                    this.radioInputTitle = '邀请码'
                    this.radioPld = '呼朋唤友活动邀请码'
                }else if(value === 2){
                    this.radioInputTitle = '推荐人'
                    this.radioPld = '请输入代理账号'
                }
                this.agentValue = ''
            }
        },
        checkInput(){
            if(!this.isEmpty(this.realName) && !this.isEmpty(this.$refs.pwdInput.value) && !this.isEmpty(this.$refs.vsCode.value)){
                this.subCheck = false
            }else{
                this.subCheck = true
            }
        },
		accountStore() {
            if(this.realName.indexOf(' ') >= 0){
                this.realName = this.realName.trim()
                this.$toastTop('真实姓名不得输入空格',3)
            }
			if (this.realName.length === 0) {
				this.showAcc = false;
			} else {
				this.showAcc = true;
			}
			this.checkInput()
		},
		accountStore2() {
			if (this.$refs.accountInput2.value.length === 0) {
				this.showAcc2 = false;
			} else {
				this.showAcc2 = true;
			}
		},
		deleteIpt() {
			this.realName = '';
			this.showAcc = false
		},
		deleteIpt3() {
			this.$refs.accountInput2.value = '';
			this.showAcc2 = false
		},
		deleteIpt2() {
			this.$refs.pwdInput.value = '';
			this.showPwd = false
		},
		pwdStore() {
			if (this.$refs.pwdInput.value.length === 0) {
				this.showPwd = false;
			} else {
				this.showPwd = true;
			}
            this.checkInput()
		},
		nameRemindShow() {
			this.showNameRemind = true;
			if (this.realName === 0) {
				this.showAcc = false;
			} else {
				this.showAcc = true;
			}
		},
		agentNameRemindShow() {
			this.showNameRemind = true;
			if (this.$refs.accountInput2.value.length === 0) {
				this.showAcc2 = false;
			} else {
				this.showAcc2 = true;
			}
		},
		nameRemindShow2() {
			this.showNameRemind = true;
			if (this.$refs.pwdInput.value.length === 0) {
				this.showPwd = false;
			} else {
				this.showPwd = true;
			}
		},
		sendMessage() {
			let params = {
				phone: this.$refs.pwdInput.value,
				type: 'register'
			};
			if (this.isEmpty(params.phone)) {
                this.$toastTop('请输入手机号码',3)
				return false;
			}
			const toast = Toast.loading({
				duration: 0, // 持续展示 toast
				forbidClick: true,
				message: '验证码发送中...'
			});
			this.ServerAPI.postAPI(this.API.sendSms, params, (success, data) => {
                Toast.clear();
				if (success) {
					if (data.code === "0000") {
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
		toReg() {
			let params = {
				loginName: this.recName,
				password: this.recPwd,
				cpassword: this.recPwd,
				realName: this.realName,
				phone: this.$refs.pwdInput.value,
				vcode: this.$refs.vsCode.value,
                // recommendName: this.radioValue === 1?this.$refs.agentInput.value:'',
                recommendName: this.radioValue === 1?this.agentValue:'',
				// agentName: this.radioValue === 2 && this.$refs.agentInput.value.length > 0?this.$refs.agentInput.value:this.agentName,
				agentName: this.radioValue === 2 && this.agentValue !== ''?this.agentValue:this.agentName,
				visitType: 'APP',
                visitSource: 'H5',
				version: this.API.paramVersion,
			};
			if (this.isEmpty(params.loginName)) {
                this.$toastTop('账号不能为空',3)
				return false;
			}
			if (this.isEmpty(params.password)) {
                this.$toastTop('密码不能为空',3)
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
			if (this.isEmpty(params.realName)) {
                this.$toastTop('请输入真实姓名',3)
				return false;
			}
            if(this.radioChecked === false){
                this.$toastTop('请勾选注意事项',3)
                return
            }
			this.ServerAPI.postAPI(this.API.register, params, (success, data) => {
				if (success) {
					if (data.code === '0000') {
						this.toSign();
                        this.$toastTop('注册成功',1)
						sessionStorage.removeItem('queryRegName')
						sessionStorage.removeItem('queryRegPwd')
					} else {
						this.$toastTop(data.info,3)
                    }
				}else{
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
			})
		},
		toSign() {
			this.showLoading = true;
			let params = {
				loginName: this.recName,
				password: this.recPwd,
				keepLogin: this.keepLoginSwitch,
				// uuid:this.queryCookie,
				appName: 'EMC',
				visitSource: 'H5',
				visitType: "APP",
                visitorId:this.visitorId,
				version: this.API.paramVersion,
			};
			this.ServerAPI.postAPI(this.API.login, params, this.loginHandler)
		},
		loginHandler(success, data) {
            this.showLoading = false;
			if (success) {
				if (data.code === "0000") {
                    this.$toastTop('登录成功',1)
                    sessionStorage.setItem("showDownload", "1");
                    sessionStorage.setItem("loginMark", "1");
                    sessionStorage.setItem('showWithdraw','1')
                    this.setLogin(true);
                    this.sendLoginLog();
                    this.$store.dispatch("popRootKeepAlive");
                    if (sessionStorage.getItem("isSelect") === "5") {
                        this.$router.push({ path: "/help" });
                    } else if (sessionStorage.getItem("isSelect") === "3") {
                        this.$router.push({ path: "/sponsorShip-new" });
                    } else if (sessionStorage.getItem("isSelect") === "4") {
                        this.$router.push({ path: "/my" });
                    } else {
                        this.$router.push({ path: "/" });
                    }
                    sessionStorage.setItem("userName", data.data.loginName);
				} else {
					this.$toastTop(data.info,3)
				}
			} else {
				this.$toastTop('似乎已断开与互联网的连接',2)
			}
		},
        sendLoginLog() {
            let params = {
                uuid: this.recName + "-" + this.recPwd,
                visitSource: "H5",
                appName: "emcfull",
            };
            this.ServerAPI.postAPI(this.API.loginLog,params,(success, data) => {
                    if (success) {
                        if (data.code === "0000") {
                        }
                    }
                }
            );
        },
		getCode() {
			const TIME_COUNT = 60;
			if (!this.timer) {
				this.count = TIME_COUNT;
				this.VsCodeShow = false;
				this.timer = setInterval(() => {
					if (this.count > 0 && this.count <= TIME_COUNT) {
						this.count--;
					} else {
						this.VsCodeShow = true;
						this.vCodeTitle = '重新发送'
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
.red-line {
	width: 100%;
	height: 2px;
	background: #067dff;
}
.register2-body {
	width: 80%;
	margin: .4rem auto 0;
	.top-fonts {
		font-size: .32rem;
		color: #000000;
	}
	.top-fonts-intro {
		font-size: .24rem;
		color: #999999;
		margin-top: .2rem;
	}
}
.input-area {
	width: 80%;
	margin: .8rem auto 0;
	position: relative;
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
        .radio-input-box {
            margin-top: .6rem;
            color: #5A5E63;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .radio-input-left {
                font-weight: bold;
                width: 1.6rem;
            }
            .radio-input-right {
                width: calc(100% - 1.6rem);
                text-align: right;
            }
        }
	}
    .radio-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-top: .6rem;
        color: #464646;
        .radio-list {
            display: flex;
            align-items: center;
            //font-weight: bold;
            .radio-icon {
                height: .45rem;
                margin-right: .15rem;
            }
            .radio-fonts-gray {
                color: #7C8591;
                font-weight: normal;
            }
            .radio-fonts1 {
                width: 2rem;
            }
            .radio-fonts2 {
                width: 1.4rem;
            }
        }
    }
    .red-reminds {
        font-size: .24rem;
        color: #FF000F;
        margin-top: .1rem;
    }
    .reminds-radio {
        margin-top: .2rem;
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
				width: .2rem;
				height: .2rem;
			}
		}
	}
	.user-pwd2 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.get-verifyNum {
			width: 2.2rem;
			height: .5rem;
			text-align: center;
			font-size: .24rem;
			line-height: .5rem;
			color: #FFFFFF;
			background: linear-gradient(90deg,#20a4ff,#067dff);
			border-radius: .45rem;
            margin-bottom: .1rem;
		}
        .get-verifyNum2 {
            width: 1rem;
            background: #A8B3C3;
            color: #FFFFFF;
        }
	}
	.submitBlue {
		width: 100%;
		margin: .6rem auto 0;
	}
}
.loading-new {
	position: fixed;
	top: 50%;
	left: 50%;
	margin-top: 50px;
	margin-left: -35px;
	z-index: 2019;
	border-radius: .2rem;
	overflow: hidden;
	opacity: .8;
	img {
		width: 70px;
	}
}
</style>
