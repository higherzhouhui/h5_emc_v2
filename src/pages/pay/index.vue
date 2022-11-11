<template>
	<div class="recharge">
		<HeaderTop :title="`支付方式`" :hasright="true" rightText="联系客服" :routeFuc="toHelp"></HeaderTop>
		<div class="recharge-pad">
			<div class="recharge-list">
				<div class="list-one" v-for="(v,k) in data" :key="k" @click="depositOnline(v.payName,v.payId,v.payType,v.explain)">
					<div class="img-bg">
						<img :src='v.payImage' alt="">
					</div>
					<div class="list-right">
						<p>{{ v.payName }}</p>
						<p>限{{ v.cashMin }}-{{ v.cashMax }}元</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import HeaderTop from '../../components/top/top'
import {Toast} from 'vant';

export default {
	name: 'payIndex',
	components: {
		HeaderTop
	},
	data () {
		return {
			index: 0,
			data: [],
			alipayx: false,
			alipay: true
		}
	},
	mounted () {
		this.loadTop()
	},
	methods: {
		toHelp(){
			this.$router.push('/help2')
		},
		loadTop () {
			let params = {
				visitType: 'APP',
				version:this.API.paramVersion,
				appNumber: '3.4.0',
			}
			this.ServerAPI.postAPI(this.API.depositList, params, this.depositList)
		},
		depositList (success, data) {
			if (success) {
				if (data.code == '0000') {
					this.data = data.data
					for (var i = 0; i < this.data.length; i++) {
						this.data[i].index = i
						sessionStorage.setItem('payId', this.data[i].payId)
						sessionStorage.setItem('cashMin', this.data[i].cashMin)
						sessionStorage.setItem('cashMax', this.data[i].cashMax)
					}
				}
			}
		},
		depositOnline (title, payId, payType,explain) {
			if (payType == 'Alipay') {
				this.$router.push('/alipay')
			} else if (payType === 'Bank') {
				sessionStorage.setItem('cashMin', this.data[0].cashMin)
				sessionStorage.setItem('cashMax', this.data[0].cashMax)
				sessionStorage.setItem('payId', 1)
				this.$router.push('/transfer')
			} else if (payId === 3) {
				sessionStorage.setItem('payId', payId)
				sessionStorage.setItem('explain', explain)
				this.$router.push('/virtualCoinRecharge')
			}else if (payId === 4){
				sessionStorage.setItem('payId', payId)
				sessionStorage.setItem('explain', explain)
				this.$router.push('/virtualCoinRechargeTrc20')
			}
			else {
				sessionStorage.setItem('title', title)
				sessionStorage.setItem('payId', payId)
				sessionStorage.setItem('payType', payType)
				this.$router.push('/deposit/online')
			}
		},
		toPush (url) {
			this.$router.push('/' + url)
		},
		toRechargeHistory () {
			this.$router.push('/rechargeHistory')
		},
		toIndex () {
			this.$router.push('/')
		}
	}
}
</script>
<style lang="scss" scoped>
.recharge {
	width: 100%;
	height: 100%;
	background: #edeff2;
	
	.recharge-pad {
		width: 100%;
		padding: .2rem 0 0;
		background: #edeff2;
	}
	
	.recharge-list {
		width: 100%;
		display: flex;
		justify-content: start;
		/*padding: .1rem;*/
		flex-wrap: wrap;
		
		.list-one {
			width: 45%;
			height: 1.3rem;
			background: #fff;
			display: flex;
			/*flex-direction:column;*/
			justify-content: center;
			align-items: center;
			margin: .05rem 0 .2rem 3.33%;
			border-radius: .08rem;
			
			.img-bg {
				width: .8rem;
				height: .8rem;
				background: #f3f5f7;
				line-height: .7rem;
				text-align: center;
				border-radius: 50%;
				
				img {
					width: .5rem;
					height: .5rem;
				}
			}
			
			.list-right {
				height: 55%;
				margin-left: .2rem;
				
				p:first-child {
					font-size: .26rem;
					font-weight: bold;
					color: #171F28;
				}
				
				p:last-child {
					font-size: .2rem;
					color: #757F8B;
				}
			}
		}
	}
}
</style>
