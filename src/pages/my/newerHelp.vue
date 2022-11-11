<template>
    <div class="newer-help-body">
        <div class="reg-head">
            <div class="go-back" @click="toMy()">
                <img src="../../../static/images/back-icon.png" alt="" class="go-back-img">
            </div>
            <div class="head-title">新手教程</div>
            <div class="to-vipDetail"></div>
        </div>
        <div class="newer-help">
            <div class="help-list" v-for="(items,index) in helpList" :key="index" @click="detailPush(index)">
                {{ items.title }}
            </div>
            <!-- <div class="help-list" @click="detailPush(-1)">盘口教程</div> -->
        </div>
    </div>
</template>

<script>
import HeaderTop from '../../components/top/top';

export default {
    name: 'newerHelp',
    components: {
        HeaderTop
    },
    data() {
        return {
            helpList: [],
            version:this.API.paramVersion,
        }
    },
    mounted() {
        this.loadTop();
    },
    beforeRouteLeave(to, from, next) {
        sessionStorage.removeItem('virtualHelp')
        sessionStorage.removeItem('helpIndex')
        this.$destroy(true)
        next()
    },
    methods: {
        toMy(){
            this.$router.back()
        },
        getSession() {
            if (sessionStorage.getItem('helpIndex') !== null) {
                if(sessionStorage.getItem('helpIndex') === 'quickDeposit'){
                    this.helpList.forEach((i,t) => {
                        if(i.id === 19) {
                            this.$router.push({
                                name: 'newHelpDetail',
                                params: {imgUrl: this.helpList[t].content, title: this.helpList[t].title}
                            })
                        }
                    })
                }else if(sessionStorage.getItem('helpIndex') === 'quickWithdraw'){
                    this.helpList.forEach((i,t) => {
                        if(i.id === 20) {
                            this.$router.push({
                                name: 'newHelpDetail',
                                params: {imgUrl: this.helpList[t].content, title: this.helpList[t].title}
                            })
                        }
                    })
                }else if(sessionStorage.getItem('helpIndex') === 'biAn'){
                    this.helpList.forEach((i,t) => {
                        if(i.id === 21) {
                            this.$router.push({
                                name: 'newHelpDetail',
                                params: {imgUrl: this.helpList[t].content, title: this.helpList[t].title}
                            })
                        }
                    })
                }else if(sessionStorage.getItem('helpIndex') === 'oE'){
                    this.helpList.forEach((i,t) => {
                        if(i.id === 22) {
                            this.$router.push({
                                name: 'newHelpDetail',
                                params: {imgUrl: this.helpList[t].content, title: this.helpList[t].title}
                            })
                        }
                    })
                }else if(sessionStorage.getItem('helpIndex') === 'zB'){
                    this.helpList.forEach((i,t) => {
                        if(i.id === 23) {
                            this.$router.push({
                                name: 'newHelpDetail',
                                params: {imgUrl: this.helpList[t].content, title: this.helpList[t].title}
                            })
                        }
                    })
                }else if(sessionStorage.getItem('helpIndex') === 'yBf'){
                    this.helpList.forEach((i,t) => {
                        if(i.id === 24) {
                            this.$router.push({
                                name: 'newHelpDetail',
                                params: {imgUrl: this.helpList[t].content, title: this.helpList[t].title}
                            })
                        }
                    })
                }else if(sessionStorage.getItem('helpIndex') === 'TP'){
                    this.helpList.forEach((i,t) => {
                        if(i.id === 27) {
                            this.$router.push({
                                name: 'newHelpDetail',
                                params: {imgUrl: this.helpList[t].content, title: this.helpList[t].title}
                            })
                        }
                    })
                }
                sessionStorage.removeItem('helpIndex')
            }
        },
        loadTop() {
            let params = {
                gameBigType: 1,
                version: this.API.paramVersion,
            }
            this.ServerAPI.postAPI(this.API.sysHelp, params, this.sysHelp)
        },
        sysHelp(success, data) {
            if (success) {
                if (data.code === "0000") {
                    this.helpList = data.data;
                    this.getSession();
                }
            }
        },
        detailPush(index) {
            if(this.helpList[index].showType === 'pankou'){
                this.$router.push('/newHelpDetailPKJC')
            }else{
                this.$router.push({
                    name: 'newHelpDetail',
                    params: {imgUrl: this.helpList[index].content, title: this.helpList[index].title}
                })
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.newer-help-body {
    width: 100%;
    height: 100%;
    background: #edeff2;
    .reg-head {
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: bold;
        background: #FFFFFF;
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.3);
        padding: 0 .2rem;
        .go-back {
            width: 1.2rem;
            .go-back-img {
                height: .35rem;
            }
        }
        .head-title {
            font-size: .3rem;
        }
        .to-vipDetail {
            width: 1.2rem;
            color: #767676;
        }
    }
}
.help-list {
    float: left;
    width: 40%;
    height: .8rem;
    background: #FFFFFF;
    margin: .2rem 0 0 .5rem;
    line-height: .8rem;
    text-align: center;
    border-radius: .05rem;
    color: #767676;
}

</style>
