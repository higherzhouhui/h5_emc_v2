<template>
	<div class="password-retrieval">
        <div class="replace-header">
			<div class="goBack" @click="goBack()">
                <img src="../../../static/images/back-icon.png" alt="" class="back-icon">
            </div>
			<div class="header-title">
                {{titleFonts}}
                <div class="small-title">提现密码</div>
            </div>
			<div class="header-right" @click="getHelpInfo()">
                <img src="../../../static/images/head-help-icon.png" alt="">
            </div>
		</div>
		<!-- <HeaderTop :title="titleFonts"></HeaderTop> -->
        <div class="main" v-if='step1'>
            <div class="content-list flex-b">
                <div class="content-list-left">真实姓名</div>
				<div class="content-list-right">
					<input type="text" maxlength="16" placeholder="请输入真实姓名" ref="realName" @input='checkStep1()'>
				</div>
			</div>
            <!-- <div class="content-list flex-b" v-if='hasCashPwd'>
                <div class="content-list-left">提现密码</div>
				<div class="content-list-right flex-b">
					<input type="password" maxlength="16" placeholder="请输入提现密码" ref="cashPwd" @input='checkStep1()'>
                    <div class="forget-pwd" @click="toForget()">忘记密码?</div>
				</div>
			</div> -->
            <div class="content-list flex-b" v-if='hasCashPwd'>
                <div class="content-list-left">提现信息</div>
				<div class="content-list-right">
					<input type="text" maxlength="" placeholder="请输入银行卡号/虚拟币地址/数字货币地址" ref="cashCard" @input='checkStep1()'>
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
                    <button class='code-btn' @click="sendMessage($event)">发送验证码</button>
				</div>
			</div>
            <div class="submitBlue">
                <van-button class="btnCover" round type="info" @click="toNext()" :disabled="inputStatus">下一步</van-button>
			</div>
            <div class="reminds-box" v-if='hasCashPwd'>
                <div class="line">
                    <span class="bold">温馨提醒：</span><br>
                    <!-- 1. 忘记提现密码：点击<span class="bold">【忘记密码？】</span>身份验证后重置<br> -->
                    1. 真实姓名/手机号需要与注册会员绑定一致<br>
                    2. 若无提现记录，提现信息栏位可不填写<br>
                    4. 提现信息说明：交易记录/提现记录，查看<span class="bold">最后一笔提现信息，</span>将完整银行卡号或虚拟币地址或数字货币地址填入「提现信息」中进行验证（不包含会员互转）
                </div>
                <div class="blue text-c" @click="showRemindsImg = true">【图片说明】</div>
            </div>
        </div>
        <div class="main" v-if='step2'>
            <div class="content-list flex-b">
                <div class="content-list-left">新取款密码</div>
				<div class="content-list-right">
					<input type="password" maxlength="6" placeholder="请输入新取款密码" ref="newPwd" oninput="if(value.length>11)value=value.slice(0,11)" @input='checkStep2()'>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">确认密码</div>
				<div class="content-list-right">
					<input type="password" maxlength="6" placeholder="请再次输入新取款密码" ref="newPwdCfm" oninput="if(value.length>11)value=value.slice(0,11)" @input='checkStep2()'>
				</div>
			</div>
            <div class="submitBlue">
                <van-button class="btnCover" round type="info" @click="toPush()" :disabled="inputStatus2">提交</van-button>
			</div>
        </div>
        <van-popup class="reminds-pop" v-model="showRemindsImg">
			<img src="../../../static/images/withdraw-info-demo.png" alt="" class="reminds-img">
            <div class="reminds-close-box">
                <van-icon class='' name="close" color="#FFFFFF" size='.6rem' @click="showRemindsImg = false"/>
            </div>
		</van-popup>
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
import ListPswd from '../../components/inputList/list';
import Submit from '../../components/submit/submit';
import MuSubmit from '../../components/submit/muSubmit';
import {Toast} from 'vant';
import {mobileModel, browserName, osVersion,browserVersion} from 'mobile-device-detect'

