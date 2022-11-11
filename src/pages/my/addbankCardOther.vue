<template>
	<div class="addbankCard2">
        <div class="replace-header">
			<div class="goBack" @click="goBack()">
                <img src="../../../static/images/back-icon.png" alt="" class="back-icon">
            </div>
			<div class="header-title">
                {{titleFonts}}
                <div class="small-title">非本人银行卡绑定</div>
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
            <div class="content-list flex-b">
                <div class="content-list-left">开户姓名</div>
				<div class="content-list-right">
					<input type="text" maxlength="16" placeholder="请输入开户姓名" v-model="accName" @input='checkStep2()'>
				</div>
			</div>
            <div class="content-list content-list2">
                <div class="content-list-title">所属银行</div>
				<div class="content-list-chose flex-b" @click="showSelectFuc()" :class="showBank !== '请选择开户银行'?'black':''">
					{{ showBank }}
                    <van-icon name="arrow-down" class='right-icon bold'/>
				</div>
                <div class="content-list-side-box flex-b">
                    <div class="content-list-side">
                        <div class="content-list-title">开户省份</div>
                        <div class="content-list-side-50 flex-b" @click="showAddressSelect(1)" :class="sheng !== '请选择省份'?'black':''">
                            {{ sheng }}
                            <van-icon name="arrow-down" class='right-icon bold'/>
                        </div>
                    </div>
                    <div class="content-list-side">
                        <div class="content-list-title">开户城市</div>
                        <div class="content-list-side-50 flex-b" @click="showAddressSelect(2)" :class="shi !== '请选择城市'?'black':''">
                            {{ shi }}
                            <van-icon name="arrow-down" class='right-icon bold'/>
                        </div>
                    </div>
                </div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">开户支行</div>
                <div class="content-list-right">
                    <input type="text" maxlength="30" placeholder="请输入开户支行" ref="bankAddress" @input='checkStep2()'>
                </div>
            </div>
            <div class="content-list flex-b">
                <div class="content-list-left">银行卡号</div>
				<div class="content-list-right">
					<input type="text" maxlength="19" placeholder="请输入银行卡号" oninput="value=value.replace(/[^\d]/g,'')" v-model="cardNumber" @input='checkStep2()'>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">确认卡号</div>
				<div class="content-list-right">
					<input type="text" maxlength="19" placeholder="请再次输入银行卡号" oninput="value=value.replace(/[^\d]/g,'')" v-model="rcardNumber" @input='checkStep2()'>
				</div>
			</div>
			<div class="submitBlue">
                <van-button class="btnCover" round type="info" @click="toPush()" :disabled="inputStatus2">下一步</van-button>
			</div>
		</div>
		<van-popup v-model="showSelect" class="popup-content" position="bottom">
            <van-picker show-toolbar :columns="bankListShow" :title="'请选择银行'" @confirm="closeSelect" @cancel="showSelect = false" swipe-duration='1000'/>
		</van-popup>
		<van-popup class="popup-content" v-model="showProData" position="bottom">
            <van-picker show-toolbar :columns="provinceData" :title="'请选择省份'" @confirm="closeSelectPro" @cancel="showProData = false" swipe-duration='1000'/>
		</van-popup>
		<van-popup class="popup-content" v-model="showCitiesData" position="bottom">
            <van-picker show-toolbar :columns="citiesData" :title="'请选择城市'" @confirm="closeSelectCities" @cancel="showCitiesData = false" swipe-duration='1000'/>
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
import addr from '../../assets/address.json';
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
            provinceData:[],
            citiesData:[],
			index: 0,
			showSelect: false,
			showBank: "请选择开户银行",
			sysBankId: 0,
			bankData: "",
			showCitiesData: false,
			showProData: false,
			sheng: '请选择省份',
			shi: '请选择城市',
			submitCheck: false,
			bankAddress: '',
            cardNumber:'',
            rcardNumber:'',
            accName:'',
            realName:'',
            phone: '',
            code:'',
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
		}
	},
	mounted() {
        this.checkPwd()
        addr.forEach( item => {
            this.provinceData.push(item.name)
        })

	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
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
        checkStep2(){
            if(this.accName !== '' && this.$refs.bankAddress.value !== '' && this.cardNumber !== '' && this.rcardNumber !== '' && this.showBank !== '请选择开户银行' && this.sheng !== '请选择省份' && this.shi !== '请选择城市'){
                this.inputStatus2 = false
            }else{
                this.inputStatus2 = true
            }
        },
        toNext(){
            let params = {
                loginName: sessionStorage.getItem('userName'),
				realName: this.$refs.realName.value,
				phone: this.$refs.phone.value,
				vcode: this.$refs.code.value,
                cashPassword:this.$refs.cashPwd.value,
                cashRealName: '测试号',
                cashCard:this.$refs.cashCard.value,
				type: 'bank',
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
                        this.titleFonts = '添加非本人银行卡'
                        this.loadTop()
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
		bodyScroll(event) {
			event.preventDefault();
		},
		loadTop() {
			// this.ServerAPI.postAPI(this.API.userInfo, "", this.userInfo);
			this.ServerAPI.postAPI(this.API.sysBankList, "", this.sysBankList);
		},
		userInfo(success, data) {
			if (success) {
				if (data.code == '0000') {
					// this.phone = data.data.phone;
				}
			}
		},
		sysBankList(success, data) {
			if (success) {
				if (data.code == '0000') {
					this.bankData = data.data;
                    this.bankData.forEach( ele => {
                        this.bankListShow.push(ele.bankName)
                    }); 
				}
			}
		},
		sendMessage(e) {
            let params = {
                loginName: sessionStorage.getItem('userName'),
				realName: this.$refs.realName.value,
				phone: this.$refs.phone.value,
				type: 'bank',
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
			let accName = this.accName;
			let cardNumber = this.cardNumber;
			let rcardNumber = this.rcardNumber;
			let bankAddress = this.$refs.bankAddress.value;
			// let code = this.$refs.code.value;
			let sysBankId = this.sysBankId;
			if (this.isEmpty(accName)) {
				Toast("请输入开户姓名");
				return false;
			}
			if (sysBankId < 1) {
				Toast("请选择银行");
				return false;
			}
            if(this.sheng === '请选择省份') {
                Toast("请选择银行卡开户省份");
				return false;
            }
            if(this.shi === '请选择城市') {
                Toast("请选择银行卡开户城市");
				return false;
            }
			if (this.isEmpty(cardNumber)) {
				Toast("请输入银行卡号");
				return false;
			}
			if (this.isEmpty(bankAddress)) {
				Toast("请输入开户支行");
				return false;
			}
            var reg = new RegExp("^[0-9]*[1-9][0-9]*$");
            if(!reg.test(cardNumber) || cardNumber.length < 12){
                this.$toast("银行卡号格式不正确!",2);
                return false;
            }
			if (cardNumber != rcardNumber) {
				Toast("两次输入的银行卡号不相同");
				return false;
			}
			this.params.cardRealName = accName;
			this.params.realName = this.realName;
			this.params.province = this.sheng;
			this.params.city = this.shi;
			this.params.cardNumber = cardNumber;
			this.params.bankAddress = bankAddress;
			this.params.sysBankId = sysBankId;
			this.params.phone = this.phone;
			this.params.vcode = this.code;
			this.params.cashPassword = this.cashPassword;
			this.params.cashRealName = '测试号';
			this.params.cashCard = this.cashCard;
            this.params.version = this.API.paramVersion,
			this.ServerAPI.postAPI(this.API.addBankDataOther3, this.params, this.addBankDataOther);
		},
		addBankDataOther(success, data) {
			if (success) {
				if (data.code == "0000") {
					Toast("添加成功,请返回银行卡管理");
					this.$router.replace('/addBank');
					// location.reload();
				} else {
					Toast(data.info);
				}
			} else {
				Toast("网络错误，请重试");
			}
		},
		showSelectFuc() {
			this.showSelect = true;
		},
        closeSelect(value,index) {
            this.showBank = value;
            this.sysBankId = this.bankData[index].sysBankId;
            this.showSelect = false;
            this.checkStep2()
		},
        closeSelectPro(value,index){
            if(this.sheng === value){
                this.showProData = false
            }else{
                this.sheng = value
                this.citiesData = []
                addr[index].cities.forEach( item => {
                    this.citiesData.push(item.name)
                })
                this.shi = '请选择城市'
                this.showProData = false
            }
            this.checkStep2()
        },
        closeSelectCities(value,index){
            this.shi = value
            this.showCitiesData = false
            this.checkStep2()
        },
		showAddressSelect(id) {
			if (id == 1) {
				this.showProData = true;
			} else {
				this.showCitiesData = true;
			}
		},
        showAddressSelect(id) {
			if (id == 1) {
				this.showProData = true;
			} else {
                if(this.citiesData.length === 0){
                    Toast("请先选择省份");
                    return
                }else{
		            this.showCitiesData = true;
                }
			}
		},
		onValuesChangeBank(picker, values) {
			let bank = values[0];
			this.slotBanks[0].values.map((v, k) => {
				if (v == bank) {
					this.index = k;
				}
			});
		},
		onValuesChange(picker, values) {
			this.sheng = values;
			picker.slots[0].values.map((v, k) => {
				if (v == values[0]) {
					this.slots2[0].values = []
					addr[k].cities.map((v1, k1) => {
						this.slots2[0].values.push(v1.name)
					})
					this.shi = this.slots2[0].values[0];
				}
			})
		},
		onValuesChange2(picker, values) {
			this.shi = values;
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
