<template>
    <div class="quick-deposit">
        <div class="deposit-content" v-if='showStep1'>
            <div class="second-title-box flex-b">
                <div class="flex">
                    <div class="left-blue-line"></div>
                    <div class="second-title-fonts">充值金额：{{quickSelectCash}}</div>
                </div>
                <div class="reload-box flex-c" v-if='!isWaitting' @click="showWait(5)">
                    <van-icon name="replay" color="#FFFFFF" class='bold'/>
                    <span>刷新</span>
                </div>
                <div class="reload-box reload-box2 flex-c" v-if='isWaitting'>{{reloadSecs}}s</div>
            </div>
            <div class="quick-select-box">
                <div class="quick-select-list text-c" :class="quickSelectIndex === index?'quick-select-list-activing':''" v-for='(item,index) in quickSelectDataDefault' :key='index' @click="quickSelectFn(index,1)">
                    ￥ {{item.cash}}
                    <img src="../../../static/images/channel-side-mark-icon.png" v-if='quickSelectIndex === index' alt="" class="bank-quick-list-icon">
                </div>
            </div>
            <div class="switch-more-cash" :class="showMoreCash === true?'show-more-cash':''">
                <div class="second-title-box flex-b">
                    <div class="flex">
                        <div class="left-blue-line"></div>
                        <div class="second-title-fonts">其他金额：</div>
                    </div>
                </div>
                <div class="quick-select-box other-cash-box" v-if='item.show === true' :class="index > 0?'other-cash-box2':''" v-for='(item,index) in quickSelectDataOther' :key='index'>
                    <div class="other-cash-title flex">【{{item.name}}】</div>
                    <div class="other-cash-list-box">
                        <div class="quick-select-list text-c other-cash-list" :class="quickSelectIndexOther === index && quickSelectIndexOtherChild === t?'quick-select-list-activing':''" v-for='(v,t) in item.data' @click="quickSelectFn(t,2,index)">
                            ￥ {{v.cash}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="show-more-cash-box flex-c bold" @click="showMoreCash = !showMoreCash" v-if='!showMoreCash && hasMoreCash'>
                <span>显示其他金额</span>
                <img src="../../../static/images/interest-intro-arrow.png" alt="" class="arrow-icon">
            </div>
            <div class="show-more-cash-box flex-c bold" @click="showMoreCash = !showMoreCash" v-if='showMoreCash && hasMoreCash'>
                <span>收起其他金额</span>
                <img src="../../../static/images/interest-intro-arrow.png" alt="" class="arrow-icon arrow-icon2">
            </div>
            <div class="upload-sub-btn-box upload-sub-btn-box2">
                <div class="upload-sub-btn upload-sub-btn1 bold text-c" v-if='Step1Disable'>立即充值</div>
                <div class="upload-sub-btn upload-sub-btn3 bold text-c" v-if='!Step1Disable' @click="getCookie()">立即充值</div>
                <div class="flex-c" style="margin-top:.2rem;color:#0066D5;font-size:.3rem;" @click="toQuickHelp()">【查看充值教程】</div>
                <div class="upload-sub-btn-warning">
                    <img src="../../../static/images/upload-warning.png" alt="" class="upload-sub-btn-warning-icon">
                    <div class="warning-right-fonts">
                        1. *请使用 手机银行或网银转账 进行转账<br>
                        2. *转账时选择【实时到账】<br>
                        3. 请勿修改金额、保存支付、延迟支付，造成损失自行承担！<br>
                        4. 每次存款前请先至本页面获取最新的收款账号，存款到停用收款账号造成损失自行承担 
                    </div>
                </div>
                <div class="bottom-banner-title flex" v-if='showBanner'>
                    <div class="bottom-banner-left"></div>
                    <span>优惠活动</span>
                </div>
                <img v-if='showBanner' :src="quickBannerUrl" alt="" class="bottom-banner-img" @click="toDiscount()">
            </div>
        </div>
        <div class="second-title-box flex-b" v-if='!showStep1'>
            <div class="flex">
                <div class="left-blue-line"></div>
                <div class="second-title-fonts">{{stepFonts1}}：</div>
                <div class="second-title-fonts-normal bold">{{stepFonts2}}</div>
            </div>
        </div>
        <div class="deposit-status-box flex-c text-c" v-if='!showStep1'>
            <div class="deposit-status-list" :class="{'deposit-status-list-activing':statusMark === 0,'deposit-status-list-finished':statusMark === 1 || statusMark === 2 || statusMark === 3}">
                <div class="deposit-status-list-top">
                    <div class="deposit-status-list-top-bg1 flex-c">
                        <div class="deposit-status-list-top-bg2">1</div>
                    </div>
                </div>
                <div class="deposit-status-list-bottom bold">充值</div>
            </div>
            <div class="deposit-status-line" :class="statusMark === 1 || statusMark === 2 || statusMark === 3?'deposit-status-line-activing':''"></div>
            <div class="deposit-status-list" :class="{'deposit-status-list-activing':statusMark === 1,'deposit-status-list-finished':statusMark === 2 || statusMark === 3}">
                <div class="deposit-status-list-top">
                    <div class="deposit-status-list-top-bg1 flex-c">
                        <div class="deposit-status-list-top-bg2">2</div>
                    </div>
                </div>
                <div class="deposit-status-list-bottom bold">上传</div>
            </div>
            <div class="deposit-status-line" :class="statusMark === 2 || statusMark === 3?'deposit-status-line-activing':''"></div>
            <div class="deposit-status-list" :class="{'deposit-status-list-activing':statusMark === 2,'deposit-status-list-finished':statusMark === 3}">
                <div class="deposit-status-list-top">
                    <div class="deposit-status-list-top-bg1 flex-c">
                        <div class="deposit-status-list-top-bg2">3</div>
                    </div>
                </div>
                <div class="deposit-status-list-bottom bold">提交</div>
            </div>
            <div class="deposit-status-line" :class="statusMark === 3?'deposit-status-line-activing':''"></div>
            <div class="deposit-status-list" :class="statusMark === 3?'deposit-status-list-activing':''">
                <div class="deposit-status-list-top">
                    <div class="deposit-status-list-top-bg1 flex-c">
                        <div class="deposit-status-list-top-bg2">4</div>
                    </div>
                </div>
                <div class="deposit-status-list-bottom bold">完成</div>
            </div>
        </div>
        <div class="deposit-content" v-if='showBankInfo'>
            <!-- <div class="second-title-box flex">
                <div class="left-blue-line"></div>
                <div class="second-title-fonts">收款资料</div>
            </div> -->
            <div class="account-info-box">
                <div class="account-info-list flex-b">
                    <div class="account-info-list-left flex">
                        <div class="account-info-list-left-part1">收 款 资 料:</div>
                        <div class="account-info-list-left-part2">{{orderBankName}}</div>
                    </div>
                </div>
                <div class="account-info-list flex-b">
                    <div class="account-info-list-left flex">
                        <div class="account-info-list-left-part1">收 款 人:</div>
                        <div class="account-info-list-left-part2">{{orderRealName}}</div>
                    </div>
                    <img src="../../../static/images/copy-icon.png" alt="" @click="copyContent('name')" class="account-info-list-right">
                </div>
                <div class="account-info-list flex-b">
                    <div class="account-info-list-left flex">
                        <div class="account-info-list-left-part1">收 款 卡 号:</div>
                        <div class="account-info-list-left-part2">{{orderCardNumber}}</div>
                    </div>
                    <img src="../../../static/images/copy-icon.png" alt="" @click="copyContent('cardNum')" class="account-info-list-right">
                </div>
                <div class="account-info-list account-info-list2">
                    <div class="account-info-list-left account-info-list-left2">
                        <div class="account-info-list-left-part1">收 款 支 行:</div>
                        <div class="account-info-list-left-part2">{{orderBankAddress}}</div>
                    </div>
                    <img src="../../../static/images/copy-icon.png" alt="" @click="copyContent('address')" class="account-info-list-right">
                </div>
                <div class="account-info-list account-info-list2">
                    <div class="account-info-list-left account-info-list-left2">
                        <div class="account-info-list-left-part1">存 款 附 言:</div>
                        <div class="account-info-list-left-part2">{{orderMark}}</div>
                    </div>
                    <img src="../../../static/images/copy-icon.png" alt="" @click="copyContent('mark')" class="account-info-list-right">
                </div>
                <div class="account-info-list flex-b">
                    <div class="account-info-list-left flex">
                        <div class="account-info-list-left-part1">存 款 金 额:</div>
                        <div class="blue">{{orderCash}}</div>
                    </div>
                </div>
                <div class="account-info-list flex-b">
                    <div class="account-info-list-left flex">
                        <div class="account-info-list-left-part1">有 效 时 间:</div>
                        <div class="account-info-list-left-part2" v-if='!showTimeout'>
                            <span class="red">{{quickDepositMnt}}</span>分
                            <span class="red">{{quickDepositSec}}</span>秒
                        </div>
                        <div class="account-info-list-left-part2" v-if='showTimeout'><span class="red">已超时</span></div>
                    </div>
                </div>
            </div>
            <div class="gray-bg"></div>
            <div class="account-info-box account-info-box2">
                <div class="uploader-bottom-intro">
                    <div class="uploader-bottom-intro-title bold">【重要提醒】</div>
                    <div class="uploader-bottom-intro-content">
                        1.支付成功, 请点击”下一步/提交”按钮,否则将无法游戏。<br>
                        2.若有以下行为, 丢失金额概不负责<br>
                        <span class="red bold">- 重复支付, 修改金额支付, 取消支付, 订单超时。</span><br>
                        - 提单与存款金额不符。<br>
                        - 未到账请务必在30分钟内反馈。<br>
                        - 未填写存款附言。<br>
                        3. 有严重违规行为: 故意骗分, 刷单, 将会永久禁用账号。<br>
                        4. 请勿使用支付宝或微信进行转账。
                    </div>
                </div>
            </div>
            <van-popup v-model="queryFixedBtm" position="bottom" :overlay='false' :lock-scroll='false'  get-container=".main-content" id='bottomPop'>
                <div class="upload-sub-btn-box text-c">
                    <div class="upload-sub-btn upload-sub-btn1 bold"  v-if='showTimeout'>超过有效时间，请联系客服</div>
                    <div class="upload-sub-btn upload-sub-btn3 bold"  v-if='!showTimeout' @click="getUploadStatus()">下一步(前往提交存款凭证)</div>
                    <div class="flex-c" style="margin-top:.2rem;color:#0066D5;font-size:.3rem;" @click="toQuickHelp()">【查看充值教程】</div>
                    <div class="upload-sub-btn-warning">
                        <img src="../../../static/images/upload-warning.png" alt="" class="upload-sub-btn-warning-icon">
                        请转账成功后务必
                        <span class="red">返回此页操作</span>
                        ！否则可能造成<span class="red">延迟上分</span>
                    </div>
                </div>
            </van-popup>
        </div>
        <div class="deposit-content" @click="showUploadMenu = null" v-if='showUploadStep'>
            <div class="deposit-name-list flex">
                <div class="deposit-name-list-left">存款姓名</div>
                <input  v-if='!showTimeout2' type="text" maxlength="16" class="deposit-name-list-right" placeholder="请输入存款姓名(必填)" @input='checkQuickDepositSub()' v-model='quickDepositName' :disabled='quickDepositFinished'>
                <img  v-if='showTimeout2' src="../../../static/images/timeout-logo.png" alt="" class="timeout-logo">
            </div>
            <div class="deposit-name-bottom">※为及时到账，请务必输入正确的存款人姓名</div>
            <div class="upload-area">
                <div class="upload-area-top" v-if='!quickDepositFinished && !showTimeout2'>
                    <div class="van-uploader" @click="choseFile()">
                        <div class="upload-click text-c">
                            <span class="upload-click-icon bold">+</span>
                            上传图片
                        </div>
                    </div>
                    <input type="file" accept="image/*" name="uploadFile" ref='fileData' id="uploadFile" @change="fileChange($event)" style="visibility:hidden;position:absolute;top:0px;width:0px" multiple="multiple"/>
                    <div class="uploader-reminds flex-c" v-if='!hasUploadList'>
                        注意：上传图片必须包含<br>
                        1.「交易明细」列表页截图。<br>
                        2.「单笔订单详情」页面。
                    </div>
                    <div class="uploaded-list flex" v-if='hasUploadList'>
                        <div class="uploaded-list-img-box flex-c" v-for='(item,index) in fileList' :key='index' @click.stop="showUploadMenu = index">
                            <img :src="imgUrl + item.img" alt="" class="uploaded-list-img">
                            <div class="upload-menu-box" :class="showUploadMenu === index?'upload-menu-activing':''" :id='showUploadMenu + index'>
                                <div class="upload-menu flex-c" @click.stop="deleteUploadImg(index)">删除</div>
                                <div class="upload-menu-line"></div>
                                <div class="upload-menu flex-c" @click.stop="showUploadImgPop(imgUrl + item.img)">查看</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="upload-area-top" v-if='quickDepositFinished && !showTimeout2'>
                    <div class="uploaded-list uploaded-list2 flex">
                        <div class="uploaded-list-img-box flex-c" v-for='(item,index) in fileList' :key='index' @click.stop="showUploadImgPop(imgUrl + item.img)">
                            <img :src="imgUrl + item.img" alt="" class="uploaded-list-img">
                        </div>
                    </div>
                </div>
                <div class="upload-area-top" v-if='showTimeout2'>
                    <div class="van-uploader">
                        <div class="upload-click text-c">
                            <img src="../../../static/images/timeout-logo.png" alt="" class="timeout-logo timeout-logo2">
                            上传图片
                        </div>
                    </div>
                    <div class="uploaded-list uploaded-list2 flex">
                        <div class="uploaded-list-img-box flex-c" v-for='(item,index) in fileList' :key='index' @click.stop="showUploadImgPop(imgUrl + item.img)">
                            <img :src="imgUrl + item.img" alt="" class="uploaded-list-img">
                        </div>
                    </div>
                </div>
                <div class="upload-area-bottom text-c">
                    已上传<span class="blue"> {{uploadedNum}} </span>张图片（最少<span class="blue">2</span>张最多<span class="blue">10</span>张图片）
                </div>
                <div class="finished-reminds-box" v-if='quickDepositFinished'>
                    <img src="../../../static/images/rules-left-icon.png" alt="" class="finished-reminds-left">
                    <div class="finished-reminds-right">
                        已经收到您的资料, 系统将会优先审核, 若有任何问题还请询问<span class="finished-reminds-blue">客服人员</span>
                    </div>
                </div>
            </div>
            <div class="uploader-bottom-intro uploader-bottom-intro2">
                <div class="uploader-bottom-intro-title bold">【重要提醒】</div>
                <div class="uploader-bottom-intro-content uploader-bottom-intro-content2">
                    1.支付成功, 请点击”下一步/提交”按钮,否则将无法游戏。<br>
                    2.若有以下行为, 丢失金额概不负责<br>
                    <span class="red bold">- 重复支付, 修改金额支付, 取消支付, 订单超时。</span><br>
                    - 提单与存款金额不符。<br>
                    - 未到账请务必在30分钟内反馈。<br>
                    - 未填写存款附言。<br>
                    3. 有严重违规行为: 故意骗分, 刷单, 将会永久禁用账号。
                </div>
            </div>
            <van-popup v-model="queryFixedBtm" position="bottom" :overlay='false' :lock-scroll='false'  get-container=".main-content" id='bottomPop2'>
                <div class="upload-sub-btn-box text-c" v-if='!quickDepositFinished'>
                    <div class="upload-sub-btn upload-sub-btn1 upload-sub-btn4 bold" v-if='quickDepositDisable && !showTimeout2'>
                        <span class="btn-fonts">确认存款</span>
                        <span class="btn-time1">有效时间: {{quickDepositMnt2}} 分 {{quickDepositSec2}} 秒</span>
                    </div>
                    <div class="upload-sub-btn upload-sub-btn3 upload-sub-btn4 bold" v-if='!quickDepositDisable && !showTimeout2' @click="subQuickDepositPop = true">
                        <span class="btn-fonts">确认存款</span>
                        <span class="btn-time2">有效时间: {{quickDepositMnt2}} 分 {{quickDepositSec2}} 秒</span>
                    </div>
                    <div class="upload-sub-btn upload-sub-btn1 bold"  v-if='showTimeout2'>超过有效时间，请联系客服</div>
                    <div class="upload-sub-btn-warning">
                        <img src="../../../static/images/upload-warning.png" alt="" class="upload-sub-btn-warning-icon">
                        请转账成功后务必
                        <span class="red">返回此页操作</span>
                        ！否则可能造成<span class="red">延迟上分</span>
                    </div>
                </div>
            </van-popup>
        </div>
        <input id="copy_content2" type="text" value="" style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;" readonly/>
        <van-popup v-model="uploadImgShow">
            <img :src="imgSrc" alt="" class="check-upload-img">
        </van-popup>
        <van-popup v-model="subQuickDepositPop" :close-on-click-overlay='false' get-container=".main-content">
            <div class="confirm-sub-box">
                <div class="confirm-sub-line"></div>
                <div class="confirm-sub-title">
                    <span class="confirm-sub-title-left"></span>是否确认提交
                </div>
                <div class="confirm-sub-content">
                    <div class="confirm-sub-content-red">禁止以下行为：</div>
                    <div class="confirm-sub-content-normal">
                        - 重复支付<br>
                        - 修改金额支付<br>
                        - 取消支付<br>
                        - 订单超时<br>
                        - 提单与存款金额不符
                    </div>
                </div>
                <div class="confirm-sub-content-gray text-c">
                    若有以上问题还请与<span class="confirm-sub-content-blue">客服联系</span>
                </div>
                <div class="confirm-sub-bottom">
                    <div class="confirm-sub-btn" @click="subQuickDepositPop = false">取消</div>
                    <div class="confirm-sub-btn confirm-sub-btn2" @click='subQuickDepositFn()'>提交</div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="quickDepositCfmPop" :close-on-click-overlay='false' get-container=".main-content">
            <div class="confirm-sub-box">
                <div class="confirm-sub-line confirm-sub-line-green"></div>
                <div class="confirm-sub-title">
                    <img src="../../../static/images/interestSuccess.png" alt="" class="confirm-title-icon">
                    提交完成
                </div>
                <div class="confirm-sub-content-gray text-c">
                    我们已经收到您的充值信息，會尽快确认
                </div>
                <div class="confirm-sub-bottom">
                    <div class="confirm-sub-btn confirm-sub-btn3" @click='finishedQuickDeposit()'>确认</div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="everyDeposit" :close-on-click-overlay='false' get-container=".main-content">
            <div class="confirm-sub-box">
                <div class="confirm-sub-line every-top-line"></div>
                <div class="confirm-sub-title">
                    <img src="../../../static/images/alert-icon.png" alt="" class="left-icon">
                    重要提醒
                </div>
                <div class="confirm-sub-content confirm-sub-content2">
                    <div class="">
                        为了避免延迟上分<br>
                        -<span class="red bold">请勿修改金额、保存支付、延迟支付。</span>
                    </div>
                </div>
                <div class="confirm-sub-content confirm-sub-content2">
                    <div class="">
                        -为了避免延迟上分，充值完毕后，请<span class="red bold">立即上传支付凭证</span>，完成存款凭证提交<br>
                        【未按提示操作，造成损失概不负责！】
                    </div>
                </div>
                <div class="confirm-sub-content-gray confirm-sub-content-gray2 flex-c" @click="radioCheckedEvery = !radioCheckedEvery">
                    <div class="check-box flex">
                        <img v-if="!radioCheckedEvery" src="../../../static/images/check-box-uncheck.png" alt="" class="check-box-icon">
                        <img v-if='radioCheckedEvery' src="../../../static/images/check-box-checked.png" alt="" class="check-box-icon">
                        <span>我已清楚明白注意事项</span>
                    </div>
                </div>
                <div class="confirm-sub-content-gray confirm-sub-content-gray2 border-top flex-c" @click="radioCheckedEvery2 = !radioCheckedEvery2">
                    <div class="check-box flex">
                        <img v-if="!radioCheckedEvery2" src="../../../static/images/check-box-uncheck.png" alt="" class="check-box-icon">
                        <img v-if='radioCheckedEvery2' src="../../../static/images/check-box-checked.png" alt="" class="check-box-icon">
                        <span>24小时内不再提醒</span>
                    </div>
                </div>
                <div class="confirm-sub-bottom">
                    <div class="confirm-sub-btn confirm-sub-btn2" @click="everyDeposit = false">取消</div>
                    <div class="confirm-sub-btn" v-if='!radioCheckedEvery'>确认</div>
                    <div class="confirm-sub-btn confirm-sub-btn2" v-if='radioCheckedEvery' @click="toStep2()">确认</div>
                </div>
            </div>
        </van-popup>
        <!-- 超过次数弹框 -->
        <van-popup v-model="maxTimesPop" class="max-times-pop" position="top" :overlay='false' get-container="#app">
            <div class="max-times-box flex-c">
                <img src="../../../static/images/alert-icon.png" alt="" class="left-icon">
                <div class="max-times-fonts">{{subErrorFonts}}</div>
            </div>
        </van-popup>
        <!--loading-new-->
		<div class="loading-new" v-if="showLoading"><img src="../../../static/images/allLoading.gif" alt=""></div>
    </div>
</template>

<script>
import axios from "axios";
import {Toast} from 'vant'
import { Dialog } from 'vant';
export default {
    name:'quickDeposit',
    components:{
    },
    props:['queryId','queryFixedBtm','queryFixedBtm2'],
    data(){
        return{
            stepFonts1:'步骤一',
            stepFonts2:'进行充值',
            statusMark:0,
            fileList:[],
            hasUploadList:false,
            quickDepositDisable:true,
            quickDepositName:'',
            quickDepositMnt:'',
            quickDepositSec:'',
            quickDepositMnt2:'',
            quickDepositSec2:'',
            uploadedNum:0,
            showUploadMenu:null,
            uploadImgShow:false,
            imgSrc:'',
            subQuickDepositPop:false,
            quickDepositCfmPop:false,
            cancelQuickDepositPop:false,
            quickDepositFinished:false,
            showStep1:true,
            showBankInfo:false,
            showUploadStep:false,
            quickSelectCash:'',
            quickSelectIndex:-1,
            quickSelectIndexOther:-1,
            quickSelectIndexOtherChild:-1,
            quickSelectDataDefault:[],
            quickSelectDataOther:[],
            Step1Disable:true,
            bankInfoData:{},
            orderId:'',
            imgUrl:'',
            firstDeposit:true,
            showBanner:false,
            quickBannerUrl:'',
            showTimeout:null,
            showTimeout2:null,
            everyDeposit:false,
            radioCheckedEvery:false,
            radioCheckedEvery2:false,
            // showBottom:this.queryFixedBtm,
            maxTimesPop:false,
            subErrorFonts:'',
            showMoreCash:false,
            hasMoreCash:false,
            cashId:null,
            cashOutId:null, 
            orderMark:'',
            orderBankName:'',
            orderRealName:'',
            orderCardNumber:'',
            orderBankAddress:'',
            orderCash:'',
            reloadSecs:'',
            isWaitting:false,

            showLoading:false,
        }
    },
    beforeRouteLeave(to, from, next) {    
        this.$destroy(true)
        next()
	},
    mounted(){
        this.getQuickStatus()
        // this.getQuickData()
        this.getBanner()
        this.showWait(5)
    },
    methods:{
        showWait(value){
            if(this.isWaitting === false){
                this.getQuickStatus()
            }
            this.isWaitting = true
            let count = value
            if(count === 0){
                this.isWaitting = false
            }else{
                this.reloadSecs = count
                setTimeout(() => {
                    count --
                    this.showWait(count)
                }, 1000);
            }
        },
        // 读取提交弹框cookie
        getCookie() {
            let status
            if (document.cookie.length > 0) {
                var arr = document.cookie.split("; "); //显示的格式需要切割
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split("="); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] === "quickDepositSub") {
                        status = arr2[1]; //
                    }
                }
            }
            if(status !== 'false') {
                this.everyDeposit = true
            }else{
                // this.showStep1 = false
                // this.showBankInfo = true
                this.getQuickInfo()
            }
        },
        //设置提交弹框cookie
        setCookie(c_status, exdays) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie =
                "quickDepositSub" +
                "=" +
                c_status +
                ";path=/;expires=" +
                exdate.toGMTString();
        },
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
        sendRouter(){
            this.$emit('queryRouter','true')
        },
        choseFile(){
            document.getElementById('uploadFile').click()
        },
        fileChange(e){
            var formData = new FormData() 
            var fileResult = document.getElementById('uploadFile')
            Object.values(fileResult.files).forEach(element => {
                formData.append('file',element) 
            });
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            formData.append('version',this.API.paramVersion)
            formData.append('orderId',this.orderId)
            this.$emit('queryLoading','true')
            axios.post(this.API.uploadJiSu,formData,config).then(res => {
                this.$emit('queryLoading','false')
                if (res.status == '200') {
                    if(res.data.code === '0000'){
                        this.imgUrl = res.data.data.imgUrl
                        this.getQuickStatus()
                        this.checkQuickDepositSub()
                        this.$toastTop('上传成功',1)
                    }else{
                        this.$toastTop(res.data.info,3)
                    }
                } else {
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
            })
        },
        //获取极速充值状态
        getQuickStatus(){
            let params = {
                version:this.API.paramVersion,
            }
            this.ServerAPI.postAPI(this.API.getJiSuStatus2, params, (success,data)=>{
                if (success) {
                    if (data.code === '0000') {
                        this.quickSelectDataDefault = data.data.default.data
                        if(data.data.other.show === true){
                            this.hasMoreCash = true
                            this.quickSelectDataOther = data.data.other.otherList
                        }
                        if(data.data.bankInfo.show === true){
                            if(data.data.bankInfo.depositStatus === 0){
                                this.showStep1 = false
                                this.showBankInfo = true
                                this.orderBankName = data.data.bankInfo.bankName
                                this.orderRealName = data.data.bankInfo.realName
                                this.orderCardNumber = data.data.bankInfo.cardNumber
                                this.orderBankAddress = data.data.bankInfo.bankAddress
                                this.orderMark = data.data.bankInfo.mark
                                this.orderCash = data.data.bankInfo.cash
                                this.orderId = data.data.bankInfo.orderId
                                this.statusMark = 0
                                // this.depositTimeCount(1800)
                                if(data.data.bankInfo.secondBank > 0) {
                                    this.showTimeout = false
                                    this.depositTimeCount(data.data.bankInfo.secondBank)
                                }else{
                                    this.showTimeout = true
                                }
                            }else if(data.data.bankInfo.depositStatus === 1){
                                this.showStep1 = false
                                this.showBankInfo = false
                                this.showUploadStep = true
                                this.orderId = data.data.bankInfo.orderId
                                this.statusMark = 1
                                if(data.data.bankInfo.imgList !== null){
                                    this.hasUploadList = true
                                    this.fileList = data.data.bankInfo.imgList
                                    this.imgUrl = data.data.bankInfo.imgUrl
                                }
                                // this.depositTimeCount(1800)
                                if(data.data.bankInfo.secondCheck > 0) {
                                    this.depositTimeCount2(data.data.bankInfo.secondCheck)
                                    this.showTimeout2 = false
                                }else{
                                    this.showTimeout2 = true
                                }
                                this.checkQuickDepositSub()
                            }else if(data.data.bankInfo.depositStatus === 9){
                                this.showStep1 = false
                                this.showBankInfo = false
                                this.showUploadStep = true
                                this.quickDepositFinished = true
                                this.quickDepositName = data.data.bankInfo.depositRealName
                                this.statusMark = 3
                                this.stepFonts1 = '步骤四'
                                this.stepFonts2 = '正在处理您的提交'
                                this.orderId = data.data.bankInfo.orderId
                                this.fileList = data.data.bankInfo.imgList
                                this.imgUrl = data.data.bankInfo.imgUrl
                                this.uploadedNum = this.fileList.length
                                // this.checkQuickDepositSub()
                                // this.depositTimeCount(data.data.secondCheck)
                            }
                        }
                    }else{
                    }
                }else{
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
            })
        },
        getQuickInfo(){
            this.showLoading = true
            let params = {
                version:this.API.paramVersion,
                visitType:'H5',
                payId:this.queryId,
                cash:this.quickSelectCash,
                cashOutId:this.cashId,
            }
            this.ServerAPI.postAPI(this.API.getJiSuInfo2, params, (success,data)=>{
                this.showLoading = false
                if (success) {
                    if (data.code === '0000') {
                        this.showStep1 = false
                        this.showBankInfo = true
                        // this.bankInfoData = data.data
                        this.orderBankName = data.data.bankName
                        this.orderRealName = data.data.realName
                        this.orderCardNumber = data.data.cardNumber
                        this.orderBankAddress = data.data.bankAddress
                        this.orderMark = data.data.mark
                        this.orderCash = data.data.cash
                        this.orderId = data.data.orderId
                        this.orderId = data.data.orderId
                        if(data.data.secondBank > 0) {
                            this.depositTimeCount(data.data.secondBank)
                            this.showTimeout = false
                        }else{
                            this.showTimeout = true
                        }
                    }else{
                        this.subErrorFonts = data.info
                        this.maxTimesPop = true
                        setTimeout(() => {
                            this.maxTimesPop = false
                        },3000)
                        this.showStep1 = true
                        this.showBankInfo = false
					}
                }
            })
        },
        quickSelectFn(index,type,mode){
            if(type === 1){
                this.cashId = this.quickSelectDataDefault[index].id
                this.quickSelectIndex = index
                this.quickSelectIndexOther = -1
                this.quickSelectCash = this.quickSelectDataDefault[index].cash
            }else if(type === 2){
                this.cashId = this.quickSelectDataOther[mode].data[index].id
                this.quickSelectIndex = -1
                this.quickSelectIndexOther = mode
                this.quickSelectIndexOtherChild = index
                this.quickSelectCash = this.quickSelectDataOther[mode].data[index].cash
            }
            this.Step1Disable = false
        },
        toStep2(){
            if(this.radioCheckedEvery2 === true){
                this.setCookie('false',1)
            }
            this.everyDeposit = false
            this.showStep1 = false
            this.showBankInfo = true
            this.getQuickInfo()
        },
        getUploadStatus(){
            let params = {
                version:this.API.paramVersion,
                orderId:this.orderId,
            }
            this.ServerAPI.postAPI(this.API.getJiSuUploadStatus, params, (success,data)=>{
                if (success) {
                    if (data.code === '0000') {
                        this.showBankInfo = false
                        this.showUploadStep = true
                        this.statusMark = 1
                        this.checkQuickDepositSub()
                        if(data.data.secondCheck > 0) {
                            this.depositTimeCount2(data.data.secondCheck)
                        }else{
                            this.showTimeout2 = true
                        }
                    }else{
                         this.$toastTop(data.info,3)
					}
                }
            })
        },
        goBack(){
            this.$router.back()
        },
        checkQuickDepositSub() {
            if(this.fileList.length > 0){
                this.hasUploadList = true
            }else{
                this.hasUploadList = false
            }
            if(this.fileList.length > 1 && this.quickDepositName.length > 0){
                this.quickDepositDisable = false
                this.stepFonts1 = '步骤三'
                this.stepFonts2 = '提交存款资料'
                this.statusMark = 2
            }else{
                this.quickDepositDisable = true
                this.stepFonts1 = '步骤二'
                this.stepFonts2 = '上传存款凭证'
                this.statusMark = 1
            }
            this.uploadedNum = this.fileList.length
        },
        depositTimeCount(value) {
            var timeCounts = value
            var timeModulo
            var mntShow
            var secShow
            let _this = this
            _this.timer = setInterval(() => {
                timeCounts --;
                if (timeCounts) {
                    timeModulo = timeCounts % (60 * 60)
                    mntShow = Math.floor(timeModulo / 60)   
                    secShow = timeCounts - Math.floor(timeModulo / 60) * 60
                    _this.quickDepositMnt = mntShow
                    _this.quickDepositSec = secShow
                    _this.showTimeout = false
                } else {
                    clearInterval(_this.timer);
                    // _this.getQuickStatus()
                    // location.reload();
                    _this.showTimeout = true
                }
            }, 1000);
            _this.$once('hook:beforeDestroy', () => {  
                clearInterval(_this.timer);  
            })
        },
        depositTimeCount2(value) {
            var timeCounts = value
            var timeModulo
            var mntShow
            var secShow
            let _this = this
            _this.timer = setInterval(() => {
                timeCounts --;
                if (timeCounts) {
                    timeModulo = timeCounts % (60 * 60)
                    mntShow = Math.floor(timeModulo / 60)   
                    secShow = timeCounts - Math.floor(timeModulo / 60) * 60
                    _this.quickDepositMnt2 = mntShow
                    _this.quickDepositSec2 = secShow
                    _this.showTimeout2 = false
                } else {
                    clearInterval(_this.timer);
                    // _this.getQuickStatus()
                    // location.reload();
                    _this.showTimeout2 = true
                }
            }, 1000);
            _this.$once('hook:beforeDestroy', () => {  
                clearInterval(_this.timer);  
            })
        },
        showUploadImgPop(value){
            this.$emit('queryImgSwitch','true')
            this.$emit('queryImg',value)
            // this.uploadImgShow = true
            // this.imgSrc = value
        },
        deleteUploadImg(index){
            let params = {
                version:this.API.paramVersion,
                orderId:this.orderId,
                imgId:this.fileList[index].id,
            }
            this.ServerAPI.postAPI(this.API.delUploadImg, params, (success,data)=>{
                if (success) {
                    if (data.code === '0000') {
                        this.fileList = data.data.imgList
                        this.showUploadMenu = null
                        this.checkQuickDepositSub()
                        var fileResult = document.getElementById('uploadFile')
                        this.$refs.fileData.value = ''
                        // console.log(fileResult.files)
                    }else{
                        this.$toastTop(data.info,3)
					}
                }
            })
        },
        // ‘复制’点击方法 
        copyContent(value) {
            var clickContent
            if(value === 'name'){
                clickContent = this.bankInfoData.realName
            }else if(value === 'cardNum'){
                clickContent = this.bankInfoData.cardNumber
            }else if(value === 'address'){
                clickContent = this.bankInfoData.bankAddress
            }else if(value === 'mark'){
                clickContent = this.bankInfoData.mark
            }
			var inputElement = document.getElementById('copy_content2')
			inputElement.value = clickContent
			inputElement.select()
			document.execCommand('Copy')
            this.$toastTop('复制成功',1)
		},
        subQuickDepositFn() {
            this.subQuickDepositPop = false
            let params = {
                version:this.API.paramVersion,
                orderId:this.orderId,
                realName:this.quickDepositName
            }
            this.ServerAPI.postAPI(this.API.subJiSu, params, (success,data)=>{
                if (success) {
                    if (data.code === '0000') {
                        this.quickDepositCfmPop = true
                        this.stepFonts1 = '步骤四'
                        this.stepFonts2 = '正在处理您的提交'
                        this.quickDepositFinished = true
                        this.statusMark = 3
                    }else{
                        this.$toastTop(data.info,3)
					}
                }
            })
        },
        finishedQuickDeposit() {
            this.quickDepositCfmPop = false
        },
        toDiscount(){
            this.$router.push({name: 'discountOne', params: {id: 198}});
        },
        toQuickHelp() {
            sessionStorage.setItem('helpIndex','quickDeposit')
            this.$router.push('/newerHelp')
        },
    }
}
</script>

