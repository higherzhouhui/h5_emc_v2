<template>
	<div class="addBank">
	    <HeaderTop :title="`账户管理`"></HeaderTop>
		<div class="add-bank-tab">
			<div class="tab-title">
				<div class="tab-title-list" :class="titleIndex === 1?'title-chosing':''" @click="switchTitle(1)">银行卡管理
				</div>
				<div class="tab-title-list" :class="titleIndex === 2?'title-chosing':''" @click="switchTitle(2)">虚拟币管理
				</div>
				<div class="tab-title-list" :class="titleIndex === 3?'title-chosing':''" @click="switchTitle(3)">数字货币
				</div>
			</div>
            <!-- 银行卡 -->
			<div class="tab-content-card" v-if="titleIndex === 1">
				<div class="no-list" v-if="noBankCard">您还未绑定银行卡</div>
				<div class="add-bank">
					<div class="bank-card" v-for="(v,index) in data" :key="index">
						<div class="bank-message">
							<div class="bank-message-title">
								<div class="bank-logo">
									<img :src="v.bankImage" alt="">
								</div>
								<div class="bank-name">
									<p class="fff">{{ v.bankName }}</p>
									<p class="fff">储蓄卡</p>
								</div>
								<div class="del-bank" @click="delBankCard(index)"></div>
							</div>
							<div class="bank-number">
								<div class="bank-number-left">姓名: {{ v.realName }}</div>
								<div class="bank-number-left">尾号: {{ v.shortCarNumber }}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="submitBlue">
					<div class="btnCover" @click="toAddBankCard()">+ 本人银行卡添加</div>
				</div>
				<div class="submitBlue" v-if="hasOtherBank">
					<div class="btnCover" @click="toAddBankCardOther()">+ 非本人银行卡添加</div>
				</div>
			</div>
            <!-- 虚拟币 -->
			<div class="tab-content-card" v-if="titleIndex === 2">
				<div class="no-list" v-if="noVirtualCoin">您还未绑定虚拟币账户</div>
				<div class="add-bank">
					<div class="bank-card virtual-acc" v-for="(item,index) in virtualCoinData" :key="index">
						<div class="bank-message">
							<div class="bank-message-title">
								<div class="bank-logo">
									<!-- <img src="../../../static/images/virtual-acc-icon.png" alt=""> -->
                                    <img :src="item.virtualImage" alt="">
								</div>
								<div class="bank-name">
									<p class="fff">{{ item.virtualName }}</p>
								</div>
								<div class="del-bank" @click="delVirtualCoin(index)">
                                    <img src="../../../static/images/account-delete.png" alt="">
                                </div>
							</div>
							<div class="bank-number">
                                <span>{{ item.shortCarNumber }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="submitBlue">
					<div class="btnCover" @click="toAddVirtualCoin()">+ 虚拟币帐号添加</div>
				</div>
			</div>
            <!-- 数字货币 -->
            <div class="tab-content-card" v-if="titleIndex === 3">
				<div class="no-list" v-if="noDigitalCoin">您还未绑定数字货币帐号</div>
				<div class="add-bank">
					<div class="bank-card virtual-acc digital-acc" v-for="(item,index) in digitalData" :key="index">
						<div class="bank-message">
							<div class="bank-message-title">
								<div class="bank-logo digital-logo">
									<!-- <img src="../../../static/images/digital-list-icon.png" alt=""> -->
									<img :src="item.virtualImage" alt="">
								</div>
								<div class="digital-name">
									<p class="digital-fonts1 bold">{{ item.virtualName }}</p>
									<p class="digital-fonts2">{{ item.platformName }}</p>
								</div>
								<div class="del-bank" @click="delDigitalCoin(index)">
                                    <img src="../../../static/images/account-delete.png" alt="">
                                </div>
							</div>
							<div class="digital-coin-num">
                                <span>{{ item.shortCarNumber }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="submitBlue">
					<div class="btnCover" @click="toAddDigitalCoin()">+ 数字货币帐号添加</div>
				</div>
			</div>
		</div>
	
	</div>
</template>
<script>
import HeaderTop from '../../components/top/top'
import MuSubmit from '../../components/submit/muSubmit'
import { Dialog,Toast } from 'vant';

export default {
	name: 'addBank',
	components: {
		HeaderTop,
		MuSubmit,
	},
	data () {
		return {
			data: [],
			virtualCoinData: [],
			digitalData: [],
			bankName: '',
			bankListCheck: false,
			index: 0,
			hasOtherBank: false,
			titleIndex: 1,
			virtualId: '',
			digitalId: '',
			noVirtualCoin: false,
			noBankCard: false,
			noDigitalCoin: false,
		}
	},
	mounted () {
        this.initShow()
		this.loadTop()
	},
	beforeRouteLeave (to, from, next) {    
        sessionStorage.removeItem('initPage')
		this.$destroy(true)
		next()
	},
	methods: {
        initShow(){
            if(sessionStorage.getItem('initPage') === '1'){
                this.titleIndex = 1
            }else if(sessionStorage.getItem('initPage') === '2'){
                this.titleIndex = 2
            }else if(sessionStorage.getItem('initPage') === '3'){
                this.titleIndex = 3
            }
        },
		switchTitle (index) {
			this.titleIndex = index
		},
        delDigitalCoin(index){
            Dialog.confirm({
                message: '确认删除数字货币帐号？',
            })
            .then(() => {
                // on confirm
                this.digitalId = this.digitalData[index].memberVirtualId
                let param = {
                    virtualId: this.digitalId,
                    version: this.API.paramVersion,
                }
                this.ServerAPI.postAPI(this.API.virtualCoinDel, param, (success, data) => {
                    if (success) {
                        if (data.code == '0000') {
                            Toast('删除成功')
                            let param = {
                                version: this.API.paramVersion,
                            }
                            this.ServerAPI.postAPI(this.API.digitalList, param, this.digitalList)
                        } else {
                            Toast(data.info)
                        }
                    } else {
                        Toast('网络错误，请重试')
                    }
                })
            })
            .catch(() => {
                // on cancel
            })
        },
        toAddDigitalCoin(){
            this.$router.push('/addDigital')
        },
		loadTop () {
			let param = {
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.addBankList, param, this.addBankList)
			this.ServerAPI.postAPI(this.API.virtualCoinList, param, this.virtualCoinList)
			this.ServerAPI.postAPI(this.API.digitalList, param, this.digitalList)
			this.ServerAPI.postAPI(this.API.userInfo, param, this.userInfo)
		},
		addBankList (success, data) {
			if (success) {
				if (data.code == '0000') {
					this.data = data.data
					if (this.data.length == 0) {
						this.noBankCard = true
					}
				}
			}
		},
		delVirtualCoin (index) {
            Dialog.confirm({
                message: '确认删除虚拟币账户？',
            })
            .then(() => {
                // on confirm
                this.virtualId = this.virtualCoinData[index].memberVirtualId
                let param = {
                    virtualId: this.virtualId,
                    version: this.API.paramVersion,
                }
                this.ServerAPI.postAPI(this.API.virtualCoinDel, param, (success, data) => {
                    if (success) {
                        if (data.code == '0000') {
                            Toast('删除成功')
                            let param = {
                                version: this.API.paramVersion,
                            }
                            this.ServerAPI.postAPI(this.API.virtualCoinList, param, this.virtualCoinList)
                        } else {
                            Toast(data.info)
                        }
                    } else {
                        Toast('网络错误，请重试')
                    }
                })
            })
            .catch(() => {
                // on cancel
            })
		},
		virtualCoinList (success, data) {
			if (success) {
				if (data.code == '0000') {
					this.virtualCoinData = data.data
					if (this.virtualCoinData.length == 0) {
						this.noVirtualCoin = true
					}
				}
			}
		},
        digitalList(success, data){
            if (success) {
                if (data.code === '0000') {
                    this.digitalData = data.data
                    if(this.digitalData.length === 0){
                        this.noDigitalCoin = true
                    }
                }else{
                    Toast(data.info)
                }
            }else{
                Toast('网络错误，请重试')
            }
        },
		userInfo (success, data) {
			if (success) {
				if (data.code == '0000') {
					this.hasOtherBank = data.data.hasOtherBank
				}
			}
		},
		delBankList (success, data) {
			if (success) {
				if (data.code == '0000') {
					Toast('银行卡删除成功')
					this.loadTop()
				}
			}
		},
		toAddBankCard () {
			this.$router.push('/addbankCard')
		},
		toAddBankCardOther () {
			this.$router.push('/addbankCardOther')
		},
		delBankCard (index) {
            Dialog.confirm({
                message: '确认删除银行卡？',
            })
            .then(() => {
                // on confirm
                let param = {
                    bankId: this.data[index].memberBankId,
                    version: this.API.paramVersion,
                }
                this.ServerAPI.postAPI(this.API.delBankList, param, this.delBankList)
                this.loadTop()
            })
            .catch(() => {
                // on cancel
            });
		},
		toAddVirtualCoin () {
			this.$router.push('/addVirtualCoinAccount')
		},
		toMy () {
			this.$router.push('/my')
		}
	}
}
</script>

<style lang="scss" scoped>
div, p, span {
	font-family: PingFang-SC-Medium;
	/*color: #2D343E;*/
}
.reg-head {
	width: 100%;
	height: 1rem;
	background: #028AFE;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: bold;
	color: #FFFFFF;
	box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, .5);
	.go-back {
		width: .2rem;
		height: .3rem;
		background: url("../../../static/images/back-icon.png") no-repeat;
		background-size: 100% 100%;
		margin-left: .2rem;
	}
	.head-title {
		font-size: .3rem;
	}
	.head-title2 {
		width: .8rem;
	}
}
.mint-msgbox-content /deep/ .mint-msgbox-message {
	height: 1rem !important;
}
.mint-msgbox .mint-msgbox-btn {
	background: #FFFFFF;
	color: #3677FF;
}
.mu-raised-button-label {
	color: #FFFFFF;
}
.addBank {
	.add-bank-tab {
        .tab-title {
            width: 92%;
            margin: .2rem auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: .5rem;
            background: #FFFFFF;
            padding: .1rem;
            .tab-title-list {
                width: 50%;
                text-align: center;
                height: .6rem;
                line-height: .6rem;
                background: #FFFFFF;
                color: #6C6C6C;
                font-weight: bold;
                border-radius: .4rem;
            }
            .title-chosing {
                background: linear-gradient(to right,#78BDF2,#167BFF);
                color: #FFFFFF;
            }
            .tab-title-list-disable {
                background: #D7D7D8;
            }
        }
	}
	.commit-yar {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, .5);
		display: flex;
		justify-content: center;
		align-items: center;
		.commit-main {
			width: 70%;
			height: 4rem;
			background: #fff;
			border-radius: .1rem;
			.commit-text {
				height: 76%;
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				border-bottom: 1px solid #e5e5e5;
				div {
					color: #3b556e;
					font-size: .3rem;
				}
				img {
					width: 1.14rem;
					height: 1.14rem;
					margin: 0 0 .4rem 0;
				}
			}
			.commit-com {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 24%;
				div {
					flex: 1;
					text-align: center;
					font-size: .3rem;
					color: #2756a4;
				}
				.commit-cancel {
					border-right: 1px solid #e5e5e5;
					height: 100%;
					line-height: 1.1rem;
					color: #8d969b;
					
				}
			}
		}
	}
	.null-height {
		height: .2rem;
	}
	width: 100%;
	background: #EDEFF2;
	height: 100%;
	.add-bank {
		width: 100%;
		background: #EDEFF2;
		padding: .3rem 0 0;
		.bank-card {
			height: 1.8rem;
			width: 92%;
			margin: 0 auto .2rem;
			position: relative;
			background: url("../../../static/images/bankCard-bg.png") no-repeat;
			background-size: 100% 100%;
            color: #FFFFFF;
			.bank-message {
				padding-top: .2rem;
				.bank-message-title {
					width: 92%;
					margin: 0 auto;
					overflow: hidden;
					display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    position: relative;
					.bank-logo {
						width: .7rem;
						height: .7rem;
						border-radius: 50%;
                        background: #FFFFFF;
						display: flex;
                        justify-content: center;
                        align-items: center;
						img {
							width: .55rem;
							height: .55rem;
						}
					}
					.bank-name {
						margin-left: .15rem;
						font-weight: bold;
                        height: 100%;
						p {
							font-size: .28rem;
							// height: .76rem;
                            // line-height: .76rem;
						}
						p:last-child {
							font-size: .2rem;
                            font-weight: normal;
                            margin-top: .1rem;
						}
					}
					.del-bank {
						position: absolute;
                        top: 0rem;
                        right: 0rem;
						width: .2rem;
						height: .2rem;
						background: url("../../../static/images/del-bank.png") no-repeat;
						background-size: 100% 100%;
						margin: 2% 2% 0 0;
					}
				}
				.bank-number {
					//text-align: right;
					margin: 3% 5% 0 3%;
					font-size: .25rem;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
        .virtual-acc {
            height: 2.5rem;
            width: 92%;
            margin: 0 auto .4rem;
            position: relative;
            background: url("../../../static/images/virtual-acc-bg.png") no-repeat;
            background-size: 100% 100%;
            color: #333333;
            border-radius: .15rem;
            box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.16);
            .bank-message {
                padding-top: .5rem;
                .bank-message-title {
                    width: 90%;
                    .bank-logo {
                        width: .76rem;
                        height: .76rem;
                        img {
                            height: .76rem;
                            width: unset;
                        }
                    }
                    .digital-name {
                        margin-left: .15rem;
                        .digital-fonts1 {
                            font-size: .3rem;
                        }
                        .digital-fonts2 {
                            margin-top: -.05rem;
                        }
                    }
                    .del-bank {
                        width: .7rem;
                        height: .7rem;
                        background: #FFFFFF;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0;
                        img {
                            width: .35rem;
                            height: .35rem;
                        }
                    }
                    .digital-logo {
                        width: 1rem;
                        height: 1rem;
                        img {
                            height: 1rem;
                            width: unset;
                        }
                    }
                }
                .bank-number {
                    width: 90%;
                    margin: .45rem auto 0;
                }
                .digital-coin-num {
                    width: 86%;
                    margin: .18rem auto 0;
                }
            }
        }
        .digital-acc {
            background: url("../../../static/images/digital-coin-bg.png") no-repeat;
            background-size: 100% 100%;
        }
	}
}
.submitBlue {
	width: 92%;
	margin: .3rem auto 0;
	.btnCover {
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		color: #FFFFFF;
		text-align: center;
		background: linear-gradient(90deg,#78BDF2,#167BFF);
		margin-top: .4rem;
		border: none;
		border-radius: .08rem;
	}
}
.tab-content-card {
	background: #EDEFF2;
	padding-bottom: .6rem;
	.no-list {
		text-align: center;
		color: #6C6C6C;
		margin-top: .5rem;
	}
}
</style>
