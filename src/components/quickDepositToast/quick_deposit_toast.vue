<template>
    <div class="toast-body">
        <van-popup class='quick-deposit-pop-box flex-c' v-model="showQuickDepositPop" position="top" :overlay='false'>
            <div class="quick-deposit-pop-content flex-c" v-if='showMode === 1'>
                <img src="../../../static/images/alert-icon.png" alt="" class="left-icon">
                <div class="center-fonts">
                    您的<span class="yellow">【极速充值订单】</span>尚未完成，若操作超时，一概不上分。
                </div>
                <div class="right-btn flex-c" @click="toQuickDeposit()">
                    前往处理
                    <van-icon name="arrow" color="#FFFFFF" size='.3rem'/>
                </div>
            </div>
            <div class="quick-deposit-pop-content flex-c" v-if='showMode === 2'>
                <img src="../../../static/images/alert-icon.png" alt="" class="left-icon">
                <div class="center-fonts">
                    您的<span class="yellow">【极速提现订单】</span>已到账，尚未进行确认。
                </div>
                <div class="right-btn flex-c" @click="toQuickWithdraw()">
                    前往处理
                    <van-icon name="arrow" color="#FFFFFF" size='.3rem'/>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'quickDepositToast',
    data() {
        return {
            showMode:0,
        }
    },
    methods: {
        showFn() {
            return true
        },
        toQuickDeposit:function() {
            let tempUrl = window.location.href.split("/");
            window.location.href = tempUrl[0] + '//' + tempUrl[2] + '/' + tempUrl[3] + '/pay_index'
        },
        toQuickWithdraw:function() {
            let tempUrl = window.location.href.split("/");
            window.location.href = tempUrl[0] + '//' + tempUrl[2] + '/' + tempUrl[3] + '/extract'
        }
    }
}
</script>

<style lang="scss" scoped>
.toast-body {
    .quick-deposit-pop-box {
        background-color: unset;
        color: #FFFFFF;
        padding: .2rem 0;
        .quick-deposit-pop-content {
            background: rgba(13, 13, 13, .9);
            width: 94%;
            height: 1.5rem;
            font-size: .26rem;
            border-radius: .26rem;
            font-weight: 500;
            .left-icon {
                width: 0.42rem;
            }
            .center-fonts {
                // width: 64%;
                width: calc(100% - 2.8rem);
                margin-left: .1rem;
                .yellow {
                    color: #FDBA00;
                }
            }
            .right-btn {
                width: 1.6rem;
                height: 0.7rem;
                margin-left: .1rem;
                background: #797979;
                border-radius: .5rem;
                font-size: .24rem;
            }
        }
    }
    
}

</style>
