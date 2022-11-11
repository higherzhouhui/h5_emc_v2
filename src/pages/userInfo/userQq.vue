<template>
	<div class="revisePhone">
		<HeaderTop :title="`QQ信息`"></HeaderTop>
		<div class="revise-account">
			<div class="revise-account-input"><input type="text" :value="value" ref="qq" placeholder="请输入QQ"></div>
		</div>
		<div class="submitBlue">
			<div class="btnCover" @click="toPush()">完成</div>
		</div>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top';
import MuSubmit from '../../components/submit/muSubmit'
import {Toast} from "vant";
export default {
	name:'revisePhone',
	components:{
		HeaderTop,
		MuSubmit,
	},
	data(){
		return{
			value:""
		}
	},
	mounted(){
		this.loadTop();
		
	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
	methods: {
		loadTop() {
			this.ServerAPI.postAPI(this.API.userInfo,"",this.userInfo)
		},
		userInfo(success,data){
			if(success){
				if(data.code=='0000'){
					this.value=data.data.qq;
				}
			}
		},
		toPush(){
			let params = {
				qq: this.$refs.qq.value
			}
			if(this.isEmpty(params.qq)){
				Toast('QQ号码不能为空');
				return false;
			}
			this.ServerAPI.postAPI(this.API.editUserInfo, params, (success, data) => {
				if (success) {
					if (data.code == '0000') {
						Toast('提交成功');
						this.$router.push('/userInfo');
					} else {
						Toast(data.info);
					}
				} else {
					Toast('网络错误，请重试');
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.revisePhone{
	width:100%;
	height:100%;
	background:#f7f8fa;
	.revise-account{
		margin:.5rem auto;
		padding:0 .3rem;
		width:94%;
		background:#fff;
		height:1rem;
		display:flex;
		justify-content: space-between;
		align-items:center;
		border-radius: .08rem;
		.revise-account-input{
			input{
				width:4rem;
				border:0 none;
				font-size:.27rem;
				color:#3b556e;
			}
		}
	}
	.or-btn{
		width:70%;
		margin:1rem auto 0;
	}
}
.submitBlue {
	width: 70%;
	margin: 0 auto;
	
	.btnCover {
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		color: #FFFFFF;
		text-align: center;
		background: linear-gradient(90deg,#20a4ff,#067dff);
		margin-top: .6rem;
		border: none;
		border-radius: .45rem;
	}
}
</style>
