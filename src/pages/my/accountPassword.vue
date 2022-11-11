<template>
	<div class="pswdSet">
		<div class="replace-header">
			<div class="goBack" @click="goBack()">
                <img src="../../../static/images/back-icon.png" alt="" class="back-icon">
            </div>
			<div class="header-title">
                {{titleFonts}}
                <div class="small-title">登录密码</div>
            </div>
			<div class="header-right" @click="getHelpInfo()">
                <img src="../../../static/images/head-help-icon.png" alt="">
            </div>
		</div>
        <div class="main" v-if='step1'>
            <div class="content-list flex-b">
                <div class="content-list-left">真实姓名</div>
				<div class="content-list-right">
					<input type="text" maxlength="16" placeholder="请输入真实姓名" ref="realName" @input='checkStep1()'>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">手机号码</div>
				<div class="content-list-right">
					<input type="number" maxlength="11" placeholder="请输入绑定的手机号码" ref="phone" oninput="if(value.length>11)value=value.slice(0,11)" @input='checkStep1()'>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">验证码</div>
				<div class="content-list-right flex-b">
					<input class='code-input' type="number" maxlength="4" placeholder="请输入验证码" ref="code" oninput="if(value.length>4)value=value.slice(0,4)" @input='checkStep1()'>
                    <div class="code-btn" v-if="vcodeShow" @click="sendMessage()">获取验证码</div>
                    <div class="code-btn" v-if="!vcodeShow">{{ count }} s</div>
				</div>
			</div>
            <div class="submitBlue">
                <van-button class="btnCover" type="info" @click="toNext()" :disabled="inputStatus">下一步</van-button>
			</div>
        </div>
		<div class="main" v-if='step2'>
            <div class="content-list flex-b">
                <div class="content-list-left">新密码</div>
				<div class="content-list-right">
					<input type="password" maxlength="16" placeholder="请输入新密码" ref="newpassword" @input='checkStep2()'>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">确认新密码</div>
				<div class="content-list-right">
					<input type="password" maxlength="16" placeholder="请再次输入新密码" ref="cpassword" @input='checkStep2()'>
				</div>
			</div>
            <div class="submitBlue">
                <van-button class="btnCover" @click="toPush()" :disabled="inputStatus2">下一步</van-button>
			</div>
		</div>
         <!-- 客服选择弹框 -->
        <van-action-sheet v-model="helpList">
            <div class="help-list-box">
                <img src="../../../static/images/help-list-img1.png" alt="" class="help-list" @click='toHelpMode(1)' v-if='showHelp1'>
                <img src="../../../static/images/help-list-img2.png" alt="" class="help-list" @click='toHelpMode(2)' v-if='showHelp2'>
                <div class="help-close-btn">
                    <div class="help-close-btn-fonts flex-c" @click="helpList = false">取消</div>
                </div>
            </div>
        </van-action-sheet>
	</div>
</template>

<script>
import ListPswd from '../../components/inputList/list'
import MuSubmit from '../../components/submit/muSubmit'
import {Toast} from 'vant'
import {mobileModel, browserName, osVersion,browserVersion} from 'mobile-device-detect'

