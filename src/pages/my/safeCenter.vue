<template>
	<div class="safe-center">
		<div class="replace-header">
			<div class="goBack" @click="goBack()">
                <img src="../../../static/images/back-icon.png" alt="" class="back-icon">
            </div>
			<div class="header-title">安全中心</div>
			<div class="header-right" @click="getHelpInfo()">
                <img src="../../../static/images/head-help-icon.png" alt="">
            </div>
		</div>
        <div class="main-content">
            <div class="top-title-area flex-c">
                <div class="active-circle-box flex-c">
                    <div class="circle-box flex-c">
                        <van-circle v-model="currentRate" :color="gradientColor" :rate="activingRate" :speed="50" layer-color="#FFF8F1" :stroke-width="100" size='76' stroke-linecap='butt'/>
                    </div>
                    <div class="circle-center">
                        <div class="orange-fonts" v-if='!isCompleted'>{{percentShow}}%</div>
                        <div class="green-fonts" v-if='isCompleted'>100%</div>
                        <div class="gray-fonts">安全系数</div>
                    </div>
                </div>
                <div class="main-title-box bold">
                    <div class="main-fonts1">SAFETY</div>
                    <div class="main-fonts2">安全提示</div>
                    <div class="bottom-bg"></div>
                </div>
                <div class="center-gray-line"></div>
                <div class="top-right">
                    <div class="main-fonts3">
                        确保您的账户安全<br>
                        请绑定下方内容
                    </div>
                </div>
            </div>
            <div class="status-main-box">
                <div class="status-list-box flex-b">
                    <div class="status-list status-list2" @click='toPush(3)'>
                        <div class="status-list-line1 flex bold">
                            <img v-if='hasBank === true || hasVirtual === true || hasDigital === true' src="../../../static/images/safety-has-acc.png" alt="" class="status-icon status-icon2">
                            <img v-if='hasBank === false && hasVirtual === false && hasDigital === false' src="../../../static/images/safety-no-acc.png" alt="" class="status-icon status-icon2">
                            <div class="status-title">账户管理</div>
                        </div>
                        <div class="status-fonts1 bold">
                            银行卡<span class="blue-fonts">[{{bankValue}}/{{bankMax}}]</span> /
                            虚拟币<span class="blue-fonts">[{{virtualValue}}/{{virtualMax}}]</span> /
                            数字货币<span class="blue-fonts">[{{digitalValue}}/{{digitalMax}}]</span>
                        </div>
                        <div class="status-fonts2 bold">不同类型最多可绑定5张</div>
                    </div>
                </div>
                <div class="status-list-box flex-b">
                    <div class="status-list" @click='toPush(1)'>
                        <div class="status-list-line1 flex bold">
                            <img v-if='hasPhone' src="../../../static/images/safety-phone-icon.png" alt="" class="status-icon">
                            <img v-if='!hasPhone' src="../../../static/images/safety-phone-icon2.png" alt="" class="status-icon">
                            <div class="status-title">手机号绑定</div>
                        </div>
                        <div v-if='hasPhone' class="status-fonts1 bold">已验证</div>
                        <div v-if='hasPhone' class="status-fonts2 bold">{{phoneValue}}</div>
                        <div v-if='!hasPhone' class="status-fonts2 status-fonts3 bold">尚未绑定</div>
                    </div>
                    <div class="status-list" @click='toPush(2)'>
                        <div class="status-list-line1 flex bold">
                            <img v-if='hasMail' src="../../../static/images/safety-mail-icon.png" alt="" class="status-icon">
                            <img v-if='!hasMail' src="../../../static/images/safety-mail-icon2.png" alt="" class="status-icon">
                            <div class="status-title">邮箱绑定</div>
                        </div>
                        <div v-if='hasMail' class="status-fonts1 bold">已验证</div>
                        <div v-if='hasMail' class="status-fonts2 bold">{{mailValue}}</div>
                        <div v-if='!hasMail' class="status-fonts2 status-fonts3 bold">尚未绑定</div>
                    </div>
                </div>
                <!-- <div class="status-list-box flex-b">
                    <div class="status-list" @click='toPush(3)'>
                        <div class="status-list-line1 flex bold">
                            <img v-if='hasBank' src="../../../static/images/safety-bank-icon.png" alt="" class="status-icon">
                            <img v-if='!hasBank' src="../../../static/images/safety-bank-icon2.png" alt="" class="status-icon">
                            <div class="status-title">银行卡绑定</div>
                        </div>
                        <div v-if='hasBank' class="status-fonts1 bold">已验证</div>
                        <div v-if='hasBank' class="status-fonts2 bold">最多可绑定 {{bankMax}} 张 <span class="blue-fonts">[{{bankValue}}/{{bankMax}}]</span></div>
                        <div v-if='!hasBank' class="status-fonts2 status-fonts3 bold">尚未绑定</div>
                    </div>
                    <div class="status-list" @click='toPush(4)'>
                        <div class="status-list-line1 flex bold">
                            <img v-if='hasVirtual' src="../../../static/images/safety-virtual-icon.png" alt="" class="status-icon">
                            <img v-if='!hasVirtual' src="../../../static/images/safety-virtual-icon2.png" alt="" class="status-icon">
                            <div class="status-title">虚拟币账户绑定</div>
                        </div>
                        <div v-if='hasVirtual' class="status-fonts1 bold">已验证</div>
                        <div v-if='hasVirtual' class="status-fonts2 bold">最多可绑定 {{virtualMax}} 张 <span class="blue-fonts">[{{virtualValue}}/{{virtualMax}}]</span></div>
                        <div v-if='!hasVirtual' class="status-fonts2 status-fonts3 bold">尚未绑定</div>
                    </div>
                </div> -->
                <div class="status-list-box flex-b">
                    <div class="status-list" @click='toPush(5)'>
                        <div class="status-list-line1 flex bold">
                            <img src="../../../static/images/safety-loginPwd-icon.png" alt="" class="status-icon" style='margin-top:.16rem'>
                            <div class="status-title">登录密码</div>
                        </div>
                        <div class="status-fonts2 status-fonts3 bold">定期修改登录密码保障安全</div>
                    </div>
                    <div class="status-list" @click='toPush(6)'>
                        <div class="status-list-line1 flex bold">
                            <img v-if='hasCashPwd' src="../../../static/images/safety-cashPwd-icon.png" alt="" class="status-icon" style='margin-top:.16rem'>
                            <img v-if='!hasCashPwd' src="../../../static/images/safety-cashPwd-icon2.png" alt="" class="status-icon" style='margin-top:.16rem'>
                            <div class="status-title">提现密码</div>
                        </div>
                        <div v-if='hasCashPwd' class="status-fonts2 status-fonts3 bold">定期修改提现密码保障安全</div>
                        <div v-if='!hasCashPwd' class="status-fonts2 status-fonts3 bold">尚未绑定</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 客服列表弹框 -->
        <van-action-sheet v-model="helpList">
            <div class="help-list-box">
                <img src="../../../static/images/help-list-img1.png" alt="" class="help-list" @click='showNoticeFn(1)' v-if='showHelp1'>
                <img src="../../../static/images/help-list-img2.png" alt="" class="help-list" @click='showNoticeFn(2)' v-if='showHelp2'>
                <div class="help-close-btn">
                    <div class="help-close-btn-fonts flex-c" @click="helpList = false">取消</div>
                </div>
            </div>
        </van-action-sheet>
        <!-- 客服平台公告弹框 -->
        <van-popup v-model="showNotice" class="notice-pop" :close-on-click-overlay='false'>
            <div class="notice-line"></div>
            <div class="notice-title bold flex-c">
                <div class="title-left"></div>
                客服公告
            </div>
            <div class="notice-time flex-c">{{helpData.windowBeginTime}}</div>
            <div class="notice-title-2 text-c">{{helpData.windowTitle}}</div>
            <div class="notice-content" v-html="helpData.windowContent"></div>
            <div class="bottom-btn flex-c" @click='toHelpMode(helpIndex)'>我已了解</div>
        </van-popup>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top';
