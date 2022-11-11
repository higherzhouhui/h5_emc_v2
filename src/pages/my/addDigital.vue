<template>
	<div class="addbankCard2">
        <div class="replace-header">
			<div class="goBack" @click="goBack()">
                <img src="../../../static/images/back-icon.png" alt="" class="back-icon">
            </div>
			<div class="header-title">
                {{titleFonts}}
                <div class="small-title">添加数字货币</div>
            </div>
			<div class="header-right" @click="getHelpInfo()">
                <img src="../../../static/images/head-help-icon.png" alt="">
            </div>
		</div>
        <div class="main" v-if='step1'>
            <div class="content-list flex-b">
                <div class="content-list-left">真实姓名</div>
				<div class="content-list-right">
					<input type="text" maxlength="16" placeholder="请输入真实姓名" v-model="realName" @input='checkStep1()'>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">提现密码</div>
				<div class="content-list-right flex-b">
					<input type="password" maxlength="16" placeholder="请输入提现密码" v-model="cashPwd" @input='checkStep1()'>
                    <div class="forget-pwd" @click="toForget()">忘记密码?</div>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">提现信息</div>
				<div class="content-list-right">
					<input type="text" maxlength="" placeholder="请输入银行卡号/虚拟币地址/数字货币地址" v-model="cashCard" @input='checkStep1()'>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">手机号码</div>
				<div class="content-list-right">
					<input type="number" maxlength="11" placeholder="请输入绑定的手机号码" v-model="phone" oninput="if(value.length>11)value=value.slice(0,11)" @input='checkStep1()'>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">验证码</div>
				<div class="content-list-right flex-b">
					<input class='code-input' type="number" maxlength="4" placeholder="请输入验证码" v-model="code" oninput="if(value.length>4)value=value.slice(0,4)" @input='checkStep1()'>
                    <button class='code-btn' @click="sendMessage($event)">发送验证码</button>
				</div>
			</div>
            <div class="submitBlue">
                <van-button class="btnCover" round type="info" @click="toNext()" :disabled="inputStatus">下一步</van-button>
			</div>
            <div class="reminds-box">
                <div class="line">
                    <span class="bold">温馨提醒：</span><br>
                    1. 真实姓名/手机号需要与注册会员绑定一致<br>
                    2. 忘记提现密码：点击<span class="bold">【忘记密码？】</span>身份验证后重置<br>
                    3. 若无提现记录，提现信息栏位可不填写<br>
                    4. 提现信息说明：交易记录/提现记录，查看<span class="bold">最后一笔提现信息，</span>将完整银行卡号或虚拟币地址或数字货币地址填入「提现信息」中进行验证（不包含会员互转）
                </div>
                <div class="blue text-c" @click="showRemindsImg = true">【图片说明】</div>
            </div>
        </div>
		<div class="main" v-if='step2'>
            <div class="content-list content-list2">
                <div class="content-list-title">所属币商</div>
				<div class="content-list-chose flex-b" @click="showSelectFuc()" :class="showBank !== '请选择所属币商'?'black':''">
					{{ showBank }}
                    <van-icon name="arrow-down" class='right-icon bold'/>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">收币地址</div>
				<div class="content-list-right">
					<input type="text" placeholder="请输入收币地址" v-model="cardNumber" @input='checkStep2()'>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">确认收币地址</div>
				<div class="content-list-right">
					<input type="text" placeholder="请再次输入收币地址" v-model="rcardNumber" @input='checkStep2()'>
				</div>
			</div>
			<div class="submitBlue">
                <van-button class="btnCover" round type="info" @click="toPush()" :disabled="inputStatus2">提交</van-button>
			</div>
		</div>
		<van-popup v-model="showSelect" class="popup-content" position="bottom">
            <van-picker show-toolbar :columns="bankListShow" :title="'请选择银行'" @confirm="closeSelect" @cancel="showSelect = false" swipe-duration='1000'/>
		</van-popup>
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
import {Dialog,Toast} from 'vant';
import {mobileModel, browserName, osVersion,browserVersion} from 'mobile-device-detect'

