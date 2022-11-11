<template>
    <div class="invite-friends-records-content">
        <div class="main-mask-transparency" v-if="showMask" @click="closeDetail"></div>
        <div class="head-top">
            <img src="../../../static/images/back-icon-white.png" alt="" class="left" @click="toBack()">
            <div class="head-title bold">我的邀请记录</div>
            <div class="right"></div>
        </div>
        <div class="main-body-title">
            <div class="main-body-title-list" @click="switchTable(0)" :class="tableActive === 0?'body2-title-active':''">邀请礼金记录<span v-if="tableActive === 0">({{inviteTotal}})</span></div>
            <div class="main-body-title-list" @click="switchTable(1)" :class="tableActive === 1?'body2-title-active':''">周返水记录<span v-if="tableActive === 1">({{weeklyData.length}})</span></div>
        </div>
        <!--邀请礼金 头部tab-->
        <div class="body2-tab-box light" v-if="tableActive === 0">
            <div class="body2-tab-list" @click="inviteCashDate(0)" :class="dataActive === 0?'body2-list-active':''">本周</div>
            <div class="body2-tab-list" @click="inviteCashDate(1)" :class="dataActive === 1?'body2-list-active':''">上周</div>
            <div class="body2-tab-list" @click="inviteCashDate(2)" :class="dataActive === 2?'body2-list-active':''">本月</div>
            <div class="body2-tab-list" @click="inviteCashDate(3)" :class="dataActive === 3?'body2-list-active':''">全部</div>
        </div>
        <!--邀请礼金 头部tab-->
        <div class="body2-tab-box light" v-if="tableActive === 1">
            <div class="body2-tab-list" @click="weeklyRebateData(0)" :class="dataActive2 === 0?'body2-list-active':''">本周</div>
            <div class="body2-tab-list" @click="weeklyRebateData(1)" :class="dataActive2 === 1?'body2-list-active':''">上周</div>
            <div class="body2-tab-list" @click="weeklyRebateData(2)" :class="dataActive2 === 2?'body2-list-active':''">本月</div>
            <div class="body2-tab-list" @click="weeklyRebateData(3)" :class="dataActive2 === 3?'body2-list-active':''">全部</div>
        </div>
        <!--邀请礼金记录 表格展示-->
        <div class="body2-table" v-show="tableActive === 0">
            <!--'无数据'状态展示-->
            <div class="no-data-box" v-if="inviteCashData.length === 0">
                <img src="../../../static/images/inivte-no-data-img.png" alt="" class="no-data">
                <div class="light">暂无数据</div>
            </div>
            <div class="table-list-box" v-if="inviteCashData.length > 0">
                <div class="table-date light">资料时间: {{beginTime}} 23:59 至 {{endTime}} 00:00</div>
                <div class="body2-table-title flex">
                    <div class="body2-table-list height8 body2-table-list1">账号</div>
                    <div class="body2-table-list height8 body2-table-list2">优惠阶段</div>
                    <div class="body2-table-list height8 body2-table-list3">待领取</div>
                    <div class="body2-table-list height8 body2-table-list3">已领取</div>
                    <div class="body2-table-list height8 body2-table-list4">状态</div>
                </div>
                <div class="body2-table-content flex" v-for="(item,index) in inviteCashData" :key="index">
                    <div class="body2-table-list height8 body2-table-list1 light small">{{item.loginName}}</div>
                    <div class="body2-table-list height8 body2-table-list2 light small relative flex-c">{{item.bonusAvailable}}</div>
                    <div class="body2-table-list height8 body2-table-list3 light small relative flex-c">{{item.toApply}}元</div>
                    <div class="body2-table-list height8 body2-table-list3 light small relative flex-c">{{item.alreadyApply}}元</div>
                    <div class="body2-table-list body2-table-list4 light small" v-if="item.button === 1" ref="changeStatus"><div class="can-get" @click="getBonus(index)">领取</div></div>
                    <div class="body2-table-list body2-table-list4 green small" v-if="item.button === 9" @click="getBonus(index)">完成</div>
                    <div class="body2-table-list body2-table-list4 light small" v-if="item.button === -9">已过期</div>
                    <div class="body2-table-list body2-table-list4 light small" v-if="item.button === 3">待完成</div>
                </div>
                <div class="click-load-more blue small" v-if="canLoadMore1" @click="clickMore1()">加载更多</div>
                <div class="click-load-more light small" v-if="!canLoadMore1 && inviteCashData.length > 8">已加载全部</div>
