<template>
	<div class="detail">
		<HeaderTop :title="`余额宝说明`" ></HeaderTop>
		<img src="../../../static/images/discount-banner-130.png" alt="" class="top-banner">
        <div class="main-content">
                <div class="content-table content-table1">
                    <div class="table-title">
                        <img src="../../../static/images/discount-table-title1.png" alt="" class="table-title-img">
                        <div class="table-title-right flex-s bold">
                            <img src="../../../static/images/discount-rules-icon.png" alt="" class="rules-icon">
                            <div class="rules-title gold" @click="rulesShow = true">活动规则</div>
                        </div>
                    </div>
                    <div class="advantage-content-box">
                        <div class="advantage-line flex-b">
                            <div class="advantage-list">
                                <lottie class='advantage' style='width:unset;height:1rem;padding:0;margin:0 auto;' :options="defaultAdvantage1"/>
                                <div class="advantage-list-fonts-box flex-c">
                                    <div class="left-blue-line"></div>
                                    <div class="advantage-list-fonts bold">利率高</div>
                                </div>
                                <div class="silver">
                                    EMC会员专属<br>最高年利率35%
                                </div>
                            </div>
                            <div class="advantage-list">
                                <lottie class='advantage' style='width:unset;height:1rem;padding:0;margin:0 auto;' :options="defaultAdvantage2"/>
                                <div class="advantage-list-fonts-box flex-c">
                                    <div class="left-blue-line"></div>
                                    <div class="advantage-list-fonts bold">收益日结</div>
                                </div>
                                <div class="silver flex-c">
                                    千元起投每日计算收益
                                </div>
                            </div>
                        </div>
                        <div class="advantage-line advantage-line2 flex-b">
                            <div class="advantage-list">
                                <lottie class='advantage' style='width:unset;height:1rem;padding:0;margin:0 auto;' :options="defaultAdvantage3"/>
                                <div class="advantage-list-fonts-box flex-c">
                                    <div class="left-blue-line"></div>
                                    <div class="advantage-list-fonts bold">灵活存取</div>
                                </div>
                                <div class="silver">
                                    资金随时出入<br>享超高收益无手续费
                                </div>
                            </div>
                            <div class="advantage-list">
                                <lottie class='advantage' style='width:unset;height:1rem;padding:0;margin:0 auto;' :options="defaultAdvantage4"/>
                                <div class="advantage-list-fonts-box flex-c">
                                    <div class="left-blue-line"></div>
                                    <div class="advantage-list-fonts bold">安全保障</div>
                                </div>
                                <div class="silver flex-c">
                                    EMC基金担保
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sub-btn flex-c bold" @click="toJoin()">立即申请</div>
                </div>
                <div class="content-table content-table2">
                    <div class="table-title">
                        <img src="../../../static/images/discount-table-title-130.png" alt="" class="table-title-img">
                        <div class="table-title-right silver flex-s bold"  @click="questionsShow = true">
                            <img src="../../../static/images/discount-title-icon-130.png" alt="" class="rules-icon">
                            <div class="rules-title silver">常见问题</div>
                        </div>
                    </div>
                    <div class="operation-intro flex-b">
                        <div class="operation-intro-list">
                            <lottie class='advantage' style='width:unset;height:1rem;padding:0;margin:0 auto;' :options="defaultAdvantage5"/>
                            <div class="operation-list-fonts bold">转入本金</div>
                            <div class="silver-line"></div>
                            <div class="silver">
                                三端任意转入<br>随时随地操作
                            </div>
                        </div>
                        <van-icon class='silver-arrow silver bold' name="arrow" size='20px'/>
                        <div class="operation-intro-list">
                            <lottie class='advantage' style='width:unset;height:1rem;padding:0;margin:0 auto;' :options="defaultAdvantage6"/>
                            <div class="operation-list-fonts bold">坐等收益24h</div>
                            <div class="silver-line"></div>
                            <div class="silver">
                                年利率最高35%<br>多存多得
                            </div>
                        </div>
                        <van-icon class='silver-arrow silver bold' name="arrow" size='20px'/>
                        <div class="operation-intro-list">
                            <lottie class='advantage' style='width:unset;height:1rem;padding:0;margin:0 auto;' :options="defaultAdvantage7"/>
                            <div class="operation-list-fonts bold">转出时派发收益</div>
                            <div class="silver-line"></div>
                            <div class="silver">
                                本金与利息返<br>到中心钱包
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-table content-table2">
                    <div class="table-title">
                        <img src="../../../static/images/discount-table-title2-130.png" alt="" class="table-title-img">
                    </div>
                    <div class="table-content">
                        <div class="table-content-title gray-b flex-b border-b bold">
                            <div class="table-content-title-list w50">VIP等级</div>
                            <div class="table-content-title-list w50">年利率</div>
                        </div>
                        <div class="toggle-list-box toggle-list-box2">
                            <div class="table-content-line toggle-list flex-b" v-for='(item,index) in vipData' :key='index'>
                                <div class="table-content-line-list w50 bold silver">{{item.name}}</div>
                                <div class="table-content-line-list w50 bold">{{item.fundRate}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		<van-popup class="rules-popup-box" round position="bottom" v-model="rulesShow">
			<div class="rules-title-box">
                <img src="../../../static/images/discount-rules-title.png" alt="" class="rules-title-img">
                <van-icon class='close-icon' size='25px' name="cross"  @click="rulesShow = false"/>
            </div>
            <div class="rules-content-box silver">
                <div class="rules-content-list">1. 利息账户仅支持单笔转入和转出。一次性转账。</div>
                <div class="rules-content-list">2. 利息最高享7天收益。7天到期后将不在进行计算利息，需再次转入。</div>
                <div class="rules-content-list">3. 余额宝钱包账号最低需要转入1000元，没有最高转入金额的限制。</div>
                <div class="rules-content-list">4. 如因不可抗力、对打套利、同IP设备多账号的原因，EMC易倍有权进行任何调整，以保证给VIP会员更优质的收益环境。</div>
                <div class="rules-content-list">举例：EMC易倍会员aa888游戏账户等级为VIP10，可享受35%年利率收益。</div>
                <div class="rules-content-list">会员aaa888于7.20日早上10万元投注体育游戏完成了8万的流水并盈利了8万元，于20日晚上23点从【中心钱包】成功转入本金18万元到【余额宝】钱包。</div>
                <div class="rules-content-list">再于21日晚23点30分从【余额宝】转出【本金18万元+所获利息172.6元】到【中心钱包】会员aaa888只需继续游戏完成提款所需剩余流水本金2万元及172.6元一倍水即可提款。</div>
            </div>
		</van-popup>
        <van-popup class="rules-popup-box" round position="bottom" v-model="questionsShow">
			<div class="rules-title-box">
                <img src="../../../static/images/discount-questions-title-130.png" alt="" class="rules-title-img">
                <van-icon class='close-icon' size='25px' name="cross" @click="questionsShow = false"/>
            </div>
            <div class="rules-content-box">
                <div class="rules-content-list questions-content-list">
                    <div class="questions-title-box bold flex-s">
                        <div class="left-point"></div>
                        <div class="questions-title-fonts">如何转入/转出资金？</div>
                    </div>
                    <div class="questions-content-fonts silver">
                        1. 使用EMC易倍网站任意端口登陆后，进入【个人中心】点击【余额宝】,将最低1000元的本金转入即可坐等收益。<br>
                        2. 使用EMC易倍网站任意端口登陆后，进入【个人中心】点击【余额宝】,将余额宝里面的资金转至【中心钱包】即可。
                    </div>
                </div>
                <div class="rules-content-list questions-content-list">
                    <div class="questions-title-box bold flex-s">
                        <div class="left-point"></div>
                        <div class="questions-title-fonts">多久才有收益？</div>
                    </div>
                    <div class="questions-content-fonts silver">
                        1. 转账至【余额宝】钱包满足24小时后，您可以选择转出至【中心钱包】。<br>
                        2.第一次转入【余额宝】的资金成功放置24小时后开始派发利息，之后的每次利息会在上一笔利息后的24小时后产生。
                    </div>
                </div>
                <div class="rules-content-list questions-content-list">
                    <div class="questions-title-box bold flex-s">
                        <div class="left-point"></div>
                        <div class="questions-title-fonts">什么原因会没有利息？</div>
                    </div>
                    <div class="questions-content-fonts silver">
                        1.【EMC余额宝】的时间没有达到24小时。<br>
                        2. 您有违反基本规则条例：如因不可抗力、对打套利、同IP设备多账号的原因，EMC易倍有权进行任何调整，以保证给VIP会员更优质的收益环境。
                    </div>
                </div>
                <div class="rules-content-list questions-content-list">
                    <div class="questions-title-box bold flex-s">
                        <div class="left-point"></div>
                        <div class="questions-title-fonts">转的资金可以直接提款吗？</div>
                    </div>
                    <div class="questions-content-fonts silver">
                        1. 由【余额宝】转出的【本金+利息】可直接投注游戏或者提款。<br>
                        2. 转出的本金一共只需要一倍流水提现，您可以选择转入或转出的时候进行流水投注。
                    </div>
                </div>
                <div class="rules-content-list questions-content-list">
                    <div class="questions-title-box bold flex-s">
                        <div class="left-point"></div>
                        <div class="questions-title-fonts">利率为什么和别人不一样？</div>
                    </div>
                    <div class="questions-content-fonts silver">
                        利率根据您的游戏账号等级设定，如果需要保持利率需要保级VIP星级，VIP8、VIP9、VIP10的年利率是35%。
                    </div>
                </div>                
            </div>
		</van-popup>
	</div>
</template>
<script>
import HeaderTop from '../../components/top/top';
import advantage1 from "@/assets/lottie/yebAdvantage1.json"
import advantage2 from "@/assets/lottie/yebAdvantage2.json"
import advantage3 from "@/assets/lottie/yebAdvantage3.json"
import advantage4 from "@/assets/lottie/yebAdvantage4.json"
import advantage5 from "@/assets/lottie/yebAdvantage5.json"
import advantage6 from "@/assets/lottie/yebAdvantage6.json"
import advantage7 from "@/assets/lottie/yebAdvantage7.json"
// import arrow from "@/assets/lottie/arrow.json"
import {Toast} from 'vant'
import {mapState} from 'vuex';
export default {
	name:'discountDetail130',
	components:{
		HeaderTop,
		
	},
	data(){
		return{
            defaultAdvantage1:{animationData:advantage1,loop:true,autoplay:true},
            defaultAdvantage2:{animationData:advantage2,loop:true,autoplay:true},
            defaultAdvantage3:{animationData:advantage3,loop:true,autoplay:true},
            defaultAdvantage4:{animationData:advantage4,loop:true,autoplay:true},
            defaultAdvantage5:{animationData:advantage5,loop:true,autoplay:true},
            defaultAdvantage6:{animationData:advantage6,loop:true,autoplay:true},
            defaultAdvantage7:{animationData:advantage7,loop:true,autoplay:true},
			rulesShow:false,
			questionsShow:false,
            vipData:[]
		}
	},
	created(){
	
	},
	mounted(){
        this.interestGet()
	},
    computed:
        mapState({navigator: state => state.common.navigator}),
        tarbarIndex: state => state.common.tarbarIndex,
	beforeRouteLeave (to, from, next) {    // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true)
		next()
	},
	methods: {
        interestGet(){
            this.ServerAPI.postAPI(this.API.vipList, '', (success, data) => {
                if (success) {
                    if (data.code === '0000') {
                        this.vipData = data.data
                    } else {
                        Toast(data.info);
                    }
                } else {
                    Toast('网络超时，请重试');
                }
            })
        },
        toJoin(){
            // this.$store.commit('TARBAR',3)
            this.$router.push("/interestRecharge")
        }
		
	}
}
</script>

<style lang="scss" scoped>
.detail{
	width:100%;
	height: auto;
    background: #EEEEEE;
    text-align: center;
    padding-bottom: .4rem;
    // color: #000000;
	.top-banner {
        display: block;
        width: 100%;
    }
    .main-content {
        width: 94%;
        margin: 0 auto;
        .content-table {
            position: relative;
            top: 0;
            left: 0;
            background: #FFFFFF;
            border-radius: .25rem;
            padding-bottom: .3rem;
            .table-title {
                .table-title-img {
                    width: 100%;
                    display: block;
                }
                .table-title-right {
                    position: absolute;
                    right: .2rem;
                    top: .4rem;
                    font-size: .3rem;
                    .rules-icon {
                        height: 0.3rem;
                        margin-right: .06rem;
                    }
                }
            }
            .advantage-content-box {
                padding: .2rem 0;
                .advantage-line {
                    width: 94%;
                    margin: 0 auto;
                    .advantage-list {
                        background: #F6F7F8;
                        width: 48%;
                        padding: .2rem 0;
                        border-radius: .2rem;
                        font-size: .26rem;
                        .advantage-list-fonts-box {
                            margin: .1rem 0;
                            font-size: .3rem;
                            .left-blue-line {
                                width: 0.05rem;
                                height: 0.32rem;
                                background: linear-gradient(to bottom,#78BDF2,#FFFFFF);
                                margin-right: .1rem;
                            }
                        }
                        .silver {
                            height: .7rem;
                        }
                    }
                }
                .advantage-line2 {
                    margin-top: .25rem;
                }
            }
            .sub-btn {
                width: 80%;
                height: 40px;
                background: linear-gradient(92deg, #78BDF2 0%, #167BFF 100%);
                border-radius: 4px;
                margin: .1rem auto 0;
                color: #FFFFFF;
            }
            .table-content {
                width: 96%;
                margin: .1rem auto 0;
                border-radius: .25rem;
                overflow: hidden;
                border: 1px solid #C3CAD7;
                .table-content-title {
                    .table-content-title-list {
                        height: 0.8rem;
                        line-height: .8rem;
                    }
                }
                .toggle-list-box {
                    .table-content-line {
                        .table-content-line-list {
                            height: 1.1rem;
                            line-height: 1.1rem;
                        }
                    }
                    .toggle-list:nth-child(even) {
                        background: #F6F7F8;
                    }
                }
                .toggle-list-box2 {
                    // height: 3.3rem;
                    overflow: hidden;
                    transition: all .5s;
                }
                .table-content-switch-box {
                    height: 0.8rem;
                    line-height: .8rem;
                    background: #FFFFFF;
                    .down {
                        transform: rotate(180deg);
                    }
                }
            }
            .intro-content {
                border: none;
                padding: 0 .15rem;
                .intro-title-box {
                    color: #686868;
                    font-size: .32rem;
                    padding-top: .2rem;
                    .left-point {
                        width: 0.15rem;
                        height: 0.15rem;
                        border-radius: 50%;
                        background: #78BDF2;
                        margin-right: .15rem;
                    }
                }
                .intro-title-box2 {
                    margin-top: .2rem;
                }
                .intro-content-fonts {
                    color: #7C8591;
                    font-size: .28rem;
                    text-align: left;
                    margin-top: .1rem;
                }
            }
        }
        .content-table2 {
            margin-top: .3rem;
            .operation-intro {
                margin-top: .2rem;
                .operation-intro-list {
                    width: 33%;
                    text-align: center;
                    font-size: .2rem;
                    .operation-list-fonts {
                        margin-top: .1rem;
                    }
                    .silver-line {
                        width: 30%;
                        height: 0.02rem;
                        margin: .1rem auto;
                        background: linear-gradient(to right,#78BDF2,#FFFFFF);
                    }
                    .silver {
                        font-size: .2rem;
                    }
                }
                .silver-arrow {
                    margin-top: -1.2rem;
                }
            }
        }
    }
}
.rules-popup-box {
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
        .questions-content-list {
            margin-top: .1rem;
            .questions-title-box {
                font-size: .3rem;
                .left-point {
                    width: 0.25rem;
                    height: 0.25rem;
                    border-radius: 50%;
                    background: #78BDF2;
                    margin-right: .1rem;
                }
                // .questions-title-fonts {

                // }
            }
            .questions-content-fonts {
                font-size: .26rem;
                // margin-top: .05rem;
            }
        }
    }
}
.flex-b {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.flex-c {
    display: flex;
    justify-content: center;
    align-items: center;
}
.flex-s {
    display: flex;
    justify-content: start;
    align-items: center;
}
.bold {
    font-weight: bold;
}
.gray-b {
    background: #F6F7F8;
}
.w33 {
    width: 33%;
}
.w50 {
    width: 50%;
}
.border-b {
    border-bottom: 1px solid #C3CAD7;
}
.border-t {
    border-top: 1px solid #C3CAD7;
}
.silver {
    color: #7C8591;
}
.bold {
    font-weight: bold;
}
.gold {
   color: #AA850A;
}
</style>

