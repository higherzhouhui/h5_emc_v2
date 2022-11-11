<template>
	<div class="vipMember">
		<!--点击领取弹出模块-->
		<van-popup v-model="clickShow" class="click-show">
			<div class="dark-blue-part"></div>
			<div class="white-part">
				<div class="white-part-title">
					<div class="white-part-title-left">
						<div class="white-part-title-left-fonts1">恭喜您!</div>
						<div class="white-part-title-left-fonts2">
							<span v-if="levelUpShow">升级礼金</span>
							<span v-if="monthCashShow">每月红包</span>
							领取成功~
						</div>
					</div>
					<img src="../../../static/images/vip-get-success-icon.png" v-if="levelUpShow" alt=""
					     class="white-part-title-right">
					<img src="../../../static/images/vip-get-success-icon3.png" v-if="monthCashShow" alt=""
					     class="white-part-title-right">
				</div>
				<div class="gray-line"></div>
				<div class="white-part-cash">
					<div class="white-part-cash-fonts1">
						<span v-if="levelUpShow">升级礼金</span>
						<span v-if="monthCashShow">每月红包</span>
						<span class="blue-fonts">{{ cashGet }}</span>元
					</div>
					<div class="white-part-cash-fonts2">礼金已派发至您的中心钱包</div>
				</div>
			</div>
			<div class="light-blue-part">
				<img src="../../../static/images/vip-get-success-icon2.png" v-if="levelUpShow" alt=""
				     class="light-blue-part-icon">
				<img src="../../../static/images/vip-get-success-icon4.png" v-if="monthCashShow" alt=""
				     class="light-blue-part-icon">
				<div class="light-blue-part-fonts" v-if="levelUpShow">升级礼金</div>
				<div class="light-blue-part-fonts" v-if="monthCashShow">每月红包</div>
			</div>
		</van-popup>
		<div class="title-bg">
			<div class="reg-head">
				<div class="go-back" @click="toUserInfo()"></div>
				<div class="head-title">VIP特权</div>
				<div class="to-vipDetail" @click="toVipDetail">VIP详情</div>
			</div>
			<div class="vipMember-content">
				<div class="user-info-content">
					<div class="user-info-content-left">
						<img :src="userAvatar" alt="" class="avatar-img" @click="subUpgrade()">
						<div class="user-name">
							<div class="user-name-fonts1">{{ userName }}</div>
							<div class="user-name-fonts2">已加入大家庭<span class="white-fonts"> {{ userDays }} </span>天</div>
							<div class="user-name-fonts2" v-if='needKeep'>保级验证时间<span class="white-fonts"> {{ keepDate }}</span></div>
						</div>
					</div>
					<img :src="levelModal" alt="" class="user-info-content-right">
				</div>
				<div class="progress-box">
					<div class="progress-box-left">VIP{{ levelNow }}</div>
					<div class="progress-content-box">
						<van-progress class="progress-content" :percentage="progressPercent" stroke-width="10"
						              color="#00479D" pivot-color="#DEB190" track-color="#FFFFFF" :showPivot="false"/>
						<img src="../../../static/images/vip-progress-soccer.png" alt="" class="progress-icon"
						     id="progressIcon">
						<div class="percent-fonts-box" id="progressFonts">
							<div class="percent-fonts-box-fonts">{{ progressPercent }}%</div>
							<img src="../../../static/images/percent-fonts-box-icon.png" alt=""
							     class="percent-fonts-box-icon">
						</div>
					</div>
					<div class="progress-box-left progress-box-right">VIP{{ levelNext }}</div>
				</div>
                <div class="progress-box progress-box2" v-if='needKeep'>
					<div class="progress-box-left progress-box-left2">保级流水</div>
					<div class="progress-content-box progress-content-box2">
						<van-progress class="progress-content" :percentage="progressPercent2" stroke-width="10"
						              color="#00479D" pivot-color="#DEB190" track-color="#FFFFFF" :showPivot="false"/>
						<img src="../../../static/images/vip-progress-soccer.png" alt="" class="progress-icon"
						     id="progressIcon">
						<div class="percent-fonts-box" id="progressFonts">
							<div class="percent-fonts-box-fonts">{{ progressPercent2 }}%</div>
							<img src="../../../static/images/percent-fonts-box-icon.png" alt=""
							     class="percent-fonts-box-icon">
						</div>
					</div>
				</div>
				<div class="money-status">
					<div class="money-status-list">
						<div class="point"></div>
						<div class="fonts">&nbsp;当前存款(元): <span class="black-fonts">{{ depositCash }}</span>
							({{ depositCash }}/{{ depositNeed }})
						</div>
					</div>
					<div class="money-status-list">
						<div class="point"></div>
						<div class="fonts">&nbsp;当前流水(元): <span class="black-fonts">{{ betCash }}</span>
							({{ betCash }}/{{ nextBetCash }})
						</div>
					</div>
					<div class="money-status-list" v-if="needKeep">
						<div class="point"></div>
						<div class="fonts">&nbsp;保级流水(元): <span class="black-fonts">{{ keepBetCash }}</span>
							({{ keepBetCash }}/{{ needKeepBetCash }})
						</div>
					</div>
				</div>
                <div class="bottom-upgrade flex-c" v-if="progressPercent === '100.00' && !disableBtn" @click="subUpgrade()">立即升级</div>
                <div class="bottom-upgrade bottom-upgrade2 flex-c" v-if="progressPercent === '100.00' && disableBtn">立即升级</div>
			</div>
		</div>
		<div class="switch-level">
			<div class="switch-level-list-box" id="levelList">
				<div class="switch-level-list-box2" v-for="(item,index) in allLevelData" :key="index">
					<div class="switch-level-list" :class="tabChosing == index? 'switch-level-list-chosing':''"
					     @click="switchChosing(index)">Lv{{ item.level }}
					</div>
					<div class="middle-line"></div>
				</div>
			</div>
		</div>
		<div class="swipe-content">
			<van-swipe @change="onChange" :showIndicators="false" ref="swiper" :initialSwipe="swiperInit">
				<van-swipe-item v-for="(item,index) in allLevelData" :key="index">
					<div class="vip-detail-card" :class="'vip-detail-card' + (index+1)"
					     :id="index==levelNow-1?'blueCard' + (index+1):''" v-if="!levelHide">
						<div class="detail-card-bottom">
                            <div class="flex-b">
                                <div class="detail-card-fonts">
                                    {{ item.depositCash }}<br>累计存款
                                </div>
                                <div class="detail-card-fonts">
                                    {{ item.betCash }}<br>流水要求
                                </div>
                                <div class="detail-card-fonts">
                                    {{ item.keepBetCash }}<br>保级流水(3个月)
                                </div>
                            </div>
						</div>
					</div>
					<div class="vip-detail-card" :class="'vip-detail-card' + index" :id="index==levelNow?'blueCard' + index:''" v-if="levelHide">
						<div class="detail-card-bottom">
                            <div class="flex-b">
                                <div class="detail-card-fonts">
                                    {{ item.depositCash }}<br>累计存款
                                </div>
                                <div class="detail-card-fonts">
                                    {{ item.betCash }}<br>流水要求
                                </div>
                                <div class="detail-card-fonts">
                                    {{ item.keepBetCash }}<br>保级流水(3个月)
                                </div>
							</div>
                            <!-- <div class="bottom-upgrade flex-c" v-if='index === levelNow && disableBtn === false' @click="subUpgrade()">立即升级</div>
                             <div class="bottom-upgrade bottom-upgrade2 flex-c" v-if='index === levelNow && disableBtn === true'>立即升级</div> -->
						</div>
					</div>
				</van-swipe-item>
			</van-swipe>
		</div>
		<div class="gray-area"></div>
		<div class="vip-own">
			<div class="vip-own-title">
				<img src="../../../static/images/vip-title-icon.png" alt="" class="title-icon">
				<div class="title-fonts" v-if="levelNow>0">&nbsp;VIP{{ levelActive }}尊享</div>
				<div class="title-fonts" v-if="levelNow==0">&nbsp;VIP{{ levelNow + 1 }}尊享</div>
			</div>
			<div class="vip-own-content">
				<div class="vip-own-list">
					<img src="../../../static/images/vip-own-icon1.png" alt="" class="left-icon">
					<div class="right-fonts">
						<div class="right-fonts1">{{ outNumsMax }}</div>
						<div class="right-fonts2">每日提款次数</div>
					</div>
				</div>
				<div class="vip-own-list">
					<img src="../../../static/images/vip-own-icon2.png" alt="" class="left-icon">
					<div class="right-fonts">
						<div class="right-fonts1">{{ outMoneyMax }}</div>
						<div class="right-fonts2">每日提款额度</div>
					</div>
				</div>
				<div class="vip-own-list">
					<img src="../../../static/images/vip-own-icon3.png" alt="" class="left-icon">
					<div class="right-fonts">
						<div class="right-fonts1">{{ promotionCash }}</div>
						<div class="right-fonts2">升级礼金</div>
					</div>
					<img src="../../../static/images/level-up-click.png" v-if="LevevUpClick" alt=""
					     class="level-up-click" @click="getLevelUpCash(1)">
					<img src="../../../static/images/level-up-click2.png" v-if="LevevUpNotClick" alt=""
					     class="level-up-click">
				</div>
				<div class="vip-own-list">
					<img src="../../../static/images/vip-own-icon4.png" alt="" class="left-icon">
					<div class="right-fonts">
						<div class="right-fonts1">{{ monthCash }}</div>
						<div class="right-fonts2">每月红包</div>
					</div>
					<img src="../../../static/images/level-up-click.png" v-if="monthCashClick" alt=""
					     class="level-up-click" @click="getLevelUpCash(2)">
					<img src="../../../static/images/level-up-click2.png" v-if="monthCashNotClick" alt=""
					     class="level-up-click">
				</div>
			</div>
		</div>
		
		<div class="gray-area"></div>
		<div class="vip-own">
			<div class="vip-own-title">
				<img src="../../../static/images/vip-title-icon.png" alt="" class="title-icon">
				<div class="title-fonts" v-if="levelNow>0">&nbsp;VIP{{ levelActive }}晋级优惠</div>
				<div class="title-fonts" v-if="levelNow==0">&nbsp;VIP{{ levelNow + 1 }}晋级优惠</div>
			</div>
			<div class="vip-own-content2">
				<div class="vip-own-list2">
					<div class="vip-own-list2-fonts1">{{ videoRebates }}%</div>
					<div class="vip-own-list2-fonts2">真人返水</div>
				</div>
				<div class="vip-own-list2">
					<div class="vip-own-list2-fonts1">{{ sportsRebates }}%</div>
					<div class="vip-own-list2-fonts2">体育返水</div>
				</div>
				<div class="vip-own-list2">
					<div class="vip-own-list2-fonts1">{{ esportRebates }}%</div>
					<div class="vip-own-list2-fonts2">电竞返水</div>
				</div>
			</div>
			<div class="vip-own-content2">
				<div class="vip-own-list2">
					<div class="vip-own-list2-fonts1">{{ fundRate }}%</div>
					<div class="vip-own-list2-fonts2">余额宝年利率</div>
				</div>
				<div class="vip-own-list2">
					<div class="vip-own-list2-fonts1">{{ hongbaoNumsMax }}</div>
					<div class="vip-own-list2-fonts2">每周红包次数</div>
				</div>
				<div class="vip-own-list2">
					<div class="vip-own-list2-fonts1">{{ birthdayCash }}</div>
					<div class="vip-own-list2-fonts2">生日礼金</div>
				</div>
			</div>
		</div>
