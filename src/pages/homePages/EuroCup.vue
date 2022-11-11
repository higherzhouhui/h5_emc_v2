<template>
    <div class="euro-cup-content" ref="pageScrollValue">
<!--        <HeaderTop :title="`欧洲杯竞猜`" ></HeaderTop>-->
        <img src="../../../static/images/back-icon-white.png" alt="" class="top-arrow" @click="toBack()">
        <img src="../../../static/images/euro-cup-top.png" alt="" class="top-img">
        <div class="tab-box">
            <div class="tab-top">
                <div class="tab-top-left">
                    <div class="tab-top-list" :class="topTab === 1?'tab-top-list-active':''" @click="topTabSwitch(1)">
                        <div class="line1">小组赛</div>
                        <div class="line2">6/12-6/24</div>
                        <div class="active-arrow" v-if="topTab === 1"></div>
                    </div>
                    <div class="tab-top-list" :class="topTab === 2?'tab-top-list-active':''" @click="topTabSwitch(2)">
                        <div class="line1">淘汰赛</div>
                        <div class="line2">6/27-7/12</div>
                        <div class="active-arrow" v-if="topTab === 2"></div>
                    </div>
                </div>
                <div class="green-line"></div>
                <div class="tab-top-right">
                    <div class="tab-top-list2" @click="pageScroll(1)">竞猜奖金</div>
                    <div class="tab-top-list2" @click="pageScroll(2)">竞猜规则</div>
                </div>
            </div>
            <div class="tab-bottom" ref="scrollValue">
                <div class="tab-bottom-list-box" id="scrollBox">
                    <div class="tab-bottom-list" id="scrollLeft11" :class="bottomTab === 12?'tab-bottom-list-active':''" @click="bottomTabSwitch(12,6,1)">06/12</div>
                    <div class="green-line2" v-if="bottomTab !== 12 && bottomTab !== 13"></div>
                    <div class="tab-bottom-list" id="scrollLeft13" :class="bottomTab === 13?'tab-bottom-list-active':''" @click="bottomTabSwitch(13,6,1)">06/13</div>
                    <div class="green-line2" v-if="bottomTab !== 13 && bottomTab !== 14"></div>
                    <div class="tab-bottom-list" id="scrollLeft14" :class="bottomTab === 14?'tab-bottom-list-active':''" @click="bottomTabSwitch(14,6,1)">06/14</div>
                    <div class="green-line2" v-if="bottomTab !== 14 && bottomTab !== 15"></div>
                    <div class="tab-bottom-list" id="scrollLeft15" :class="bottomTab === 15?'tab-bottom-list-active':''" @click="bottomTabSwitch(15,6,1)">06/15</div>
                    <div class="green-line2" v-if="bottomTab !== 15 && bottomTab !== 16"></div>
                    <div class="tab-bottom-list" id="scrollLeft16" :class="bottomTab === 16?'tab-bottom-list-active':''" @click="bottomTabSwitch(16,6,1)">06/16</div>
                    <div class="green-line2" v-if="bottomTab !== 16 && bottomTab !== 17"></div>
                    <div class="tab-bottom-list" id="scrollLeft17" :class="bottomTab === 17?'tab-bottom-list-active':''" @click="bottomTabSwitch(17,6,1)">06/17</div>
                    <div class="green-line2" v-if="bottomTab !== 17 && bottomTab !== 18"></div>
                    <div class="tab-bottom-list" id="scrollLeft18" :class="bottomTab === 18?'tab-bottom-list-active':''" @click="bottomTabSwitch(18,6,1)">06/18</div>
                    <div class="green-line2" v-if="bottomTab !== 18 && bottomTab !== 19"></div>
                    <div class="tab-bottom-list" id="scrollLeft19" :class="bottomTab === 19?'tab-bottom-list-active':''" @click="bottomTabSwitch(19,6,1)">06/19</div>
                    <div class="green-line2" v-if="bottomTab !== 19 && bottomTab !== 20"></div>
                    <div class="tab-bottom-list" id="scrollLeft20" :class="bottomTab === 20?'tab-bottom-list-active':''" @click="bottomTabSwitch(20,6,1)">06/20</div>
                    <div class="green-line2" v-if="bottomTab !== 20 && bottomTab !== 21"></div>
                    <div class="tab-bottom-list" id="scrollLeft21" :class="bottomTab === 21?'tab-bottom-list-active':''" @click="bottomTabSwitch(21,6,1)">06/21</div>
                    <div class="green-line2" v-if="bottomTab !== 21 && bottomTab !== 22"></div>
                    <div class="tab-bottom-list" id="scrollLeft22" :class="bottomTab === 22?'tab-bottom-list-active':''" @click="bottomTabSwitch(22,6,1)">06/22</div>
                    <div class="green-line2" v-if="bottomTab !== 22 && bottomTab !== 23"></div>
                    <div class="tab-bottom-list" id="scrollLeft23" :class="bottomTab === 23?'tab-bottom-list-active':''" @click="bottomTabSwitch(23,6,1)">06/23</div>
                    <div class="green-line2" v-if="bottomTab !== 23 && bottomTab !== 24"></div>
                    <div class="tab-bottom-list" id="scrollLeft24" :class="bottomTab === 24?'tab-bottom-list-active':''" @click="bottomTabSwitch(24,6,1)">06/24</div>
                    <div class="green-line2" v-if="bottomTab !== 24 && bottomTab !== 27"></div>
                    <div class="tab-bottom-list" id="scrollLeft27" :class="bottomTab === 27?'tab-bottom-list-active':''" @click="bottomTabSwitch(27,6,2)">06/27</div>
                    <div class="green-line2" v-if="bottomTab !== 27 && bottomTab !== 28"></div>
                    <div class="tab-bottom-list" id="scrollLeft28" :class="bottomTab === 28?'tab-bottom-list-active':''" @click="bottomTabSwitch(28,6,2)">06/28</div>
                    <div class="green-line2" v-if="bottomTab !== 28 && bottomTab !== 29"></div>
                    <div class="tab-bottom-list" id="scrollLeft29" :class="bottomTab === 29?'tab-bottom-list-active':''" @click="bottomTabSwitch(29,6,2)">06/29</div>
                    <div class="green-line2" v-if="bottomTab !== 29 && bottomTab !== 30"></div>
                    <div class="tab-bottom-list" id="scrollLeft30" :class="bottomTab === 30?'tab-bottom-list-active':''" @click="bottomTabSwitch(30,6,2)">06/30</div>
                    <div class="green-line2" v-if="bottomTab !== 30 && bottomTab !== 3"></div>
                    <div class="tab-bottom-list" id="scrollLeft3" :class="bottomTab === 3?'tab-bottom-list-active':''" @click="bottomTabSwitch(3,7,2)">07/03</div>
                    <div class="green-line2" v-if="bottomTab !== 3 && bottomTab !== 4"></div>
                    <div class="tab-bottom-list" id="scrollLeft4" :class="bottomTab === 4?'tab-bottom-list-active':''" @click="bottomTabSwitch(4,7,2)">07/04</div>
                    <div class="green-line2" v-if="bottomTab !== 4 && bottomTab !== 7"></div>
                    <div class="tab-bottom-list" id="scrollLeft7" :class="bottomTab === 7?'tab-bottom-list-active':''" @click="bottomTabSwitch(7,7,2)">07/07</div>
                    <div class="green-line2" v-if="bottomTab !== 7 && bottomTab !== 8"></div>
                    <div class="tab-bottom-list" id="scrollLeft8" :class="bottomTab === 8?'tab-bottom-list-active':''" @click="bottomTabSwitch(8,7,2)">07/08</div>
                    <div class="green-line2" v-if="bottomTab !== 8 && bottomTab !== 122"></div>
                    <div class="tab-bottom-list" id="scrollLeft12" :class="bottomTab === 122?'tab-bottom-list-active':''" @click="bottomTabSwitch(12,7,2)">07/12</div>
                </div>
            </div>
        </div>
        <div class="match-content">
            <img src="../../../static/images/euro-cup-title.png" alt="" class="match-content-title">
            <div class="match-content-list" v-for="(item,index) in matchData" :key="index" v-if="matchBegin">
                <div class="match-content-list-title">
                    <img src="../../../static/images/euro-cup-title-left.png" alt="" class="title-left">
                    <div class="title-right">
                        <div class="title-right-top">Q: {{item.question}}</div>
                        <div class="title-right-bottom">{{item.begin}}</div>
                    </div>
                </div>
                <div class="match-content-list-team">
                    <div class="team-side" :class="[item.answerUser === 'A' && item.type === 0?'dark-gray-bg':'',item.answerUser === 'A' && item.type === 2?'answer-chosed':'',item.type === 0?'gray-bg':'',item.type === 3 && item.answerUser === 'A'?'dark-gray-bg':'',item.type === 3 && item.answerUser === 'B'?'gray-bg':'',item.type === 4 && item.answerUser === 'A'?'dark-gray-bg':'',item.type === 4 && item.answerUser === 'B'?'gray-bg':'']">
                        <img :src="item.homeLogo" alt="" class="team-icon" v-if="item.selectHasLogo === true">
                        <div class="team-name" v-if="item.type === 1" :class="item.selectHasLogo === false?'team-name-center':''" @click="chosingSub(item.selectA,item.id,'A')">{{item.selectA}}</div>
                        <div class="team-name" v-if="item.type === 2" :class="item.selectHasLogo === false?'team-name-center':''" @click="showSubAlert">{{item.selectA}}</div>
                        <div class="team-name" v-if="item.type !== 1 && item.type !== 2" :class="[item.selectHasLogo === false?'team-name-center':'']">{{item.selectA}}</div>
                        <img src="../../../static/images/euro-cup-is-win.png" v-if="item.answerUser === 'A' && item.type === 3" alt="" class="win-lose">
                        <img src="../../../static/images/euro-cup-is-lose.png" v-if="item.answerUser === 'A' && item.type === 4" alt="" class="win-lose">
                    </div>
                    <div class="team-side" :class="[item.answerUser === 'B' && item.type === 0?'dark-gray-bg':'',item.answerUser === 'B' && item.type === 2?'answer-chosed':'',item.type === 0?'gray-bg':'',item.type === 3 && item.answerUser === 'B'?'dark-gray-bg':'',item.type === 3 && item.answerUser === 'A'?'gray-bg':'',item.type === 4 && item.answerUser === 'B'?'dark-gray-bg':'',item.type === 4 && item.answerUser === 'A'?'gray-bg':'']">
                        <div class="team-name" v-if="item.type === 1" :class="item.selectHasLogo === false?'team-name-center':''" @click="chosingSub(item.selectB,item.id,'B')">{{item.selectB}}</div>
                        <div class="team-name" v-if="item.type === 2" :class="item.selectHasLogo === false?'team-name-center':''" @click="showSubAlert">{{item.selectB}}</div>
                        <div class="team-name" v-if="item.type !== 1 && item.type !== 2" :class="[item.selectHasLogo === false?'team-name-center':'']">{{item.selectB}}</div>
                        <img :src="item.awayLogo" alt="" class="team-icon" v-if="item.selectHasLogo === true">
                        <img src="../../../static/images/euro-cup-is-win.png" v-if="item.answerUser === 'B' && item.type === 3" alt="" class="win-lose win-lose2">
                        <img src="../../../static/images/euro-cup-is-lose.png" v-if="item.answerUser === 'B' && item.type === 4" alt="" class="win-lose win-lose2">
                    </div>
                </div>
            </div>
            <div class="match-watting" v-if="!matchBegin">
                <div class="match-watting-title">距离竞猜</div>
                <div class="time-show">
                    <div class="number">{{days}}</div>
                    <div class="fonts">天</div>
                    <div class="number">{{hours}}</div>
                    <div class="fonts">时</div>
                    <div class="number">{{minutes}}</div>
                    <div class="fonts">分</div>
                </div>
            </div>
        </div>
        <div class="match-content match-content2" id="content2">
            <img src="../../../static/images/euro-cup-left-icon.png" alt="" class="left-coin-icon">
            <img src="../../../static/images/euro-cup-right-icon.png" alt="" class="right-coin-icon">
            <img src="../../../static/images/euro-cup-title2.png" alt="" class="match-content-title">
            <div class="update-fonts" v-if="showUpdate === true">更新于 {{updateTime}}</div>
            <div class="result-area">
                <div class="result-area-line1">今日奖金</div>
                <div class="result-area-line2">¥{{bonusTotal}}</div>
                <div class="result-area-line3">
                    <div class="result-area-fonts">{{numTotal}}人</div>
                    <div class="result-area-fonts">
                        ￥{{betTotal}}
                        <img src="../../../static/images/euro-cup-more.png" alt="" class="more-icon" @click="rulesPopup2 = true">
                    </div>
                </div>
            </div>
            <div class="result-area2">
                <div class="result-area2-list-box">
                    <div class="result-area2-list">
                        <div class="result-area2-list-top">
                            个人投注金额(￥)
                            <img src="../../../static/images/euro-cup-more.png" alt="" class="more-icon" @click="rulesPopup = true">
                        </div>
                        <div class="result-area2-list-bottom">{{betMe}}</div>
                    </div>
                    <div class="result-area2-list">
                        <div class="result-area2-list-top">
                            个人中奖金额(￥)
                            <img src="../../../static/images/euro-cup-more.png" alt="" class="more-icon" @click="rulesPopup3 = true">
                            <div class="status-fonts" v-if="prizeStatus === 2">已派发</div>
                            <div class="status-fonts status-fonts2" v-if="prizeStatus === 0">未开奖</div>
                            <div class="status-fonts status-fonts2" v-if="prizeStatus === 3">未参与</div>
                            <div class="status-fonts status-fonts3" v-if="prizeStatus === 1">未中奖</div>
                        </div>
                        <div class="result-area2-list-bottom">{{bonusMe}}</div>
                    </div>
                </div>
                <div class="result-area2-list-box">
                    <div class="result-area2-list">
                        <div class="result-area2-list-top">
                            中奖人数(人)
                        </div>
                        <div class="result-area2-list-bottom">{{numBonus}}</div>
                    </div>
                    <div class="result-area2-list">
                        <div class="result-area2-list-top">
                            中奖总投注额(￥)
                        </div>
                        <div class="result-area2-list-bottom">{{betOver}}</div>
                    </div>
                </div>

            </div>
        </div>
        <div class="match-content match-content3">
            <img src="../../../static/images/euro-cup-title3.png" alt="" class="match-content-title">
            <div class="result-list-box">
                <vue-seamless-scroll :data="columns" :class-option="optionHover">
                    <div class="prize-list" v-for="(item,index) in columns" :key="index">
                        <div class="">{{item.userName}}</div>
                        <div class="">￥{{item.bonus}}</div>
                    </div>
                </vue-seamless-scroll>
            </div>
        </div>
        <div class="match-content match-content4" id="content4">
            <img src="../../../static/images/euro-cup-title4.png" alt="" class="match-content-title">
            <div class="rules-content-list">
                <div class="fonts">1.当日三题竞猜全中者才可依照投注金额瓜分当日100万奖金。</div>
            </div>
            <div class="rules-content-list">
                <div class="fonts">2.奖池只计算【EMC体育】场馆内赔率香港盘≥0.5（欧洲盘≥1.5）的欧洲杯赛事任何玩法为有效投注额。</div>
            </div>
            <div class="rules-content-list">
                <div class="fonts">※每累积一位会员参加本活动，系统将统计该会员当日【EMC体育】场馆的投注额至奖金池。投注其他体育场馆的投注额无效。</div>
            </div>
            <div class="rules-content-list">
                <div class="fonts">3.彩金计算：个人中奖金额=个人EMC场馆欧洲杯赛事投注额/中奖者EMC场馆欧洲杯赛事总投注额*100万。</div>
            </div>
            <div class="rules-content-list">
                <div class="fonts">4.彩金申请：无需申请，竞猜彩金将于隔日14:00至16:00结算完毕并自动派发。</div>
            </div>
            <div class="rules-content-list">
                <div class="fonts">5.竞猜后不可更改竞猜答案，竞猜赛事开赛后关闭本场赛事竞猜。</div>
            </div>
            <div class="rules-content-list">
                <div class="fonts">6.本活动彩金仅限体育投注，一倍流水出款。</div>
            </div>
            <div class="rules-content-list">
                <div class="fonts">7.会员在此优惠活动未完成有效流水前，转账到其他平台，将扣除所有彩金及其盈利。</div>
            </div>
            <div class="rules-content-list">
                <div class="fonts">8.参与该活动会员必须接受及遵循上述规则与条款，并接受EMC易倍使用的红利优惠一般相关规则与条款。</div>
            </div>
            <div class="rules-content-list">
                <div class="fonts">9.EMC易倍保留对此活动做出更改、终止的权利，并享有最终解释权。</div>
            </div>

        </div>
        <img src="../../../static/images/euro-cup-toTop.png" alt="" class="euro-cup-toTop" v-if="showTop" @click="toTop">
        <van-popup v-model="subPopup" class="sub-popup">
            <div class="popup-content">
                <div class="popup-content-line1">您选择{{chosingValue}},是否确认?</div>
                <div class="popup-content-line2">确认后不得更改</div>
            </div>
            <div class="bottom-box">
                <div class="bottom-btn cancel" @click="subPopup = false">取消</div>
                <div class="bottom-btn confirm" @click="subJoin()">确定</div>
            </div>
        </van-popup>
        <van-popup v-model="rulesPopup" class="rules-popup" :overlay-style="{backgroundColor:'rgba(0,0,0,0)'}">
            奖池只计算【EMC体育】场馆内，当日个人投注欧洲杯任何赛事且赔率香港盘≥0.5（欧洲盘≥1.5）为有效投注额。
        </van-popup>
        <van-popup v-model="rulesPopup2" class="rules-popup" :overlay-style="{backgroundColor:'rgba(0,0,0,0)'}">
            【EMC体育】<br>
            人数&总投注额
        </van-popup>
        <van-popup v-model="rulesPopup3" class="rules-popup" :overlay-style="{backgroundColor:'rgba(0,0,0,0)'}">
            个人中奖金额=个人EMC场馆欧洲杯赛事投注额/中奖者EMC场馆欧洲杯赛事总投注额*100万。
        </van-popup>
    </div>
