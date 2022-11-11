<template>
    <div class="top-main">
        <div class="top">
            <div class="title">
                <div class="my-left">
                    <div v-if="backLogo" class="left" @click="this.back"><img src="../../../static/images/back-icon.png" alt=""></div>
                </div>
                <div class="title1">{{title}}<span class="bottom-line" v-if="bottomLine"></span></div>
                <div class="right" @click="routeFuc" v-if="hasright">{{rightText}}</div>
            </div>
        </div>
        <div class="top-padd"></div>
    </div>
</template>

<script>
export default {
    name: 'header',
    props: {
        backLogo: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ""
        },
        bottomLine: {
            type: Boolean,
            default: true
        },
        hasright: {
            type: Boolean,
            default: false
        },
        rightText: {
            type: String,
            default: ""
        },
        routeFuc: {
            type: Function,
            default: () => { }
        },
        leftFunc: {
        }
    },
    data() {
        return {

        }
    },
    methods: {
        back() {
            if(typeof this.leftFunc === 'function'){
                 this.leftFunc();
            }else{
            //浏览器返回
            this.$router.back();

            //返回时删除缓存
            if (this.isKeepAlive) {
                this.$store.dispatch('popKeepAlive');
            }

            //设置返回标志，在动画里面处理
            this.$store.dispatch('setBackMark', true);

            //点击了返回按钮，如果是有等待框的情况下，需要处理
            // this.hideIndicator();
            window.clickBack = true;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.top-main {
    width: 100%;
	background: #FFFFFF;
    .top {
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 88;
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.3);
        .title {
            width: 100%;
            height: 1rem;
            color: #2A2929;
            font-size: .36rem;
            line-height: 1rem;
            padding: 0 .32rem;
            background: #FFFFFF;
            .left {
                float: left;
                width: 25%;
            }
            .my-left {
                float: left;
                width: 25%;
                height: 100%;
            }
            img {
                float: left;
                width: .2rem;
                height: .32rem;
                margin: 0.34rem 0;
            }
            .title1 {
                float: left;
                width: 45%;
                text-align: center;
                color: #2A2929;
                font-size: .3rem;
                font-family: PingFang-SC-Medium;
                font-weight: bold;
                position: relative;
                .bottom-line {
                    position: absolute;
                    width: .6rem;
                    height: .1rem;
                    background: #78BDF2;
                    bottom: 0;
                    left: 50%;
                    margin-left: -.3rem;
                }
            }
            .right {
                float: right;
                height: 100%;
                width: 30%;
                text-align: right;
                font-size: .28rem;
                font-family: PingFang-SC-Medium;
                color: #2A2929;
            }
        }
    }
    .top-padd {
        height: 1rem;
    }
}


</style>
