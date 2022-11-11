<template>
	<div class="bet-orders-content">
        <div class="hide-mask"></div>
		<div class="top-nav flex-c">
            <div class="nav-list nav-list-avtiving bold">易倍</div>
            <div class="nav-line"></div>
            <div class="nav-list" @click="routerFn('bettingRecord')">娱乐</div>
        </div>
        <div class="tab-box">
            <div class="notice-box" @click="toNotice()">
                <van-notice-bar left-icon="volume" color="#7F8590" background="none"
                                style="height: .5rem;width:100%;">
                    <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
                        <van-swipe-item v-for='(item,index) in fbNotice' :key='index' style="width:100%;height:.5rem;" v-html="item.co"></van-swipe-item>
                    </van-swipe>
                </van-notice-bar>
                <div class="notice-box-none"></div>
            </div>
            <div class="tab-title">
                <div class="tab-title-list" :class="navActiving === 1?'title-chosing':''" @click="switchNav(1)">未结算</div>
                <div class="tab-title-list" :class="navActiving === 2?'title-chosing':''" @click="switchNav(2)">已结算</div>
                <div class="tab-title-list" :class="navActiving === 3?'title-chosing':''" @click="switchNav(3)">预约投注</div>
                <div class="tab-title-list" :class="navActiving === 4?'title-chosing':''" @click="switchNav(4)">赛果</div>
            </div>
        </div>
        <div class="orders-content">
            <!-- 单注模式1 -->
            <div class="orders-list-box">
                <div class="orders-title flex-b">
                    <div class="title-left flex single-line">
                        <div class="title-left-line"></div>
                        <div class="title-left-fonts bold single-line">
                            克雷塔罗 VS 提华纳
                        </div>
                    </div>
                    <div class="title-right flex bold">投注成功</div>
                </div>
                <div class="orders-content-detail">
                    <div class="detail-top flex-b">
                        <div class="detail-top-left single-line">墨西哥超级联赛</div>
                        <div class="">开赛:11-09 11:06</div>
                    </div>
                    <div class="detail-center">
                        <div class="detail-center-line1 flex">
                            <div class="center-fonts1 center-fonts5 single-line bold">弗朗西斯塞伦斯尔德-0/0.5 </div>
                            <div class="center-fonts2 center-fonts4 bold">@1.93</div>
                        </div>
                        <div class="detail-center-line2 flex-b">
                            <div class="">大/小（欧洲盘）</div>
                            <div class=""></div>
                        </div>
                        <div class="detail-center-line1 detail-center-line3 flex-b">
                            <div class="">
                                <div class="center-fonts2">本金:</div>
                                <div class="center-fonts1 bold">10.00</div>
                            </div>
                            <div class="text-r">
                                <div class="center-fonts2">可返还:</div>
                                <div class="center-fonts3 bold">100.00</div>
                            </div>
                        </div>
                    </div>
                    <div class="detail-bottom flex-b">
                        <div class="bottom-left">
                            确认:02-01 10:47:12(欧洲盘)<br>
                            单号:637477444324959769
                        </div>
                        <div class="bottom-right flex">
                            <div class="appointment-fonts flex-c">预约注单</div>
                            <div class="copy-fonts bold flex">
                                <span class="el-icon-document-copy"></span>
                                复制
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-box flex-b blue bold">
                    <div class="btn-list btn-1 flex-c" @click.self="showAheadSettlementFn()">
                        提前结算:9.12
                        <el-dropdown>
                            <div class="more-icon flex-c">?</div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <div class="tips-fonts">
                                        易倍体育提前结算只适用于指定<br>
                                        赛事和盘口，如遇到赛事或盘口<br>
                                        取消，提前结算注单会被收回重<br>
                                        新结算，易倍体育保留赛果最终<br>
                                        解释权。
                                    </div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <div class="btn-list btn-2 flex-c">＋预约</div>
                </div>
            </div>
            <!-- 单注模式2 -->
            <div class="orders-list-box">
                <div class="orders-title flex-b">
                    <div class="title-left flex single-line">
                        <div class="title-left-line"></div>
                        <div class="title-left-fonts bold single-line">
                            克雷塔罗 VS 提华纳
                        </div>
                    </div>
                    <div class="title-right flex bold">投注成功</div>
                </div>
                <div class="orders-content-detail">
                    <div class="detail-top flex-b">
                        <div class="detail-top-left single-line">墨西哥超级联赛</div>
                        <div class="">开赛:11-09 11:06</div>
                    </div>
                    <div class="detail-center">
                        <div class="detail-center-line1 flex">
                            <div class="center-fonts1 center-fonts5 single-line bold">弗朗西斯塞伦斯尔德-0/0.5 </div>
                            <div class="center-fonts2 center-fonts4 bold">@1.93</div>
                        </div>
                        <div class="detail-center-line2 flex-b">
                            <div class="">大/小（欧洲盘）</div>
                            <div class="">赛果 - -</div>
                        </div>
                        <div class="detail-center-line1 detail-center-line3 flex-b">
                            <div class="">
                                <div class="center-fonts2">本金:</div>
                                <div class="center-fonts1 bold">10.00</div>
                            </div>
                            <div class="text-r">
                                <div class="center-fonts2">可返还:</div>
                                <div class="center-fonts3 bold">100.00</div>
                            </div>
                        </div>
                    </div>
                    <div class="detail-bottom flex-b">
                        <div class="bottom-left">
                            确认:02-01 10:47:12(欧洲盘)<br>
                            单号:637477444324959769
                        </div>
                        <div class="bottom-right flex">
                            <div class="appointment-fonts flex-c">预约注单</div>
                            <div class="copy-fonts bold flex">
                                <span class="el-icon-document-copy"></span>
                                复制
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-box flex-b blue bold">
                    <div class="btn-list btn-1 flex-c">
                        提前结算:9.12
                        <div class="more-icon flex-c">?</div>
                    </div>
                    <div class="btn-list btn-2 flex-c">已预约</div>
                </div>
            </div>
            <!-- 单注模式3 -->
            <div class="orders-list-box">
                <div class="orders-title flex-b">
                    <div class="title-left flex single-line">
                        <div class="title-left-line"></div>
                        <div class="title-left-fonts bold single-line">
                            克雷塔罗 VS 提华纳
                        </div>
                    </div>
                    <div class="title-right flex bold">
                        <img src="../../../static/images/early-settlement-icon.png" alt="" class="early-settlement-icon">
                    </div>
                </div>
                <div class="orders-content-detail">
                    <div class="detail-top flex-b">
                        <div class="detail-top-left single-line">墨西哥超级联赛</div>
                        <div class="">开赛:11-09 11:06</div>
                    </div>
                    <div class="detail-center">
                        <div class="detail-center-line1 flex">
                            <div class="center-fonts1 center-fonts5 single-line bold">弗朗西斯塞伦斯尔德-0/0.5 </div>
                            <div class="center-fonts2 center-fonts4 bold">@1.93</div>
                        </div>
                        <div class="detail-center-line2 flex-b">
                            <div class="">大/小（欧洲盘）</div>
                            <div class="">赛果 - -</div>
                        </div>
                        <div class="detail-center-line1 detail-center-line3 flex-b">
                            <div class="">
                                <div class="center-fonts2">本金:</div>
                                <div class="center-fonts1 bold">10.00</div>
                            </div>
                            <div class="text-r">
                                <div class="center-fonts2">可返还:</div>
                                <div class="center-fonts3 bold">100.00</div>
                            </div>
                        </div>
                    </div>
                    <div class="detail-bottom flex-b">
                        <div class="bottom-left">
                            确认:02-01 10:47:12(欧洲盘)<br>
                            单号:637477444324959769
                        </div>
                        <div class="bottom-right flex">
                            <div class="appointment-fonts flex-c">预约注单</div>
                            <div class="copy-fonts bold flex">
                                <span class="el-icon-document-copy"></span>
                                复制
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-box flex-b blue bold">
                    <div class="btn-list btn-3 flex-c">提前结算详情</div>
                </div>
            </div>
            <!-- 串关模式 -->
            <div class="orders-list-box">
                <div class="orders-title flex-b">
                    <div class="title-left flex single-line">
                        <div class="title-left-line"></div>
                        <div class="title-left-fonts bold single-line">
                            串关投注
                            <span class="title-left-fonts2">3串1*1</span>
                        </div>
                    </div>
                    <div class="title-right flex bold">
                        投注成功
                    </div>
                </div>
                <div class="orders-content-detail">
                    <div class="">
                        <div class="multi-orders-name single-line bold">巴赛隆纳巴赛隆纳巴赛隆纳 VS 华名字太长时候呈现… </div>
                        <div class="detail-top flex-b">
                            <div class="detail-top-left single-line">墨西哥超级联赛</div>
                            <div class="">开赛:11-09 11:06</div>
                        </div>
                        <div class="detail-center">
                            <div class="detail-center-line1 flex">
                                <div class="center-fonts1 center-fonts5 single-line bold">弗朗西斯塞伦斯尔德-0/0.5 </div>
                                <div class="center-fonts2 center-fonts4 bold">@1.93</div>
                            </div>
                            <div class="detail-center-line2 flex-b">
                                <div class="">大/小（欧洲盘）</div>
                                <div class="">赛果 - -</div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div class="multi-orders-name single-line bold">RB莱比锡 VS 勒伏库森</div>
                        <div class="detail-top flex-b">
                            <div class="detail-top-left single-line">墨西哥超级联赛</div>
                            <div class="">开赛:11-09 11:06</div>
                        </div>
                        <div class="detail-center">
                            <div class="detail-center-line1 flex">
                                <div class="center-fonts1 center-fonts5 single-line bold">弗朗西斯塞伦斯尔德-0/0.5 </div>
                                <div class="center-fonts2 center-fonts4 bold">@1.93</div>
                            </div>
                            <div class="detail-center-line2 flex-b">
                                <div class="">大/小（欧洲盘）</div>
                                <div class=""></div>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        <div class="multi-orders-name single-line bold">巴赛隆纳巴赛隆纳巴赛隆纳 VS 华名字太长时候呈现… </div>
                        <div class="detail-top flex-b">
                            <div class="detail-top-left single-line">墨西哥超级联赛</div>
                            <div class="">开赛:11-09 11:06</div>
                        </div>
                        <div class="detail-center">
                            <div class="detail-center-line1 flex">
                                <div class="center-fonts1 center-fonts5 single-line bold">弗朗西斯塞伦斯尔德-0/0.5 </div>
                                <div class="center-fonts2 center-fonts4 bold">@1.93</div>
                            </div>
                            <div class="detail-center-line2 flex-b">
                                <div class="">大/小（欧洲盘）</div>
                                <div class="">赛果 - -</div>
                            </div>
                        </div>
                    </div>
                    <div class="total-show flex-b">
                        <div class="">
                            <span class="">本金:</span>
                            <span class="bold">10.00</span>
                        </div>
                        <div class="text-r">
                            <span class="">可返还:</span>
                            <span class="bold blue">100.00</span>
                        </div>
                    </div>
                    <div class="detail-bottom flex-b">
                        <div class="bottom-left">
                            确认:02-01 10:47:12(欧洲盘)<br>
                            单号:637477444324959769
                        </div>
                        <div class="bottom-right flex">
                            <div class="appointment-fonts flex-c">预约注单</div>
                            <div class="copy-fonts bold flex">
                                <span class="el-icon-document-copy"></span>
                                复制
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn-box flex-b blue bold">
                    <div class="btn-list btn-3 flex-c">提前结算详情</div>
                </div>
            </div>
        </div>
        <van-popup class="ahead-settlement-box" v-model="aheadSettlementPop">
            <div class="ahead-settlement-line"></div>
            <div class="ahead-settlement-title flex-c bold">
                <div class="title-line"></div>
                <div class="title-fonts">提前结算</div>
            </div>
            <div class="ahead-settlement-intro">该投注将被立即结算，且与该投注相关的最终结果将不影响返还至您帐户中的金额，返还额包含本金。</div>
            <div class="ahead-settlement-detail flex-b">
                <div class="detail-fonts1 bold">结算本金</div>
                <div class="flex">
                    <div class="detail-fonts2 bold">10.00</div>
                    <div class="detail-fonts1 bold">元</div>
                </div>
            </div>
            <div class="ahead-settlement-detail ahead-settlement-detail2 flex-b">
                <div class="detail-fonts1 bold">结算返还额</div>
                <div class="flex">
                    <div class="detail-fonts2 bold">11.00</div>
                    <div class="detail-fonts1 bold">元</div>
                </div>
            </div>
            <div class="bottom-btn-box flex">
                <div class="btn btn-1 flex-c" @click="aheadSettlementPop = false">取消</div>
                <div class="btn btn-2 flex-c" @click="subAheadSettlement()">确定</div>
            </div>
        </van-popup>
	</div>
