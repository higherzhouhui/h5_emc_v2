<template>
    <div class="goods-detail">
      <HeaderTop :title="`iPhone 7 Plus 128G`" ></HeaderTop>
      <div class="goods-swiper">
          <mt-swipe :auto="4000" @change="handleChange">
              <mt-swipe-item><img src="../../assets/images/my-goods.png" alt=""></mt-swipe-item>
              <mt-swipe-item><img src="../../assets/images/my-goods1.png" alt=""></mt-swipe-item>
              <mt-swipe-item><img src="../../assets/images/my-goods2.png" alt=""></mt-swipe-item>
          </mt-swipe>
      </div>
      <div class="goods-detail-text">
          <p>Apple/苹果 iPhone 7 128G</p>
          <p class="red"><img src="../../assets/images/my-goodsicon.png" alt="">32000</p>
      </div>
        <div class="goods-detail-main">
            <p class="goods-detail-main-text">商品详情</p>
            <img src="../../assets/images/my-goods2.png" alt="">
            <p class="fs">这是一台手机这是一台手机兑换奖品。</p>
            <p class="fs">这是一台手机。</p>
        </div>
        <div class="goods-detail-bottom">
        <div class="goods-detail-bottom-img">
            <img src="../../assets/images/my-goods2.png" alt="">
        </div>
        <div class="goods-detail-bottom-btn">立即兑换</div>
    </div>
    </div>
    

</template>

<script>
import HeaderTop from '../../components/top/top';
export default {
    name:'goodsDetail',
    components:{
        HeaderTop
    },
    data(){
        return{
          
        }
    },
    methods:{
        handleChange(index) {
            // 轮播下表
        }
        
    }
}
</script>

<style lang="scss" scoped>
.goods-detail{
    background:#f2f3f5;
    .goods-swiper{
        margin-top:1rem;
        width:100%;
        height:5rem;
        img{
            width:100%;
            height:5rem;
        }

    }
     .goods-detail-text{
            padding:.4rem 0;
            width:100;
            background:#fff;
            text-align:center;
            p{
               font-size:.3rem; 

            }
            .red{
                margin-top:.3rem;
                font-size:.4rem;
                color:#f04241;
                img{
                    width:.3rem;
                    height:.26rem;
                    margin-right:.1rem;
                }
            }
        }
        .goods-detail-main{
            width:100;
            margin-top:.2rem;
            padding:.2rem;
            background:#fff;
            .goods-detail-main-text{
                padding:0 .2rem;
                border-left:.05rem solid #f04241;
                font-size:.3rem;

            }
            .fs{
                font-size:.28rem;
                margin: 0 0 .1rem 0
                
            }
            .fs:nth-chlid(2){
                 margin-top:.0rem;
            }
            img{
                margin:.2rem 0;
                width:100%;
                height:4rem;
            }

        }
        .goods-detail-bottom{
            width:100%;
            .goods-detail-bottom-img{
                padding: 0 .2rem;
                img{
                    width:100%;
                    height:4rem;
                }
            }
            .goods-detail-bottom-btn{
                width:100%;
                height:.92rem;
                text-align:center;
                color:#fff;
                font-size:.3rem;
                line-height:.92rem;
                background:rgb(42,87,170)

            }

        }
}


</style>
