<template>
    <div class="invite-friends-records-content">
        <div class="head-top">
            <img src="../../../static/images/back-icon-white.png" alt="" class="left" @click="toBack()">
            <div class="head-title bold">好友升级记录</div>
            <div class="right"></div>
        </div>
        <div class="body2-tab-box light">
            <div class="body2-tab-list" @click="inviteCashDate(0)" :class="dataActive === 0?'body2-list-active':''">今日</div>
            <div class="body2-tab-list" @click="inviteCashDate(1)" :class="dataActive === 1?'body2-list-active':''">本周</div>
            <div class="body2-tab-list" @click="inviteCashDate(2)" :class="dataActive === 2?'body2-list-active':''">本月</div>
            <div class="body2-tab-list" @click="inviteCashDate(3)" :class="dataActive === 3?'body2-list-active':''">全部</div>
        </div>
        <!--邀请礼金记录 表格展示-->
        <div class="body2-table" v-if="tableActive === 0">
            <!--'无数据'状态展示-->
            <div class="no-data-box" v-if="updateList.length === 0">
                <img src="../../../static/images/inivte-no-data-img.png" alt="" class="no-data">
                <div class="light">暂无数据</div>
            </div>
            <div class="table-list-box" v-if="updateList.length > 0">
                <div class="table-date light">资料时间: {{beginTime}} 23:59 至 {{endTime}} 00:00</div>
                <div class="body2-table-title flex">
                    <div class="body2-table-list height8 body2-table-list11">申请时间</div>
                    <div class="body2-table-list height8 body2-table-list11">旧等级</div>
                    <div class="body2-table-list height8 body2-table-list12">账号</div>
                    <div class="body2-table-list height8 body2-table-list12">新等级</div>
                    <div class="body2-table-list height8 body2-table-list13">状态</div>
                </div>
                <div class="body2-table-content flex small" v-for="(item,index) in updateList" :key="index">
                    <div class="body2-table-list height8 body2-table-list11 light">{{new Date(item.postTime).toLocaleDateString().slice(5)}} {{new Date(item.postTime).toTimeString().slice(0,5)}}</div>
                    <div class="body2-table-list height8 body2-table-list11 light">{{item.oldVip}}</div>
                    <div class="body2-table-list height8 body2-table-list12 light">{{item.loginName}}</div>
                    <div class="body2-table-list height8 body2-table-list12 light">{{item.upVip}}</div>
                    <div class="body2-table-list height8 body2-table-list13 yellow" v-if="item.status === 0">待审核</div>
                    <div class="body2-table-list height8 body2-table-list13 light" v-if="item.status === 9">完成</div>
                    <div class="body2-table-list height8 body2-table-list13 green" v-if="item.status === 1">已审核</div>
                    <div class="body2-table-list height8 body2-table-list13 red" v-if="item.status === -1">已拒绝</div>
                </div>
                <div class="click-load-more blue" v-if="canLoadMore" @click="clickMore()">加载更多</div>
                <div class="click-load-more light" v-if="!canLoadMore && updateList.length > 8">已加载全部</div>
<!--                <van-pagination v-if="updateList.length > 0" v-model="pageNumber" :total-items="totalPage" :show-page-size="3" force-ellipses/>-->
            </div>
        </div>
    </div>