<style lang="scss" scoped>
.quick-deposit{
    width: 100%;
	height: 100%;
	background: #EEEEEE;
    .switch-more-cash {
        height: 0;
        overflow: hidden;
        transition: height .8s;
    }
    .show-more-cash {
        height: auto;
        transition: height .8s;
    }
    .second-title-box {
        height: 1rem;
        border-bottom: 1px solid #E6E8EE;
        padding-top: .1rem;
        font-size: .28rem;
        background: #FFFFFF;
        .left-blue-line {
            width: 0.08rem;
            height: 0.4rem;
            background: -webkit-linear-gradient(top, #78BDF2, #FFFFFF);
            background: linear-gradient(to bottom, #78BDF2, #FFFFFF);
            margin-left: .2rem;
        }
        .second-title-fonts {
            color: #0066D5;
            font-weight: bold;
            margin: 0 0 0 .1rem;
        }
        .reload-box {
            width: 1.4rem;
            height: 0.5rem;
            background: linear-gradient(100deg, #78BDF2 0%, #167BFF 100%);
            margin-right: .2rem;
            font-size: .26rem;
            color: #FFFFFF;
            border-radius: .3rem;
            .bold {
                font-weight: bold;
            }
        }
        .reload-box2 {
            background: #AAB3C3;
            color: #FFFFFF;
        }
    }
    .deposit-status-box {
        background: #F6F7F9;
        // padding: .24rem 0;
        border-radius: .15rem;
        width: calc(100% - .4rem);
        margin: .25rem auto 0;
        height: 1.2rem;
        .deposit-status-list {
            width: 0.6rem;
            position: relative;
            .deposit-status-list-top {
                color: #FFFFFF;
                .deposit-status-list-top-bg1 {
                    width: .5rem;
                    height: .5rem;
                    border-radius: 50%;
                    margin: 0 auto;
                    .deposit-status-list-top-bg2 {
                        width: .38rem;
                        height: .38rem;
                        line-height: .38rem;
                        background: #A8B3C3;
                        border-radius: 50%;
                    }
                }
            }
            .deposit-status-list-bottom {
                color: #7C8591;
                font-size: .22rem;
                margin-top: .05rem;
            }
        }
        .deposit-status-line {
            width: 1.6rem;
            height: 1px;
            background: #E6E8EE;
            margin-top: -.3rem;
            margin: -.4rem -.15rem 0;
        }
        .deposit-status-line-activing {
            background: #78BDF2;
        }
        .deposit-status-list-activing {
            .deposit-status-list-top {
                .deposit-status-list-top-bg1 {
                    background: rgba(120, 189, 242, 0.39);
                    .deposit-status-list-top-bg2 {
                        background: rgba(120, 189, 242, 1);
                    }
                }
            }
            .deposit-status-list-bottom {
                color: #1D9DFC;
            }
        }
        .deposit-status-list-finished {
            .deposit-status-list-top {
                .deposit-status-list-top-bg1 {
                    background: none;
                    .deposit-status-list-top-bg2 {
                        background: rgba(120, 189, 242, 1);
                    }
                }
            }
            .deposit-status-list-bottom {
                color: #78BDF2;
            }
        }
    }
    .deposit-content {
        margin-top: 1rem;
        padding: 0;
        background: #FFFFFF;
        .quick-select-box {
            width: calc(100% - .4rem);
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            border-top: 1px solid #F2F1F3;
            // border-bottom: 1px solid #F2F1F3;
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
        .other-cash-box {
            display: block;
            .other-cash-title {
                border-top-left-radius: .15rem;
                border-top-right-radius: .15rem;
                height: 0.7rem;
                background: linear-gradient(to bottom,#F6F7F9,#FFFFFF);
                padding: 0 .1rem;
                margin-top: .2rem;
            }
            .other-cash-list-box {
                background: #F6F7F9;
                border-radius: .15rem;
                padding: .15rem .2rem;
                display: flex;
                flex-wrap: wrap;
                .other-cash-list:first-child,.other-cash-list:nth-child(2),.other-cash-list:nth-child(3),.other-cash-list:nth-child(4) {
                    margin-top: 0;
                }
                .other-cash-list {
                    background: #FFFFFF;
                }
            }
            .other-cash-box2 {
                padding-top: 0;
            }
        }
        .other-cash-box:not(:first-child) {
            border: none;
        }
        .show-more-cash-box {
            color: #7C8591;
            height: 0.78rem;
            border-top: 1px solid #E6E8EE;
            .arrow-icon {
                height: 0.28rem;
                margin-left: .1rem;
            }
            .arrow-icon2 {
                transform: rotate(180deg);
            }
        }
        .account-info-box {
            background: #F8F8FA;
            border-radius: 4px;
            padding: .2rem;
            width: calc(100% - .4rem);
            margin: .2rem auto;
            .account-info-list {
                .account-info-list-left {
                    font-size: .26rem;
                    width: calc(100% - .6rem);
                    .account-info-list-left-part1 {
                        color: #7C8591;
                        width: 1.6rem;
                    }
                    .account-info-list-left-part2 {
                        color: #000000;
                        width: calc(100% - 1.6rem);
                        .blue {
                            color: #1D9DFC;
                        }
                        .red {
                            color: #E90619;
                        }
                    }
                }
                .account-info-list-left2 {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                }
                .account-info-list-right {
                    height: 0.4rem;
                }
            }
            .account-info-list2 {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
            .account-info-list:not(:first-child) {
                margin-top: .2rem;
            }
        }
        .account-info-box2 {
            margin-bottom: 2.8rem;
        }
        .gray-bg {
            height: 0.2rem;
            background: #EEEEEE;
        }
        .deposit-name-list {
            padding: .2rem;
            height: 1rem;
            border-bottom: 1px solid #E6E8EE;
            font-size: .28rem;
            .deposit-name-list-left {
                width: 1.6rem;
                
                color: #464646;
            }
            .deposit-name-list-right {
                border: none;
                outline: none;
                width: calc(100% - 1.6rem);
                background: none;
            }
        }
        .deposit-name-bottom {
            padding: 0 .2rem;
            height: 0.6rem;
            line-height: .6rem;
            color: #A8B3C3;
            font-size: .2rem;
        }
        .upload-area {
            width: calc(100% - .4rem);
            margin: .3rem auto 0;
            .upload-area-top {
                display: flex;
                align-items: flex-start;
                overflow-x: auto;
                width: 100%;
                .van-uploader {
                    width: 1.4rem;
                    height: 2rem;
                    border: #888888 1px dashed;
                    border-radius: .1rem;
                    .upload-click {
                        // margin-left: .2rem;
                        font-size: .24rem;
                        .upload-click-icon {
                            display: block;
                            font-size: .46rem;
                            margin-top: .4rem;
                        }
                    }
                }
                .uploader-reminds {
                    color: #FF3636;
                    width: calc(100% - 1.6rem);
                    height: 2rem;
                }
                .uploaded-list {
                    width: calc(100% - 1.6rem);
                    margin-left: .2rem;
                    overflow-x: scroll;
                    .uploaded-list-img-box {
                        width: 1.4rem;
                        height: 2rem;
                        background: rgba(0,0,0,.2);
                        border-radius: .1rem;
                        position: relative;
                        .uploaded-list-img {
                            width: 1.4rem;
                            max-height: 2rem;
                            border-radius: .1rem;
                        }
                        .upload-menu-box {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            background: rgba(0,0,0,.7);
                            color: #FFFFFF;
                            border-radius: .1rem;
                            display: none;
                            .upload-menu {
                                height: calc(50% - 1px);
                            }
                            .upload-menu-line {
                                width: 80%;
                                height: 2px;
                                background: #FFFFFF;
                                margin: 0 auto;
                            }
                        }
                        .upload-menu-activing {
                            display: block;
                        }
                    }
                    .uploaded-list-img-box:not(:last-child) {
                        margin-right: .2rem;
                    }
                }
                .uploaded-list2 {
                    width: 100%;
                }
            }
            .upload-area-bottom {
                color: #7C8591;
                margin: .2rem 0;
            }
            .finished-reminds-box {
                margin: .2rem 0;
                display: flex;
                align-items: flex-start;
                .finished-reminds-left {
                    height: 0.3rem;
                    margin: .05rem .1rem 0 .2rem;
                }
                .finished-reminds-right {
                    .finished-reminds-blue {
                        color: #1D9DFC;
                    }
                }
            }
        }
        .uploader-bottom-intro {
            .uploader-bottom-intro-title {
                background: linear-gradient(to bottom,#F4F5F8,#FFFFFF);
                height: .8rem;
                line-height: .45rem;
                border-radius: .1rem;
            }
            .uploader-bottom-intro-content {
                background: #F6F7F9;   
                color: #7C8591;
                border-radius: .1rem;
                padding: .2rem 0 0;
                font-size: .26rem;
                margin-top: -.2rem;
                line-height: .4rem;
                .red {
                    color: #E90619;
                }
            }
            .uploader-bottom-intro-content2 {
                padding: .2rem;
                margin-bottom: 2rem;
            }
        }
        .uploader-bottom-intro2 {
            width: calc(100% - .4rem);
            margin: 0 auto;
            background: #FFFFFF;
            padding-bottom: .2rem;
            .uploader-bottom-intro-title {
                height: 1rem;
                line-height: .8rem;
            }
        }
        .upload-sub-btn-box2 {
            .upload-sub-btn-warning {
                display: flex;
                align-items: flex-start;
                flex-wrap: unset;
                .upload-sub-btn-warning-icon {
                    margin-right: .1rem;
                }
                .warning-right-fonts {
                    margin-top: -.05rem;
                    line-height: .35rem;
                    font-size: .26rem;
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
                margin: .15rem auto 0;
            }
        }
    }
    .deposit-content:not(:nth-child(2)) {
        margin-top: .3rem;
    }

}
.van-uploader__wrapper {
    display: flex;
    justify-content: center;
    .van-uploader__input-wrapper {
        margin: 0 auto;
    }
}
.check-upload-img {
    max-width: 60vw;
    max-height: 80vh;
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
        .every-top-line {
            background: linear-gradient(90deg, #FFBA00 0%, #E78800 100%);
        }
        .confirm-sub-line-red {
            background: #E90619
        }
        .confirm-sub-line-green {
            background: linear-gradient(90deg, #5CBD37 0%, #22C02A 100%);
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
                height: 0.35rem;
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
            width: 3rem;
            margin: .2rem auto 0;
            .confirm-sub-content-red {
                color: #E90619;
                font-weight: bold;
            }
            .confirm-sub-content-normal {
                color: #17191C;
                margin-top: .1rem;
                line-height: .4rem;
            }
        }
        .confirm-sub-content2 {
            width: 5rem;
            color: #17191C;
            .red-fonts {
                text-decoration: underline;
            }
        }
        .confirm-sub-content-gray {
            color: #7C8591;
            font-size: .26rem;
            margin-top: .1rem;
            .confirm-sub-content-blue {
                color: #1D9DFC;
            }
            .check-box {
            width: 3.4rem;
                .check-box-icon {
                    height: 0.3rem;
                    margin-right: .1rem;
                }
            }
        }
        .confirm-sub-content-gray2 {
            margin-top: .2rem;
            padding-top: .2rem;
        }
        .border-top {
            border-top: #E6E8EE 1px solid;
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
            .confirm-sub-btn2:first-child {
                border-right: #E6E8EE 1px solid;
            }
            .confirm-sub-btn3 {
                width: 100%;
                color: #303030;
                border-right: none;
            }
        }
    }
}
.upload-sub-btn-box {
    width: 100%;
    background: #EEEEEE;
    padding: .4rem 0 .4rem;
    .upload-sub-btn {
        width: 88%;
        height: 0.9rem;
        line-height: .9rem;
        margin: 0 auto;
        font-size: .3rem;
        border-radius: .1rem;
    }
    .upload-sub-btn1 {
        background: #D7D7D8;
        color: #303030;
    }
    .upload-sub-btn2 {
        background: #FFFFFF;
        color: #303030;
        border: 1px solid #DDDDDD;
        margin-top: .2rem;
    }
    .upload-sub-btn3 {
        background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
        color: #FFFFFF;
    }
    .upload-sub-btn4 {
        line-height: unset;
        .btn-fonts {
            display: block;
            font-size: .35rem;
            padding-top: .05rem;
        }
        .btn-time1 {
            display: block;
            font-size: .2rem;
            color: #FF0000;
            margin-top: -.05rem;
            font-weight: normal;
        }
        .btn-time2 {
            display: block;
            font-size: .2rem;
            color: #FFFFFF;
            margin-top: -.05rem;
            font-weight: normal;
        }
    }
    .upload-sub-btn-warning {
        margin: .3rem auto 0;
        color: #7C8591;
        width: 88%;
        flex-wrap: wrap;
        font-size: .2rem;
        word-break: break-all;
        text-align: left;
        .upload-sub-btn-warning-icon {
            height: 0.28rem;
            margin-right: .0rem;
            margin-top: -.02rem;
        }
        .red {
            color: #FC3636;
        }
    }
}
.max-times-pop {
    top: 1rem;
    .max-times-box {
        width: 90%;
        margin: 0 auto;
        background: #000000;
        border-radius: .2rem;
        padding: .2rem 0;
        .left-icon {
            height: 0.4rem;
        }
        .max-times-fonts {
            max-width: 4rem;
            color: #FFFFFF;
            margin-left: .15rem;
            font-size: .3rem;
            word-break:break-all;
        }
    }
}
.uploading-box.van-overlay {
    background-color: unset;
}
.timeout-logo {
    display: block;
    height: 0.34rem;
}
.timeout-logo2 {
    display: block;
    height: 0.34rem;
    margin: .6rem auto .1rem;
}
.blue {
    color: #1D9DFC;
}
.red {
    color: #E90619;
    text-decoration: unset;
}
</style>
