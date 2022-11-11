<template>
	<div class="mydata">
		<HeaderTop :title="`个人资料`"></HeaderTop>
		<div class="my-data">
			<div class="my-data-top">
				<div class="my-data-list">
					<div class="my-data-list-left">用户名:</div>
					<div class="my-data-list-right">
						<div class="my-data-list-right-left" v-html="loginName"></div>
					</div>
				</div>
                <div class="my-data-list">
					<div class="my-data-list-left">生&emsp;日:</div>
					<div class="my-data-list-right">
						<div class="my-data-list-right-left" v-html="birthDate"></div>
						<div class="my-data-list-right-right" v-if='unSetBirthday' @click="toSetBirthday"><img src="../../../static/images/choice-go.png" alt=""></div>
					</div>
				</div>
				<div class="my-data-list">
					<div class="my-data-list-left">性&emsp;别:</div>
					<div class="my-data-list-right">
						<div class="my-data-list-right-left">{{genderValue}}</div>
						<div class="my-data-list-right-right" v-if="unSetGender" @click="toSetGender"><img src="../../../static/images/choice-go.png" alt=""></div>
					</div>
				</div>
				<div class="my-data-list" @click="toPush(5)">
					<div class="my-data-list-left">昵&emsp;称:</div>
					<div class="my-data-list-right">
						<div class="my-data-list-right-left" v-html="nickName"></div>
						<div class="my-data-list-right-right"><img src="../../../static/images/choice-go.png" alt=""></div>
					</div>
				</div>
                <div class="my-data-list" @click="toPush(8)">
					<div class="my-data-list-left">收货地址:</div>
					<div class="my-data-list-right">
						<div class="my-data-list-right-left" v-html="adress"></div>
						<div class="my-data-list-right-right"><img src="../../../static/images/choice-go.png" alt=""></div>
					</div>
				</div>
			</div>
			
			<!-- <div class="my-data-top my-data-middle">
				<div class="my-data-list" @click="toPush(1)">
					<div class="my-data-list-left">手机号码:</div>
					<div class="my-data-list-right">
						<div class="my-data-list-right-left" v-html="phone"></div>
						<div class="my-data-list-right-right"><img src="../../../static/images/choice-go.png" alt=""></div>
					</div>
				</div>
				<div class="my-data-list" @click="toPush(2)">
					<div class="my-data-list-left">邮箱地址:</div>
					<div class="my-data-list-right">
						<div class="my-data-list-right-left" v-html="email"></div>
						<div class="my-data-list-right-right"><img src="../../../static/images/choice-go.png" alt=""></div>
					</div>
				</div>
				<div class="my-data-list" @click="toPush(3)">
					<div class="my-data-list-left">微信号码:</div>
					<div class="my-data-list-right">
						<div class="my-data-list-right-left" v-html="weixin"></div>
						<div class="my-data-list-right-right"><img src="../../../static/images/choice-go.png" alt=""></div>
					</div>
				</div>
				<div class="my-data-list" @click="toPush(4)">
					<div class="my-data-list-left">QQ号码:</div>
					<div class="my-data-list-right">
						<div class="my-data-list-right-left" v-html="qq"></div>
						<div class="my-data-list-right-right"><img src="../../../static/images/choice-go.png" alt=""></div>
					</div>
				</div>
			</div> -->
			<div class="my-data-top">
				<!-- <div class="my-data-list" @click="toPush(6)">
					<div class="my-data-list-left">登录密码更改:</div>
					<div class="my-data-list-right">
						<div class="my-data-list-right-right"><img src="../../../static/images/choice-go.png" alt=""></div>
					</div>
				</div>
				<div class="my-data-list" @click="toPush(7)">
					<div class="my-data-list-left">提现密码更改:</div>
					<div class="my-data-list-right">
						<div class="my-data-list-right-right"><img src="../../../static/images/choice-go.png" alt=""></div>
					</div>
				</div> -->
			</div>
            <div class="my-data-top my-data-bottom">
                <div class="my-data-list">
                    <div class="my-data-list-left">我的邀请码:</div>
                    <div class="my-data-list-right">
                        <div class="my-data-list-right-left bold-fonts" v-if="inviteData.advStatus === 0" @click="toGetInvite">前往申请</div>
                        <div class="my-data-list-right-left bold-fonts" v-if="inviteData.advStatus === 1">申请中</div>
                        <div class="my-data-list-right-left bold-fonts" v-if="inviteData.advStatus === 9">{{advCode}}</div>
                        <div class="my-data-list-right-left bold-fonts" v-if="inviteData.advStatus === -9">邀请码无效</div>
                        <div class="my-data-list-right-right" v-if="inviteData.advStatus === 1"><img src="../../../static/images/choice-go.png" alt=""></div>
                        <div class="my-data-list-right-right" v-if="inviteData.advStatus === 9" @click="copyContent()"><div class="copy-invite-code">复制</div></div>
                    </div>
                </div>
            </div>
		</div>
		<div class="bottom-btn-box">
			<van-button class="bottom-btn" round type="info" color="#0895FE" block @click="logout">退出登录</van-button>
		</div>
        <div class="bottom-version">当前版本号: V{{API.paramVersion}}</div>
        <input id="hide" type="text" style="position: absolute;opacity: 0;pointer-events: none;" readonly>
    </div>