<!--                <van-pagination class="table-pagination" v-if="inviteCashData.length > 0" @change="changPage" v-model="pageNumber" :page-count="totalPage" :show-page-size="3" force-ellipses/>-->
            </div>
        </div>
        <!--返水奖励记录 表格展示-->
        <div class="body2-table" v-show="tableActive === 1">
            <!--'无数据'状态展示-->
            <div class="no-data-box" v-if="weeklyData.length === 0">
                <img src="../../../static/images/inivte-no-data-img.png" alt="" class="no-data">
                <div class="light">暂无数据</div>
            </div>
            <div class="table-list-box" v-if="weeklyData.length > 0">
                <div class="table-date light">资料时间: {{beginTime}} 23:59 至 {{endTime}} 00:00</div>
                <div class="body2-table-title flex">
                    <div class="body2-table-list height8 body2-table-list6">账号</div>
                    <div class="body2-table-list height8 body2-table-list11">类型</div>
                    <div class="body2-table-list height8 body2-table-list7">周返水</div>
                    <div class="body2-table-list height8 body2-table-list8">奖励</div>
                </div>
                <div class="body2-table-content small flex" v-for="(item,index) in weeklyData" :key="index">
                    <div class="body2-table-list height8 body2-table-list6 light">{{item.loginName}}</div>
                    <div class="body2-table-list height8 body2-table-list11 light" v-if="item.gameBigType === '2'">体育</div>
                    <div class="body2-table-list height8 body2-table-list11 light" v-if="item.gameBigType === '6'">电竞</div>
                    <div class="body2-table-list height8 body2-table-list11 light" v-if="item.gameBigType === '1'">真人</div>
                    <div class="body2-table-list height8 body2-table-list7 light flex-c relative">
                        <div class="">{{item.rebatesInfo}}元</div>
<!--                        <img src="../../../static/images/invite-more-icon.png" @click="showRebateDetail(index)" alt="" class="more-icon record-more-icon">-->
                        <!--点击问号显示详情弹框内容-->
<!--                        <div class="more-info-box" v-if="rebateInfoShow === index">-->
<!--                            <div class="vip-info-popup-content">-->
<!--                                <div class="vip-info-popup-content-list flex-b" v-if="item.gameBigType === '2'">-->
<!--                                    <div class="light">体育返水</div>-->
<!--                                    <div class="dark">{{item.rebatesInfo}}</div>-->
<!--                                </div>-->
<!--                                <div class="vip-info-popup-content-list flex-b" v-if="item.gameBigType === '6'">-->
<!--                                    <div class="light">电竞返水</div>-->
<!--                                    <div class="dark">{{item.rebatesInfo}}</div>-->
<!--                                </div>-->
<!--                                <div class="vip-info-popup-content-list flex-b" v-if="item.gameBigType === '1'">-->
<!--                                    <div class="light">真人返水</div>-->
<!--                                    <div class="dark">{{item.rebatesInfo}}</div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
                    </div>
                    <div class="body2-table-list body2-table-list8 height8  yellow flex-c" v-if="item.status === 0">
                        <div class="list-8-left">{{item.rebatesCashWeek}}元</div>
                        <div class="list-8-right">审核中</div>
                    </div>
                    <div class="body2-table-list body2-table-list8 height8  red flex-c" v-if="item.status === -1">
                        <div class="list-8-left">{{item.rebatesCashWeek}}元</div>
                        <div class="list-8-right">已拒绝</div>
                    </div>
                    <div class="body2-table-list body2-table-list8 height8  light flex-c" v-if="item.status === 9">
                        <div class="list-8-left">{{item.rebatesCashWeek}}元</div>
                        <div class="list-8-right">已领取</div>
                    </div>
                    <div class="body2-table-list body2-table-list8 flex-c" v-if="item.status === 1" style="height: .8rem;">
                        <div class="list-8-left">{{item.rebatesCashWeek}}元</div>
                        <div class="list-8-right can-get can-get2 flex-c" @click="getWeeklyBonus(index)">领取</div>
                    </div>
                </div>
                <div class="click-load-more blue" v-if="canLoadMore2" @click="clickMore2()">加载更多</div>
                <div class="click-load-more light" v-if="!canLoadMore2 && weeklyData.length > 8">已加载全部</div>
            </div>
        </div>
    </div>
