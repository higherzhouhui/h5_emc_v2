<template>
	<div class="multi-bet-content">
		<div class="replace-header">
			<div class="goBack" @click="goBack()">
                <img src="../../../static/images/back-icon.png" alt="" class="back-icon">
            </div>
			<div class="header-title">
                串关投注
                <div class="multi-num bold flex-c">{{matchData.length}}</div>
            </div>
			<div class="header-right bold flex-c">{{headerSeconds}}s</div>
		</div>
        <div class="match-content">
            <div class="match-list-box flex-b" v-for="(item,index) in matchData" :key="index">
                <div class="match-list-left">
                    <div class="match-list-left-line1 flex bold">
                        <div class="left-icon"></div>
                        {{sessionData[index].oddsName}}
                    </div>
                    <div class="match-list-left-line2">{{sessionData[index].leagueName}}</div>
                    <div class="match-list-left-line3 bold">{{sessionData[index].homeName}} VS {{sessionData[index].awayName}}</div>
                </div>
                <div class="match-list-right">
                    <div class="match-list-right-line1 flex bold">
                        @
                        <div class="match-list-right-line1-odds">{{item.op.od}}</div>
                    </div>
                    <div class="match-list-left-line2 match-list-left-line4">{{item.op.nm}}</div>
                    <!-- <div class="match-list-left-line2 match-list-left-line2-2">吉斯+0/0.5</div> -->
                </div>
                <div class="bottom-icon-area flex">
                    <!-- <div class="icon-box flex-c">
                        <div class="icon-fonts">赔率变更</div>
                    </div> -->
                    <div class="icon-box icon-box2 flex-c">
                        <div class="icon-fonts el-icon-delete-solid"></div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="bottom-box">
            <div class="multi-bet-box">
                <div class="bet-pop-title flex-b">
                    <div class="" v-if='matchData.length > 1'>
                        <div class="bet-pop-title-left flex bold" v-if='!allMulti' @click="showAllMulti()">
                            <img src="../../../static/images/multi-bet-folder.png" alt="" class="folder-icon">
                            展开
                        </div>
                        <div class="bet-pop-title-left flex bold" v-if='allMulti' @click="hideAllMulti()">
                            <span class="title-close-icon el-icon-close"></span>
                            关闭
                        </div>
                    </div>
                    <div class="" v-if='matchData.length === 1'>请添加更多串关</div>
                    <div class="bet-pop-title-right flex">
                        <div class="one-key flex-c bold">一键转入</div>
                        <div class="balance-show bold">
                            <span v-if='!loadingBalance'>{{balance}}</span>
                            <span v-if='loadingBalance' class="el-icon-loading"></span>
                        </div>
                        <div class="refresh-btn el-icon-refresh-right" @click='getBalance()'></div>
                    </div>
                </div>
                <div class="multi-bet-list-box" :class="{'multi-bet-list-box-full':allMulti === true,'nedd-add':matchData.length === 1}" id='scrollTop'>
                    <div class="multi-bet-list" v-for="(item,index) in multiListData" :key="index">
                        <div class="multi-bet-list-conetent-1 flex-b" @click="switchPadFn(index)">
                            <div class="content-1-left flex">
                                <span class="left-fonts1" v-if='item.sn !== 0'>{{item.sn}}串1</span>
                                <span class="left-fonts1" v-if='item.sn === 0'>{{multiListData.length}}串{{item.in}}</span>
                                <span class="left-fonts2 bold">@{{item.sodd}}</span>
                            </div>
                            <div class="content-1-right flex">
                                <div class="right-icon el-icon-caret-bottom" v-if='statusArr[index].showPad === 0'></div>
                                <div class="right-icon el-icon-caret-top" v-if='statusArr[index].showPad === 1'></div>
                                <div class="right-fonts bold">{{item.in}}*</div>
                                <div class="right-input-box flex" v-if="balance > item.mi" :class="{'input-reminding':item.inputVal < item.mi && item.inputValShow !== '','input-activing':statusArr[index].showPad=== 1}">
                                    <div class="right-input-icon bold">￥</div>
                                    <div class="right-input-show bold text-r" v-if="item.inputValShow === ''">限额{{item.mi}}-{{item.mx}}</div>
                                    <div class="right-input-show right-input-show-enable bold" v-if="item.inputValShow !== ''">{{item.inputValShow}}</div>
                                </div>
                                <div class="right-input-box input-warning flex" v-if="balance < item.mi || balance < inputTotal">
                                    <img src="../../../static/images/bet-locked.png" alt="" class="bet-locked">
                                    <div class="right-input-show bold text-r" v-if="item.inputValShow === ''">余额不足</div>
                                </div>
                            </div>
                        </div>
                        <el-collapse-transition>
                            <div class="click-box flex-b" v-if='statusArr[index].showPad === 1'>
                                <div class="click-box-left flex">
                                    <div class="left-num-list flex-c" @click="betInputFn(1,index)">1</div>
                                    <div class="left-num-list flex-c" @click="betInputFn(2,index)">2</div>
                                    <div class="left-num-list flex-c" @click="betInputFn(3,index)">3</div>
                                    <div class="left-num-list flex-c" @click="betInputFn(4,index)">4</div>
                                    <div class="left-num-list flex-c" @click="betInputFn(5,index)">5</div>
                                    <div class="left-num-list flex-c" @click="betInputFn(6,index)">6</div>
                                    <div class="left-num-list flex-c" @click="betInputFn(7,index)">7</div>
                                    <div class="left-num-list flex-c" @click="betInputFn(8,index)">8</div>
                                    <div class="left-num-list flex-c" @click="betInputFn(9,index)">9</div>
                                    <div class="left-num-list flex-c" @click="betInputFn('.',index)">.</div>
                                    <div class="left-num-list flex-c" @click="betInputFn(0,index)">0</div>
                                    <div class="left-num-list flex-c" @click="betInputFn('del',index)">
                                        <img src="../../../static/images/bet-input-back.png" alt="" class="input-back">
                                    </div>
                                </div>
                                <div class="click-box-right">
                                    <div class="right-num-list bold flex-c" @click="quickInputFn(100,index)">100</div>
                                    <div class="right-num-list bold flex-c" @click="quickInputFn(200,index)">200</div>
                                    <div class="right-num-list bold flex-c" @click="quickInputFn(500,index)">500</div>
                                    <div class="right-num-list bold flex-c" @click="quickInputFn(-1,index)">MAX</div>
                                </div>
                            </div>
                        </el-collapse-transition>
                    </div>
                </div>
            </div>
            <div class="bet-btn-area">
                <div class="bet-title flex-b">
                    <div class="title-left">接受更高赔率(预设)</div>
                    <div class="title-right flex">
                        <div class="title-right-fonts-1">总本金：</div>
                        <div class="title-right-fonts-2 bold">{{allBetCash}}</div>
                    </div>
                </div>
                <div class="btn-box flex-b">
                    <div class="btn-1 flex-c bold">全部删除</div>
                    <div class="btn-2 flex-c" v-if="betDisable">
                        <div class="btn-fonts-1 bold">投注</div>
                        <div class="btn-fonts-2">可返还:</div>
                        <div class="btn-fonts-3 bold">{{winCash}}</div>
                    </div>
                    <div class="btn-2 bet-btn-enable flex-c" v-if="betEnable" @click='handleSubData()'>
                        <span class="btn-fonts-1 bold">投注</span>
                        <span class="btn-fonts-2">可返还:</span>
                        <span class="btn-fonts-3 bold">{{winCash}}</span>
                    </div>
                </div>
            </div>
        </div>

	</div>
