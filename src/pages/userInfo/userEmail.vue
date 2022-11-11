<template>
	<div class="revisePhone">
		<HeaderTop :title="title" ></HeaderTop>
        <div class="topP">
			<div class="pw-banner">
				<div class="revise-account-input-left">原邮箱</div>
				<div class="revise-account-input-box">
					<input type="text" ref="userMail" placeholder="请输入原邮箱地址">
				</div>
			</div>
			<div class="pw-banner">
				<div class="left-align">
					<input maxlength="6" oninput='if(value.length>6)value=value.slice(0,6)' type="number" ref="code" placeholder="请输入验证码">
				</div>
				<div class="send-code" @click="sendMail()">获取验证码</div>
			</div>
			<div class="bottom-btn-box">
				<van-button class="bottom-btn" round type="info" color="#0895FE" block
				            @click="toPush()">提交
				</van-button>
			</div>
		</div>
	</div>

</template>

<script>
import HeaderTop from '../../components/top/top';
import MuSubmit from '../../components/submit/muSubmit';
import ListPswd from '../../components/inputList/list';
import {Toast} from 'vant';
export default {
	name:'revisePhone',
	components:{
		HeaderTop,
		ListPswd,
		MuSubmit
	},
	data(){
		return{
			data:[
				{text:'验证原邮箱',placeholder:'请输入原邮箱地址'},
				{text:'验证码',placeholder:'请输入验证码',hasBtn:true,func:this.sendMail},
			],
			title:'验证原邮箱',
			btnText:'提交',
			showModel:false,
		}
	},
	mounted(){
	},
	methods:{
		sendMail(e){
			let time=60;
			if(time==60){
				let params = {
					email: this.$refs.userMail.value,
					type: "check",
					version: this.API.paramVersion,
				};
				if (this.isEmpty(params.email)) {
					Toast("请输入原邮箱地址");
					return false;
				}
				this.ServerAPI.postAPI(this.API.sendMail, params, (success, data) => {
					if(success){
						if(data.code=='0000'){
							Toast("验证码发送成功");
							e.target.disabled = true;
							let timer;
							timer = setInterval(() => {
								time--;
								if (time > 0) {
									e.target.disabled = true;
									e.target.innerHTML = time + "s";
								} else if (time == 0) {
									clearTimeout(timer)
									e.target.disabled = false;
									e.target.innerText = '重新发送';
									
								}
							}, 1000)
						}else{
							Toast(data.info);
						}
					}else{
						Toast( "网络错误，请重试");
					}
				});
			}
		},
		toPush(){
			let params = {
				email: this.$refs.userMail.value,
				vcode: this.$refs.code.value,
				type: "check",
				version: this.API.paramVersion,
			};
			if (this.isEmpty(params.email)) {
				Toast("请输入邮箱地址");
				return false;
			}
			if (this.isEmpty(params.vcode)) {
				Toast("请输入验证码");
				return false;
			}
			this.ServerAPI.postAPI(this.API.checkMail, params, (success, data) => {
				if(success){
					if(data.code=='0000'){
						this.$router.push('/reviseMail2');
					}else{
						Toast(data.info);
					}
				}else{
					Toast("网络错误，请重试");
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.revisePhone{
	width:100%;
	height:100%;
	background:#edeff2;
	.topP {
		margin: .2rem 0 0;
		padding: 0 .3rem;
		.pw-banner {
			width: 100%;
			height: 1rem;
			border-radius: .07rem;
			background: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 .3rem;
			margin-bottom: .2rem;
            .revise-account-input-left {
                width: 1.8rem;
            }
			.revise-account-input-box {
                width: calc(100% - 2rem);
				display: flex;
				justify-content: flex-end;
				align-items: center;
				input {
                    width: 100%;
					border: 0 none;
					font-size: .28rem;
					color: #191D2A;
					text-align: right;
					// width: 2rem;
				}
				.clickDel {
					width: .3rem;
					height: .3rem;
					background: url("../../../static/images/click-delet.png") no-repeat;
					background-size: 100% 100%;
					margin-left: .15rem;
				}
			}
			.left-align {
				width: 2rem;
				input{
					width: 100%;
					border: 0 none;
					font-size: .28rem;
				}
			}
			.send-code {
				font-size: .24rem;
				padding: .08rem .2rem;
				border-radius: .08rem;
				color: #1989fa;
				border: #1989fa 1px solid;
			}
		}
		.bottom-btn-box {
			width: 70%;
			margin: .4rem auto 0;
		}
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
