<template>
	<div class="homeIframe">
<!--		<div class="replace-header">-->
<!--			<div class="goBack" @click="backToHome"><img src="../../../static/images/back-icon.png"></div>-->
<!--			<div class="header-title">在线客服</div>-->
<!--			<div class="header-right" @click="toDeviceInfo">设备信息</div>-->
<!--		</div>-->
        <HeaderTop :title="`联系客服`" :hasright="true" rightText="设备信息" :routeFuc="toDeviceInfo"></HeaderTop>
		<iframe ref='iframeHeight' frameborder=0 width=100% height=100% marginheight=0 marginwidth=0 scrolling=yes :src="iframeSrc" style="padding-bottom: 1rem;"></iframe>
		<!--        <iframe ref='iframeHeight' frameborder=0 width=100% height=80% marginheight=0 marginwidth=0 scrolling=no :src="iframeSrc" style="position: absolute;height: 80%;margin-top:-14%;"></iframe>-->
	</div>
</template>

<script>
import { browserVersion,mobileModel,browserName } from 'mobile-device-detect';
import HeaderTop from '../../components/top/top';
export default {
	name: 'help2',
	components: {
		browserVersion,
		browserName,
		mobileModel,
		HeaderTop
	},
	data() {
		return {
			iframeSrc: '',
			helpSrc: '',
			userName: '',
			explorerVersion: '',
		}
	},
	mounted() {
		// this.loadTop();
	},
	created(){
	    this.iframeSrc = sessionStorage.getItem('helpUrl')
        console.log(this.iframeSrc)
	},
	beforeRouteLeave (to, from, next) {
		this.$destroy(true)
		next()
	},
	methods: {
		loadTop() {
			let params = {
				version: this.API.paramVersion,
				appType:'H5',
				phoneVersion:browserName + ' ' + browserVersion,
				phoneModel:mobileModel
			};
			this.ServerAPI.postAPI(this.API.setting,params,this.setting);
		},
		backToHome(){
			this.$router.push('/')
		},
		toDeviceInfo(){
			this.$router.push('/deviceInfo')
		},
		setting(success,data){
			if(success){
				if(data.code === '0000'){
					if(data.data.helpNo === 1){
						this.iframeSrc  = this.API.kfMeiqia;
					}
					if(data.data.helpNo === 2){
						this.iframeSrc = data.data.helpUrl;
					}
					if(data.data.helpNo === 3){
                        this.iframeSrc  = this.API.kfLcChat;
					}
				}
			}
		},
	}
}
</script>
<style lang="scss" scoped>
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
	.goBack {
		width: .8rem;
		img {
			float: left;
			width: .2rem;
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
	}
	.header-right {
		font-size: .24rem;
	}
}
.homeIframe{
	height:100%;
}
</style>
