<template>
	<div class="calendar-prize-body">
        <img src="../../../static/images/calendar-prize-banner.png" alt="" class="top-banner">
        <div class="calendar-box">
            <div class="calendar-content">
                <div class="calendar-content-title flex-c">
                    <van-icon class="to-prev-month" name="play" v-if='monthNow !== 1'/>
                    2021年{{monthNow}}月
                    <van-icon class="to-next-month" name="play" v-if='monthNow !== 12'/>
                </div>
                <div class="calendar-content-list-box">
                    <div class="calendar-content-list text-c flex-b">
                        <div class="calendar-cell">日</div>
                        <div class="calendar-cell">一</div>
                        <div class="calendar-cell">二</div>
                        <div class="calendar-cell">三</div>
                        <div class="calendar-cell">四</div>
                        <div class="calendar-cell">五</div>
                        <div class="calendar-cell">六</div>
                    </div>
                    <div class="calendar-content-list text-c flex-b">
                        <div class="calendar-cell">
                            
                        </div>
                        <div class="calendar-cell">
                            
                        </div>
                        <div class="calendar-cell">
                            
                        </div>
                        <div class="calendar-cell">
                            
                        </div>
                        <div class="calendar-cell">
                            
                        </div>
                        <div class="calendar-cell">
                            
                        </div>
                        <div class="calendar-cell">
                            
                        </div>
                    </div>
                </div>
               
            </div>
             <div class="bottom-intro flex-c">
                <div class="bottom-intro-list flex">
                    <span class="left-point orange"></span>
                    <span>易倍限定</span>
                </div>
                <div class="bottom-intro-list flex">
                    <span class="left-point blue"></span>
                    <span>体育专属</span>
                </div>
                <div class="bottom-intro-list flex">
                    <span class="left-point green"></span>
                    <span>娱乐优惠</span>
                </div>
            </div>
        </div>
        <div class="discount-show">
            <div class="discount-title-box">
                <img src="../../../static/images/calendar-title-img1.png" alt="" class="table-title-img">
                <div class="table-title-right flex-e bold" @click="rulesShow = true">
                    <img src="../../../static/images/discount-rules-icon.png" alt="" class="rules-icon">
                    活动规则
                    <!-- <div class="rules-title gold"></div> -->
                </div>
            </div>
            <div class="discount-content-box">
                <img src="../../../static/images/calendar-title-left-img.png" alt="" class="discount-content-img">
                <div class="discount-content-list flex-b">
                    <div class="discount-content-list-left flex">
                        <div class="left-point orange-point"></div>
                        <div class="left-fonts">
                            <div class="left-fonts1 bold">五大联赛天天送</div>
                            <div class="left-fonts2">领取7200现金</div>
                        </div>
                    </div>
                    <div class="discount-content-list-right flex-c white">
                        <span>立即领取</span>
                        <van-icon name="arrow" color='#FFFFFF'/>
                    </div>
                </div>
                <img src="../../../static/images/calendar-title-left-img2.png" alt="" class="discount-content-img">
                <div class="discount-content-list flex-b">
                    <div class="discount-content-list-left flex">
                        <div class="left-point blue-point"></div>
                        <div class="left-fonts">
                            <div class="left-fonts1 bold">五大联赛天天送</div>
                            <div class="left-fonts2">领取7200现金</div>
                        </div>
                    </div>
                    <div class="discount-content-list-right flex-c white">
                        <span>立即领取</span>
                        <van-icon name="arrow" color='#FFFFFF'/>
                    </div>
                </div>
                <div class="discount-content-list flex-b">
                    <div class="discount-content-list-left flex">
                        <div class="left-point green-point"></div>
                        <div class="left-fonts">
                            <div class="left-fonts1 bold">五大联赛天天送</div>
                            <div class="left-fonts2">领取7200现金</div>
                        </div>
                    </div>
                    <div class="discount-content-list-right flex-c white">
                        <span>立即领取</span>
                        <van-icon name="arrow" color='#FFFFFF'/>
                    </div>
                </div>
                <div class="to-more-disount flex-c">
                    <span>查看更多优惠</span>
                    <lottie class='down' style='width:.3rem;height:unset;padding:0;transform:rotate(90deg);margin:0 0 0 .2rem' :options="defaultArrow"/>
                </div>
            </div>
            <div class="discount-content-box">
                <div class="no-discount-fonts">等等！你真以为优惠只有上面那些？点击下方按钮,其他优惠别说我私藏！</div>
                <div class="to-more-disount flex-c">
                    <span>查看更多优惠</span>
                    <lottie class='down' style='width:.3rem;height:unset;padding:0;transform:rotate(90deg);margin:0 0 0 .2rem' :options="defaultArrow"/>
                </div>
            </div>
            <div class="discount-content-box text-c">
                <div class="no-discount-fonts2">
                    欢迎来到易倍体育！<br>
                    彩金日历，日理万斤<br>
                    易倍体育最优质的优惠活动都在这<br>
                    快点击下方按钮加入我们！
                </div>
                <div class="to-deposit white">前往充值</div>
            </div>
        </div>
        <van-popup class="rules-popup-box" round position="bottom" v-model="rulesShow">
			<div class="rules-title-box">
                <img src="../../../static/images/discount-rules-title2.png" alt="" class="rules-title-img">
                <van-icon class='close-icon' size='22px' name="cross" color="#3E4149" @click="rulesShow = false"/>
            </div>
            <div class="rules-content-box silver">
                <div class="rules-content-list">1. 所有EMC易倍会员均可参加，充值会员指抢红包前在网站有过任意充值记录的会员。</div>
                <div class="rules-content-list">2. 红包资格：VIP0享有2次红包资格，VIP1每周3次，VIP2每周6次，VIP3及以上不限次数。VIP会员等级当日北京时间系统等级为准。</div>
                <div class="rules-content-list">3. 红包时刻具体赛程详见官网【红包时刻公告】。</div>
                <div class="rules-content-list">4. 比赛进球后请速度进入EMC易倍手机APP进球红包页面，红包将在比赛进球后30秒左右启动，5分钟内结束。如果出现卡顿现象请重新进入红包页面。</div>
                <div class="rules-content-list">5. 所抢得红包金额请在2天内完成投注（仅限体育），超出时限的将扣除红包金额及其产生的盈利。</div>
                <div class="rules-content-list">6. 每位真实有效玩家/每一手机号码/电子邮箱/户籍地址/现居地址/同一银行卡/每一IP地址/每一台电脑或上网设备仅允许一个帐号参与抢红包活动，网站一经发现并判定同人多号刷取红包，将采取封停冻结措施。</div>
                <div class="rules-content-list">7. 参与该活动会员必须接受及遵循上述规则与条款，并接受EMC易倍使用的红利优惠一般相关规则与条款。</div>
                <div class="rules-content-list">8. EMC易倍保留对此活动做出更改、终止的权利，并享有最终解释权。</div>
            </div>
		</van-popup>
		<!--loading-new-->
		<div class="loading-new" v-if="showLoading"><img src="../../../static/images/allLoading.gif" alt=""></div>
		
	</div>