</template>
<script>
import HeaderTop from '../../components/top/top'
import MuSubmit from '../../components/submit/muSubmit'
import {Toast} from 'vant'

export default {
	name: 'myData',
	components: {
		HeaderTop,
		MuSubmit,
		Toast
	},
	data () {
		return {
			firstName: '',
			lastName: '',
			fullName: '',
			loginName: '',
			realName: '',
			nickName: '',
			birthDate: '',
			qq: '',
			weixin: '',
			email: '',
			adress: '',
			phone: '',
			createTime: '',
			genderValue: '',
			gender: '',
			emailType: 0,
			unSetGender:false,
			unSetBirthday:false,
			options: [
				{
					label: '男',
					value: '0'
					// disabled: true
				},
				{
					label: '女',
					value: '1'
					// disabled: true
				}
			],
            // version:this.API.paramVersion,
            advCode:'',
            inviteData:{},
		}
	},
	mounted () {
		this.loadTop()
	},
	beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
	methods: {
		loadTop () {
			let params = {
				version: this.API.paramVersion
			}
			this.ServerAPI.postAPI(this.API.userInfo, params, this.userInfo)
            this.getInviteInfo()
		},
        getInviteInfo() {
            this.ServerAPI.postAPI(this.API.inviteInfo, '', (success, data) => {
                if(success){
                    if(data.code === '0000'){
                        this.inviteData = data.data
                        if(data.data.advStatus === 9){
                            this.advCode = data.data.advCode
                        }
                    }else{
                        Toast(data.info)
                    }
                }else{
                    Toast(data.info)
                }
            })
        },
		userInfo (success, data) {
			if (success) {
				if (data.code === '0000') {
					this.loginName = data.data.loginName
					this.gender = data.data.gender
					if(this.gender === 'M') {
						this.genderValue = '男'
					}else if(this.gender === 'F'){
						this.genderValue = '女'
					} else {
						this.unSetGender = true
					}
					this.nickName = data.data.nickName
					this.birthDate = data.data.birthData
                    if(this.birthDate === null){
                        this.unSetBirthday = true
                    }
					this.qq = data.data.qq
					if (this.qq == null) {
						this.qq = '请绑定QQ号码'
					}
					this.weixin = data.data.weixin
					if (this.weixin == null) {
						this.weixin = '请绑定微信号码'
					}
					this.email = data.data.email
					if (this.email === '') {
						this.email = '请绑定邮箱'
						this.emailType = 0
					} else {
						this.emailType = 1
					}
					if (data.data.addressMap === undefined) {
						this.adress = '请填写收货地址'
					}else{
                        this.adress = data.data.addressMap.province + data.data.addressMap.city
                    }
					this.phone = data.data.phone
					this.createTime = data.data.createTime
				}
			}
		},
		toSetGender(){
			this.$router.push('/userSex')
		},
		toSetBirthday(){
			this.$router.push('/birthday')
		},
		toPush (id) {
			switch (id) {
				case 1:
					this.$router.push('/userPhone')
					break
				case 2:
					if (this.emailType === 0) {
						this.$router.push('/reviseMail2')
					} else if (this.emailType === 1) {
						this.$router.push('/userEmail')
					}
					break
				case 3:
					this.$router.push('/userWeixin')
					break
				case 4:
					this.$router.push('/userQq')
					break
				case 5:
					this.$router.push('/userNickname')
					break
				case 6:
					this.$router.push('/birthday')
					break
				case 7:
					this.$router.push('/cashPhonePassword')
					break
				case 8:
					this.$router.push('/adressPage')
			}
		},
        toGetInvite(){
		    this.$router.push('/inviteFriends')
        },
        copyContent(){
            let copyContent;
            copyContent = this.advCode;
            var input = document.getElementById("hide")
            input.value = copyContent
            input.select()
            document.execCommand("copy")
            Toast('复制成功')
        },
		logout () {
			this.ServerAPI.postAPI(this.API.logout, null, () => {
			})
            sessionStorage.setItem('loginMark','0')
            sessionStorage.setItem('showWithdraw','1')
			sessionStorage.setItem('isSelect', '4')
			sessionStorage.setItem('showNotice', '1');
			sessionStorage.removeItem('initIndex')
			sessionStorage.removeItem('userName')
			sessionStorage.removeItem('userDays')
			sessionStorage.removeItem('userLev')
			sessionStorage.removeItem('cashMax')
			sessionStorage.removeItem('cashMin')
			sessionStorage.removeItem('payId')
			sessionStorage.removeItem('gameName')
			sessionStorage.removeItem('gameId')
			sessionStorage.removeItem('showDownload')
			sessionStorage.removeItem('cashPwd')
			sessionStorage.removeItem('needHandleWithdraw')
			sessionStorage.removeItem('helpIndex')
			sessionStorage.removeItem('msgSaveId')
			sessionStorage.removeItem('multiNum')
			sessionStorage.removeItem('homeNavIndex')
			sessionStorage.removeItem('searchData')
			sessionStorage.removeItem('favData')
			sessionStorage.removeItem('homeMatchType')
			sessionStorage.removeItem('discountFromHome')
			sessionStorage.removeItem('fromHome')
			this.setLogin(false)
			this.$router.replace('/login')
		},
	}
}
</script>
<style lang="scss" scoped>
.mydata {
	width: 100%;
	background: #edeff2;
	height: 100vh;
	font-size: .26rem;
    .bottom-version {
        position: fixed;
        bottom: .14rem;
        width: 100%;
        text-align: center;
        font-size: .28rem;
        color: #8d969b;
    }
	.bottom-btn-box{
		width: 70%;
		margin: .4rem auto 0;
	}
	.my-data {
		width: 100%;
		padding: 0 .3rem;
		margin-top: .2rem;
		.my-data-top {
			margin-bottom: .2rem;
			background: #FFFFFF;
			padding: 0 .2rem;
			border-radius: .07rem;
		}
		.my-data-list:last-child {
			border-bottom: 0;
		}
		.my-data-list {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: .9rem;
			border-bottom: 1px solid #ececec;
			.my-data-list-left {
				color: #171F28;
				font-size: .26rem;
			}
			.my-data-list-right {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #8d969b;
				.my-data-list-right-left {
					flex: .6rem;
					color: #8d969b;
					img {
						width: .8rem;
						height: .8rem;
					}
				}
				.my-data-list-right-right {
					text-align: right;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    margin-left: .2rem;
					img {
						width: .12rem;
						height: .22rem;
					}
                    .copy-invite-code {
                        padding: .03rem .2rem;
                        border-radius: .1rem;
                        border: #8d969b 1px solid;
                    }
				}
                .bold-fonts {
                    font-weight: bold;
                    color: #333333;
                }
			}
		}
		.right-radio {
			width: 50%;
			margin-right: -.2rem;
			
			.mint-radiolist {
				display: flex;
				
				.mint-radio-label {
					font-size: .3rem;
					margin-left: 0;
				}
			}
		}
	}
}
</style>
