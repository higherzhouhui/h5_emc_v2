<template>
	<div class="revisePhone">
		<HeaderTop :title="`修改性别`"></HeaderTop>
		<div class="revise-account">
			<div class="revise-account-input sex-line">
				<van-icon v-if="maleChosed" name="checked" color="#1989fa" size=".35rem"/>
				<van-icon v-if="maleNoChosed" name="circle" color="#1989fa" size=".35rem" />
				<span class="sex-fonts" @click="tabSex()">男</span>
			</div>
		</div>
		<div class="revise-account">
			<div class="revise-account-input sex-line">
				<van-icon v-if="femaleChosed" name="checked" color="#1989fa" size=".35rem"/>
				<van-icon v-if="femaleNoChosed" name="circle" color="#1989fa" size=".35rem" />
				<span class="sex-fonts" @click="tabSex2()">女</span>
			</div>
		</div>
		<div class="bottom-btn-box">
			<van-button class="bottom-btn" round type="info" color="#0895FE" block
			            @click="toPush">提交
			</van-button>
		</div>
	</div>

</template>

<script>
import HeaderTop from '../../components/top/top'
import {Toast} from 'vant'

export default {
	name: 'userSex',
	components: {
		HeaderTop,
	},
	data() {
		return {
			value: "",
			rightText: '保存',
			hasInput: false,
			maleChosed: false,
			maleNoChosed: false,
			femaleChosed: false,
			femaleNoChosed: false,
			genderChosed: '',
			radio: '1',
		}
	},
	mounted() {
		this.loadTop();
		
	},
	// beforeRouteLeave (to, from, next) {    // 销毁组件，避免通过vue-router再次进入时，仍是上次的history缓存的状态
	//   this.$router.push('/userInfo');
	//   next()
	// },
	methods: {
		loadTop() {
			let params = {
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.userInfo, params, this.userInfo)
		},
		userInfo(success, data) {
			if (success) {
				if (data.code == '0000') {
					if (data.data.gender == null) {
						this.maleNoChosed = true;
						this.femaleNoChosed = true;
					} else if (data.data.gender === 'M') {
						this.maleChosed = true;
						this.femaleNoChosed = true;
					} else if (data.data.gender === 'F') {
						this.femaleChosed = true;
						this.maleNoChosed = true;
					}
				}
			}
		},
		tabSex() {
			if (this.maleChosed == false) {
				this.maleChosed = true;
				this.maleNoChosed = false;
				this.femaleChosed = false;
				this.femaleNoChosed = true;
			}
			this.genderChosed = 'M';
		},
		tabSex2() {
			if (this.femaleChosed == false) {
				this.femaleChosed = true;
				this.femaleNoChosed = false;
				this.maleChosed = false;
				this.maleNoChosed = true;
			}
			this.genderChosed = 'F';
		},
		toPush() {
			let params = {
				gender: this.genderChosed,
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.editUserInfo, params, (success, data) => {
				if (success) {
					if (data.code == '0000') {
						Toast("修改成功");
						this.$router.replace('/userInfo')
					} else {
						Toast(data.info);
					}
				} else {
					Toast("网络错误，请重试");
				}
			})
		},
	}
}
</script>

<style lang="scss" scoped>
.revisePhone {
	width: 100%;
	height: 100%;
	background: #FFFFFF;
	
	.revise-account {
		margin: 0 auto;
		padding: 0 .3rem;
		width: 100%;
		background: #fff;
		height: 1.2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: .08rem;
		border-bottom: #E1E0E9 1px solid;
		
		.revise-account-input {
			width: 100%;
			display: flex;
			justify-content: start;
			align-items: center;
			
			input {
				width: 4rem;
				border: 0 none;
				font-size: .28rem;
				color: #191D2A;
			}
			
			.clickDel {
				width: .3rem;
				height: .3rem;
				background: url("../../../static/images/click-delet.png") no-repeat;
				background-size: 100% 100%;
			}
		}
		
		.sex-line {
			span:last-child {
				font-size: .3rem;
				margin-left: .2rem;
			}
		}
	}
	.bottom-btn-box {
		margin: 0.6rem auto 0;
		width: 70%;
	}
	
	.or-btn {
		width: 70%;
		margin: 1rem auto 0;
	}
}
</style>
