<template>
	<div class="gameModelList">
        <div class="model-head" v-if="!hideTitle">
            <div class="model-head-left">
                <img src="../../../static/images/back-icon-white.png" alt="" class="back-icon" @click="leavePopup = true">
                <div class="back-fonts">{{gameName}}</div>
            </div>
            <div class="model-head-right">
                <div class="head-right-fonts" @click="getBalanceInfo()">转账</div>
                <div class="head-right-fonts" @click="switchFullScreen(1)">全屏</div>
                <div class="head-right-fonts" @click="reloadGame">刷新</div>
            </div>
        </div>
        <img src="../../../static/images/full-screen-mark.png" alt="" class="full-screen-mark" v-if="showMark" @click="switchFullScreen(2)">
        <!-- <div class="slotList" style="max-height: 100vh;overflow-y: auto;"
		     v-infinite-scroll="loadMore"
		     infinite-scroll-disabled="loading"
		     infinite-scroll-distance="10">
			<div class="slotGames" v-for="(item,index) in realURL" :key="index" @click="toGame(index)">
				<img :src="item.imageUrl" alt="">
				<p>{{ item.name }}</p>
			</div>
			<div class="loading" v-if="loading">
				<span id="load-text">{{ loadText }}</span>
			</div>
		</div> -->
        <div class="slotList">
            <div class="slotGames" v-for="(item,index) in realURL" :key="index" @click="toGame(index)">
				<img :src="item.imageUrl" alt="">
				<p>{{ item.name }}</p>
			</div>
			<div class="loading-box flex-c">
                <van-loading v-if='hasMore' type="spinner" size="24px">加载中...</van-loading>
                <div class="no-more" v-if='!hasMore'>已加载全部</div>
            </div>
        </div>
        <van-popup class="leave-popup-box" v-model="leavePopup">
            <div class="leave-popup-title"></div>
            <div class="leave-popup-content">
                <div class="leave-popup-content-title">
                    <div class="blue-line"></div>
                    <div class="title-fonts">确定离开游戏吗？</div>
                </div>
                <img src="../../../static/images/game-model-leave.png" alt="" class="game-model-leave">
                <div class="bottom-btn bottom-btn1" @click="leavePopup = false">再玩一会</div>
                <div class="bottom-btn bottom-btn2" @click="backToHome">离开</div>
            </div>
        </van-popup>
        <van-popup class="leave-popup-box trans-popup-box" v-model="transPopup">
            <div class="leave-popup-title"></div>
            <div class="leave-popup-content">
                <div class="leave-popup-content-title">
                    <div class="blue-line"></div>
                    <div class="title-fonts bold">转帐</div>
                </div>
                <div class="content-list-box flex-c">
                    <div class="content-list text-c">
                        <div class="content-list-left">主帐户余额:</div>
                        <div class="content-list-right">
                            <div class="cash-fonts" v-if="isLoading"><van-loading type="spinner" size="18px"/></div>
                            <div class="cash-fonts" v-if="!isLoading">{{mainBalance}}</div>
                            <div class="right-btn flex-c" @click="withdrawAll()">主账户回收</div>
                        </div>
                    </div>
                    <div class="content-list-line"></div>
                    <div class="content-list text-c">
                        <div class="content-list-left">当前游戏余额:</div>
                        <div class="content-list-right">
                            <div class="cash-fonts gray-fonts" v-if="isLoading2"><van-loading type="spinner" size="18px"/></div>
                            <div class="cash-fonts" v-if="!isLoading2 && gameBalance > 0">{{gameBalance}}</div>
                            <div class="cash-fonts gray-fonts" v-if="!isLoading2 && gameBalance === 0">0</div>
                            <div class="right-btn flex-c" @click.stop="gameDeposit()">一键转入</div>
                        </div>
                    </div>
                </div>
                <div class="close-btn" @click.stop="transPopup = false">关闭</div>
            </div>
        </van-popup>
	</div>
</template>

