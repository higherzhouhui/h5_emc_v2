<template>
	<div class="online-recharge">
		<!-- <div class="rop">
			<HeaderTop :title="`提现`"></HeaderTop>
		</div> -->
        <div class="replace-header">
			<div class="goBack" @click="goBack()">
                <img src="../../../static/images/back-icon.png" alt="" class="back-icon">
            </div>
			<div class="header-title">提现</div>
			<div class="header-right" @click="getHelpInfo()">
                <img src="../../../static/images/head-help-icon.png" alt="">
            </div>
		</div>
        <div class="top-pay-type-box">
            <div class="pay-type-list-box flex-b" ref='navBox'>
                <div class="pay-type-list" v-if='showQuick' @click="switchTitle(4)" :class="titleIndex === 4?'titleActived':''">
                    <img src="../../../static/images/pay-type-quick.png" alt="" class="pay-type-icon">
                    <div class="pay-type-name bold">极速提现</div>
                    <img src="../../../static/images/payType-hot.png" v-if='jisuHot === 1' alt="" class="pay-type-hot">
                    <img src="../../../static/images/payType-discount.png" v-if='jisuHot === 2' alt="" class="pay-type-hot">
                    <div class="title-nav-line" v-if='titleIndex !== 1 && titleIndex !== 4'></div>
                </div>
                <div class="pay-type-list" @click="switchTitle(1)" :class="titleIndex === 1?'titleActived':''">
                    <img src="../../../static/images/pay-type-bank.png" alt="" class="pay-type-icon">
                    <div class="pay-type-name bold">银行卡提现</div>
                    <img src="../../../static/images/payType-hot.png" v-if='bankHot === 1' alt="" class="pay-type-hot">
                    <img src="../../../static/images/payType-discount.png" v-if='bankHot === 2' alt="" class="pay-type-hot">
                    <div class="title-nav-line" v-if='titleIndex !== 1 && titleIndex !== 2'></div>
                </div>
                <div class="pay-type-list" @click="switchTitle(2)" :class="titleIndex === 2?'titleActived':''">
                    <img src="../../../static/images/pay-type-virtual.png" alt="" class="pay-type-icon">
                    <div class="pay-type-name bold">虚拟币</div>
                    <img src="../../../static/images/payType-hot.png" v-if='erc20Hot === 1' alt="" class="pay-type-hot">
                    <img src="../../../static/images/payType-discount.png" v-if='erc20Hot === 2' alt="" class="pay-type-hot">
                    <div class="title-nav-line" v-if='titleIndex !== 2 && titleIndex !== 3'></div>
                </div>
                <div class="pay-type-list" @click="switchTitle(3)" :class="titleIndex === 3?'titleActived':''">
                    <img src="../../../static/images/digital-coin-icon.png" alt="" class="pay-type-icon">
                    <div class="pay-type-name bold">数字货币</div>
                    <img src="../../../static/images/payType-hot.png" v-if='digitalHot === 1' alt="" class="pay-type-hot">
                    <img src="../../../static/images/payType-discount.png" v-if='digitalHot === 2' alt="" class="pay-type-hot">
                    <div class="title-nav-line" v-if='titleIndex !== 3 && titleIndex !== 4'></div>
                </div>
                <!-- <div class="pay-type-list" @click="switchTitle(2)" :class="titleIndex === 2?'titleActived':''">
                    <img src="../../../static/images/pay-type-ERC20.png" alt="" class="pay-type-icon">
                    <div class="pay-type-name bold">ERC20</div>
                    <img src="../../../static/images/payType-hot.png" v-if='erc20Hot === 1' alt="" class="pay-type-hot">
                    <img src="../../../static/images/payType-discount.png" v-if='erc20Hot === 2' alt="" class="pay-type-hot">
                    <div class="title-nav-line" v-if='titleIndex !== 2 && titleIndex !== 3'></div>
                </div>
                <div class="pay-type-list" @click="switchTitle(3)" :class="titleIndex === 3?'titleActived':''">
                    <img src="../../../static/images/pay-type-TRC20.png" alt="" class="pay-type-icon">
                    <div class="pay-type-name bold">TRC20</div>
                    <img src="../../../static/images/payType-hot.png" v-if='trc20Hot === 1' alt="" class="pay-type-hot">
                    <img src="../../../static/images/payType-discount.png" v-if='trc20Hot === 2' alt="" class="pay-type-hot">
                    <div class="title-nav-line" v-if='titleIndex !== 4 && titleIndex !== 5'></div>
                </div> -->
            </div>
        </div>
		<div class="tab-content-list" v-if="!showMaintenancing">
            <!-- 银行卡 -->
			<div class="online-recharge-content" v-show="titleIndex === 1">
                <div class="or-log top-line">
                    <div class="main-balance">
                        <span class="blue-line"></span>
                        <span>中心钱包：</span>
                        <span class="blue">{{ balance }}</span>
                    </div>
                    <div class="one-key" @click="withdrawAll()">一键回收</div>
                </div>
                <div class="blank1"></div>
				<div class="or-log bank-list" @click="showSelectFuc">
					<div class="bank-list-left">
                        <div class="lottie-icon">
                            <lottie style='width:46px;height:unset;margin: 25px 0 0 -10px;padding:0' :options="defaultOptions"/>
                        </div>						
                        <span class="bank-list-content">{{ showBank }}</span>
					</div>
					<span class="or-rigth"></span>
				</div>
                <div class="charge-money">
                    <div class="charge-money-left">提现金额</div>
                    <div class="charge-money-right">
                        <div class="show-cash">
                            <input type="number" oninput='if(value.length>10)value=value.slice(0,10)' placeholder="请输入提现金额" ref="money" class="input-cash" maxlength="10" @input="checkContent()">元
                        </div>
                    </div>
                </div>
                <div class="charge-money">
                    <div class="charge-money-left">提现密码</div>
                    <div class="charge-money-right">
                        <div class="show-cash">
                            <input type="password" placeholder="请输入提现密码" ref="securityCodeBank" class="input-cash" maxlength="6" @input="checkContent">
                        </div>
                    </div>
                </div>
				<div class="bottom-btn-box">
					<van-button class="bottom-btn" type="info" color="#0895FE" block :disabled="bankCardCheck"
					            @click="toPush">确认
					</van-button>
				</div>
				<div class="bottom-btn-box" v-if="hasOtherBank">
					<van-button class="bottom-btn" type="info" color="#0895FE" block
					            @click="toAddBankCardOther">+ 非本人银行卡添加
					</van-button>
				</div>
                <div class="extract-sm">
                    <img src="../../../static/images/rules-left-icon.png" alt="" class="extract-sm-left">
                    <div class="extract-sm-right">
                        <p v-html="bankIntro.replace(/\\n/g, '<br>')"></p>
                        <!-- <p>1.单笔提款金额最低￥{{ min_out_cash }}，上限￥{{ max_out_cash }}</p> -->
                        <p v-if="hasOtherBank">VIP5以上用户，可以添加非本人银行卡提款</p>
                    </div>
				</div>
			</div>
            <!-- 虚拟币 -->
			<div class="online-recharge-content" v-show="titleIndex === 2">
                <div class="or-log top-line">
                    <div class="main-balance">
                        <span class="blue-line"></span>
                        <span>中心钱包：</span>
                        <span class="blue">{{ balance }}</span>
                    </div>
                    <div class="one-key" @click="withdrawAll()">一键回收</div>
                </div>
                <div class="blank1"></div>
                <div class="virtual-mode-title">
                    <div class="virtual-mode-title-fonts flex">
                          <span class="blue-line"></span>
                          <span class="blue">选择网路</span>
                    </div>
                </div>
                <div class="virtual-mode-switch flex">
                    <div class="virtual-mode-switch-list flex-c" v-if='!disableTrc' :class="virtualModeIndex === 0?'virtual-mode-switch-list-activing':''" @click="switchVirtualMode(0)">
                        <img src="../../../static/images/pay-type-TRC20.png" alt="" class="virtual-mode-icon">
                        <div class="virtual-mode-fonts">TRC20</div>
                        <img src="../../../static/images/channel-side-mark-icon.png" v-if="virtualModeIndex === 0" alt="" class="virtual-mode-activeing-icon">
                    </div>
                    <div class="virtual-mode-switch-list flex-c" v-if='!disableErc' :class="virtualModeIndex === 1 || disableTrc === true?'virtual-mode-switch-list-activing':''" @click="switchVirtualMode(1)">
                        <img src="../../../static/images/pay-type-ERC20.png" alt="" class="virtual-mode-icon">
                        <div class="virtual-mode-fonts">ERC20</div>
                        <img src="../../../static/images/channel-side-mark-icon.png" v-if="virtualModeIndex === 1 || disableTrc === true" alt="" class="virtual-mode-activeing-icon">
                    </div>
                </div>
				<div class="or-log bank-list virtual-account-box" @click="showSelectFuc2">
					<div class="virtual-coin-accounts flex-b">
                        <lottie style='width:46px;height:unset;margin: 25px 0 0 -10px;padding:0' :options="defaultOptions2"/>
					</div>
                    <div class="virtual-coin-accounts-right flex-b">
                        <span class="bank-list-content">{{ showVirtualCion }}</span>
                        <van-icon name="arrow-down" />
                    </div>
				</div>
				<div class="charge-money">
					<div class="charge-money-left">提现USDT</div>
					<div class="charge-money-right charge-money-right2">
						<div class="show-USDT" v-if='!hideRate'>(汇率：<span class="">{{ virtualRate }}</span>)</div>
						<div class="show-USDT" v-if='hideRate'></div>
						<div class="show-cash">
							<input type="tel" placeholder="提现USDT个数" ref="chargeVirtualCoin" class="input-cash"
							       maxlength="12"
							       @input="inputCtr2()">
						</div>
					</div>
				</div>
				<div class="charge-money">
					<div class="charge-money-left">提现金额</div>
					<div class="charge-money-right">
						<div class="show-cash">
							<input type="number" oninput='if(value.length>10)value=value.slice(0,10)' placeholder="请输入提现金额" ref="chargeMoney" class="input-cash" maxlength="12" @input="inputCtr()">
						</div>
					</div>
				</div>
				<div class="charge-money">
					<div class="charge-money-left">提现密码</div>
					<div class="charge-money-right">
						<div class="show-cash">
							<input type="password" placeholder="请输入提现密码" ref="securityCode" class="input-cash" maxlength="6" @input="checkContentVirtual">
						</div>
					</div>
				</div>
				<div class="bottom-btn-box">
					<van-button class="bottom-btn" type="info" color="#0895FE" block :disabled="virtualCheck"
					            @click="toPushVirtual()">确定
					</van-button>
				</div>
                <div class="extract-sm">
                    <img src="../../../static/images/rules-left-icon.png" alt="" class="extract-sm-left">
                    <div class="extract-sm-right" v-if='virtualModeIndex === 0 && disableTrc === false'>
                        <p v-html="trc20Intro.replace(/\\n/g,'<br>')"></p>
                    </div>
                    <div class="extract-sm-right" v-if='virtualModeIndex === 1 && disableErc === false'>
                        <p v-html="erc20Intro.replace(/\\n/g,'<br>')"></p>
                    </div>
				</div>
			</div>
            <!-- 数字货币 -->
            <div class="online-recharge-content" v-show="titleIndex === 3">
                <div class="or-log top-line">
                    <div class="main-balance">
                        <span class="blue-line"></span>
                        <span>中心钱包：</span>
                        <span class="blue">{{ balance }}</span>
                    </div>
                    <div class="one-key" @click="withdrawAll()">一键回收</div>
                </div>
                <div class="blank1"></div>
                <div class="or-log bank-list virtual-account-box digital-account-box flex-b" @click="showSelectDigital()">
					<img src="../../../static/images/digital-coin-icon.png" alt="" class="digital-coin-acc">
                    <div class="digital-coin-account flex-b">
                        <span class="bank-list-content" :class="showDigitalCion === '请选择所属币商'?'':'bank-list-fonts-activing'">{{ showDigitalCion }}</span>
                        <van-icon name="arrow-down" />
                    </div>
				</div>
                <div class="charge-money">
					<div class="charge-money-left">提现金额</div>
					<div class="charge-money-right">
						<div class="show-cash">
							<input type="number" v-model="digitalCash" oninput='if(value.length>12)value=value.slice(0,12)' placeholder="请输入提现金额" class="input-cash" maxlength="12" @input="checkContentDigital()">
						</div>
					</div>
				</div>
				<div class="charge-money">
					<div class="charge-money-left">提现密码</div>
					<div class="charge-money-right">
						<div class="show-cash">
							<input type="password" v-model="digitalPwd" placeholder="请输入提现密码" class="input-cash" maxlength="6" @input="checkContentDigital()">
						</div>
					</div>
				</div>
                <div class="bottom-btn-box">
					<van-button class="bottom-btn" type="info" color="#0895FE" block :disabled="digitalCheck"
					            @click="toPushDigital()">确定
					</van-button>
				</div>
                <div class="extract-sm">
                    <img src="../../../static/images/rules-left-icon.png" alt="" class="extract-sm-left">
                    <div class="extract-sm-right">
                        <p v-html="digitalIntro.replace(/\\n/g,'<br>')"></p>
                    </div>
				</div>
            </div>
            <!-- 极速提现 -->
            <quickWithdraw class="quick-withdraw-mode" v-show="titleIndex === 4" :queryIntro='this.queryIntro' @queryRouter='routerChange'></quickWithdraw>
		</div>
        <div class="maintenancing-content flex-c" v-if='showMaintenancing'>
            <div class="maintenancing-center-box">
                <img src="../../../static/images/withdraw-maintenancing-logo.png" alt="" class="maintenancing-logo">
                <div class="maintenancing-fonts bold text-c">
                    <span>{{maintenancingFonts}}</span>维护中，暂停服务<br>
                    请使用银行卡提现
                </div>
                <div class="maintenancing-btn text-c bold" @click="switchTitle(1)">前往银行卡提现</div>
            </div>
        </div>
        <van-popup v-model="firstWithdraw" :close-on-click-overlay='false'>
            <div class="confirm-sub-box">
                <div class="confirm-sub-line"></div>
                <div class="confirm-sub-title">
                    <span class="confirm-sub-title-left"></span>
                </div>
                <div class="confirm-sub-content">
                    <div class="confirm-sub-content-red text-c">
                        请遵守下方规则<br>
                        若不当操作导致资金损失，平台概不负责
                    </div>
                    <div class="confirm-sub-content-normal">
                        1.提交申请后, 请注意到账讯息。<br>
                        2.到账后请于<span class="red-fonts bold">30分钟</span>内点击确认。<br>
                        3.若发生未到账,到账金额错误,请联系客服人员。
                    </div>
                </div>
                <div class="confirm-sub-content-gray flex-c" @click="radioChecked2 = !radioChecked2">
                    <div class="check-box">
                        <img v-if="!radioChecked2" src="../../../static/images/check-box-uncheck.png" alt="" class="check-box-icon">
                        <img v-if='radioChecked2' src="../../../static/images/check-box-checked.png" alt="" class="check-box-icon">
                        <span>我已清楚明白注意事项</span>
                    </div>
                </div>
                <div class="confirm-sub-content-gray confirm-sub-content-gray2 flex-c" @click="radioChecked3 = !radioChecked3">
                    <div class="check-box">
                        <img v-if="!radioChecked3" src="../../../static/images/check-box-uncheck.png" alt="" class="check-box-icon">
                        <img v-if='radioChecked3' src="../../../static/images/check-box-checked.png" alt="" class="check-box-icon">
                        <span>24小时内不再提醒</span>
                    </div>
                </div>
                <div class="confirm-sub-bottom">
                    <div class="confirm-sub-btn" v-if='!radioChecked2'>确认</div>
                    <div class="confirm-sub-btn confirm-sub-btn2" v-if='radioChecked2' @click="setFirstFn()">确认</div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="channelsReminds" class="channels-remind-popuop" :close-on-click-overlay='false'>
            <div class="channels-remind-line"></div>
            <div class="channels-remind-title flex-c bold">
                <div class="channels-remind-title-left"></div>
                <span>{{ hintData.title }}</span>
            </div>
            <div class="channels-remind-intro">{{ hintData.content1 }}</div>
            <div class="channels-remind-list-box">
                <div class="channels-remind-list bold" v-html="replaceContent"></div>
            </div>
            <div class="channels-remind-radio flex-c">
                <van-checkbox class='reminds-radio' v-model="radioChecked" shape="square" icon-size="16px"></van-checkbox>
                <span>24小时内不再提醒</span>
            </div>
            <div class="channels-remind-btn" @click="closeChannels()">确定</div>
        </van-popup>
        <van-popup class="popup-content" v-model="showSelect" position="bottom">
            <van-picker show-toolbar :columns="pickerList" :title="'请选择银行卡'" @confirm="onConfirmBank" @change="onChangeBank" @cancel="showSelect = false" swipe-duration='500'/>
        </van-popup>
        <van-popup class="popup-content" v-model="showSelect2" position="bottom">
            <van-picker show-toolbar :columns="pickerListErc" :title="'请选择虚拟币帐户'" @confirm="onConfirmErc" @change="onChangeErc" @cancel="showSelect2 = false" swipe-duration='500'/>
        </van-popup>
        <van-popup class="popup-content" v-model="showSelect3" position="bottom">
            <van-picker show-toolbar :columns="pickerListTrc" :title="'请选择虚拟币帐户'" @confirm="onConfirmTrc" @change="onChangeTrc"  @cancel="showSelect3 = false" swipe-duration='500'/>
        </van-popup>
        <van-popup class="popup-content" v-model="showDigitalList" position="bottom">
            <van-picker show-toolbar :columns="pickerListDigital" :title="'请选择数字货币帐户'" @confirm="onConfirmDigital" @change="onChangeDigital"  @cancel="showDigitalList = false" swipe-duration='500'/>
        </van-popup>
        <van-popup v-model="showHandlePop" :close-on-click-overlay='false'>
            <div class="confirm-sub-box">
                <div class="confirm-sub-line confirm-sub-line-yellow"></div>
                <div class="confirm-sub-title">
                    <img src="../../../static/images/alert-icon.png" alt="" class="left-icon">
                    温馨提醒
                </div>
                <div class="confirm-sub-content-gray confirm-sub-content-gray2 confirm-sub-line-dark">您有一笔<span class="yellow">【极速提现订单】</span>尚未处理,完成后才能提交其他提现申请。</div>
                <div class="confirm-sub-bottom">
                    <div class="confirm-sub-btn confirm-sub-btn4" @click='showHandlePop = false'>确认</div>
                </div>
            </div>
        </van-popup>
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
		<!--loading-new-->
		<div class="loading-new" v-if="showLoading"><img src="../../../static/images/allLoading.gif" alt=""></div>
	</div>
