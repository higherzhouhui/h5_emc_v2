<template>
	<div class="joinHY-body">
		<HeaderTop :title="`加入合营`">11</HeaderTop>
        <div class="main-content">
            <img src="../../../static/images/joinHY-logo.png" alt="" class="img-show img-show1">
            <img src="../../../static/images/joinHY-title.png" alt="" class="img-show img-show2">
            <div class="list-area">
                <img src="../../../static/images/joinHY-list-img1.png" alt="" class="square-content">
                <img src="../../../static/images/joinHY-list-img2.png" alt="" class="square-content">
            </div>
            <div class="list-area">
                <img src="../../../static/images/joinHY-list-img3.png" alt="" class="square-content">
                <img src="../../../static/images/joinHY-list-img4.png" alt="" class="square-content">
            </div>
            <img src="../../../static/images/joinHY-contact-title.png" alt="" class="img-show img-show3">
            <div class="info-area">
                <div class="info-list" v-if='hasEmail'>
                    <div class="info-list-left">
                        <img src="../../../static/images/joinHY-info-mail.png" alt="" class="left-icon">
                        <div class="left-fonts">Ｍail</div>
                    </div>
                    <div class="info-list-right">
                        <div class="right-fonts">{{emailInfo}}</div>
                        <img src="../../../static/images/joinHY-info-copy.png" alt="" class="right-icon" @click="copy('email')">
                    </div>
                </div>
                <div class="info-list" v-if='hasQq'>
                    <div class="info-list-left">
                        <img src="../../../static/images/joinHY-info-qq.png" alt="" class="left-icon">
                        <div class="left-fonts">QQ</div>
                    </div>
                    <div class="info-list-right">
                        <div class="right-fonts">{{qqInfo}}</div>
                        <img src="../../../static/images/joinHY-info-copy.png" alt="" class="right-icon" @click="copy('qq')">
                    </div>
                </div>
                <div class="info-list" v-if='hasSkype'>
                    <div class="info-list-left">
                        <img src="../../../static/images/joinHY-info-qq.png" alt="" class="left-icon">
                        <div class="left-fonts">Skype</div>
                    </div>
                    <div class="info-list-right">
                        <div class="right-fonts">{{skypeInfo}}</div>
                        <img src="../../../static/images/joinHY-info-copy.png" alt="" class="right-icon" @click="copy('skype')">
                    </div>
                </div>
            </div>
        </div>
		<input id="copy_content" type="text" value="" style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;" readonly/>
	</div>
</template>

<script>
import HeaderTop from '../../components/top/top'
import {Toast} from 'vant'

export default {
	name: 'joinHY',
	components: {
		HeaderTop,
	},
	data() {
		return {
			emailInfo: '',
			qqInfo: '',
			skypeInfo: '',
            hasEmail:false,
            hasQq:false,
            hasSkype:false,
		}
	},
    beforeRouteLeave (to, from, next) {
		this.$destroy(false)
		next()
	},
	mounted() {
		this.loadTop();
	},
	methods: {
		loadTop() {
			this.ServerAPI.postAPI(this.API.agentInfo, '', this.agentInfo)
		},
		agentInfo(success, data) {
			if (success) {
				if (data.code == "0000") {
                    data.data.forEach((i,t) => {
                        if(i.name === 'email') {
                            this.emailInfo = i.value;
                            this.hasEmail = true
                        }else if(i.name === 'qq') {
                            this.qqInfo = i.value;
                            this.hasQq = true
                        }else if(i.name === 'skype') {
                            this.skypeInfo = i.value;
                            this.hasSkype = true
                        }
                    })
				}
			}
		},
		copy(val) {
			var copyData = "";
			var inputElement = document.getElementById('copy_content')
			if ('email' == val) {
				copyData = this.emailInfo;
			} else if ('qq' == val) {
				copyData = this.qqInfo;
			} else {
				copyData = this.skypeInfo;
			}
			inputElement.value = copyData
			inputElement.select()
			document.execCommand("Copy");
			Toast('复制成功');
		},
	}
}
</script>

<style lang="scss" scoped>
.joinHY-body {
	width: 100%;
	height: 100%;
	background: url("../../../static/images/joinHY-bg.png") no-repeat;
	background-size: 100% 100%;
    .main-content {
        text-align: center;
        .img-show {
            display: block;
            margin: 0 auto;
        }
        .img-show1 {
            width: 1rem;
            margin-top: .4rem;
        }
        .img-show2 {
            width: 76%;
            margin-top: .4rem;
        }
        .img-show3 {
            width: 4rem;
            margin-top: .2rem;
        }
        .list-area {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 86%;
            margin: 0 auto;
            .square-content {
                width: 48%;
            }
        }
        .info-area {
            padding-bottom: .6rem;
            .info-list {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 84%;
                margin: .2rem auto 0;
                color: #464646;
                font-weight: bold;
                background: #FFFFFF;
                padding: .05rem .25rem;
                border-radius: .15rem;
                box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.2);
                .info-list-left {
                    display: flex;
                    align-items: center;
                    .left-icon {
                        width: .5rem;
                    }
                    .left-fonts {
                        font-size: .3rem;
                        margin-left: .2rem;
                    }
                }
                .info-list-right {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    .right-icon {
                        width: .86rem;
                        margin-right: -.2rem;
                    }
                }
            }
        }
    }
}
</style>
