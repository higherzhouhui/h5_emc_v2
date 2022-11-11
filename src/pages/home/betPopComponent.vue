<template>
	<div class="bet-pop">
        <div class="input-cash-box" v-show="beforeBetting">
            <div class="bet-pop-title flex-b">
                <div class="bet-pop-title-left">世界杯投注单</div>
                <div class="bet-pop-title-right flex">
                    <div class="one-key flex-c bold">一键转入</div>
                    <div class="balance-show bold">
                        <span v-if='!loadingBalance'>{{balance}}</span>
                        <span v-if='loadingBalance' class="el-icon-loading"></span>
                    </div>
                    <div class="refresh-btn el-icon-refresh-right" @click='getBalance()'></div>
                </div>
            </div>
            <div class="bet-pop-detail flex-b">
                <div class="bet-pop-detail-left">
                    <div class="bet-pop-detail-side-fonts1 bold">{{oddsName}}</div>
                    <div class="bet-pop-detail-side-fonts2">{{leagueName}}</div>
                    <div class="bet-pop-detail-side-fonts3 bold">{{homeName}} <span v-if='matchId !== 446384'> VS {{awayName}}</span></div>
                </div>
                <div class="bet-pop-detail-right">
                    <div class="bet-pop-detail-side-fonts4 bold text-r">
                        @
                        <span class="bet-pop-detail-side-fonts5" :class="{'red-odds':oddsStatus==1,'green-odds':oddsStatus==2}">{{betOdds}}</span>
                        <div v-if='oddsStatus==1' class="odds-status-mark el-icon-caret-top"></div>
                        <div v-if='oddsStatus==2' class="odds-status-mark el-icon-caret-bottom"></div>
                    </div>
                    <!-- <div class="bet-pop-detail-side-fonts2 text-r">下注球队</div> -->
                    <div class="bet-pop-detail-side-fonts2 text-r" v-if='matchId !== 446384'>{{betName}}</div>
                </div>
                <div class="bottom-seconds flex-c">
                    <div class="bottom-seconds-fonts bold">{{countTime}}s</div>
                </div>
            </div>
            <div class="input-box" v-if='!isAppointment'>
                <div class="input-box-title flex-b">
                    <div class="input-box-title-left">一般投注：</div>
                    <div class="input-box-title-right">限额 <span class="limit-fonts">{{inputMin}}~{{inputMax}}</span></div>
                </div>
                <div class="input-line flex-b" v-if='!oddsClose'>
                    <div class="input-line-left flex" :class="cashPass === false?'red-border':''">
                        <div class="input-line-left-mark bold">￥</div>
                        <div class="input-line-left-num">
                            <span v-if='cashPass === null'>请输入金额</span>
                            <span class='cash-pass bold' v-if='cashPass === true'>{{inputValShow}}</span>
                            <span class='cash-disable bold' v-if='cashPass === false'>{{inputValShow}}</span>
                        </div>
                    </div>
                    <div class="input-line-right flex-c bold" @click='appointmentFn(0)'>+预约</div>
                </div>
                <div class="input-line flex-b" v-if='oddsClose'>
                    <div class="input-line-left flex" style="width:100%;">
                        <div class="input-line-left-mark el-icon-lock"></div>
                        <div class="input-line-left-num">
                            <span class='odds-closed bold'>盘口关闭</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="input-box appointment-input-box" v-if='isAppointment'>
                <div class="input-box-title flex-b">
                    <div class="input-box-title-left">预约投注：</div>
                    <div class="input-box-title-right">限额 <span class="limit-fonts">{{inputMin}}~{{inputMax}}</span></div>
                </div>
                <div class="input-line flex-b">
                    <div class="input-line-left input-line-left2 flex" :class="cashPass === false?'red-border':''">
                        <div class="input-line-left-mark bold">￥</div>
                        <div class="input-line-left-num">
                            <span v-if='cashPass === null'>请输入金额</span>
                            <span class='cash-pass bold' v-if='cashPass === true'>{{inputValShow}}</span>
                            <span class='cash-disable bold' v-if='cashPass === false'>{{inputValShow}}</span>
                        </div>
                    </div>
                    <div class="appointment-odds-box flex-b bold">
                        <div class="odds-btn" @click="changesOddsFn(1)">-</div>
                        <div class="odds-show">@{{appointmentOdds}}</div>
                        <div class="odds-btn" @click="changesOddsFn(2)">+</div>
                    </div>
                </div>
            </div>
            <div class="click-box flex-b">
                <div class="click-box-left flex">
                    <div class="left-num-list flex-c" @click="betInputFn(1)">1</div>
                    <div class="left-num-list flex-c" @click="betInputFn(2)">2</div>
                    <div class="left-num-list flex-c" @click="betInputFn(3)">3</div>
                    <div class="left-num-list flex-c" @click="betInputFn(4)">4</div>
                    <div class="left-num-list flex-c" @click="betInputFn(5)">5</div>
                    <div class="left-num-list flex-c" @click="betInputFn(6)">6</div>
                    <div class="left-num-list flex-c" @click="betInputFn(7)">7</div>
                    <div class="left-num-list flex-c" @click="betInputFn(8)">8</div>
                    <div class="left-num-list flex-c" @click="betInputFn(9)">9</div>
                    <div class="left-num-list flex-c" @click="betInputFn('.')">.</div>
                    <div class="left-num-list flex-c" @click="betInputFn(0)">0</div>
                    <div class="left-num-list flex-c" @click="betInputFn('del')">
                        <img src="../../../static/images/bet-input-back.png" alt="" class="input-back">
                    </div>
                </div>
                <div class="click-box-right">
                    <div class="right-num-list bold flex-c" @click="quickInputFn(100)">100</div>
                    <div class="right-num-list bold flex-c" @click="quickInputFn(200)">200</div>
                    <div class="right-num-list bold flex-c" @click="quickInputFn(500)">500</div>
                    <div class="right-num-list bold flex-c" @click="quickInputFn(-1)">MAX</div>
                </div>
            </div>
            <div class="bottom-box flex-b">
                <div class="to-multi flex-c" v-if='!isAppointment'>
                    <span v-if='!isMulti' @click="MultiFn(1)">+串</span>
                    <span v-if='isMulti' @click="MultiFn(2)">已串关</span>
                </div>
                <div class="to-multi flex-c" v-if='isAppointment' @click='appointmentFn(1)'>关闭预约</div>
                <div class="bet-btn bet-btn-enable flex-c" v-if="betEnable" @click="subBetFn()">
                    <span class="bet-btn-fonts1 bold">投注</span>
                    <span class="bet-btn-fonts2">可返还:</span>
                    <span class="bet-btn-fonts3 bold">{{(inputValShow * betOdds).toFixed(2)}}</span>
                </div>
                <div class="bet-btn flex-c" v-if="betDisable">
                    <span class="bet-btn-fonts1 bold">投注</span>
                    <span class="bet-btn-fonts2">可返还:</span>
                    <span class="bet-btn-fonts3 bold">0.00</span>
                </div>
                <div class="bet-btn flex-c" v-if="cashDisable">
                    <span class="bet-btn-fonts4 bold">{{cashDisableFonts}}</span>
                </div>
            </div>
        </div>
        <!-- 投注中 -->
        <div class="result-box" v-show="isBetting">
            <div class="result-top-line result-top-line-red"></div>
            <div class="result-title flex-c">
                <span class="top-icon betting-loading el-icon-loading"></span>
                <span class='bold'>注单确认中</span>
            </div>
            <div class="bet-pop-detail bet-pop-detail2 flex-b">
                <div class="bet-pop-detail-left">
                    <div class="bet-pop-detail-side-fonts1 bold">{{oddsName}}</div>
                    <div class="bet-pop-detail-side-fonts2">{{leagueName}}</div>
                    <div class="bet-pop-detail-side-fonts3 bold">{{homeName}} VS {{awayName}}</div>
                </div>
                <div class="bet-pop-detail-right">
                    <div class="bet-pop-detail-side-fonts4 bold text-r">
                        @
                        <span class="bet-pop-detail-side-fonts5">{{betOdds}}</span>
                    </div>
                    <!-- <div class="bet-pop-detail-side-fonts2 text-r">下注球队</div> -->
                    <div class="bet-pop-detail-side-fonts2 text-r">{{betName}}</div>
                </div>
            </div>
            <div class="result-cash-detail">
                <div class="result-cash-detail-line1">接受最优赔率变动</div>
                <div class="result-cash-detail-line2 flex-b">
                    <div class="">投注:
                        <span class="bold">￥{{inputValShow}}</span>
                    </div>
                    <div class="">可返还:
                        <span class="bold">￥{{(inputValShow * betOdds).toFixed(2)}}</span>
                    </div>
                </div>
            </div>
            <div class="result-bottom-btn result-bottom-btn1 bold flex-c" v-if='matchId !== 446384' @click='toMatchDetail()'>前往该场赛事</div>
            <div class="result-bottom-btn result-bottom-btn2 bold flex-c" @click="closeBetPopFn()">确认</div>
        </div>
        <!-- 投注成功 -->
        <div class="result-box" v-if="bettingSuccess">
            <div class="result-top-line result-top-line-red"></div>
            <div class="result-title flex-c">
                <span class="top-icon success-icon el-icon-success"></span>
                <span class='bold'>成功</span>
            </div>
            <div class="bet-pop-detail bet-pop-detail2 flex-b">
                <div class="bet-pop-detail-left">
                    <div class="bet-pop-detail-side-fonts1 bold">{{oddsName}}</div>
                    <div class="bet-pop-detail-side-fonts2">{{leagueName}}</div>
                    <div class="bet-pop-detail-side-fonts3 bold">{{homeName}} VS {{awayName}}</div>
                </div>
                <div class="bet-pop-detail-right">
                    <div class="bet-pop-detail-side-fonts4 bold text-r">
                        @
                        <span class="bet-pop-detail-side-fonts5" v-if="!isAppointment">{{resData[0].ops[0].od}}</span>
                        <span class="bet-pop-detail-side-fonts5" v-if="isAppointment">{{appointmentOdds}}</span>
                    </div>
                    <!-- <div class="bet-pop-detail-side-fonts2 text-r">下注球队</div> -->
                    <div class="bet-pop-detail-side-fonts2 text-r">{{betName}}</div>
                </div>
            </div>
            <div class="result-cash-detail">
                <div class="result-cash-detail-line1">接受最优赔率变动</div>
                <div class="result-cash-detail-line2 flex-b">
                    <div class="">投注:
                        <span class="bold">￥{{inputValShow}}</span>
                    </div>
                    <div class="">可返还:
                        <span class="bold">￥{{(inputValShow * betOdds).toFixed(2)}}</span>
                    </div>
                </div>                
            </div>
            <div class="result-bottom-btn result-bottom-btn1 bold flex-c" v-if='matchId !== 446384' @click='toMatchDetail()'>前往该场赛事</div>
            <div class="result-bottom-btn result-bottom-btn2 bold flex-c" @click="closeBetPopFn()">确认</div>
        </div>
		
	</div>
