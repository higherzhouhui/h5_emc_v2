<template>
	<div class="tradeRecords-body">
		<HeaderTop :title="`交易记录`" :hasright="true" :rightText="dateChosing" :routeFuc="sxTime"></HeaderTop>
		<div class="tradeRecords-content">
            <div class="tab-title">
                <div class="tab-title-list" :class="navActiving === 1?'title-chosing':''" @click="switchNav(1)">充值</div>
                <div class="tab-title-list" :class="navActiving === 2?'title-chosing':''" @click="switchNav(2)">提现</div>
                <div class="tab-title-list" :class="navActiving === 3?'title-chosing':''" @click="switchNav(3)">转账</div>
                <div class="tab-title-list" :class="navActiving === 4?'title-chosing':''" @click="switchNav(4)">红利</div>
            </div>
            <div class="list-border" v-if="navActiving === 1">
                <div class="list-mar" v-for="(v,k) in data" :key="k">
                    <div class="deposit-row1">
                        <p class="name-fonts">{{ v.actionType }}</p>
                        <p class="time-fonts">{{ v.addTime }}</p>
                    </div>
                    <div class="deposit-row2">
                        <p v-if="v.statusId ===0 || v.statusId ===1">{{ v.cash }}元</p>
                        <p v-if="v.statusId === -2 || v.statusId === -1 || v.statusId === 4" class="red">{{ v.cash }}元</p>
                        <p v-if="v.statusId === 2 || v.statusId === 9" class="green">{{ v.cash }}元</p>
                        <p v-if="v.num > 0" class='virtual-num gray'>({{ v.num }}USDT)</p>
                        <p v-if="v.statusId ===0 || v.statusId ===1" class="gray">{{ v.status }}</p>
                        <p v-if="v.statusId === -2 || v.statusId === -1 || v.statusId === 4" class="red">{{ v.status }}</p>
                        <p v-if="v.statusId === 2 || v.statusId === 9" class="green">{{ v.status }}</p>
                    </div>
                </div>
                <div class="click-show-more" v-if='hasMore1' @click="loadMore(1)">点击加载更多</div>
                <div class="click-show-more load-all" v-if='!hasMore1 && data.length > 0'>已加载全部</div>
            </div>
            <lottie  v-if="noRecords && navActiving === 1" style='width:60%;margin:2rem auto 0;height:unset;' class='lottie-icon' :options="defaultOptions"  :width="94" :height="30" v-on:animCreated="handleAnimation" />
            <div class="list-border" v-if="navActiving === 2">
                <div class="list-withdraw" v-for="(i,j) in withdrawData" :key="j">
                    <div class="list-row1">
                        <p>提款至: ***{{ i.card }}</p>
                        <p class="time-fonts">{{ i.addTime }}</p>
                    </div>
                    <div class="list-row3">
                        <div class="flex-c">申请金额</div>
                        <div class="list-row3-right">
                             <p>{{ i.cash }}元</p>
                             <p v-if="i.num > 0" class='virtual-num gray'>({{ i.num }}USDT)</p>
                            <p v-if="i.statusId == 0 || i.statusId == 1" class="gray">{{ i.status }}</p>
                            <p v-if="i.statusId == -2 || i.statusId == -1 || i.statusId == 3" class="red">{{ i.status }}</p>
                            <p v-if="i.statusId == 2 || i.statusId == 9" class="green">{{ i.status }}</p>
                        </div>
                    </div>
                </div>
                <div class="click-show-more" v-if='hasMore2' @click="loadMore(2)">点击加载更多</div>
                <div class="click-show-more load-all" v-if='!hasMore2 && withdrawData.length > 0'>已加载全部</div>
            </div>
            <lottie  v-if="noRecords2 && navActiving === 2" style='width:60%;margin:2rem auto 0;height:unset;' class='lottie-icon' :options="defaultOptions"  :width="94" :height="30" v-on:animCreated="handleAnimation" />
            <div class="list-border" v-if="navActiving === 3">
                <div class="list-mar list-transfer" v-for="(k,l) in transferData" :key="l">
                    <div class="transfer-row1">
                        <p>{{ k.change }}</p>
                        <p class="time-fonts">{{ k.addTime }}</p>
                    </div>
                    <div class="transfer-row2">
                        <p class="bold green">{{ k.cash }} 元</p>
                        <p class="time-fonts green">转账成功</p>
                    </div>
                </div>
                <div class="click-show-more" v-if='hasMore3' @click="loadMore(3)">点击加载更多</div>
                <div class="click-show-more load-all" v-if='!hasMore3 && transferData.length > 0'>已加载全部</div>
            </div>
            <lottie  v-if="noRecords3 && navActiving === 3" style='width:60%;margin:2rem auto 0;height:unset;' class='lottie-icon' :options="defaultOptions"  :width="94" :height="30" v-on:animCreated="handleAnimation" />
            <div class="discount-list list-border" v-if="navActiving === 4">
                <div class="list-mar list-transfer" v-for="(k,l) in discountData" :key="l">
                    <div class="transfer-row1">
                        <p>{{ k.bonusName }}</p>
                        <p class="time-fonts">{{ k.addTime }}</p>
                    </div>
                    <div class="transfer-row2">
                        <p v-if="k.statusId == 0 || k.statusId == 1" class="purple">{{ k.cash }} 元</p>
                        <p v-if="k.statusId == -2 || k.statusId == -1" class="red">{{ k.cash }} 元</p>
                        <p v-if="k.statusId == 2 || k.statusId == 9" class="blue">{{ k.cash }} 元</p>
                        <p v-if="k.statusId == 0 || k.statusId == 1" class="purple">{{ k.status }}</p>
                        <p v-if="k.statusId == -2 || k.statusId == -1" class="red">{{ k.status }}</p>
                        <p v-if="k.statusId == 2 || k.statusId == 9" class="blue">{{ k.status }}</p>
                    </div>
                </div>
                <div class="click-show-more" v-if='hasMore4' @click="loadMore(4)">点击加载更多</div>
                <div class="click-show-more load-all" v-if='!hasMore4 && discountData.length > 0'>已加载全部</div>
            </div>
            <lottie  v-if="noRecords4 && navActiving === 4" style='width:60%;margin:2rem auto 0;height:unset;' class='lottie-icon' :options="defaultOptions"  :width="94" :height="30" v-on:animCreated="handleAnimation" />

		</div>
		<!--loading-new-->
		<div class="loading-new" v-if="showLoading"><img src="../../../static/images/allLoading.gif" alt=""></div>
		<!--日期选择弹框-->
		<van-popup v-model="timeFlag" class="day-chose-body" round  :close-on-click-overlay="false">
			<div class="day-chose-content">
				<div class="day-chose-content-title">请选择时间</div>
				<div class="day-chose-content-body">
					<div class="day-list" :class="this.selfFlag===1?`day-list-chosing`:``" @click="selectDay(1)">今日</div>
					<div class="day-list" :class="this.selfFlag===32?`day-list-chosing`:``" @click="selectDay(32)">昨日</div>
					<div class="day-list" :class="this.selfFlag===3?`day-list-chosing`:``" @click="selectDay(3)">3天内</div>
					<div class="day-list" :class="this.selfFlag===7?`day-list-chosing`:``" @click="selectDay(7)">7天内</div>
					<div class="day-list" :class="this.selfFlag===37?`day-list-chosing`:``" @click="selectDay(37)">上个自然周</div>
                    <div class="day-list" :class="this.selfFlag===0?`day-list-chosing last-list`:``" @click="selectDay(0)">
						<span>自定义</span>
						<img v-if="this.selfFlag !== 0" src="../../../static/images/bettingRecords-more-down.png" alt="" class="more-icon">
						<img v-if="this.selfFlag === 0" src="../../../static/images/bettingRecords-more-up.png" alt="" class="more-icon">
					</div>
                    <div class="day-list custom-date-list" v-if="this.selfFlag === 0" @click="customShow = true">
						<span>日期范围</span>
						<div class="custom-date-list-right">
							<div class="date-show">{{dateRange}}</div>
							<img src="../../../static/images/back-icon.png" alt="" class="custom-icon">
						</div>
					</div>
					<div class="day-comfirm" @click="confirmSelect()">确定</div>
				</div>
			</div>
            <van-calendar class="custom-chose-box" v-if="customShow" :show-title="false" @select="dateSelect" :min-date="new Date(initDate.getFullYear(),initDate.getMonth()-1,1)" :max-date="new Date(initDate.getFullYear(),initDate.getMonth(),initDate.getDate())" color="#0895FE" row-height="54" type="range" :poppable="false" @confirm="dateConfirm"/>
			<div class="calendar-btn" v-if="customShow">
				<div class="btn-fonts" @click="customShow = false">返回</div>
				<div class="btn-fonts blue" @click="closeCal()">完成</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top';