</template>
<script>
import MuSubmit from '../../components/submit/muSubmit'
import HeaderTop from '../../components/top/top'
import {Toast} from 'vant'
import cardIcon from "@/assets/lottie/cardIcon.json"
import usdtIcon from "@/assets/lottie/usdtIcon.json"
import quickWithdraw from '@/pages/homePages/quickWithdrawComponent'
import { Dialog } from 'vant'
import {mobileModel, browserName, osVersion,browserVersion} from 'mobile-device-detect'
export default {
	name: 'extract',
	components: {
		HeaderTop,
		MuSubmit,
        quickWithdraw,
        // cardIcon,
        // usdtIcon,
	},
	data () {
		return {
            showQuick:false,
			hasOtherBank: false,
			itemHeight: null,
			showPS: false,
			password: '',
			showSelect: false,
			showSelect2: false,
            showSelect3: false,
			showBank: '请选择银行卡',
			noBankCard:false,
			bankCardCheck:true,
			showVirtualCion: '请选择虚拟币帐户',
			noVirtualCard:false,
			virtualCheck:true,
			memberBankId: 0,
			min_out_cash: 100,
			max_out_cash: 100,
			index: '',
			index2: '',
			index3: '',
			cash: 0,
			bankData: [],
            pickerList: [],
            pickerListErc: [],
            pickerListTrc: [],
			virtualData: [],
            virtualTrcData: [],
			balance: '',
			value1: 0,
			titleIndex: 1,
			virtualRate: '',
			virtualMin: '',
			virtualMax: '',
			memberVirtualId: '',
			virtualInfo: '',
			showLoading:false,
            disableErc:false,
            disableTrc:false,
            disableDigital:false,
            defaultOptions:{animationData:cardIcon,loop:true,autoplay:true},
            defaultOptions2:{animationData:usdtIcon,loop:true,autoplay:true},
            showMaintenancing:false,
            maintenancingFonts:'虚拟币',
            erc20data:{},
            trc20data:{},
            channelsReminds:false,
            radioChecked:false,
            hintData:{},
            replaceContent:'',
            remindsCookieValue:'',
            quickHot:false,
            bankHot:-1,
            jisuHot:-1,
            erc20Hot:-1,
            trc20Hot:-1,
            digitalHot:-1,
            firstWithdraw:false,
            radioChecked2:false,
            radioChecked3:false,
            queryIntro:'',
            bankIntro:'',
            erc20Intro:'',
            trc20Intro:'',
            showHandlePop:false,
            virtualModeIndex:0,
            showDigitalCion:'请选择所属币商',
            digitalCash:'',
            digitalPwd:'',
            digitalData:[],
            pickerListDigital:[],
            digitalCheck:true,
            digitalIntro:'',
            showDigitalList:false,
            digitalId:0,
            hideRate:false,
            
            helpList:false,
            showHelp1:false,
            showHelp2:false,
            helpData:{},
            showNotice:false,
            helpNoticeSwitch:false,
            helpIndex:-1,
            // hasHandleOrder:false,
		}
	},
	beforeRouteLeave (to, from, next) {
        sessionStorage.removeItem('initIndex')
        let _this = this
        if (_this.timer) {
            clearInterval(_this.timer)
        }
		this.$destroy(false)
		next()
	},
	mounted () {
		this.itemHeight = window.screen.availWidth * 110 / 750
        let initIndex = sessionStorage.getItem('initIndex')
        if(initIndex === 'quick'){
            this.switchTitle(4)
        }
		this.loadTop()
	},
	methods: {
        // handleAnimation(anim){
        //     this.defaultAnim = anim;
        // },
        onConfirmDigital(value,index){
            this.showDigitalCion = value
            this.digitalId = this.digitalData[index].memberVirtualId
            this.showDigitalList = false
            this.checkContentDigital()
        },
        toPushDigital(){
            if(sessionStorage.getItem('needHandleWithdraw') === 'true' && this.showQuick === true) {
                this.showHandlePop = true
                return false
            }
            this.showLoading = true
			let params = {
				memberVirtualId: this.digitalId,
				cash: this.digitalCash,
				cashPassword: this.digitalPwd,
                version:this.API.paramVersion,
			}
            this.ServerAPI.postAPI(this.API.subWithdrawDigital, params, (success, data) => {
                this.showLoading = false
                if (success) {
                    if(data.code === '0000'){
                        Toast('提现申请成功，请等待客服审核')
                        sessionStorage.setItem('extend','2')
                        this.$router.push('/tradeRecords')
                    }else{
                        Toast(data.info)
                    }
                }else{
                    Toast(data.info)
                }
            })
        },
        getDigitalList(){
            let params = {
                version:this.API.paramVersion,
            }
            this.ServerAPI.postAPI(this.API.memberDigitalInfo, params, (success,data)=>{
                if (success) {
                    if (data.code === '0000') {
                        this.digitalData = data.data.digitalList
                        if(this.digitalData.length === 0){
                           this.showDigitalCion = '请点击绑定数字货币账户' 
                        }else{
                            this.digitalData.forEach((item,index) => {
                                this.pickerListDigital.push(item.memberCard)
                            })
                        }
                    }else{
						Toast(data.info)
					}
                }else{
                    Toast('网络错误，请重试')
                }
            })
        },
        showSelectDigital(){
            if(this.digitalData.length === 0){
                this.$router.push('/addDigital')
            }else{
                this.showDigitalList = true
            }
        },
        checkContentDigital(){
            if(this.digitalCash.trim().length > 0 && this.digitalPwd.trim().length > 0 && this.digitalId !== 0){
                this.digitalCheck = false
            }else{
                this.digitalCheck = true
            }
        },
        switchVirtualMode(value){
            this.virtualModeIndex = value
            if(value === 0) {
                this.virtualMin =  this.trc20data.minCash
                this.virtualMax =  this.trc20data.maxCash
                if (this.trc20data.accountList.length === 0) {
                    this.noVirtualCard = true
                    this.showVirtualCion = '请点击绑定虚拟币账户'
                    this.hideRate = true
                } else {
                    this.noVirtualCard = false
                    this.pickerListTrc = []
                    this.virtualTrcData = this.trc20data.accountList
                    this.showVirtualCion = this.virtualTrcData[0].memberCard
                    this.virtualRate = this.virtualTrcData[0].virtualRate
                    this.memberVirtualId = this.virtualTrcData[0].memberAccountId
                    this.virtualInfo = this.virtualTrcData[0].virtualInfo
                    this.trc20data.accountList.forEach((item)=>{
                        this.pickerListTrc.push(item.memberCard)
                    })
                    this.hideRate = false
                }
            }else if(value === 1){
                this.virtualMin =  this.erc20data.minCash
                this.virtualMax =  this.erc20data.maxCash
                if (this.erc20data.accountList.length === 0) {
                    this.noVirtualCard = true
                    this.showVirtualCion = '请点击绑定虚拟币账户'
                    this.hideRate = true
                } else {
                    this.noVirtualCard = false
                    this.pickerListErc = []
                    this.virtualData = this.erc20data.accountList
                    this.showVirtualCion = this.virtualData[0].memberCard
                    this.virtualRate = this.virtualData[0].virtualRate
                    this.memberVirtualId = this.virtualData[0].memberAccountId
                    this.virtualInfo = this.virtualData[0].virtualInfo
                    this.erc20data.accountList.forEach((item)=>{
                        this.pickerListErc.push(item.memberCard)
                    })
                    this.hideRate = false
                }
            }
        },
        routerChange(value){
            if(value === 'true'){
                this.$router.push("/help2")
            }
        },
        setFirstFn(){
            if(this.radioChecked3 === true){
                this.setCookieFirst('false',1)
            }
            this.firstWithdraw = false
        },
        // 是否第一次极速取款
        getCookie() {
            let status
            if (document.cookie.length > 0) {
                var arr = document.cookie.split("; "); //显示的格式需要切割
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split("="); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] === "quickWithdrawFirst") {
                        status = arr2[1]; //
                    }
                }
            }
            if (status !== 'false' && this.showQuick === true && this.titleIndex === 4) {
                this.firstWithdraw = true
            }
        },
        //设置'记住'功能cookie
        setCookieFirst(c_status, exdays) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie =
                "quickWithdrawFirst" +
                "=" +
                c_status +
                ";path=/;expires=" +
                exdate.toGMTString();
        },
		switchTitle (index) {
		    if(this.titleIndex !== index){
                this.titleIndex = index
                if (index === 1) {
                    this.showMaintenancing = false
                } else if (index === 2) {
                    if(this.disableTrc === true){
                        this.switchVirtualMode(1)
                    }else{
                        this.switchVirtualMode(0)
                    }
                    if(this.disableTrc === true && this.disableErc === true) {
                        this.showMaintenancing = true
                        this.maintenancingFonts = '虚拟币'
                    }else{
                        this.showMaintenancing = false
                    }
                } else if (index === 3) {
                    if(this.disableDigital === true){
                        this.showMaintenancing = true
                        this.maintenancingFonts = '数字货币'
                    }else{
                        this.showMaintenancing = false
                    }
                }else if (index === 4) {
                    this.getCookie()
                }
                // this.$refs.chargeVirtualCoin.value = this.$refs.chargeMoney.value = this.$refs.securityCode.value = ''
            }
		},
		cfmAccountSub () {
			this.showSelect2 = false
		},
		loadTop () {
			this.getChannels()
			this.getVirSwitch()
			this.getDigitalList()
			this.getVirHint()
		},
        getChannels(){
            this.showLoading = true
            let params = {
                visitType:'APP',
                version:this.API.paramVersion,
            }
            this.ServerAPI.postAPI(this.API.withdrawChannels, params, (success,data)=>{
                this.showLoading = false
                if (success) {
                    if (data.code === '0000') {
                        if(data.data.bank.hasCashPass === false){
                            Dialog.confirm({
                                message: "请先在'安全中心'设置提现密码",
                                closeOnPopstate:true,
                                confirmButtonColor:'#1D9DFC',
                                showCancelButton:false,
                            })
                            .then(() => {
                                this.$router.back()
                            })
                            .catch(() => {
                            });
                        }
                        this.balance = data.data.bank.money
                        data.data.bank.accountList.forEach((item)=>{
                            this.pickerList.push(item.memberCard)
                        })
                        this.min_out_cash = data.data.bank.minCash
                        this.max_out_cash = data.data.bank.maxCash
                        if (data.data.bank.accountList.length == 0) {
							this.showBank = '请点击绑定银行卡'
							this.noBankCard = true
						} else {
                            this.pickerList = []
							this.bankData = data.data.bank.accountList
                            data.data.bank.accountList.forEach((item)=>{
                                this.pickerList.push(item.memberCard)
                            })
						}
                        this.erc20data = data.data.erc20
                        this.trc20data = data.data.trc20
                        if(data.data.jisu){
                            this.jisuHot = data.data.jisu.hot
                        }
                        if(data.data.bank){
                            this.bankHot = data.data.bank.hot
                        }
                        if(data.data.erc20){
                            this.erc20Hot = data.data.erc20.hot
                        }
                        if(data.data.trc20){
                            this.trc20Hot = data.data.trc20.hot
                        }
                        if(data.data.topay){
                            this.digitalHot = data.data.topay.hot
                        }
                    }
                }
            })
        },
        getVirSwitch(){
            let params = {
                version:this.API.paramVersion,
            }
            this.ServerAPI.postAPI(this.API.vitualWithdrawSwitch, params, (success,data)=>{
                if (success) {
                    if (data.code === '0000') {
                        if(data.data.jisu.switch === true){
                            this.showQuick = true
                            this.titleIndex = 4
                            this.queryIntro = data.data.jisu.mark
                        }
                        if(data.data.trc20.switch === false){
                            this.disableTrc = true
                        }else if(data.data.trc20.switch === true){
                            this.disableTrc = false
                            this.trc20Intro = data.data.trc20.mark
                        }
                        if(data.data.erc20.switch === false){
                            this.disableErc = true
                        }else if(data.data.erc20.switch === true){
                            this.disableErc = false
                            this.erc20Intro = data.data.erc20.mark
                        }
                        if(data.data.bank.switch === true){
                            this.bankIntro = data.data.bank.mark
                        }
                        if(data.data.digital.switch === false){
                            this.disableDigital = true
                        }else if(data.data.digital.switch === true){
                            this.disableDigital = false
                            this.digitalIntro = data.data.digital.mark
                        }
                    }else{
						Toast(data.info)
					}
                }else{
                    Toast('网络错误，请重试')
                }
            })
        },
        getVirHint(){
            this.ServerAPI.postAPI(this.API.getPayHint, '', (success,data)=>{
                if (success) {
                    if (data.code === '0000') {
                        this.channelsReminds = true
                        this.hintData = data.data
                        this.replaceContent = this.hintData.content2.replace(/\\n/g, "<br>")
                        this.getAccCookie()
                    }else{
						// Toast(data.info)
					}
                }
            })
        },
        closeChannels(){
            if(this.radioChecked === true){
                this.setCookie(true)
            }
            this.channelsReminds = false
        },
        setCookie(switchValue) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000); //保存时间
            //字符串拼接cookie
            window.document.cookie =
                "withdrawRemins" +
                "=" +
                switchValue +
                ";path=/;expires=" +
                exdate.toGMTString();
        },
        getAccCookie() {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split("; "); //显示的格式需要切割
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split("="); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] === "withdrawRemins") {
                        this.remindsCookieValue = arr2[1];
                    }
                }
            }
            if (this.remindsCookieValue === 'true') {
                this.channelsReminds = false;
            } else {
                this.channelsReminds = true;
            }
        },
		inputCtr () {
			this.$refs.chargeMoney.value = this.$refs.chargeMoney.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
			this.$refs.chargeVirtualCoin.value = this.$refs.chargeMoney.value / this.virtualRate
			this.$refs.chargeVirtualCoin.value = this.$refs.chargeVirtualCoin.value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d).*$/, '$1$2.$3')
			if (this.$refs.chargeMoney.value.length == 0) {
				this.$refs.chargeVirtualCoin.value = ''
			}
			this.checkContentVirtual()
		},
		inputCtr2 () {
			this.$refs.chargeVirtualCoin.value = this.$refs.chargeVirtualCoin.value.replace(/^(\-)*(\d+)\.(\d\d\d\d\d).*$/, '$1$2.$3')
			this.$refs.chargeMoney.value = this.$refs.chargeVirtualCoin.value * this.virtualRate
			this.$refs.chargeMoney.value = this.$refs.chargeMoney.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
			if (this.$refs.chargeVirtualCoin.value.length == 0) {
				this.$refs.chargeMoney.value = ''
			}
			this.checkContentVirtual()
		},
		checkContent () {
			if (this.showBank !=='请选择银行卡' && this.showBank !=='请点击绑定银行卡' && this.$refs.money.value.length > 0 && this.$refs.securityCodeBank.value.length > 0) {
				this.bankCardCheck = false
			} else {
				this.bankCardCheck = true
			}
		},
        checkContentVirtual(){
		    if(this.showVirtualCion !== '请选择虚拟币帐户' && this.showVirtualCion !== '请点击绑定虚拟币账户' && this.$refs.chargeVirtualCoin.value.length > 0 && this.$refs.chargeMoney.value.length > 0 && this.$refs.securityCode.value.length > 0){
		        this.virtualCheck = false
            }else{
                this.virtualCheck = true
            }
        },
		showSelectFuc () {
			if(this.noBankCard === true) {
				this.$router.push('/addbankCard')
			}else if(this.noBankCard === false){
				this.showSelect = true
				// this.userBankList()
			}
		},
		showSelectFuc2 () {
		    if(this.titleIndex === 2 && this.virtualModeIndex === 1){
                if(this.noVirtualCard === true){
                    this.$router.push('/addVirtualCoinAccount')
                }else if(this.noVirtualCard === false){
                    this.showSelect2 = true
                }
            }else if(this.titleIndex === 2 && this.virtualModeIndex === 0){
                if(this.noVirtualCard === true){
                    this.$router.push('/addVirtualCoinAccount')
                }else if(this.noVirtualCard === false){
                    this.showSelect3 = true
                }
            }
		},
		withdrawAll () {
			this.showLoading = true
			this.ServerAPI.postAPI(this.API.gameWithdrawAll, '', (success,data) => {
                this.showLoading = false
                if (success) {
                    if (data.code == '0000') {
                        Toast('一键回收成功')
                        this.getChannels()
                    } else {
                        Toast(data.info)
                    }
                } else {
                    Toast('网络错误，请重试')
                }
            })
		},
		toAddBankCardOther () {
			this.$router.push('/addbankCardOther')
		},
		//点击完成
		toPush () {
            if(sessionStorage.getItem('needHandleWithdraw') === 'true' && this.showQuick === true) {
                this.showHandlePop = true
                return false
            }
			let money = this.$refs.money.value
			if (this.memberBankId < 1) {
				Toast('请选择提款帐户')
				return false
			}
			if (money > this.max_out_cash || money < this.min_out_cash) {
				Toast('单笔取款范围为' + this.min_out_cash + '到' + this.max_out_cash + '元')
				return false
			}
			let securityCode = this.$refs.securityCodeBank.value
			if (this.isEmpty(securityCode)) {
				Toast('请输入提款密码')
				return false
			}
			this.cash = money
			let param = {
				cash: money,
				memberBankId: this.memberBankId,
				cashPassword: securityCode
			}
            this.showLoading = true
			this.ServerAPI.postAPI(this.API.withdraw, param, (success,data) => {
                this.showLoading = false
	            if (success) {
                    if (data.code == '0000') {
                        Toast('提款申请成功，请等待客服审核')
                        sessionStorage.setItem('extend','2')
                        this.$router.push('/tradeRecords')
                    } else {
                        Toast(data.info)
                    }
                } else {
                    Toast('网络错误，请重试')
                }
            })
		},
		toPushVirtual () {
            if(sessionStorage.getItem('needHandleWithdraw') === 'true' && this.showQuick === true) {
                this.showHandlePop = true
                return false
            }
			let params = {
				memberVirtualId: this.memberVirtualId,
				virtualInfo: this.virtualInfo,
				cash: this.$refs.chargeMoney.value,
				cashPassword: this.$refs.securityCode.value,
				rate: this.virtualRate,
				num: this.$refs.chargeVirtualCoin.value
			}
			if(this.virtualModeIndex === 1){
                this.ServerAPI.postAPI(this.API.virtualCoinWithdrawSub, params, (success, data) => {
                    if (success) {
                        if(data.code === '0000'){
                            Toast('提现申请成功，请等待客服审核')
                            sessionStorage.setItem('extend','2')
                            this.$router.push('/tradeRecords')
                        }else{
                            Toast(data.info)
                        }
                    }else{
                        Toast(data.info)
                    }
                })
            }else if(this.virtualModeIndex === 0){
                this.ServerAPI.postAPI(this.API.virtualCoinWithdrawSubTrc, params, (success, data) => {
                    if (success) {
                        if(data.code === '0000'){
                            Toast('提现申请成功，请等待客服审核')
                            sessionStorage.setItem('extend','2')
                            this.$router.push('/tradeRecords')
                        }else{
                            Toast(data.info)
                        }
                    }else{
                        Toast(data.info)
                    }
                })
            }
		},
		toAddbank () {
			this.$router.push('/addbankCard')
		},
        onChangeBank(picker, value, index){
        },
        onChangeErc(picker, value, index){
        },
        onChangeTrc(picker, value, index){
        },
        onChangeDigital(picker, value, index){
        },
        onConfirmBank(value, index) {
            this.showBank = this.pickerList[index]
            this.memberBankId = this.bankData[index].memberAccountId
            this.showSelect = false
            console.log(this.memberBankId)
            this.checkContent()
        },
        onConfirmErc(value, index) {
            this.showVirtualCion = this.pickerListErc[index]
            this.memberVirtualId = this.virtualData[index].memberAccountId
            this.virtualRate = this.virtualData[index].virtualRate
            this.virtualInfo = this.virtualData[index].virtualInfo
            this.showSelect2 = false
            this.checkContentVirtual()
        },
        onConfirmTrc(value, index) {
            this.showVirtualCion = this.pickerListTrc[index]
            this.memberVirtualId = this.virtualTrcData[index].memberAccountId
            this.virtualRate = this.virtualTrcData[index].virtualRate
            this.virtualInfo = this.virtualTrcData[index].virtualInfo
            this.showSelect3 = false
            this.checkContentVirtual()
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
.online-recharge {
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
	.online-recharge-content {
		margin: 0 auto;
		background: #FFFFFF;
		padding: 0;
		.charge-money {
			margin: 0 auto;
			height: 1rem;
			justify-content: space-between;
			display: flex;
			align-items: center;
			padding: .2rem .3rem;
			border-radius: .1rem;
			overflow: hidden;
			font-size: .2rem;
            border-top: 1px solid #F4F4F4;
			.charge-money-right {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				width: 78%;
				.show-cash {
					width: 50%;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					.input-cash {
						width: 2.5rem;
						text-align: right;
						border: none;
						background: none;
					}
				}
				.show-USDT {
					//width: 40%;
					color: #AAB7C5;
					font-size: .2rem;
					text-align: right;
					
					.red-fonts {
						color: #FF2A2A;
					}
				}
			}
			.charge-money-right2 {
				justify-content: space-between;
			}
		}
	}
	.top-line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0;
		border-bottom: #f3f5f8 1px solid;
		.main-balance {
			font-size: .24rem;
			color: #171F28;
            display: flex;
            align-items: center;
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
	
	.bg {
		background: #edeff2;
	}
	
	.cancel {
		text-align: right;
		color: #3b556e;
		font-size: .6rem;
		padding: 0 .2rem;
	}
	
	.tkmm {
		text-align: center;
		font-size: .36rem;
		color: #3b556e;
		margin-bottom: .5rem;
	}
	
	.se {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #ececec;
		padding: .2rem .3rem;
		
		div {
			font-size: .25rem;
			color: #3b556e;
		}
		
		.cen-bank {
			font-size: .36rem;
		}
	}
	
	.extract-password {
		position: fixed;
		bottom: 4.5rem;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 1);
		height: 4rem;
		
		.border {
			display: flex;
			padding: .1rem 0.6rem 0;
			height: 1.1rem;
			
			span {
				display: block;
				height: .8rem;
				border-right: 1px solid #999;
				flex: 1;
				line-height: 1rem;
				text-align: center;
			}
			
			.none {
				border-right: 0 none
			}
		}
		
		.input {
			height: 1.1rem;
			width: 6.4rem;
			margin: .4rem .55rem 0;
			position: absolute;
			top: 1.5rem;
			background: transparent;
			overflow: hidden;
			border: 1px solid #999;
			
			input {
				height: 1.1rem;
				position: absolute;
				left: -100rem;
				width: 1000rem;
				padding: 0 0.5rem;
				background: transparent;
				// border:1px solid #999;
				border: 0 none;
				letter-spacing: .9rem;
				color: transparent;
			}
		}
		
		.password-number {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			margin: 1rem 0 0;
			
			.ps-number {
				width: 33.3%;
				height: 1rem;
				border: 1px solid #999;
				border-bottom: 0 none;
				border-left: 0 none;
				text-align: center;
				line-height: 1rem;
				color: #000;
				font-size: .38rem;
				font-weight: bold
			}
			
			.ps-number:nth-child(3n) {
				border-right: 0 none;
			}
			
		}
		
		.ps-number-bg {
			background: #999;
		}
	}
	width: 100%;
	height: 100%;
	background: #edeff2;
	.rop {
		width: 100%;
		padding: 0;
	}
    .top-pay-type-box {
        text-align: center;
        background: linear-gradient(to right,#78BDF2,#1D9DFC);
        width: 100%;
        overflow: hidden;
        padding-top: 1.1rem;
        .pay-type-list-box {
            transition: all .3s;
            .pay-type-list {
                height: .9rem;
                width: 100%;
                position: relative;
                .pay-type-icon {
                    height: 0.6rem;
                    margin-top: -.05rem;
                }
                .pay-type-name {
                    font-size: .2rem;
                    color: #FFFFFF;
                    margin-top: -.05rem;
                }
                .pay-type-hot {
                    position: absolute;
                    top: -.05rem;
                    right: 50%;
                    width: 0.5rem;
                    margin-right: -.75rem;
                }
                .title-nav-line {
                    position: absolute;
                    content:'';
                    right: 0;
                    width: 1px;
                    height: .5rem;
                    top: 50%;
                    margin-top: -.25rem;
                    background: rgba(255,255,255,.3);
                }
            }
            .pay-type-list:not(:last-child)::after {
                
            }
            .titleActived { 
                background: url('../../../static/images/pay-nav-bg.png') no-repeat;
                background-size: 100% 100%;     
                .pay-type-name {
                    color: #464646;
                }
            }
            .titleActivedL {
                border-radius: 0 .25rem 0 0;
                background: #FFFFFF;
                .pay-type-name {
                    color: #464646;
                }
            }
            .titleActivedR {
                border-radius: .25rem 0 0 0;
                background: #FFFFFF;    
                .pay-type-name {
                    color: #464646;
                }
            }
        }
    }
	.maintenancing-content {
        height: calc(100% - 2rem);
        background: url('../../../static/images/withdraw-maintenancing-bg.png') no-repeat;
        background-size: 100% 100%;
        .maintenancing-center-box {
            .maintenancing-logo {
                width: 58vw;
            }
            .maintenancing-fonts {
                color: #5D687A;
                font-size: .35rem;
                margin-top: .2rem;
            }
            .maintenancing-btn {
                width: 3.4rem;
                height: 1rem;
                line-height: 1rem;
                border-radius: 1rem;
                background: linear-gradient(to right,#0089F9,#00A5F9);
                color: #FFFFFF;
                font-size: .35rem;
                box-shadow: 0px 0px 6px 0px rgba(0,0,0,.4);
                margin: .4rem auto 0;
            }
        }
    }
	.or-log {
		margin: 0 auto;
		height: 1.1rem;
		background: #fff;
		line-height: 1.2rem;
		.bank-list-left {
			display: flex;
			align-items: center;
			padding: 0;
			.bank-list-content {
				font-size: .25rem;
				color: #3b556e;
			}
            .bank-list-fonts-activing {
                color: #333333;
            }
		}
		.or-rigth {
			float: right;
			font-size: .22rem;
			color: #8d969b;
			height: 100%
		}
	}
	.blank1 {
        height: 0.2rem;
        background: #EEEEEE;
    }
    .virtual-mode-title {
        padding: .2rem .3rem;
        .blue-line {
            width: 0.1rem;
            height: 0.4rem;
            background: linear-gradient(to bottom, #78BDF2, #FFFFFF);
            margin-right: .1rem;
            border-radius: .05rem;
        }
        .blue {
            color: #0066D5;
            font-size: .3rem;
            font-weight: 500;
        }
    }
    .virtual-mode-switch {
        width: calc(100% - .6rem);
        margin: 0 auto;
        border-top: 1px solid #E6E8EE;
        padding: .2rem 0;
        .virtual-mode-switch-list {
            width: 1.8rem;
            height: 0.68rem;
            border: 1px solid #E6E8EE;
            border-radius: .08rem;
            position: relative;
            .virtual-mode-icon {
                height: 0.5rem;
            }
            .virtual-mode-activeing-icon {
                position: absolute;
                top: 0;
                right: 0;
                height: .3rem;
            }
        }
        .virtual-mode-switch-list:not(:first-child) {
            margin-left: .2rem;
        }
        .virtual-mode-switch-list-activing {
            border: 1px solid #FDBA32;   
        }
    }
	.bank-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #FFFFFF !important;
		height: .8rem;
		border-radius: .08rem;
		padding: .2rem;
		width: 97%;
		margin: 0 auto .2rem;
        .virtual-coin-accounts-right {
            height: 0.7rem;
            width: calc(100% - .6rem);
            border: 1px solid #F4F4F4;
        }
		.left-fonts {
			display: inline-block;
			width: 2rem;
			font-size: .2rem;
		}
		.left-fonts2 {
			width: 2.3rem;
		}
		.or-rigth {
			width: .13rem;
			height: .26rem !important;
			background: url("../../../static/images/zanzhu-right.png") no-repeat;
			background-size: 100% 100%;
		}
	}
    .virtual-account-box {
        height: 1rem;
        .digital-coin-account {
            width: calc(100% - 1rem);
            border: 1px solid #F4F4F4;
            height: .7rem;
			.bank-list-content {
				font-size: .25rem;
				color: #A8B3C3;
			}
            .bank-list-fonts-activing {
                color: #333333;
            }
		}
    }
    .digital-account-box {
        margin: 0 auto;
        height: 1.2rem;
    }
	.bank-list2 {
		.gray-fonts {
			width: 4.6rem;
			color: #AAB7C5;
			
			.red-fonts {
				color: #FF2A2A;
			}
		}
	}
	.extract-sm {
		text-align: left;
		font-size: .22rem;
		margin: 0 auto 0;
		display: flex;
        padding: 0 5%;
        background: #edeff2;
        .extract-sm-left {
            height: 0.25rem;
            margin: .05rem .1rem 0 0;
        }
		p {
			color: #2A3440;
			
			span {
				color: #3677FF;
			}
		}
	}
}
.channels-remind-popuop.van-popup {
    width: 5rem;
    background: #FFFFFF;
    border-radius: 6px;
    color: #3D3737;
    .channels-remind-line {
        height: 0.2rem;
        background: linear-gradient(90deg, #78BDF2 0%, #2383FC 100%); 
    }
    .channels-remind-title {
        height: 1rem;
        font-size: .32rem;
        .channels-remind-title-left {
            width: 0.1rem;
            height: 0.4rem;
            background: linear-gradient(to bottom, #78BDF2 0%, #FFFFFF 100%);
            border-radius: 4px;
            margin-right: .2rem;
        }
    }
    .channels-remind-intro {
        margin: 0 auto;
        width: 4rem;
        color: #7C8591;
        font-size: .26rem;
    }
    .channels-remind-list-box {
        .channels-remind-list {
            margin: .2rem auto 0;
            width: 4rem;
            font-size: .3rem;
        }
        .channels-remind-list:not(:first-child) {
            margin-top: 0rem;
        }
    }
    .channels-remind-radio {
        font-size: .3rem;
        margin-top: .3rem;
        height: .8rem;
        border-top: #E6E8EE 1px solid;
        border-bottom: #E6E8EE 1px solid;
        // .reminds-radio {
        //     margin-right: .2rem;
        // }
        .check-box-icon {
            height: 0.3rem;
            margin-right: .1rem;
        }
    }
    .channels-remind-btn {
        height: .8rem;
        font-size: .3rem;
        text-align: center;
        line-height: .8rem;
    }
}
.bottom-btn-box {
	margin: 0 auto 0;
    background: #edeff2;
    padding: .2rem 0;
    .bottom-btn {
        width: 90%;
        margin: 0 auto;
    }
	// width: 90%;
}
.confirm-sub-box {
    width: 6rem;
    border-radius: .1rem;
    overflow: hidden;
    background: #FFFFFF;
    .confirm-sub-line {
        height: .15rem;
        background: linear-gradient(90deg, #78BDF2 0%, #2383FC 100%);
    }
    .confirm-sub-line-red {
        background: #E90619
    }
    .confirm-sub-line-yellow {
        background: linear-gradient(90deg, #FFBA00 0%, #E78800 100%);
    }
    .confirm-sub-title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .3rem;
        font-weight: bold;
        color: #303030;
        margin-top: .3rem;
        .left-icon {
            height: 0.34rem;
            margin-right: .1rem;
        }
        .confirm-sub-title-left {
            width: 4px;
            height: 17px;
            background: linear-gradient(to bottom, #2383FC 0%, rgba(18,132,245,.1) 100%);
            margin-right: .1rem;
            border-radius: .05rem;
        }
        .confirm-title-icon {
            height: .3rem;
            margin-right: .1rem;
        }
    }
    .confirm-sub-content {
        font-size: .26rem;
        color: #717171;
        width: 5.5rem;
        margin: .2rem auto 0;
        .confirm-sub-content-red {
            color: #E90619;
            font-weight: bold;
            font-size: .3rem;
        }
        .confirm-sub-content-normal {
            color: #17191C;
            margin: .2rem auto 0;
            line-height: .4rem;
            width: 5rem;
        }
    }
    .confirm-sub-content-gray {
        font-size: .3rem;
        margin-top: .1rem;
        height: .6rem;
        color: #7C8591;
        .check-box {
            width: 3.6rem;
            .check-box-icon {
                height: 0.3rem;
                margin-right: .1rem;
            }
        }
    }
    .confirm-sub-content-gray2 {
        border-top: #E6E8EE 1px solid;
        padding-top: .2rem;
    }
    .confirm-sub-line-dark {
        color: #333333;
        height: unset;
        width: 90%;
        margin: 0 auto;
        border-top: none;
    }
    .confirm-sub-bottom {
        border-top: #E6E8EE 1px solid;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: .2rem;
        .confirm-sub-btn {
            height: .8rem;
            width: 100%;
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
        .confirm-sub-btn3 {
            width: 100%;
            color: #303030;
            border-right: none;
        }
        .confirm-sub-btn4 {
            color: #333333;
        }
    }
}
.quick-deposit-pop-box {
    background-color: unset;
    color: #FFFFFF;
    padding: .2rem 0 0;
    .quick-deposit-pop-content {
        background: rgba(13, 13, 13, .9);
        width: 94%;
        height: 1.2rem;
        border-radius: .26rem;
        font-weight: 500;
        .left-icon {
            width: 0.42rem;
        }
        .center-fonts {
            margin-left: .1rem;
            font-size: .3rem;
            .yellow {
                color: #FDBA00;
            }
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
.van-popup {
    background: none;
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
.online-recharge .notice-pop {
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
.red-fonts {
    color: #FF2A2A;
}
.yellow {
    color: #FEB038;
}
</style>