</template>

<script>
import dayjs from 'dayjs';
import axios from "axios";
import {mapState} from 'vuex';
export default {
	name: 'betPopComponent',
	components: {
		
	},
	data() {
		return {
            loadingBalance:false,
            balance:null,
            inputVal:0,
            inputValShow:'',
            cashPass:null,
            inputMin:0,
            inputMax:0,
            betEnable:false,
            betDisable:true,
            cashDisable:false,
            cashDisableFonts:'',
            beforeBetting:true,
            isBetting:false,
            bettingSuccess:false,
            isAppointment:false,
            trueOdds:1.98,
            appointmentOdds:null,
            isMulti:false,
            oddsName:this.$parent.$parent.betPopData.oddsName,
            leagueName:this.$parent.$parent.betPopData.leagueName,
            homeName:this.$parent.$parent.betPopData.homeName,
            awayName:this.$parent.$parent.betPopData.awayName,
            marketId:this.$parent.$parent.betPopData.marketId,
            matchId:this.$parent.$parent.betPopData.matchId,
            oddsType:this.$parent.$parent.betPopData.oddsType,
            betAlldata:{},
            betOdds:0,
            betName:'',
            countTime:4,
            oddsStatus:0,
            firstMark:true,
            oddsClose:false,
            resData:{},
            multiData:JSON.parse(sessionStorage.getItem('multiData')),
            // resOdds:0,
		}
	},
	mounted() {
        // console.log(parseFloat('3.') + 100)

        // betPopData:{
        //         oddsName:'',
        //         leagueName:'',
        //         homeName:'',
        //         awayName:'',
        //     }
        this.quickBetFn()
        this.getBalance()
        
            // this.oddsName=this.$parent.betPopData.oddsName
            // this.leagueName=this.$parent.betPopData.leagueName
            // this.homeName=this.$parent.betPopData.homeName
            // this.awayName=this.$parent.betPopData.awayName
    },
    // computed: 
    //     mapState({
    //         multiData: state => state.common.multiData,
    //     }),
    beforeDestroy(){
        if(this.oddsTimer){
            clearInterval(this.oddsTimer);
        }
        if(this.statusTimer){
            clearInterval(this.statusTimer);
        }
        if(this.reserveTimer){
            clearInterval(this.reserveTimer);
        }
    },
	created() {
	},
	beforeRouteLeave(to, from, next) {  
		this.$destroy(true)
		next()
	},
	methods: {
        toMatchDetail(){
            this.$router.push({
                path:'/matchDetail',
                query:{
                    id:this.matchId
                }
            })
        },
        quickBetFn(){
            if(this.oddsTimer){
                clearInterval(this.oddsTimer);
            }
            let paramData = new FormData()
            paramData.append('token',sessionStorage.getItem('fbToken'))
            paramData.append('appUrl',sessionStorage.getItem('fbAppUrl'))
            paramData.append('requestBody', "{\"languageType\":\"CMN\",\"isSelectSeries\":false,\"betMatchMarketList\":[{\"type\":" + this.oddsType + ",\"matchId\":" + this.matchId + ",\"marketId\":" + this.marketId + "}]}")
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            axios.post(this.API.getBetLine,paramData,config).then(res => {
                if (res.status == '200'){
                    if(res.data.code === '0000'){
                        this.betAlldata = res.data.data.bms[0]
                        // 处理盘口关闭情况
                        if(this.betAlldata.ss == 0 || this.betAlldata == -1){
                            this.oddsClose = true
                        }else{
                            this.oddsClose = false
                        }
                        if(this.firstMark === true){
                            this.oddsStatus = 0
                        }else{
                            // 处理盘口赔率变化情况
                            if(this.betOdds == this.betAlldata.op.od){
                                this.oddsStatus = 0
                            }else if(this.betOdds <= this.betAlldata.op.od){
                                this.oddsStatus = 1
                            }else if(this.betOdds >= this.betAlldata.op.od){
                                this.oddsStatus = 2
                            }
                        }
                        this.betOdds = this.betAlldata.op.od
                        if(!!this.appointmentOdds === false){
                            this.appointmentOdds = this.betOdds
                        }
                        this.betName = this.betAlldata.op.nm
                        if(this.isAppointment === false){
                            this.inputMin = this.betAlldata.smin
                            this.inputMax = this.betAlldata.smax
                        }
                        this.marketId = this.betAlldata.mid
                        this.optionType = this.betAlldata.op.ty
                        this.firstMark = false
                    }
                }
            })
            this.oddsTimer = setInterval(() => {
                this.countTime --
                if(this.countTime == 0){
                    this.quickBetFn()
                    this.countTime = 4
                }
            }, 1000);
        },
        appointmentFn(val){
            if(val === 0){
                this.isAppointment = true
                this.getBetParameterFn()
            }else{
                this.isAppointment = false
                this.quickBetFn()
            }
        },
        getBetParameterFn(){
            if(this.reserveTimer){
                clearInterval(this.reserveTimer);
            }
            let paramData = new FormData()
            paramData.append('token',sessionStorage.getItem('fbToken'))
            paramData.append('appUrl',sessionStorage.getItem('fbAppUrl'))
            paramData.append('requestBody', "{\"languageType\":\"CMN\",\"matchId\":" + this.matchId + ",\"marketId\":" + this.marketId + "}")
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            axios.post(this.API.getBetParameter,paramData,config).then(res => {
                this.isBetting = false
                if (res.status == '200'){
                    if(res.data.code === '0000'){
                        this.inputMin = res.data.data.mis
                        this.inputMax = res.data.data.mly
                    }else{
                        this.$toastTop(res.data.info,3)
                    }
                }else{
                    this.$toastTop('似乎已经断开了互联网的连接',2)
                }
            })
            this.reserveTimer = setInterval(() => {
                this.getBetParameterFn()
            }, 4000);
        },
        reserveBetFn(){
            this.isBetting = true
            this.beforeBetting = false
            clearInterval(this.reserveTimer)
            clearInterval(this.oddsTimer)
            let paramData = new FormData()
            paramData.append('token',sessionStorage.getItem('fbToken'))
            paramData.append('appUrl',sessionStorage.getItem('fbAppUrl'))
            paramData.append('requestBody', "{\"unitStake\":" + this.inputValShow + ",\"betOptionList\":[{\"marketId\":" + this.marketId + ",\"optionType\":" + this.oddsType + ",\"odds\":" + this.appointmentOdds + ",\"oddsFormat\":1}]}")
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            axios.post(this.API.reserveBet,paramData,config).then(res => {
                this.isBetting = false
                if (res.status == '200'){
                    if(res.data.code === '0000'){
                        this.bettingSuccess = true
                        this.resData = res.data.data
                        this.getSubBetStatus()
                    }else{
                        this.$toastTop(res.data.info,3)
                        this.closeBetPopFn()
                    }
                }else{
                    this.$toastTop('似乎已经断开了互联网的连接',2)
                    this.closeBetPopFn()
                }
            })
        },
        subBetFn(){
            if(this.isAppointment === true){
                this.reserveBetFn()
            }else{
                this.isBetting = true
                this.beforeBetting = false
                clearInterval(this.oddsTimer)
                let paramData = new FormData()
                paramData.append('token',sessionStorage.getItem('fbToken'))
                paramData.append('appUrl',sessionStorage.getItem('fbAppUrl'))
                paramData.append('requestBody', "{\"singleBetList\":[{\"oddsChange\":1,\"unitStake\":" + this.inputValShow + ",\"betOptionList\":[{\"marketId\":" + this.marketId + ",\"optionType\":" + this.optionType + ",\"odds\":" + this.betOdds + ",\"oddsFormat\":1}]}]}")
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }
                axios.post(this.API.betSingle,paramData,config).then(res => {
                    this.isBetting = false
                    if (res.status == '200'){
                        if(res.data.code === '0000'){
                            this.bettingSuccess = true
                            this.resData = res.data.data
                            this.getSubBetStatus()
                            // this.resOdds = 
                        }else{
                            this.$toastTop(res.data.info,3)
                            this.closeBetPopFn()
                        }
                    }else{
                        this.$toastTop('似乎已经断开了互联网的连接',2)
                        this.closeBetPopFn()
                    }
                })
            }

        },
        getSubBetStatus(){
            if(this.statusTimer){
                clearInterval(this.statusTimer);
            }
            let subId
            if(this.isAppointment === true){
                subId = this.resData.id
            }else{
                subId = this.resData[0].id
            }
            let paramData = new FormData()
            paramData.append('token',sessionStorage.getItem('fbToken'))
            paramData.append('appUrl',sessionStorage.getItem('fbAppUrl'))
            paramData.append('requestBody', "{\"languageType\":\"CMN\",\"orderIds\":[" + subId + "]}")
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            axios.post(this.API.getBetOrderStatus,paramData,config).then(res => {
                this.isBetting = false
                if (res.status == '200'){
                    if(res.data.code === '0000'){
                        if(!!res.data.data == true){
                            if(res.data.data[0].st === 0 || res.data.data[0].st === 1) {
                                this.statusTimer = setInterval(() => {
                                    this.getSubBetStatus()
                                }, 4000);
                            }else{
                                clearInterval(this.statusTimer);
                                if(res.data.data[0].st === 2) {
                                    this.$toastTop('注单提交已被拒绝',2)
                                }
                                if(res.data.data[0].st === 3) {
                                    this.$toastTop('注单已取消',2)
                                }
                                if(res.data.data[0].st === 4) {
                                    this.$toastTop('已接单',1)
                                }
                                if(res.data.data[0].st === 5) {
                                    this.$toastTop('注单已结算',1)
                                }
                            }
                        }else{
                            this.statusTimer = setInterval(() => {
                                this.getSubBetStatus()
                            }, 4000);
                        }
                    }else{
                        this.statusTimer = setInterval(() => {
                            this.getSubBetStatus()
                        }, 4000);
                    }
                }else{
                    this.statusTimer = setInterval(() => {
                        this.getSubBetStatus()
                    }, 4000);
                }
            })
        },
        MultiFn(val){
            this.isMulti = !this.isMulti
            let arrTemp = this.multiData = JSON.parse(sessionStorage.getItem('multiData'))
            if(val === 1){
                this.$toastTop('添加串关成功',1)
                // sessionStorage.setItem('multiNum',3)
                let checkId = true
                if(!!arrTemp == true){
                    checkId = this.multiData.forEach((ele,index) => {
                        if(ele.marketId === this.marketId){
                            arrTemp.splice(index,1)
                            return false
                        }
                    });
                }
                if(checkId === true){
                    arrTemp = []
                }
                let data = {
                    oddType:this.oddsType,
                    matchId:this.matchId,
                    marketId:this.marketId,
                    oddsName:this.oddsName,
                    leagueName:this.leagueName,
                    homeName:this.homeName,
                    awayName:this.awayName,
                }
                arrTemp.push(data)
            }else{
                this.$toastTop('取消串关成功',3)
                this.multiData.forEach((ele,index) => {
                    if(ele.marketId === this.marketId){
                        arrTemp.splice(index,1)
                    }
                })
            }
            sessionStorage.setItem('multiData',JSON.stringify(arrTemp))
            // console.log(JSON.parse(sessionStorage.getItem('multiData')))
            this.$emit('multiChange',true)
        },
        changesOddsFn(val){
            if(!!this.appointmentOdds === false){
                this.appointmentOdds = this.betOdds
            }
            if(val === 1){
                if(parseFloat((this.appointmentOdds * 100 - 1)/100).toFixed(2) < this.betOdds){
                    this.$toastTop('预约赔率不可小于当前赔率',2)
                    return false
                }
                this.appointmentOdds = parseFloat((this.appointmentOdds * 100 - 1)/100).toFixed(2)
            }else if(val === 2){
                this.appointmentOdds = parseFloat((this.appointmentOdds * 100 + 1)/100).toFixed(2)
            }
        },
        quickInputFn(val){
            if(val !== -1){
                this.inputVal = parseFloat(this.inputVal) + val
            }else{
                this.inputVal = this.balance
            }
            this.inputValShow = this.inputVal + ''
            this.checkInputFn()
        },
        betInputFn(val){
            if(this.oddsClose == true) {
                return false
            }
            if(val === '.'){
                if(this.inputValShow.indexOf(val) === -1){
                    this.inputVal = this.inputVal + '.'
                }else{
                    return false
                }
            }else if(val === 'del'){
                this.inputVal = this.inputVal + ''
                this.inputVal = this.inputVal.slice(0,-1)
            }else{
                if(this.inputValShow.indexOf('.') === -1){
                    this.inputVal = this.inputVal * 10 + val
                }else{
                    this.inputVal = this.inputVal + '' + val
                    this.inputVal = this.inputVal.substring(0,this.inputVal.indexOf(".")+3)
                }
                
            }
            this.inputValShow = this.inputVal + ''
            this.checkInputFn()
        },
        checkInputFn(){
            if(this.inputVal > this.balance){
                this.inputVal = this.balance
                this.inputValShow = this.inputVal + ''
            }
            if(this.inputValShow.length === 0){
                this.cashPass = null
                this.inputVal = 0
                this.betDisable = true
                this.betEnable = false
                this.cashDisable = false
            }else if(this.inputVal < 1){
                this.cashPass = null
                this.$toastTop('输入金额不得小于1',3)
                this.inputVal = 0
                this.inputValShow = null
            }else if(this.inputVal < this.inputMin){
                this.cashDisable = true
                this.cashPass = false
                this.betEnable = false
                this.betDisable = false
                this.cashDisableFonts = '投注金额不可小于限额'
            }else if(this.inputVal > this.inputMax){
                this.cashDisable = true
                this.cashPass = false
                this.betEnable = false
                this.betDisable = false
                this.cashDisableFonts = '投注金额不可大于限额'
            }else{
                this.cashPass = true
                this.betEnable = true
                this.cashDisable = false
                this.betDisable = false
            }
        },
        getBalance() {
            this.loadingBalance = true;
            let params = {
				visitType: 'WAP',
				version: this.API.paramVersion,
                gameId:62
			}
            this.ServerAPI.postAPI(this.API.gameBalance, params, (success,data)=>{
                this.loadingBalance = false
                if (success) {
                    if (data.code == '0000') {
                        this.balance = data.data
                    }else{
                        this.$toastTop(data.info,3)
                    }
                }else{
                    this.$toastTop('获取下载链接失败，请稍后尝试',2)
                }
            })
		},
        closeBetPopFn(){
            this.isBetting = this.bettingSuccess = false
            this.$emit('betPopSwitch',false)
        },
	}
}
</script>
<style lang="scss" scoped>
.bet-pop {
    background-color: unset;
    .input-cash-box {
        background: #FFFFFF;
    }
    .bet-pop-title {
        // background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
        background: linear-gradient(90deg, #CA2C48 0%, #882635 100%);
        height: 0.8rem;
        color: #FFFFFF;
        font-size: .32rem;
        padding: 0 .2rem;
        .bet-pop-title-right {
            .one-key {
                height: 0.48rem;
                border-radius: .3rem;
                width: 1.4rem;
                // color: #1D9DFC;
                color: #9A1032;
                background: #FFFFFF;
                font-size: .26rem;
                margin-right: .1rem;
            }
            .balance-show {
                font-size: .34rem;
                margin-right: .1rem;
            }
            .refresh-btn {
                font-weight: bold;
                font-size: .3rem;
            }
        }
    }
    .bet-pop-detail {
        padding: .2rem .2rem .4rem;
        background: #F7F7F7;
        position: relative;
        align-items: flex-start;
        .bet-pop-detail-left {
            width: 70%;
        }
        .bet-pop-detail-right {
            width: 30%;
        }
        .bet-pop-detail-side-fonts1 {
            font-size: .32rem;
            height: 0.52rem;
        }
        .bet-pop-detail-side-fonts2 {
            font-size: .28rem;
            color: #ADB2BA;
            margin-right: .1rem;
            // margin-top: .06rem;
        }
        .bet-pop-detail-side-fonts3 {
            font-size: .28rem;
            color: #7C8591;
        }
        .bet-pop-detail-side-fonts4 {
            font-size: .32rem;
            height: 0.52rem;
            margin-right: .1rem;
            position: relative;
        }
        .bet-pop-detail-side-fonts5 {
            font-size: .42rem;
        }
        .red-odds {
            color: #C10021;
        }
        .green-odds {
            color: #20B62B;
        }
        .odds-status-mark {
            position: absolute;
            right: -.28rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: .3rem;
        }
        .el-icon-caret-top {
            color: #C10021;
        }
        .el-icon-caret-bottom {
            color: #20B62B;
        }
        .text-r {
            text-align: right;
        }
        .bottom-seconds {
            position: absolute;
            bottom: 0;
            right: 0;
            background: #E6E8EE;
            transform: skewX(-30deg);
            width: .8rem;
            height: 0.38rem;
            color: #7C8591;
            .bottom-seconds-fonts {
                transform: skewX(30deg);
            }
        }
    }
    .bet-pop-detail2 {
        padding-bottom: .2rem;
    }
    .input-box {
        padding: .2rem;
        .input-box-title {
            font-size: .3rem;
            .input-box-title-left {
            }
            .input-box-title-right {
                color: #ADB2BA;
                font-size: .3rem;
                .limit-fonts {
                    font-size: .32rem;
                }
            }
        }
        .input-line {
            width: 100%;
            height: 0.8rem;
            margin-top: .06rem;
            .input-line-left {
                width: 76%;
                height: 100%;
                // border: #78BDF2 1px solid;
                border: #CA2C48 1px solid;
                border-radius: .1rem;
                padding: 0 .16rem;
                .input-line-left-mark {
                    font-size: .34rem;
                }
                .el-icon-lock {
                    font-weight: bold;
                    font-size: .4rem;
                    color: #888888;
                    margin-right: .2rem;
                }
                .input-line-left-num {
                    color: #ADB2BA;
                    font-size: .28rem;
                    margin-left: .1rem;
                    .odds-closed {
                        color: #888888;
                    }
                }
                .cash-pass {
                    color: #000000;
                    font-size: .34rem;
                }
                .cash-disable {
                    color: #E90619;
                    font-size: .34rem;
                }
            }
            .red-border {
                border: #E90619 1px solid;
            }
            .input-line-right {
                border-radius: .1rem;
                font-size: .32rem;
                height: 100%;
                color: #FFFFFF;
                width: calc(24% - 0.1rem);
                // background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
               background: linear-gradient(90deg, #CA2C48 0%, #882635 100%);
            }
            .input-line-left2 {
                width: calc(50% - .06rem);
            }
        }
        .appointment-odds-box {
            width: calc(50% - .06rem);
            // border: #78BDF2 1px solid;
            border: #CA2C48 1px solid;
            border-radius: .1rem;
            padding: 0 .16rem;
            height: 100%;
            color: #7C8591;
            font-size: .44rem;
            .odds-show {
                color: #000000;
                font-size: .34rem;
            }
        }
    }
    .appointment-input-box {
        // color: #7C8591;
    }
    .click-box {
        padding: .04rem .2rem .2rem;
        .click-box-left {
            width: 76%;
            flex-wrap: wrap;
            background: #EEEEEE;
            padding: .06rem .06rem 0;
            border-radius: .1rem;
            .left-num-list {
                border-radius: .1rem;
                background: #FFFFFF;
                width: calc((100% - .12rem)/3);
                height: 0.78rem;
                margin-bottom: .06rem;
                font-size: .34rem;
                font-weight: bold;
                .input-back {
                    height: 0.3rem;
                }
            }
            .left-num-list:nth-child(2), 
            .left-num-list:nth-child(5),
            .left-num-list:nth-child(8),
            .left-num-list:nth-child(11)
            {
                margin: 0 .06rem .06rem; 
            }
        }
        .click-box-right {
            width: calc(24% - 0.1rem);
            padding: .06rem .06rem 0;
            border-radius: .1rem;
            background: #EEEEEE;
            .right-num-list {
                width: 100%;
                height: 0.78rem;
                margin-bottom: .06rem;
                font-size: .34rem;
                border-radius: .1rem;
                background: #FFFFFF;
                // color: #78BDF2;
                color: #9A1032;
            }
        }
    }
    .bottom-box {
        padding: .04rem .2rem .2rem;
        .to-multi {
            background: #EEEEEE;
            // color: #1D9DFC;
            color: #9A1032;
            font-size: .3rem;
            border-radius: .1rem;
            width: 1.6rem;
            height: 0.8rem;
        }
        .bet-btn {
            color: #7C8591;
            border-radius: .1rem;
            background: #DDDDDE;
            width: calc(100% - 1.8rem);
            height: 0.8rem;
            .bet-btn-fonts1 {
                color: #303030;
                font-size: .34rem;
            }
            .bet-btn-fonts2 {
                font-size: .26rem;
                margin-left: .1rem;
            }
            .bet-btn-fonts3 {
                font-size: .28rem;
            }
            .bet-btn-fonts4 {
                color: #303030;
                font-size: .3rem;
            }
        }
        .bet-btn-enable {
            // background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
            background: linear-gradient(90deg, #CA2C48 0%, #882635 100%);
            color: #FFFFFF;
            .bet-btn-fonts1 {
                color: #FFFFFF;
            }
        }
    }
    .result-box {
        border-radius: .2rem .2rem 0 0;
        overflow: hidden;
        background: #FFFFFF;
        padding-bottom: .4rem;
        overflow: hidden;
        .result-top-line {
            height: 0.16rem;
        }
        .result-top-line-blue {
            background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
        }
        .result-top-line-green {
            background: linear-gradient(90deg, #5CBD37 0%, #22C02A 100%);
        }
        .result-top-line-red {
            background: linear-gradient(90deg, #CA2D49 0%, #892635 100%);
        }
        .result-title {
            font-size: .34rem;
            color: #303030;
            padding: .2rem 0;
            .top-icon {
                margin-right: .1rem;
                font-size: .34rem;
            } 
            .betting-loading {
                
            }
            .success-icon {
                color: #68BA3E;
            }
        }
        .result-cash-detail {
            padding: .2rem;
            .result-cash-detail-line1 {
                font-size: .3rem;
                color: #7C8591;
            }
            .result-cash-detail-line2 {
                font-size: .3rem;
                color: #000000;
                .bold {
                    font-size: .34rem;
                }
                .blue {
                    color: #1D9DFC;
                    font-size: .34rem;
                }
            }
        }
        .result-bottom-btn {
            width: calc(100% - .4rem);
            height: 0.8rem;
            font-size: .34rem;
            border-radius: .06rem;
        }
        .result-bottom-btn1 {
            color: #4C4C4D;
            border: #C3CAD7 1px solid;
            margin: .4rem auto 0;
        }
        .result-bottom-btn2 {
            color: #4C4C4D;
            color: #FFFFFF;
            background: linear-gradient(90deg, #CA2D49 0%, #892635 100%);
            margin: .2rem auto 0;
        }
    }
}

</style>
