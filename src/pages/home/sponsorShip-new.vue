<template>
	<div class="sponsorship-body">
        <div class="top-nav-box flex-c text-c">
            <div class="nav-list" @click="switchContent(1)">
                <div class="nav-list-fonts" :class="navIndex === 1?'nav-list-fonts-activing':''">红包</div>
                <div class="nav-list-bottom" v-if="navIndex === 1"></div>
            </div>
            <div class="nav-list-line"></div>
            <div class="nav-list" @click="switchContent(2)">
                <div class="nav-list-fonts" :class="navIndex === 2?'nav-list-fonts-activing':''">优惠</div>
                <div class="nav-list-bottom" v-if="navIndex === 2"></div>
            </div>
            <div class="nav-list-line"></div>
            <div class="nav-list" @click="switchContent(3)">
                <div class="nav-list-fonts" :class="navIndex === 3?'nav-list-fonts-activing':''">赞助</div>
                <div class="nav-list-bottom" v-if="navIndex === 3"></div>
            </div>
        </div>
        <div class="main-content match-main-content" v-if='navIndex === 1'>
            <img src="../../../static/images/home-top-logo.png" alt="" class="top-logo" :class="changeView === true?'top-logo-small':''">
            <!-- <img :src="API.assetsUrl + '/static/match-main-img.png'" alt="" class="main-content-img" :class="changeView === true?'main-content-img-small':''"> -->
            <img :src="API.assetsUrl + '/word-cup/hb-sewy.webp'" alt="" class="main-content-img" :class="changeView === true?'main-content-img-small':''">
            <div class="match-status-box">
                <div class="team-logo-box flex-c">
                    <div class="team-logo-list-box flex-c">
                        <div class="team-logo-list home-bg flex-c" v-if='noMatch'>
                            <img src="../../../static/images/match-demo-logo.png" alt="" class="team-logo">
                        </div>
                        <div class="team-logo-list home-bg flex-c" v-if='waitMatch'>
                            <img :src="matchData.homeTeamMark" alt="" class="team-logo" :onerror='logoError'>
                        </div>
                        <div class="team-logo-list home-bg flex-c" v-if='waitHB'>
                            <img :src="matchData.homeTeamMark" alt="" class="team-logo" :onerror='logoError'>
                        </div>
                    </div>
                    <div class="team-score home-score bold flex-c">{{homeScore}}</div>
                    <img src="../../../static/images/team-vs-icon.png" alt="" class="team-vs-icon">
                    <div class="team-score away-score bold flex-c">{{awayScore}}</div>
                    <div class="team-logo-list-box flex-c">
                        <div class="team-logo-list away-bg flex-c" v-if='noMatch'>
                            <img src="../../../static/images/match-demo-logo.png" alt="" class="team-logo">
                        </div>
                        <div class="team-logo-list away-bg flex-c" v-if='waitMatch'>
                            <img :src="matchData.awayTeamMark" alt="" class="team-logo" :onerror='logoError'>
                        </div>
                        <div class="team-logo-list away-bg flex-c" v-if='waitHB'>
                            <img :src="matchData.awayTeamMark" alt="" class="team-logo" :onerror='logoError'>
                        </div>
                    </div>
                </div>
                <div class="team-info-box flex-c">
                    <div class="team-info-list bold flex-c">
                        <div class="" v-if='noMatch'>- -</div>
                        <div class="" v-if='!noMatch'>{{matchData.homeTeamName}}</div>
                    </div>
                    <div class="">
                        <div class="team-info-date flex-b" v-if='noMatch'>
                            <div class="team-info-date-list">- -月- -日</div>
                            <div class="team-info-date-list">- - : - -</div>
                        </div>
                        <div class="team-info-date flex-b" v-if='waitMatch'>
                            <div class="team-info-date-list bold" style="margin-left:.34rem;">{{matchDate}}</div>
                            <div class="team-info-date-list bold" style="margin-right:.68rem;">{{matchTime}}</div>
                        </div>
                        <div class="team-info-wait-box flex-c" v-if="waitHB">
                            <div class="team-info-wait flex-c">{{waitHbFonts}}</div>
                        </div>
                        <div class="match-status-now bold flex-c" v-if='noMatch'>暂无比赛</div>
                        <div class="match-status-now bold flex-c" v-if='waitMatch'>{{unLoginFonts}}</div>
                    </div>
                    <div class="team-info-list bold flex-c">
                        <div class="" v-if='noMatch'>- -</div>
                        <div class="" v-if='!noMatch'>{{matchData.awayTeamName}}</div>
                    </div>
                </div>

            </div>
            <div class="rules-box">
                <img src="../../../static/images/match-rules-title.png" alt="" class="rules-title">
                <div class="rules-fonts bold">指定比赛，双方球队只要在比赛中每进一球（不包含加时和点球大战），立即发送红包,点击弹窗瓜分五万奖金。</div>
            </div>
            <!--可抢红包弹出框-->
            <van-popup class="hb-pop" v-model="canGetHB" round :close-on-click-overlay='false'>
                <div class="hb-pop-content" @click="hasHB()">
                    <div class="blank"></div>
                    <div class="prize-box flex-c bold">
                        最高
                        <span class="prize-num bold">50000</span>
                        奖金
                    </div>
                    <div class="pop-bottom-fonts flex-c bold">点击【抢】立即领取</div>
                </div>
                <img src="../../../static/images/hb-pop-close.png" alt="" class="hb-pop-close" @click="canGetHB = false">
            </van-popup>      
            <!--抢红包成功弹出框-->     
            <van-popup class="hb-pop" v-model="getSuccess" round :close-on-click-overlay='false'>
                <div class="hb-pop-content hb-pop-content2">
                    <div class="blank2"></div>
                    <div class="success-fonts flex-c bold">【成功抢到红包】</div>
                    <div class="success-num bold">
                        <span class="success-num-fonts">{{matchData.cash}}</span>
                        <span>元</span>
                    </div>
                    <!-- <img src="../../../static/images/success-continue.png" alt="" class="success-continue" @click="reloadFn()"> -->
                </div>
                <img src="../../../static/images/hb-pop-close.png" alt="" class="hb-pop-close" @click="reloadFn()">
            </van-popup>    
            <!--抢红包失败弹出框-->
            <van-popup class="hb-pop" v-model="clickFail" round :close-on-click-overlay='false'>
                <div class="hb-pop-content">
                    <div class="blank"></div>
                    <div class="prize-box flex-c bold">
                        最高
                        <span class="prize-num bold">50000</span>
                        奖金
                    </div>
                    <div class="pop-bottom-fonts pop-bottom-fonts2 flex-c bold">{{clickFailInfo}}</div>
                </div>
                <img src="../../../static/images/hb-pop-close.png" alt="" class="hb-pop-close" @click="reloadFn()">
            </van-popup>      
        </div>
        <div class="main-content discount-content" v-if='navIndex === 2'>
            <discount></discount>
        </div>
        <div class="main-content sponsor-content" v-if='navIndex === 3'>
            <!-- <div class="sponsorship-list" v-for="(items,index) in sponsorshipList" :key="index" @click="toPushdetail(items.url,items.title,items.id)"> -->
                <img class="zanzhu-img" v-lazy="items.image + '?v=0.1'"  v-for="(items,index) in sponsorshipList" :key="index" @click="toPushdetail(items.url,items.title,items.id)" alt="">
                <!-- <div class="zanzhu-title">
                    <span>{{ items.title }}</span>
                    <a href="">查看详情</a>
                </div> -->
            <!-- </div> -->
        </div>

	</div>
