<template>
	<div class="bet-component-content">
        <!--走马灯消息轮播-->
        <div class="notice-box flex" @click="routerFn()">
            <van-notice-bar left-icon="volume" color="#7F8590" background="none"
                            style="height: .5rem;width:100%">
                <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
                    <van-swipe-item v-for='(item,index) in fbNotice' :key='index' style="width:100%;height:.5rem;"  v-html="item.loginName + '：' + item.info"></van-swipe-item>
                </van-swipe>
            </van-notice-bar>
            <div class="notice-box-none"></div>
        </div>
        <div class="top-nav flex-c">
            <div class="side-bg"></div>
            <div class="side-red"></div>
            <div class="side-bg side-bg2"></div>
            <div class="side-red side-red2"></div>
            <!-- 体育投注入口，请暂时不要打开 -->
            <!-- <div class="top-nav-list flex-c" :class="navIndex === 0?'top-nav-chosed bold':''" @click='switchNav(0)'>投注</div>
            <div class="top-nav-line"></div> -->
            <div class="top-nav-list flex-c" :class="navIndex === 1?'top-nav-chosed bold':''" @click='switchNav(1)'>赞助</div>
            <div class="top-nav-line"></div>
            <div class="top-nav-list flex-c" :class="navIndex === 2?'top-nav-chosed bold':''" @click='switchNav(2)'>优惠</div>
            <div class="top-nav-line"></div>
            <div class="top-nav-list flex-c" :class="navIndex === 3?'top-nav-chosed bold':''" @click='switchNav(3)'>热点</div>
        </div>
        <div class="border-bg">
            <div class="border-content"></div>
        </div>
        <div class="iframe-box" v-if="showSponsor">
            <iframe :src="sponsorUrl" name='sponsorIframe' ref='iframeHeight' id="urlIframe" width="100%" height="" frameborder="0" scrolling="auto" style="position:absolute;top:0rem;left: 0;z-index:2;"></iframe>
        </div>
        <div class="" v-if="!showSponsor">
            <div class="switch-content" v-if='navIndex === 0'>
                <div class="mode-1-nav flex-c">
                    <div class="mode-1-nav-list text-c" :class="mode_1_Index === 0?'mode-1-nav-list-chosed':''" @click='switchMode_1(0)'>
                        <div class="mode-1-nav-list-top bold">{{championData.length}}</div>
                        <div class="mode-1-nav-list-line"></div>
                        <div class="mode-1-nav-list-bottom bold">冠军</div>
                    </div>
                    <div class="mode-1-nav-line"></div>
                    <div class="mode-1-nav-list text-c" :class="mode_1_Index === 1?'mode-1-nav-list-chosed':''" @click='switchMode_1(1)'>
                        <div class="mode-1-nav-list-top bold">{{zpNum}}</div>
                        <div class="mode-1-nav-list-line"></div>
                        <div class="mode-1-nav-list-bottom bold">赛事</div>
                    </div>
                    <div class="mode-1-nav-line"></div>
                    <div class="mode-1-nav-list text-c" :class="mode_1_Index === 2?'mode-1-nav-list-chosed':''" @click='switchMode_1(2)'>
                        <div class="mode-1-nav-list-top bold">{{gqNum}}</div>
                        <div class="mode-1-nav-list-line"></div>
                        <div class="mode-1-nav-list-bottom bold">今日</div>
                    </div>
                    <div class="mode-1-nav-line"></div>
                    <div class="mode-1-nav-list text-c" :class="mode_1_Index === 3?'mode-1-nav-list-chosed':''" @click='switchMode_1(3)'>
                        <div class="mode-1-nav-list-top bold">{{favNum}}</div>
                        <div class="mode-1-nav-list-line"></div>
                        <div class="mode-1-nav-list-bottom bold">关注</div>
                    </div>
                </div>
                <div class="sports-type-box flex" v-if="wordCupSwitch">
                    <span class="sports-type-list text-c" :class="sportsTypeIndex === index?'sports-type-list-chosed':''" @click="switchSportsType(index)" v-for="(item,index) in sportsTypeData" :key='index'>{{item.name}} {{item.num}}</span>
                    <span class="">&nbsp;</span>
                </div>
                <div class="filtrate-content flex-b">
                    <div class="search-btn flex" @click="routerFn('searchMatch')">
                        <span class="search-icon el-icon-search"></span>
                        <span>搜索</span>
                    </div>
                    <div class="search-line flex-b"></div>
                    <div class="date-league-champion flex-b" v-if="mode_1_Index === 0">
                        <div class="champion-title-fonts">截止 2022年12月19日 08:00</div>
                        <div class="search-line"></div>
                        <div class="sort-by-icon el-icon-d-arrow-left" v-if='switchAll_2 === 1' @click="switchAllDetail(0)"></div>
                        <div class="sort-by-icon el-icon-d-arrow-right" v-if='switchAll_2 === 0' @click="switchAllDetail(1)"></div>
                    </div>
                    <div class="date-league flex-b" v-if="wordCupSwitch">
                        <div class="date-league-list" :class="sortMode === 'date'?'date-league-list-chosed':''" @click="switchSort('date')">时间</div>
                        <div class="el-icon-sort-box">
                            <div class="el-icon-sort-up" :class="sortMode === 'date'?'el-icon-sort-chosed':''"></div>
                            <div class="el-icon-sort-down" :class="sortMode === 'league'?'el-icon-sort-chosed':''"></div>
                        </div>
                        <div class="date-league-list" :class="sortMode === 'league'?'date-league-list-chosed':''" @click="switchSort('league')">联赛</div>
                    </div>
                    <div class="odds-type-box flex" v-if="mode_1_Index !== 0">
                        <div class="odds-type flex">
                            <div class="odds-type-list" @click="switchOddsType(0)" :class="oddsType === 0?'odds-type-list-chosed bold':''">大小</div>
                            <div class="odds-type-list" @click="switchOddsType(1)" :class="oddsType === 1?'odds-type-list-chosed bold':''">让球</div>
                            <div class="odds-type-list" @click="switchOddsType(2)" :class="oddsType === 2?'odds-type-list-chosed bold':''">独赢</div>
                            <div class="odds-type-list" @click="switchOddsType(3)" :class="oddsType === 3?'odds-type-list-chosed bold':''">角球</div>
                        </div>
                        <div class="search-line"></div>
                        <div class="sort-by-icon el-icon-d-arrow-left" v-if='switchAll === 1' @click="switchAllDetail(0)"></div>
                        <div class="sort-by-icon el-icon-d-arrow-right" v-if='switchAll === 0' @click="switchAllDetail(1)"></div>
                    </div>
                    
                </div>
                <!-- 冠军赛事列表 -->
                <!-- <div class="match-content">
                    加载中预留
                </div> -->
                <div class="match-content" v-if='championData.length > 0 && mode_1_Index == 0'>
                    <div class="match-list-box" v-for='(item,index) in championData'>
                        <div class="match-list-title flex-b" @click='switchDetail(index)'>
                            <div class="match-list-title-left flex">
                                <img :src="championIcon" alt="" class="left-flag">
                                <div class="left-league-name bold">{{item.nm}}</div>
                            </div>
                            <div class="match-list-title-right el-icon-arrow-up" v-if='item.showDetail === true'></div>
                            <div class="match-list-title-right el-icon-arrow-down" v-if='item.showDetail === false'></div>
                        </div>
                        <el-collapse-transition>
                            <div class="champion-list-box" v-if='item.showDetail === true'>
                                <div class="champion-list flex-b bold" @click.stop='showBetPop()' v-for="(item_1,index_1) in item.mks" @click="quickBetFn(item_1.id,championMatchId,item_1.op[0].ty,championLeagueName,item_1.op[0].nm,item.nm)">
                                    <div class="champion-list-left">{{item_1.op[0].nm}}</div>
                                    <div class="champion-list-right">{{item_1.op[0].od}}</div>
                                </div>
                            </div>
                        </el-collapse-transition>
                    </div>
                </div>
                <!-- 非冠军赛事列表 -->
                <div class="match-content" v-if='matchListDataShow.length == 0 && mode_1_Index !== 0'>
                    <lottie style='width:60%;margin:1rem auto 0;height:unset;' class='lottie-icon' :options="defaultOptions"  :width="94" :height="30" v-on:animCreated="handleAnimation" />
                </div>
                <div class="match-content" v-if='matchListDataShow.length > 0 && mode_1_Index !== 0'>
                    <div class="match-list-box" v-for='(item,index) in matchListDataShow'>
                        <div class="match-list-title flex-b" @click='switchDetail(index)'>
                            <div class="match-list-title-left flex">
                                <img :src="item[0].lg.lurl" alt="" class="left-flag">
                                <div class="left-league-name bold">{{item[0].lg.na}}</div>
                            </div>
                            <div class="match-list-title-right el-icon-arrow-up" v-if='item[0].showDetail === true'></div>
                            <div class="match-list-title-right el-icon-arrow-down" v-if='item[0].showDetail === false'></div>
                        </div>
                        <el-collapse-transition>
                            <div class="">
                                <div class="match-list-detail" v-if='item[0].showDetail === true' v-for="(t,i) in item" :key="i" @click="toMatchDetail(i,index)">
                                    <div class="match-list-detail-line1 flex-b">
                                        <div class="match-list-detail-line1-left flex-b" :class="t.ms === 5?'match-list-detail-line1-left-blue':''">
                                            <div class="match-list-detail-line1-left-bg" :class="t.ms === 5?'match-list-detail-line1-left-bg-blue':''"></div>
                                            <div class="match-list-detail-line1-left-fonts flex-c" v-if="t.ms === 4">{{t.btShow}}</div>
                                            <div class="match-list-detail-line1-left-fonts flex-c" v-if="t.ms === 5">
                                                <span v-if="t.mc.pe === 1002">上半场</span>
                                                <span v-if="t.mc.pe === 1004">下半场</span>
                                                <span v-if="t.mc.pe === 1003">半场</span>
                                                <span v-if="t.mc.pe === 1002 || t.mc.pe === 1004">{{parseInt(t.mc.s/60)}}'</span>
                                                <span v-if="t.mc.pe === 1002 || t.mc.pe === 1004">{{parseInt(t.mc.s%60)}}"</span>
                                                <span v-if="t.mc.pe === 1003">45'00"</span>
                                            </div>
                                            <van-icon class="match-list-detail-line1-left-icon" name="video-o" />
                                        </div>
                                        <div class="match-list-detail-line1-center flex-b">
                                            <div class="center-left flex" v-if="t.corner">
                                                <div class="center-logo el-icon-s-flag"></div>
                                                <div class="center-fonts-2">{{t.corner[1]}}</div>
                                            </div>
                                            <div class="center-left-blank" v-if="!t.corner">
                                            </div>
                                            <div class="center-right flex" v-if="t.halfScore">
                                                <div class="center-fonts-1">HT&nbsp;</div>
                                                <div class="center-fonts-2">{{t.halfScore[1]}}</div>
                                            </div>
                                        </div>
                                        <div class="match-list-detail-line1-right flex">
                                            <div class="right-fonts flex">
                                                {{t.tms}}
                                                <van-icon name="arrow" />
                                            </div>
                                            <van-icon class="right-icon" name="star" v-if='t.isFav === false' @click.stop='switchFav(1,i,index)'/>
                                            <van-icon class="right-icon-chosed" name="star" v-if='t.isFav === true' @click.stop='switchFav(0,i,index)'/>
                                        </div>
                                    </div>
                                    <div class="match-list-detail-line2 flex-b">
                                        <div class="match-list-detail-line2-left">
                                            <div class="team-box flex" v-for="(m,n) in t.ts" :key="n">
                                                <img :src="m.lurl" alt="" class="team-logo">
                                                <div class="team-name">{{m.na}}</div>
                                            </div>
                                        </div>
                                        <div class="match-list-detail-line2-right flex">
                                            <div class="match-score-box bold" v-for="(a,b) in t.nsg" :key="b" v-if='b === 0'>
                                                <div class="match-score">{{a.sc[0]}}</div>
                                                <div class="match-score">{{a.sc[1]}}</div>
                                            </div>
                                            <!-- 大小 -->
                                            <div class="flex-c" v-for="(c,d) in t.mg" :key="d" v-if="t.hasDX !== undefined && oddsType === 0">
                                                <div class="odds-box flex-c" @click.stop='showBetPop()' v-for="(c_1,d_1) in c.mks[0].op" :key="d_1" v-if="c.mks[0].ss === 1 && c.mty === 1007 && c.nm == '大/小'" @click='quickBetFn(c.mks[0].id,t.id,c_1.ty,t.lg.na,t.ts[0].na,t.ts[1].na)'>
                                                    <div class="">
                                                        <div class="odds-line1 bold text-c">{{c_1.nm}}</div>
                                                        <div class="odds-line2 bold text-c" :class="{'odds-red':c_1.oddsStatus == 1,'odds-green':c_1.oddsStatus == 2,'':c_1.oddsStatus == 0}">{{parseFloat(c_1.od).toFixed(2)}}</div>
                                                    </div>
                                                </div>
                                                <div class="odds-box flex-c" v-for="(e,f) in oddsTypeNone" :key="f" v-if="c.mks[0].ss !== 1 && c.mty === 1007">
                                                    <div class="no-odds-icon el-icon-lock"></div>
                                                </div>
                                            </div>
                                            <div class="flex-c" v-if="t.hasDX === undefined && oddsType === 0">
                                                <div class="odds-box flex-c" v-for="(g,h) in oddsTypeNone" :key="h">
                                                    <div class="no-odds-icon el-icon-lock"></div>
                                                </div>
                                            </div>
                                            <!-- 让球 -->
                                            <div class="flex-c" v-for="(c,d) in t.mg" :key="d" v-if="t.hasRQ !== undefined && oddsType === 1">
                                                <div class="odds-box flex-c" @click.stop='showBetPop()' v-for="(c_1,d_1) in c.mks[0].op" :key="d_1" v-if="c.mks[0].ss === 1 && c.mty === 1000" @click='quickBetFn(c.mks[0].id,t.id,c_1.ty,t.lg.na,t.ts[0].na,t.ts[1].na)'>
                                                    <div class="">
                                                        <div class="odds-line1 bold text-c">{{c_1.nm}}</div>
                                                        <div class="odds-line2 bold text-c" :class="{'odds-red':c_1.oddsStatus == 1,'odds-green':c_1.oddsStatus == 2}">{{parseFloat(c_1.od).toFixed(2)}}</div>
                                                    </div>
                                                </div>
                                                <div class="odds-box flex-c" v-for="(e,f) in oddsTypeNone" :key="f" v-if="c.mks[0].ss !== 1 && c.mty === 1000">
                                                    <div class="no-odds-icon el-icon-lock"></div>
                                                </div>
                                            </div>
                                            <div class="flex-c" v-if="t.hasRQ === undefined && oddsType === 1">
                                                <div class="odds-box flex-c" v-for="(g,h) in oddsTypeNone" :key="h">
                                                    <div class="no-odds-icon el-icon-lock"></div>
                                                </div>
                                            </div>
                                            <!-- 独赢 -->
                                            <div class="flex-c" v-for="(c,d) in t.mg" :key="d" v-if="t.hasDY !== undefined && oddsType === 2">
                                                <div class="odds-box odds-box2 flex-c" @click.stop='showBetPop()' v-for="(c_1,d_1) in c.mks[0].op" :key="d_1" v-if="c.mks[0].ss === 1 && c.mty === 1005" @click='quickBetFn(c.mks[0].id,t.id,c_1.ty,t.lg.na,t.ts[0].na,t.ts[1].na)'>
                                                    <div class="">
                                                        <div class="odds-line1 bold text-c">{{c_1.nm}}</div>
                                                        <div class="odds-line2 bold text-c" :class="{'odds-red':c_1.oddsStatus == 1,'odds-green':c_1.oddsStatus == 2}">{{parseFloat(c_1.od).toFixed(2)}}</div>
                                                    </div>
                                                </div>
                                                <div class="odds-box odds-box2 flex-c" v-for="(e,f) in oddsTypeNone2" :key="f" v-if="c.mks[0].ss !== 1 && c.mty === 1005">
                                                    <div class="no-odds-icon el-icon-lock"></div>
                                                </div>
                                            </div>
                                            <div class="flex-c" v-if="t.hasDY === undefined && oddsType === 2">
                                                <div class="odds-box odds-box2 flex-c" v-for="(g,h) in oddsTypeNone2" :key="h">
                                                    <div class="no-odds-icon el-icon-lock"></div>
                                                </div>
                                            </div>
                                            <!-- 角球 -->
                                            <div class="flex-c" v-for="(c,d) in t.mg" :key="d" v-if="t.hasJQ !== undefined && oddsType === 3">
                                                <div class="odds-box flex-c" @click.stop='showBetPop()' v-for="(c_1,d_1) in c.mks[0].op" :key="d_1" v-if="c.mks[0].ss === 1 && c.mty === 1010" @click='quickBetFn(c.mks[0].id,t.id,c_1.ty,t.lg.na,t.ts[0].na,t.ts[1].na)'>
                                                    <div class="">
                                                        <div class="odds-line1 bold text-c">{{c_1.nm}}</div>
                                                        <div class="odds-line2 bold text-c" :class="{'odds-red':c_1.oddsStatus == 1,'odds-green':c_1.oddsStatus == 2}">{{parseFloat(c_1.od).toFixed(2)}}</div>
                                                    </div>
                                                </div>
                                                <div class="odds-box flex-c" v-for="(e,f) in oddsTypeNone" :key="f" v-if="c.mks[0].ss !== 1 && c.mty === 1010">
                                                    <div class="no-odds-icon el-icon-lock"></div>
                                                </div>
                                            </div>
                                            <div class="flex-c" v-if="t.hasJQ === undefined && oddsType === 3" @click.stop="showClosedPop()">
                                                <div class="odds-box flex-c" v-for="(g,h) in oddsTypeNone" :key="h">
                                                    <div class="no-odds-icon el-icon-lock"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-collapse-transition>
                    </div>
                </div>
            </div>
        </div>
        <!-- 体育投注入口，请暂时不要打开 -->
        <!-- <van-popup class="bet-pop-box" v-model="betPopShow" position="bottom">
            <betPopComponent v-if='betPopShow' @multiChange='multiChangeFn' @betPopSwitch='getBetPopSwitch'></betPopComponent>
        </van-popup>
        <div class="multi-count-pop flex-c" v-if='multiData && multiData.length > 0 && navIndex === 0' @click="routerFn('multiBet')">
            <div class="multi-count-box bold flex-c">
                串
                <div class="multi-icon flex-c">{{multiData.length}}</div>
            </div>
        </div> -->
        <div class="loading-new" v-if="showLoading">
            <img src="../../../static/images/allLoading.gif" alt="" />
        </div>
	</div>
