<template>
	<div class="vipDetail">
		<HeaderTop :title="`VIP详情`"></HeaderTop>
		<!--        <div class="reg-head">-->
		<!--            <div class="go-back" @click="toVipMember()"></div>-->
		<!--            <div class="head-title">VIP详情</div>-->
		<!--            <div class="to-help"></div>-->
		<!--        </div>-->
		<div class="gray-area"></div>
		<div class="top-title-box">
			<div class="vip-discount-table">
				<div class="vip-own-title">
					<img src="../../../static/images/vip-title-icon.png" alt="" class="title-icon">
					<div class="title-fonts">&nbsp;VIP返水比例</div>
				</div>
				<div class="vip-discount-table-content">
					<div class="fixed-box">
						<div class="fixed-left">
							<div class="fixed-left-content">
								<div class="fixed-left-content-list dark-blue">VIP等级</div>
								<div class="fixed-left-content-list">体育返水</div>
								<div class="fixed-left-content-list">真人返水</div>
								<div class="fixed-left-content-list">电竞返水</div>
								<!--                                 <div class="fixed-left-content-list">电子救援</div>-->
								<!--                                 <div class="fixed-left-content-list">棋牌输返</div>-->
							</div>
						</div>
						<div class="fixed-right-box">
							<div class="fixed-right" v-for="(item,index) in tableData" :key="index">
								<div class="fixed-right-content">
									<div class="fixed-right-content-list"
									     :class="index==0||index==2||index==4||index==6||index==8||index==10?'middle-blue':'light-blue'">
										{{ item.name }}
									</div>
								</div>
								<div class="fixed-right-content">
									<div class="fixed-right-content-list"
									     :class="index==1||index==3||index==5||index==7||index==9?'dark-gray':''">
										{{ item.sportsRebates }}%
									</div>
								</div>
								<div class="fixed-right-content">
									<div class="fixed-right-content-list"
									     :class="index==1||index==3||index==5||index==7||index==9?'dark-gray':''">
										{{ item.videoRebates }}%
									</div>
								</div>
								<div class="fixed-right-content">
									<div class="fixed-right-content-list"
									     :class="index==1||index==3||index==5||index==7||index==9?'dark-gray':''">
										{{ item.esportRebates }}%
									</div>
								</div>
								<!--                              <div class="fixed-right-content">-->
								<!--                                  <div class="fixed-right-content-list" :class="index==1||index==3||index==5||index==7||index==9?'dark-gray':''">{{item.slotRescueCash}}</div>-->
								<!--                              </div>-->
								<!--                              <div class="fixed-right-content">-->
								<!--                                  <div class="fixed-right-content-list" :class="index==1||index==3||index==5||index==7||index==9?'dark-gray':''">{{item.pokerRescueCash}}</div>-->
								<!--                              </div>-->
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="gray-area"></div>
			<div class="vip-discount-table vip-discount-table2">
				<div class="vip-own-title vip-own-title2">
					<img src="../../../static/images/vip-title-icon.png" alt="" class="title-icon">
					<div class="title-fonts">&nbsp;VIP提款额度</div>
				</div>
				<div class="vip-discount-table-content">
					<div class="fixed-box">
						<div class="fixed-left">
							<div class="fixed-left-content">
								<div class="fixed-left-content-list dark-blue fixed-left-content-list2">VIP等级</div>
								<div class="fixed-left-content-list fixed-left-content-list2">日提款次数</div>
								<div class="fixed-left-content-list fixed-left-content-list2">每日提款款额</div>
							</div>
						</div>
						<div class="fixed-right-box">
							<div class="fixed-right" v-for="(item,index) in tableData" :key="index">
								<div class="fixed-right-content fixed-right-content2">
									<div class="fixed-right-content-list"
									     :class="index==0||index==2||index==4||index==6||index==8||index==10?'middle-blue':'light-blue'">
										{{ item.name }}
									</div>
								</div>
								<div class="fixed-right-content fixed-right-content2">
									<div class="fixed-right-content-list"
									     :class="index==1||index==3||index==5||index==7||index==9?'dark-gray':''">
										{{ item.outNumsMax }}
									</div>
								</div>
								<div class="fixed-right-content fixed-right-content2">
									<div class="fixed-right-content-list"
									     :class="index==1||index==3||index==5||index==7||index==9?'dark-gray':''">
										{{ item.outMoneyMax }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="gray-area"></div>
			<div class="vip-page-bottom">
				<div class="vip-discount-table-title">
					<div class="vip-own-title">
						<img src="../../../static/images/vip-title-icon.png" alt="" class="title-icon">
						<div class="title-fonts">&nbsp;活动的一般条款与规则</div>
					</div>
				</div>
				<div class="vip-discount-intro">
					<div class="vip-discount-intro-list">
						<div class="vip-discount-intro-yellow"><span class="blue-circle">1</span><span
							class="black-fonts">晋升标准</span></div>
						<div class="vip-discount-intro-white">会员的累计存款以及累计投注额达到相应级别的要求，即可在48小时内晋级相应VIP等级。</div>
					</div>
					<div class="vip-discount-intro-list">
						<div class="vip-discount-intro-yellow"><span class="blue-circle">2</span><span
							class="black-fonts">晋升顺序</span></div>
						<div class="vip-discount-intro-white">VIP等级达到相应的要求可每天晋升一级，但VIP等级不可越级晋升。</div>
					</div>
					<div class="vip-discount-intro-list">
						<div class="vip-discount-intro-yellow"><span class="blue-circle">3</span><span
							class="black-fonts">保级要求</span></div>
						<div class="vip-discount-intro-white">会员在达到某VIP等级后，90天内投注需要完成保级要求。如果在此期间完成晋升，保级要求重新按照当前等级计算。
						</div>
					</div>
					<div class="vip-discount-intro-list">
						<div class="vip-discount-intro-yellow"><span class="blue-circle">4</span><span
							class="black-fonts">降级标准</span></div>
						<div class="vip-discount-intro-white">
							如果会员在一个季度(90天计算)内没有完成相应的保级要求流水，系统会自动降级一个等级，相应的返水及其它优惠也会随之调整至降级后的等级。
						</div>
					</div>
<!--					<div class="vip-discount-intro-list">-->
<!--						<div class="vip-discount-intro-yellow"><span class="blue-circle">5</span><span-->
<!--							class="black-fonts">礼品优惠</span></div>-->
<!--						<div class="vip-discount-intro-white">敬请期待。</div>-->
<!--					</div>-->
					<div class="vip-discount-intro-list">
						<div class="vip-discount-intro-yellow"><span class="blue-circle">5</span><span
							class="black-fonts">升级礼金</span></div>
						<div class="vip-discount-intro-white">
							升级礼金在会员达到该会员级别后在 VIP 活动页面自助申请，每个级别的升级礼金每位会员仅能获得 1 次。(升级礼金 1 倍流水,不限投注游戏场馆除彩票)。
						</div>
					</div>
					<div class="vip-discount-intro-list">
						<div class="vip-discount-intro-yellow"><span class="blue-circle">6</span><span
							class="black-fonts">生日礼金</span></div>
						<div class="vip-discount-intro-white">会员注册游戏账号时间≥90天，在生日前7天至生日当天在优惠页面点击【立即申请】申请，彩金在生日当天到账。</div>
					</div>
					<div class="vip-discount-intro-list">
						<div class="vip-discount-intro-yellow"><span class="blue-circle">7</span><span
							class="black-fonts">进球红包</span></div>
						<div class="vip-discount-intro-white">
							VIP3-VIP10会员每周享无限次红包，VIP2会员享每周6次红包，VIP1会员享每周3次红包，VIP0会员享2次红包。
						</div>
					</div>
					<div class="vip-discount-intro-list">
						<div class="vip-discount-intro-yellow"><span class="blue-circle">8</span><span
							class="black-fonts">每月红包</span></div>
						<div class="vip-discount-intro-white">
							每月1号至月底，在VIP活动页面自助申请，会员在上个月有过至少1次的成功存款，即可在每月1号至月底期间获得上个月相应等级的每月红包彩金。(每月红包彩金1倍流水即可提款,不限投注游戏场馆除彩票)。
						</div>
					</div>
					<div class="vip-discount-intro-list">
						<div class="vip-discount-intro-yellow"><span class="blue-circle">9</span><span
							class="black-fonts">红利优惠</span></div>
						<div class="vip-discount-intro-white">
							VIP相关优惠仅一倍流水即可提款，不限投注游戏场馆除彩票 ，不与平台其他优惠共享，仅与返水优惠共享。EMC易倍保留对活动的修改，停止及最终解释权。备注：每日返水将会在14:00~16:00自动派发
                            <!-- <br>备注：每日返水将会在14：00-16：00发放。 -->
						</div>
					</div>
					<!--                    <div class="vip-discount-intro-list">-->
					<!--                        <div class="vip-discount-intro-yellow"><span class="blue-circle">10</span><span class="black-fonts">EMC易倍保留对活动的修改，停止及最终解释权。</span></div>-->
					<!--                        <span class="vip-discount-intro-white blue-fonts">备注：每日返水将会在14：30-15：30发放。</span>-->
					<!--                    </div>-->
				</div>
			</div>
			<div class="gray-area gray-area2">
				<div class="to-top-box">
					<img src="../../../static/images/to-top.png" alt="" class="to-top">
					<div class="to-top-fonts" @click="toTop">回到顶部</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top';

export default {
	name: 'vipDetail',
	components: {
		HeaderTop,
	},
	data() {
		return {
			popupVisible: false,
			levelLogo: '',
			levelNum: 0,
			tableData: [],
			depositCash: 0,
			betCash: 0,
			keepCash: 0,
		}
	},
	mounted() {
		this.vipList();
	},
	methods: {
		toVipMember() {
			this.$router.push('/vipMember');
		},
		toTop() {
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		},
		vipList() {
			let params = {
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.vipInfo, params, (success, data) => {
				if (success) {
					if (data.code == '0000') {
						this.tableData = data.data.levelList;
					}
				}
			})
		},
		closeUpdata() {
			this.popupVisible = false;
		},
		toShow(value) {
			this.popupVisible = true;
			this.depositCash = this.tableData[value].depositCash
			this.betCash = this.tableData[value].betCash
			this.keepCash = this.tableData[value].keepCash
			this.levelNum = this.tableData[value].level;
		},
		toVipDetail() {
			this.$router.push('/vipMember')
		}
	}
}
</script>

<style lang="scss" scoped>
.vipDetail {
	background: #FFFFFF;
	height: 100%;
	
	.gray-area {
		height: .25rem;
		background: #E2E2E2;
	}
	
	.gray-area2 {
		height: 1.3rem;
		padding: .25rem 0;
		
		.to-top-box {
			width: 2rem;
			margin: 0 auto;
			text-align: center;
			background: #FFFFFF;
			border-radius: .35rem;
			padding: .05rem .3rem;
			
			.to-top {
				width: .3rem;
			}
			
			.to-top-fonts {
				color: #71747E;
				font-weight: bold;
			}
		}
	}
	
	.top-title-box {
		width: 100%;
		height: 5rem;
		padding-top: .3rem;
		
		.top-title {
			width: 70%;
			height: .4rem;
			margin: 0 auto;
			text-align: center;
			font-weight: bold;
			font-size: .32rem;
		}
		
		#vipSliders {
			margin-top: .3rem;
		}
		
		.vip-discount-table {
			background: #FFFFFF;
			padding-bottom: .3rem;
			
			.vip-own-title {
				width: 94%;
				margin: 0 auto .2rem;
				display: flex;
				align-items: center;
				
				.title-icon {
					height: .45rem;
				}
				
				.title-fonts {
					font-size: .38rem;
					font-weight: bold;
					color: #414655;
				}
			}
			
			.vip-own-title2 {
				padding-top: .2rem;
			}
			
			.vip-discount-table-content {
				margin: 0 auto;
				display: flex;
				justify-content: start;
				
				.fixed-box::-webkit-scrollbar {
					display: none;
				}
				
				.fixed-box {
					width: 100%;
					overflow-x: auto;
					
					.fixed-left {
						text-align: center;
						background: #B8CCE5;
						display: flex;
						align-items: center;
						
						.fixed-left-content {
							width: 100%;
							line-height: .8rem;
							color: #6D6D6D;
							font-size: .24rem;
							font-weight: bold;
							display: flex;
							align-items: center;
							justify-content: space-between;
							
							.fixed-left-content-list {
								width: 25%;
								background: #B8CCE5;
							}
							
							.dark-blue {
								background: #00479D;
								color: #FFFFFF;
							}
							
							.fixed-left-content-list2 {
								width: 33.33%;
							}
						}
						
					}
					
					.fixed-right-box {
						width: 100%;
						text-align: center;
						
						.fixed-right {
							display: flex;
							justify-content: space-between;
							align-items: center;
							background: #EEEEEE;
							
							.fixed-right-content {
								width: 25%;
								height: .8rem;
								line-height: .8rem;
								background: #EEEEEE;
								color: #5D7AB2;
								font-size: .24rem;
								text-align: center;
								font-weight: bold;
								
								.fixed-right-content-list {
									height: .8rem;
									line-height: .8rem;
									
									.vipdetail-no {
										width: .2rem;
										height: .2rem;
									}
									
									.vipdetail-yes {
										width: .35rem;
										height: .3rem;
									}
								}
								
								.middle-blue {
									background: #3A79C6;
									color: #FFFFFF;
								}
								
								.light-blue {
									background: #50A0E3;
									color: #FFFFFF;
								}
								
								.dark-gray {
									background: #EDF3FB;
								}
							}
							
							.fixed-right-content2 {
								width: 33.33%;
							}
						}
						
						.fixed-right:last-child {
							.fixed-right-title {
								.fixed-right-title-list {
									border-top-right-radius: .1rem !important;
								}
							}
						}
					}
				}
			}
		}
		
		.vip-page-bottom {
			background: #FFFFFF;
			padding: .5rem 0 .5rem;
			
			.vip-own-title {
				width: 94%;
				margin: 0 auto;
				display: flex;
				align-items: center;
				
				.title-icon {
					height: .45rem;
				}
				
				.title-fonts {
					font-size: .38rem;
					font-weight: bold;
					color: #414655;
				}
			}
			
			.my-vip-fonts {
				width: 3.5rem;
				height: .7rem;
				line-height: .7rem;
				margin: 0 auto;
				border: #F6D2A4 1px solid;
				border-radius: .4rem;
				color: #F6D2A4;
				text-align: center;
			}
			
			.vip-discount-logo {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;
				margin-top: .3rem;
				
				img {
					width: 1.5rem;
					height: 1.3rem;
					margin: 0 .1rem .3rem;
				}
			}
			
			.vip-discount-intro {
				width: 100%;
				margin: 0 auto;
				padding: .15rem .2rem;
				
				.vip-discount-intro-list {
					font-size: .26rem;
					line-height: .55rem;
					margin-top: .15rem;
					
					.vip-discount-intro-yellow {
						color: #555555;
						display: flex;
						align-items: center;
						font-weight: bold;
						
						.blue-circle {
							display: inline-block;
							width: .35rem;
							height: .35rem;
							border-radius: 50%;
							background: #0055F9;
							color: #FFFFFF;
							line-height: .35rem;
							text-align: center;
							font-weight: normal;
							margin-right: .1rem;
						}
					}
					
					.vip-discount-intro-white {
						color: #A8B3C3;
						font-size: .22rem;
						line-height: .3rem;
					}
					
					.blue-fonts {
						color: #5178FB;
					}
				}
			}
		}
	}
}

.mint-popup {
	border-radius: .16rem;
}

.vip-conditions-title {
	width: 6rem;
	height: 1rem;
	line-height: 1rem;
	background: linear-gradient(to right, #353535 0%, #111111 100%);
	color: #DDDDDD;
	font-size: .3rem;
	display: flex;
	align-items: center;
	/*border-top-left-radius: .15rem;*/
	/*border-top-right-radius: .15rem;*/
	img {
		width: .6rem;
		height: .5rem;
		margin: 0 .2rem;
	}
}

.updata-conditions-content {
	text-align: center;
	
	.updata-conditions-content-title {
		color: #222222;
		font-size: .35rem;
		margin: .3rem auto .2rem;
	}
	
	.updata-conditions-1, .updata-conditions-2 {
		.red-fonts {
			font-size: .3rem;
			color: #FF0000;
		}
		
		.gray-fonts {
			font-size: .26rem;
			color: #888888;
		}
	}
}

.horizon-line {
	width: 80%;
	height: 2px;
	margin: .2rem auto;
	background: #E5E5E5;
}

.confirm {
	height: 1rem;
	line-height: 1rem;
	border-top: #E5E5E5 1px solid;
	text-align: center;
	color: #0A0A0A;
	margin-top: .3rem;
}
</style>
