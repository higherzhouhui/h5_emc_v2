<template>
    <div class="recharge-list" v-if="isExtract">
        <div class="apply-money">
        	<p class="money">{{number}}<span>元</span></p>
        	<p>申请金额</p>
        </div>
        <div class="his-center">
        	<p><span :class="SH">{{SHtext}}</span><span> 提至 </span>{{method}}</p>
        	<div class="his-centertime"><img src="../../assets/images/trans-time.png" alt=""><span>{{time}}</span><span>{{state}}</span></div>
        </div>
        <div class="apply-money actual">
        	<p class="money">{{actualNumber}}<span>元</span></p>
        	<p>实际金额</p>
        </div>

    </div>
    <div class="recharge-list" v-else>
        <div class="apply-money">
        	<p class="money">{{number}}<span>元</span></p>
        	<p>申请金额</p>
        </div>
        <div class="his-center">
        	<p>{{method}}</p>
        	<div class="his-centertime"><img src="../../assets/images/trans-time.png" alt=""><span>{{time}}</span><span>{{state}}</span></div>
        </div>
        <div class="apply-money actual">
        	<p class="money">{{actualNumber}}<span>元</span></p>
        	<p>实际金额</p>
        </div>

    </div>

</template>

<script>
export default {
    name:'recharge-list',
    props:{
    	SH:{
    		type:String,
    		default:'SH'
    	},
    	SHtext:{
    		type:String,
    		default:'审核中'
    	},
    	isExtract:{
    		type:Boolean,
    		default:false
    	},
    	number:{
    		type:String,
    		default:'200'
    	},
    	method:{
    		type:String,
    		default:'第三方在线支付'
    	},
    	time:{
   			type:String,
    		default:'2017/02/01 19:20:38'   		
    	},
    	state:{
    		type:String,
    		default:'成功'  
    	},
    	actualNumber:{
    		type:String,
    		default:'200'
    	}
    },
    data(){
        return{
          
        }
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
.recharge-list{
	padding:.2rem 0;
	width:100%;display:flex;
	justify-content:space-between;
	background:#fff;
	.apply-money{
		padding: 0 .4rem;
		text-align:center;
		p{
			font-size:.24rem;
			color:#8d969b;

		}
		.money{
			font-size:.4rem;
			span{
			font-size:.24rem;		
			}
		}
	}
	.actual{
		.money{
		color:#f31a4d;
			
		}
	}
	.his-center{
		padding:0.1rem .3rem 0;
		border-right:1px solid #e4e6ec;
		border-left:1px solid #e4e6ec;
		text-align:center;
		p{
			color:#3b556e;
			font-size:.3rem;
			span{
				padding:.05rem;
				color:8d969b;
				font-size:.18rem;				
			}
			.SH{
				background:#33cd4a;
				color:#fff;
			}
			.suc{
				background:#187ade;
				color:#fff;
			}
		}
		.his-centertime{
			font-size:.24rem;
			line-height:.5rem;
			color:#8d969b;
			img{
				float:left;
				width:.2rem;
				height:.2rem;
				margin:.17rem .1rem 0 0;
			}
		}

	}
}

</style>
