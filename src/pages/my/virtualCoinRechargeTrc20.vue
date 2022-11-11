<template>
	<div class="virtual-coin-recharge">
		<HeaderTop :title="`虚拟币TRC20`"></HeaderTop>
		<div class="input-area">
			<div class="charge-money">
				<div class="charge-money-left">充值人民币:</div>
				<div class="charge-money-right">
					<div class="show-cash">
						<input type="tel" placeholder="请输入充值金额" ref="chargeMoney" class="input-cash" maxlength="10"
						       @input="inputCtr()">
					</div>
				</div>
			</div>
			<div class="charge-money charge-money2">
				<div class="charge-money-left">充值USDT:</div>
				<div class="charge-money-right charge-money-right2">
					<div class="show-USDT">(汇率：<span>{{ virtualRate }}</span>)<span class="copy-fonts"
					                                                                @click="virtualCoinNum"
					                                                                id="virtualCoinNum">复制</span></div>
					<div class="show-cash">
						<input type="tel" placeholder="请输入充值的USDT" ref="chargeVirtualCoin"
						       class="input-cash input-cash2" maxlength="10"
						       @input="inputCtr2()">
					</div>
				</div>
			</div>
			<div class="input-box input-box-time">
				<van-field label="存款时间:" :value="timeNowShow" input-align="right" @click="timeSelect = true" readonly/>
				<img src="../../../static/images/time-icon.png" alt="" class="time-icon">
			</div>
			<div class="input-box">
				<van-field label="汇款留言:" v-model="leaveMsg" type="text" placeholder="请输入您的汇款留言" maxlength="20"
				           input-align="right" autosize/>
			</div>
			<div class="charge-money qr-area">
				<div class="qr-area-left" id="qrcodeImg">
				</div>
				<div class="qr-area-right">
					<div class="qr-area-right-title">充币地址:</div>
					<div class="qr-area-right-adress">{{ virtualCoinAdress }}</div>
					<div class="qr-area-right-limit">充值限额：{{ minRecharge }}-{{ maxRecharge }}</div>
					<div class="qr-area-right-btn">
						<van-button class="blue-btn" type="info" size="small" round @click="copyContent" id="copyBtn">
							复制地址
						</van-button>
						<a class="blue-btn blue-btn2" :href="toDepositUrl" target="_blank">去充值</a>
					</div>
				</div>
			</div>
			<input id="copy_content" type="text" value=""
			       style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;" readonly/>
		</div>
		<div class="bottom-reminds">
			<div class="bottom-reminds-blue">温馨提示:</div>
			<div class="bottom-reminds-gray" v-html="explain">
<!--				1.USDT个数，在转账时以到账数量为准。<br>-->
<!--				2.请勿充值任何非ERC20资产，否则资产将不可找回。<br>-->
<!--				3.必须购买USDT虚拟币，其他无法转账，无法到账。-->
			</div>
		</div>
		<div class="help-link">火币网<span class="blue-fonts" @click="toNewHelp">存款教程</span></div>
		<div class="bottom-btn-box">
			<van-button class="bottom-btn" round type="info" color="#0895FE" block :disabled="inputCheck"
			            @click="subDeposit">提交存款申请
			</van-button>
		</div>
        <div class="bottom-fonts-big">存款成功额外加送1.5%，每日最高优惠888元!</div>
        <div class="bottom-fonts-big2">具体到账金额以实际到账为准</div>
		<van-popup v-model="timeSelect" position="bottom" :style="{ width: '100%',height:'30%'}">
			<van-datetime-picker v-model="currentTime" type="time" title="选择时间" :min-hour="0" :max-hour="23"
			                     @confirm="timeChosed" @cancel="timeSelect = false"/>
		</van-popup>
		<van-popup v-model="helpVideoShow" :style="{ width: '90%',height:'90%'}">
			<div class="video-close" @click="closeVideo"><span>关闭</span></div>
			<video width="100%" height="95%" controls id="isLiving" autoplay="autoplay" muted>
				<source :src="helpVideoUrl" type="">
				您的浏览器不支持该视频播放。
			</video>
		</van-popup>
	
	
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top'
import {Toast} from 'vant';
import MuSubmit from '../../components/submit/muSubmit'
import dayjs from 'dayjs'
import QRCode from 'qrcodejs2'
import {DatetimePicker} from 'vant';