</template>

<script>
import dayjs from 'dayjs';
import {mapState} from 'vuex';
import axios from "axios";
export default {
	name: 'multiBet',
	components: {
		
	},
	data() {
		return {
			headerSeconds:4,
            loadingBalance:false,
            balance:null,
            demoTeamData:[
                {
                    betName:'滚球投注 1x2',
                    leagueName:'墨西哥超级联赛',
                    home:'克雷塔罗',
                    away:'提华纳',
                    odds:'1.93',
                    oddsInfo_1:'提华纳',
                },
                // {
                //     betName:'滚球 让球',
                //     leagueName:'墨西哥超级联赛',
                //     home:'望月慎太郎',
                //     away:'谭纳西・柯基纳吉斯',
                //     odds:'1.005',
                //     oddsInfo_1:'(1:0)谭纳西・柯基纳吉斯+0/0.5',
                // },
                // {
                //     betName:'角球:滚球 让球',
                //     leagueName:'墨西哥超级联赛',
                //     home:'望月慎太郎',
                //     away:'谭纳西・柯基纳吉斯',
                //     odds:'1.005',
                //     oddsInfo_1:'(1:0)谭纳西・柯基纳吉斯+0/0.5',
                // },
                // {
                //     betName:'滚球投注 1x2',
                //     leagueName:'墨西哥超级联赛',
                //     home:'克雷塔罗',
                //     away:'提华纳',
                //     odds:'1.93',
                //     oddsInfo_1:'提华纳',
                // },
            ],
            demoData:[
                {
                    name:'4串1',
                    odds:'14.29',
                    cashMin:10,
                    betTimes:1,
                    cashMax:100,
                    showPad:false,
                },
                {
                    name:'2串1',
                    odds:'22.76',
                    cashMin:10,
                    betTimes:6,
                    cashMax:300,
                    showPad:false,
                },
                {
                    name:'3串1',
                    odds:'29.44',
                    cashMin:10,
                    betTimes:4,
                    cashMax:400,
                    showPad:false,
                },
                {
                    name:'4串11',
                    odds:'66.48',
                    cashMin:10,
                    betTimes:11,
                    cashMax:500,
                    showPad:false,
                },
            ],
            allBetCash:'0.00',
            winCash:'0.00',
            allMulti:false,
            cashPass:null,
            betEnable:false,
            betDisable:true,
            cashDisable:false,
            cashDisableFonts:'',
            winCash:'0.00',
            inputTotal:0,
            sessionData:JSON.parse(sessionStorage.getItem('multiData')),
            multiParams:'',
            matchData:[],
            multiListData:[],
            statusArr:[],
            subMultiParams:'',
            betStatusArr:[],
            subMultiData:[],
		}
	},
	mounted() {
        // this.initOrderData()
        this.getBalance()
        this.getTokenInfo()
        // this.$nextTick(()=>{
        //     this.initOrderData()
        // })
    },
	created() {
        // this.$store.commit('COMMON_MULTIDATA',aaa)
        
        // console.log(this.sessionData)
        // console.log(this.multiParams)
	},
    // computed: 
    //     mapState({
    //         multiData: state => state.common.multiData,
    //     }),
	beforeRouteLeave(to, from, next) {  
		this.$destroy(true)
		next()
	},
	methods: {
        getTokenInfo(){
            if(this.oddsTimer){
                clearInterval(this.oddsTimer);
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
                        this.getInfoFn()
					} else {
						this.$toastTop(data.info,3)
					}
				} else {
                    // this.$toastTop('',2)
				}
			})
            this.oddsTimer = setInterval(() => {
                this.headerSeconds --
                if(this.headerSeconds == 0){
                    this.getTokenInfo()
                    this.headerSeconds = 4
                }
            }, 1000);
        },
        getInfoFn(){
            this.multiParams = ''
            this.sessionData.forEach((ele,index)=>{
                this.multiParams += '{' + '\"type\":' + ele.oddType + ',\"matchId\":' + ele.matchId + ',\"marketId\":' + ele.marketId + '}'
                if(index !== this.sessionData.length - 1){
                    this.multiParams += ','
                }
            })
            let paramData = new FormData()
            paramData.append('token',sessionStorage.getItem('fbToken'))
            paramData.append('appUrl',sessionStorage.getItem('fbAppUrl'))
            paramData.append('requestBody', "{\"languageType\":\"CMN\",\"isSelectSeries\":true,\"betMatchMarketList\":[" + this.multiParams + "]}")
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            axios.post(this.API.getBetLine,paramData,config).then(res => {
                if (res.status == '200'){
                    if(res.data.code === '0000'){
                        this.matchData = res.data.data.bms
                        if(this.multiListData.length === 0){
                            this.multiListData = res.data.data.sos
                            this.multiListData.sort((a,b)=>{
                                return a.in - b.in
                            })
                        }else{
                            this.multiListData.forEach((ele,index)=>{
                                res.data.data.sos.forEach((ele_1,index_1)=>{
                                    if(ele.in === ele_1.in){
                                        ele.sodd = ele_1.sodd.toFixed(2)
                                    }
                                })
                            })
                        }
                        this.initOrderData()
                        if(this.statusArr.length === 0){
                            this.multiListData.forEach((ele,index)=>{
                                let tempData = {
                                    showPad:0
                                }
                                this.statusArr.push(tempData)
                            })
                        }
                        
                    }
                }
            })
        },
        handleSubData(){
            this.betStatusArr.forEach((e,i)=>{
                if(e === 1){
                    this.subMultiData.push(this.multiListData[i])
                }
            })
            // console.log(this.subMultiData)
            this.countVal = 0
            this.subMultiBet(this.subMultiData)
        },
        subMultiBet(multiData){
            this.subMultiParams = ''
            this.sessionData.forEach((ele,index)=>{
                this.subMultiParams += '{\"oddsFormat\":1,' + '\"optionType\":' + ele.oddType + ',\"odds\":' + this.matchData[index].op.od + ',\"marketId\":' + ele.marketId + '}'
                if(index !== this.sessionData.length - 1){
                    this.subMultiParams += ','
                }
            })
            let paramData = new FormData()
            paramData.append('token',sessionStorage.getItem('fbToken'))
            paramData.append('appUrl',sessionStorage.getItem('fbAppUrl'))
            paramData.append('requestBody', "{\"languageType\":\"CMN\",\"betMultipleData\":[{\"oddsChange\":1,\"unitStake\":" + multiData[this.countVal].inputValShow + ",\"seriesValue\":" + multiData[this.countVal].sn + "}],\"betOptionList\":[" + this.subMultiParams + "]}")
            // console.log(paramData.getAll('requestBody'))
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            axios.post(this.API.betMultiSub,paramData,config).then(res => {
                if (res.status == '200'){
                    if(res.data.code === '0000'){
                        this.dataTemp = res.data.data[0].id
                    }
                }
            }).then(()=>{
                console.log(this.countVal)
                if(this.countVal < this.subMultiData.length - 1){
                    this.countVal ++ 
                    setTimeout(() => {
                        this.subMultiBet(this.subMultiData)
                    }, 2600);
                }else{
                    this.getBalance()
                    console.log('finish')
                    return
                }
                // this.dataTemp = '订单号是' + this.dataTemp
            })
        },
        initOrderData(){
            this.multiListData.forEach((item,index) => {
                if(this.multiListData[index].cashPass){
                    this.multiListData[index].cashPass = null
                }
                if(this.multiListData[index].inputVal == undefined){
                    this.multiListData[index].inputVal = 0
                }
                if(this.multiListData[index].inputValShow == undefined){
                    this.multiListData[index].inputValShow = ''
                }
                if(this.multiListData[index].showPad == undefined){
                    this.multiListData[index].showPad = false
                }
                if(this.statusArr.length === 0){
                    item.sodd = item.sodd.toFixed(2)
                }
            })
        },
        quickInputFn(val,index){
            if(val !== -1){
                this.multiListData[index].inputVal = parseFloat(this.multiListData[index].inputVal) + val
            }else{
                this.multiListData[index].inputVal = this.balance
            }
            this.multiListData[index].inputValShow = this.multiListData[index].inputVal + ''
            this.checkInputFn(index)
        },
        betInputFn(val,index){
            if(val === '.'){
                if(this.multiListData[index].inputValShow.indexOf(val) === -1){
                    this.multiListData[index].inputVal = this.multiListData[index].inputVal + '.'
                }else{
                    return false
                }
            }else if(val === 'del'){
                this.multiListData[index].inputVal = this.multiListData[index].inputVal + ''
                this.multiListData[index].inputVal = this.multiListData[index].inputVal.slice(0,-1)
            }else{
                if(this.multiListData[index].inputValShow.indexOf('.') === -1){
                    this.multiListData[index].inputVal = this.multiListData[index].inputVal * 10 + val
                }else{
                    this.multiListData[index].inputVal = this.multiListData[index].inputVal + '' + val
                    this.multiListData[index].inputVal = this.multiListData[index].inputVal.substring(0,this.multiListData[index].inputVal.indexOf(".")+3)
                }
                
            }
            this.multiListData[index].inputValShow = this.multiListData[index].inputVal + ''
            this.$set(this.multiListData[index],'inputValShow',this.multiListData[index].inputVal + '')
            this.checkInputFn(index)
        },
        checkInputFn(index){
            if(this.multiListData[index].inputVal > this.balance){
                this.multiListData[index].inputVal = this.balance
                this.multiListData[index].inputValShow = this.multiListData[index].inputVal + ''
                this.$set(this.multiListData[index],'inputValShow',this.multiListData[index].inputVal + '')
            }
            
            if(this.multiListData[index].inputValShow.length === 0){
                this.multiListData[index].cashPass = null
                this.multiListData[index].inputVal = 0
            }else if(this.multiListData[index].inputVal < 1){
                this.multiListData[index].cashPass = null
                this.$toastTop('输入金额不得小于1',3)
                this.multiListData[index].inputVal = 0
                this.multiListData[index].inputValShow = ''
            }else if(this.multiListData[index].inputVal < this.multiListData[index].cashMin){
                // this.cashDisable = true
                this.multiListData[index].cashPass = false
                // this.betEnable = false
                // this.betDisable = false
                // this.cashDisableFonts = '投注金额不可小于限额'
            }else if(this.multiListData[index].inputVal > this.multiListData[index].cashMax){
                // this.cashDisable = true
                this.cashPass = false
                this.multiListData[index].inputVal = this.multiListData[index].cashMax
                this.multiListData[index].inputValShow = this.multiListData[index].inputVal + ''
                this.$set(this.multiListData[index],'inputValShow',this.multiListData[index].inputVal + '')
                // this.betEnable = false
                // this.betDisable = false
                this.cashDisableFonts = '投注金额不可大于限额'
            }else{
                this.cashPass = true
                this.betEnable = true
                this.cashDisable = false
                this.betDisable = false
            }
            this.inputTotal = null
            this.multiListData.forEach(item => {
                Number(item.inputVal).toFixed(2)
                this.inputTotal += parseFloat(item.inputVal)
                this.inputTotal.toFixed(2)
            })
            this.inputTotal = this.handleTotal(this.inputTotal,2)
            this.allBetCash = this.inputTotal + ''
            this.$forceUpdate()
            this.betStatusArr = []
            this.multiListData.forEach(ele=>{
                if(ele.inputVal === 0){
                    this.betStatusArr.push(0)
                }else{
                    this.betStatusArr.push(1)
                }
            })
        },
        handleTotal(number, precision){
            var str = number + ''
            var len = str.length
            var last = str.substring(len - 1, len)
            if (last == '5') {
                last = '6'
                str = str.substring(0, len - 1) + last
                return (str - 0).toFixed(precision)
            } else {
                return number.toFixed(precision)
            }
        },
        showAllMulti(){
            this.allMulti = true
        },
        hideAllMulti(){
            document.getElementById('scrollTop').scrollTop = 0
            this.allMulti = false
            this.statusArr.forEach(item => {
                this.$set(item,'showPad',false)
            })
        },
        closePadFn(val){
            this.$set(this.multiListData[val],'showPad',false)
        },
        showPadFn(val){
            if(this.balance < this.multiListData[val].cashMin){
                return false
            }
            this.$set(this.multiListData[val],'showPad',true)
            this.allMulti = true
        },
        switchPadFn(val){
            this.statusArr.forEach(ele=>{
                this.$set(ele,'showPad',0)
            })
            this.$set(this.statusArr[val],'showPad',1)
            this.$forceUpdate()
        },
        goBack(){
            this.$router.back()
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
		
	}
}
</script>
<style lang="scss" scoped>
.multi-bet-content {
    min-height: 100vh;
	background: #EDEFF2;
    position: relative;
    padding-top: 1rem;
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
            .multi-num {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: -.48rem;
                // background: #78BDF2;
                background: #9A1032;
                width: 0.38rem;
                height: 0.38rem;
                border-radius: 50%;
                color: #FFFFFF;
                font-size: .28rem;
                z-index: 89;
            }
        }
        .header-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0.8rem;
            height: 0.08rem;
            // background: #78BDF2;
            background: #9A1032;
            margin-left: -.4rem;
        }
        .header-right {
            width: 0.8rem;
            color: #7C8591;
            border: 1px solid #E6E8EF;
            width: 0.6rem;
            height: 0.6rem;
            font-size: .3rem;
            border-radius: 50%;
        }
    }
    .match-content {
        position: relative;
        max-height: calc(100vh - 5.48rem);
        overflow-y: auto;
        overflow-x: hidden;
        .match-list-box {
            padding: .16rem .16rem .42rem;
            background: #FFFFFF;
            align-items: flex-start;
            position: relative;
            .match-list-left {
                margin-top: .2rem;
                width: 60%;
                .match-list-left-line1 {
                    .left-icon {
                        width: 0.06rem;
                        height: 0.4rem;
                        // background: linear-gradient(to bottom,#78BDF2,#FFFFFF);   
                        background: linear-gradient(to bottom,#9A1032,#FFFFFF);   
                        border-radius: .1rem;
                        margin-right: .1rem;
                        font-size: .3rem;
                    }
                }
                
                .match-list-left-line3 {
                    color: #7C8591;
                    margin-left: .16rem;
                    font-size: .28rem;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    word-break:break-all;
                }
            }
            .match-list-right {
                width: 40%;
                text-align: right;
                margin-top: .06rem;
                .match-list-right-line1 {
                    font-size: .3rem;
                    justify-content: flex-end;
                    .match-list-right-line1-odds {
                        font-size: .4rem;
                    }
                }
                .match-list-left-line4 {
                    line-height: 0.4rem;
                    margin-top: .07rem;
                }
            }
            .match-list-left-line2 {
                color: #ADB2BA;
                margin-left: .16rem;
                font-size: .28rem;
                margin-top: .1rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                word-break:break-all;
            }
            .match-list-left-line2-2 {
                margin-top: 0;
            }
            .bottom-icon-area {
                position: absolute;
                right: 0;
                bottom: 0;
                .icon-box {
                    transform: skewX(-30deg);
                    background: #FFCCD0;
                    color: #E90619;
                    font-size: .24rem;
                    width: 1.4rem;
                    height: 0.4rem;
                    .icon-fonts {
                        transform: skewX(30deg);
                    }
                }
                .icon-box2 {
                    background: #E7E8EE;
                    width: 1rem;
                    color: #7F8590;
                }
            }
        }
        .match-list-box:not(:last-child) {
            border-bottom: #EEEEEE 1px solid;
        }
    }
    .bottom-box {
        position: fixed;
        width: 100%;
        bottom: 0;
        .multi-bet-box {
            position: relative;
            margin-bottom: 2rem;
            padding-top: .8rem;
            .bet-pop-title {
                // background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
                background: linear-gradient(90deg, #CA2C48 0%, #882635 100%);
                height: 0.8rem;
                color: #FFFFFF;
                font-size: .32rem;
                padding: 0 .2rem;
                position: absolute;
                width: 100%;
                top: 0;
                .bet-pop-title-left {
                    font-size: .28rem;
                    .folder-icon {
                        height: 0.26rem;
                        margin-right: .1rem;
                    }
                    .title-close-icon {
                        color: #FFFFFF;
                        margin-right: .1rem;
                        font-size: .4rem;
                        font-weight: bold;
                    }
                }
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
            .multi-bet-list-box {
                height: 1.68rem;
                // overflow: hidden;
                overflow-y: auto;
                .multi-bet-list {
                    padding: .22rem .2rem;
                    background: #FFFFFF;
                    .multi-bet-list-conetent-1 {
                        .content-1-left {
                            color: #303030;
                            font-size: .3rem;
                            .left-fonts1 {
                                margin-right: .1rem;
                            }
                        }
                        .content-1-right {
                            .right-icon {
                                color: #7C8591;
                                font-size: .3rem;
                                margin-right: .1rem;
                            }
                            .right-fonts {
                                font-size: .3rem;
                                margin-right: .04rem;
                                width: 0.5rem;
                                text-align: right;
                            }
                            .right-input-box {
                                padding: 0 .1rem;
                                border: 1px solid #C3CAD7;
                                border-radius: .1rem;
                                height: 0.68rem;
                                width: 2.6rem;
                                .right-input-icon {
                                    font-size: .32rem;
                                    margin-right: .1rem;
                                }
                                .right-input-show {
                                    color: #C3CAD7;
                                    font-size: .3rem;
                                    width: 100%;
                                }
                                .right-input-show-enable {
                                    color: #303030;
                                }
                            }
                            .input-activing {
                                border: #9A1032 1px solid;
                            }
                            .input-reminding {
                                border: #EE4351 1px solid;
                            }
                            .input-warning {
                                border: #EE4351 1px solid;
                                .bet-locked {
                                    height: 0.3rem;
                                }
                                .right-input-show {
                                    color: #EE4351;
                                }
                            }
                        }
                    }
                    .click-box {
                        padding: .04rem 0rem .2rem;
                        margin-top: .2rem;
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
                }
                .multi-bet-list:not(:last-child) {
                    border-bottom: #EFEFEF 1px solid;
                }
            }
            .multi-bet-list-box-full {
                height: auto;
                max-height: 50vh;
                overflow-y: auto;
            }
            .nedd-add {
                height: 0;
            }
        }
        .bet-btn-area {
            position: fixed;
            width: 100%;
            bottom: 0;
            box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.16);
            background: #FFFFFF;
            .bet-title {
                padding: .14rem .2rem;
                .title-left {
                    color: #3D3737;
                    font-size: .3rem;
                }
                .title-right {
                    .title-right-fonts-1 {
                        color: #7C8591;
                    }
                    .title-right-fonts-2 {
                        color: #010001;
                        font-size: .38rem;
                    }
                }
            }
            .btn-box {
                padding: 0 .2rem .3rem;
                .btn-1 {
                    // border: 1px solid #78BDF2;
                    border: 1px solid #9A1032;
                    width: 1.4rem;
                    height: 0.8rem;
                    border-radius: .1rem;
                    font-size: .28rem;
                    // color: #1D9DFC;
                    color: #9A1032;
                }
                .btn-2 {
                    width: calc(100% - 1.6rem);
                    height: calc(0.8rem + 2px);
                    background: #DCDDDE;
                    border-radius: .1rem;
                    .btn-fonts-1 {
                        color: #303030;
                        font-size: .34rem;
                        margin-right: .1rem;
                    }
                    .btn-fonts-2 {
                        color: #7C8591;
                    }
                    .btn-fonts-3 {
                        color: #7C8591;
                        font-size: .32rem;
                    }
                }
                .bet-btn-enable {
                    // background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
                    background: linear-gradient(90deg, #CA2C48 0%, #882635 100%);
                    .btn-fonts-1 {
                        color: #FFFFFF;
                    }
                    .btn-fonts-2 {
                        color: #FFFFFF;
                    }
                    .btn-fonts-3 {
                        color: #FFFFFF;
                        font-size: .32rem;
                    }
                }
            }
        }
    }

}
</style>