</template>

<script>
import axios from "axios";
import dayjs from 'dayjs';
import betPopComponent from '../../../src/pages/home/betPopComponent.vue';
import noDataRed from "@/assets/lottie/noDataRed.json"
import {mapState} from 'vuex';
import $ from 'jquery'
export default {
	name: 'betComponent',
	components: {
		betPopComponent,
        noDataRed
	},
	data() {
		return {
			navIndex:1,
			mode_1_Index:0,
            sportsTypeData:[
                {
                    name:'足球',
                    num:99,
                },
                {
                    name:'篮球',
                    num:88,
                },
                {
                    name:'电子竞技',
                    num:77,
                },
                {
                    name:'乒乓球',
                    num:66,
                },
                {
                    name:'排球',
                    num:55,
                },
                {
                    name:'冰球',
                    num:44,
                }
            ],
            sportsTypeIndex:0,
            sortMode:'date',
            oddsType:0,
            switchAll:1,
            switchAll_2:1,
            matchListData:[],
            matchListData_old:[],
            matchListDataShow:[],
            betPopShow:false,
            multiData:[],
            noticeData:[],
            wordCupSwitch:false,
            fbNotice:[],
            fbToken:'',
            fbAppUrl:'',
            paramData:null,
            showLoading:false,
            oddsTypeNone:['',''],
            oddsTypeNone2:['','',''],
            favNum:0,
            betPopData:{},
            defaultOptions:{animationData:noDataRed,loop:true,autoplay:true},
            defaultAnim:'',
            gqNum:0,
            zpNum:0,
            championName:'',
            championTime:'',
            championIcon:'',
            championData:[],
            championMatchId:null,
            championLeagueName:'',
            sponsorUrl:this.API.wordCupSponsor,
            showSponsor:true,
		}
	},
	mounted() {
        // this.initFav()
        // this.getTokenInfo()
        this.switchNav(1)
        this.getFbData()
        this.multiData = JSON.parse(sessionStorage.getItem('multiData'))
    },
	created() {
        // this.$route.query.id
	},
    // computed: 
    //     mapState({
    //         multiData: state => state.common.multiData,
    //     }),
    beforeDestroy(){
        if(this.matchTimer){
            clearInterval(this.matchTimer);
        }
    },
	beforeRouteLeave(to, from, next) {  
        sessionStorage.setItem('fromHome','0')
		this.$destroy(true)
		next()
	},
	methods: {
        switchChampionDetail(val){
            
        },
        initIndex(){
            if(sessionStorage.getItem('homeMatchType') !== null){
                this.switchMode_1(parseInt(sessionStorage.getItem('homeMatchType')))
            }
        },
        quickBetFn(oddId,matchId,type,leagueName,home,away){
            // console.log(oddId)
            // console.log(matchId)
            // console.log(type)
            // console.log(leagueName)
            // console.log(home)
            // console.log(away)
            if(this.mode_1_Index === 0){
                // console.log(oddId)
                // console.log(matchId)
                // console.log(type)
                // console.log(leagueName)
                // console.log(home)
                // console.log(away)
                Object.assign(this.betPopData,{'oddsName':away})
                Object.assign(this.betPopData,{'leagueName':leagueName})
                Object.assign(this.betPopData,{'homeName':home})
                Object.assign(this.betPopData,{'marketId':oddId})
                Object.assign(this.betPopData,{'matchId':matchId})
                Object.assign(this.betPopData,{'oddsType':type})
            }else{
                if(this.oddsType === 0){
                    Object.assign(this.betPopData,{'oddsName':'大小'})
                }else if(this.oddsType === 1){
                    Object.assign(this.betPopData,{'oddsName':'让球'})
                }else if(this.oddsType === 2){
                    Object.assign(this.betPopData,{'oddsName':'独赢'})
                }else if(this.oddsType === 3){
                    Object.assign(this.betPopData,{'oddsName':'角球'})
                }
                Object.assign(this.betPopData,{'leagueName':leagueName})
                Object.assign(this.betPopData,{'homeName':home})
                Object.assign(this.betPopData,{'awayName':away})
                Object.assign(this.betPopData,{'marketId':oddId})
                Object.assign(this.betPopData,{'matchId':matchId})
                Object.assign(this.betPopData,{'oddsType':type})
            }
        },
        getFbData(){
            let params = {
                // limit:10,
                // version:this.API.paramVersion,
            }
			this.ServerAPI.postAPI(this.API.worldPrizeData,params,(success, data) => {
				if(success){
					if(data.code=='0000'){
                        // this.fbNotice = eval('(' + data.data + ')')
                        this.fbNotice = data.data.latest
					}else{
                        
                    }
				}else{

                }
			})
		},
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
                        // if(this.mode_1_Index == 0){
                            this.getChampion()
                        // }else{
                            this.getMatchList()
                        // }
                        this.getStatistical()
					} else {
						this.$toastTop(data.info,3)
					}
				} else {
                    // this.$toastTop('',2)
				}
			})
            this.matchTimer = setInterval(() => {
                this.getTokenInfo()
                // console.log(1)
            }, 6000);
        },
        getChampion(){
            let paramData = new FormData()
            paramData.append('token',this.fbToken)
            paramData.append('appUrl',this.fbAppUrl)
            paramData.append('requestBody', '{\"languageType\":\"CMN\",\"matchId\":446384}')
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            axios.post(this.API.getMatchDetail,paramData,config).then(res => {
                this.showLoading = false
                if (res.status == '200') {
                    if(res.data.code === '0000'){
                        this.championMatchId = res.data.data.id
                        this.championLeagueName = res.data.data.nm
                        this.championData = res.data.data.mg
                        this.championName = res.data.data.lg.na
                        this.championIcon = res.data.data.lg.lurl
                        this.championData.forEach(item => {
                            item.showDetail = true
                            if(item.mty === 1998) {
                                item.showDetail = true
                            }else{
                                item.showDetail = false
                            }
                        })
                        let M = dayjs(this.championData.bt).$M + 1
                        if(M < 10) {
                            M = '0' + M
                        }
                        let D = dayjs(this.championData.bt).$D
                        if(D < 10) {
                            D = '0' + D
                        }
                        let hour = dayjs(this.championData.bt).$H
                        if(hour < 10) {
                            hour = '0' + hour
                        }
                        let mnt = dayjs(this.championData.bt).$m
                        if(mnt < 10) {
                            mnt = '0' + mnt
                        }
                    }else{
                        this.$toastTop(res.data.info,3)
                    }
                } else {
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
            })
        },
        getStatistical(){
            let paramData = new FormData()
            paramData.append('token',this.fbToken)
            paramData.append('appUrl',this.fbAppUrl)
            paramData.append('requestBody', "{\"languageType\":\"CMN\"}")
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            axios.post(this.API.getStatistical,paramData,config).then(res => {
                if (res.status == '200'){
                    if(res.data.code === '0000'){
                        res.data.data.sl.forEach(item=>{
                            if(item.ty === 1){
                                item.ssl.forEach(item_1=>{
                                    if(item_1.sid === 1){
                                        this.gqNum = item_1.c
                                    }
                                })
                            }
                            if(item.ty === 4){
                                item.ssl.forEach(item_2=>{
                                    if(item_2.sid === 1){
                                        this.zpNum = item_2.c
                                    }
                                })
                            }
                        })
                    }
                }
            })
        },
        getMatchList(){
            let dateType
            if(this.mode_1_Index === 2) {
                dateType = 1
            }else if(this.mode_1_Index === 1){
                dateType = 4
            }
            this.paramData = new FormData()
            this.paramData.append('token',this.fbToken)
            this.paramData.append('appUrl',this.fbAppUrl)
            if(this.mode_1_Index == 1 || this.mode_1_Index == 2){
                this.paramData.append('requestBody', "{\"type\":" + dateType + ",\"languageType\":\"CMN\",\"sportId\":1,\"orderBy\":1}")
            }else if(this.mode_1_Index == 3){
                this.paramData.append('requestBody', "{\"languageType\":\"CMN\",\"sportId\":1,\"orderBy\":1,\"matchIds\":[" + sessionStorage.getItem('favData') + "]}")
            }else if(this.mode_1_Index == 0){
                return false
            }
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            axios.post(this.API.getMatchList,this.paramData,config).then(res => {
                this.showLoading = false
                if (res.status == '200') {
                    if(res.data.code === '0000'){
                        // 处理推荐玩法赔率变化展示
                        this.matchListData = res.data.data.records
                        if(this.matchListData_old.length == 0){
                            this.matchListData_old = this.matchListData
                        }else{
                            this.matchListData.forEach((item,index)=>{
                                this.matchListData_old.forEach((m,n)=>{
                                    if(item.id == m.id){
                                        item.mg.forEach((item_1,index_1)=>{
                                            m.mg.forEach((m_1,n_1)=>{
                                                if(item_1.mks[0].id == m_1.mks[0].id){
                                                    item_1.mks[0].op.forEach((item_2,index_2)=>{
                                                        m_1.mks[0].op.forEach((m_2,n_2)=>{
                                                            item_2.oddsStatus = 0
                                                            // console.log(m_1.mks[0])
                                                            if(item_2.od > m_1.mks[0].op[index_2].od){
                                                                item_2.oddsStatus = 1
                                                            }else if(item_2.od < m_1.mks[0].op[index_2].od){
                                                                item_2.oddsStatus =2
                                                            }
                                                        })

                                                    })
                                                }
                                            })
                                            

                                        })
                                    }
                                })

                            })
                        }
                        this.matchListDataShow = []
                        var temp = []
                        this.matchListData.forEach((item,index) => {
                            item.showDetail = true
                            item.isFav = false
                            if(sessionStorage.getItem('favData') !== null) {
                                let favData = sessionStorage.getItem('favData').split(',')
                                for(var t in favData){
                                    if(item.id == favData[t]){
                                        item.isFav = true
                                    }
                                }
                            }
                            //处理早盘时间
                            if(item.ms == 4) {
                                let M = dayjs(item.bt).$M + 1
                                if(M < 10) {
                                    M = '0' + M
                                }
                                let D = dayjs(item.bt).$D
                                if(D < 10) {
                                    D = '0' + D
                                }
                                let hour = dayjs(item.bt).$H
                                if(hour < 10) {
                                    hour = '0' + hour
                                }
                                let mnt = dayjs(item.bt).$m
                                if(mnt < 10) {
                                    mnt = '0' + mnt
                                }
                                item.btShow = M + '-' + D + ' ' + hour + ':' + mnt
                            }
                            //处理角球数据
                            try {
                                item.nsg.forEach((m,n)=>{
                                    if(m.tyg === 6){
                                        if(m.sc[0] !== 0 && m.sc[1] !== 0){
                                            item.corner = []
                                            item.corner.push('true')
                                            item.corner.push(m.sc[0] + '-' + m.sc[1])
                                            throw('')
                                        }
                                    }
                                })
                            }catch(e){
                            }
                            //处理半场得分
                            try {
                                item.nsg.forEach((a,b)=>{
                                    if(a.pe === 1002){
                                        item.halfScore = []
                                        item.halfScore.push('true')
                                        item.halfScore.push(a.sc[0] + '-' + a.sc[1])
                                        throw('')
                                    }
                                })
                            }catch(e){
                            }
                            //处理推荐玩法数据
                            item.mg.forEach((v) => {
                                v.hasDX = false
                                v.hasRQ = false
                                v.hasDY = false
                                v.hasJQ = false
                                if(v.mty === 1000) {
                                    item.hasRQ = true
                                }else if(v.mty === 1005){
                                    item.hasDY = true
                                }else if(v.mty === 1007){
                                    item.hasDX = true
                                }else if(v.mty === 1010){
                                    item.hasJQ = true
                                }
                            })
                            // 生成二维数组模式数据
                            if(temp.indexOf(item.lg.id) === -1){
                                temp.push(item.lg.id)
                                let tempArr = []
                                tempArr.push(item)
                                this.matchListDataShow.push(tempArr)
                            }else{
                                let tempIndex = temp.indexOf(item.lg.id)
                                this.matchListDataShow[tempIndex].push(item)
                            }
                        })
                        this.matchListData_old = this.matchListData
                        this.$forceUpdate()
                        
                        // console.log(this.matchListDataShow)
                    }else{
                        this.$toastTop(res.data.info,3)
                    }
                } else {
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
            })
        },
        initFav(){
            // let favData = sessionStorage.getItem('favData').split(',')
            if(sessionStorage.getItem('favData') === null){
                this.favNum = 0
            }else{
                if(sessionStorage.getItem('favData').indexOf(',') !== -1){
                    this.favNum = sessionStorage.getItem('favData').split(',').length
                }else{
                    this.favNum = 1
                }
            }

            
        },
        toMatchDetail(val,index){
            this.$router.push({
                path:'/matchDetail',
                query:{
                    id:this.matchListDataShow[index][val].id
                }
            })
        },
        routerFn(val){
            sessionStorage.setItem('homeNavIndex',1)
            this.$router.push('/' + val)
        },
        multiChangeFn(val){
            if(val === true){
                this.multiData = JSON.parse(sessionStorage.getItem('multiData'))
            }
        },
        getBetPopSwitch(val){
            if(val === false){
                this.betPopShow = false
            }
        },
        showBetPop(){
            this.betPopShow = true
            // this.getBalance()
        },
        switchFav(val,index,index_league){
            // console.log(this.matchListDataShow[index_league][index])
            if(val === 1){
                let temp = this.matchListDataShow[index_league]
                temp[index].isFav = true
                this.$set(this.matchListDataShow,index_league,temp)
                this.$toastTop('关注成功',1)
                if(sessionStorage.getItem('favData') === null){
                    let favData = []
                    favData.push(this.matchListDataShow[index_league][index].id + '')
                    favData.toString()
                    sessionStorage.setItem('favData',favData)
                }else{
                    let favData = sessionStorage.getItem('favData').split(',')
                    favData.push(this.matchListDataShow[index_league][index].id + '')
                    favData.toString()
                    sessionStorage.setItem('favData',favData)
                }
            }else{
                let temp = this.matchListDataShow[index_league]
                temp[index].isFav = false
                this.$set(this.matchListDataShow,index_league,temp)
                this.$toastTop('取消成功',3)
                let idVal = this.matchListDataShow[index_league][index].id + ''
                let favData = sessionStorage.getItem('favData').split(',')
                for(var item in favData){
                    if(idVal == favData[item]){
                        favData.splice(item,1)
                    }
                }
                if(favData.length === 0){
                    sessionStorage.removeItem('favData')
                }else{
                    favData.toString()
                    sessionStorage.setItem('favData',favData)
                }
            }
            this.initFav()
            // this.getTokenInfo()
        },
        switchDetail(val){
            if(this.mode_1_Index === 0){
                if(this.championData[val].showDetail === true){
                    console.log(1)
                    this.$set(this.championData[val],'showDetail',false)
                }else{
                    console.log(2)
                    this.$set(this.championData[val],'showDetail',true)
                }
            }else{
                if(this.matchListDataShow[val][0].showDetail === true) {
                    let temp = this.matchListDataShow[val]
                    temp[0].showDetail = false
                    this.$set(this.matchListDataShow,val,temp)
                }else{
                    let temp = this.matchListDataShow[val]
                    temp[0].showDetail = true
                    this.$set(this.matchListDataShow,val,temp)
                }
            }
            this.$forceUpdate()
        },
        switchAllDetail(val){
            if(this.mode_1_Index === 0){
                this.switchAll_2 = val
                if(val === 0){
                    this.championData.forEach(item => {
                        this.$set(item,'showDetail',false)
                    })
                }else{
                    this.championData.forEach(item => {
                        this.$set(item,'showDetail',true)
                    })
                }
            }else{
                this.switchAll = val
                if(val === 0){
                    this.matchListData.forEach(item => {
                        this.$set(item,'showDetail',false)
                    })
                }else{
                    this.matchListData.forEach(item => {
                        this.$set(item,'showDetail',true)
                    })
                }
            }
        },
        showClosedPop(){
            this.$toastTop('盘口已关闭',3)
        },
        switchOddsType(val){
            if(this.oddsType !== val){
                this.oddsType = val
                // this.betPopData = {}
            }
        },
        switchSort(val){
            if(this.sortMode !== val){
                this.sortMode = val
            }
        },
        switchSportsType(val){
            if(this.sportsTypeIndex !== val){
                this.sportsTypeIndex = val
            }
        },
        switchNav(val){
            if(this.navIndex !== val){
                if(val === 2){
                    sessionStorage.setItem('discountFromHome',true)
                    this.discountDetial(220,'discount')
                }else if(val === 3){
                    this.$router.push('/worldCupHot')
                }else if(val === 1){
                    // this.$router.push('/sponsorshipOne_worldcup')
                    this.navIndex = val
                    window.name = 'fromHome'
                    this.showSponsor = true
                }else if(val === 0){
                    this.initFav()
                    this.getTokenInfo()
                    this.navIndex = val
                    this.showSponsor = false
                }
                if(val !== 0) {
                    if(this.matchTimer){
                        clearInterval(this.matchTimer);
                    }
                }
            }
        },
        switchMode_1(val){
            if(this.mode_1_Index !== val){
                this.mode_1_Index = val
                this.matchListDataShow = []
                this.matchListData = []
                this.betPopData = {}
                sessionStorage.setItem('homeMatchType',val)
                this.getTokenInfo()
            }
        },
        discountDetial(value,type){
            let loginMark = this.loginToastFn()
            if(loginMark !== false){
                if(type === 'discount' ){
                    this.$router.push({name: 'discountOne', params: {id: value}});
                }
            }
        },
		handleAnimation(anim){
            this.defaultAnim = anim;
        },
	}
}
</script>
<style lang="scss" scoped>
.bet-component-content {
    margin-top: .1rem;
    .border-bg {
        width: calc(100% + .52rem);
        margin-left: -.26rem;
        height: 0.18rem;
        // background: #EEEEEE;
        overflow: hidden;
        .border-content {
            // background: #FFFFFF;
            height: 100%;
            width: 100%;
            // border-radius: 0 0 .2rem .2rem;
            border-bottom: #882533 2px solid;
        }
    }
    .notice-box {
        margin-top: .24rem;
        width: 100%;
        padding: 0 .2rem;
        background: #F2F2F2;
        border-radius: .4rem;
        height: 0.68rem;
        .van-notice-bar {
            padding: 0;
        }
        .notice-swipe {
            height: .5rem;
            line-height: .48rem;
            .van-swipe-item {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: .22rem;
            }
        }
    }
    .top-nav {
        padding: 0 .16rem;
        background: #F2F2F2;
        height: 0.8rem;
        width: calc(100% - .8rem);
        margin: .28rem auto 0;
        position: relative;
        z-index: 9;
        .top-nav-list {
            height: 0.6rem;
            font-size: .3rem;
            border-radius: .4rem;
            color: #494949;
            width: 25%;
            position: relative;
            z-index: 9;
        }
        .top-nav-line {
            width: 1px;
            height: 0.4rem;
            background: #A8B3C3;
            margin: 0 .26rem;
        }
        .top-nav-chosed {
            color: #FFFFFF;
            background: #9A1032;
        }
        .side-bg {
            position: absolute;
            height: 0.58rem;
            width: 0.58rem;
            background: #F2F2F2;
            z-index: 7;
            left: -.3rem;
            position: absolute;
            z-index: 7;
            transform: rotate(45deg);
        }
        .side-bg2 {
            left: unset;
            right: -.3rem;
        }
        .side-red {
            position: absolute;
            width: 0.24rem;
            height: 0.24rem;
            background: #A40F34;
            z-index: 8;
            left: -.1rem;
            transform: rotate(45deg);
        }
        .side-red2 {
            left: unset;
            right: -.04rem;
        }
    }
    .switch-content {
        width: 100vw;
        margin-left: -.26rem;
        background: #EEEEEE;
        padding-bottom: 1.2rem;
        .mode-1-nav {
            width: 100%;
            border-bottom: #EEEEEE 2px solid;
            padding-top: .1rem;
            background: #F0F0F0;
            .mode-1-nav-list {
                width: 1.8rem;
                height: 1.4rem;
                color: #888988;
                padding: .2rem;
                margin-bottom: -.12rem;
                .mode-1-nav-list-top {
                    font-size: .44rem;
                }
                .mode-1-nav-list-line {
                    width: 0.4rem;
                    height: 2px;
                    background: #888988;
                    margin: -.04rem auto;
                }
                .mode-1-nav-list-bottom {
                    margin-top: .08rem;
                    font-size: .3rem;
                }
            }
            .mode-1-nav-list-chosed {
                color: #FFFFFF;
                background: url(../../../static/images/word-cup-nav-bg.png) no-repeat;
                background-size: 100% 100%;
                // border: #EEEEEE 2px solid;
                // border-bottom: none;
                .mode-1-nav-list-line {
                    background: #FFFFFF;
                }
            }
            .mode-1-nav-line {
                width: 1px;
                height: 0.4rem;
                background: #C5CAD6;
                margin-top: .14rem;
            }
        }
        .sports-type-box {
            width: 100%;
            border-bottom: #EEEEEE 1px solid;
            padding: .16rem .1rem;
            overflow-x: auto;
            height: 1rem;
            white-space: nowrap;
            padding-right: .1rem;
            background: #FFFFFF;
            .sports-type-list {
                display: inline-block;
                background: #FAFAFA;
                height: 0.6rem;
                font-size: .26rem;
                border-radius: .4rem;
                margin-left: .1rem;
                line-height: .56rem;
                padding: 0 .2rem;
                border: #E3E3E3 1px solid;
            }
            .sports-type-list-chosed {
                background: linear-gradient(to right,#6AA2F4,#5585F1);
                color: #FFFFFF;
                border: none;
            }
        }
        .filtrate-content {
            height: 0.8rem;
            background: #FFFFFF;
            border-radius: 0 0 .16rem .16rem;
            box-shadow: 0px 1px 8px 2px rgba(0,0,0,.12);
            padding: 0 .2rem;
            .search-btn {
                width: 2rem;
                color: #393939;
                font-size: .24rem;
                height: 0.4rem;
                background: #FAFAFA;
                padding: 0 .14rem;
                border-radius: .4rem;
                border: 1px solid #EBEBEB;
                .search-icon {
                    margin-right: .1rem;
                    margin-top: .04rem;
                }
            }
            .search-line {
                width: 1px;
                height: 0.34rem;
                background: #C5CAD6;
            }
            .date-league {
                .date-league-list {
                    color: #808691;
                    font-size: .26rem;
                }
                .date-league-list-chosed {
                    font-size: .3rem;
                    font-weight: bold;
                    color: #437EFA;
                }
                .el-icon-sort-box {
                    font-size: .2rem;
                    margin: 0 .1rem;
                    color: #B3B3B6;
                    .el-icon-sort-up {
                        display: block;
                        transform: rotate(-90deg);
                    }
                    .el-icon-sort-down {
                        display: block;
                        transform: rotate(-90deg);
                        margin-top: -.14rem;
                    }
                    .el-icon-sort-chosed {
                        color: #437EFA;
                        font-weight: bold;
                    }
                }
            }
            .date-league-champion {
                width: calc(100% - 3rem);
                .champion-title-fonts {
                    width: 3.4rem;
                    color: #7C8591;
                    font-size: .26rem;
                }
            }
            .odds-type-box {
                // width: 4rem;
                .odds-type {
                    width: 3.2rem;
                    .odds-type-list {
                        color: #7C8591;
                        font-size: .3rem;
                        position: relative;
                    }
                    .odds-type-list:not(:first-child) {
                        margin-left: .16rem;
                    }
                    .odds-type-list-chosed {
                        color: #9A1032;
                    }
                    .odds-type-list-chosed::after {
                        position: absolute;
                        content: '';
                        width: 0.6rem;
                        height: 2px;
                        bottom: -.2rem;
                        left: 50%;
                        margin-left: -.3rem;
                        background: #9A1032;
                    }
                }
                .search-line {
                    margin-left: .2rem;
                }
            }

            .sort-by-icon {
                transform: rotate(90deg);
                color: #7F8590;
                font-size: .34rem;
                font-weight: bold;
                margin-left: .2rem;
            }
        }
        .match-content {
            margin-top: .2rem;
            min-height: 6rem;
            background: #EEEEEE;
            .content-loading {
                font-size: .58rem;
                color: #9A1032;
            }
            .match-list-box {
                background: #FFFFFF;
                border-radius: .16rem;
                padding: .1rem;
                margin-top: .1rem;
                .match-list-title {
                    padding: 0 .1rem .1rem;
                    border-bottom: #F0F0F0 1px solid;
                    .match-list-title-left {
                        .left-flag {
                            max-height: 0.4rem;
                            max-width: .4rem;
                            border-radius: 50%;
                        }
                        .left-league-name {
                            margin-left: .1rem;
                            color: #4B4B4B;
                            font-size: .28rem;
                        }
                    }
                    .match-list-title-right {
                        font-size: .3rem;
                    }
                }
                .match-list-detail {
                    padding: .16rem .1rem 0;
                    .match-list-detail-line1 {
                        .match-list-detail-line1-left {
                            height: 0.32rem;
                            width: 2.4rem;
                            border: #A6A6A6 1px solid;
                            // border: #598BF1 1px solid;
                            border-radius: .2rem;
                            position: relative;
                            z-index: 1;
                            overflow: hidden;
                            background: #FFFFFF;
                            .match-list-detail-line1-left-bg {
                                background: #A6A6A6;
                                // background: #598BF1;
                                width: 2.2rem;
                                height: 1.4rem;
                                transform: rotate(26deg);
                                position: absolute;
                                z-index: 2;
                                left: -.5rem;
                            }
                            .match-list-detail-line1-left-bg-blue {
                                background: #C82C48;
                            }
                            .match-list-detail-line1-left-fonts {
                                position: relative;
                                z-index: 3;
                                font-size: .2rem;
                                color: #FFFFFF;
                                padding-left: .1rem;
                                width: 1.84rem;
                            }
                            .match-list-detail-line1-left-icon {
                                position: relative;
                                z-index: 3;
                                color: #B8B8B8;
                                // color: #598BF1;
                                font-size: .2rem;
                                left: -.14rem;
                            }
                        }
                        .match-list-detail-line1-left-blue {
                            border: #C82C48 1px solid;
                        }
                        .match-list-detail-line1-right {
                            .right-fonts {
                                font-size: .22rem;
                                color: #777777;
                                margin-right: .2rem;
                            }
                            .right-icon {
                                color: #E5E5E5;
                                font-size: .28rem;
                            }
                            .right-icon-chosed {
                                color: #F0BC49;
                            }
                        }
                        .match-list-detail-line1-center {
                            font-size: .2rem;
                            width: 2.2rem;
                            .center-right {
                                margin-right: .4rem;
                            }
                            .center-fonts-1 {
                                color: #333333;
                            }
                            .center-fonts-2 {
                                color: #9C9C9C;
                            }
                            .center-left {
                                .center-logo {
                                    color: #9A1032;
                                }
                            }
                            .center-left-blank {
                                width: .8rem;
                            }
                        }
                    }
                    .match-list-detail-line2 {
                        margin-top: .1rem;
                        .match-list-detail-line2-left {
                            .team-box {
                                .team-logo {
                                    height: 0.28rem;
                                }
                                .team-name {
                                    font-size: 0.28rem;
                                    color: #333333;
                                    margin-left: .1rem;
                                }
                            }
                        }
                        .match-list-detail-line2-right {
                            .odds-box {
                                width: 1.68rem;
                                background: rgba(246,247,248,0.8);
                                border-radius: .1rem;
                                height: 1rem;
                                .odds-line1 {
                                    color: #7C8591;
                                    font-size: .26rem;
                                }
                                .odds-line2 {
                                    color: #393939;
                                    font-size: .34rem;
                                    margin-top: -.06rem;
                                }
                                .odds-red {
                                    color: #C10021;
                                }
                                .odds-green {
                                    color: #20B62B;
                                }
                                .no-odds-icon {
                                    font-size: .34rem;
                                    color: #A0A0A0;
                                }
                            }
                            .odds-box:not(:first-child) {
                                margin-left: .14rem;
                            }
                            .odds-box2 {
                                width: 1.12rem;
                            }
                            .match-score-box {
                                color: #333333;
                                font-size: .3rem;
                                margin-right: .2rem;
                            }
                        }
                    }
                }
                .champion-list-box {
                    padding: .1rem .2rem;
                    margin-top: .1rem;
                    .champion-list {
                        .champion-list-left {
                            color: #000000;
                            font-size: .28rem;
                        }
                        .champion-list-right {
                            color: #393939;
                            font-size: .3rem;
                        }
                    }
                    .champion-list:not(:last-child) {
                        margin-bottom: .1rem;
                    }
                }
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
            border: #1D9DFC 1px solid;
            .multi-icon {
                position: absolute;
                height: 0.26rem;
                width: 0.26rem;
                border-radius: 50%;
                background: #1D9DFC;
                font-size: .2rem;
                top: -.1rem;
                right: -.1rem;
            }
            
        }
    }
}
.bet-pop-box {
    background-color: unset;
}
// .bet-pop-box {
//     background-color: unset;
//     .bet-pop-title {
//         background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
//         height: 0.8rem;
//         color: #FFFFFF;
//         font-size: .32rem;
//         padding: 0 .2rem;
//         .bet-pop-title-right {
//             .one-key {
//                 height: 0.48rem;
//                 border-radius: .3rem;
//                 width: 1.4rem;
//                 color: #1D9DFC;
//                 background: #FFFFFF;
//                 font-size: .26rem;
//                 margin-right: .1rem;
//             }
//             .balance-show {
//                 font-size: .34rem;
//                 margin-right: .1rem;
//             }
//             .refresh-btn {
//                 font-weight: bold;
//                 font-size: .3rem;
//             }
//         }
//     }
//     .bet-pop-detail {
//         padding: .2rem .2rem .4rem;
//         background: #F7F7F7;
//         position: relative;
//         .bet-pop-detail-left {
//             width: 70%;
//         }
//         .bet-pop-detail-right {
//             width: 30%;
//         }
//         .bet-pop-detail-side-fonts1 {
//             font-size: .32rem;
//             height: 0.52rem;
//         }
//         .bet-pop-detail-side-fonts2 {
//             font-size: .28rem;
//             color: #ADB2BA;
//             // margin-top: .06rem;
//         }
//         .bet-pop-detail-side-fonts3 {
//             font-size: .28rem;
//             color: #7C8591;
//         }
//         .bet-pop-detail-side-fonts4 {
//             font-size: .32rem;
//             height: 0.52rem;
//         }
//         .bet-pop-detail-side-fonts5 {
//             font-size: .42rem;
//         }
//         .text-r {
//             text-align: right;
//         }
//         .bottom-seconds {
//             position: absolute;
//             bottom: 0;
//             right: 0;
//             background: #E6E8EE;
//             transform: skewX(-30deg);
//             width: .8rem;
//             height: 0.38rem;
//             color: #7C8591;
//             .bottom-seconds-fonts {
//                 transform: skewX(30deg);
//             }
//         }
//     }
//     .input-box {
//         padding: .2rem;
//         .input-box-title {
//             font-size: .3rem;
//             .input-box-title-left {
//             }
//             .input-box-title-right {
//                 color: #ADB2BA;
//                 font-size: .3rem;
//                 .limit-fonts {
//                     font-size: .32rem;
//                 }
//             }
//         }
//         .input-line {
//             width: 100%;
//             height: 0.8rem;
//             margin-top: .06rem;
//             .input-line-left {
//                 width: 76%;
//                 height: 100%;
//                 border: #78BDF2 1px solid;
//                 border-radius: .1rem;
//                 padding: 0 .16rem;
//                 .input-line-left-mark {
//                     font-size: .34rem;
//                 }
//                 .input-line-left-num {
//                     color: #ADB2BA;
//                     font-size: .28rem;
//                     margin-left: .1rem;
//                 }
//                 .cash-pass {
//                     color: #000000;
//                     font-size: .34rem;
//                 }
//                 .cash-disable {
//                     color: #E90619;
//                     font-size: .34rem;
//                 }
//             }
//             .red-border {
//                 border: #E90619 1px solid;
//             }
//             .input-line-right {
//                 border-radius: .1rem;
//                 font-size: .32rem;
//                 height: 100%;
//                 color: #FFFFFF;
//                 width: calc(24% - 0.1rem);
//                 background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
//             }
//         }
//     }
//     .click-box {
//         padding: .04rem .2rem .2rem;
//         .click-box-left {
//             width: 76%;
//             flex-wrap: wrap;
//             background: #EEEEEE;
//             padding: .06rem .06rem 0;
//             border-radius: .1rem;
//             .left-num-list {
//                 border-radius: .1rem;
//                 background: #FFFFFF;
//                 width: calc((100% - .12rem)/3);
//                 height: 0.78rem;
//                 margin-bottom: .06rem;
//                 font-size: .34rem;
//                 font-weight: bold;
//                 .input-back {
//                     height: 0.3rem;
//                 }
//             }
//             .left-num-list:nth-child(2), 
//             .left-num-list:nth-child(5),
//             .left-num-list:nth-child(8),
//             .left-num-list:nth-child(11)
//             {
//                 margin: 0 .06rem .06rem; 
//             }
//         }
//         .click-box-right {
//             width: calc(24% - 0.1rem);
//             padding: .06rem .06rem 0;
//             border-radius: .1rem;
//             background: #EEEEEE;
//             .right-num-list {
//                 width: 100%;
//                 height: 0.78rem;
//                 margin-bottom: .06rem;
//                 font-size: .34rem;
//                 border-radius: .1rem;
//                 background: #FFFFFF;
//                 color: #78BDF2;
//             }
//         }
//     }
//     .bottom-box {
//         padding: .04rem .2rem .2rem;
//         .to-multi {
//             background: #EEEEEE;
//             color: #1D9DFC;
//             font-size: .3rem;
//             border-radius: .1rem;
//             width: 1.6rem;
//             height: 0.8rem;
//         }
//         .bet-btn {
//             color: #7C8591;
//             border-radius: .1rem;
//             background: #DDDDDE;
//             width: calc(100% - 1.8rem);
//             height: 0.8rem;
//             .bet-btn-fonts1 {
//                 color: #303030;
//                 font-size: .34rem;
//             }
//             .bet-btn-fonts2 {
//                 font-size: .26rem;
//                 margin-left: .1rem;
//             }
//             .bet-btn-fonts3 {
//                 font-size: .28rem;
//             }
//             .bet-btn-fonts4 {
//                 color: #303030;
//                 font-size: .3rem;
//             }
//         }
//         .bet-btn-enable {
//             background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
//             color: #FFFFFF;
//             .bet-btn-fonts1 {
//                 color: #FFFFFF;
//             }
//         }
//     }
// }
.iframe-box {
    width: calc(100% + .52rem);
    margin-left: -.26rem;
    // background: #000000;
    height: calc(100vh - 4.2rem);
    position: relative;
    margin-top: 0rem;
    overflow: hidden;
    #urlIframe {
        height: 13rem;
    }
}

</style>
