<template>
  <div id="app" :class="[appClass]">
    <transition
      :enter-active-class="enterAnimation"
      :leave-active-class="leaveAnimation"
    >
      <keep-alive :include="keepAlive">
        <router-view class="router-view"></router-view>
      </keep-alive>
    </transition>
    <Tarbar></Tarbar>
  </div>
</template>

<script>
import Tarbar from "./components/tarbar/tarbar";
import { mapState } from "vuex";
import Vue from "vue";

export default {
  components: {
    Tarbar,
  },
  data() {
    return {
      appClass: "",
    };
  },
  computed: mapState({
    keepAlive: function (state) {
      return state.common.keepArray + "";
    },
    enterAnimation: function (state) {
      return state.common.pageAnimation.enter;
    },
    leaveAnimation: function (state) {
      return state.common.pageAnimation.leave;
    },
  }),
  watch: {
    $route() {
      if (window._czc) {
        let location = window.location;
        let contentUrl = location.pathname + location.hash;
        let refererUrl = "/";
        window._czc.push(["_trackPageview", contentUrl, refererUrl]);
      }
    },
  },
  mounted() {
    //友盟统计添加
    const script = document.createElement("script");
    script.src = unescape(
      "https://s4.cnzz.com/z_stat.php%3Fid%3D1280182648%26show%3Dpic"
    );
    script.language = "text/JavaScript";
    document.getElementById("app").appendChild(script);
  },
  created() {
    // this.setLogin(false);
    // this.$router.replace('/');
    global.URLROUTERS = this.myrouters;
    let arr = ["", "E", "M", "C", "开", "发", "团", "队"];
    for (var x = 1; x < arr.length; x++) {
      arr[0] += "%c" + arr[x];
      arr[x] =
        "color:#" +
        Math.random().toFixed(3) * 1000 +
        ";font-size:50px;text-shadow:5px 5px 5px #DCDFE6;";
    }
    console.log.apply(console, arr);
    if (localStorage.getItem("login_flag")) {
      // this.ServerAPI.testAPI()
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  font-size: 14px;
  font-family: PingFang-SC-Medium;
  // height:100%
}
</style>