<!--		<div class="prize-area">-->
<!--			<div class="prize-area-top-box">-->
<!--				<div class="prize-area-title">豪礼赠送</div>-->
<!--				&lt;!&ndash;                <div class="prize-area-status">VIP{{levelActive}}</div>&ndash;&gt;-->
<!--				<img :src="activeLevelModal" alt="" class="bottom-icon">-->
<!--			</div>-->
<!--			<div class="prize-area-detail">{{ levelPrizeDetail }}</div>-->
<!--		</div>-->
		<div class="to-vip-detail" @click="toVipDetail">
			<div class="to-vip-detail-fonts">查看VIP详情</div>
			<img src="../../../static/images/to-vip-detail-icon.png" alt="" class="to-vip-detail-icon">
		</div>
        <!--loading-new-->
		<div class="loading-new" v-if="showLoading"><img src="../../../static/images/allLoading.gif" alt=""></div>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top';
import {Toast} from 'vant';

export default {
	name: 'vipMember',
	components: {
		HeaderTop,
	},
	data() {
		return {
			userAvatar: require("../../../static/images/avatar-1.png"),
			userName: '',
			current: 0,
			tabChosing: 0,
			swipeActive: 0,
			levelIcon: '',
			levelModal: '',
			levelNow: 0,
			levelNext: 0,
			depositNow: 0,
			depositNeed: 0,
			nextBetCash: 0,
			nextKeepBetCash: 0,
			needKeepBetCash: 0,
			progressPercent: '',
			progressPercent2: '',
			keepDate: '',
			userDays: '',
			oldLevelData: [],
			allLevelData: [],
			outNumsMax: 0,
			outMoneyMax: 0,
			promotionCash: 0,
			monthCash: 0,
			videoRebates: 0,
			sportsRebates: 0,
			esportRebates: 0,
			fundRate: 0,
			hongbaoNumsMax: 0,
			birthdayCash: 0,
			needKeep: false,
			depositCash: 0,
			betCash: 0,
			keepBetCash: 0,
			levelPrizeDetail: '',
			levelHide: true,
			levelIndex: 0,
			swiperInit: 0,
			levelActive: 0,
			activeLevelModal: '',
			LevevUpClick: false,
			LevevUpNotClick: false,
			monthCashClick: false,
			monthCashNotClick: false,
			clickShow: false,
			levelUpShow: false,
			monthCashShow: false,
			cashGet: 0,
			groupId: '',
            showLoading:false,
            disableBtn:false,
		}
	},
	mounted() {
		this.userDays = sessionStorage.getItem('userDays');
        // this.$toastTop('2asdfasdfa222',3)
	},
	created() {
		this.getUserInfo();
		this.vipInfo();
		this.returnPercent();
		
	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
	watch: {
		tabChosing(val) {
			this.switchData(val);
		},
	},
	methods: {
        subUpgrade() {
            this.showLoading = true
            this.disableBtn = true
            this.ServerAPI.postAPI(this.API.vipUpgrade, '', (success, data) => {
                this.showLoading = false
                this.disableBtn = false
                if (success) {
                    if (data.code == '0000') {
                        this.$toastTop(data.info,1)
                        this.getUserInfo();
		                this.vipInfo();
                    } else {
                        this.$toastTop(data.info,3)
                    }
                } else {
                    Toast('网络超时，请稍后重试');
                }
            })
		},
		toUserInfo() {
			sessionStorage.removeItem('userDays')
			this.$router.push('/my');
		},
		toVipDetail() {
			this.$router.push('/VipDetail')
		},
		returnPercent() {
		},
		onChange(index) {
			// Toast('当前 Swipe 索引：' + index);
			this.tabChosing = index;
			var levelListBox = document.getElementById('levelList');
			if (this.allLevelData.length > 5) {
				if (index == 3) {
					levelListBox.style.marginLeft = '-1.3rem';
				} else if (index == 4) {
					levelListBox.style.marginLeft = '-2.8rem';
				} else if (index == 5) {
					levelListBox.style.marginLeft = '-4.3rem';
				} else if (index == 6) {
					levelListBox.style.marginLeft = '-5.8rem';
				} else if (index == 7) {
					levelListBox.style.marginLeft = '-7.3rem';
				} else if (index == 8 || index == 9 || index == 10) {
					levelListBox.style.marginLeft = '-7.5rem';
				} else if (index == 0 || index == 1 || index == 2) {
					levelListBox.style.marginLeft = '0rem';
				}
			}
		},
		switchData(value) {
			this.levelActive = this.allLevelData[value].level;
			this.activeLevelModal = '../../../static/images/vip-icon-' + this.levelActive + '.png';
			this.outNumsMax = this.allLevelData[value].outNumsMax;
			this.outMoneyMax = this.allLevelData[value].outMoneyMax;
			this.promotionCash = this.allLevelData[value].promotionCash;
			this.monthCash = this.allLevelData[value].monthCash;
			this.videoRebates = this.allLevelData[value].videoRebates;
			this.sportsRebates = this.allLevelData[value].sportsRebates;
			this.esportRebates = this.allLevelData[value].esportRebates;
			this.fundRate = this.allLevelData[value].fundRate;
			this.hongbaoNumsMax = this.allLevelData[value].hongbaoNumsMax;
			this.birthdayCash = this.allLevelData[value].birthdayCash;
			this.levelPrizeDetail = this.allLevelData[value].gift;
			this.groupId = this.allLevelData[value].groupId;
			if (this.allLevelData[value].promotionStatus == 0) {
				this.LevevUpClick = true;
				this.LevevUpNotClick = false;
			} else if (this.allLevelData[value].promotionStatus == 1) {
				this.LevevUpNotClick = true;
				this.LevevUpClick = false;
			} else if (this.allLevelData[value].promotionStatus == -1) {
				this.LevevUpNotClick = false;
				this.LevevUpClick = false;
			}
			;
			if (this.allLevelData[value].monthStatus == 0) {
				this.monthCashClick = true;
				this.monthCashNotClick = false;
			} else if (this.allLevelData[value].monthStatus == 1) {
				this.monthCashNotClick = true;
				this.monthCashClick = false;
			} else if (this.allLevelData[value].monthStatus == -1) {
				this.monthCashNotClick = false;
				this.monthCashClick = false;
			}
			;
		},
		switchChosing(value) {
			if (value != this.tabChosing) {
				this.levelActive = this.allLevelData[value].level;
				this.activeLevelModal = '../../../static/images/vip-icon-' + this.levelActive + '.png';
				this.outNumsMax = this.allLevelData[value].outNumsMax;
				this.outMoneyMax = this.allLevelData[value].outMoneyMax;
				this.promotionCash = this.allLevelData[value].promotionCash;
				this.monthCash = this.allLevelData[value].monthCash;
				this.groupId = this.allLevelData[value].groupId;
				if (this.allLevelData[value].promotionStatus == 0) {
					this.LevevUpClick = true;
					this.LevevUpNotClick = false;
				} else if (this.allLevelData[value].promotionStatus == 1) {
					this.LevevUpNotClick = true;
					this.LevevUpClick = false;
				} else if (this.allLevelData[value].promotionStatus == -1) {
					this.LevevUpNotClick = false;
					this.LevevUpClick = false;
				}
				;
				if (this.allLevelData[value].monthStatus == 0) {
					this.monthCashClick = true;
					this.monthCashNotClick = false;
				} else if (this.allLevelData[value].monthStatus == 1) {
					this.monthCashNotClick = true;
					this.monthCashClick = false;
				} else if (this.allLevelData[value].monthStatus == -1) {
					this.monthCashNotClick = false;
					this.monthCashClick = false;
				}
				;
				this.videoRebates = this.allLevelData[value].videoRebates;
				this.sportsRebates = this.allLevelData[value].sportsRebates;
				this.esportRebates = this.allLevelData[value].esportRebates;
				this.fundRate = this.allLevelData[value].fundRate;
				this.hongbaoNumsMax = this.allLevelData[value].hongbaoNumsMax;
				this.birthdayCash = this.allLevelData[value].birthdayCash;
				this.levelPrizeDetail = this.allLevelData[value].gift;
				if (value > 0) {
					this.tabChosing = value - 1;
				} else if (value == 0) {
					this.tabChosing = value;
				}
				;
				this.$refs.swiper.swipeTo(value);
				
			}
		},
		getLevelUpCash(value) {
			this.LevevUpClick = false;
			let params = {
				groupId: this.groupId
			}
			if (value == 1) {
				this.ServerAPI.postAPI(this.API.vipCashGet, params, (success, data) => {
					if (success) {
						if (data.code == '0000') {
							this.clickShow = true;
							this.levelUpShow = true;
							this.monthCashShow = false;
							this.cashGet = data.data;
						} else {
							Toast(data.info);
						}
					} else {
						Toast('网络超时，请稍后重试');
					}
					this.vipInfo();
				})
			} else if (value == 2) {
				this.ServerAPI.postAPI(this.API.vipMonthGet, '', (success, data) => {
					if (success) {
						if (data.code == '0000') {
							this.clickShow = true;
							this.levelUpShow = false;
							this.monthCashShow = true;
							this.cashGet = data.data;
						} else {
							Toast(data.info);
						}
					} else {
						Toast('网络超时，请稍后重试');
					}
					this.vipInfo();
				})
			}
		},
		getUserInfo() {
			let params = {
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.userInfo, params, (success, data) => {
				if (success) {
					if (data.code == '0000') {
						this.userName = data.data.loginName;
						this.depositNow = data.data.cash;
                        if(!!localStorage.getItem('avatar') === true){
                            this.userAvatar = '../../../static/images/avatar-' + localStorage.getItem('avatar') + '.png'
                        }
						// if (data.data.avatarAddress != undefined) {
						// }
					}
				}
			})
		},
		vipInfo() {
			let params = {
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.vipInfo, params, (success, data) => {
				if (success) {
					if (data.code == '0000') {
						this.levelNow = data.data.level;
						this.levelActive = data.data.level;
						this.activeLevelModal = '../../../static/images/vip-icon-' + this.levelActive + '.png';
                        if(data.data.level !== 0){
                            this.needKeep = true
                        }
						this.depositCash = data.data.depositCash;
						this.betCash = data.data.betCash;
						this.keepBetCash = data.data.keepBetCash;
						this.levelNext = data.data.nextLevel;
						this.oldLevelData = data.data.levelList;
						this.levelHide = data.data.levelList[0].showLevel;
						if (this.levelHide == false) {
							this.oldLevelData.splice(0, 1);
							this.allLevelData = this.oldLevelData;
							if (this.levelNow == 0) {
								this.levelIndex = this.swiperInit = 0;
								this.tabChosing = 0;
							} else {
								this.tabChosing = this.swiperInit = this.levelIndex = this.levelNow - 1;
							}
						} else {
							this.tabChosing = this.levelIndex = this.swiperInit = this.levelNow;
							this.allLevelData = data.data.levelList;
						}
						this.groupId = this.allLevelData[this.levelIndex].groupId;
						this.outNumsMax = this.allLevelData[this.levelIndex].outNumsMax;
						this.outMoneyMax = this.allLevelData[this.levelIndex].outMoneyMax;
						this.promotionCash = this.allLevelData[this.levelIndex].promotionCash;
						this.monthCash = this.allLevelData[this.levelIndex].monthCash;
						this.videoRebates = this.allLevelData[this.levelIndex].videoRebates;
						this.sportsRebates = this.allLevelData[this.levelIndex].sportsRebates;
						this.esportRebates = this.allLevelData[this.levelIndex].esportRebates;
						this.fundRate = this.allLevelData[this.levelIndex].fundRate;
						this.hongbaoNumsMax = this.allLevelData[this.levelIndex].hongbaoNumsMax;
						this.birthdayCash = this.allLevelData[this.levelIndex].birthdayCash;
						this.levelPrizeDetail = this.allLevelData[this.levelIndex].gift;
						if (this.allLevelData[this.levelIndex].promotionStatus === 0) {
							this.LevevUpClick = true;
							this.LevevUpNotClick = false;
						} else if (this.allLevelData[this.levelIndex].promotionStatus === 1) {
							this.LevevUpNotClick = true;
							this.LevevUpClick = false;
						} else if (this.allLevelData[this.levelIndex].promotionStatus === -1) {
							this.LevevUpNotClick = false;
							this.LevevUpClick = false;
						}
						if (this.allLevelData[this.levelIndex].monthStatus == 0) {
							this.monthCashClick = true;
							this.monthCashNotClick = false;
						} else if (this.allLevelData[this.levelIndex].monthStatus == 1) {
							this.monthCashNotClick = true;
							this.monthCashClick = false;
						} else if (this.allLevelData[this.levelIndex].monthStatus == -1) {
							this.monthCashNotClick = false;
							this.monthCashClick = false;
						}
						this.onChange(this.tabChosing);
						this.$refs.swiper.swipeTo(this.tabChosing);
						this.progressPercent = data.data.schedule;
						this.progressPercent2 = data.data.keepSchedule;
						this.keepDate = data.data.keepDate.substring(0,11);
						this.percentHandle();
						this.depositNeed = data.data.nextDepositCash.substring(0,data.data.nextDepositCash.length - 3);
						this.nextBetCash = data.data.nextBetCash.substring(0,data.data.nextBetCash.length - 3);
						this.needKeepBetCash = data.data.needKeepBetCash.substring(0,data.data.needKeepBetCash.length - 3);
						this.levelModal = '../../../static/images/vip-icon-' + this.levelNow + '.png';
					}
				}
			})
		},
		percentHandle() {
			var iconPosition = document.getElementById('progressIcon');
			var fontsPosition = document.getElementById('progressFonts');
			iconPosition.style.left = this.progressPercent + '%';
			fontsPosition.style.left = this.progressPercent + '%';
		}
	}
}
</script>

<style lang="scss" scoped>
.title-bg {
	background: url("../../../static/images/vip-title-bg.png") no-repeat;
	background-size: 100% 100%;
	padding-bottom: .56rem;
    position: relative;
    border-radius: 0 0 .2rem .2rem;
    overflow: hidden;
    .bottom-upgrade {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.46rem;
        color: #FFFFFF;
        background: #D7B495;
        font-size: .24rem;
    }
    .bottom-upgrade2 {
        color: #D0D0D0;
    }
}

.reg-head {
	width: 100%;
	height: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: bold;
	color: #FFFFFF;
	
	.go-back {
		width: .18rem;
		height: .32rem;
		background: url("../../../static/images/back-icon-white.png") no-repeat;
		background-size: 100% 100%;
		margin-left: .2rem;
	}
	
	.head-title {
		font-size: .3rem;
	}
	
	.to-vipDetail {
		margin-right: .2rem;
	}
}

.vipMember-content {
	.user-info-content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: .3rem;
		position: relative;
		
		.user-info-content-left {
			display: flex;
			align-items: center;
			
			.avatar-img {
				height: 1.2rem;
			}
			
			.user-name {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin: 0 .25rem;
				color: #FFFFFF;
				font-weight: bold;
				font-size: .28rem;
				
				.user-name-fonts2 {
					font-size: .22rem;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(14, 56, 104, 1);
					
					.white-fonts {
						color: #FFFFFF;
					}
				}
			}
			
			.vip-level-icon {
				height: .3rem;
			}
		}
		
		.user-info-content-right {
			width: 1.3rem;
            margin-top: .1rem;
		}
	}
	
	.progress-box {
		margin-top: .5rem;
		padding: 0 .3rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-weight: bold;
		
		.progress-box-left {
			width: .8rem;
			background: #00479D;
			text-align: center;
			color: #FFFFFF;
			font-size: .2rem;
			border-radius: .3rem;
		}
		.progress-box-left2 {
            width: 1.2rem;
        }
		.progress-content-box {
			width: 70%;
			position: relative;
			
			.progress-icon {
				position: absolute;
				top: 50%;
				width: .56rem;
				height: .36rem;
				margin-top: -.18rem;
				margin-left: -.28rem;
			}
			
			.percent-fonts-box {
				position: absolute;
				top: -.55rem;
				width: 1rem;
				font-size: .2rem;
				color: #00479D;
				text-align: center;
				margin-left: -.45rem;
				
				.percent-fonts-box-icon {
					width: .23rem;
					margin-top: -.3rem;
				}
			}
			
		}
		.progress-content-box2 {
            width: calc(100% - 1.4rem);
        }
		.progress-box-right {
			background: #FFFFFF;
			color: #787878;
		}
	}
	.progress-box2 {
        margin-top: .7rem;
    }
	.money-status {
		margin-top: .4rem;
		padding: 0 .1rem;
		
		.money-status-list {
			display: flex;
			align-items: center;
			margin-left: .25rem;
			.point {
				width: .1rem;
				height: .1rem;
				border-radius: 50%;
				background: #FFFFFF;
			}
			
			.fonts {
				color: rgba(255, 255, 255, .7);
				font-size: .22rem;
				
				.black-fonts {
					font-size: .28rem;
					color: #FFFFFF;
					font-weight: bold;
				}
			}
		}
		
		/*.money-status-list:last-child {*/
		/*  margin-top: .1rem;*/
		/*}*/
	}
}