</template>
<script>
import HeaderTop from '../../components/top/top';
import {Toast} from 'vant'
import { vanPopover } from 'vant';
export default {
    name:'EuroCup',
    components:{
        HeaderTop,

    },
    data(){
        return{
            topTab:1,
            bottomTab:12,
            bottomTab2:1,
            subPopup:false,
            rulesPopup:false,
            rulesPopup2:false,
            rulesPopup3:false,
            matchData:[],
            matchPrizeData:[],
            columns:[],
            queryDate:'2021-06-12',
            chosingValue:'',
            updateTime:'',
            answer:'',
            matchBegin:true,
            days:'',
            hours:'',
            minutes:'',
            prizeStatus:-1,
            showTop:false,
            bonusTotal:'',
            betTotal:'',
            numBonus:0,
            numTotal:0,
            betMe:'',
            bonusMe:'',
            betOver:'',
            showUpdate:true,
        }
    },
    created(){
    },
    mounted(){
        this.handleDateScroll()
        this.getMatchInfo()
        this.getMatchPrize()
        this.loadTop()
        window.addEventListener('scroll', this.handleScroll,true)
    },
    beforeRouteLeave (to, from, next) {
        window.removeEventListener("scroll", this.handleScroll, true)
        if (this.timer) {
            clearInterval(this.timer)
        }
        this.$destroy(true)
        next()
    },
    computed: {
        optionHover () {
            return {
                hoverStop: false, //是否悬停
                singleHeight:.6,  // 单行停顿
                watiTime:1000,
                switchDelay:1000,
                isSingleRemUnit:true
            }
        }
    },
    methods: {
        toBack(){
            this.$router.back()
        },
        handleDateScroll(){
            let initScroll = new Date().getDate()
            let month = new Date().getMonth() + 1
            let index
            // month === 6? index = 1:index = 2
            if(month === 6 && initScroll < 27){
                index = 1
            }else{
                index = 2
            }
            if((month === 6 && initScroll === 25) || (month === 6 && initScroll === 26)){
                initScroll = 24
            }else if((month === 7 && initScroll === 1) || (month === 7 && initScroll === 2)){
                month = 6
                initScroll = 30
            }else if((month === 7 && initScroll === 5) || (month === 7 && initScroll === 6)){
                initScroll = 4
            }else if((month === 7 && initScroll === 9) || (month === 7 && initScroll === 10) || (month === 7 && initScroll === 11)){
                initScroll = 8
            }else if(month >= 7 && initScroll >12){
                month = 7
                initScroll = 12
            }
            this.$nextTick(()=>{
                this.$refs.scrollValue.scrollTo(document.getElementById('scrollLeft' + initScroll).offsetLeft,0)
            })
            this.bottomTabSwitch(initScroll,month,index)
        },
        handleScroll () {
            let scrollY = document.documentElement.scrollTop
            if (scrollY > 200) {
                this.showTop = true
            } else {
                this.showTop = false
            }
        },
        loadTop(){
            let _this = this
            _this.timer = setInterval( ()=> {
                this.getMatchInfo()
                this.getMatchPrize()
            }, 30000)
        },
        getMatchInfo() {
            this.matchData = []
            let params = {
                issue:this.queryDate
            }
            this.ServerAPI.postAPI(this.API.eurocupList, params, (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.matchBegin = true
                        this.matchData = data.data
                    }else if(data.code === '9002'){
                        this.matchBegin = false
                    }else{
                        Toast(data.info)
                    }
                }
            })
        },
        getMatchPrize(){
            this.columns = []
            let params = {
                issue:this.queryDate
            }
            this.ServerAPI.postAPI(this.API.eurocupBonus, params, (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.matchPrizeData = data.data
                        this.bonusTotal = this.matchPrizeData.bonusTotal.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                        this.betTotal = this.matchPrizeData.betTotal.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                        this.betMe = this.matchPrizeData.betMe.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                        this.bonusMe = this.matchPrizeData.bonusMe.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                        this.betOver = this.matchPrizeData.betOver.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                        this.numBonus = (this.matchPrizeData.numBonus + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                        this.numTotal = (this.matchPrizeData.numTotal + '').replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,')
                        this.prizeStatus = data.data.type
                        this.columns = data.data.limit
                        if(this.columns.length === 0) {
                            this.columns = [
                                {
                                    userName:'-',
                                    bonus:'-'
                                },
                                {
                                    userName:'-',
                                    bonus:'-'
                                },
                                {
                                    userName:'-',
                                    bonus:'-'
                                },
                                {
                                    userName:'-',
                                    bonus:'-'
                                },
                                {
                                    userName:'-',
                                    bonus:'-'
                                },
                                {
                                    userName:'-',
                                    bonus:'-'
                                },
                            ]
                        }
                        this.columns.sort(function(x, y){return parseFloat(y.bonus) - parseFloat(x.bonus)});
                        this.updateTime = data.data.lastTime.slice(14)
                        if(this.updateTime === '00:00'){
                            this.showUpdate = false
                        }
                        this.days = parseInt(Math.abs(data.data.second) / (3600 * 24))
                        this.hours = parseInt((Math.abs(data.data.second) - this.days * 3600 * 24) / 60 / 60)
                        this.minutes = parseInt((Math.abs(data.data.second) - this.days * 3600 * 24 - this.hours * 3600) / 60)
                    }else{
                        Toast(data.info)
                    }
                }
            })
        },
        showSubAlert(){
              Toast('已确认无法修改')
        },
        subJoin(){
            let params = {
                id:this.id,
                answer:this.answer
            }
            this.ServerAPI.postAPI(this.API.eurocupAnswer, params, (success, data) => {
                this.subPopup = false
                if(success){
                    if(data.code === '0000'){
                        Toast('提交成功');
                        this.getMatchInfo()
                        this.getMatchPrize()
                    }
                }
            })
        },
        topTabSwitch(value){
            this.topTab = value
            if(value === 1){
                this.$nextTick(()=>{
                    this.$refs.scrollValue.scrollTo(0,0)
                })
            }else if(value === 2){
                this.$nextTick(()=>{
                    this.$refs.scrollValue.scrollTo(document.getElementById('scrollLeft27').offsetLeft,0)
                })
            }
        },
        bottomTabSwitch(value,mon,index){
            if(value === 12 && mon === 7){
                this.bottomTab = 122
            }else{
                this.bottomTab = value
            }
            if(mon === 6){
                this.queryDate = '2021-' + '06-' + value
            }else if(mon === 7){
                if(value < 10){
                    this.queryDate = '2021-' + '07-0' + value
                }else{
                    this.queryDate = '2021-' + '07-' + value
                }
            }
            this.topTab = index
            this.getMatchInfo()
            this.getMatchPrize()

        },
        chosingSub(value,id,answer){
            this.subPopup = true
            this.chosingValue = value
            this.id = id
            this.answer = answer
        },
        pageScroll(value){
            if(value === 1){
                document.body.scrollTop = document.documentElement.scrollTop = document.getElementById('content2').offsetTop

            }else if(value === 2){
                document.body.scrollTop = document.documentElement.scrollTop = document.getElementById('content4').offsetTop
            }
        },
        toTop(){
            document.body.scrollTop = document.documentElement.scrollTop = 0
        }
    }
}
</script>

