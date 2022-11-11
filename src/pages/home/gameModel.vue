<template>
	<div class="gameModel">
        <div class="model-head" v-if="!hideTitle">
            <div class="model-head-left">
                <img src="../../../static/images/back-icon-white.png" alt="" class="back-icon" @click="leavePopup = true">
                <div class="back-fonts">{{gameName}}</div>
            </div>
            <div class="model-head-right">
                <div class="head-right-fonts" @click="getBalanceInfo()">转账</div>
                <div class="head-right-fonts" @click="switchFullScreen(1)">全屏</div>
                <div class="head-right-fonts" @click="reloadGame()">刷新</div>
            </div>
        </div>
        <img src="../../../static/images/full-screen-mark.png" alt="" class="full-screen-mark" v-if="showMark" @click.stop="switchFullScreen(2)">
        <iframe ref='iframeHeight' id='gameIframe' frameborder=0 width=100% height=100% marginheight=0 marginwidth=0 :src="realURL"
            scrolling=yes style="overflow-y: scroll">
        </iframe>
        <van-popup class="leave-popup-box" v-model="leavePopup">
            <div class="leave-popup-title"></div>
            <div class="leave-popup-content">
                <div class="leave-popup-content-title">
                    <div class="blue-line"></div>
                    <div class="title-fonts">确定离开游戏吗？</div>
                </div>
                <img src="../../../static/images/game-model-leave.png" alt="" class="game-model-leave">
                <div class="bottom-btn bottom-btn1" @click.stop="leavePopup = false">再玩一会</div>
                <div class="bottom-btn bottom-btn2" @click.stop="backToHome()">离开</div>
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
import HeaderTop from '../../components/top/top';
import {Toast} from 'vant'

export default {
	name: 'gameModel',
	components: {
		HeaderTop,
		Toast
	},
	data() {
		return {
			url: '',
			realURL: '',
			iframeSrc: '',
			recData: '',
            gameName: '',
            gameId: '',
            hideTitle:false,
            showMark:false,
            queryMark:0,
            leavePopup:false,
            transPopup:false,
            mainBalance:'',
            gameBalance:'',
            isLoading:false,
            isLoading2:false,
		}
	},
	beforeRouteLeave(to, from, next) {
		sessionStorage.removeItem('queryData')
		sessionStorage.removeItem('gameName')
		sessionStorage.removeItem('gameId')
        window.removeEventListener("resize", this.renderResize, false)
		this.$destroy(true)
		next()
	},
	mounted() {
		this.$refs.iframeHeight.height = '93.5%';
        window.addEventListener("resize", this.renderResize, false)
	},
	created() {
		this.recData = JSON.parse(sessionStorage.getItem('queryData'));
		this.gameName = sessionStorage.getItem('gameName');
		this.gameId = sessionStorage.getItem('gameId');
		this.playGame();
        this.renderResize()
	},
	methods: {
		playGame() {
			this.ServerAPI.postAPI(this.recData, '', this.callBack)
			// this.ServerAPI.postAPI('https://www.emcyyy.com/api/game/play?gameId=56&visitType=APP', '',this.callBack)
		},
		callBack(success, data) {
			if (success) {
				if (data.code === '0000') {
					this.realURL = data.data;
				} else {
					Toast(data.info);
				}
			} else {
				Toast('网络链接失败，请稍后尝试');
				this.$router.push('/');
			}
		},
        getBalanceInfo(){
            this.transPopup = true
		    this.getBalance()
		    this.getGameBalance()
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
        renderResize() {
            // 判断横竖屏
            let width = document.documentElement.clientWidth
            let height = document.documentElement.clientHeight
            if(width > height) {
                this.hideTitle = true
                this.showMark = false
                this.$refs.iframeHeight.height = '100%';
                console.log(this.$refs.iframeHeight.height)
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
        switchFullScreen(value){
		    this.queryMark = value
		    if(value === 1){
		        this.hideTitle = true
		        this.showMark = true
                this.$refs.iframeHeight.height = '100%';
            }else{
                this.hideTitle = false
                this.showMark = false
                this.$refs.iframeHeight.height = '93.5%';
            }
        },
        backToHome(){
		    this.$router.replace('/')
        },
        reloadGame(){
            this.playGame();
        },
	}
}
</script>

<style lang="scss" scoped>
.gameModel {
	height: 100%;
    //position: relative;
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
    .iframe-page {
        position: relative;
        z-index: 1000;
    }
    .full-screen-mark {
        position: absolute;
        width: 1rem;
        top: 0;
        left: 50%;
        margin-left: -.5rem;
        z-index: 1000;
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
