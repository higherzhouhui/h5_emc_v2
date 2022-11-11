<template>

    <div class="invite-friends-content">
        <div class="main-mask-transparency" v-if="showMask" @click="closeDetail"></div>
        <div class="head-content">
            <div class="head-top">
                <img src="../../../static/images/back-icon.png" alt="" class="left" @click="toBack()">
                <div class="right" @click="allRulesBox = true">规则</div>
            </div>
        </div>
        <div class="main-content">
            <div class="content-area">
                <div class="vip-flag flex gold bold">
                    <img src="../../../static/images/invite-vip-icon.png" alt="" class="invite-vip-icon">
                    我的{{inviteData.groupName}}专属优惠
                </div>
                <div class="area1-list flex-b">
                    <div class="area1-list-side light flex relative">
                        邀请礼金
                        <img src="../../../static/images/invite-more-icon.png" alt="" @click="showInfoPopup(1)" class="more-icon">
                        <!--邀请礼金问号弹框-->
                        <div class="vip-info-popup" v-if="showVipInfoPopup">
                            <div class="vip-info-popup-title small">当前等级{{inviteData.groupName}}</div>
                            <div class="vip-info-popup-content">
                                <div class="vip-info-popup-content-list flex-b small">
                                    <div class="light">邀请礼金</div>
                                    <div class="dark">{{inviteData.inviterCash}}</div>
                                </div>
                                <div class="vip-info-popup-content-list flex-b small">
                                    <div class="light">{{inviteData.groupNameNext}}可领</div>
                                    <div class="dark">{{inviteData.inviterCashNext}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="area1-list-side big-num bold">{{inviteData.inviterCash}}/人</div>
                </div>
                <div class="area1-list flex-b">
                    <div class="area1-list-side light">体育周返水</div>
                    <div class="area1-list-side big-num bold">{{inviteData.inviterSport}}%</div>
                </div>
                <div class="area1-list flex-b">
                    <div class="area1-list-side light">电竞周返水</div>
                    <div class="area1-list-side big-num bold">{{inviteData.inviterEsport}}%</div>
                </div>
                <div class="area1-list flex-b">
                    <div class="area1-list-side light">真人周返水</div>
                    <div class="area1-list-side big-num bold">{{inviteData.inviterLive}}%</div>
                </div>
                <div class="invite-info-area" v-if="inviteData.advStatus === 9">
                    <div class="invite-info-list flex-b height8">
                        <div class="invite-info-list-left flex">
                            <div class="light">邀请码</div>
                            <div class="">{{inviteData.advCode}}</div>
                        </div>
                        <img src="../../../static/images/inivte-copy-icon.png" alt="" @click="copyContent('code')" class="copy-icon">
                    </div>
                    <div class="invite-info-list invite-info-list2 flex-b height8">
                        <!-- <div class="invite-info-list-left invite-info-list-left2 flex-b">
                            <div class="link-box relative flex">
                                <div class="light">邀请链接</div>
                                <img src="../../../static/images/invite-more-icon.png" alt="" @click="showInfoPopup(4)" class="more-icon">
                                <div class="vip-info-popup invite-link-popup" v-if="showInviteLinkPopup">
                                    经您专属邀请链接/邀请码注册的用户才能计算为您的受邀人
                                </div>
                            </div>
                            <div class="link-value">{{inviteData.advUrl}}</div>
                            <img src="../../../static/images/inivte-copy-icon.png" alt="" @click="copyContent('link')" class="copy-icon">
                        </div> -->
                        <div class="invite-info-list-left invite-info-list-left3" @click="shareLink = true">分享邀请码</div>
                        <div class="invite-info-list-right flex" @click="showAppDownload()">
                            <img src="../../../static/images/invite-qr-icon.png" alt="" class="invite-qr-icon">
                        </div>
                    </div>
                </div>
                <div class="invite-info-area" v-if="inviteData.advStatus === 0">
                    <div class="active-btn big-num bold height1" @click="getInviteCode()">立即申请</div>
                </div>
                <div class="invite-info-area" v-if="inviteData.advStatus === 1">
                    <div class="gray-btn big-num light height1">邀请码生成中</div>
                </div>
                <div class="invite-info-area" v-if="inviteData.advStatus === -9">
                    <div class="red-btn big-num light height1">审核被拒</div>
                </div>
            </div>
            <div class="content-area content-area2">
                <div class="flex-b">
                    <div class="biggest bold">我的邀请</div>
                    <div class="flex">
                        <div class="content-area-title-right flex light small" @click="toRecord(1)">
                            <img src="../../../static/images/inivte-rebate-icon.png" alt="" class="title-icon">
                            邀请礼金
                        </div>
                        <div class="content-area-title-right flex light small" @click="toRecord(2)">
                            <img src="../../../static/images/inivte-cash-icon.png" alt="" class="title-icon">
                            周返水
                        </div>
                    </div>
                </div>
                <div class="my-invite-info">
                    <div class="my-invite-info-list1 flex-b">
                        <div class="my-invite-info-list1-side">
                            <div class="bold biggest">{{inviteData.inviterTotalNum}}</div>
                            <div class="light small">邀请人数</div>
                        </div>
                        <div class="my-invite-info-list1-side">
                            <div class="bold biggest">{{inviteData.inviterValidNum}}</div>
                            <div class="light small flex relative">
                                有效会员
                                <img src="../../../static/images/invite-more-icon.png" alt="" @click="showInfoPopup(2)" class="more-icon">
                                <!--有效会员问号弹框-->
                                <div class="vip-info-popup valid-popup" v-if="showValidPopup" @click="showValidPopup = false">
                                    <div class="vip-info-popup-title small">条件</div>
                                    <div class="vip-info-popup-content">
                                        <div class="vip-info-popup-content-list flex-b small">
                                            <div class="light">存款次数</div>
                                            <div class="dark">≥ 2次</div>
                                        </div>
                                        <div class="vip-info-popup-content-list flex-b small">
                                            <div class="light">存款总额</div>
                                            <div class="dark">≥ 500元</div>
                                        </div>
                                        <div class="vip-info-popup-content-list flex-b small">
                                            <div class="light">流水累计</div>
                                            <div class="dark">≥ 3000元</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="my-invite-info-list1">
                        <div class="bold biggest">{{inviteData.bonus}}</div>
                        <div class="light small flex relative">
                            本月总收益
                            <img src="../../../static/images/invite-more-icon.png" alt="" @click="showInfoPopup(3)" class="more-icon">
                            <!--本月总收益问号弹框-->
                            <div class="vip-info-popup bonus-popup" v-if="showBonusPopup" @click="showBonusPopup = false">
                                <div class="vip-info-popup-content">
                                    <div class="vip-info-popup-content-list flex-b small">
                                        <div class="light">邀请礼金</div>
                                        <div class="dark">{{inviteData.bonusInviter}}</div>
                                    </div>
                                    <div class="vip-info-popup-content-list flex-b small">
                                        <div class="light">体育返水</div>
                                        <div class="dark">{{inviteData.bonusSport}}</div>
                                    </div>
                                    <div class="vip-info-popup-content-list flex-b small">
                                        <div class="light">电竞返水</div>
                                        <div class="dark">{{inviteData.bonusEsport}}</div>
                                    </div>
                                    <div class="vip-info-popup-content-list flex-b small">
                                        <div class="light">真人返水</div>
                                        <div class="dark">{{inviteData.bonusLive}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-area content-area2" v-if="inviteData.hasInviterMe === true">
                <div class="biggest bold">谁邀请了我</div>
                <div class="light small">立即申请 与邀请人相同等级</div>
                <div class="invite-me-info-area flex-b">
                    <div class="invite-me-info-side">
                        <div class="biggest bold">{{inviteData.groupName}}</div>
                        <div class="small light">(您当前等级)</div>
                    </div>
                    <img src="../../../static/images/inivte-yellow-arrow.png" alt="" class="yellow-arrow">
                    <div class="invite-me-info-side">
                        <div class="biggest bold gold">{{inviteData.organizerGroupName}}</div>
                        <div class="small light">((邀请人: {{inviteData.organizer}}))</div>
                    </div>
                </div>
                <div class="active-btn big-num bold height1" @click="AcceptLevelUp()">立即申请</div>
            </div>
            <div class="content-area content-area2">
                <div class="biggest bold"></div>
                <div class="flex-b">
                    <div class="biggest bold flex" v-if='inviteData.groupLevel <= 7'>好友直升{{inviteData.groupName}}</div>
                    <div class="biggest bold flex" v-if='inviteData.groupLevel > 7'>好友直升VIP7</div>
                    <div class="flex light small" @click="toUpdateRecord()">
                        <div class="" style="width: 1.7rem;text-align: right">好友升级记录</div>
                        <img src="../../../static/images/choice-go.png" alt="" class="to-more-arrow">
                    </div>
                </div>
                <div class="light small">申请通过,好友将会与你相同等级(最高VIP7)</div>
                <div class="friend-name-box flex-b radius height1">
                    <div class="big light">好友账号</div>
                    <input type="text" maxlength="20" @input="inviteFriendinput()" placeholder="请输入您邀请好友的会员账号" class="friend-name-input" v-model="friendName">
                </div>
                <van-button color="#1A41FF" @click="FriendLevelUp()" block :disabled="inviteFriendCheck" class="active-btn big-num bold height1 radius">立即申请</van-button>
            </div>
        </div>
        <!--‘邀请链接’弹出框-->
        <van-popup v-model="shareLink" class="app-download-box link-popup-box">
            <img :src="inviteData.inviterImage" alt="" class="shar-link-img">
            <div class="app-download-content">  
                <div class="big link-fonts1">邀请网址</div>            
                <div class="share-url link-fonts2">{{inviteData.tgUrl}}</div>
                <div class="invite-code-box flex-b height8">
                    <div class="invite-code-left flex light">
                        <div class="light">邀请码:</div>
                        <div class="">{{inviteData.advCode}}</div>
                    </div>
                    <img src="../../../static/images/inivte-copy-icon.png" alt="" @click="copyContent('code')" class="copy-icon">
                </div>
                <div class="share-link-bottom-fonts bold">注册时输入邀请码</div>
                <div class="share-link-bottom-fonts share-link-bottom-fonts2 bold">立即获得专属优惠</div>
                <div class="bottom-reminds">＊完成注册后将无法输入推荐人/邀请码</div>
            </div>
            <img src="../../../static/images/inivte-close-icon.png" @click="shareLink = false" alt="" class="close-popup">
        </van-popup>
        <!--’邀请码帮助‘弹出框-->
        <van-popup v-model="appDownload" class="app-download-box">
            <div class="top-blue-line"></div>
            <div class="app-download-content">
                <div class="screen-box" ref="screenBox">
                    <div class="biggest bold">
                        <div class="left-line"></div>
                        邀请码教程
                    </div>
                    <div class="intro-fonts flex-c">于<span class="blue bold biggest">注册页</span>呼朋唤友活动</div>
                    <div class="intro-fonts intro-fonts2 flex-c">栏位输入邀请码</div>
                    <img src="../../../static/images/invite-help-img.png" alt="" class="invite-help-img">
                    <!-- <div id="qrcodeImg"></div> -->
                    <div class="invite-info-list invite-info-list3 flex-c height8">
                        <div class="light">輸入您的邀请码:</div>
                        <div class="">{{inviteData.advCode}}</div>
                    </div>
                    <div class="bottom-reminds">＊完成注册后将无法输入推荐人/邀请码</div>
                </div>
            </div>
            <img src="../../../static/images/inivte-close-icon.png" @click="appDownload = false" alt="" class="close-popup">
        </van-popup>
        <!--表格汇总弹出框-->
        <van-popup v-model="allRulesBox" class="rules-all-tables">
            <div class="close-popup-box">
                <img src="../../../static/images/inivte-close-icon.png" @click="allRulesBox = false" alt="" class="close-popup">
            </div>
            <div class="rules-body-title">
                <div class="rules-body-title-list height1" @click="allRulesTableActive = 0" :class="allRulesTableActive === 0?'rules-title-actived':''">
                    邀请礼金
                </div>
                <div class="rules-body-title-list height1" @click="allRulesTableActive = 1" :class="allRulesTableActive === 1?'rules-title-actived':''">
                    周返水
                </div>
                <div class="rules-body-title-list height1" @click="allRulesTableActive = 2" :class="allRulesTableActive === 2?'rules-title-actived':''">
                    好友升级
                </div>
                <div class="rules-body-title-list height1" @click="allRulesTableActive = 3" :class="allRulesTableActive === 3?'rules-title-actived':''">
                    活动规则
                </div>
            </div>
            <!--邀请礼金内容-->
            <div class="relus-content" v-if="allRulesTableActive === 0">
                <div class="relus-content-intro lighter">好友成为<span class="blue">有效会员</span>,您将获得邀请礼金</div>
                <div class="rules-table">
                    <div class="rules-list">
                        <div class="rules-list-side rules-list-title white">邀请人等级</div>
                        <div class="rules-list-side rules-list-title white">邀请礼金</div>
                    </div>
                    <div class="rules-list">
                        <div class="rules-list-side dark">VIP10</div>
                        <div class="rules-list-side dark">1888</div>
                    </div>
                    <div class="rules-list">
                        <div class="rules-list-side dark">VIP9</div>
                        <div class="rules-list-side dark">1288</div>
                    </div>
                    <div class="rules-list">
                        <div class="rules-list-side dark">VIP8</div>
                        <div class="rules-list-side dark">888</div>
                    </div>
                    <div class="rules-list">
                        <div class="rules-list-side dark">VIP7</div>
                        <div class="rules-list-side dark">588</div>
                    </div>
                    <div class="rules-list">
                        <div class="rules-list-side dark">VIP4-VIP6</div>
                        <div class="rules-list-side dark">388</div>
                    </div>
                    <div class="rules-list">
                        <div class="rules-list-side dark">VIP1-VIP3</div>
                        <div class="rules-list-side dark">288</div>
                    </div>
                </div>
                <div class="relus-content-intro rules-intro2 lighter">有效会员条件</div>
                <div class="rules-table">
                    <div class="rules-list">
                        <div class="rules-list-side rules-list-side2 rules-list-title white">存款次数</div>
                        <div class="rules-list-side rules-list-side2 rules-list-title white">累计存款</div>
                        <div class="rules-list-side rules-list-side2 rules-list-title white">流水</div>
                    </div>
                    <div class="rules-list">
                        <div class="rules-list-side rules-list-side2 dark">≥ 2次</div>
                        <div class="rules-list-side rules-list-side2 dark">≥ 500元</div>
                        <div class="rules-list-side rules-list-side2 dark">≥ 3000元</div>
                    </div>
                </div>
                <div class="relus-content-intro rules-intro2 lighter">受邀人在7天内未成为有效受邀人，系统将会自动解除邀请关系。</div>
            </div>
            <!--周返水内容-->
            <div class="relus-content" v-if="allRulesTableActive === 1">
                <div class="rules-table">
                    <div class="rules-list">
                        <div class="rules-list-side rules-list-side2 rules-list-title white">游戏类型</div>
                        <div class="rules-list-side rules-list-side2 rules-list-title white">获得比例</div>
                        <div class="rules-list-side rules-list-side2 rules-list-title white">彩金上限</div>
                    </div>
                    <div class="rules-list">
                        <div class="rules-list-side rules-list-side2 dark">体育 周返水</div>
                        <div class="rules-list-side rules-list-side2 dark">{{inviteData.inviterSport}}%</div>
                        <div class="rules-list-side rules-list-side2 dark">无上限</div>
                    </div>
                    <div class="rules-list">
                        <div class="rules-list-side rules-list-side2 dark">电竞 周返水</div>
                        <div class="rules-list-side rules-list-side2 dark">{{inviteData.inviterEsport}}%</div>
                        <div class="rules-list-side rules-list-side2 dark">无上限</div>
                    </div>
                    <div class="rules-list">
                        <div class="rules-list-side rules-list-side2 dark">真人 周返水</div>
                        <div class="rules-list-side rules-list-side2 dark">{{inviteData.inviterLive}}%</div>
                        <div class="rules-list-side rules-list-side2 dark">8888元/人</div>
                    </div>
                </div>
                <div class="relus-content-intro rules-intro2 lighter">例:好友上周体育周返水为70000元，您可以获得70000*10%为7000元彩金。单个好友的真人周返水您最高可领取8888元。</div>
            </div>
            <!--好友升级内容-->
            <div class="relus-content" v-if="allRulesTableActive === 2">
                <div class="relus-content-intro lighter">好友成为<span class="blue">有效会员</span>, 您可提出申请</div>
                <div class="rules-table">
                    <div class="rules-list">
                        <div class="rules-list-side rules-list-side2 rules-list-title white">您的等级</div>
                        <div class="rules-list-side rules-list-side2 rules-list-side3 rules-list-title white">好友等级</div>
                    </div>
                    <div class="rules-list">
                        <div class="rules-list-side rules-list-side2 dark">VIP1 - VIP10</div>
                        <div class="rules-list-side rules-list-side2 rules-list-side3 dark small">直升邀请人同级(最高VIP7)</div>
                    </div>
                </div>
                <div class="relus-content-intro lighter" style="margin-top: 25px">有效会员条件</div>
                <div class="rules-table">
                    <div class="rules-list">
                        <div class="rules-list-side rules-list-side2 rules-list-title white">存款次数</div>
                        <div class="rules-list-side rules-list-side2 rules-list-title white">累计存款</div>
                        <div class="rules-list-side rules-list-side2 rules-list-title white">流水</div>
                    </div>
                    <div class="rules-list">
                        <div class="rules-list-side rules-list-side2 dark">≥ 2次</div>
                        <div class="rules-list-side rules-list-side2 dark">≥ 500元</div>
                        <div class="rules-list-side rules-list-side2 dark">≥ 3000元</div>
                    </div>
                </div>
                <div class="relus-content-intro rules-intro2 lighter">受邀人在7天内未成为有效受邀人，系统将会自动解除邀请关系。</div>
            </div>
            <!--活动规则内容-->
            <div class="relus-content relus-content2" v-if="allRulesTableActive === 3">
                <div class="relus-content-list light">1.经您专属邀请链接注册的用户才能计算为您的受邀人；每位玩家仅注册一个游戏账号，如有发现任何凑数等不诚信行为将取消本活动邀请人资格。</div>
                <div class="relus-content-list light">2.此活动彩金仅需一倍流水提款， 不限投注游戏场馆除彩票。</div>
                <div class="relus-content-list light">3.邀请礼金和VIP传承将根据邀请人的实时等级派发彩金和特权。受邀人在7天内未成为有效受邀人，系统将会自动解除邀请关系。</div>
                <div class="relus-content-list light">4.彩金发放：邀请礼金、VIP传承，只需受邀用户达到指定标准即可申请，VIP传承受邀人最高可直升到VIP7，周返水奖励于邀请成功7天后，在页面点击领取到账。</div>
                <div class="relus-content-list light">5.返水规则：任何走盘、取消的赛事、对押等（包括串关和单双）投注，赔率低于欧洲盘1.70、香港盘0.70、马来盘0.70、印尼盘-1.20的投注将不计算在有效流水内（只计输赢）。</div>
                <div class="relus-content-list light">6.每位玩家仅能注册一个账户，每位真实有效玩家/每一手机号码/电子邮箱/户籍地址/现居地址/同一银行卡/每一IP地址/每一台电脑或上网设备，本平台绝不容许任何诈欺行为，若发现有违背或利用规则与条款进行不当获利的会员，本平台将保留终止会员使用本网站 以及没收奖金及盈利的绝对权力。发现有任何违背、欺骗、 或利用规则与条款，包括但不限于对赌、冒充、伪造身份、合谋作弊等进行非法获利的会员，本公司有权终止会员的登录、暂停会员 使用网站和没收奖金及赢利的权力，无须特别通知。</div>
                <div class="relus-content-list light">7.参与该活动会员必须接受及遵循上述规则与条款，并接受EMC易倍使用的红利优惠一般相关规则与条款。</div>
                <div class="relus-content-list light">8.EMC易倍保留对此活动做出更改、终止的权利，并享有最终解释权。</div>
            </div>
        </van-popup>
        <van-popup class="alert-popup" v-model="alertShow" :close-on-click-overlay="false">
            <div class="alert-box">
                <img src="../../../static/images/inivte-success-icon.png" v-if="statusSuccess" alt="" class="status-icon">
                <img src="../../../static/images/inivte-fail-icon.png" v-if="statusFail" alt="" class="status-icon">
                <div class="alert-fonts big" v-if="statusSuccess">{{successInfo}}</div>
                <div class="alert-fonts big" v-if="statusFail">{{failInfo}}</div>
            </div>
        </van-popup>
        <input id="hide" type="text" style="position: absolute;opacity: 0;pointer-events: none;bottom:0" readonly>
    </div>
</template>
<script>
import {Toast} from 'vant'
import QRCode from 'qrcodejs2'
import dayjs from 'dayjs';
import html2canvas from 'html2canvas';
export default {
    name:'inviteFriends',
    components:{
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
            alertShow:false,
            statusSuccess:false,
            statusFail:false,
            successInfo:'',
            failInfo:'',
            showMask:false,
            shareLink:false,
            imgUrl:'',
            shareLinkUrl:'',
        }
    },
    created(){
    },
    mounted(){
        this.getInviteInfo()
        // this.handeleData()
    },
    beforeRouteLeave (to, from, next) {
        this.$destroy(true)
        next()
    },
    methods: {
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
            this.ServerAPI.postAPI(this.API.inviteInfo, '', (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.inviteData = data.data
                    }else{
                        Toast(data.info)
                    }
                }else{
                    Toast(data.info)
                }
            })
        },
        getInviteCode() {
            this.ServerAPI.postAPI(this.API.inviteCodeAdd, '', (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.alertShow = true
                        this.statusSuccess = true
                        this.successInfo = data.info
                        this.getInviteInfo()
                    }else{
                        this.alertShow = true
                        this.statusFail = true
                        this.failInfo = data.info
                    }
                    let second = 2;
                    const timer = setInterval(() => {
                        second--;
                        if (second) {
                        } else {
                            clearInterval(timer)
                            this.alertShow = this.statusSuccess = this.statusFail = false
                            this.successInfo = this.failInfo = ''
                        }
                    }, 1000)
                }else{
                    Toast(data.info)
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
                        this.alertShow = true
                        this.statusSuccess = true
                        this.successInfo = data.info
                    }else{
                        this.alertShow = true
                        this.statusFail = true
                        this.failInfo = data.info
                    }
                    let second = 2;
                    const timer = setInterval(() => {
                        second--;
                        if (second) {
                        } else {
                            clearInterval(timer);
                            this.alertShow = this.statusSuccess = this.statusFail = false
                            this.successInfo = this.failInfo = ''
                        }
                    }, 1000);
                }else{
                    Toast(data.info)
                }
            })
        },
        AcceptLevelUp() {
            this.ServerAPI.postAPI(this.API.inviteAcceptLevelUp, '', (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.alertShow = true
                        this.statusSuccess = true
                        this.successInfo = data.info
                        this.getInviteInfo()
                    }else{
                        this.alertShow = true
                        this.statusFail = true
                        this.failInfo = data.info
                    }
                    let second = 2;
                    const timer = setInterval(() => {
                        second--;
                        if (second) {
                        } else {
                            clearInterval(timer);
                            this.alertShow = this.statusSuccess = this.statusFail = false
                            this.successInfo = this.failInfo = ''
                        }
                    }, 1000);
                }else{
                    Toast(data.info)
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
        showInfoPopup(value){
            this.showMask = true
            if(value === 1){
                this.showVipInfoPopup = true
            }else if(value === 2){
                this.showValidPopup = true
            }else if(value === 3){
                this.showBonusPopup = true
            }
        },
        closeDetail(){
            this.showMask = false
            this.showVipInfoPopup = this.showValidPopup = this.showBonusPopup = this.showInviteLinkPopup = false
        },

        copyContent(value){
            let copyContent;
            if(value === 'code'){
                copyContent = this.inviteData.advCode;
            }else if(value === 'link'){
                copyContent = this.inviteData.advUrl;
            }
            var input = document.getElementById("hide")
            input.value = copyContent
            input.select()
            document.execCommand("copy")
            Toast('复制成功')
        }

    }
}
</script>

