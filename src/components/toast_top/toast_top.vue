<template>
    <div class="activing-toast" id='toastTopPop'>
        <van-popup v-model="toastTopShow" class="max-times-pop flex-c" position="top" :overlay='false'>
            <div class="max-times-box flex-c">
                <img v-if='isIconTop === 2' src="../../../static/images/popup-error-icon.png" alt="" class="left-icon">
                <img v-if='isIconTop === 1' src="../../../static/images/interestSuccess.png" alt="" class="left-icon">
                <img v-if='isIconTop === 3' src="../../../static/images/alert-icon.png" alt="" class="left-icon">
                <div class="max-times-fonts">{{toastTopText}}</div>
            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'toast',
    data() {
        return {
            isIconTop:0,
        }
    },
    methods: {
        showFn(){
            return true
        }
    }
}
</script>

<style lang="scss" scoped>
    .max-times-pop {
        top: 1rem;
        background: none;
        .max-times-box {
            margin: 0 auto;
            background: rgba(0,0,0,0.68);
            // filter: blur(13px);
            padding: 0 .2rem;
            border-radius: 10px;
            padding: .2rem;
            width: auto;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.16);
            .left-icon {
                height: 0.4rem;
            }
            .max-times-fonts {
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
