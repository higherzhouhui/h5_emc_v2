<template>
  <div class="login">
    <div class="toApp" v-if="showToApp">
      <div class="left-part">
        <div class="toApp-close" @click="closeShowApp()"></div>
        <img src="../../../static/images/login-title-logo.png" alt="" />
        <div class="toApp-fonts">
          <p>毫秒级操作体验</p>
          <p>请下载EMC易倍原生APP</p>
        </div>
      </div>
      <a class="toApp-right" :href="downloadUrl" target="_blank">
        <span>立即下载</span>
        <img src="../../../static/images/activeRed.gif" alt="" />
      </a>
    </div>
    <!-- <img v-lazy="API.assetsUrl + '/static/login-top.png'" alt="" class="top-show"/> -->
    <img
      v-lazy="API.assetsUrl + '/word-cup/login-sewy.webp'"
      alt=""
      class="top-show"
    />
    <!--loading-new-->
    <div class="loading-new" v-if="showLoading">
      <img src="../../../static/images/allLoading.gif" alt="" />
    </div>
    <div class="input-area">
      <div class="name-remind" v-if="showNameRemind">
        请输入5到16位字母和数字组合的用户名
      </div>
      <div class="user-name">
        <img
          src="../../../static/images/user-name-icon.png"
          alt=""
          class="user-name-icon"
        />
        <input
          id="userName"
          type="text"
          maxlength="16"
          placeholder="请输入用户名或邮箱号"
          @input="accountStore()"
          @focus="nameRemindShow()"
          @blur="nameRemindHide()"
          ref="accountInput"
          v-model="accCookieValue"
        />
        <div class="delete-box">
          <img
            v-if="showAcc"
            class="delete"
            src="../../../static/images/account-delete.png"
            @click="deleteIpt()"
          />
        </div>
      </div>
      <div class="pwd-remind" v-if="showPwdRemind">
        请输入5到16位字母和数字组合的密码
      </div>
      <div class="user-pwd">
        <img
          src="../../../static/images/user-pwd-icon.png"
          alt=""
          class="user-pwd-icon"
        />
        <input
          id="userPwd"
          type="password"
          maxlength="16"
          placeholder="请输入密码"
          @input="pwdStore()"
          @focus="pwdRemindShow()"
          @blur="pwdRemindHide()"
          ref="pwdInput"
          v-model="pwdCookieValue"
        />
        <div class="delete-box2">
          <img
            v-if="showPwd"
            class="delete2"
            src="../../../static/images/pwd-show.png"
            @click="switchShow()"
          />
          <img
            v-if="showPwd2"
            class="delete3"
            src="../../../static/images/pwd-hide.png"
            @click="switchShow2()"
          />
        </div>
      </div>
    </div>
    <div class="check-area">
      <div class="left-radio">
        <van-switch
          v-model="keepLoginSwitch"
          class="left-radio"
          active-color="#1390FF"
          inactive-color="#D2D2D2"
          size="20px"
          @click="ischecked()"
        />
        <span class="rememberFonts">记住密码</span>
      </div>
      <div class="right-forget" @click="toForget()">
        <div class="forget-fonts">忘记密码</div>
        <div class="forget-icon"></div>
      </div>
    </div>
    <div class="submitBlue">
      <div class="btnCover" @click="toSign()">登录</div>
    </div>
    <!--      <div class="phone-number-sign">-->
    <!--          <div class="phone-sign-icon"></div>-->
    <!--          <div class="phone-sign-fonts">手机短信登陆</div>-->
    <!--      </div>-->
    <div class="to-reg" @click="toReg()">
      没有账号，<span class="red-fonts">点击注册</span>
    </div>
    <div class="bottom-link-box flex-c">
      <div class="to-help flex-c" @click="toExperience()">
        <img
          src="../../../static/images/to-experience.png"
          alt=""
          class="to-experience-icon"
        />
        <div class="to-help-fonts">先去逛逛</div>
      </div>
      <div class="to-help flex-c" @click="getHelpInfo()">
        <img
          src="../../../static/images/to-help-white.png"
          alt=""
          class="to-help-icon"
        />
        <div class="to-help-fonts">在线客服</div>
      </div>
    </div>
    <!-- 客服列表弹框 -->
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
</template>

