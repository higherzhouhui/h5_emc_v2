<template>
	<div class="adressPage">
		<HeaderTop :title="`收货地址`"></HeaderTop>
		<div class="main">
			<div class="list-l" @click="showAddressSelect(1)">
				<div class="list">
					<div class="text">省&emsp;&emsp;份:</div>
					<div>
                        <input type="text" placeholder="请选择省份" disabled="true" :value="sheng" ref="province">
                        <!-- <img src="../../../static/images/forget-icon.png" alt=""> -->
                        <van-icon name="arrow" />
                    </div>
				</div>
			</div>
			<div class="list-l" @click="showAddressSelect(2)">
				<div class="list">
					<div class="text">城&emsp;&emsp;市:</div>
					<div>
                        <input type="text" placeholder="请选择城市" disabled="true" :value="shi" ref="city">
                        <!-- <img src="../../../static/images/forget-icon.png" alt=""> -->
                        <van-icon name="arrow" />
                    </div>
				</div>
			</div>
			<div class="list-l">
				<div class="list">
					<div class="text">详细地址:</div>
					<div>
                        <input type="text" placeholder="请填写真实地址，用于接收活动礼物" ref="addressDetails">
                    </div>
				</div>
			</div>
			<div class="list-l">
				<div class="list">
					<div class="text">邮&emsp;&emsp;编:</div>
					<div>
                        <input type="number" oninput="if(value.length>6)value=value.slice(0,6)" placeholder="请填写邮政编码"
					            ref="mailbox">
                    </div>
				</div>
			</div>
			<div class="submitBlue">
				<div class="btnCover" @click="toPush()">提交</div>
			</div>
		</div>
        <van-popup class="popup-content" v-model="showProData" position="bottom">
            <van-picker show-toolbar :columns="provinceData" :title="'请选择省份'" @confirm="closeSelectPro" @cancel="showProData = false" swipe-duration='1000'/>
		</van-popup>
        <van-popup class="popup-content" v-model="showCitiesData" position="bottom">
            <van-picker show-toolbar :columns="citiesData" :title="'请选择城市'" @confirm="closeSelectCities" @cancel="showCitiesData = false" swipe-duration='1000'/>
		</van-popup>
	</div>
</template>
<script>
import HeaderTop from '../../components/top/top';
import addr from '../../assets/address.json';
import MuSubmit from '../../components/submit/muSubmit';
import {Toast} from 'vant';

