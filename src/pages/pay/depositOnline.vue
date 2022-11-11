<template>
    <div class="online-recharge">
        <div class="rop">
            <HeaderTop :title="title" ></HeaderTop>
        </div>
        <div class="list-bg" v-if="haveBankList == false && hasCashList == false">
            <div class="online-list">
                <div class="money">充值金额</div>
                <div class="money-inout">
                    <input type="text" placeholder="请输入金额" ref="money"><span>元</span>
                </div>
            </div>
            <div class="remind">
                <div class="blue">温馨提示:<br></div>
                <p>{{depositIntro}}</p>
                单笔存款最低{{cashMin}}元，上限{{cashMax}}元
            </div>
<!--            <div class="or-btn">-->
<!--              <MuSubmit :btnText="`充值`" :onclick="this.toPush" :disable="false"></MuSubmit>-->
<!--            </div>-->
	        <div class="bottom-btn-box">
		        <van-button class="bottom-btn" round type="info" color="#0895FE" block
		                    @click="toPush">充值
		        </van-button>
	        </div>
            <div class="virtual-bottom-fonts" v-if="payId === '594' || payId === '595'">
                <div class="line1">存款成功额外加送1.5%，每日最高优惠888元!</div>
                <div class="line2">具体到账金额以实际到账为准</div>
            </div>
        </div>
        <div class="list-bg2" v-if="hasCashList == true">
            <div class="list-l" @click="showSelectFuc" v-if="haveBankList == true">
                <div class="list">
                    <div class="text" >所属银行</div>
                    <div>{{showBank}}<img src="" alt=""></div>
                </div>
            </div>
            <div class="wx-chose">{{choseMoney}}</div>
            <div class="list-bg2-box">
                <div class="money-list" v-for="(n,i) in moneyList" :key="i">
                    <div class="money-chosing" :class="moneyChosing?'is-chosing':''" @click="isChosing(i)">{{n.cash}}</div>
                </div>
            </div>
<!--            <div class="or-btn">-->
<!--              <MuSubmit :btnText="`充值`" :onclick="this.toPushWx" :disable="false"></MuSubmit>-->
<!--            </div>-->
	        <div class="bottom-btn-box">
		        <van-button class="bottom-btn" round type="info" color="#0895FE" block
		                    @click="toPushWx">充值
		        </van-button>
	        </div>
        </div>
        <div class="list-bg2" v-if="haveBankList == true && hasCashList == false">
            <div class="list-l" @click="showSelectFuc">
                <div class="list">
                    <div class="text" >所属银行</div>
                    <div>{{showBank}}<img src="" alt=""></div>
                </div>
            </div>
            <div class="online-list">
                <div class="money">充值金额</div>
                <div class="money-inout">
                  <input type="text" placeholder="请输入金额" ref="money"><span>元</span>
                </div>
            </div>
            <div class="remind">
                <div class="blue">温馨提示:<br></div>
                单笔存款最低{{cashMin}}元，上限{{cashMax}}元
            </div>
            <div class="or-btn">
                <MuSubmit :btnText="`充值`" :onclick="this.toPushBankLisk" :disable="false"></MuSubmit>
            </div>
            <div class="select" v-if="showSelect">
                <div class="sle-mian">
                    <div class="select-title">
                        <div class="sle">请选择开户银行</div>
                    </div>
                    <div>
                        <mt-picker class="bankSlot" :slots="slotBanks" @change="onValuesChangeBank"></mt-picker>
                    </div>
                    <div class="select-bottom" @click="closeSelect(2)">确定</div>
                </div>
            </div>
        </div>
