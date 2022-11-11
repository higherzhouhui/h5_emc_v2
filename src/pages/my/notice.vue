<template>
	<div class="mySZdetail">
        <div class="replace-header">
			<div class="goBack" @click="goBack()">
                <img src="../../../static/images/back-icon.png" alt="" class="back-icon">
            </div>
			<div class="header-title">我的消息</div>
			<div class="header-right write-fonts text-c" v-if='!showEdit' @click='toWrite()'>写信</div>
			<div class="header-right" v-if='showEdit'>
                <van-icon class='more-icon' name="weapp-nav" v-if='!showCancel' @click="moreMenu = true"/>
                <div class="more-menu" v-if='moreMenu'>
                    <div class="more-menu-list flex-c" @click.stop='toWrite()'>写信</div>
                    <div class="more-menu-line" v-if='titleIndex !== 3'></div>
                    <div class="more-menu-list flex-c" v-if='titleIndex !== 3' @click.stop='showEditMenu()'>编辑</div>
                </div>
                <div class="trangle" v-if='moreMenu'></div>
                <div class="menu-mask" v-if='moreMenu' @click.stop="moreMenu = false"></div>
                <div class='cancel-fonts' v-if='showCancel' @click.stop='closeEdit()'>取消</div>
            </div>
		</div>
        <div class="tab-title-box" v-if='!editShowInbox && !editShowOutbox'>
            <div class="tab-title">
                <div class="tab-title-list" :class="titleIndex === 3?'title-chosing':''" @click="switchNav(3)">公告</div>
                <div class="tab-title-list" :class="titleIndex === 1?'title-chosing':''" @click="switchNav(1)">
                    收件箱
                    <div class="unread-point" v-if='hasUnread'></div>
                </div>
                <div class="tab-title-list" :class="titleIndex === 2?'title-chosing':''" @click="switchNav(2)">发件箱</div>
            </div>
        </div>
        <div class="content-box" :class="editShowInbox === true?'bottom-activing':''" v-if="titleIndex === 1">
            <div class="sms-content">
                <div class="no-sms" v-if='noInboxData'>
                    <!-- <img src="../../../static/images/no-sms.png" alt=""> -->
                    <lottie style='width:60%;margin:2rem auto 0;height:unset;' class='lottie-icon' :options="defaultOptions"  :width="94" :height="30" v-on:animCreated="handleAnimation" />
                    <div class='bold'>暂无数据</div>
                </div>
                <div class="sms-content-list" v-for="(v,index) in inList" :key="index" @click="inBoxDetail(index)">
                    <div class="in-list-left flex">
                        <img v-if='editShowInbox && !v.chosed' src="../../../static/images/check-box-uncheck.png" alt="" class="check-img">
                        <img v-if='editShowInbox && v.chosed' src="../../../static/images/check-box-checked.png" alt="" class="check-img">
                        <div class="in-list-left-fonts">
                            <div>
                                <span class="in-box-title bold" :class="v.messageStatus === '0'?'un-read-fonts':''">{{v.title}}</span>
                                <span class="blue-point" v-if="v.messageStatus === '0'"></span>
                            </div>
                            <div class='msg-date bold flex' :class="v.messageStatus === '0'?'msg-date-unread':''">
                                <span class="msg-date-fonts">{{v.addTime}}</span>
                                <span v-if="v.category === 'DEPOSIT'" class="msg-type flex-c deposit-type">充值</span>
                                <span v-if="v.category === 'WITHDRAW'" class="msg-type flex-c withdraw-type">提现</span>
                                <span v-if="v.category === 'DISCOUNT'" class="msg-type flex-c discount-type">优惠</span>
                                <span v-if="v.category === 'JIESUAN'" class="msg-type flex-c jiesuan-type">结算</span>
                                <span v-if="v.category === 'ACCOUNT'" class="msg-type flex-c account-type">帐号</span>
                                <span v-if="v.category === 'RISK'" class="msg-type flex-c risk-type">风控</span>
                                <span v-if="v.category === 'COMPLAIN'" class="msg-type flex-c complain-type">投诉</span>
                                <span v-if="v.category === 'SUGGEST'" class="msg-type flex-c suggest-type">建议</span>
                                <span v-if="v.category === 'LOVE'" class="msg-type flex-c love-type">爱情</span>
                            </div>
                        </div>
                    </div>
                    <img src="../../../static/images/zanzhu-right.png" alt="">
                </div>
            </div>
        </div>
        <div class="content-box" :class="editShowOutbox === true?'bottom-activing':''" v-if="titleIndex === 2">
            <div class="sms-content">
                <div class="no-sms" v-if='noOutboxData'>
                    <!-- <img src="../../../static/images/no-sms.png" alt=""> -->
                    <lottie style='width:60%;margin:2rem auto 0;height:unset;' class='lottie-icon' :options="defaultOptions"  :width="94" :height="30" v-on:animCreated="handleAnimation" />
                    <div class='bold'>暂无数据</div>
                </div>
                <div class="sms-content-list" v-for="(items,index) in sendList" :key="index" @click="sendBoxDetail(index)">
                    <div class="in-list-left flex">
                        <img v-if='editShowOutbox && !items.chosed' src="../../../static/images/check-box-uncheck.png" alt="" class="check-img">
                        <img v-if='editShowOutbox && items.chosed' src="../../../static/images/check-box-checked.png" alt="" class="check-img">
                        <div class="in-list-left-fonts">
                            <div>
                                <span class="in-box-title un-read-fonts">{{items.title}}</span>
                            </div>
                            <div class='msg-date msg-date-unread bold flex'>
                                <span class="msg-date-fonts">{{items.addTime}}</span>
                                <span v-if="items.category === 'DEPOSIT'" class="msg-type flex-c deposit-type">充值</span>
                                <span v-if="items.category === 'WITHDRAW'" class="msg-type flex-c withdraw-type">提现</span>
                                <span v-if="items.category === 'DISCOUNT'" class="msg-type flex-c discount-type">优惠</span>
                                <span v-if="items.category === 'JIESUAN'" class="msg-type flex-c jiesuan-type">结算</span>
                                <span v-if="items.category === 'ACCOUNT'" class="msg-type flex-c account-type">帐号</span>
                                <span v-if="items.category === 'RISK'" class="msg-type flex-c risk-type">风控</span>
                                <span v-if="items.category === 'COMPLAIN'" class="msg-type flex-c complain-type">投诉</span>
                                <span v-if="items.category === 'SUGGEST'" class="msg-type flex-c suggest-type">建议</span>
                                <span v-if="items.category === 'LOVE'" class="msg-type flex-c love-type">爱情</span>
                            </div>
                        </div>
                    </div>
                    <img src="../../../static/images/zanzhu-right.png" alt="">
                </div>
            </div>
        </div>
        <div class="content-box" v-if="titleIndex === 3">
            <div class="notice-nav-box-bg">
                <div class="notice-nav-box flex-b bold">
                    <div class="notice-nav-list flex-c" :class="noticeIndex === 1?'notice-nav-list-activing':''" @click='switchNotice(1)'>平台公告</div>
                    <div class="notice-nav-line"></div>
                    <div class="notice-nav-list flex-c" :class="noticeIndex === 2?'notice-nav-list-activing':''" @click='switchNotice(2)'>赛事公告(易倍)</div>
                </div>
            </div>
            <div class="my-message-list" v-if='noticeIndex === 1' v-for="(v,index) in data" :key="index" @click.stop="toPushdetail(index)">
                <img src="../../../static/images/notice-list-hot.png" v-if="v.label === 'HOT'" alt="" class="message-mark">
                <img src="../../../static/images/notice-list-new.png" v-if="v.label === 'NEW'" alt="" class="message-mark">
                <div class="list-message-text">
                    <div class="list-message-text-main">
                        <p>{{ v.title }}</p>
                        <p>{{ v.addTime }}</p>
                    </div>
                </div>
                <div class="list-message-img"></div>
            </div>
            <div class="match-list" v-if='noticeIndex === 2' v-for="(item,index) in faData" :key="index">
                <div class="match-content">{{item.co}}</div>
                <div class="match-date">{{item.date}}</div>
            </div>
        </div>
        <van-popup v-model="showSelect" class="msg-popup notice-pop">
            <div class="msg-popup-title">
                <div class="msg-popup-title-line"></div>
				<div class="msg-popup-title-fonts flex-c bold">
                    <span class="left-blue-line"></span>
                    <span>平台公告</span>
                </div>
                <div class="msg-time flex-c">
                    <img src="../../../static/images/notice-hot.png" v-if="noticeHot" alt="" class="msg-mark">
                    <img src="../../../static/images/notice-new.png" v-if="noticeNew" alt="" class="msg-mark">
                    {{msgTime}}
                </div>
				<div class="notice-content">
					<div class="sle text-c">{{ noticeTitle }}</div>
					<div class="sle2" v-html="noticeContent"></div>
				</div>
                <div class="confirm-btn-area">
                    <div class="confirm-btn" @click="closeSelect" v-if="noticePopIndex === 0">关闭</div>
                    <div class="confirm-btn confirm-btn2" @click="toPre()" v-if="noticePopIndex > 0 && data.length > 1">上一页</div>
                    <div class="confirm-btn confirm-btn2" @click="toNext()" v-if="noticePopIndex < data.length - 1 && data.length > 1">下一页</div>
                    <div class="confirm-btn" @click="closeSelect" v-if="noticePopIndex === data.length - 1 && data.length > 1">关闭</div>
                </div>
			</div>
        </van-popup>
        <van-popup class="msg-popup" v-model="showSelectInbox">
            <div class="msg-popup-title">
                <div class="msg-popup-title-line"></div>
				<div class="msg-popup-title-fonts flex-c bold">
                    <span class="left-blue-line"></span>
                    <span>站内信详情</span>
                </div>
                <div class="msg-time">{{msgTime}}</div>
                <div class="notice-content">
                    <div class="sle">{{smsTitle}}</div>
                    <div class="sle2" v-html="replaceContentSms"></div>
                </div>
                <div class="confirm-btn-area">
                    <div class="confirm-btn" @click="closeSelectInbox()">关闭</div>
                    <div class="confirm-btn confirm-btn2" @click="delInMsg()">删除</div>
                </div>
            </div>
        </van-popup>
        <van-popup class="msg-popup" v-model="showSelectOutbox" @click="showSendMenu = null">
            <div class="msg-popup-title">
                <div class="msg-popup-title-line"></div>
				<div class="msg-popup-title-fonts flex-c bold">
                    <span class="left-blue-line"></span>
                    <span>站内信</span>
                </div>
                <div class="msg-time">{{msgTime}}</div>
                <div class="notice-content">
                    <div class="sle">{{sendTitle}}</div>
                    <div class="sle2">
                        <div class="" v-html="replaceOutContent"></div>
                    </div>
                </div>
                <div class="img-show-box">
                    <div class="img-show-list-box flex-c" v-for='(item,index) in imgList' @click.stop="showSendMenu = index">
                        <img :src="imgUrl + item.img" alt="" class="img-show-list">
                        <div class="upload-menu-box" :class="showSendMenu === index?'upload-menu-activing':''">
                            <div class="upload-menu flex-c" @click.stop="showSendImgPop(imgUrl + item.img)">查看</div>
                        </div>
                    </div>
                </div>
                <div class="confirm-btn-area">
                    <div class="confirm-btn" @click="closeSelectOutbox()">关闭</div>
                    <div class="confirm-btn confirm-btn2" @click="delOutMsg()">删除</div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="sendImgShow" class='check-upload-img-box check-upload-img-box2' get-container="#app">
            <img :src="sendImgSrc" alt="" class="check-upload-img">
            <div class="img-close-box" @click="sendImgShow = false">
                <van-icon class='img-close-icon' name="clear" size=".5rem"/>
            </div>
        </van-popup>
        <van-popup class="edit-box" v-model="editShowInbox" position="bottom" :style="{ height: '1.4rem' }" :overlay='false' :lock-scroll='false'>
            <div class="edit-btn-box flex-b bold">
                <div class="edit-btn-list flex-c" v-if='!allInboxChosed' @click='choseInboxAll(1)'>全选</div>
                <div class="edit-btn-list flex-c" v-if='allInboxChosed' @click='choseInboxAll(2)'>取消全选</div>
                <div v-if='this.inboxIds.length === 0' class="edit-btn-list edit-btn-list2 flex-c">删除(0)</div>
                <div v-if='this.inboxIds.length > 0' class="edit-btn-list edit-btn-list3 flex-c" @click='delInboxMul()'>删除({{delInboxNum}})</div>
            </div>
        </van-popup>
        <van-popup class="edit-box" v-model="editShowOutbox" position="bottom" :style="{ height: '1.4rem' }" :overlay='false' :lock-scroll='false'>
            <div class="edit-btn-box flex-b bold">
                <div class="edit-btn-list flex-c" v-if='!allOutboxChosed' @click='choseOutboxAll(1)'>全选</div>
                <div class="edit-btn-list flex-c" v-if='allOutboxChosed' @click='choseOutboxAll(2)'>取消全选</div>
                <div v-if='this.outboxIds.length === 0' class="edit-btn-list edit-btn-list2 flex-c">删除(0)</div>
                <div v-if='this.outboxIds.length > 0' class="edit-btn-list edit-btn-list3 flex-c" @click='delOutboxMul()'>删除({{delOutboxNum}})</div>
            </div>
        </van-popup>
        <div class="loading-new" v-if="showLoading"><img src="../../../static/images/allLoading.gif" alt=""></div>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top';