<script>
import { mapState } from "vuex";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import { Toast, Dialog } from "vant";
import {
  mobileModel,
  browserName,
  osVersion,
  browserVersion,
} from "mobile-device-detect";
export default {
  name: "login",
  components: {},
  data() {
    return {
      showAcc: false,
      showPwd: false,
      showPwd2: false,
      showNameRemind: false,
      showPwdRemind: false,
      disabledFlag: true,
      keepLoginSwitch: true,
      checked: true,
      showLoading: false,
      queryCookie: "",
      showToApp: true,
      cookieValue: "",
      accCookieValue: "",
      pwdCookieValue: "",
      mobileModel: this.mobileModel,

      helpList: false,
      showHelp1: false,
      showHelp2: false,
      helpData: {},
      downloadUrl: "",
      apiKey: null,
      visitorId: null,
      showNotice: false,
      helpNoticeSwitch: false,
      helpIndex: -1,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.$destroy(true);
    next();
  },
  created() {
    this.getDownloadInfo();
    this.getLoginCookie();
    this.getCookie();
    this.getAccCookie();
    var name = "sysAgentName";
    var sysAgentName = null;
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
    if (r != null) {
      var sysAgentName = unescape(r[2]);
      sysAgentName = sysAgentName.replace("/", "");
      this.queryName = sysAgentName;
      sessionStorage.setItem("queryName", this.queryName);
    }
    if (sysAgentName != null) {
      this.showToApp = false;
    }
    this.handleLoginMark();
    this.$Lazyload.options.loading = "static/images/home-banner-lazy.jpg";
    this.$Lazyload.options.error = "static/images/home-banner-lazy.jpg";
  },
  computed: mapState({
    tarbarIndex: (state) => state.common.tarbarIndex,
  }),
  //创建之前
  beforeCreate() {
    //添加到缓冲机制中
    // this.$store.dispatch('pushKeepAlive', 'login');
  },
  //数据渲染完成
  mounted() {
    //判断登录计划任务是否执行
    this.setIsLogin(false);
    sessionStorage.setItem("mobileModel", mobileModel);
    let params = {
      visitType: "APP",
      version: this.API.paramVersion,
    };
    // this.ServerAPI.postAPI(this.API.errorLog2, params, this.testAxios)
  },
  methods: {
    toExperience() {
      sessionStorage.setItem("isSelect", 2);
      this.$store.commit("TARBAR", 2);
      this.$router.push("/");
    },
    // async getVisitorData() {
    //     const visitorData = await this.$fpjs.getVisitorData({
    //         extendedResult: true
    //     });
    //     // Use visitorData
    //     console.log(visitorData)
    // },
    getFingerPrinter() {
      if (localStorage.getItem("visitorId")) {
        this.visitorId = localStorage.getItem("visitorId");
      } else {
        const fpPromise = FingerprintJS.load({ apiKey: this.apiKey })
          .then((fp) => fp.get())
          .then((result) => {
            this.visitorId = result.visitorId;
            localStorage.setItem("visitorId", this.visitorId);
          });
      }
    },
    getDownloadInfo() {
      this.ServerAPI.postAPI(this.API.setting, "", (success, data) => {
        if (success) {
          if (data.code === "0000") {
            this.downloadUrl = data.data.downUrl;
            this.apiKey = data.data.fingerPrintKey;
            this.getFingerPrinter();
          } else {
          }
        } else {
        }
      });
    },
    handleLoginMark() {
      if (sessionStorage.getItem("loginMark") === "1") {
        sessionStorage.setItem("loginMark", "0");
        location.reload();
      }
    },
    getLoginCookie() {
      this.cookieValue = new Date().getTime();
    },
    closeShowApp() {
      this.showToApp = false;
    },
    //获取cookie
    switchShow() {
      this.$refs.pwdInput.type = "password";
      this.showPwd = false;
      this.showPwd2 = true;
    },
    switchShow2() {
      this.$refs.pwdInput.type = "text";
      this.showPwd = true;
      this.showPwd2 = false;
    },
    deleteIpt() {
      this.$refs.accountInput.value = "";
      this.accCookieValue = "";
    },
    accountStore() {
      if (this.$refs.accountInput.value.length == 0) {
        this.showAcc = false;
      } else {
        this.showAcc = true;
        this.showNameRemind = false;
      }
    },
    pwdStore() {
      if (this.$refs.pwdInput.value.length == 0) {
        this.showPwd = false;
        this.showPwd2 = false;
      } else {
        if (this.$refs.pwdInput.type == "password") {
          this.showPwd2 = true;
        } else {
          this.showPwd = true;
        }
      }
    },
    nameRemindShow() {
      this.showNameRemind = true;
      if (this.$refs.accountInput.value.length == 0) {
        this.showAcc = false;
      } else {
        this.showAcc = true;
      }
    },
    nameRemindHide() {
      this.showNameRemind = false;
    },
    pwdRemindShow() {
      this.showPwdRemind = true;
    },
    pwdRemindHide() {
      this.showPwdRemind = false;
    },
    ischecked() {
      this.keepLoginSwitch = !this.keepLoginSwitch;
      console.log(this.keepLoginSwitch);
    },
    //判断是否保存了登录状态，已登录则直接跳转到首页
    isLogin: function () {
      this.ServerAPI.postAPI(this.API.isLogin, "", (success, data) => {
        if (success) {
          if (data.code == "0000") {
            this.setLogin(true);
            this.$router.replace({ path: "/" });
          }
        }
      });
    },
    btnStore() {
      if (
        this.$refs.login_account.value !== "" &&
        this.$refs.login_pw.value !== ""
      ) {
        this.disabledFlag = false;
      } else {
        this.disabledFlag = true;
      }
    },
    toSign() {
      if (
        this.$refs.accountInput.value.length < 5 ||
        this.$refs.accountInput.value.length > 16
      ) {
        this.$toastTop("请输入 5-16 位字母和数字组合的用户名", 3);
        return;
      }
      if (
        this.$refs.pwdInput.value.length < 5 ||
        this.$refs.pwdInput.value.length > 16
      ) {
        this.$toastTop("请输入 5-16 位字母和数字组合的密码", 3);
        return;
      }
      this.showLoading = true;
      let params = {
        loginName: this.$refs.accountInput.value,
        password: this.$refs.pwdInput.value,
        keepLogin: this.keepLoginSwitch === true ? "1" : "0",
        visitType: "APP",
        version: this.API.paramVersion,
        uuid: this.$refs.accountInput.value + "-" + this.cookieValue,
        visitorId: this.visitorId,
        visitSource: "H5",
      };
      this.ServerAPI.postAPI(this.API.login, params, this.loginHandler);
    },
    loginHandler(success, data) {
      this.showLoading = false;
      console.log("这是多少123", success, data);

      // 回调函数
      if (success) {
        if (data.code === "0000") {
          sessionStorage.setItem("showDownload", "1");
          sessionStorage.setItem("loginMark", "1");
          sessionStorage.setItem("showWithdraw", "1");
          this.setLogin(true);
          this.sendLoginLog();
          //判断复选框是否被勾选 勾选则调用配置cookie方法
          const self = this;
          if (self.keepLoginSwitch === true) {
            //传入账号名，密码，和保存天数3个参数
            self.setCookie(
              self.$refs.accountInput.value,
              self.$refs.pwdInput.value,
              7
            );
          } else if (self.keepLoginSwitch === false) {
            //清空Cookie
            self.clearCookie();
          }
          this.$store.dispatch("popRootKeepAlive");
          if (sessionStorage.getItem("isSelect") === "5") {
            this.$router.push({ path: "/help" });
          } else if (sessionStorage.getItem("isSelect") === "3") {
            this.$router.push({ path: "/sponsorShip-new" });
          } else if (sessionStorage.getItem("isSelect") === "4") {
            this.$router.push({ path: "/my" });
          } else {
            this.$router.push({ path: "/" });
          }
          sessionStorage.setItem("userName", data.data.loginName);
          //当有指定返回某一个页面时，跳转该页面否则清除缓存
          // if (this.$route.query.toPage) {
          //   this.$store.dispatch("popKeepAlive");
          //   this.$router.replace({ path: this.$route.query.toPage });
          // } else {
          //   this.$store.dispatch("popRootKeepAlive");
          //   this.$router.replace({ path: "/" });
          // }
        } else if (data.code === "9009") {
          Dialog.alert({
            message: "您在陌生设备登陆，需要进行验证",
          }).then(() => {
            sessionStorage.setItem("verifyUserName", data.data.loginName);
            sessionStorage.setItem("verifyPhone", data.data.phone);
            sessionStorage.setItem("verifyPwd", this.$refs.pwdInput.value);
            this.$router.push("/loginVerify");
          });
        } else {
          this.$toastTop(data.info, 3);
        }
      } else {
        this.$toastTop("似乎已断开与互联网的连接", 2);
      }
    },
    sendLoginLog() {
      let params = {
        uuid: this.$refs.accountInput.value + "-" + this.cookieValue,
        visitSource: "H5",
        appName: "emcfull",
      };
      this.ServerAPI.postAPI(this.API.loginLog, params, (success, data) => {
        if (success) {
          if (data.code === "0000") {
          }
        }
      });
    },
    toForget() {
      this.$router.push("/phonePassword");
    },
    help() {
      this.$router.push("/help");
    },
    sendMessage() {
      let params = {
        phone: this.$refs.login_account7.value,
        type: "register",
      };
      if (this.isEmpty(params.phone)) {
        this.$toastTop("请输入手机号码", 3);
        return false;
      }
      this.ServerAPI.postAPI(this.API.sendSms, params, (success, data) => {
        if (success) {
          if (data.code == "0000") {
            this.$toastTop("验证码发送成功", 1);
            this.getCode();
          } else {
            this.$toastTop(data.info, 3);
          }
        } else {
          this.$toastTop("似乎已断开与互联网的连接", 2);
        }
      });
    },
    toReg() {
      this.$router.push("/register");
    },
    //读取'记住'功能cookie
    getAccCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //显示的格式需要切割
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] === "userName") {
            this.accCookieValue = arr2[1]; //保存到对应input
          } else if (arr2[0] === "userPwd") {
            this.pwdCookieValue = arr2[1];
          }
        }
      }
      // console.log(this.$refs.accountInput)
      if (this.accCookieValue.length > 0) {
        this.keepLoginSwitch = true;
      } else {
        this.keepLoginSwitch = false;
      }
    },
    //设置'记住'功能cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //清除'记住'功能cookie
    clearCookie: function () {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天即可
    },
    getCookie(Name) {
      //cookie
      var search = Name + "=";
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
      return returnValue;
    },
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.VsCodeShow = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.VsCodeShow = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    // toHelp() {
    //     this.$router.push("/help2");
    // },
    getHelpInfo() {
      this.helpList = true;
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
          } else {
            this.$toastTop(data.info, 3);
          }
        } else {
          this.$toastTop("似乎已断开与互联网的连接", 2);
        }
      });
    },
    toHelpMode(value) {
      // this.helpList = false
      if (value === 1) {
        if (this.helpData.kefu1 === "LiveChatSDK") {
          sessionStorage.setItem("helpUrl", this.API.kfLiveChat);
        } else {
          sessionStorage.setItem("helpUrl", this.helpData.kefu1);
        }
      } else if (value === 2) {
        sessionStorage.setItem("helpUrl", this.helpData.kefu2);
      }
      this.$router.push("/help2");
      this.helpList = false;
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
    testAxios(success, data) {
      if (success) {
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  .top-show {
    width: 100%;
    //height: 4.5rem;
    // background: url("../../../static/images/login-top.png") no-repeat;
    //background-size: 100% 100%;
    position: relative;
  }
  .login-match {
    width: 100%;
    img {
      width: 100%;
      height: auto;
    }
  }
  .input-area {
    width: 80%;
    margin: 0.8rem auto 0;
    position: relative;
    .name-remind {
      position: absolute;
      top: -0.4rem;
      font-size: 0.24rem;
      color: #aaaaaa;
    }
    .user-name {
      border: #d2d2d2 1px solid;
      display: flex;
      align-items: center;
      padding: 0.2rem 0.3rem;
      border-radius: 0.6rem;

      .user-name-icon {
        width: 0.4rem;
        margin-right: 0.2rem;
      }
      input {
        width: 100%;
        border: none;
        font-size: 0.26rem;
      }
      .delete-box {
        img {
          width: 0.2rem;
          height: 0.25rem;
        }
      }
    }
    .pwd-remind {
      position: absolute;
      top: 1.1rem;
      font-size: 0.24rem;
      color: #aaaaaa;
    }
    .user-pwd {
      border: #d2d2d2 1px solid;
      margin-top: 0.6rem;
      display: flex;
      align-items: center;
      padding: 0.2rem 0.35rem;
      border-radius: 0.6rem;
      .user-pwd-icon {
        width: 0.4rem;
        margin-right: 0.2rem;
      }
      input {
        width: 100%;
        border: none;
        font-size: 0.26rem;
      }
      .delete-box2 {
        img {
          width: 0.45rem;
          height: 0.25rem;
        }
      }
    }
  }
  .check-area {
    width: 80%;
    margin: 0.5rem auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-radio {
      display: flex;
      align-items: center;
      .rememberFonts {
        font-size: 0.26rem;
        margin-left: 0.05rem;
        color: #636363;
      }
    }
    .right-forget {
      display: flex;
      align-items: center;
      .forget-fonts {
        font-size: 0.26rem;
        margin-right: 0.1rem;
        color: #636363;
      }
      .forget-icon {
        width: 0.1rem;
        height: 0.15rem;
        background: url("../../../static/images/forget-icon.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .submitBlue {
    width: 80%;
    margin: 0 auto;
    .btnCover {
      width: 100%;
      height: 0.8rem;
      line-height: 0.8rem;
      color: #ffffff;
      text-align: center;
      background: linear-gradient(90deg, #20a4ff, #067dff);
      margin-top: 0.8rem;
      border: none;
      border-radius: 0.45rem;
      font-weight: bold;
    }
  }
  .phone-number-sign {
    width: 2.3rem;
    display: flex;
    align-items: center;
    margin: 0.6rem auto 0;
    .phone-sign-icon {
      width: 0.22rem;
      height: 0.35rem;
      background: url("../../../static/images/phone-sign.png") no-repeat;
      background-size: 100% 100%;
    }
    .phone-sign-fonts {
      font-size: 0.28rem;
      color: #2f49ab;
      margin-left: 0.15rem;
    }
  }
  .to-reg {
    width: 3.7rem;
    height: 0.6rem;
    line-height: 0.6rem;
    margin: 0.5rem auto 0;
    font-size: 0.3rem;
    text-align: center;
    color: #939393;
    background: url("../../../static/images/activeRed.gif") no-repeat;
    background-position: right center;
    background-size: 11% 58%;

    .red-fonts {
      color: #1390ff;
    }
  }
  .bottom-link-box {
    margin-top: 0.4rem;
    .to-help {
      width: 1.8rem;
      .to-experience-icon {
        height: 0.45rem;
        margin-bottom: -0.06rem;
      }
      .to-help-icon {
        height: 0.35rem;
      }
      .to-help-fonts {
        color: #939393;
        font-size: 0.24rem;
        margin-left: 0.08rem;
      }
    }
    .to-help:last-child {
      margin-left: 0.28rem;
    }
  }
}
.loading-new {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: 50px;
  margin-left: -35px;
  z-index: 2019;
  border-radius: 0.2rem;
  overflow: hidden;
  opacity: 0.8;

  img {
    width: 70px;
  }
}
.toApp {
  position: relative;
  z-index: 1999;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.2rem;
  background: #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-part {
    display: flex;
    justify-content: start;
    align-items: center;
    .toApp-close {
      width: 0.4rem;
      height: 0.4rem;
      background: url("../../../static/images/account-delete.png") no-repeat;
      background-size: 100% 100%;
      margin-left: 0.15rem;
    }
    img {
      width: 0.8rem;
      height: 0.8rem;
      margin-left: 0.2rem;
    }
    .toApp-fonts {
      margin-left: 0.2rem;
      p {
        font-size: 0.28rem;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
  .toApp-right {
    width: 2rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    font-weight: bold;
    font-size: 0.26rem;
    background: #ffffff;
    color: #0052f5;
    border-radius: 0.1rem;
    margin-right: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 0.3rem;
      margin-left: 0.1rem;
    }
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
