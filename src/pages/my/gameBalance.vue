<template>
	<div class="transferAccounts">
		<HeaderTop :title="`游戏钱包`"></HeaderTop>
		<div class="transt-content">
			<div v-if="isshow" v-for="(items,index) in newList" :key="index" class="transt-list">
				<div class="tlog">
					<span>{{ items.gameName }}</span>
				</div>
				<div class="tlog1">
					<span v-if="items.data !== undefined" @click="balance(items.gameId,index)">{{ items.data }}</span>
					<span v-else @click="balance(items.gameId,index)">{{ items.info }}</span>
				</div>
			</div>
		</div>
		<div class="trans-pad">
			<div class="transferChosing">
				<div class="transferOut">
					<p>转出账户</p>
					<p>中心钱包</p>
				</div>
				<div class="transferIcon"></div>
				<div class="transferIn">
					<p>转入账户</p>
					<div class="" @click="showSelectFuc">{{ showAccount }}</div>
				</div>
			</div>
			<div class="list-bg">
				<input placeholder="请输入转账金额" type="number" ref="money" v-model="moneyValue" @input="checkInput()">
				<span class="maxMoney" @click="inputMax()">最大金额</span>
			</div>
			<div class="top-line">
				<div class="main-balance">
					<span>中心钱包：</span>
					<span class="blue">{{ htmlALL }}</span>
				</div>
				<div class="one-key" @click="withdrawAll()">一键回收</div>
			</div>
			
			<div class="remind">
				<div class="blue">转账提示：<br></div>
				1.游戏钱包不能进行互转，请先转入主账户，再转入游戏钱包。<br>
				2.AG娱乐包含：AG真人、AG老虎机、AG捕鱼。<br>
				3.BBIN娱乐包含：<span class="blue">连环夺宝</span>，BBIN真人，BBIN彩票。
			</div>
            <div class="bottom-btn-box">
				<van-button class="bottom-btn" round type="info" color="#0895FE" block @click="toPush()" :disabled="subCheck">确定</van-button>
			</div>
			<!-- <van-popup class="address-yar" v-model="showSelect">
				<div class="address-fix">
					<div class="tip">请选择转入账户</div>
					<mt-picker :slots="dataList" :itemHeight='36' @change="onValuesChange"></mt-picker>
					<div class="commit" @click="closeSelect(2)">确定</div>
				</div>
			</van-popup> -->
            <van-popup class="popup-content" v-model="showSelect" position="bottom">
                <van-picker show-toolbar :columns="accountListShow" :title="'请选择转入账户'" @confirm="closeSelect" @cancel="showSelect = false" swipe-duration='1000'/>
			</van-popup>
		</div>
		<!--loading-new-->
		<div class="loading-new" v-if="showLoading"><img src="../../../static/images/allLoading.gif" alt=""></div>
	</div>
</template>
<script>
import HeaderTop from '../../components/top/top';
import MuSubmit from '../../components/submit/muSubmit';
import onlineList from '../../components/online/list'
import {Toast} from 'vant';

