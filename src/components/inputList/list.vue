<template>
	<div class="list">
		<div class="main" v-if="hasBtn">
			<div class="text">{{ bannerText }}</div>
			<div class="input">
				<input :type="inputType"
				       :placeholder="inputPlaceholder"
				       ref="input"
				       :disabled="disable"
				       :value="currentValue"
				       :pattern="isReg"
				       :maxlength="maxLength"
				       @input="handleInput"
				       @click.stop
				>
				<button @click="MessageTime($event)">{{ btnContent }}</button>
			</div>
		</div>
		<div class="main" v-else>
			<div class="text">{{ bannerText }}</div>
			<div class="input">
				<div class="input-tar">
					<input :type="inputType"
					       :placeholder="inputPlaceholder"
					       ref="input"
					       :disabled="disable"
					       :value="currentValue"
					       :pattern="isReg"
					       :maxlength="maxLength"
					       @input="handleInput"
					       @click.stop
					>
					<div v-if="false" class="input-tips">
					</div>
				</div>
			
			
			</div>
		</div>
	
	</div>

</template>

<script>
export default {
	name: 'relist',
	props: {
		MessageTime: {
			type: Function,
			default: () => {
			}
		},
		btnContent: {
			type: String,
			default: '获取验证码',
		},
		disableBtn: {
			type: Boolean,
			default: false,
		},
		hasBtn: {
			type: Boolean,
			default: false,
		},
		bannerText: {
			type: String,
			default: 'use',
		},
		
		inputClass: {
			type: String,
			default: '',
		},
		selectFunc: {
			type: Function,
			default: () => {
			}
		},
		MessageTime: {
			type: Function,
			default: () => {
			}
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
		isReg: {
			type: String,
			default: ''
		},
		currentValue: {
			type: String,
			default: ''
		},
		handleInput: {
			type: Function,
			default: () => {
			}
		},
		
	},
	data() {
		return {}
	},
	methods: {
		value1() {
			return this.$refs.input.value;
		}
	}
}
</script>

<style lang="scss" scoped>
.list {
	.main {
		background: #fff;
		width: 86%;
		display: flex;
		padding: 0 .1rem 0;
		margin: 0 auto .2rem;
		border-bottom: #D8E0E8 1px solid;
		border-radius: .1rem;
		
		.text {
			width: 2rem;
			height: 100%;
			line-height: 1.05rem;
			color: #000000;
			font-size: .26rem;
			
		}
		
		.input {
			width: 6rem;
			
			.input-tar {
				width: 100%;
				height: 100%;
				
				.input-tips {
					font-size: .24rem;
					padding: 0 0 .2rem 0;
					color: #f04241;
				}
			}
			
			input {
				// float:left;
				width: 3rem;
				outline: 0 none;
				border: 0 none;
				height: .5rem;
				font-size: .26rem;
				padding: .5rem 0 .3rem;
			}
			
			button {
				outline: 0 none;
				height: .5rem;
				width: 1.6rem;
				font-size: .2rem;
				border: #3677ff 1px solid;
				color: #3677ff;
				float: right;
				margin: .24rem 0;
				background: #FFFFFF;
				border-radius: .08rem;
			}
		}
	}
}

</style>
