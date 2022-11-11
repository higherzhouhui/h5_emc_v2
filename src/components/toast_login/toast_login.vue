<template>
    <div class="">
        <van-popup v-model="toastLoginShow" class="toast-login-box">
            <div class="top-line"></div>
            <div class="title-box flex-c">
                <div class="left-line"></div>
                <div class="bold">快来登录吧！</div>
            </div>
            <div class="main-fonts text-c">更多精彩内容等你来体验！</div>
            <div class="btn-box flex-b">
                <div class="btn1 flex-c" @click="routerFn('register')">注册</div>
                <div class="btn2 flex-c" @click="routerFn('login')">登录</div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import router from '../../routers/index'
export default {
    name: 'toast',
    data() {
        return {
            
        }
    },
    methods: {
        showFn(){
            return true
        },
        routerFn(val){
            this.toastLoginShow = false
            router.push('/' + val)
        }
    }
}
</script>

<style lang="scss" scoped>
    .toast-login-box {
        width: 5.6rem;
        border-radius: .1rem;
        background: #fff;
        overflow: hidden;
        .top-line {
            height: .15rem;
            line-height: 1rem;
            background: linear-gradient(90deg,#78bdf2,#167bff);
        }
        .title-box {
            font-size: .34rem;
            margin-top: .2rem;
            .left-line {
                width: .08rem;
                height: .4rem;
                background: linear-gradient(180deg,#167bff,#fff);
                margin-right: .1rem;
            }
        }
        .main-fonts {
            padding: .3rem 0;
            color: #666666;
            font-size: .3rem;
        }
        .btn-box {
            border-top: 1px solid rgba(0,0,0,.1);
            font-size: .32rem;
            .btn1 {
                width: 50%;
                height: .9rem;
                color: #afb6c5;
                border-right: 1px solid rgba(0,0,0,.1);
            }
            .btn2 {
                width: 50%;
                height: .9rem;
                color: #333333;
            }
        }
    }
</style>