export default {
	name: 'virtualCoinRechargeTrc20',
	components: {
		HeaderTop,
		MuSubmit,
		DatetimePicker
	},
	data() {
		return {
			chargeMoney: '',
			virtualCoinId: '',
			showDate: '',
			timeNowShow: '',
			inputMoney: '',
			leaveMsg: '',
			inputCheck: true,
			showPicker: false,
			AccountValue: '',
			minRecharge: '',
			maxRecharge: '',
			virtualCoinAdress: '',
			columns: [],
			columnsAll: [],
			showVirtualCoinAccount: '',
			showVirtualCoinName: '',
			payId: '',
			sysVirtualId: '',
			virtualRate: '',
			currentTime: '12:00',
			timeSelect: false,
			toDepositUrl: '',
			helpVideoUrl: '',
			helpVideoImg: '',
			helpVideoShow: false,
			virtualInfo:'',
			explain:'',
		}
	},
	beforeRouteLeave(to, from, next) {
		sessionStorage.removeItem('payId')
		sessionStorage.removeItem('explain')
		let _this = this
		clearTimeout(_this.timer)
		this.$destroy(true)
		next()
	},
	mounted() {
		this.timeShow()
		this.getVirtualCoinAccountSys()
		this.toHelp()
		this.payId = sessionStorage.getItem('payId')
		this.explain = sessionStorage.getItem('explain')
		this.explain = this.explain.replace(/\\n/g,"<br>");
		this.explain = this.explain.replace(/\\t/g,"&emsp;");
	},
	methods: {
		qrcode() {
			document.getElementById('qrcodeImg').innerHTML = ''
			new QRCode('qrcodeImg', {
				width: 100,
				height: 100,
				text: this.virtualCoinAdress, // 二维码地址
				colorDark: '#000',
				colorLight: '#fff'
			});
		},
		getVirtualCoinAccountSys() {
			this.ServerAPI.postAPI(this.API.virtualCoinListSysTRC20, '', (success, data) => {
				if (success) {
					if (data.code == '0000') {
						this.columnsAll = data.data;
						this.virtualCoinAdress = data.data.virtualAddress;
						this.minRecharge = this.columnsAll.min;
						this.maxRecharge = this.columnsAll.max;
						this.sysVirtualId = this.columnsAll.virtualId;
						this.virtualRate = this.columnsAll.virtualRate;
						this.virtualInfo = this.columnsAll.virtualInfo;
						this.qrcode();
					} else {
						Toast(data.info)
					}
				} else {
					Toast('网络错误，请重试')
				}
			})
		},
		copyContent() {
			var clickContent = this.virtualCoinAdress
			var inputElement = document.getElementById('copy_content')
			inputElement.value = clickContent
			inputElement.select()
			document.execCommand('Copy')
			document.getElementById('copyBtn').innerHTML = '已复制'
			document.getElementById('virtualCoinNum').innerHTML = '复制'
		},
		virtualCoinNum() {
			var clickContent = this.$refs.chargeVirtualCoin.value
			var inputElement = document.getElementById('copy_content')
			inputElement.value = clickContent
			inputElement.select()
			document.execCommand('Copy')
			document.getElementById('virtualCoinNum').innerHTML = '已复制'
			document.getElementById('copyBtn').innerHTML = '复制地址'
		},
		subDeposit() {
			if(this.$refs.chargeMoney.value.length === 0){
				Toast('请输入充值金额')
				return
			}
			let params = {
				payId: this.payId,
				virtualId: this.sysVirtualId,
				// transactId: this.virtualCoinId,
				virtualInfo:this.virtualInfo,
				cash: this.$refs.chargeMoney.value,
				rate: this.virtualRate,
				num: this.$refs.chargeVirtualCoin.value,
				time: this.timeNowShow,
				mark: this.leaveMsg,
			}
			this.ServerAPI.postAPI(this.API.virtualCoinDeposit, params, (success, data) => {
				if (success) {
					if (data.code == '0000') {
						Toast(data.info)
						this.$router.push('/tradeRecords')
					} else {
						Toast(data.info)
					}
				} else {
					Toast('网络错误，请重试')
				}
			})
		},
		checkContent() {
			if (this.$refs.chargeMoney.value.length > 0) {
				this.inputCheck = false
			} else {
				this.inputCheck = true
			}
		},
		inputCtr() {
			this.$refs.chargeMoney.value = this.$refs.chargeMoney.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
			this.$refs.chargeVirtualCoin.value = this.$refs.chargeMoney.value / this.virtualRate
			this.$refs.chargeVirtualCoin.value = this.$refs.chargeVirtualCoin.value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d).*$/, '$1$2.$3')
			if (this.$refs.chargeMoney.value.length == 0) {
				this.$refs.chargeVirtualCoin.value = ''
			}
			this.checkContent();
		},
		inputCtr2() {
			this.$refs.chargeVirtualCoin.value = this.$refs.chargeVirtualCoin.value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d).*$/, '$1$2.$3')
			this.$refs.chargeMoney.value = this.$refs.chargeVirtualCoin.value * this.virtualRate
			this.$refs.chargeMoney.value = this.$refs.chargeMoney.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
			if (this.$refs.chargeVirtualCoin.value.length == 0) {
				this.$refs.chargeMoney.value = ''
			}
			this.checkContent();
		},
		toHelp() {
			let params = {
				visitType: 'APP',
			}
			this.ServerAPI.postAPI(this.API.virtualCoinHelp, params, (success, data) => {
				if (success) {
					if (data.code == '0000') {
						this.toDepositUrl = data.data.payUrl
						this.helpVideoUrl = data.data.liveUrl
						this.helpVideoImg = data.data.imageUrl
					} else {
						Toast(data.info)
					}
				} else {
					Toast('网络错误，请重试')
				}
			})
		},
        toNewHelp(){
            sessionStorage.setItem('virtualHelp','1')
            this.$router.push('/newerHelp')
        },
		changeAccount(picker, value, index) {
			this.AccountValue = value
			this.virtualCoinAdress = this.columnsAll[index].cardNumber;
			this.minRecharge = this.columnsAll[index].min;
			this.maxRecharge = this.columnsAll[index].max;
			this.sysVirtualId = this.columnsAll[index].id;
			this.virtualRate = this.columnsAll[index].virtualRate;
			document.getElementById('copyBtn').innerHTML = '复制地址'
			this.qrcode()
			this.checkContent()
		},
		cfmAccountSub() {
			// this.cfmAccount();
			this.showPicker = false
		},
		timeShow() {
			let _this = this
			this.timer = setInterval(() => {
				_this.date = new Date() // 修改数据date
				let Y = dayjs().$y + '/'
				let M = dayjs().$M + 1 + '/'
				if (dayjs().$M + 1 < 10) {
					M = '0' + M
				}
				let D = dayjs().$D + ''
				if (dayjs().$D < 10) {
					D = '0' + D
				}
				let Hour = dayjs().$H + ''
				if (dayjs().$H < 10) {
					Hour = '0' + Hour
				}
				let Min = dayjs().$m + ''
				if (dayjs().$m < 10) {
					Min = '0' + Min
				}
				let Sec = dayjs().$s + ''
				if (dayjs().$s < 10) {
					Sec = '0' + Sec
				}
				_this.hoursShow = Hour + ''
				_this.minsShow = Min + ''
				_this.secsShow = Sec + ''
				// _this.dateShow = Y + M + D
				_this.timeNowShow = _this.hoursShow + '时' + _this.minsShow + '分'
				_this.showDate = _this.dateShow + '   ' + _this.hoursShow + ':' + _this.minsShow + ':' + _this.secsShow
			}, 1000)
		},
		timeChosed(value) {
			this.timeNowShow = value.slice(0, 2) + '时' + value.slice(3) + '分'
			this.timeSelect = false;
			let _this = this
			clearTimeout(_this.timer)
		},
		closeVideo() {
			document.getElementById('isLiving').pause();
			this.helpVideoShow = false;
		}
		
	}
}
</script>