</template>
<script>
// import {Toast} from 'vant'
import dayjs from 'dayjs'
import { Pagination } from 'vant'
export default {
    name:'inviteFriendsRecord',
    components:{

    },
    data(){
        return{
            inviteCashData:[],
            weeklyData:[],
            tableActive:0,
            dataActive:0,
            dataActive2:0,
            pageNumber:1,
            pageNumber2:1,
            beginTime:'',
            endTime:'',
            cashListLength:0,
            weeklyRebateLength:0,
            rebateInfoShow:-1,
            friendInfoShow:-1,
            totalPage:0,
            totalPage2:0,
            canLoadMore1:true,
            canLoadMore2:true,
            showMask:false,
            inviteTotal:0,
        }
    },
    created(){
        this.getSession()
        // this.handeleData(0)
    },
    mounted(){
        // this.getInviteBonusList()

    },
    beforeRouteLeave (to, from, next) {
        sessionStorage.removeItem('inviteFriendsRecord')
        this.$destroy(true)
        next()
    },
    methods: {
        showDetailInfo(val){
            this.showMask = true
            this.friendInfoShow = val
            this.$set(this.inviteCashData[val],'showPop',true)
        },
        toBack(){
            this.$router.back()
        },
        getSession(){
            if(sessionStorage.getItem('inviteFriendsRecord')){
                if(sessionStorage.getItem('inviteFriendsRecord') === '1'){
                    this.tableActive = 0
                    this.handeleData(0)
                    this.getInviteBonusList()
                }else if(sessionStorage.getItem('inviteFriendsRecord') === '2'){
                    this.tableActive = 1
                    this.handeleData(0)
                    this.getInviteWeekRebateList()
                }
            }

        },
        switchTable(index){
            if(this.tableActive !== index){
                this.tableActive = index
                this.handeleData(0)
                if(index === 0){
                    this.dataActive = 0
                    this.inviteCashData = []
                    this.pageNumber = 1
                    this.getInviteBonusList()
                }else if(index === 1){
                    this.dataActive2 = 0
                    this.weeklyData = []
                    this.pageNumber2 = 1
                    this.getInviteWeekRebateList()
                }
            }
        },
        clickMore1(){
            this.pageNumber ++
            this.getInviteBonusList()
        },
        clickMore2(){
            this.pageNumber2 ++
            this.getInviteWeekRebateList()
        },
        changPage(value){
            this.pageNumber = value
        },
        getInviteBonusList() {
            let params = {
                beginTime: this.beginTime,
                endTime: this.endTime,
                pageNumber: this.pageNumber,
            }
            this.ServerAPI.postAPI(this.API.inviteBonusList_v2, params, (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.inviteCashData = this.inviteCashData.concat(data.data.list)
                        this.inviteCashData.forEach((i,t) => {
                            this.$set(this.inviteCashData[t],'showPop',false)
                        })
                        this.totalPage = data.data.totalPage
                        this.inviteTotal = data.data.totalButton
                        this.cashListLength = data.data.totalSize
                        if(this.pageNumber === this.totalPage){
                            this.canLoadMore1 = false
                        }else{
                            this.canLoadMore1 = true
                        }
                    }else{
                        this.$toastTop(data.info,3)
                    }
                }
            })
        },
        getInviteWeekRebateList() {
            let params = {
                beginTime: this.beginTime,
                endTime: this.endTime,
                pageNumber: this.pageNumber2,
            }
            this.ServerAPI.postAPI(this.API.inviteWeekRebateList, params, (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.weeklyData = this.weeklyData.concat(data.data.list)
                        this.totalPage2 = data.data.totalPage
                        this.weeklyRebateLength = data.data.totalSize
                        if(this.pageNumber2 === this.totalPage2){
                            this.canLoadMore2 = false
                        }else{
                            this.canLoadMore2 = true
                        }
                    }else{
                        this.$toastTop(data.info,3)
                    }
                }
            })
        },
        handeleData(value){
            if(this.tableActive === 0){
                if(value === 0){
                    // this.beginTime = dayjs().format('YYYY-MM-DD')
                    // this.endTime = dayjs().add(1,'day').format('YYYY-MM-DD')
                    this.beginTime = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
                    this.endTime = dayjs().add(1,'day').format('YYYY-MM-DD')
                }else if(value === 1){
                    // this.beginTime = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
                    // this.endTime = dayjs().add(1,'day').format('YYYY-MM-DD')
                    this.beginTime = dayjs().add(-1, 'week').startOf('week').add(1, 'day').format('YYYY-MM-DD')
                    this.endTime = dayjs().add(-1, 'week').endOf('week').add(1, 'day').format('YYYY-MM-DD')
                }else if(value === 2){
                    this.beginTime = dayjs().startOf('month').format('YYYY-MM-DD')
                    this.endTime = dayjs().add(1,'day').format('YYYY-MM-DD')
                }else if(value === 3){
                    this.beginTime = dayjs().subtract(2, 'month').format('YYYY-MM-DD')
                    this.endTime = dayjs().add(1,'day').format('YYYY-MM-DD')
                }
            }else if(this.tableActive === 1){
                if(value === 0){
                    this.beginTime = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
                    this.endTime = dayjs().add(1,'day').format('YYYY-MM-DD')
                }else if(value === 1){
                    this.beginTime = dayjs().add(-1, 'week').startOf('week').add(1, 'day').format('YYYY-MM-DD')
                    this.endTime = dayjs().add(-1, 'week').endOf('week').add(1, 'day').format('YYYY-MM-DD')
                }else if(value === 2){
                    this.beginTime = dayjs().startOf('month').format('YYYY-MM-DD')
                    this.endTime = dayjs().add(1,'day').format('YYYY-MM-DD')
                }else if(value === 3){
                    this.beginTime = dayjs().subtract(2, 'month').format('YYYY-MM-DD')
                    this.endTime = dayjs().add(1,'day').format('YYYY-MM-DD')
                }
            }
        },
        getBonus(index){
            let params = {
                id: this.inviteCashData[index].id,
                version: this.API.paramVersion
            }
            this.ServerAPI.postAPI(this.API.inviteGetBonus_v2, params, (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.$toastTop(data.info,1)
                        this.$set(this.inviteCashData[index],'button',9)
                    }else{
                        this.$toastTop(data.info,3)
                    }
                }else{
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
            })
            // console.log(this.inviteCashData[index].id)
            // this.$set(this.inviteCashData[index],'status','4')
        },
        getWeeklyBonus(index){
            let params = {
                id: this.weeklyData[index].id,
                version: this.API.paramVersion
            }
            this.ServerAPI.postAPI(this.API.weeklyBonusGet, params, (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.$toastTop(data.info,1)
                        this.$set(this.weeklyData[index],'status',0)
                    }else{
                        this.$toastTop(data.info,3)
                    }
                }else{
                    this.$toastTop('似乎已断开与互联网的连接',2)
                }
            })
            // console.log(this.inviteCashData[index].id)
            // this.$set(this.inviteCashData[index],'status','4')
        },
        inviteCashDate(index){
            if(this.dataActive !== index){
                this.inviteCashData = []
                this.pageNumber = 1
                this.dataActive = index
                this.handeleData(index)
                this.getInviteBonusList()
            }
        },
        weeklyRebateData(index){
            if(this.dataActive2 !== index){
                this.weeklyData = []
                this.pageNumber2 = 1
                this.dataActive2 = index
                this.handeleData(index)
                this.getInviteWeekRebateList()
            }
        },
        showRebateDetail(index){
            this.rebateInfoShow = index
            this.showMask = true
        },
        closeDetail(){
            this.rebateInfoShow = -1
            this.showMask = false
            this.$set(this.inviteCashData[this.friendInfoShow],'showPop',false)
        },


    }
}
</script>

