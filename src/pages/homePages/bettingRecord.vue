<template>
	<div class="mail-successbig">
		<HeaderTop :title="`投注记录`" :hasright="true" :rightText="timeMode" :routeFuc="sxTime"></HeaderTop>
		<div class="detail">
			<div class="detail-title-list detail-title-list1">
				<div class="fonts">{{totalBetNum}}</div>
				<div class="fonts">单</div>
			</div>
			<div class="blue-line"></div>
			<div class="detail-title-list detail-title-list2">投注:&nbsp;{{totalBetMoney}}</div>
			<div class="blue-line"></div>
			<div class="detail-title-list detail-title-list2">有效:{{validMoney}}</div>
			<div class="blue-line"></div>
			<div class="detail-title-list detail-title-list3" v-if="netMoney === 0 || listData.length === 0">+{{netMoney}}</div>
			<div class="detail-title-list detail-title-list3 red" v-if="netMoney > 0">+{{netMoney}}</div>
			<div class="detail-title-list detail-title-list3 green" v-if="netMoney < 0">{{netMoney}}</div>
		</div>
		<div class="detail-content">
			<!-- <div v-if="listData.length === 0" class="no-records">
				<img src="../../../static/images/no-betting-records.png" alt="">
				<div v-if="selfFlag !== 0">暂时没有{{timeMode}}的记录</div>
				<div v-if="selfFlag === 0">暂时没有此日期范围的记录</div>
			</div> -->
			<div class="detail-content-title">
				<div class="detail-content-title-list detail-content-title-list1">类型</div>
				<div class="detail-content-title-list">投注金额</div>
				<div class="detail-content-title-list">有效金额</div>
				<div class="detail-content-title-list">输赢金额</div>
				<img src="../../../static/images/betRecord-icon-down.png" v-if="!showAllDetail" alt="" class="detail-content-title-icon" @click="clickShowAll(1)">
				<img src="../../../static/images/betRecord-icon-up.png" v-if="showAllDetail" alt="" class="detail-content-title-icon" @click="clickShowAll(2)">
			</div>
			<div class="detail-content-list-box">
				<div class="detail-content-list">
					<div class="detail-content-list-show detail-content-list-show1">
						<div class="column-name">体育</div>
						<div class="orders-num" v-if="tyNum === 0">{{tyNum}}单</div>
						<div class="orders-num blue" v-if="tyNum > 0">{{tyNum}}单</div>
					</div>
					<div class="detail-content-list-show">{{tyTotal}}</div>
					<div class="detail-content-list-show">{{tyValid}}</div>
					<div class="detail-content-list-show">{{tyNet}}</div>
					<img src="../../../static/images/betRecord-icon-down2.png" alt="" class="detail-content-title-icon" v-if="tyData.length === 0">
					<img src="../../../static/images/betRecord-icon-down3.png" alt="" class="detail-content-title-icon" v-if="!showTyDetail && tyData.length > 0" @click="showTyDetail = true">
					<img src="../../../static/images/betRecord-icon-up2.png" alt="" class="detail-content-title-icon" v-if="showTyDetail && tyData.length > 0" @click="showTyDetail = false">
				</div>
				<div class="detail-content-list-detail-box" v-if="showTyDetail">
					<div class="detail-list" v-for="(item,index) in tyData" :key="index">
						<div class="detail-list-left">
							<div class="left-top">{{item.gameName}}</div>
							<div class="left-bottom">{{item.num}}单</div>
						</div>
						<div class="detail-list-right">
							<div class="right-list">{{parseFloat(item.bet).toFixed(2)}}</div>
							<div class="right-list">{{parseFloat(item.valid).toFixed(2)}}</div>
							<div class="right-list red" v-if="parseFloat(item.net).toFixed(2) > 0">+{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-list green" v-if="parseFloat(item.net).toFixed(2) < 0">{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-list black" v-if="parseFloat(item.net).toFixed(2) === 0.00">{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-blank"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="detail-content-list-box">
				<div class="detail-content-list">
					<div class="detail-content-list-show detail-content-list-show1">
						<div class="column-name">棋牌</div>
						<div class="orders-num" v-if="qpNum === 0">{{qpNum}}单</div>
						<div class="orders-num blue" v-if="qpNum > 0">{{qpNum}}单</div>
					</div>
					<div class="detail-content-list-show">{{qpTotal}}</div>
					<div class="detail-content-list-show">{{qpValid}}</div>
					<div class="detail-content-list-show">{{qpNet}}</div>
					<img src="../../../static/images/betRecord-icon-down2.png" alt="" class="detail-content-title-icon" v-if="qpData.length === 0">
					<img src="../../../static/images/betRecord-icon-down3.png" alt="" class="detail-content-title-icon" v-if="!showQpDetail && qpData.length > 0" @click="showQpDetail = true">
					<img src="../../../static/images/betRecord-icon-up2.png" alt="" class="detail-content-title-icon" v-if="showQpDetail && qpData.length > 0" @click="showQpDetail = false">
				</div>
				<div class="detail-content-list-detail-box" v-if="showQpDetail">
					<div class="detail-list" v-for="(item,index) in qpData" :key="index">
						<div class="detail-list-left">
							<div class="left-top">{{item.gameName}}</div>
							<div class="left-bottom">{{item.num}}单</div>
						</div>
						<div class="detail-list-right">
							<div class="right-list">{{parseFloat(item.bet).toFixed(2)}}</div>
							<div class="right-list">{{parseFloat(item.valid).toFixed(2)}}</div>
							<div class="right-list red" v-if="parseFloat(item.net).toFixed(2) > 0">+{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-list green" v-if="parseFloat(item.net).toFixed(2) < 0">{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-list black" v-if="parseFloat(item.net).toFixed(2) === 0.00">{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-blank"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="detail-content-list-box">
				<div class="detail-content-list">
					<div class="detail-content-list-show detail-content-list-show1">
						<div class="column-name">电竞</div>
						<div class="orders-num" v-if="djNum === 0">{{djNum}}单</div>
						<div class="orders-num blue" v-if="djNum > 0">{{djNum}}单</div>
					</div>
					<div class="detail-content-list-show">{{djTotal}}</div>
					<div class="detail-content-list-show">{{djValid}}</div>
					<div class="detail-content-list-show">{{djNet}}</div>
					<img src="../../../static/images/betRecord-icon-down2.png" alt="" class="detail-content-title-icon" v-if="djData.length === 0">
					<img src="../../../static/images/betRecord-icon-down3.png" alt="" class="detail-content-title-icon" v-if="!showDjDetail && djData.length > 0" @click="showDjDetail = true">
					<img src="../../../static/images/betRecord-icon-up2.png" alt="" class="detail-content-title-icon" v-if="showDjDetail && djData.length > 0" @click="showDjDetail = false">
				</div>
				<div class="detail-content-list-detail-box" v-if="showDjDetail">
					<div class="detail-list" v-for="(item,index) in djData" :key="index">
						<div class="detail-list-left">
							<div class="left-top">{{item.gameName}}</div>
							<div class="left-bottom">{{item.num}}单</div>
						</div>
						<div class="detail-list-right">
							<div class="right-list">{{parseFloat(item.bet).toFixed(2)}}</div>
							<div class="right-list">{{parseFloat(item.valid).toFixed(2)}}</div>
							<div class="right-list red" v-if="parseFloat(item.net).toFixed(2) > 0">+{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-list green" v-if="parseFloat(item.net).toFixed(2) < 0">{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-list black" v-if="parseFloat(item.net).toFixed(2) === 0.00">{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-blank"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="detail-content-list-box">
				<div class="detail-content-list">
					<div class="detail-content-list-show detail-content-list-show1">
						<div class="column-name">真人</div>
						<div class="orders-num" v-if="zrNum === 0">{{zrNum}}单</div>
						<div class="orders-num blue" v-if="zrNum > 0">{{zrNum}}单</div>
					</div>
					<div class="detail-content-list-show">{{zrTotal}}</div>
					<div class="detail-content-list-show">{{zrValid}}</div>
					<div class="detail-content-list-show black">{{zrNet}}</div>
					<img src="../../../static/images/betRecord-icon-down2.png" alt="" class="detail-content-title-icon" v-if="zrData.length === 0">
					<img src="../../../static/images/betRecord-icon-down3.png" alt="" class="detail-content-title-icon" v-if="!showZrDetail && zrData.length > 0" @click="showZrDetail = true">
					<img src="../../../static/images/betRecord-icon-up2.png" alt="" class="detail-content-title-icon" v-if="showZrDetail && zrData.length > 0" @click="showZrDetail = false">
				</div>
				<div class="detail-content-list-detail-box" v-if="showZrDetail">
					<div class="detail-list" v-for="(item,index) in zrData" :key="index">
						<div class="detail-list-left">
							<div class="left-top">{{item.gameName}}</div>
							<div class="left-bottom">{{item.num}}单</div>
						</div>
						<div class="detail-list-right">
							<div class="right-list">{{parseFloat(item.bet).toFixed(2)}}</div>
							<div class="right-list">{{parseFloat(item.valid).toFixed(2)}}</div>
							<div class="right-list red" v-if="parseFloat(item.net).toFixed(2) > 0">+{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-list green" v-if="parseFloat(item.net).toFixed(2) < 0">{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-list black" v-if="parseFloat(item.net).toFixed(2) === 0.00">{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-blank"></div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="detail-content-list-box">
				<div class="detail-content-list">
					<div class="detail-content-list-show detail-content-list-show1">
						<div class="column-name">电子</div>
						<div class="orders-num" v-if="dzNum === 0">{{dzNum}}单</div>
						<div class="orders-num blue" v-if="dzNum > 0">{{dzNum}}单</div>
					</div>
					<div class="detail-content-list-show">{{dzTotal}}</div>
					<div class="detail-content-list-show">{{dzValid}}</div>
					<div class="detail-content-list-show">{{dzNet}}</div>
					<img src="../../../static/images/betRecord-icon-down2.png" alt="" class="detail-content-title-icon" v-if="dzData.length === 0">
					<img src="../../../static/images/betRecord-icon-down3.png" alt="" class="detail-content-title-icon" v-if="!showDzDetail && dzData.length > 0" @click="showDzDetail = true">
					<img src="../../../static/images/betRecord-icon-up2.png" alt="" class="detail-content-title-icon" v-if="showDzDetail && dzData.length > 0" @click="showDzDetail = false">
				</div>
				<div class="detail-content-list-detail-box" v-if="showDzDetail">
					<div class="detail-list" v-for="(item,index) in dzData" :key="index">
						<div class="detail-list-left">
							<div class="left-top">{{item.gameName}}</div>
							<div class="left-bottom">{{item.num}}单</div>
						</div>
						<div class="detail-list-right">
							<div class="right-list">{{parseFloat(item.bet).toFixed(2)}}</div>
							<div class="right-list">{{parseFloat(item.valid).toFixed(2)}}</div>
							<div class="right-list red" v-if="parseFloat(item.net).toFixed(2) > 0">+{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-list green" v-if="parseFloat(item.net).toFixed(2) < 0">{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-list black" v-if="parseFloat(item.net).toFixed(2) === 0.00">{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-blank"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="detail-content-list-box">
				<div class="detail-content-list">
					<div class="detail-content-list-show detail-content-list-show1">
						<div class="column-name">彩票</div>
						<div class="orders-num" v-if="cpNum === 0">{{cpNum}}单</div>
						<div class="orders-num blue" v-if="cpNum > 0">{{cpNum}}单</div>
					</div>
					<div class="detail-content-list-show">{{cpTotal}}</div>
					<div class="detail-content-list-show">{{cpValid}}</div>
					<div class="detail-content-list-show">{{cpNet}}</div>
					<img src="../../../static/images/betRecord-icon-down2.png" alt="" class="detail-content-title-icon" v-if="cpData.length === 0">
					<img src="../../../static/images/betRecord-icon-down3.png" alt="" class="detail-content-title-icon" v-if="!showCpDetail && cpData.length > 0" @click="showCpDetail = true">
					<img src="../../../static/images/betRecord-icon-up2.png" alt="" class="detail-content-title-icon" v-if="showCpDetail && cpData.length > 0" @click="showCpDetail = false">
				</div>
				<div class="detail-content-list-detail-box" v-if="showCpDetail">
					<div class="detail-list" v-for="(item,index) in cpData" :key="index">
						<div class="detail-list-left">
							<div class="left-top">{{item.gameName}}</div>
							<div class="left-bottom">{{item.num}}单</div>
						</div>
						<div class="detail-list-right">
							<div class="right-list">{{parseFloat(item.bet).toFixed(2)}}</div>
							<div class="right-list">{{parseFloat(item.valid).toFixed(2)}}</div>
							<div class="right-list red" v-if="parseFloat(item.net).toFixed(2) > 0">+{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-list green" v-if="parseFloat(item.net).toFixed(2) < 0">{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-list black" v-if="parseFloat(item.net).toFixed(2) === 0.00">{{parseFloat(item.net).toFixed(2)}}</div>
							<div class="right-blank"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="loading-new" v-if="showLoading"><img src="../../../static/images/allLoading.gif" alt=""></div>
		<van-popup v-model="timeFlag" class="day-chose-body" :close-on-click-overlay="false">
			<div class="day-chose-content">
				<div class="day-chose-content-title">请选择时间</div>
				<div class="day-chose-content-body">
					<div class="day-list" :class="this.selfFlag===1?`day-list-chosing`:``" @click="selectDay(1)">当天</div>
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
import { Toast } from 'vant';
export default {
	name: 'casino',
	components: {
		HeaderTop,
		Toast
	},
	data() {
		return {
			totalBetNum:0,
			totalBetMoney:'0.00',
			validMoney:'0.00',
			netMoney:'0.00',
			listData:[],
			timeFlag: false,
			selfFlag: 1,
			showLoading: false,
			timeMode:'今日',
			startDate:'',
			endDate:'',
			customShow:false,
			initDate: new Date(),
			dateRange:'',
			showAllDetail:false,
			tyData: [],
			tyNum:0,
			tyTotal:'0.00',
			tyValid:'0.00',
			tyNet:'0.00',
			showTyDetail:false,
			cpData: [],
			qpNum:0,
			qpTotal:'0.00',
			qpValid:'0.00',
			qpNet:'0.00',
			showQpDetail:false,
			zrData: [],
			zrNum:0,
			zrTotal:'0.00',
			zrValid:'0.00',
			zrNet:'0.00',
			showZrDetail:false,
			djData: [],
			djNum:0,
			djTotal:'0.00',
			djValid:'0.00',
			djNet:'0.00',
			showDjDetail:false,
			dzData: [],
			dzNum:0,
			dzTotal:'0.00',
			dzValid:'0.00',
			dzNet:'0.00',
			showDzDetail:false,
			qpData: [],
			cpNum:0,
			cpTotal:'0.00',
			cpValid:'0.00',
			cpNet:'0.00',
			showCpDetail:false,
			betData: [],

		}
	},
	mounted() {
		this.handleDate()
		this.loadTop()
		this.initCustom()
	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
	methods: {
		loadTop() {
			this.showLoading = true
			let params = {
				timeType: this.selfFlag,
				type: 'all',
				version: this.API.paramVersion,
				begin:this.startDate,
				end:this.endDate,
			}
			this.ServerAPI.postAPI(this.API.bettingRecord,params,(success,data)=>{
				if (success) {
					this.showLoading = false
					if (data.code === '0000') {
						this.totalBetNum = data.data.total.num
						this.totalBetMoney = data.data.total.bet
						this.validMoney = data.data.total.valid
						this.netMoney = data.data.total.net
						this.listData = data.data.list
						this.zrData = []
						data.data.list.forEach((item,index)=>{
							if(item.gameBigType === '1'){
								this.zrNum += item.num
								this.zrTotal = (Number(parseFloat(this.zrTotal).toFixed(2)) + Number(parseFloat(item.bet).toFixed(2))).toFixed(2)
								this.zrValid = (Number(parseFloat(this.zrValid).toFixed(2)) + Number(parseFloat(item.valid).toFixed(2))).toFixed(2)
								this.zrNet = (Number(parseFloat(this.zrNet).toFixed(2)) + Number(parseFloat(item.net).toFixed(2))).toFixed(2)
								this.zrData.push(item)
							}
						})
						this.tyData = []
						data.data.list.forEach((item,index)=>{
							if(item.gameBigType === '2'){
								this.tyNum += item.num
								this.tyTotal = (Number(parseFloat(this.tyTotal).toFixed(2)) + Number(parseFloat(item.bet).toFixed(2))).toFixed(2)
								this.tyValid = (Number(parseFloat(this.tyValid).toFixed(2)) + Number(parseFloat(item.valid).toFixed(2))).toFixed(2)
								this.tyNet = (Number(parseFloat(this.tyNet).toFixed(2)) + Number(parseFloat(item.net).toFixed(2))).toFixed(2)
								this.tyData.push(item)
							}
						})
						this.dzData = []
						data.data.list.forEach((item)=>{
							if(item.gameBigType === '3'){
								this.dzNum += item.num
								this.dzTotal = (Number(parseFloat(this.dzTotal).toFixed(2)) + Number(parseFloat(item.bet).toFixed(2))).toFixed(2)
								this.dzValid = (Number(parseFloat(this.dzValid).toFixed(2)) + Number(parseFloat(item.valid).toFixed(2))).toFixed(2)
								this.dzNet = (Number(parseFloat(this.dzNet).toFixed(2)) + Number(parseFloat(item.net).toFixed(2))).toFixed(2)
								this.dzData.push(item)
							}
						})
						this.cpData = []
						data.data.list.forEach((item)=>{
							if(item.gameBigType === '4'){
								this.cpNum += item.num
								this.cpTotal = (Number(parseFloat(this.cpTotal).toFixed(2)) + Number(parseFloat(item.bet).toFixed(2))).toFixed(2)
								this.cpValid = (Number(parseFloat(this.cpValid).toFixed(2)) + Number(parseFloat(item.valid).toFixed(2))).toFixed(2)
								this.cpNet = (Number(parseFloat(this.cpNet).toFixed(2)) + Number(parseFloat(item.net).toFixed(2))).toFixed(2)
								this.cpData.push(item)
							}
						})
						this.qpData = []
						data.data.list.forEach((item)=>{
							if(item.gameBigType === '5'){
								this.qpNum += item.num
								this.qpTotal = (Number(parseFloat(this.qpTotal).toFixed(2)) + Number(parseFloat(item.bet).toFixed(2))).toFixed(2)
								this.qpValid = (Number(parseFloat(this.qpValid).toFixed(2)) + Number(parseFloat(item.valid).toFixed(2))).toFixed(2)
								this.qpNet = (Number(parseFloat(this.qpNet).toFixed(2)) + Number(parseFloat(item.net).toFixed(2))).toFixed(2)
								this.qpData.push(item)
							}
						})
						this.djData = []
						data.data.list.forEach((item)=>{
							if(item.gameBigType === '6'){
								this.djNum += item.num
								this.djTotal = (Number(parseFloat(this.djTotal).toFixed(2)) + Number(parseFloat(item.bet).toFixed(2))).toFixed(2)
								this.djValid = (Number(parseFloat(this.djValid).toFixed(2)) + Number(parseFloat(item.valid).toFixed(2))).toFixed(2)
								this.djNet = (Number(parseFloat(this.djNet).toFixed(2)) + Number(parseFloat(item.net).toFixed(2))).toFixed(2)
								this.djData.push(item)
							}
						})
						Toast('查询成功');
					}else{
						this.totalBetNum = 0
						this.validMoney = this.totalBetMoney = this.netMoney = '0.00'
						this.listData = []
						Toast(data.info);
					}
				}else{
					this.showLoading = false
					Toast('网络缓慢，请稍后再试');
				}
			});
		},
		selectDay(time) {
			this.selfFlag = time;
			if(time === 0){
				this.initCustom()
			}
		},
		sxTime() {
			this.timeFlag = !this.timeFlag
			this.selfFlag = 1
		},
		initCustom(){
			this.startDate = this.initStart
			this.endDate = this.initEnd
			this.dateRange = this.initStart + '至' + this.initEnd
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
				this.endDate = day.format("yyyy-MM-dd")
			}else if(this.selfFlag === 32){
				day.setDate(day.getDate() - 1)
				this.startDate = day.format("yyyy-MM-dd")
				this.endDate = day.format("yyyy-MM-dd")
			}else if(this.selfFlag === 3){
				this.endDate = day.format("yyyy-MM-dd")
				day.setDate(day.getDate() - 2)
				this.startDate = day.format("yyyy-MM-dd")
			}else if(this.selfFlag === 7){
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
					// let date = now.getDate();
					// var s = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date < 10 ? ('0' + date) : date);
					// return s;
				}
				this.startDate = getTime(7)
				this.endDate = getTime(1)
			}
			this.initEnd = day.format("yyyy-MM-dd")
			day.setDate(day.getDate() - 29)
			this.initStart = day.format("yyyy-MM-dd")
		},
		confirmSelect() {
			if(this.selfFlag === 1){
				this.timeMode = '当天'
			}else if(this.selfFlag === 32){
				this.timeMode = '昨日'
			}else if(this.selfFlag === 3){
				this.timeMode = '3天内'
			}else if(this.selfFlag === 7){
				this.timeMode = '7天内'
			}else if(this.selfFlag === 37){
				this.timeMode = '上个自然周'
			}else if(this.selfFlag === 0){
				this.timeMode = '自定义'
			}
			this.timeFlag = false
			this.showAllDetail = false
			this.showTyDetail = this.showQpDetail = this.showDjDetail = this.showZrDetail = this.showDzDetail = this.showCpDetail = false
			this.totalBetNum = this.totalBetMoney = this.netMoney = this.validMoney = 0
			this.tyNum = this.qpNum = this.zrNum = this.djNum = this.dzNum = this.cpNum = 0
			this.tyTotal = this.tyValid = this.tyNet = this.qpTotal = this.qpValid = this.qpNet = this.zrTotal = this.zrValid = this.zrNet = this.djTotal = this.djValid = this.djNet = this.dzTotal = this.dzValid = this.dzNet = this.cpTotal = this.cpValid = this.cpNet = '0.00'
            this.tyData = this.qpData = this.djData = this.zrData = this.dzData = this.cpData = []
			this.handleDate()
			this.loadTop()
		},
		clickShowAll(value){
			this.showAllDetail = !this.showAllDetail
			if(value === 1){
				if(this.tyData.length > 0){
					this.showTyDetail = true
				}
				if(this.qpData.length > 0){
					this.showQpDetail = true
				}
				if(this.djData.length > 0){
					this.showDjDetail = true
				}
				if(this.zrData.length > 0){
					this.showZrDetail = true
				}
				if(this.dzData.length > 0){
					this.showDzDetail = true
				}
				if(this.cpData.length > 0){
					this.showCpDetail = true
				}
			}else if(value === 2){
				this.showTyDetail = this.showQpDetail = this.showDjDetail = this.showZrDetail = this.showDzDetail = this.showCpDetail = false
			}
		},
		formatDate(date) {
			return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		},
		dateConfirm(date){
			const [start, end] = date;
			this.customShow = false;
			this.dateRange = `${this.formatDate(start)} 至 ${this.formatDate(end)}`;
			this.startDate = `${this.formatDate(start)}`
			this.endDate = `${this.formatDate(end)}`
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
		closeCal(){
			if(this.queryRange === undefined){
				Toast('请选择正确的时间范围')
			}else{
				this.dateRange = this.queryRange
				this.customShow = false
			}
		
		},
	}
}
</script>
<style lang="scss" scoped>
.mail-successbig {
	width: 100%;
	height: 100%;
	background: #F6F7F8;
	.detail {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: .2rem;
		background: #fff;
		color: #999999;
		font-size: .18rem;
		margin-top: .02rem;
		box-shadow: 0 5px 9px -2px rgba(0, 0, 0, 0.3);
		.detail-title-list {
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.detail-title-list1 {
			width: 15%;
		}
		.detail-title-list2 {
			width: 30%;
		}
		.detail-title-list3 {
			width: 25%;
		}
		.blue-line {
			width: 1px;
			height: .25rem;
			background: #78BDF2;
		}
		.red {
			color: #D4261F;
		}
		.green {
			color: #1BC02A;
		}
	}
	.detail-content {
		background: #FFFFFF;
		margin-top: .2rem;
		.no-records {
			margin: .5rem auto;
			text-align: center;
			background: #F6F7F8;
			img {
				width: 30%;
				margin: .2rem auto;
			}
			div {
				color: #999999;
			}
		}
		.detail-content-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: .25rem .2rem;
			font-size: .2rem;
			border-bottom: #F0F1F2 1px solid;
			.detail-content-title-list {
				width: 25%;
				text-align: center;
				color: #464646;
			}
			.detail-content-title-list1 {
				width: 18%;
				text-align: left;
			}
			.detail-content-title-icon {
				height: .32rem;
			}
		}
		.detail-content-list-box {
			padding: .25rem .2rem;
			border-bottom: #F0F1F2 1px solid;
			.detail-content-list {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.detail-content-list-show {
					width: 25%;
					color: #7C8591;
					font-weight: bold;
					font-size: .2rem;
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.black {
					color: #303030;
				}
				.detail-content-list-show1 {
					width: 18%;
					font-weight: normal;
					text-align: left;
					.column-name {
						font-size: .26rem;
						color: #464646;
						font-weight: bold;
					}
					.orders-num {
						color: #7C8591;
					}
					.blue {
						color: #167BFF;
					}
				}
				.detail-content-title-icon {
					height: .32rem;
				}
			}
			.detail-content-list-detail-box {
				background: #F0F2F7;
				border-radius: .1rem;
				padding: .05rem 0 .15rem .15rem;
				margin-top: .2rem;
				.detail-list {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: .15rem;
					.detail-list-left {
						width: 18%;
						.left-top {
							color: #464646;
							font-size: .2rem;
							font-weight: bold;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.left-bottom {
							color: #7C8591;
							font-size: .18rem;
						}
					}
					.detail-list-right {
						width: 85%;
						display: flex;
						justify-content: space-between;
						align-items: center;
						border-bottom: #FFFFFF 1px solid;
						padding: .2rem 0;
						.right-list {
							text-align: center;
							width: calc((100% - 0.32rem)/3);
							color: #7C8591;
							font-weight: bold;
							font-size: .18rem;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.red {
							color: #D4261F;
						}
						.green {
							color: #1BC02A;
						}
						.black {
							color: #303030;
						}
						.right-blank {
							width: .32rem;
						}
					}
				}
				.detail-list:last-child .detail-list-right {
					border-bottom: none;
				}
			}
		}
	}
}
.day-chose-body {
	width: 80%;
	border-radius: .2rem;
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
	.day-chose-content {
		text-align: center;
		.day-chose-content-title {
			height: .8rem;
			line-height: .8rem;
			color: #222222;
			font-weight: bold;
			font-size: .26rem;
			border-bottom: #DDDDDD 1px solid;
		}
		.day-chose-content-body {
			padding-bottom: .3rem;
			.day-list {
				height: .8rem;
				line-height: .8rem;
				border-bottom: #DDDDDD 1px solid;
				.more-icon {
					width: .2rem;
				}
			}
			.day-list-chosing {
				color: rgb(8, 149, 254);
				background: #F0F2F7;
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
		}
	}
}
.loading-new {
	position: fixed;
	top: 30%;
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
