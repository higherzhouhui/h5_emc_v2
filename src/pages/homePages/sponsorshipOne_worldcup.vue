<template>
  <div class="detail">
    <!-- <HeaderTop :title="sponsorTitle" ></HeaderTop> -->
    <div class="headerpaddingTop" id="content">
      <iframe :src="sponsorUrl"  ref='iframeHeight' id="urlIframe" width="100%" height="100%" frameborder="0" scrolling="auto" style="position:absolute;top0;left: 0;z-index:2;"></iframe>
    </div>
  </div>
</template>
<script>
  import HeaderTop from '../../components/top/top';
  export default {
    name:'sponsorshipOne_worldcup',
    components:{
      HeaderTop,
    },
    data(){
      return{
        sponsorUrl:this.API.wordCupSponsor,
        sponsorTitle:''
      }
    },
    created(){
    },
    mounted(){
        if(this.$route.query.url){
            this.sponsorUrl = this.$route.query.url
        }
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
                // if(queryNum === 1) {
                //     sessionStorage.setItem('hotMark',1)
                // }else{
                //     sessionStorage.setItem('hotMark',0)
                // }
                window.goBack()
            },false)
        },
        goBack(){
            if(sessionStorage.getItem('hotMark') && sessionStorage.getItem('hotMark') === '1'){
                this.$router.push('/')
            }else{
                this.$router.push('/sponsorShip-new')
            }
        },
    }
  }
</script>

<style lang="scss" scoped>
  .detail{
    width:100%;
    height: 100vh;
    .headerpaddingTop{
      width: 100%;
      height: 100%;
        #urlIframe {
            // height: calc(100vh - 1rem);
        }
    }



  }
</style>

