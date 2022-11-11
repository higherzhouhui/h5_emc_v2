<template>
	<div class="mail-successbig" ref="screenBox">
		<HeaderTop :title="headTitle" :hasright="step2" :rightText="`一键截图`" :routeFuc="screenshots"></HeaderTop>
		<div class="top-pad">
			<div class="transReharge" v-if="step1">
				<div class="transReharge-bank">
					<div class="transReharge-bank-left">存款姓名</div>
					<div class="transReharge-bank-centert transReharge-bank-centert2">
						<input type="text" v-if="changeName" placeholder="请输入存款者姓名" ref="realName">
						<input type="text" v-if="!changeName" placeholder="" ref="realName" readonly="readonly">
					</div>
				</div>
				<div class="transReharge-bank">
					<div class="transReharge-bank-left">存款卡号</div>
					<div class="transReharge-bank-centert transReharge-bank-centert2">
						<input type="number" oninput="if(value>4)value=value.slice(0,4)" placeholder="银行卡号后四位" ref="cardName">
					</div>
				</div>
				<div class="transReharge-bank">
					<div class="transReharge-bank-left">充值金额</div>
					<div class="transReharge-bank-centert transReharge-bank-centert2">
						<input type="number" :placeholder="placeholder" ref="money">
					</div>
				</div>
<!--				<div class="transReharge-bank">-->
<!--					<div class="transReharge-bank-left">到账时间</div>-->
<!--					<div class="transReharge-bank-centert" style="width: 72%;">-->
<!--						<input v-if="pickTime" readonly="readonly" type="text" placeholder="请选择时间" @focus="openPicker"-->
<!--						       v-model="gettime">-->
<!--						<input v-if="!pickTime" readonly="readonly" type="text" placeholder="请选择时间" @focus="openPicker"-->
<!--						       v-model="gettime2">-->
<!--					</div>-->
<!--				</div>-->
<!--				<div class="pickerPop" @touchmove.prevent>-->
<!--					<mt-datetime-picker-->
<!--						ref="picker"-->
<!--						type="time"-->
<!--						@confirm="this.handleConfirmStartTime"-->
<!--						v-model="pickerValue">-->
<!--					</mt-datetime-picker>-->
<!--				</div>-->
				<div class="transReharge-bank bottom-remind" style="height: 2rem">
					<div class="remind" v-if="remindTab">
						<p class="blue">温馨提示:</p>
						1.禁止使用微信转账、支付宝转账，否则不到账。<br>
						2.请务必填写正确银行卡姓名，否则不到账。<br>
						3.每次存款请提交后获取最新存款账户，存款到停用账户不到账。
					</div>
					<div class="remind" v-if="!remindTab">
						<p class="blue">温馨提示:</p>
						1.禁止使用微信转账、支付宝转账，否则不到账。<br>
						2.请务必填写正确银行卡姓名，否则不到账。<br>
						3.每次存款请提交后获取最新存款账户，存款到停用账户不到账。
					</div>
				</div>
				<div class="bottom-btn-box">
					<van-button class="bottom-btn" round type="info" color="#0895FE" block
					            @click="toPush">下一步：收款卡信息
					</van-button>
				</div>
			</div>
