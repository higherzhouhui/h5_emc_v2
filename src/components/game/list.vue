<template>
    <div class="recharge-list">
        <div class="apply-money">
        	<p class="money">{{name}}</p>
        </div>
        <div class="his-center">
        	<p>{{odds}}</p>
        </div>
        <div class="apply-money actual">
        	<p class="money">{{afterCash}}</p>
        </div>
    </div>

</template>

<script>
export default {
    name:'home',
    props:{
    	name:{
    		type:String,
    		default:'未知'
    	},
    	odds:{ 	
			type:String,
    		default:'错误'	
    	},
    	afterCash:{
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
