<template>
	<div class="addbankCard2">
		<HeaderTop :title="`添加银行卡`"></HeaderTop>
        <!-- <div class="main" v-if='step1'>
            <div class="content-list flex-b">
                <div class="content-list-left">真实姓名</div>
				<div class="content-list-right">
					<input type="text" maxlength="16" placeholder="请输入真实姓名" ref="realName" @input='checkStep1()'>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">手机号码</div>
				<div class="content-list-right">
					<input type="number" maxlength="11" placeholder="请输入绑定的手机号码" ref="phone" oninput="if(value.length>11)value=value.slice(0,11)" @input='checkStep1()'>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">验证码</div>
				<div class="content-list-right flex-b">
					<input class='code-input' type="number" maxlength="4" placeholder="请输入验证码" ref="code" oninput="if(value.length>4)value=value.slice(0,4)" @input='checkStep1()'>
                    <button class='code-btn' @click="sendMessage($event)">发送验证码</button>
				</div>
			</div>
            <div class="submitBlue">
                <van-button class="btnCover" round type="info" @click="toNext()" :disabled="inputStatus">下一步</van-button>
			</div>
        </div> -->
		<!-- <div class="main" v-if='step2'> -->
		<div class="main">
            <div class="name-remind flex-b">
                <van-icon name="warning" color="#FFBA4C" class='top-reminds-icon'/>
                注：为了您的资金能够迅速到账，请确姓名与银行卡的开户姓名一致。
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">姓名</div>
				<div class="content-list-right">{{ realName }}</div>
			</div>
            <div class="content-list content-list2">
                <div class="content-list-title">所属银行</div>
				<div class="content-list-chose flex-b" @click="showSelectFuc()" :class="showBank !== '请选择开户银行'?'black':''">
					{{ showBank }}
                    <van-icon name="arrow-down" class='right-icon bold'/>
				</div>
                <div class="content-list-side-box flex-b">
                    <div class="content-list-side">
                        <div class="content-list-title">开户省份</div>
                        <div class="content-list-side-50 flex-b" @click="showAddressSelect(1)" :class="sheng !== '请选择省份'?'black':''">
                            {{ sheng }}
                            <van-icon name="arrow-down" class='right-icon bold'/>
                        </div>
                    </div>
                    <div class="content-list-side">
                        <div class="content-list-title">开户城市</div>
                        <div class="content-list-side-50 flex-b" @click="showAddressSelect(2)" :class="shi !== '请选择城市'?'black':''">
                            {{ shi }}
                            <van-icon name="arrow-down" class='right-icon bold'/>
                        </div>
                    </div>
                </div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">开户支行</div>
                <div class="content-list-right">
                    <input type="text" maxlength="30" placeholder="请输入开户支行" ref="bankAddress" @input='checkStep2()'>
                </div>
            </div>
            <div class="content-list flex-b">
                <div class="content-list-left">银行卡号</div>
				<div class="content-list-right">
					<input type="text" maxlength="19" placeholder="请输入银行卡号" oninput="value=value.replace(/[^\d]/g,'')" ref="cardNumber" @input='checkStep2()'>
				</div>
			</div>
            <div class="content-list flex-b">
                <div class="content-list-left">确认卡号</div>
				<div class="content-list-right">
					<input type="text" maxlength="19" placeholder="请再次输入银行卡号" oninput="value=value.replace(/[^\d]/g,'')" ref="rcardNumber" @input='checkStep2()'>
				</div>
			</div>
			<div class="submitBlue">
                <van-button class="btnCover" round type="info" @click="toPush()" :disabled="inputStatus2">完成</van-button>
			</div>
		</div>
        <van-popup class="popup-content" v-model="showSelect" position="bottom">
            <van-picker show-toolbar :columns="bankListShow" :title="'请选择银行'" @confirm="closeSelect" @cancel="showSelect = false" swipe-duration='1000'/>
		</van-popup>
        <van-popup class="popup-content" v-model="showProData" position="bottom">
            <van-picker show-toolbar :columns="provinceData" :title="'请选择省份'" @confirm="closeSelectPro" @cancel="showProData = false" swipe-duration='1000'/>
		</van-popup>
        <van-popup class="popup-content" v-model="showCitiesData" position="bottom">
            <van-picker show-toolbar :columns="citiesData" :title="'请选择城市'" @confirm="closeSelectCities" @cancel="showCitiesData = false" swipe-duration='1000'/>
		</van-popup>
        <van-popup class="bank-error-pop flex-c" v-model="bankError">
            <img src="../../../static/images/popup-error-icon.png" alt="" class="error-icon">
            <div class="error-fonts">银行卡号格式不正确</div>
		</van-popup>
	</div>
</template>
<script>
import HeaderTop from '../../components/top/top';
import addr from '../../assets/address.json';
import MuSubmit from '../../components/submit/muSubmit';
import {Toast} from 'vant';