export default {
	name: 'addbankCard2',
	components: {
		Toast
	},
	data() {
		return {
			params: {},
            bankListShow:[],
			index: 0,
			showSelect: false,
			showBank: "请选择所属币商",
			bankData: [],
			submitCheck: false,
            cardNumber:'',
            rcardNumber:'',
            realName:'',
            phone: '',
            code:'',
            step1:true,
            step2:false,
            inputStatus:true,
            inputStatus2:true,
            hasCashPwd:true,
            cashCard:'',
            cashPwd:'',
            showRemindsImg:false,
            titleFonts:'身份验证',

            helpList:false,
            showHelp1:true,
            showHelp2:true,
            helpData:{},
            virtualId:null,
		}
	},
	mounted() {
        this.checkPwd()
        this.getSysDigital()
	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
	methods: {
        getSysDigital(){
            let params = {
                version:this.API.paramVersion,
            }
            this.ServerAPI.postAPI(this.API.digitalType, params, (success,data)=>{
                if (success) {
                    if (data.code === '0000') {
                        this.bankData = data.data;
                        this.bankData.forEach( ele => {
                            this.bankListShow.push(ele.name)
                        })
                    }else{
						Toast(data.info)
					}
                }else{
                    Toast('网络错误，请重试')
                }
            })
        },
        checkPwd(){
            if(sessionStorage.getItem('cashPwd') === 'false'){
                this.hasCashPwd = false
            }
            if(this.hasCashPwd === false){
                Dialog.confirm({
                    message: "请先在'安全中心'设置提现密码",
                    closeOnPopstate:true,
                    confirmButtonColor:'#1D9DFC',
                    showCancelButton:false,
                })
                .then(() => {
                    this.$router.replace('/my')
                })
                .catch(() => {
                });
            }
        },
        checkStep1(){
            if(this.realName !== '' && this.phone !== '' && this.code !== '' && this.cashPwd !== ''){
                this.inputStatus = false
            }else{
                this.inputStatus = true
            }
        },
        checkStep2(){
            if(this.cardNumber !== '' && this.rcardNumber !== '' && this.showBank !== '请选择所属币商'){
                this.inputStatus2 = false
            }else{
                this.inputStatus2 = true
            }
        },
        toNext(){
            let params = {
                loginName: sessionStorage.getItem('userName'),
				realName: this.realName,
				phone: this.phone,
				vcode: this.code,
                cashPassword:this.cashPwd,
                cashCard:this.cashCard,
				type: 'virtual',
                version:this.API.paramVersion,
			}
			if (this.isEmpty(params.realName)) {
				Toast('请输入真实姓名');
				return false;
			}
			if (this.isEmpty(params.cashPassword)) {
				Toast('请输入提现密码');
				return false;
			}
			if (this.isEmpty(params.phone)) {
				Toast('请输入手机号码');
				return false;
			}
			if (this.isEmpty(params.vcode)) {
				Toast('请输入验证码');
				return false;
			}
            const toast = Toast.loading({
				duration: 0, // 持续展示 toast
				forbidClick: true,
				message: '验证码中'
			})
            this.ServerAPI.postAPI(this.API.checkFindMobile3, params, (success, data) => {
                Toast.clear()
				if (success) {
					if (data.code == '0000') {
						Toast('验证成功');
                        this.step1 = false
                        this.step2 = true
                        this.titleFonts = '添加非本人银行卡'
					} else {
						Toast(data.info);
					}
				} else {
					Toast('网络错误，请重试');
				}
			});
        },
		toCardList() {
			this.$router.push('/addBank')
		},
		sendMessage(e) {
            let params = {
                loginName: sessionStorage.getItem('userName'),
				realName: this.realName,
				phone: this.phone,
				type: 'virtual',
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
			let time = 60;
			if (time == 60) {
				this.ServerAPI.postAPI(this.API.sendSms2, params, (success, data) => {
                    Toast.clear()
					if (success) {
						if (data.code == '0000') {
							Toast("短信发送成功");
							e.target.disabled = true;
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
			let cardNumber = this.cardNumber;
			let rcardNumber = this.rcardNumber;
			let virtualId = this.virtualId;
			if (virtualId < 1) {
				Toast("请选择所属币商");
				return false;
			}
			if (this.isEmpty(cardNumber)) {
				Toast("请输入收币地址");
				return false;
			}
			if (cardNumber != rcardNumber) {
				Toast("两次输入的收币地址不相同");
				return false;
			}
			this.params.realName = this.realName;
			this.params.cardNumber = cardNumber;
			this.params.sysVirtualId = virtualId;
			this.params.phone = this.phone;
			this.params.vcode = this.code;
			this.params.cashPassword = this.cashPwd;
			this.params.cashCard = this.cashCard;
            this.params.version = this.API.paramVersion
            const toast = Toast.loading({
				duration: 0, // 持续展示 toast
				forbidClick: true,
				message: '验证码中'
			})
			this.ServerAPI.postAPI(this.API.addDigital, this.params, (success, data) => {
                Toast.clear()
                if (success) {
                    if (data.code == "0000") {
                        Toast("添加成功");
                        sessionStorage.setItem('initPage','3')
                        this.$router.replace('/addBank');
                        // location.reload();
                    } else {
                        Toast(data.info);
                    }
                } else {
                    Toast("网络错误，请重试");
                }
            });
		},
		showSelectFuc() {
			this.showSelect = true;
		},
        closeSelect(value,index) {
            this.showBank = value;
            this.virtualId = this.bankData[index].id;
            this.showSelect = false;
            this.checkStep2()
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
div, p, span {
	font-family: PingFang-SC-Medium;
}
.addbankCard2 {
	width: 100%;
	height: 100%;
	background: #EFEFEF;
	border-bottom: #CCCCCC 1px solid;
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
        margin: .06rem auto 0;
        color: #464646;
        font-size: .26rem;
        margin-top: 1rem;
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
            padding: .02rem .3rem .2rem;
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
</style>
