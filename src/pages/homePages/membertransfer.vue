<template>
	<div class="membertransfer">
		<HeaderTop :title="`会员互转`" ></HeaderTop>
		<div class="main">
			<div class="transt-list">
				<div class="tlog">
					<!-- <img class="tlog-img" src="../../../static/images/transfer-balance-icon.png" alt=""> -->
                    <lottie class='lottie-icon' style='width:46px;height:unset;margin: 5px 0 0 -5px;padding:0;' :options="defaultOptions" :animCreated="handleAnimation"/>
					<span>中心钱包</span>&nbsp;
					<span class="main-banlance" v-html="htmlALL"></span>
				</div>
				<div class="tback" v-on:click="withdrawAll()">
					<span>一键回收</span>
				</div>
			</div>
			<div class="list-content">
				<div class="list-l">
					<div class="list">
						<div class="text">转入账号</div>
						<div><input type="text" placeholder="请输入转入账号" ref="loginName" @input="inputCheck()"></div>
					</div>
					<!--                 <div class="warnText">请仔细核实对方账号，对方一旦到账，便不可退回。</div>-->
				</div>
				<div class="list-l">
					<div class="list">
						<div class="text">转入资金</div>
						<div><input type="number" oninput='if(value.length>8)value=value.slice(0,8)' placeholder="请输入转入资金" ref="cash" @input="inputCheck()"></div>
					</div>
				</div>
				<div class="list-l">
					<div class="list">
						<div class="text">资金密码</div>
						<div><input type="password" maxlength="6" placeholder="请输入资金密码" ref="cashPassword" @input="inputCheck()"></div>
					</div>
				</div>
				<div class="list-l">
					<div class="list">
						<div class="text">备注信息</div>
						<div><input type="text" placeholder="请输入备注信息" ref="markInfo"></div>
					</div>
				</div>
			</div>
			<div class="reminds">
                温馨提示：<br>
                1.会员互转需要满足提款流水方可转账，收款账户需要满足一倍提款流水方可进行提款<br>
                2.最低互转金额为200<br>
                3.需要完成一次银行卡提现,才能使用会员互转功能
            </div>
			<div class="submitBlue">
                <van-button class="bottom-btn" round type="info" color="#0895FE" block @click="toPush()" :disabled="subCheck">提交</van-button>
			</div>
		</div>
		<div class="loading-new" v-if="showLoading"><img src="../../../static/images/allLoading.gif" alt=""></div>
	</div>
