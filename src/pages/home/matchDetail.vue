<template>
	<div class="match-detail-content">
		<!-- <HeaderTop :title="`赛事详情`"></HeaderTop> -->
        <div class="replace-header">
			<div class="goBack" @click="goBack()">
                <img src="../../../static/images/back-icon.png" alt="" class="back-icon">
            </div>
			<div class="header-title">赛事详情</div>
			<div class="header-right bold el-icon-document text-r" @click="routerFn('betOrders')"></div>
		</div>
        <div class="top-area">
            <div class="match-team-box flex-c">
                <div class="match-team-side single-line bold text-r">
                    {{homeName}}
                </div>
                <div class="match-team-center flex-c">
                    <img :src="homeLogo" alt="" class="team-logo">
                    <div class="vs-fonts bold">VS</div>
                    <img :src="awayLogo" alt="" class="team-logo">
                </div>
                <div class="match-team-side single-line bold">
                    {{awayName}}
                </div>
            </div>
            <div class="score-box flex-c">
                <div class="score-side bold">{{homeScore}}</div>
                <!-- 足球 -->
                <div class="score-center">
                    <div class="match-time flex-c" v-if='dateSwitch == 0'>{{btShow}}</div>
                    <div class="match-time flex-c" v-if='dateSwitch == 1'>
                        <span v-if="detailData.mc.pe === 1002">上半场</span>
                        <span v-if="detailData.mc.pe === 1004">下半场</span>
                        <span v-if="detailData.mc.pe === 1003">半场</span>
                        <span v-if="detailData.mc.pe === 1002 || detailData.mc.pe === 1004">{{parseInt(detailData.mc.s/60)}}'</span>
                        <span v-if="detailData.mc.pe === 1002 || detailData.mc.pe === 1004">{{parseInt(detailData.mc.s%60)}}"</span>
                        <span v-if="detailData.mc.pe === 1003">45'00"</span>
                    </div>
                    <div class="score-status flex-b">
                        <div class="score-status-side">
                            {{homeCorner}}<br>{{homeHalf}}
                        </div>
                        <div class="score-status-center text-c">
                            <img src="../../../static/images/score-flag.png" alt="" class="score-flag"><br>
                            HT
                        </div>
                        <div class="score-status-side">
                            {{awayCorner}}<br>{{awayHalf}}
                        </div>
                    </div>
                </div>
                <div class="score-side bold">{{awayScore}}</div>
                <!-- 篮球 -->
                <!-- <div class="score-center">
                    <div class="match-time flex-c">第二节</div>
                    <div class="score-status flex-b">
                    </div>
                </div>
                <div class="basketball-scores-box flex-c">
                    <div class="basketball-scores">11-8</div>
                    <div class="basketball-scores">30-22</div>
                    <div class="basketball-scores">46-34</div>
                    <div class="basketball-scores scores-blue">66-50</div>
                </div>
                <div class="score-side bold">2</div> -->
            </div>
            <div class="video-box flex-c">
                <div class="video-side text-c">
                    <!-- <img src="../../../static/images/match-video-activing.png" alt=""> -->
                    <img src="../../../static/images/match-video-none.png" alt="">
                    <div class="video-fonts">视频</div>
                </div>
                <div class="video-side text-c">
                    <!-- <img src="../../../static/images/match-ani-activing.png" alt=""> -->
                    <img src="../../../static/images/match-ani-none.png" alt="">
                    <div class="video-fonts">动画</div>
                </div>
            </div>
            <div class="reminds-icon el-icon-warning-outline"></div>
        </div>
        <div class="sports-type-box flex">
            <div class="sports-type-list-box">
                <span class="sports-type-list text-c" :class="sportsTypeIndex === index?'sports-type-list-chosed':''" @click="switchSportsType(index)" v-for="(item,index) in sportsTypeData" :key='index'>{{item}}</span>
            </div>
            <van-icon class="hide-all-icon" name="upgrade" v-if='!showAll' @click='hideShowFn(1)'/>
            <van-icon class="hide-all-icon hide-all-icon2" name="upgrade" v-if='showAll' @click='hideShowFn(2)'/>
        </div>
        <div class="types-content" v-if='betGroup.length == 0'>
            <lottie style='width:60%;margin:1rem auto 0;height:unset;' class='lottie-icon' :options="defaultOptions"  :width="94" :height="30" v-on:animCreated="handleAnimation" />
            <div class="no-date-fonts text-c">盘口已关闭</div>
        </div>
        <div class="types-content" v-if='betGroup.length > 0'>
            <div class="types-list-box" v-for="(item,index) in betGroup" :key="index">
                <div class="types-list-title flex-b" @click="hideShowSingleFn(index)">
                    <div class="title-left flex bold">
                        {{item.nm}}
                        <span class="left-icon el-icon-caret-top"></span>
                    </div>
                    <div class="title-right flex" >
                        <span v-if="item.showDetail === true" class="hide-icon el-icon-top"></span>
                        <span v-if="item.showDetail === false" class="hide-icon hide-icon-black el-icon-top"></span>
                    </div>
                </div>
                <!-- 3列 -->
                <div class="types-list-content flex-b" v-for="(item_1,index_1) in item.mks" :key="index_1" v-if="item_1.op.length == 3 && item.showDetail === true" @click.stop="showBetPop()">
                    <div class="odds-show-part text-c">
                        <div class="odds-show-list" v-if='item_1.ss == 1'>
                            <div class="odds-show-1">{{item_1.op[0].nm}}</div>
                            <div class="odds-show-2 bold" :class="{'red':item_1.op[0].oddStatus == 1,'green':item_1.op[0].oddStatus == 2}">{{item_1.op[0].od}}</div>
                        </div>
                        <div class="odds-show-list flex-c" v-if='item_1.ss !== 1 || item_1.op[0].od < 0'>
                            <div class="lock-icon el-icon-lock"></div>
                        </div>
                    </div>
                    <div class="odds-show-part text-c">
                        <div class="odds-show-list" v-if='item_1.ss == 1'>
                            <div class="odds-show-1">{{item_1.op[1].nm}}</div>
                            <div class="odds-show-2 bold" :class="{'red':item_1.op[1].oddStatus == 1,'green':item_1.op[1].oddStatus == 2}">{{item_1.op[1].od}}</div>
                        </div>
                        <div class="odds-show-list flex-c" v-if='item_1.ss !== 1 || item_1.op[1].od < 0'>
                            <div class="lock-icon el-icon-lock"></div>
                        </div>
                    </div>
                    <div class="odds-show-part text-c">
                        <div class="odds-show-list" v-if='item_1.ss == 1'>
                            <div class="odds-show-1">{{item_1.op[2].nm}}</div>
                            <div class="odds-show-2 bold" :class="{'red':item_1.op[2].oddStatus == 1,'green':item_1.op[2].oddStatus == 2}">{{item_1.op[2].od}}</div>
                        </div>
                        <div class="odds-show-list flex-c" v-if='item_1.ss !== 1 || item_1.op[2].od < 0'>
                            <div class="lock-icon el-icon-lock"></div>
                        </div>
                    </div>
                </div>
                <!-- 2列 -->
                <div class="types-list-content flex-b" v-for="(item_1,index_1) in item.mks" :key="index_1" v-if="item_1.op.length == 2 && item.showDetail === true" @click.stop="showBetPop()">
                    <div class="odds-show-part text-c">
                        <div class="odds-show-list" v-if='item_1.ss == 1'>
                            <div class="odds-show-1"><span class="add-nanme" v-if='item.mty === 1000'>主</span>{{item_1.op[0].nm}}</div>
                            <div class="odds-show-2 bold" :class="{'red':item_1.op[0].oddStatus == 1,'green':item_1.op[0].oddStatus == 2}">{{item_1.op[0].od}}</div> 
                        </div>
                        <div class="odds-show-list flex-c" v-if='item_1.ss !== 1 || item_1.op[0].od < 0'>
                            <div class="lock-icon el-icon-lock"></div>
                        </div>
                    </div>
                    <div class="odds-show-part text-c">
                        <div class="odds-show-list" v-if='item_1.ss == 1'>
                            <div class="odds-show-1"><span class="add-nanme" v-if='item.mty === 1000'>客</span>{{item_1.op[1].nm}}</div>
                            <div class="odds-show-2 bold" :class="{'red':item_1.op[1].oddStatus == 1,'green':item_1.op[1].oddStatus == 2}">{{item_1.op[1].od}}</div>
                        </div>
                        <div class="odds-show-list flex-c" v-if='item_1.ss !== 1 || item_1.op[1].od < 0'>
                            <div class="lock-icon el-icon-lock"></div>
                        </div>
                    </div>
                </div>
                <!-- 1列 -->
                <div class="types-list-content" v-for="(item_1,index_1) in item.mks" :key="index_1" v-if="item_1.op.length > 3 && item.showDetail === true" @click.stop="showBetPop()">
                    <div class="odds-show-part">
                        <div class="odds-show-list" v-for="(item_2,index_2) in item_1.op" :key="index_2" v-if='item_1.ss == 1' :class="{'flex-b':item_2.od > 0,'flex-c':item_2.od < 0}">
                            <div class="odds-show-1">{{item_2.nm}}</div>
                            <div class="odds-show-2 bold" :class="{'red':item_2.oddStatus == 1,'green':item_2.oddStatus == 2}">{{item_2.od}}</div>
                            <div class="lock-icon el-icon-lock" v-if='item_1.ss !== 1'></div>
                        </div>
                        <div class="odds-show-list flex-c" v-if='item_1.ss !== 1'>
                            <div class="lock-icon el-icon-lock"></div>
                        </div>
                    </div>
                </div>
                <!-- 3列、2列 同时存在 -->
                <div class="types-list-content" v-if="item.type === '3' && item.showDetail === true" @click.stop="showBetPop()">
                    <div class="multi-mode flex-b">
                        <div class="odds-show-part text-c">
                            <div class="odds-show-list">
                                <div class="odds-show-1">1-0</div>
                                <div class="odds-show-2 bold">3.22</div>
                            </div>
                            <div class="odds-show-list">
                                <div class="odds-show-1">2-0</div>
                                <div class="odds-show-2 bold">3.22</div>
                            </div>
                            <div class="odds-show-list flex-c">
                                <div class="lock-icon el-icon-lock"></div>
                            </div>
                        </div>
                        <div class="odds-show-part text-c">
                            <div class="odds-show-list">
                                <div class="odds-show-1">0-0</div>
                                <div class="odds-show-2 bold">6.50</div>
                            </div>
                            <div class="odds-show-list">
                                <div class="odds-show-1">1-1</div>
                                <div class="odds-show-2 bold">6.50</div>
                            </div>
                            <div class="odds-show-list">
                                <div class="odds-show-1">2-2</div>
                                <div class="odds-show-2 bold">6.50</div>
                            </div>
                        </div>
                        <div class="odds-show-part text-c">
                            <div class="odds-show-list">
                                <div class="odds-show-1">0-1</div>
                                <div class="odds-show-2 bold">1.12</div>
                            </div>
                            <div class="odds-show-list">
                                <div class="odds-show-1">0-2</div>
                                <div class="odds-show-2 bold">1.12</div>
                            </div>
                            <div class="odds-show-list">
                                <div class="odds-show-1">1-2</div>
                                <div class="odds-show-2 bold">1.12</div>
                            </div>
                        </div>
                    </div>
                    <div class="multi-mode flex-b">
                        <div class="odds-show-part text-c">
                            <div class="odds-show-list">
                                <div class="odds-show-1">3-0</div>
                                <div class="odds-show-2 bold">1.88</div>
                            </div>
                            <div class="odds-show-list">
                                <div class="odds-show-1">3-1</div>
                                <div class="odds-show-2 bold">1.88</div>
                            </div>
                        </div>
                        <div class="odds-show-part text-c">
                            <div class="odds-show-list">
                                <div class="odds-show-1">0-3</div>
                                <div class="odds-show-2 bold">2.12</div>
                            </div>
                            <div class="odds-show-list">
                                <div class="odds-show-1">0-4</div>
                                <div class="odds-show-2 bold">2.12</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <img src="../../../static/images/to-top.png" alt="" v-if='showBackBtn' class="to-top" @click="toTop()">
        <div class="bottom-area flex-b">
            <div class="left-chat-box" @click='showChatFn()'>
                <img src="../../../static/images/chat-room-icon.png" alt="" class="left-chat">
            </div>
            <div class="bottom-right flex">
                <div class="right-side text-c">
                    <div class="" @click='switchFav(1)'>
                        <van-icon class="right-icon" name="star" v-if='isFav === false'/>
                        <div class="" v-if='isFav === false'>关注</div>
                    </div>
                    <div class="" @click='switchFav(0)'>
                        <van-icon class="right-icon right-icon-chosed" name="star" v-if='isFav === true'/>
                        <div class="blue" v-if='isFav === true'>已关注</div>
                    </div>
                </div>
                <div class="right-side text-c" @click='refreshFn()'>
                    <div class="refresh-icon el-icon-refresh-right" v-if='!reloading'></div>
                    <div class="refresh-icon el-icon-loading" v-if='reloading'></div>
                    <div class="icon-fonts">刷新</div>
                </div>
            </div>
        </div>
        <van-popup class="bet-pop-box" v-model="betPopShow" position="bottom">
            <betPopComponent v-if='betPopShow' @multiChange='multiChangeFn'></betPopComponent>
        </van-popup>
        <div class="multi-count-pop flex-c" v-if='multiCount > 0' @click="routerFn('multiBet')">
            <div class="multi-count-box bold flex-c">
                串
                <div class="multi-icon flex-c">{{multiCount}}</div>
            </div>
        </div>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top'
