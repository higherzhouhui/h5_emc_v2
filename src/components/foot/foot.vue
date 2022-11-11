<template>
  <mt-tabbar v-model="bottomSelected" :fixed="true">
    <mt-tab-item id="indexColumn" to="indexColumn">
      <img slot="icon" src="../../assets/images/index-2019/index-bottom-index2.png" v-if="this.bottomSelected=='indexColumn'">
      <img slot="icon" src="../../assets/images/index-2019/index-bottom-index.png" v-else>
      首页
    </mt-tab-item>
    <mt-tab-item id="hbColumn" to="hbColumn">
      <img slot="icon" src="../../assets/images/index-2019/index-bottom-hb2.png" v-if="this.bottomSelected=='hbColumn'">
      <img slot="icon" src="../../assets/images/index-2019/index-bottom-hb.png" v-else>
      红包
    </mt-tab-item>
    <mt-tab-item id="moreColumn">
      <img slot="icon" src="../../assets/images/index-2019/more.png" class="moreColumn">
    </mt-tab-item>
    <mt-tab-item id="kfColumn" to="kfColumn">
      <img slot="icon" src="../../assets/images/index-2019/index-bottom-kf2.png" v-if="this.bottomSelected=='kfColumn'">
      <img slot="icon" src="../../assets/images/index-2019/index-bottom-kf.png" v-else>
      客服
    </mt-tab-item>
    <mt-tab-item id="mineColumn" to="mineColumn">
      <img slot="icon" src="../../assets/images/index-2019/index-bottom-wd2.png" v-if="this.bottomSelected=='mineColumn'">
      <img slot="icon" src="../../assets/images/index-2019/index-bottom-wd.png" v-else>
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
  export default {
    name: 'foot',
    data(){
      return {
        bottomSelected:''
      }
    },
    mounted () {
      const CURRENTHREF = window.location.hash
      if (CURRENTHREF.includes('indexColumn')) {
        this.indexColumn = 0
      } else if (CURRENTHREF.includes('hbColumn')) {
        this.hbColumn = 1
      } else if (CURRENTHREF.includes('kfColumn')) {
        this.kfColumn = 2
      } else if (CURRENTHREF.includes('mineColumn')) {
        this.mineColumn = 3
      }
    },
    methods: {
      handleChangeTab() {
        if (this.indexColumn === 0) {
          this.$router.push({
            path: 'indexColumn',
            replace: true
          })
        } else if (this.hbColumn === 1) {
          this.$router.push({
            path: 'hbColumn',
            replace: true
          })
        } else if (this.kfColumn === 2) {
          this.$router.push({
            path: 'kfColumn',
            replace: true
          })
        } else if (this.mineColumn === 3) {
          this.$router.push({
            path: 'mineColumn',
            replace: true
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