<!--			<div class="transReharge" v-if="show2">-->
<!--				<div class="transReharge-bank">-->
<!--					<div class="transReharge-bank-left">收款人</div>-->
<!--					<div class="transReharge-bank-centert">-->
<!--						<span>-->
<!--							{{ skr }}-->
<!--						</span>-->
<!--					</div>-->
<!--					<div class="transReharge-bank-righttext"></div>-->
<!--				</div>-->
<!--				<div class="transReharge-bank">-->
<!--					<div class="transReharge-bank-left">收款账号</div>-->
<!--					<div class="transReharge-bank-centert">-->
<!--						<span>-->
<!--							{{ zh }}-->
<!--						</span>-->
<!--					</div>-->
<!--					<div class="transReharge-bank-righttext"></div>-->
<!--				</div>-->
<!--				<div class="transReharge-bank">-->
<!--					<div class="transReharge-bank-left">收款支行</div>-->
<!--					<div class="transReharge-bank-centert">-->
<!--						<span>-->
<!--							{{ fh }}-->
<!--						</span>-->
<!--					</div>-->
<!--					<div class="transReharge-bank-righttext"></div>-->
<!--				</div>-->
<!--				<div class="transReharge-bank">-->
<!--					<div class="transReharge-bank-left">存款卡号</div>-->
<!--					<div class="transReharge-bank-centert">-->
<!--						<span>-->
<!--							{{ memberCard }}-->
<!--						</span>-->
<!--					</div>-->
<!--					<div class="transReharge-bank-righttext"></div>-->
<!--				</div>-->
<!--				<div class="transReharge-bank">-->
<!--					<div class="transReharge-bank-left">存款姓名</div>-->
<!--					<div class="transReharge-bank-centert">-->
<!--						<span>-->
<!--							{{ memberName }}-->
<!--						</span>-->
<!--					</div>-->
<!--					<div class="transReharge-bank-righttext"></div>-->
<!--				</div>-->
<!--				<div class="transReharge-bank">-->
<!--					<div class="transReharge-bank-left">充值金额</div>-->
<!--					<div class="transReharge-bank-centert">-->
<!--						<span>-->
<!--							{{ memberCash }}-->
<!--						</span>-->
<!--					</div>-->
<!--					<div class="transReharge-bank-righttext"></div>-->
<!--				</div>-->
<!--				-->
<!--				<div class="transReharge-bank" style="height: 2rem">-->
<!--					<span color="red">-->
<!--						温馨提示:订单已提交，确认订单信息后，请在10分钟内完成网银转账，否则无法及时到账；-->
<!--					</span>-->
<!--				</div>-->
<!--			</div>-->
			
			<input id="copy_content" type="text" value="" style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;" readonly/>
			<div class="select" v-if="showSelect">
				<div class="select-cover" @click="showSelect = false"></div>
				<div class="sle-mian">
					<div class="select-title">
						<div @click="closeSelect(1)">&emsp;&emsp;</div>
						<div class="sle">选择银行</div>
						<div @click="closeSelect(2)">确定</div>
					</div>
					<div>
						<mt-picker :slots="slotBanks" @change="onValuesChangeBank"></mt-picker>
					</div>
				</div>
			</div>
		</div>
		<div class="transReharge" v-if="step2">
			<!--				<div class="transReharge-bank" @click="showSelectFuc">-->
			<div class="transReharge-bank">
				<div class="transReharge-bank-left">收款银行</div>
				<div class="transReharge-bank-center transReharge-bank-centert3">{{ showBank }}</div>