import betPopComponent from '../../../src/pages/home/betPopComponent.vue';
import {mapState} from 'vuex';
import axios from "axios";
import dayjs from 'dayjs';
import noDataRed from "@/assets/lottie/noDataRed.json"

export default {
	name: 'matchDetail',
	components: {
		HeaderTop,
        betPopComponent,
        noDataRed,
	},
	data() {
		return {
			sportsTypeIndex:0,
            sportsTypeData:['全部','精选','进球','半场','角球','波胆','特别投注'],
            showAll:false,
            showBackBtn:false,
            isFav:false,
            reloading:false,
            betPopShow:false,
            multiCount:0,
            detailData:{},
            homeName:'',
            awayName:'',
            homeLogo:'',
            awayLogo:'',
            homeScore:'',
            awayScore:'',
            homeCorner:0,
            awayCorner:0,
            homeHalf:0,
            awayHalf:0,
            betGroup:[],
            betGroup_old:[],
            dateSwitch:0,
            btShow:'',
            defaultOptions:{animationData:noDataRed,loop:true,autoplay:true},
            defaultAnim:'',
		}
	},
	mounted() {
		this.getTokenInfo()
		this.initData()
		this.handleScroll()
	},
	created() {
	
	},
    computed: 
        mapState({
            navigator: state => state.common.navigator,
            tarbarIndex: state => state.common.tarbarIndex,
        }),
	beforeRouteLeave(to, from, next) {    
        if(this.matchTimer){
            clearInterval(this.matchTimer);
        }
		this.$destroy(true)
		next()
	},
	methods: {
        getTokenInfo(){
            if(this.matchTimer){
                clearInterval(this.matchTimer);
            }
            let params = {
                version:this.API.paramVersion,
                platform:'ios',
            }
            this.ServerAPI.postAPI(this.API.getFbToken,params, (success,data)=>{
				if (success) {
					if (data.code === '0000') {
						this.fbToken = data.data.token
						this.fbAppUrl = data.data.appUrl
                        sessionStorage.setItem('fbToken',this.fbToken)
                        sessionStorage.setItem('fbAppUrl',this.fbAppUrl)
                        this.getMatchDetail()
					} else {
						this.$toastTop(data.info,3)
					}
				} else {
                    // this.$toastTop('',2)
				}
			})
            this.matchTimer = setInterval(() => {
                this.getTokenInfo() 
                console.log(1)
            }, 6000);
        },
        getMatchDetail(){
            this.paramData = new FormData()
            this.paramData.append('token',this.fbToken)
            this.paramData.append('appUrl',this.fbAppUrl)
            this.paramData.append('requestBody', '{\"languageType\":\"CMN\",\"matchId\":' + this.$route.query.id + '}')
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            axios.post(this.API.getMatchDetail,this.paramData,config).then(res => {
                this.showLoading = false
                if (res.status == '200') {
                    if(res.data.code === '0000'){
                        this.detailData = res.data.data
                        this.betGroup = res.data.data.mg
                        this.homeName = this.detailData.ts[0].na
                        this.homeLogo = this.detailData.ts[0].lurl
                        this.awayName = this.detailData.ts[1].na
                        this.awayLogo = this.detailData.ts[1].lurl
                        if(this.detailData.nsg !== undefined){
                            this.homeScore = this.detailData.nsg[0].sc[0]
                            this.awayScore = this.detailData.nsg[0].sc[1]
                        }
                        if(this.betGroup_old.length === 0){
                            this.betGroup_old = this.betGroup
                        }else{
                            this.betGroup.forEach((item,index)=>{
                                item.mks.forEach((item_1,index_1)=>{
                                    item_1.op.forEach((item_2,index_2)=>{
                                        if(this.betGroup_old[index].mks[index_1].op[index_2].od < item_2.od){
                                            item_2.oddStatus = 1
                                        }else if(this.betGroup_old[index].mks[index_1].op[index_2].od > item_2.od){
                                            item_2.oddStatus = 2
                                        }else if(this.betGroup_old[index].mks[index_1].op[index_2].od == item_2.od){
                                            item_2.oddStatus = 0
                                        }
                                    })
                                })
                            })
                        }
                        //处理时间
                        if(this.detailData.ms == 4) {
                            let M = dayjs(this.detailData.bt).$M + 1
                            if(M < 10) {
                                M = '0' + M
                            }
                            let D = dayjs(this.detailData.bt).$D
                            if(D < 10) {
                                D = '0' + D
                            }
                            let hour = dayjs(this.detailData.bt).$H
                            if(hour < 10) {
                                hour = '0' + hour
                            }
                            let mnt = dayjs(this.detailData.bt).$m
                            if(mnt < 10) {
                                mnt = '0' + mnt
                            }
                            this.btShow = M + '-' + D + ' ' + hour + ':' + mnt
                            this.dateSwitch = 0
                        }else if(this.detailData.ms == 5){
                            this.dateSwitch = 1
                        }
                        this.betGroup.forEach((item,index) => {
                            item.showDetail = true
                        })
                        //处理角球数据
                        try {
                            this.detailData.nsg.forEach((m,n)=>{
                                if(m.tyg === 6){
                                    if(m.sc[0] !== 0 && m.sc[1] !== 0){
                                        this.homeCorner = m.sc[0]
                                        this.awayCorner = m.sc[1]
                                        throw('')
                                    }
                                }
                            })
                        }catch(e){
                        }
                        //处理半场得分
                        try {
                            this.detailData.nsg.forEach((a,b)=>{
                                if(a.pe === 1002){
                                    this.homeHalf = a.sc[0]
                                    this.awayHalf = a.sc[1]
                                    throw('')
                                }
                            })
                        }catch(e){
                        }
                        this.$forceUpdate()
                        this.betGroup_old = this.betGroup
                        // console.log(this.betGroup)
                    }else{
                        this.$toastTop(res.data.info,3)
                        // if(this.matchTimer){
                        //     clearInterval(this.matchTimer);
                        // }
                        // this.getTokenInfo()
                    }
                } else {
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
            })
        },
        showBetPop(){
            this.betPopShow = true
            // this.getBalance()
        },
        routerFn(val){
            if(val === 'betOrders'){
                sessionStorage.setItem('isSelect', 6)
                this.$store.commit('TARBAR',6)
                this.$router.push('/' + val)
            }
            
        },
        multiChangeFn(val){
            if(val === true){
                this.multiCount = sessionStorage.getItem('multiNum')
            }
        },
        refreshFn(){
            this.reloading = true
            setTimeout(() => {
                this.reloading = false
            }, 2000);
        },
        hideShowFn(val){
            if(val === 1){
                this.showAll = true
                this.betGroup.forEach(item => {
                    this.$set(item,'showDetail',false)
                })
            }else{
                this.showAll = false
                this.betGroup.forEach(item => {
                    this.$set(item,'showDetail',true)
                })
            }
        },
        hideShowSingleFn(val){
            if(this.betGroup[val].showDetail === true) {
                this.$set(this.betGroup[val],'showDetail',false)
            }else{
                this.$set(this.betGroup[val],'showDetail',true)
            }
            this.$forceUpdate()
        },
        initData(){
            
        },
		switchSportsType(val){
            if(this.sportsTypeIndex !== val){
                this.sportsTypeIndex = val
            }
        },
        toTop() {
			document.body.scrollTop = document.documentElement.scrollTop = 0;
		},
        handleScroll(){
            let _this = this
            window.onscroll = function() {
                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
                if(scrollTop > 100){
                    _this.showBackBtn = true
                }else{
                    _this.showBackBtn = false
                }
            }
        },
        switchFav(val){
            if(val === 1){
                this.isFav = true
            }else{
                this.isFav = false
            }
        },
        showChatFn(){
            this.$toastTop('聊天室即将启用，敬请期待',3)
        },
        goBack(){
            this.$router.back()
        },
        handleAnimation(anim){
            this.defaultAnim = anim;
        },
		
	}
}
</script>
<style lang="scss" scoped>
.match-detail-content {
	// margin-top: .1rem;
    padding-bottom: 1.2rem;
    background: #EEEEEE;
    min-height: 100vh;
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
            height: 1rem;
        }
        .header-right {
            width: 0.8rem;
            color: #B33E4A;
            font-size: .4rem;
        }
    }
	.top-area {
        height: 4rem;
        background: url(../../../static/images/match-detail-bg.png) center top no-repeat;
        background-size: 100% 100%;
        position: relative;
        margin-top: 1rem;
        .match-team-box {
            padding: .44rem .16rem 0;
            color: #464646;
            font-size: .3rem;
            .match-team-center {
                .team-logo {
                    height: 0.46rem;
                    margin: 0 .2rem;
                }
                .vs-fonts {
                    font-size: .3rem;
                    margin: 0 .2rem;
                }
            }
            .match-team-side {
                width: 3rem;
            }
        }
        .score-box {
            margin-top: .3rem;
            position: relative;
            .score-center {
                margin: 0 .6rem;
                .match-time {
                    font-size: .2rem;
                    color: #FFFFFF;
                    width: 1.78rem;
                    height: .32rem;
                    // background: #008AF8;
                    background: linear-gradient(90deg, #CA2C48 0%, #892635 100%);
                    margin: 0 auto;
                    border-radius: .26rem;
                }
                .score-status {
                    width: 1.4rem;
                    height: .8rem;
                    margin: .14rem auto 0;
                    padding: .1rem;
                    background: linear-gradient(to right,rgba(0,0,0,.0),#E0E0E0,rgba(0,0,0,.0));
                    font-size: .2rem;
                    color: #878787;
                    .score-flag {
                        height: 0.26rem;
                    }
                }
            }
            .score-side {
                font-size: .48rem;
                color: #303030;
            }
            .basketball-scores-box {
                font-size: .2rem;
                position: absolute;
                bottom: 0;
                .basketball-scores:not(:first-child) {
                    margin-left: .1rem;
                }
            }
            .scores-blue {
                // color: #1B93FF;
                color: #CA2C48;
            }
        }
        .video-box {
            margin-top: .2rem;
            font-size: .26rem;
            .video-side {
                color: #8C8C8C;
                .video-fonts {
                    margin-top: .1rem;
                }
                img {
                    height: 0.3rem;
                }
            }
            .video-side-blue {
                color: #1B93FF;
            }
            .video-side:first-child {
                margin-right: .6rem;
            }
        }
        .reminds-icon {
            color: #707070;
            position: absolute;
            right: .38rem;
            bottom: .2rem;
            font-size: .4rem;
            font-weight: lighter;
        }
    }
    .sports-type-box {
        width: 100%;
        border-bottom: #EEEEEE 1px solid;
        padding: .16rem .1rem;
        height: 1rem;
        white-space: nowrap;
        padding-right: .68rem;
        background: #FFFFFF;
        position: relative;
        .hide-all-icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: .18rem;
            font-size: .38rem;
            color: #8F8F8F;
        }
        .hide-all-icon2 {
            transform: translateY(-50%) rotate(180deg) ;
        }
        .sports-type-list-box {
            width: 100%;
            overflow-x: auto;
        }
        .sports-type-list {
            display: inline-block;
            height: 0.54rem;
            font-size: .26rem;
            border-radius: .4rem;
            margin-left: .32rem;
            line-height: .54rem;
            padding: 0 .2rem;
        }
        .sports-type-list:first-child {
            margin-left: .1rem;
        }
        .sports-type-list-chosed {
            // background: linear-gradient(89deg, #78BDF2 0%, #167BFF 100%);
            background: linear-gradient(90deg, #CA2C48 0%, #892635 100%);
            color: #FFFFFF;
            border: none;
        }
    }
    .types-content {
        background: #EEEEEE;
        padding-top: .14rem;
        .types-list-box {
            .types-list-title {
                background: linear-gradient(180deg, #FBFBFB 0%, #DFDFDF 100%);
                height: 0.6rem;
                padding: 0 0 0 .16rem;
                overflow: hidden;
                .title-left {
                    color: #000000;
                    font-size: .3rem;
                    .left-icon {
                        color: #B2B2B2;
                        font-size: .4rem;
                        margin-left: .1rem;
                    }
                }
                .title-right {
                    font-size: .34rem;
                    width: 1.2rem;
                    padding-right: .46rem;
                    height: 100%;
                    justify-content: flex-end;
                    background: linear-gradient(180deg, #FBFBFB 0%, #F2F2F2 100%);
                    transform: skew(-30deg);
                    margin-right: -.2rem;
                    .hide-icon {
                        color: #B9B9B9;
                        font-weight: bold;
                        transform: skew(30deg);
                    }
                    .hide-icon-black {
                        color: #282828;
                    }
                }
            }
            .types-list-content {
                background: #FFFFFF;
                padding: .14rem;
                .odds-show-part {
                    width: 100%;
                    .odds-show-list {
                        background: #EEEEEE;
                        border-radius: .06rem;
                        height: .88rem;
                        padding: .08rem .16rem;
                        .odds-show-1 {
                            font-size: .24rem;
                            color: #818181;
                        }
                        .odds-show-2 {
                            font-size: .3rem;
                            color: #141414;
                            margin-top: -.04rem;
                        }
                        .red {
                            color: #C10021;
                        }
                        .green {
                            color: #20B62B;
                        }
                        .lock-icon {
                            font-size: .4rem;
                            color: #818181;
                        }
                    }
                    .odds-show-list:not(:first-child) {
                        margin-top: .14rem;
                    }
                }
                .odds-show-part:nth-child(2) {
                    margin: 0 .14rem;
                }
                .odds-show-part:last-child {
                    margin-right: 0;
                }
                .multi-mode:last-child {
                    margin-top: .14rem;
                }
            }
        }
        .types-list-box:not(:first-child) {
            margin-top: .14rem;
        }
    }
    .to-top {
        position: fixed;
        height: 0.6rem;
        right: .46rem;
        bottom: 3rem;
    }
    .bottom-area {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: .2rem .2rem .3rem;
        background: #FFFFFF;
        .left-chat-box {
            width: calc(100% - 2.6rem);
            .left-chat {
                height: 0.48rem;
            }
        }
        .bottom-right {
            height: .68rem;
            border-left: #E4E4E4 1px solid;
            .right-side {
                color: #979797;
                font-size: .28rem;
                width: 1rem;
                .right-icon {
                    color: #E5E5E5;
                    font-size: .34rem;
                }
                .refresh-icon {
                    font-size: .34rem;
                    color: #979797;
                    font-weight: bold;
                    margin-top: .04rem;
                }
                .right-icon-chosed {
                    color: #F0BC49;
                }
                .blue {
                    // color: #1D9DFC;
                    color: #CA2C48;
                }
                .icon-fonts {
                    margin-top: .02rem;
                }
            }
            .right-side:first-child {
                margin: 0 .2rem 0 .3rem;
                
            }
        }
    }
    .multi-count-pop {
        position: fixed;
        bottom: 1.6rem;
        right: .4rem;
        z-index: 90;
        background: #000000;
        border-radius: 50%;
        width: 0.68rem;
        height: 0.68rem;
        color: #FFFFFF;
        .multi-count-box {
            position: relative;
            width: 0.54rem;
            height: 0.54rem;
            border-radius: 50%;
            border: #CA2C48 1px solid;
            .multi-icon {
                position: absolute;
                height: 0.26rem;
                width: 0.26rem;
                border-radius: 50%;
                background: #CA2C48;
                font-size: .2rem;
                top: -.1rem;
                right: -.1rem;
            }
            
        }
    }
}


</style>