</template>
<script>
import HeaderTop from '../../components/top/top';
import MuSubmit from '../../components/submit/muSubmit';
import {Toast} from 'vant';
import cardIcon from "@/assets/lottie/cardIcon.json"
export default {
	name:'membertransfer',
	components:{
		HeaderTop,
		MuSubmit,
		Toast,
		cardIcon,
	},
	data(){
		return{
			htmlALL:'加载中',
			showLoading: false,
			params:{
			},
            defaultOptions:{animationData:cardIcon,loop:true,autoplay:true},
            defaultAnim:'',
            subCheck:true,
		}
	},
	mounted(){
		this.loadTop()
	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
	methods:{
        inputCheck(){
            if(this.$refs.loginName.value !== '' && this.$refs.cash.value !== '' && this.$refs.cashPassword.value !== '') {
                this.subCheck = false
            }else{
                this.subCheck = true
            }
        },
        handleAnimation(anim){
            this.defaultAnim = anim;
        },
		loadTop(){
			this.ServerAPI.postAPI(this.API.userInfo,"",this.userInfo);
		},
		userInfo(success,data){
			if(success){
				if(data.code=='0000'){
					this.htmlALL = data.data.cash;
				}
			}
		},
		withdrawAll(){
			this.showLoading = true;
			this.ServerAPI.postAPI(this.API.gameWithdrawAll,'',this.gameWithdrawAll);
		},
		gameWithdrawAll(success,data){
			if(success){
				if(data.code=="0000"){
					this.showLoading = false
					Toast('操作成功')
					this.loadTop()
				}else{
					this.showLoading = false
					Toast(data.info)
				}
			}else{
				this.showLoading = false
				Toast("网络错误，请重试")
			}
		},
		
		toPush(){
			let loginName = this.$refs.loginName.value;
			let cash = this.$refs.cash.value;
			let cashPassword = this.$refs.cashPassword.value;
			let markInfo = this.$refs.markInfo.value;
			
			if(this.isEmpty(loginName)){
				Toast("账号不能为空")
				return false
			}
			if(this.isEmpty(cash)){
				Toast("资金不能为空")
				return false
			}
			if(this.isEmpty(cashPassword)){
				Toast("资金密码不能为空")
				return false
			}
			
			this.params.loginName = loginName;
			this.params.cash = cash;
			this.params.cashPassword = cashPassword;
			this.params.markInfo = markInfo;
			this.ServerAPI.postAPI(this.API.member,this.params,this.member);
		},
		member(success,data){
			if(success){
				if(data.code=="0000"){
					Toast("操作成功")
                    sessionStorage.setItem('extend',2)
					this.$router.push('/tradeRecords')
				}else{
					Toast(data.info)
				}
			}else{
				Toast("网络错误，请重试")
			}
		}
	}
}
</script>

<style lang="scss" scoped>

.main-banlance {
	font-size: .2rem;
	color: #3677ff;
	line-height: .2rem;
}

input:disabled{
	background:#fff;
}
.address-fix{
	position:fixed;
	bottom:0;
	width:100%;
	background:#fff;
}

.membertransfer{
	width:100%;
	height:100%;
	background:#f7f8fa;
	.list-content {
		width: 94%;
		margin: .2rem auto 0;
		border-radius: .1rem;
		.list-l{
			padding:.1rem 0;
			border-bottom:1px solid #ececec;
			background:#fff;
		}
		.list-l:last-child {
			border: none;
		}
	}
	.list-tip{
		display:flex;
		width:100%;
		padding:0 .3rem .1rem;
		div{
			flex:.3;
			
		}
		.tisp-text{
			flex:1;
			color:#f31a4d;
		}
	}
	.submitBtn{
		margin:1rem auto;
		width:70%;
	}
}
.warnText{
	font-size:.22rem;
	color:#aebad5;
	text-align:center;
	height:.62rem;
	line-height:.62rem
}
.main{
	width:100%;
	margin:.2rem 0 0rem;
	.list{
		display:flex;
		padding:.2rem .1rem;
		align-items:center;
		.text{
			flex:.3;
			font-size: .23rem;
		}
		div{
			flex:1;
			font-size:.3rem;
			color:#3b556e;
			display:flex;
			justify-content:space-between;
			align-items:center;
			input{
				border:0 none;
				width:100%;
				text-align: right;
				font-size: .23rem;
			}
			img{
				width:.12rem;
				height:.22rem;
			}
		}
	}
}
.transt-list{
	background: #FFFFFF;
	width:94%;
	margin: 0 auto;
	height:.8rem;
	display:flex;
	padding:.2rem .1rem;
	justify-content:space-between;
	border-radius: .08rem;
	font-size: .23rem;
	align-items: center;
	.tlog {
        display: flex;
        align-items: center;
		.tlog-img {
			height: .35rem;
		}
	}
	.tback {
		width: 20%;
		height: .5rem;
		line-height: .5rem;
		text-align: center;
		background: linear-gradient(to right, #20a4ff, #067dff);
		color: #FFFFFF;
		border-radius: .04rem;
	}
}
.reminds {
	width:94%;
	margin: .3rem auto 0;
	font-size: .2rem;
	color: #757575;
}

.submitBlue {
	width: 70%;
	margin: .4rem auto 0;
}
.loading-new {
	position: fixed;
	top: 30%;
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