</template>
<script>
import {Toast} from 'vant'
import dayjs from 'dayjs'
import { Pagination } from 'vant'
export default {
    name:'inviteFriendsUpdateRecord',
    components:{

    },
    data(){
        return{
            updateList:[],
            tableActive:0,
            dataActive:0,
            pageNumber:1,
            beginTime:'',
            endTime:'',
            cashListLength:0,
            weeklyRebateLength:0,
            rebateInfoShow:-1,
            totalPage:0,
            canLoadMore:true,

        }
    },
    created(){
        this.handeleData(0)
    },
    mounted(){
        this.getInviteBonusList()

    },
    beforeRouteLeave (to, from, next) {
        sessionStorage.removeItem('inviteFriendsRecord')
        this.$destroy(true)
        next()
    },
    methods: {
        toBack(){
            this.$router.back()
        },
        getInviteBonusList() {
            let params = {
                beginTime: this.beginTime,
                endTime: this.endTime,
                pageNumber: this.pageNumber,
            }
            this.ServerAPI.postAPI(this.API.inviteFriendUpdateList, params, (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.updateList = this.updateList.concat(data.data.list)
                        this.totalPage = data.data.totalPage
                        if(this.pageNumber === this.totalPage){
                            this.canLoadMore = false
                        }else{
                            this.canLoadMore = true
                        }
                    }else{
                        Toast(data.info)
                    }
                }
            })
        },
        handeleData(value){
            if(value === 0){
                this.beginTime = dayjs().format('YYYY-MM-DD')
                this.endTime = dayjs().add(1,'day').format('YYYY-MM-DD')
            }else if(value === 1){
                this.beginTime = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
                this.endTime = dayjs().add(1,'day').format('YYYY-MM-DD')
            }else if(value === 2){
                this.beginTime = dayjs().startOf('month').format('YYYY-MM-DD')
                this.endTime = dayjs().add(1,'day').format('YYYY-MM-DD')
            }else if(value === 3){
                this.beginTime = dayjs().subtract(2, 'month').format('YYYY-MM-DD')
                this.endTime = dayjs().add(1,'day').format('YYYY-MM-DD')
            }
        },
        inviteCashDate(index){
            if(this.dataActive !== index){
                this.dataActive = index
                this.updateList = []
                this.pageNumber = 1
                this.handeleData(index)
                this.getInviteBonusList()
            }
        },
        clickMore(){
            this.pageNumber ++
            this.getInviteBonusList()
        },

    }
}
</script>

<style lang="scss" scoped>
.invite-friends-records-content {
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
                    background: #F2F3FE;
                    color: #333333;
                    border-right: #EEEEEE 1px solid;
                    font-size: .24rem;
                }

            }

            .body2-table-title .body2-table-list {
                background: #F2F3FE;
                color: #333333;
                border-right: #EEEEEE 1px solid;
            }
            .body2-table-content .body2-table-list {
                border-right: #EEEEEE 1px solid;
                border-bottom: #EEEEEE 1px solid;
            }
            .body2-table-content .body2-table-list4 {
                font-size: .22rem;
                height: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .click-load-more {
                margin-top: .15rem;
                margin-bottom: .25rem;
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
.green {
    color: #11C168;
}
.red {
    color: #E04F4F;
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
    width: 22%;
}
.body2-table-list2 {
    width: 28%;
}
.body2-table-list3 {
    width: 15%;
}
.body2-table-list4 {
    width: 35%;
}
.body2-table-list6 {
    width: 33.3%;
}
.body2-table-list7{
    width: 33.3%;
}
.body2-table-list8 {
    width: 33.3%;
    justify-content: center;
}
.body2-table-list9 {
    width: 33.3%;
    justify-content: flex-end;
}
.body2-table-list10 {
    justify-content: center;
    line-height: unset;
}
.body2-table-list11:first-child {
    width: 24%;
}
.body2-table-list11:nth-child(2) {
    width: 16%;
}
.body2-table-list12:nth-child(3) {
    width: 24%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.body2-table-list12:nth-child(4) {
    width: 18%;
}
.body2-table-list13:nth-child(5) {
    width: 18%;
}
.record-more-icon {
    margin: 0 12% 0 .1rem;
}
.more-info-box {
    position: absolute;
    top: -.4rem;
    right: .6rem;
    z-index: 9;
    width: 148px;
    background: #FFFFFF;
    box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: .1rem;
    .vip-info-popup-content-list {
        height: .5rem;
        line-height: .5rem;
    }
    .vip-info-popup-content-list div {
        margin-top: 0;
    }
}

</style>