<style lang="scss" scoped>
.invite-friends-records-content {
    position: relative;
    background: #FFFFFF;
    color: #333333;
    padding-bottom: .3rem;
    min-height: 100vh;
    .main-mask-transparency {
        position: fixed;
        z-index: 10;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0);
    }
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
    .main-body-title {
        background: #9A1032;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        .main-body-title-list {
            width: 50%;
            height: 40px;
            line-height: 40px;
        }
        .body2-title-active {
            width: 45%;
            background: #FFFFFF;
            color: #9A1032;
            font-weight: bold;
            position: relative;
        }
        .body2-title-active:first-child::after {
            position: absolute;
            content: '';
            top: 0;
            right: -26px;
            height: 40px;
            width: 27px;
            z-index: 1;
            background: url("../../../static/images/inivte-top-after.png") no-repeat;
            background-size: 100% 100%;
        }
        .body2-title-active:last-child::after {
            position: absolute;
            content: '';
            top: 0;
            left: -26px;
            height: 40px;
            width: 27px;
            z-index: 1;
            background: url("../../../static/images/inivte-top-after2.png") no-repeat;
            background-size: 100% 100%;
        }
    }
    .body2-tab-box {
        width: calc(100% - .5rem);
        margin: .2rem auto 0;
        background: #F4F5F6;
        border-radius: .15rem;
        display: flex;
        align-items: center;
        text-align: center;
        padding: .1rem;
        .body2-tab-list {
            width: 25%;
            height: .8rem;
            line-height: .8rem;
            display: flex;
            justify-content: center;
        }
        .body2-list-active {
            background: #FFFFFF;
            border-radius: .15rem;
            color: #333333;
            font-weight: bold;
        }
    }
    .table-date {
        width: calc(100% - .5rem);
        margin: .4rem auto 0;
        text-align: left;
    }
    .body2-table {
        margin: .2rem auto 0;
        text-align: center;
        .table-list-box {
            .body2-table-title {
                display: flex;
                align-items: center;
                text-align: center;
                margin-top: .1rem;
                .body2-table-list {
                    background: #F9D8E0;
                    color: #333333;
                    border-right: #EEEEEE 1px solid;
                    font-size: .24rem;
                }

            }

            .body2-table-title .body2-table-list {
                background: #F9D8E0;
                color: #333333;
                border-right: #EEEEEE 1px solid;
            }
            .body2-table-content .body2-table-list {
                border-right: #EEEEEE 1px solid;
                border-bottom: #EEEEEE 1px solid;
            }
            .body2-table-content .body2-table-list4 {
                font-size: 12px;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .table-pagination {
                margin-top: .25rem;
            }
            .click-load-more {
                margin-top: .15rem;
            }
        }
        .no-data-box {
            text-align: center;
            font-size: .3rem;
            .no-data {
                width: 3rem;
                margin: .3rem auto 0;
            }
            div {
                margin-top: .2rem;
            }
        }
    }


}

