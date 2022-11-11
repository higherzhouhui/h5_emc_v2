<template>
	<div class="quick-withdraw-body">
        <div class="quick-withdraw-content" v-if='quickWithdrawStep1'>
            <div class="top-line flex-b">
				<div class="main-balance flex">
                    <span class="blue-line"></span>
					<span>中心钱包：</span>
					<span class="blue">{{ balance }}</span>
				</div>
				<div class="one-key" @click="withdrawAll()">一键回收</div>
			</div>
            <div class="bank-select-box flex-b">
                <div class="bank-select-left">
                    <lottie style='width:100%;height:unset;margin: 0 0 0 0;padding:0' :options="defaultOptions"/>
                </div>
                <div class="bank-select-right flex-b" @click="showBankList()">
                    <div class="bank-select-right-fonts" :class="bankName !== '请选择银行'?'bank-name-black':''">{{bankName}}</div>
                    <van-icon name="arrow-down" size='20' color="#A8B3C3" style="font-weight:bold"/>
                </div>
            </div>
            <div class="second-title-box flex-b">
                <div class="flex">
                    <div class="left-blue-line"></div>
                    <div class="second-title-fonts">提现金额:{{quickSelectCash}}</div>
                </div>
                <div class="flex" style="margin-right:.2rem;color:#0066D5;font-size:.22rem;" @click="toQuickHelp()">
                    <span>查看提现教程</span>
                    <van-icon name="arrow" />
                    <van-icon name="arrow" style='margin-left:-.16rem'/>
                </div>
            </div>
            <div class="quick-select-box">
                <div class="quick-select-list text-c" :class="quickSelectIndex === index?'quick-select-list-activing':''" v-for='(item,index) in quickSelectData' :key='index' @click="quickSelectFn(index)">
                    ￥ {{item}}
                    <img src="../../../static/images/channel-side-mark-icon.png" v-if='quickSelectIndex === index' alt="" class="bank-quick-list-icon">
                </div>
            </div>
            <div class="withdraw-pwd-box flex">
                <div class="withdraw-pwd-left">提现密码</div>
                <input type="password" maxlength="6" ref='quickWithdrawRefs' @input="toStep2Check()" class="withdraw-pwd-right" placeholder="请输入提现密码">
            </div>
            <div class="start-quick-withdraw flex-c text-c">
                <div class="step1-sub-btn step1-sub-btn1 bold" v-if='!step1Check'>提交</div>
                <div class="step1-sub-btn step1-sub-btn2 bold" v-if='step1Check' @click="startQuickWithdraw()">提交</div>
            </div>
        </div>
        <div class="quick-withdraw-content" v-if='quickWithdrawStep2'>
            <div class="step2-content-box">
                <div class="second-title-box flex-b">
                    <div class="flex">
                        <div class="left-blue-line"></div>
                        <div class="second-title-fonts">提现资料</div>
                    </div>
                    <div class="flex" style="margin-right:.2rem;color:#0066D5;font-size:.22rem;" @click="toQuickHelp()">
                        <span>查看提现教程</span>
                        <van-icon name="arrow" />
                        <van-icon name="arrow" style='margin-left:-.16rem'/>
                    </div>
                </div>
                <div class="step2-content">
                    <!-- <div class="step2-title-fonts bold text-c">订单出款中…</div> -->
                    <div class="top-box flex-c">
                        <img src="../../../static/images/quick-withdraw-proccessing.png" alt="" class="quick-withdraw-proccessing">
                        <div class="quick-withdraw-cash-box">
                            <!-- <div class="quick-withdraw-cash flex">
                                <div class="quick-withdraw-cash-left">到账时间:</div>
                                <div class="quick-withdraw-cash-right">02/30 12:43</div>
                            </div> -->
                            <div class="quick-withdraw-cash flex">
                                <div class="quick-withdraw-cash-left">提现编号:</div>
                                <div class="quick-withdraw-cash-right flex">
                                    <div class="right-order">{{outOrderId}}</div>
                                    <img src="../../../static/images/copy-icon.png" alt="" @click="copyContent('orderNum')" class="copy-icon">
                                </div>
                            </div>
                            <div class="quick-withdraw-cash flex">
                                <div class="quick-withdraw-cash-left">提现金额:</div>
                                <div class="quick-withdraw-cash-right">{{totalCash}}元</div>
                            </div>
                            <div class="quick-withdraw-cash quick-withdraw-cash2 flex">
                                <div class="quick-withdraw-cash-left">已到账金额:</div>
                                <div class="quick-withdraw-cash-right red">{{finishedCashNow}}元</div>
                            </div>
                        </div>
                    </div>
                    <div class="quick-withdraw-status-fonts">
                        您的极速提现订单正在提现中，请您收到转账后仔细<span class="red">核对金额</span>，确认无误后点击确认到账！
                    </div>
                    <div class="mul-mode-records bold" v-if='showRecords'>
                    <!-- <div class="mul-mode-records"> -->
                        <div class="mul-mode-records-title">【到账纪录】</div>
                        <div class="mul-mode-records-content text-c">
                            <div class="border">
                                <div class="records-content flex-b" v-for='(item,index) in orderData' :key='index'>
                                    <div class="records-content-left">
                                        <div class="records-content-left-fonts1">
                                            到账金额:<span class="bold">{{item.cash}}</span>
                                        </div>
                                        <div class="records-content-left-fonts2" v-if='item.status === 0 || item.status === 9'>通知时间:{{item.depositTime.slice(5)}}</div>
                                        <div class="records-content-left-fonts2" v-if='item.status === 3'>系统处理中，请稍后</div>
                                    </div>
                                    <div class="records-content-right" v-if='item.status === 9'>
                                        状态: <span class="gray">已到账</span>
                                    </div>
                                    <!-- <div class="records-content-right" v-if='item.status === -1'>
                                        状态: <span class="gray">已过期</span>
                                    </div> -->
                                    <div class="records-content-right flex-c" v-if='item.status === -1'>
                                        状态: <div class="gray">操作超时<br>视为到账</div>
                                    </div>
                                    <div class="records-content-right" v-if='item.status === 0 || item.status === 3'>
                                        <div class="records-content-right-btn" @click="quickWithdrawCfm(item.orderId)">确认到账</div>
                                        <div class="records-content-right-btn-time" v-if='item.status === 0'>有效时间剩余{{item.mnt}}分</div>
                                        <div class="records-content-right-btn-intro gray flex-c" v-if='item.status === 3' @click="showIntroFn(index)">
                                            说明
                                            <van-icon class="intro-icon" name="question-o" />
                                            <div class="intro-pop text-c" v-if='introIndex === index && showIntro'>由于对账时间延迟, 您有可能会提前收到</div>
                                        </div>
                                    </div>
                                    <div class="side-box flex-c">
                                        <span class="point"></span>
                                        #0{{index + 1}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bottom-help-box">
                        <div class="bottom-help-fonts text-c">若有任何问题请洽</div>
                        <div class="bottom-help-list-box flex-c">
                            <div class="bottom-help-list" v-if="showHelp1" @click="toHelpMode(1)">【在线客服一】</div>
                            <div class="bottom-help-line" v-if="showHelp2">|</div>
                            <div class="bottom-help-list" v-if="showHelp2" @click="toHelpMode(2)">【客服线路二】</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="step2-single-btn-box text-c">
                <div class="step1-sub-btn step1-sub-btn2 bold" @click="quickWithdrawCfm(orderIdSingle)" v-if='step2SingleMode'>确认到账</div>
            </div> -->
            <input id="copy_content2" type="text" value="" style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;" readonly/>
        </div>
        <div class="bottom-reminds-box">
            <img src="../../../static/images/upload-warning.png" alt="" class="bottom-reminds-left">
            <div class="bottom-reminds-right">
                <div class="bottom-reminds-right-list" v-html="queryIntro.replace(/\\n/g, '<br>')"></div>
                <!-- <div class="bottom-reminds-right-list">1.单笔提现金额最低¥100, 上限¥40000</div>
                <div class="bottom-reminds-right-list">2.收到正确提现金额后,请于 30分钟内点击"确认到账"</div>
                <div class="bottom-reminds-right-list">3.未在 30分钟内点击"确认到账",操作超时视为到账</div>
                4.若遇到以下问题请即时联系在线客服：<br>
                - 规定时间内提现未到账;<br>
                - 实际到账金额与订单金额不符;<br>
                - 会员未收到金额，已点击确认到账。 -->
            </div>
        </div>
        <div class="bottom-banner-title flex" v-if='showBanner'>
            <div class="bottom-banner-left"></div>
            <span>优惠活动</span>
        </div>
        <img v-if='showBanner' v-lazy="quickBannerUrl" alt="" class="bottom-banner-img" @click="toDiscount()">
        <van-popup class="popup-content" v-model="showSelect" position="bottom">
            <van-picker show-toolbar :columns="pickerList" :title="'请选择银行卡'" @confirm="onConfirmBank" @change="onChangeBank" @cancel="showSelect = false" swipe-duration='500'/>
        </van-popup>
        <van-popup v-model="quickWithdrawCfmPop" :close-on-click-overlay='false'>
            <div class="confirm-sub-box">
                <div class="confirm-sub-line confirm-sub-line-blue"></div>
                <div class="confirm-sub-title">
                    <span class="confirm-sub-title-left"></span>确认到账
                </div>
                <div class="confirm-sub-content-gray confirm-sub-content-gray2 text-c">请确认到帐金额是否正确，若有任何问题请与客服联系。</div>
                <div class="confirm-sub-content-gray confirm-sub-content-gray2 text-c">点击确认视同金额无误，若事后發生任何問題，需自行承担结果。</div>
                <div class="confirm-sub-bottom">
                    <div class="confirm-sub-btn" @click="quickWithdrawCfmPop = false">取消</div>
                    <div class="confirm-sub-btn confirm-sub-btn2" @click='subQuickWithdraw()'>确认</div>
                </div>
            </div>
        </van-popup>
        <!--loading-new-->
		<div class="loading-new" v-if="showLoading"><img src="../../../static/images/allLoading.gif" alt=""></div>
    </div>
