<template>
    <div class="recharge">
    	<HeaderTop :title="`充值`" :hasright="true" :rightText="`充值历史`" ></HeaderTop>
    	<div class="recharge-pad">
    			<div class="recharge-list" >
      		<div class="list-one" @click="toPush(1)">
      			<div class="img1"></div>
      			<p>微信充值</p>
      		</div>
      		<div class="list-one" @click="toPush(4)">
      			<div class="img2"></div>
      			<p>在线充值</p>
      		</div>
      	</div>
		 	<div class="recharge-list" @click="toPush(3)">
      		<div class="list-one" >
      			<div class="img3"></div>
      			<p>转账充值</p>
      		</div>
      		<div class="list-one" @click="toPush(2)">
      			<div class="img4"></div>
      			<p>支付宝充值</p>
      		</div>
      	</div>
    	</div>
       
        
    </div>

</template>

<script>
import HeaderTop from '../../components/top/top';
export default {
    name:'recharge',
    components:{
		HeaderTop
    },
    data(){
        return{
        
        }
    },
    methods:{
        // luyou
        toPush(id){
        	if(id==1){
        		this.$router.push('/wexinRecharge')
        	}
        	if(id==2){
        		this.$router.push('/zfbRecharge')
        	}
        	if(id==3){
        		this.$router.push('/transMain')
        	}
        	if(id==4){
        		this.$router.push('/onlineRecharge')
        	}
        }
    }
}
</script>

<style lang="scss" scoped>
.recharge{
	width:100%;
	height:100%;
	background:#f7f8fa;
	.recharge-pad{
			width:100%;
	padding:.2rem 0 0 ;
	}
	.recharge-list{
		display:flex;
		flex-wrap:warp;
		justify-content:space-between;
		width:100%;
		padding:0 .26rem .25rem;
		.list-one{
			height:3.35rem;
			width:3.35rem;
			background:#fff;
			display:flex;
			flex-direction:column;
			justify-content:center;
			align-items:center;
			.img1{
				width:1rem;
				height:.82rem;
				background:url("../../assets/images/weixin.png");
				background-size:cover;
			}
			.img2{
				width:.9rem;
				height:.63rem;
				background:url("../../assets/images/zhuanzhang-log.png");
				background-size:cover;
			}
			.img3{
				width:.8rem;
				height:.8rem;
				background:url("../../assets/images/zhuan-chong.png");
				background-size:cover;
			}
			.img4{
				width:.9rem;
				height:.72rem;
				background:url("../../assets/images/zhifubao.png");
				background-size:cover;
			}
			p{
				margin:.1rem 0 0 0;
			}
		}
	}
}
</style>
