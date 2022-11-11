<template>
    <div class="invite-friends-user">
        <div class="head-top">
            <img src="../../../static/images/back-icon-white.png" alt="" class="left" @click="toBack()">
            <div class="head-title bold">我的VIP专属优惠</div>
            <div class="right"></div>
        </div>
        <div class="hide-mask" v-if='levelMiniPop || cashMiniPop || friendsMiniPop' @click='levelMiniPop = cashMiniPop = friendsMiniPop = false'></div>
        <div class="rules-pop-box share-pop-box">
            <div class="content-title flex">
                <div class="title-left-line"></div>
                <div class="title-fonts bold">我的{{inviteData.groupName}}专属优惠</div>
            </div>
            <div class="content-bg">
                <div class="prize-line flex-b">
                    <div class="prize-list flex">
                        邀请礼金
                        <van-icon class="more-info-icon" name="question-o" @click='levelMiniPop = true'/>
                        <transition name="el-zoom-in-center">
                            <div class="fonts-pop" v-if='levelMiniPop'>
                                <div class="fonts-pop-title flex">当前等级 {{inviteData.groupName}}</div>
                                <div class="fonts-pop-list flex-b">
                                    <div class="">邀请礼金</div>
                                    <div class="">{{inviteData.inviterCash}}</div>
                                </div>
                                <div class="fonts-pop-list flex-b">         
                                    <div class="">{{inviteData.groupNameNext}}可领</div>
                                    <div class="">{{inviteData.inviterCashNext}}</div>
                                </div>
                            </div>
                        </transition>
                    </div>
                    <div class="prize-list3 bold">{{inviteData.totalBonus}}/人</div>
                </div>
                <div class="prize-line flex-b">
                    <div class="prize-list">体育周返水</div>
                    <div class="prize-list3 bold">{{inviteData.inviterSport}}%</div>
                </div>
                <div class="prize-line flex-b">
                    <div class="prize-list">电竞周返水</div>
                    <div class="prize-list3 bold">{{inviteData.inviterEsport}}%</div>
                </div>
                <div class="prize-line flex-b">
                    <div class="prize-list">真人周返水</div>
                    <div class="prize-list3 bold">{{inviteData.inviterLive}}%</div>
                </div>
                <div class="full-line flex-b" v-if="inviteData.advStatus === 9" @click="copyContent()">
                    <div class="full-line-side">邀请码：{{inviteData.advCode}}</div>
                    <img :src="API.assetsUrl + 'invite-friends/copy-icon.png?v=0.1'" alt="" class="full-line-side-icon">
                </div>
                <div class="full-line full-line2 flex-b" v-if="inviteData.advStatus === 9">
                    <div class="red-btn flex-c bold" @click="invitePop = true">分享邀请码</div>
                    <div class="more-btn flex-c" @click="helpPop = true">
                        <van-icon class="more-icon" name="question-o" />
                    </div>
                </div>
                <div class="full-line full-line2 flex-b" v-if="inviteData.advStatus === 0">
                    <div class="red-btn red-btn2 flex-c bold" @click="getInviteCode()">立即申请</div>
                </div>
                <div class="full-line full-line2 flex-b" v-if="inviteData.advStatus === 1">
                    <div class="red-btn red-btn-disable flex-c bold">邀请码生成中</div>
                </div>
                <div class="full-line full-line2 flex-b" v-if="inviteData.advStatus === -9">
                    <div class="red-btn red-btn-disable flex-c bold">审核被拒</div>
                </div>
            </div>
            <div class="content-title flex-b">
                <div class="flex">
                    <div class="title-left-line"></div>
                    <div class="title-fonts bold">我的邀请</div>
                </div>
                <div class="title-right flex">
                    <div class="flex" @click="toRecord(1)">
                        <img :src="API.assetsUrl + 'invite-friends/rebate-icon.png'" alt="" class="title-right-icon">
                        <span>礼金报表</span>
                    </div>
                    <div class="flex" @click="toRecord(2)">
                        <img :src="API.assetsUrl + 'invite-friends/cash-icon.png'" alt="" class="title-right-icon">
                        <span>返水报表</span>
                    </div>
                </div>
            </div>
            <div class="content-bg content-bg2">
                <div class="my-invite-line flex-b">
                    <div class="my-invite-box tex-left">
                        <div class="my-invite-fonts-1 bold">{{inviteData.inviterTotalNum}}</div>
                        <div class="my-invite-fonts-2">邀请人数</div>
                    </div>
                    <div class="my-invite-box tex-left">
                        <div class="my-invite-fonts-1 bold">{{inviteData.inviterValidNum}}</div>
                        <div class="my-invite-fonts-2 flex">
                            有效会员
                            <van-icon class="more-icon-gray" name="question-o" @click='friendsMiniPop = true'/>
                            <transition name="el-zoom-in-bottom">
                                <div class="fonts-pop fonts-pop2" v-if='friendsMiniPop'>
                                    <div class="fonts-pop-title fonts-pop-title2 flex">条件</div>
                                    <div class="fonts-pop-list flex">存款总额≥200元</div>
                                    <div class="fonts-pop-list flex">累计流水≥3888元</div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
                <div class="my-invite-box tex-left">
                    <div class="my-invite-fonts-1 bold">{{inviteData.bonus}}</div>
                    <div class="my-invite-fonts-2 flex">
                        本月总收益
                        <van-icon class="more-icon-gray" name="question-o" @click='cashMiniPop = true'/>
                        <transition name="el-zoom-in-center">
                            <div class="fonts-pop fonts-pop3" v-if='cashMiniPop'>
                                <div class="fonts-pop-list flex-b">
                                    <div class="fonts-pop-fonts-1">邀请礼金</div>
                                    <div class="fonts-pop-fonts-2">{{inviteData.bonusInviter}}</div>
                                </div>
                                <div class="fonts-pop-list flex-b">
                                    <div class="fonts-pop-fonts-1">体育返水</div>
                                    <div class="fonts-pop-fonts-2">{{inviteData.bonusSport}}</div>
                                </div>
                                <div class="fonts-pop-list flex-b">
                                    <div class="fonts-pop-fonts-1">电竞返水</div>
                                    <div class="fonts-pop-fonts-2">{{inviteData.bonusEsport}}</div>
                                </div>
                                <div class="fonts-pop-list flex-b">
                                    <div class="fonts-pop-fonts-1">真人返水</div>
                                    <div class="fonts-pop-fonts-2">{{inviteData.bonusLive}}</div>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="invite-me-box" v-if='inviteData.hasInviterMe === true'>
                <div class="content-title flex-b">
                    <div class="flex">
                        <div class="title-left-line"></div>
                        <div class="title-fonts bold">谁邀请了我</div>
                    </div>
                </div>
                <div class="content-bg">
                    <div class="flex-c">
                        <div class="invite-me-side text-c">
                            <div class="invite-me-fonts1 bold">{{inviteData.groupName}}</div>
                            <div class="invite-me-fonts2">(您当前等级)</div>
                        </div>
                        <img :src="API.assetsUrl + 'invite-friends/invite-me-img.png'" alt="" class="invite-me-img">
                        <div class="invite-me-side text-c">
                            <div class="invite-me-fonts3 bold">{{inviteData.organizerGroupName}}</div>
                            <div class="invite-me-fonts2 single-line">((邀请人: {{inviteData.organizer}}))</div>
                        </div>
                    </div>
                    <div class="full-line full-line2 flex-b" style="">
                        <van-button color="linear-gradient(270deg, #9A1032, #DF2351)" @click="AcceptLevelUp()" block class="red-btn red-btn2 flex-c bold">立即申请</van-button>
                    </div>
                </div>
            </div>
            <div class="content-title flex-b">
                <div class="flex">
                    <div class="title-left-line"></div>
                    <div class="title-fonts bold">好友直升{{inviteData.groupNameMax}}</div>
                </div>
                <div class="title-right flex" @click="toUpdateRecord()">
                    好友升级记录
                    <van-icon class="to-friends-icon" name="arrow"/>
                </div>
            </div>
            <div class="title-intro-fonts">申请通过，好友将会与你相同等级(最高VIP5)</div>
            <div class="content-bg">
                <div class="full-line flex-c">
                    <div class="full-line-side bold">好友账号</div>
                    <input v-model="friendName" type="text" maxlength="16" @input="inviteFriendinput()" class="friends-input" placeholder="请输入您邀请好友的会员账号">
                </div>
                <div class="full-line full-line2 flex-b">
                    <van-button color="linear-gradient(270deg, #9A1032, #DF2351)" @click="FriendLevelUp()" block :disabled="inviteFriendCheck" class="red-btn red-btn2 flex-c bold">立即申请</van-button>
                </div>
            </div>
        </div>
        <van-popup v-model="invitePop" :close-on-click-overlay="false">
            <div class="help-pop-box">
                <div class="invite-pop-content">
                    <img :src="API.assetsUrl + 'invite-friends/invite-pop-img-1.png'" alt="" class="invite-top-img">
                    <div class="invite-fonts-1 text-c bold">邀请网址</div>
                    <div class="invite-fonts-2 text-c">{{inviteData.tgUrl}}</div>
                    <div class="full-line flex-b" @click="copyContent()">
                        <div class="full-line-side">邀请码：{{inviteData.advCode}}</div>
                        <img :src="API.assetsUrl + 'invite-friends/copy-icon.png?v=0.1'" alt="" class="full-line-side-icon">
                    </div>
                    <img :src="API.assetsUrl + 'invite-friends/invite-pop-img-2.png'" alt="" class="invite-img-2">
                    <div class="help-bottom-fonts text-c">*完成注册后将无法输入推荐人/邀请码</div>
                </div>
                <van-icon class='bottom-close' @click="invitePop = false" name="close"/>
            </div>
        </van-popup>
        <van-popup v-model="helpPop" :close-on-click-overlay="false">
            <div class="help-pop-box">
                <div class="help-pop-content">
                    <div class="rules-pop-title flex-c">
                        <div class="title-left-line"></div>
                        <div class="title-fonts bold">邀请码教程</div>
                    </div>
                    <div class="help-title-fonts bold">
                        <div class="help-title-fonts-1 flex-c">
                            于<div class="help-title-fonts-2">注册页</div>呼朋唤友活动
                        </div>
                        <div class="help-title-fonts-1 flex-c">栏位输入邀请码</div>
                    </div>
                    <img :src="API.assetsUrl + 'invite-friends/help-img.png?v=0.1'" alt="" class="help-pop-img">
                    <div class="full-line flex-c bold">
                        请输入您的邀请码：{{inviteData.advCode}}
                    </div>
                    <div class="title-intro-fonts title-intro-fonts2">*完成注册后将无法输入推荐人/邀请码</div>
                </div>
                <van-icon class='bottom-close' @click="helpPop = false" name="close"/>
            </div>
        </van-popup>
        <input id="hide" type="text" style="position: absolute;opacity: 0;pointer-events: none;bottom:0" readonly>
    </div>
