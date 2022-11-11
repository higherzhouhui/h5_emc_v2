<template>
    <div class="homeIframe">
        <div class="replace-header">
			<div class="goBack" @click="goBack()">
                <img src="../../../static/images/back-icon.png" alt="" class="back-icon">
            </div>
			<div class="header-title">{{title}}</div>
			<div class="header-right"></div>
		</div>
        <iframe class="iframe-content" ref='iframeHeight' :src="iframeSrc" frameborder=0 width=100% marginheight=0 marginwidth=0 scrolling=yes style="overflow-y: scroll"></iframe>
    </div>
</template>

<script>
import HeaderTop from '../../components/top/top';
export default {
    name: 'iframeModel',
    components: {
        HeaderTop
    },
    data() {
        return {
            title:'',
            iframeSrc: ''
        }
    },
    beforeRouteLeave(to, from, next) {    
        sessionStorage.removeItem('title')
        sessionStorage.removeItem('iframeInfo')
		this.$destroy(true)
		next()
	},
    mounted() {
        // this.$refs.iframeHeight.height = parseInt(this.$refs.iframeHeight.height) - 8.17 + '%'
        this.iframeSrc = sessionStorage.getItem("iframeInfo")
        this.title = sessionStorage.getItem("title")
    },
    methods: {
        goBack(){
            this.$router.replace('/pay_index')
        },
    }
}
</script>
<style lang="scss" scoped>
.homeIframe{
	height:100%;
    .replace-header {
        width: 100%;
        height: 1rem;
        color: #2A2929;
        font-size: .36rem;
        line-height: 1rem;
        padding: 0 .32rem;
        background: #FFFFFF;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        z-index: 88;
        .goBack {
            width: .8rem;
            img {
                float: left;
                height: .32rem;
                margin: 0.34rem 0;
            }
        }
        .left-blank {
            width: .5rem;
        }
        .header-title {
            text-align: center;
            color: #2A2929;
            font-size: .3rem;
            font-family: PingFang-SC-Medium;
            position: relative;
        }
        .header-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0.8rem;
            height: 0.08rem;
            background: #78BDF2;
            margin-left: -.4rem;
        }
        .header-right {
            width: 1rem;
            img {
                height: .8rem;
            }
        }
    }
    .iframe-content {
        height: calc(100vh - 1rem);
        margin-top: 1rem;
    }
}
</style>