export default {
	name: 'gameBalance',
	components: {
		HeaderTop,
		MuSubmit,
		onlineList,
	},
	data() {
		return {
			showLoading:false,
			showSelect: false,
			showAccount: "请选择账户",
			account: '',
			accountList: [],
			accountListShow: [],
			accountIdList: [],
			accountIdListShow: [],
			showSubmit: true,
			cash: 0,
			paramId: 0,
			
			gameIds: [],
			data: [],
			banlanceList: [],
			gameShow: [],
			// newList:[],
			showMoney: '加载中...',
			reload: this.reload,
			isshow: false,
			gameName: "",
			textShow_1: "维护中...",
			textShow_2: "点击刷新",
			htmlALL: "加载中...",
			newList: [
				// {info:''}
			],
			params: {
				gameId: ""
			},
			initShow:true,
            moneyValue:'',
            subCheck:true,
		}
	},
	mounted() {
		this.loadTop()
	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
	computed: {

	},
	methods: {
        checkInput(){
            if(this.moneyValue.length > 0){
                this.subCheck = false
                if(this.moneyValue.length > 8){
                    this.moneyValue = this.moneyValue.slice(0,8)
                }
            }else{
                this.subCheck = true
            }
        },
		loadTop() {
			this.ServerAPI.postAPI(this.API.userInfo, "", this.userInfo);
			this.ServerAPI.postAPI(this.API.gameList, "", this.gameList);
			this.balance(1,-1);
		},
		closeSelect(value,index) {
            this.showAccount = value
            this.paramId = this.accountIdListShow[index]
            this.showSelect=false
		},
		userInfo(success, data) {
			if (success) {
				if (data.code == '0000') {
					this.isshow = true;
					this.htmlALL = data.data.cash;
				}
			}
		},
		balance(gameId,index) {
			this.showLoading= true
			if(index !== -1){
				this.showAccount = this.newList[index].gameName
				this.paramId = this.newList[index].gameId
			}
			this.param = {
				gameId: gameId,
				visitType: "WAP"
			}
			this.ServerAPI.postAPI(this.API.gameBalance, this.param, this.gameBalance);
		},
		showSelectFuc() {
			this.showSelect = true;
		},
		toPush() {
			this.showLoading= true
			let money = this.moneyValue
			let param = {
				cash: money,
				gameId: this.paramId
			};
			this.ServerAPI.postAPI(this.API.gameDeposit, param, this.gameDeposit);
		},
		inputMax() {
			this.moneyValue = this.htmlALL;
            this.subCheck = false
		},
		gameList(success, data) {
			if (data.code == '0000') {
				this.sliceLength = data.data.length - 1;
				this.gameShow = data.data;
				for (var k = this.gameShow.length - 1; k >= 0; k--) {
					if (this.gameShow[k].gameId == 1) {
						this.gameShow.splice(k, 1);
					}else{
                        this.accountList.push(this.gameShow[k].gameName);
					    this.accountIdList.push(this.gameShow[k].gameId);
                    }
					this.newList = this.gameShow;
					if(this.initShow === true){
						this.showAccount = this.newList[1].gameName
						this.paramId = this.newList[1].gameId
						this.initShow = false
					}
					this.balance(this.gameShow[k].gameId,-1)
				}
				this.accountIdListShow = this.accountIdList.reverse()
			    this.accountListShow = this.accountList.reverse();
			    this.accountListShow = this.accountListShow.slice(0,this.sliceLength);
			}
		},
		gameBalance(success, data) {
			if (success) {
				this.showLoading= false
				this.banlanceList.push(data)
				for (var i = 0; i < this.newList.length; i++) {
					for (var j = 0; j < this.banlanceList.length; j++) {
						if (this.newList[i].gameId == this.banlanceList[j].gameId) {
							this.newList[i].data = this.banlanceList[j].data;
							this.newList[i].info = this.banlanceList[j].info;
						}
					}
				}
				for (var k = this.newList.length - 1; k >= 0; k--) {
					if (this.newList[k].gameId == 1) {
						this.newList.splice(k, 1);
					}
				}
				;
				this.$forceUpdate();
			} else {
			}
		},
		gameDeposit(success, data) {
			if (success) {
				if (data.code == '0000') {
					this.showLoading = false
					Toast('操作成功');
					this.balance(data.gameId,-1);
					this.balance(1,-1);
					this.loadTop();
					this.moneyValue = "";
                    this.subCheck = true
				} else {
					this.showLoading = false
					Toast(data.info);
					this.balance(data.gameId,-1)
					this.$forceUpdate();
				}
			} else {
				this.showLoading = false
				Toast("网络错误，请重试");
			}
		},
		withdrawAll() {
			this.showLoading = true
			this.ServerAPI.postAPI(this.API.gameWithdrawAll, '', this.gameWithdrawAll);
		},
		gameWithdrawAll(success, data) {
			if (success) {
				if (data.code == "0000") {
					this.showLoading = false
					Toast('操作成功');
					this.loadTop();
				} else {
					this.showLoading = false
					Toast(data.info);
				}
			} else {
				this.showLoading = false
				Toast("网络错误，请重试");
			}
		},
		transferRecord() {
			this.$router.push('/transferRecord')
		},
	}
}
</script>

<style lang="scss" scoped>
.transferAccounts {
	background: #edeff2;
	height: 100%;
	position: relative;
	z-index: 1;
	min-height: 13.3rem;
	
	.transt-content {
		width: 94%;
		margin: .3rem auto 0;
		display: flex;
		justify-content: start;
		align-items: center;
		flex-wrap: wrap;
		background: #FFFFFF;
		padding: .2rem 0 0;
		border-radius: .08rem;
		
		.transt-list {
			width: 20%;
			height: 1rem;
			text-align: center;
			font-size: .2rem;
			
			.tlog1 {
				span {
					color: #3677FF;
				}
			}
		}
	}
	
	.top-line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: #f3f5f8 1px solid;
		width: 100%;
		height: 1rem;
		margin: .3rem auto 0;
		background: #FFFFFF;
		border-radius: .08rem;
		padding: 0 .2rem;
		
		.main-balance span {
			font-size: .2rem;
			color: #171F28;
		}
		
		.main-balance .blue {
			color: #3677FF;
		}
		
		.one-key {
			width: 1.6rem;
			height: .6rem;
			line-height: .6rem;
			text-align: center;
			font-size: .2rem;
			padding: 0;
			color: #FFFFFF;
			background: #0f94ff;
			border-radius: .05rem;
		}
	}
}