<style lang="scss" scoped>
.virtual-coin-recharge {
	min-height: 100vh;
	background: #EDEFF2;
	
	.input-area {
		width: 92%;
		margin: .4rem auto 0;
		overflow: hidden;
		
		.charge-money {
			height: 44px;
			justify-content: space-between;
			display: flex;
			align-items: center;
			padding: 10px 16px;
			background: #FFFFFF;
			border-radius: .1rem;
			overflow: hidden;
			.charge-money-left {
				width: 25%;
			}
			.charge-money-right {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				width: 75%;
				
				.show-cash {
					width: 49%;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					
					.input-cash {
						width: 2.8rem;
						text-align: right;
						border: none;
					}
					
					.input-cash2 {
						width: 2.5rem;
					}
				}
				
				.show-USDT {
					width: 51%;
					color: #AAB7C5;
					font-size: .2rem;
					display: flex;
					align-items: center;
					
					.copy-fonts {
						//display: inline-block;
						padding: 0 .05rem;
						border-radius: .08rem;
						background: #1989fa;
						color: #FFFFFF;
					}
				}
			}
			
			.charge-money-right2 {
				width: 78%;
			}
		}
		
		.charge-money2 {
			margin-top: .2rem;
		}
		
		.van-cell:not(:last-child)::after {
			display: none;
		}
		
		.input-box {
			margin-top: .2rem;
			border-radius: .1rem;
			overflow: hidden;
		}
		
		.input-box-time {
			position: relative;
			overflow: unset;
			
			.time-icon {
				position: absolute;
				width: .4rem;
				height: .4rem;
				z-index: 999;
				right: 1.6rem;
				top: 50%;
				margin-top: -.2rem;
			}
		}
		
		.qr-area {
			height: unset !important;
			margin-top: .2rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.qr-area-left {
				width: 2.2rem;
				height: 2.2rem;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			
			.qr-area-right {
				width: 3.8rem;
				margin-left: .2rem;
				font-weight: bold;
				
				.qr-area-right-title {
					color: #171F28;
				}
				
				.qr-area-right-adress {
					color: #007FE6;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				
				.qr-area-right-limit {
					color: #AAB7C5;
					font-size: .2rem;
				}
				
				.qr-area-right-btn {
					margin-top: .1rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					.blue-btn {
						width: 40%;
					}
					
					.blue-btn2 {
						text-decoration: none;
						color: #1989fa;
						border: #1989fa 1px solid;
						min-width: 60px;
						height: 30px;
						padding: 0 8px;
						font-size: 12px;
						line-height: 28px;
						border-radius: 100px;
						text-align: center;
					}
				}
			}
		}
	}
	.bottom-reminds {
		width: 92%;
		margin: .2rem auto 0;
		font-size: .22rem;
		.bottom-reminds-blue {
			color: #1989fa;
		}
		.bottom-reminds-gray {
			color: #666666;
		}
	}
	
	.help-link {
		font-size: .28rem;
		margin-top: .3rem;
		text-align: center;
		
		.blue-fonts {
			color: #3997FF;
		}
	}
	.bottom-btn-box {
		margin: 0.2rem auto 0;
		width: 70%;
	}
    .bottom-fonts-big {
        color: #333333;
        font-size: .3rem;
        font-weight: bold;
        text-align: center;
        margin-top: .2rem;
    }
    .bottom-fonts-big2 {
        color: #333333;
        font-size: .26rem;
        text-align: center;
    }
	.account-chosing-box {
		width: 6rem;
		font-weight: bold;
		
		.account-picker {
			background: #E5EBF1;
			color: #4D91FF;
		}
		
		.picker-btn {
			background: #057BFD;
			color: #FFFFFF;
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			font-size: .3rem;
		}
		
		.picker-title {
			background: #EDEFF2;
			color: #151D25;
		}
	}
}

.video-close {
	background: #057BFD;
	color: #FFFFFF;
	height: 5%;
	display: flex;
	align-items: center;
	
	span {
		margin-left: 10px;
	}
}

/deep/ .van-picker-column__item {
	color: #057BFD !important;
}
</style>
