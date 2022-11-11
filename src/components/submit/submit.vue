<template>
<!--     <div class="submit">
      <button>提交</button> 
    </div> -->
    <div>
    	<div class="login_btn">
			<button class="ttes" @click="commit" @touchstart="buttonStar($event)" @touchend="buttonend($event)">{{btnText}}</button>
       </div>
       <div v-if="btm" class="new_regist">{{noLinetext}}<a href="javascript:;">{{btmText}}</a></div>
    </div>
       

</template>

<script>
export default {
    name:'submit',
    props:{
    	btnText:{
    		type:String,
    		default:"提交"
    	},
    	btm:{
    		type:Boolean,
    		default:false
    	},
    	btmText:{
    		type:String,
    		default:"邮箱"
    	},
    	noLinetext:{
    		type:String,
    		default:""
    	},
    	commit:{
    		type:Function,
    		default:()=>{}
    	}

    },
    data(){
        return{
          
        }
    },
    methods:{
         buttonStar(e){
      	e.target.className+=" effect"
      },
      buttonend(e){
      	  var reg = new RegExp('(\\s|^)' + 'effect' + '(\\s|$)');
        e.target.className = e.target.className.replace(reg, '');
      },
    }
}
</script>

<style lang="scss" scoped>
.login_btn{
		width: 100%;
		display: flex;
		justify-content: center;
		padding: .5rem 0 0;
		button{
			outline: 0 none;
			border: 0 none;
			font-size: .28rem;
			color: #fff;
			width: 90%;
			height: .9rem;
			border-radius: .45rem;
			background: #2a57aa;
		}
	}
	.new_regist{
		width: 100%;
		text-align: center;
		font-size: .24rem;
		padding:.4rem 0 0 ;
		color:#8d969b;
		a{
			color:#8d969b;
			text-decoration: underline;
		}
	}
</style>

