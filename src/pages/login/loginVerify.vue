<template>
  <div class="login-verify-content">
    <HeaderTop :title="`登录保护验证`" v-if="showStatus1"></HeaderTop>
    <div class="status-header" v-if="!showStatus1">
      <div class="status-header-fonts">登录保护验证</div>
      <div class="header-line"></div>
    </div>
    <div class="check-status" v-if="showStatus1">
      <img
        src="../../../static/images/login-verify-img.png"
        alt=""
        class="verify-img"
      />
      <div class="verify-intro">
        <span class="yellow-line"></span>
        <span class="intro-fonts">您在陌生设备登录，请进行短信验证</span>
      </div>
      <div class="gray-area"></div>
      <div class="verify-area">
        <div class="verify-area-title">
          请点击下方按钮，验证码将会发送到<br />{{ verifyPhone }}
        </div>
        <!-- 密码输入框 -->
        <van-password-input
          v-if="step2"
          class="verify-code"
          :class="wrongCode === true ? 'red-border' : ''"
          :mask="false"
          length="4"
          gutter=".3rem"
          :value="value"
          :focused="showKeyboard"
          @focus="
            showKeyboard = true;
            wrongCode = false;
          "
        />
        <div class="wrong-code" v-if="wrongCode">
          <img
            src="../../../static/images/login-verify-icon.png"
            alt=""
            class="wrong-code-icon"
          />
          <div class="wrong-code-fonts">
            验证码错误，还有{{ verifyTimes }}次机会
          </div>
        </div>
        <div
          v-show="VsCodeShow && step1"
          class="get-verifyNum"
          @click="sendMessage()"
        >
          {{ btnFonts }}
        </div>
        <van-button
          v-show="verifyBtnShow && step2"
          class="get-verifyNum"
          block=""
          @click="loginVerify()"
          :disabled="inputCheck"
          >{{ subVerify }}</van-button
        >
        <div class="resend-box" v-if="step2">
          没有收到验证码？
          <span v-if="VsCodeShow" class="blue" @click="sendMessage()"
            >【再次发送】</span
          >
          <span v-if="!VsCodeShow">({{ count }})</span>
        </div>
        <!-- 数字键盘 -->
        <van-number-keyboard
          v-model="value"
          :show="showKeyboard"
          @blur="showKeyboard = false"
        />
      </div>
    </div>
    <div class="check-status" v-if="showStatus2">
      <img
        src="../../../static/images/login-check-pass.png"
        alt=""
        class="verify-img"
      />
      <div class="verify-intro">
        <span class="blue-line"></span>
        <span class="intro-fonts">已经通过安全验证</span>
      </div>
      <div class="intro-fonts2">
        已经通过安全验证，您可以在本设备<span class="green-fonts"
          >正常登录</span
        >
      </div>
      <div class="sub-button" @click="verifyPass()">完成</div>
    </div>
    <div class="check-status" v-if="showStatus3">
      <img
        src="../../../static/images/login-check-fail.png"
        alt=""
        class="verify-img"
      />
      <div class="verify-intro">
        <span class="red-line"></span>
        <span class="intro-fonts">未通过安全验证</span>
      </div>
      <div class="intro-fonts2">
        未通过安全验证，<span class="red-fonts">请重新登录</span>
      </div>
      <div class="sub-button" @click="$router.replace('/login')">返回</div>
    </div>
  </div>
</template>