<!--        <div class="or-log" v-if="haveBankList == true">-->
<!--            <div @click="selectBank('CMB')" :class="{'selceted':this.params.bankCode == 'CMB'}"><i class="CMB"></i>-->
<!--            <span>招商银行</span><span class="or-rigth" v-if="this.params.bankCode == 'CMB'">√</span></div>-->
<!--            <div @click="selectBank('CCB')" :class="{'selceted':this.params.bankCode == 'CCB'}"><i class="CCB"></i>-->
<!--            <span>建设银行</span><span class="or-rigth" v-if="this.params.bankCode == 'CCB'">√</span></div>-->
<!--	    </div>-->

<!--        <div class="online-kf">-->
<!--            <p>若充值后未到账请联系<a href="javascript:;" :onclick="this.help">在线客服</a></p>-->
<!--        </div>-->
    </div>
</template>

<script>
import MuSubmit from '../../components/submit/muSubmit';
import HeaderTop from '../../components/top/top';
import {Toast} from 'vant';
export default {
    name:'wexinRecharge',
    components:{
        HeaderTop,
        MuSubmit
    },
    data(){
        return{
            depositIntro:"",
            wxCash:0,
            canPay : false,
            title:"在线支付",
            payId:'',
            cashMin:0,
            cashMax:1000,
            cashType:"0",
            payMark:"",
            bankCode:'',
            haveBankList:false,
            hasCashList:false,
            choseMoney:'请选择你要充值的额度',
            moneyList:[],
            moneyChosing:false,
            showBank:"请选择银行",
            showSelect:false,
            bankData:'',
            slotBanks: [{
              flex: 1,
              values: [],
              className: 'slot1',
              textAlign: 'center'
            }],
            params:{
              cash:0,
              bankCode:''
            }
        }
    },
    mounted(){
        this.title = localStorage.getItem("title");
        this.payId = localStorage.getItem("payId");
        this.loadTop();
        this.hideSearch();
        // localStorage.setItem("payId", null);
        // localStorage.setItem("title", null);
        // if(this.params.payId >0){
        //     this.loadTop();
        // }else{
        //     this.$router.push('/pay');
        // }
    },
    beforeRouteLeave (to, from, next) {
	    sessionStorage.removeItem('payId')
      this.$destroy(true)
      next()
    },
    methods:{
        loadTop(){
            let params = {
                payId:this.payId
            }
            this.ServerAPI.postAPI(this.API.depositOnlineGet,params,(success, data) => {
                if(success){
                    if(data.code=='0000'){
                        this.canPay = true;
                        this.cashMin = data.data.cashMin;
                        this.cashMax = data.data.cashMax;
                        this.cashType = data.data.cashType;
                        this.payMark = data.data.payMark;
                        this.depositIntro = data.data.explain;
                        if (data.data.bankList == true){
                          this.bankData = data.data.payList.bankList;
                          this.haveBankList = true;
                        }
                        console.log(data.data.payList.cashList)
                        if(data.data.payList.cashList){
                            this.moneyList = data.data.payList.cashList
                            if (this.moneyList.length>0){
                                this.hasCashList = true;
                            }
                        }
                        if (data.data.payList.bankList) {
                          data.data.payList.bankList.map((v,k)=>{
                            this.slotBanks[0].values.push(v.bankName)
                          });
                        }
                        if(this.haveBankList == true){
                        	this.bankCode = data.data.payList.bankList[0].bankCode;
                        }
                    }else{
                        // this.showMessage("充值信息错误，请使用其他充值方式", false);
                        Toast("充值信息错误，请使用其他充值方式");
                        return false;
                    }
                }
            });
        },
        toPushWx(){
            this.params.payId = this.payId;
            this.params.cash = this.choseMoney;
            this.params.bankCode = this.bankCode;
            this.ServerAPI.postAPI(this.API.depositOnline,this.params,this.depositOnline);
        },
        toPushBankLisk(){
          this.params.payId = this.payId;
          this.params.cash = this.$refs.money.value;
          this.params.bankCode = this.bankCode;
          this.ServerAPI.postAPI(this.API.depositOnline,this.params,this.depositOnline);
        },
        toPush() {
            if(this.canPay == false){
                Toast("充值信息错误，请使用其他充值方式");
                return false;
            }
            let money= this.$refs.money.value;
            if(money>this.cashMax || money<this.cashMin){
                Toast("单笔存款最低"+this.cashMin+"元，上限"+this.cashMax+"元");
                return false;
            }
            var re = /^[0-9]+.?[0-9]*/;
            if (!re.test(money)) {
                Toast("资金金额必须是数字");
                return false;
            }
            if((money*100)%1 !=0){
                Toast("资金金额最多保留两位小数");
                return false;
            }
            if(this.cashType=="1" && money%1 ==0){
                Toast("资金金额必须带小数");
                return false;
            }
            if(this.cashType=="2" && money%1 !=0){
                Toast("资金金额必须输入整数");
                return false;
            }
            if(this.cashType=="3" && money%10 !=0){
                Toast("资金金额必须输入10的倍数，如100，120，300等");
                return false;
            }
            if(this.cashType=="5" && money%100 !=0){
                Toast("资金金额必须输入100的倍数，如100，300，1000等");
                return false;
            }
            // if(this.haveBankList == true && this.params.bankCode == ""){
            // 	this.showMessage("请选择充值银行", false);
            //     return false;
            // }
            this.loading();
            this.params.cash = money;
            this.params.payId = this.payId;
            this.params.bankCode = this.bankCode;
            this.params.version = this.API.paramVersion;
            this.ServerAPI.postAPI(this.API.depositOnline,this.params,this.depositOnline);
        },
        depositOnline(success,data){
            this.loadingClose();
            if(success){
                if(data.code == '0000'){
                    Toast(data.info);
                  if(data.data.showType == 'qrcode'){
                    localStorage.setItem("info", data.data.url);
                    localStorage.setItem("title", this.title);
                    localStorage.setItem("payMark", this.payMark);
                    this.$router.push('/qrcode');
                  }else if(data.data.type == 'image'){
                    localStorage.setItem("info", data.data.url);
                    localStorage.setItem("title", this.title);
                    localStorage.setItem("payMark", this.payMark);
                    this.$router.push('/qrcode/image');
                  }else if(data.data.type == 'get'){
                    top.location = data.data.url;
                  }
                  return true;
                } else {
                    Toast(data.info);
                }
            }else{
                Toast("网络错误，请重试");
            }
        },
          // selectBank(bank){
          //     this.params.bankCode = bank;
          // },
        help(){
            this.$router.push('/help');
        },
        isChosing(i){
          var blueBg = document.getElementsByClassName('money-chosing');
          for (let k=0;k<blueBg.length;k++) {
            blueBg[k].style.background = '#ffffff'
            blueBg[k].style.color = '#666666'
          }
          blueBg[i].style.background = '#3677FF';
          blueBg[i].style.color = '#ffffff';
          this.choseMoney = parseInt( blueBg[i].innerText);
        },
        showSelectFuc(){
          this.showSelect=true;
        },
        onValuesChangeBank(picker, values) {
          let bank=values[0];
          this.slotBanks[0].values.map((v,k)=>{
            if(v==bank){
              this.index=k;
            }
          });
        },
        closeSelect(id){
          if(id==1){
            this.showSelect=false;
          }if(id==2){
            this.showBank=this.bankData[this.index].bankName;
            this.bankCode = this.bankData[this.index].bankCode;
            this.showSelect=false;
          }
        },
        hideSearch(){
          let _this = this;
          document.addEventListener('click', function (e) {
            let flag = e.target.contains(document.getElementsByClassName('select')[0])
            if(!flag) return
            _this.showSelect = false
          });
        },
    }
}
</script>

