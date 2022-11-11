<template>
	<div class="my">
		<div class="top-area">
			<van-popup class="img-box" v-model="choseList" overlay-class="avatar-mask" position="top">
				<div class="imgShow">
					<img :src="'../../../static/images/avatar-' + item + '.png'" :class="switchAvatarIndex === index?'avatar-activing':''" alt="" v-for="(item,index) in avatarArr" :key="index" @click="switchImg(index)">
				</div>
                <div class="page-btn-box flex-c">
                    <div class="page-btn flex-c" :class="avatarPage === 1?'page-btn-activing':''" @click="changeAvatarPage(1)">1</div>
                    <div class="page-btn flex-c" :class="avatarPage === 2?'page-btn-activing':''" @click="changeAvatarPage(2)">2</div>
                </div>
			</van-popup>
			<div class="base-info">
				<div class="base-info-left">
					<div class="switch-img" @click="showChosing">
						<img class="head-icon" :src="imgUrl" alt="">
					</div>
					<div class="base-info-2">
						<p>{{ loginName }}</p>
						<p @click='toPush(18)'>
							<span>已加入大家庭</span>
							<span>{{ iDays }}</span>
							<span>天</span>
						</p>
					</div>
				</div>
				<div class="base-info-3" @click="toVip">
					<span>{{vipLev}}</span>
					<img src="../../../static/images/back-icon-white.png" alt="" class="vip-arrow">
				</div>
			</div>
			<div class="money-info">
				<div class="money-info-left">
					<div class="balance-info" @click="reloadBalances">
						<p v-if="balanceLoadin === false">{{ money }}</p>
						<p v-if="balanceLoadin === true"><img class="loading-icon" src="../../../static/images/33.gif" alt=""></p>
						<p>中心钱包</p>
					</div>
					<div class="balance-info" @click="toPush(14)">
						<p>{{ interestCash }}</p>
						<p>利息钱包</p>
					</div>
				</div>
				<div class="money-info-left money-info-right">
					<div class="balance-info" @click="toPush(16)">
						<p>{{ lockCash }}</p>
						<p>锁定钱包</p>
					</div>
					<div class="balance-info balance-info2" @click="toPush(15)">
						<div class="small-fonts">
							<span>查看详情</span>
							<img src="../../../static/images/back-icon.png" alt="" class="gray-arrow">
						</div>
						<p>游戏钱包</p>
					</div>
				</div>
			</div>
			<div class="money-operation">
				<div class="" @click="toPush(10)">
					<img src="../../../static/images/index-recharge-new.png" alt="">
					<p>充值</p>
				</div>
				<div class="" @click="toPush(11)">
					<img src="../../../static/images/index-withdraw-new.png" alt="">
					<p>提现</p>
				</div>
				<div class="" @click="toPush(12)">
					<img src="../../../static/images/index-transfer-new.png" alt="">
					<p>转账</p>
				</div>
				<div class="" @click="toPush(13)">
					<img src="../../../static/images/index-discount-new.png" alt="">
					<p>优惠</p>
				</div>
				<div class="" @click="toPush(14)">
					<img src="../../../static/images/index-interest-new.png" alt="">
					<p>余额宝</p>
				</div>
			</div>
		</div>
		<div class="gray-line"></div>
		<div class="middle-area">
            <!--优惠图片轮播图-->
			<van-swipe class="help-imgs my-swipe" :autoplay="5000" @change="swiperChange" :show-indicators="false">
				<van-swipe-item class="van-swipe-item" v-for="(item,index) in bannerImg" :key="index" @click.native="discountDetial(item.openValue,item.openType,item.title)">
					<img v-lazy="item.image" alt="">
				</van-swipe-item>
			</van-swipe>
			<!--优惠图片轮播图指示器插槽-->
			<template #="indicator">
				<div class="custom-indicator-box">
					<div class="custom-indicator" :class="k === indicatorsIndex ? 'custom-indicator-acitve':''"
					     v-for="(v,k) in indicatorsArr" :key="k"></div>
				</div>
			</template>
			<div class="middle-area-list1">
				<div class="column-box" @click="toPush(1)">
					<img src="../../../static/images/grzl-new.png" alt="">
					<p>个人资料</p>
				</div>
				<div class="column-box" @click="toPush(2)">
					<img src="../../../static/images/jyjl-new.png" alt="">
					<p>交易记录</p>
				</div>
				<div class="column-box" @click="toPush(3)">
					<img src="../../../static/images/tzjl-new.png" alt="">
					<p>投注记录</p>
				</div>
			</div>
			<div class="middle-area-list1">
				<div class="column-box" @click="toPush(4)">
					<img src="../../../static/images/yhk-new.png" alt="">
					<p>安全中心</p>
				</div>
				<div class="column-box" @click="toPush(5)">
					<img src="../../../static/images/hyzz-new.png" alt="">
					<p>会员互转</p>
				</div>
				<div class="column-box" @click="toPush(6)">
					<img src="../../../static/images/xsjc-new.png" alt="">
					<p>新手教程</p>
				</div>
			</div>
			<div class="middle-area-list1">
				<div class="column-box" @click="toPush(7);toTab2()">
					<img src="../../../static/images/xx-new.png" alt="">
					<p>我的消息</p>
                    <div class="unread-point" v-if='hasUnread'></div>
				</div>
				<div class="column-box" @click="toPush(8)">
					<img src="../../../static/images/jrhy-new.png" alt="">
					<p>加入合营</p>
				</div>
				<div class="column-box" @click="toPush(9)">
					<img src="../../../static/images/appxz-new.png" alt="">
					<p>APP下载</p>
				</div>
			</div>
		</div>
        <van-popup v-model="withdrawPop">
            <div class="confirm-sub-box">
                <div class="confirm-sub-line confirm-sub-line-yellow"></div>
                <div class="confirm-sub-title">
                    <img src="../../../static/images/alert-icon.png" alt="" class="confirm-sub-title-left">
                    提现尚未完成
                </div>
                <div class="confirm-sub-content bold">
                    <div class="confirm-sub-content-list flex-b">
                        <div class="confirm-sub-content-list-left">时间：</div>
                        <div class="confirm-sub-content-list-right">{{withdrawPopTime}}</div>
                    </div>
                    <div class="confirm-sub-content-list flex-b">
                        <div class="confirm-sub-content-list-left">提现金额：</div>
                        <div class="confirm-sub-content-list-right confirm-sub-content-list-blue">{{withdrawPopCash}}</div>
                    </div>
                    <div class="confirm-sub-content-list flex-b">
                        <div class="confirm-sub-content-list-left">提现方式：</div>
                        <div class="confirm-sub-content-list-right">极速提现</div>
                    </div>
                    <div class="confirm-sub-content-list flex-b">
                        <div class="confirm-sub-content-list-left">提现状态：</div>
                        <div class="confirm-sub-content-list-right">尚未确认是否到账</div>
                    </div>
                </div>
                <div class="confirm-sub-bottom">
                    <div class="confirm-sub-btn confirm-sub-btn2" @click='toWithdrawPage()'>前往处理 ></div>
                </div>
            </div>
        </van-popup>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top';
