<template>
    <div class="birthday">
        <HeaderTop :title="title"></HeaderTop>
        <div class="topP">
            <div class="pw-banner">
                <div class="revise-account-input-left">生日</div>
                <div class="revise-account-input-box" @click="showDate = true">{{ birthday }}</div>
            </div>
            <div class="bottom-btn-box">
                <van-button v-if='dateCheck' class="bottom-btn" round type="info" color="#0895FE" block @click="toPush()">提交</van-button>
                <div  v-if='!dateCheck' class="disable-btn">提交</div>
            </div>
            <div class="bottom-fonts">提交后无法修改,若需修改请洽客服人员</div>
        </div>
        <van-popup v-model="showDate" position="bottom">
            <van-datetime-picker v-model="currentDate" type="date" title="选择月日" :min-date="minDate" :max-date="maxDate" :formatter="formatter"  @confirm='dateChosed' @cancel='showDate = false'/>
        </van-popup>
    </div>
</template>

<script>
import HeaderTop from "../../components/top/top";
import { Toast } from "vant";
import dayjs from 'dayjs';
export default {
    name: "birthday",
    components: {
        HeaderTop,
    },
    data() {
        return {
            title: "生日",
            btnText: "提交",
            birthday: "请选择生日",
            minDate: new Date(1950, 0, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(1990,0,1),
            showDate:false,
            dateCheck:false,
            dateParam:'',
        };
    },
    beforeRouteLeave(to, from, next) {
		this.$destroy(true)
		next()
	},
    mounted() {},
    methods: {
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`;
            }else if (type === 'month') {
                return `${val}月`;
            } else if (type === 'day') {
                return `${val}日`;
            }
            return val;
        },
        dateChosed(value){
            let Y = dayjs(value).$y
            let M = dayjs(value).$M + 1
            let D = dayjs(value).$D
            if(M < 10) {
                M = '0' + M
            }
            if(D < 10) {
                D = '0' + D
            }
            this.birthday = Y + '年' + M + '月' + D + '日'
            this.dateParam = Y + '-' + M + '-' + D
            this.showDate = false
            this.dateCheck = true
        },
        toPush() {
            let params = {
                birthDate: this.dateParam,
                version: this.API.paramVersion,
            };
            this.ServerAPI.postAPI(this.API.editUserInfo,params,(success, data) => {
                    if (success) {
                        if (data.code == "0000") {
                            Toast(data.info);
                            this.$router.back()
                        } else {
                            Toast(data.info);
                        }
                    } else {
                        Toast("网络错误，请重试");
                    }
                }
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.birthday {
    width: 100%;
    height: 100%;
    background: #edeff2;
    .topP {
        margin: 0.2rem 0 0;
        padding: 0 0.3rem;
        .pw-banner {
            width: 100%;
            height: 1rem;
            border-radius: 0.07rem;
            background: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.3rem;
            margin-bottom: 0.2rem;
            .revise-account-input-left {
                width: 1.8rem;
            }
            .revise-account-input-box {
                width: calc(100% - 2rem);
                display: flex;
                justify-content: flex-end;
                align-items: center;
                input {
                    width: 100%;
                    border: 0 none;
                    font-size: 0.28rem;
                    color: #191d2a;
                    text-align: right;
                    // width: 2rem;
                }
                .clickDel {
                    width: 0.3rem;
                    height: 0.3rem;
                    background: url("../../../static/images/click-delet.png")
                        no-repeat;
                    background-size: 100% 100%;
                    margin-left: 0.15rem;
                }
            }
        }
        .bottom-btn-box {
            width: 70%;
            margin: 0.4rem auto 0;
            .disable-btn {
                width: 100%;
                height: 0.9rem;
                line-height: .9rem;
                margin: 0.4rem auto 0;
                background: #D7D7D8;
                color: #303030;
                text-align: center;
                border-radius: .5rem;
            }
        }
        .bottom-fonts {
            margin-top: .2rem;
            font-size: .26rem;
            text-align: center;
        }
    }
}
.submitBlue {
    width: 70%;
    margin: 0 auto;

    .btnCover {
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        color: #ffffff;
        text-align: center;
        background: linear-gradient(90deg, #20a4ff, #067dff);
        margin-top: 0.6rem;
        border: none;
        border-radius: 0.45rem;
    }
}
</style>