</template>

<script>
import {formatDate} from '../../../static/js/data.js'
import discount from '../../pages/home/discountComponent'
export default {
	name: 'sponsorship',
	components: {
        discount,
	},
	data() {
		return {
			// checkStatus: '',
			noMatch: false,
			waitHB: false,
			waitMatch: false,
			canGetHB: false,
			getSuccess: false,
			clickFail: false,
			moneyInfo: false,
			matchData: {},
			homeTeamImg: "",
			awayTeamImg: "",
			getTime: 0,
			matchDate: '',
			matchTime: '',
			sponsorshipList: [],
			imgUrl: "",
			sponsorshipTitle: "",
			matchInfo: "",
			HbNumber: '',
            navIndex:1,
            homeScore:'',
            awayScore:'',
            loginMark:localStorage.getItem('login_flag'),
            unLoginFonts:'',
            waitHbFonts:'',
            changeView:false,
            clickFailInfo:'',
            logoError:'this.src="' + require('../../../static/images/match-demo-logo.png') + '"',
		}
	},
	mounted() {
        this.handleLoginMark()
		this.loadTop()
	},
    created() {
        this.$Lazyload.options.loading = 'static/images/discount-lazy.jpg'
        this.$Lazyload.options.error = 'static/images/discount-lazy.jpg'
	},
	beforeRouteLeave(to, from, next) {  
        let _this = this
        clearInterval(_this.timer)
		this.$destroy(true)
		next()
	},
	methods: {
        handleLoginMark(){
            if(sessionStorage.getItem('loginMark') === '1'){
                sessionStorage.setItem('loginMark','0')
                location.reload()
            }
        },
		formatDate() {
			// this.matchTime = new Date(this.getTime).format("yyyy-MM-dd hh:mm");
			var date = new Date(this.getTime * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			// Y = date.getFullYear() + '-';
			let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月'
			let D = date.getDate() + '日'
			let h = date.getHours() + ':'
			let m = date.getMinutes()
			if(m < 10){
				m = '0' + m
			}
			// s = date.getSeconds()
			this.matchDate = M+D
			this.matchTime = h+m
			// console.log( M+D+h+m)
			// return M+D+h+m
		},
        initView(){
            var h= window.innerHeight || document.body.clientHeight
            console.log(h)
            if(h <= 568){
                this.changeView = true
            }
        },
		loadTop() {
			let params = {
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.sponsorship, params, this.sponsorship);
            if(this.loginMark === 'true'){
                this.ServerAPI.postAPI(this.API.checkHB, params, this.checkHB);
                // this.unLoginFonts =
            }else{
                this.ServerAPI.postAPI(this.API.checkHB_2, params, this.checkHB_2);
            }
            this.switchContent(1)
            this.initView()
		},
		HBplan() {
			let params = {
				version: this.API.paramVersion,
			}
            if(this.loginMark === 'true'){
                this.ServerAPI.postAPI(this.API.checkHB, params, this.checkHB);
            }else{
                this.ServerAPI.postAPI(this.API.checkHB_2, params, this.checkHB_2);
            }
			
		},
		sponsorship(success, data) {
			if (success) {
				if (data.code == '0000') {
					this.sponsorshipList = data.data;
					this.sponsorshipList.imgUrl = data.data.image;
					this.sponsorshipList.sponsorshipTitle = data.data.title;
				}
			}
		},
		toPushdetail(url, title,id) {
            if(id === 14){
                sessionStorage.setItem('hotMark',0)
                this.$router.push('/sponsorshipOne_worldCup')
            }else{
			    this.$router.push({name: 'sponsorshipOne', query: {url: url, title: title,id:id}});
            }
		},
		checkHB(success, data) {
			if (success) {
				// if (this.checkStatus != data.code) { this.$forceUpdate();
					if (data.code == '0000') {
						this.waitHB = true;
                        this.waitMatch = false;
                        this.noMatch = false;
                        this.loginMark = localStorage.getItem('login_flag')
                        if(this.loginMark !== 'false'){
                            this.canGetHB = true;
                        }
                        this.waitHbFonts = '抢红包'
						this.matchData = data.data;
                        this.formatDate();
					} else if (data.code == '1702') {
						this.noMatch = false;
						this.waitHB = true;
						this.waitMatch = false;
						this.matchData = data.data;
						this.getTime = data.data.bisaiBeginTime;
                        this.waitHbFonts = '等待进球'
						this.formatDate();
					} else if (data.code == '1700') {
						this.noMatch = true;
						this.waitMatch = false;
						this.waitHB = false;
					} else if (data.code == '1701') {
						this.waitMatch = true;
						this.noMatch = false;
						this.waitHB = false;
						this.matchData = data.data;
                        this.unLoginFonts = '等待开赛'
						this.getTime = data.data.bisaiBeginTime;
						this.formatDate();
					} else if (data.code == '1703') {
						this.waitHB = true;
                        this.waitMatch = false;
                        this.noMatch = false;
						this.matchData = data.data;
                        this.waitHbFonts = '红包已领取'
                        this.formatDate();
					}
                    this.$forceUpdate();
					// this.checkStatus = data.code;
				// }
			}
		},
		checkHB_2(success, data) {
			if (success) {
                if (data.code == '0000') {
                    this.waitHB = true;
                    this.getSuccess = false;
                    this.loginMark = localStorage.getItem('login_flag')
                    if(this.loginMark !== 'false'){
                        this.canGetHB = true;
                    }
                    this.matchData = data.data;
                    this.formatDate();
                } else if (data.code == '1702') {
                    this.noMatch = false;
                    this.waitHB = true;
                    this.canGetHB = false;
                    this.waitMatch = false;
                    this.getSuccess = false;
                    this.matchInfo = data.info;
                    this.matchData = data.data;
                    this.getTime = data.data.bisaiBeginTime;
                    this.formatDate();
                } else if (data.code == '1700') {
                    this.noMatch = true;
                    this.waitMatch = false;
                    this.waitHB = false;
                } else if (data.code == '1701') {
                    this.waitMatch = true;
                    this.noMatch = false;
                    this.waitHB = false;
                    this.matchInfo = data.info;
                    this.matchData = data.data;
                    this.getTime = data.data.bisaiBeginTime;
                    this.unLoginFonts = '登录后领取红包'
                    this.formatDate();
                } else if (data.code == '1703') {
                    this.waitHB = true;
                    this.getSuccess = false;
                    this.canGetHB = false;
                    this.matchData = data.data;
                    this.formatDate();
                }
                this.$forceUpdate();
			}
		},
		getHB(success, data) {
			if (success) {
				this.canGetHB = false;
				if (data.code == '0000') {
					this.getSuccess = true;
					this.matchData = data.data;
					// this.checkStatus = '1703';
				} else {
					this.clickFail = true;
					this.clickFailInfo = data.info;
                    if(data.code === '1704'){
                        this.clickFailInfo = '红包已抢完，请下次再来'
                    }
				}
			}else{
                this.$toastTop('似乎已断开与互联网的连接',2)
            }
		},
		hasHB() {
			let params = {
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.getHB, params, this.getHB);
		},
        switchContent(value){
            this.navIndex = value
            let _this = this
            if(value === 1){
                _this.timer = setInterval(()=> {
                    _this.HBplan();
                }, 5000)
            }else if(value === 2){
                clearInterval(_this.timer)
            }else if(value === 3){
                clearInterval(_this.timer)
            }
        },
        reloadFn(){
            location.reload()
        }
	}
}
</script>

<style lang="scss" scoped>
.sponsorship-body {
    background: #EDEFF2;
    .top-nav-box {
        background: #FFFFFF;
        box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
        padding-top: .3rem;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 99;
        height: 1rem;
        .nav-list {
            height: 0.68rem;
            width: 1.4rem;
            position: relative;
            .nav-list-fonts {
                color: #7C8591;
                font-size: .3rem;
            }
            .nav-list-fonts-activing {
                color: #303030;
            }
            .nav-list-bottom {
                position: absolute;
                bottom: 0;
                width: 0.5rem;
                height: 0.1rem;
                background: #78BDF2;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        .nav-list-line {
            width: 1px;
            height: .3rem;
            background: #E6E8EE;
            margin-top: -.24rem;
        }
    }
    .main-content {
        margin-top: 1rem;
        height: calc(100vh - 2rem);
        background: url(../../../static/images/match-main-bg.png) center top no-repeat;
        background-size: 100% auto;
        .top-logo {
            display: block;
            height: 0.58rem;
            margin: 1.2rem auto 0;
            position: relative;
            z-index: 2;
        }
        .top-logo-small {
            height: 0.48rem;
            margin: 1.1rem auto 0;
        }
        .main-content-img {
            display: block;
            width: 100%;
            margin: -.68rem auto 0;
        }
        .main-content-img-small {
            width: 88%;
            // margin: -.68rem auto 0;
        }
        .match-status-box {
            margin-top: -.3rem;
            .team-logo-box {
                .team-logo-list-box {
                    width: 2.2rem;
                }
                .team-logo-list {
                    width: 1rem;
                    height: 1rem;
                    border-radius: 50%;
                    .team-logo {
                        height: 0.8rem;
                        width: 0.8rem;
                        border-radius: 50%;
                    }
                }
                .home-bg {
                    background: url(../../../static/images/match-home-team-bg.png) no-repeat;
                    background-size: 100% 100%;
                    margin-right: .6rem;
                }
                .away-bg {
                    background: url(../../../static/images/match-away-team-bg.png) no-repeat;
                    background-size: 100% 100%;
                    margin-left: .6rem;
                }
                .team-vs-icon {
                    height: 1.1rem;
                    // margin: 0 .68rem;
                }
                .team-score {
                    width: 0.8rem;
                    color: #333333;
                    font-size: .44rem;
                }
                .home-score {
                    margin-right: -.4rem;
                }
                .away-score {
                    margin-left: -.4rem;
                }
            }
            .team-info-box {
                margin-top: 0rem;
                padding: 0 .1rem;
                align-items: flex-start;
                .team-info-list {
                    color: #303030;
                    font-size: .3rem;
                    text-align: center;
                    width: 1.7rem;
                    div {
                        width: 1.7rem;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        word-break:break-all;
                    }
                }
                .team-info-list:first-child {
                    margin-right: .2rem;
                }
                .team-info-list:last-child {
                    margin-left: .2rem;
                }
                .team-info-date {
                    width: 3.4rem;
                    height: 0.48rem;
                    background: url(../../../static/images/team-date-bg.png) no-repeat;
                    background-size: 100% 100%;
                    .team-info-date-list {
                        color: #FFFFFF;
                        font-size: .26rem;
                    }
                    .team-info-date-list:first-child {
                        margin-left: .22rem;
                    }
                    .team-info-date-list:last-child {
                        margin-right: .4rem;
                    }
                }
                .team-info-wait-box {
                    width: 3.4rem;
                    .team-info-wait {
                        width: 2.6rem;
                        height: 0.52rem;
                        font-size: .3rem;
                        color: #FFFFFF;
                        background: linear-gradient(to right,#9B040C,#CC0014);
                        border-radius: .06rem;
                    }
                }
            }
            .match-status-now {
                width: 2.68rem;
                height: 0.4rem;
                margin: -.01rem auto 0;
                background: url(../../../static/images/match-status-now-bg.png) no-repeat;
                background-size: 100% 100%;
                color: #FFFFFF;
                font-size: .22rem;
            }
        }
        .rules-box {
            width: 90%;
            background: rgba(255,255,255,0.39);
            border-radius: .2rem;
            background: #FFFFFF;
            margin: .4rem auto 0;
            padding-bottom: .2rem;
            .rules-title {
                width: 100%;
                margin-top: -.1rem;
            }
            .rules-fonts {
                background: #F6F7F9;
                color: #7C8591;
                border-radius: .2rem;
                font-family: ReeJi-BigRuixain-BlackGBV1.0;
                font-size: .3rem;
                padding: .2rem;
                width: calc(100% - .4rem);
                margin: 0 auto;
                word-break: break-all;
            }
        }
        //    
        .sponsorship-list {
            position: relative;
            width: 94%;
            margin: 0 auto;
            background: #FFFFFF;
            margin-top: .8rem;
            margin-bottom: 1.3rem;
            border-radius: .08rem;
            
            .zanzhu-img {
                position: absolute;
                top: -.9rem;
                width: 92%;
                margin-left: 4%;
            }
            
            .zanzhu-title {
                height: 2.2rem;
                line-height: 3.8rem;
                display: flex;
                justify-content: space-between;
                
                span {
                    margin-left: .25rem;
                }
                a {
                    font-size: .23rem;
                    margin-right: .3rem;
                    color: #757F8B;
                    padding-right: .2rem;
                    background: url("../../../static/images/zanzhu-right.png") .96rem 1.75rem no-repeat;
                    background-size: .15rem .25rem;
                }
            }
        }
        .sponsorship-list:first-child {
            margin-top: 1.6rem;
        }
    }
    .match-main-content {
        // margin-bottom: 2.2rem;
        height: unset;
        padding-bottom: 1.4rem;
    }
    .sponsor-content {
        margin-top: 1.28rem;
        background: #EEEEEE;
        height: 100%;
        .zanzhu-img {
            display: block;
            margin: .16rem auto 0;
            width: 94%;
            border-radius: .16rem;
            
        }
        .zanzhu-img:last-child {
            margin-bottom: 1.2rem;
        }
    }
    .discount-content {
        margin: 2.2rem 0 1rem;
    }
}
.hb-pop {
    width: 6rem;
    background-color: unset;
    .hb-pop-content {
        width: 6rem;
        height: 8.26rem;
        background: url("../../../static/images/hb-pop-bg.png") no-repeat;
        background-size: 100% 100%;
        .blank {
            height: 4.4rem;
        }
        .prize-box {
            width: 3.4rem;
            height: 1rem;
            color: #B27900;
            font-family: ReeJi-BigRuixain-BlackGBV1.0;
            font-size: .32rem;
            background: url("../../../static/images/match-prize-fonts-bg.png") no-repeat;
            background-size: 100% 100%;
            margin: 0 auto;
            .prize-num {
                font-family: DIN Alternate;
                font-size: .48rem;
                margin-bottom: .0rem;
            }
        }
        .pop-bottom-fonts {
            margin-top: 2.1rem;
            color: #FFFFFF;
            font-size: .3rem;
        }
        .pop-bottom-fonts2 {
            font-size: .24rem;
            margin-top: 2.2rem;
        }
    }
    .hb-pop-content2 {
        background: url("../../../static/images/hb-pop-success-bg.png") no-repeat;
        background-size: 100% 100%;
        .blank2 {
            height: 6rem;
        }
        .success-fonts {
            color: #FFFFFF;
            font-size: .34rem;
            margin-top: .16rem;
        }
        .success-num {
            color: #FFC424;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            font-size: .3rem;
            margin-top: .3rem;
            .success-num-fonts {
                font-size: .78rem;
                margin-right: .1rem;
                margin-bottom: -.18rem;
            }
        }
    }
    .hb-pop-close {
        display: block;
        height: 1.6rem;
        margin: 0 auto;
    }
}
</style>
