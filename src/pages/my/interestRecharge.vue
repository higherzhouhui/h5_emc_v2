<template>
	<div class="interest-recharge">
		<HeaderTop :title="`申请余额宝`" :bottomLine="true"></HeaderTop>
		<div class="balance-box">
            <div class="blue-line"></div>
			<div class="balance-left"><span class="blue-fonts">中心钱包:</span>{{ mainBalance }}</div>
<!--			<div class="balance-right" @click="withDrawAll">一键回收</div>-->
		</div>
        <div class="main-content">
            <div class="blue-title">
                <span class="line"></span>
                <span class="center-fonts">当前年利率</span>
                <span class="line"></span>
            </div>
            <div class="blue-line"></div>
            <div class="cash-content">
                <span class="big-numbers">{{fundRate}}%</span>
            </div>
        </div>

		<div class="interest-recharge-content">
			<div class="input-box">
				<van-field v-model="inputValue" type="number" maxlength="8" label="转入资金" placeholder="最小转入金额为1000元" input-align="right" disabled @click="openKB"/>
			</div>
            <div class="computed-content">
                <div class="computed-content-title">预算一周利息</div>
                <div class="computed-content-cash">{{feeShow}}</div>
            </div>
            <div class="bottom-btn-box">
                <van-button class="bottom-btn" :disabled="subCheck" type="info" color="linear-gradient(to right, #78BDF2, #167BFF)"
                            @click="submitConfirm">提交
                </van-button>
            </div>
			<div class="reminds-content">
                <div class="reminds-title">
                    <span class="line"></span>
                    <span class="center-fonts">温馨提示</span>
                    <span class="line"></span>
                </div>
                <div class="reminds-fonts">余额宝每满24小时结算一次利息，累计获取利息7次自动到期，到期自动结算，也可提前手工结算，进行游戏。</div>
            </div>
            <van-popup class="keyboard-box" v-model="keyboard" position="bottom" :style="{ height: '7.8rem' }" :close-on-click-overlay="false">
                <div class="keyboard-title">
                    <div class="keyboard-title-left"></div>
                    <div class="keyboard-title-fonts">转入金额</div>
                    <van-icon name="cross" class="keyboard-title-del"  @click="closeKB"/>
                </div>
                <div class="keyboard-results">
                    <div class="keyboard-results-icon">￥</div>
                    <div class="keyboard-results-pld" v-if="inputingValue === ''">请输入本金</div>
                    <div class="keyboard-results-content" v-if="inputingValue !== ''">{{inputingValue}}</div>
                </div>
                <div class="keyborad-content">
                    <div class="keyboard-left">
                        <div class="keyboard-left-list">
                            <div class="keyboard-left-btn" @click="inputNum(1)">1</div>
                            <div class="keyboard-left-btn" @click="inputNum(2)">2</div>
                            <div class="keyboard-left-btn" @click="inputNum(3)">3</div>
                        </div>
                        <div class="keyboard-left-list">
                            <div class="keyboard-left-btn" @click="inputNum(4)">4</div>
                            <div class="keyboard-left-btn" @click="inputNum(5)">5</div>
                            <div class="keyboard-left-btn" @click="inputNum(6)">6</div>
                        </div>
                        <div class="keyboard-left-list">
                            <div class="keyboard-left-btn" @click="inputNum(7)">7</div>
                            <div class="keyboard-left-btn" @click="inputNum(8)">8</div>
                            <div class="keyboard-left-btn" @click="inputNum(9)">9</div>
                        </div>
                        <div class="keyboard-left-list">
                            <div class="keyboard-left-btn" @click="inputNum(-1)">.</div>
                            <div class="keyboard-left-btn" @click="inputNum(0)">0</div>
                            <div class="keyboard-left-btn del-fonts" @click="inputNum(-2)">删除</div>
                        </div>
                    </div>