</template>

<script>

import dayjs from 'dayjs';
export default {
	name: 'betOrders',
	components: {
		
	},
	data() {
		return {
			noticeData:[
                {
                    title:'test111111',
                    contentTitle:'test222222'
                },
                {
                    title:'test333333',
                    contentTitle:'test444444'
                },
            ],
            navActiving:1,
            fbNotice:[],
            aheadSettlementPop:false,
		}
	},
	mounted() {
		this.getFbData()
	},
	created() {
	
	},
	beforeRouteLeave(to, from, next) {    
		this.$destroy(true)
		next()
	},
	methods: {
        showAheadSettlementFn(){
            this.aheadSettlementPop = true
        },
        subAheadSettlement(){
            this.aheadSettlementPop = false
        },
        getFbData(){
            let params = {
                limit:10,
                version:this.API.paramVersion,
            }
			this.ServerAPI.postAPI(this.API.getFbNotice,params,(success, data) => {
				if(success){
					if(data.code=='0000'){
                        this.fbNotice = eval('(' + data.data + ')')
					}else{

                    }
				}else{

                }
			})
		},
		switchNav(value){
            if(this.navActiving !== value){
                this.navActiving = value
            }
        },
        routerFn(val){
            this.$router.push('/' + val)
        },
		
	}
}
</script>
<style lang="scss" scoped>
.bet-orders-content {
    min-height: 100vh;
    background: #EEEEEE;
    .hide-mask {
        // position: fixed;
        // width: 100vw;
        // height: 100vh;
        // background: none;
        // z-index: 90;
    }
	.top-nav {
        position: fixed;
        top: 0;
        color: #7C8591;
        background: #FFFFFF;
        font-size: .3rem;
        padding: .28rem 0;
        width: 100%;
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.3);
        z-index: 3;
        .nav-list-avtiving {
            color: #303030;
            position: relative;
        }
        .nav-list-avtiving::after {
            position: absolute;
            content: '';
            bottom: -.28rem;
            left: 50%;
            transform: translateX(-50%);
            // background: #78BDF2;
            background: #9A1032;
            width: 0.6rem;
            height: 0.08rem;
        }
        .nav-line {
            width: 1px;
            height: 0.34rem;
            background: #E6E8EE;
            margin: 0 .34rem;
        }
    }
	.tab-box {
        position: fixed;
        top: 0;
        width: 100%;
        padding: 1.2rem .26rem .16rem;
        background: #FFFFFF;
        margin-top: -.1rem;
        z-index: 2;
        .notice-box {
            width: 100%;
            margin-top: .1rem;
            background: #F6F7F8;
            border-radius: .4rem;
            padding: 0 .2rem;
            .van-icon {
                // color: #568FF6;
                color: #9A1032;
            }
            .van-notice-bar {
                padding: 0;
            }
            .notice-swipe {
                height: .5rem;
                line-height: .48rem;
                color: #303030;
                .van-swipe-item {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: .24rem;
                }
            }
        }
        .tab-title {
            width: 100%;
            margin: .2rem auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: .5rem;
            background: #F6F7F8;
            padding: .1rem;
            .tab-title-list {
                width: 25%;
                text-align: center;
                height: .6rem;
                line-height: .6rem;
                color: #7C8591;
                font-weight: bold;
                border-radius: .4rem;
            }
            .title-chosing {
                // background: linear-gradient(to right,#78BDF2,#167BFF);
                background: linear-gradient(90deg, #CA2C48 0%, #892635 100%);
                color: #FFFFFF;
            }
            .tab-title-list-disable {
                background: #D7D7D8;
            }
        }
    }
    .orders-content {
        width: calc(100% - .52rem);
        margin: 3.2rem auto 0;
        padding-bottom: 1.4rem;
        .orders-list-box {
            padding: 0 .2rem;
            background: #FFFFFF;
            border-radius: .16rem;
            margin-top: .2rem;
            .orders-title {
                padding: .22rem 0;
                border-bottom: 1px solid #F0F2F7;
                .title-left {
                    max-width: calc(100% - 1.6rem);
                    .title-left-line {
                        // background: linear-gradient(180deg, #78BDF2 0%, rgba(120,189,242,0) 100%);
                        background: linear-gradient(180deg, #892635 0%, rgba(120,189,242,0) 100%);
                        width: 0.1rem;
                        height: 0.4rem;
                        border-radius: .08rem;
                        margin-right: .1rem;
                    }
                    .title-left-fonts {
                        font-size: .34rem;
                        .title-left-fonts2 {
                            font-size: .28rem;
                            color: #7C8591;
                        }
                    }
                }
                .title-right {
                    font-size: .3rem;
                    color: #1BC02A;
                    position: relative;
                    .early-settlement-icon {
                        position: absolute;
                        right: 0rem;
                        width: 1.4rem;
                    }
                }
            }
            .orders-content-detail {
                padding: .1rem 0;
                color: #7C8591;
                font-size: .3rem;
                .multi-orders-name {
                    font-size: .32rem;
                    color: #000000;
                    margin-left: .1rem;
                    margin-top: .16rem;
                }
                .detail-top {
                    margin-left: .14rem;
                    .detail-top-left {
                        max-width: 60%;
                    }
                }
                .detail-center {
                    background: #F0F2F7;
                    padding: .14rem;
                    border-radius: .16rem;
                    margin-top: .1rem;
                    .center-fonts1 {
                        font-size: .32rem;
                        color: #000000;
                    }
                    .center-fonts2 {
                        font-size: .3rem;
                        color: #464646;
                        
                    }
                    .center-fonts3 {
                        font-size: .3rem;
                        // color: #1D9CFE;
                        color: #9A1032;
                    }
                    .center-fonts4 {
                        margin-left: .1rem;
                    }
                    .center-fonts5 {
                        max-width: calc(100% - 1rem);
                    }
                    .detail-center-line2 {
                        font-size: .28rem;
                        color: #7C8591;
                        margin: .1rem 0;
                    }
                }
                .total-show {
                    margin-top: .1rem;
                    padding: 0 .1rem .1rem;
                    color: #303030;
                    font-size: .3rem;
                    border-bottom: 1px solid #F0F2F7;
                }
                .detail-bottom {
                    margin-top: .2rem;
                    padding: 0 .14rem .14rem;
                    border-bottom: 1px solid #F0F2F7;
                    .bottom-left {
                        color: #7C8591;
                        font-size: .24rem;
                        line-height: .3rem;
                    }
                    .bottom-right {
                        .appointment-fonts {
                            background: #F0F2F7;
                            border-radius: .12rem;
                            color: #7C8591;
                            font-size: .28rem;
                            width: 1.48rem;
                            height: 0.6rem;
                        }
                        .copy-fonts {
                            margin-left: .1rem;
                            font-size: .3rem;
                            // color: #1D9CFE;
                            color: #9A1032;
                            .el-icon-document-copy {
                                font-size: .34rem;
                                margin-right: .04rem;                                
                            }
                        }
                    }
                }
            }
            .btn-box {
                padding: .1rem 0 .26rem;
                position: relative;
                z-index: 1;
                .btn-list {
                    // border: 1px solid #78BDF2;
                    border: 1px solid #9A1032;
                    height: 0.8rem;
                    border-radius: .4rem;
                    font-size: .3rem;
                    position: relative;
                }
                .btn-1 {
                    width: calc(100% - 1.6rem);
                    .more-icon {
                        position: absolute;
                        // right: -1.34rem;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 0.38rem;
                        height: 0.38rem;
                        border-radius: 50%;
                        background: #EEEEEE;
                        font-size: .28rem;                        
                    }
                }
                .btn-2 {
                    width: 1.4rem;
                }
                .btn-3 {
                    width: 100%;
                    border: none;
                    background: #EEEEEE;
                }
                .tips-fonts {
                    font-size: .2rem;
                    line-height: .24rem;
                }
            }
        }
    }
}
.el-dropdown {
    right: -1rem;
}
.el-dropdown-menu {
    padding: .1rem .1rem;
    margin-left: .2rem;
    margin-top: .34rem;
}
.el-dropdown-menu__item {
    line-height: .38rem;
    font-size: .2rem;
    padding: 0 .1rem;
}
.ahead-settlement-box {
    border-radius: .2rem;
    background: #FFFFFF;
    width: 6rem;
    .ahead-settlement-line {
        height: 0.2rem;
        // background: linear-gradient(270deg, #167BFF 0%, #78BDF2 100%);
        background: linear-gradient(90deg, #CA2C48 0%, #892635 100%);
    }
    .ahead-settlement-title {
        font-size: .32rem;
        color: #303030;
        margin-top: .2rem;
        .title-line {
            width: 0.08rem;
            border-radius: .08rem;
            height: 0.34rem;
            // background: linear-gradient(to bottom, #78BDF2 0%, rgba(0,0,0,.0) 100%);
            background: linear-gradient(to bottom, #892635 0%, rgba(0,0,0,.0) 100%);
            margin-right: .1rem;
        }
    }
    .ahead-settlement-intro {
        width: 4.8rem;
        margin: .3rem auto 0;
        color: #7C8591;
        font-size: .3rem;
    }
    .ahead-settlement-detail {
        width: 4.8rem;
        margin: .3rem auto 0;
        .detail-fonts1 {
            color: #7C8591;
            font-size: .32rem;
        }
        .detail-fonts2 {
            color: #000000;
            font-size: .34rem;
        }
    }
    .ahead-settlement-detail2 {
        margin-top: .2rem;
    }
    .bottom-btn-box {
        width: 100%;
        border-top: #E6E8EE 1px solid;
        margin-top: .3rem;
        height: 0.88rem;
        .btn {
            width: 50%;
            height: 100%;
            font-size: .32rem;
        }
        .btn-1 {
            color: #A8B3C3;
            border-right: #E6E8EE 1px solid;
        }
        .btn-2 {
            color: #303030;
        }
    }
}
.van-notice-bar {
    // color: #568FF6;
    color: #9A1032;
}
.blue{
    // color: #1D9DFC;
    color: #9A1032;
}
.tips-box {
    border:none;
}
</style>
