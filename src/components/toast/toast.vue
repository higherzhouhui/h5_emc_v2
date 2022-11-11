<template>
    <div class="toast-body">
        <van-overlay :show="isShow" @click="toastShow = false" z-index='2099' :overlay='false' :lock-scroll='true' class-name='toast-body flex-c'>
            <div class="pop-content-box flex-c">
                <img v-if='isIcon === 2' src="../../../static/images/popup-error-icon.png" alt="" class="popup-icon">
                <img v-if='isIcon === 1' src="../../../static/images/interestSuccess.png" alt="" class="popup-icon">
                <img v-if='isIcon === 3' src="../../../static/images/alert-icon.png" alt="" class="popup-icon">
                <div class="toast-fonts">{{toastText}}</div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
export default {
    name: 'toast',
    data() {
        return {
            // isSuccess:false,
            // isError:false,
            // isAlert:false,
            isIcon:0,
        }
    },
    methods: {
        showFn(){
            console.log(1)
            return true
        }
    }
}
</script>

<style lang="scss" scoped>
.toast-body {
    flex-direction: unset;
    min-height: unset;
    color: #FFFFFF;
    background: none;
    .pop-content-box {
        margin: 0 auto;
        background: rgba(0,0,0,0.68);
        padding: 0 .2rem;
        border-radius: 10px;
        padding: .2rem;
        width: auto;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
        .popup-icon {
            height: 0.4rem;
        }
        .toast-fonts {
            max-width: 4rem;
            color: #FFFFFF;
            margin-left: .16rem;
            font-size: .26rem;
            word-break:break-all;
            font-weight: bold;
        }
    }
    
}

</style>