</template>
<script>
// import {Toast} from 'vant'
import { Pagination } from 'vant'
export default {
    name:'inviteFriendsUser',
    components:{

    },
    data(){
        return{
            inviteData:{},
            levelMiniPop:false,
            cashMiniPop:false,
            friendsMiniPop:false,
            friendName:'',
            inviteFriendCheck:true,
            invitePop:false,
            helpPop:false,
        }
    },
    created(){
    },
    mounted(){
        this.getInviteInfo()

    },
    beforeRouteLeave (to, from, next) {
        this.$destroy(true)
        next()
    },
    methods: {
        toBack(){
            this.$router.back()
        },
        getInviteInfo() {
            this.ServerAPI.postAPI(this.API.inviteInfo_v2, '', (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.inviteData = data.data                        
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
        inviteFriendinput(){
            if(this.isEmpty(this.friendName)){
                this.inviteFriendCheck = true
            }else{
                this.inviteFriendCheck = false
            }
        },
        copyContent(){
            var copyContent = this.inviteData.advCode;
            var input = document.getElementById("hide")
            input.value = copyContent
            input.select()
            document.execCommand("copy")
            this.$toastTop('复制成功',1)
        },
        toRecord(value){
            if(value === 1){
                sessionStorage.setItem('inviteFriendsRecord','1')
            }else if(value === 2){
                sessionStorage.setItem('inviteFriendsRecord','2')
            }
            this.$router.push('/inviteFriendsRecord')
        },
        toUpdateRecord(){
            this.$router.push('/inviteFriendsUpdateRecord')
        },
    }
}
</script>

<style lang="scss" scoped>
.invite-friends-user {
    position: relative;
    background: #FFFFFF;
    color: #333333;
    .head-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        color: #FFFFFF;
        padding: 0 .25rem;
        font-size: .3rem;
        background: #9A1032;
        .left {
            height: .38rem;
        }
        .right {
            width: .4rem;
        }
    }
    .share-pop-box {
        background: #FFFFFF;
        padding: .2rem .2rem .34rem;
        position: relative;
        z-index: 1;
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
}
.content-title {
    margin-top: .26rem;
    .title-left-line {
        width: 0.06rem;
        height: 0.32rem;
        background: #9A1032;
        border-radius: .06rem;
        margin-left: .1rem;
    }
    .title-fonts {
        color: #201F1F;
        font-size: .32rem;
        margin-left: .1rem;
    }
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
.hide-mask {
    position: fixed;
    z-index: 3;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.title-intro-fonts {
    color: #888888;
    margin: .04rem 0 0 .26rem;
    font-size: .24rem;
}
.title-intro-fonts2 {
    margin: .1rem 0 0 0;
}
.content-title:first-child {
    margin-top: .1rem;
}
.content-bg {
    background: linear-gradient(180deg, rgba(255,83,140,0.08), rgba(255,235,242,0.08));
    border-radius: .2rem;
    padding: .2rem;
    margin-top: .2rem;
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
.more-info-icon {
    color: #606060;
    font-size: .33rem;
    margin-left: .1rem;
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

.van-popup {
    background-color: unset;
}

</style>