export default {
	name: 'password-set',
	components: {
		ListPswd,
		MuSubmit,
	},
	data () {
		return {
			newPassword: '',
			vailPassword: '',
			accName: '',
			realName: '',
			phone: '',
			code: '',
            step1:true,
            step2:false,
            vcodeShow:true,
            count: '',
            inputStatus:true,
            inputStatus2:true,
            titleFonts:'身份验证',
            helpList:false,
            showHelp1:true,
            showHelp2:true,
            helpData:{},
		}
	},
	beforeRouteLeave(to, from, next) {
        if(this.timer){
            clearInterval(this.timer);
        }
		this.$destroy(true)
		next()
	},
    mounted(){
        this.accName = sessionStorage.getItem('userName')
    },
	methods: {
        checkStep1(){
            if(this.$refs.realName.value !== '' && this.$refs.phone.value !== '' && this.$refs.code.value !== ''){
                this.inputStatus = false
            }else{
                this.inputStatus = true
            }
        },
        checkStep2(){
            if(this.$refs.newpassword.value !== '' && this.$refs.cpassword.value !== '') {
                this.inputStatus2 = false
            }else{
                this.inputStatus2 = true
            }
        },
        sendMessage() {
			let params = {
				loginName: this.accName,
				realName: this.$refs.realName.value,
				phone: this.$refs.phone.value,
				type: 'edit',
                version:this.API.paramVersion,
			};
			if (this.isEmpty(params.realName)) {
				Toast('请输入真实姓名');
				return false;
			}
			if (this.isEmpty(params.phone)) {
				Toast('请输入手机号码');
				return false;
			}
            const toast = Toast.loading({
				duration: 0, // 持续展示 toast
				forbidClick: true,
				message: '验证码发送中'
			})
			this.ServerAPI.postAPI(this.API.sendSms2, params, (success, data) => {
                Toast.clear()
				if (success) {
                    if(data.code === '0000') {
                        Toast('验证码发送成功');
                        this.getCode();
                    }else{
                        Toast(data.info);
                    }
				} 
			})
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
		},
        toNext(){
            let params = {
				loginName: this.accName,
				realName: this.$refs.realName.value,
				phone: this.$refs.phone.value,
				vcode: this.$refs.code.value,
				type: 'edit',
                version:this.API.paramVersion,
			}
			if (this.isEmpty(params.realName)) {
				Toast('请输入真实姓名');
				return false;
			}
			if (this.isEmpty(params.phone)) {
				Toast('请输入手机号码');
				return false;
			}
			if (this.isEmpty(params.phone)) {
				Toast('请输入验证码');
				return false;
			}
            this.realName = this.$refs.realName.value
            this.phone = this.$refs.phone.value
            this.code = this.$refs.code.value
            const toast = Toast.loading({
				duration: 0, // 持续展示 toast
				forbidClick: true,
				message: '验证码中'
			})
            this.ServerAPI.postAPI(this.API.checkFindMobile2, params, (success, data) => {
                Toast.clear()
				if (success) {
					if (data.code == '0000') {
						Toast('验证成功');
                        this.step1 = false
                        this.step2 = true
					} else {
						Toast(data.info);
					}
				} else {
					Toast('网络错误，请重试');
				}
			});
        },
		toPush () {
			let params = {
				newPassword: this.$refs.newpassword.value,
				vailPassword: this.$refs.cpassword.value,
                loginName: this.accName,
				realName: this.realName,
                phone: this.phone,
                vcode: this.code,
				type: 'edit',
                version:this.API.paramVersion,
			}
			if (this.isEmpty(params.newPassword)) {
				Toast('新密码不能为空')
				return false
			}
			if (params.newPassword != params.vailPassword) {
				Toast('两次新密码输入必须相同')
				return false
			}
            const toast = Toast.loading({
				duration: 0, // 持续展示 toast
				forbidClick: true,
				message: '提交中'
			})
			this.ServerAPI.postAPI(this.API.updatePass2, params, (success, data) => {
                Toast.clear()
				if (success) {
					if (data.code == '0000') {
						Toast('修改成功，请重新登录')
						this.logout()
					} else {
						Toast(data.info)
					}
				} else {
					Toast('网络错误，请重试')
				}
			})
		},
        getHelpInfo() {
            this.helpList = true
			let params = {
				version: this.API.paramVersion,
				appType:'H5',
                visitType: 'WAP',
				phoneVersion:browserName + ' ' + browserVersion,
				phoneModel:mobileModel
			};
			this.ServerAPI.postAPI(this.API.setting,params,(success,data)=>{
                if(success){
                    if(data.code === '0000'){
                        this.helpData = data.data
                        if(data.data.kefu1 !== null) {
                            this.showHelp1 = true
                        }
                        if(data.data.kefu2 !== null){
                            this.showHelp2 = true
                        }
                    }
                }
            });
		},
        toHelpMode(value){
            this.helpList = false
            if(value === 1){
                if(this.helpData.kefu1 === 'LiveChatSDK'){
                    sessionStorage.setItem('helpUrl',this.API.kfLiveChat)
                }else{
                    sessionStorage.setItem('helpUrl',this.helpData.kefu1)
                }
            }else if(value === 2){
                sessionStorage.setItem('helpUrl',this.helpData.kefu2)
            }
            this.$router.push("/help2")
            this.helpList = false
        },
        goBack(){
            this.$router.back()
        },
        logout () {
			this.ServerAPI.postAPI(this.API.logout, null, () => {
			})
            sessionStorage.setItem('loginMark','0')
            sessionStorage.setItem('showWithdraw','1')
			sessionStorage.setItem('isSelect', '4')
			sessionStorage.setItem('showNotice', '1');
			sessionStorage.removeItem('initIndex')
			sessionStorage.removeItem('userName')
			sessionStorage.removeItem('userDays')
			sessionStorage.removeItem('userLev')
			sessionStorage.removeItem('cashMax')
			sessionStorage.removeItem('cashMin')
			sessionStorage.removeItem('payId')
			sessionStorage.removeItem('gameName')
			sessionStorage.removeItem('gameId')
			sessionStorage.removeItem('showDownload')
			sessionStorage.removeItem('cashPwd')
			sessionStorage.removeItem('needHandleWithdraw')
			sessionStorage.removeItem('helpIndex')
			sessionStorage.removeItem('msgSaveId')
			sessionStorage.removeItem('multiNum')
			sessionStorage.removeItem('homeNavIndex')
			sessionStorage.removeItem('searchData')
			sessionStorage.removeItem('favData')
			sessionStorage.removeItem('homeMatchType')
			sessionStorage.removeItem('discountFromHome')
			sessionStorage.removeItem('fromHome')
			this.setLogin(false)
			this.$router.replace('/login')
		},
	}
}
</script>

