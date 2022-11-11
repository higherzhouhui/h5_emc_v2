<template>
	<div class="interest-detail">
		<HeaderTop :title="`余额宝`" :bottomLine="true"></HeaderTop>
		<div class="title-content">
            <img src="../../../static/images/interest-title.png" alt="" class="title-content-img" @click="toIntro(1)">
		</div>
        <div class="main-content">
            <div class="title-date" v-if="status !== '0'">{{beginDate}}至今</div>
            <div class="title-date" v-if="status === '0'">累计利息</div>
            <div class="blue-title">
                <span class="line"></span>
                <span class="center-fonts" v-if="status !== '0'">累计利息</span>
                <span class="center-fonts" v-if="status === '0'">存入一万元</span>
                <span class="line"></span>
            </div>
            <div class="blue-line"></div>
            <div class="cash-content" v-if="status !== '0'">
                <span>￥</span>
                <span class="big-numbers">{{closeFee}}</span>
            </div>
            <div class="cash-content cash-content2" v-if="status === '0'">
                <span>￥</span>
                <span class="big-numbers">{{exceptFee}}</span>
            </div>
            <div class="need-time" v-if="status === '0'">一周后</div>
            <div class="need-time" v-if="status === '1'">一周后最高可得{{monthFee}}元</div>
            <div class="bottom-content">
                <div class="bottom-content-side">
                    <div class="top">存入金额</div>
                    <div class="bottom">{{totalJoin}}</div>
                </div>
                <div class="center-line"></div>
                <div class="bottom-content-side">
                    <div class="top">当前年利率</div>
                    <div class="bottom">{{fundRate}}%</div>
                </div>
            </div>
        </div>
        <div class="bottom-btn to-join" @click="toPush">立即申请</div>
        <div class="bottom-btn to-list" @click="toList">余额宝列表</div>
        <div class="bottom-reminds" @click="toIntro(2)">
            <img src="../../../static/images/interest-intro-icon.png" alt="" class="intro-icon">
            <span>余额宝说明 / 如何提升年利率?</span>
        </div>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top';
import {Dialog,Toast} from 'vant';

export default {
	name: 'interestDetail',
	components: {
		HeaderTop,
	},
	data() {
		return {
            beginDate:'',
            closeFee:'',
            fundRate:'',
            totalJoin:'',
            status:'',
            exceptFee:'',
            monthFee:'',
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
            this.ServerAPI.postAPI(this.API.interestGet, '', (success, data) => {
                if (success) {
                    if (data.code === '0000') {
                        this.beginDate = data.data.begin
                        this.closeFee = data.data.closeFee
                        this.fundRate = data.data.fundRate
                        this.totalJoin = data.data.cash
                        this.status = data.data.status
                        this.exceptFee = (10000 * this.fundRate / 100 / 365 * 7).toFixed(2)
                        this.monthFee = (this.totalJoin * this.fundRate / 100 / 365 * 7).toFixed(2)
                    } else {
                        Toast(data.info)
                    }
                } else {
                    Toast('网络超时，请重试')
                }
            })
        },
        interestCheck(){
            this.ServerAPI.postAPI(this.API.interestCheck, '', (success, data) => {
                if (success) {
                    if (data.code === '0000') {

                    } else {
                        Toast(data.info)
                    }
                } else {
                    Toast('网络超时，请重试')
                }
            })
        },
		toPush() {
			this.$router.push('/interestRecharge');
		},
        toList(){
            this.$router.push('/interestList');
        },
        toIntro(value){
            if(value === 1){
                this.$router.push('/interestInto');
            }else if(value === 2){
                this.$router.push('/discountDetail130')
            }
        }
	}
}
</script>

<style lang="scss" scoped>
.interest-detail {
	background: #EAEDF0;
	height: 100%;
	.title-content {
		width: 92%;
		margin: 0 auto;
		.title-content-img {
            width: 100%;
        }
	}
    .main-content {
        width: 92%;
        margin: .25rem auto 0;
        background: #FFFFFF;
        border-radius: .1rem;
        text-align: center;
        padding: .25rem 0;
        font-weight: bold;
        .title-date {
            color: #A8B3C3;
            font-size: .28rem;
        }
        .blue-title {
            display: flex;
            justify-content: center;
            align-items: center;
            .line {
                height: 1px;
                width: .4rem;
                background: #BCBCBF;
            }
            .center-fonts {
                color: #093EB8;
                font-size: .4rem;
                margin: 0 .15rem;
            }
        }
        .blue-line {
            height: 3px;
            width: 1rem;
            background: #78BDF2;
            margin: .05rem auto 0;
        }
        .cash-content {
            font-size: .28rem;
            margin-top: .2rem;
            .big-numbers {
                font-size: .5rem;
            }
        }
        .cash-content2 {
            color: #A8B3C3;
        }
        .need-time {
            height: .4rem;
            width: 3rem;
            background: #78BDF2;
            color: #FFFFFF;
            line-height: .4rem;
            font-size: .3rem;
            font-weight: bold;
            margin: 0 auto;
        }
        .bottom-content {
            margin-top: .5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            .bottom-content-side {
                width: 50%;
                .top {
                    color: #A8B3C3;
                    font-size: .3rem;
                }
                .bottom {
                    color: #303030;
                    font-size: .35rem;
                }
            }
            .center-line {
                width: 1px;
                height: 1rem;
                background: #D6D4D4;
                margin: 0 .3rem;
            }
        }
    }
    .bottom-btn {
        width: 92%;
        margin: .6rem auto 0;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        font-size: .3rem;
        font-weight: bold;
        border-radius: .05rem;
    }
    .to-join {
        background: linear-gradient(to right,#78BDF2,#167BFF);
        color: #FFFFFF;
    }
    .to-list {
        background: #FFFFFF;
        color: #303030;
        margin-top: .25rem;
        border: #DDDDDD 1px solid;
    }
    .bottom-reminds {
        display: flex;
        justify-content: center;
        align-items: center;
        height: .5rem;
        margin-top: .25rem;
        .intro-icon {
            height: .35rem;
            margin-top: .02rem;
        }
        span {
            color: #464646;
            margin-left: .2rem;
        }
    }
	.load-more {
		display: flex;
		align-items: center;
		font-size: .28rem;
		justify-content: center;
		background: #EAEDF0;
		color: #028AFE;
		padding-bottom: .2rem;

		.load-more-fonts {
			height: .28rem;
			line-height: .28rem;
		}
	}

	.load-more-gray {
		color: #7D7D7D;
	}
}
</style>