import MuSubmit from '../../components/submit/muSubmit'
import {Toast} from 'vant';
import noData from "@/assets/lottie/noData.json"
export default {
	data() {
		return {
			selected: '1',
			data: [],
			withdrawData: [],
			transferData: [],
			discountData: [],
			timeFlag: false,
			selfFlag: 1,
			statusId: '',
			pageNumber: 1,
			time: 0,
			noRecords: true,
			noRecords2: true,
			noRecords3: true,
			noRecords4: true,
			dateChosing:'今日',
			showLoading:false,
			navActiving:1,
	        dateRange:'',
            customShow:false,
            initDate: new Date(),
            startDate:'',
			endDate:'',
            hasMore1:false,
            hasMore2:false,
            hasMore3:false,
            hasMore4:false,
            defaultOptions:{animationData:noData,loop:true,autoplay:true},
            defaultAnim:'',
		}
	},
	name: 'tradeRecords',
	components: {
		HeaderTop,
		MuSubmit,
		Toast,
		noData,
	},
	mounted() {
        this.initCustom()
        this.handleDate()
		this.getInit()
	},
	beforeRouteLeave(to, from, next) {
	    sessionStorage.removeItem('extend')
		this.$destroy(true)
		next()
	},
	methods: {
        handleAnimation(anim){
            this.defaultAnim = anim;
        },
        getInit(){
            if(sessionStorage.getItem('extend') !== null){
                this.navActiving = parseInt(sessionStorage.getItem('extend'))
                if(this.navActiving === 2){
                    this.withdrawPush()
                }else if(this.navActiving === 3){
                    this.transferPush()
                }else if(this.navActiving === 4){
                    this.discountPush()
                }
            }else{
                this.depositPush()
            }
        },
        switchNav(value){
            this.navActiving = value
            this.pageNumber = 1
            if(value === 1){
                this.data = []
                this.depositPush()
            }else if(value === 2){
                this.withdrawData = []
                this.withdrawPush()
            }else if(value === 3){
                this.transferData = []
                this.transferPush()
            }else if(value === 4){
                this.discountData = []
                this.discountPush()
            }
        },
		depositPush() {
			this.showLoading = true
			let params = {
				pageSize: 10,
				pageNumber: this.pageNumber,
				timeType: this.selfFlag,
				version: this.API.paramVersion,
                beginTime:this.startDate,
                endTime:this.endDate,
			};
			this.ServerAPI.postAPI(this.API.logDeposit, params, this.logDeposit)
		},
		logDeposit(success, data) {
			if (success) {
				if(data.code === '0000'){
					this.showLoading = false
                    this.data = this.data.concat(data.data.list)
                    if(this.pageNumber < data.data.totalPage){
                        this.hasMore1 = true
                    }else{
                        this.hasMore1 = false
                    }
                    if (this.data.length > 0) {
						this.noRecords = false;
					} else {
						this.noRecords = true;
					}
					this.timeFlag = false;
					this.maxPage = data.data.totalPage;
					this.maxSize = data.data.totalSize;
				}else{
					this.showLoading = false
					Toast(data.info)
				}
			}else{
				this.showLoading = false
				Toast('网络超时，请稍后重试')
			}
		},
		withdrawPush() {
			this.showLoading = true
			let params = {
				pageSize: 10,
				pageNumber: this.pageNumber,
				timeType: this.selfFlag,
				version: this.API.paramVersion,
                beginTime:this.startDate,
                endTime:this.endDate,
			};
			this.ServerAPI.postAPI(this.API.logWithdraw, params, this.logWithdraw)
		},
		logWithdraw(success, data) {
			if (success) {
				if(data.code === '0000'){
					this.showLoading = false
                    this.withdrawData = this.withdrawData.concat(data.data.list)
                    if(this.pageNumber < data.data.totalPage){
                        this.hasMore2 = true
                    }else{
                        this.hasMore2 = false
                    }
                    if (this.withdrawData.length > 0) {
						this.noRecords2 = false;
					} else {
						this.noRecords2 = true;
					}
					this.timeFlag = false;
					this.maxPage = data.data.totalPage;
					this.maxSize2 = data.data.totalSize;
				}else{
					this.showLoading = false
					Toast(data.info)
				}
			}else{
				this.showLoading = false
				Toast('网络超时，请稍后重试')
			}
		},
		transferPush() {
			this.showLoading = true
			let params = {
				pageSize: 10,
				pageNumber: this.pageNumber,
				timeType: this.selfFlag,
				version: this.API.paramVersion,
                beginTime:this.startDate,
                endTime:this.endDate,
			};
			this.ServerAPI.postAPI(this.API.logMoneyChange, params, this.logMoneyChange)
		},
		logMoneyChange(success, data) {
			if (success) {
				if(data.code === '0000'){
					this.showLoading = false
                    this.transferData = this.transferData.concat(data.data.list)
                    if(this.pageNumber < data.data.totalPage){
                        this.hasMore3 = true
                    }else{
                        this.hasMore3 = false
                    }
                    if (this.transferData.length > 0) {
						this.noRecords3 = false;
					} else {
						this.noRecords3 = true;
					}
					this.timeFlag = false;
				}else{
					this.showLoading = false
					Toast(data.info);
				}
			}else{
				this.showLoading = false
				Toast('网络超时，请稍后重试')
			}
		},
		discountPush() {
			this.showLoading = true
			let params = {
				pageSize: 10,
				pageNumber: this.pageNumber,
				timeType: this.selfFlag,
				version: this.API.paramVersion,
                beginTime:this.startDate,
                endTime:this.endDate,
			};
			this.ServerAPI.postAPI(this.API.bonus, params, this.logBonus)
		},
		logBonus(success, data) {
			if (success) {
				if(data.code === '0000'){
					this.showLoading = false
                    this.discountData = this.discountData.concat(data.data.list)
                    if(this.pageNumber < data.data.totalPage){
                        this.hasMore4 = true
                    }else{
                        this.hasMore4 = false
                    }
                    if (this.discountData.length > 0) {
						this.noRecords4 = false;
					} else {
						this.noRecords4 = true;
					}
					this.timeFlag = false;
				}else{
					this.showLoading = false
					Toast(data.info);
				}
			}else{
				this.showLoading = false
				Toast('网络超时，请稍后重试')
			}
		},
		confirmSelect() {
			this.showLoading = true
			if(this.selfFlag === 1){
				this.dateChosing = '今日'
			}else if(this.selfFlag === 32){
				this.dateChosing = '昨日'
			}else if(this.selfFlag === 3){
				this.dateChosing = '3日内'
			}else if(this.selfFlag === 7){
				this.dateChosing = '7日内'
			}else if(this.selfFlag === 30){
				this.dateChosing = '30日内'
			}else if(this.selfFlag === 37){
				this.dateChosing = '上个自然周'
			}else if(this.selfFlag === 0){
				this.dateChosing = '自定义'
			}
			this.pageNumber = 1;
            this.data = [],
			this.withdrawData = [],
			this.transferData = [],
			this.discountData = [],
            this.handleDate()
			if (this.navActiving === 1) {
				this.depositPush()
			} else if (this.navActiving === 2) {
				this.withdrawPush()
			} else if (this.navActiving === 3) {
				this.transferPush()
			} else if (this.navActiving === 4) {
				this.discountPush()
			}
		},
		selectDay(time) {
			this.selfFlag = time;
            	if(time === 0){
				this.initCustom()
			}
		},
        initCustom(){
			this.startDate = this.initStart
			this.endDate = this.initEnd
			this.dateRange = this.initStart + '至' + this.initEnd
		},
		sxTime() {
			this.timeFlag = !this.timeFlag
		},
		loadMore(value) {
            this.pageNumber ++ 
            if(value === 1){
                this.depositPush()
            }else if(value === 2){
                this.withdrawPush()
            }else if(value === 3){
                this.transferPush()
            }else if(value === 4){
                this.discountPush()
            }
		},
        handleDate(){
			Date.prototype.format = function (fmt) {
				var o = {
					"M+": this.getMonth() + 1, //月份
					"d+": this.getDate(), //日
					"h+": this.getHours(), //小时
					"m+": this.getMinutes(), //分
					"s+": this.getSeconds(), //秒
					"q+": Math.floor((this.getMonth() + 3) / 3), //季度
					"S": this.getMilliseconds() //毫秒
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
			}
			const day = new Date()
			if(this.selfFlag === 1){
				this.startDate = day.format("yyyy-MM-dd")
                // day.setDate(day.getDate() + 1)
				this.endDate = day.format("yyyy-MM-dd")
			}else if(this.selfFlag === 32){
				day.setDate(day.getDate() - 1)
				this.startDate = day.format("yyyy-MM-dd")
                this.endDate = day.format("yyyy-MM-dd")
			}else if(this.selfFlag === 3){
                // day.setDate(day.getDate() + 1)
				this.endDate = day.format("yyyy-MM-dd")
				day.setDate(day.getDate() - 2)
				this.startDate = day.format("yyyy-MM-dd")
			}else if(this.selfFlag === 7){
                // day.setDate(day.getDate() + 1)
				this.endDate = day.format("yyyy-MM-dd")
				day.setDate(day.getDate() - 6)
				this.startDate = day.format("yyyy-MM-dd")
			}else if(this.selfFlag === 37){
				function getTime(n) {
					let now = new Date();
					let year = now.getFullYear();
					let month = now.getMonth() + 1;
					let day2 = now.getDay(); //返回星期几的某一天;
					n = day2 == 0 ? n + 6 : n + (day2 - 1)
					now.setDate(now.getDate() - n);
                    if(n === 10 || n === 4){
                        var s = now.format("yyyy-MM-dd")
                    }else{
                        let date = now.getDate();
                        var s = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date < 10 ? ('0' + date) : date);
                    }
                    return s;
				}
				this.startDate = getTime(7)
				this.endDate = getTime(1)
			}
			this.initEnd = day.format("yyyy-MM-dd")
			day.setDate(day.getDate() - 29)
			this.initStart = day.format("yyyy-MM-dd")
		},
        formatDate(date) {
			return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		},
        dateSelect(date) {
			const [start, end] = date;
			if(end === null) {
			}else{
				this.queryRange = `${this.formatDate(start)} 至 ${this.formatDate(end)}`;
				this.startDate = `${this.formatDate(start)}`
				this.endDate = `${this.formatDate(end)}`
			}
		},
        dateConfirm(date){
			const [start, end] = date;
			this.customShow = false;
			this.dateRange = `${this.formatDate(start)} 至 ${this.formatDate(end)}`;
			this.startDate = `${this.formatDate(start)}`
			this.endDate = `${this.formatDate(end)}`
		},
        closeCal(){
			if(this.queryRange === undefined){
                Toast('请选择正确的时间范围');
			}else{
				this.dateRange = this.queryRange
				this.customShow = false
			}
		},
	}
}
</script>