export default {
	name: 'addbankCard2',
	components: {
		HeaderTop,
		MuSubmit,
		Toast,
	},
	data() {
		return {
			realName: '',
			params: {},
            bankData: [],
            bankListShow:[],
            provinceData:[],
            citiesData:[],
			index: 0,
			showSelect: false,
			showBank: "请选择开户银行",
			sysBankId: 0,
			showCitiesData: false,
			showProData: false,
			sheng: '请选择省份',
			shi: '请选择城市',
			submitCheck: false,
			bankAddress: '',
			inputCheck:false,
			bankError:false,

            step1:true,
            step2:false,
            inputStatus:true,
            inputStatus2:true,
		}
	},
	mounted() {
		this.loadTop();
        addr.forEach( item => {
            this.provinceData.push(item.name)
        })
	},
	beforeRouteLeave (to, from, next) {
		this.$destroy(true)
		next()
	},
	methods: {
        toNext(){
            let params = {
				realName: this.$refs.realName.value,
				phone: this.$refs.phone.value,
				vcode: this.$refs.code.value,
				type: 'edit',
                version:this.API.paramVersion,
			}
			if (this.isEmpty(params.realName)) {
				Toast('请输入真实姓名');
				return false;
			}
			if (this.isEmpty(params.phone)) {
				Toast('请输入手机号码');
				return false;
			}
			if (this.isEmpty(params.phone)) {
				Toast('请输入验证码');
				return false;
			}
            this.realName = this.$refs.realName.value
            this.phone = this.$refs.phone.value
            this.code = this.$refs.code.value
            const toast = Toast.loading({
				duration: 0, // 持续展示 toast
				forbidClick: true,
				message: '验证码中'
			})
            this.ServerAPI.postAPI(this.API.checkFindMobile2, params, (success, data) => {
                Toast.clear()
				if (success) {
					if (data.code == '0000') {
						Toast('验证成功');
                        this.step1 = false
                        this.step2 = true
					} else {
						Toast(data.info);
					}
				} else {
					Toast('网络错误，请重试');
				}
			});
        },
        checkStep2(){
            if(this.$refs.bankAddress.value !== '' && this.$refs.cardNumber.value !== '' && this.$refs.rcardNumber.value !== '' && this.showBank !== '请选择开户银行' && this.sheng !== '请选择省份' && this.shi !== '请选择城市'){
                this.inputStatus2 = false
            }else{
                this.inputStatus2 = true
            }
        },
        checkStep1(){
            if(this.$refs.realName.value !== '' && this.$refs.phone.value !== '' && this.$refs.code.value !== ''){
                this.inputStatus = false
            }else{
                this.inputStatus = true
            }
        },
        sendMessage(e) {
            let params = {
				realName: this.$refs.realName.value,
				phone: this.$refs.phone.value,
				type: 'edit',
                version:this.API.paramVersion,
			};
			if (this.isEmpty(params.realName)) {
				Toast('请输入真实姓名');
				return false;
			}
			if (this.isEmpty(params.phone)) {
				Toast('请输入手机号码');
				return false;
			}
            const toast = Toast.loading({
				duration: 0, // 持续展示 toast
				forbidClick: true,
				message: '验证码发送中'
			})
			let time = 60;
			if (time == 60) {
				this.ServerAPI.postAPI(this.API.sendSms2, params, (success, data) => {
                    Toast.clear()
					if (success) {
						if (data.code == '0000') {
							Toast("短信发送成功");
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
						} else {
							Toast(data.info);
						}
					} else {
						Toast("网络错误，请重试");
					}
				});
			}
		},
		loadTop() {
			this.ServerAPI.postAPI(this.API.userInfo, "", this.userInfo);
			this.ServerAPI.postAPI(this.API.sysBankList, "", this.sysBankList);
            // if(sessionStorage.getItem('addPageIndex') === '1'){

            // }
		},
		userInfo(success, data) {
			if (success) {
				if (data.code == '0000') {
					this.realName = data.data.realName;
				}
			}
		},
		sysBankList(success, data) {
			if (success) {
				if (data.code == '0000') {
					this.bankData = data.data;
                    this.bankData.forEach( ele => {
                        this.bankListShow.push(ele.bankName)
                    }); 
				}
			}
		},
		toPush() {
			let realName = this.realName;
			let province = this.sheng;
			let city = this.shi;
			let cardNumber = this.$refs.cardNumber.value;
			let rcardNumber = this.$refs.rcardNumber.value;
			let bankAddress = this.$refs.bankAddress.value;
			let sysBankId = this.sysBankId;
			if (sysBankId < 1) {
				this.$toast("请选择银行",2)
				return false;
			}
			if ( this.sheng === '请选择省份') {
				this.$toast("请选择银行卡开户省份",2);
				return false;
			}
			if (this.shi === '请选择城市') {
				this.$toast("请选择银行卡开户城市",2);
				return false;
			}
			if (this.isEmpty(cardNumber)) {
				this.$toast("请输入银行卡号",2);
				return false;
			}
            var reg = new RegExp("^[0-9]*[1-9][0-9]*$");
            if(!reg.test(cardNumber) || cardNumber.length < 12){
                this.$toast("银行卡号格式不正确!",2);
                return false;
            }
			if (this.isEmpty(bankAddress)) {
				this.$toast("请输入开户支行",2);
				return false;
			}
            // if(cardNumber.trim().length < 12 || cardNumber.trim().length > 19){
            //     this.$toast("银行卡号格式不正确",2);
            //     return false;
            // }
			if (cardNumber != rcardNumber) {
				this.$toast("两次输入的银行卡号不相同",2);
				return false;
			}
			this.params.realName = realName;
			this.params.province = province;
			this.params.city = city;
			this.params.cardNumber = cardNumber;
			this.params.bankAddress = bankAddress;
			this.params.sysBankId = sysBankId;
			this.ServerAPI.postAPI(this.API.addBankData, this.params, this.addBankData);
		},
		addBankData(success, data) {
			if (success) {
				if (data.code == "0000") {
					Toast("添加成功")
                    this.$router.push('/addbank')
				} else {
					Toast(data.info);
				}
			} else {
				Toast("网络错误，请重试");
			}
		},
		showSelectFuc() {
			this.showSelect = true;
		},
		closeSelect(value,index) {
            this.showBank = value;
            this.sysBankId = this.bankData[index].sysBankId;
            this.showSelect = false;
            this.checkStep2()
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
            this.checkStep2()
        },
        closeSelectCities(value,index){
            this.shi = value
            this.showCitiesData = false
            this.checkStep2()
        },
		showAddressSelect(id) {
			if (id == 1) {
				this.showProData = true;
			} else {
                if(this.citiesData.length === 0){
                    Toast("请先选择省份");
                    return
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
}

.addbankCard2 {
	width: 100%;
	height: 100%;
	background: #EFEFEF;
	border-bottom: #CCCCCC 1px solid;
	.reg-head {
		width: 100%;
		height: 1rem;
		background: #028AFE;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: bold;
		box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, .5);
		.go-back {
			width: .2rem;
			height: .3rem;
			background: url("../../../static/images/back-icon.png") no-repeat;
			background-size: 100% 100%;
			margin-left: .2rem;
		}
		.head-title {
			font-size: .3rem;
			color: #FFFFFF;
		}
		.head-title2 {
			width: .8rem;
		}
	}
    .main {
        margin: .06rem auto 0;
        color: #464646;
        font-size: .26rem;
        .name-remind {
            height: 1rem;
            margin-bottom: .2rem;
            background: #FFFFFF;
            padding: 0 .3rem;
            font-size: .24rem;
            .top-reminds-icon {
                font-size: .4rem;
                margin-right: .2rem;
            }
        }
        .content-list {
            height: 1rem;
            padding: 0 .3rem;
            background: #FFFFFF;
            .content-list-left {
                width: 30%;
            }
            .content-list-right {
                width: 70%;
                input {
                    width: 100%;
                    border: none;
                    outline: none;
                }
                .code-input {
                    width: calc(100% - 2rem);
                }
                .code-btn {
                    width: 1.6rem;
                    outline: none;
                    height: .5rem;
                    font-size: .2rem;
                    color: #FFFFFF;
                    border-radius: .25rem;
                    background: linear-gradient(90deg,#20a4ff,#067dff);
                    margin-left: .2rem;
                    border: none;
                }
            }
        }
        .content-list:not(:first-child) {
            border-top: #ECECEC 1px solid;
        }
        .content-list2 {
            height: unset;
            .content-list-title {
                margin-top: .2rem;
            }
            .content-list-chose {
                border: 1px solid #F0F0F0;
                border-radius: 2px;
                height: .6rem;
                color: #A8B3C3;
                margin-top: .06rem;
                padding: 0 .2rem;
                .right-icon {
                    font-size: .4rem;
                }
            }
             .content-list-side-box {
                 padding-bottom: .2rem;
                .content-list-side {
                    width: 46%;
                    .content-list-title {
                        margin-top: .2rem;
                    }
                    .content-list-side-50 {
                        border: 1px solid #F0F0F0;
                        border-radius: 2px;
                        height: .6rem;
                        color: #A8B3C3;
                        margin-top: .06rem;
                        padding: 0 .2rem;
                        .right-icon {
                            font-size: .4rem;
                        }
                    }
                    .black {
                        color: #464646;
                    }
                }
            }
            .black {
                color: #464646;
            }
        }
        .submitBlue {
            width: 88%;
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
                border-radius: .06rem;
            }
        }
    }
}
</style>