<script>
import {Toast} from 'vant'
export default {
	name: 'gameModelList',
	components: {
		Toast,
	},
	data() {
		return {
			recURL: '',
			realURL: [],
			finished: false,
			pageNumber: 1,
			totalPage: 0,
			queryData: "",
			orderData: {},
            gameName:'',
			listGameUrl:'',
            hideTitle:false,
            leavePopup:false,
            transPopup:false,
            isLoading:false,
            isLoading2:false,
            mainBalance:'',
            gameBalance:'',
            showMark:false,
            queryMark:0,
            gameId: '',
            hasMore:true,
		}
	},
	computed: {},
    beforeRouteLeave(to, from, next) {
        // sessionStorage.removeItem('queryData')
        // sessionStorage.removeItem('gameName')
        // sessionStorage.removeItem('gameId')
        window.removeEventListener("resize", this.renderResize, false)
        this.$destroy(true)
        next()
    },
	mounted() {
        window.addEventListener("resize", this.renderResize, false)
        window.loadMore = this.loadMore
        window.onscroll = function(){
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
            //滚动条到底部的条件
            if(scrollTop+windowHeight==scrollHeight){
            //写后台加载数据的函数
            setTimeout(() => {
                loadMore()
            }, 600);
            
            // console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
            } 
        }

	},
	created() {
		this.gameName = sessionStorage.getItem('gameName')
        this.gameId = sessionStorage.getItem('gameId');
        console.log(this.gameId)
		let recData = JSON.parse(sessionStorage.getItem('queryData'));
		this.recURL = recData;
		this.playGame();
        this.renderResize()
	},
	methods: {
		playGame() {
			let params = {
				pageNumber: this.pageNumber
			}
			this.ServerAPI.postAPI(this.recURL, params, this.callBack);
		},
		callBack(success, data) {
			if (success) {
				if (data.code === '0000') {
					if (this.realURL.length === 0) {
						this.realURL = data.data.gameList;
						this.totalPage = data.data.totalPage;
						this.pageNumber = data.data.pageNumber;
					} else {
						this.realURL = this.realURL.concat(data.data.gameList);
					}
				} else {
					Toast(data.info);
				}
			} else {
				Toast('网络链接失败，请稍后尝试');
				this.$router.push("/");
			}
		},
		loadMore() {
			if (this.pageNumber < this.totalPage) {
				this.pageNumber++;
				this.playGame();
			}else{
                this.hasMore = false
            }
		},
		toGame(index) {
			this.listGameUrl = this.realURL[index].gameUrl;
			if (this.realURL[index].openType === 0 || this.realURL[index].openType === null) {
                if(this.gameId === '68'){
                    location.href = this.listGameUrl
                }else{
                    this.winRef = window.open("","_blank");
                    this.winRef.location = this.listGameUrl
                }
			} else if (this.realURL[index].openType === 1) {
                sessionStorage.setItem('listGameUrl', this.listGameUrl)
                this.$router.push('/gameModel2');
			}
			// console.log(index)
		},
        renderResize() {
            // 判断横竖屏
            let width = document.documentElement.clientWidth
            let height = document.documentElement.clientHeight
            if(width > height) {
                this.hideTitle = true
                this.showMark = false
                // this.$refs.iframeHeight.height = '100%';
                console.log('isHorizon')
            }else{
                if(this.queryMark === 1){
                    this.hideTitle = true
                    this.showMark = true
                }else{
                    this.hideTitle = false
                    this.showMark = false
                }
            }
            // renderResize 方法执行时虚拟 dom 尚未渲染挂载，如果操作 vue 实例，在this.$nextTick()里进行。
        },
        getBalanceInfo(){
            this.transPopup = true
            this.getBalance()
            this.getGameBalance()
        },
        switchFullScreen(value){
            this.queryMark = value
            if(value === 1){
                this.hideTitle = true
                this.showMark = true
            }else{
                this.hideTitle = false
                this.showMark = false
            }
        },
        backToHome(){
            sessionStorage.removeItem('queryData')
            sessionStorage.removeItem('gameName')
            sessionStorage.removeItem('gameId')
            this.$router.replace('/')
        },
        reloadGame(){
            this.pageNumber = 1
            this.totalPage = 0
            this.realURL = []
            this.playGame();
        },
        withdrawAll(){
            this.isLoading = true
            this.ServerAPI.postAPI(this.API.gameWithdrawAll, '', (success, data) => {
                this.isLoading = false
                if(success){
                    if(data.code === '0000'){
                        this.getBalance()
                        this.getGameBalance()
                        Toast('回收成功');
                    }else{
                        Toast(data.info);
                    }
                }else{
                    Toast('网络链接失败，请稍后尝试');
                }
            })
        },
        gameDeposit(){
            this.isLoading2 = true
            let param = {
                gameId:this.gameId
            }
            this.ServerAPI.postAPI(this.API.quickGameDeposit, param, (success, data) => {
                this.isLoading2 = false
                if(success){
                    if(data.code === '0000'){
                        this.getBalance()
                        this.getGameBalance()
                        Toast(data.info);
                    }else{
                        Toast(data.info);
                    }
                }else{
                    Toast('网络链接失败，请稍后尝试');
                }
            })
        },
        getGameBalance(){
            this.isLoading2 = true
            let param = {
                gameId:this.gameId
            }
            this.ServerAPI.postAPI(this.API.gameBalance, param, (success, data) => {
                this.isLoading2 = false
                if(success){
                    if(data.code === '0000'){
                        this.gameBalance = data.data
                    }else{
                        Toast(data.info);
                    }
                }else{
                    Toast('网络链接失败，请稍后尝试');
                }
            })
        },
        getBalance(){
            this.isLoading = true
            this.ServerAPI.postAPI(this.API.userBalance, '', (success, data) => {
                this.isLoading = false
                if(success){
                    if(data.code === '0000'){
                        this.mainBalance = data.data
                    }else{
                        Toast(data.info);
                    }
                }else{
                    Toast('网络链接失败，请稍后尝试');
                }
            })
        },
	}
}
</script>

