<template>
    <div class="detail" :class="{'detail-word-cup':isWordCup === true}">
        <HeaderTop :title="`优惠活动`" v-if='discountId !== "216" && discountId !== "220" && discountId !== "224"'></HeaderTop>
        <!-- <div class="replace-header" v-if='discountId !== "216" && discountId !== "220"'>
			<div class="goBack flex-c" @click="backFn()">
                <van-icon class="back-icon" name="arrow-left" />
            </div>
			<div class="header-title"></div>
			<div class="header-right bold"></div>
		</div> -->
        <div class="headerpaddingTop" id="content" :class="{'iframe-box':isWordCup === true}">
            <iframe :src="discountUrl" class='discount-iframe' :style="discountId === '216' || discountId === '220' || discountId === '224'?'top:0':''" :class="{'iframe-word-cup':isWordCup === true}" ref='iframeHeight'  width="100%" height="" frameborder="0" scrolling="auto"></iframe>
            <div class="word-cup-nav flex-b" v-if='isWordCup === true && discountFromHome === true'>
                <div class="nav-list nav-list2 flex-c" :class="navIndex == 0?'nav-list-chosed':''" @click="bottomFn('216',1)">比赛日签到</div>
                <div class="nav-line"></div>
                <div class="nav-list flex-c" :class="navIndex == 1?'nav-list-chosed':''" @click="bottomFn('worldCup',2)">2400万</div>
                <div class="nav-line"></div>
                <div class="nav-list flex-c" :class="navIndex == 2?'nav-list-chosed':''" @click="bottomFn('220',1)">天天送</div>
                <div class="nav-line"></div>
                <div class="nav-list flex-c" :class="navIndex == 4?'nav-list-chosed':''" @click="bottomFn('224',1)">新兵球衣</div>
                <div class="nav-line"></div>
                <div class="nav-list flex-c" @click="bottomFn('inviteFriends',2)">邀请豪礼</div>
            </div>
        </div>
        
    </div>
</template>
<script>
import { set } from 'vue';
import HeaderTop from '../../components/top/top';
export default {
    name:'detail',
    components:{
		HeaderTop,
	},
    data(){
        return{
            discountUrl:'',
            queryName:null,
            navIndex:-1,
            discountId:this.$route.params.id,
            isWordCup:false,
            discountFromHome:false,
        }
    },
    created(){
    },
    mounted(){
        if(sessionStorage.getItem('discountFromHome') && sessionStorage.getItem('discountFromHome') === 'true'){
            this.discountFromHome = true
        }else{
            this.discountFromHome = false
        }
		this.loadTop(this.$route.params.id);
		this.getQuery();
        window.routerFn = this.routerFn

    },
    beforeRouteLeave (to, from, next) {   
        this.$destroy(true)
        next()
    },
    methods: {
        backFn(){
            this.$router.back()
        },
        bottomFn(val,type){
            if(type === 1) {
                this.loadTop(val)
            }else if(type === 2) {
                this.$router.push('/' + val)
            }
        },
		loadTop(idVal) {
            let id = idVal
            this.discountId = idVal + ''
            if(this.discountId == '216' || this.discountId == '220' || this.discountId == '224') {
                if(this.discountFromHome == true){
                    this.isWordCup = true
                }
            }else{
                this.isWordCup = false
            }
            if(this.discountId === '216'){
                this.navIndex = 0
            }else if(this.discountId === '220'){
                this.navIndex = 2
            }else if(this.discountId === '224'){
                this.navIndex = 4
            }
			let params={
				id:id,
				version: this.API.paramVersion,
			}
            this.ServerAPI.postAPI(this.API.discountOne,params,this.discountOne)
		},
		discountOne(success,data){
			if(success){
				if(data.code=='0000'){
                this.discountUrl=data.data.url
                    // this.title = data.data.title;
					// this.details = data.data.details;
					// this.beginTime = data.data.beginTime;
					// this.endTime = data.data.endTime;
				}
			}
		},
        getQuery(){
            window.addEventListener('message',function(e){
                let queryNum = e.data; 
                if(queryNum === 1) {
                    sessionStorage.setItem('helpIndex','biAn')
                }else if(queryNum === 2) {
                    sessionStorage.setItem('helpIndex','oE')
                }else if(queryNum === 3) {
                    sessionStorage.setItem('helpIndex','zB')
                }else if(queryNum === 4) {
                    sessionStorage.setItem('helpIndex','yBf')
                }else if(queryNum === 'virtual') {
                    sessionStorage.setItem('helpIndex','virtual')
                }else if(queryNum === 5) {
                    sessionStorage.setItem('helpIndex','back')
                }else if(queryNum === 224) {
                    sessionStorage.setItem('helpIndex','userInfo')
                }
                window.routerFn()
            },false)
        },
        routerFn(){
            if(sessionStorage.getItem('helpIndex') === 'biAn' || sessionStorage.getItem('helpIndex') === 'oE' || sessionStorage.getItem('helpIndex') === 'zB' || sessionStorage.getItem('helpIndex') === 'yBf'){
                this.$router.push('/newerHelp')
            }else if(sessionStorage.getItem('helpIndex') === 'virtual') {
                this.$router.push('/pay_index')
            }else if(sessionStorage.getItem('helpIndex') === 'back') {
                if(sessionStorage.getItem('discountFromHome') === "true"){
                    this.$router.push('/')
                }else{
                    if(sessionStorage.getItem('isSelect') === '3'){
                        this.$router.push('/sponsorShip-new')
                    }else{
                        this.$router.push('/discountActive')
                    }
                }
            }else if(sessionStorage.getItem('helpIndex') === "userInfo"){
                this.$router.push('/userInfo')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.detail{
	width:100%;
    height: 100vh;
    // position: relative;
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
	.headerpaddingTop{
        width: 100%;
        height: auto;
        // #urlIframe {
        //     height: calc(100vh - 2rem);
        // }
        .discount-iframe {
            height: 100%;
            position:absolute;
            top:1rem;
            left: 0;
            z-index:2;
            // height: calc(100vh - 1rem);
        }

        .word-cup-nav {
            position: fixed;
            bottom: .1rem;
            // bottom: -80vh;
            width: 100%;
            // left: 1%;
            background: #9A1032;
            border: #FFFFFF 2px solid;
            border-radius: .46rem;
            height: 0.8rem;
            color: #FFFFFF;
            font-size: .24rem;
            padding: .06rem .06rem;
            z-index: 4;
            .nav-line {
                width: 1px;
                height: 0.3rem;
                margin: 0 .06rem;
                background: rgba(255,255,255,.6);
            }
            .nav-list {
                width: 19%;
                height: 100%;
                border-radius: .46rem;
            }
            .nav-list2 {
                width: 24%;
            }
            .nav-list3 {
                width: 22%;
            }
            .nav-list-chosed {
                background: #FFFFFF;
                color: #9A1032;
            }
        }
	}
}
.detail-word-cup {
    background: #F2EFED;
    .iframe-box {
        background: #F2EFED;
        height: calc(100vh - 2rem);
        #urlIframe {
            height: calc(100vh - 2rem);
        }
        .iframe-word-cup {
            height: calc(100vh - 1rem);
        }
    }
}
</style>