<!--				<div class="transReharge-bank-righttext noborder">-->
<!--					<div class="transReharge-bank-right"></div>-->
<!--				</div>-->
			</div>
			<div class="transReharge-bank">
				<div class="transReharge-bank-left">收款户名</div>
				<div class="transReharge-bank-centert transReharge-bank-centert3">
					<input readonly="readonly" type="text" placeholder="收款账户名" v-model="skr">
					<div class="transReharge-bank-righttext"><a ref="nameText" href="javaScript:void(0)" @click="copy('skr')">复制</a>
				</div>

				</div>
			</div>
			<div class="transReharge-bank transReharge-address">
				<div class="transReharge-bank-left">收款支行地址</div>
				<div class="transReharge-bank-centert transReharge-bank-centert3">
					<input readonly="readonly" type="text" placeholder="收款支行地址" v-model="address">
					<div class="transReharge-bank-righttext"><a ref="adressText" href="javaScript:void(0)" @click="copy('address')">复制</a></div>
				</div>
			</div>
			<div class="transReharge-bank">
				<div class="transReharge-bank-left">收款卡号</div>
				<div class="transReharge-bank-centert transReharge-bank-centert3">
					<input readonly="readonly" type="text" placeholder="收款银行卡号" v-model="zh">
					<div class="transReharge-bank-righttext"><a ref="numText" href="javaScript:void(0)" @click="copy('zh')">复制</a></div>
				</div>
			</div>
			<div class="transReharge-bank">
				<div class="transReharge-bank-left">充值金额</div>
				<div class="transReharge-bank-center transReharge-bank-centert3">{{depositMoney}}</div>
			</div>
			<div class="transReharge-bank bottom-remind" style="height: 2rem">
				<div class="remind" v-if="remindTab">
					<p class="blue">温馨提示:</p>
					1.请使用和注册姓名一致的银行卡进行转账存款，使用其他非您注册姓名一致的银行卡进行转账存款将无法即时到账。<br>
					2.每次存款前，请先至本页面最新的收款账户。请勿自行存款至旧账户，若存款至旧账户，本公司将无法查收，恕不负责。<br>
					3.如有任何疑问，请联系在线客服获取帮助。
				</div>
				<div class="remind" v-if="!remindTab">
					<p class="blue">温馨提示:</p>
					1.请填写正确的存款姓名和存款卡号。<br>
					2.请在10分钟内按提交金额（若有小数，转账金额必须包含小数部分）完成网银转账，否则将无法及时到账。<br>
					3.单次到账勿重复提交，禁止不转账、空提交，多次违规操作将封号。
				</div>
			</div>
			<div class="bottom-btn-box">
				<van-button class="bottom-btn" round type="info" color="#0895FE" block @click="toDepositList">继续充值</van-button>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top'
// import {DatetimePicker} from 'mint-ui'
import {Toast} from 'vant';
import dayjs from 'dayjs';
import html2canvas from 'html2canvas';

