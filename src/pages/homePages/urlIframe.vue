<template>
  <div class="detail">
    <HeaderTop :title="sponsorTitle"></HeaderTop>
    <div class="" ></div>
    <div class="headerpaddingTop" id="content">
        <iframe :src="sponsorUrl"  ref='iframeHeight' id="urlIframe" width="100%" height="1300%" frameborder="0" scrolling="auto" style="position:absolute;top: 1rem;left: 0"></iframe>
    </div>
  </div>
</template>
<script>
  import HeaderTop from '../../components/top/top';
  export default {
    name:'sponsorshipOne',
    components:{
      HeaderTop,
    },
    data(){
      return{
        sponsorUrl:'',
        sponsorTitle:'',
        sponsorId:'',
        displayType:'',
        showHeader:true,
      }
    },
    created(){
    },
    mounted(){
        this.sponsorUrl = this.$route.query.url;
        this.sponsorTitle = this.$route.query.title;
        this.sponsorId = this.$route.query.id;
        this.displayType = this.$route.query.type;
        if(this.sponsorId == 14 || this.displayType === 'url') {
            this.showHeader = false
        }
        console.log(this.$route.query)
    },
    beforeRouteLeave (to, from, next) {    
        this.$router.go('/sponsorship');
        // this.$router.back()
        this.$destroy(true)
        next()
    },
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .detail{
    width:100%;
    height: auto;
    .headerpaddingTop{
      width: 100%;
    //   height: 100%;


    }


  }
</style>