.yellow {
    color: #FFD037;
}
.red {
    color: #E04F4F;
}
.green {
    color: #27B600;
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
    color: #9A1032;
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
    background: #9A1032;
    color: #FFFFFF;
    text-align: center;
    margin-top: .25rem;
    border-radius: .15rem;
}
.can-get {
    padding: .05rem .2rem;
    background: #9A1032;
    color: #FFFFFF;
    border-radius: .1rem;
    font-size: .2rem;
}
.can-get2 {
    width: .8rem;
    padding: .05rem .1rem;
}
.relative {
    position: relative;
}
.body2-table-list1 {
    width: 24%;
}
.body2-table-list2 {
    width: 18%;
}
.body2-table-list3 {
    width: 20%;
}
.body2-table-list4 {
    width: 18%;
}
.body2-table-list6 {
    width: 24%;
}
.body2-table-list11 {
    width: 16%;
}
.body2-table-list7{
    width: 28%;
}
.body2-table-list8 {
    width: 32%;
    .list-8-left {
        width: 60%;
        text-align: right;
        margin-right: .2rem;
    }
    .list-8-right {
        width: 40%;
        text-align: left;
        margin-right: .3rem;
    }
}
.record-more-icon {
    margin: 0 9% 0 .1rem;
}
.more-info-box {
    position: absolute;
    top: -0.3rem;
    right: .5rem;
    z-index: 9;
    width: 3.3rem;
    background: #FFFFFF;
    box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.1);
    border-radius: .1rem;
    // overflow: hidden;
    // padding: .1rem;
    .vip-info-popup-content {

        .list-detail-title {
            border-top-left-radius: .1rem;
            border-top-right-radius: .1rem;
            background: linear-gradient(to right, #E6E9FE, #FFFFFF);
            color: #9A1032; 
            text-align: left;
            padding-left: .2rem;
            height: .6rem;
        }
        .vip-info-popup-content-list-box {
            padding: .1rem .2rem;
            // height: 3rem;
            .vip-info-popup-content-list {
                height: .4rem;
                // height: .4rem;
                // line-height: .4rem;
            }
        }
    }
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