export default {
	name: 'transfer',
	components: {
		HeaderTop,
		// DatetimePicker,
		Toast,
		html2canvas
	},
	filters: {
		formatDate (time) {
			var date = new Date(time)
			return formatDate(date)
		}
	},
	props: {date: String},
	data () {
		return {
			headTitle:'网银转账',
			step1: true,
			step2: false,
			pickTime: true,
			gettime2: '',
			markInfo: '',
			gettime: '',
			pickerValue: '',
			changeName: true,
			checkLevel: 0,
			remindTab: true,
			
			transferTime: '',
			pickerVisible: '',
			startDate: new Date('1960-01-01 00:00'),
			endDate: new Date('2100-01-01 23:59'),
			selectedValue: '',
			params: {
				id: 1
			},
			slotBanks: [{
				flex: 1,
				values: [],
				className: 'slot1',
				textAlign: 'center'
			}],
			bank: '',
			showSelect: false,
			showBank: '请选择银行',
			skr: '',//收款人
			address: '',
			zh: '',//账号
			fh: '',//分行
			sysBankId: 0,//sysBankId
			webBankId: '',
			index: 0,
			bankData: '',
			stoptxt1: 'display:flex',
			stoptxt2: 'display:none',
			placeholder: '',
			// show2: false,
			memberCard: '',
			// memberName: '',
			// memberCash: '',
			cashType: 0,
			payId: 0,
			cashMin: 0,
			cashMax: 0,
			bankId: 0,
			money: 0,
			cardNumber: '',
			cardName: '',
			screenName: '',
			dateShow: '',
			showDate: '',
			hoursShow: '',
			minsShow: '',
			secsShow: '',
		}
	},
	mounted () {
		this.currentTime()
		this.loadTop()
		this.timeShow();
		// this.hideSearch()
	},
	created () {
	
	},
	beforeRouteLeave(to, from, next) {
		sessionStorage.removeItem('payId')
		sessionStorage.removeItem('cashMin')
		sessionStorage.removeItem('cashMax')
		let _this = this;
		clearTimeout(_this.timer);
		this.$destroy(true)
		next()
	},
	Computed: {
		values: {
			get: function () {
				let slots = this.slots || []
				let values = []
				slots.forEach((slot) => {
					if (!slot.divider) values.push(slot.value)
				})
				return values
			},
			set: function (value) {
			}
		}
	},
	methods: {
		currentTime () {
			setInterval(this.getTime, 500)
		},
		getTime: function () {
			var _this = this
			let hh = new Date().getHours()
			let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
			_this.gettime = hh + ':' + mf
		},
		handleConfirmStartTime () {
			this.gettime2 = this.pickerValue
			this.pickTime = false
		},
		openPicker () {
			if (this.selectedValue) {
				this.pickerVisible = this.selectedValue
			} else {
				this.pickerVisible = new Date()
			}
			this.$refs.picker.open()
		},
		loadTop () {
			let params = {
				visitType: 'APP',
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.BankList, params, this.BankList)
			this.ServerAPI.postAPI(this.API.userInfo, params, this.userInfo)
		},
		userInfo (success, data) {
			if (success) {
				if (data.code == '0000') {
					this.checkLevel = data.data.level
					if (this.checkLevel === 0 || this.checkLevel === 1) {
						this.$refs.realName.value = data.data.realName
						this.changeName = false
						this.remindTab = true
					} else {
						this.$refs.realName.value = data.data.realName
						this.changeName = true
						this.remindTab = false
					}
				}
			}
		},
		BankList (success, data) {
			if (success) {
				if (data.code == '0000') {
					//显示银行列表
					//默认显示第一条信息
					this.payId = sessionStorage.getItem('payId')
					this.cashMin = parseInt(sessionStorage.getItem('cashMin'))
					this.cashMax = parseInt(sessionStorage.getItem('cashMax'))
					
					this.cashType = data.cashType
					this.bankData = data.data
					this.fh = data.info[0].address
					this.zh = data.data[0].cardNumber
					this.skr = data.data[0].realName
					this.address = data.data[0].address
					this.showBank = data.data[0].bankName
					this.bankId = data.data[0].bankId
					data.data.map((v, k) => {
						this.slotBanks[0].values.push(v.bankName)
					})
					// })
					if (this.cashMin === NaN || this.cashMax === NaN) {
						this.placeholder = '限额300-50000元'
					} else {
						this.placeholder = '限额' + this.cashMin + '-' + this.cashMax + '元'
					}
				}
			}
		},
		toPush () {
			this.depositMoney = parseInt(this.$refs.money.value)
			let realName = this.$refs.realName.value
			this.cardName = this.$refs.cardName.value
			// if (this.pickTime == true) {
			// 	this.markInfo = this.gettime
			// } else if (this.pickTime == false) {
			// 	this.markInfo = this.gettime2
			// }
			if (this.depositMoney > this.cashMax || this.depositMoney < this.cashMin) {
				Toast('单笔存款最低' + this.cashMin + '元，上限' + this.cashMax + '元')
				return false
			}
			// var re = /^[0-9]+.?[0-9]*/
			// if (!re.test(money)) {
			// 	Toast('资金金额必须是数字')
			// 	return false
			// }
			// if (this.cashType == '1' && money % 1 == 0) {
			// 	Toast('资金金额必须带小数')
			// 	return false
			// }
			// if (this.cashType == '2' && money % 1 != 0) {
			// 	Toast('资金金额必须输入整数')
			// 	return false
			// }
			// if (this.cashType == '3' && money % 10 != 0) {
			// 	Toast('资金金额必须输入10的倍数，如100，120，300等')
			// 	return false
			// }
			// if (this.cashType == '4' && money % 50 != 0) {
			// 	Toast('资金金额必须输入50的倍数，如100，150，1000等')
			// 	return false
			// }
			// if (this.cashType == '5' && money % 100 != 0) {
			// 	Toast('资金金额必须输入100的倍数，如100，300，1000等')
			// 	return false
			// }
			this.params.payId = this.payId
			this.params.bankId = this.bankId
			this.params.cash = this.depositMoney
			this.params.realName = realName
			this.params.cardName = this.cardName
			this.params.markInfo = this.markInfo
			// this.memberName = realName
			// this.memberCash = money
			this.ServerAPI.postAPI(this.API.deposit, this.params, this.deposit)
		},
		deposit (success, data) {
			if (success) {
				if (data.code === '0000') {
					Toast({
						message: '提交成功，马上为您确认',
						position: 'middle',
						className: 'remind',
						duration: 2000
					})
					// this.$router.push('/tradeRecords')
					this.$refs.cardName.value = this.$refs.money.value = ''
					this.step1 = false
					this.step2 = true
				} else {
					Toast({
						message: data.info,
						position: 'middle',
						className: 'remind',
						duration: 2000
					})
				}
			} else {
				Toast({
					message: '网络错误，请重试',
					position: 'middle',
					className: 'remind',
					duration: 2000
				})
			}
		},
		toDepositList(){
			this.$router.replace('/pay')
		},
		screenshots() {
			html2canvas(this.$refs.screenBox).then(canvas => {
				const link = document.createElement('a')
				link.href = canvas.toDataURL()
				link.setAttribute('download', this.screenName + '.png')
				link.style.display = 'none'
				document.body.appendChild(link)
				link.click()
			})
		},
		timeShow() {
			let _this = this;
			this.timer = setInterval(() => {
				_this.timeDate = new Date(); // 修改数据date
				let Y = dayjs().$y + '-';
				let M = dayjs().$M + 1 + '-';
				if (dayjs().$M + 1 < 10) {
					M = '0' + M;
				}
				let D = dayjs().$D + '';
				if (dayjs().$D < 10) {
					D = '0' + D;
				}
				let Hour = dayjs().$H + '';
				if (dayjs().$H < 10) {
					Hour = '0' + Hour;
				}
				let Min = dayjs().$m + '';
				if (dayjs().$m < 10) {
					Min = '0' + Min;
				}
				let Sec = dayjs().$s + '';
				if (dayjs().$s < 10) {
					Sec = '0' + Sec;
				}
				_this.hoursShow = Hour + '';
				_this.minsShow = Min + '';
				_this.secsShow = Sec + '';
				_this.dateShow = Y + M + D;
				_this.showDate = _this.dateShow + '   ' + _this.hoursShow + ':' + _this.minsShow + ':' + _this.secsShow;
				_this.screenName = _this.dateShow + '-' + _this.hoursShow + '-' + _this.minsShow + '-' + _this.secsShow;
			}, 1000)
		},
		onValuesChangeBank (picker, values) {
			let bank = values[0]
			this.slotBanks[0].values.map((v, k) => {
				if (v == bank) {
					this.index = k
					console.log(this.index)
				}
			})
		},
		copy (val) {
			this.$refs.nameText.innerText = this.$refs.adressText.innerText = this.$refs.numText.innerText = '复制'
			var data = ''
			if ('skr' === val) {
				data = this.skr
				this.$refs.nameText.innerText = '已复制'
			} else if ('address' === val) {
				data = this.address
				this.$refs.adressText.innerText = '已复制'
			} else {
				data = this.zh
				this.$refs.numText.innerText = '已复制'
			}
			let oiput =  document.getElementById('copy_content')
			oiput.value = data
			oiput.select()
			document.execCommand('Copy')
			Toast({
				message: '复制成功',
				position: 'middle',
				className: 'remind',
				duration: 2000
			})
		},
		showSelectFuc () {
			this.showSelect = true
		},
		closeSelect (id) {
			if (id == 1) {
				this.showSelect = false
			}
			if (id == 2) {
				this.showBank = this.bankData[this.index].bankName
				this.sysBankId = this.bankData[this.index].sysBankId
				this.showSelect = false
			}
		},
		// hideSearch () {
		// 	let _this = this
		// 	document.addEventListener('click', function (e) {
		// 		let flag = e.target.contains(document.getElementsByClassName('select')[0])
		// 		if (!flag) return
		// 		_this.showSelect = false
		// 	})
		// }
	}
}
</script>
<style lang="scss" scoped>
.select {
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, .5);
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 900;
	.select-cover {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 901;
		background: rgba(0,0,0,.5);
	}
	.sle-mian {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		background: #fff;
		z-index: 902;
		.select-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: .2rem .3rem 0;
			
			div {
				font-size: .25rem;
				color: #3677FF
			}
			
			.sle {
				font-size: .25rem
			}
		}
	}
}

