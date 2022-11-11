<template>
    <div class="recharge-list">
        <div class="apply-money">
        	<p class="money">{{beforeCash}}<span>元</span></p>
			<p>申请金额</p>
        </div>
        <div class="his-center">
        	<p>{{typeName}} </p>
        	<div class="his-centertime">
        	<span>{{addTime}}</span><br>
        	<span>{{failInfo}}</span>
        	</div>
        </div>
        <div class="apply-money actual">
        	<p class="money">{{afterCash}}<span>元</span></p>
			<span :class="SH">{{statusName}}</span>        	
        </div>
    </div>

</template>

<script>
export default {
    name:'home',
    props:{
    	SH:{
    		type:String,
    		default:'SH'
    	},
    	beforeCash:{
    	},
    	typeName:{
    		type:String,
    		default:'未知'
    	},
    	addTime:{ 		
    	},
    	statusName:{
    		type:String,
    		default:'未知'  
    	},
    	afterCash:{
    	},
    	failInfo:{
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
		.SH{
			background:#33cd4a;
			color:#fff;
		}
		.suc{
			background:#187ade;
			color:#fff;
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
