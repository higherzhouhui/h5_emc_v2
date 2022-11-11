<template>
    <div class="main-content">
        <HeaderTop :title="`余额宝列表`" :bottomLine="true"></HeaderTop>
        <div class="tab-title">
            <div class="tab-title-list" :class="titleIndex === 2?'title-chosing':''" @click="switchTitle(2)">全部</div>
            <div class="tab-title-list" :class="titleIndex === 0?'title-chosing':''" @click="switchTitle(0)">执行中</div>
            <div class="tab-title-list" :class="titleIndex === 1?'title-chosing':''" @click="switchTitle(1)">已提款</div>
        </div>
        <div class="interest-data-content">
            <div class="interest-no-data" v-if="interestData.length === 0">
                <div class="interest-no-data-fonts2">NONE</div>
                <img src="../../../static/images/interest-no-data.png" alt="" class="interest-no-data-img">
                <div class="blue-line"></div>
                <div class="interest-no-data-fonts">暂无数据</div>
            </div>
            <div class="interest-data-list" v-for="(item,index) in interestData" :key="index"
                 v-if="interestData.length > 0">
                <div class="interest-data-list-title">
                    <div class="left-name"><span class="blue-line"></span>订单号：{{ item.orderId }}</div>
                    <img src="../../../static/images/joinHY-info-copy.png" alt="" class="right-order" @click="copyOrder(index)">
                </div>
                <div class="interest-data-list-body">
                    <div class="order-status">
                        <div class="order-status-left">
                            <span>{{ (new Date(item.addTime)).toLocaleDateString().replace(/\//g, "-") + " " + (new Date(item.addTime)).toTimeString().substr(0, 8) }}</span>
                        </div>
                        <div class="order-status-right green-fonts" v-if="item.type === 0">执行中</div>
                        <div class="order-status-right red-fonts" v-if="item.type === -1">已提款</div>
                    </div>
                    <div class="money-data">
                        <div class="money-data-fonts">存入金额</div>
                        <div class="money-data-fonts">{{ item.cash }}元</div>
                    </div>
                    <div class="money-data">
                        <div class="money-data-fonts">累计利息次数</div>
                        <div class="money-data-fonts">{{ item.nums }}次</div>
                    </div>
                    <div class="money-data">
                        <div class="money-data-fonts">累计利息金额</div>
                        <div class="money-data-fonts">{{ item.incomes }}元</div>
                    </div>

                </div>
                <div class="interest-data-list-btn" v-if="item.type === 0">
                    <van-button class="sub-btn" type="info" color="linear-gradient(to right, #78BDF2, #167BFF)" size="small" @click="toWithdraw(index)">申请提款</van-button>
                </div>
            </div>
        </div>
        <div class="load-more" @click="loadMore" v-if="canLoadMore && interestData.length > 0">
            <div class="load-more-fonts">加载更多</div>
            <van-icon name="arrow-down" color="#028AFE" size=".3rem"/>
        </div>
        <div class="load-more load-more-gray" v-if="!canLoadMore && interestData.length > 0">
            <div class="load-more-fonts">已加载全部</div>
        </div>
        <van-popup v-model="withdrawalCfm" class="withdrawal-content">
            <div class="withdrawal-content-top"></div>
            <div class="withdrawal-content-title"><span class="blue-line"></span>申请提款</div>
            <div class="totle-cash">提款金額<span class="bold">{{totalWithdrawal}}</span>元</div>
            <div class="intro-content">
                您将损失每周<span class="blue-fonts big">{{lostMoney}}</span>元的利息若要继续完成提款,请点击<span class="blue-fonts">确认</span>
            </div>
            <div class="bottom-content">
                <div class="bottom-btn" @click="withdrawalCfm = false">关闭</div>
                <div class="bottom-btn bottom-btn2" @click="toCfm">确认</div>
            </div>
        </van-popup>
        <input id="copy_content" type="text" value="" style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;" readonly/>
    </div>
</template>

<script>
import HeaderTop from '../../components/top/top';
import {Dialog} from 'vant';
import {Toast} from 'vant'
export default {
    name: 'interestList',
    components: {
        HeaderTop,
    },
    data() {
        return {
            pageNumber:1,
            interestData:[],
            canLoadMore:false,
            titleIndex:2,
            type:2,
            withdrawalCfm:false,
            totalWithdrawal:0,
            lostMoney:0,
        }
    },
    mounted() {
        this.interestGet()
        this.interestList()
    },
    beforeRouteLeave(to, from, next) {
        this.$destroy(true)
        next()
    },
    methods: {
        switchTitle(value) {
            if(this.titleIndex !== value){
                this.type = this.titleIndex = value
                this.interestData = []
                this.pageNumber = 1
                this.interestList()
            }
        },
        interestGet(){
            this.ServerAPI.postAPI(this.API.interestGet, '', (success, data) => {
                if (success) {
                    if (data.code === '0000') {
                        this.fundRate = data.data.fundRate
                    } else {
                        Toast(data.info)
                    }
                } else {
                    Toast('网络超时，请重试')
                }
            })
        },
        interestList() {
            let params = {
                type: this.type,
                pageNumber: this.pageNumber,
                pageSize: 10
            };
            this.ServerAPI.postAPI(this.API.interestList, params, (success, data) => {
                if (success) {
                    if (data.code === '0000') {
                        if (data.data.list.length < 10) {
                            this.canLoadMore = false
                        }else{
                            this.canLoadMore = true
                        }
                        this.interestData = this.interestData.concat(data.data.list)
                    } else {
                        Toast(data.info)
                    }
                } else {
                    Toast('网络超时，请重试')
                }
            })
        },
        toPush() {
            this.$router.push('/interestRecharge')
        },
        toWithdraw(index) {
            this.withdrawalCfm = true
            this.fundId = this.interestData[index].id;
            this.totalWithdrawal = this.interestData[index].cash;
            this.lostMoney = (this.interestData[index].cash * this.fundRate / 100 / 365 * 7).toFixed(2)
        },
        toCfm(){
            this.withdrawalCfm = false
            this.confirmWithdraw()
        },
        confirmWithdraw() {
            let params = {
                fundId: this.fundId
            };
            this.ServerAPI.postAPI(this.API.interestWithdraw, params, (success, data) => {
                if (success) {
                    if (data.code === '0000') {
                        Dialog.alert({
                            message: '提现成功',
                        }).then(() => {
                            this.interestData = []
                            this.pageNumber = 1
                            this.interestList()
                        });
                    } else {
                        Toast(data.info)
                    }
                } else {
                    Toast('网络超时，请重试')
                }
            })
        },
        loadMore() {
            this.pageNumber++;
            this.interestList();
        },
        copyOrder(index){
            var copyData = "";
            var inputElement = document.getElementById('copy_content')
            copyData = this.interestData[index].orderId
            inputElement.value = copyData
            inputElement.select()
            document.execCommand("Copy");
            Toast({
                message: '复制成功',
                position: 'middle',
                className: 'remind',
                duration: 2000
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.main-content {
    background: #edeff2;
    height: 100%;
    .tab-title {
        width: 94%;
        margin: .2rem auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: .5rem;
        background: #FFFFFF;
        padding: .1rem;
        .tab-title-list {
            width: 32%;
            text-align: center;
            height: .6rem;
            line-height: .6rem;
            background: #FFFFFF;
            color: #6C6C6C;
            font-weight: bold;
            border-radius: .4rem;
        }
        .title-chosing {
            background: linear-gradient(to right,#78BDF2,#167BFF);
            color: #FFFFFF;
        }
        .tab-title-list-disable {
            background: #D7D7D8;
        }
    }
    .interest-data-content {
        background: #EAEDF0;
        padding-bottom: .2rem;
        .interest-no-data {
            width: 25%;
            margin: 2rem auto;
            text-align: center;
            font-weight: bold;
            .interest-no-data-img {
                width: .6rem;
                margin-top: .1rem;
            }
            .interest-no-data-fonts {
                color: #7C8591;
                font-size: .28rem;
                margin-top: .2rem;
                background: #FFFFFF;
                padding: .1rem .25rem;
                border-radius: .3rem;
            }
            .interest-no-data-fonts2 {
                color: #A8B3C3;
                font-size: .6rem;
            }
            .blue-line {
                height: .08rem;
                width: 1rem;
                background: #78BDF2;
                margin: .2rem auto 0;
            }
        }
        .interest-data-list {
            width: 92%;
            margin: .2rem auto 0;
            background: #FFFFFF;
            border-radius: .13rem;
            .interest-data-list-title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 1rem;
                font-weight: bold;
                padding: 0 .2rem;
                .left-name {
                    font-size: .3rem;
                    color: #313131;
                    display: flex;
                    align-items: center;
                    .blue-line {
                        width: .08rem;
                        height: .4rem;
                        background: #1D9DFC;
                        margin-right: .2rem;
                    }
                }
                .right-order {
                    height: .65rem;
                }
            }
            .interest-data-list-body {
                border-top: rgba(236, 236, 236, .7) 1px solid;
                padding: 0 .2rem .2rem;

                .money-data {
                    font-size: .28rem;
                    color: #303030;
                    display: flex;
                    justify-content: space-between;
                    margin-top: .2rem;
                }
                .order-status {
                    margin-top: .2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    .order-status-left {
                        font-size: .2rem;
                        color: #A8B3C3;
                        font-weight: bold;
                        span {
                            margin-right: .2rem;
                        }
                    }
                    .order-status-right {
                        font-size: .26rem;
                    }
                    .red-fonts {
                        color: #FE0001;
                    }
                    .green-fonts {
                        color: #46C600;
                    }
                }
            }
            .interest-data-list-btn {
                font-weight: bold;
                text-align: center;
                padding: .1rem 0;
                border-top: rgba(236, 236, 236, .7) 1px solid;
                .sub-btn {
                    width: 3.5rem;
                    font-size: .3rem;
                    height: .7rem;
                }
            }
        }
    }
    .load-more {
        display: flex;
        align-items: center;
        font-size: .28rem;
        justify-content: center;
        background: #EAEDF0;
        color: #028AFE;
        padding: .3rem 0 .45rem;
        .load-more-fonts {
            height: .28rem;
            line-height: .28rem;
        }
    }
    .load-more-gray {
        color: #7D7D7D;
    }
    .withdrawal-content {
        width: 6rem;
        border-radius: .15rem;
        text-align: center;
        .withdrawal-content-top {
            height: .25rem;
            background: linear-gradient(to right,#78BDF2,#167BFF);
        }
        .withdrawal-content-title {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .35rem;
            color: #303030;
            font-weight: bold;
            padding: .2rem 0;
            .blue-line {
                width: .08rem;
                height: .4rem;
                background: #1D9DFC;
                margin-right: .1rem;
            }
        }
        .totle-cash {
            color: #A8B3C3;
            font-weight: bold;
            font-size: .3rem;
            .bold {
                color: #303030;
                margin: 0 .2rem;
            }
        }
        .intro-content {
            width: 4.5rem;
            margin: .1rem auto .3rem;
            font-size: .3rem;
            .blue-fonts {
                color: #78BDF2;
                font-weight: bold;
            }
            .big {
                font-size: .4rem;
                text-decoration: underline;
                margin: 0 .1rem;
            }
        }
        .bottom-content {
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: #D5DAE2 1px solid;
            .bottom-btn {
                width: 50%;
                height: .8rem;
                line-height: .8rem;
                color: #A8B3C3;
                text-align: center;
            }
            .bottom-btn2 {
                color: #303030;
                border-left: #D5DAE2 1px solid;
            }
        }
    }
}
</style>