.mail-successbig {
	width: 100%;
	height: 100%;
	background: #edeff2;
	
	.top-pad {
		padding: .2rem 0 0;
	}
	
	.transReharge {
		width: 94%;
		margin: 0 auto;
		background: #edeff2;
		border-radius: .08rem;
		
		.transReharge-bank {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 0.9rem;
			align-items: center;
			background: #FFFFFF;
			padding: 0 .3rem;
			margin-bottom: .18rem;
			border-radius: .08rem;
			
			.remind {
				color: #6d737d;
				font-size: .2rem;
				
				.blue {
					color: #00a3ff;
					font-size: .23rem;
				}
			}
			
			.transReharge-bank-left {
				width: 25%;
				font-size: .24rem;
			}
			
			.transReharge-bank-right {
				width: .22rem;
				height: .12rem;
				background: url("../../../static/images/transRecharge-bank.png");
				background-size: cover;
				float: right;
				margin: .25rem 0 0;
			}
			
			.transReharge-bank-center {
				// margin:0 0 0 -1.05rem;
				color: #8d969b;
				width: 50%;
			}
			
			.transReharge-bank-righttext {
				height: .6rem;
				width: .8rem;
				line-height: .6rem;
				text-align: right;
				
				a {
					color: #3677FF;
				}
			}
			
			.transReharge-bank-centert {
				color: #8d969b;
				width: 50%;
				
				input {
					font-size: .23rem;
					border: 0 none;
					width: 100%;
				}
				
				span {
					color: #3b556e;
				}
				
			}
			.transReharge-bank-centert2 {
				width: 75%;
				input {
					width: 100%;
					text-align: right;
				}
			}
			.transReharge-bank-centert3 {
				width: 75%;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				//text-align: right;
				input {
					text-align: right;
					margin-right: .4rem;
				}
			}
			.noborder {
				border: 0 none !important;
			}
		}
		
		.bottom-remind {
			background: #edeff2;
			padding: 0;
		}
	}
	
	.bottom-btn-box {
		margin: 0.2rem auto 0;
		width: 70%;
	}
}

.revisePhone {
	width: 100%;
	height: 100%;
	background: #f7f8fa;
	
	.revise-account {
		margin-top: .2rem;
		padding: 0 .3rem;
		width: 100%;
		background: #fff;
		height: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.revise-account-input {
			input {
				width: 4rem;
				border: 0 none;
				font-size: .3rem;
				color: #3b556e;
			}
		}
		
		
	}
	
	.or-btn {
		width: 90%;
		margin: 1.2rem auto 0;
	}
}

.address-yar {
	width: 100%;
	height: 100;
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background: rgba(0, 0, 0, .5);
	
	.tip {
		display: flex;
		height: 1rem;
		align-items: center;
		border-bottom: 1px solid #ececec;
		
		div {
			flex: 1;
			text-align: center;
			color: #3b556e;
			font-size: 20px;
		}
		
		.commit {
			font-size: 18px;
			color: #2756a4;
		}
		
		.cancel {
			font-size: 18px;
			color: #c0c4c7;
		}
	}
}

.address-fix {
	position: fixed;
	bottom: 0;
	width: 100%;
	background: #fff;
}
</style>