<style lang="scss" scoped>
.tradeRecords-body {
	width: 100%;
	height: 100%;
	background-color: #EEEEEE;
	overflow-y: auto;
    .tradeRecords-content {
        width: 100%;
        background-color: #EEEEEE;
        border-radius: .1rem;
        .tab-title {
            width: 96%;
            margin: .2rem auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: .5rem;
            background: #FFFFFF;
            padding: .1rem;
            .tab-title-list {
                width: 25%;
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
        .list-border {
            text-align: center;
            background: #FFFFFF;
            margin-top: .25rem;
            .list-mar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                text-align: center;
                height: 1.3rem;
                border-bottom: #D8E0E8 1px solid;
                .deposit-row1, .transfer-row1 {
                    text-align: left;
                    margin-left: .2rem;
                    .name-fonts {
                        height: 18px;
                    }
                }
            }
            .list-mar:last-child {
                border: none;
            }
            .list-withdraw {
                display: flex;
                justify-content: space-between;
                // text-align: center;
                align-items: center;
                height: 1.3rem;
                border-bottom: #D8E0E8 1px solid;
                padding: 0 .2rem;
            }

            .list-transfer {
                display: flex;
                justify-content: space-between;
                text-align: center;
                .transfer-row1 {
                    text-align: left;
                }

                .transfer-row2 {
                    text-align: right;
                }
            }
            .no-records {
                margin: .25rem auto;
                padding-bottom: .25rem;
                img {
                    width: 30%;
                    margin: .2rem auto;
                }
                div {
                    color: #999999;
                }
            }
            .click-show-more {
                background: #EEEEEE;
                padding: .2rem 0;
                color: #3677FF;
            }
            .load-all {
                color: #999999;
            }
        }
    }
}
.time-fonts {
	font-size: .15rem;
	color: #757F8B;
}
.green {
	color: #1F9300;
}
.mint-navbar .mint-tab-item.is-selected {
	border: none;
}
.purple {
	color: #FF2B2B;
}
.red {
	color: #FF3E3E;
}
.blue {
	color: #3677FF;
}
.gray {
    color: #7C8591;
}





.deposit-row2, .transfer-row2 {
	text-align: right;
	margin-right: .2rem;
}
.virtual-num {
    font-size: .2rem;
    margin: -.06rem 0;
}

.list-row1 {
	width: 3rem;
    text-align: left;
}
.list-row3 {
	width: calc(100% - 3rem);
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    .flex-c {
        background: #7C8591;
        font-size: .2rem;
        color: #FFFFFF;
        border-radius: .08rem;
        width: 1.2rem;
        padding: .02rem 0;
        margin-right: .2rem;
        margin-top: .02rem;
    }
}
.day-chose-body {
	width: 75%;
    .custom-chose-box {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		z-index: 1;
	}
	.calendar-btn {
		position: absolute;
		width: 100%;
		height: 12%;
		bottom: 0;
		background: #FFFFFF;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		color: #A8B3C3;
		font-weight: bold;
		z-index: 2;
		.blue {
			color: #167BFF;
			margin: 0 .35rem 0 .35rem;
		}
	}
}

.day-chose-content {
	text-align: center;
	font-size: .26rem;
	
	
	.day-chose-content-title {
		height: .8rem;
		line-height: .8rem;
		color: #222222;

	}
	
	.day-chose-content-body {
		background: #EEEEEE;
		padding-bottom: .3rem;
		
		.day-list {
			height: .8rem;
			line-height: .8rem;
			border-bottom: #DDDDDD 1px solid;
		}
		
		.day-list-chosing {
			color: #3677FF;
		}
        .last-list {
            border-bottom: #FFFFFF 1px solid;
        }
        .custom-date-list {
				border-bottom: #FFFFFF 1px solid;
				background: #F0F2F7;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 .2rem;
				color: #464646;
				font-size: .2rem;
				.custom-date-list-right {
					display: flex;
					justify-content: flex-end;
					align-items: center;
                    .date-show {
                        width: 3.4rem;
                    }
					.custom-icon {
						transform: rotate(180deg);
						height: .25rem;
						margin-left: .3rem;
						margin-top: .03rem;
					}
				}
				
			}
		.day-comfirm {
			width: 68%;
			margin: .3rem auto 0;
			height: .8rem;
			line-height: .8rem;
			background: rgb(8, 149, 254);
			border-radius: .05rem;
			color: #FFFFFF;
		}
	}
}
.loading-new {
	position: fixed;
	top: 25%;
	left: 50%;
	margin-top: 50px;
	margin-left: -35px;
	z-index: 2019;
	border-radius: .2rem;
	overflow: hidden;
	opacity: .8;
	
	img {
		width: 70px;
	}
}
</style>