<style lang="scss" scoped>
.euro-cup-content{
    width:100%;
    height: auto;
    background: #FFFFFF;
    position: relative;
    .euro-cup-toTop {
        position: fixed;
        bottom: .5rem;
        right: .6rem;
        width: .8rem;
    }
    .top-arrow {
        position: absolute;
        top: .4rem;
        left: .4rem;
        height: .4rem;
    }
    .top-img {
        width: 100%;
    }
    .tab-box {
        margin: -.25rem auto 0;
        width: 100%;
        overflow: hidden;
        position: relative;
        .tab-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: bold;
            background: #B6DBE0;
            .tab-top-left {
                width: 50%;
                display: flex;
                align-items: center;
                .tab-top-list {
                    width: 50%;
                    text-align: center;
                    position: relative;
                    height: 1.2rem;
                    color: #009BB4;
                    .line1 {
                        margin-top: .2rem;
                        font-size: .32rem;
                    }
                    .active-arrow {
                        position: absolute;
                        top: 0;
                        width: 100%;
                        height: .1rem;
                        background: #009BB4;
                    }
                }
                .tab-top-list-active {
                    background: linear-gradient(to bottom,#A1CFE0,#CAE6ED);
                    color: #2B8699;
                }
            }
            .green-line {
                width: 1px;
                height: .8rem;
                background: #009BB4;
            }
            .tab-top-right {
                width: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                .tab-top-list2 {
                    padding: .1rem .2rem;
                    text-align: center;
                    color: #FFFFFF;
                    font-size: .28rem;
                    background: #009BB4;
                    margin-left: .15rem;
                }
                .tab-top-list2:first-child {
                    margin-left: 0;
                }
            }

        }
        .tab-bottom {
            height: 1.3rem;
            overflow-x: auto;
            .tab-bottom-list-box {
                width: 33rem;
                display: flex;
                align-items: center;
                border: #009BB4 1px solid;
                .tab-bottom-list {
                    width: 1.5rem;
                    height: .8rem;
                    background: #F2F9FA;
                    color: #009BB4;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    font-weight: bold;
                }
                .green-line2 {
                    width: 1px;
                    height: .4rem;
                    background: #009BB4;
                }
                .tab-bottom-list:last-child {
                    margin-right: 0;
                }
                .tab-bottom-list-active {
                    background: #009BB4;
                    color: #FFFFFF;
                }
            }
        }
        .tab-bottom::-webkit-scrollbar {
            display:none
        }
    }
    .match-content {
        margin: .2rem auto 0;
        width: 100%;
        position: relative;
        .match-content-title {
            width: 100%;
            border-top-left-radius: .2rem;
            border-top-right-radius: .2rem;
        }
        .match-content-list {
            .match-content-list-title {
                display: flex;
                align-items: center;
                margin-top: .4rem;
                .title-left {
                    height: .8rem;
                }
                .title-right {
                    margin-left: .2rem;
                    .title-right-top {
                        max-width: 7rem;
                        color: #333333;
                        font-size: .3rem;
                        font-weight: bold;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .title-right-bottom {
                        color: #999999;
                        font-size: .26rem;
                    }
                }
            }
            .match-content-list-team {
                width: 92%;
                margin: .2rem auto 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .team-side {
                    width: 50%;
                    height: .8rem;
                    background: url("../../../static/images/euro-cup-btn-left.png") no-repeat;
                    background-size: 100% 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #009BB4;
                    position: relative;
                    .team-icon {
                        width: .5rem;
                        //margin-left: .3rem;
                    }
                    .team-name {
                        margin-left: .25rem;
                        //width: 2rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .team-name-center {
                        text-align: center;
                    }
                    .win-lose {
                        position: absolute;
                        top: -.32rem;
                        right: -.15rem;
                        width: 1rem;
                    }
                }
                .team-side:last-child {
                    justify-content: center;
                    background: url("../../../static/images/euro-cup-btn-right.png") no-repeat;
                    background-size: 100% 100%;
                    .team-icon {
                        width: .5rem;
                        //margin-right: .3rem;
                        margin-left: 0;
                    }
                    .team-name {
                        margin-right: .25rem;
                        text-align: right;
                        //width: 2rem;
                    }
                    .team-name-center {
                        text-align: center;
                    }
                    .win-lose {
                        position: absolute;
                        top: -.32rem;
                        left: .2rem;
                        right: unset;
                        width: 1rem;
                    }
                    .win-lose2 {
                        left: .35rem;
                    }
                }
                .answer-chosed:first-child {
                    background: url("../../../static/images/euro-cup-btn-left2.png") no-repeat;
                    background-size: 100% 100%;
                    color: #FFFFFF;
                }
                .answer-chosed:last-child {
                    background: url("../../../static/images/euro-cup-btn-right2.png") no-repeat;
                    background-size: 100% 100%;
                    color: #FFFFFF;
                }
                .gray-bg:first-child {
                    background: url("../../../static/images/euro-cup-btn-left3.png") no-repeat;
                    background-size: 100% 100%;
                    color: #333333;
                }
                .gray-bg:last-child {
                    background: url("../../../static/images/euro-cup-btn-right3.png") no-repeat;
                    background-size: 100% 100%;
                    color: #333333;
                }
                .dark-gray-bg:first-child {
                    background: url("../../../static/images/euro-cup-btn-left4.png") no-repeat;
                    background-size: 100% 100%;
                    color: #333333;
                    font-weight: bold;
                }
                .dark-gray-bg:last-child {
                    background: url("../../../static/images/euro-cup-btn-right4.png") no-repeat;
                    background-size: 100% 100%;
                    color: #333333;
                    font-weight: bold;
                }
            }
        }
        .match-watting {
            text-align: center;
            margin-top: .3rem;
            .match-watting-title {
                color: #333666;
                font-size: .4rem;
            }
            .time-show {
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                margin-top: .2rem;
                .number {
                    font-size: .5rem;
                    margin-left: .15rem;
                }
                .fonts {
                    font-size: .3rem;
                    margin-top: .05rem;
                }
            }
        }
        .update-fonts {
            position: absolute;
            width: 2rem;
            height: .6rem;
            text-align: center;
            color: #666666;
            font-size: .24rem;
            font-weight: bold;
            right: .5rem;
            margin-left: -.9rem;
            top: .62rem;
        }
        .result-area {
            background: #E5F3F5;
            padding: .1rem .25rem .2rem;
            margin-top: .3rem;
            text-align: center;
            color: #333333;
            .result-area-line1 {
                font-size: .3rem;
            }
            .result-area-line2 {
                color: #009BB4;
                font-size: .4rem;
                font-weight: bold;
                margin-top: .1rem;
            }
            .result-area-line3 {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: .2rem;
                .result-area-fonts {
                    width: 50%;
                    font-size: .3rem;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .result-area-fonts:nth-child(2){
                    .more-icon {
                        height: .4rem;
                        margin-left: .15rem;
                    }
                }
            }
        }
        .result-area2 {
            padding: .4rem .25rem 0;
            .result-area2-list-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .result-area2-list {
                    .result-area2-list-top {
                        color: #999999;
                        font-size: .24rem;
                        display: flex;
                        align-items: center;
                        .more-icon {
                            height: .4rem;
                            margin-left: .15rem;
                        }
                        .status-fonts {
                            background: #DDF2E9;
                            padding: .08rem .15rem;
                            color: #19C367;
                            border-radius: .25rem;
                            margin-left: .15rem;
                            font-size: .24rem;
                        }
                        .status-fonts2 {
                            background: #DCE2E3;
                            color: #999999;
                        }
                        .status-fonts3 {
                            background: #EDE6E5;
                            color: #D85E4A;
                        }
                    }
                    .result-area2-list-bottom {
                        color: #333333;
                        font-size: .35rem;
                        font-weight: bold;
                    }
                }
                .result-area2-list:first-child {
                    width: 45%;
                }
                .result-area2-list:last-child {
                    width: 55%;
                }
            }
            .result-area2-list-box:last-child {
                margin-top: .2rem;
            }
        }
    }
    .match-content2 {
        margin-top: .8rem;
        background: #F2F9FA;
        padding: .5rem 0;
        position: relative;
        .left-coin-icon {
            position: absolute;
            top: 1.8rem;
            left: 0;
            width: .6rem;
        }
        .right-coin-icon {
            position: absolute;
            top: .8rem;
            right: 0;
            width: 1rem;
        }
    }
    .match-content3 {
        background: #FFFFFF;
        margin-top: .8rem;
        .result-list-box {
            height: 3rem;
            overflow: hidden;
            padding: 0 .25rem;
            margin-top: .2rem;
            .prize-list {
                display: flex;
                justify-content: space-between;
                align-items: center;
                div {
                    width: 50%;
                    color: #666666;
                    font-size: .3rem;
                    height: .6rem;
                    line-height: .6rem;
                }
                div:last-child {
                    text-align: right;
                    font-weight: bold;
                    color: #333333;
                }
            }
            .no-data {
                width: 100%;
                height: 100%;

            }
        }
    }
    .match-content4 {
        margin-top: .8rem;
        padding-bottom: .6rem;
        .match-content-title {
            margin-bottom: .1rem;
        }
        .rules-content-list {
            margin-top: .3rem;
            padding: 0 .25rem;
            color: rgba(0,0,0,.8);
        }

    }

    .sub-popup {
        width: 6rem;
        background-size: 100% 100%;
        border-radius: .05rem;
        text-align: center;
        .popup-content {
            height: 2rem;
            background: url("../../../static/images/euro-cup-popup.png") no-repeat;
            background-size: 100% 100%;
            color: #FFFFFF;
            .popup-content-line1 {
                font-weight: bold;
                font-size: .35rem;
                padding-top: .5rem;
            }
            .popup-content-line2 {
                font-size: .26rem;
                margin-top: .15rem;
            }
        }
        .bottom-box {
            display: flex;
            align-items: center;
            .bottom-btn {
                width: 50%;
                font-size: .3rem;
                text-align: center;
                font-weight: bold;
                height: .8rem;
                line-height: .8rem;
            }
            .cancel {
                color: #333333;
                border-right: #CCCCCC 1px solid;
            }
            .confirm {
                color: #009BB4;
            }
        }
    }
    .rules-popup {
        width: 5.3rem;
        padding: .2rem;
        color: #333333;
        border-radius: .1rem;
        text-align: center;
    }
    .no-mask {
        background-color: rgba(0,0,0,0);
    }
}
</style>