</template>
<script>
import { Toast } from 'vant'
import cardIcon from "@/assets/lottie/cardIcon.json"
import {mobileModel, browserName, osVersion,browserVersion} from 'mobile-device-detect'
export default {
	name: 'quickWithdrawComponent',
	components: {
		Toast,
	},
	data() {
		return {
            balance: '',
            bankName:'请选择银行',
            showSelect: false,
            bankList: [],
            pickerList: [],
            quickSelectCash:'',
            quickSelectIndex:-1,
            quickSelectData:[],
            step1Check:false,
            quickWithdrawStep1:true,
            quickWithdrawStep2:false,
            finishedCashNow:0,
            quickWithdrawCfmPop:false,
            mntShow1:0,
            mntShow2:0,
            secShow1:0,
            secShow2:0,
			defaultOptions:{animationData:cardIcon,loop:true,autoplay:true},
            showLoading:false,
            outOrderId:'',
            orderData:[],
            totalCash:0,
            timeArr:[],
            time:null,
            orderIdSingle:null,
            showRecords:false,

            showHelp1:true,
            showHelp2:true,
            helpData:{},
            showBanner:false,
            quickBannerUrl:'',
            subOrderId:'',
            showHandlePop:true,
            showIntro: false,
            introIndex:-1,

		}
	},
    props:['queryIntro'],
	mounted() {
		this.getChannels()
		this.getStatus()
		this.getHelpInfo()
		this.getBanner()
	},
    created() {
        this.$Lazyload.options.loading = 'static/images/discount-lazy.jpg'
        this.$Lazyload.options.error = 'static/images/discount-lazy.jpg'
	},
    beforeRouteLeave(to, from, next) {  
        //  if(this.timer !== null){
            let _this = this
                    clearInterval(_this.timer2)
        //         }
        this.$destroy(true)
        next()
	},
	methods: {
        getBanner(){
            let params = {
                visitType:'APP',
                showType:'MY',
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.bannerList, params, (success,data) => {
                if(success){
                    if(data.code === '0000'){
                        data.data.forEach((i,t)=>{
                            if(i.openValue === '198'){
                                this.showBanner = true
                                this.quickBannerUrl = i.image
                            }
                        })
                    }
                }
            })
        },
        getChannels(){
            let params = {
                visitType:'APP',
                version:this.API.paramVersion,
            }
            this.ServerAPI.postAPI(this.API.withdrawChannels, params, (success,data)=>{
                if (success) {
                    if (data.code === '0000') {
                        this.balance = data.data.bank.money
                        this.bankList = data.data.bank.accountList
                        // this.memberBankId = this.bankList[0].memberAccountId
                        if(this.bankList.length === 0){
                            this.bankName = '请点击绑定银行卡'
                        }
                        data.data.bank.accountList.forEach((item)=>{
                            this.pickerList.push(item.memberCard)
                        })
                    }
                }
            })
        },
        getStatus(){
            this.showLoading = true
            let params = {
                version:this.API.paramVersion,
            }
            this.ServerAPI.postAPI(this.API.getWithdrawJiSuStatus, params, (success,data)=>{
                this.showLoading = false
                if (success) {
                    if (data.code === '0000') {
                        this.quickSelectData = data.data.cashList
                        if(data.data.status === -1){
                            this.quickWithdrawStep1 = true
                            this.quickWithdrawStep2 = false
                            this.showRecords = false
                            sessionStorage.setItem('needHandleWithdraw','false')
                            this.$emit('showBalance','true')
                        }else if(data.data.status === 0){
                            this.quickWithdrawStep1 = false
                            this.quickWithdrawStep2 = true
                            this.outOrderId = data.data.outOrderId
                            this.totalCash = data.data.totalCash
                            this.showRecords = false
                            this.$emit('showBalance','false')
                            sessionStorage.setItem('needHandleWithdraw','false')
                        }else if(data.data.status === 1){
                            sessionStorage.setItem('needHandleWithdraw','true')
                            this.quickWithdrawStep1 = false
                            this.quickWithdrawStep2 = true
                            this.outOrderId = data.data.outOrderId
                            this.finishedCashNow = data.data.overCash
                            this.totalCash = data.data.totalCash
                            this.orderData = data.data.memberCashOutDetailList
                            this.orderIdSingle = this.orderData[0].orderId
                            // if(this.orderData[0])
                            if(this.orderData.length > 0){
                                this.showRecords = true
                                this.timeArr = []
                                if(this.orderData[0].second && this.orderData[0].second > 0){
                                    this.timeArr.push(this.orderData[0].second)
                                }else{
                                    if(this.orderData[0].status === -1){
                                        this.timeArr.push(-1)
                                    }else if(this.orderData[0].status === 3){
                                        this.timeArr.push(-2)
                                    }else if(this.orderData[0].status === 9){
                                        this.timeArr.push(-3)
                                    }
                                }
                                this.withdrawTimeCount(2)
                            }
                            this.$emit('showBalance','false')
                        }else if(data.data.status === 2){
                            this.$emit('showBalance','false')
                            sessionStorage.setItem('needHandleWithdraw','true')
                            this.quickWithdrawStep1 = false
                            this.quickWithdrawStep2 = true
                            this.totalCash = data.data.totalCash
                            this.finishedCashNow = data.data.overCash
                            this.outOrderId = data.data.outOrderId
                            this.orderData = data.data.memberCashOutDetailList
                            if(this.orderData.length > 0){
                                this.showRecords = true
                                this.timeArr = []
                                this.orderData.forEach((i,t)=>{
                                    if(i.second && i.second > 0){
                                        this.timeArr.push(i.second)
                                    }else{
                                        if(i.status === -1){
                                            this.timeArr.push(-1)
                                        }else if(i.status === 3){
                                            this.timeArr.push(-2)
                                        }else if(i.status === 9){
                                            this.timeArr.push(-3)
                                        }
                                    }
                                })
                                this.withdrawTimeCount(2)
                            }
                        }else{
                            
                        }
                        let _this = this
                        _this.timer2 = setTimeout(() => {
                            _this.getStatus()
                        }, 10000);
                        _this.$once('hook:beforeDestroy', () => {  
                            clearInterval(_this.timer2);  
                        })
                    }
                }
            })
        },
        startQuickWithdraw(){
            this.finishedCashNow = 0
            let params = {
                version:this.API.paramVersion,
                memberBankId:this.memberBankId,
                cash:this.quickSelectCash,
                cashPassword:this.$refs.quickWithdrawRefs.value
            }
            this.ServerAPI.postAPI(this.API.getWithdrawJiSu, params, (success,data)=>{
                if (success) {
                    if (data.code === '0000') {
                        this.quickWithdrawStep1 = false
                        this.quickWithdrawStep2 = true
                        this.outOrderId = data.data.outOrderId
                        this.totalCash = this.quickSelectCash
                        this.$emit('showBalance','false')
                    }else{
                        this.$toast(data.info,2)
					}
                }
            })
        },
        quickWithdrawCfm(orderId){
            this.subOrderId = orderId
            this.quickWithdrawCfmPop = true
        },
        onConfirmBank(value, index) {
            this.bankName = value
            this.memberBankId = this.bankList[index].memberAccountId
            this.showSelect = false
            // this.checkContent()
            this.toStep2Check()
        },
        showBankList(){
            if(this.bankList.length === 0){
                this.$router.push('/addbankCard')
            }else{
                this.showSelect = true
            }
        },
        onChangeBank(picker, value, index){
        },
        quickSelectFn(index){
            this.quickSelectIndex = index
            this.quickSelectCash = this.quickSelectData[index]
            this.toStep2Check()
        },
        toStep2Check(){
            if(this.bankName !== '请选择银行' && this.quickSelectCash !== '' && this.$refs.quickWithdrawRefs.value.length > 0){
                this.step1Check = true
            }else{
                 this.step1Check = false
            }
        },
        withdrawTimeCount(value) {
            if(value === 1){
            }else if(value === 2){
                var timeCountsMax = Math.max(...this.timeArr)
                var addCount = 0
                let _this = this
                if(_this.timer){
                    clearInterval(_this.timer)
                }
                _this.timer = setInterval(() => {
                    if(timeCountsMax !== -1 || timeCountsMax !== -2 || timeCountsMax !== -3){
                        timeCountsMax --;
                        addCount ++
                        if (timeCountsMax > 0) {
                            _this.timeArr.forEach((i,t) => {
                                if(i > 0 ){
                                    if(i - addCount > 0){
                                        i = i - addCount
                                        let handleMnt = parseInt(i / 60) 
                                        if(handleMnt < 1) {
                                            handleMnt = 1
                                        }else if(handleMnt < 0) {
                                            handleMnt = 0
                                        }
                                        let handleSec = parseInt(i%60)
                                        _this.$set(_this.orderData[t],'mnt',handleMnt)
                                        _this.$set(_this.orderData[t],'sec',handleSec)
                                    }else{
                                        _this.$set(_this.orderData[t],'status',-1)
                                        // _this.$router.back()
                                    }
                                }
                                // else{
                                //     _this.$set(_this.orderData[t],'status',3)
                                // }
                            })
                        }else {
                            // _this.orderData.forEach((v,m)=>{
                            //     v.status = -1
                            // })
                            clearInterval(_this.timer);
                        }
                    }else{
                        _this.orderData.forEach((v,m)=>{
                            if(v === -1){
                                _this.$set(_this.orderData[m],'status',-1)
                            }else if(v === -2){
                                _this.$set(_this.orderData[m],'status',9)
                            }else if(v === -3){
                                _this.$set(_this.orderData[m],'status',3)
                            }
                        })
                    }
                    _this.$once('hook:beforeDestroy', () => {  
                        clearInterval(_this.timer);  
                    })
                }, 1000);
            }
        },
        getHelpInfo() {
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
                    }
                }
            });
		},
        toHelpMode(value){
            if(value === 1){
                if(this.helpData.kefu1 === 'LiveChatSDK'){
                    sessionStorage.setItem('helpUrl',this.API.kfLiveChat)
                }else{
                    sessionStorage.setItem('helpUrl',this.helpData.kefu1)
                }
            }else if(value === 2){
                sessionStorage.setItem('helpUrl',this.helpData.kefu2)
            }
            this.$emit('queryRouter','true')
        },     
        toDiscount(){
            this.$router.push({name: 'discountOne', params: {id: 198}});
        },    
        subQuickWithdraw(){
            this.showLoading = true
            let params = {
                version:this.API.paramVersion,
                orderId:this.subOrderId
            }
            this.ServerAPI.postAPI(this.API.WithdrawJiSuCfm, params, (success,data)=>{
                this.showLoading = false
                this.quickWithdrawCfmPop = false
                if (success) {
                    if (data.code === '0000') {
                        clearInterval(this.timer);
                        Toast('确认成功')
                        this.getStatus()
                    }
                }
            })
        },
        finishedQuickWithdraw(){

        },
        toQuickHelp() {
            sessionStorage.setItem('helpIndex','quickWithdraw')
            this.$router.push('/newerHelp')
        },
        showIntroFn(val){
            this.showIntro = true
            this.introIndex = val
            setTimeout(()=>{
                this.showIntro = false
                this.introIndex = -1
            },2000)
        },
        copyContent(value) {
            var clickContent
            if(value === 'orderNum'){
                clickContent = this.outOrderId
            }
			var inputElement = document.getElementById('copy_content2')
			inputElement.value = clickContent
			inputElement.select()
			document.execCommand('Copy')
			Toast('复制成功')
		},
		withdrawAll () {
			this.showLoading = true
			this.ServerAPI.postAPI(this.API.gameWithdrawAll, '', (success,data) => {
                this.showLoading = false
                if (success) {
                    if (data.code == '0000') {
                        Toast('一键回收成功')
                        this.getChannels()
		                this.getStatus()
                    } else {
                        Toast(data.info)
                    }
                } else {
                    Toast('网络错误，请重试')
                }
            })
		},
	}
}
</script>
<style lang="scss" scoped>
.quick-withdraw-body {
    background: #EDEFF2;
    padding-bottom: .3rem;
    color: #303030;
    .quick-withdraw-content {
        // width: 97%;
        margin: 0 auto 0;
        background: #FFFFFF;
        .bank-select-box {
            padding: 0 .3rem 0 .2rem;
            .bank-select-left {
                width: 1rem;
                margin-top: .1rem;
            }
            .bank-select-right {
                border: 1px solid #F4F4F4;
                border-radius: .05rem;
                height: 0.8rem;
                width: calc(100% - 1rem);
                padding: 0 .2rem;
                color: #999999;
                .bank-name-black {
                    color: #464646;
                }
            }
        }
        .second-title-box {
            height: 1rem;
            border-top: 1px solid #F2F1F3;
            font-size: .28rem;
            padding: 0 .3rem;
            .left-blue-line {
                width: 0.08rem;
                height: 0.4rem;
                background: -webkit-linear-gradient(top, #78BDF2, #FFFFFF);
                background: linear-gradient(to bottom, #78BDF2, #FFFFFF);
            }
            .second-title-fonts {
                color: #0066D5;
                font-weight: bold;
                margin: 0 0 0 .1rem;
            }
        }
        .quick-select-box {
            width: calc(100% - .6rem);
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            border-top: 1px solid #F2F1F3;
            padding-bottom: .2rem;
            .quick-select-list {
                border: 1px solid #E6E8EE;
                border-radius: .06rem;
                color: #464646;
                width: 22%;
                margin-right: .266rem;
                margin-top: .2rem;
                height: .68rem;
                line-height: .68rem;
                font-size: .24rem;
                font-weight: bold;
                position: relative;
            }
            .quick-select-list:nth-child(4),
            .quick-select-list:nth-child(8),
            .quick-select-list:nth-child(12)
             {
                margin-right: 0;
            }
            .quick-select-list-activing {
                border: 1px solid #fdba32;
                .bank-quick-list-icon {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 0.32rem;
                }
            }
        }
        .withdraw-pwd-box {
            border-top: 1px solid #F2F1F3;
            padding: 0 .3rem;
            height: 1rem;
            .withdraw-pwd-left {
                color: #464646;
            }
            .withdraw-pwd-right {
                margin-left: .2rem;
                border: none;
                outline: none;
            }
        }
        .start-quick-withdraw {
            height: 1.4rem;
            background: #EDEFF2;
            .step1-sub-btn {
                width: 88%;
                height: 0.8rem;
                line-height: .8rem;
                margin: 0 auto;
                font-size: .3rem;
            }
            .step1-sub-btn1 {
                background: #D7D7D8;
                color: #303030;
            }
            .step1-sub-btn2 {
                background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
                box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
                color: #FFFFFF;
            }
        }
        .step2-content-box {
            .step2-content {
                width: calc(100% - .6rem);
                padding: .2rem 0;
                border-top: #E6E8EE 1px solid;
                margin: 0 auto;
                .step2-title-fonts {
                    color: #303030;
                    font-size: .3rem;
                }
                .top-box {
                    .quick-withdraw-proccessing {
                        display: block;
                        width: 20vw;
                        margin: 0 .2rem 0 .9rem;
                    }
                    .quick-withdraw-cash-box {
                        .quick-withdraw-cash {
                            // margin-top: .06rem;
                            color: #868F9A;
                            text-align: left;
                            font-size: .2rem;
                            .quick-withdraw-cash-left {
                                width: 1.5rem;
                            }
                            .quick-withdraw-cash-right {
                                width: 2rem;
                                .right-order {
                                    width: 1.6rem;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }
                                .copy-icon {
                                    height: 0.32rem;
                                    margin-left: .1rem;
                                }
                            }
                        }
                        .quick-withdraw-cash2 {
                            color: #303030;
                        }
                    }
                }
                
                .quick-withdraw-status-fonts {
                    color: #7C8591;
                    font-size: .3rem;
                    margin-top: .2rem;
                }
                .mul-mode-records {
                    margin-top: .2rem;
                    color: #303030;
                    .mul-mode-records-title {
                        height: 0.8rem;
                        line-height: .8rem;
                        background: linear-gradient(to bottom,#F4F4F8,#FFFFFF);
                        border-radius: .15rem .15rem 0 0;
                    }
                    .mul-mode-records-content {
                        background: #F6F6FA;
                        padding: .3rem .1rem;
                        border-radius: .2rem;
                        margin-top: -.1rem;
                        .border {
                            border-top: none;
                            .records-content {
                                height: 1.4rem;
                                background: #FFFFFF;
                                border-radius: .2rem;
                                position: relative;
                                .records-content-left {
                                    width: 62%;
                                    color: #303030;
                                    line-height: .3rem;
                                    text-align: left;
                                    padding-left: .8rem;
                                    .records-content-left-fonts1 {
                                        font-size: .3rem;
                                    }
                                    .records-content-left-fonts2 {
                                        font-size: .2rem;
                                        margin-top: .1rem;
                                        color: #7C8591;
                                    }
                                }
                                .records-content-right {
                                    width: 38%;
                                    color: #303030;
                                    .records-content-right-btn {
                                        width: 70%;
                                        color: #FFFFFF;
                                        height: 0.68rem;
                                        line-height: .68rem;
                                        background: linear-gradient(92deg, #78BDF2 0%, #167BFF 100%);
                                        border-radius: .5rem;
                                        margin: 0 auto;
                                    }
                                    .records-content-right-btn-time {
                                        font-size: .2rem;
                                        color: #FF0000;
                                    }
                                    .records-content-right-btn-intro {
                                        font-size: .22rem;
                                        margin-top: .05rem;
                                        position: relative;
                                        z-index: 1;
                                        .intro-icon {
                                            margin-top: .01rem;
                                            margin-left: .06rem;
                                        }
                                        .intro-pop {
                                            position: absolute;
                                            width: 5.6rem;
                                            height: 1rem;
                                            line-height: 1.1rem;
                                            bottom: -.9rem;
                                            right: .55rem;
                                            z-index: 2;
                                            font-size: .2rem;
                                            background: url('../../../static/images/quick-withdraw-intro-bg.png') no-repeat;
                                            background-size: 100% 100%;
                                        }
                                    }
                                    .gray {
                                        color: #7C8591;
                                        margin-left: .1rem;
                                    }
                                }
                                .side-box {
                                    position: absolute;
                                    width: 0.8rem;
                                    height: 0.4rem;
                                    background: #A8B3C3;
                                    border-radius: .2rem 0 .2rem 0;
                                    top: 0;
                                    left: 0;
                                    color: #FFFFFF;
                                    font-size: .22rem;
                                    .point {
                                        width: 0.1rem;
                                        height: 0.1rem;
                                        border-radius: 50%;
                                        background: #FFFFFF;
                                        margin-right: .05rem;
                                    }
                                }
                            }
                            .records-content:not(:first-child) {
                                margin-top: .2rem;
                            }
                        }
                        
                    }
                }
                .bottom-help-box {
                    margin-top: .3rem;
                    font-size: .3rem;
                    .bottom-help-fonts {
                    }
                    .bottom-help-list-box {
                        margin-top: .1rem;
                        .bottom-help-list {
                            color: #1D9DFC;
                        }
                        .bottom-help-line {
                            margin: 0 .2rem;
                        }
                    }
                }
            }
        }
        .step2-single-btn-box {
            padding: .3rem 0;
            width: 100%;
            background: #EEEEEE;
            .step1-sub-btn {
                width: calc(100% - .6rem);
                height: 0.8rem;
                line-height: .8rem;
                margin: 0 auto;
                font-size: .3rem;
                border-radius: .05rem;
            }
            .step1-sub-btn1 {
                background: #FFFFFF;
                color: #303030;
                border: 1px solid #DDDDDD;
                margin-top: .2rem;
            }
            .step1-sub-btn2 {
                background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
                box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
                color: #FFFFFF;
            }
        }
    }
    .bottom-reminds-box {
        display: flex;
        align-items: flex-start;
        margin: .25rem auto 0;
        color: #7C8591;
        width: calc(100% - .8rem);
        font-size: .26rem;
        text-align: left;
        .bottom-reminds-left{
            height: 0.28rem;
            margin-right: .1rem;
        }
        .bottom-reminds-right {
            word-break: break-all;
            margin-top: -.05rem;
            .bottom-reminds-right-list {
                margin-bottom: .1rem;
            }
        }
    }
    .bottom-banner-title {
        width: 88%;
        margin: .25rem auto 0;
        color: #0066D5;
        font-size: .3rem;
        .bottom-banner-left {
            width: 0.08rem;
            height: 0.42rem;
            border-radius: .1rem;
            background: linear-gradient(to bottom,#78BDF2,#EEEEEE);
            margin-right: .1rem;
        }
    }
    .bottom-banner-img {
        display: block;
        width: 88%;
        margin: .15rem auto;
    }
}
.van-popup {
    background: none;
    .confirm-sub-box {
        width: 5.5rem;
        border-radius: .1rem;
        overflow: hidden;
        background: #FFFFFF;
        .confirm-sub-line {
            height: .15rem;
            background: linear-gradient(90deg, #78BDF2 0%, #2383FC 100%);
        }
        .confirm-sub-title {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .3rem;
            font-weight: bold;
            color: #303030;
            margin-top: .3rem;
            .confirm-sub-title-left {
                width: 4px;
                height: 17px;
                background: linear-gradient(to bottom, #2383FC 0%, rgba(18,132,245,.1) 100%);
                margin-right: .1rem;
                border-radius: .05rem;
            }
        }
        .confirm-sub-content-gray {
            color: #7C8591;
            font-size: .26rem;
            margin-top: .1rem;
            .confirm-sub-content-blue {
                color: #1D9DFC;
            }
        }
        .confirm-sub-content-gray2 {
            width: 80%;
            margin: 0 auto;
            text-align: left;
            margin-top: .2rem;
        }
        .confirm-sub-bottom {
            border-top: #E6E8EE 1px solid;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: .2rem;
            .confirm-sub-btn {
                height: .8rem;
                width: 50%;
                font-size: .26rem;
                color: #A8B3C3;
                text-align: center;
                line-height: .8rem;
                border-right: #E6E8EE 1px solid;
                cursor: pointer;
            }
            .confirm-sub-btn2 {
                color: #303030;
                border-right: none;
            }
        }
    }
}
.top-line {
    padding: .2rem 0 .2rem .3rem;
    border-bottom: #f3f5f8 1px solid;
    .main-balance {
        font-size: .24rem;
        color: #171F28;
        .blue-line {
            display: inline-block;
            width: 0.1rem;
            height: 0.4rem;
            background: linear-gradient(to bottom, #78BDF2, #FFFFFF);
            margin-right: .1rem;
            border-radius: .05rem;
        }
        .blue {
            color: #3677FF;
        }
    }
    .one-key {
        width: 1.6rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        font-size: .23rem;
        padding: 0;
        color: #FFFFFF;
        background: #0f94ff;
        margin-right: .3rem;
        border-radius: .05rem;
    }
}
.blue {
    color: #1D9DFC;
}
.red {
    color: #E90619;
}
.gray {
    color: #7C8591;
}

</style>