export default {
	name: 'adressPage',
	components: {
		HeaderTop,
		MuSubmit,
	},
	data() {
		return {
			params: {},
			bankData: "",
			showCitiesData: false,
			showProData: false,
			sheng: '',
			shi: '',
			submitCheck: false,
            provinceData:[],
            citiesData:[],
		}
	},

	mounted() {
		this.loadTop();
        addr.forEach( item => {
            this.provinceData.push(item.name)
        })
	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
	methods: {
		loadTop() {
			let params = {
				version: this.API.paramVersion
			}
			this.ServerAPI.postAPI(this.API.userInfo, params, this.userInfo);
		},
		userInfo(success, data) {
			if (success) {
				if (data.code == '0000') {
					this.$refs.province.value = data.data.addressMap.province
					this.$refs.city.value = data.data.addressMap.city
					this.$refs.addressDetails.value = data.data.addressMap.addressDetails
					this.$refs.mailbox.value = data.data.addressMap.mailbox
				}
			}
		},
		toPush() {
			let province = this.$refs.province.value;
			let city = this.$refs.city.value;
			let addressDetails = this.$refs.addressDetails.value;
			let mailbox = this.$refs.mailbox.value;
			if (province === '请选择省份' || province === '') {
                Toast("请选择省份");
				return false;
			}
			if (city === '请选择城市' || province === '') {
                Toast("请选择城市");
				return false;
			}
			if (this.isEmpty(addressDetails)) {
                Toast("请输入详细地址");
				return false;
			}
			if (this.isEmpty(mailbox)) {
                Toast("请输入邮编");
				return false;
			}
			this.params.province = province;
			this.params.city = city;
			this.params.addressDetails = addressDetails;
			this.params.mailbox = mailbox;
			this.params.version = this.API.paramVersion;
			this.ServerAPI.postAPI(this.API.adressSub, this.params, this.adressSub);
		},
		adressSub(success, data) {
			if (success) {
				if (data.code == "0000") {
					Toast("成功");
                    this.$router.push('/userInfo')
				} else {
					Toast(data.info);
				}
			} else {
				Toast("网络错误，请重试");
			}
		},
		obtainAdd(id, va) {
			if (id == 1) {
				this.showProData = false;
			} else {
				this.showCitiesData = false;
			}
		},
        closeSelectPro(value,index){
            if(this.sheng === value){
                this.showProData = false
            }else{
                this.sheng = value
                this.citiesData = []
                addr[index].cities.forEach( item => {
                    this.citiesData.push(item.name)
                })
                this.shi = '请选择城市'
                this.showProData = false
            }
        },
        closeSelectCities(value,index){
            this.shi = value
            this.showCitiesData = false
        },
		showAddressSelect(id) {
			if (id == 1) {
				this.showProData = true;
			} else {
                console.log(this.sheng)
                if(this.sheng === ''){
                    Toast("请选择省份");
				    return false;
                }else{
	                this.showCitiesData = true;
                }
			}
		},
	}
}
</script>

<style lang="scss" scoped>
div, p, span {
	font-family: PingFang-SC-Medium;
	color: #2D343E;
}

.select {
	width: 100;
	height: 100;
	background: rgba(0, 0, 0, .5);
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	
	.sle-mian {
		position: absolute;
		top: 30%;
		right: 0;
		left: 0;
		width: 90%;
		margin: 0 5%;
		border-radius: .1rem;
		overflow: hidden;
		
		.bankSlot {
			background: #f1f3f5;
		}
	}
	
	.select-title,
	.select-bottom {
		height: .7rem;
		line-height: .7rem;
		text-align: center;
		background: #FFFFFF;
		
		div {
			font-size: .25rem;
			color: #252525
		}
		
		.sle {
			font-size: .25rem
		}
	}
	
	.select-bottom {
		background: #057BFF;
		color: #FFFFFF;
	}
}

input:disabled {
	background: #fff;
}

.address-yar {
	width: 70%;
	border-radius: .3rem;
	.address-fix {
		.tip, .commit {
			font-size: .25rem;
			height: .7rem;
			line-height: .7rem;
		}
		
		.tip {
			background: #FFFFFF;
		}
		
		div {
			flex: 1;
			text-align: center;
			color: #252525;
			background: #f1f3f5;
		}
		
		.commit {
			color: #ffffff;
			background: #3677FF;
		}
	}

}

.adressPage {
	width: 100%;
	height: 100%;
	background: #FFFFFF;
	
	.list-l {
		padding: .1rem 0;
		border-bottom: 1px solid #ececec;
		background: #fff;
		margin-bottom: .2rem;
	}
	
	.list-tip {
		display: flex;
		width: 100%;
		padding: 0 .3rem .1rem;
		
		div {
			flex: .3;
			
		}
		
		.tisp-text {
			flex: 1;
			color: #f31a4d;
		}
	}
	
	.submitBtn {
		margin: .6rem auto;
		width: 100%;
	}
}

.main {
	width: 100%;
	margin: .2rem auto 0;
	border-radius: .1rem;
	overflow: hidden;
	
	.list {
		display: flex;
		
		padding: .2rem .3rem;
		align-items: center;
		
		
		.text {
			flex: .3;
			color: #171F28;
		}
		
		div {
			flex: 1;
			font-size: .25rem;
			color: #a3a3a3;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			input {
				border: 0 none;
				width: 100%;
			}
			
			img {
				width: .12rem;
				height: .22rem;
			}
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
		margin-top: .8rem;
		border: none;
		border-radius: .45rem;
		font-weight: bold;
	}
}

.picker-selected {
	color: #3677FF !important;
}

.submitBlue .mu-submit .mu-raised-button {
	background: #3677FF !important;
}

</style>
