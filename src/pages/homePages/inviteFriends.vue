<template>
    <div class="invite-friends-content" :class="{'has-bottom-nav':isWordCup === true}">
        <div class="top-header flex-b">
            <div class="back-icon el-icon-arrow-left" @click="backFn()"></div>
            <div class="top-right flex bold">
                <!-- <div class="top-right-list flex" @click="sharePop = true">
                    <img :src="API.assetsUrl + 'invite-friends/share-icon.png?v=0.1'" alt="" class="top-right-icon">
                    分享邀请码
                </div>
                <div class="top-right-line"></div> -->
                <div class="top-right-list top-rules flex" @click="rulesPop = true">
                    <img :src="API.assetsUrl + 'invite-friends/copy-icon.png?v=0.1'" alt="" class="top-right-icon">
                    活动规则
                </div>
            </div>
        </div>
        <img :src="API.assetsUrl + 'invite-friends/invite-banner.png?v=0.3'" alt="" class="top-banner">
        <div class="content-box text-c">
            <div class="nav-box flex-b">
                <div class="nav-list flex-c" @click="switchNav(0)" :style="navIndex === 0?'background:url(' + API.assetsUrl + '/invite-friends/nav-list-chosed.png) no-repeat;background-size: 100% 100%;color:#FFFFFF;':''">邀请礼金</div>
                <div class="nav-list nav-list2 flex-c" @click="switchNav(1)" :style="navIndex === 1?'background:url(' + API.assetsUrl + '/invite-friends/nav-list-chosed.png) no-repeat;background-size: 100% 100%;color:#FFFFFF;':''">
                    世界杯<br>限定豪礼
                </div>
                <div class="nav-list flex-c" @click="switchNav(2)" :style="navIndex === 2?'background:url(' + API.assetsUrl + '/invite-friends/nav-list-chosed.png) no-repeat;background-size: 100% 100%;color:#FFFFFF;':''">好友升级</div>
                <div class="nav-list flex-c" @click="switchNav(3)" :style="navIndex === 3?'background:url(' + API.assetsUrl + '/invite-friends/nav-list-chosed.png) no-repeat;background-size: 100% 100%;color:#FFFFFF;':''">返水奖励</div>
            </div>
            <div class="nav-bottom-box flex-c bold" @click="toInviteInfo()">
                <img :src="API.assetsUrl + 'invite-friends/share-icon-2.png'" alt="" class="nav-bottom-icon">
                分享邀请码
            </div>
        </div>
        <div class="content-box2" v-if='navIndex === 0'>
            <div class="" v-if="inviteData.groupLevel == 0">
                <div class="content-title flex">
                    <div class="title-left-line"></div>
                    <div class="title-fonts">升级VIP，开始邀请好友成为会员</div>
                </div>
                <div class="content-bg content-bg3 flex-c text-c">
                    <div class="level-0-mode-left">
                        <div class="level-0-mode-left-fonts1 bold">VIP0</div>
                        <div class="level-0-mode-left-fonts2">(您当前等级)</div>
                    </div>
                    <img :src="API.assetsUrl + 'invite-friends/invite-me-img.png'" alt="" class="level-0-mode-center">
                    <div class="level-0-mode-right bold">VIP1</div>
                </div>
            </div>
            <div class="" v-if="inviteData.groupLevel > 0">
                <div class="content-title flex-b">
                    <div class="flex">
                        <div class="title-left-line"></div>
                        <div class="title-fonts bold">满足条件,获得礼金</div>
                    </div>
                    <div class="title-right flex">
                        <div class="flex" @click="toRecord(1)">
                            <!-- <img :src="API.assetsUrl + 'invite-friends/cash-icon.png'" alt="" class="title-right-icon"> -->
                            <img :src="API.assetsUrl + 'invite-friends/rebate-icon.png'" alt="" class="title-right-icon">
                            <span>点击领取</span>
                        </div>
                        <!-- <div class="flex" @click="toRecord(2)">
                            <img :src="API.assetsUrl + 'invite-friends/rebate-icon.png'" alt="" class="title-right-icon">
                            <span>返水报表</span>
                        </div> -->
                    </div>
                </div>
                <div class="content-bg">
                    <div class="prize-line flex-b">
                        <div class="prize-list">邀请人等级</div>
                        <div class="prize-list2 red text-c bold">{{inviteData.groupName}}</div>
                    </div>
                    <div class="prize-line-box"  v-if="inviteData.groupLevel > 0">
                        <div class="prize-line flex-b">
                            <div class="prize-list">注册礼</div>
                            <div class="prize-list2 text-c bold">18</div>
                        </div>
                        <div class="prize-line flex-b">
                            <div class="prize-list">首存礼</div>
                            <div class="prize-list2 text-c bold">58</div>
                        </div>
                        <div class="prize-line flex-b">
                            <div class="prize-list">流水888礼</div>
                            <div class="prize-list2 text-c bold">88</div>
                        </div>
                        <div class="prize-line flex-b">
                            <div class="prize-list">累计流水礼</div>
                            <div class="prize-list2 text-c bold">{{inviteData.totalLiquidBonus}}</div>
                        </div>
                        <div class="prize-line flex-b">
                            <div class="prize-list">总计获得</div>
                            <div class="prize-list2 orange text-c bold">￥{{inviteData.totalBonus}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-box2" v-if='navIndex === 1'>
            <div class="content-title flex">
                <div class="title-left-line"></div>
                <div class="title-fonts bold">嘉奖明细</div>
                <div class="title-fonts-2">活动时间：11月07日~12月31日</div>
            </div>
            <div class="table-box">
                <div class="table-title-line table-line flex">
                    <div class="table-line-list w35 flex-c">好友数量</div>
                    <div class="table-line-list w35 flex-c">奖品</div>
                    <div class="table-line-list w30 flex-c">申请入口</div>
                </div>
                <div class="table-content flex">
                    <div class="table-content-side w35">
                        <div class="table-line content-list flex-c">累积3个</div>
                        <div class="table-line content-list flex-c">累积15个</div>
                        <div class="table-line content-list flex-c">累积38个</div>
                    </div>
                    <div class="table-content-side w35 bold">
                        <div class="table-line content-list flex-c">
                            <div class="text-c">
                                世界杯球衣
                            </div>
                        </div>
                        <div class="table-line content-list flex-c">
                            <div class="text-c">
                                Apple Watch 8
                            </div>
                        </div>
                        <div class="table-line content-list flex-c">
                            <div class="text-c">
                                iPhone 14 pro
                            </div>
                        </div>
                    </div>
                    <div class="table-content-side w30 flex-c" @click="getPrizePop = true">
                        <div class="sub-new flex-c">立即申请</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-box2" v-if='navIndex === 2'>
            <div class="content-title flex">
                <div class="title-left-line"></div>
                <div class="title-fonts bold">嘉奖明细</div>
                <div class="title-fonts-2">受邀人可直升为邀请人同级<br>最高直升到VIP5</div>
            </div>
            <div class="table-box">
                <div class="table-title-line table-line flex">
                    <div class="table-line-list w35 flex-c">邀请人等级</div>
                    <div class="table-line-list table-line-list2 w30 flex-c text-c">受邀人成为<br>有效会员</div>
                    <div class="table-line-list w40 flex-c">受邀人等级</div>
                </div>

                <div class="table-content flex">
                    <div class="table-content-side w35">
                        <div class="table-line content-list flex-c" style="height:1rem;">累积3个有效好友</div>

                    </div>
                    <div class="table-content-side w30 bold">
                        <!-- <div class="table-line content-list flex-c">存款≥200元</div> -->
                        <div class="table-line content-list flex-c" style="height:1rem;">流水≥3888</div>
                    </div>
                    <div class="table-content-side w40 text-c">
                        <div class="table-content-line-fonts-3">直升到邀请人同级！</div>
                        <div class="table-content-line-fonts-2">（最高VIP5）</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-box2" v-if='navIndex === 3'>
            <div class="content-title flex">
                <div class="title-left-line"></div>
                <div class="title-fonts bold">嘉奖明细</div>
                <div class="title-fonts-2">邀请人获得受邀人<br>每周总返水奖励8%-10%</div>
            </div>
            <div class="table-box">
                <div class="table-title-line table-line flex">
                    <div class="table-line-list w35 flex-c">受邀人周返水</div>
                    <div class="table-line-list table-line-list2 w24 flex-c text-c">邀请人<br>获得比例</div>
                    <div class="table-line-list w24 flex-c">彩金上限</div>
                    <div class="table-line-list w24 flex-c">申请入口</div>
                </div>
                <div class="table-content flex">
                    <div class="table-content-side w35">
                        <div class="table-line content-list flex-c text-c">体育/电竞<br>周返水</div>
                        <div class="table-line content-list flex-c">真人周返水</div>
                    </div>
                    <div class="table-content-side w24 bold">
                        <div class="table-line content-list flex-c">10%</div>
                        <div class="table-line content-list flex-c">8%</div>
                    </div>
                    <div class="table-content-side w24 bold">
                        <div class="table-line content-list flex-c">无上限</div>
                        <div class="table-line content-list flex-c">8888</div>
                    </div>
                    <div class="table-content-side w24 flex-c">
                        <div class="sub-new sub-new2 flex-c" @click="toRecord(2)">立即申请</div>
                    </div>
                </div>
            </div>
            <div class="table-bottom-intro">例：受邀人上周体育返水为70000元，邀请人可领取70000*10%为7000元彩金</div>
        </div>
        <div class="content-box2" v-if="inviteData.groupLevel > 0">
            <div class="content-title flex">
                <div class="title-left-line"></div>
                <div class="vip-level-show flex-c bold">{{inviteData.groupName}}</div>
                <div class="title-fonts bold">受邀人条件</div>
            </div>
            <div class="content-bg">
                <div class="prize-line flex-b">
                    <div class="prize-list">首存礼金条件</div>
                    <div class="prize-list2 text-c bold">存款≥200元</div>
                </div>
                <div class="prize-line flex-b">
                    <div class="prize-list">流水888礼金流水条件</div>
                    <div class="prize-list2 text-c bold">888</div>
                </div>
                <div class="prize-line flex-b">
                    <div class="prize-list">累计流水礼金流水条件</div>
                    <div class="prize-list2 text-c bold">{{inviteData.totalLiquidCondition}}</div>
                </div>
            </div>
        </div>
        <div class="content-box2">
            <div class="content-title flex">
                <div class="title-left-line"></div>
                <div class="title-fonts bold">最新领奖记录</div>
            </div>
            <div class="table-list-box" id='scrollBox'>
                <!-- <div class="scroll-center-line"></div> -->
                <div class="prize-results-scroll">
                    <div class="scroll-list-box text-c">
                        <div class="scroll-list flex-b" v-for="(item,index) in inviteData.latest" :key="index">
                            <!-- <div class="scroll-list-side">{{item.loginName}}</div> -->
                            <div class="scroll-list-side">{{item.info}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-box2">
            <div class="content-title flex">
                <div class="title-left-line"></div>
                <div class="title-fonts bold">活动说明</div>
            </div>
            <div class="content-bg">
                <div class="intro-title-line flex bold">
                    <div class="intro-title-point"></div>
                    活动时间
                </div>
                <div class="intro-content-fonts">{{beginTime}} 至 {{endTime}}</div>
                <div class="intro-title-line flex bold">
                    <div class="intro-title-point"></div>
                    活动内容
                </div>
                <div class="intro-content-fonts">邀请朋友投注EMC易倍可赢取最新版iPhone 14pro，同时享升级版邀请礼金+VIP等级传承+返水10%！豪华四重礼等你来拿！邀请朋友越多奖励越高！</div>
            </div>
        </div>
        <div class="word-cup-nav flex-b" v-if='isWordCup === true'>
            <div class="nav-list nav-list2 flex-c" @click="bottomFn('216',1)">比赛日签到</div>
            <div class="nav-line"></div>
            <div class="nav-list flex-c" @click="bottomFn('worldCup',2)">2400万</div>
            <div class="nav-line"></div>
            <div class="nav-list flex-c" @click="bottomFn('220',1)">天天送</div>
            <div class="nav-line"></div>
            <div class="nav-list flex-c" @click="bottomFn('224',1)">新兵球衣</div>
            <div class="nav-line"></div>
            <div class="nav-list nav-list-chosed flex-c">邀请豪礼</div>
        </div>
        <van-popup v-model="rulesPop" position="bottom" :close-on-click-overlay="false">
            <div class="rules-pop-box">
                <div class="rules-pop-title flex-c">
                    <div class="title-left-line"></div>
                    <div class="title-fonts bold">活动规则</div>
                    <van-icon class="rules-close" name="close" @click="rulesPop = false"/>
                </div>
                <div class="rules-content">
                    <div class="rules-content-fonts-1 flex bold">
                        有效好友标准
                        <div class="rules-content-fonts-2">流水≥3888</div>
                    </div>
                    <!-- <div class="table-box">
                        <div class="table-title-line table-title-line2 table-line flex">
                            <div class="table-line-list w50 flex-c">邀请人等级</div>
                            <div class="table-line-list w50 flex-c">受邀人等级</div>
                        </div>
                        <div class="table-content flex">
                            <div class="table-content-line flex text-c bold">
                                <div class="table-content-line-list table-content-line-fonts-1 w50 flex-c">≥200元</div>
                                <div class="table-content-line-list table-content-line-fonts-2 w50 flex-c">≥3888</div>
                            </div>
                        </div>
                    </div> -->
                    <div class="rules-list">
                        1.经您专属邀请链接或邀请码注册的用户才能计算为您的受邀人；<br>
                        2.受邀人在20 天内未成为有效受邀人，系统将会自动解除邀请关系.<br>
                        3.邀请礼金和VIP传承将根据邀请人的实时等级派发彩金和特权。<br>
                        4.VIP传承受邀人最高可直升到VIP5;周返水奖励于邀请成功7天后，在页面点击领取到账。<br>
                        5领取实物礼品请在个人中心-资料内填写好您的有效收货地址。<br>
                        6.彩金及实物礼品审核通过后，彩金领取有效期30天，逾期失效。<br>
                        7.参与该活动会员必须接受及遵循上述规则与条款，并接受EMC易倍使用的红利优惠一般相关规则与条款。<br>
                        8.EMC易倍保留对此活动做出更改、终止的权利，并享有最终解释权。
                    </div>
                </div>
            </div>
        </van-popup>
        <van-popup v-model="getPrizePop" class="prize-pop-box" :close-on-click-overlay="false">
            <div class="prize-pop-line"></div>
            <div class="prize-pop-list bold flex-c">
                <div class="prize-list-left"></div>
                请选择您的奖品
            </div>
            <div class="prize-pop-list bold flex-c" :class="{'prize-pop-list-chosed':prizeChose === 2164}" @click="chosePrizeFn(2164)">世界杯球衣</div>
            <div class="prize-pop-list bold flex-c" :class="{'prize-pop-list-chosed':prizeChose === 2166}" @click="chosePrizeFn(2166)">Apple Watch 8</div>
            <div class="prize-pop-list bold flex-c" :class="{'prize-pop-list-chosed':prizeChose === 2168}" @click="chosePrizeFn(2168)">iphone 14 pro</div>
            <div class="prize-pop-list2 flex-c">关闭</div>
        </van-popup>
        <input id="hide" type="text" style="position: absolute;opacity: 0;pointer-events: none;bottom:0" readonly>
    </div>
</template>
<script>
// import {Toast} from 'vant'
// import QRCode from 'qrcodejs2'
import dayjs from 'dayjs';
import $ from 'jquery'
// import html2canvas from 'html2canvas';
export default {
    name:'inviteFriends',
    components:{
        $,
    },
    data(){
        return{
            inviteData:{},
            friendName:'',
            inviteFriendCheck:true,
            inviteCode:'',
            inviteLink:'',
            appDownload:false,
            allRulesBox:false,
            screenName: '',
            showVipInfoPopup:false,
            showValidPopup:false,
            showBonusPopup:false,
            showInviteLinkPopup:false,
            allRulesTableActive:0,
            shareLink:false,
            imgUrl:'',
            shareLinkUrl:'',

            navIndex:0,
            rulesPop:false,
            sharePop:false,
            helpPop:false,
            invitePop:false,
            levelMiniPop:false,
            friendsMiniPop:false,
            cashMiniPop:false,
            switchTitle:1,
            isWordCup:false,
            getPrizePop:false,
            prizeChose:-1,
            timer:null,
            beginTime:'',
            endTime:'',
        }
    },
    created(){
    },
    mounted(){
        this.getInviteInfo()
        this.initPrizeSwiper()
        if(sessionStorage.getItem('discountFromHome') && sessionStorage.getItem('discountFromHome') === 'true'){
            this.isWordCup = true
        }
        // this.handeleData()
    },
    beforeRouteLeave (to, from, next) {
        let _this = this
        if (_this.timer) {
            clearInterval(_this.timer)
        }
        _this.$destroy(true)
        next()
    },
    methods: {
        toInviteInfo(){
            this.$router.push('/inviteFriendsUser')
        },
        chosePrizeFn(val){
            this.prizeChose = val
            setTimeout(()=>{
                this.getPrizePop = false
                let params = {
                    bonusTypeId:this.prizeChose
                }
                this.ServerAPI.postAPI(this.API.inviteWorldCupPrize,params, (success, data) => {
                    if(success){
                        if(data.code === '0000'){
                            
                        }else{
                            this.$toastTop(data.info,3)
                        }
                    }else{
                        this.$toastTop('似乎已断开与互联网的连接',2)
                    }
                })
                this.prizeChose = -1
            },300)
        },
        bottomFn(val,type){
            if(type === 1) {
                this.$router.push('/discountOne/' + val)
            }else if(type === 2) {
                this.$router.push('/' + val)
            }
        },
        toRecord(value){
            if(value === 1){
                sessionStorage.setItem('inviteFriendsRecord','1')
            }else if(value === 2){
                sessionStorage.setItem('inviteFriendsRecord','2')
            }
            this.$router.push('/inviteFriendsRecord')
        },
        switchTitleFontsFn(val){
            this.switchTitle = val
        },
        showInviteFn(){
            this.sharePop = false
            setTimeout(() => {
                this.invitePop = true
            }, 300);
        },
        showHelpFn(){
            this.sharePop = false
            setTimeout(() => {
                this.helpPop = true
            }, 300);
        },
        initPrizeSwiper(){
            var $uList = $(".scroll-list-box");
            let _this = this
            _this.timer = null;
            $uList.hover(function() {
                clearInterval(_this.timer)
            },
            function() {
                _this.timer = setInterval(function() {
                    scrollList($uList)
                },
                1500);
            }).trigger("mouseleave") //自动触发触摸事件
            //滚动动画
            function scrollList(obj) {
                var scrollHeight = $(".scroll-list:first").height();
                $('.scroll-list').css('font-weight','400')
                $uList.stop().animate({
                    marginTop: -scrollHeight
                },600,function() {
                    $uList.css({
                        marginTop: 0
                    }).find(".scroll-list:first").appendTo($uList);
                });
                $('.scroll-list').eq(1).animate({
                    fontSize:'.24rem'
                })
                $('.scroll-list').eq(2).animate({
                    fontSize:'.27rem'
                })
                $('.scroll-list').eq(4).animate({
                    fontSize:'.27rem'
                })
                $('.scroll-list').eq(5).animate({
                    fontSize:'.24rem'
                })
                $('.scroll-list').css('height','0.4rem')
                $('.scroll-list').eq(3).css('font-weight','bold')
                $('.scroll-list').eq(3).animate({
                    fontSize:'.3rem',
                },100)
            }
        },
        switchNav(val){
            if(this.navIndex !== val) {
                this.navIndex = val
            }
        },
        
        toBack(){
            this.$router.back()
        },
        toRecord(value){
            if(value === 1){
                sessionStorage.setItem('inviteFriendsRecord','1')
            }else if(value === 2){
                sessionStorage.setItem('inviteFriendsRecord','2')
            }
            this.$router.push('/inviteFriendsRecord')
        },
        // qrcode() {
        //     document.getElementById('qrcodeImg').innerHTML = ''
        //     new QRCode('qrcodeImg', {
        //         width: 125,
        //         height: 125,
        //         text: this.inviteData.advUrl, // 二维码地址
        //         colorDark: '#000',
        //         colorLight: '#fff'
        //     });
        // },
        getInviteInfo() {
            this.ServerAPI.postAPI(this.API.inviteInfo_v2, '', (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.inviteData = data.data
                        this.beginTime = this.inviteData.beginTime.replace(/\//g,'-')
                        this.endTime = this.inviteData.endTime.replace(/\//g,'-')
                        let dataLth = this.inviteData.latest.length
                        if(this.inviteData.latest.length < 7) {
                            for(let i=0;i<(7-dataLth);i++){
                                this.inviteData.latest.push({loginName:'-',info:'-'})
                            }
                        }
                    }else{
                        this.$toastTop(data.info,3)
                    }
                }else{
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
            })
        },
        getInviteCode() {
            this.ServerAPI.postAPI(this.API.inviteCodeAdd_v2, '', (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.$toastTop(data.info,1)
                        this.getInviteInfo()
                    }else{
                        this.$toastTop(data.info,3)
                    }
                }else{
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
            })
        },
        FriendLevelUp() {
            let param = {
                loginName : this.friendName
            }
            this.ServerAPI.postAPI(this.API.inviteFriendLevelUp, param, (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.$toastTop(data.info,1)
                        this.getInviteInfo()
                    }else{
                        this.$toastTop(data.info,3)
                    }
                }else{
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
            })
        },
        AcceptLevelUp() {
            this.ServerAPI.postAPI(this.API.inviteAcceptLevelUp, '', (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.$toastTop(data.info,1)
                        this.getInviteInfo()
                    }else{
                        this.$toastTop(data.info,3)
                    }
                }else{
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
            })
        },
        inviteFriendinput(){
            if(this.isEmpty(this.friendName)){
                this.inviteFriendCheck = true
            }else{
                this.inviteFriendCheck = false
            }
        },
        showAppDownload(){
            this.appDownload = true
            // this.$nextTick(()=>{
            //     this.qrcode()
            // })
        },
        screenshots() {
            this.handeleData()
            html2canvas(this.$refs.screenBox).then(canvas => {
                const link = document.createElement('a')
                link.href = canvas.toDataURL()
                link.setAttribute('download', this.screenName + '.png')
                link.style.display = 'none'
                document.body.appendChild(link)
                link.click()
            })
        },
        handeleData(){
            this.date = new Date(); // 修改数据date
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
            this.hoursShow = Hour + '';
            this.minsShow = Min + '';
            this.secsShow = Sec + '';
            this.dateShow = Y + M + D;
            this.showDate = this.dateShow + '   ' + this.hoursShow + ':' + this.minsShow + ':' + this.secsShow;
            this.screenName = this.dateShow + '-' + this.hoursShow + '-' + this.minsShow + '-' + this.secsShow;
        },
        toUpdateRecord(){
            this.$router.push('/inviteFriendsUpdateRecord')
        },
        copyContent(){
            var copyContent = this.inviteData.advCode;
            var input = document.getElementById("hide")
            input.value = copyContent
            input.select()
            document.execCommand("copy")
            this.$toastTop('复制成功',1)
        },
        backFn(){
            if(sessionStorage.getItem('discountFromHome') && sessionStorage.getItem('discountFromHome') === 'true'){
                this.$router.push('/')
            }else{
                this.$router.back()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.invite-friends-content {
    position: relative;
    width: 100vw;
    overflow: hidden;
    background: #F5F5F5;
    min-height: 100vh;
    padding-bottom: .4rem;
    .top-header {
        position: absolute;
        top: 0;
        width: 100%;
        height: 1rem;
        padding: 0 .2rem;
        .back-icon {
            color: #333333;
            font-size: .4rem;
            font-weight: bold;
        }
        .top-right {
            .top-right-list {
                color: #9A1032;
                .top-right-icon {
                    margin-right: .06rem;
                    height: 0.3rem;
                }
            }
            .top-right-line {
                width: 1px;
                height: 0.3rem;
                background: #9A1032;
                margin: 0 .16rem;
            }
            .top-rules {
                color: #262626;
                width: 1.8rem;
                justify-content: flex-end;
            }
        }
    }
    .top-banner {
        width: 100%;
    }
    .content-box {
        box-shadow: 0px 0px 10px 0px rgba(35,24,21,0.2);
        border-radius: .2rem;
        width: 94%;
        margin: 0 auto;
        background: #FFFFFF;
        padding: .1rem;
    }
    .content-box2 {
        box-shadow: 0px 0px 10px 0px rgba(35,24,21,0.2);
        border-radius: .2rem;
        width: 94%;
        margin: .26rem auto 0;
        background: #FFFFFF;
        padding: .2rem .24rem;
        .content-title {
            .title-fonts-2 {
                color: #636363;
                font-size: .26rem;
                margin-left: .2rem;
            }
        }
        .table-list-box {
            background: linear-gradient(180deg, rgba(255,83,140,0.08), rgba(255,235,242,0.08));
            border-radius: .2rem;
            padding: .2rem;
            margin-top: .1rem;
            height: 2.48rem;
            border: 1px solid #D2D2D2;
            position: relative;
            .prize-results-scroll {
                height: 100%;
                overflow: hidden;
                .scroll-list-box {
                    .scroll-list {
                        width: 100%;
                        .scroll-list-side {
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
            .scroll-center-line {
                position: absolute;
                width: 1px;
                height: 2rem;
                background: #D2D2D2;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
            }
        }
        .table-bottom-intro {
            color: #424242;
            font-size: .26rem;
            line-height: .37rem;
            margin-top: .16rem;
        }
    }
    .nav-box {
        .nav-list {
            width: 24%;
            height: 0.8rem;
            background: #EEEEEE;
            color: #939393;
            border-radius: .14rem;
            font-size: .28rem;
        }
        .nav-list2 {
            line-height: .32rem;
        }
    }
    .nav-bottom-box {
        width: 100%;
        border-radius: .14rem;
        font-size: .3rem;
        color: #FFFFFF;
        background: linear-gradient(270deg, rgba(154,16,50,0.8), rgba(223,35,81,0.8));
        height: 0.8rem;
        margin-top: .1rem;
        .nav-bottom-icon {
            height: 0.34rem;
            margin-right: .1rem;
        }
    }
    .van-popup {
        background-color: unset;
        .rules-pop-box {
            border-radius: .2rem .2rem 0 0;
            overflow: hidden;
            background: #FEF9FA;
            .rules-pop-title {
                height: 1rem;
                width: 100%;
                position: relative;
                .title-fonts {
                    font-size: .34rem;
                }
                .rules-close {
                    font-weight: bold;
                    color: #000000;
                    font-size: .4rem;
                    position: absolute;
                    right: .2rem;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
            .rules-content {
                width: calc(100% - .4rem);
                margin: 0 auto;
                border-top: #BFBFBF 1px solid;
                padding: .3rem 0;
                .rules-content-fonts-1 {
                    color: #000000;
                    font-size: .34rem;
                    .rules-content-fonts-2 {
                        font-size: .28rem;
                        width: calc(100% - 2.4rem);
                        color: #6B6C6C;
                        margin-left: .2rem;
                    }
                }
                .table-box {
                    margin-top: .2rem;
                }
                .rules-list {
                    // height: 6.8rem;
                    // overflow-y: auto;
                    color: #888888;
                    line-height: .37rem;
                    font-size: .28rem;
                    margin: .3rem auto .1rem;
                }
            }
        }
        .share-pop-box {
            background: #FFFFFF;
            padding: .2rem .2rem .34rem;
            position: relative;
            z-index: 1;
            .hide-mask {
                position: absolute;
                z-index: 3;
                width: 100%;
                height: 100%;
            }
            .rules-close {
                font-weight: bold;
                color: #000000;
                font-size: .4rem;
                position: absolute;
                right: .26rem;
                top: .2rem;
            }
            .content-bg2 {
                padding: .2rem 1rem;
                .my-invite-fonts-1 {
                    color: #353535;
                    font-size: .34rem;
                }
                .my-invite-fonts-2 {
                    color: #606060;
                    font-size: .3rem;
                    margin-top: -.06rem;
                    position: relative;

                }
                .more-icon-gray {
                    color: #606060;
                    font-size: .3rem;
                    margin-left: .1rem;
                }
                .my-invite-line {
                    margin-bottom: .2rem;
                }
            }
        }
        .help-pop-box {
            .help-pop-content {
                border-radius: .2rem;
                background: #FFFFFF;
                padding: .2rem .3rem .3rem;
                width: 5.6rem;
                .help-title-fonts-1 {
                    color: #757575;
                    font-size: .28rem;
                    margin-top: .2rem;
                }
                .help-title-fonts-2 {
                    color: #9A1032;
                    font-size: .38rem;
                    margin: -.06rem .04rem 0;
                    text-decoration: underline;
                }
                .help-title-fonts-1:last-child {
                    margin-top: 0;
                }
                .help-pop-img {
                    width: 3.8rem;
                    display: block;
                    margin: .2rem auto .2rem;
                }
            }
            .bottom-close {
                display: block;
                color: #FFFFFF;
                margin-top: .3rem;
                font-weight: bold;
                font-size: .8rem;
                text-align: center;
            }
            .invite-pop-content {
                width: 5.6rem;
                border-radius: .2rem;
                padding-bottom: .3rem;
                background: #FFFFFF;
                .invite-top-img {
                    width: 100%;
                }
                .invite-fonts-1 {
                    color: #201F1F;
                    font-size: .32rem;
                    margin: .16rem auto 0;
                }
                .invite-fonts-2 {
                    color: #717171;
                    font-size: .3rem;
                }
                .full-line {
                    width: 4.4rem;
                    margin: .16rem auto 0;
                }
                .invite-img-2 {
                    display: block;
                    width: 3.4rem;
                    margin: .2rem auto 0;
                }
                .help-bottom-fonts {
                    color: #999999;
                    margin: .3rem auto 0;
                    font-size: .28rem;
                }
            }
        }

    }
}
.has-bottom-nav {
    padding-bottom: 1rem;
}
.w35 {
    width: 35%;
}
.w30 {
    width: 30%;
}
.w40 {
    width: 40%;
}
.w50 {
    width: 50%;
}
.w24 {
    width: 24%;
}
.text-left {
    text-align: left;
}
.title-left-line {
    width: 0.06rem;
    height: 0.32rem;
    background: #9A1032;
    border-radius: .06rem;
    margin-left: .1rem;
}
.vip-level-show {
    color: #FFFFFF;
    font-size: .28rem;
    background: linear-gradient(270deg, rgba(154,16,50,0.8), rgba(223,35,81,0.8));
    border-radius: .4rem;
    width: 0.88rem;
    height: 0.4rem;
    margin-left: .1rem;
}
.title-fonts {
    color: #201F1F;
    font-size: .32rem;
    margin-left: .1rem;
}
.title-intro-fonts {
    color: #888888;
    margin: .04rem 0 0 .26rem;
    font-size: .24rem;
}
.title-intro-fonts2 {
    color: #888888;
    margin: .16rem 0 0 0;
    font-size: .24rem;
}
.more-info-icon {
    color: #606060;
    font-size: .33rem;
    margin-left: .1rem;
}
.content-title {
    .title-right {
        color: #888888;
        font-size: .26rem;
        .flex{
            width: 1.58rem;
            justify-content: flex-end;
        }
        // .flex:last-child{
        //     width: 1.4rem;
        //     justify-content: flex-end;
        // }
        .title-right-icon {
            height: 0.3rem;
            margin: 0 .06rem 0 0;
        }
        .to-friends-icon {
            font-size: .32rem;
            color: #888888;
        }
    }
}
.switch-title-fonts {
    color: #888888;
    font-size: .26rem;
    margin-left: .06rem;
}
.switch-title-fonts-chosed {
    color: #201F1F;
    font-size: .32rem;
    margin-left: .1rem;
}
.full-line {
    height: 0.88rem;
    padding: 0 .2rem;
    background: #E5D1D6;
    border-radius: .16rem;
    margin-top: .2rem;
    .full-line-side {
        color: #5E5E5E;
        font-size: .3rem;
    }
    .full-line-side-icon {
        height: 0.3rem;
    }
    .friends-input {
        border: none;
        outline: none;
        color: #5E5E5E;
        font-size: .3rem;
        background: none;
        margin-left: .28rem;
        width: 4rem;
    }
}
.full-line2 {
    background: none;
    margin-top: .2rem;
    padding: 0;
    .red-btn {
        background: linear-gradient(270deg, #9A1032, #DF2351);
        height: 0.88rem;
        color: #FFFFFF;
        border-radius: .16rem;
        font-size: .3rem;
        width: calc(100% - 1.1rem);
    }
    .red-btn2 {
        width: 100%;
    }
    .red-btn-disable {
        width: 100%;
        background: #EEEEEE;
        color: #888888;
    }
    .more-btn {
        background: #E5D1D6;
        height: 0.88rem;
        width: 0.88rem;
        border-radius: .16rem;
        .more-icon {
            color: #B5364A;
            font-weight: bold;
            font-size: .44rem;
        }
    }
}
.table-box {
    margin-top: .1rem;
    .table-title-line {
        border-radius: .2rem .2rem 0 0;
        background: #D1A780;
        color: #FFFFFF;
        .table-line-list2 {
            line-height: .35rem;
        }
    }
    .table-title-line2 {
        background: linear-gradient(270deg, rgba(154,16,50,0.8), rgba(223,35,81,0.8));
    }
    .table-line {
        height: 0.88rem;
    }
    .table-content {
        border-radius: 0 0 .2rem .2rem;
        border: 1px solid #D2D2D2;
        overflow: hidden;
        font-size: .26rem;
        .table-content-side {
            .content-list {
                .text-c {
                    line-height: .31rem;
                }
            }
            .content-list:nth-child(even){
                background: #F5F5F5;
            }
            .sub-new {
                width: 1.6rem;
                height: 0.6rem;
                color: #FFFFFF;
                background: linear-gradient(270deg, rgba(154,16,50,0.8), rgba(223,35,81,0.8));
                border-radius: .4rem;
            }
            .sub-new2 {
                font-size: .26rem;
                width: 1.4rem;
            }
        }
        .table-content-side:not(:last-child) {
            border-right: 1px solid #D2D2D2;
        }
        .table-content-side:first-child {
            color: #6E6E6E;
        }
        .table-content-side:nth-child(2) {
            color: #323232;
        }
        .table-content-line {
            width: 100%;
            height: .88rem;
        }
        .table-content-line-fonts-1 {
            color: #6E6E6E;
        }
        .table-content-line-fonts-2 {
            color: #323232;
        }
        .table-content-line-fonts-3 {
            color: #C70031;
        }
    }
}
.content-bg {
    background: linear-gradient(180deg, rgba(255,83,140,0.08), rgba(255,235,242,0.08));
    border-radius: .2rem;
    padding: .2rem;
    margin-top: .1rem;
    .prize-line {
        font-size: .28rem;
        .prize-list {
            color: #7C7C7C;
            width: 60%;
            font-size: .28rem;
            position: relative;
            z-index: 1;
        }
        .prize-list2 {
            color: #323232;
            margin-right: 10%;
            width: 30%;
            font-size: .3rem;
        }
        .red {
            color: #9A1032;
        }
        .orange {
            font-size: .32rem;
            color: #FFA800;
        }
    }
    .prize-line:not(:first-child) {
        margin-top: .08rem;
    }
    .intro-title-line {
        font-size: .28rem;
        .intro-title-point {
            width: .14rem;
            height: .14rem;
            background: #9A1032;
            border-radius: 50%;
            margin-right: .1rem;
        }
    }
    .intro-title-line:not(:first-child) {
        margin-top: .14rem;
    }
    .intro-content-fonts {
        color: #888888;
        font-size: .28rem;
        margin-left: .24rem;
    }
    .invite-me-img {
        width: 1.6rem;
    }
    .invite-me-side {
        width: calc(50% - 1.2rem);
        .invite-me-fonts1 {
            color: #464646;
            font-size: .3rem;
        }
        .invite-me-fonts2 {
            font-size: .24rem;
            color: #838383;
        }
        .invite-me-fonts3 {
            font-size: .3rem;
            color: #9A1032;
        }
    }
}
.content-bg3 {
    background: linear-gradient(90deg, rgba(255,148,83,0.39), rgba(255,235,242,0.39));
    padding: .4rem 0;
    .level-0-mode-center {
        width: 2.4rem;
    }
    .level-0-mode-left {
        width: calc(50% - 1.2rem);
        color: #464646;
        font-size: .34rem;
        .level-0-mode-left-fonts2 {
            color: #838383;
            font-size: .24rem;
        }
    }
    .level-0-mode-right {
        font-size: .34rem;
        color: #9A1032;
        width: calc(50% - 1.2rem);
    }
}
.prize-pop-box {
    border-radius: .2rem;
    overflow: hidden;
    background: #FFFFFF;
    width: 4.8rem;
    .prize-pop-line {
        background: #9A1032;
        height: 0.18rem;
    }
    .prize-pop-list {
        height: 0.88rem;
        color: #201F1F;
        font-size: .3rem;
        border-bottom: #D0D0D0 1px solid;
        background: #FFFFFF;
        .prize-list-left {
            background: #9A1032;
            width: 0.06rem;
            height: 0.3rem;
            border-radius: .06rem;
            margin-right: .1rem;
        }
    }
    .prize-pop-list-chosed {
        background: linear-gradient(270deg, #9A1032, #DF2351);
        color: #FFFFFF;
    }
    .prize-pop-list2 {
        height: 0.88rem;
        color: #999999;
        font-size: .28rem;
        background: #FFFFFF;
    }
}
.fonts-pop {
    position: absolute;
    z-index: 2;
    min-width: 2.8rem;
    color: #303030;
    font-size: .3rem;
    border-radius: .16rem;
    overflow: hidden;
    box-shadow: 0px 0px 10px 0px rgba(35,24,21,0.2);
    right: -.5rem;
    top: .1rem;
    background: #FFFFFF;
    .fonts-pop-title {
        width: 100%;
        background: linear-gradient(90deg, #EEDEC7, #FFF5E4);
        height: 0.6rem;
        padding: 0 .2rem;
    }
    .fonts-pop-title2 {
        background: linear-gradient(90deg, #D6B8AD, #E1C7BE);  
        color: #9A1032;
    }
    .fonts-pop-list {
        width: 100%;
        height: 0.6rem;
        padding: 0 .2rem;
        background: #FFFFFF;
    }
    .fonts-pop-list:last-child {
        margin-top: -.06rem;
    }
}
.fonts-pop2 {
    top: -1.8rem;
    right: 0;
    min-width: 3.2rem;
}
.fonts-pop3 {
    top: unset;
    bottom: -.1rem;
    right: -.2rem;
    min-width: 3.2rem;
    .fonts-pop-fonts-1 {
        color: #7A7A7A;
    }
    .fonts-pop-fonts-2 {
        color: #303030;
    }
    .fonts-pop-list:last-child {
        margin-top: 0;
    }
}
// 世界杯底部导航
.word-cup-nav {
    position: fixed;
    bottom: .1rem;
    // bottom: -80vh;
    width: 100%;
    // left: 3%;
    background: #9A1032;
    border: #FFFFFF 2px solid;
    border-radius: .46rem;
    height: 0.8rem;
    color: #FFFFFF;
    font-size: .24rem;
    padding: .06rem .06rem;
    z-index: 4;
    .nav-line {
        width: 1px;
        height: 0.3rem;
        margin: 0 .06rem;
        background: rgba(255,255,255,.6);
    }
    .nav-list {
        width: 19%;
        height: 100%;
        border-radius: .4rem;
    }
    .nav-list2 {
        width: 24%;
    }
    .nav-list3 {
        width: 22%;
    }
    .nav-list-chosed {
        background: #FFFFFF;
        color: #9A1032;
    }
}
</style>

