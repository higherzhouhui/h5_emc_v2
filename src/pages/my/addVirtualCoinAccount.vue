<template>
	<div class="add-virtual-coin">
        <div class="replace-header">
			<div class="goBack" @click="goBack()">
                <img src="../../../static/images/back-icon.png" alt="" class="back-icon">
            </div>
			<div class="header-title">
                {{titleFonts}}
                <div class="small-title">{{queryTitle}}</div>
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
            <div class="content-list flex-b">
                <div class="content-list-left">提现密码</div>
				<div class="content-list-right flex-b">
					<input type="password" maxlength="16" placeholder="请输入提现密码" ref="cashPwd" @input='checkStep1()'>
                    <div class="forget-pwd" @click="toForget()">忘记密码?</div>
				</div>
			</div>
            <div class="content-list flex-b">
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
                <van-button class="btnCover" type="info" @click="toNext()" :disabled="inputStatus">下一步</van-button>
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
            <div class="content-list flex-b">
                <div class="content-list-left">真实姓名</div>
				<div class="content-list-right">{{realNameShow}}</div>
			</div>
            <div class="content-list content-list2">
                <div class="content-list-title">币种选择</div>
				<div class="content-list-chose flex-b" @click="showPicker = true" :class="virtualCoinName !== '币种选择'?'black':''">
					{{ virtualCoinName }}
                    <van-icon name="arrow-down" class='right-icon bold'/>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">账户地址</div>
				<div class="content-list-right">
					<input type="text" maxlength="100" placeholder="请输入账户地址" ref="adressInput" @input='checkContent()'>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">确认账户地址</div>
				<div class="content-list-right">
					<input type="text" maxlength="100" placeholder="请确认您的帐户地址" ref="adressCfmInput" @input='checkContent()'>
				</div>
			</div>
            <div class="bottom-reminds text-c">
                <div class="bottom-reminds-blue">- 温馨提示 -</div>
                <div class="bottom-reminds-gray">收款帐号必须是{{introSwitchFonts}}协议的帐号，否则资产将丢失。</div>
            </div>
            <div class="submitBlue">
                <van-button class="btnCover" round type="info" @click="subAdd()" :disabled="inputStatus2">确定</van-button>
            </div>
        </div>
		<van-popup class="account-chosing-box" v-model="showPicker"  position="bottom">
			<van-picker show-toolbar class="account-picker" :title="'请选择币种'" :columns="columns" swipe-duration="1000" @change="changeAccount" @confirm="cfmAccountSub" @cancel="showPicker = false"/>
		</van-popup>
		<van-popup class="account-chosing-box" v-model="showPicker2" round>
			<div class="picker-btn picker-title">请选择平台渠道</div>
			<van-picker class="account-picker" :columns="columns2" swipe-duration="500" @change="changeAccount2"/>
			<div class="picker-btn" @click="cfmAccountSub2">确定</div>
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
import {Dialog,Toast} from 'vant'
import {mobileModel, browserName, osVersion,browserVersion} from 'mobile-device-detect'

