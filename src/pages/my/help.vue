<template>
	<div class="homeIframe">
		<div class="replace-header">
			<div class="left-blank"></div>
			<div class="header-title">在线客服</div>
			<div class="header-right" @click="toDeviceInfo">设备信息</div>
		</div>
		<iframe ref='iframeHeight' id='iframeHeight' frameborder=0 width=100% height=100% marginheight=0 marginwidth=0 scrolling=yes :src="iframeSrc" style="padding-bottom: 1rem;"></iframe>
        
    </div>
</template>

<script>
import { browserVersion,mobileModel,browserName } from 'mobile-device-detect';
import HeaderTop from '../../components/top/top';
export default {
	name: 'live800',
	components: {
		browserVersion,
		browserName,
		mobileModel,
		HeaderTop,
        
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
		this.handleLoginMark();
	},
	created(){
	    this.iframeSrc = sessionStorage.getItem('helpUrl')
        console.log(this.iframeSrc)
	},
	beforeRouteLeave (to, from, next) {    // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
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
				if(data.code==='0000'){
					// if(data.data.helpNo === 1){
					// 	this.iframeSrc  = this.API.kfMeiqia;
					// }
					// if(data.data.helpNo === 2){
					// 	this.iframeSrc = data.data.helpUrl;
					// }
					// if(data.data.helpNo === 3){
                    //     this.iframeSrc  = this.API.kfLcChat;
					// }

                    if(data.data.kefu1 !== null) {
                        if(data.data.kefu1 === 'LiveChatSDK'){
                            this.iframeSrc = this.API.kfLiveChat
                        }else{
                            this.iframeSrc = data.data.kefu1
                        }
                    }else{
                        this.iframeSrc = data.data.kefu2
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
    #iframeHeight {
        height: calc(100vh - 1rem);
    }
}
</style>
