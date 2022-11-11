<template>
	<van-button class="button-content" round color="linear-gradient(90deg, #20a4ff, #067dff)" block @click="buttonFn" :disabled="btnDisabled">{{buttonText}}</van-button>
</template>

<script>
export default {
	name: 'button',
	props: {
		buttonText: {
			type: String,
			default: ""
		},
		btnDisabled:{
			type:Boolean,
			default:false
		},
		buttonFn: {
			type: Function,
			default: () => { }
		},
	},
	data() {
		return {
		
		}
	},
	methods: {
	
	}
}
</script>

<style lang="scss" scoped>
.button-content {
	width: 80%;
	margin: .8rem auto 0;
	height: .8rem;
	line-height: .8rem;
	//color: #FFFFFF;
	//text-align: center;
	//background: #ED3A3A;
	//border: none;
	//border-radius: .45rem;
	font-weight: bold;
    font-size: .3rem;
}
</style>