export default {
	name: 'password-retrieval',
	components: {
		ListPswd,
		Submit,
		MuSubmit,
	},
	data() {
		return {
            telValue:'',
            codeValue:'',
            secondsShow:'',
            isSending:false,

            step1:true,
            step2:false,
            inputStatus:true,
            inputStatus2:true,

            hasCashPwd:true,
            cashPassword:'',
            cashCard:'',
            showRemindsImg:false,
            titleFonts:'身份验证',
            //修改取款密码
            helpList:false,
            showHelp1:true,
            showHelp2:true,
            helpData:{},
		}
	},
	mounted() {
        this.checkPwd()
	},
	beforeRouteLeave(to, from, next) {
        sessionStorage.removeItem('safeCheck')
		this.$destroy(true)
		next()
	},
	methods: {
        checkPwd(){
            if(sessionStorage.getItem('cashPwd') === 'false'){
                this.hasCashPwd = false
            }
        },
        checkStep1(){
            if(this.hasCashPwd === true){
                if(this.$refs.realName.value !== '' && this.$refs.phone.value !== '' && this.$refs.code.value !== ''){
                    this.inputStatus = false
                }else{
                    this.inputStatus = true
                }
            }else{
                if(this.$refs.realName.value !== '' && this.$refs.phone.value !== '' && this.$refs.code.value !== ''){
                    this.inputStatus = false
                }else{
                    this.inputStatus = true
                }
            }
        },
        sendMessage(e) {
			let params = {
				loginName: sessionStorage.getItem('userName'),
				realName: this.$refs.realName.value,
				phone: this.$refs.phone.value,
				type: 'cash',
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
            let time = 60
            if(time === 60){
                this.ServerAPI.postAPI(this.API.sendSms2, params, (success, data) => {
                    Toast.clear()
                    if (success) {
                        if(data.code === '0000') {
                            Toast('验证码发送成功');
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
                        }else{
                            Toast(data.info);
                        }
                    } 
                })
            }
		},
        toNext(){
            if(this.hasCashPwd === true){
                // this.cashPassword = this.$refs.cashPwd.value
                this.cashCard = this.$refs.cashCard.value
            }
            let params = {
				loginName: sessionStorage.getItem('userName'),
				realName: this.$refs.realName.value,
				phone: this.$refs.phone.value,
				vcode: this.$refs.code.value,
				// cashPassword: this.cashPassword,
				cashCard: this.cashCard,
				// cashRealName: '测试号',
				type: 'cash',
                version:this.API.paramVersion,
			}
            // if (this.isEmpty(params.loginName)) {
			// 	Toast('请输入登录账号');
			// 	return false;
			// }
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
            // this.accName = this.$refs.accName.value
            this.realName = this.$refs.realName.value
            this.phone = this.$refs.phone.value
            this.code = this.$refs.code.value
            const toast = Toast.loading({
				duration: 0, // 持续展示 toast
				forbidClick: true,
				message: '验证码中'
			})
            this.ServerAPI.postAPI(this.API.checkFindMobile4, params, (success, data) => {
                Toast.clear()
				if (success) {
					if (data.code == '0000') {
						Toast('验证成功');
                        this.step1 = false
                        this.step2 = true
                        this.titleFonts = '修改取款密码'
					} else {
						Toast(data.info);
					}
				} else {
					Toast('网络错误，请重试');
				}
			});
        },
        checkStep2(){
            if(this.$refs.newPwd.value !== '' && this.$refs.newPwdCfm.value !== '') {
                this.inputStatus2 = false
            }else{
                this.inputStatus2 = true
            }
        },
        toPush(){
            let params = {
                loginName: sessionStorage.getItem('userName'),
				password: this.$refs.newPwd.value,
				qpassword: this.$refs.newPwdCfm.value,
				realName: this.realName,
				phone: this.phone,
				vcode: this.code,
                cashPassword: this.cashPassword,
				cashCard: this.cashCard,
				cashRealName: '测试号',
                version:this.API.paramVersion,
			}
            if (this.isEmpty(params.password)) {
				Toast('请输入新取款密码');
				return false;
			}
            if (params.password !== params.qpassword) {
				Toast('两次密码输入不一致');
				return false;
			}
            const toast = Toast.loading({
				duration: 0, // 持续展示 toast
				forbidClick: true,
				message: '提交中'
			})
            this.ServerAPI.postAPI(this.API.editCashPassword3, params, (success, data) => {
                Toast.clear()
				if (success) {
					if (data.code == '0000') {
						Toast('修改成功')
                        sessionStorage.setItem('cashPwd','true')
                        this.$router.replace('/safeCenter')
					} else {
						Toast(data.info);
					}
				} else {
					Toast('网络错误，请重试');
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
        toForget(){
            this.$router.push('/forgetCashPassword')
        }
	}
}
</script>

<style lang="scss" scoped>
.password-retrieval {
	width: 100%;
	height: 100%;
	background: #f7f8fa;
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
                width: 24%;
            }
            .content-list-right {
                width: 76%;
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
                    font-size: .2rem;
                    color: #FFFFFF;
                    border-radius: .25rem;
                    background: linear-gradient(90deg,#20a4ff,#067dff);
                    margin-left: .2rem;
                    border: none;
                }
                .forget-pwd {
                    width: 2rem;
                    color: #3677FF;
                    text-align: right;
                }
            }
        }
        .reminds-box {
            padding: 0 .3rem .15rem;
            margin-top: .4rem;
            .line {
                word-break:break-all;
                .bold {
                    word-break:break-all;
                }
            }
            .blue {
                color: #3677FF;
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

	.topP {
		margin: .2rem 0 0;
        .input-list-line-box {
             width: 94%;
            margin: .2rem auto 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #FFFFFF;
            padding: .1rem .3rem .1rem 0;
            .input-list-line2 {
                width: 70%;
            }
            .input-list-line::after {
                border: none;
            }
            .get-code-btn {
                padding: .1rem;
                font-size: .2rem;
                border: #3677ff 1px solid;
                color: #3677ff;
                border-radius: .1rem;
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
		margin-top: .6rem;
		border: none;
		border-radius: .45rem;
	}
}
.reminds-pop.van-popup {
    background-color: unset;
    .reminds-img {
        width: 80vw;
    }
    .reminds-close-box {
        margin: .2rem auto 0;
        text-align: center;
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
