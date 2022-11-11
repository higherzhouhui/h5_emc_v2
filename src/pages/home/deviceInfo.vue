<template>
	<div class="homeIframe" ref="screenBox">
		<HeaderTop :title="`设备信息`" :hasright="true" :rightText="`一键截图`" :routeFuc="screenshots"></HeaderTop>
		<div class="info-content">
			<van-field class="list-box" v-model="account" label="会员账号" placeholder="" input-align="right"
			           v-if="showAccount" readonly/>
			<van-field class="list-box" v-model="phoneModel" label="手机型号" placeholder="" input-align="right" readonly/>
			<van-field class="list-box" v-model="login" label="登录端口" placeholder="" input-align="right" readonly/>
			<van-field class="list-box" v-model="version" label="客户端版本" placeholder="" input-align="right" readonly/>
			<van-field class="list-box" v-model="loginIP" label="登录IP" placeholder="" input-align="right" readonly/>
			<van-field class="list-box" v-model="osModel" label="操作系统" placeholder="" input-align="right" readonly/>
			<van-field class="list-box" v-model="browserName" label="浏览器名称" placeholder="" input-align="right" readonly/>
			<van-field class="list-box" v-model="browserVersion" label="浏览器版本" placeholder="" input-align="right" readonly/>
			<van-field class="list-box" v-model="showDate" label="当前时间" placeholder="" input-align="right" readonly/>
		</div>
	</div>
</template>

<script>
import {browserVersion, mobileModel, browserName, osVersion} from 'mobile-device-detect';
import dayjs from 'dayjs';
import HeaderTop from '../../components/top/top';
import html2canvas from 'html2canvas';

export default {
	name: 'deviceInfo',
	components: {
		browserVersion,
		browserName,
		mobileModel,
		osVersion,
		HeaderTop,
		html2canvas
	},
	data() {
		return {
			account: '',
			showAccount: true,
			login: '全站',
			loginIP: '',
			phoneModel: mobileModel,
			osModel: osVersion,
			browserName: browserName,
			browserVersion: browserVersion,
			dateShow: '',
			showDate: '',
			hoursShow: '',
			minsShow: '',
			secsShow: '',
			screenName: '',
            version:this.API.paramVersion,
		}
	},
	mounted() {
		this.getIp();
		this.getUserName();
		this.timeShow();
	},
	created() {
	
	},
	beforeRouteLeave(to, from, next) {    // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		let _this = this;
		clearTimeout(_this.timer);
		this.$destroy(true)
		next()
	},
	methods: {
		screenshots() {
			html2canvas(this.$refs.screenBox).then(canvas => {
				const link = document.createElement('a')
				link.href = canvas.toDataURL()
				link.setAttribute('download', this.screenName + '.png')
				link.style.display = 'none'
				document.body.appendChild(link)
				link.click()
			})
		},
		getUserName() {
			this.account = sessionStorage.getItem('userName');
			if (this.account === null) {
				this.showAccount = false;
			}
		},
		getIp() {
			this.ServerAPI.postAPI(this.API.getIp, '', (success, data) => {
				if (success) {
					if (data.code == '0000') {
						this.loginIP = data.data;
					}
				}
			});
		},
		timeShow() {
			let _this = this;
			this.timer = setInterval(() => {
				_this.date = new Date(); // 修改数据date
				let Y = dayjs().$y + '-';
				let M = dayjs().$M + 1 + '-';
				if (dayjs().$M + 1 < 10) {
					M = '0' + M;
				}
				let D = dayjs().$D + '';
				if (dayjs().$D < 10) {
					D = '0' + D;
				}
				let Hour = dayjs().$H + '';
				if (dayjs().$H < 10) {
					Hour = '0' + Hour;
				}
				let Min = dayjs().$m + '';
				if (dayjs().$m < 10) {
					Min = '0' + Min;
				}
				let Sec = dayjs().$s + '';
				if (dayjs().$s < 10) {
					Sec = '0' + Sec;
				}
				_this.hoursShow = Hour + '';
				_this.minsShow = Min + '';
				_this.secsShow = Sec + '';
				_this.dateShow = Y + M + D;
				_this.showDate = _this.dateShow + '   ' + _this.hoursShow + ':' + _this.minsShow + ':' + _this.secsShow;
				_this.screenName = _this.dateShow + '-' + _this.hoursShow + '-' + _this.minsShow + '-' + _this.secsShow;
			}, 1000)
		},
		
	}
}
</script>
<style lang="scss" scoped>
.info-content {
	margin-top: .1rem;
	
	.list-box {
		border-bottom: #EEEEEE 1px solid;
	}
}

</style>
