<template>
	<div class="discountActive">
		<!-- <HeaderTop :title="`优惠活动`" ></HeaderTop> -->
        <div class="replace-header">
			<div class="goBack flex-c" @click="backFn()">
                <van-icon class="back-icon" name="arrow-left" />
            </div>
			<div class="header-title">优惠活动</div>
			<div class="header-right bold"></div>
		</div>
		<div class="dap"></div>
		<div class="header-paddingTop">
            <div class="tab-title-box">
                <div class="tab-title">
                    <div class="tab-title-list" :class="activedTitle === 0?'title-chosing':''" @click="toPushList(0,index)">全部</div>
                    <div class="tab-title-list" :class="activedTitle === index + 1?'title-chosing':''" v-for="(item,index) in allType" :key="index" @click="toPushList(item.typeId,index)">{{item.name}}</div>
                </div>
            </div>
			<div class="selected-padding">
				<div class="discount-list" v-for="(item,index) in listData" :key="index" @click="toPushdetail(item.id)">
					<div class="list-border">
						<div class="discount-list-left">
                            <div class="discount-img-box flex-c">
                                <img v-lazy="item.imageUrl" alt="">
                            </div>
						</div>
						<div class="discount-list-right">
							<div class="discount-list-blank"></div>
							<div class="discount-list-bottom">
								<div class="discount-list-bottom-left">
									<div class="img">{{item.title}}</div>
									<p class="time">{{item.beginTime}}至{{item.endTime}}</p>
								</div>
								<div class="discount-list-bottom-right"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	
	</div>

</template>

<script>
import HeaderTop from '../../components/top/top';
export default {
	name:'discountActive',
	components:{
		HeaderTop,
	},
	data(){
		return{
			selected:'0',
			activedTitle:0,
			allType:[],
			listData:[],
			type1:'',
			typeId:0,
			index:0,
			all:[],
			discountNum:'',
		}
	},
	mounted(){
        this.$Lazyload.options.loading = 'static/images/discount-lazy.jpg'
        this.$Lazyload.options.error = 'static/images/discount-lazy.jpg'
		this.getDiscountNum()
		this.loadTop()
		this.getTypeContent()
	},
	beforeRouteLeave(to, from, next) {
		sessionStorage.removeItem('discountNum')
		this.$destroy(true)
		next()
	},
	methods: {
        backFn(){
            this.$router.push('/my')
        },
		getDiscountNum(){
			this.discountNum = sessionStorage.getItem('discountNum')
			if(this.discountNum === '1'){
				this.typeId = 1
				this.activedTitle = 1
			}else if(this.discountNum === '2'){
				this.typeId = 6
				this.activedTitle = 2
			}else if(this.discountNum === '3'){
				this.typeId = 7
				this.activedTitle = 5
			}else if(this.discountNum === '4'){
				this.typeId = 2
				this.activedTitle = 3
			}else if(this.discountNum === '5'){
				this.typeId = 3
				this.activedTitle = 4
			}else{
				this.typeId = 0
				this.activedTitle = 0
			}
			this.loadTop()
		},
		loadTop () {
			this.listData = [];
			let params = {
				typeId: this.typeId,
				visitType: 'APP',
				version: this.API.paramVersion,
				// version: '4.8.0',
			}
			this.ServerAPI.postAPI(this.API.discount, params, (success, data) => {
				if (success) {
					if (data.code === '0000') {
						this.all = this.listData = data.data;
						this.$forceUpdate();
					}
				} else {
					this.showMessage("网络错误", false);
				}
			});
		},
		getTypeContent () {
			let params = {
				visitType: 'APP',
				version: this.API.paramVersion,
			}
			this.ServerAPI.postAPI(this.API.discountType, params, (success, data) => {
				if (success) {
					if (data.code == '0000') {
						this.allType = data.data;
					}
				}
			})
		},
		toPushdetail (id) {
            sessionStorage.setItem('discountFromHome',false)
            if(id === 170){
                this.$router.push('/EuroCup')
            }else if(id === 226){
                this.$router.push('/inviteFriends')
            }else if(id === 24){
                this.$router.push('/discountDetail24')
            }else if(id === 130){
                this.$router.push('/discountDetail130')
            }else if(id === 218){
                this.$router.push('/worldCup')
            }else{
                this.$router.push({name: 'discountOne', params: {id: id}});
            }
		},
		toPushList (value,index) {
			if(value === 0){
				this.activedTitle = 0;
			}else{
				this.activedTitle = index + 1;
			}
			this.typeId = value;
			this.loadTop();
		}
	}
}
</script>

