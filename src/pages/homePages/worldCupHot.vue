<template>
    <div class="world-cup-hot">
        <!-- <div class="replace-header flex-b">
			<div class="goBack flex" @click="goBack()">
                <van-icon class="back-icon" name="arrow-left" />
            </div>
			<div class="header-title">热点</div>
			<div class="header-right"></div>
		</div> -->
        <div class="headerpaddingTop">
            <iframe :src="discountUrl" class='discount-iframe' ref='iframeHeight'  width="100%" height="" frameborder="0" scrolling="auto" style="position:absolute;top:0rem;left: 0;z-index:2;"></iframe>
        </div>
    </div>
</template>
<script>
import { set } from 'vue';
export default {
    name:'worldCupHot',
    components:{
		
	},
    data(){
        return{
            discountUrl:this.API.wordCupHot,
        }
    },
    created(){
    },
    mounted(){
		// this.loadTop();
        this.getQuery();
        window.goBack = this.goBack
    },
    beforeRouteLeave (to, from, next) {   
        this.$destroy(true)
        next()
    },
    methods: {
        getQuery(){
            window.addEventListener('message',function(e){
                let queryNum = e.data; 
                if(queryNum === 1) {
                    sessionStorage.setItem('hotMark',1)
                }
                window.goBack()
            },false)
        },
        goBack(){
            if(sessionStorage.getItem('hotMark') && sessionStorage.getItem('hotMark') === '1'){
                this.$router.push('/')
            }
            // this.$router.back()
        },
		loadTop() {
			let params={
			}
        
		},

    }
}
</script>

<style lang="scss" scoped>
.world-cup-hot{
	width:100%;
    height: 100vh;
    // position: relative;
    .replace-header {
        width: 100%;
        height: 1rem;
        color: #FFFFFF;
        font-size: .36rem;
        line-height: 1rem;
        padding: 0 .32rem;
        background: #CA2C48;
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        z-index: 88;
        .goBack {
            width: .8rem;
            .back-icon {
                font-size: .32rem;
                color: #FFFFFF;
                font-weight: bold;
            }
        }
        .header-title {
            text-align: center;
            color: #FFFFFF;
            font-size: .3rem;
            font-family: PingFang-SC-Medium;
            position: relative;
            height: 1rem;
        }
        .header-right {
            width: 0.8rem;
        }
    }
	.headerpaddingTop{
        width: 100%;
        height: calc(100vh);
        .discount-iframe {
            height: calc(100vh);
        }
	}
}
</style>