</template>

<script>
import {Toast} from 'vant';
import dayjs from 'dayjs';
import arrow from "@/assets/lottie/arrow.json"
export default {
	data() {
		return {
            monthNow:'',
            dateArr:[],
            rulesShow:false,

            showLoading:false,
            defaultArrow:{animationData:arrow,loop:true,autoplay:true},
		}
	},
	name: 'tradeRecords',
	components: {
		Toast,
	},
	mounted() {
		// console.log(dayjs(dayjs().startOf('month')).day())
		// console.log(dayjs(dayjs().endOf('month')).day())
		// console.log(dayjs('2021-12-11').day())
		// console.log(dayjs().daysInMonth())

        // this.initDate()
	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
	methods: {
        initDate(){
            let startTemp = 0
            for(let i=0;i<(dayjs(dayjs().endOf('month')).day() * 7)-1;i++){
                this.dateArr.push(i)
            }
            console.log(this.dateArr)
        },

	}
}
</script>

<style lang="scss" scoped>
.calendar-prize-body {
    min-height: 100vh;
    background: #EEEEEE;
    padding-bottom: .3rem;
    font-family: PingFang SC;
    .top-banner {
        width: 100%;
    }
    .calendar-box {
        width: 94%;
        height: 4rem;
        border-radius: .2rem;
        box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.3);
        margin: -.2rem auto 0;
        padding-top: .15rem;
        background: #FFFFFF;
        position: relative;
        overflow: hidden;
        .calendar-content {
            width: calc(100% - .3rem);
            margin: 0 auto;
            border: #DCDFE7 1px solid;
            border-radius: .2rem;
            overflow: hidden;
            .calendar-content-title {
                background: #F6F6F9;
                color: #303030;
                height: 0.6rem;
                .to-prev-month {
                    transform: rotate(180deg);
                }
            }
            .calendar-content-list-box {
                background: #FFFFFF;
                .calendar-content-list {
                    height: 1rem;
                    .calendar-cell {
                        width: 14.3%;
                        font-size: .24rem;
                    }
                }
                .calendar-content-list:first-child {
                    height: 0.6rem;
                }
                .calendar-content-list:nth-child(odd) {
                    background: #F6F6F9;
                }
            }
        }
        .bottom-intro {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 4.6rem;
            height: 0.6rem;
            border-radius: .3rem 0 0 0;
            background: #F6F7F8;
            .bottom-intro-list {
                color: #7C8591;
                font-size: .26rem;
                margin-left: .18rem;
                .left-point {
                    width: 0.18rem;
                    height: 0.18rem;
                    border-radius: 50%;
                    margin-right: .06rem;
                }
                .orange {
                    background: #FFB93A;
                }
                .blue {
                    background: #0C9EF6;
                }
                .green {
                    background: #28BD43;
                }
            }
            .bottom-intro-list:first-child {
                margin-left: 0;
            }
        }
    }
    .discount-show {
        width: 94%;
        margin: .3rem auto 0;
        border-radius: .2rem;
        box-shadow: 0px 0px 10px -2px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        background: #FFFFFF;
        .discount-title-box {
            position: relative;
            .table-title-img {
                width: 100%;
                display: block;
            }
            .table-title-right {
                position: absolute;
                right: .2rem;
                top: .4rem;
                font-size: .3rem;
                color: #B48A6E;
                .rules-icon {
                    height: 0.3rem;
                    margin: .02rem .05rem 0 0;
                }
            }
        }
        .discount-content-box {
            // background: linear-gradient(to bottom,rgba(255,255,255,.0) 0rem,rgba(255,255,255,1) .2rem);
            padding-bottom: .3rem;
            .discount-content-img {
                height: 0.6rem;
                margin-top: .2rem;
            }
            .discount-content-list {
                width: 90%;
                height: 1rem;
                margin: .2rem auto 0;
                padding: 0 .2rem;
                background: #F6F7F8;
                border-radius: 5px;
                .discount-content-list-left {
                    .left-point {
                        width: 0.18rem;
                        height: 0.18rem;
                        border-radius: 50%;
                    }
                    .orange-point {
                        background: #FFB93A;
                    }
                    .blue-point {
                        background: #0C9EF6;
                    }
                    .green-point {
                        background: #28BD43;
                    }
                    .left-fonts {
                        margin-left: .16rem;
                        .left-fonts1 {
                            font-size: .3rem;
                        }
                        .left-fonts2 {
                            font-size: .2rem;
                            color: #7C8591;
                            margin-top: -.05rem;
                        }
                    }
                }
                .discount-content-list-right {
                    background: linear-gradient(92deg, #78BDF2 0%, #167BFF 100%);
                    border-radius: 15px;
                    font-size: .3rem;
                    width: 2rem;
                    height: .6rem;
                }
            }
            .to-more-disount {
                width: 68%;
                margin: .3rem auto 0;
                height: 0.8rem;
                border: 1px solid #DCE0E7;
                border-radius: .15rem;
            }
            .no-discount-fonts {
                width: 80%;
                margin: .3rem auto 0;
                font-family: YouSheBiaoTiHei;
                font-weight: bolder;
                color: #7C8591;
                font-size: .32rem;
            }
            .no-discount-fonts2 {
                width: 90%;
                margin: .3rem auto 0;
                background: url('../../../static/images/calendar-bg.png') center top no-repeat;
                background-size: 100% 2rem;
                font-family: YouSheBiaoTiHei;
                font-weight: bolder;
                color: #7C8591;
                font-size: .32rem;
            }
            .to-deposit {
                background: linear-gradient(92deg, #78BDF2 0%, #167BFF 100%);
                height: 0.8rem;
                width: 78%;
                line-height: .8rem;
                font-size: .3rem;
                border-radius: .1rem;
                margin: .3rem auto 0;
            }
        }
    }
}
.rules-popup-box {
    color: #7C8591;
	.rules-title-box {
        position: relative;
        .rules-title-img {
            width: 100%;
        }
        .close-icon {
            position: absolute;
            right: 0.3rem;
            top: .3rem;
        }
    }
    .rules-content-box {
        text-align: left;
        width: 92%;
        margin: 0 auto;
        padding-bottom: .2rem;
        .rules-content-list {
            font-size: .28rem;
            margin-top: .2rem;
        }
    }
}
</style>