<style lang="scss" scoped>
.gameModelList {
    .model-head {
        height: .8rem;
        background: rgba(0,0,0,0.78);
        color: #FFFFFF;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .2rem;
        font-size: .28rem;
        .model-head-left {
            display: flex;
            align-items: center;
            .back-icon {
                height: .28rem;
                margin-right: .2rem;
            }
            .back-fonts {
                width: 3rem;
            }
        }
        .model-head-right {
            display: flex;
            align-items: center;
            .head-right-fonts {
                margin-left: .2rem;
            }
        }
    }
	.slotList {
		width: 94%;
		margin: .4rem auto 0;
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
		.slotGames {
			margin: 0 .45rem .3rem;
			img {
				width: 2.6rem;
				height: 2.6rem;
			}
			p {
				text-align: center;
			}
		}
        .loading-box {
            width: 100%;
            padding-bottom: .2rem;
        }
	}
    .full-screen-mark {
        position: absolute;
        width: 1rem;
        top: 0;
        left: 50%;
        margin-left: -.5rem;
    }
    .leave-popup-box {
        width: 6rem;
        border-radius: .15rem;
        background: #FFFFFF;
        overflow: hidden;
        .leave-popup-title {
            height: .2rem;
            background: linear-gradient(to right,#78BDF2,#167BFF);
        }
        .leave-popup-content {
            padding: .3rem 0;
            .leave-popup-content-title {
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                color: #303030;
                font-size: .34rem;
                .blue-line {
                    width: .1rem;
                    height: .4rem;
                    background: linear-gradient(180deg, #78BDF2 0%, rgba(120,189,242,0) 100%);
                    border-radius: 2px;
                    margin-right: .2rem;
                }
            }
            .game-model-leave {
                width: 3.5rem;
                display: block;
                margin: .6rem auto 0;
            }
            .bottom-btn {
                width: 3.5rem;
                display: block;
                margin: .3rem auto 0;
                font-size: .3rem;
                text-align: center;
                height: .8rem;
                line-height: .8rem;
                border-radius: .08rem;
            }
            .bottom-btn1 {
                background: linear-gradient(to right,#78BDF2,#167BFF);
                color: #FFFFFF;
            }
            .bottom-btn2 {
                color: #A8B3C3;
                margin-top: .15rem;
            }
            .content-list-box {
                .content-list {
                    // width: 6rem;
                    margin: .4rem auto .48rem;
                    font-weight: bold;
                    // padding: 0 .3rem;
                    .content-list-left {
                        color: #464646;
                        margin-top: .1rem;
                        font-size: .3rem;
                    }
                    .content-list-right {
                        color: #1D9DFC;
                        
                        .cash-fonts {
                            font-size: .4rem;
                            margin-top: .02rem;
                            height: 0.48rem;
                        }
                        .gray-fonts {
                            color: #A8B3C3;
                        }
                        .right-btn {
                            width: 1.8rem;
                            padding: .16rem 0;
                            background: linear-gradient(95deg, #78BDF2 0%, #167BFF 100%);
                            border-radius: 2px;
                            color: #FFFFFF;
                            margin: .2rem auto 0;
                        }
                    }
                }
                .content-list-line {
                    width: 1px;
                    height: 40px;
                    background: #A8B3C3;
                }
            }
            .close-btn {
                font-size: .34rem;
                color: #A8B3C3;
                border-top: #E6E8EE 1px solid;
                text-align: center;
                height: .8rem;
                line-height: .8rem;
            }
        }
    }
    .trans-popup-box {
        .leave-popup-content {
            padding-bottom: 0;
        }
    }
}

</style>