.switch-level {
	padding: 0 .3rem;
	overflow: hidden;
	/*overflow-x: scroll;*/
	margin-top: .5rem;
	
	.switch-level-list-box {
		width: 18rem;
		display: flex;
		align-items: center;
		font-weight: bold;
		transition: all .5s;
		
		.switch-level-list-box2 {
			display: flex;
			align-items: center;
		}
		
		.switch-level-list-box2:last-child .middle-line {
			display: none;
		}
		
		.switch-level-list {
			background: #D3D5E0;
			border: #BEC4CD 1px solid;
			font-size: .2rem;
			padding: .03rem .13rem;
			border-radius: .18rem;
			color: #737A92;
		}
		
		.switch-level-list-chosing {
			background: #737A92;
			padding: 0rem .1rem;
			border: #D3D5E0 3px solid;
			color: #FFFFFF;
		}
		
		.middle-line {
			width: .8rem;
			height: 2px;
			background: #E7E4E0;
		}
	}
}

.swipe-content {
	margin-top: .6rem;
	padding-bottom: .6rem;
	
	.vip-detail-card0 {
		background: url("../../../static/images/vip-swipe-0.png") no-repeat;
	}
	
	.vip-detail-card1 {
		background: url("../../../static/images/vip-swipe-1.png") no-repeat;
	}
	
	.vip-detail-card2 {
		background: url("../../../static/images/vip-swipe-2.png") no-repeat;
	}
	
	.vip-detail-card3 {
		background: url("../../../static/images/vip-swipe-3.png") no-repeat;
	}
	
	.vip-detail-card4 {
		background: url("../../../static/images/vip-swipe-4.png") no-repeat;
	}
	
	.vip-detail-card5 {
		background: url("../../../static/images/vip-swipe-5.png") no-repeat;
	}
	
	.vip-detail-card6 {
		background: url("../../../static/images/vip-swipe-6.png") no-repeat;
	}
	
	.vip-detail-card7 {
		background: url("../../../static/images/vip-swipe-7.png") no-repeat;
	}
	
	.vip-detail-card8 {
		background: url("../../../static/images/vip-swipe-8.png") no-repeat;
	}
	
	.vip-detail-card9 {
		background: url("../../../static/images/vip-swipe-9.png") no-repeat;
	}
	
	.vip-detail-card10 {
		background: url("../../../static/images/vip-swipe-10.png") no-repeat;
	}
	
	#blueCard0 {
		background: url("../../../static/images/vip-swipe-0-2.png") no-repeat;
	}
	
	#blueCard1 {
		background: url("../../../static/images/vip-swipe-1-2.png") no-repeat;
	}
	
	#blueCard2 {
		background: url("../../../static/images/vip-swipe-2-2.png") no-repeat;
	}
	
	#blueCard3 {
		background: url("../../../static/images/vip-swipe-3-2.png") no-repeat;
	}
	
	#blueCard4 {
		background: url("../../../static/images/vip-swipe-4-2.png") no-repeat;
	}
	
	#blueCard5 {
		background: url("../../../static/images/vip-swipe-5-2.png") no-repeat;
	}
	
	#blueCard6 {
		background: url("../../../static/images/vip-swipe-6-2.png") no-repeat;
	}
	
	#blueCard7 {
		background: url("../../../static/images/vip-swipe-7-2.png") no-repeat;
	}
	
	#blueCard8 {
		background: url("../../../static/images/vip-swipe-8-2.png") no-repeat;
	}
	
	#blueCard9 {
		background: url("../../../static/images/vip-swipe-9-2.png") no-repeat;
	}
	
	#blueCard10 {
		background: url("../../../static/images/vip-swipe-10-2.png") no-repeat;
	}
	
	.vip-detail-card {
		width: 90%;
		margin: 0 auto;
		height: 2.85rem;
		border-radius: .2rem;
		padding: .2rem .3rem;
		position: relative;
		background-size: 100% 100% !important;
        overflow: hidden;
		.detail-card-bottom {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            .flex-b {
                width: 100%;
                color: #FFFFFF;
                font-size: .2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                // margin-top: 1.6rem;
                text-align: center;
                font-weight: bold;
                margin-bottom: .1rem;
                .detail-card-fonts {
                    width: 33.3%;
                }
            }
		}
	}
}