<script>
import HeaderTop from "../../components/top/top";
import { PasswordInput, NumberKeyboard, Toast } from "vant";
export default {
  name: "loginVerify",
  components: {
    HeaderTop,
    PasswordInput,
    NumberKeyboard,
  },
  data() {
    return {
      verifyUserName: "",
      verifyPhone: "",
      verifyPwd: "",
      value: "",
      showKeyboard: false,
      VsCodeShow: true,
      count: "",
      cookieValue: "",
      showStatus1: true,
      showStatus2: false,
      showStatus3: false,
      wrongCode: false,
      verifyTimes: 5,
      btnFonts: "点击获取验证码",
      subVerify: "验证",
      verifyBtnShow: false,
      visitorId: null,
      inputCheck: true,
      showSecs: false,
      step1: true,
      step2: false,
    };
  },
  watch: {
    value(value) {
      if (value.length === 4) {
        this.showKeyboard = false;
        // this.verifyBtnShow = true
        this.inputCheck = false;
      } else {
        // this.verifyBtnShow = false
        this.inputCheck = true;
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("verifyPhone");
    sessionStorage.removeItem("verifyUserName");
    sessionStorage.removeItem("verifyPwd");
    this.$destroy(true);
    next();
  },
  mounted() {
    this.getVerifyInfo();
    this.getLoginCookie();

    // this.verifyUserName = 'test89k488'
    // this.verifyPhone = '15722222222'
    // this.verifyPwd = '1234qwer'
  },
  methods: {
    getLoginCookie() {
      this.cookieValue = new Date().getTime();
    },
    getVerifyInfo() {
      this.verifyUserName = sessionStorage.getItem("verifyUserName");
      this.verifyPhone = sessionStorage.getItem("verifyPhone");
      this.verifyPwd = sessionStorage.getItem("verifyPwd");
      this.visitorId = localStorage.getItem("visitorId");
    },
    sendMessage() {
      let params = {
        loginName: this.verifyUserName,
        version: this.API.paramVersion,
        password: this.verifyPwd,
        visitType: "APP",
      };
      const toast = Toast.loading({
        duration: 0,
        forbidClick: true,
        message: "验证码发送中",
      });
      this.ServerAPI.postAPI(this.API.loginSms, params, (success, data) => {
        if (success) {
          this.step1 = false;
          this.step2 = this.verifyBtnShow = true;
          Toast.clear();
          if (data.code === "0000") {
            Toast("验证码发送成功");
            this.getCode();
          } else {
            Toast(data.info);
          }
        } else {
          Toast.clear();
          Toast("网络错误，请重试");
        }
      });
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
    loginVerify() {
      let params = {
        loginName: this.verifyUserName,
        password: this.verifyPwd,
        version: this.API.paramVersion,
        keepLogin: true,
        code: this.value,
        visitType: "APP",
        visitorId: this.visitorId,
        uuid: this.verifyUserName + "-" + this.cookieValue,
        visitSource: "H5",
      };
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "验证中...",
      });
      this.ServerAPI.postAPI(this.API.login2, params, (success, data) => {
        if (success) {
          Toast.clear();
          if (data.code === "0000") {
            Toast("验证通过");
            this.showStatus1 = false;
            this.showStatus2 = true;
          } else if (data.code === "1056") {
            Toast(data.info);
            this.wrongCode = true;
            this.verifyTimes--;
            if (this.verifyTimes === 0) {
              this.showStatus1 = false;
              this.showStatus3 = true;
            }
          } else if (data.code === "1057") {
            this.showStatus1 = false;
            this.showStatus3 = true;
          } else {
            Toast(data.info);
          }
        } else {
          Toast.clear();
          Toast("网络错误，请重试");
        }
      });
    },
    verifyPass() {
      sessionStorage.setItem("showDownload", "1");
      this.setLogin(true);
      this.sendLoginLog();
      this.$store.dispatch("popRootKeepAlive");
      if (sessionStorage.getItem("isSelect") === "5") {
        this.$router.replace({ path: "/help" });
      } else if (sessionStorage.getItem("isSelect") === "3") {
        this.$router.replace({ path: "/sponsorShip-new" });
      } else if (sessionStorage.getItem("isSelect") === "4") {
        this.$router.replace({ path: "/my" });
      } else {
        this.$router.replace({ path: "/" });
      }
      sessionStorage.setItem("userName", this.verifyUserName);
    },
    sendLoginLog() {
      let params = {
        uuid: this.verifyUserName + "-" + this.cookieValue,
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
  },
};
</script>

<style lang="scss" scoped>
.login-verify-content {
  .status-header {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #2a2929;
    font-size: 0.3rem;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.3);
    font-weight: bold;
    .status-header-fonts {
    }
    .header-line {
      height: 0.1rem;
      width: 0.6rem;
      background: #78bdf2;
      margin: -0.1rem auto 0;
    }
  }
  .check-status {
    .verify-img {
      display: block;
      margin: 0.5rem auto 0;
      height: 2.5rem;
    }
    .verify-intro {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0.5rem;
      .yellow-line {
        width: 0.06rem;
        height: 0.35rem;
        background: #ffba00;
      }
      .blue-line {
        width: 0.06rem;
        height: 0.35rem;
        background: #78bdf2;
      }
      .red-line {
        width: 0.06rem;
        height: 0.35rem;
        background: #e90619;
      }
      .intro-fonts {
        color: #303030;
        font-size: 0.3rem;
        margin-left: 0.1rem;
      }
    }
    .intro-fonts2 {
      color: #7c8591;
      text-align: center;
      margin-top: 0.15rem;
      .green-fonts {
        color: #1bc02a;
      }
      .red-fonts {
        color: #e90619;
      }
    }
    .gray-area {
      height: 0.3rem;
      background: #f5f6f7;
      margin-top: 0.5rem;
    }
    .verify-area {
      padding-top: 0.3rem;
      text-align: center;
      .verify-area-title {
        color: #555666;
        font-size: 0.3rem;
      }
      .verify-code {
        margin: 0.3rem auto 0;
        width: 4rem;
        height: 1.2rem;
        li {
          border: #a8b3c3 1px solid;
          line-height: 1.2rem;
        }
      }
      .red-border {
        li {
          border: #e90619 1px solid;
        }
      }
      .wrong-code {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0.3rem auto 0;
        color: #555666;
        .wrong-code-icon {
          height: 0.3rem;
        }
        .wrong-code-fonts {
          margin-left: 0.15rem;
        }
      }
      .get-verifyNum {
        width: 3rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.3rem;
        color: #ffffff;
        background: linear-gradient(90deg, #78bdf2, #1d9dfc);
        border-radius: 0.05rem;
        margin: 0.6rem auto 0;
      }
      .get-verifyNum2 {
        background: #d7d7d8;
        color: #303030;
      }
      .resend-box {
        color: #555666;
        margin-top: 0.2rem;
      }
    }
    .sub-button {
      width: 5rem;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.3rem;
      color: #ffffff;
      background: linear-gradient(90deg, #78bdf2, #1d9dfc);
      border-radius: 0.05rem;
      margin: 1rem auto 0;
    }
  }
}
.blue {
  color: #1d9dfc;
}
</style>
