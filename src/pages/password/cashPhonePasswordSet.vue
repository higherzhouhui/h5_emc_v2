<template>
	<div class="pswdSet">
		<div class="index999" v-if="showTip"></div>
		<HeaderTop :title="`设置取款密码`"></HeaderTop>
		<div class="topP">
			<div class="pw-banner" v-for="(v,k) in data">
				<ListPswd :inputType='v.inputType' ref="reInput" :hasBtn='v.hasBtn' :bannerText="v.text"
				          :inputPlaceholder="v.placeholder"></ListPswd>
				<!--                <div v-if="v.prompt" class="pssetText">6位字母，数字，字符组成，区分大小写</div>-->
			</div>
			<div class="submitBlue">
				<div class="btnCover" @click="commitPassword()">提交</div>
			</div>
			
		</div>
	
	</div>

</template>

<script>
import ListPswd from '../../components/inputList/list';
import Submit from '../../components/submit/submit';
import HeaderTop from '../../components/top/top'
import MuSubmit from '../../components/submit/muSubmit';
import {Toast} from 'vant';

export default {
	name: 'pswdSet',
	components: {
		ListPswd,
		Submit,
		HeaderTop,
		MuSubmit,
	},
	data() {
		return {
			data: [
				{text: '新密码', placeholder: '请输入新取款密码', prompt: true, inputType: "password"},
				{text: '确认密码', placeholder: '请再次输入新取款密码', prompt: false, inputType: "password"},
			],
			showTip: false,
		}
	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
	methods: {
		commitPassword() {
			let params = {
				password: this.$refs.reInput[0].value1(),
				qpassword: this.$refs.reInput[1].value1()
			};
			if (this.isEmpty(params.password)) {
				Toast("新密码不能为空");
				e.path[0].disabled = false;
				return false;
			}
			if (params.password != params.qpassword) {
				Toast("两次密码输入不相同");
				e.path[0].disabled = false;
				return false;
			}
			this.ServerAPI.postAPI(this.API.editCashPassword, params, (success, data) => {
				if (success) {
					if (data.code == '0000') {
						Toast("密码修改成功");
						this.$router.push('/userInfo');
					} else {
						Toast(data.info);
					}
				} else {
					Toast("网络错误，请重试");
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.pswdSet {
	width: 100%;
	height: 100%;
	background: #f7f8fa;
	
	.topP {
		margin: .2rem 0 0;
		
		.pssetText {
			font-size: .22rem;
			color: #aebad5;
			text-align: center;
			height: .62rem;
			line-height: .62rem
		}
	}
	
	.index999 {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		background: rgba(0, 0, 0, .5)
	}
}

.submitBlue {
	width: 70%;
	margin: .8rem auto 0;
	
	.btnCover {
		width: 60%;
		height: .8rem;
		line-height: .8rem;
		color: #FFFFFF;
		text-align: center;
		background: rgba(11, 98, 169, 0.8);
		border-radius: 1rem;
		border: none;
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