<!--                    <van-number-keyboard ref="keyboardLeft" class="keyboard-left" :show="true" v-model="inputingValue" extra-key="." @input="onInput" @delete="onDelete" delete-button-text="" @show="changeStyle" :maxlength="moneyMaxLength"/>-->
                    <div class="keybord-right">
                        <div class="keybord-right-list" @click="quickAdd(100)"><span>+</span><span>100</span></div>
                        <div class="keybord-right-list" @click="quickAdd(200)"><span>+</span><span>200</span></div>
                        <div class="keybord-right-list" @click="quickAdd(500)"><span>+</span><span>500</span></div>
                        <div class="keybord-right-list" @click="quickAdd(999)">MAX</div>
                    </div>
                </div>
                <div class="bottom-btn-box bottom-btn-box2">
                    <van-button class="bottom-btn" :disabled="keyboardCheck" type="info" color="linear-gradient(to right, #78BDF2, #167BFF)" @click="inputCfm">确认</van-button>
                </div>

            </van-popup>
		</div>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top'
import { NumberKeyboard } from 'vant'
import {Dialog} from 'vant'
import {Toast} from 'vant'

export default {
	name: 'interestRecharge',
	components: {
		HeaderTop,
        NumberKeyboard
	},
	data () {
		return {
			inputValue: '最小转入金额为1000元',
			percent: '',
			userLevel: '',
			mainBalance: 0,
			dayInterest: '',
			weekInterest: '',
			routerFrom: '',
            fundRate:'',
            subCheck:true,
            keyboard:false,
            inputingValue:0,
            keyboardCheck:true,
            moneyMaxLength:10,
            feeShow:'0.00',
		}
	},
	mounted () {
		this.getBalance()
		this.interestGet()
	},
	beforeRouteLeave (to, from, next) {    // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true)
		next()
	},
	methods: {
		showPercent () {
			this.userLevel = sessionStorage.getItem('userLev')
			if (this.userLevel == '0') {
				this.percent = '15%'
			} else if (this.userLevel == '1') {
				this.percent = '18%'
			} else if (this.userLevel == '2') {
				this.percent = '20%'
			} else if (this.userLevel == '3') {
				this.percent = '22%'
			} else if (this.userLevel == '4') {
				this.percent = '25%'
			} else if (this.userLevel == '5') {
				this.percent = '28%'
			} else if (this.userLevel == '6') {
				this.percent = '30%'
			} else if (this.userLevel == '7') {
				this.percent = '32%'
			} else if (this.userLevel == '8' || this.userLevel == '9' || this.userLevel == '10') {
				this.percent = '35%'
			}
		},
        interestGet(){
            this.ServerAPI.postAPI(this.API.interestGet, '', (success, data) => {
                if (success) {
                    if (data.code === '0000') {
                        this.beginDate = data.data.begin
                        this.closeFee = data.data.closeFee
                        this.fundRate = data.data.fundRate
                    } else {
                        Toast(data.info)
                    }
                } else {
                    Toast('网络超时，请重试')
                }
            })
        },
        inputNum(value){
		    if(value === -2){
                let numberVal = this.inputingValue + ''
                this.inputingValue = numberVal.substring(0,this.inputingValue.length - 1)
            }else{
                if(value === -1){
                    value = '.'
                }
                let numberVal = this.inputingValue + ''
                this.inputingValue = numberVal + value
                this.$nextTick(() => {
                    let val = this.inputingValue.toString();
                    val = val.replace(/[^\d.]/g, "") //清除"数字"和"."以外的字符
                    val = val.replace(/\.{2,}/g, ".") //只保留第一个. 清除多余的
                    val = val.replace(/^0+\./g, '0.')
                    val = val.match(/^0+[1-9]+/) ? val = val.replace(/^0+/g, '') : val
                    val = (val.match(/^\d*(\.?\d{0,2})/g)[0]) || ''
                    if (val.includes(".")) {
                        let numDian = val.toString().split(".")[1].length
                        if (numDian === 2) {
                            this.moneyMaxLength = val.length
                        }
                    } else {
                        val = val.substring(0,10)
                    }
                    this.inputingValue = val
                })
            }
		    this.checkInputing()
        },
        quickAdd(val){
		    if(val === 999){
                this.inputingValue = this.mainBalance
            }else{
                let numberVal = Number(this.inputingValue)
                this.inputingValue = numberVal + val
            }
            this.checkInputing()
        },
        checkInputing(){
		    if(this.inputingValue === '' || Number(this.inputingValue) === 0){
                this.keyboardCheck = true
            }else{
                this.keyboardCheck = false
            }
		    if(Number(this.inputingValue) > Number(this.mainBalance)){
                Toast('输入金额超过您的余额')
                this.inputingValue = Number(this.mainBalance)
            }
        },
        onDelete() {
        },
        openKB(){
            this.keyboard = true
        },
        changeStyle(){
            this.$refs.keyboardLeft.$el.style.position = 'relative'
        },
        closeKB(){
		    this.keyboard = false
            this.inputingValue = ''
        },
        inputCfm(){
            if(Number(this.inputingValue) < 1000){
                Toast('最小转入金额为1000元')
                return
            }
		    this.inputValue = Number(this.inputingValue)
            this.keyboard = false
            this.feeShow = (this.inputValue * this.fundRate / 100 / 365 * 7).toFixed(2)
            this.subCheck = false
        },
		withDrawAll () {
			this.ServerAPI.postAPI(this.API.gameWithdrawAll, '', (success, data) => {
				if (success) {
					if (data.code == '0000') {
						Toast('操作成功')
						this.getBalance()
					} else {
                        Toast(data.info)
					}
				} else {
                    Toast('网络超时，请重试')
				}
			})
		},
		getBalance () {
			let params = {
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.userInfo, params, (success, data) => {
				this.mainBalance = data.data.cash
			})
		},
		backToList () {
			this.$router.push('/interestDetail')
		},
		submit () {
			Dialog.confirm({
				// title: '标题',
				message: '确定转入余额宝？'
			})
				.then(() => {
					this.submitConfirm()// on confirm
				})
				.catch(() => {
					// on cancel
				})
		},
		submitConfirm () {
			let params = {
				cash: this.inputValue
			}
			this.ServerAPI.postAPI(this.API.interestDeposit, params, (success, data) => {
				if (success) {
					if (data.code === '0000') {
                        Dialog.alert({
                            message: '申请成功',
                        }).then(() => {
                            this.$router.push('/interestDetail')
                        });
					} else {
                        Toast(data.info)
					}
				} else {
                    Toast('网络超时，请重试')
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.interest-recharge {
	background: #EAEDF0;
	height: 100%;
	.balance-box {
		display: flex;
		align-items: center;
		width: 92%;
		margin: .25rem auto 0;
		background: #FFFFFF;
		border-radius: .08rem;
		padding: .2rem .3rem;
		.blue-line {
            width: .05rem;
            height: .35rem;
            background: #093EB8;
        }
		.balance-left {
			font-size: .28rem;
            font-weight: bold;
			.blue-fonts {
				color: #093EB8;
				margin: 0 0 0 .1rem;
			}
		}
		
		.balance-right {
			background: #0C9DFE;
			border-radius: .05rem;
			color: #FFFFFF;
			padding: .1rem .2rem;
		}
	}
    .main-content {
        width: 92%;
        margin: .25rem auto 0;
        background: #FFFFFF;
        border-radius: .1rem;
        text-align: center;
        padding: .25rem 0;
        font-weight: bold;
        .blue-title {
            display: flex;
            justify-content: center;
            align-items: center;
            .line {
                height: 1px;
                width: .4rem;
                background: #BCBCBF;
            }
            .center-fonts {
                color: #093EB8;
                font-size: .4rem;
                margin: 0 .15rem;
            }
        }
        .blue-line {
            height: 3px;
            width: 1rem;
            background: #78BDF2;
            margin: .05rem auto 0;
        }
        .cash-content {
            font-size: .28rem;
            margin-top: .2rem;
            .big-numbers {
                font-size: .5rem;
            }
        }
    }
	
	.interest-recharge-content {
		.input-box {
			width: 92%;
			margin: 0 auto;
			overflow: hidden;
			border-bottom: rgba(236, 236, 236, .7) 1px solid;
            background: #FFFFFF;
            height: .78rem;
		}
		.input-box:first-child {
			margin-top: .25rem;
			border-top-left-radius: .08rem;
			border-top-right-radius: .08rem;
		}
		.input-box:nth-child(4) {
			border-bottom-left-radius: .08rem;
			border-bottom-right-radius: .08rem;
		}
		.computed-content {
            font-weight: bold;
            text-align: center;
            background: #FFFFFF;
            padding: .2rem 0;
            width: 92%;
            margin: .2rem auto 0;
            .computed-content-title {
                font-size: .3rem;
                color: #303030;
            }
            .computed-content-cash {
                color: #FFBA00;
                font-size: .35rem;
                margin-top: .15rem;
            }
        }
        .reminds-content {
            color: #464646;
            font-size: .26rem;
            width: 92%;
            margin: .2rem auto 0;
            .reminds-title {
                display: flex;
                justify-content: center;
                align-items: center;
                .line {
                    height: 1px;
                    width: .4rem;
                    background: #BCBCBF;
                }
                .center-fonts {
                    margin: 0 .15rem;
                }
            }
        }
		.bottom-btn-box {
			text-align: center;
			margin-top: .3rem;
			.bottom-btn {
				width: 92%;
				font-weight: bold;
			}
		}
        .keyboard-box {
            background: #F6F7F8;
            color: #303030;
            font-weight: bold;
            .keyboard-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: .8rem;
                background: #FFFFFF;
                padding: .2rem;
                .keyboard-title-left {
                    width: .35rem;
                }
                .keyboard-title-fonts {
                    position: relative;
                    height: .8rem;
                    line-height: .8rem;
                }
                .keyboard-title-fonts::after {
                    content: '';
                    position: absolute;
                    width: .6rem;
                    height: .1rem;
                    background: #78BDF2;
                    bottom: 0;
                    left: 50%;
                    margin-left: -.3rem;
                }
                .keyboard-title-del {
                    font-size: .35rem;
                }
            }
            .keyboard-results {
                width: 94%;
                margin: .2rem auto 0;
                background: #FFFFFF;
                border-radius: .05rem;
                display: flex;
                align-items: center;
                padding: .2rem;
                .keyboard-results-icon {
                    margin-right: .2rem;
                }
                .keyboard-results-pld {
                    color: #AFAFB2;
                }
            }
            .keyborad-content {
                width: 94%;
                height: 4.3rem;
                margin: .2rem auto 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .keyboard-left {
                    position: relative;
                    width: 70%;
                    height: 100%;
                    .keyboard-left-list {
                        display: flex;
                        //justify-content: space-between;
                        align-items: center;
                        height: calc(25% - 1px);
                        margin-bottom: 3px;
                        .keyboard-left-btn {
                            width: 32%;
                            background: #FFFFFF;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-right: 3px;
                            font-size: .4rem;
                            border-radius: .1rem;
                        }
                        .del-fonts {
                            font-size: .26rem;
                        }
                    }
                }
                .keybord-right {
                    width: 26%;
                    height: 100%;
                    .keybord-right-list {
                        background: #FFFFFF;
                        height: calc(25% - 1px);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-bottom: 3px;
                        font-size: .4rem;
                        border-radius: .1rem;
                        span:first-child {
                            margin-top: -.06rem;
                        }
                    }
                    .keybord-right-list:last-child {
                        margin-bottom: 0;
                        background: #464646;
                        color: #FFFFFF;
                    }
                    .keybord-right-list:first-child {
                        margin-top: 0;
                    }
                }
            }
            .bottom-btn-box2 {
                width: 100%;
                .bottom-btn {
                    width: 94%;
                    font-weight: bold;
                }
            }
        }
	}
}
</style>
