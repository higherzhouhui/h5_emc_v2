<template>
<div>
	<div class="login_inp" v-if="hasBtn">
      	<div class="log" :class="imgSrc"></div>
      	<input 
			class="text-input"
			:type="inputType"
			:placeholder="inputPlaceholder"
			ref="input"
			:disabled="disable"
			:value="currentValue"
			:pattern="isReg"
			:maxlength="maxLength"
			@input="handleInput"
			@click.stop
		/>
      	<button class="btn" @click="MessageTime($event)" :disabled="disableBtn">{{btnContent}}</button>
     </div>
	<div class="login_inp" v-else>
      	 <div class="log" :class="imgSrc"></div>
      	<input 
			class="text-input"
			:type="inputType"
			:placeholder="inputPlaceholder"
			ref="input"
			:disabled="disable"
			:value="currentValue"
			:pattern="isReg"
			:maxlength="maxLength"
			@input="handleInput"
			@click.stop
		/>
     </div>
</div>
    
</template>

<script>
export default {
    name:'list',
   props: {	
   			btnContent:{
   				type:String,
   				default:'发送验证码',
   			},
   			disableBtn:{
   				type:Boolean,
   				default:false,
   			},
   			hasBtn:{
   				type:Boolean,
   				default:false,
   			},
   			imgSrc:{
   				type:String,
   				default:'use',
   			},

			inputClass: {
				type: String,
				default: '',
			},
			selectFunc: {
				type: Function,
				default: ()=>{}
			},
			MessageTime: {
				type: Function,
				default: () => {}
			},
			disable: {
				type: Boolean,
				default: false
			},
			maxLength: {
				type: Number,
				default: null
			},
			inputType: {
				type: String,
				default: 'text'
			},
			inputPlaceholder: {
				type: String,
				default: ''
			},
			isReg:{
				type: String,
				default: ''
			},
			currentValue:{
				type: String,
				default: ''
			},
			handleInput: {
				type: Function,
				default: () => {}
			},
			// inputId:{
			// 	type:String,
			// 	default:null,
			// },
			// inputValue: {
			// 	type: String,
			// 	default: null
			// },
			// inputTitle: {
			// 	type: String,
			// 	default: ''
			// },


			// getInputVal: {
			// 	type: Function,
			// 	default: () => {}
			// },
		
			// showFloat: {
			// 	type: Boolean,
			// 	default: false
			// },
			// disableClear: {
			// 	type: Boolean,
			// 	default:false
			// },

			// clearRight:{
			// 	type: String,
			// 	default: '0'
			// }
		},
    data(){
        return{
            
        }
    },
    watch: {
		    disableBtn: function(val) {
			    this.disableBtn = val;
		    },

		    // currentValue(val) {
		    //   this.$emit('input', val);
		    // },
		},
    methods:{
       value1(){
       	return this.$refs.input.value;
       }
    }
}
</script>

<style lang="scss" scoped>
.login_inp{
	width: 100%;
	display: flex;
	justify-content: center;
	position: relative;
		input{
		width: 4.8rem;
		height:.6rem;
		font-size: .28rem;
		background: transparent;
		border: 0 none;
		color:#fefefe;
		border-bottom: 1px solid #849dc9;
		padding: .3rem 0 ;
	}
	.log{
		display:inline-block;
	}
	.use{
		width: .29rem;
		height: .29rem;
		margin:0.15rem .3rem 0 0;
		background:url('../../assets/images/login_user.png');
		background-size:cover;

	}
	input{
		font-size:.28rem;
	}
	input::placeholder{
		color:#8aa3cd;
		font-size:.28rem;
	}
	.btn{
			outline: 0 none;
			border: 1px solid #96acd6;
			font-size: .22rem;
			color: #96acd6;
			width: 1.5rem;
			height: .5rem;
			border-radius: .1rem;
			background: transparent;
			position:absolute;
			right:1.1rem;
	}
}

</style>