import {Toast} from 'vant';
import noData from "@/assets/lottie/noData.json"
import axios from "axios";
import dayjs from 'dayjs';
export default {
	name: 'mySZdetail',
	components: {
		HeaderTop,
        noData,
	},
	data() {
		return {
			tabNum: 1,
			selected: '',
			data: [],
			isKeepAlive: false,
			showSelect: false,
			noticeTitle: "",
			noticeContent: "",
			replaceContent: "",
            titleIndex:1,

            noSMS:false,
            sendList:[],
            inList:[],
            smsTitle:'',
            replaceContentSms:"",
            replaceOutContent:"",
            sendTitle:"",
			sendInfo:"",
            showSelectOutbox:false,
            showSelectInbox:false,
            msgTime:'',

            showLoading:false,
            imgUrl:'',
            sendImgSrc:'',
            imgList:[],
            showSendMenu:null,
            sendImgShow:false,
            hasUnread:false,
            moreMenu:false,

            defaultOptions:{animationData:noData,loop:true,autoplay:true},
            defaultAnim:'',
            noInboxData:false,
            noOutboxData:false,
            editShowInbox:false,
            editShowOutbox:false,
            delInboxNum:0,
            delOutboxNum:0,
            showCancel:false,
            inboxChosed:-1,
            allInboxChosed:false,
            allOutboxChosed:false,
            inboxIds:[],
            outboxIds:[],
            formData:new FormData(),
            noticePopIndex:null,
            noticeHot:false,
            noticeNew:false,
            faData:[],
            noticeIndex:1,
            showEdit:true,
		}
	},
	beforeRouteLeave(to, from, next) {    
        // sessionStorage.removeItem('msgId')
		this.$destroy(true)
		next()
	},
	mounted() {
		// this.titleIndex = this.$route.params.tabNum;
        if(this.$route.params.tabNum === 2) {
            this.loadTop()
            this.getFbData()
            this.titleIndex = 3
        }else{
            this.inBox()
        }
	},
	methods: {
        switchNotice(val){
            this.noticeIndex = val
        },
        getFbData(){
            let params = {
                limit:10,
                version:'5.0.0'
            }
			this.ServerAPI.postAPI(this.API.getFbNotice,params,(success, data) => {
				if(success){
					if(data.code=='0000'){
                        this.faData = eval('(' + data.data + ')')
                        this.faData.forEach((item => {
                            let Y = dayjs(item.pt).$y
                            let M = dayjs(item.pt).$M + 1
                            if (M < 10) {
                                M = '0' + M
                            }
                            let D = dayjs(item.pt).$D + ''
                            if (D < 10) {
                                D = '0' + D
                            }
                            let Hour = dayjs(item.pt).$H + ''
                            if (Hour < 10) {
                                Hour = '0' + Hour
                            }
                            let Min = dayjs(item.pt).$m + ''
                            if (Min < 10) {
                                Min = '0' + Min
                            }
                            let Sec = dayjs(item.pt).$s + ''
                            if (Sec < 10) {
                                Sec = '0' + Sec
                            }
                            item.date = Y + '-' + M + '-' + D + ' ' + Hour + ':' + Min + ':' + Sec
                        }))
					}else{

                    }
				}else{

                }
			})
		},
        toPre(){
            this.toPushdetail(this.noticePopIndex - 1)
        },
        toNext(){
            this.toPushdetail(this.noticePopIndex + 1)
        },
        choseInboxAll(val) {
            if(val === 1) {
                this.inList.forEach((item,index) => {
                    this.$set(this.inList[index],'chosed',true)
                    this.inboxIds.push(item.id)
                })
                this.allInboxChosed = true
                this.delInboxNum = this.inList.length
            }else if(val === 2) {
                this.inList.forEach((item,index) => {
                    this.$set(this.inList[index],'chosed',false)
                })
                this.inboxIds = []
                this.allInboxChosed = false
                this.delInboxNum = 0
            }
            this.$forceUpdate();
        },
        choseOutboxAll(val) {
            if(val === 1) {
                this.sendList.forEach((item,index) => {
                    this.$set(this.sendList[index],'chosed',true)
                    this.outboxIds.push(item.id)
                })
                this.allOutboxChosed = true
                this.delOutboxNum = this.sendList.length
            }else if(val === 2) {
                this.sendList.forEach((item,index) => {
                    this.$set(this.sendList[index],'chosed',false)
                })
                this.outboxIds = []
                this.allOutboxChosed = false
                this.delOutboxNum = 0
            }
            this.$forceUpdate();
        },
        closeEdit(){
            this.editShowInbox = this.editShowOutbox =  false
            this.showCancel = false
            this.inboxIds = this.outboxIds = []
            this.inList.forEach(item => {
                item.chosed = false
            })
            this.sendList.forEach(item => {
                item.chosed = false
            })
        },
        showEditMenu(){
            this.moreMenu = false
            if(this.titleIndex === 1) {
                this.editShowInbox = true
                this.showCancel = true
                this.inboxIds = []
            }else if(this.titleIndex === 2) {
                this.editShowOutbox = true
                this.showCancel = true
                this.outboxIds = []
            }
        },
        handleAnimation(anim){
            this.defaultAnim = anim;
        },
        goBack () {
            this.$router.back()
        },
        toWrite() {
            this.$router.push('/writeMsg')
        },
        showSendImgPop(value){
            this.sendImgShow = true
            this.sendImgSrc = value
        },
		loadTop() {
			let params = {
				limit: 30,
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.webnotice, params, this.webnotice)
		},
		webnotice(success, data) {
			if (success) {
				if (data.code === '0000') {
					this.data = data.data;
				}
			}
		},
		toPushdetail(index) {
            this.noticePopIndex = index
			this.showSelect = true;
			this.noticeTitle = this.data[index].title;
			this.msgTime = this.data[index].addTime;
			this.noticeContent = this.data[index].content;
			// this.replaceContent = this.noticeContent.replace('<strong', '<B')
			// this.replaceContent = this.replaceContent.replace('</strong>', "</B>")
			// this.replaceContent = this.replaceContent.replace(/\\t/g, "&emsp;")
            if(this.data[index].label === 'HOT'){
                this.noticeHot = true
            }else{
                this.noticeHot = false
            }
            if(this.data[index].label === 'NEW'){
                this.noticeNew = true
            }else{
                this.noticeNew = false
            }
            // if(this.noticeIndex === 0){

            // }
		},
		closeSelect() {
			this.showSelect = false;
		},

        switchNav(value){
            this.titleIndex = value
			if(value === 1){
                this.showEdit = true
				this.inBox()
			}else if(value === 2){
                this.showEdit = true
				this.sendBox()
			}else{
                this.showEdit = false
                this.loadTop()
                this.getFbData()
            }
		},
		inBox(){
			this.ServerAPI.postAPI(this.API.inBox,'',(success, data) => {
				if(success){
					if(data.code=='0000'){
						this.inList = data.data;
                        this.inList.forEach(item => {
                            item.chosed = false
                        })
                        if(sessionStorage.getItem('msgId')) {
                            let tempData = this.inList.find(item => item.id  = parseInt(sessionStorage.getItem('msgId')))
                            this._index = this.inList.indexOf(tempData)
                            this.inBoxDetail(this._index)
                            sessionStorage.removeItem('msgId')
                        }
						if (this.inList.length == 0){
							this.noInboxData = true;
							this.showEdit = false;
						}else {
                            this.noInboxData = false
                            this.showEdit = true;
                        }
                        this.checkUnreadNum()
					}
				}
			});
		},
        checkUnreadNum(){
            let num = 0
            this.inList.forEach((t,i)=>{
                if(t.messageStatus === '0') {
                    num ++
                }
            })
            if(num > 0){
                this.hasUnread = true
            }else{
                this.hasUnread = false
            }
        },
		sendBox(){
			this.ServerAPI.postAPI(this.API.outBox,'',(success, data) => {
				if(success){
					if(data.code=='0000'){
						this.sendList = data.data;
                        this.sendList.forEach(item => {
                            item.chosed = false
                        })
						if (this.sendList.length == 0){
							this.noOutboxData = true;
                            this.showEdit = false;
						}else{
                            this.noOutboxData = false
                            this.showEdit = true;
                        }
					}
				}
			});
		},
		inBoxDetail(index){
            if(this.editShowInbox === true){
                if(this.inList[index].chosed === false) {
                    this.$set(this.inList[index],'chosed',true)
                    this.inboxIds.push(this.inList[index].id)
                    this.delInboxNum ++
                }else{
                    this.$set(this.inList[index],'chosed',false)
                    this.allInboxChosed = false
                    this.inboxIds.splice(this.inboxIds.indexOf(this.inList[index].id),1)
                    this.delInboxNum --
                }
                if(this.delInboxNum === this.inList.length){
                    this.allInboxChosed = true
                }
                console.log(this.inboxIds)
                this.$forceUpdate();
            }else{
                this._index = index;
                this.showSelectInbox = true;
                this.smsTitle = this.inList[index].title;
                this.msgTime = this.inList[index].addTime;
                this.noticeContent = this.inList[index].messageInfo;
                this.replaceContentSms = this.noticeContent.replace(/\n/g,"<br>");
                this.replaceContentSms = this.replaceContentSms.replace(/\t/g,"&emsp;");
                var reg = /((http|https):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/g;
                this.replaceContentSms = this.replaceContentSms.replace(reg, "<a href='$1' target='_blank' style='color: #028AFE;width: 360px;display: inline;'>$1</a>");
                this.findMsg();
            }
		},
		findMsg(){
			let params = {
				id:this.inList[this._index].id,
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.findMessage,params,(success, data) => {
				if(success){
					if(data.code=='0000'){
						this.inList[this._index].messageStatus = '1';
                        this.inBox()
					}
				}
			});
		},
		sendBoxDetail(index){
            if(this.editShowOutbox === true){
                if(this.sendList[index].chosed === false) {
                    this.$set(this.sendList[index],'chosed',true)
                    this.outboxIds.push(this.sendList[index].id)
                    this.delOutboxNum ++
                }else{
                    this.$set(this.sendList[index],'chosed',false)
                    this.allOutboxChosed = false
                    this.outboxIds.splice(this.outboxIds.indexOf(this.sendList[index].id),1)
                    this.delOutboxNum --
                }
                if(this.delOutboxNum === this.sendList.length){
                    this.allOutboxChosed = true
                }
                this.$forceUpdate();
            }else{
                this._index = index;
                this.showSelectOutbox = true;
                this.imgUrl = this.sendList[index].imgUrl  
                this.imgList = this.sendList[index].imgList
                this.sendTitle = this.sendList[index].title;
                this.msgTime = this.sendList[index].addTime;
                this.sendInfo = this.sendList[index].messageInfo;
                this.replaceOutContent = this.sendInfo.replace(/\n/g,"<br>")
                this.replaceOutContent = this.replaceOutContent.replace(/\t/g,"&emsp;")
                var reg = /((http|https):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/g;
                this.replaceOutContent = this.replaceOutContent.replace(reg, "<a href='$1' target='_blank' style='color: #028AFE;width: 360px;display: inline;'>$1</a>");
            }
		},
		delInMsg(){
			let params = {
				messageId:this.inList[this._index].id,
			}
			this.ServerAPI.postAPI(this.API.inBoxDel,params,(success, data) => {
                this.showSelectInbox = false;
				if(success){
					if(data.code=='0000'){
						Toast(data.info);
						this.inBox();
						this.$forceUpdate();
					}else{
                        Toast(data.info);
                    }
				}
			});
		},
        delInboxMul(){
            this.formData = new FormData()
            this.inboxIds.forEach(item => {
                this.formData.append('ids',item)
            })
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            this.showLoading = true
			axios.post(this.API.delMsgInbox,this.formData,config).then(res => {
                this.showLoading = false
                if (res.status == '200') {
                    if(res.data.code === '0000'){
                        this.editShowInbox = false;
                        this.moreMenu = false;
                        this.showCancel = false;
                        this.inboxIds = []
                        this.delInboxNum = 0
                        this.formData = new FormData()
                        this.inBox();
						this.$forceUpdate();
                    }else{
                        Toast(res.data.info)
                    }
                } else {
                    Toast('网络错误，请稍后重试')
                }
            })
        },
		delOutMsg(){
			let params = {
				messageId:this.sendList[this._index].id,
			}
			this.ServerAPI.postAPI(this.API.outBoxDel,params,(success, data) => {
				if(success){
					if(data.code=='0000'){
						Toast(data.info);
						this.showSelectOutbox = false;
						this.sendBox();
						this.$forceUpdate();
					}
				}
			});
		},
        delOutboxMul(){
            this.formData = new FormData()
            this.outboxIds.forEach(item => {
                this.formData.append('ids',item)
            })
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }
            this.showLoading = true
			axios.post(this.API.delMsgOutbox,this.formData,config).then(res => {
                this.showLoading = false
                if (res.status == '200') {
                    if(res.data.code === '0000'){
                        this.editShowOutbox = false;
                        this.moreMenu = false;
                        this.showCancel = false;
                        this.outboxIds = []
                        this.delOutboxNum = 0
                        this.formData = new FormData()
                        this.sendBox();
						this.$forceUpdate();
                    }else{
                        Toast(res.data.info)
                    }
                } else {
                    Toast('网络错误，请稍后重试')
                }
            })
        },
		closeSelectInbox(){
			this.showSelectInbox = false;
		},
		closeSelectOutbox(){
			this.showSelectOutbox = false;
		},
	}
}
</script>

<style lang="scss" scoped>
.mySZdetail {
	background: #eeeff2;
	min-height: 100vh;
	padding-bottom: .6rem;
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
            width: .88rem;
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
        .write-fonts {
            font-size: .3rem;
            width: .88rem;
        }
        .header-right {
            position: relative;
            .more-icon {
                margin-top: .38rem;
                width: .6rem;
            }
            .more-menu {
                position: absolute;
                z-index: 3;
                top: 1rem;
                right: -.2rem;
                width: 2rem;
                // height: 2rem;
                background: #FFFFFF;
                border-radius: .1rem;
                box-shadow: 0px 0px 6px 2px rgba(0,0,0,.14);
                .more-menu-list {
                    font-size: .3rem;
                    color: #0F0F0F;
                    height: 1rem;
                }
                .more-menu-line {
                    border: 1px solid #E6E8EE;
                    width: 68%;
                    margin: 0 auto;
                    height: 1px;
                }
            }
            .trangle {
                position: absolute;
                top: 0.93rem;
                right: .1rem;
                z-index: 4;
                width: .2rem;
                height: .2rem;
                background: #FFFFFF;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
                box-shadow: -1px -2px 6px -2px rgba(0, 0, 0, 0.2);
            }
            .menu-mask {
                position: fixed;
                width: 100vw;
                height: 100vh;
                z-index: 2;
                top: 0;
                left: 0;
            }
            .cancel-fonts {
                font-size: .26rem;
            }
        }
    }
    .tab-title-box {
        width: 100%;
        position: fixed;
        top: 1rem;
        height: 1.1rem;
        background: #eeeff2;
        padding: .15rem 0;
        z-index: 3;
        .tab-title {
            width: 94%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: .5rem;
            background: #FFFFFF;
            padding: .1rem;
            .tab-title-list {
                width: 50%;
                text-align: center;
                height: .6rem;
                line-height: .6rem;
                background: #FFFFFF;
                color: #6C6C6C;
                font-weight: bold;
                border-radius: .4rem;
                position: relative;
                .unread-point {
                    position: absolute;
                    z-index: 99;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #E90619;
                    margin: .08rem 0 0 .52rem;
                }
            }
            .title-chosing {
                background: linear-gradient(to right,#78BDF2,#167BFF);
                color: #FFFFFF;
            }
            .tab-title-list-disable {
                background: #D7D7D8;
            }
        }
    }
    .content-box {
        position: relative;
        width: 100%;
        background: #FFFFFF;
        top: 2.1rem;
        z-index: 2;
        min-height: calc(100vh - 2.2rem);
        .my-message-list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: .24rem .26rem;
            border-bottom: #f4f6f8 1px solid;
            position: relative;
            .message-mark {
                position: absolute;
                top: 0;
                left: 0;
                height: 0.22rem;
            }
            .list-message-text {
                display: flex;
                justify-content: space-around;
                .list-message-text-main {
                    p:last-child {
                        font-size: .18rem;
                        color: #A8B3C3;
                    }
                }
            }
            .list-message-img {
                width: .15rem;
                height: .25rem;
                background: url("../../../static/images/zanzhu-right.png") no-repeat;
                background-size: 100% 100%;
            }
        }
        .match-list {
            padding: .16rem .2rem;
            border-bottom: #f4f6f8 1px solid;
            color: #7C8591;
            word-break: break-all;
            .match-content {
                word-break:break-all;
            }
            .match-date {
                text-align: right;
                margin-top: .1rem;
            }
        }
        .sms-content {
            .no-sms {
                padding: .5rem 0;
                text-align: center;
                img {
                    width: 30%;
                    margin: .2rem auto;
                }
                div {
                    color: #7C8591;
                    font-size: .34rem;
                    margin-top: .1rem;
                }
            }
            .sms-content-list {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: #f4f6f8 1px solid;
                padding: .2rem;
                .in-list-left{
                    width: calc(100% - .16rem);
                    .check-img {
                        width: 0.3rem;
                    }
                    .in-list-left-fonts {
                        width: calc(100% - .6rem);
                        margin-left: .2rem;
                        div {
                            display: flex;
                            align-items: center;
                            .in-box-title {
                                display: inline-block;
                                font-size: .26rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                max-width: calc(100% - .3rem);
                                color: #A8B3C3;
                            }
                            .blue-point {
                                display: inline-block;
                                width: 5px;
                                height: 5px;
                                border-radius: 50%;
                                background: #E90619;
                                margin: -.12rem 0 0 .1rem;
                            }
                            .un-read-fonts {
                                color: #303030;
                            }
                        }
                        .msg-date {
                            font-size: .2rem;
                            color: #A8B3C3;
                            .msg-date-fonts {
                                width: 2.6rem;
                            }
                            .msg-type {
                                height: 0.38rem;
                                border-radius: .06rem;
                                color: #FFFFFF;
                                width: 0.78rem;
                                font-size: .24rem;
                                margin-left: .2rem;
                            }
                        }
                        .msg-date-unread {
                            color: #7C8591;
                        }
                    }
                }
                img{
                    width: .15rem;                
                }
            }
        }
    }
    .bottom-activing {
        padding-bottom: 1.5rem;
        top: 1.1rem;
    }
    strong {
        font-weight: bold;
    }
}
.msg-popup {
    width: 80%;
    border-radius: .2rem;
    text-align: center;
    .msg-popup-title {
        .msg-popup-title-line {
            background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
            height: 0.15rem;
        }
        .msg-popup-title-fonts {
            font-size: .34rem;
            margin-top: .2rem;
            .left-blue-line {
                width: 0.1rem;
                height: 0.38rem;
                background: #78BDF2;
                margin-right: .1rem;
            }
        }
        .msg-time {
            color: #A8B3C3;
            font-size: .2rem;
            margin-top: .1rem;
            .msg-mark {
                height: 0.24rem;
                margin-right: .1rem;
            }
        }
        .notice-content {
            background: #FFFFFF;
            min-height: 2rem;
            max-height: 4rem;
            padding: .16rem 0;
            overflow-y: scroll;
            .sle {
                font-size: .3rem;
                color: #1D9DFC;
                font-weight: bold;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 0 .3rem;
            }
            .sle2 {
                width: 100%;
                height: auto;
                font-size: .25rem;
                text-align: left;
                margin-top: .1rem;
                color: rgba(0, 0, 0, .87);
                // line-height: .48rem;
                line-height: 20px;
                padding: 0 .3rem;
                word-break:break-all;
                div {
                    word-break:break-all;
                }
            }
        }
        .img-show-box {
            // width: 100%;
            padding: 0 .3rem;
            margin-bottom: .2rem;
            overflow-x: auto;
            display: -webkit-box;
            margin-right: .3rem;
            .img-show-list-box {
                width: 1rem;
                height: 1rem;
                border-radius: .06rem;
                background: rgba(0,0,0,.2);
                margin-right: .1rem;
                position: relative;
                .img-show-list {
                    max-width: 100%;
                    max-height: 100%;
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
                        height: 100%;
                    }
                }
                .upload-menu-activing {
                    display: block;
                }
            }
        }
        .select-title {
            width: 100%;
            height: 1.2rem;
            line-height: 1.2rem;
            text-align: center;
            font-size: .38rem;
            color: #FFFFFF;
            // background: url("../../../static/images/notice-title-bg.png") no-repeat;
            background-size: 100% 100%;
            border-top-left-radius: .1rem;
            border-top-right-radius: .1rem;
        }
        .confirm-btn-area {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom-left-radius: .1rem;
			border-bottom-right-radius: .1rem;
			overflow: hidden;
			.confirm-btn {
				width: 50%;
				height: .9rem;
				line-height: .9rem;
				background: #FFFFFF;
				color: #A8B3C3;
				border-top: rgba(0,0,0,.1) 1px solid;
			}
			.confirm-btn:first-child {
				border-right: rgba(0,0,0,.1) 1px solid;
			}
            .confirm-btn2 {
                color: #303030;
            }
		}
        .confirm-btn {
            height: .9rem;
            line-height: .9rem;
            background: #FFFFFF;
            color: #1D9DFC;
            border-top: rgba(0, 0, 0, .1) 1px solid;
            border-bottom-left-radius: .1rem;
            border-bottom-right-radius: .1rem;
        }
    }
}
.notice-pop {
    .msg-popup-title {
        .notice-content {
            max-height: 6.8rem;
        }
    }
}
.submitBlue {
	width: 60%;
	margin: .6rem auto 0;
    padding-bottom: .3rem;
}
.submitBlue {
	width: 80%;
	margin: 0 auto;
	
	.btnCover {
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		color: #FFFFFF;
		text-align: center;
		background: linear-gradient(90deg, #20a4ff, #067dff);
		margin: .4rem auto;
		border: none;
		border-radius: .45rem;
		font-weight: bold;
	}
}
.check-upload-img-box {
    max-width: 80vw;
    max-height: 78vh;
    overflow: hidden;
    background: none;
    .check-upload-img {
        display: block;
        width: 100%;
        max-height: calc(78vh - 1rem);
        border-radius: .1rem;
    }
    .img-close-box {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background: #FFFFFF;
        position: relative;
        margin: .2rem auto .4rem;
        z-index: 1;
        .img-close-icon {
            position: relative;
            top: -.06rem;
            left: -.06rem;
            z-index: 2;
        }
    }
}
.notice-nav-box-bg {
    background: #eeeff2;
    padding-bottom: 4px;
    .notice-nav-box {
        background: #FFFFFF;
        border-radius: 0 0 .1rem .1rem;
        .notice-nav-list {
            height: 0.8rem;
            width: 50%;
            color: #7C8591;
            font-size: .3rem;
        }
        .notice-nav-line {
            width: 1px;
            background: #E6E8EE;
            height: 0.3rem;
        }
        .notice-nav-list-activing {
            color: #1D9DFC;
            position: relative;
        }
        .notice-nav-list-activing::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0.6rem;
            height: 0.08rem;
            background: #78BDF2;
            margin-left: -.3rem;
        }
    }
}
.check-upload-img-box2 {
    max-width: unset;
    max-height: unset;
    .check-upload-img {
        width: unset;
        max-width: 90vw;
        max-height: unset;
    }
}
.edit-box {
    box-shadow: 0px -3px 6px rgba(0,0,0,0.1);
    .edit-btn-box {
        padding: .16rem .2rem 0;
        .edit-btn-list {
            border: 1px solid #EAE8E8;
            border-radius: .08rem;
            height: 0.8rem;
            width: calc(50% - .1rem);
            color: #303030;
            font-size: .3rem;
        }
        .edit-btn-list2 {
            background: #D7D7D8;
            border: none;
        }
        .edit-btn-list3 {
            background: linear-gradient(270deg, #167BFF 0%, #78BDF2 100%);
            border: none;
            color: #FFFFFF;
        }
    }
}
.deposit-type {
    background: linear-gradient(81deg, #78BDF2 0%, #167BFF 100%);
}
.withdraw-type {
    background: linear-gradient(81deg, #FFB65D 0%, #F2A74F 100%);
}
.discount-type {
    background: linear-gradient(81deg, #DD0719 0%, #D80012 100%);
}
.jiesuan-type {
    background: linear-gradient(81deg, #7C8591 0%, #666D76 100%);
}
.account-type {
    background: linear-gradient(81deg, #467CAF 0%, #3F709F 100%);
}
.risk-type {
    background: linear-gradient(81deg, #96020E 0%, #7B030D 100%);
}
.complain-type {
    background: linear-gradient(81deg, #187DFF 0%, #167BFF 100%);
}
.suggest-type {
    background: linear-gradient(81deg, #8746AF 0%, #6A3095 100%);
}
.love-type {
    background: linear-gradient(81deg, #F869B1 0%, #F71385 100%);
}
</style>