<style lang="scss" scoped>
.pswdSet {
	min-height: 100vh;
	background: #EDEFF2;
    .replace-header {
        width: 100%;
        height: 1rem;
        color: #2A2929;
        font-size: .36rem;
        line-height: 1rem;
        padding: 0 .32rem;
        background: #FFFFFF;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        z-index: 88;
        .goBack {
            width: .8rem;
            img {
                float: left;
                height: .32rem;
                margin: 0.34rem 0;
            }
        }
        .left-blank {
            width: .5rem;
        }
        .header-title {
            text-align: center;
            color: #2A2929;
            font-size: .3rem;
            font-family: PingFang-SC-Medium;
            position: relative;
            line-height: .74rem;
            height: 1rem;
            .small-title {
                margin-top: -.38rem;
                color: #A8B3C3;
                font-size: .22rem;
            }
        }
        .header-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0.8rem;
            height: 0.08rem;
            background: #78BDF2;
            margin-left: -.4rem;
        }
        .header-right {
            img {
                height: .8rem;
            }
        }
    }
    .main {
        margin: 1rem auto 0;
        color: #464646;
        font-size: .26rem;
        .name-remind {
            height: 1rem;
            margin-bottom: .2rem;
            background: #FFFFFF;
            padding: 0 .3rem;
            font-size: .24rem;
            .top-reminds-icon {
                font-size: .4rem;
                margin-right: .2rem;
            }
        }
        .content-list {
            height: 1rem;
            padding: 0 .3rem;
            background: #FFFFFF;
            .content-list-left {
                width: 30%;
            }
            .content-list-right {
                width: 70%;
                input {
                    width: 100%;
                    border: none;
                    outline: none;
                }
                .code-input {
                    width: calc(100% - 2rem);
                }
                .code-btn {
                    width: 1.6rem;
                    outline: none;
                    height: .5rem;
                    line-height: .5rem;
                    font-size: .2rem;
                    color: #FFFFFF;
                    border-radius: .25rem;
                    background: linear-gradient(90deg,#20a4ff,#067dff);
                    margin-left: .2rem;
                    border: none;
                    text-align: center;
                }
            }
        }
        .content-list:not(:first-child) {
            border-top: #ECECEC 1px solid;
        }
        .content-list2 {
            height: unset;
            padding-bottom: .25rem;
            .content-list-title {
                margin-top: .2rem;
            }
            .content-list-chose {
                border: 1px solid #F0F0F0;
                border-radius: 2px;
                height: .6rem;
                color: #A8B3C3;
                margin-top: .06rem;
                padding: 0 .2rem;
                .right-icon {
                    font-size: .4rem;
                }
            }
             .content-list-side-box {
                 padding-bottom: .2rem;
                .content-list-side {
                    width: 46%;
                    .content-list-title {
                        margin-top: .2rem;
                    }
                    .content-list-side-50 {
                        border: 1px solid #F0F0F0;
                        border-radius: 2px;
                        height: .6rem;
                        color: #A8B3C3;
                        margin-top: .06rem;
                        padding: 0 .2rem;
                        .right-icon {
                            font-size: .4rem;
                        }
                    }
                    .black {
                        color: #464646;
                    }
                }
            }
            .black {
                color: #464646;
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
.van-popup {
    background: none;
    .help-list-box {
        .help-list {
            display: block;
            width: 90%;
            margin: 0 auto .2rem;
        }
        .help-close-btn {
            width: 100%;
            background: #FFFFFF;
            border-radius: .3rem .3rem 0 0;
            color: #7C8591;
            font-weight: bold;
            font-size: .3rem;
            padding: .2rem 0 .2rem;
            .help-close-btn-fonts {
                width: 90%;
                height: .8rem;
                margin: 0 auto;
                border: 1px solid #C3CAD7;
                border-radius: 2px;
            }
        }
    }
}
</style>