.trans-pad {
	width: 94%;
	margin: .2rem auto 0;
	padding: 0 0 .6rem 0;
	background: #edeff2;
	
	.list-bg {
		display: flex;
		height: 1rem;
		justify-content: space-between;
		align-items: center;
		margin: .2rem auto 0;
		background: #FFFFFF;
		border-radius: .08rem;
		
		input {
			border: none;
			margin-left: .2rem;
		}
		
		.maxMoney {
			display: inline-block;
			width: 1.6rem;
			height: .5rem;
			line-height: .5rem;
			border: #3677FF 1px solid;
			color: #3677FF;
			text-align: center;
			margin-right: .2rem;
			border-radius: .05rem;
			font-size: .2rem;
		}
	}
	
	.submitBtn {
		margin: .2rem auto;
		width: 70%;
	}
	
	.transferChosing {
		display: flex;
		justify-content: space-around;
		text-align: center;
		background: #FFFFFF;
		padding: .2rem 0;
		border-radius: .08rem;
		
		.transferIcon {
			width: .8rem;
			height: .8rem;
			background: url("../../../static/images/isMore/hyzz.png") no-repeat;
			background-size: 100% 100%;
		}
		
		.transferOut {
			p:first-child {
				color: #757F8B;
				font-size: .2rem;
			}
		}
		
		.transferIn {
			p:first-child {
				color: #757F8B;
				font-size: .2rem;
			}
		}
	}
}

.remind {
	width: 100%;
	padding: .2rem .2rem 0;
	text-align: left;
	font-size: .23rem;
	
	.blue {
		color: #3677FF;
		font-size: .23rem;
	}
}
.address-yar {
	width: 70%;
	border-radius: .3rem;
	
	.tip, .commit {
		font-size: .25rem;
		height: .7rem;
		line-height: .7rem;
	}
	
	.tip {
		background: #FFFFFF;
	}
	
	div {
		flex: 1;
		text-align: center;
		color: #252525;
		background: #f1f3f5;
	}
	
	.commit {
		color: #ffffff;
		background: #3677FF;
	}
}
.bottom-btn-box {
	margin: 0.4rem auto 0;
	width: 70%;
}
.loading-new {
	position: fixed;
	top: 25%;
	left: 50%;
	margin-top: 50px;
	margin-left: -35px;
	z-index: 2019;
	border-radius: .2rem;
	overflow: hidden;
	opacity: .8;
	
	img {
		width: 70px;
	}
}
</style>
