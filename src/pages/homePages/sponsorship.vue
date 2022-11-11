<template>
  <div class="sponsorship">
        <HeaderTop :title="`赞助信息`"></HeaderTop>
        <div class="sponsorship-list" v-for="(items,index) in sponsorshipList" :key="index" @click="toPushdetail(items.url,items.title)">
          <img class="zanzhu-img" :src="items.image" alt="">
          <div class="zanzhu-title">
              <span>{{items.title}}</span>
              <a href="">查看详情</a>
          </div>
        </div>
  </div>
</template>

<script>
  import HeaderTop from '../../components/top/top';
  import {formatDate} from '../../../static/js/data.js'
  export default {
    name: 'sponsorship',
    components:{
      HeaderTop
    },
    data(){
      return {
        matchData:{},
        failInfo:"",
        homeTeamImg:"",
        awayTeamImg:"",
        getTime:0,
        matchTime:0,
        bgCover:'',
        active: 'tab-container1',
        isActive1:'isActive1',
        isActive2:'',
        sponsorshipList:[],
        imgUrl:"",
        sponsorshipTitle:"",
        matchInfo:"",
      }
    },
    mounted () {
      this.loadTop()
      this.hideSearch()
    },
    destroyed () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    methods: {
      formatDate(){
        this.matchTime = new Date(this.getTime).format("yyyy-MM-dd hh:mm");
      },
      loadTop(){
        let params = {
	        version: this.API.paramVersion,
        }
        this.ServerAPI.postAPI(this.API.sponsorship,params,this.sponsorship);
        this.ServerAPI.postAPI(this.API.checkHB,params,this.checkHB);
      },
      HBplan(){
        let params = {
	        version: this.API.paramVersion,
        }
        this.ServerAPI.postAPI(this.API.checkHB,params,this.checkHB);
      },
      sponsorship(success,data){
        if(success){
          if(data.code=='0000'){
            this.sponsorshipList = data.data;
            this.sponsorshipList.imgUrl = data.data.image;
            this.sponsorshipList.sponsorshipTitle = data.data.title;
          }
        }
      },
      toPushdetail (url,title) {
        this.$router.push({name: 'sponsorshipOne', query: {url: url,title:title}});
      },
      checkHB(success,data){
        if(success){
          if(data.code=='0000'){
              this.waitHB = false;
              this.getSuccess=false;
              this.getFail=false;
              this.canGetHB = true;
              this.matchData = data.data;
          }else if (data.code=='1702') {
              this.waitHB = true;
              this.canGetHB=false;
              this.waitMatch = false;
              this.getSuccess=false;
              this.getFail=false;
              this.canGetHB = false;
              this.matchInfo = data.info;
              this.matchData = data.data;
          }else if (data.code=='1700') {
            this.noMatch = true;
            this.waitMatch = false;
            this.waitHB = false;
          }else if (data.code=='1701') {
            this.waitMatch = true;
            this.noMatch = false;
            this.matchInfo = data.info;
            this.matchData = data.data;
            this.getTime = data.data.bisaiBeginTime*1000;
            this.formatDate();
          }else if (data.code=='1703') {
            this.getFail = false;
            this.moneyInfo = false;
            this.waitHB = true;
            this.failInfo = data.info;
            this.matchData = data.data;
          }else if (data.code=='1704' || data.code=='1705'|| data.code=='1706'|| data.code=='1707') {
            this.getFail = true;
            this.moneyInfo = false;
            this.failInfo = data.info;
            this.matchData = data.data;
          }
        }
      },
      getHB(success,data){
        if(success){
          if(data.code=='0000'){
            this.canGetHB = false;
            this.getSuccess = true;
            this.matchData = data.data;
          }
        }
      },
      hasHB(){
        let params = {
	        version: this.API.paramVersion,
        }
        this.ServerAPI.postAPI(this.API.getHB,params,this.getHB);
      },
      closeSuccess(){
        this.getFail = false;
        this.getSuccess = false;
      },
      bgChange1(){
        this.changeBg='changeBg1';
        this.bgCover='';
        this.isActive1 = 'isActive1';
        this.isActive2 = ''
        if (this.timer) {
          clearInterval(this.timer)
        }
      },
      bgChange2(){
        this.changeBg='changeBg2';
        this.bgCover='bg-cover';
        this.isActive1 = '';
        this.isActive2 = 'isActive2'
        let _this = this
        _this.timer = setInterval(function () {
          _this.HBplan();
        }, 5000)
      },
      hideSearch(){
        let _this = this;
        document.addEventListener('click', function (e) {
          let flag = e.target.contains(document.getElementsByClassName('getHB-success')[0])
          if(!flag) return
          _this.getSuccess = false;
        });
      },
    }
  }
</script>

<style  lang="scss" scoped>
.sponsorship {
  background: #EDEFF2;
  padding-bottom: 1.2rem;
  .sponsorship-list {
    width: 90%;
    height: 3rem;
    margin: .6rem auto 0;
    position: relative;
    .zanzhu-img {
      width: 90%;
      height: 2.3rem;
      position: absolute;
      left: 5%;
      z-index: 2;
    }
    .zanzhu-title {
      width: 100%;
      background: #FFFFFF;
      height: 2.4rem;
      position: absolute;
      top: .6rem;
      z-index: 1;
      padding-top: 1.85rem;
      border-radius: .1rem;
      padding-left: 5%;
      display: flex;
      justify-content: space-between;
      a {
        margin-right: 5%;
        color: #7e7f8b;
      }
    }
  }
}
</style>
