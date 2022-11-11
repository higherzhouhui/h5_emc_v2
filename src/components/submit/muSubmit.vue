<template>
    <div class="mu-submit">
		<mu-raised-button :label="btnText" @click="onclick" :disabled="disable" fullWidth />
    </div>

</template>

<script>
export default {
    name:'mu-submit',
    props:{
      onclick:{
        type:Function,
        default:()=>{}
      },
      disable:{
        type:Boolean,
        default:true
      },
    	btnText:{
    		type:String,
    		default:'下一步'
    	}
    },
    data(){
        return{
          btnDisabled:true,
          
        }
    },
    // beforeCreate(){
    // 	this.btntext=this.btnText
    // },
    methods:{
        test(k){
             if( k.target.datd=='true' ||  k.target.datd==undefined ){
                 k.target.innerHTML='已经关注'
                 k.target.datd=""
             }else{
                k.target.innerHTML='关注'
                k.target.datd='true'
             }
        }
    }
}
</script>

<style lang="scss" scoped>
.mu-submit{
	width:100%;
	height:.9rem;
	border-radius:.45rem;
}
</style>
