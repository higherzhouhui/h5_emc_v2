<template>

		<div class="online-list">
			<div class="money">{{text}}</div>
			<div class="money-inout">
				<input :type="inputType" :placeholder="phd" ref="input" :class="inputClass" :maxlength="mlth"><span v-if="showY">元</span>
				<p v-if="tips">{{tipsText}}</p>
			</div>

		</div>




</template>

<script>
export default {
	name:'online-list',
	props:{
		text:{
			type:String,
			default:'充值金额'
		},
		tips:{
			type:Boolean,
			default:false
		},
		tipsText:{
			type:String,
			default:'单笔最少2元'
		},
		inputType:{
			type:String,
			default:'text'
		},
		phd:{
			type:String,
			default:'请输入金额'
		},
		inputClass:{
			type:String,
			default:''
		},
		mlth:{
			type:Number,
			default:1000
		},
		showY:{
			type:Boolean,
			default:true
		}
	},
	data(){
		return{

		}
	},
	beforeCreate(){
    },
	methods:{
		value1(){
       		return this.$refs.input.value;
       	}
	},
}
</script>

<style lang="scss" scoped>
.online-list{
	width:100%;
	display:flex;
	justify-content:space-between;
	padding:.3rem .3rem;
	border-bottom:1px solid #e8ebf0;
	.money{
		font-size:.25rem;
	}
	.money-inout{
		/*text-align:right;*/
    margin: 0!important;

    input{
			font-size:.2rem;
			width:80%;
			border:0 none;
			outline:0 none;
			text-align:right;
			margin:0 .1rem 0 0;
      color: #70798d;
      background: none;
		}
		input::placeholder{
			color:#9fa6aa
		}
		margin:0 0 .1rem 0;
		p{
			font-size:.24rem;
			color:#f31a4d
		}
	}

}

</style>