.gray-area {
	height: .25rem;
	background: #E2E2E2;
}

.vip-own {
	padding: .3rem;
	
	.vip-own-title {
		display: flex;
		align-items: center;
		
		.title-icon {
			height: .45rem;
		}
		
		.title-fonts {
			font-size: .32rem;
			font-weight: bold;
			color: #414655;
		}
	}
	
	.vip-own-content {
		display: flex;
		flex-wrap: wrap;
		
		.vip-own-list {
			width: 50%;
			display: flex;
			align-items: center;
			margin-top: .2rem;
			
			.left-icon {
				height: .6rem;
			}
			
			.right-fonts {
				font-weight: bold;
				margin-top: -.05rem;
				margin-left: .1rem;
				
				.right-fonts1 {
					font-size: .3rem;
					color: #484C5B;
				}
				
				.right-fonts2 {
					font-size: .2rem;
					color: #AEAEAE;
					font-weight: normal;
				}
			}
			
			.level-up-click {
				width: .5rem;
				margin-left: .15rem;
			}
		}
		
	}
	
	.vip-own-content2 {
		width: 80%;
		margin: .2rem auto 0;
		display: flex;
		justify-content: space-between;
		text-align: center;
		font-weight: bold;
		
		.vip-own-list2 {
			width: 33%;
			
			.vip-own-list2-fonts1 {
				color: #6586AD;
				font-size: .35rem;
			}
			
			.vip-own-list2-fonts2 {
				color: #AEAEAE;
				font-size: .22rem;
				font-weight: normal;
			}
		}
	}
}

