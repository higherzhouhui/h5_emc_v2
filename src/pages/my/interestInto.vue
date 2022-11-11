<template>
    <div class="interest-intro">
        <HeaderTop :title="`余额宝说明`" :bottomLine="true"></HeaderTop>
        <img src="../../../static/images/interest-intro-top.png" alt="" class="top-img">
        <div class="top-title">
            <div class="side-line"></div>
            <div class="top-fonts">会赚钱的钱包,聪明的就懂</div>
            <div class="side-line side-line2"></div>
        </div>
        <div class="gray-line"></div>
        <div class="intro-fonts">EMC余额宝,年利率最高35%,是活期存款的近116倍, EMC信誉保证, 不需透过繁杂申请, 轻松让您钱包自动赚钱!</div>
        <img src="../../../static/images/interest-intro-arrow.png" alt="" class="arrow-icon">
        <div class="list-content">
            <div class="list-title">
                <div class="list-title-side">VIP等级</div>
                <div class="center-line"></div>
                <div class="list-title-side">年利率</div>
            </div>
            <div class="vip-list" v-for="(item,index) in fundRateData" :key="index">
                <div class="vip-list-side">{{item.name}}</div>
                <div class="center-line"></div>
                <div class="vip-list-side">{{item.fundRate}}%</div>
            </div>
        </div>
        <div class="bottom-btn" @click="toPush">立即申请</div>
    </div>
</template>

<script>
import HeaderTop from '../../components/top/top'
import {Toast} from 'vant'

export default {
    name: 'interestInto',
    components: {
        HeaderTop,
    },
    data() {
        return {
            fundRateData:[],
        }
    },
    mounted() {
        this.interestGet()
    },
    beforeRouteLeave(to, from, next) {
        this.$destroy(true)
        next()
    },
    methods: {
        interestGet(){
            this.ServerAPI.postAPI(this.API.vipList, '', (success, data) => {
                if (success) {
                    if (data.code === '0000') {
                        this.fundRateData = data.data.reverse()
                    } else {
                        Toast(data.info)
                    }
                } else {
                    Toast('网络超时，请重试')
                }
            })
        },
        toPush(){
            this.$router.push('/interestRecharge');
        }
    }
}
</script>

<style lang="scss" scoped>
.interest-intro {
    .top-img {
        display: block;
        width: 90%;
        margin: .2rem auto 0;
    }
    .top-title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 92%;
        margin: .3rem auto 0;
        .side-line {
            height: .1rem;
            width: .8rem;
            background: linear-gradient(to right,#FFFFFF,#F2B947);
        }
        .top-fonts {
            color: #001C58;
            font-size: .4rem;
            font-weight: bold;
            margin: 0 .2rem;
        }
        .side-line2 {
            background: linear-gradient(to right,#F2B947,#FFFFFF);
        }
    }
    .gray-line {
        height: 2px;
        width: 1rem;
        background: #7D7D7D;
        margin: .25rem auto 0;
    }
    .intro-fonts {
        width: 86%;
        margin: .25rem auto 0;
        font-size: .3rem;
        color: #5F666F;
        font-weight: bold;
    }
    .arrow-icon {
        display: block;
        width: .35rem;
        margin: .25rem auto 0;
    }
    .list-content {
        width: 90%;
        margin: .25rem auto 0;
        font-weight: bold;
        text-align: center;
        border-radius: .06rem;
        border: #D8D8D8 1px solid;
        .list-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1rem;
            color: #FFFFFF;
            background: linear-gradient(to bottom,#78BDF2,#167BFF);
            .list-title-side {
                width: 50%;
            }
            .center-line {
                width: 1px;
                height: .4rem;
                background: #8AB5B7;
            }
        }
        .vip-list {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: .76rem;
            color: #303030;
            background: #FFFFFF;
            .vip-list-side {
                width: 50%;
            }
            .center-line {
                width: 1px;
                height: .25rem;
                background: #D0CECF;
            }
        }
        .vip-list:nth-child(2) {
            font-size: .5rem;
        }
        .vip-list:nth-child(3) {
            background: #F5F6F7;
            font-size: .46rem;
        }
        .vip-list:nth-child(4) {
            font-size: .44rem;
        }
        .vip-list:nth-child(5) {
            background: #F5F6F7;
            font-size: .42rem;
        }
        .vip-list:nth-child(6) {
            font-size: .4rem;
        }
        .vip-list:nth-child(7) {
            background: #F5F6F7;
            font-size: .38rem;
        }
        .vip-list:nth-child(8) {
            font-size: .36rem;
        }
        .vip-list:nth-child(9) {
            background: #F5F6F7;
            font-size: .34rem;
        }
        .vip-list:nth-child(10) {
            font-size: .32rem;
        }
        .vip-list:nth-child(11) {
            background: #F5F6F7;
            font-size: .3rem;
        }
        .vip-list:nth-child(12) {
            font-size: .28rem;
        }
    }
    .bottom-btn {
        width: 90%;
        margin: .4rem auto .6rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        font-size: .3rem;
        font-weight: bold;
        border-radius: .05rem;
        background: linear-gradient(to right,#78BDF2,#167BFF);
        color: #FFFFFF;
    }
}
</style>
