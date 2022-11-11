<template>
  <div
    class="fix-bottom"
    v-show="navigator.isShow"
    :class="'fix-bottom' + numFlag"
  >
    <div class="main-fix">
      <div
        class="bottom-box"
        @click="toPushT(3)"
        :class="numFlag === 3 ? 'bg-activing' : ''"
      >
        <div class="lottie-icon" v-show="numFlag !== 3">
          <!-- <lottie style='width:.6rem;height:.6rem;padding:0' :options="defaultOptionsPrize"/> -->
          <img
            src="../../../static/images/tarbar-hb-normal.png"
            alt=""
            class="tarbar-icon"
          />
        </div>
        <div class="lottie-icon" v-if="numFlag === 3">
          <!-- <lottie style='width:.6rem;height:.6rem;padding:0' :options="defaultOptionsPrize2"/> -->
          <img
            src="../../../static/images/tarbar-hb-activing.png"
            alt=""
            class="tarbar-icon"
          />
        </div>
        <div class="text" :class="numFlag == 3 ? 'color-text' : ''">红包</div>
      </div>
      <div
        class="bottom-box"
        @click="toPushT(2)"
        :class="numFlag === 2 ? 'bg-activing' : ''"
      >
        <div class="lottie-icon" v-show="numFlag !== 2">
          <!-- <lottie style='width:.6rem;height:.6rem;padding:0' :options="defaultOptionsHome"/> -->
          <img
            src="../../../static/images/tarbar-home-normal.png"
            alt=""
            class="tarbar-icon"
          />
        </div>
        <div class="lottie-icon" v-if="numFlag === 2">
          <!-- <lottie style='width:.6rem;height:.6rem;padding:0' :options="defaultOptionsHome2"/> -->
          <img
            src="../../../static/images/tarbar-home-activing.png"
            alt=""
            class="tarbar-icon"
            style="height: 0.9rem; margin-bottom: 0.12rem"
          />
        </div>
        <div class="text" :class="numFlag == 2 ? 'color-text' : ''">娱乐</div>
      </div>
      <div
        class="bottom-box"
        @click="toPushT(5)"
        :class="numFlag === 5 ? 'bg-activing' : ''"
      >
        <div class="lottie-icon" v-show="numFlag !== 5">
          <img
            src="../../../static/images/tarbar-help-normal.png"
            alt=""
            class="tarbar-icon"
          />
        </div>
        <div class="lottie-icon" v-if="numFlag === 5">
          <img
            src="../../../static/images/tarbar-help-activing.png"
            alt=""
            class="tarbar-icon"
          />
        </div>
        <div class="text" :class="numFlag == 5 ? 'color-text' : ''">客服</div>
      </div>
      <!-- <div class='bottom-box' @click="toPushT(6)" :class="numFlag === 6?'bg-activing':''">
				<div class="lottie-icon flex-c" v-show='numFlag !== 6'>
                    <img src="../../../static/images/tarbar-orders-normal.png" alt="" class="tarbar-icon">
                </div>	
                <div class="lottie-icon" v-if='numFlag === 6'>
                    <img src="../../../static/images/tarbar-orders-activing.png" alt="" class="tarbar-icon">
                </div>
				<div class="text" :class="numFlag==6? 'color-text':''">注单</div>
			</div> -->
      <div
        class="bottom-box"
        @click="toPushT(4)"
        :class="numFlag === 4 ? 'bg-activing' : ''"
      >
        <div class="lottie-icon flex-c" v-show="numFlag !== 4">
          <!-- <lottie style='width:.6rem;height:.6rem;padding:0' :options="defaultOptionsMy"/> -->
          <img
            src="../../../static/images/tarbar-my-normal.png"
            alt=""
            class="tarbar-icon"
          />
        </div>
        <div class="lottie-icon" v-if="numFlag === 4">
          <!-- <lottie style='width:.6rem;height:.6rem;padding:0' :options="defaultOptionsMy2"/> -->
          <img
            src="../../../static/images/tarbar-my-activing.png"
            alt=""
            class="tarbar-icon"
          />
        </div>
        <div class="text" :class="numFlag == 4 ? 'color-text' : ''">我的</div>
        <div class="unread-point" v-if="hasUnread"></div>
      </div>
      <van-action-sheet v-model="helpList">
        <div class="help-list-box">
          <img
            src="../../../static/images/help-list-img1.png"
            alt=""
            class="help-list"
            @click="showNoticeFn(1)"
            v-if="showHelp1"
          />
          <img
            src="../../../static/images/help-list-img2.png"
            alt=""
            class="help-list"
            @click="showNoticeFn(2)"
            v-if="showHelp2"
          />
          <div class="help-close-btn">
            <div class="help-close-btn-fonts flex-c" @click="helpList = false">
              取消
            </div>
          </div>
        </div>
      </van-action-sheet>
      <!-- 新站内信提醒弹框 -->
      <van-popup
        v-model="showMsg"
        class="msg-show"
        :close-on-click-overlay="false"
      >
        <div class="msg-title"></div>
        <div class="msg-content-box">
          <div class="msg-popup-title-fonts flex-c bold">
            <span class="left-blue-line"></span>
            <span>您有未读的新消息！</span>
          </div>
          <div class="msg-content msg-content2">
            <div class="sle new-msg-title">{{ msgTitle }}</div>
            <div class="sle2 new-msg-content text-c" v-html="msgContent"></div>
          </div>
          <div class="bottom-area">
            <div class="confirm-btn" @click="closeSelect()">稍后查看</div>
            <div class="confirm-btn confirm-btn2" @click="closeSelect2()">
              立即查看
            </div>
          </div>
        </div>
      </van-popup>
      <!-- 强推站内信弹框 -->
      <van-popup
        v-model="msgMustShow"
        class="msg-show"
        :close-on-click-overlay="false"
      >
        <div class="msg-title"></div>
        <div class="msg-content-box">
          <div class="msg-popup-title-fonts flex-c bold">
            <span class="left-blue-line"></span>
            <span>站内信</span>
          </div>
          <div class="msg-time flex-c">{{ msgMustTime }}</div>
          <div class="msg-content msg-content2">
            <div class="sle new-msg-title">{{ msgMustTitle }}</div>
            <div class="sle2 must-msg-content" v-html="msgMustContent"></div>
          </div>
          <div class="bottom-area">
            <div class="confirm-btn" @click="closeMust()">关闭</div>
            <div class="confirm-btn confirm-btn2" @click="disableMust()">
              不再提醒
            </div>
          </div>
        </div>
      </van-popup>
      <!-- 客服平台公告弹框 -->
      <van-popup
        v-model="showNotice"
        class="notice-pop"
        :close-on-click-overlay="false"
      >
        <div class="notice-line"></div>
        <div class="notice-title bold flex-c">
          <div class="title-left"></div>
          客服公告
        </div>
        <div class="notice-time flex-c">{{ helpData.windowBeginTime }}</div>
        <div class="notice-title-2 text-c">{{ helpData.windowTitle }}</div>
        <div class="notice-content" v-html="helpData.windowContent"></div>
        <div class="bottom-btn flex-c" @click="toHelpMode(helpIndex)">
          我已了解
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  mobileModel,
  browserName,
  osVersion,
  browserVersion,
} from "mobile-device-detect";
import myIcon from "@/assets/lottie/tabbar-my.json";
import serverIcon from "@/assets/lottie/tabbar-server.json";
import prizeIcon from "@/assets/lottie/tabbar-prize.json";
import homeIcon from "@/assets/lottie/tabbar-home.json";
import dayjs from "dayjs";
export default {
  data() {
    return {
      bottomNav: "cashGift",
      bottomNavColor: "cashGift",
      mainList: "main-list",
      isCashGift: "cashGift-on",
      isService: "service",
      isDiscount: "discount",
      isMy: "my",
      isMore: "isMore",
      test: true,
      numFlag: 2,
      loginIP: "",
      mobileModel: this.mobileModel,
      defaultOptionsMy: { animationData: myIcon, loop: false, autoplay: false },
      defaultOptionsMy2: { animationData: myIcon, loop: false, autoplay: true },
      defaultOptionsServer: {
        animationData: serverIcon,
        loop: false,
        autoplay: false,
      },
      defaultOptionsServer2: {
        animationData: serverIcon,
        loop: false,
        autoplay: true,
      },
      defaultOptionsPrize: {
        animationData: prizeIcon,
        loop: false,
        autoplay: false,
      },
      defaultOptionsPrize2: {
        animationData: prizeIcon,
        loop: false,
        autoplay: true,
      },
      defaultOptionsHome: {
        animationData: homeIcon,
        loop: false,
        autoplay: false,
      },
      defaultOptionsHome2: {
        animationData: homeIcon,
        loop: false,
        autoplay: true,
      },
      helpList: false,
      showHelp1: false,
      showHelp2: false,
      helpData: {},
      showMsg: false,
      msgTitle: "",
      msgContent: "",
      msgId: -1,
      showNotice: false,
      helpIndex: -1,
      helpNoticeSwitch: false,
      msgMustShow: false,
      msgMustTime: "",
      msgMustTitle: "",
      msgMustContent: "",
      mustId: null,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy(true);
    next();
  },
  mounted() {
    let loginMark = localStorage.getItem("login_flag");
    // this.navigator.isShow = false
    if (window.location.href.indexOf("login") === -1 && loginMark === "true") {
      if (
        sessionStorage.getItem("isSelect") == null ||
        sessionStorage.getItem("isSelect") === undefined ||
        sessionStorage.getItem("isSelect") === "NaN"
      ) {
        this.numFlag = 2;
        this.toPushT(2);
      } else {
        this.numFlag = parseInt(sessionStorage.getItem("isSelect"));
        this.toPushT(this.numFlag);
        if (this.numFlag == 5) {
          this.helpList = false;
          this.toPushT(2);
        }
      }
    } else {
      if (
        window.location.href.indexOf("login") === -1 &&
        window.location.href.indexOf("loginVerify") === -1 &&
        window.location.href.indexOf("deviceInfo") === -1 &&
        window.location.href.indexOf("help2") === -1 &&
        window.location.href.indexOf("phonePassword") === -1 &&
        window.location.href.indexOf("register") === -1 &&
        window.location.href.indexOf("registerStep2") === -1
      ) {
        this.navigator.isShow = true;
        this.numFlag = parseInt(sessionStorage.getItem("isSelect"));
        this.toPushT(this.numFlag);
      } else {
        this.navigator.isShow = false;
      }
    }
    sessionStorage.setItem("mobileModel", mobileModel);
    if (loginMark !== "false") {
      this.getIp();
      this.isLoginPlan();
      this.getMustFn();
    }
  },
  watch: {
    tarbarIndex(value) {
      this.helpList = false;
      if (this.numFlag !== 5) {
        this.toPushT(value);
        this.navigator.isShow = true;
      }
    },
  },
  computed: mapState({
    navigator: (state) => state.common.navigator,
    tarbarIndex: (state) => state.common.tarbarIndex,
    hasUnread: (state) => state.common.unread,
  }),
  newMobileMode: function () {
    return mobileModel;
  },
  methods: {
    //设置‘强推’cookie
    setCookie(mustSwitch, mustTime) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * mustTime); //保存的天数
      window.document.cookie =
        "mustSwitch" +
        "=" +
        mustSwitch +
        ";path=/;expires=" +
        exdate.toGMTString();
      var search = "mustSwitch" + "=";
      var returnValue = "";
      if (document.cookie.length > 0) {
        var offset = document.cookie.indexOf(search);
        if (offset !== -1) {
          offset += search.length;
          var end = document.cookie.indexOf(";", offset);
          if (end == -1) {
            end = document.cookie.length;
          }
          returnValue = decodeURIComponent(
            document.cookie.substring(offset, end)
          );
        }
      }
    },
    closeMust() {
      this.msgMustShow = false;
      this.setCookie("false", 1);
      this.checkMsgNum();
      this.checkDepositPlan();
    },
    disableMust() {
      this.msgMustShow = false;
      this.setCookie("", -1);
      this.checkMsgNum();
      this.checkDepositPlan();
      this.disableMustFn();
    },
    getMustFn() {
      this.ServerAPI.postAPI(this.API.getMustMsg, "", (success, data) => {
        if (success) {
          if (data.code == "0000") {
            //获取‘强推’cookie
            var search = "mustSwitch" + "=";
            var returnValue = "";
            if (document.cookie.length > 0) {
              var offset = document.cookie.indexOf(search);
              if (offset !== -1) {
                offset += search.length;
                var end = document.cookie.indexOf(";", offset);
                if (end == -1) {
                  end = document.cookie.length;
                }
                returnValue = decodeURIComponent(
                  document.cookie.substring(offset, end)
                );
              }
            }
            if (returnValue !== "false") {
              this.msgMustShow = true;
              this.mustId = data.data.id;
              this.msgMustTitle = data.data.title;
              this.msgMustContent = data.data.content;
              this.msgMustTime =
                dayjs(data.data.addTime).$y +
                "年" +
                (dayjs(data.data.addTime).$M + 1) +
                "月" +
                dayjs(data.data.addTime).$D +
                "日" +
                dayjs(data.data.addTime).$H +
                ":" +
                dayjs(data.data.addTime).$m +
                ":" +
                dayjs(data.data.addTime).$s;
              var reg =
                /((http|https):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|])/g;
              this.msgMustContent = this.msgMustContent.replace(/\n/g, "<br>");
              this.msgMustContent = this.msgMustContent.replace(
                /\t/g,
                "&emsp;"
              );
              this.msgMustContent = this.msgMustContent.replace(
                reg,
                "<a href='$1' target='_blank' style='color: #028AFE;width: 360px;display: inline;'>$1</a>"
              );
            } else {
              this.checkMsgNum();
              this.checkDepositPlan();
            }
          } else {
            this.checkMsgNum();
            this.checkDepositPlan();
          }
        }
      });
    },
    disableMustFn() {
      let params = {
        id: this.mustId,
      };
      this.ServerAPI.postAPI(
        this.API.disableMustMsg,
        params,
        (success, data) => {
          if (success) {
            if (data.code == "0000") {
            } else {
            }
          }
        }
      );
    },
    //站内信接口请求方法
    checkMsgNum() {
      if (localStorage.getItem("login_flag") === "false") {
        return false;
      } else {
        let params = {
          visitType: "APP",
          version: this.API.paramVersion,
        };
        this.ServerAPI.postAPI(
          this.API.checkUnread,
          params,
          (success, data) => {
            if (success) {
              if (data.code === "0000") {
                if (data.data > 0) {
                  this.$store.commit("COMMON_UNREAD", true);
                } else {
                  this.$store.commit("COMMON_UNREAD", false);
                }
              }
            }
            this.ServerAPI.postAPI(
              this.API.checkMsg,
              params,
              (success, data) => {
                if (success) {
                  if (data.code == "0000") {
                    this.msgId = data.data.id;
                    if (
                      this.msgId >
                        parseInt(sessionStorage.getItem("msgSaveId")) ||
                      !!sessionStorage.getItem("msgSaveId") === false
                    ) {
                      this.showMsg = true;
                      this.msgTitle = data.data.title;
                      this.msgContent = data.data.content;
                    }
                  }
                }
                setTimeout(() => {
                  this.checkMsgNum();
                }, 20000);
              }
            );
          }
        );
      }
    },
    closeSelect() {
      this.showMsg = false;
      sessionStorage.setItem("msgSaveId", this.msgId);
    },
    closeSelect2() {
      let params = {
        id: this.msgId,
      };
      this.ServerAPI.postAPI(this.API.singleMsg, params, (success, data) => {
        if (success) {
          this.showMsg = false;
          sessionStorage.setItem("msgId", this.msgId);
          this.$router.push({ name: "notice", params: { tabNum: 1 } });
          if (data.code === "0000") {
          } else {
          }
        } else {
          Toast("网络缓慢，请稍后重试");
        }
      });
    },
    checkDepositPlan: function () {
      localStorage.setItem("holdDepositPlan", false);
      this.checkDepositFn();
      this.checkWithdrawFn();
      setInterval(() => {
        if (localStorage.getItem("holdDepositPlan") === "false") return false;
        localStorage.setItem("holdDepositPlan", false);
        this.checkDepositFn();
        this.checkWithdrawFn();
      }, 60000);
    },
    checkDepositFn() {
      if (localStorage.getItem("login_flag") === "false") return;
      let param = {
        version: this.API.paramVersion,
      };
      this.ServerAPI.postAPI(
        this.API.checkQuickDeposit,
        param,
        (success, data) => {
          localStorage.setItem("holdDepositPlan", true);
          if (success) {
            if (data.code === "0000") {
              if (this.$route.path !== "/pay_index") {
                this.$quickPop(1);
              }
            }
          }
        }
      );
    },
    checkWithdrawFn() {
      if (localStorage.getItem("login_flag") === "false") return;
      let param = {
        version: this.API.paramVersion,
      };
      this.ServerAPI.postAPI(
        this.API.checkQuickWithdraw,
        param,
        (success, data) => {
          localStorage.setItem("holdDepositPlan", true);
          if (success) {
            if (data.code === "0000") {
              if (this.$route.path !== "/extract") {
                this.$quickPop(2);
              }
            }
          }
        }
      );
    },
    isLoginPlan: function () {
      localStorage.setItem("holdPlan", false);
      this.isLogin();
      setInterval(() => {
        if (localStorage.getItem("holdPlan") === "false") return false;
        localStorage.setItem("holdPlan", false);
        this.isLogin();
      }, 200000);
    },
    isLogin: function () {
      if (localStorage.getItem("login_flag") === "false") return;
      this.ServerAPI.postAPI(this.API.isLogin, "", (success, data) => {
        localStorage.setItem("holdPlan", true);
        if (success) {
          if (data.code === "9000") {
            this.setLogin(false);
            // 报9000返回登录
            this.$router.replace({ path: "/login" });
          }
          if (data.code === "0000") {
            this.setLogin(true);
          }
        }
      });
    },
    getIp() {
      this.ServerAPI.postAPI(this.API.getIp, "", (success, data) => {
        if (success) {
          if (data.code == "0000") {
            this.loginIP = data.data;
            sessionStorage.setItem("loginIP", this.loginIP);
          }
        }
      });
    },
    getHelpInfo() {
      let params = {
        version: this.API.paramVersion,
        appType: "H5",
        visitType: "WAP",
        phoneVersion: browserName + " " + browserVersion,
        phoneModel: mobileModel,
      };
      this.ServerAPI.postAPI(this.API.setting, params, (success, data) => {
        if (success) {
          if (data.code === "0000") {
            this.helpData = data.data;
            if (data.data.kefu1 !== null) {
              this.showHelp1 = true;
            } else {
              this.showHelp1 = false;
            }
            if (data.data.kefu2 !== null) {
              this.showHelp2 = true;
            } else {
              this.showHelp2 = false;
            }
            if (data.data.windowStatus === true) {
              this.helpNoticeSwitch = true;
            } else {
              this.helpNoticeSwitch = false;
            }
          }
        }
      });
    },
    showNoticeFn(val) {
      this.helpIndex = val;
      if (this.helpNoticeSwitch === true) {
        this.showNotice = true;
        this.helpList = false;
      } else {
        this.toHelpMode(val);
      }
    },
    toHelpMode(value) {
      this.numFlag = 5;
      this.showNotice = false;
      if (value === 1) {
        if (this.helpData.kefu1 === "LiveChatSDK") {
          sessionStorage.setItem("helpUrl", this.API.kfLiveChat);
        } else {
          sessionStorage.setItem("helpUrl", this.helpData.kefu1);
        }
      } else if (value === 2) {
        sessionStorage.setItem("helpUrl", this.helpData.kefu2);
      }
      if (sessionStorage.getItem("isSelect") === "5") {
        location.reload();
      } else {
        sessionStorage.setItem("isSelect", "5");
        this.$store.commit("TARBAR", 5);
        this.$router.push("/help");
      }
    },
    toPushT(id) {
      // this.numFlag = id;
      if (id === 1) {
        // this.isMore = 'isMore-on';
        // this.isCashGift = 'cashGift';
        // this.isService = 'service';
        // this.isMy = 'my';
        // this.isDiscount = 'discount';
        this.$router.push("/");
      }
      if (id === 2) {
        // this.isMore = 'isMore';
        // this.isCashGift = 'cashGift-on';
        // this.isService = 'service';
        // this.isDiscount = 'discount';
        // this.isMy = 'my';
        this.$router.push("/");
      }
      if (id === 3) {
        // this.isMore = 'isMore';
        // this.isCashGift = 'cashGift';
        // this.isService = 'service-on';
        // this.isDiscount = 'discount';
        // this.isMy = 'my';
        this.$router.push("/sponsorShip-new");
      }
      if (id === 6) {
        // this.isMore = 'isMore';
        // this.isCashGift = 'cashGift';
        // this.isService = 'service-on';
        // this.isDiscount = 'discount';
        // this.isMy = 'my';
        this.$router.push("/betOrders");
      }
      if (id === 4) {
        // this.isMore = 'isMore';
        // this.isCashGift = 'cashGift';
        // this.isService = 'service';
        // this.isDiscount = 'discount';
        // this.isMy = 'my-on';
        let loginMark = this.loginToastFn();
        if (loginMark !== false) {
          this.$router.push("/my");
        }
        // setTimeout(() => {
        //     this.checkUnread()
        // }, 100);
      }
      if (id === 5) {
        // let loginMark = this.loginToastFn()
        // if(loginMark !== false){
        this.getHelpInfo();
        this.helpList = true;
        // }
        // this.isMore = 'isMore';
        // this.isCashGift = 'cashGift';
        // this.isService = 'service';
        // this.isDiscount = 'discount-on';
        // this.isMy = 'my';
        // this.$router.push("/help")
      }
      if (id !== 5) {
        if (id === 4) {
          if (localStorage.getItem("login_flag") !== "false") {
            this.numFlag = id;
            sessionStorage.setItem("isSelect", this.numFlag);
            this.$store.commit("TARBAR", id);
          }
        } else {
          this.numFlag = id;
          sessionStorage.setItem("isSelect", this.numFlag);
          this.$store.commit("TARBAR", id);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.fix-bottom {
  z-index: 2000;
  height: 1.3rem;
  // background: url(../../../static/images/tarbar-bg.png) -3.5% top no-repeat;
  // background-size: 32% 1rem;
  padding-top: 0.2rem;
}
.fix-bottom3 {
  background: url(../../../static/images/tarbar-bg.png) -5% 0.022rem no-repeat;
  background-size: 32% 1rem;
}
.fix-bottom2 {
  background: url(../../../static/images/tarbar-bg.png) 32% 0.022rem no-repeat;
  background-size: 32% 1rem;
}
.fix-bottom4 {
  background: url(../../../static/images/tarbar-bg.png) 107% 0.022rem no-repeat;
  background-size: 32% 1rem;
}
.fix-bottom5 {
  background: url(../../../static/images/tarbar-bg.png) 68% 0.022rem no-repeat;
  background-size: 32% 1rem;
}
.fix-bottom6 {
  background: url(../../../static/images/tarbar-bg.png) 68% 0.022rem no-repeat;
  background-size: 32% 1rem;
}
.main-fix {
  display: flex;
  justify-content: space-around;
  height: 1.1rem;
  background: #ffffff;
  // border-top: #EDF0F3 1px solid;
  .bottom-box {
    width: 25%;
    text-align: center;
    position: relative;
    z-index: 2001;
    padding-top: 0.1rem;
    border-top: #f4f6f7 1px solid;
    .lottie-icon {
      margin-top: 0.05rem;
      .tarbar-icon {
        height: 1rem;
        margin-top: -0.2rem;
      }
    }
    .text {
      color: #6f788b;
      font-size: 0.19rem;
      margin-top: -0.24rem;
      // margin-top: -.02rem;
    }
    .color-text {
      color: #1d9dfc;
      font-weight: bold;
    }
    .unread-point {
      position: absolute;
      width: 0.12rem;
      height: 0.12rem;
      top: 0.1rem;
      left: 50%;
      transform: translateX(-50%);
      margin-left: 0.3rem;
      background: #d2362c;
      border-radius: 50%;
    }
  }
  .bg-activing {
    border: none;
  }
  .main-list {
    position: relative;
    width: 25%;
    height: 1rem;
    //margin-top: .4rem;
    text-align: center;
  }
}
.help-list-box {
  .help-list {
    display: block;
    width: 90%;
    margin: 0 auto 0.2rem;
  }
  .help-close-btn {
    width: 100%;
    background: #ffffff;
    border-radius: 0.3rem 0.3rem 0 0;
    color: #7c8591;
    font-weight: bold;
    font-size: 0.3rem;
    padding: 0.2rem 0 0.2rem;
    .help-close-btn-fonts {
      width: 90%;
      height: 0.8rem;
      margin: 0 auto;
      border: 1px solid #c3cad7;
      border-radius: 2px;
    }
  }
}
.van-popup {
  background: none;
  background-color: unset;
}
.msg-show {
  width: 5.6rem;
  border-radius: 0.14rem;
  overflow: hidden;
  .msg-title {
    width: 100%;
    height: 0.15rem;
    line-height: 1rem;
    text-align: center;
    font-size: 0.3rem;
    background: linear-gradient(90deg, #78bdf2 0%, #167bff 100%);
  }
  .msg-content-box {
    background: #ffffff;
    padding-top: 0.2rem;
  }
  .msg-popup-title-fonts {
    font-size: 0.34rem;
    .left-blue-line {
      width: 0.08rem;
      height: 0.4rem;
      background: linear-gradient(to bottom, #167bff, #ffffff);
      margin-right: 0.1rem;
    }
  }
  .msg-time {
    color: #a8b3c3;
    font-size: 0.2rem;
    margin-top: 0.1rem;
  }
  .msg-content {
    background: #ffffff;
    height: 1rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    overflow: auto;
  }
  .msg-content2 {
    height: auto;
    // max-height: 4rem;
    overflow-y: auto;
    .sle {
      width: 100%;
      font-size: 0.28rem;
      text-align: center;
      color: #0f94ff;
      font-weight: bold;
      padding: 0 0.2rem;
    }
    .sle2 {
      width: 100%;
      height: auto;
      overflow-y: scroll;
      margin-top: 0.1rem;
      padding: 0 0.2rem;
      word-wrap: break-word;
      p {
        color: rgba(0, 0, 0, 0.87);
        font-size: 0.26rem;
        height: 0.28rem;
        line-height: 0.28rem;
      }
    }
    .new-msg-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .new-msg-content {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #666666;
    }
    .must-msg-content {
      color: #666666;
      padding: 0 0.4rem;
      max-height: 4rem;
    }
  }
  .bottom-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    border-bottom-left-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
    overflow: hidden;
    .confirm-btn {
      width: 50%;
      height: 0.9rem;
      line-height: 0.9rem;
      // background: #AFB6C5;
      color: #afb6c5;
      border-top: rgba(0, 0, 0, 0.1) 1px solid;
    }
    .confirm-btn2 {
      color: #333333;
    }
    .confirm-btn3 {
      color: #333333;
    }
    .confirm-btn:first-child {
      border-right: rgba(0, 0, 0, 0.1) 1px solid;
    }
  }
}
.notice-pop {
  background: #ffffff;
  border-radius: 0.1rem;
  width: 5rem;
  .notice-line {
    background: linear-gradient(90deg, #78bdf2 0%, #167bff 100%);
    height: 0.16rem;
  }
  .notice-title {
    font-size: 0.32rem;
    margin-top: 0.2rem;
    .title-left {
      background: linear-gradient(
        180deg,
        #78bdf2 0%,
        rgba(120, 189, 242, 0) 100%
      );
      height: 0.34rem;
      width: 0.08rem;
      margin-right: 0.1rem;
    }
  }
  .notice-time {
    color: #a8b3c3;
    font-size: 0.2rem;
    margin-top: 0.04rem;
  }
  .notice-title-2 {
    font-size: 0.3rem;
    color: #1d9dfc;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 0.2rem;
    margin-top: 0.2rem;
  }
  .notice-content {
    padding: 0 0.26rem 0.26rem;
    line-height: 20px;
    // color: #17191C;
    color: rgba(0, 0, 0, 0.86);
    margin-top: 0.2rem;
    word-break: break-all;
  }
  .bottom-btn {
    height: 0.8rem;
    border-top: rgba(213, 218, 226, 0.39) 1px solid;
    color: #303030;
    font-size: 0.3rem;
  }
}
</style>