<style lang="scss" scoped>
.invite-friends-content {
    position: relative;
    background: #F4F5F6;
    color: #333333;
    padding-bottom: .3rem;
    .main-mask-transparency {
        position: fixed;
        z-index: 10;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0);
    }
    .head-content {
        height: 7.5rem;
        background: url("../../../static/images/inivte-top-bg.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        z-index: 2;
        .head-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: .8rem;
            color: #666666;
            padding: 0 .25rem;
            font-size: .3rem;
            .left {
                height: .3rem;
            }
            .right {
                font-size: .26rem;
            }
        }
        .big-tilte {
            padding: 0 .25rem;
            color: #FFFFFF;
            margin-top: .4rem;
            .big-tilte1 {
                font-size: .6rem;
                text-shadow: 0px 2px 4px #1A41FF;
            }
            .big-tilte2 {
                font-size: .4rem;
                margin-top: .15rem;
            }
        }
        .head-bg {
            position: absolute;
            z-index: 1;
            width: 3rem;
            right: 0;
            top: 1.2rem;
        }
    }
    .main-content {
        padding: 0 .25rem;
        position: relative;
        margin-top: -3rem;
        z-index: 3;
        .content-area {
            background: #FFFFFF;
            border-radius: .25rem;
            padding: .25rem;
            position: relative;
            .vip-flag {
                position: absolute;
                top: -.25rem;
                left: 0;
                padding: .1rem .2rem;
                background: linear-gradient(to right,#FFEBD5,#FFF2E7);
                border-top-left-radius: .25rem;
                border-top-right-radius: .25rem;
                border-bottom-right-radius: .25rem;
                width: 3.5rem;
                .invite-vip-icon {
                    height: .35rem;
                }
            }
            .area1-list {
                margin-top: .15rem;
            }
            .invite-info-area {
                .invite-info-list {
                    background: #F2F3FE;
                    border-radius: .15rem;
                    padding: 0 .25rem;
                    margin-top: .2rem;
                }
                .invite-info-list2 {
                    background: #FFFFFF;
                    padding: 0;
                    .invite-info-list-left2 {
                        width: calc(100% - 1rem);
                        background: #F2F3FE;
                        padding: 0 .25rem;
                        border-radius: .15rem;
                        .link-box {
                            width: 1.6rem;
                            .light {
                                width: 1.2rem;
                            }
                            .more-icon {
                                margin-left: 0;
                            }
                        }
                        .link-value {
                            width: calc(100% - 2rem);
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                    .invite-info-list-left3 {
                        background: #1A41FF;
                        height: 100%;
                        width: calc(100% - 1rem);
                        padding: 0 .25rem;
                        border-radius: .15rem;
                        color: #FFFFFF;
                        text-align: center;
                    }
                    .invite-info-list-right {
                        background: #F2F3FE;
                        border-radius: .15rem;
                        padding: .15rem;
                        .invite-qr-icon {
                            height: .5rem;
                        }
                    }
                }
            }
            .content-area-title-right {
                margin-left: .3rem;
            }
        }
        .content-area2 {
            margin-top: .25rem;
            .my-invite-info {
                padding: .25rem;
                background: linear-gradient(to bottom,#F3F5FE,#FFFFFF);
                border-radius: .15rem;
                margin-top: .25rem;
                .my-invite-info-list1 {
                    .my-invite-info-list1-side {
                        width: 40%;
                    }
                }
                .my-invite-info-list1:last-child {
                    margin-top: .2rem;
                }
            }
            .invite-me-info-area {
                text-align: center;
                margin-top: .4rem;
                .invite-me-info-side {
                    width: 40%;
                }
                .yellow-arrow {
                    width: 20%;
                }
            }
            .friend-name-box {
                margin-top: .2rem;
                background: #F4F5F6;
                padding: 0 .2rem;
                div {
                    width: 1.3rem;
                }
                .friend-name-input {
                    background: none;
                    border: none;
                    outline: none;
                    width: calc(100% - 1.5rem);
                }
            }
        }
    }
    .app-download-box {
        width: 6rem;
        background: none;
        text-align: center;
        border-radius: .2rem;
        .top-blue-line {
            height: .15rem;
            background: linear-gradient(90deg, #78BDF2 0%, #167BFF 100%);
            box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
        }
        .shar-link-img {
            width: 100%;
        }
        .app-download-content {
            overflow: hidden;
            padding: .3rem .25rem;
            background: #FFFFFF;
            border-radius: 0 0 .2rem .2rem;
            .screen-box {
                padding-bottom: .1rem;
                #qrcodeImg {
                    width: 2.5rem;
                    height: 2.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: .2rem auto .4rem;
                }
                .biggest {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .left-line {
                        background: linear-gradient(to bottom,#78BDF2,#FFFFFF);
                        width: 0.06rem;
                        height: .4rem;
                    }
                }       
                .intro-fonts{
                    color: #A8B3C3;
                    font-size: .3rem;
                    display: flex;
                    margin-top: .3rem;
                    .blue {
                        border-bottom: #1842E9 2px solid;
                        line-height: .45rem;
                        margin: -.1rem .05rem 0;
                        // text-decoration: underline;
                    }
                }     
                .intro-fonts2 {
                    margin-top: .1rem;
                }
                .invite-help-img {
                    display: block;
                    width: 230px;
                    margin: .2rem auto 0;
                }
                .invite-info-list {
                    background: #F2F3FE;
                    border-radius: .15rem;
                    padding: 0 .2rem;
                    .invite-info-list-left {
                        text-align: left;
                        width: calc(100% - .6rem);
                        .light {
                            width: 1rem;
                        }
                    }
                    
                }
                .invite-info-list3 {
                    width: 230px;
                    margin: -.2rem auto 0;
                }
                .dark-fonts {
                    margin-top: .2rem;
                    margin-bottom: .2rem;
                }
            }
            .active-btn {
                width: 230px;
                margin: .2rem auto 0;
                justify-content: center;
                img {
                    height: .35rem;
                    margin-right: .1rem;
                }
            }
            .bottom-reminds {
                color: #7C8591;
                margin-top: .2rem;
            }
        }
        .close-popup {
            height: .8rem;
            margin-top: .2rem;
        }
    }
    .link-popup-box {
        width: 5.8rem;
        .app-download-content {
            .link-fonts1 {
                margin-top: -.2rem;
            }
            .link-fonts2 {
                color: #7C8591;
            }
            .invite-code-box {
                background: #F2F3FE;
                border-radius: .15rem;
                padding: 0 .2rem;
                margin-top: .2rem;
            }
            .share-link-bottom-fonts {
                margin-top: .2rem;
                font-size: .35rem;
                color: #7C8591;
            }
            .share-link-bottom-fonts2 {
                margin-top: 0rem;
            }
        }
        
    }
    .rules-all-tables {
        width: 88%;
        text-align: center;
        background: none;
        .close-popup-box {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0 0 .2rem 0;
            .close-popup {
                height: .8rem;
            }
        }
        .rules-body-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top-left-radius: .2rem;
            border-top-right-radius: .2rem;
            overflow: hidden;
            background: #1A41FF;
            color: #FFFFFF;
            .rules-body-title-list {
                border-top-left-radius: .2rem;
                border-top-right-radius: .2rem;
                overflow: hidden;
                width: 25%;
                text-align: center;
            }
            .rules-title-actived:after {
                position: absolute;
                content: '';
                width: 40%;
                height: .08rem;
                border-radius: 4px;
                background: #1A41FF;
                bottom: 4px;
                left: 50%;
                margin-left: -20%;
            }
            .rules-title-actived {
                position: relative;
                background: linear-gradient(to bottom, #CFD7FC, #FFFFFF);
                color: #1A41FF;
                border-top-left-radius: .2rem;
                border-top-right-radius: .2rem;
                font-weight: bold;
            }
        }
        .relus-content {
            background: #FFFFFF;
            padding: .3rem .25rem .25rem;
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
            height: calc(100vh - 4.5rem);
            overflow-y: auto;
            .relus-content-intro {
                text-align: left;
            }
            .rules-table {
                border-radius: .2rem;
                overflow: hidden;
                margin-top: .2rem;
                .rules-list {
                    display: flex;
                    align-items: center;
                    border-bottom: #FFFFFF 1px solid;
                    background: #EEEEEE;
                    .rules-list-side {
                        width: 50%;
                        text-align: center;
                        height: .8rem;
                        line-height: .8rem;
                    }
                    .rules-list-side2 {
                        border-right: #FFFFFF 1px solid;
                    }
                    .rules-list-side3 {
                        width: 65%;
                    }
                }
                .rules-list-side:first-child {
                    border-right: #FFFFFF 1px solid;
                }
                .rules-list-title {
                    background: #9598A9;
                    color: #FFFFFF;
                }
            }
            .rules-intro2 {
                margin-top: .2rem;
            }
        }
        .relus-content2 {
            text-align: left;
            .relus-content-list {
                margin-top: 5px;
            }
        }
    }

}
.yellow {
    color: #FFD037;
}
.bold {
    font-weight: bold;
}
.light {
    color: #666666;
}
.big {
    font-size: .3rem;
}
.biggest {
    font-size: .4rem;
}
.small {
    font-size: .24rem;
}
.big-num {
    font-size: .35rem;
}
.gold {
    color: #C38456;
}
.blue {
    color: #1A41FF;
}
.radius {
    border-radius: .15rem;
}
.height8{
    height: .8rem;
    line-height: .8rem;
}
.height1{
    height: 1rem;
    line-height: 1rem;
}
.copy-icon {
    width: .45rem;
}
.title-icon {
    height: .35rem;
    margin-right: .1rem;
}
.more-icon {
    height: .3rem;
    margin-left: .1rem;
}
.active-btn {
    background: #1A41FF;
    color: #FFFFFF;
    text-align: center;
    margin-top: .25rem;
    border-radius: .15rem;
}
.red-btn {
    background: #E04F4F;
    color: #FFFFFF;
    text-align: center;
    margin-top: .25rem;
    border-radius: .15rem;
}
.gray-btn {
    background: #DDDDDD;
    text-align: center;
    margin-top: .25rem;
    border-radius: .15rem;
    font-weight: bold;
}
.to-more-arrow {
    height: .26rem;
    margin-left: .1rem;
}
.relative {
    position: relative;
}
.vip-info-popup {
    position: absolute;
    top: 0;
    right: -3.3rem;
    z-index: 3;
    width: 3rem;
    border-radius: .15rem;
    overflow: hidden;
    box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.1);
    .vip-info-popup-title {
        height: .6rem;
        line-height: .6rem;
        background: linear-gradient(to right,#FBEDDC,#FFFFFF);
        color: #C38456;
        text-align: left;
        padding-left: .2rem;
    }
    .vip-info-popup-content {
        background: #FFFFFF;
        padding: .2rem;
        .vip-info-popup-content-list div:last-child {
            margin-top: .1rem;
        }
    }
}
.invite-link-popup {
    width: 4.5rem;
    padding: .2rem;
    background: #FFFFFF;
    line-height: .4rem;
    top: .6rem;
}
.valid-popup {
    right: 1.5rem;
    .vip-info-popup-title {
        background: linear-gradient(to right,#E6E9FE,#FFFFFF);
        color: #1A41FF;
    }
}
.bonus-popup {
    width: 3.5rem;
    right: unset;
    left: 2rem;
}
.alert-popup {
    border-radius: .25rem;
    background: #FFFFFF;
    overflow: hidden;
    padding: .2rem .4rem;
    .alert-box {
        display: flex;
        justify-content: center;
        align-items: center;
        .status-icon {
            height: .8rem;
            margin-right: .2rem;
        }
    }
}
</style>