export default {
	name: 'addVirtualCoinAccount',
	components: {
		Toast,
	},
	data () {
		return {
			accountName: '',
			virtualCoinName: '币种选择',
			virtualCoinType: '',
			userPhone: '',
			getSms: '',
			inputCheck: true,
			adressInput: '',
			adressCfmInput: '',
			codeInput: '',
			columns: [],
			columns2: [],
			showPicker: false,
			showPicker2: false,
			realName: '',
			sysVirtualId: '',
            chainCode: '',
			virtualPlatformId: '',
			virtualAccount: '',
			vCode: '',
			queryIndex: 0,
			queryIndex2: 0,
            introSwitchFonts:'',
            realNameShow:'',

            step1:true,
            step2:false,
            inputStatus:true,
            inputStatus2:true,

            hasCashPwd:true,
            cashPassword:'',
            cashCard:'',
            showRemindsImg:false,
            titleFonts:'身份验证',

            helpList:false,
            showHelp1:true,
            showHelp2:true,
            helpData:{},
            queryTitle:'虚拟币绑定'
		}
	},
	beforeRouteLeave (to, from, next) {   
		this.$destroy(true)
		next()
	},
	mounted () {
        this.checkPwd()
		// this.getUserInfo()
		// this.getChannel()
        // this.getChainList()
	},
	methods: {
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
            if(this.hasCashPwd === true){
                if(this.$refs.realName.value !== '' && this.$refs.phone.value !== '' && this.$refs.code.value !== '' && this.$refs.cashPwd.value !== ''){
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
        toNext(){
            let params = {
                loginName: sessionStorage.getItem('userName'),
				realName: this.$refs.realName.value,
				phone: this.$refs.phone.value,
				vcode: this.$refs.code.value,
                cashPassword:this.$refs.cashPwd.value,
                // cashRealName: '测试号',
                cashCard:this.$refs.cashCard.value,
				type: 'virtual',
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
            this.cashPassword = this.$refs.cashPwd.value
            this.cashCard = this.$refs.cashCard.value
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
                        this.titleFonts = '添加虚拟币'
                        this.getUserInfo()
                        this.getChannel()
                        this.getChainList()
					} else {
						Toast(data.info);
					}
				} else {
					Toast('网络错误，请重试');
				}
			});
        },
		getUserInfo () {
			this.ServerAPI.postAPI(this.API.userInfo, '', (success, data) => {
				if (success) {
					if (data.code === '0000') {
						this.realNameShow = data.data.realName
					} else {
						Toast(data.info)
					}
				} else {
					Toast('网络错误，请重试')
				}
			})
		},
        getChainList(){
            this.ServerAPI.postAPI(this.API.chainList, '', (success,data)=>{
                if (success) {
                    if (data.code === '0000') {
                        this.columnsAll = data.data
                        data.data.forEach((item, index) => {
                            this.columns.push(item.chainName)
                        })
                        if(this.columnsAll[0].chainCode === 'usdterc20'){
                            this.introSwitchFonts = 'ERC20'
                        }else if(this.columnsAll[0].chainCode === 'usdttrc20'){
                            this.introSwitchFonts = 'TRC20'
                        }
                        this.virtualCoinName = this.columns[0]
                    } else {
                        Toast(data.info)
                    }
                } else {
                    Toast('网络错误，请重试')
                }
            })
        },
		getChannel () {
			this.ServerAPI.postAPI(this.API.virtualCoinChannel, '', (success, data) => {
				if (success) {
					if (data.code === '0000') {
						this.columnsAll2 = data.data
						data.data.forEach((item, index) => {
							this.columns2.push(item.platformName)
						})
						this.virtualCoinType = this.columns2[0]
					} else {
						Toast(data.info)
					}
				} else {
					Toast('网络错误，请重试')
				}
			})
		},
		subAdd () {
			if (this.adressInput !== this.adressCfmInput) {
				Toast('帐户地址输入不一致')
				return
			}
			if (this.columnsAll.length === 1) {
				this.chainCode = this.columnsAll[0].chainCode
			} else if (this.columnsAll.length > 1) {
				this.chainCode = this.columnsAll[this.queryIndex].chainCode
			}
			if (this.columnsAll2.length === 1) {
				this.virtualPlatformId = this.columnsAll2[0].platformId
			} else if (this.columnsAll2.length > 1) {
				this.virtualPlatformId = this.columnsAll2[this.queryIndex2].platformId
			}
			this.virtualAccount = this.adressInput
			this.vCode = this.codeInput
			let params = {
                chainCode:this.chainCode,
				virtualPlatformId: this.virtualPlatformId,
				cardNumber: this.$refs.adressInput.value,
				vcode: this.code,
				cashPassword: this.cashPassword,
				cashCard: this.cashCard,
				// cashRealName: '测试号',
                phone:this.phone,
                realName:this.realName,
                version:this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.virtualCoinSub3, params, (success, data) => {
				if (success) {
					if (data.code === '0000') {
						Toast('添加成功')
                        sessionStorage.setItem('initPage','2')
						this.$router.replace('/addBank')
					} else {
						Toast(data.info)
					}
				} else {
					Toast('网络错误，请重试')
				}
			})
		},
		changeAccount (picker, value, index) {
			this.virtualCoinName = value
			this.queryIndex = index
            if(this.columnsAll[index].chainCode === 'usdterc20'){
                this.introSwitchFonts = 'ERC20'
            }else if(this.columnsAll[index].chainCode === 'usdttrc20'){
                this.introSwitchFonts = 'TRC20'
            }
			this.checkContent()
		},
		changeAccount2 (picker, value, index) {
			this.virtualCoinType = value
			this.queryIndex2 = index
			this.checkContent()
		},
		cfmAccountSub () {
			this.showPicker = false
            this.checkContent()
		},
		cfmAccountSub2 () {
			this.showPicker2 = false
		},
		checkContent () {
			if (this.virtualCoinName.length > 0 && this.virtualCoinType.length > 0 && this.$refs.adressInput.value !== '' && this.$refs.adressCfmInput.value !== '') {
				this.inputStatus2 = false
			} else {
				this.inputStatus2 = true
			}
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
.add-virtual-coin {
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
            margin-top: .2rem;
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
.bottom-reminds {
	margin: .2rem auto 0;
	font-size: .22rem;
    color: #666666;
	.bottom-reminds-gray {
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