.prize-area {
	width: 88%;
	margin: .6rem auto 0;
	background: #028AFE;
	border-radius: .15rem;
	padding: .25rem 0;
	
	.prize-area-top-box {
		width: 90%;
		margin: 0 auto;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.prize-area-title {
			color: rgba(255, 255, 255, .8);
			font-size: .32rem;
		}
		
		.prize-area-status {
			background: #7BD6FF;
			padding: 0 .2rem;
			height: .6rem;
			line-height: .6rem;
			color: #FFFFFF;
			font-size: .3rem;
			border-radius: .08rem;
		}
		
		.bottom-icon {
			height: .6rem;
		}
	}
	
	.prize-area-detail {
		margin-top: .4rem;
		padding: 0 .28rem;
		color: rgba(255, 255, 255, .8);
		font-weight: bold;
		font-size: .26rem;
	}
}

.to-vip-detail {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: .2rem;
	padding-bottom: .3rem;
	
	.to-vip-detail-fonts {
		color: #656565;
		font-weight: bold;
		font-size: .3rem;
	}
	
	.to-vip-detail-icon {
		height: .32rem;
		margin-left: .1rem;
	}
}

.switch-level::-webkit-scrollbar {
	display: none
}

.click-show {
	background: none;
	width: 5.8rem;
	height: 5.3rem;
	font-family: PingFang SC;
	
	.white-part {
		position: absolute;
		z-index: 2;
		background: #FFFFFF;
		width: 5rem;
		height: 4rem;
		left: .4rem;
		padding: .2rem .3rem;
		border-radius: .15rem;
		
		.white-part-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			.white-part-title-left {
				.white-part-title-left-fonts1 {
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
					font-size: .32rem;
				}
				
				.white-part-title-left-fonts2 {
					font-weight: 500;
					color: rgba(115, 115, 115, 1);
					font-size: .26rem;
				}
			}
			
			.white-part-title-right {
				width: .8rem;
			}
		}
		
		.gray-line {
			height: 2px;
			background-image: linear-gradient(to right, #FFFFFF, #B5B5B5, #FFFFFF);
			margin-top: .4rem;
		}
		
		.white-part-cash {
			margin-top: .3rem;
			
			.white-part-cash-fonts1 {
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				
				.blue-fonts {
					font-weight: bold;
					color: rgba(2, 138, 254, 1);
					font-size: .32rem;
				}
			}
			
			.white-part-cash-fonts2 {
				margin-top: .1rem;
				color: rgba(167, 167, 167, 1);
				font-size: .24rem;
			}
		}
	}
	
	.dark-blue-part {
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 3rem;
		bottom: 0;
		border-radius: .15rem;
		background: #003E90;
	}
	
	.light-blue-part {
		position: absolute;
		z-index: 3;
		width: 100%;
		height: 2.5rem;
		bottom: 0;
		border-radius: .15rem;
		background: url("../../../static/images/vip-light-blue-bg.png") no-repeat;
		background-size: 100% 100%;
		text-align: center;
		
		.light-blue-part-icon {
			width: .8rem;
			margin-top: .65rem;
		}
		
		.light-blue-part-fonts {
			color: #FFFFFF;
			font-size: .38rem;
			margin-top: .15rem;
		}
	}
}
</style>