<style lang="scss" scoped>
.online-recharge{
    .list-bg2 {
      width: 94%;
      margin: 0 auto;
      .list-l {
        margin-bottom: .2rem;
        .list {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #FFFFFF;
          padding: .3rem .3rem;
          border-radius: .08rem;
          img {
            width: .3rem;
            height: .2rem;
            margin-left: .2rem;
          }
        }
      }
      .wx-chose {
        background: #FFFFFF;
        border-radius: .08rem;
        color: #899EA5;
        line-height: .8rem;
        padding-left: .1rem;
        height: .8rem;
      }
      .list-bg2-box {
        display: flex;
        justify-content: start;
        align-items: center;
        flex-wrap: wrap;
        margin-top: .3rem;
        .money-list {
          width: 18%;
          height: .8rem;
          line-height: .8rem;
          text-align: center;
          margin: 0 .14rem .1rem 0;
          .money-chosing {
            background: #FFFFFF;
            border-radius: .08rem;
            color: #666666;
          }
        }
      }
    }
    .remind {
      width:100%;
      padding:.3rem .3rem;
      text-align: left;
      .blue {
        color: #3677FF;
      }
    }
    .online-list{
        width:100%;
        display:flex;
        justify-content:space-between;
        padding:.3rem .3rem;
        background: #FFFFFF;
        border-radius: .08rem;
        .money-inout{
            text-align:right;
            input{
                font-size:.3rem;
                width:80%;
                border:0 none;
                outline:0 none;
                text-align:right;
                margin:0 .1rem 0 0;
                color:#9fa6aa
            }
            input::placeholder{
                color:#9fa6aa
            }
        }
    }
    width:100%;height:100%;
    background:#edeff2;
    .rop{
    	  width:100%;
   		  padding:0 0 .2rem;
    }
    .list-bg{
        width: 94%;
        margin: 0 auto;
        border-radius: .08rem;
    }
    .or-log{
        width:100%;
        background:#fff;
        padding: 0 .3rem;
        line-height:1.2rem;
        /*.CMB{*/
        /*    width:.4rem;*/
        /*    height:.4rem;*/
        /*    background:url("../../assets/images/bank/cmb.png");*/
        /*    background-size:cover;*/
        /*    display:inline-block;*/
        /*    margin: 0.4rem .3rem 0 0;*/
        /*    float:left;*/
        /*}*/
        /*.CCB{*/
        /*    width:.4rem;*/
        /*    height:.4rem;*/
        /*    background:url("../../assets/images/bank/ccb.png");*/
        /*    background-size:cover;*/
        /*    display:inline-block;*/
        /*    margin: 0.4rem .3rem 0 0;*/
        /*    float:left;*/
        /*}*/
        span{
            font-size:.3rem;
            color:#3b556e;
        }
        .or-rigth{
            float:right;
            font-size:.22rem;
            color:#8d969b;
        }
    }
    .or-btn{
        margin: .5rem auto 0;
        width:80%;
    }
    .online-kf{
        width:100%;
        text-align:center;
        position:absolute;
        bottom:.3rem;
        z-index:3;
        p{
            font-size:.22rem;
            color:#aebad5;
            a{
                color:#2a57aa;
                underline:1px ;
                text-decoration:underline;
            }
        }
    }
}
.select{
  width:100;
  height:100;
  background:rgba(0,0,0,.5);
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  .sle-mian{
    position:absolute;
    top: 30%;
    right:0;
    left:0;
    width: 90%;
    margin: 0 5%;
    border-radius: .1rem;
    overflow: hidden;
    .bankSlot {
      background: #f1f3f5;
    }
  }
  .select-title,
  .select-bottom{
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    background: #FFFFFF;
    div{
      font-size:.25rem;
      color:#252525
    }
    .sle{
      font-size:.25rem
    }
  }
  .select-bottom {
    background: #057BFF;
    color: #FFFFFF;
  }
}
.bottom-btn-box {
	margin: 0.2rem auto 0;
	width: 70%;
}
.virtual-bottom-fonts {
    text-align: center;
    margin-top: .3rem;
    .line1 {
        font-weight: bold;
        font-size: .3rem;
    }
}
</style>
