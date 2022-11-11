<template>
	<div class="detail">
		<HeaderTop :title="`每进一球，疯抢五万`" ></HeaderTop>
		<img src="../../../static/images/discount-banner-24.png" alt="" class="top-banner">
        <div class="main-content">
                <div class="content-table content-table1">
                    <div class="table-title">
                        <img src="../../../static/images/discount-table-title1.png" alt="" class="table-title-img">
                        <div class="table-title-right flex-s bold">
                            <img src="../../../static/images/discount-rules-icon.png" alt="" class="rules-icon">
                            <div class="rules-title gold" @click="rulesShow = true">活动规则</div>
                        </div>
                    </div>
                    <div class="table-content">
                         <div class="toggle-list-box">
                            <div class="table-content-title gray-b flex-b border-b bold">
                                <div class="table-content-title-list w33">参加条件</div>
                                <div class="table-content-title-list w33">进球红包(每次)</div>
                                <div class="table-content-title-list w33">流水倍数</div>
                            </div>
                            <div class="table-content-line flex-b">
                                <div class="table-content-line-list w33 silver">充值会员</div>
                                <div class="table-content-line-list w33 bold">50,000</div>
                                <div class="table-content-line-list w33 bold">1</div>
                            </div>
                            <div class="table-content-line flex-b gray-b border-b">
                                <div class="table-content-line-list w33 silver">免费会员</div>
                                <div class="table-content-line-list w33 bold">50,000</div>
                                <div class="table-content-line-list w33 bold">6</div>
                            </div>
                            <div class="table-content-line">
                                <div class="table-content-line-list flex-c" @click='toJoin()'>
                                    <lottie class='flex-c' style='width:80%;height:unset;padding:0' :options="defaultSubBtn"/>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
                <div class="content-table content-table2">
                    <div class="table-title">
                        <img src="../../../static/images/discount-table-title2.png" alt="" class="table-title-img">
                        <div class="table-title-right silver">仅展示近10笔，最长保留30天</div>
                    </div>
                    <div class="table-content">
                        <div class="table-content-title gray-b flex-b border-b bold">
                            <div class="table-content-title-list w50">时间</div>
                            <div class="table-content-title-list w50">红利</div>
                        </div>
                        <div class="toggle-list-box toggle-list-box2" v-if='userData.length > 0' :style="{'height':allInfo === true ? '11rem':'3.3rem'}">
                            <div class="table-content-line toggle-list flex-b" v-for='(item,index) in userData' :key='index'>
                                <div class="table-content-line-list w50 silver">{{item.confTime}}</div>
                                <div class="table-content-line-list w50 bold">{{item.cash}}</div>
                            </div>
                             <div class="table-content-line toggle-list flex-b" v-if='userData.length === 0'>
                                <div class="table-content-line-list w50 silver">-</div>
                                <div class="table-content-line-list w50 bold">-</div>
                            </div>
                        </div>
                        <div class="toggle-list-box toggle-list-box2" style="height:1.1rem" v-if='userData.length === 0'>
                             <div class="table-content-line toggle-list flex-b">
                                <div class="table-content-line-list w50 silver">-</div>
                                <div class="table-content-line-list w50 bold">-</div>
                            </div>
                        </div>
                        <div class="table-content-line border-t" v-if='!allInfo && userData.length > 3' @click='switchInfo(1)'>
                            <div class="table-content-line-list table-content-switch-box flex-c">
                                <div class="silver bold">展开</div>
                                <lottie class='down' style='width:.3rem;height:unset;padding:0;margin:-.12rem 0 0 0;' :options="defaultArrow"/>
                            </div>
                        </div>
                        <div class="table-content-line border-t" v-if='allInfo && userData.length > 3' @click='switchInfo(2)'>
                            <div class="table-content-line-list table-content-switch-box flex-c">
                                <div class="silver bold">收起</div>
                                <lottie class='up' style='width:.3rem;height:unset;padding:0;margin:.1rem 0 0 0;' :options="defaultArrow"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-table content-table2">
                    <div class="table-title">
                        <img src="../../../static/images/discount-table-title3.png" alt="" class="table-title-img">
                    </div>
                    <div class="table-content intro-content">
                        <div class="intro-title-box bold flex-s border-t">
                            <div class="left-point"></div>
                            <div class="intro-title-fonts">活动时间</div>
                        </div>
                        <div class="intro-content-fonts">{{beginTime}}至{{endTime}}</div>
                        <div class="intro-title-box intro-title-box2 bold flex-s border-t">
                            <div class="left-point"></div>
                            <div class="intro-title-fonts">活动内容</div>
                        </div>
                        <div class="intro-content-fonts">指定日期每天1场或多场比赛，比赛每进一球（不包含加时和点球大战），手机APP即抢红包。</div>
                    </div>
                </div>
            </div>
		<van-popup class="rules-popup-box" round position="bottom" v-model="rulesShow">
			<div class="rules-title-box">
                <img src="../../../static/images/discount-rules-title.png" alt="" class="rules-title-img">
                <van-icon class='close-icon' size='25px' name="cross" @click="rulesShow = false"/>
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
	</div>
</template>
<script>
import HeaderTop from '../../components/top/top';
import subBtn from "@/assets/lottie/discount24-btn.json"
import arrow from "@/assets/lottie/arrow.json"
import {Toast} from 'vant'
import {mapState} from 'vuex';
export default {
	name:'discountDetail24',
	components:{
		HeaderTop,
	},
	data(){
		return{
            defaultSubBtn:{animationData:subBtn,loop:true,autoplay:true},
            defaultArrow:{animationData:arrow,loop:true,autoplay:true},
			rulesShow:false,
            allInfo:false,
            userData:[],
            beginTime:'',
            endTime:'',
		}
	},
	created(){
	
	},
	mounted(){
        this.getList()
	},
    computed:
        mapState({navigator: state => state.common.navigator}),
        tarbarIndex: state => state.common.tarbarIndex,
	beforeRouteLeave (to, from, next) {    // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
		this.$destroy(true)
		next()
	},
	methods: {
        getList(){
            let params = {
                id:24,
                version:this.API.paramVersion
			}
			this.ServerAPI.postAPI(this.API.discount24data, params, (success,data) => {
                if(success){
                    if(data.code === '0000'){
                        this.userData = data.data.bonusList
                        this.beginTime = data.data.beginTime.slice(0,10)
                        this.endTime = data.data.endTime.slice(0,10)
                    }
                }
            })
        },
		switchInfo(value) {
            this.allInfo = !this.allInfo
            if(value === 1) {
                
            }
        },
        toJoin(){
            this.$store.commit('TARBAR',3)
            this.$router.push("/sponsorShip-new")
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
                    height: 3.3rem;
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