<style lang="scss" scoped>
.dap{
	width:100%;
	position:fixed;
	height:.3rem;
	top:1.2rem;
	//background:#edeff2;
	//z-index:99999;
}
.discountActive{
	width:100%;
	min-height: 100vh;
	background:#edeff2;
	padding-bottom: .2rem;
	/*height: auto;*/
    .replace-header {
        width: 100%;
        height: 1rem;
        background: #FFFFFF;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        z-index: 88;
        .goBack {
            width: .8rem;
            .back-icon {
                font-size: .34rem;
            }
        }
        .header-title {
        }
        .header-right {
            width: 0.8rem;
        }
    }
	.header-paddingTop {
		padding: 0;
		width: 100%;
		margin: 0 auto;
        .tab-title-box {
            position: fixed;
            top: 1rem;
            width: 100%;
            padding: .16rem 0;
            background:#edeff2;
            z-index: 99;
            .tab-title {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: .5rem;
                background: #FFFFFF;
                padding: .1rem;
                font-size: .26rem;
                .tab-title-list {
                    width: 13%;
                    text-align: center;
                    height: .6rem;
                    line-height: .6rem;
                    background: #FFFFFF;
                    color: #6C6C6C;
                    font-weight: bold;
                    border-radius: .4rem;
                }
                .title-chosing {
                    background: linear-gradient(to right,#78BDF2,#167BFF);
                    color: #FFFFFF;
                }
                .tab-title-list-disable {
                    background: #D7D7D8;
                }
            }
        }
        .selected-padding{
            margin-top: 2.28rem;
            background: #edeff2;
            padding: 0 .2rem;
            .discount-list{
                margin-top: .32rem;
                //padding-top: .2rem;
                //background: #FFFFFF;
                .list-border {
                    position: relative;
                    height:3.5rem;
                    .discount-list-left{
                        text-align: center;
                        position: absolute;
                        top: 0;
                        z-index: 67;
                        width: 100%;
                        .discount-img-box {
                            width:94%;
                            height:2.48rem;
                            border-radius: .08rem;
                            background: #FFFFFF;
                            margin: 0 auto;
                            overflow: hidden;
                            img{
                                width: 100%;
                                // max-width: 100%;
                                // max-height: 100%;
                                //border-radius: .08rem;
                            }
                        }
                    }
                    .discount-list-right{
                        width: 100%;
                        position: absolute;
                        top: 35%;
                        font-size:.3rem;
                        z-index: 66;
                        background: #FFFFFF;
                        padding: 0 .2rem .2rem .2rem;
                        border-radius: .08rem;
                        .discount-list-blank {
                            width: 100%;
                            height: 1.4rem;
                        }
                        .img {
                            font-size: .25rem;
                            font-weight: bold;
                        }
                        .time {
                            font-size: .2rem;
                            color: #757F8B;
                        }
                    }
                }
            }
        }
	}

}
.mint-navbar .mint-tab-item {
	padding: .05rem 0!important;
	width: 14% !important;
	color: #000000;
	font-size: .25rem;
}
.mint-navbar .mint-tab-item.is-selected {
	border-bottom: 2px solid #3677FF;
	color: #3677FF;
}
</style>