import {mapState} from 'vuex';
import {mobileModel, browserName, osVersion,browserVersion} from 'mobile-device-detect'
export default {
	name: 'safeCenter',
	components: {
		HeaderTop
	},
	data() {
		return {
			currentRate:0,
            activingRate:0,
            gradientColor:{
                '16%':'#FCAD40',
                '100%':'#DB8E2D',
            },
            isCompleted:false,
            hasPhone:false,
            phoneValue:'',
            hasMail:false,
            mailValue:'',
            hasBank:false,
            bankValue:'',
            bankMax:'',
            hasVirtual:false,
            virtualValue:'',
            virtualMax:'',
            hasCashPwd:false,
            hasDigital:false,
            digitalValue:'',
            digitalMax:'',
            percentShow:0,

            helpList:false,
            showHelp1:false,
            showHelp2:false,
            helpData:{},
            showNotice:false,
            helpNoticeSwitch:false,
            helpIndex:-1,
		}
	},
	mounted() {
		this.loadTop()
	},
	created(){
	
	},
    computed:
        mapState({navigator: state => state.common.navigator}),
        tarbarIndex: state => state.common.tarbarIndex,
	beforeRouteLeave (to, from, next) {    
    	let _this = this
        clearTimeout(_this.percentShowTimer)
		this.$destroy(true)
		next()
	},
	methods: {
		loadTop() {
			this.ServerAPI.postAPI(this.API.safeCenterInfo,'',(success,data) => {
                if(success){
                    if(data.code === '0000'){
                        this.activingRate = data.data.percentage
                        if(data.data.status.mobile === true){
                            this.hasPhone = true
                            this.phoneValue = data.data.details.phone
                        }
                        if(data.data.status.email === true){
                            this.hasMail = true
                            this.mailValue = data.data.details.email
                        }
                        if(data.data.status.bankAccount === true){
                            this.hasBank = true
                        }
                        this.bankValue = data.data.details.bankAccount.number
                        this.bankMax = data.data.details.bankAccount.max
                        if(data.data.status.virtualAccount === true){
                            this.hasVirtual = true
                        }
                        this.virtualValue = data.data.details.virtualAccount.number
                        this.virtualMax = data.data.details.virtualAccount.max
                        if(data.data.status.digitalAccount === true){
                            this.hasDigital = true
                        }
                        this.digitalValue = data.data.details.digitalAccount.number
                        this.digitalMax = data.data.details.digitalAccount.max
                        if(data.data.status.cashPassword === true){
                            this.hasCashPwd = true
                        }
                        let _this = this
                        this.percentShowTimer = setInterval(() => {
                            if(_this.percentShow < data.data.percentage){
                                _this.percentShow ++
                            }else{
                                clearTimeout(_this.percentShowTimer)
                                if(_this.percentShow === 100){
                                    _this.isCompleted = true
                                    _this.gradientColor = {
                                        '0%':'#8ABA42',
                                        '100%':'#6DCB00'
                                    }
                                }
                            }
                        },20)
                    }
                }
            })
		},
        toPush(value){
            if(value === 1){
                this.$router.push('/userPhone')
            }else if(value === 2){
                if (this.hasMail === false) {
                    this.$router.push('/reviseMail2')
                } else if (this.hasMail === true) {
                    this.$router.push('/userEmail')
                }
            }else if(value === 3){
                sessionStorage.setItem('initPage','1')
                this.$router.push('/addBank')
            }else if(value === 4){
                sessionStorage.setItem('initPage','2')
                this.$router.push('/addBank')
            }else if(value === 5){
                this.$router.push('/accountPassword')
            }else if(value === 6){
                this.$router.push('/cashPhonePassword')
            }
        },
		goBack(){
			this.$router.back()
		},
        getHelpInfo() {
            this.helpList = true
			let params = {
				version: this.API.paramVersion,
				appType:'H5',
                visitType: 'WAP',
				phoneVersion:browserName + ' ' + browserVersion,
				phoneModel:mobileModel
			};
			this.ServerAPI.postAPI(this.API.setting,params,(success,data)=>{
                if(success){
                    if(data.code === '0000'){
                        this.helpData = data.data
                        if(data.data.kefu1 !== null) {
                            this.showHelp1 = true
                        }
                        if(data.data.kefu2 !== null){
                            this.showHelp2 = true
                        }
                        if(data.data.windowStatus === true){
                            this.helpNoticeSwitch = true
                        }else{
                            this.helpNoticeSwitch = false
                        }
                    }
                }
            });
		},
        showNoticeFn(val){
            this.helpIndex = val
            if(this.helpNoticeSwitch === true){
                this.showNotice = true
                this.helpList = false
            }else{
                this.toHelpMode(val)
            }
        },
        toHelpMode(value){
            this.showNotice = false
            if(value === 1){
                if(this.helpData.kefu1 === 'LiveChatSDK'){
                    sessionStorage.setItem('helpUrl',this.API.kfLiveChat)
                }else{
                    sessionStorage.setItem('helpUrl',this.helpData.kefu1)
                }
            }else if(value === 2){
                sessionStorage.setItem('helpUrl',this.helpData.kefu2)
            }
            this.$router.push("/help2")
            this.helpList = false
        },
	}
}
</script>
<style lang="scss" scoped>
.safe-center {
    background: #EEEEEE;
    padding-bottom: .4rem;
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
        }
        .header-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0.8rem;
            height: 0.08rem;
            background: #78BDF2;
            margin-left: -.4rem;
        }
        .header-right {
            img {
                height: .8rem;
            }
        }
    }
    .main-content {
        margin-top: 1rem;
        .top-title-area {
            padding-top: .05rem;
            height: 2.6rem;
            background: #FFFFFF;
            .active-circle-box {
                width: 2rem;
                height: 2rem;
                background: url('../../../static/images/safeCenter-top-bg.png') no-repeat;
                background-size: 100% 100%;
                position: relative;
                .circle-box {
                    // height: 2rem;
                    // width: 2rem;
                    // transform: rotate(2deg);
                }
                .circle-center {
                    position: absolute;
                    width: 1.6rem;
                    height: 1rem;
                    text-align: center;
                    font-size: .42rem;
                    top:.56rem;
                    .orange-fonts {
                        color: #B27900;
                        font-weight: bold;
                    }
                    .green-fonts {
                        color: #6FC902;
                        font-weight: bold;
                    }
                    .gray-fonts {
                        color: #BAB9B9;
                        margin-top: -.1rem;
                        font-size: .24rem;
                    }
                }
            }
            .main-title-box {
                height: 1rem;
                width: 1.8rem;
                position: relative;
                margin-left: .2rem;
                .main-fonts1 {
                    color: #A8B3C3;
                    font-size: .35rem;
                }
                .main-fonts2 {
                    color: #1D9DFC;
                    font-size: .4rem;
                    position: absolute;
                    bottom:0;
                    z-index: 3;
                }
                .bottom-bg {
                    position: absolute;
                    width: 1.6rem;
                    height: 0.2rem;
                    background: #F4F4F4;
                    z-index: 2;
                    bottom: .05rem;
                }
            }
            .center-gray-line {
                width: 0.04rem;
                height: .8rem;
                background: #A8B3C3;
            }
            .top-right {
                color: #464646;
                margin-left: .2rem;
            }
        }
        .status-main-box {
            padding: .2rem .12rem 0;
            margin: .1rem auto 0;
            .status-list-box {
                margin-bottom: .12rem;
                .status-list {
                    width: 49.2%;
                    background: #FFFFFF;
                    border-radius: .1rem;
                    padding: .08rem 0 .1rem;
                    .status-list-line1 {
                        color: #464646;
                        font-size: .32rem;
                        height: 0.8rem;
                        .status-icon {
                            width: 1rem;
                        }
                        .status-icon2 {
                            width: unset;
                            height: .8rem;
                        }
                    }
                    .status-fonts1 {
                        margin-left: .12rem;
                        height: 0.4rem;
                        .blue-fonts {
                            color: #1D9DFC;
                        }
                    }
                    .status-fonts2 {
                        color: #A8B3C3;
                        font-size: .24rem;
                        margin-left: .12rem;
                        height: 0.4rem;
                    }
                    .status-fonts3 {
                        height: 0.8rem;
                        line-height: .8rem;
                    }
                }
                .status-list2 {
                    width: 100%;
                }
            }
        }
    }
}
.help-list-box {
    .help-list {
        display: block;
        width: 90%;
        margin: 0 auto .2rem;
    }
    .help-close-btn {
        width: 100%;
        background: #FFFFFF;
        border-radius: .3rem .3rem 0 0;
        color: #7C8591;
        font-weight: bold;
        font-size: .3rem;
        padding: .2rem 0 .2rem;
        .help-close-btn-fonts {
            width: 90%;
            height: .8rem;
            margin: 0 auto;
            border: 1px solid #C3CAD7;
            border-radius: 2px;
        }
    }
}
.van-popup {
    background: none;
}
.safe-center .notice-pop {
    background: #FFFFFF;
    border-radius: .1rem;
    width: 5rem;
    .notice-line {
        background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
        height: 0.16rem;
    }
    .notice-title {
        font-size: .32rem;
        margin-top: .2rem;
        .title-left {
            background: linear-gradient(180deg, #78BDF2 0%, rgba(120,189,242,0) 100%);
            height: 0.34rem;
            width: 0.08rem;
            margin-right: .1rem;
        }
    }
    .notice-time {
        color: #a8b3c3;
        font-size: .2rem;
        margin-top: .04rem;
    }
    .notice-title-2 {
        font-size: .3rem;
        color: #1D9DFC;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 .2rem;
        margin-top: .2rem;   
    }
    .notice-content {
        padding: 0 .26rem .26rem;
        line-height: 20px;
        // color: #17191C;
        color: rgba(0,0,0,.86);
        margin-top: .2rem;
        word-break: break-all;
    }
    .bottom-btn {
        height: 0.8rem;
        border-top: rgba(213,218,226,0.39) 1px solid;
        color: #303030;
        font-size: .3rem;
    }
}
</style>