import {Toast} from "vant";
import {mapState} from 'vuex';
export default {
	name: 'my',
	components: {
		HeaderTop,
	},
	data() {
		return {
			balanceLoadin:false,
			interestCash: '',
			lockCash: '',
			loginName: "",
			iDays: 0,
			level: 0,
			vipLev:'',
			money: 0,
			vipIcon: "",
			choseList: false,
			imgUrl: "../../../static/images/avatar-1.png",
			imgId:'',
			imgArr: [],
			bannerImg: [],
            indicatorsArr: [],
            indicatorsIndex: 0,
            switchAvatarIndex:-1,
            avatarArr:[],
            avatarPage:1,
            withdrawPop:false,
            withdrawPopTime:'',
            withdrawPopCash:0,
            quickTimer:null,
		}
	},
	mounted() {
        this.$Lazyload.options.loading = 'static/images/user-center-lazy.jpg'
        this.$Lazyload.options.error = 'static/images/user-center-lazy.jpg'
		this.handleLoginMark();
	},
	beforeRouteLeave(to, from, next) {   
		this.$destroy(true)
		next()
	},
    computed: 
        mapState({
            navigator: state => state.common.navigator,
            tarbarIndex: state => state.common.tarbarIndex,
            hasUnread: state => state.common.unread,
        }),
	methods: {
        checkWithdraw(){
            let status = sessionStorage.getItem('showWithdraw')
            if(status === '1'){
                let params = {
                    version: this.API.paramVersion,
                }
                this.ServerAPI.postAPI(this.API.withdrawLogin, params, (success,data) => {
                    if (success) {
                        sessionStorage.setItem('showWithdraw','0')
                        if (data.code == '0000') {
                            this.withdrawPop = true
                            this.withdrawPopTime = data.data.depositTime.slice(0,10)
                            this.withdrawPopCash = data.data.cash
                        }
                    }
                })
            }
        },
        toWithdrawPage(){
            sessionStorage.setItem('initIndex','quick')
            this.$router.push('/extract')
        },
        handleLoginMark(){
            if(sessionStorage.getItem('loginMark') === '1'){
                sessionStorage.setItem('loginMark','0')
                location.reload()
            }else{
                this.loadTop();
		        this.checkWithdraw();
            }
        },
        toEuroCup(){
            this.$router.push('/inviteFriends')
        },
		toVip() {
			sessionStorage.setItem('userDays', this.iDays)
			this.$router.push('/vipMember');
		},
		loadTop() {
			this.balanceLoadin = true
			let params = {
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.userInfo, params, this.userInfo)
			this.getAvatar()
			this.getBanner()
		},
        getBanner(){
            let params = {
                visitType:'APP',
                showType:'MY',
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.bannerList, params, (success,data)=>{
                if(success){
                    if(data.code === '0000'){
                        this.bannerImg = data.data;
                        let imgsLength = this.bannerImg.length
                        for (let i = 0; i < imgsLength; i++) {
                            this.indicatorsArr.push(1)
                        }
                    }
                }
            })
        },
		getAvatar(value){
            this.avatarArr = []
            if(value === 1){
                for(let i=0;i < 20;i ++){
                    this.avatarArr.push(i + 1)
                }
            }else if(value === 2){
                for(let i=0;i < 17;i ++){
                    this.avatarArr.push(i + 21)
                }
            }
		},
		changeAvatarPage(value){
            if(this.avatarPage !== value){
                this.avatarPage = value
                this.getAvatar(value)
            }
		},
		userInfo(success, data) {
			if (success) {
				if (data.code == '0000') {
					this.balanceLoadin = false
					this.loginName = data.data.loginName;
					this.createTime = data.data.createTime;
					this.interestCash = data.data.fundMoney;
					this.lockCash = data.data.extendMoney;
					this.level = data.data.level;
					this.vipLev = data.data.groupName
					// if(data.data.avatarAddress !== null){
					// 	this.imgUrl = data.data.avatarAddress
					// }
                    sessionStorage.setItem('userName',data.data.loginName)
                    sessionStorage.setItem('cashPwd',data.data.haveCashPass)
					sessionStorage.setItem('userLev', this.level)
					sessionStorage.setItem('from', 'my');
					this.money = data.data.money;
					this.dateDiff();
					this.levelImg();
                    if(!!localStorage.getItem('avatar') === true){
                        this.imgUrl = '../../../static/images/avatar-' + localStorage.getItem('avatar') + '.png'
                    }
				}else if(data.code === '9000') {
                    this.$toastTop(data.info,3)
        		    this.$router.replace('/login');
                }
			}else{
                this.$toastTop('似乎已断开与互联网的连接',2)
            }
		},
		reloadBalances() {
			this.loadTop();
		},
		levelImg() {
			if (this.level == 0) {
				this.vipIcon = '../../../static/images/vip-icon-0.png';
			} else if (this.level == 1) {
				this.vipIcon = '../../../static/images/vip-icon-1.png';
			} else if (this.level == 2) {
				this.vipIcon = '../../../static/images/vip-icon-2.png';
			} else if (this.level == 3) {
				this.vipIcon = '../../../static/images/vip-icon-3.png';
			} else if (this.level == 4) {
				this.vipIcon = '../../../static/images/vip-icon-4.png';
			} else if (this.level == 5) {
				this.vipIcon = '../../../static/images/vip-icon-5.png';
			} else if (this.level == 6) {
				this.vipIcon = '../../../static/images/vip-icon-6.png';
			} else if (this.level == 7) {
				this.vipIcon = '../../../static/images/vip-icon-7.png';
			} else if (this.level == 8) {
				this.vipIcon = '../../../static/images/vip-icon-8.png';
			} else if (this.level == 9) {
				this.vipIcon = '../../../static/images/vip-icon-9.png';
			} else if (this.level == 10) {
				this.vipIcon = '../../../static/images/vip-icon-10.png';
			}
		},
		dateDiff: function (sDate1) {
			var sDate1 = this.createTime;
			var date2 = new Date();
			var date1 = new Date(Date.parse(sDate1.replace(/-/g, "/")));
			var iDays = parseInt(Math.abs(date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24);
			this.iDays = iDays;
			return iDays;
		},
		toPush(id) {
			switch (id) {
				case 1:
					this.$router.push("/userInfo")
					break;
				case 2:
					this.$router.push("/tradeRecords")
					break;
				case 3:
					this.$router.push("/bettingRecord")
					break;
				case 4:
					this.$router.push("/safeCenter")
					break;
				case 5:
					this.$router.push("/membertransfer")
					break;
				case 6:
					this.$router.push("/newerHelp")
					break;
				case 7:
					this.$router.push("/notice/:tabNum")
					break;
				case 8:
					this.$router.push("/joinHY")
					break;
				case 9:
					this.$router.push("/appDownload")
					break;
				case 10:
					// this.$router.push("/pay")
					this.$router.push("/pay_index")
					break;
				case 11:
					this.$router.push("/extract")
					break;
				case 12:
					this.$router.push("/transferAccounts")
					break;
				case 13:
					this.$router.push("/discountActive")
					break;
				case 14:
					this.$router.push("/interestDetail")
					break;
				case 15:
					this.$router.push("/gameBalance")
					break;
				case 16:
					// sessionStorage.setItem('extend', '1')
					this.$router.push("/tradeRecords")
					break;
                case 17:
                    this.$router.push("/inviteFriends")
                    break;

                // case 18:
                //     this.$router.push("/calendarPrize")
                //     break;

			}
		},
		toTab2() {
			this.$router.push({name: 'notice', params: {tabNum: 1}})
		},
		toNotice() {
			this.$router.push('/notice')
		},
		showChosing() {
			this.choseList = true
            this.avatarPage = 1
            this.switchAvatarIndex = -1
            this.getAvatar(1)
		},
		switchImg(index) {
            if(this.avatarPage === 1){
                this.imgUrl = '../../../static/images/avatar-' + (index + 1) + '.png'
                localStorage.setItem('avatar',index + 1)
            }else if(this.avatarPage === 2){
                this.imgUrl = '../../../static/images/avatar-' + (index + 17) + '.png'
                localStorage.setItem('avatar',index + 17)
            }
            this.switchAvatarIndex = index
		},
        //轮播图指示器切换
		swiperChange(index) {
			this.indicatorsIndex = index
		},
        discountDetial(value,type,gameName){
             if(type === 'discount' ){
                if(type === 'discount170'){
                    this.$router.push('/EuroCup')
                }else if(value === '226'){
                    this.$router.push('/inviteFriends')
                }else if(id === '218'){
                    this.$router.push('/worldCup')
                }else if(value === '24'){
                    this.$router.push('/discountDetail24')
                }else if(value === '130'){
                    this.$router.push('/discountDetail130')
                }else{
                    if(value !== null){
                        this.$router.push({name: 'discountOne', params: {id: value}});
                    }
                }
            }else if(type === 'game'){
                sessionStorage.setItem('gameName',gameName)
                this.getGameData(parseInt(value))
            }else if(type === 'hongbao'){
                this.$store.commit('TARBAR',3)
            }
        },
        getGameData(gameId) {
            let params = {
				visitType: 'APP',
				version: this.API.paramVersion,
                visitSource:'h5'
			}
            this.ServerAPI.postAPI(this.API.homeList, params, (success,data) => {
                if(success) {
                    if(data.code == '0000') {
                        this.gameColumns = data.data;
                        let tempData = this.gameColumns.find(item => item.childList.find( ele => ele.gameId === (parseInt(gameId))))
                        this.$store.commit('TARBAR',2)
                        setTimeout(()=>{
                            this.toGame(tempData.homeId,parseInt(gameId))
                        },500)
                    }else{
                        this.$toastTop(data.info,3)
                    }
                }else{
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
            })
        },
        toGame(homeId,gameId) {
		    sessionStorage.setItem('gameId',gameId)
			this.gameColumns.forEach((item) => {
				// 先匹配游戏类别homeId
				if (homeId === item.homeId) {
					item.childList.forEach((k) => {
						// 根据gameId匹配游戏
						if (gameId === k.gameId) {
							// ‘易倍’体育需单独筛选出type为api的子元素
							if (gameId === 2 || gameId === 56 || gameId === 11 || gameId === 6 || gameId === 64 || gameId === 16 || gameId === 67) {
								k.menu.forEach((v) => {
									if (v.type === 'api') {
										this.queryUrl = v.url + '&platform=h5'
                                        this.showLoading = true
										this.winRef = window.open("","_blank")
										this.newWindowGame()
									}
								})
							// ‘ag真人’单独处理
							} else if (gameId === 5) {
								this.agSelect = []
								this.agGameArr = []
								this.showSelect2 = true
								this.agIntro = k.gameIntroduce
								k.menu.forEach((v) => {
									this.agSelect.push(v.name)
									this.agGameArr.push(v.url + '&platform=h5')
								})
							} else if (gameId === 13 || gameId === 7 || gameId === 9 || gameId === 66) {
								this.queryUrl = k.menu[0].url + '&platform=h5'
								sessionStorage.setItem('queryData', JSON.stringify(this.queryUrl))
								this.$router.push('/gameModelList')
							} else {
								this.queryUrl = k.menu[0].url + '&platform=h5'
								sessionStorage.setItem('queryData', JSON.stringify(this.queryUrl))
								this.$router.push('/gameModel')
							}
						}
					})
				}
			})
		},
	}
}
</script>
<style lang="scss" scoped>
.my {
	width: 100%;
	//height: 100%;
	//background: url("../../../static/images/userInfo-bg.png") no-repeat;
	background: #FFFFFF;
	//margin-bottom: 1.1rem;
	padding-bottom: 1rem;
	.top-area {
		// margin-top: .4rem;
		.base-info {
			width: 94%;
			margin: 0 auto;
			border-top-left-radius: .1rem;
			border-top-right-radius: .1rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: .3rem 0;
			
			.base-info-left {
				display: flex;
				align-items: center;
				.head-icon {
					width: 1.2rem;
					height: 1.2rem;
				}
				.base-info-2 {
					margin-left: .2rem;
					p:first-child {
						color: #666666;
						font-size: .3rem;
						font-weight: bold;
					}
					p:last-child {
						font-size: .2rem;
						color: #A3AEBC;
						
						span:nth-child(2) {
							color: #3677FF;
						}
					}
				}
			}
			.base-info-3 {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 1.2rem;
				height: .5rem;
				font-size: .2rem;
				background: linear-gradient(to right,#ECC288,#D0A561);
				color: #FFFFFF;
				border-radius: .3rem;
				.vip-arrow {
					height: .2rem;
					transform:rotate(180deg);
					margin-left: .1rem;
				}
			}
		}
		.money-info {
			width: 94%;
			margin: 0 auto;
			background: #F7FBFF;
			display: flex;
			justify-content: start;
			align-items: center;
			padding: .2rem .3rem;
			border-radius: .2rem;
			.money-info-left {
				width: 50%;
				.balance-info {
					text-align: center;
					padding: .12rem 0;
					p:first-child {
						color: #333333;
						font-weight: bold;
						font-size: .32rem;
					}
					p:last-child {
						color: #999999;
						font-size: .2rem;
					}
					p{
						.loading-icon {
							width: .35rem;
						}
					}
					.small-fonts {
						display: flex;
						justify-content: center;
						align-items: center;
						font-weight: normal;
						font-size: .2rem;
						span {
							margin-left: .1rem;
						}
						.gray-arrow {
							height: .2rem;
							margin: 0 -.1rem 0 .1rem;
							transform:rotate(180deg);
						}
					}
				}
                .balance-info2 {
                    margin-top: .06rem;
                    p {
                        margin-top: .05rem;
                    }
                }
			}
			.money-info-right {
				border-left: rgba(238,238,238,.4) 1px solid;
			}
		}
		.money-operation {
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 94%;
			height: 1.5rem;
			margin: 0 auto;
			background: #FFFFFF;
			border-bottom-left-radius: .1rem;
			border-bottom-right-radius: .1rem;
			color: #666666;
			img {
				width: .7rem;
				height: .7rem;
			}
			p {
				font-size: .2rem;
				text-align: center;
			}
		}
	}
	.gray-line {
		height: 1rem;
		background: #F5F6F7;
	}
	.middle-area {
        position: relative;
        padding-top: 1.3rem;
        .my-swipe {
            position: absolute;
            top: -.75rem;
            width: 7rem;
            left: 50%;
            margin-left: -3.5rem;
            img {
                width: 100%;
                max-height: 2rem;
            }
        }
        .custom-indicator-box {
			position: absolute;
			top: 1rem;
			left: .5rem;
			display: flex;
			align-items: center;
			// width: 100%;
			.custom-indicator {
				width: .2rem;
				height: .06rem;
				background: rgba(255, 255, 255, .6);
				margin-left: .1rem;
			}
			.custom-indicator-acitve {
				width: .4rem;
			}
		}
		.middle-area-list1 {
			display: flex;
			justify-content: space-around;
			align-items: center;
			text-align: center;
			background: #FFFFFF;
			border-radius: .1rem;
			width: 94%;
			height: 1.3rem;
			margin: .1rem auto 0;
			.column-box {
				width: 33%;
                position: relative;
				img {
					width: .6rem;
					height: .6rem;
				}
				p {
					color: #2D343E;
					font-size: .2rem;
				}
                .unread-point {
                    position: absolute;
                    width: 0.12rem;
                    height: 0.12rem;
                    top: .06rem;
                    left: 50%;
                    transform: translateX(-50%);
                    margin-left: .26rem;
                    background: #D2362C;
                    border-radius: 50%;
                }
			}
		}
	}
}
.img-box {
	border-radius: .2rem;
	padding: .15rem;
    width: 90vw;
	height: 7.4rem;
    overflow: unset;
    margin-top: 2rem;
    left: 50%;
    margin-left: -45vw;
	.imgShow {
		width: 6rem;
		display: flex;
		justify-content: start;
		align-items: center;
		flex-wrap: wrap;
		background: #FFFFFF;
		padding: .15rem .15rem .25rem;
        position: relative;
        margin: 0 auto;
		img {
			width: 1.3rem;
			margin: .05rem;
            border-radius: 50%;
		}
        .avatar-activing {
            border: #FFBA00 3px solid;
        }
	}
    .imgShow::before {
        position: absolute;
        content: '';
        width: 0px;
        height: 0px;
        border-top: transparent .25rem solid;
        border-right: transparent .25rem solid;
        border-bottom: #FFFFFF .25rem solid;
        border-left: transparent .25rem solid;
        top: -.42rem;
        left: .1rem;
    }
    .page-btn-box {
        width: 90%;
        height: 1rem;
        margin: 0 auto;
        padding-top: .2rem;
        .page-btn {
            background: #F6F7F8;
            border-radius: 50%;
            height: 0.7rem;
            width: 0.7rem;
            color: #7C8591;
        }
        .page-btn:first-child {
            margin-right: .4rem;
        }
        .page-btn-activing {
            background: #78BDF2;
            color: #FFFFFF;
        }
    }
}
.van-popup {
    background: none;
    .confirm-sub-box {
        width: 5.5rem;
        border-radius: .1rem;
        overflow: hidden;
        background: #FFFFFF;
        .confirm-sub-line {
            height: .15rem;
            background: linear-gradient(90deg, #78BDF2 0%, #2383FC 100%);
        }
        .confirm-sub-line-yellow {
            background: linear-gradient(90deg, #FFBA00 0%, #E78800 100%);
        }
        .confirm-sub-line-red {
            background: #E90619
        }
        .confirm-sub-title {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .34rem;
            font-weight: bold;
            color: #303030;
            margin-top: .3rem;
            .confirm-sub-title-left {
                width: 0.35rem;
                margin-right: .1rem;
                border-radius: 50%;
            }
            .confirm-title-icon {
                height: .3rem;
                margin-right: .1rem;
            }
        }
        .confirm-sub-content {
            font-size: .28rem;
            color: #303030;
            width: 3.8rem;
            margin: .2rem auto 0;
            .confirm-sub-content-list {
                text-align: left;
                .confirm-sub-content-list-left {
                    color: #7C8591;
                    width: 1.4rem;
                }
                .confirm-sub-content-list-right {
                    width: 2.4rem;
                    text-align: left;
                }
                .confirm-sub-content-list-blue {
                    color: #1D9DFC;
                }
            }
        }
        .confirm-sub-bottom {
            border-top: #E6E8EE 1px solid;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: .2rem;
            .confirm-sub-btn {
                height: .8rem;
                width: 100%;
                font-size: .3rem;
                color: #A8B3C3;
                text-align: center;
                line-height: .8rem;
                border-right: #E6E8EE 1px solid;
                cursor: pointer;
            }
            .confirm-sub-btn2 {
                color: #303030;
                border-right: none;
            }
        }
    }
}

</style>
a
