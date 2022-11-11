<template>
    <div class="newer-help-content">
        <HeaderTop :title="`盘口教程`"></HeaderTop>
        <div class="tab-title">
            <div class="tab-title-list" :class="titleIndex === 1?'title-chosing':''" @click="switchTitle(1)">让球</div>
            <div class="tab-title-list" :class="titleIndex === 2?'title-chosing':''" @click="switchTitle(2)">大小</div>
            <div class="tab-title-list" :class="titleIndex === 3?'title-chosing':''" @click="switchTitle(3)">独赢</div>
            <div class="tab-title-list" :class="titleIndex === 4?'title-chosing':''" @click="switchTitle(4)">角球</div>
            <div class="tab-title-list" :class="titleIndex === 5?'title-chosing':''" @click="switchTitle(5)">单双</div>
            <div class="tab-title-list" :class="titleIndex === 6?'title-chosing':''" @click="switchTitle(6)">波胆</div>
        </div>
        <div class="main-content" v-if="titleIndex === 1">
            <div class="main-content-title">
                <img src="../../../static/images/red-warning.png" alt="" class="left-icon">
                <div class="right-fonts">滚球-让球赛果为投注后的进球比分。例如：投注时比分1-0，完场比分：2-1，则滚球-让球盘赛果为：1-1</div>
            </div>
            <img src="../../../static/images/helper-pkjc-rq1.png" alt="" class="img-list">
            <img src="../../../static/images/helper-pkjc-rq2.png" alt="" class="img-list">
            <img src="../../../static/images/helper-pkjc-rq3.png" alt="" class="img-list">
            <img src="../../../static/images/helper-pkjc-rq4.png" alt="" class="img-list">
            <img src="../../../static/images/helper-pkjc-rq5.png" alt="" class="img-list">
            <img src="../../../static/images/helper-pkjc-rq6.png" alt="" class="img-list">
            <img src="../../../static/images/helper-pkjc-rq7.png" alt="" class="img-list">
            <img src="../../../static/images/helper-pkjc-rq8.png" alt="" class="img-list">
        </div>
        <div class="main-content" v-if="titleIndex === 2">
            <img src="../../../static/images/helper-pkjc-dx.png" alt="" class="img-list">
        </div>
        <div class="main-content" v-if="titleIndex === 3">
            <img src="../../../static/images/helper-pkjc-dy.png" alt="" class="img-list">
        </div>
        <div class="main-content" v-if="titleIndex === 4">
            <img src="../../../static/images/helper-pkjc-jq1.png" alt="" class="img-list">
            <img src="../../../static/images/helper-pkjc-jq2.png" alt="" class="img-list">
            <img src="../../../static/images/helper-pkjc-jq3.png" alt="" class="img-list">
            <img src="../../../static/images/helper-pkjc-jq4.png" alt="" class="img-list">
        </div>
        <div class="main-content" v-if="titleIndex === 5">
            <img src="../../../static/images/helper-pkjc-ds.png" alt="" class="img-list">
        </div>
        <div class="main-content" v-if="titleIndex === 6">
            <img src="../../../static/images/helper-pkjc-bd.png" alt="" class="img-list">
        </div>
    </div>
</template>

<script>
import HeaderTop from '../../components/top/top';

export default {
    name: 'newHelpDetailPKJC',
    components: {
        HeaderTop
    },
    data() {
        return {
            titleIndex:1
        }
    },
    mounted() {


    },
    beforeRouteLeave(to, from, next) {
        this.$destroy(true)
        next()
    },
    methods: {
        switchTitle(index){
            this.titleIndex = index
        }

    }
}
</script>

<style lang="scss" scoped>
.newer-help-content {
    background: #F6F7F8;
    .tab-title {
        width: 94%;
        margin: .2rem auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: .5rem;
        background: #FFFFFF;
        padding: .1rem;
        .tab-title-list {
            width: 16%;
            text-align: center;
            height: .6rem;
            line-height: .6rem;
            background: #FFFFFF;
            color: #6C6C6C;
            font-weight: bold;
            border-radius: .4rem;
        }
        .title-chosing {
            background: linear-gradient(to right,#78BDF2,#167BFF);
            color: #FFFFFF;
        }
        .tab-title-list-disable {
            background: #D7D7D8;
        }
    }
    .main-content {
        width: 94%;
        margin: .2rem auto;
        .main-content-title {
            display: flex;
            align-items: center;
            .left-icon {
                width: .4rem;
            }
            .right-fonts {
                color: #7C8591;
                font-size: .26rem;
                font-weight: bold;
                margin-left: .15rem;
            }
        }
        .img-list {
            display: block;
            width: 100%;
            margin-top: .2rem;
        }
    }
}

</style>
